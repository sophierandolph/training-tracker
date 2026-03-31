# Training Tracker App -- Feature Backlog

Collected from sessions through Mar 20, 2026. Includes holistic review from 7 agents (PM, Backend, Frontend, QA, UX, Coach, Athlete) + 3 dashboard review agents (Coach, Athlete, Data Viz).

---

## Bugs (fix these)

- [x] **showDayPreview() missing DATE_ACTIVITIES** -- after the travel handler, falls through to EXTERNAL_ACTIVITIES with no DATE_ACTIVITIES check. Non-travel day with date-specific activities but no DATE_WORKOUTS would show "No workout planned." -- Fixed Mar 28.
- [ ] **renderCalendar() and renderUpcomingWorkouts() DATE_ACTIVITIES before travel** -- both check DATE_ACTIVITIES before travel/SPECIAL_DATES in the else-if chain. Display-only, not routing. Low priority.
- [ ] **Normalize old /10 effort scores to /5** -- Early sessions (pre-Feb?) logged overallFeel on a 1-10 scale. Current scale is 1-5. Firestore sweep needed: divide by 2 for any overallFeel > 5. Example: Feb 11 Baker gym logged as 6/5. Also check per-set feel values in exercises arrays.

### Fixed

- [x] **Adaptation not persisting on reload** -- entering readiness showed "rest day, no exceptions" but closing and reopening showed original workouts. Root cause: `loadState()` is async but `loadTodaysWorkout()` ran before readiness loaded. Fix: re-apply adaptation rules in `loadState()` callback after state is populated. -- Fixed Mar 24.
- [x] **Adaptation replaced planned recovery with generic POOL_RECOVERY** -- low readiness swapped in the bundled 45-min POOL_RECOVERY constant even when a lighter, tailored recovery was already scheduled. Fix: adaptation now checks workout type first. All-recovery days pass through. Mixed arrays (e.g. pool + movement snack) filter to recovery-only and show what was dropped. POOL_RECOVERY only used as last resort. -- Fixed Mar 24.
- [x] **Readiness threshold too aggressive** -- full rest triggered at <70, blocking pool recovery on days like 68. Lowered to <60 per coach rationale: pool is therapeutic not taxing, and Prozac taper artificially suppresses Oura scores through ~April. New tiers: <60 full rest, 60-74 recovery only, 75+ normal. -- Fixed Mar 24. Updated Mar 27: lowered recovery gate from <75 to <68 (75 was blocking trainable days during luteal phase + Prozac taper). Move to <72 after taper clears (~May).
- [x] **Flash of unfiltered workouts on Today tab switch** -- obsolete after removing the silent readiness filter from loadTodaysWorkout(). Both workouts now intentionally show; applyAdaptationsAndReload() handles adaptation banners on Oura save. -- Fixed Mar 26.
- [x] **External activity difficulty shows /10 instead of /5** -- intensity stored on 1-5 scale but displayed as "/10" in 3 tile templates. -- Fixed Mar 26.
- [x] **Workouts disappear after logging Oura data** -- duplicate silent readiness filter in loadTodaysWorkout() hid non-recovery workouts on multi-workout days without a banner. Removed; applyAdaptationsAndReload() already handles this properly. -- Fixed Mar 26.

## Features

- [x] **Composable workout blocks** -- POOL_RECOVERY broken into BLOCK_POOL_SWIMMING, BLOCK_FOAM_ROLL_STRETCH, BLOCK_SHOULDER_SHIN_PREHAB. POOL_RECOVERY composed from them. Ready for mix-and-match in DATE_WORKOUTS and `/plan-workouts`. -- DONE Mar 20.
- [x] **Smart readiness adaptation system** -- DONE Mar 28. READINESS_CONFIG with phased thresholds (68 now, 72 after May taper review). HRV warning rule (90% of 7-day rolling median, floor 35). Trend modifier (3-day vs 7-day avg). Manual override with self-check (energy/soreness/motivation 3+/5, no back-to-back, 80% cap). Late HR drop toggle as compounding modifier. Consulted coach/PT/sports med on HRV thresholds.
- [ ] **History view** -- week-over-week calendar layout with checkboxes for completed workouts per day
- [ ] **Calendar completed-day detection** -- check Firestore workout history in renderCalendar() to green-tint only days with logged workouts (not just all past days). Current CSS approximation: all past = green.
- [ ] **Streak/consistency tracking** -- running streak, weekly completion rate. Cheapest motivation lever. (Athlete)
- [ ] **Offline sync indicator** -- show "saved locally, will sync" when no connection. Currently silent. (Athlete, Backend)
- [ ] **Rest day logging** -- mark rest as intentional vs missed. Log quick body check (soreness, energy). (PM, Athlete)
- [ ] **Score history for trackScore exercises** -- show last score on finisher/scored drills. (Athlete)
- [ ] **Coach conversation restore on refresh** -- sessions saved to Firestore but never loaded back. (Backend)
- [ ] **Swipe-to-dismiss on modals** -- feels more native on iPhone. (UX)
- [ ] **Exercise video references** -- exercises can carry a `videoRef` URL (e.g. Instagram reel link). AI coach surfaces the link when Sophie asks "show me how" for an unfamiliar exercise. Could also show a small video icon on exercises that have a reference. Needs: Sophie to save Instagram post URLs alongside downloaded reels. (Coach, Athlete)

## Nutrition / Fuel Tab

- [ ] **Post-workout fuel prompt** -- "Have you eaten protein in the last hour?" nudge after saving. (deferred)
- [ ] **Electrolyte tracking** -- especially important as Houston heats up + creatine increases water needs. Add LMNT/Liquid IV as loggable item. (Nutritionist)
- ~~ **Meal combo quick-log** ~~ -- skipped, Sophie doesn't use the combo suggestions much
- ~~ **Add hydration counter** ~~ -- skipped, too much overhead. Using gentle nudges instead.

## Data & Insights

- [ ] **Performance baselines in-app** -- T-test, 20m sprint, beep test targets. Currently only in markdown file. (Coach)
- [ ] **Effort type (physical/technical) analysis** -- captured but never surfaced. Training balance insight. (PM)

## Technical Debt (Frontend/Backend)

- [ ] **showDayPreview() is 350 lines** -- refactor into type-specific renderers. (Frontend)
- [ ] **Inconsistent persistence strategies** -- readiness=Firestore-first, fuel=localStorage-first, history=Firestore-first. Standardize. (Frontend, Backend)
- [ ] **dailyState single-doc pattern** -- no historical readiness record. Once day resets, previous readiness gone. (Backend)
- [ ] **Firebase SDK loaded synchronously** -- add `async`/`defer` to unblock HTML parsing. (Frontend)

## Low Priority / Nice to Have

- [x] **Coach view welcome screen takes full height** -- fixed Mar 29. Chips + input bar wrapped in fixed-position `.coach-bottom` div above nav. Welcome state centered with `margin: auto`.
- [ ] **Loading states** -- visual feedback when data is loading
- [ ] **Fuel tips collapsible** -- don't need to see them every time
- [ ] **Header date context** -- show what day/week you're in
- [ ] **Hover states on mobile** -- clean up touch interactions
- [ ] **prefers-reduced-motion support** -- respect iOS reduced motion setting. (Frontend)
- [ ] **focus-visible styles** -- no keyboard/assistive tech focus indicators on buttons. (Frontend)
- [ ] **Gym high-contrast mode** -- bump text brightness for workout view in bright lighting. (UX)
- [ ] **Condition field not surfaced in UI** -- readiness thresholds exist in data but not shown to user. (Athlete)

## Dashboard (dashboard.html)

### High Priority

- [ ] **Weight progression tooltips with reps/sets/feel** -- current tooltip only shows weight. Add set count, reps at that weight, and feel rating. PR marker (star) on highest data point. (Athlete, Data Viz)
- [ ] **Discomfort frequency summary** -- "Groin: 4 mentions in 28 days" counts above the timeline. Flag recurring body areas. (Coach, Athlete, Data Viz)
- [ ] **Firestore query caching** -- cache full dataset on first load, filter client-side on date range change. Only re-fetch if range extends beyond cache. Prevents quota burn and slowness as data grows. (Data Viz)

### Medium Priority

- [ ] **Feel trends exercise selector** -- replace auto-top-5 with multi-select or clickable legend. Coach wants to watch specific exercises (hip-adjacent, shoulder). (Athlete, Coach)
- [ ] **Volume summary stat** -- total sets or hours above the volume chart without hovering. (Data Viz)
- [ ] **Week-over-week ghost bars on volume chart** -- thin outline showing previous period's volume behind current bars. (Data Viz)
- [ ] **Session RPE tracking** -- post-session RPE (1-10) at workout level, separate from per-set feel. RPE x duration = session load score. (Coach)
- [ ] **Bilateral balance view** -- left vs right weight/feel for unilateral exercises (DB row, single leg RDL, lunges). Flag asymmetries. (Coach)
- [ ] **Planned vs actual volume line** -- reference line on volume chart showing prescribed volume so you can distinguish deload from missed sessions. (Coach)
- [ ] **Supplement adherence rate** -- show "22/28 days" next to streak count. Streak can break and restart, hiding good consistency. (Data Viz)
- [ ] **Rethink supplement streak framing** -- current streak/heatmap can encourage lying to keep a streak alive. Reframe to be encouraging, not punitive. Show consistency rate instead of streak length. Avoid harsh "missed" language. (Sophie)
- [ ] **Dashboard: 90/90 protein adherence** -- app fuel bar now uses 90% threshold (yellow en route, green at 90%+). Dashboard protein adherence chart + summary stat should match: "hit" = 90%+ of daily target, not 100%. Update bar coloring, adherence rate calc, and summary text. Do alongside next weekly review. (Sophie)
- [ ] **Consecutive training day indicator** -- flag streaks of training days without rest, or days between same muscle group sessions. (Athlete)
- [ ] **Chart.js update() instead of destroy/recreate** -- use `chart.update()` with new data for smoother transitions and better performance. (Data Viz)
- [ ] **Export/share** -- download button per card (CSV) or "Copy Weekly Summary" for sharing with trainer. (Athlete, Data Viz)

### Low Priority

- [ ] **Feel trends as small multiples** -- sparklines stacked vertically instead of overlapping lines. Cleaner as exercise count grows. (Data Viz)
- [ ] **Tryout countdown and phase indicator** -- "X weeks to tryouts" + current training phase (base, sport-specific, peaking). (Coach)
- [ ] **Supplement streak day labels** -- date number inside calendar cells, or label first of each month. Currently unlabeled on mobile. (Athlete)
- [ ] **classifyExercise() default to "Other"** -- currently defaults unrecognized exercises to "Push". Use neutral "Other" category so miscategorizations are visible. (Data Viz)
- [ ] **Duplicate EXERCISE_ALIASES entries** -- clean up `single arm db row` and `seated cable row` appearing twice. (Data Viz)
- [ ] **Align default date range to full training weeks** -- Monday to Sunday instead of raw 28-day lookback. (Athlete)
- [ ] **Feel trends color palette** -- currently reuses colors from other charts. Use distinct palette or dashed/dotted line styles. (Data Viz)

## Structural / Planning

- [x] **Split handball from leg workouts** -- Mar 7 split into Lower Body Strength + Handball: Jump Shot + Left Hand. -- DONE Mar 20.
- [ ] **Warm-up/cool-down block coverage audit** -- ensure every workout type has a BLOCK_ warm-up and cool-down wired in. Current gaps: Mar 1 upper body uses different cool-down (Doorway Pec + Tricep vs Chest Opener + Thread the Needle) -- decide on one canonical UB cool-down. Lower body warm-ups/cool-downs vary per instance (different exercises, progressing hold times) -- decide if a canonical block works or if variation is intentional. Throwing/handball warm-ups and cool-downs not yet blocked. `/plan-workouts` should auto-include blocks for every workout it generates.
- [x] **Location realism reference doc** -- `reference/location_equipment.md` with equipment, good-for, limitations, and access notes per location. Wire into `/plan-workouts` coach review step. Started Mar 28, Sophie filling in details.
- [ ] **Handball drill cue pass** -- shorter, clearer, feel-based and rhythmic cues (aphantasia)
- [ ] **Menstrual cycle integration** -- revisit early April once cycle stabilizes. Follicular=peak training, late luteal=back off. (Coach)
- [ ] **Planned deload weeks in future blocks** -- systematic, not accidental from travel. (Coach)

---

## Done (Mar 19-20)

- [x] **UX: Inline adjustment UI** -- replaced stacked modal with inline expandable section inside set modal. Mar 20.
- [x] **UX: Autofocus weight input** -- set modal autofocuses weight (or reps for noWeight). Mar 20.
- [x] **UX: 44px modal close buttons** -- touch target from 36px to 44px. Mar 20.
- [x] **UX: Dismissable completion modal** -- backdrop click + close button. Mar 20.
- [x] **UX: Finish workout confirmation** -- confirm() showing sets completed count. Mar 20.
- [x] **UX: Exercise notes readability** -- 13px, secondary color (was 12px, muted). Mar 20.
- [x] **UX: Feel button padding** -- 8px horizontal (was 4px). Mar 20.
- [x] **UX: Auto-scroll to current circuit** -- after logging a set. Mar 20.
- [x] **UX: Save feedback toast** -- showToast() on Firestore writes. Mar 20.
- [x] **UX: Tab switch guard** -- confirm() when leaving Today with active workout. Mar 20.
- [x] **UX: Review all exercises: tap vs detail** -- `simple: true` on 64 circuits. Fixed Mar 27 warm-up bug. Mar 20.
- [x] **UX: Review all workouts: break into multiple entries** -- Split Feb 19 and Mar 7. Mar 20.
- [x] **UX: Adjustment modal stacking** -- inline instead of modal-on-modal. Mar 20.
- [x] **FEATURE: Composable workout blocks** -- POOL_RECOVERY broken into 3 BLOCK_ constants. Mar 20.
- [x] **FEATURE: Warm-up/cool-down blocks** -- BLOCK_UB_WARMUP, BLOCK_UB_COOLDOWN, BLOCK_SHOULDER_WARMUP, BLOCK_BIKE_COOLDOWN, BLOCK_PSOAS_PROTOCOL. Wired into 16 workouts. Mar 20.
- [x] **STRUCTURAL: Split handball from leg workouts** -- Mar 7 split into Lower Body + Handball tiles. Mar 20.
- [x] **BUG: Multi-workout progress lost when switching** -- autosave now uses per-workout localStorage keys (`workoutInProgress_<name>`) so each workout's progress is independent. Stale keys from previous dates cleaned up automatically. Mar 19.
- [x] **BUG: Skipped set pill stays grayed out after re-logging** -- `logSet()` now removes `skipped` class before adding `complete`. Mar 19.
- [x] **FUEL: 90/90 protein bar** -- yellow en route, green at 90% of target, green-gold gradient over 100%. Mar 19.
- [x] **SCHEDULE: Extended Fort Davis stay** -- Amtrak cancelled. Updated Mar 19-22 (yoga, friend's gym placeholder, pre-drive mobility, drive day stretch). Mar 19.
- [x] **SCHEDULE: Week 7 workouts (Mar 23-29)** -- first full week back from deload. ACWR ~1.19. Coach reviewed. Mar 20.
- [x] **INFRA: PT time updated** -- 5pm / 50 min (was 4pm / 60 min). Mar 20.

## Done (Mar 17)

- [x] **BUG: noWeight exercises suppress note field in set modal** -- RESOLVED: The real bug was in saveWorkout() -- it only persisted weight/reps/feel per set, dropping note, effortType, and filmed fields entirely. Fixed Mar 17.
- [x] **BUG: Today tab doesn't reset to actual today** -- showView('today') now resets state.currentDate to new Date(). Mar 17.

## Done (Mar 15)

- [x] **Training Dashboard built** -- `dashboard.html` with 7 charts: Training Volume (sets/minutes toggle), Weight Progression, Readiness + HRV + Sleep, Protein Adherence, Supplement Streak, Feel Trends, Discomfort Timeline. Same Firebase/auth as tracker.
- [x] **`/weekly-review` skill** -- fetches workouts + fuel + Oura, syncs Oura to Firestore, runs 3 parallel analysis agents, saves markdown report. Recency flag for extended data ranges.
- [x] **Oura Firestore sync** -- `oura/{YYYY-MM-DD}` collection with readiness, HRV, RHR, sleep duration, temp deviation. Rules deployed.
- [x] **Exercise name normalization** -- `EXERCISE_ALIASES` map in dashboard for consistent weight progression tracking. ~40 mappings.
- [x] **PT session backfill** -- Feb 9 and Mar 2 PT sessions backfilled from notes/photos into structured exercise arrays.
- [x] **Creatine backfill** -- all fuel log days updated to creatine=true.
- [x] **Protein adherence context-aware coloring** -- uses fuel log `target` field (130/150), green=hit, gold=within 10%, red=under.
- [x] **"This Week at a Glance" summary strip** -- row of stat cards at top of dashboard. (Athlete, Coach)
- [x] **Red flag banner system** -- auto-triggered alerts at top of dashboard. (Coach)
- [x] **Quick-preset date range buttons** -- "7 days", "4 weeks", "8 weeks", "All time". (Athlete, Data Viz)
- [x] **Protein adherence summary stat** -- "Hit target 5/7 days (71%)" above chart + rolling 7-day average line. (Coach, Athlete, Data Viz)
- [x] **Training load vs readiness overlay** -- tried it, too busy. Removed. (Coach, Athlete)
- [x] **Readiness zone visibility** -- tuned to 4-6% opacity. (Data Viz)

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
- [x] **CLEANUP: Remove dead WORKOUTS object** -- deleted ~475 lines. Extracted POOL_RECOVERY.
- [x] **CLEANUP: Remove SCHEDULE** -- DATE_WORKOUTS is sole source of truth.
- [x] **CLEANUP: Deprecate SCHEDULE for coach/agent context** -- coach pulls from DATE_WORKOUTS first.
- [x] **SECURITY: Deploy updated worker.js** -- CORS restricted, anonymous requests denied, model updated.
- [x] **INFRA: `/deploy` skill** -- 3 parallel QA agents + commit + preview + push + backlog cleanup.

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

## Done (earlier)

- [x] **FEATURE: Show last-session weight/reps next to each exercise** -- getLastSessionData() pulls from history, "Last:" line shown under exercise target for weighted exercises.
- [x] **FEATURE: Simplify set modal** -- effort type, adjustment, and notes collapsed under "More options...". Auto-carry effort type from previous set. Video toggle added.
- [x] **FEATURE: Navigate to past/future days from Today view** -- left/right arrow buttons on date display + "Today" pill to return.
- [x] **FEATURE: History filtering and pagination** -- filter pills (All/Strength/Sport/Recovery/External) + "Load more" button with remaining count. 10 items per page.
- [x] **FEATURE: Auto-extend plan calendar beyond WEEK_DATES** -- getActiveWeeks() hides past weeks, auto-generates future weeks through today + 2 weeks.
- [x] **FEATURE: Post-workout comparison to last time** -- completion modal shows volume % change vs last same-name session + exercise-level weight PRs.
- [x] **FEATURE: "Took video" toggle** -- camera toggle in set modal, film indicator on set pills, saved to set data.
- [x] **FEATURE: Movement snack mini-sessions** -- built into DATE_WORKOUTS as separate array entries (10-15 min handball form drills).
- [x] **FEATURE: Free-entry protein logging** -- "+" card in fuel grid opens modal with name + grams. Custom entries with remove button.
- [x] **FEATURE: Equipment checklist** -- embedded in DATE_WORKOUTS `condition` field text.
- [x] **FEATURE: "You are here" indicator in workout** -- completed circuits dim to 50% opacity, current circuit gets lavender border.
- [x] **FEATURE: Sticky finish button** -- sticky bottom with gradient fade background.
- [x] **FEATURE: Scroll position preserved on view switch** -- saves/restores scroll position per view tab.
- [x] **FEATURE: Injury/discomfort prompt post-workout** -- textarea in completion modal, saved as discomfort field, included in coach context.
- [x] **FEATURE: Confirmation flash on set log** -- scale + glow animation on set pill when logged.
- [x] **FEATURE: Readiness gate beyond Tuesday** -- ADAPTATION_RULES apply to any day with a DATE_WORKOUTS entry. Hard rules: <70 rest, <75 recovery, post-180min 48h recovery.
- [x] **FEATURE: Video analysis pipeline** -- /video-analysis skill for handball drill feedback from video.
- [x] **SECURITY: Firestore security rules** -- configured in Firebase console. Exported to `firestore.rules`.
- [x] **SECURITY: No authentication** -- Google Sign-in with email check. Auth gate blocks app. Firestore rules enforce server-side.
- [x] **QUICK FIX: Remove "tap" wording** -- all instances replaced with cleaner labels.
- [x] **QUICK FIX: Calendar short names** -- Sport-Specific→Sport, Conditioning→Cardio+. Added getShortTypeName().
- [x] **QUICK FIX: No doc ID stored** -- docId stored on save and captured from Firestore doc.id on load.
- [x] **UX: Standardize CTA labels** -- removed "tap" wording, set pills use "---", history uses "expand/collapse"
- [x] **UX: Shoulder protocol instructions/cues** -- rewrote all cues with setup/movement/feel. 90/90 updated. Band Throws replaced Dynamic External Rotation.
- [x] **UX: Exercise notes truncation** -- CSS line-clamp to 2 lines, tap to expand/collapse.
- [x] **UX: Feel scale label inconsistency** -- set modal uses same Easy/Moderate/Hard/Very hard/Max scale as completion modal.
- [x] **WORKOUT DESIGN: Update default Tuesday upper body** -- warm-ups and cool-downs in workout_bases.md. Pallof press and rear delt fly required.
- [x] **WORKOUT DESIGN: Add hip prehab to Friday lower body** -- Section 8 hip prehab circuit is Lower Body warm-up.
- [x] **WORKOUT DESIGN: Thursday shoulder protocol in app** -- shoulder protocol is Bike/Conditioning cool-down.
- [x] **WORKOUT DESIGN: Saturday handball session too long** -- redesigned to modular format with ~65 throw cap, rotatable technique blocks.
- [x] **WORKOUT DESIGN: Conditioning block placement** -- non-throwing conditioning moved after technique work.
- [x] **WORKOUT DESIGN: Add passing drills** -- passing + defense block with left-hand passing.
- [x] **WORKOUT DESIGN: Add defensive footwork drills** -- lateral slides, drop steps, closeouts.
- [x] **WORKOUT DESIGN: Build in deload week** -- Fort Davis week (Mar 14-19) at ~40-50% volume.
- [x] **WORKOUT DESIGN: 30-in-3 finisher structure** -- cue word rule ("say one cue word before each throw").
- [x] **WORKOUT DESIGN: Pivot drill rhythm cue** -- "turn-PULL-throw" added from video analysis.
- [x] **TECH DEBT: renderWorkout() merge** -- merged with renderWorkoutWithAdaptation() into single function with optional adaptationRule param.
- [x] **TECH DEBT: JSON.stringify in onclick handlers** -- exerciseLookup map populated during render, onclick uses string key lookup.
- [x] **TECH DEBT: History re-fetches all docs on load** -- switched to .onSnapshot() realtime listener.
- [x] **TECH DEBT: No request timeout on coach** -- AbortController with 30s timeout.
- [x] **TECH DEBT: State not reset between multi-workout days** -- resetWorkoutState() consolidates cleanup, used in all workout-start paths.
- [x] **TECH DEBT: Midnight rollover** -- visibilitychange listener detects date change, resets to new day.
- [x] **TECH DEBT: Duplicate log and exercises fields** -- removed raw log field. exercises is canonical shape.
