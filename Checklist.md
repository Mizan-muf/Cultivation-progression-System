# XANXIA — PROJECT CHECKLIST

---
Finish first:
- [x] ~~Ruleset for beasts.~~ *(§8: attributes, taming prerequisites, taming resolution, companion slots, mounts, loot/drops)*

## RULESET (Complete)

- [x] ~~Define the core resolution mechanic (e.g., d20, d100, dice pool) and determine how attributes modify rolls.~~ *(1d20 + modifier; modifier = floor(score / 3))*
- [x] ~~Calculate precise EXP thresholds required for advancing Realms and Ranks.~~ *(SE resets per Major Realm; thresholds defined for all 8 realms; award tables provided)*
- [x] ~~Define the specific mechanical bonuses applied upon cultivation breakthroughs.~~ *(+1 attr per Sub-Realm; +3 attr, equipment unlock, Strain +1, technique realm unlock, realm skill unlock per Major Realm)*
- [x] ~~Establish hard numerical modifiers and mechanics for Spirit Roots and Physiques.~~
- [x] ~~Create mathematical formulas converting CON to maximum HP and SPI to maximum Qi.~~ *(HP = (CON × Stage) + 10; QI = (SPI × Stage) + 10; Stage = Realm + Sub-Realm offset)*
- [x] ~~Establish rules and rates for HP and Qi recovery (e.g., resting, meditation, pills).~~ *(Short Rest 25%; Extended Meditation full restore + 1 Strain level cleared; Full Rest clears all; passive Qi regen = SPI mod per turn)*
- [x] ~~Define interim Strain penalty thresholds prior to maximum capacity/death.~~ *(Strained 26–50%, Overloaded 51–75%, Critical 76–99%, Death 100%; roll penalties + HP/QI cap reductions per stage)*
- [x] ~~Specify exact actions that generate Strain and the methods required to clear it.~~ *(Triggers: Qi overdraft, forbidden techniques, Tribulation failure, HP ≤10% capped at Strained; Clearing: full rest, meditation, pills, Sect healer)*
- [x] ~~Define combat turn structure and establish action economy limits.~~ *(3 AP/turn; Basic 1 AP, Technique 2 AP, Ultimate 3 AP, Move 1 AP; initiative by fixed AGI, ties by 1d20)*
- [x] ~~Create damage calculation formulas scaling from STR (Martial) and SPI (Spiritual).~~ *(Basic attack = STR/SPI modifier; techniques define their own damage formula per card)*
- [x] ~~Establish defence mechanics for evasion (AGI), physical mitigation (CON), and Qi barriers (SPI).~~ *(Opposed roll for evasion; Physical DR = CON mod + Equipment PD + Body Tempering; Spiritual DR = SPI mod + Equipment SD + Spiritual Armour)*
- [x] ~~Build a balancing matrix correlating Qi/Strain costs with damage output and duration for techniques.~~ *(§5: Technique Design Matrix — Qi cost reference by realm/rank, damage anchor tables, 4 formula styles, effect scope by realm/rank, Strain cost guide for forbidden arts, 5 worked examples)*
- [x] ~~Recalibrate Strain triggers and recovery values to the 0–20 absolute point scale.~~ *(§2.6 rework: Qi overdraft bracket table, Tribulation/Grievous Injury per-realm values, Meditation recovery unified to "1 Strain stage")*
- [x] ~~Establish comprehension mechanics and time costs for learning new techniques based on INT.~~ *(§3.5: 1d20 + INT vs DC 12–27 by realm; downtime 1–13 units; hard realm gate; DC modifiers for master/manual/element match)*
- [x] ~~Define rules, downtime, and penalties for switching Primary Cultivation Techniques.~~ *(§3.6: 1d20 + SPI vs DC 12+Realm; 1 Downtime Unit; Strain cost on all outcomes; blocked if Overloaded)*
- [x] ~~Establish crafting resolution rules for professions utilising INT, STR, AGI, and CRM.~~
- [x] ~~Define raw material requirements and in-game time costs for crafting.~~ *(§6.1: 4 material tiers mapped to realm brackets; §6.2: DU cost table + modifiers; §6.3: Profession Rank Gate)*
- [x] ~~Establish specific consequences for crafting failures (e.g., wasted materials, physical damage, Strain).~~ *(§6.4: tiered outcomes — failure = partial material loss; nat 1 = full material loss + recipe-defined consequence)*
- [x] ~~Define attunement or binding limits for Magic Treasures.~~ *(§7.1: slots scale 1–5 by realm; §7.2: hard realm gate; §7.3: 4 binding types — Blood/Soul/Life/Contract; §7.4: binding severance rules)*
- [x] ~~Establish item activation rules specifying Qi consumption, independent charges, and potential Strain generation.~~ *(§7.5: 1 AP activation cost; Cultivator-Qi vs. Independent Charges modes; overdraft rules; Strain cost from cursed items; recharge per item card)*
- [x] ~~Define the Realm Skill Unlock list (one skill per Major Realm breakthrough, 8 total).~~ *(§3.7: 8 fixed skills — mix of passives and actives, each with combat and utility dimensions)*
- [x] ~~Have a separate defence system for additional defence for both physical and spiritual attacks.~~ *(Equipment PD/SD + Body Tempering / Spiritual Armour skill bonuses stack on top of passive CON/SPI mitigation)*
- [x] ~~Define character creation rules — starting attributes point-buy system.~~ *(§0: 20 points, min 1 / max 8 per attribute at creation)*

---

## VTT DASHBOARD — COMPLETE

### Infrastructure
- [x] React + Vite + TypeScript project scaffold
- [x] React Router v6 routing (Landing, GM Dashboard, Lobby, Character Creation, Character Sheet, Combat Tracker)
- [x] Zustand store with localStorage persistence (all campaign + character data survives refresh)
- [x] Global dark monospace CSS theme consistent with Cultivation Wheel aesthetic
- [x] All game formula functions (HP, Qi, Strain, SE, DR, attunement slots, modifiers)
- [x] Spirit Root data extracted from Cultivation Wheel (43 entries, weighted tiers, sub-wheel data)
- [x] Physique data extracted from Cultivation Wheel (37 entries, weighted tiers)

### Landing Page
- [x] Create campaign (generates 6-character session code + GM token)
- [x] Join campaign by session code

### Character Creation Wizard (5 steps)
- [x] Step 1 — Identity: name, player name, daoist title, sect, path
- [x] Step 2 — Spirit Root: canvas spinner wheel with all 43 entries; sub-wheel auto-triggers for multi-element roots (Quad/Tri/Dual); grade mechanics displayed (SE multiplier, breakthrough DC mod)
- [x] Step 3 — Physique/Bloodline: canvas spinner wheel with all 37 entries
- [x] Step 4 — Point-buy attributes: 20 points, min 1 / max 8, blocks until fully spent
- [x] Step 5 — Review summary before confirming creation

### Character Sheet
- [x] Live HP / Qi / Strain resource bars with +/- input and direct number entry
- [x] Strain stage display (Clear → Strained → Overloaded → Critical → Death) with colour, roll penalties, HP/Qi cap reduction displayed
- [x] Effective Max HP and Qi auto-reduced when Strain is elevated
- [x] All 6 attributes with modifier, clickable to spend unspent attribute points
- [x] SE progress bar toward next rank threshold with spirit root multiplier displayed
- [x] Combat stats panel (initiative/AGI, AP/turn, Physical DR, Spiritual DR)
- [x] Spirit Root and Physique display with tier label
- [x] Cultivation technique section (editable inline — name + passive effect)
- [x] Technique list by category (Martial / Spiritual / Movement / Utility) with AP/Qi/Strain costs and USE button
- [x] USE button deducts Qi, applies overdraft Strain from bracket table on empty pool, shows notification
- [x] Realm skill reference panel (all 8 realm skills, greyed out until unlocked)
- [x] Passive skills list display
- [x] Crafting professions display (5 professions with rank and governing stat)
- [x] Magic treasures display (attuned items with slot count, binding type, Qi mode, charges)
- [x] Freeform inventory and character notes text areas (auto-save)

### GM Dashboard
- [x] Party overview grid — one card per player character
- [x] Per-character live HP / Qi / Strain bars with GM-side controls
- [x] SE award panel (Minor / Major / Milestone / Custom amount, target all or individual character)
- [x] SE auto-multiplied by each character's spirit root expMultiplier before applying
- [x] Rank auto-advances when SE threshold reached, grants +1 attribute point
- [x] Tribulation roll button (appears only at Peak rank), 1d20 + SPI mod vs DC 15 + root mod
- [x] Tribulation success: realm +1, SE reset, +3 attr points, realm skill auto-granted, Strain +1
- [x] Tribulation failure: Strain penalty per realm bracket
- [x] Technique card creator (name, realm, rank, type, AP/Qi/Strain cost, damage formula, effect, element requirement, forbidden flag)
- [x] Technique library list view
- [x] Assign technique to character (realm-gated, skips already-learned techniques)
- [x] Campaign notes freeform textarea

### Combat Tracker
- [x] Setup screen — add party members from campaign data (auto-fills stats) or add custom enemies manually
- [x] Initiative order sorted by AGI on combat start
- [x] Round counter + active turn indicator
- [x] Next Turn button — cycles turn, resets AP to 3 for new combatant
- [x] Per-combatant HP bar with +1/-1 quick buttons and direct input
- [x] Per-combatant Qi bar display
- [x] Per-combatant Strain display with stage colour
- [x] AP spend buttons (-1 AP, -2 AP, -3 AP) and AP reset
- [x] Status effects display per combatant

---

## VTT DASHBOARD — INCOMPLETE

### GM Library — Missing Card Types
- [ ] Enemy / NPC sheet creator (same structure as player character sheet, GM-controlled)
- [ ] Magic Treasure card creator (binding type, Qi mode, charges, passive bonus, active effect)
- [ ] Crafting Recipe card creator (profession, realm, DC, DU cost, materials, critical fail consequence)
- [x] ~~Beast card creator (stats, abilities, taming DC)~~ *(BeastCreator form + BeastCard two-panel display in GM Library; wildAbilities/tamedAbilities, loot, mount stats, weaknesses/resistances)*

### Character Sheet — Missing Interactions
- [ ] Ultimate ability add / edit UI (display works, no way to create or edit ultimates from the sheet)
- [ ] Passive skill add / edit UI (display works, no way to add custom passive skills)
- [x] ~~Crafting profession rank increment (display only — no button to level up a profession)~~ *(+1 craft log button per profession; rank computed from cumulative count; realm cap enforced and displayed)*
- [ ] Attune / un-attune magic treasures from the sheet (display works, no binding flow)

### Combat Tracker — Missing
- [ ] Status effect add / remove UI per combatant (text display exists, no input)
- [ ] Strain input control for combatants (display exists, no editable input)
- [ ] Qi input control for combatants (bar display only, no direct edit)
- [ ] Tie-breaking d20 roll for equal initiative on combat start
- [ ] Combat changes sync back to character sheets (HP/Qi/Strain modified in combat do not update the character's permanent sheet)

### Downtime Manager (Not Started)
- [ ] Queue downtime actions per character (learn technique, switch cultivation technique, craft item, rest)
- [ ] DU counter display per character
- [ ] Comprehension roll resolution — 1d20 + INT vs DC (with modifiers: master −3, manual −1, element match −2, related technique −1, Overloaded +2)
- [ ] Cultivation technique switch roll — 1d20 + SPI vs DC 12 + realm; Strain costs on all outcomes
- [ ] Crafting roll resolution — relevant stat vs recipe DC; partial/full material loss on fail/crit fail

### Story Graph (Not Started)
- [ ] Node graph canvas — characters, locations, events, factions, items, arcs as nodes
- [ ] Create / edit / delete nodes with type, title, markdown notes
- [ ] Drag to reposition nodes on the canvas
- [ ] Edge connections between nodes with relationship labels
- [ ] Click node to open detail panel
- [ ] Link nodes to existing game entities (character, technique, item)

### Backend (Not Started)
- [ ] Node.js + Express server
- [ ] SQLite database schema + Drizzle ORM migrations
- [ ] REST API routes (campaigns, characters, techniques, combat, crafting, story)
- [ ] Socket.io for real-time combat tracker sync across devices
- [ ] Replace localStorage with server persistence
- [ ] True multi-device support (currently single-browser only)

### Other
- [ ] Player session — claim a character by player name (currently any player can open any character)
- [ ] NPC enemies visible in GM party view alongside players
- [ ] GM can delete / archive characters
- [ ] Inventory item cards with weight / tier / quantity tracking
- [ ] Pill / potion item cards with defined HP/Qi/Strain recovery values
- [ ] Short Rest and Extended Meditation buttons (auto-calculate recovery amounts)
