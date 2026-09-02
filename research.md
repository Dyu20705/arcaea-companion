# Research Output — Arcaea Companion: From Wiki to Real Game Companion

**Status:** Research direction / product strategy
**Target:** Reposition Arcaea Companion from a generic “fan wiki + AI-looking frontend” into a **game companion platform** centered on play, charts, player performance, progression, discovery, and eventually mapping/chart analysis.

**Current repository baseline:** `arcaea-companion` currently describes itself as an Arcaea fan wiki; the frontend is still a skeleton, synthetic catalog has not been added, approved data integration is blocked, and public release is blocked.

---

# 1. Core Research Thesis

> **Arcaea Companion should not become a prettier Arcaea Wiki.**

The Wiki should be treated as the **knowledge substrate**, not the product destination.

The long-term product should answer:

> **“What can I do with my Arcaea data and knowledge that helps me play, understand, improve, discover and engage with the game?”**

Therefore:

```text
                    Arcaea Companion
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
     KNOWLEDGE          GAME DATA          PLAYER
        │                  │                  │
     songs             charts             scores
     packs              timing             accuracy
     characters         difficulty         potential
     world              patterns           progression
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                    COMPANION LAYER
                           │
          ┌────────────────┼────────────────┐
          │                │                │
       DISCOVER          ANALYZE          IMPROVE
          │                │                │
       search          performance       practice
       compare         chart analysis    goals
       recommend       trends            weaknesses
```

The differentiator should therefore not be **content volume**.

It should be:

> **How intelligently the product turns game data into useful player decisions.**

---

# 2. Research Benchmark Matrix

The product should study multiple mature ecosystems, not imitate one site.

| Reference                   | Primary research target  | What to extract                                        |
| --------------------------- | ------------------------ | ------------------------------------------------------ |
| **Arcaea itself**           | Game identity            | visual language, hierarchy, progression, interaction   |
| **Arcaea Wiki**             | Domain knowledge         | songs, charts, mechanics, relationships                |
| **osu!**                    | Mapping ecosystem        | timing, beatmaps, editor, difficulty, mapper workflow  |
| **Quaver**                  | Charting/tooling         | editor workflow, timing, SV, waveform, map structure   |
| **Etterna / StepMania**     | Rhythm data              | chart representation, pattern analysis, difficulty     |
| **ScoreSaber**              | Player companion         | rankings, scores, profiles, progression                |
| **osu! performance system** | Performance intelligence | difficulty models, pp, weighting, skill dimensions     |
| **Bulbapedia**              | Knowledge architecture   | entity relationships, navigation, discovery            |
| **GitHub / Primer**         | Product UI engineering   | design system, accessibility, responsive behavior      |
| **Linear**                  | Interface quality        | hierarchy, density, restraint, interaction consistency |
| **OpenChart**               | Cross-game charting      | web-based chart architecture and interoperability      |

ScoreSaber demonstrates how a companion can prioritize player statistics and rankings rather than turning every object into a content card. Its current ranking interface exposes player, PP, plays, ranked plays and accuracy in a compact data-oriented presentation. ([ScoreSaber][1])

OpenChart is especially relevant to the future research direction because it explicitly targets a cross-game web editor for rhythm-game charts and emphasizes accessibility, multi-game support and chart sharing. ([GitHub][2])

---

# 3. Product Direction

## Phase 1 — Knowledge Foundation

The Wiki is useful here.

Build a structured domain model:

```text
Song
 ├── Artist
 ├── Pack
 ├── Version
 ├── BPM
 ├── Duration
 └── Charts

Chart
 ├── Difficulty
 ├── Chart Constant
 ├── Note Count
 ├── Designer
 ├── Timing characteristics
 └── Gameplay characteristics

Player
 ├── Scores
 ├── Best Performances
 ├── Recent Performances
 ├── Potential
 ├── Goals
 └── Progression
```

This should be a **database of relationships**, not merely pages.

---

# 4. Phase 2 — Song & Chart Explorer

This should become the first genuinely useful Companion feature.

Instead of:

```text
Song Page
→ artwork
→ description
→ trivia
```

build:

```text
Song
 ├── Overview
 ├── Charts
 ├── Difficulty
 ├── BPM / timing
 ├── Note counts
 ├── Chart designer
 ├── Score history
 ├── Related charts
 ├── Player performance
 └── Analysis
```

The interface should support:

**Search → Filter → Sort → Compare → Inspect → Act**

rather than:

**Browse → Read → Leave**

This is one of the most important changes in product philosophy.

---

# 5. Phase 3 — Player Companion

This is where the product starts becoming differentiated.

A player should be able to answer:

> “How am I doing?”

> “What should I play next?”

> “Where am I weak?”

> “Which charts are worth practicing?”

> “Why did this play change my progression?”

Arcaea's Potential system is a particularly rich foundation for this. Potential is derived from Play Ratings, with Play Rating itself depending on chart constant and score modifier; current Potential uses the best 30 entries plus the best 10 of the recent 30. ([Arcaea Wiki][3])

Therefore the Companion could eventually model:

```text
Player
│
├── Potential
│
├── Best 30
│
├── Recent 30
│
├── Score Distribution
│
├── Difficulty Distribution
│
├── Accuracy Distribution
│
├── Improvement Rate
│
├── Weaknesses
│
└── Suggested Practice
```

The important idea:

> **Don't merely display Potential. Explain the player's performance landscape.**

---

# 6. Performance Intelligence

Study osu!'s performance-system philosophy very seriously.

osu! does not simply rank a score according to raw score. Its performance model decomposes difficulty and performance through factors such as aim, speed, accuracy and strain, then combines scores using weighting so that repeated lower-value plays do not dominate overall progression. ([osu!][4])

Arcaea has a different scoring model, so **do not copy pp**.

Instead, learn the principle:

> **Raw game numbers → derived metrics → actionable player understanding.**

Possible future Arcaea-oriented metrics:

```text
Score
Accuracy
Chart Constant
Play Rating
Potential Contribution
Difficulty Distribution
Consistency
Recent Trend
Personal Best Gap
Improvement Velocity
```

These can eventually answer:

```text
"This chart is +0.6 above your current median difficulty,
but your historical accuracy on comparable charts is strong."

"Your largest improvement opportunity is high-density
FTR charts rather than raw difficulty."

"You are consistently underperforming on charts with X
pattern characteristic."
```

That is a **companion**.

---

# 7. Deep Research Track: Charting

This should become one of the central research areas.

## 7.1 Charting is not “putting notes on a timeline”

osu!'s mapping documentation explicitly treats beatmapping as a process involving song selection, timing, object placement and optional visual/audio design. Timing is foundational because objects are placed relative to musical structure and subdivisions. ([osu!][5])

Therefore study charting through:

```text
Music
 ↓
Timing
 ↓
Rhythmic structure
 ↓
Object representation
 ↓
Patterns
 ↓
Difficulty
 ↓
Player cognition
 ↓
Gameplay experience
```

---

# 8. Timing Research

Timing should be its own research discipline.

Study:

```text
BPM
Offset
Time Signature
Measures
Beat subdivisions
Tempo changes
Timing points
Stops / pauses
Inherited timing
Scroll velocity
Subdivision / snapping
```

osu!'s editor separates timing management from composition and explicitly treats accurate timing as essential to mapping. Its timing system supports timing sections, BPM changes, meters and inherited points used for effects such as slider velocity. ([osu!][6])

Quaver's editor provides another useful reference because it exposes waveform, timing points, BPM, snap and scroll-velocity editing alongside the chart timeline.

### Product implication

Eventually Arcaea Companion should be capable of representing:

```text
Song Timeline
│
├── waveform
├── beats
├── measures
├── timing points
├── chart objects
├── sections
└── annotations
```

even if the first versions are read-only.

---

# 9. Chart Representation Research

Study charts as **structured data**, not screenshots.

A chart should conceptually become:

```text
Chart
 ├── metadata
 ├── timing
 ├── events
 ├── note objects
 ├── spatial information
 ├── timing information
 ├── patterns
 └── derived statistics
```

For Arcaea specifically, research the semantic role of:

```text
Tap / Floor Note
Hold
Arc
Trace-related structures
Timing
Spatial lanes
Arc geometry
Note density
Pattern transitions
```

The product should eventually distinguish:

> **what a chart contains**

from

> **what that chart demands from the player.**

That second layer is where future intelligence lies.

---

# 10. Mapping Analysis

Do not stop at:

```text
note count = 1,234
```

Research higher-order chart characteristics:

```text
Density
Burst density
Pattern repetition
Pattern transition
Jack-like repetition
Chord density
Cross-hand / hand independence
Spatial displacement
Arc complexity
Timing complexity
Rhythmic complexity
Section difficulty
Peak difficulty
Difficulty variance
```

The goal is eventually:

```text
Chart → Feature Extraction → Pattern Analysis → Difficulty Profile
```

This creates a foundation for both player tools and research.

---

# 11. Chart Difficulty Research

Arcaea already demonstrates why displayed level is not sufficient.

Its Wiki documents **Chart Constant** as a more precise representation of chart difficulty than the displayed level, and Play Rating combines that chart difficulty with the player's score modifier. ([Arcaea Wiki][3])

Therefore Companion should distinguish:

```text
Displayed Difficulty
        ≠
Underlying Difficulty
        ≠
Player-perceived Difficulty
        ≠
Player-specific Difficulty
```

This distinction is strategically important.

A future Companion could model:

```text
Chart difficulty
        ↓
Pattern profile
        ↓
Player history
        ↓
Personal difficulty estimate
```

This is much more powerful than static difficulty tables.

---

# 12. Mapping/Game Design Research

Study not only **how charts are encoded**, but:

> **why good charts feel good.**

Research:

```text
Music-to-chart correspondence
Rhythm representation
Visual expectation
Pattern readability
Hand movement
Spatial memory
Anticipation
Difficulty progression
Pattern novelty
Repetition
Fatigue
Flow
Musical phrasing
Climax representation
```

osu!'s mapping documentation explicitly connects mapping with musical rhythm, timing, object placement and gameplay considerations. ([osu!][5])

This should become a major research branch:

```text
Music Theory
     +
Human Motor Control
     +
Rhythm Game Design
     +
Chart Data
     ↓
Gameplay Pattern Intelligence
```

---

# 13. World / Progression Systems

Do not reduce Arcaea to songs.

World Mode demonstrates that the game is also a progression system involving maps, tiles, rewards, partners, requirements, stamina and performance-dependent progress. ([Arcaea Wiki][7])

Therefore Companion should eventually model:

```text
Player Progression
│
├── Songs unlocked
├── Charts cleared
├── World progress
├── Partners
├── Resources
├── Requirements
├── Events
└── Goals
```

Possible companion questions:

```text
What can I unlock next?

What should I play to progress efficiently?

Which requirements am I missing?

How much progress can I realistically make?

Which partner / chart combination is useful?
```

That is much closer to a **game companion**.

---

# 14. Discovery Engine

A mature Companion should not merely have:

```text
/search
```

It should develop:

```text
Search
+
Filtering
+
Similarity
+
Recommendation
+
Context
```

Example:

> Find charts similar in difficulty to X.

> Find charts with similar BPM and pattern characteristics.

> Find charts where players with similar profiles perform well.

> Find underplayed charts appropriate for my current skill.

> Find charts that can train a specific weakness.

Eventually:

```text
Player Profile
     ↓
Skill Profile
     ↓
Candidate Charts
     ↓
Ranking / Recommendation
     ↓
Practice Queue
```

---

# 15. The “Practice Companion” Direction

This is potentially the strongest long-term product direction.

Instead of:

> “Here are 500 songs.”

move toward:

> “Here is what you should play next.”

Example:

```text
TODAY'S PRACTICE

1. Chart A
   Reason:
   + similar to current skill
   + targets weak pattern
   + manageable difficulty

2. Chart B
   Reason:
   + improve timing consistency

3. Chart C
   Reason:
   + prepares for target chart
```

This creates a feedback loop:

```text
PLAY
 ↓
RESULT
 ↓
ANALYZE
 ↓
UPDATE PLAYER MODEL
 ↓
RECOMMEND
 ↓
PLAY AGAIN
```

That loop is the core of a real companion product.

---

# 16. Visual Research Direction

The visual system should be **Arcaea-native but product-grade**.

Research targets:

### Arcaea

Learn:

* atmosphere
* composition
* imagery
* typography
* geometry
* visual hierarchy
* motion
* color relationships

The song-selection interface is particularly useful because information is embedded directly into a visually rich game structure instead of being presented as generic dashboard cards.

### Primer

Learn:

* tokens
* typography
* spacing
* components
* responsive layouts
* accessibility
* interaction patterns

Primer explicitly treats foundations, components and UI patterns as a coherent design system rather than isolated visual tricks. ([Primer][8])

### Linear

Learn:

* visual restraint
* density
* hierarchy
* reduced chrome
* interaction consistency

### Critical rule

> **Borrow principles, not screenshots.**

---

# 17. Avoid the “AI UI” Failure Mode

The following should be treated as warning signs:

```text
Huge hero heading
+ gradient background
+ glass cards
+ excessive rounded corners
+ arbitrary glow
+ floating blobs
+ meaningless animation
+ excessive whitespace
+ generic dashboard
+ every element highlighted
```

This creates visual novelty without product identity.

The replacement:

```text
Strong information hierarchy
+
Purposeful density
+
Domain-specific visual language
+
Real data relationships
+
Purposeful interaction
+
Consistent design system
```

---

# 18. Avoid “Wiki++”

A common failure path is:

```text
Wiki
 ↓
Better Wiki
 ↓
Searchable Wiki
 ↓
Beautiful Wiki
 ↓
Still a Wiki
```

Do not let this happen.

The product roadmap should deliberately move:

```text
Knowledge
   ↓
Data
   ↓
Analysis
   ↓
Player Model
   ↓
Recommendations
   ↓
Action
```

The Wiki should become infrastructure.

---

# 19. Avoid “Database UI”

Another failure mode:

```text
Songs table
Charts table
Players table
Scores table
```

This technically gives huge utility but can become a glorified admin panel.

The interface must expose **decisions**, not just records.

Bad:

```text
Chart Constant: 10.7
Notes: 981
BPM: 185
```

Better:

```text
10.7
High-intensity FTR chart

Your history:
Median performance: 9.84M

Primary challenge:
Dense alternating pattern
```

The latter transforms data into insight.

---

# 20. Avoid Premature AI

Do **not** begin with:

```text
LLM chatbot
AI recommendations
AI chart analysis
AI assistant
```

The correct order is:

```text
Reliable domain model
        ↓
Reliable chart data
        ↓
Reliable player statistics
        ↓
Deterministic analysis
        ↓
Recommendation algorithms
        ↓
ML
        ↓
LLM interface where genuinely useful
```

The AI layer should sit **above a strong data/product foundation**, not substitute for it.

---

# 21. Avoid Premature Chart Generation

Generating charts is considerably more ambitious than analyzing them.

Recommended research order:

```text
READ CHART
   ↓
PARSE CHART
   ↓
VISUALIZE CHART
   ↓
ANALYZE CHART
   ↓
COMPARE CHARTS
   ↓
MODEL DIFFICULTY
   ↓
RECOMMEND CHARTS
   ↓
ASSIST MAPPING
   ↓
GENERATE MAPS
```

Do not jump directly to the final step.

---

# 22. Avoid Copyright / Data Dependency Risk

Current README already recognizes an important constraint: source code is GPL-3.0-only, while Arcaea names, artwork, audio, charts, story text, screenshots and trademarks are not granted by that license; approved data integration is currently blocked.

Therefore architecture should separate:

```text
Core software
       │
       ├── generic schema
       ├── parser
       ├── analytics
       ├── visualization
       └── UI
       
Game-specific data
       │
       ├── external
       ├── optional
       ├── user-provided
       └── permission-controlled
```

The system should remain useful even without proprietary game assets.

---

# 23. Avoid Overbuilding the Platform

Potential scope explosion:

```text
Wiki
+ Database
+ Player Tracker
+ Recommendation
+ Chart Editor
+ Chart Generator
+ Social Network
+ Discord bot
+ AI chatbot
+ Mobile app
+ API
+ Marketplace
```

This will destroy focus.

The core loop should remain:

> **Discover → Play → Record → Understand → Improve → Play**

Everything else needs to justify its existence against this loop.

---

# 24. Architecture Principle

The eventual architecture should resemble:

```text
                 PRESENTATION
                      │
          ┌───────────┼───────────┐
          │           │           │
       Explorer    Player      Practice
          │         Profile      │
          └───────────┼───────────┘
                      │
               DOMAIN SERVICES
                      │
      ┌───────────────┼────────────────┐
      │               │                │
   Catalog         Scoring         Analytics
      │               │                │
   Charting       Progression    Recommendation
      └───────────────┼────────────────┘
                      │
                    DATA
                      │
        ┌─────────────┼─────────────┐
      Songs         Charts        Scores
```

The UI should consume **domain capabilities**, not raw database structures.

---

# 25. Research Roadmap

## R0 — Product Definition

Define:

```text
Who is the player?
What problem occurs before/during/after play?
What information is difficult to obtain?
What decision should Companion improve?
What does a successful session look like?
```

---

## R1 — Domain Reverse Engineering

Deep-study:

```text
Songs
Charts
Difficulty
Scoring
Potential
World Mode
Partners
Unlocks
Progression
```

Output:

> **Arcaea Domain Model**

---

## R2 — Rhythm Game Benchmark

Deep-study:

```text
Arcaea
osu!
Quaver
Etterna
StepMania
ScoreSaber
OpenChart
```

Output:

> **Rhythm Game Companion Benchmark**

---

## R3 — Charting Research

Deep-study:

```text
Timing
BPM
Offset
Time signature
Beat subdivision
Hit objects
Pattern
Density
Spatial structure
Difficulty
Mapping philosophy
```

Output:

> **Chart Representation & Analysis Model**

osu!'s editor is particularly valuable here because its workflow explicitly separates Compose, Design, Timing and Song Setup, while its timeline system exposes timing, objects and other temporal structures. ([osu!][9])

---

## R4 — Player Intelligence

Build research around:

```text
performance
consistency
difficulty progression
weakness detection
improvement
recommendation
```

Output:

> **Player Model**

---

## R5 — Companion UX

Design:

```text
Discovery
Song detail
Chart detail
Player profile
Score history
Compare
Practice
Recommendation
```

Output:

> **Companion UX system**

---

## R6 — Advanced Chart Intelligence

Research:

```text
chart parsing
feature extraction
pattern detection
difficulty modeling
chart similarity
personal difficulty
```

Output:

> **Chart Intelligence Engine**

---

# 26. Definition of “Professional”

Arcaea Companion should not be considered professional because it has:

```text
nice gradients
animations
responsive cards
dark mode
fancy landing page
```

It should be considered professional when:

```text
1. Information architecture is coherent.

2. Domain concepts are modeled correctly.

3. UI exposes useful decisions rather than raw data.

4. Large datasets remain navigable.

5. Player workflows are fast.

6. Chart information is technically accurate.

7. Performance metrics are explainable.

8. Visual identity is domain-specific.

9. Components form a consistent design system.

10. Accessibility and responsiveness are first-class.

11. Data provenance and licensing are explicit.

12. The system remains useful without an LLM.
```

Primer's design guidance is a useful reference for the last engineering layer because it explicitly combines design foundations, reusable components, patterns, responsive behavior and accessibility rather than treating UI as visual decoration. ([Primer][8])

---

# 27. Final Product North Star

```text
                    ARCAEA COMPANION
                           │
                "UNDERSTAND YOUR PLAY"
                           │
       ┌───────────────────┼───────────────────┐
       │                   │                   │
    EXPLORE              ANALYZE             IMPROVE
       │                   │                   │
     Songs               Scores              Practice
     Charts              Patterns            Goals
     Packs               Progress            Recommendations
     Players             Trends              Weaknesses
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                    PLAY AGAIN
                           │
                           ↺
```

**Strategic position:**

> **Arcaea Wiki is the starting point.
> Arcaea Companion is the decision-support system around playing Arcaea.**

The strongest long-term differentiation is therefore not **“more information”**, but:

> **structured game knowledge + chart intelligence + player modeling + actionable recommendations.**

And the deepest research opportunity is:

> **Chart → Pattern → Difficulty → Player → Performance → Recommendation**

That loop is the foundation that can eventually turn the project from a fan website into a serious **rhythm-game companion platform**.

[1]: https://scoresaber.com/rankings?utm_source=chatgpt.com "Player Rankings | ScoreSaber!"
[2]: https://github.com/OpenChartProject/OpenChart-web?utm_source=chatgpt.com "GitHub - OpenChartProject/OpenChart-web: A web-based editor for rhythm game charts/maps. (Etterna, osu!mania, Stepmania, Quaver) · GitHub"
[3]: https://arcaea.fandom.com/wiki/Potential?utm_source=chatgpt.com "Potential | Arcaea Wiki | Fandom"
[4]: https://osu.ppy.sh/wiki/en/Performance_points?utm_source=chatgpt.com "Performance points‬ · wiki‬ | ‭osu!‬"
[5]: https://osu.ppy.sh/wiki/en/Beatmapping?utm_source=chatgpt.com "Beatmapping‬ · wiki‬ | ‭osu!‬"
[6]: https://osu.ppy.sh/wiki/nl/Client/Beatmap_editor/Timing?utm_source=chatgpt.com "Beatmap editor / Timing tab‬ · wiki‬ | ‭osu!‬"
[7]: https://arcaea.fandom.com/wiki/World_Mode_Mechanics?utm_source=chatgpt.com "World Mode Mechanics | Arcaea Wiki | Fandom"
[8]: https://primer.github.io/design/?utm_source=chatgpt.com "Primer"
[9]: https://osu.ppy.sh/wiki/be/Client/Beatmap_editor?utm_source=chatgpt.com "Client / Beatmap editor‬ · wiki‬ | ‭osu!‬"
