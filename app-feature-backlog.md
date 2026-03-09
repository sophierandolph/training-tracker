# Training Tracker App -- Feature Backlog

Collected from sessions through Mar 8, 2026. Includes holistic review from 7 agents (PM, Backend, Frontend, QA, UX, Coach, Athlete).

---

## Bugs (fix these)

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

- [ ] **Firestore security rules missing** -- no `firestore.rules` in repo. If still on test-mode rules, anyone can read/write all data. Deploy restrictive rules. (Backend)
- [x] **Worker CORS is `*`** -- FIXED: restricted to GitHub Pages + localhost + file://
- [x] **Worker passes client-controlled system prompt directly to Anthropic** -- FIXED: origin check, input validation, message cap, error sanitization

## Quick Fixes

- [x] **Remove "tap" wording on simple save buttons** -- DONE: "Tap to log" → "Log", set pills "tap" → "—", "tap to expand" → "expand"
- [x] **Remove timer everywhere** -- DONE: removed CSS, HTML, and all JS
- [x] **Fuel undo button size** -- DONE: 20px → 28px with 14px font
- [x] **Fix muted text contrast** -- DONE: #6b6280 → #8b82a0
- [x] **Calendar font too small** -- DONE: 8px → 10px for workout text and travel badges
- [x] **Workout Plan Calendar View needs short names** - DONE: Sport-Specific→Sport, Conditioning→Cardio+, removed +Warm/Cool indicator. Added getShortTypeName() function.
- [ ] **No doc ID stored in workout records** -- can't update or delete specific workouts from client. Store Firestore doc ID in cache. (Backend)

## High Impact Features

- [ ] **Show last-session weight/reps next to each exercise** -- "Last: 60lb x 10" under each target. Pull from Firestore history. #1 most-requested across PM and Athlete reviews. Eliminates guesswork every gym session.
- [ ] **Simplify set modal** -- weight + reps as primary, feel/effort/notes collapsed or deferred. Auto-carry forward feel and effort from previous set. Quick +/- buttons for weight. Reduce from 3-6 taps to 1-2 per set. (UX, Athlete)
- [ ] **Navigate to past/future days from Today view** -- date picker or arrows. Fix "forgot to log yesterday" dead-end. (PM)
- [ ] **History filtering and pagination** -- currently 10 items, no filter. Add "Load more" + type filter (Strength/Sport/Recovery/External). (PM, Athlete)
- [ ] **Auto-extend plan calendar beyond WEEK_DATES** -- after Week 6 (Mar 22), show default weekly schedule instead of going blank. (PM)
- [ ] **Post-workout comparison to last time** -- "Total volume: 4,320 lbs (up 8% from last Upper Body)". Surface PRs. (Athlete)

## Features

- [ ] **"Took video" toggle** -- mark individual sets where you filmed for later review
- [ ] **History view** -- week-over-week calendar layout with checkboxes for completed workouts per day
- [ ] **Re-edit completed sets** -- go back and fix a logged set after saving
- [ ] **Movement snack mini-sessions** -- decide in-app vs informal
- [ ] **Streak/consistency tracking** -- running streak, weekly completion rate. Cheapest motivation lever. (Athlete)
- [ ] **Offline sync indicator** -- show "saved locally, will sync" when no connection. Currently silent. (Athlete, Backend)
- [ ] **Rest day logging** -- mark rest as intentional vs missed. Log quick body check (soreness, energy). (PM, Athlete)
- [ ] **Equipment checklist** -- "Bring: loop band, handball" at top of workout header. (Athlete)
- [ ] **Score history for trackScore exercises** -- show last score on finisher/scored drills. (Athlete)
- [ ] **Coach conversation restore on refresh** -- sessions saved to Firestore but never loaded back. (Backend)
- [ ] **"You are here" indicator in workout** -- dim/collapse completed circuits, highlight current. (UX, Athlete)
- [ ] **Sticky finish button** -- don't bury at bottom of long workouts. Float or pin. (UX)
- [ ] **Swipe-to-dismiss on modals** -- feels more native on iPhone. (UX)
- [ ] **Scroll position preserved on view switch** -- switching away from Today mid-workout loses your place. (UX, Frontend)
- [ ] **Injury/discomfort prompt post-workout** -- specific "Any pain or discomfort?" field. (Athlete)
- [ ] **Confirmation flash on set log** -- brief visual pulse when set pill goes green. (UX)

## Nutrition / Fuel Tab

- [x] **Supplement checkboxes** -- DONE: creatine, omega-3, magnesium as horizontal pill toggles. Save to Firestore. Reset daily.
- [x] **Training-day context line on Fuel view** -- DONE: pulls from actual loaded workout type. Dynamic message.
- [x] **Dynamic protein target** -- DONE: 150g on training days, 130g on rest/recovery/cardio. Progress bar and label adjust.
- [x] **Evaluate serving sizes** -- DONE: updated to match Sophie's actual portions (most halved from 1 cup to ½ cup).
- [x] **Pick emojis for fuel cards** -- DONE: Greek flag for yogurt, heart for cashews, house for cottage cheese.
- [x] **Meal/snack catch-all card** -- DONE: ~10g per tap for incidental protein from non-tracked foods. Top-left position.
- [x] **Hydration nudges** -- DONE: "Drink a full bottle of water now" in completion modal + gentle reminder at bottom of Fuel tab. No tracking.
- [ ] **Update whey shake protein value** -- waiting on Sophie to dial in recipe (whey arriving Mar 10). Currently 33g.
- [ ] **Post-workout fuel prompt** -- "Have you eaten protein in the last hour?" nudge after saving. (deferred)
- [ ] **Electrolyte tracking** -- especially important as Houston heats up + creatine increases water needs. Add LMNT/Liquid IV as loggable item. (Nutritionist)
- ~~ **Meal combo quick-log** ~~ -- skipped, Sophie doesn't use the combo suggestions much
- ~~ **Add hydration counter** ~~ -- skipped, too much overhead. Using gentle nudges instead.

**Nutritionist notes for Sophie (not app features):**
- [x] Testing ferritin + vitamin D levels -- appointment booked Wed Mar 11. Also requesting iron panel + CBC.
- [x] Magnesium glycinate 200-400mg before bed -- ORDERED (Sports Research 160mg, arriving Mar 20-27)
- [x] Omega-3 EPA/DHA 2-3g/day -- ORDERED (Sports Research Fish Oil 1250mg from Wild Alaska Pollock, arriving Mar 10)
- Protein target of 150g is appropriate (0.86g/lb). 130g is a realistic daily minimum, 150g is a stretch target.
- Protein distribution matters: 30-40g across 4-5 eating occasions > 80g at dinner.
- Full supplement stack + bloodwork notes at `/Users/sophie/Workout Planning/nutrition_notes.md`

## Data & Insights

- [ ] **Oura + workout cross-analysis** -- coach agent reviewing 60 days of Oura data (HRV, sleep, readiness) mapped against workout history. Report pending.
- [ ] **Surface per-set feel trends** -- feel ratings logged but never analyzed. Show which exercises are getting easier over time. (PM)
- [ ] **Session load score** -- RPE x duration = load. Display weekly total. Minimal effort, real insight. (Coach)
- [ ] **Acute:chronic workload ratio** -- rolling 7-day vs 28-day load. Color-coded injury risk indicator. (Coach)
- [ ] **Connect fuel to workout data** -- "trained hard, only hit 80g protein" insight. Both datasets exist. (PM)
- [ ] **Readiness gate beyond Tuesday** -- extend to Friday lower body and Saturday handball. (Coach)
- [ ] **Performance baselines in-app** -- T-test, 20m sprint, beep test targets. Currently only in markdown file. (Coach)
- [ ] **Body-side tracking for bilateral exercises** -- left vs right performance for injury monitoring. (Coach)
- [ ] **Effort type (physical/technical) analysis** -- captured but never surfaced. Training balance insight. (PM)

## UX Reviews (need to go through the whole app)

- [x] **Standardize CTA labels** -- DONE: removed "tap" wording, set pills use "—", history uses "expand/collapse"
- [ ] **Review all exercises: tap vs detail** -- decide simple tap vs detailed entry per exercise
- [ ] **Review all workouts: break into multiple entries?** -- check all days like Wed warmup/cooldown split
- [ ] **Shoulder protocol instructions/cues** -- better descriptions, band types
- [ ] **Exercise notes truncation** -- long notes (50+ words) should truncate to 1-2 lines with "more" tap. (UX)
- [ ] **Adjustment modal stacking** -- "Adjusted from plan?" opens modal-on-modal. Inline instead. (UX, Athlete)
- [ ] **Feel scale label inconsistency** -- set modal uses RIR (reps in reserve), completion modal uses RPE. Inverted scales. (UX)

## Workout Design (Coach Review)

- [ ] **Update default Tuesday upper body** -- missing warm-up, no rotational core (Pallof press), no rear delt work. Use Crunch Kyle session as template. (Coach)
- [ ] **Add hip prehab to Friday lower body** -- Section 8 exercises designed for this but not in the Friday workout. (Coach)
- [ ] **Thursday shoulder protocol missing from app** -- SCHEDULE says "Bike + Shoulder Protocol" but workout only has bike. (Coach)
- [ ] **Saturday handball session too long** -- 7 blocks, 100+ throws. Cap at 60-70 throws, rotate blocks weekly. Fatigue degrades form (confirmed by video analysis). (Coach)
- [ ] **Conditioning block placement** -- "Sprint + Catch + Shoot" asks for form under fatigue. Move after finisher or use non-throwing conditioning. (Coach)
- [ ] **Add passing drills** -- Saturday is heavily shot-focused. Short passing accuracy block (5 min) for left-hand comfort. (Coach)
- [ ] **Add defensive footwork drills** -- lateral slides, drop steps, closeouts. Needed for tryouts. (Coach)
- [ ] **Build in deload week** -- no planned lighter week in 6-week block. Week 4 or 5: reduce volume 30-40%, maintain intensity. (Coach)
- [ ] **30-in-3 finisher structure** -- add "say one cue word before each throw" rule. Semi-structured interleaved practice. (Coach)
- [x] **Add "turn-PULL-throw" rhythm cue to pivot drill in app** -- DONE: identified in video analysis, added to drill cues

## Technical Debt (Frontend/Backend)

- [x] **Worker model version hardcoded** -- DONE: now configurable via env var
- [ ] **showDayPreview() is 350 lines** -- refactor into type-specific renderers. (Frontend)
- [ ] **renderWorkout() and renderWorkoutWithAdaptation() duplicate ~40 lines** -- merge into one function with optional banner. (Frontend)
- [ ] **JSON.stringify in onclick handlers is fragile** -- use lookup map + key instead. (Frontend, QA)
- [ ] **Inconsistent persistence strategies** -- readiness=Firestore-first, fuel=localStorage-first, history=Firestore-first. Standardize. (Frontend, Backend)
- [ ] **System prompt rebuilt on every coach message** -- cache until new workout saved. (Backend)
- [ ] **History re-fetches all 100 docs on every page load** -- use `.onSnapshot()` listener instead. (Backend)
- [ ] **dailyState single-doc pattern** -- no historical readiness record. Once day resets, previous readiness gone. (Backend)
- [ ] **Firebase SDK loaded synchronously** -- add `async`/`defer` to unblock HTML parsing. (Frontend)
- [ ] **No request timeout on coach** -- if Anthropic API hangs, UI stuck in "typing" state. Add AbortController. (Backend)
- [ ] **State not reset between multi-workout days** -- `adaptationApplied` can leak between workouts in same session. (QA)
- [ ] **Midnight rollover** -- `state.currentDate` set at init, never updated. App shows yesterday's workout if kept open past midnight. (Frontend)
- [ ] **Duplicate log and exercises fields in saved data** -- raw workoutLog + processed exercises array. Pick one canonical shape. (Backend)

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

- [ ] **Video analysis pipeline** -- currently Sophie manually screenshots training video moments for Claude to analyze. Explore options for feeding video directly (e.g. upload clips to multimodal API, frame extraction tool, or a lightweight app that lets you scrub and annotate). Goal: reduce friction from filming → technique feedback. May be its own project outside the tracker app.

## Structural / Planning

- [ ] **Split handball from leg workouts** -- separate forms, not combined
- [ ] **Handball drill cue pass** -- shorter, clearer, feel-based and rhythmic cues (aphantasia)
- [ ] **Menstrual cycle integration** -- revisit early April once cycle stabilizes. Follicular=peak training, late luteal=back off. (Coach)
- [ ] **Planned deload weeks in future blocks** -- systematic, not accidental from travel. (Coach)
- [ ] **Update or replace static SCHEDULE** -- current day-of-week schedule is outdated (e.g. Saturday soccer no longer exists). Either update to reflect current reality or migrate to full DATE_WORKOUTS-driven approach. Touches 5+ references (calendar, preview, workout loading, history, coach).

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
