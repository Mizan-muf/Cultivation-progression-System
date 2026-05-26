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
