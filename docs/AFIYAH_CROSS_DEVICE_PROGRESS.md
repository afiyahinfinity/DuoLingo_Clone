# Afiyah Eight — Cross-Device Progress

The signed-in learner flow is now:

User → Week → Module → Lesson → Lesson Progress → Quiz Attempt → Latest Score → Best Score → Pass ≥90% → +8∞ Reward → KEEP/GIVE → Infinity Well → Streak → My Eight.

## Supabase identity
The Academy uses the active Afiyah Supabase Auth project. It does not create a parallel learner identity for Academy progress.

## Resume state
`academy_enrollments` stores the current week, module, lesson, day 1–56, current streak, best streak and last activity date. The Academy home reads this row and links the learner directly back to the saved lesson.

## Lessons
Completing a lesson upserts `lesson_progress` for the authenticated user and advances `academy_enrollments`. The streak is updated from the last activity date.

## Mastery
`academy_submit_quiz_attempt` scores answers server-side against the 10 seeded source questions, inserts `quiz_attempts`, returns latest result + best score, and creates one +8∞ first-pass reward per module. The Afiyah mastery gate is 9/10.

## Rewards
`academy_rewards` stores pending / kept / given. KEEP remains on the learner dashboard. GIVE inserts the same point amount into `infinity_well_contributions`. A resolved first-pass reward cannot be farmed by retaking.

## My Eight
`my_eight` stores eight owner slots. An owner creates a slot for a specific email and shares a claim URL. The invited woman must sign in with that matching email before `claim_my_eight_invite` links her user ID to the slot. An enrollment trigger then updates only week/progress/status for that member. Private reflections, quiz answers, journals and wellbeing data are not shared to the owner.

## Security
Personal Academy tables use RLS ownership policies. The current quiz RPC is SECURITY INVOKER. The older SECURITY DEFINER quiz RPC has had API execution revoked. The internal My Eight sync trigger is not executable by anon/authenticated API callers. The invite-claim RPC is intentionally authenticated and validates both `auth.uid()` and the authenticated email against the saved invite email before linking a slot.
