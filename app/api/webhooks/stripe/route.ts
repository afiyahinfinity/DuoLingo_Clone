import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!process.env.DATABASE_URL || !process.env.STRIPE_API_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Legacy Stripe billing is not configured for this Academy deployment." }, { status: 503 });
  }

  const [{ default: db }, { userSubscription }, { eq }] = await Promise.all([
    import("@/db/drizzle"),
    import("@/db/schema"),
    import("drizzle-orm"),
  ]);
  const stripe = new Stripe(process.env.STRIPE_API_KEY, { apiVersion: "2024-06-20" });

  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error: any) {
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    if (!session?.metadata?.userId) return new NextResponse("User ID is required", { status: 400 });
    await db.insert(userSubscription).values({
      userId: session.metadata.userId,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    await db.update(userSubscription).set({
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    }).where(eq(userSubscription.stripeSubscriptionId, subscription.id));
  }

  return new NextResponse(null, { status: 200 });
}
