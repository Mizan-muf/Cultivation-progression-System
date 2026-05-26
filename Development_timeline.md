# XANXIA — DEVELOPMENT TIMELINE

---

## Session 1 — 2026-05-26

### Document Organisation
- Rewrote `CULTIVATION PROGRESSION SYSTEM.md` from scratch.
- Removed embedded AI prompt from document body.
- Established a 4-section structure with a table of contents: Character Sheet, Core Rules, Cultivation Progression, Spirit Roots.
- Converted flat prose into structured sections, formatted tables, and clean field layouts throughout the character sheet and rules content.

---

### Core Resolution Mechanic (§2.3)
- **System:** 1d20 + relevant attribute modifier vs. GM-set DC.
- **Modifier formula:** `floor(attribute score / 3)` — every 3 points = +1 modifier (range: +0 at score 1–2 to +6 at score 18–20).
- Attribute-to-roll mapping defined for all six attributes across martial, spiritual, crafting, and breakthrough checks.

---

### HP & Qi Formulas (§2.4)
- **Max HP** = `(CON × Stage) + 10`
- **Max QI** = `(SPI × Stage) + 10`
- **Stage** = Major Realm number + Sub-Realm decimal offset (Early +0.00, Mid +0.25, Late +0.50, Peak +0.75).
- All results rounded down. Provides smooth incremental growth within realms and clear jumps across Major Realms.

---

### Combat System (§2.5)

**Initiative**
- Turn order set by fixed AGI score. Ties resolved by a 1d20 roll.

**Action Economy**
- 3 AP per turn. Unspent AP does not carry over.
- Basic attack: 1 AP | Any technique: 2 AP | Ultimate ability: 3 AP (full turn) | Move: 1 AP.
- Technique power balanced through Qi/Strain cost, not AP cost.

**Damage**
- Basic attack (no technique): damage = STR modifier (martial) or SPI modifier (spiritual). No Qi or Strain cost.
- Techniques define their own damage formula on the technique card.

**Defence — Two-Layer System**
- Layer 1 — Evasion: Opposed roll. Attacker rolls 1d20 + STR/SPI mod. Defender rolls 1d20 + AGI mod. Attacker must strictly exceed defender to hit.
- Layer 2 — Mitigation (passive, always active):
  - Physical DR = CON modifier + Equipment PD + Body Tempering skill bonus.
  - Spiritual DR = SPI modifier + Equipment SD + Spiritual Armour skill bonus.
  - Minimum 1 damage on a hit — mitigation cannot reduce to zero.

---

### Strain System (§2.6)

**Named Threshold Stages**

| Stage | Strain % | Roll Penalty | Max HP & QI Reduction |
| :---- | :------: | :----------: | :-------------------: |
| *(No penalty)* | 0–25% | — | — |
| Strained | 26–50% | −1 to all rolls | −25% |
| Overloaded | 51–75% | −3 to all rolls | −50% |
| Critical | 76–99% | −5 to all rolls | −75% |
| Death | 100% | Dao Foundation shatters | — |

**Triggers**
- Qi overdraft: Strain += full Qi cost of technique drawn from the body.
- Forbidden/cursed technique: Strain += listed cost on technique card.
- Tribulation failure: Strain += 25% of maximum Strain.
- HP drops to ≤10%: Strain rises to 25% of max — capped at Strained; cannot push beyond this threshold from injury alone.

**Recovery**
- Full rest (between sessions): clears all Strain.
- Meditation (in-session, out of combat): clears ~5–10% of max Strain per extended session.
- Restorative pills/items: fixed amount or full stage — defined per item.
- Sect healer / NPC treatment: one full stage per treatment period.

---

### Checklist Progress

| Status | Item |
| :----: | :--- |
| ✅ | Define core resolution mechanic |
| ✅ | Create HP and Qi formulas |
| ✅ | Define combat turn structure and action economy |
| ✅ | Create damage calculation formulas |
| ✅ | Establish defence mechanics (evasion, physical mitigation, spiritual mitigation) |
| ✅ | Separate additional defence system (equipment + Body Tempering / Spiritual Armour) |
| ✅ | Define interim Strain penalty thresholds |
| ✅ | Specify Strain triggers and clearing methods |

---

### Remaining Open Items (as of end of session)
- Balancing matrix — Qi/Strain costs vs. damage output for techniques.
- EXP thresholds per Realm and Rank.
- Breakthrough mechanical bonuses.
- HP and Qi recovery rates (rest, meditation, pills).
- Comprehension mechanics (INT-based technique learning).
- Cultivation technique switching rules and penalties.
- Crafting: raw material requirements, time costs, failure consequences.
- Magic Treasure attunement limits and item activation rules.
- Web-based character sheet and party database frontend.
- Realm-specific skill unlock list (one skill per realm, 8 total).
- Strain system rework: recalibrate triggers/recovery to 0–20 point scale.

---

## Session 2 — 2026-05-26

### HP & Qi Recovery (§2.4)
- Short Rest (1 hour): recover 25% Max HP + 25% Max Qi. Max 2 per session (GM discretion).
- Extended Meditation (4 hours): fully restores HP + Qi; clears 1 Strain Level; consumes both Short Rest uses.
- Full Rest (between sessions): full restore, all Strain cleared.
- Passive Qi regen in combat: +SPI modifier per turn base rate.
- Items in combat cost 1 AP. Item specifics deferred to item card system.

### SE Thresholds & Award Tables (§3.2)
- SE resets to 0 upon entering a new Major Realm.
- Thresholds defined for all 8 realms (Body Tempering → Immortal Ascension).
- Award tables defined per realm for Minor/Major encounters and Story Milestones.
- Meditation SE formula: (1d20 + SPI mod + INT mod) × Cultivation Technique Multiplier × Spirit Root Environment Multiplier.

### Realm Names
- Established 8 Major Realm names: Body Tempering, Qi Condensation, Foundation Establishment, Core Formation, Nascent Soul, Soul Transformation, Void Tribulation, Immortal Ascension.

### Breakthrough Bonuses (§3.4)
- Sub-Realm advancement: +1 Attribute Point.
- Major Realm breakthrough: +3 Attribute Points, Equipment Tier Unlock, Max Strain +1, Technique Realm Unlock, Realm Skill Unlock (TBD).
- Cultivation Regression: −1 attr per Sub-Realm lost, −3 attr per Major Realm lost.
- Strain Capacity Scaling: base 12 at Realm 1, +1 per breakthrough, caps at 20 at Realm 8. Thresholds at quarter intervals.

### Comprehension Mechanics (§3.5)
- Roll: 1d20 + INT modifier vs. DC 12–27 (scales steeply by realm).
- Hard realm gate — cannot attempt techniques above current realm.
- Downtime: 1–13 Downtime Units (1 DU = 1 in-game week).
- DC modifiers for master instruction, written manual, element match, related technique, Strain state.
- No limit on techniques learned.

### Cultivation Technique Switching (§3.6)
- Roll: 1d20 + SPI modifier vs. DC 12 + current Realm level.
- Requires 1 Downtime Unit; Strain must be below Overloaded before attempt.
- Success: Strain +1. Failure: Strain +2. Critical Failure: Strain +3, locked for 2 DU.

### AP System Rework (§2.5)
- Techniques now cost 1, 2, or 3 AP as defined per technique card (previously flat 2 AP).
- 3 AP techniques consume the full turn, same as Ultimates.
- Ultimates remain a separate category with cooldowns/use limits defined per card.

### Checklist Progress
| Status | Item |
| :----: | :--- |
| ✅ | Calculate precise EXP thresholds |
| ✅ | Define breakthrough mechanical bonuses |
| ✅ | Establish HP and Qi recovery rates |
| ✅ | Establish comprehension mechanics |
| ✅ | Define cultivation technique switching rules |

### Remaining Open Items (as of end of session)
- Balancing matrix — Qi/Strain costs vs. damage output for techniques.
- Crafting: raw material requirements, time costs, failure consequences.
- Magic Treasure attunement limits and item activation rules.
- Realm-specific skill unlock list (8 realms).
- ~~Strain system rework: recalibrate all triggers to 0–20 point scale.~~ *(completed Session 3)*
- Web-based character sheet and party database frontend.

---

## Session 3 — 2026-05-26

### Strain System Rework (§2.6)

**Problem resolved:** §2.6 used mixed notation (percentage thresholds in trigger language vs. the absolute 0–20 point scale defined in §3.4). The flagged note in §3.4 has been cleared.

**Changes made:**

**§2.6 Threshold Stages**
- Added introductory note establishing that Strain is tracked as an absolute point value against Maximum Strain (see §3.4 for per-realm values).
- Added inline quick-reference table showing discrete breakpoints at Realms 1, 4, and 8.
- Kept percentage notation in the main threshold table as a conceptual reference; absolute values now co-exist in the new reference table.

**§2.6 Strain Triggers — Qi Overdraft**
- Removed: `Strain += full Qi cost of the technique`. This rule broke at higher realms where Qi costs scale into the tens–hundreds but Max Strain only reaches 20.
- Replaced with a **Qi Cost Bracket Table** (5 brackets: 1–8 Qi → +1 Strain, up to 66+ Qi → +5 Strain). Caps overdraft Strain at +5 max — punishing but never instantly fatal from a single use.
- Calibrated to expected technique Qi cost ranges per realm tier. Flagged for review after balancing matrix is defined.

**§2.6 Strain Triggers — Tribulation Failure**
- Added per-realm-bracket discrete values: Realms 1–2: +3, Realms 3–6: +4, Realms 7–8: +5 (derived from 25% of Max Strain, rounded to nearest whole).

**§2.6 Strain Triggers — Grievous Injury**
- Clarified "rises to 25% of max" with per-realm-bracket discrete floor values: Realms 1–2: floor 3, Realms 3–6: floor 4, Realms 7–8: floor 5.

**§2.6 Strain Recovery — Meditation**
- Removed contradictory "5–10% of max Strain" language.
- Replaced with: "Clears 1 Strain stage" — consistent with the Extended Meditation rule in §2.4.

**§3.4 Strain Capacity Scaling**
- Removed the flagged rework note.

### Checklist Progress
| Status | Item |
| :----: | :--- |
| ✅ | Strain system rework — recalibrate all triggers and recovery to 0–20 absolute scale |

### Remaining Open Items (as of end of session)
- Balancing matrix — Qi/Strain costs vs. damage output for techniques.
- Crafting: raw material requirements, time costs, failure consequences.
- Magic Treasure attunement limits and item activation rules.
- Realm-specific skill unlock list (8 realms, one per Major Realm breakthrough).
- Web-based character sheet and party database frontend.
