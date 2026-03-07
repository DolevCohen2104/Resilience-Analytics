# Hosen Analytics - UI/UX Documentation Guide

## Table of Contents

1. [Overview](#overview)
2. [Navigation](#navigation)
3. [Color System & Score Ranges](#color-system--score-ranges)
4. [Page 1: Command Dashboard](#page-1-command-dashboard---לוח-מפקד)
5. [Page 2: Cadet Profile](#page-2-cadet-profile---פרופיל-צוער)
6. [Page 3: Simulation Summary](#page-3-simulation-summary---סיכום-סימולציה)
7. [Page 4: Simulation Management](#page-4-simulation-management---ניהול-סימולציות)
8. [Page 5: Advanced Analytics](#page-5-advanced-analytics---אנליטיקס-מתקדם)
9. [Page 6: Commander View](#page-6-commander-view---תצוגת-מפקד)
10. [Page 7: System Settings](#page-7-system-settings---הגדרות-מערכת)
11. [Reusable Components](#reusable-components)
12. [Typography & Layout](#typography--layout)
13. [Theme System](#theme-system)
14. [IDF Resilience Model](#idf-resilience-model)

---

## Overview

Hosen Analytics is a React TypeScript front-end application for the **IDF Resilience Center (מרכז חוסן צה"ל)**. It monitors and analyzes cadet resilience during combat simulations by combining biometric sensor data, cognitive assessments, and behavioral observations.

**Tech Stack**: React 18, TypeScript, Tailwind CSS 3, Recharts, react-icons (Remix Icons)

**Key Design Principles**:
- RTL (Right-to-Left) Hebrew layout throughout
- Dark/Light theme switching via CSS custom properties
- All numerical data displayed in monospace font (IBM Plex Mono)
- Every graph/section includes an InfoTip (?) button with detailed Hebrew reading instructions

---

## Navigation

### Sidebar (Fixed Right-Aligned)
- **Collapsed Width**: 72px
- **Expanded Width**: 220px (expands on hover)
- **Logo**: "RC" gradient badge (blue-to-green)

| # | Page | Hebrew | Icon |
|---|------|--------|------|
| 1 | Command Dashboard | לוח מפקד | RiDashboardLine |
| 2 | Cadet Profile | פרופיל צוער | RiUserLine |
| 3 | Simulation Summary | סיכום סימולציה | RiFileListLine |
| 4 | Simulation Management | ניהול סימולציות | RiGamepadLine |
| 5 | Advanced Analytics | אנליטיקס מתקדם | RiBarChartBoxLine |
| 6 | Commander View | תצוגת מפקד | RiShieldStarLine |
| 7 | System Settings | הגדרות מערכת | RiSettings4Line |

**Active State**: Blue background (`idf-blue/10`) with blue text
**Inactive State**: Dim text color
**Hover**: Smooth color transition, text label fades in

---

## Color System & Score Ranges

### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| IDF Blue | `#38BDF8` | Primary actions, positive resilience, command/leadership sector |
| IDF Green | `#00E5A0` | Success, good metrics, high scores, institutional sector |
| IDF Red | `#FF4D6A` | Alerts, low scores, critical metrics, combat/tactical sector |
| IDF Orange | `#FFB547` | Warnings, medium scores, caution |
| IDF Purple | `#A78BFA` | Cognitive component, secondary actions, adaptation capability |

### Semantic Score Ranges (Used Everywhere)

All resilience and component scores follow this universal color mapping:

| Range | Color | Label | Meaning |
|-------|-------|-------|---------|
| 0-40 | Red (`#FF4D6A`) | קריטי (Critical) | Immediate intervention needed |
| 40-60 | Orange (`#FFB547`) | אזהרה (Warning) | Requires monitoring and attention |
| 60-80 | Green (`#00E5A0`) | טוב (Good) | Performing well, continue training |
| 80-100 | Blue (`#38BDF8`) | מצוין (Excellent) | Outstanding performance |

### Sector Colors

| Sector | Hebrew | Color |
|--------|--------|-------|
| Combat/Tactical | קרבי | Red (`#FF4D6A`) |
| Command/Leadership | מטכ"לי | Blue (`#38BDF8`) |
| Institutional | מוסדי | Green (`#00E5A0`) |

---

## Page 1: Command Dashboard - לוח מפקד

**Purpose**: High-level overview of unit resilience status for commanders.

### Section 1: KPI Strip (6 Stat Cards)

Six cards across the top in a 6-column grid. Each card shows:
- **Icon** (blue)
- **Label** (Hebrew)
- **Value** (large monospace number)
- **Trend indicator**: Arrow + percentage change
  - Green arrow up = positive trend
  - Red arrow down = negative trend
  - Orange arrow right = stable

| KPI | Hebrew | Unit | Good Direction |
|-----|--------|------|----------------|
| Active Cadets | צוערים פעילים | count | up |
| Weighted Resilience Score | ציון חוסן משוקלל | 0-100 | up |
| Avg Recovery Time | זמן התאוששות ממוצע | seconds | down |
| Active Alerts | התראות פעילות | count | down |
| Cumulative Improvement | שיפור מצטבר | % | up |
| Sessions This Month | מפגשים החודש | count | up |

### Section 2: Resilience Trend Chart - מגמת חוסן לאורך זמן

**Chart Type**: Stacked AreaChart (Recharts)
**Height**: 280px
**Data**: 12 sessions

| Element | Description |
|---------|-------------|
| **X-Axis** | Session number (מפגש 1-12) |
| **Y-Axis** | Resilience Score (domain: 30-85) |
| **Red Area** | Combat/Tactical score (קרבי) |
| **Blue Area** | Command/Leadership score (מטכ"לי) |
| **Green Area** | Institutional score (מוסדי) |
| **Grid** | Dashed lines (3 3 pattern) |
| **Fill Opacity** | 0.1 for all areas |
| **Stroke Width** | 2px |

**Time Range Filters**: 4 toggle buttons - Week / Month / Quarter / All
- Selected: `bg-idf-blue/10`, `text-idf-blue`
- Unselected: `text-text-dim`

**How to Read**: Each colored area represents a sector's resilience trajectory. The overall height shows combined unit resilience. Rising areas = improvement; declining = regression. Gaps between areas show relative sector performance.

### Section 3: At-Risk Cadets Table - צוערים הדורשים תשומת לב

**Data**: Top 5 cadets sorted by lowest resilience score

| Column | Hebrew | Content |
|--------|--------|---------|
| ID | מזהה | Monospace cadet identifier |
| Sector | זרוע | Color-coded badge (combat/command/institutional) |
| Sessions | מפגשים | Session count (monospace) |
| Resilience Score | ציון חוסן | Bold monospace score |
| Trend | מגמה | Arrow icon (up/down/stable) |
| Risk Level | רמת סיכון | Badge: אדום (high/red), כתום (medium/orange), ירוק (low/green) |

**Interactions**: Click any row to navigate to that cadet's profile page. Rows have hover highlight and zebra striping.

### Section 4: Five-Component Radar - רדאר חמישה מרכיבים

**Chart Type**: Custom RadarChart (Recharts-based)
**Size**: Large (350px)

Displays 5 resilience components as a pentagon:

| Vertex | Hebrew | Color |
|--------|--------|-------|
| Values | ערכי | Blue (`#38BDF8`) |
| Emotional | רגשי | Red (`#FF4D6A`) |
| Cognitive | קוגניטיבי | Purple (`#A78BFA`) |
| Social | חברתי | Green (`#00E5A0`) |
| Physical | פיזי | Orange (`#FFB547`) |

**Two Overlays**:
- **Solid blue fill** = Current scores (unit average)
- **Dashed line** = Baseline scores

**How to Read**: Each vertex represents one resilience component (0-100). Distance from center = score. A round, balanced shape = uniform resilience. A sharp dip at any vertex = weak component needing attention.

**RadarBreakdown** (expandable below): Click "הצג פירוט מרכיבים" to see per-component details including what is measured, how scores are derived, and progress bars with baseline markers.

### Section 5: Activity Feed - פעילות אחרונה

**Height**: Max 340px, scrollable
**Items**: Recent events with colored glow dots

| Dot Color | Event Type |
|-----------|------------|
| Blue | Simulation completed |
| Red | Trigger detected |
| Green | Milestone achieved |
| Orange | Alert raised |

---

## Page 2: Cadet Profile - פרופיל צוער

**Purpose**: Deep-dive into an individual cadet's resilience data across 6 tabs.

### Header

- **Score Ring**: 80x80px SVG circle showing overall resilience score, color-coded by score range
- **Cadet Info**: ID, alias, sector badge, status badge (active/suspended/completed), session count, last session date
- **Action Buttons**: Start Simulation, Export Report, Add Note

### Tab 1: Overview - סקירה כללית

#### Biometric Cards (4 columns)

| Metric | Hebrew | Unit | Good Direction | Icon |
|--------|--------|------|----------------|------|
| HRV | שונות דופק | ms | up (higher = better regulation) | RiHeartPulseLine |
| GSR | מוליכות עור | uS | down (lower = less stress) | RiDropLine |
| Eye Tracking | מעקב עיניים | % | up (higher = better scanning) | RiEyeLine |
| Reaction Time | זמן תגובה קוגניטיבי | s | down (faster = better) | RiTimerLine |

Each card includes:
- Current value with unit
- Micro line chart (last 12 sessions) - green if improving, red if declining
- Percentage change from baseline

#### Radar Chart + Breakdown
Same 5-component radar as Dashboard, but for individual cadet data.

#### Timeline - ציר זמן - אבני דרך
Horizontal timeline with color-coded event nodes:
- **Blue** = Baseline measurement
- **Red** = Stress trigger detected
- **Orange** = Protocol activated
- **Green** = Improvement milestone
- **Purple** = Breakthrough moment
- **Grey** = Current position

Hover over any node to see event label and description.

### Tab 2: Bio-Adaptive Analysis - ניתוח ביו-אדפטיבי

#### HRV Section - שונות דופק
- **AreaChart** (220px): HRV over 12 sessions with green "optimal zone" band (55-75ms) and baseline reference line
- **Phase Cards** (5): HRV values at different simulation phases (Entrance, Contact, Decision, Evacuation, End) - color-coded by value

**How to Read**: HRV measures heart rate variability - higher values indicate better autonomic nervous system regulation. The green band shows the optimal range. Values dipping below baseline during high-stress phases indicate difficulty with emotional regulation.

#### GSR Section - מוליכות עור
- **LineChart** (220px): GSR over sessions with red zone indicator (>70 uS) and threshold reference line
- **Trigger Detection**: Table showing identified stress triggers with intensity % and recovery time

**How to Read**: GSR measures skin conductance - spikes indicate stress arousal. The red zone (>70 uS) signals excessive stress. Recovery time shows how quickly the cadet returns to baseline after a trigger.

#### Eye Tracking Section
- **Distribution Bars**: Effective scanning %, tunnel vision %, distraction %
- **Trend LineChart** (180px): Eye tracking score over sessions

**How to Read**: Effective scanning means the cadet is systematically covering the visual field. Tunnel vision (focusing on one point) is a stress indicator. Higher effective scanning % = better situational awareness.

#### Reaction Time Section
- **ScatterChart** (220px): Load level (X) vs Reaction Time (Y), dots colored by accuracy (green = accurate, red = inaccurate)
- **Reaction by Type Table**: Average time, accuracy %, and improvement % per decision type

**How to Read**: Dots in the lower-left = fast reactions under low load (easy). Dots in the upper-right = slow reactions under high load (expected). Red dots in the lower-right = fast but inaccurate (concerning). The goal is green dots clustered low across all load levels.

### Tab 3: Three Capabilities - שלושת הכושרים

Three circular progress rings showing scores for:
1. **Withstanding (עמידה)** - Maintaining function under pressure
2. **Recovery (התאוששות)** - Returning to baseline after stress
3. **Adaptation (הסתגלות)** - Improving performance over repeated exposure

Each capability has its own chart:
- **Withstanding**: AreaChart with 4 color-coded zones (red/orange/green/blue bands) and unit average comparison line
- **Recovery**: LineChart showing recovery time in seconds (lower is better), with avg/best/worst metrics below
- **Adaptation**: AreaChart with same 4-zone banding

### Tab 4: Progress Trend - מגמת שיפור

#### Resilience Trajectory (Dual-Axis AreaChart)
- **Left Y-Axis** (Red): Recovery Time in seconds (0-12) - declining is good
- **Right Y-Axis** (Green): Functional Capacity % (0-100) - rising is good
- The ideal pattern: red area shrinking while green area grows

#### Sector-Specific Progress (2 columns)
- **Combat/Tactical**: LineChart tracking accuracy under physical load + urban encounter performance
- **Command/Leadership**: Dual-axis LineChart tracking decision time (left) + crisis management score (right)

#### Baseline Comparison Table
| Column | Description |
|--------|-------------|
| מדד (Metric) | Metric name |
| בסיס (Baseline) | Starting value (dim) |
| נוכחי (Current) | Current value (bold) |
| שינוי (Change) | % change, green if positive, red if negative |
| מגמה (Trend) | Arrow icon |

### Tab 5: Social - חברתי

Social/team performance metrics and peer interaction data.

### Tab 6: Insights & Notes - תובנות והערות

#### Automated Insights - תובנות אוטומטיות
System-generated observations with colored dots:
- **Blue dot** = Pattern detected
- **Green dot** = Improvement noted
- **Red dot** = Alert/concern

#### Commander Notes - הערות מפקד
- Searchable notes list with tag badges (tactical/mental/physical/general)
- Add new note with textarea input

#### Training Recommendations - המלצות אימון
Action items with status badges: pending / in_progress / completed

#### Development Targets - יעדי פיתוח
Progress bars showing advancement toward specific component goals.

---

## Page 3: Simulation Summary - סיכום סימולציה

**Purpose**: Comprehensive post-simulation debrief with performance analysis, strengths, improvement areas, and practical techniques.

### Header Card
Centered display showing:
- Scenario name (e.g., "היתקלות בשטח בנוי")
- Date, duration, difficulty level (X/5 in orange)

### Resilience Triangle - משולש החוסן

**Chart Type**: Custom SVG equilateral triangle

| Vertex | Position | Capability |
|--------|----------|------------|
| Top | עמידה (Withstanding) | Maintaining function under pressure |
| Bottom-Left | התאוששות (Recovery) | Returning to baseline after stress |
| Bottom-Right | הסתגלות (Adaptation) | Improving with repeated exposure |

**Visual Elements**:
- 3 grid triangles (100%, 66%, 33%) with dashed borders
- Blue filled polygon connecting the cadet's scores
- Score circles at each vertex with large monospace numbers
- Color-coded by score range (red/orange/green/blue)

**Capability Cards** (3 columns below): Each shows score, trend from previous session (arrow + %), and additional context (e.g., recovery time).

**How to Read**: The filled blue shape shows the cadet's capability profile. A balanced triangle = uniform capabilities. A vertex pulling inward = weak capability. The score circles show exact numbers with color coding.

### What to Preserve - מה לשמר - נקודות חוזק

Green-bordered section showing 3 strengths identified in the simulation:
- Title + description
- Score with green progress bar
- Celebrates what went well

### Personal Improvement Snapshot - תמונת שיפור אישית

Orange-bordered section showing 3 areas for improvement:
- Previous score vs current score
- Improvement indicator (green arrow + "+X from previous")
- Progress bar with **target marker** (blue line) showing gap to goal
- Labels: "Previous: X" and "Target: X (need Y more)"

#### Biometric Comparison
Side-by-side bar comparison for 3 metrics:
- Grey bar = Baseline value
- Colored bar = Current value (green if improved, red if declined)
- Percentage change displayed below

#### Social & Team Metrics
3 progress bars:
- Group Cohesion (לכידות קבוצה)
- Instilling Confidence (נסוך ביטחון)
- Social Support Score (ציון תמיכה)
- Inner scale labels: נמוך / בינוני / גבוה / יוצא דופן

### Practical Tools - כלים פרקטיים - איך להשתפר בפעם הבאה

Purple-bordered section with 4 detailed technique cards (single-column layout):

| Technique | Target Component | Color |
|-----------|-----------------|-------|
| 4-7-8 Breathing (נשימה 4-7-8) | Emotional (רגשי) | Red |
| OODA Loop Field Scan (סריקת שדה OODA) | Cognitive (קוגניטיבי) | Purple |
| Cognitive Anchoring / Self-Talk (עיגון קוגניטיבי) | Withstanding (עמידה) | Blue |
| SBAR Team Communication (תקשורת צוותית SBAR) | Social (חברתי) | Green |

**Each card contains**:
1. **Header**: Technique name + component badge
2. **What**: Detailed theory and research backing
3. **Steps**: 5-6 numbered execution steps
4. **Simulation Moment**: Exact timestamp from the simulation where this technique was needed, with detailed description of what happened biometrically and behaviorally
5. **How to Improve**: Specific practice advice for next session
6. **When to Use**: Trigger conditions for activating the technique

### Commander Recommendations - המלצות ממוקדות
3 numbered priority recommendations with category badges (ויסות/מקצועיות/תרחיש).

### Closing Quote
Hebrew scripture: "כִּי הוּא הַנֹּתֵן לְךָ כֹּחַ לַעֲשׂוֹת חָיִל" (דברים ח, יח)

---

## Page 4: Simulation Management - ניהול סימולציות

**Purpose**: Configure, launch, and monitor simulations in real-time.

### 3 Sub-Tabs

#### Tab 1: Scenario Selection - בחירת תרחיש

**Filters**:
- Sector buttons (all / combat / command / institutional)
- Difficulty stars (1-5)

**Scenario Cards** (3-column grid): Each shows:
- Gradient thumbnail with gamepad icon
- Title + subtitle
- Sector badge + difficulty stars (filled = active, outline = inactive)
- Duration, completion count, average score
- "Launch Simulation" button (blue)

#### Tab 2: Decision Tree Editor - עורך עץ החלטות

**Tree Visualization**: 8 nodes positioned as a decision flow:
- Start → Threat ID / Info Overload → Fire Decision / Freezing → Recovery / Evacuation → End

**Node Colors**:
| Type | Color | Meaning |
|------|-------|---------|
| Normal | Green | Standard flow |
| Hardening | Red | Stress-inducing branch |
| Recovery | Blue | Recovery/support branch |

**Bio-Adaptive Settings** (4 threshold cards):
- HRV threshold for hardening activation: < 40ms
- GSR threshold for overflow detection: > 75 uS
- Eye tracking threshold for tunnel vision: > 40%
- Motor response delay: 200ms

These thresholds control when the simulation engine automatically adjusts difficulty based on real-time biometric data.

#### Tab 3: Live Monitoring - ניטור חי

**Left Panel (3/5 width)**: Simulation viewport
- Placeholder for Unreal Engine Pixel Streaming feed
- Live indicator (green glow dot + "LIVE" label)

**Right Panel (2/5 width)**:

**Real-time Biometrics** (4 metrics):
| Metric | Current | Color | Threshold |
|--------|---------|-------|-----------|
| HRV | 64 ms | Blue | 40 ms |
| GSR | 58 uS | Red | 70 uS |
| Effective Scan | 63% | Green | 40% |
| Reaction Time | 1.2 s | Purple | 2.5 s |

Each has a progress bar (fill width = value / threshold * 1.5 * 100%).

**Engine State** (4 toggle buttons):
- הקשחה (Hardening) - increase difficulty
- הקלה (Easing) - decrease difficulty
- בדיקת שבירה (Breaking Point Test) - push to limits
- רגיל (Normal) - standard mode (active = green border)

**Manual Override Button**: Red emergency stop button ("עצירה ידנית")

---

## Page 5: Advanced Analytics - אנליטיקס מתקדם

**Purpose**: Deep statistical analysis across multiple dimensions with 5 analytical tabs.

### Tab 1: Cohort Comparison - השוואת עוצמות

#### Scatter Chart
- **X-Axis**: Resilience Score (20-100) - "ציון חוסן"
- **Y-Axis**: Recovery Time (0-12s) - "זמן התאוששות"
- **Bubble Size**: Proportional to session count
- **Bubble Color**: By sector (red/blue/green)
- **Reference Lines**: Dashed average lines for both axes

**Quadrant Interpretation**:
| Quadrant | Meaning | Color |
|----------|---------|-------|
| Top-Right | High resilience + fast recovery = Excellent | Green |
| Top-Left | Low resilience + slow recovery = Needs attention | Red |
| Bottom-Right | High resilience + slow recovery = Needs recovery training | Orange |
| Bottom-Left | Low resilience + fast recovery = Growth potential | Blue |

### Tab 2: Five Components - חמישה מרכיבים

#### Bar Chart (Baseline vs Current)
- **X-Axis**: Component names (Hebrew)
- **Y-Axis**: Score (0-100)
- **Grey bars** = Baseline scores
- **Blue bars** = Current scores
- Side-by-side comparison per component

#### Component Detail Cards (5 cards)
Each card explains what data sources feed into the component score:

| Component | Icon | Data Sources |
|-----------|------|-------------|
| ערכי (Values) | Compass | Decision consistency, persistence, code adherence, peer rating |
| רגשי (Emotional) | Heart | HRV, GSR, self-regulation ratio, baseline recovery speed |
| קוגניטיבי (Cognitive) | Brain | Reaction time, eye tracking patterns, hit rate, multitasking |
| חברתי (Social) | Team | Communication frequency/quality, leadership initiatives, peer support, coordination |
| פיזי (Physical) | Body | Heart rate zones, HRV rest-vs-activity, motor stability, fatigue resistance |

#### Performance Heatmap
- **Rows**: Cadet IDs
- **Columns**: 12 sessions
- **Cell Color**: Score-based (red < 40, orange 40-60, green 60-80, blue 80+)
- **Cell Content**: Monospace score number
- **Hover**: Cell scales up (110%)

**How to Read**: Scan left-to-right per cadet to see progression. Consistent color improvement = good trend. Sudden color changes = investigate triggers. Compare vertically to see unit-wide patterns per session.

### Tab 3: Trigger Analysis - ניתוח טריגרים

#### Trigger Frequency Bar Chart (Horizontal)
- **Y-Axis**: Trigger names (Hebrew)
- **X-Axis**: Frequency/impact score
- **Bar Color**: Based on average impact (red > 70, orange > 60, blue otherwise)

#### Collapse Pathway - מסלול קריסה (3-column flow)

| Stage | Hebrew | Color | Examples |
|-------|--------|-------|----------|
| 1. Trigger | טריגר | Red | Loud noise, info overload, surprise, time pressure |
| 2. Physiological Response | תגובה פיזיולוגית | Orange | GSR spike, HRV drop, tunnel vision |
| 3. Outcome | תוצאה | Purple | Accuracy drop, decision delay, freezing |

**How to Read**: Follow the flow left-to-right. Identify which triggers lead to which physiological responses and outcomes. This helps design targeted interventions.

### Tab 4: Three Capabilities - שלושת הכושרים

#### Stacked AreaChart
- **Data**: 10 sessions
- **Blue Area**: Withstanding (עמידה)
- **Green Area**: Recovery (התאוששות)
- **Purple Area**: Adaptation (הסתגלות)
- **Fill Opacity**: 0.1 each

**How to Read**: The three stacked areas show how each capability evolves over sessions. Growing areas = improvement. The relative heights show which capability dominates.

### Tab 5: Predictive Analytics - אנליטיקס חזוי

#### 3 Prediction Cards
1. **Cadets Expected to Hit Goal**: Filtered by upward trend + score > 60, with confidence %
2. **Cadets Requiring Intervention**: Filtered by high risk level
3. **Recommended Next Scenario**: Scenario suggestions per cadet

#### Trajectory Projection Chart
- **AreaChart**: 10 historical sessions + 3 projected sessions
- **Purple reference line** at session 10 = prediction boundary (labeled "חזוי")
- **Blue fill**: Projected resilience trajectory

**Projection Metrics** (3 columns):
- Sessions needed to reach score 70
- Sessions needed to reach score 80
- Sessions needed to reach score 90

---

## Page 6: Commander View - תצוגת מפקד

**Purpose**: Unit-level aggregated resilience overview for senior commanders.

### KPI Cards (5 columns)

| KPI | Hebrew | Description |
|-----|--------|-------------|
| Weighted Resilience | ציון חוסן משוקלל | Unit average score |
| Green Zone Cadets | צוערים באזור ירוק | Count/total above threshold |
| Red Zone Cadets | צוערים באזור אדום | Count below threshold (down is good) |
| Average Improvement | שיפור ממוצע | % improvement from baseline |
| Average Sessions | ממוצע מפגשים | Sessions per cadet |

### Resilience Distribution by Sub-unit

**Stacked BarChart**:
- **X-Axis**: Sub-units (כיתה א', כיתה ב', כיתה ג')
- **4 Stack Segments** per bar:
  - Red segment: Score < 40
  - Orange segment: Score 40-60
  - Green segment: Score 60-80
  - Blue segment: Score 80+

**How to Read**: Each bar shows the score distribution within a sub-unit. A bar dominated by green/blue = healthy unit. Significant red/orange = unit needs attention. Compare bars horizontally to identify strongest/weakest sub-units.

### Unit Radar
Same 5-component radar as Dashboard with RadarBreakdown, showing unit-wide averages.

### Readiness Report Table - דוח מוכנות

**Features**: Searchable + exportable to Excel

| Column | Hebrew | Content |
|--------|--------|---------|
| Cadet ID | מזהה צוער | Monospace |
| Sector | זרוע | Color-coded badge |
| Sessions | מפגשים | Count |
| Resilience Score | ציון חוסן | Bold, color-coded by range |
| Trend | מגמה | Arrow icon |
| Risk Level | רמת סיכון | Badge (high/medium/low) |
| Action Required | פעולה נדרשת | Text recommendation |

**Actions by Risk Level**:
- **High**: "התערבות נדרשת" (Intervention needed)
- **Medium**: "ניטור מוגבר" (Enhanced monitoring)
- **Low**: "המשך אימון שגרתי" (Continue routine training)

---

## Page 7: System Settings - הגדרות מערכת

**Purpose**: System configuration, calibration, permissions, and integrations.

### Tab 1: Sensor Calibration - כיול חיישנים

Cards for each sensor showing:
- Connection status (green = connected, red = malfunction)
- Last calibration timestamp
- Accuracy percentage (green > 90%, orange > 0%, red otherwise)
- Buttons: Connection Test, Recalibrate

### Tab 2: Alert Thresholds - ספי התראות

Table with range sliders for each metric:
- **Yellow/Warning threshold** (orange accent slider)
- **Red/Critical threshold** (red accent slider)
- Action description for threshold breach

### Tab 3: Permissions - הרשאות (RBAC)

Role-Based Access Control matrix:
- **Rows**: User roles
- **Columns**: System modules (Dashboard, Cadet Profile, Simulations, Analytics, Settings)
- **Permission Levels**: מלא (Full/green), קריאה (Read-only/blue), -- (None/grey)

### Tab 4: Integrations - אינטגרציות

3 integration cards:
1. **Unreal Engine 5**: IP address, port, version
2. **Data Export API**: Endpoint, protocol, API key
3. **Backup Service**: Last backup, frequency, storage size

---

## Reusable Components

### StatCard
Displays a single KPI metric with icon, label, value, and optional trend indicator. Trend direction (up/down) is color-coded based on whether up or down is "good" for that metric.

### RadarChart
Pentagon radar chart with dual overlay (current scores as solid fill, baseline as dashed line). Supports `size="small"` and `size="large"` variants. Theme-aware colors.

### RadarBreakdown
Expandable detail panel below every radar chart. Toggle button: "הצג פירוט מרכיבים - מה כל ציון אומר?"

When expanded, shows per component:
- **Score box**: Current score in component color
- **Meaning**: One-line Hebrew explanation
- **Diff from baseline**: +/- change with percentage
- **What is measured**: 4 bullet points describing data sources
- **How score is derived**: 3 formulas showing weighted calculation
- **Progress bar**: Visual with baseline marker line

### InfoTip
Click-to-open tooltip (?) button appearing next to every section header. Contains multi-line Hebrew text explaining:
- How to read the graph/section
- What colors/axes represent
- Concrete examples
- Good vs bad patterns

**Features**: Auto-closes on outside click, scrollable (max-height 320px), 384px width, whitespace-pre-line for formatting.

---

## Typography & Layout

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Page Title | Heebo | 3xl (30px) | Bold (700) |
| Section Header | Heebo | lg (18px) | Semibold (600) |
| Card Title | Heebo | base (16px) | Bold (700) |
| Body Text | Heebo | sm (14px) | Normal (400) |
| Numbers/Data | IBM Plex Mono | varies | Bold (700) |
| Labels | Heebo | xs-sm | Medium (500) |

**Layout Patterns**:
- Main grid: 5 columns (varies by page)
- Card padding: `p-5` or `p-6`
- Border radius: 14px (major sections), 11px (sub-cards), 4px (small elements)
- Grid gaps: `gap-4` to `gap-6`
- All text: Right-aligned (RTL Hebrew)

---

## Theme System

The app supports Dark and Light modes via CSS custom properties toggled by `ThemeContext`.

| Variable | Dark Mode | Light Mode |
|----------|-----------|------------|
| `--surface` | Dark background | Light background |
| `--bg` | Darker background | Near-white |
| `--text-primary` | Near-white | Near-black |
| `--text-secondary` | Medium grey | Dark grey |
| `--text-dim` | Dim grey | Light grey |
| `--border` | Subtle dark grey | Subtle light grey |
| `--hover` | Lighter surface | Slightly darker surface |
| `--zebra` | Alternating row stripe | Alternating row stripe |

All IDF brand colors (blue, green, red, orange, purple) remain constant across both themes.

---

## IDF Resilience Model

The entire application is built around the **IDF Resilience Framework**:

### 3 Capabilities (כושרים)

| Capability | Hebrew | Measures |
|------------|--------|----------|
| **Withstanding** | עמידה | Maintaining function under active pressure |
| **Recovery** | התאוששות | Speed of returning to baseline after stress |
| **Adaptation** | הסתגלות | Performance improvement across repeated exposures |

### 5 Components (מרכיבים)

| Component | Hebrew | Color | Data Sources |
|-----------|--------|-------|-------------|
| **Values** | ערכי | Blue | Moral decision consistency, persistence, code adherence, peer ratings |
| **Emotional** | רגשי | Red | HRV, GSR, self-regulation ratio, baseline recovery speed |
| **Cognitive** | קוגניטיבי | Purple | Reaction time, eye tracking, hit rate, multitasking |
| **Social** | חברתי | Green | Communication quality, leadership, peer support, team coordination |
| **Physical** | פיזי | Orange | Heart rate zones, recovery HR, motor stability, fatigue resistance |

### Biometric Sensors

| Sensor | Metric | Unit | What It Measures |
|--------|--------|------|-----------------|
| Heart Rate Monitor | HRV | ms | Autonomic nervous system regulation |
| Skin Conductance | GSR | uS | Stress arousal level |
| Eye Tracker | Scan % | % | Visual field coverage and focus patterns |
| Cognitive Timer | RT | s | Information processing and decision speed |

### Score Derivation (Weighted Formulas)

- **Emotional** = 35% HRV + 30% GSR + 20% Self-regulation ratio + 15% Baseline recovery
- **Cognitive** = 30% Reaction time + 25% Scan pattern + 25% Accuracy + 20% Multitasking
- **Social** = 30% Communication + 25% Leadership + 25% Support + 20% Coordination
- **Physical** = 30% HR zones + 25% Recovery + 25% Motor stability + 20% Fatigue resistance
- **Values** = 40% Persistence + 30% Moral consistency + 30% Peer rating
