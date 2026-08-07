import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function htmlEscape(value:string){return value.replace(/[&<>'"]/g,(ch)=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[ch]||ch));}

export async function POST(request:NextRequest){
  const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const smtpUser=process.env.AFIYAH_SMTP_USER||"hello@afiyahverse.com";
  const smtpPass=process.env.AFIYAH_SMTP_PASS;
  const smtpHost=process.env.AFIYAH_SMTP_HOST||"smtp.hostinger.com";
  const smtpPort=Number(process.env.AFIYAH_SMTP_PORT||465);
  const smtpSecure=(process.env.AFIYAH_SMTP_SECURE||"true")==="true";
  const fromName=process.env.AFIYAH_INVITE_FROM_NAME||"Afiyah Verse";
  if(!supabaseUrl||!supabaseKey) return NextResponse.json({error:"supabase_not_configured"},{status:500});
  if(!smtpPass) return NextResponse.json({error:"invite_email_not_configured"},{status:503});

  const token=request.headers.get("authorization")?.replace(/^Bearer\s+/i,"");
  if(!token) return NextResponse.json({error:"authentication_required"},{status:401});

  const userRes=await fetch(`${supabaseUrl}/auth/v1/user`,{headers:{apikey:supabaseKey,Authorization:`Bearer ${token}`}});
  if(!userRes.ok) return NextResponse.json({error:"invalid_session"},{status:401});
  const user=await userRes.json();

  const body=await request.json().catch(()=>null) as null|{to?:string;slot?:number;pillar?:string;joinUrl?:string};
  const to=(body?.to||"").trim().toLowerCase(); const slot=Number(body?.slot||0); const pillar=(body?.pillar||"").trim(); const joinUrl=(body?.joinUrl||"").trim();
  if(!EMAIL.test(to)||slot<1||slot>8||!pillar||!joinUrl) return NextResponse.json({error:"invalid_invite"},{status:400});

  let parsed:URL; try{parsed=new URL(joinUrl);}catch{return NextResponse.json({error:"invalid_join_url"},{status:400});}
  const allowedOrigin=process.env.AFIYAH_APP_ORIGIN;
  if(allowedOrigin && parsed.origin!==new URL(allowedOrigin).origin) return NextResponse.json({error:"invalid_join_origin"},{status:400});

  const rowRes=await fetch(`${supabaseUrl}/rest/v1/my_eight?owner_user_id=eq.${encodeURIComponent(user.id)}&slot_number=eq.${slot}&invite_email=eq.${encodeURIComponent(to)}&select=slot_number,pillar,invite_email,status&limit=1`,{headers:{apikey:supabaseKey,Authorization:`Bearer ${token}`}});
  if(!rowRes.ok) return NextResponse.json({error:"invite_verification_failed"},{status:403});
  const rows=await rowRes.json();
  const row=rows?.[0];
  if(!row||row.pillar!==pillar) return NextResponse.json({error:"invite_not_owned"},{status:403});

  const safePillar=htmlEscape(pillar); const safeJoin=htmlEscape(joinUrl);
  const transporter=nodemailer.createTransport({host:smtpHost,port:smtpPort,secure:smtpSecure,auth:{user:smtpUser,pass:smtpPass}});
  const info=await transporter.sendMail({
    from:`${fromName} <${smtpUser}>`,
    to,
    replyTo:smtpUser,
    subject:`You’ve been invited to My Eight · ${pillar}`,
    text:`A Sister has invited you into her Afiyah My Eight circle for ${pillar}. Join here: ${joinUrl}\n\nUse this same email address when you register or sign in. Your private reflections, quiz answers, journals and wellbeing information are never shared through My Eight.`,
    html:`<div style="background:#061B26;padding:32px;font-family:Arial,sans-serif;color:#F8F3E9"><div style="max-width:620px;margin:auto;background:#003629;border:1px solid #AD8633;border-radius:24px;padding:32px"><div style="color:#D6B46D;font-size:12px;letter-spacing:2px;text-transform:uppercase">Afiyah Verse · My Eight</div><h1 style="font-family:Georgia,serif;font-size:36px;margin:14px 0">You’ve been invited.</h1><p style="line-height:1.7;color:#e9e2d6">A Sister has invited you into her <strong>My Eight</strong> circle for <strong>${safePillar}</strong>.</p><p style="line-height:1.7;color:#e9e2d6">Accept the invitation using this same email address. Your private reflections, quiz answers, journals and wellbeing information are never shared through My Eight.</p><p style="margin:28px 0"><a href="${safeJoin}" style="background:#AD8633;color:#061B26;padding:14px 22px;border-radius:14px;text-decoration:none;font-weight:700">Accept My Eight Invitation</a></p><p style="font-size:12px;line-height:1.6;color:#b7afa2">If the button does not open, copy this link:<br>${safeJoin}</p><div style="margin-top:28px;font-size:12px;color:#D6B46D">∞ × ∞ · Learn. Carry it forward.</div></div></div>`
  });
  return NextResponse.json({sent:true,messageId:info.messageId,from:smtpUser,to});
}
