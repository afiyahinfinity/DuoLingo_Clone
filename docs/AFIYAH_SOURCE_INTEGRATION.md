# Afiyah Learning Source Integration

This branch adapts three repositories into one Afiyah learning architecture without merging their responsibilities.

## 1. DuoLingo_Clone — learning engine

Use for:
- course → unit → lesson → challenge structure
- progress tracking
- challenge completion
- lesson percentage
- points/reward presentation
- quests, achievements and admin content patterns
- mobile-first lesson UX

Afiyah changes:
- module completion requires a quiz score of **90% or higher**
- passed Gift Modules grant **8 Infinity product points**
- Arabic language lessons grant **2× rewards: 16 Infinity + 16 Amanah product points**
- Amanah/Infinity points are product progression signals, not religious merit
- existing competitive leaderboard patterns should be optional; collective progress is preferred for Afiyah

## 2. AnythingLLM — approved knowledge and AI layer

Source repo: `afiyahinfinity/anything-llm`

Use for architectural patterns around:
- document ingestion
- private workspaces / approved knowledge collections
- RAG and source-grounded answers
- agents and controlled tools
- multi-user access patterns
- embeddable AI experiences
- provider flexibility

Afiyah use:
- Noor can answer module questions only from approved module documents/workspaces
- each module should have its own approved knowledge collection or metadata scope
- source citations should be retained where the underlying content supports them
- do not use AnythingLLM's general chat UI as the Academy learning interface

## 3. mental-wellness-prompts — bounded wellbeing source library

Source repo: `afiyahinfinity/mental-wellness-prompts`

Use only for the **Afiyah / Wellbeing** module and wellbeing-support features that fit the source boundaries.

The source explicitly supports:
- emotional support and validation
- self-reflection facilitation
- stress-management techniques
- sleep-hygiene education
- coping-skill development
- crisis-resource connection

The source explicitly does **not** support presenting the experience as therapy, diagnosis, medication management, severe-mental-illness treatment, legal/medical advice, or crisis intervention.

Before deployment:
- retain crisis/safety protocols
- customize region-appropriate crisis resources
- include clear AI limitations and professional-care boundaries
- test safety behavior before release
- review age eligibility and data/privacy handling

## 4. The Afiyah Eight gift

Eight modules, eight pillars, eight weeks:

1. نيّة — Niyyah — Intention — Purpose Before Progress
2. عافية — Afiyah — Wellbeing — Nafs & Nūr: Everyday Wellbeing
3. عدل — Adl — Justice — Financial Agency for Her
4. أمانة — Amanah — Trust — Digital Amanah
5. دين — Deen — Faith — Faith-Aligned Decision Making
6. إحسان — Ihsan — Excellence — Learn Better, Build Better
7. بركة — Barakah — Blessed Increase — Money, Value & Barakah
8. صدقة — Sadaqah — Giving — Give Forward

Each module currently targets:
- 4 short lessons
- 10-question final quiz
- 90% pass threshold
- progress bar at lesson, quiz, module, and 8-week journey level
- 8 Infinity product points after passing

## 5. Language track

Language learning is a separate reusable course system based on the DuoLingo_Clone structure.

Arabic is the featured track:
- pass threshold: 90%
- normal language reward: 8 Infinity product points
- Arabic reward: 16 Infinity + 16 Amanah product points
- Arabic multiplier: ×2

The multiplier is a product-design incentive and must never be represented as a claim about religious reward from Allah.
