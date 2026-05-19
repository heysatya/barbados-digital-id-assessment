"I am building a new Barbados-specific Digital ID Assessment application. I have cloned the existing repository as a starting point, but we are performing a complete overhaul.

CRITICAL CONSTRAINTS:
1.	Separate Deployment: The final app will live at barbados-digital-id-assessment.vercel.app. Do not overwrite the existing production app.
2.	No PII: We will collect zero personal names, emails, or phone numbers.
3.	v3.0 Scoring: We are replacing the legacy 0–4 scale with a strict 1–5 maturity scale.
4.	Single Admin: Access to the dashboard will be restricted to a single admin email.
REFERENCE DATA: I am providing the Master Tasks (0-12), the Rubric Configuration, and the Scoring Engine Specification. Read these carefully. Do not write any code yet.
CORE REFERENCE FILES:
•	Scoring Engine Logic: @SCORING_LOGIC_v3.0.md
•	Rubric Configuration: @rubric_config.json
Confirm that you have read all three documents and specifically acknowledge that you understand the unified weight pool formula and the 1-5 normalization formula for indicators."
Master Instruction to Antigravity
You are working on a new Barbados-specific Digital ID Assessment application based on the existing GitHub repository:
https://github.com/heysatya/digital-id-assessment
The current live app at:
https://digital-id-assessment.vercel.app/
must be retained unchanged. Do not overwrite, redeploy, or break the existing app.
Build the new application as a separate Vercel deployment at:
https://barbados-digital-id-assessment.vercel.app/
The new app must implement the Barbados Digital ID Assessment Framework, @rubric_config.json, and @SCORING_LOGIC_v3.0.md.
The existing repository can be forked, branched, or reused as a starting point, but the final deployment must be separate from the existing production app.
The new app must be best-in-class: polished, accessible, responsive, secure, robustly tested, and suitable for use by government, expert reviewers, and institutional stakeholders.
The @rubric_config.json is the absolute source of truth for weights and indicator normalization. If there is any conflict between the JSON and legacy Excel files, the JSON prevails.
Do not include name or email fields in the assessment_sessions table schema or the frontend forms. This is a hard privacy requirement.
In Task 4, hardcode the Admin role check to the specific profile created via the SQL migration I provide. Do not build a public 'Sign Up' flow for admins.

________________________________________
Task 0 — Project Setup, Branching, and Separate Deployment
Purpose
Protect the existing app while creating a new Barbados-specific implementation. Create a new Supabase Project (not just a new table) to ensure the "Separate Deployment" requirement is physically enforced at the database level.
Task for Antigravity
Task 0: Create Separate Barbados Application Deployment
Goal: Retain the existing app at https://digital-id-assessment.vercel.app/ and deploy the new app separately at https://barbados-digital-id-assessment.vercel.app/.
Required actions:
1.	Do not modify the current production Vercel project linked to digital-id-assessment.vercel.app.
2.	Create a new Vercel project named:
barbados-digital-id-assessment  
3.	Set the production domain to:
https://barbados-digital-id-assessment.vercel.app/  
4.	Use separate Supabase environment variables for the new app, unless explicitly instructed to share the same Supabase project.
5.	Add .env.example with all required variables:
NEXT_PUBLIC_SUPABASE_URL=  
NEXT_PUBLIC_SUPABASE_ANON_KEY=  
SUPABASE_SERVICE_ROLE_KEY=  
ADMIN_API_KEY=  
NEXT_PUBLIC_APP_ENV=  
NEXT_PUBLIC_APP_NAME=Barbados Digital ID Assessment  
6.	Update README to clearly state that this is the Barbados final-framework application and is separate from the older app.
Acceptance criteria
npm install  
npm run lint  
npm run build  
must pass locally before deployment.
________________________________________
Task 1 — Integrate Final Rubric Config and Question Bank
Status
The rubric-generation work is methodologically complete, except for the known open item: final confirmation of external indicator sources for Barbados.
For the app build, Antigravity must integrate the generated config and question bank.
Task for Antigravity
Task 1: Integrate Final Rubric and Generate Final Question Bank
Inputs:
•	@rubric_config.json
•	@Digital_ID_Assessment_Framework.xlsx
•	@SCORING_LOGIC_v3.0.md
Required implementation:
1.	Add the final rubric config at:
src/config/rubric_config.json  
2.	Create final framework question bank:
src/data/frameworkQuestions.ts  
3.	Each question object must include:
{  
  q_code: string;  
  pillar_code: string;  
  pillar_name: string;  
  subpillar_code: string;  
  subpillar_name: string;  
  survey_type: "expert" | "stakeholder";  
  question_text: string;  
  options: {  
    score: 1 | 2 | 3 | 4 | 5;  
    label: string;  
    description: string;  
  }[];  
  allow_unknown: true;  
}  
4.	Use exact final question-code format:
P1.1.EX.Q1  
P1.1.NE.Q1  
5.	The generated bank must contain:
o	90 expert questions
o	80 stakeholder/non-expert questions
o	170 total questions
6.	Retire the old numeric question ID system.
7.	Do not use the old src/data/questions.ts for the new surveys.
8.	Create:
scripts/validate-framework.ts  
9.	The validation script must verify:
o	every app question has a matching scoring item in @rubric_config.json
o	every rubric scoring question has a matching app question
o	every expert sub-pillar has exactly 3 expert questions
o	stakeholder sub-pillars follow the final 2–3 question distribution
o	no duplicate q_code
o	all answer options have scores 1–5
o	all questions include allow_unknown: true
10.	Add npm script:
"validate:framework": "tsx scripts/validate-framework.ts"  
Acceptance criteria
npm run validate:framework  
npm run lint  
npm run build  
must all pass.
________________________________________
Task 2 — Public Routes and Survey Experience
Key change from previous version
No single /assessment route. The new app must have separate public links:
•	/expert
•	/stakeholders
No name, email, phone number, or other PII should be collected.
Task for Antigravity
Task 2: Build Separate Expert and Stakeholder Survey Routes
Routes:
/expert  
/stakeholders  
Files to create/modify:
src/app/expert/page.tsx  
src/app/stakeholders/page.tsx  
src/components/AssessmentForm.tsx  
src/types/assessment.ts  
Required behavior:
1.	/expert loads only expert questions: 
o	90 questions
o	survey_type = "expert"
2.	/stakeholders loads only stakeholder/non-expert questions: 
o	80 questions
o	survey_type = "stakeholder"
3.	Do not collect: 
o	respondent name
o	personal email
o	phone number
o	personal address
o	any direct personal identifier
4.	Allowed metadata fields: 
o	organization name
o	organization type
o	role/function
o	stakeholder category
o	country, default "Barbados"
o	environment mode: "test" or "live"
5.	Stakeholder category options: 
o	Government
o	Regulator
o	Private Sector
o	Civil Society
o	Academia
o	Development Partner
o	Other
6.	Both surveys must: 
o	show Pillar → Sub-pillar → Question structure
o	display all five maturity-level response options
o	include "I don't know" mapped to sentinel 9
o	include optional non-PII evidence/comment field
o	show progress by pillar, sub-pillar, and overall
o	allow back/next navigation
o	warn before leaving with unsaved progress
o	store temporary progress in local browser storage
o	submit through server-side API routes, not direct browser table writes
7.	On completion: 
o	show a confirmation page
o	do not show scores immediately to public respondents unless admin-enabled
o	store the survey response in Supabase
8.	The survey UI must be polished, mobile-responsive, and accessible.

Privacy Notice and Consent
Add a short privacy/consent notice before survey submission.
Before submission, show a short privacy notice:
•	no personal name/email/phone is collected
•	responses will be aggregated for assessment analysis
•	free-text evidence/comments should not include personal data
•	organization names may be used for internal validation but not public attribution unless agreed

Acceptance criteria
•	/expert renders exactly 90 questions.
•	/stakeholders renders exactly 80 questions.
•	No PII fields exist in either route.
•	Survey submission works in both test and live modes.
•	Submitted records are tagged with environment_mode.
________________________________________
Task 3 — Splash Page / Public Landing Page
Key change
The root URL must be a polished splash page, not just a redirect.
Task for Antigravity
Task 3: Build Best-in-Class Splash Page
Route:
/  
File:
src/app/page.tsx  
Required content:
1.	Hero section for:
Barbados Digital ID Governance Assessment  
2.	Include a high-quality hero image or visual treatment. If no real image asset is provided, create a polished abstract digital public infrastructure / identity-themed visual using CSS/SVG.
3.	Clear plain-language description of:
o	what the assessment is
o	why Barbados is assessing digital ID governance
o	how the framework supports trusted, inclusive, rights-respecting digital identity
4.	Explain the six pillars and 30 sub-pillars in a clean visual layout.
5.	Include two primary call-to-action buttons:
Start Expert Assessment → /expert  
Start Stakeholder Assessment → /stakeholders  
6.	Include secondary link:
Admin Dashboard → /dashboard  
7.	Include short methodology summary:
o	expert survey
o	stakeholder survey
o	indicators
o	v3.0 scoring logic
o	maturity scoring from 1 to 5
8.	Include privacy notice:
This assessment does not collect personal names, personal email addresses, or phone numbers.  
9.	Must look best-in-class:
o	strong visual hierarchy
o	national/public-sector credibility
o	clean cards
o	responsive layout
o	accessible contrast
o	polished microcopy
Acceptance criteria
•	Root page loads at /.
•	Hero section is visually polished.
•	Six pillars and all 30 sub-pillars are displayed.
•	CTA links correctly route to /expert, /stakeholders, and /dashboard.
________________________________________
Task 4 — Supabase SQL Schema, RLS, and Server-Side APIs
Key change
This must be explicit. Antigravity needs to create SQL scripts and database tables.
Task for Antigravity
Task 4: Create Supabase Database Schema, SQL Migrations, RLS Policies, and API Routes
Files to create:
supabase/migrations/001_initial_barbados_schema.sql  
supabase/migrations/002_rls_policies.sql  
src/lib/db.ts  
src/app/api/assessments/route.ts  
src/app/api/assessments/[id]/route.ts  
src/app/api/score/route.ts  
src/app/api/results/[id]/route.ts  
src/app/api/indicators/route.ts  
src/app/api/admin/purge-test-data/route.ts  
src/app/api/admin/export-responses/route.ts  
src/app/api/admin/rescore/route.ts  
Required tables:
1.	assessment_sessions
id uuid primary key default gen_random_uuid(),  
country text not null default 'Barbados',  
survey_type text not null check (survey_type in ('expert','stakeholder')),  
organization_name text,  
organization_type text,  
role_function text,  
stakeholder_category text,  
environment_mode text not null check (environment_mode in ('test','live')),  
status text not null default 'submitted',  
rubric_version text not null,  
created_at timestamptz default now(),  
submitted_at timestamptz default now()  
2.	assessment_responses
id uuid primary key default gen_random_uuid(),  
assessment_id uuid not null references assessment_sessions(id) on delete cascade,  
q_code text not null,  
pillar_code text not null,  
subpillar_code text not null,  
score int check (score in (1,2,3,4,5,9)),  
evidence_comment text,  
created_at timestamptz default now()  
3.	assessment_results
id uuid primary key default gen_random_uuid(),  
assessment_group_id text not null,  
country text not null default 'Barbados',  
environment_mode text not null check (environment_mode in ('test','live')),  
rubric_version text not null,  
input_json jsonb not null,  
output_json jsonb not null,  
computed_at timestamptz default now(),  
engine_version text not null  
4.	indicator_values
id uuid primary key default gen_random_uuid(),  
indicator_code text not null,  
pillar_code text not null,  
subpillar_code text not null,  
raw_value numeric,  
source text,  
source_url text,  
data_date date,  
notes text,  
environment_mode text not null check (environment_mode in ('test','live')),  
rubric_version text not null,  
created_at timestamptz default now(),  
updated_at timestamptz default now(),  
unique(indicator_code, environment_mode, rubric_version)  
5.	profiles
id uuid primary key references auth.users(id) on delete cascade,  
role text not null check (role in ('admin','viewer')),  
created_at timestamptz default now()  

Admin Seeding / First Admin User
Supabase Auth apps often fail at handoff if no admin user exists.
Add to Task 4 or 12
Provide instructions or SQL for assigning the first admin user in the profiles table after Supabase Auth account creation.
Example:
insert into public.profiles (id, role)  
values ('AUTH_USER_UUID_HERE', 'admin')  
on conflict (id) do update set role = 'admin';  

RLS requirements:
1.	Public users may insert into assessment_sessions.
2.	Public users may insert responses only for their created assessment flow through server-side API.
3.	Public users may not read all assessment responses.
4.	Authenticated dashboard users may read aggregate results.
5.	Admin users may: 
o	read all data
o	delete test data
o	update indicator values
o	trigger rescoring
6.	Service-role key may be used only in server-side API routes, never exposed client-side.
API requirements:
1.	POST /api/assessments 
o	validates survey payload
o	validates every q_code
o	stores session and responses
o	tags as test or live
2.	GET /api/assessments/[id] 
o	admin/viewer only
3.	POST /api/score 
o	server-side scoring using v3.0 engine
4.	GET /api/results/[id] 
o	admin/viewer only unless public result sharing is enabled
5.	GET /api/indicators 
o	admin/viewer only
6.	POST /api/admin/purge-test-data 
o	admin only
o	deletes only records where environment_mode = 'test'
7.	GET /api/admin/export-responses 
o	admin only
o	exports all responses to Excel-compatible format
8.	POST /api/admin/rescore 
o	admin only
o	builds §7.1 input from stored expert responses, stakeholder response counts, and indicator values
o	runs scorer
o	stores §7.2 result in assessment_results
Acceptance criteria
•	SQL migration files exist.
•	RLS policies exist.
•	Public routes can submit surveys.
•	Dashboard data cannot be read without login.
•	Admin can purge only test data.
•	Admin can export responses.
________________________________________
Task 5 — Replace Legacy Scoring with v3.0 TypeScript Scoring Engine
Status: Complete
Purpose: The v3.0 logic replaces the AILA scale (0-1) with a strict 1-5 scale. It must specifically use the formula $1 + (\frac{\text{raw}}{\text{max}}) \times 4$ for all indicators to prevent scale drift.

Files to modify/create:
src/lib/scoring.ts  
src/lib/scoring.test.ts  
src/types/scoring.ts  
src/lib/assessmentAggregation.ts  
Remove completely:
•	0–4 scale
•	old mapResponseToScore()
•	70/30 stakeholder weighting
•	triangulation bonus
•	old aggregate scoring logic
Implement from @SCORING_LOGIC_v3.0.md:
1.	1–5 scale only.
2.	Unknown sentinel 9 excluded.
3.	Survey score from stakeholder response counts.
4.	Expert score from valid expert ratings.
5.	Indicator normalization from @rubric_config.json.
6.	Unified sub-pillar weighted aggregation:
∑wisi∑wi\frac{\sum w_i s_i}{\sum w_i}∑wi∑wisi
7.	Pillar score = mean of valid sub-pillar scores.
8.	Overall score = mean of valid pillar scores.
9.	Maturity bands exactly from v3.0 spec.
10.	Data quality flag from coverage.
11.	Discrepancy flag from expert vs stakeholder mean.
12.	Output exactly conforms to §7.2 schema.
13.	Include validation log and audit metadata.
14.	Round only at output serialization.
Aggregation utility must:
•	group stakeholder responses by q_code
•	produce r1–r5 counts
•	exclude 9
•	combine expert responses + stakeholder counts + indicators into §7.1 input
Tests:
•	Port all 7 deterministic tests from v3.0 spec.
•	Add tests for: 
o	null indicators
o	unknown sentinel 9
o	2-question stakeholder sub-pillars
o	invalid q_code
o	invalid score
o	duplicate q_code
o	maturity boundary values
o	partial data coverage
Acceptance criteria
npm run test:lib  
npm run lint  
npm run build  
must all pass.
________________________________________
Refined Task 6 — Indicator Management
Task for Antigravity
Task 6 — Build Indicator Management for Admin
Status: Complete
Purpose: The UI where the admin inputs external indicator values (e.g., population coverage, WB ID4D index). These raw values are transformed into 1-5 sub-pillar scores.
Files to create:
src/data/indicatorRegistry.ts  
src/app/admin/indicators/page.tsx  
src/app/api/indicators/route.ts  
src/app/api/indicators/[indicator_code]/route.ts  
Required behavior:
1.	Generate indicator registry from rubric_config.json.
2.	Admin can view all configured indicators.
3.	Admin can enter or update raw values.
4.	Admin can mark an indicator as unavailable by setting raw value to null.
5.	Admin can choose test or live mode for indicator values.
6.	Validate raw values against expected range.
7.	Store: 
o	source
o	source URL
o	data date
o	notes
o	rubric version
8.	Missing indicators must not block scoring.
9.	Missing indicators must contribute to data quality flags according to v3.0 scoring logic.
Acceptance criteria
•	Admin can create/update live and test indicator values.
•	Null indicators are accepted.
•	Scoring handles missing indicators.
________________________________________
Refined Task 7 — Admin Login Dashboard and Analytics Dashboards
Key changes
Dashboard must be admin-login based and include additional views similar to the uploaded aggregation dashboard document.
Since the uploaded document did not expose readable text, describe this as a required visual/dashboard matching task.
Task for Antigravity
Task 7: Build Admin-Only Dashboard and Analytics Suite — ✅ COMPLETE (2026-05-10)
Implementation: 10-tab Cyber-Glass dashboard. v3.0 scoring engine integrated. All views implemented.
New files: assessmentAggregation.ts, DashboardShell.tsx, ExecutiveSummaryView, PillarDashboardView, SubpillarHeatmapView, QuestionAggregationView, ExpertResponseView, DiscrepancyView, DataQualityView, RawResponsesView, ExportsView, AdminActionsView, /api/admin/{rescore,export-responses,purge-test-data}. Build: Green (tsc --noEmit exit 0).

Route:
/dashboard  
Files to modify/create:
src/app/dashboard/page.tsx  
src/components/ResultsDashboard.tsx  
src/components/dashboard/  
Access:
Dashboard must require Supabase login.
Roles:
•	admin: full dashboard, exports, purge, rescore, indicator management
•	viewer: read-only dashboard
Dashboard views required:
1.	Executive Summary 
o	overall score
o	maturity level
o	scoring date
o	rubric version
o	live/test mode filter
2.	Pillar Dashboard 
o	6-pillar score cards
o	radar chart
o	bar chart
o	maturity labels
3.	Sub-Pillar Heatmap 
o	30 sub-pillars
o	maturity colours
o	coverage %
o	discrepancy indicators
4.	Question-Level Response Aggregation Dashboard 
o	similar to the attached document Survey - aggregation of number of responses per question.docx
o	for every stakeholder/non-expert question, show: 
	question code
	pillar
	sub-pillar
	question text
	count of responses selecting 1
	count of responses selecting 2
	count of responses selecting 3
	count of responses selecting 4
	count of responses selecting 5
	count of "I don't know" responses
	total valid responses
	weighted/mean score
o	include filters by pillar, sub-pillar, stakeholder category, organization type, and live/test mode

 
5.	Expert Response Dashboard 
o	expert question scores
o	expert coverage by sub-pillar
o	missing expert responses
6.	Expert vs Stakeholder Discrepancy Dashboard 
o	all sub-pillars with discrepancy flag
o	expert mean
o	stakeholder mean
o	absolute gap
o	sorted by largest gap
7.	Data Quality Dashboard 
o	coverage by sub-pillar
o	missing indicators
o	partial data flags
o	number of stakeholder responses by sub-pillar
8.	Raw Responses Dashboard 
o	table of submissions
o	no PII columns
o	organization, role/function, stakeholder category, mode, submission date
o	drilldown into non-PII answers and comments
9.	Exports 
o	export all responses to Excel
o	export question-level aggregation to Excel
o	export final scoring result JSON
o	export dashboard summary CSV
10.	Admin actions 
o	trigger scoring/rescoring
o	purge test data only
o	manage indicators
Design requirement:
The dashboard must be best-in-class:
•	polished layout
•	clear chart hierarchy
•	responsive
•	accessible
•	high-quality empty states
•	clear filters
•	no clutter
Acceptance criteria
•	/dashboard requires login.
•	Admin and viewer roles work.
•	Live/test filters work.
•	Question-level aggregation view exists.
•	Excel export works.
•	Purge test data deletes only test records.
•	Dashboard renders correctly from v3.0 result JSON.

Question-Level Aggregation Dashboard
•	For each survey question:
Column
Question Code
Pillar
Sub-Pillar
Question Text
Count: Score 1
Count: Score 2
Count: Score 3
Count: Score 4
Count: Score 5
Count: I don't know
Total Valid Responses
Mean Score
Mode
Completion %
•	Filters
Filter
Live/Test
Pillar
Sub-Pillar
Survey Type
Stakeholder Category
Organization Type
Date Range
•	Charts
Chart
Response distribution stacked bar by question
Average score by pillar
Average score by sub-pillar
I-don’t-know rate by question
Response count by stakeholder category
Completion/coverage by sub-pillar
•	This should cover the likely intent of “aggregation of number of responses per question.”

________________________________________
Refined Task 8 — Results Pages and Reporting
Task for Antigravity
Task 8: Build Results and Reporting Pages
Routes:
/results/[id]  
/dashboard/results/[id]  
Required behavior:
1.	Results page consumes stored §7.2 output JSON.
2.	Shows: 
o	overall score
o	maturity level
o	pillar scores
o	sub-pillar scores
o	flags
o	indicator status
3.	Includes: 
o	radar chart
o	sub-pillar heatmap
o	discrepancy list
o	data quality list
4.	Supports print-friendly layout.
5.	Allows admin/viewer to export: 
o	JSON
o	CSV
o	printable report
Do not expose public result pages unless explicitly enabled.
Acceptance criteria
•	Result page loads by result ID.
•	Uses stored result JSON only.
•	Does not recompute scores client-side.
________________________________________
Refined Task 9 — Live/Test Modes, Purge, and Excel Export
Key point
This is important enough to keep as a separate task even though it overlaps with dashboard/API work.
Task for Antigravity
Task 9: Preserve and Strengthen Live/Test Mode Operations
Required behavior:
1.	Every record must include:
environment_mode = 'test' | 'live'  
2.	Surveys must allow choosing test/live mode through a controlled setting:
o	default public survey mode should be live
o	test mode may be enabled by query parameter or admin toggle, e.g. ?mode=test
3.	Dashboard must include live/test filter.
4.	Admin can purge test data only.
5.	Purge operation must delete test records from:
o	assessment_sessions
o	assessment_responses
o	assessment_results
o	test-mode indicator_values, only if admin explicitly confirms
6.	Purge operation must never delete live records.
7.	Export all responses to Excel:
o	one sheet for sessions
o	one sheet for raw responses
o	one sheet for question-level aggregation
o	one sheet for scoring results
o	one sheet for indicators
8.	Include timestamp and mode in exported filename:
barbados_digital_id_assessment_live_export_YYYYMMDD.xlsx  
barbados_digital_id_assessment_test_export_YYYYMMDD.xlsx  

Backup / Rollback
Since this is a formal assessment app, add backup before purge and before migrations.
Before purging test data, show confirmation and optionally export test data backup.

Acceptance criteria
•	Test data purge verified by automated test.
•	Live records remain untouched.
•	Excel export opens cleanly and includes all required sheets.
________________________________________
Refined Task 10 — End-to-End Workflow and Integration Tests
Task for Antigravity
Task 10: Implement and Test End-to-End Workflow
Required flow:
1.	User visits /.
2.	User chooses /expert or /stakeholders.
3.	User completes non-PII survey.
4.	Survey is submitted through API.
5.	Admin logs into /dashboard.
6.	Admin verifies submissions.
7.	Admin enters/updates indicator values.
8.	Admin triggers scoring.
9.	App aggregates: 
o	expert responses
o	stakeholder response counts
o	indicator values
10.	v3.0 scorer generates result.
11.	Result is stored.
12.	Dashboard displays results.
13.	Admin exports Excel.
14.	Admin can purge test data.
Testing requirements:
Add tests for:
•	framework validation
•	scoring engine
•	survey rendering counts
•	no PII fields
•	API submission validation
•	stakeholder aggregation counts
•	live/test separation
•	purge test data safety
•	dashboard rendering
•	export generation
Add Playwright or equivalent E2E tests if feasible:
•	submit expert survey in test mode
•	submit stakeholder survey in test mode
•	login to dashboard
•	trigger scoring
•	verify dashboard displays score
•	export responses
•	purge test data

Seed Data for Testing
Add deterministic test/demo data.
Create seed scripts for:
•	one full expert test submission
•	five stakeholder test submissions
•	sample indicator values
•	one computed result

Browser Compatibility
Test latest Chrome, Edge, Safari, and mobile Safari/Chrome.

Final local commands:
npm run validate:framework  
npm run test:lib  
npm run test  
npm run lint  
npm run build  
Acceptance criteria
All tests pass before GitHub push and Vercel deployment.
________________________________________
Refined Task 11 — Best-in-Class UI, Accessibility, and Quality Pass
Task for Antigravity
Task 11: Best-in-Class UI/UX and Accessibility Pass
Goal:
Make the application look and feel like a high-quality national digital governance assessment platform.
Required design principles:
1.	Premium public-sector design language.
2.	Clear Barbados-specific identity without overusing flags or decorative elements.
3.	Clean typography and spacing.
4.	Elegant cards, dashboards, and forms.
5.	Mobile-responsive survey experience.
6.	Dashboard optimized for desktop but usable on tablets.
7.	Consistent maturity color system.
8.	Accessible color contrast.
9.	Keyboard-navigable forms.
10.	Screen-reader friendly labels.
11.	Clear empty states and loading states.
12.	Polished success/error messages.
Pages requiring design pass:
•	/
•	/expert
•	/stakeholders
•	/dashboard
•	/results/[id]
•	/admin/indicators
Acceptance criteria:
•	WCAG 2.1 AA-oriented implementation
•	no obvious layout breakage on mobile
•	no inaccessible color-only status indicators
•	no raw developer/debug UI visible to users
•	polished visual hierarchy throughout
________________________________________
Refined Task 12 — Deployment, GitHub Push, and Vercel Release
Task for Antigravity
Task 12: Exact Steps to Securely Deploy on Vercel
Goal:
Deploy the application to Vercel securely, ensuring separation from the existing legacy application, maintaining environment variable integrity, and fulfilling all production constraints.

Required steps for secure deployment:
1. Environment Preparation (Local) and GitHub Version Control
   - Ensure all secrets are kept out of version control. Ensure `.env.local` and `.env` are present in `.gitignore`.
   - Validate build locally by running: `npm run build`. Fix any type or linting errors.
   - To push the code to a NEW GitHub repository (Initial Commit):
     ```bash
     git init
     git add .
     git commit -m "Initial commit: Barbados Digital ID Assessment Framework"
     git branch -M main
     git remote add origin https://github.com/YOUR_GITHUB_USERNAME/barbados-digital-id-assessment.git
     git push -u origin main
     ```
   - To push updates to an EXISTING GitHub repository:
     ```bash
     git add .
     git commit -m "Update: Describe your changes here"
     git push origin main
     ```

2. Supabase Production Preparation
   - Do NOT use the legacy application's Supabase project.
   - Create a NEW Supabase project strictly for `barbados-digital-id-assessment`.
   - Run the initial SQL migrations in the new Supabase project (from `supabase/migrations/`).
   - Setup RLS policies on the new Supabase project as defined in the SQL scripts.
   - Create the initial Admin user in the `auth.users` and `public.profiles` table via Supabase SQL Editor.
   - Retrieve the new production credentials: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

3. Vercel Project Creation
   - Log into Vercel and click "Add New..." -> "Project".
   - Import the GitHub repository where the code is hosted.
   - Name the Vercel project exactly: `barbados-digital-id-assessment`
   - Set the Framework Preset to "Next.js".
   - DO NOT click Deploy yet.

4. Vercel Environment Variables Configuration (Secure)
   - In the project configuration screen (or Project Settings -> Environment Variables), add the following keys with their respective production values from the new Supabase project:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY` (CRITICAL: Must remain server-side only, do not prefix with NEXT_PUBLIC_)
     - `NEXT_PUBLIC_APP_ENV` = `production`
     - `NEXT_PUBLIC_APP_NAME` = `Barbados Digital ID Assessment`
   - Ensure these are added to the "Production" environment in Vercel.

5. Domain Configuration
   - Deploy the project initially.
   - Once deployed, go to the Vercel Project Settings -> Domains.
   - Add the domain: `barbados-digital-id-assessment.vercel.app` (or a custom domain if provided).
   - Ensure the legacy domain (`digital-id-assessment.vercel.app`) is NOT linked to this project.

6. Post-Deployment Verification (Smoke Test)
   - Visit `https://barbados-digital-id-assessment.vercel.app/` and verify the splash page loads.
   - Submit a test stakeholder survey.
   - Attempt to access `/dashboard` as a public user (should redirect to login).
   - Login to `/dashboard` using the created Admin credentials.
   - Verify the test survey appears in the dashboard.
   - Delete the test survey using the "Purge Test Data" function.

7. Final Security Lockdown
   - Restrict Supabase database access to only the Vercel deployment IP/Domain if possible (via Network Restrictions in Supabase settings).
   - Ensure the `SUPABASE_SERVICE_ROLE_KEY` is never logged to the client or leaked in API responses.

Acceptance criteria
•	New Vercel URL works.
•	Existing Vercel URL remains unchanged.
•	GitHub has final pushed code.
•	App passes smoke test in production.
•	Environment variables are securely injected in Vercel.
________________________________________
Updated Route Map
The final app should use this route map:
Route	Access	Purpose
/	Public	Splash page / framework overview
/expert	Public	Expert survey
/stakeholders	Public	Stakeholder survey
/thank-you	Public	Submission confirmation
/dashboard	Admin/viewer login	Main dashboard
/dashboard/results/[id]	Admin/viewer login	Stored result detail
/admin/indicators	Admin only	Indicator management
/admin/assessments	Admin only	Assessment management
/admin/rubric	Admin only	Rubric/version view
/results/[id]	Optional/restricted	Public/shareable result only if enabled
________________________________________
Updated Data Model Summary
Should collect
Field	Expert	Stakeholder
Organization name	Optional	Optional
Organization type	Optional	Optional
Role/function	Optional	Optional
Stakeholder category	Optional	Required
Country	Default Barbados	Default Barbados
Environment mode	Required	Required
Question responses	Required	Required
Evidence/comments	Optional	Optional
Must not collect
PII Field	Status
Personal name	❌ Do not collect
Personal email	❌ Do not collect
Phone number	❌ Do not collect
Personal address	❌ Do not collect
Government ID number	❌ Do not collect
IP address for respondent identity	❌ Do not intentionally store as identity metadata
________________________________________
________________________________________
