# XANXIA — CULTIVATION TTRPG RULESET

---

## TABLE OF CONTENTS

0. [Character Creation](#0-character-creation)
1. [Character Sheet](#1-character-sheet)
2. [Core Rules](#2-core-rules)
   - 2.1 Core Attributes
   - 2.2 Core Resources
   - 2.3 Core Resolution Mechanic
   - 2.4 HP & Qi Formulas
     - HP & Qi Recovery
   - 2.5 Combat
   - 2.6 Strain System
3. [Cultivation Progression](#3-cultivation-progression)
   - 3.1 Realm & Rank Structure
   - 3.2 Spirit Energy (SE) System
     - SE Thresholds
     - Typical SE Awards
     - Meditation SE Gain
   - 3.3 Peak State & Overconsumption
   - 3.4 Major Realm Breakthroughs (Tribulations)
     - Sub-Realm Advancement Bonuses
     - Major Realm Breakthrough Bonuses
     - Cultivation Regression
     - Strain Capacity Scaling
   - 3.5 Comprehension Mechanics
   - 3.6 Cultivation Technique Switching
   - 3.7 Realm Skill List
4. [Spirit Roots](#4-spirit-roots)
   - 4.1 Trade-Off Spectrum
   - 4.2 Spirit Root Grades
   - 4.3 Breakthrough Difficulty Modifiers
   - 4.4 System Synergy Notes
5. [Technique Design Matrix](#5-technique-design-matrix)
   - 5.1 Design Variables
   - 5.2 AP Cost as a Rough Power Signal
   - 5.3 Qi Cost Reference
   - 5.4 Damage Output Reference
   - 5.5 Utility Techniques
   - 5.6 Effect Scope by Realm and Rank
   - 5.7 Strain Costs for Forbidden Techniques
   - 5.8 Worked Examples
6. [Crafting](#6-crafting)
   - 6.1 Material Tiers
   - 6.2 Crafting Time Costs
   - 6.3 Profession Rank Gate
   - 6.4 Crafting Failure Consequences
   - 6.5 Profession Rank Advancement
7. [Magic Treasures](#7-magic-treasures)
   - 7.1 Attunement Slots
   - 7.2 Realm Gate
   - 7.3 Binding Types
   - 7.4 Breaking a Binding
   - 7.5 Item Activation Rules
8. [Beast System](#8-beast-system)
   - 8.1 Beast Attributes
   - 8.2 Taming Prerequisites
   - 8.3 Taming Resolution
   - 8.4 Tamed Companions & Companion Slots
   - 8.5 Beasts as Mounts
   - 8.6 Loot & Drops

---

## 0. CHARACTER CREATION

### Starting Attributes

New characters begin at **Realm 1 (Body Tempering), Early Sub-Realm** and distribute **20 points** across all six core attributes:

| Constraint | Rule |
| :--------- | :--- |
| Minimum per attribute at creation | 1 |
| Maximum per attribute at creation | 8 |
| Total points to distribute | 20 |

All 20 points must be fully spent before play begins. Additional attribute points are earned through Sub-Realm advancement (+1 per Sub-Realm) and Major Realm breakthroughs (+3 per Major Realm).

### Starting State

| Field | Starting Value |
| :---- | :------------- |
| Realm | 1 — Body Tempering |
| Rank | Early |
| Spirit Energy (SE) | 0 |
| Strain | 0 / 12 |
| Max HP | floor(CON × 1.00) + 10 |
| Max Qi | floor(SPI × 1.00) + 10 |
| Attunement Slots | 1 |
| Unspent Attribute Points | 0 |

### Spirit Root & Physique

Both are determined randomly during character creation using the Cultivation Wheel spinners. See §4 for full mechanics. Spirit Root determines elemental affinity, SE gain rate, and breakthrough difficulty. Physique grants passive traits defined per physique type.

---

## 1. CHARACTER SHEET

### CULTIVATOR CHARACTER SHEET

**Name:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | **Daoist Title:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | **Sect/Clan:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | **Path/Alignment:** \_\_\_\_\_\_\_\_\_\_\_\_\_

---

### PROGRESSION & INNATE TALENT

| Field | Value |
| :---- | :---- |
| Realm | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ *(e.g., Qi Condensation, Foundation Establishment)* |
| Rank | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ *(e.g., Early, Mid, Late, Peak)* |
| Cultivation Points (EXP) | \[ \] / \[ \] |
| Spirit Root | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ *(e.g., Heavenly Fire, Mutated Lightning, Mortal Five-Element)* |
| Physique / Bloodline | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ *(e.g., Primordial Sword Body, Ancient Dragon Bloodline)* |

---

### CORE ATTRIBUTES

| Attribute | Score | Description |
| :-------- | :---: | :---------- |
| **STR** (Strength) | \[ \] | Physical power, melee weapon damage, raw force |
| **AGI** (Agility) | \[ \] | Evasion, movement speed, reaction speed, weapon mastery |
| **CON** (Constitution) | \[ \] | Physical toughness, maximum HP, poison/debuff resistance |
| **SPI** (Spirit) | \[ \] | Spiritual power, Qi pool size, spell damage, Qi barrier strength |
| **INT** (Intelligence) | \[ \] | Comprehension speed, calculation, array and talisman complexity |
| **CRM** (Charm) | \[ \] | Negotiation, beast taming affinity, sect reputation, social luck |

---

### CORE RESOURCES

**HP (Hit Points):** \[ \] / \[ \] *(Modified by CON)*
Your physical health. If reduced to 0, you fall unconscious or face physical death.

**QI (Spiritual Energy):** \[ \] / \[ \] *(Modified by SPI)*
The energy used to fuel spells, techniques, and ultimate abilities.

**STRAIN (Soul/Body Limit):** \[ \] / \[ \]
Gained from overusing Qi, casting forbidden arts, or sustaining grievous injuries. If the Strain gauge fills completely, your Dao Foundation shatters — character death.

---

### ACTIVE COMBAT SKILLS

#### Martial / Weapon Techniques
*Physical/Melee/Weapon Arts — Scales with STR/AGI*

| # | Name | Qi Cost | Strain Cost | Effect |
| :-: | :--- | :-----: | :---------: | :----- |
| 1 | \_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_ | \_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| 2 | \_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_ | \_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| 3 | \_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_ | \_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |

#### Spiritual Spells
*Ranged/Magic/Elemental Arts — Scales with SPI*

| # | Name | Qi Cost | Strain Cost | Effect |
| :-: | :--- | :-----: | :---------: | :----- |
| 1 | \_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_ | \_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| 2 | \_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_ | \_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| 3 | \_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_ | \_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |

#### Movement Techniques
*Mobility/Evasion — Scales with AGI*

| # | Name | Qi Cost | Strain Cost | Effect |
| :-: | :--- | :-----: | :---------: | :----- |
| 1 | \_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_ | \_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| 2 | \_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_ | \_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |

---

### PASSIVE SKILLS & CULTIVATION ARTS

#### Primary Cultivation Technique
*Only ONE Cultivation Technique can be active at a time.*

- **Name:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
- **Passive Effect:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

#### Other Passive Arts & Skills
*Body Tempering, Weapon Intents, Luck, etc.*

| Skill | Effect |
| :---- | :----- |
| \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |

---

### ULTIMATE ABILITIES
*World-bending powers — e.g., Domain Expansion, Nascent Soul Projection, Dharma Avatar*

| Field | Entry 1 | Entry 2 |
| :---- | :------ | :------ |
| **Name** | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| **Activation Cost** | \_\_\_ Qi / \_\_\_ Strain | \_\_\_ Qi / \_\_\_ Strain |
| **Duration** | \_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_ |
| **Cooldown / Uses** | \_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_ |
| **Description & Effects** | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |

---

### CRAFTING & AUXILIARY SKILLS (Life Professions)

| Profession | Rank | Relevant Stat | Specialization / Notes |
| :--------- | :---------: | :-----------: | :--------------------- |
| **Alchemy** *(Pills/Potions)* | \[ \] | **INT** | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| **Weapon Refining** *(Forging)* | \[ \] | **STR** | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| **Array Master** *(Formations/Traps)* | \[ \] | **SPI** | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| **Talisman Crafting** *(Scrolls/Paper)* | \[ \] | **AGI** | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| **Beast Taming** *(Pets/Mounts)* | \[ \] | **CRM** | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |

---

### INVENTORY / NOTES / MAGIC TREASURES

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## 2. CORE RULES

### 2.1 Core Attributes

Six attributes define a cultivator's physical, mental, and spiritual capacity:

- **STR (Strength):** Physical power, melee damage, raw force.
- **AGI (Agility):** Evasion, movement speed, reaction, weapon mastery.
- **CON (Constitution):** Physical toughness, maximum HP, resistance to poison and debuffs.
- **SPI (Spirit):** Spiritual power, Qi pool size, spell damage, Qi barrier strength.
- **INT (Intelligence):** Comprehension speed, calculation, array and talisman complexity.
- **CRM (Charm):** Negotiation, beast taming affinity, sect reputation, social luck.

### 2.2 Core Resources

**Qi**
The expendable resource pool used to execute combat abilities, spells, and physical techniques. Regenerates via rest or specific abilities.

**Spirit Energy (SE)**
The cumulative progression resource used to advance cultivation ranks. Acquired by completing sessions, surviving encounters, and consuming spiritual items. SE is not consumed upon leveling — it accumulates until thresholds are met.

**Strain**
Accumulated from overusing Qi, casting forbidden arts, or sustaining grievous injuries. Intermediate thresholds impose escalating penalties. At maximum, the Dao Foundation shatters — permanent character death.

---

### 2.3 Core Resolution Mechanic

All contested rolls and checks use:

> **1d20 + relevant attribute modifier vs. DC**

**Attribute modifier formula:** `floor(attribute score / 3)`

| Score | Modifier |
| :---: | :------: |
| 1–2 | +0 |
| 3–5 | +1 |
| 6–8 | +2 |
| 9–11 | +3 |
| 12–14 | +4 |
| 15–17 | +5 |
| 18–20 | +6 |

**Attribute-to-roll mapping:**

| Check Type | Attribute Used |
| :--------- | :------------- |
| Martial attacks / physical actions | STR or AGI |
| Spiritual spells / Qi techniques | SPI |
| Evasion | AGI |
| Resistance (poison, debuffs) | CON |
| Alchemy| INT |
| Weapon Refining | STR |
| Beast Taming | CRM |
| Breakthrough (Tribulation) | SPI — modified by Spirit Root grade (see §4.3) |

---

### 2.4 HP & Qi Formulas

Maximum HP and Qi scale with the character's current **Stage** — a decimal value derived from their Major Realm and Sub-Realm rank.

**Stage value:**

| Sub-Realm | Decimal Offset | Stage (Realm N) |
| :-------- | :------------: | :-------------: |
| Early | +0.00 | N.00 |
| Mid | +0.25 | N.25 |
| Late | +0.50 | N.50 |
| Peak | +0.75 | N.75 |

**Formulas:**

> **Max HP = (CON × Stage) + 10**
> **Max QI = (SPI × Stage) + 10**

**Sample values at CON/SPI = 9:**

| Realm | Rank | Stage | Max HP | Max QI |
| :---: | :--- | :---: | :----: | :----: |
| 1 | Early | 1.00 | 19 | 19 |
| 1 | Peak | 1.75 | 26 | 26 |
| 4 | Early | 4.00 | 46 | 46 |
| 4 | Peak | 4.75 | 53 | 53 |
| 8 | Early | 8.00 | 82 | 82 |
| 8 | Peak | 8.75 | 89 | 89 |

Round all results down to the nearest whole number.

#### HP & Qi Recovery

**Short Rest** (1 hour, outside combat):
- Recover **25% of Max HP** and **25% of Max Qi** (rounded down).
- Maximum **2 per in-session period** (GM may allow additional rests at their discretion).
- No Strain is cleared.

**Extended Meditation** (4 hours, uninterrupted, outside combat):
- Fully restores **Max HP** and **Max Qi**.
- Clears **1 Strain Level** (Critical → Overloaded → Strained → Clear).
- Consumes both Short Rest uses for the session.

**Full Rest** (complete downtime between sessions):
- Fully restores **Max HP** and **Max Qi**.
- Clears **all Strain**.

**Passive Qi Regeneration (Combat):**
- Base: **+SPI modifier Qi per turn** (recovered at the start of each turn).
- Techniques, passive skills, and Magic Treasures may increase this rate.
- No natural HP regeneration in combat.

**Items in Combat:** Consuming a recovery item costs **1 AP**. Item-specific effects are defined per item card.

---

### 2.5 Combat

#### Initiative

Turn order is determined by each combatant's raw **AGI score** at the start of combat — no roll required. Higher AGI acts first. Ties are broken by a **1d20 roll** (higher result wins); re-roll on a second tie.

#### Action Points (AP)

Each combatant receives **3 AP** at the start of their turn. Unspent AP does not carry over.

| Action | AP Cost |
| :----- | :-----: |
| Basic attack | 1 |
| Technique (Martial, Spiritual, or Movement) | 1, 2, or 3 — defined on the technique card |
| Ultimate ability | 3 (full turn) |
| Move | 1 |

- Techniques with a 3 AP cost consume the full turn — no other actions may be taken.
- Ultimate abilities always cost 3 AP and consume the full turn. Cooldown and use limits are defined per ability card.
- All other AP combinations are free (e.g., 1 AP technique + 1 AP move + 1 AP basic attack).

#### Basic Attack (No Technique)

When a character attacks without using a technique, apply the following base damage:

| Attack Type | Damage |
| :---------- | :----- |
| Martial (weapon / unarmed) | weapon Stats/STR modifier x d4 |
| Spiritual (raw Qi burst) | SPI modifier x d4 |

Basic attacks cost **no Qi and no Strain**.

#### Technique Damage

Each technique defines its own damage formula on the technique card. There is no universal formula. The character sheet fields **Cost (Qi)**, **Strain**, and **Effect** are the authoritative source for a technique's output.

#### Defense

Combat damage is resolved in two sequential layers: **evasion**, then **mitigation**.

**Layer 1 — Evasion (Opposed Roll)**

All attacks, martial or spiritual, are contested:

> Attacker rolls **1d20 + STR mod** (martial) or **1d20 + SPI mod** (spiritual)
> Defender rolls **1d20 + AGI mod**

- Attacker's result **strictly exceeds** the defender's result → Hit. Proceed to mitigation.
- Attacker's result **equals or is lower** than the defender's result → Miss. No damage.

**Layer 2 — Damage Mitigation (Passive, Always Active)**

If the attack hits, calculate total damage reduction before subtracting from HP:

**Physical DR** = CON modifier + Equipment PD + Body Tempering skill bonus

**Spiritual DR** = SPI modifier + Equipment SD + Spiritual Armour skill bonus

| Attack Type | Reduction Applied |
| :---------- | :---------------- |
| Martial / physical | Subtract **Physical DR** from incoming damage |
| Spiritual / Qi-based | Subtract **Spiritual DR** from incoming damage |

Minimum damage after mitigation is **1** — mitigation cannot reduce a hit to zero.

**DR Source Reference:**

| Source | Physical DR | Spiritual DR |
| :----- | :---------: | :----------: |
| Passive (always active) | CON modifier | SPI modifier |
| Equipment | PD value of equipped armor/gear | SD value of equipped artifacts/gear |
| Body Tempering skill | Bonus defined per skill rank | — |
| Spiritual Armour skill | — | Bonus defined per skill rank |

---

### 2.6 Strain System

Strain represents cumulative damage to a cultivator's Dao Foundation — the spiritual and physical cost of pushing beyond safe limits. It is tracked as a gauge: **current Strain / maximum Strain**.

#### Threshold Stages

Strain is tracked as an absolute point value against the character's current **Maximum Strain** (see §3.4 for per-realm values — base 12 at Realm 1, capping at 20 at Realm 8). Thresholds fall at quarter intervals of that maximum.

| Stage | Strain Range | Roll Penalty | Max HP & QI Reduction |
| :---- | :----------: | :----------: | :-------------------: |
| *(No penalty)* | 0 – 25% of max | — | — |
| **Strained** | 26 – 50% of max | −1 to all rolls | −25% |
| **Overloaded** | 51 – 75% of max | −3 to all rolls | −50% |
| **Critical** | 76 – 99% of max | −5 to all rolls | −75% |
| **Death** | 100% of max (at max) | Dao Foundation shatters — character death | |

**Quick reference — discrete thresholds at key realms:**

| Realm | Max Strain | No Penalty | Strained | Overloaded | Critical | Death |
| :---: | :--------: | :--------: | :------: | :--------: | :------: | :---: |
| 1 | 12 | 0–3 | 4–6 | 7–9 | 10–11 | 12 |
| 4 | 15 | 0–3 | 4–7 | 8–11 | 12–14 | 15 |
| 8 | 20 | 0–5 | 6–10 | 11–15 | 16–19 | 20 |

*(Full table for all 8 realms is in §3.4.)*

HP and QI reductions are applied to the **current maximum** after Stage and attribute formulas are calculated. If current HP or QI exceeds the reduced maximum, it is immediately capped.

#### Strain Triggers

| Trigger | Strain Generated |
| :------ | :--------------- |
| **Qi overdraft** — using a technique when Qi pool is at 0 | Strain += amount from the Overdraft table below (based on the technique's Qi cost) |
| **Forbidden / cursed technique** — technique card lists a Strain cost | Strain += the listed Strain cost, paid on use regardless of Qi level |
| **Tribulation failure** — failing a breakthrough roll | Strain += amount from the Tribulation Failure table below |
| **Grievous injury** — HP drops to 10% or below | Strain rises to the Strained floor value if currently below it — this trigger cannot push Strain into Overloaded or beyond |

**Qi Overdraft Strain Cost** *(based on the technique's Qi cost; minimum 1 Strain)*

| Technique Qi Cost | Strain Generated |
| :---------------: | :--------------: |
| 1–8 | +1 |
| 9–20 | +2 |
| 21–40 | +3 |
| 41–65 | +4 |
| 66+ | +5 |

*These brackets are calibrated to expected Qi cost ranges per realm. See §5.3 for Qi cost reference by realm and rank.*

**Tribulation Failure Strain** *(25% of Max Strain, rounded to nearest whole number)*

| Realms | Strain Added |
| :----: | :----------: |
| 1–2 | +3 |
| 3–6 | +4 |
| 7–8 | +5 |

**Grievous Injury — Strained Floor** *(Strain rises to this value if currently below it)*

| Realms | Strained Floor |
| :----: | :------------: |
| 1–2 | 3 |
| 3–6 | 4 |
| 7–8 | 5 |

#### Strain Recovery

| Method | Amount Cleared |
| :----- | :------------- |
| **Full rest** (downtime between sessions) | Clears **all Strain** |
| **Extended Meditation** (4 hours, in-session, outside combat) | Clears **1 Strain stage** (e.g., Critical → Overloaded → Strained → Clear). Consistent with §2.4. |
| **Restorative pill or item** | Clears a fixed amount or a full stage — defined per item |
| **Sect healer / NPC treatment** | Clears one full stage per treatment period — requires downtime and access to a qualified healer |

---

## 3. CULTIVATION PROGRESSION

### 3.1 Realm & Rank Structure

- **Major Realms:** 8 Major Realms total — Body Tempering, Qi Condensation, Foundation Establishment, Core Formation, Nascent Soul, Soul Transformation, Void Tribulation, Immortal Ascension.
- **Sub-Realms:** Each Major Realm contains 4 Sub-Realms — Early, Mid, Late, Peak.
- **Sub-Realm Advancement:** Reaching a new Sub-Realm grants **+1 Attribute Point** (freely distributed) plus minor incremental increases to maximum HP and Qi from the Stage formula.
- **Major Realm Advancement:** Crossing into a new Major Realm grants substantial structural boosts (see §3.4 Breakthrough Bonuses).

### 3.2 Spirit Energy (SE) System

- SE is cumulative within a Major Realm and is **not consumed** upon Sub-Realm advancement.
- Reaching the designated SE threshold automatically unlocks the next Sub-Realm.
- Upon successfully crossing into a new Major Realm (Tribulation passed), SE **resets to 0** for the new realm's progression cycle.
- A character's accumulated SE is **static by default** within a realm — it only decreases under adverse conditions: failing a Tribulation, sustaining targeted spiritual injuries, or suffering severe negative status effects.

#### SE Thresholds (per Major Realm, resets at breakthrough)

*Accumulation ceases upon reaching Peak Sub-Realm. Must pass a Tribulation to progress further.*

| Realm | Major Realm Name | Early → Mid | Mid → Late | Late → Peak |
| :---: | :--------------- | :---------: | :--------: | :---------: |
| 1 | Body Tempering | 400 | 900 | 1,500 |
| 2 | Qi Condensation | 1,000 | 2,200 | 4,000 |
| 3 | Foundation Establishment | 2,500 | 5,500 | 10,000 |
| 4 | Core Formation | 6,000 | 13,000 | 25,000 |
| 5 | Nascent Soul | 15,000 | 33,000 | 60,000 |
| 6 | Soul Transformation | 37,000 | 82,000 | 150,000 |
| 7 | Void Tribulation | 90,000 | 200,000 | 375,000 |
| 8 | Immortal Ascension | 220,000 | 490,000 | 900,000 |

#### Typical SE Awards (True / 3-Element Spirit Root base rate)

*Spirit Root EXP bonus multiplies all SE earned (e.g., Pure (Heavenly) Root = ×2.0 all SE).*

| Realm | Minor Encounter | Major Encounter | Story Milestone |
| :---: | :-------------: | :-------------: | :-------------: |
| 1 | 25 | 65 | 100 |
| 2 | 65 | 160 | 250 |
| 3 | 160 | 400 | 625 |
| 4 | 400 | 1,000 | 1,550 |
| 5 | 1,000 | 2,500 | 3,800 |
| 6 | 2,500 | 6,200 | 9,500 |
| 7 | 6,200 | 15,500 | 23,500 |
| 8 | 15,500 | 39,000 | 58,000 |

*Scale reference: approximately 8–10 sessions to complete a full Major Realm at base rate.*

#### Meditation SE Gain

Extended Meditation (4 hours) generates SE in addition to restoring HP, Qi, and clearing Strain. Roll once per meditation period:

> **Meditation SE = (1d20 + SPI mod + INT mod) × Cultivation Technique Multiplier × Spirit Root Environment Multiplier**

**Spirit Root Environment Multiplier** — drawn from §4.2:

| Spirit Root | Matching Biome | Multiplier |
| :---------- | :------------- | :--------: |
| Pure (Heavenly) | Pure Biome | ×2.0 |
| Dual | Dual Biome | ×1.75 |
| True (3-Element) | Triple Biome | ×1.5 |
| Spurious | Quad Biome | ×1.25 |
| Mortal (5-Element) | Anywhere | ×1.0 |
| Any root | Non-matching biome | ×1.0 |

**Cultivation Technique Multiplier** — defined per Primary Cultivation Technique card (system TBD).

**Example** *(SPI 9, INT 9 → both mod +3; True (3-Element) root in matching biome, no technique multiplier yet)*:
> Roll 14 + 3 + 3 = 20 × 1.5 = **30 SE**

Meditation SE is supplementary — active encounters and story milestones remain the primary progression drivers.

### 3.3 Peak State & Overconsumption

- Upon reaching the **Peak Sub-Realm**, standard SE accumulation from sessions and encounters **ceases**.
- Attempting to force progression by consuming SE-generating pills, herbs, or monster cores while at Peak overloads the sealed vessel — triggering a destructive internal reaction resulting in massive physical damage, Qi deviation, or temporary meridian sealing.

### 3.4 Major Realm Breakthroughs (Tribulations)

**Requirement:** Advancing from a Peak Sub-Realm to the Early Sub-Realm of the next Major Realm requires initiating and passing a Tribulation event.

**Alchemical Mitigation:** Consuming specific monster cores, specialized pills, or reagents prior to the attempt reduces the difficulty of breakthrough rolls or provides mechanical protection against backlash effects.

**Tribulation Failure — Backlash Consequences (variable):**
- Loss of accumulated SE or permanent reduction of the SE cap
- Demotion by one full Sub-Realm (Peak → Late)
- Temporary or permanent reduction in maximum HP or Qi capacity
- Infliction of chronic elemental vulnerabilities or conditions
- Severe internal trauma requiring prolonged downtime to recover

---

#### Sub-Realm Advancement Bonuses

Each time a character advances from one Sub-Realm to the next (Early → Mid → Late → Peak) within a Major Realm:

- **+1 Attribute Point** — freely distributed among any of the six core attributes.

#### Major Realm Breakthrough Bonuses

Upon successfully completing a Tribulation and entering the Early Sub-Realm of the next Major Realm, the character gains **all** of the following:

| Bonus | Detail |
| :---- | :----- |
| **+3 Attribute Points** | Freely distributed among any attributes |
| **Equipment Grade Unlock** | Can now attune to and use artifacts of the next realm grade |
| **Max Strain +1** | Permanent increase to Strain capacity (see Strain Capacity Scaling below) |
| **Technique Realm Unlock** | Can now learn techniques native to the new Major Realm |
| **Realm Skill Unlock** | Gain one realm-specific passive or active skill — see §3.7 Realm Skill List |

#### Cultivation Regression

When a character is demoted by adverse conditions (Tribulation failure, spiritual injury, etc.), previously gained attribute points are lost:

- **−1 Attribute Point per Sub-Realm lost**
- **−3 Attribute Points per Major Realm lost**

#### Strain Capacity Scaling

Maximum Strain starts at **12** at Realm 1 and increases by **+1 per Major Realm breakthrough**, capping at **20** upon reaching Immortal Ascension. Thresholds remain at quarter intervals.

| Realm | Major Realm | Max Strain | Clear | Strained | Overloaded | Critical | Death |
| :---: | :---------- | :--------: | :---: | :------: | :--------: | :------: | :---: |
| 1 | Body Tempering | 12 | 0–3 | 4–6 | 7–9 | 10–11 | 12 |
| 2 | Qi Condensation | 13 | 0–3 | 4–6 | 7–9 | 10–12 | 13 |
| 3 | Foundation Establishment | 14 | 0–3 | 4–7 | 8–10 | 11–13 | 14 |
| 4 | Core Formation | 15 | 0–3 | 4–7 | 8–11 | 12–14 | 15 |
| 5 | Nascent Soul | 16 | 0–4 | 5–8 | 9–12 | 13–15 | 16 |
| 6 | Soul Transformation | 17 | 0–4 | 5–8 | 9–12 | 13–16 | 17 |
| 7 | Void Tribulation | 18 | 0–4 | 5–9 | 10–13 | 14–17 | 18 |
| 8 | Immortal Ascension | 20 | 0–5 | 6–10 | 11–15 | 16–19 | 20 |


---

### 3.5 Comprehension Mechanics

Learning a technique requires: access to it (master's instruction, written manual, or witnessed in combat) + a Comprehension Roll + Downtime.

**1 Downtime Unit = 1 in-game week.**

**Roll:** 1d20 + INT modifier vs. DC

Techniques are **hard-gated by Realm** — a character cannot attempt to learn a technique from a Realm they have not yet reached.

| Technique Realm | Realm Name | DC | Downtime Units |
| :-------------: | :--------- | :-: | :------------: |
| 1 | Body Tempering | 12 | 1 |
| 2 | Qi Condensation | 15 | 2 |
| 3 | Foundation Establishment | 17 | 3 |
| 4 | Core Formation | 19 | 4 |
| 5 | Nascent Soul | 21 | 6 |
| 6 | Soul Transformation | 23 | 8 |
| 7 | Void Tribulation | 25 | 10 |
| 8 | Immortal Ascension | 27 | 13 |

**DC Modifiers:**

| Condition | DC Modifier |
| :-------- | :---------: |
| Learning from a live Master | −3 |
| Written manual available | −1 |
| Spirit Root element matches technique element | −2 |
| Knows a related technique (same school) | −1 |
| Current Strain is Overloaded or higher | +2 |

**No limit** on total techniques learned — only time and Realm gate progression.

**Failure:** Time is spent. Reattempt on the next Downtime Unit.

**Critical Failure (nat 1):** Internalized flaw — next attempt at this specific technique costs double Downtime Units.

---

### 3.6 Cultivation Technique Switching

A character may only have one **Primary Cultivation Technique** active at a time. Switching requires purging the current technique's Qi pathways from the meridian network.

**Requirements:**
- Current Strain must be below the Overloaded threshold before switching begins.
- 1 Downtime Unit (1 in-game week) of uninterrupted secluded cultivation.

**Roll:** 1d20 + SPI modifier vs. **DC 12 + current Realm level**

| Realm | Effective DC |
| :---: | :----------: |
| 1 | 13 |
| 2 | 14 |
| 3 | 15 |
| 4 | 16 |
| 5 | 17 |
| 6 | 18 |
| 7 | 19 |
| 8 | 20 |

| Result | Outcome |
| :----- | :------ |
| **Success** | Technique switches. Strain +1. |
| **Failure** | Switch fails. Strain +2. Reattempt allowed next Downtime Unit. |
| **Critical Failure (nat 1)** | Switch fails. Strain +3. Cannot reattempt for 2 Downtime Units. |

Strain cost on success is unavoidable — purging old Qi pathways damages the meridian network regardless of outcome.

---

### 3.7 Realm Skill List

Each Major Realm breakthrough grants one realm-specific skill. Skills are fixed — every character entering a given realm gains the same skill. Skills persist permanently and do not require activation slots.

---

#### Realm 1 — Body Tempering — Tempered Body *(Passive)*

**Combat:** Gain permanent +1 Physical DR. Stacks with all other Physical DR sources.

**Utility:** Immune to non-magical environmental hazards. Extreme temperatures, rough terrain, and altitude impose no movement penalties or damage. No longer requires sleep — 1 hour of stillness counts as a full night's rest for non-cultivation purposes.

---

#### Realm 2 — Qi Condensation — Qi Sense *(Passive)*

**Combat:** Can identify the realm of any cultivator within 30 feet if they are of equal or lower realm. Cultivators of a higher realm register only as an unreadable presence — their exact realm cannot be determined.

**Utility:** Passively detect Qi in objects, locations, and living beings within 30 feet. Can roughly identify the realm grade of spiritual materials and detect active formations or arrays. Instinctively knows whether a potential meditation site carries a favorable Spirit Root environment multiplier (§3.2).

---

#### Realm 3 — Foundation Establishment — Unshakeable Foundation *(Passive)*

Strain from Tribulation failure is reduced by 1 (minimum 1). Extended Meditation clears 2 Strain stages instead of 1.

---

#### Realm 4 — Core Formation — Golden Core Surge *(Active)*

**Combat:** Free action (no AP cost), 1 use per in-session period. Before declaring a technique on your turn: halve its Qi cost (round down) and increase its damage by 50% (round down). Cannot be applied to Ultimate abilities.

**Utility:** Once per downtime period, channel Golden Core energy into any crafting attempt — reduce its DU cost by 1 (minimum 1). Applies to any profession.

---

#### Realm 5 — Nascent Soul — Soul Projection *(Active)*

**Combat:** 2 AP, 20 Qi, 1 use per combat encounter. Project the Nascent Soul as an independent spiritual avatar for 3 turns. The projection moves and uses Spiritual techniques at full stats, is immune to Physical attacks, and cannot deal physical damage. The physical body is stationary (Physical DR drops to 0) during projection. The projection collapses immediately if the body takes any damage.

**Utility:** Outside combat, sustain the projection for up to 1 hour at a cost of 3 Qi per 10 minutes. The soul can scout, pass through non-sealed barriers, and observe without being detected. Cannot manipulate physical objects. Can communicate back to the physical body at up to 300 feet range.

---

#### Realm 6 — Soul Transformation — Unbreakable Will *(Passive)*

**Combat:** Immune to all mental status effects (fear, charm, confusion, soul attacks). Strain gained from any non-Tribulation source is reduced by 1 (minimum 1 per trigger).

---

#### Realm 7 — Void Tribulation — Void Step *(Active)*

**Combat:** 1 AP, 25 Qi, 1 use per combat encounter. Instantly teleport up to 60 tiles to any visible location. Cannot be interrupted, does not provoke opportunity attacks, and bypasses unsealed terrain and barriers.

**Utility:** Outside combat, Void Step has no tile range limit — any visible destination within line of sight qualifies. Once per day, spend 5 minutes in meditation and 30 Qi to perform a **Void Walk**: teleport to any location previously visited in person, up to 10 miles away.

---

#### Realm 8 — Immortal Ascension — Heaven's Authority *(Active + Passive)*

**Active — Combat:** 3 AP (full turn), 50 Qi, 1 use per session. Emanate immortal pressure in a 15-tile radius. All enemies within range whose realm is lower than yours must roll SPI vs. DC (12 + your SPI modifier) or become Suppressed for 3 turns: −5 to all rolls, cannot use techniques above Realm 6. Enemies who succeed the roll are still shaken: −2 to all rolls for 1 turn.

**Passive — Combat:** No longer gain Strain from Qi overdraft when casting non-forbidden techniques.

**Utility:** Social rolls against lower-realm individuals gain +3. Once per session, declare a binding spiritual edict — mortals and Realm 1–3 cultivators who hear it roll SPI vs. DC 18 or feel compelled to comply. The compulsion only applies to non-self-harming directives. Those who resist suffer −3 to all rolls while actively defying the edict.

---

## 4. SPIRIT ROOTS

### 4.1 Trade-Off Spectrum

Breakthrough difficulty scales **inversely** with Spirit Root purity. Pure (Heavenly) roots grant the fastest early progression and highest power ceiling, but face the harshest bottlenecks. Mortal (5-Element) roots progress slowly but advance with minimal friction.

```
[ PURE / HEAVENLY ]  <--------------------------------->  [ MORTAL / 5-ELEMENT ]
  Max Peak Power (Advanced Elemental Techniques)             Low Peak Power (Basic–Mid Techniques)
  Double Cultivation Speed (+100% EXP)                       Flat Cultivation Speed (+0% EXP)
  Extreme Breakthrough Environment Required                   No Breakthrough Environment Required
  HARSH BOTTLENECK (+30% Difficulty)                         SMOOTH PROGRESSION (-30% Difficulty)
```

### 4.2 Spirit Root Grades

**Technique access:** Advanced techniques tied to a specific element require the cultivator's Spirit Root to include that element. Realm level is the only other gate (§3.5).

Spirit Root therefore determines which elemental schools of advanced techniques are accessible. A Mortal root (5 elements) can access all elemental schools; a Pure root (1 element) reaches the highest power in one school but cannot access other elements at advanced levels.

| Grade | Root Type | Specialized Elements | Elemental Schools Accessible | Environmental EXP Bonus | Required Breakthrough Biome | Breakthrough Difficulty Modifier |
| :--: | :-------- | :------------------: | :----------------------------: | :---------------------: | :-------------------------- | :------------------------------: |
| **1** | Pure (Heavenly) | 1 | **1 school** *(element-locked)* | +100% | Pure Biome *(Hostile)* | **+30% Harder** |
| **2** | Dual | 2 | **2 schools** | +75% | Dual Biome *(Rare)* | **+15% Harder** |
| **3** | True (3-Element) | 3 | **3 schools** | +50% | Triple Biome *(Uncommon)* | **±0% (Standard)** |
| **4** | Spurious | 4 | **4 schools** | +25% | Quad Biome *(Common)* | **-15% Easier** |
| **5** | Mortal (5-Element) | 5 | **All schools** *(5 elements)* | +0% | Base Reality *(Anywhere)* | **-30% Easier** |

### 4.3 Breakthrough Difficulty Modifiers

#### Option A — Percentile System (d100, Roll-Under / Roll-Over)

Base success chance example: **50%**

| Grade | Root Type | Modifier | Effective Success Chance |
| :--: | :-------- | :------: | :----------------------: |
| 1 | Pure | −30% | 20% |
| 2 | Dual | −15% | 35% |
| 3 | True | ±0% | 50% |
| 4 | Spurious | +15% | 65% |
| 5 | Mortal | +30% | 80% |

#### Option B — d20 System (Roll-Over DC)

Base Breakthrough DC example: **DC 15**

| Grade | Root Type | DC Modifier | Effective DC |
| :--: | :-------- | :---------: | :----------: |
| 1 | Pure | +6 | DC 21 |
| 2 | Dual | +3 | DC 18 |
| 3 | True | ±0 | DC 15 |
| 4 | Spurious | −3 | DC 12 |
| 5 | Mortal | −6 | DC 9 |

### 4.4 System Synergy Notes

**Mortal (5-Element) Path:** Slow cultivation speed and no SE bonus, but highly reliable progression and access to all 5 elemental schools at advanced levels. Widest technique variety in the game. Breakthrough walls are low — the survivor's path.

**Pure (Heavenly) Path:** Rapid early progression (+100% EXP), but technique access is exclusively within their one element. The most powerful specialist build. Faces severe breakthrough walls, requires hostile biomes and high-quality resources.

---

## 5. TECHNIQUE DESIGN MATRIX

This section is a suggestion tool for GMs designing technique cards. Nothing here is mandatory — techniques can be built however fits the story, the character, or the moment. These tables offer a calibration reference when you want a sanity check on whether a technique feels appropriate for a cultivator's realm and rank.

**Access:** A character cannot learn a technique above their current Realm (§3.5). Techniques tied to a specific element require the cultivator's Spirit Root to include that element. That is the only other restriction.

---

### 5.1 Design Variables

A technique card is typically defined by some combination of the following. Not every card needs all of them.

| Variable | What It Shapes |
| :-------- | :------------- |
| **Realm & Rank** | Power band. An Early technique and a Peak technique from the same realm can differ significantly in output and effect scope. |
| **AP Cost** (1, 2, or 3) | Action commitment. Loosely correlates with power — but a well-designed 1 AP technique can outperform a 3 AP one if the effect warrants it. |
| **Qi Cost** | Resource drain per use. Calibrated against the cultivator's expected pool at their current rank. |
| **Damage Formula** | The output written on the card — see §5.4 for format options. |
| **Effect Type** | Control, buff, debuff, AoE, movement, utility, or none. |
| **Effect Duration** | How long secondary effects last. |
| **Strain Cost** | Left at 0 for most techniques. Set a value only for forbidden or self-destructive arts — see §5.6. |

---

### 5.2 AP Cost as a Rough Power Signal

AP cost measures **action commitment**, not raw power.

| AP Cost | Commitment | Rough Design Tendency |
| :-----: | :--------- | :-------------------- |
| **1 AP** | Low | Fast, efficient, repeatable. Good for bread-and-butter strikes or quick utility. |
| **2 AP** | Moderate | The typical primary technique — solid output plus a meaningful secondary effect. |
| **3 AP** | Full turn | Big finishers or battlefield-altering effects. Consumes the entire turn. |

---

### 5.3 Qi Cost Reference

The table shows suggested Qi cost ranges keyed to the cultivator's approximate Qi pool at each realm and rank. Calculated from a SPI-focused build (SPI growing from ~9 at Realm 1 Early to ~20+ at Realm 8 Peak). These are a starting point — a technique can cost more or less depending on its role and design intent.

The ranges also align with the **Qi Overdraft Strain Brackets** (§2.6), so you can see at a glance how painful it is to cast a technique on an empty pool.

Mid and Late rank values fall naturally between the Early and Peak values shown.

| Realm | Rank | Stage | ~Qi Pool | 1 AP | 2 AP | 3 AP |
| :---: | :--- | :---: | :------: | :--: | :--: | :--: |
| 1 | Early | 1.00 | ~19 | 2 | 4–6 | 7–10 |
| 1 | Peak | 1.75 | ~27 | 2–4 | 5–8 | 9–14 |
| 2 | Early | 2.00 | ~32 | 3–5 | 6–10 | 11–16 |
| 2 | Peak | 2.75 | ~43 | 4–6 | 9–13 | 15–21 |
| 3 | Early | 3.00 | ~46 | 5–7 | 9–14 | 16–23 |
| 3 | Peak | 3.75 | ~58 | 6–9 | 12–17 | 20–29 |
| 4 | Early | 4.00 | ~66 | 7–10 | 13–20 | 23–33 |
| 4 | Peak | 4.75 | ~81 | 8–12 | 16–24 | 28–40 |
| 5 | Early | 5.00 | ~85 | 8–13 | 17–25 | 30–42 |
| 5 | Peak | 5.75 | ~102 | 10–15 | 20–30 | 36–51 |
| 6 | Early | 6.00 | ~112 | 11–17 | 22–34 | 39–56 |
| 6 | Peak | 6.75 | ~131 | 13–20 | 26–39 | 46–65 |
| 7 | Early | 7.00 | ~136 | 14–20 | 27–41 | 48–68 |
| 7 | Peak | 7.75 | ~157 | 16–24 | 31–47 | 55–78 |
| 8 | Early | 8.00 | ~170 | 17–25 | 34–51 | 60–85 |
| 8 | Peak | 8.75 | ~193 | 19–29 | 39–58 | 68–97 |

*~Qi Pool = floor(SPI × Stage + 10), SPI-focused build. Adjust for builds investing less in SPI.*

---

### 5.4 Damage Output Reference

Damage is measured against the **basic attack baseline** — the free output with no technique, no Qi, no Strain (§2.5):

| Realm | Rank | Approx. Attribute Modifier | Basic Attack Damage |
| :---: | :--- | :------------------------: | :-----------------: |
| 1 | Early | +3 | 3 |
| 1 | Peak | +3–4 | 3–4 |
| 2 | Early–Peak | +3–4 | 3–4 |
| 3 | Early–Peak | +4 | 4 |
| 4 | Early–Peak | +4–5 | 4–5 |
| 5 | Early–Peak | +5–6 | 5–6 |
| 6 | Early–Peak | +5–6 | 5–6 |
| 7 | Early–Peak | +6 | 6 |
| 8 | Early–Peak | +6–7 | 6–7 |

The table below offers a suggested average output range per realm, rank, and AP cost as a rough calibration target.

#### Suggested Damage Ranges (single target, average output)

| Realm | Rank | 1 AP | 2 AP | 3 AP |
| :---: | :--- | :--: | :--: | :--: |
| 1 | Early | 5–8 | 10–15 | 17–25 |
| 1 | Peak | 7–11 | 14–20 | 24–35 |
| 2 | Early | 9–13 | 17–25 | 28–42 |
| 2 | Peak | 11–16 | 21–30 | 35–52 |
| 3 | Early | 12–18 | 24–35 | 40–58 |
| 3 | Peak | 15–22 | 29–43 | 50–72 |
| 4 | Early | 16–24 | 31–46 | 52–75 |
| 4 | Peak | 20–30 | 38–56 | 64–92 |
| 5 | Early | 21–31 | 40–58 | 67–96 |
| 5 | Peak | 25–37 | 48–70 | 80–115 |
| 6 | Early | 27–40 | 52–76 | 87–125 |
| 6 | Peak | 31–46 | 60–87 | 100–144 |
| 7 | Early | 30–44 | 58–84 | 96–138 |
| 7 | Peak | 36–52 | 70–102 | 116–168 |
| 8 | Early | 37–55 | 72–105 | 120–173 |
| 8 | Peak | 44–64 | 85–123 | 142–205 |

---

Going outside these ranges is fine. A technique with a powerful effect but modest damage, or a pure damage technique with no secondary effect, are both valid designs.

---

#### Formula Styles

Four common ways to express a damage formula. Pick whatever fits the technique's tone — all can hit the same output range.

**N × Attribute Modifier** — `N × [STR/SPI mod]`
Scales automatically as the cultivator advances sub-ranks. Deterministic, no variance. Good for disciplined or precise techniques.

| Realm | 1 AP | 2 AP | 3 AP |
| :---: | :--: | :--: | :--: |
| 1–2 | 2–3× | 4–5× | 6–9× |
| 3–4 | 3–4× | 6–8× | 10–13× |
| 5–6 | 4–5× | 8–10× | 13–17× |
| 7–8 | 5–7× | 10–14× | 17–23× |

*Because this formula uses the cultivator's live modifier, output rises naturally as they advance from Early to Peak without needing a new card.*

---

**Pure Dice Pool** — `Xd6 / Xd8 / Xd10`
Independent of attributes. High variance — good for explosive or unpredictable techniques. Practical at lower realms; at Realm 6+ the dice count becomes large, so hybrid is usually more manageable.

| Realm | 1 AP | 2 AP | 3 AP |
| :---: | :--: | :--: | :--: |
| 1 | 1d8 | 3d6 | 5d6 |
| 2 | 2d6 | 4d6 | 7d6 |
| 3 | 3d6 | 6d6 | 10d6 |
| 4 | 3d8 | 7d8 | 12d8 |
| 5 | 5d8 | 9d8 | 16d8 |
| 6 | 6d8 | 12d8 | 20d8 |
| 7 | 7d10 | 14d10 | 24d10 |
| 8 | 8d10 | 17d10 | 29d10 |

*For sub-rank granularity, assign separate values per rank (e.g., Early = 3d8, Peak = 5d8 for a Realm 4 technique) or use one value per realm as a flat rank signature.*

---

**Flat Number** — `Deal X damage`
Fully predictable. Works well when the effect matters more than the damage, or for NPC and spirit abilities without attribute scores. Setting the value near the midpoint of the suggested range is a reasonable default.

| Realm | 1 AP | 2 AP | 3 AP |
| :---: | :--: | :--: | :--: |
| 1 | 7 | 13 | 21 |
| 2 | 11 | 23 | 35 |
| 3 | 15 | 29 | 45 |
| 4 | 20 | 37 | 58 |
| 5 | 26 | 46 | 71 |
| 6 | 30 | 55 | 83 |
| 7 | 37 | 65 | 102 |
| 8 | 44 | 78 | 120 |

*These sit near the middle of each realm's range. For sub-rank precision, use the lower value for Early rank and scale up ~20–25% toward Peak.*

---

**Hybrid** — `N × [attribute mod] + Xd6`
Balances stat-scaling with variance. Generally the most flexible format — the technique grows with the character while dice keep outcomes interesting. Swap d6 for d8 or d10 at higher realms.

| Realm | 1 AP | 2 AP | 3 AP |
| :---: | :--- | :--- | :--- |
| 1–2 | 2× mod + 1d6 | 3× mod + 2d6 | 5× mod + 3d6 |
| 3–4 | 2× mod + 2d6 | 4× mod + 2d8 | 7× mod + 3d8 |
| 5–6 | 3× mod + 2d8 | 6× mod + 3d8 | 10× mod + 4d8 |
| 7–8 | 4× mod + 2d10 | 8× mod + 3d10 | 14× mod + 4d10 |

---

**AoE techniques** hitting multiple targets simultaneously can use a reduced formula per target — roughly 50–65% of the equivalent single-target output is a reasonable starting point, though this is entirely a GM call.

---

### 5.5 Utility Techniques

Non-damage techniques (movement, buffs, debuffs, control) drop the damage formula entirely. Their Qi cost can still follow §5.3 as a loose guide.

| AP Cost | Suggested Utility Scale |
| :-----: | :---------------------- |
| **1 AP** | One modest benefit: a short reposition (2–4 tiles), a minor buff (+1–2 to one roll), or a brief debuff lasting 1 turn. |
| **2 AP** | A meaningful tactical shift: significant movement or teleport, a buff covering 2–3 rolls, or moderate control lasting 2 turns. |
| **3 AP** | Major impact: long repositioning, a party-wide buff, strong control (Stun, Root), or an environmental effect. |

Duration is flexible — a weak effect at long duration and a strong effect at short duration are both valid.

*"Until save" effects can use DC 10 + caster's relevant modifier as a default, adjusted for how powerful the effect is.*

---

### 5.6 Effect Scope by Realm and Rank

A loose guide to what secondary effects feel natural at each realm and rank. Any realm can break from this if the story or character justifies it.

| Realm | Realm Name | Early–Mid | Late–Peak |
| :---: | :--------- | :-------- | :-------- |
| 1 | Body Tempering | Minor debuff (−1, 1 turn). Modest push or pull. | Control 1 turn. Small AoE (2–3 targets). |
| 2 | Qi Condensation | Persistent minor damage (1d4/turn, 1 turn). | Bind 1–2 turns. Small AoE with a debuff. |
| 3 | Foundation Establishment | Moderate control (Stun 1 turn). AoE up to 3 targets. | Bind 2–3 turns. Small elemental zone (2 tiles). |
| 4 | Core Formation | Root 2 turns. AoE up to 4 targets. Silence 1 turn. | AoE up to 6 targets. Larger zones. Stronger debuffs. |
| 5 | Nascent Soul | Wide AoE. Minor elemental projections. | Large AoE. Sustained manifestation (2–3 turns). |
| 6 | Soul Transformation | Battlefield-scale effects. Persistent conditions (3–4 turns). | Partial domain sealing. Multi-condition application. |
| 7 | Void Tribulation | Domain-scale. Terrain alteration. | Area suppression vs. lower-realm opponents. |
| 8 | Immortal Ascension | Full domain-scale. Realm suppression. | Reality-bending effects. |

---

### 5.7 Strain Costs for Forbidden Techniques

Most techniques have no Strain cost on the card — Strain only enters through Qi overdraft in normal use (§2.6). A Strain cost printed on the card marks it as **forbidden, cursed, or self-destructive**: the Strain is paid on activation regardless of Qi level.

Use sparingly. It should feel like a meaningful choice, not routine.

| Technique Feel | Suggested Strain Cost | Intent |
| :------------- | :-------------------: | :----- |
| Slightly cursed / augmented | +1 | A small price for a slight edge. Noticeable but manageable. |
| Forbidden art | +2–3 | Regular use will push a character toward Strained within a session. |
| Self-destructive | +4–5 | Desperation move. Can push into Overloaded in one use from a low-Strain state. |
| Soul-burning | +6+ | Last resort. Near-instant death risk for characters already carrying Strain. |

Compare the Strain cost to the character's Max Strain at their realm (§3.4) — the same +3 cost is significant at Realm 1 (Max Strain 12) but barely noticeable at Realm 8 (Max Strain 20). Calibrate to the intended danger, not to an absolute number.

---

### 5.8 Worked Examples

Five technique cards, one per type. Each includes an alignment note showing how it sits against the matrix suggestions.

---

**Splitting Heaven Slash**
*Body Tempering — Late Rank — Martial / Weapon — STR-scaling*

| Field | Value |
| :---- | :---- |
| **AP Cost** | 2 |
| **Qi Cost** | 6 |
| **Strain Cost** | 0 |
| **Damage** | 4 × STR mod *(physical)* |
| **Effect** | Cleave — hits up to 2 adjacent targets with a single swing. Both take full damage. |
| **Notes** | Movement is not allowed on the same turn — the arc requires planted footing. |

*Alignment: Realm 1 Late, 2 AP. Pool ~23; suggested 2 AP range 4–7, Qi 6 in range. With STR mod +3: 4×3 = 12 — within the Realm 1 Early–Peak 2 AP suggestion (10–20). Two-target cleave with no secondary debuff is appropriate at Late rank.*

---

**Crimson Lotus Barrage**
*Core Formation — Peak Rank — Spiritual / Fire — SPI-scaling*
*(Requires Fire element in Spirit Root)*

| Field | Value |
| :---- | :---- |
| **AP Cost** | 3 |
| **Qi Cost** | 36 |
| **Strain Cost** | 0 |
| **Damage** | 8 × SPI mod + 3d8 *(spiritual, fire)* |
| **Effect** | Target ignites — takes **2d6 fire damage** at the start of their next 2 turns. |
| **Notes** | Ignite applies even if the target has spiritual resistance — fire is elemental, not Qi-based. |

*Alignment: Realm 4 Peak, 3 AP. Pool ~81; suggested range 28–40, Qi 36 in range. With SPI mod +5: (8×5)+3d8 = 40+~14 avg = ~54. The 2-turn burn adds ~14 combined, pushing total output to ~68 — within the Realm 4 Peak 3 AP suggestion (64–92). Hybrid format for stat-scaling with variance.*

---

**Phantom Shatter Step**
*Foundation Establishment — Mid Rank — Movement — AGI-scaling*

| Field | Value |
| :---- | :---- |
| **AP Cost** | 1 |
| **Qi Cost** | 7 |
| **Strain Cost** | 0 |
| **Damage** | None |
| **Effect** | Teleport up to 4 tiles. Gain **+AGI mod** to your next Evasion roll this turn. The teleport does not provoke opportunity attacks. |
| **Notes** | Cannot teleport through solid barriers. The evasion bonus expires at the end of this turn. |

*Alignment: Realm 3 Mid, 1 AP. Pool ~52; suggested 1 AP range 5–8, Qi 7 in range. No damage — pure movement utility. A 4-tile teleport with a conditional evasion bonus is a reasonable 1 AP trade at Foundation Establishment Mid rank.*

---

**Heaven-Splitting Shockwave**
*Nascent Soul — Late Rank — Spiritual / Force — SPI-scaling*

| Field | Value |
| :---- | :---- |
| **AP Cost** | 3 |
| **Qi Cost** | 44 |
| **Strain Cost** | 0 |
| **Damage** | 10d8 spiritual damage to all targets in a **4-tile cone** (up to 6 targets) |
| **Effect** | Each target hit is pushed back **2 tiles**. Targets that cannot be pushed take an additional **1d6 impact damage**. |
| **Notes** | Roll a separate SPI attack vs. each target's Evasion. Cone direction is fixed on activation. |

*Alignment: Realm 5 Late, 3 AP. Pool ~95; suggested range 30–47, Qi 44 in range. 10d8 avg = 45 per target. The Realm 5 Late 3 AP single-target suggestion is ~70–100; applying a 50–65% AoE reduction gives ~35–65 per target — 45 sits in that band. Pure dice pool chosen for clean per-target application.*

---

**Soul-Severing Curse**
*Soul Transformation — Early Rank — Spiritual / Forbidden — SPI-scaling*

| Field | Value |
| :---- | :---- |
| **AP Cost** | 2 |
| **Qi Cost** | 26 |
| **Strain Cost** | **+3 (paid on activation, hit or miss)** |
| **Damage** | 6 × SPI mod + 2d10 *(spiritual)* |
| **Effect** | On hit: target **loses access to one chosen Technique** until they complete a Full Rest. The same technique cannot be suppressed twice before the first application expires. |
| **Notes** | Forbidden. Cannot be used while at the Critical Strain stage. Strain cost is paid whether or not the attack lands. |

*Alignment: Realm 6 Early, 2 AP. Pool ~112; suggested range 22–34, Qi 26 in range. With SPI mod +6: (6×6)+2d10 = 36+~11 avg = ~47 — slightly below the Realm 6 Early 2 AP suggestion (~40–65). Intentionally offset by the +3 Strain cost and technique-suppression effect. At Realm 6 (Max Strain 17), +3 from a clear state puts the character at 3 Strain — no penalty yet. From an already-Strained state, it pushes toward Overloaded. Calibrated as a high-risk play.*

---

## 6. CRAFTING

The five Life Professions listed on the character sheet (§1) are governed by the rules in this section. Crafting resolution rolls use the attribute mappings established in §2.3. The rules here cover material requirements and time costs; failure consequences are in §6.4.

**Professions and governing attributes:**

| Profession | Governing Stat | Output |
| :--------- | :------------: | :----- |
| Alchemy | INT | Pills, potions, elixirs |
| Weapon Refining | STR | Weapons, armor, physical artifacts |
| Array Master | SPI | Formations, traps, spatial arrays |
| Talisman Crafting | AGI | Scrolls, paper talismans, seals |
| Beast Taming | CRM | Contracted beasts, trained mounts |

---

### 6.1 Material Tiers

All crafting materials belong to one of four universal tiers. A recipe's required tier is determined by the realm of the item being produced.

| Tier | Item Realm | Look & Feel | Ambient Effect | Availability |
| :--- | :--------: | :---------- | :------------- | :----------: |
| **Mortal** | 1–2 | Dull colors, rough texture, minor impurities. Looks entirely mundane. | Barely noticeable. Typically processed in bulk. | Common |
| **Spirit** | 3–4 | Faint unnatural glow. Distinct pure scent. Ores become heavy and smooth. | Touching or inhaling causes immediate refreshment or mild energy. | Uncommon |
| **Heaven** | 5–6 | Physically mutated — a plant may resemble a human face; an ore becomes glass-like and translucent. | Emits intense pressure. Weaker cultivators may struggle to breathe, be burned, or frozen just by proximity. | Rare |
| **Divine** | 7–8 | Triggers environmental anomalies when unearthed — darkened sky, lightning strikes, sudden storms. | Fully sentient. The material will actively flee, resist handling, or attack the harvester. | Mythic |

**The 4 Golden Rules of Material Quality**

These apply universally across all material types (herb, ore, beast core, flame, blood, bone):

| Rule | Description |
| :--- | :---------- |
| **Age Rule** | Older is always better. 10 years = Good, 100 years = Great, 1,000 years = Treasure, 10,000 years = Mythical. |
| **Clarity Rule** | Higher tiers are clearer and more flawless. Lower-tier materials are cloudy, rocky, and mottled. |
| **Danger Rule** | Heaven Tier and above are actively hostile. Harvesting without sufficient cultivation will cause injury. |
| **Consciousness Rule** | Divine Tier materials are sentient and will resist. They cannot be harvested through force alone — approach must match their nature. |

**Material quantity** per recipe is defined on the individual item card — there is no universal count rule.

---

### 6.2 Crafting Time Costs

Crafting time is measured in **Downtime Units** (1 DU = 1 in-game week), consistent with §3.5.

The table below is a reference for GMs and item designers. Individual item cards may specify costs within or outside these ranges.

| Material Tier | Item Realm | Base DU Range |
| :----------- | :--------: | :-----------: |
| Mortal | 1–2 | 1–2 |
| Spirit | 3–4 | 3–5 |
| Heaven | 5–6 | 6–9 |
| Divine | 7–8 | 10–14 |

**DU Modifiers**

| Condition | DU Modifier |
| :-------- | :---------: |
| Crafting from a written formula or blueprint | −1 |
| Crafting under a master's direct supervision | −2 |
| First attempt at this specific recipe | +1 |
| Substituting a non-critical material | +1 |
| Current Strain is Overloaded or higher | +2 |

Minimum crafting time is **1 DU** regardless of modifiers.

---

### 6.3 Profession Rank Gate

A crafter cannot produce items above their current **Profession Rank**. Profession Ranks run from 0 (Untrained) to 4 (Master). Rank advances through practice and is separately capped by cultivation realm (see §6.5).

| Item Tier | Item Realm | Minimum Profession Rank |
| :-------- | :--------: | :---------------------: |
| Mortal | 1–2 | Rank 1 |
| Spirit | 3–4 | Rank 2 |
| Heaven | 5–6 | Rank 3 |
| Divine | 7–8 | Rank 4 |

Rank 0 (Untrained) characters may attempt Mortal-tier recipes to accumulate practice counts toward Rank 1, but the attempt is made with no profession training — DC penalties and failure consequences apply at full weight.

**Beast Taming gate** (consistent with §8.2):

| Beast Taming Rank | Maximum Beast Realm |
| :---------------: | :-----------------: |
| 0 (Untrained) | Cannot tame |
| 1 | Realms 1–2 |
| 2 | Realms 3–4 |
| 3 | Realms 5–6 |
| 4 | Realms 7–8 |

---

### 6.4 Crafting Failure Consequences

Crafting outcomes are resolved against the crafting DC using a tiered system.

| Outcome | Condition | Consequences |
| :------ | :-------- | :----------- |
| **Success** | Roll meets or exceeds DC | Item is produced as specified. All materials consumed normally. |
| **Failure** | Roll falls below DC | Partial material loss (GM determines which materials are wasted — typically 50% of listed ingredients). The Downtime Units are still spent. No item is produced. Reattempt allowed next DU. |
| **Critical Failure** | Natural 1 | All materials consumed and destroyed. The Downtime Units are still spent. Additional consequence defined per recipe card (see note below). |

**Critical failure additional consequences** are specified on the recipe card rather than by a universal table — different professions and recipes carry different risks (furnace explosion, toxic fumes, formation backlash, Qi arc, forge accident, etc.). If a recipe card does not specify an additional consequence, a critical failure results only in total material loss.

**Note:** Substituted materials (see §6.2 modifiers) are consumed on any failure outcome, regardless of whether they were the cause of the failure.

---

### 6.5 Profession Rank Advancement

**Crafting professions (Alchemy, Weapon Refining, Array Master, Talisman Crafting)**

Rank advances through **accumulated successful crafts** — any completed craft that meets or exceeds its DC counts, regardless of material tier. Failed crafts and critical failures (nat 1) do not count.

**Cumulative craft count thresholds:**

| Total Successful Crafts | Profession Rank |
| :---------------------: | :-------------: |
| 0–9 | 0 — Untrained |
| 10–99 | 1 — Apprentice |
| 100–199 | 2 — Journeyman |
| 200–499 | 3 — Expert |
| 500+ | 4 — Master |

**Cultivation realm cap**

A crafting profession rank cannot exceed `⌈Realm ÷ 2⌉`, regardless of craft count. Practice counts above the cap still accumulate — the rank advances automatically once the realm cap rises.

| Cultivation Realm | Max Profession Rank |
| :---------------: | :-----------------: |
| 1–2 | 1 |
| 3–4 | 2 |
| 5–6 | 3 |
| 7–8 | 4 |

*Example: a Realm 2 cultivator with 150 successful alchemy crafts has the practice count for Rank 2 but is held at Rank 1 until they break through to Realm 3.*

---

**Beast Taming**

Beast Taming rank does **not** advance through craft count. It advances by learning specific Beast Taming techniques — each qualifying technique learned raises the rank by 1. The cultivation realm cap (`⌈Realm ÷ 2⌉`) still applies; a technique cannot push rank beyond the cap for the cultivator's current realm.

Beast Taming techniques that qualify as rank-raising are flagged on the technique card. Learning the same technique twice does not grant additional rank.

---

## 7. MAGIC TREASURES

Magic Treasures are artifacts, weapons, tools, and spiritual objects infused with Qi or bound to higher-order formations. To use a Magic Treasure, a cultivator must **bind** it and occupy one of their available **Attunement Slots**.

---

### 7.1 Attunement Slots

The number of Magic Treasures a cultivator can maintain simultaneously is limited by their Major Realm. Attunement capacity increases every two breakthroughs.

| Realm | Major Realm | Attunement Slots |
| :---: | :---------- | :--------------: |
| 1 | Body Tempering | 1 |
| 2 | Qi Condensation | 1 |
| 3 | Foundation Establishment | 2 |
| 4 | Core Formation | 2 |
| 5 | Nascent Soul | 3 |
| 6 | Soul Transformation | 3 |
| 7 | Void Tribulation | 4 |
| 8 | Immortal Ascension | 5 |

A cultivator may own more treasures than their slot limit, but unequipped treasures provide no passive bonuses and cannot be activated. Swapping an equipped treasure for an unequipped one requires performing the binding process anew (see §7.3).

---

### 7.2 Realm Gate

A cultivator cannot attune to or use a Magic Treasure above their current Major Realm. This is consistent with the Equipment Grade Unlock granted at each Major Realm breakthrough (§3.4).

Attempting to forcibly attune to a higher-realm treasure overloads the cultivator's meridians — the attempt fails and generates Strain equal to the Tribulation Failure value for the cultivator's current realm (see §2.6 Strain Triggers).

---

### 7.3 Binding Types

The binding method is specified on the individual treasure card. Different treasure types require different forms of connection between cultivator and item. A treasure can only be bound using the method it requires.

| Binding Type | Requirement | Mechanic | Notes |
| :----------- | :---------- | :------- | :---- |
| **Blood Binding** | Physical contact + deliberate blood offering | Lose HP equal to 10% of current Max HP (rounded down, minimum 1). Binding takes 1 hour. | The bond is physical. The item recognizes the cultivator's blood signature. Any cultivator of sufficient realm can attempt to overwrite a Blood Binding by shedding more blood than the original binder (GM adjudicates contested scenario). |
| **Soul Binding** | Meditation + Qi expenditure | Spend 20% of current Max Qi and take **+2 Strain**. Binding takes 4 hours (counts as one Extended Meditation period). | The bond is spiritual. Only the bound cultivator can activate the item's abilities. Soul Binding cannot be overwritten while the original binder is alive. |
| **Life Binding** | Blood Binding + Soul Binding (both required) | Costs of both combined: 10% Max HP + 20% Max Qi + **+3 Strain**. Takes 4 hours. | The strongest personal bond. The item resonates with the cultivator's life force — if the cultivator dies, the item shatters or becomes dormant until recovered by a cultivator of equal or higher realm. |
| **Contract** | Negotiation, taming, or formal spiritual oath | Resolved as a CRM-governed roll (see §2.3). DC and process defined per contract type on the treasure card. | Used for sentient treasures, spirit beasts serving as artifacts, or living weapons with their own will. Contract terms and violations are defined per item card. |

A cultivator may not hold more active bindings than their current Attunement Slots allow (§7.1).

---

### 7.4 Breaking a Binding

Bindings can be voluntarily severed or forcibly broken.

| Situation | Method | Consequence |
| :-------- | :----- | :---------- |
| **Voluntary release** (any binding) | Deliberate meditation, 1 hour | Binding ends cleanly. Attunement slot freed. No Strain. |
| **Forced severance** (another cultivator breaking your binding) | Realm-appropriate ritual — GM adjudicates | The original binder takes Strain equal to the Tribulation Failure value for their current realm (§2.6). |
| **Life Binding broken by death** | Automatic on owner death | Item shatters or enters dormancy — defined per item card. |
| **Contract violation** | Automatic on breach of stated terms | Consequences defined per contract card. May include Strain, debuffs, or hostile action from the treasure. |

A voluntarily released treasure retains no memory of the prior binding — it can be immediately bound by another cultivator of sufficient realm.

---

### 7.5 Item Activation Rules

#### AP Cost

Activating a Magic Treasure in combat costs **1 AP**, consistent with consuming recovery items (§2.4). Activation outside combat has no AP cost — only time, as specified on the item card.

#### Qi Source

Each item card specifies one of two activation modes:

| Mode | Description | Qi Overdraft |
| :--- | :---------- | :----------- |
| **Cultivator-Qi** | Activation draws directly from the cultivator's Qi pool. The Qi cost is listed on the card. | If the cultivator's Qi pool cannot cover the activation cost, the shortfall triggers Qi overdraft Strain (§2.6 Overdraft Table), same as techniques. |
| **Independent Charges** | The item carries its own internal Qi reservoir, expressed as a charge count (e.g., "3 charges"). Activation spends one or more charges with no cost to the cultivator's pool. | Overdraft does not apply — charges are discrete. Attempting to activate an item with 0 charges fails; no Strain is generated. |

Items that do not specify a mode in their card are assumed to use **Cultivator-Qi**.

#### Strain Generation

Most items do not impose Strain. A Strain cost printed on the item card marks it as forbidden, cursed, or spiritually dangerous — this cost is paid on activation regardless of whether the cultivator has sufficient Qi.

Cursed item Strain costs follow the same scale as forbidden techniques (§5.7) and stack with any Qi overdraft Strain if both apply simultaneously.

#### Charge Replenishment

Recharge conditions are defined per item card. There is no universal recharge rule. An item card may specify: manual Qi channeling, Full Rest, Extended Meditation, a specific environment or ritual, or no recharge (single-use only).

---

## 8. BEAST SYSTEM

Beasts serve four mechanical roles: **combat companions** (fight alongside the cultivator), **mounts** (travel and movement bonuses), **enemy encounters** (hostile opponents), and **crafting resources** (drop materials on death). A single beast card covers all four roles simultaneously — the card defines behaviour in each context.

---

### 8.1 Beast Attributes

Beasts use the same six-attribute block as cultivators: STR / AGI / CON / SPI / INT / CRM.

HP and Qi use identical formulas:
- **Max HP** = `(CON × Stage) + 10`
- **Max Qi** = `(SPI × Stage) + 10`
- Stage is derived from the beast's realm using the same Early/Mid/Late/Peak offset as characters (§2.4).

Beasts do not have a Rank within their realm unless specified by the GM on the card. For encounters, treat the beast as operating at the Early rank of its realm unless noted otherwise.

---

### 8.2 Taming Prerequisites

Both gates must pass before a taming attempt is permitted. Failing either gate blocks the roll entirely.

**Gate 1 — Realm**

| Condition | Result |
| :--- | :--- |
| Character realm ≥ Beast realm | Gate passes |
| Character realm < Beast realm | Hard block — taming cannot be attempted |

**Gate 2 — Beast Taming Profession Rank**

| Beast Taming Rank | Maximum Beast Realm |
| :---------------: | :-----------------: |
| 0 (Untrained) | Cannot tame |
| 1 | Realms 1–2 |
| 2 | Realms 3–4 |
| 3 | Realms 5–6 |
| 4 | Realms 7–8 |

Both gates must be cleared. A cultivator at Realm 4 with Beast Taming Rank 1 cannot tame a Realm 3 beast — their profession rank is the limiting factor regardless of cultivation level.

---

### 8.3 Taming Resolution

**Step 1 — Weaken**

The beast must be reduced to **≤10% of its maximum HP** before any taming roll can be made. Attempting to roll before this threshold is not permitted.

*Design intent: forces a deliberate in-combat decision — the party must pull their damage output at the right moment, creating risk of accidentally killing the target.*

**Step 2 — Roll**

Roll **1d20 + CRM modifier** vs the beast's printed **Taming DC**.

| Outcome | Result |
| :--- | :--- |
| Roll ≥ DC | Beast tamed. Record as companion on character sheet. |
| Roll < DC | Beast recovers to 25% HP and turns hostile. Taming DC increases by +2 for all subsequent attempts within the same encounter. |

Taming DC for the same beast does not reset between sessions — if the party retreats and returns, the +2 penalty per failed attempt persists until the beast is either tamed or killed.

---

### 8.4 Tamed Companions & Companion Slots

**Companion Slots**

Each cultivator has a number of Companion Slots equal to `floor(CRM / 3) + 1` (minimum 1).

| CRM Score | Modifier | Companion Slots |
| :-------: | :------: | :-------------: |
| 1–2 | +0 | 1 |
| 3–5 | +1 | 1 |
| 6–8 | +2 | 1 |
| 9–11 | +3 | 2 |
| 12–14 | +4 | 2 |
| 15–17 | +5 | 2 |
| 18–20 | +6 | 3 |

A cultivator cannot hold more tamed beasts than their current Companion Slot count. Releasing a tamed beast frees the slot immediately. Releasing a Life-Bound beast follows the severance rules in §7.4.

**Combat Behaviour**

- Tamed companions act on their own initiative (rolled separately).
- Player controls the companion's actions on their turn.
- Tamed beasts use their **Tamed Ability** list, not their Wild Ability list.
- Companions use 3 AP per turn using the same action economy as characters (§2.5).

---

### 8.5 Beasts as Mounts

Whether a beast can serve as a mount is defined per card. Not all tamed beasts are mount-capable.

Mount stats on the card specify:
- **Speed bonus** — flat movement increase or multiplier relative to the character's base movement.
- **Travel modifier** — overland travel time reduction for downtime journey calculations.

Mounted combat uses standard movement rules. Mounting or dismounting costs 1 AP.

---

### 8.6 Loot & Drops

When a beast is killed (rather than tamed), it drops materials per the **Loot / Drop Table** on its card. Drop table entries are freeform text — the GM defines quality and quantity per encounter context.

Dropped materials feed directly into the crafting profession system (§6). A beast's realm determines the material tier of its drops:

| Beast Realm | Material Tier |
| :---------: | :-----------: |
| 1–2 | Mortal |
| 3–4 | Spirit |
| 5–6 | Heaven |
| 7–8 | Divine |

The quality of individual drops within a tier (e.g., purity, potency) is GM-adjudicated and can be noted on the beast card.
