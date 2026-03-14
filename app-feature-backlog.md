# Training Tracker App -- Feature Backlog

Collected from sessions through Mar 14, 2026. Includes holistic review from 7 agents (PM, Backend, Frontend, QA, UX, Coach, Athlete).

---

## Bugs (fix these)

- [x] **Multi-workout day title shows first workout, not main** -- FIXED: picks highest-intensity type from array using typePriority map.
- [x] **Protein target wrong on multi-workout days** -- FIXED (two bugs): (1) was using navigated date instead of actual today, (2) short movement snacks (8-15 min) were overriding real sessions. Now filters to workouts >= 20 min before selecting primary type.
- [x] **Readiness badge clipped on mobile** -- FIXED: flex-shrink:0, gap adjustments, flex-wrap on date nav.
- [x] **Plan tab calendar clipped on mobile** -- FIXED: overflow-x:hidden on plan-section, overflow:hidden + min-width:0 on calendar cells.
- [x] **UTC date shift in saveWorkout()** -- FIXED: uses formatDateKey() now
- [x] **UTC date shift in calculatePatterns() and summarizeRecentHistory()** -- FIXED: added T00:00:00
- [x] **Sunday pool recovery button broken** -- FIXED: fallback to activeRecovery sub-object
- [x] **Tuesday preview mismatch** -- FIXED: pulls from actual workout object
- [x] **Coach history shows wrong workout names** -- FIXED: checks w.workout first
- [x] **Readiness not saved for external activities** -- FIXED: added readiness field
- [x] **No duplicate prevention on save** -- FIXED: idempotent doc ID with .set()
- [x] **showOriginalWorkout() leaks stale workout log** -- FIXED: clears workoutLog and workoutStartTime
- [x] **Week progress end-of-day bug** -- FIXED: WEEK_DATES end dates now use 23:59:59 so Sunday workouts count
- [x] **Post-save reloads fresh workout** -- FIXED: shows completion summary instead of reloading

## Security (important)

- [x] **Firestore security rules missing** -- DONE: configured in Firebase console. Exported to `firestore.rules` for version control.
- [x] **Worker CORS is `*`** -- FIXED: restricted to GitHub Pages + localhost only (file:// removed)
- [x] **Worker passes client-controlled system prompt directly to Anthropic** -- FIXED: origin check, input validation, message cap, error sanitization
- [x] **No authentication** -- DONE: Google Sign-in with email check (randolph.sophia@gmail.com only). Auth gate blocks app until signed in. Firestore rules enforce same email server-side.
- [x] **Worker allows anonymous/no-origin requests** -- FIXED: requests without Origin or Referer header now rejected
- [ ] **Deploy updated worker.js** -- worker.js updated locally (removed file://, changed no-origin to deny) but not deployed. Needs `npx wrangler deploy` which isn't available on this machine. Find alternative deploy method or install wrangler.

## Quick Fixes

- [x] **Remove "tap" wording on simple save buttons** -- DONE: "Tap to log" → "Log", set pills "tap" → "—", "tap to expand" → "expand"
- [x] **Remove timer everywhere** -- DONE: removed CSS, HTML, and all JS
- [x] **Fuel undo button size** -- DONE: 20px → 28px with 14px font
- [x] **Fix muted text contrast** -- DONE: #6b6280 → #8b82a0
- [x] **Calendar font too small** -- DONE: 8px → 10px for workout text and travel badges
- [x] **Workout Plan Calendar View needs short names** - DONE: Sport-Specific→Sport, Conditioning→Cardio+, removed +Warm/Cool indicator. Added getShortTypeName() function.
- [x] **No doc ID stored in workout records** -- DONE: docId stored on save and captured from Firestore doc.id on load. Enables future edit/delete from client.

## High Impact Features

- [x] **Show last-session weight/reps next to each exercise** -- DONE: getLastSessionData() pulls from history, "Last:" line shown under exercise target for weighted exercises.
- [x] **Simplify set modal** -- DONE: effort type, adjustment, and notes collapsed under "More options...". Auto-carry effort type from previous set. Video toggle added. Primary view: weight + reps + feel + filmed + log.
- [x] **Navigate to past/future days from Today view** -- DONE: left/right arrow buttons on date display + "Today" pill to return. Shows completed workouts for past days, lets you log missed workouts.
- [x] **History filtering and pagination** -- DONE: filter pills (All/Strength/Sport/Recovery/External) + "Load more" button with remaining count. 10 items per page.
- [x] **External activities logged as Sport should filter under Sport** -- DONE: Sport filter now catches External Activity entries with sport names (handball, soccer, etc.).
- [x] **Auto-extend plan calendar beyond WEEK_DATES** -- DONE: getActiveWeeks() hides past weeks, auto-generates future weeks through today + 2 weeks. No more blank calendar.
- [x] **Post-workout comparison to last time** -- DONE: completion modal shows volume % change vs last same-name session + exercise-level weight PRs.

## Features

- [x] **"Took video" toggle** -- DONE: camera toggle in set modal, 🎬 indicator on filmed set pills, saved to set data.
- [ ] **History view** -- week-over-week calendar layout with checkboxes for completed workouts per day
- [x] **Resume button for in-progress workouts** -- DONE: tiles show "Resume" when localStorage has in-progress data. Works for multi-workout, single, and recurring tiles.
- [x] **View completed workout details** -- DONE: clicking a logged tile shows exercise details grouped by circuit with weights/reps/feel. Works for DATE_WORKOUTS and SCHEDULE workouts.
- [x] **Re-edit completed sets** -- DONE: "Edit Logged Sets" button on completed view re-renders workout with saved data populated. Saves update existing Firestore doc.
- [x] **Movement snack mini-sessions** -- DONE: built into DATE_WORKOUTS as separate array entries (10-15 min handball form drills). In-app, logged independently.
- [x] **Free-entry protein logging** -- DONE: "+" card in fuel grid opens modal with name + grams. Custom entries shown as cards with remove button. Saved in fuel log `custom` array.
- [ ] **Streak/consistency tracking** -- running streak, weekly completion rate. Cheapest motivation lever. (Athlete)
- [ ] **Offline sync indicator** -- show "saved locally, will sync" when no connection. Currently silent. (Athlete, Backend)
- [ ] **Rest day logging** -- mark rest as intentional vs missed. Log quick body check (soreness, energy). (PM, Athlete)
- [x] **Equipment checklist** -- DONE: embedded in DATE_WORKOUTS `condition` field text (e.g. "Bring: loop band, handball, foam roller").
- [ ] **Score history for trackScore exercises** -- show last score on finisher/scored drills. (Athlete)
- [ ] **Coach conversation restore on refresh** -- sessions saved to Firestore but never loaded back. (Backend)
- [x] **"You are here" indicator in workout** -- DONE: completed circuits dim to 50% opacity, current circuit gets lavender border. Updates live as sets are logged.
- [x] **Sticky finish button** -- DONE: sticky bottom with gradient fade background.
- [ ] **Swipe-to-dismiss on modals** -- feels more native on iPhone. (UX)
- [x] **Scroll position preserved on view switch** -- DONE: saves/restores scroll position per view tab.
- [x] **Injury/discomfort prompt post-workout** -- DONE: "Any pain or discomfort?" textarea in completion modal. Saved as `discomfort` field, shown in completed view with red warning, included in coach context.
- [x] **Confirmation flash on set log** -- DONE: scale + glow animation on set pill when logged.

## Nutrition / Fuel Tab

- [x] **Supplement checkboxes** -- DONE: creatine, omega-3, magnesium as horizontal pill toggles. Save to Firestore. Reset daily.
- [x] **Training-day context line on Fuel view** -- DONE: pulls from actual loaded workout type. Dynamic message.
- [x] **Dynamic protein target** -- DONE: 150g on training days, 130g on rest/recovery/cardio. Progress bar and label adjust.
- [x] **Evaluate serving sizes** -- DONE: updated to match Sophie's actual portions (most halved from 1 cup to ½ cup).
- [x] **Pick emojis for fuel cards** -- DONE: Greek flag for yogurt, heart for cashews, house for cottage cheese.
- [x] **Meal/snack catch-all card** -- DONE: ~10g per tap for incidental protein from non-tracked foods. Top-left position.
- [x] **Hydration nudges** -- DONE: "Drink a full bottle of water now" in completion modal + gentle reminder at bottom of Fuel tab. No tracking.
- [x] **Update whey shake protein value** -- DONE: updated to 36g (current recipe: 3/4 cup milk, 2 scoops whey, flavoring -- no cottage cheese). Also added dessert shake (37g) and Kodiak waffles (12g).
- [x] **Fuel tab 2am daily reset** -- DONE: getFuelDateKey() subtracts 2 hours so late-night eating counts toward the current day. Protein tracker and supplements reset at 2am instead of midnight.
- [ ] **Post-workout fuel prompt** -- "Have you eaten protein in the last hour?" nudge after saving. (deferred)
- [ ] **Electrolyte tracking** -- especially important as Houston heats up + creatine increases water needs. Add LMNT/Liquid IV as loggable item. (Nutritionist)
- ~~ **Meal combo quick-log** ~~ -- skipped, Sophie doesn't use the combo suggestions much
- ~~ **Add hydration counter** ~~ -- skipped, too much overhead. Using gentle nudges instead.

**Nutritionist notes for Sophie (not app features):**
- [x] Testing ferritin + vitamin D levels -- appointment booked Wed Mar 11. Also requesting iron panel + CBC.
- [x] Magnesium glycinate 200-400mg before bed -- ORDERED (Sports Research 160mg, arriving Mar 20-27)
- [x] Omega-3 EPA/DHA 2-3g/day -- ORDERED (Sports Research Fish Oil 1250mg from Wild Alaska Pollock, arriving Mar 10). **Note:** if GI discomfort, split dose AM/PM and take with food. Fish oil is the most likely cause of stomach upset.
- Protein target of 150g is appropriate (0.86g/lb). 130g is a realistic daily minimum, 150g is a stretch target.
- Protein distribution matters: 30-40g across 4-5 eating occasions > 80g at dinner.
- Full supplement stack + bloodwork notes at `/Users/sophie/Workout Planning/nutrition_notes.md`

## Data & Insights

- [ ] **Oura + workout cross-analysis** -- coach agent reviewing 60 days of Oura data (HRV, sleep, readiness) mapped against workout history. Report pending.
- [ ] **Surface per-set feel trends** -- feel ratings logged but never analyzed. Show which exercises are getting easier over time. (PM)
- [ ] **Session load score** -- RPE x duration = load. Display weekly total. Minimal effort, real insight. (Coach)
- [ ] **Acute:chronic workload ratio** -- rolling 7-day vs 28-day load. Color-coded injury risk indicator. (Coach)
- [ ] **Connect fuel to workout data** -- "trained hard, only hit 80g protein" insight. Both datasets exist. (PM)
- [x] **Readiness gate beyond Tuesday** -- DONE: ADAPTATION_RULES now apply to any day with a DATE_WORKOUTS entry or non-rest SCHEDULE type. Hard rules: <70 rest, <75 recovery, post-180min 48h recovery.
- [ ] **Performance baselines in-app** -- T-test, 20m sprint, beep test targets. Currently only in markdown file. (Coach)
- [ ] **Body-side tracking for bilateral exercises** -- left vs right performance for injury monitoring. (Coach)
- [ ] **Effort type (physical/technical) analysis** -- captured but never surfaced. Training balance insight. (PM)

## UX Reviews (need to go through the whole app)

- [x] **Standardize CTA labels** -- DONE: removed "tap" wording, set pills use "—", history uses "expand/collapse"
- [ ] **Review all exercises: tap vs detail** -- full UX sweep deciding which exercises are simple tap-to-log vs full set modal. Make it consistent or at least intentional across all workout types.
- [ ] **Review all workouts: break into multiple entries?** -- check all days like Wed warmup/cooldown split
- [x] **Shoulder protocol instructions/cues** -- DONE: rewrote all cues with setup/movement/feel. Broke into 4 sections. 90/90 updated to both-arms with Prehab Guys cues. Dynamic External Rotation replaced with Band Throws (pull-into-release). Applied across Mar 6, recovery day, and Mar 16 ParaBody.
- [x] **Exercise notes truncation** -- DONE: CSS line-clamp to 2 lines, tap to expand/collapse.
- [ ] **Adjustment modal stacking** -- "Adjusted from plan?" opens modal-on-modal. Inline instead. (UX, Athlete)
- [x] **Feel scale label inconsistency** -- DONE: set modal now uses same Easy/Moderate/Hard/Very hard/Max scale as completion modal.

## Workout Design (Coach Review)

- [x] **Update default Tuesday upper body** -- DONE: warm-ups and cool-downs built into workout base templates (workout_bases.md). Pallof press and rear delt fly are required exercises.
- [x] **Add hip prehab to Friday lower body** -- DONE: Section 8 hip prehab circuit is the Lower Body warm-up in workout_bases.md.
- [x] **Thursday shoulder protocol missing from app** -- DONE: shoulder protocol is the Bike/Conditioning cool-down in workout_bases.md.
- [x] **Saturday handball session too long** -- DONE: redesigned to modular format with ~65 throw cap, rotatable technique blocks, passing+defense block.
- [x] **Conditioning block placement** -- DONE: non-throwing conditioning moved after technique work in handball session.
- [x] **Add passing drills** -- DONE: passing + defense block with left-hand passing included.
- [x] **Add defensive footwork drills** -- DONE: lateral slides, drop steps, closeouts in passing+defense block.
- [x] **Build in deload week** -- DONE: Fort Davis week (Mar 14-19) structured as ~40-50% volume deload.
- [x] **30-in-3 finisher structure** -- DONE: cue word rule added ("say one cue word before each throw").
- [x] **Add "turn-PULL-throw" rhythm cue to pivot drill in app** -- DONE: identified in video analysis, added to drill cues

## Technical Debt (Frontend/Backend)

- [x] **Worker model version hardcoded** -- DONE: now configurable via env var
- [ ] **showDayPreview() is 350 lines** -- refactor into type-specific renderers. (Frontend)
- [x] **renderWorkout() and renderWorkoutWithAdaptation() duplicate ~40 lines** -- DONE: merged into renderWorkout(workout, adaptationRule) with optional second param.
- [x] **JSON.stringify in onclick handlers is fragile** -- DONE: exerciseLookup map populated during render, onclick uses string key lookup.
- [ ] **Inconsistent persistence strategies** -- readiness=Firestore-first, fuel=localStorage-first, history=Firestore-first. Standardize. (Frontend, Backend)
- [x] **System prompt rebuilt on every coach message** -- DONE: history summary cached, invalidated on Firestore onSnapshot.
- [x] **History re-fetches all 100 docs on every page load** -- DONE: switched to `.onSnapshot()` realtime listener. Only fetches full set once, then receives incremental updates.
- [ ] **dailyState single-doc pattern** -- no historical readiness record. Once day resets, previous readiness gone. (Backend)
- [ ] **Firebase SDK loaded synchronously** -- add `async`/`defer` to unblock HTML parsing. (Frontend)
- [x] **No request timeout on coach** -- DONE: AbortController with 30s timeout. Shows "Request timed out. Try again." on abort.
- [x] **State not reset between multi-workout days** -- DONE: `resetWorkoutState()` consolidates all workout state cleanup, used in all 6 workout-start paths.
- [x] **Midnight rollover** -- DONE: visibilitychange listener detects date change when app returns to foreground, resets to new day.
- [x] **Duplicate log and exercises fields in saved data** -- DONE: removed raw `log` field from saved data. `exercises` is the canonical shape.

## Low Priority / Nice to Have

- [ ] **Loading states** -- visual feedback when data is loading
- [ ] **Fuel tips collapsible** -- don't need to see them every time
- [ ] **Header date context** -- show what day/week you're in
- [ ] **Hover states on mobile** -- clean up touch interactions
- [ ] **prefers-reduced-motion support** -- respect iOS reduced motion setting. (Frontend)
- [ ] **focus-visible styles** -- no keyboard/assistive tech focus indicators on buttons. (Frontend)
- [ ] **Gym high-contrast mode** -- bump text brightness for workout view in bright lighting. (UX)
- [ ] **Condition field not surfaced in UI** -- readiness thresholds exist in data but not shown to user. (Athlete)

## Explore / Separate Project

- [ ] **Training Dashboard (companion web app)** -- separate single HTML file for data analysis and visualization. Same Firestore + Google auth. Read-heavy counterpart to the write-heavy mobile app. Potential views: training volume over time, weight progression per exercise, feel trends, readiness/Oura correlation, fuel/protein consistency, workout type distribution, coach report summaries. Used at a laptop for weekly review and planning, not mid-workout. Hosted alongside tracker on GitHub Pages. Could inform `/plan-workouts` skill with visual context.
- [x] **Video analysis pipeline** -- currently Sophie manually screenshots training video moments for Claude to analyze. Explore options for feeding video directly (e.g. upload clips to multimodal API, frame extraction tool, or a lightweight app that lets you scrub and annotate). Goal: reduce friction from filming → technique feedback. May be its own project outside the tracker app. We built a skill for this

## Structural / Planning

- [ ] **Split handball from leg workouts** -- separate forms, not combined
- [ ] **Handball drill cue pass** -- shorter, clearer, feel-based and rhythmic cues (aphantasia)
- [ ] **Menstrual cycle integration** -- revisit early April once cycle stabilizes. Follicular=peak training, late luteal=back off. (Coach)
- [ ] **Planned deload weeks in future blocks** -- systematic, not accidental from travel. (Coach)
- [x] **Update or replace static SCHEDULE** -- DONE (Phase 1): loadTodaysWorkout() now falls back to showNoWorkout() instead of day-of-week switch. DATE_WORKOUTS is primary. SCHEDULE kept as cosmetic fallback for calendar/preview only.
- [x] **Deprecate SCHEDULE for coach/agent context** -- DONE: coach system prompt now pulls from DATE_WORKOUTS first. Falls back to SCHEDULE only with "default template" label. Added rule: "never assume what she did based on day of week." Fixed dead exerciseLog reference in history summary.

## Done (Mar 14)

- [x] **BUG: Multi-workout day title** -- picks highest-intensity type from array
- [x] **BUG: Protein target on multi-workout days** -- two fixes: actual date + filter out short sessions (< 20 min)
- [x] **BUG: Readiness badge clipped on mobile** -- flex-shrink, gap, flex-wrap fixes
- [x] **BUG: Plan calendar clipped on mobile** -- overflow-hidden on calendar cells
- [x] **BUG: PT edit button clears data** -- canEditCompletedWorkout() checks hasRealExercises() before showing edit button
- [x] **FEATURE: Sport filter catches external activities** -- handball, soccer, futsal, basketball, volleyball regex
- [x] **FEATURE: Discomfort prompt post-workout** -- textarea in completion modal, saved as discomfort field
- [x] **PERF: Coach system prompt caching** -- history summary cached, invalidated on Firestore onSnapshot
- [x] **FUEL: Whey shake updated to 36g** -- removed cottage cheese from recipe
- [x] **INFRA: Firebase service account for CLI** -- firebase-admin Python SDK, service account at ~/.config/training-tracker/
- [x] **INFRA: /log-pt skill** -- PT session intake from photos/notes to Firestore
- [x] **SECURITY: Google Sign-in auth gate** -- popup + redirect fallback, visible error messages
- [x] **CLEANUP: Remove dead WORKOUTS object** -- deleted ~475 lines of unused workout definitions. Extracted pool recovery as standalone `POOL_RECOVERY` constant. `startRecurringWorkout()` → `startPoolRecovery()`.

## Done (Mar 12)

- [x] **FEATURE: Resume button** -- tiles show Resume for in-progress workouts
- [x] **FEATURE: View completed workout details** -- clicking logged tile shows full exercise breakdown
- [x] **FEATURE: Re-edit completed sets** -- edit button on completed view, updates existing Firestore doc
- [x] **FEATURE: Fuel 2am reset** -- late-night eating counts toward current day
- [x] **SECURITY: Google Sign-in auth gate** -- only randolph.sophia@gmail.com can access the app
- [x] **SECURITY: Firestore rules exported** -- `firestore.rules` version-controlled with email-based isOwner()
- [x] **SECURITY: Worker rejects anonymous requests** -- no-origin/no-referer requests denied
- [x] **SECURITY: Removed file:// from worker CORS** -- only GitHub Pages + localhost allowed
- [x] **BUG: Tiles show "Start" instead of "Logged" on first load** -- Firestore snapshot handler now re-renders Today tab
- [x] **BUG: "null/5 effort" on tiles** -- added null guard on overallFeel in all tile templates
- [x] **BUG: Clicking logged tile shows blank workout** -- startMultiWorkout/startInAppWorkout/startRecurringWorkout check history first
- [x] **BUG: State properties not initialized** -- added lastCompletedWorkout, isEditingCompleted, editingDocId, editingOriginalData to initial state
- [x] **BUG: SCHEDULE fallback broken in editCompletedWorkout()** -- fixed to use scheduleEntry.workout and iterate sub-keys
- [x] **BUG: || fallback prevents clearing values during edit** -- changed to ternary null check

## Done (Mar 8)

- [x] Fix kneeling knee cues B1/B2 (pure kneeling = throwing-side knee down)
- [x] Update pivot shot cue (arm separates DURING turn, not after)
- [x] Update jump shot cue (release at peak, not on the way down)
- [x] Update session condition text with video findings
- [x] **BUG: UTC date shift in saveWorkout()** -- replaced toISOString() with formatDateKey()
- [x] **BUG: UTC date shift in calculatePatterns() and summarizeRecentHistory()** -- added T00:00:00 suffix
- [x] **BUG: Sunday pool recovery button broken** -- startRecurringWorkout() now falls back to activeRecovery sub-object
- [x] **BUG: Tuesday preview mismatch** -- title/meta now pulled from actual workout object
- [x] **BUG: Coach history shows wrong workout names** -- now checks w.workout first
- [x] **BUG: Readiness not saved for external activities** -- added readiness field
- [x] **BUG: No duplicate prevention on save** -- idempotent doc ID with .set() instead of .add()
- [x] **BUG: showOriginalWorkout() leaks stale log** -- clears workoutLog and workoutStartTime
- [x] **BUG: Week progress end-of-day** -- WEEK_DATES end dates now 23:59:59
- [x] **BUG: Post-save reloads fresh workout** -- shows completion summary; also checks history on page load
- [x] **SECURITY: Worker CORS was `*`** -- restricted to GitHub Pages origin + localhost + file://
- [x] **SECURITY: Worker passed unvalidated input** -- added input validation, message cap (20), error sanitization
- [x] **SECURITY: Worker model version hardcoded** -- now configurable via env var
- [x] **QUICK FIX: Muted text contrast** -- #6b6280 → #8b82a0
- [x] **QUICK FIX: Calendar font** -- 8px → 10px
- [x] **QUICK FIX: Remove "tap" wording** -- all instances replaced
- [x] **QUICK FIX: Remove timer** -- CSS, HTML, JS all removed
- [x] **QUICK FIX: Fuel undo button** -- 20px → 28px
- [x] **FUEL: Supplement checkboxes** -- creatine, omega-3, magnesium horizontal pills
- [x] **FUEL: Training-day context line** -- dynamic based on actual workout type
- [x] **FUEL: Dynamic protein target** -- 150g training / 130g rest
- [x] **FUEL: Serving size updates** -- matched to actual portions
- [x] **FUEL: Emoji updates** -- Greek flag, heart, house
- [x] **FUEL: Meal/snack catch-all card** -- 10g per tap, top-left position
- [x] **FUEL: Hydration nudges** -- post-workout + fuel tab footer
