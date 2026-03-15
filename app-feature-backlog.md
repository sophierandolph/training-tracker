# Training Tracker App -- Feature Backlog

Collected from sessions through Mar 15, 2026. Includes holistic review from 7 agents (PM, Backend, Frontend, QA, UX, Coach, Athlete) + 3 dashboard review agents (Coach, Athlete, Data Viz).

---

## Bugs (fix these)

- [ ] **Multi-workout progress lost when switching** -- on a multi-workout day, starting a second workout (e.g., Movement Snack) clears in-progress data from the first (e.g., Hip Prehab). Logged sets are wiped. Repro: start workout A, log some sets, tap workout B, complete it, return to A -- progress gone. (Mar 14)

## Features

- [ ] **History view** -- week-over-week calendar layout with checkboxes for completed workouts per day
- [ ] **Streak/consistency tracking** -- running streak, weekly completion rate. Cheapest motivation lever. (Athlete)
- [ ] **Offline sync indicator** -- show "saved locally, will sync" when no connection. Currently silent. (Athlete, Backend)
- [ ] **Rest day logging** -- mark rest as intentional vs missed. Log quick body check (soreness, energy). (PM, Athlete)
- [ ] **Score history for trackScore exercises** -- show last score on finisher/scored drills. (Athlete)
- [ ] **Coach conversation restore on refresh** -- sessions saved to Firestore but never loaded back. (Backend)
- [ ] **Swipe-to-dismiss on modals** -- feels more native on iPhone. (UX)

## Nutrition / Fuel Tab

- [ ] **Post-workout fuel prompt** -- "Have you eaten protein in the last hour?" nudge after saving. (deferred)
- [ ] **Electrolyte tracking** -- especially important as Houston heats up + creatine increases water needs. Add LMNT/Liquid IV as loggable item. (Nutritionist)
- ~~ **Meal combo quick-log** ~~ -- skipped, Sophie doesn't use the combo suggestions much
- ~~ **Add hydration counter** ~~ -- skipped, too much overhead. Using gentle nudges instead.

## Data & Insights

- [ ] **Performance baselines in-app** -- T-test, 20m sprint, beep test targets. Currently only in markdown file. (Coach)
- [ ] **Effort type (physical/technical) analysis** -- captured but never surfaced. Training balance insight. (PM)

## UX Reviews (need to go through the whole app)

- [ ] **Review all exercises: tap vs detail** -- full UX sweep deciding which exercises are simple tap-to-log vs full set modal. Make it consistent or at least intentional across all workout types.
- [ ] **Review all workouts: break into multiple entries?** -- check all days like Wed warmup/cooldown split
- [ ] **Adjustment modal stacking** -- "Adjusted from plan?" opens modal-on-modal. Inline instead. (UX, Athlete)

## Technical Debt (Frontend/Backend)

- [ ] **showDayPreview() is 350 lines** -- refactor into type-specific renderers. (Frontend)
- [ ] **Inconsistent persistence strategies** -- readiness=Firestore-first, fuel=localStorage-first, history=Firestore-first. Standardize. (Frontend, Backend)
- [ ] **dailyState single-doc pattern** -- no historical readiness record. Once day resets, previous readiness gone. (Backend)
- [ ] **Firebase SDK loaded synchronously** -- add `async`/`defer` to unblock HTML parsing. (Frontend)

## Low Priority / Nice to Have

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

- [x] **"This Week at a Glance" summary strip** -- row of stat cards at top: total sessions, total volume, protein hit rate (e.g. "5/7 days on target"), supplement streak, readiness trend arrow. Week-over-week deltas for motivation ("42 sets, +6 from last week"). (Athlete, Coach)
- [x] **Red flag banner system** -- auto-triggered alerts at top of dashboard: readiness <70 for 2+ days, protein under target 3+ days, same body area discomfort 2+ times in 7 days, no prehab in 5+ days. (Coach)
- [ ] **Weight progression tooltips with reps/sets/feel** -- current tooltip only shows weight. Add set count, reps at that weight, and feel rating. PR marker (star) on highest data point. (Athlete, Data Viz)
- [x] **Quick-preset date range buttons** -- "7 days", "4 weeks", "8 weeks", "All time" buttons next to date pickers. Reduces friction especially on mobile. (Athlete, Data Viz)
- [ ] **Protein adherence summary stat** -- "Hit target 5/7 days (71%)" above the chart. Rolling 7-day average line overlaid on daily bars for chronic underfueling visibility. (Coach, Athlete, Data Viz)
- [ ] **Training load vs readiness overlay** -- overlay daily training load (minutes or sets) on the readiness chart so you can see which sessions tank recovery. (Coach, Athlete)
- [ ] **Discomfort frequency summary** -- "Groin: 4 mentions in 28 days" counts above the timeline. Flag recurring body areas. (Coach, Athlete, Data Viz)
- [ ] **Firestore query caching** -- cache full dataset on first load, filter client-side on date range change. Only re-fetch if range extends beyond cache. Prevents quota burn and slowness as data grows. (Data Viz)

### Medium Priority

- [ ] **Feel trends exercise selector** -- replace auto-top-5 with multi-select or clickable legend. Coach wants to watch specific exercises (hip-adjacent, shoulder). (Athlete, Coach)
- [ ] **Readiness zone visibility** -- bump zone shading opacity from 6-8% to 12-15%, or add dashed reference lines at 65 and 75 with labels. (Athlete, Data Viz)
- [ ] **Workout day tooltip on readiness chart** -- click/hover workout marker to see workout name and duration. (Data Viz)
- [ ] **Volume summary stat** -- total sets or hours above the volume chart without hovering. (Data Viz)
- [ ] **Week-over-week ghost bars on volume chart** -- thin outline showing previous period's volume behind current bars. (Data Viz)
- [ ] **Session RPE tracking** -- post-session RPE (1-10) at workout level, separate from per-set feel. RPE x duration = session load score. (Coach)
- [ ] **Bilateral balance view** -- left vs right weight/feel for unilateral exercises (DB row, single leg RDL, lunges). Flag asymmetries. (Coach)
- [ ] **Planned vs actual volume line** -- reference line on volume chart showing prescribed volume so you can distinguish deload from missed sessions. (Coach)
- [ ] **Supplement adherence rate** -- show "22/28 days" next to streak count. Streak can break and restart, hiding good consistency. (Data Viz)
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

- [ ] **Split handball from leg workouts** -- separate forms, not combined
- [ ] **Handball drill cue pass** -- shorter, clearer, feel-based and rhythmic cues (aphantasia)
- [ ] **Menstrual cycle integration** -- revisit early April once cycle stabilizes. Follicular=peak training, late luteal=back off. (Coach)
- [ ] **Planned deload weeks in future blocks** -- systematic, not accidental from travel. (Coach)

---

## Done (Mar 15)

- [x] **Training Dashboard built** -- `dashboard.html` with 7 charts: Training Volume (sets/minutes toggle), Weight Progression, Readiness + HRV + Sleep, Protein Adherence, Supplement Streak, Feel Trends, Discomfort Timeline. Same Firebase/auth as tracker.
- [x] **`/weekly-review` skill** -- fetches workouts + fuel + Oura, syncs Oura to Firestore, runs 3 parallel analysis agents, saves markdown report. Recency flag for extended data ranges.
- [x] **Oura Firestore sync** -- `oura/{YYYY-MM-DD}` collection with readiness, HRV, RHR, sleep duration, temp deviation. Rules deployed.
- [x] **Exercise name normalization** -- `EXERCISE_ALIASES` map in dashboard for consistent weight progression tracking. ~40 mappings.
- [x] **PT session backfill** -- Feb 9 and Mar 2 PT sessions backfilled from notes/photos into structured exercise arrays.
- [x] **Creatine backfill** -- all fuel log days updated to creatine=true.
- [x] **Protein adherence context-aware coloring** -- uses fuel log `target` field (130/150), green=hit, gold=within 10%, red=under.

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
- [x] **CLEANUP: Remove SCHEDULE** -- DATE_WORKOUTS is sole source of truth. SCHEDULE fully removed.
- [x] **CLEANUP: Deprecate SCHEDULE for coach/agent context** -- coach system prompt pulls from DATE_WORKOUTS first. Added rule: "never assume what she did based on day of week."
- [x] **SECURITY: Deploy updated worker.js** -- installed Node via Homebrew, deployed with wrangler. CORS restricted, anonymous requests denied, model default updated to claude-sonnet-4-6.
- [x] **INFRA: `/deploy` skill** -- 3 parallel QA agents (code quality, view consistency, data flow) + commit + preview + push + backlog cleanup. Replaced manual 4-step QA process in CLAUDE.md.

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
