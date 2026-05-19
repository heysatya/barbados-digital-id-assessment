# Barbados Trident Digital ID Assessment Framework
## Complete Question & Response Refinement Plan — v3

> **For coding agent:** Produce `frameworkQuestions.ts` exactly as specified in Section 3.
> **Total entries:** 90 Expert (`EX`) + 60 Stakeholder (`NE`) = **150**

---

## Section 1 — Global Refinement Principles

### 1.1 Survey Counts

| Survey | Count | q_code infix |
|--------|-------|-------------|
| Expert | 90 | `EX` |
| Stakeholder (Non-Expert) | 60 | `NE` |
| **Total** | **150** | |

### 1.2 q_code Format (CRITICAL)

The TypeScript `q_code` field **must** include the survey-type infix:

| Workbook Code | Expert TypeScript q_code | Stakeholder TypeScript q_code |
|---------------|--------------------------|-------------------------------|
| `P1.1.Q1` | `P1.1.EX.Q1` | `P1.1.NE.Q1` |
| `P3.5.Q3` | `P3.5.EX.Q3` | *(not in stakeholder 60)* |
| `P5.4.Q2` | `P5.4.EX.Q2` | *(expert-only — excluded from NE)* |
| `P5.4.Q3` | `P5.4.EX.Q3` | `P5.4.NE.Q3` *(P5.4 exception)* |

**Rule:** Take the workbook code (e.g. `P1.1.Q1`), insert `EX` or `NE` before `.Q`, giving `P1.1.EX.Q1` or `P1.1.NE.Q1`.

### 1.3 Stakeholder 60 Selection Rules

- For **all sub-pillars except P5.4**: include `NE.Q1` and `NE.Q2` only (drop Q3).
- For **P5.4** (Emerging Tech Safeguards): include `NE.Q1` and `NE.Q3` only (`NE.Q2` is expert-only).
- This yields exactly **2 stakeholder questions per sub-pillar × 30 sub-pillars = 60**.

### 1.4 TypeScript Interface

```typescript
export interface FrameworkQuestion {
  q_code: string;           // e.g. 'P1.1.EX.Q1' or 'P1.1.NE.Q1'
  pillar_code: string;      // e.g. 'P1'
  pillar_name: string;
  subpillar_code: string;   // e.g. 'P1.1'
  subpillar_name: string;
  survey_type: 'expert' | 'stakeholder';
  question_text: string;
  options: {
    score: number;          // 1–5 for maturity levels, 9 for 'don't know'
    label: string;
    description: string;
  }[];
  allow_unknown: boolean;   // always true
}
```

### 1.5 Options Array Rules

- Every entry has **exactly 6 options**: scores 1, 2, 3, 4, 5, and 9.
- Score labels: `1 – Basic`, `2 – Opportunistic`, `3 – Systematic`, `4 – Differentiating`, `5 – Transformational`, `9 – I don't know`.
- Score 9 description is always: *"Insufficient information to make an assessment."*
- `allow_unknown` is always `true`.

### 1.6 Response Choice Tightening Rules

| Survey Type | Rule |
|-------------|------|
| Expert | Max 2 crisp sentences per option. Technical precision retained. |
| Stakeholder | 1–2 plain-language sentences. No jargon. Barbados/Trident named where helpful. |

### 1.7 Barbados / Trident / CARICOM Contextualisation

Apply the following substitutions where relevant:

| Generic phrase | Contextualised replacement |
|----------------|---------------------------|
| 'the digital ID system' | 'Trident' |
| 'the national digital identity system' | 'Barbados's Trident system' |
| 'neighboring countries' | 'CARICOM member states' |
| 'cross-border use cases' | 'regional use cases including CARICOM travel and trade' |
| 'key sectors' | 'key sectors including tourism, financial services, and public administration' |

### 1.8 Redundancy Resolutions

Six question pairs were identified as overlapping. Resolution: differentiate language to clarify distinct focus.

| Pair | Resolution |
|------|-----------|
| P2.3.Q1 vs P2.3.Q2 | Q1 = legal basis for data collection; Q2 = consent mechanisms in practice |
| P3.1.Q1 vs P3.1.Q2 | Q1 = interoperability policy; Q2 = technical implementation |
| P4.2.Q1 vs P4.2.Q2 | Q1 = authentication standards; Q2 = credential lifecycle management |
| P5.1.Q1 vs P5.1.Q2 | Q1 = grievance mechanism existence; Q2 = grievance resolution effectiveness |
| P6.1.Q1 vs P6.1.Q2 | Q1 = governance structure; Q2 = accountability mechanisms |
| P6.3.Q1 vs P6.3.Q2 | Q1 = audit framework; Q2 = audit findings and follow-up |

---

## Section 2 — Question-by-Question Refinement (All 150 Entries)

> Entries are ordered: sub-pillar → Q number → Expert before Stakeholder.
> Each entry shows the **TypeScript q_code**, refined question text, and all 6 response options.

### Pillar P1: Service Delivery & User Value

#### Sub-Pillar P1.1: Coverage & Inclusion

##### `P1.1.EX.Q1` — 🔵 Expert

**Question:** How inclusive is digital ID enrollment across all population groups and regions?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Coverage below 20%; no disaggregated data by geography, gender, or vulnerability; no equity targets set. |
| 2 | 2 – Opportunistic | Coverage 20–40%; basic disaggregation by geography and gender collected; outreach to rural areas is ad hoc. |
| 3 | 3 – Systematic | Coverage 40–70%; formal inclusion strategy with equity targets operational; mobile enrollment units reach remote areas. |
| 4 | 4 – Differentiating | Coverage 70–90%; real-time equity dashboards track gaps by sub-group; multi-modal enrollment reduces structural barriers. |
| 5 | 5 – Transformational | Coverage exceeds 90%; no exclusion attributable to system design; inclusion innovations shared globally. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.1.NE.Q1` — 🟢 Stakeholder

**Question:** How inclusive is digital ID enrollment across all population groups and regions?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Fewer than 1 in 5 people have a digital ID; no effort is made to track or reach groups who are left out. |
| 2 | 2 – Opportunistic | Between 1 in 5 and 2 in 5 people are enrolled; some data is collected by region and gender but outreach is limited. |
| 3 | 3 – Systematic | Between 2 in 5 and 7 in 10 people are enrolled; a formal inclusion plan is in place; mobile teams reach remote areas. |
| 4 | 4 – Differentiating | Between 7 in 10 and 9 in 10 people are enrolled; real-time data tracks gaps for specific groups. |
| 5 | 5 – Transformational | Over 9 in 10 people are enrolled; no one is excluded because of how the system was designed. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.1.EX.Q2` — 🔵 Expert

**Question:** What specific measures exist to reach marginalized or hard-to-reach populations?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No targeted measures for marginalized groups; no alternative documentation pathways exist. |
| 2 | 2 – Opportunistic | Some rural outreach occurs; alternative documentation pathways proposed but not operationalized. |
| 3 | 3 – Systematic | Structured inclusion strategy with dedicated outreach targets identified vulnerable groups (stateless, disabled, elderly, minorities). |
| 4 | 4 – Differentiating | Annual exclusion mapping conducted; community enrollment agents deployed in hard-to-reach areas; proactive outreach funded. |
| 5 | 5 – Transformational | Zero exclusion attributable to system design independently verified; model shared globally. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.1.NE.Q2` — 🟢 Stakeholder

**Question:** What specific measures exist to reach marginalized or hard-to-reach populations?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Nothing specific is done to help people who are hard to reach — such as those living remotely or without documents. |
| 2 | 2 – Opportunistic | Some outreach happens in rural areas; alternative ways to prove identity are proposed but not yet available. |
| 3 | 3 – Systematic | A formal inclusion program targets specific groups such as people with disabilities, the elderly, and remote communities. |
| 4 | 4 – Differentiating | Each year, a mapping exercise identifies those still excluded; community agents operate in remote areas. |
| 5 | 5 – Transformational | Independent audits confirm that no one is excluded because of how the system is designed. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.1.EX.Q3` — 🔵 Expert

**Question:** How strong are accessibility and non-discrimination protections in the enrollment process?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No accessibility requirements applied in enrollment design; system does not accommodate persons with disabilities. |
| 2 | 2 – Opportunistic | Basic accessibility accommodations available informally; WCAG compliance not assessed; non-discrimination not enforced. |
| 3 | 3 – Systematic | WCAG 2.1 AA compliance implemented and certified for all digital channels; legally mandated non-discrimination provisions apply. |
| 4 | 4 – Differentiating | Accessibility proactively monitored through user testing with persons with disabilities; equity audits published. |
| 5 | 5 – Transformational | Accessibility standards exceed legal minimums; system independently recognized as a global model for inclusive design. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P1.2: User Experience

##### `P1.2.EX.Q1` — 🔵 Expert

**Question:** How easy is the digital ID system to use across different channels and devices?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No user testing conducted; interface assumes high digital literacy; only in-person enrollment available. |
| 2 | 2 – Opportunistic | Basic usability testing done with a small, non-representative sample; some channel options available. |
| 3 | 3 – Systematic | Comprehensive UX research with diverse user representation informs design; multiple channels (online, mobile, in-person) available. |
| 4 | 4 – Differentiating | Continuous usability feedback loops drive iterative improvements; satisfaction scores benchmarked and publicly reported. |
| 5 | 5 – Transformational | System recognized as exemplary in user-centered design; UX innovations contributed to global DPI design standards. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.2.NE.Q1` — 🟢 Stakeholder

**Question:** How easy is the digital ID system to use across different channels and devices?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | The system has never been tested with real users; it assumes a level of digital skill that many people do not have. |
| 2 | 2 – Opportunistic | Some basic usability testing has been done but with a limited group of people. |
| 3 | 3 – Systematic | The system was designed based on research with a wide range of users; multiple ways to access it are available. |
| 4 | 4 – Differentiating | User feedback is collected continuously and drives improvements; satisfaction scores are publicly reported. |
| 5 | 5 – Transformational | The system is internationally recognized for excellent user-centered design. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.2.EX.Q2` — 🔵 Expert

**Question:** How well does the system support users with disabilities, low digital literacy, or limited connectivity?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Digital channels not accessible to persons with disabilities; no assisted enrollment or literacy support available. |
| 2 | 2 – Opportunistic | Partial WCAG compliance for some channels; assisted enrollment available informally in some locations. |
| 3 | 3 – Systematic | Full WCAG 2.1 AA compliance across all channels; assisted enrollment available as a standard service. |
| 4 | 4 – Differentiating | Proactive accessibility innovation beyond WCAG minimums; digital literacy support embedded in enrollment experience. |
| 5 | 5 – Transformational | System is an internationally recognized model for accessible public digital services. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.2.NE.Q2` — 🟢 Stakeholder

**Question:** How well does the system support users with disabilities, low digital literacy, or limited connectivity?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | People with disabilities cannot use the digital system; there is no help for people with low digital skills. |
| 2 | 2 – Opportunistic | Some parts of the digital system are accessible; assisted enrollment exists in some locations informally. |
| 3 | 3 – Systematic | The system meets formal accessibility standards; help is available at every enrollment point. |
| 4 | 4 – Differentiating | Accessibility goes beyond legal minimums; dedicated support is available for all users who need it. |
| 5 | 5 – Transformational | The system is internationally recognized for accessible public digital design. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.2.EX.Q3` — 🔵 Expert

**Question:** How effective are offline or low-connectivity options for accessing digital ID services?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No offline capability; digital ID services entirely dependent on internet connectivity. |
| 2 | 2 – Opportunistic | Offline enrollment available but verification requires connectivity; syncing of offline records is manual and delayed. |
| 3 | 3 – Systematic | Seamless offline/online synchronization operational; enrollment and basic verification possible without connectivity. |
| 4 | 4 – Differentiating | Offline capability supports the full range of ID use cases including authentication for government services. |
| 5 | 5 – Transformational | Offline-first design is a core architectural principle; offline innovations contributed to global DPI standards. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P1.3: Service Integration

##### `P1.3.EX.Q1` — 🔵 Expert

**Question:** How widely is digital ID integrated into government services?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Digital ID not accepted for any government service; all services require physical documents. |
| 2 | 2 – Opportunistic | Digital ID accepted in one or two government pilot services; integration not mandated. |
| 3 | 3 – Systematic | Digital ID mandatorily accepted across three or more core government services via standardized API-based authentication. |
| 4 | 4 – Differentiating | Digital ID accepted across the full public sector with a single sign-on experience; adoption monitored and publicly reported. |
| 5 | 5 – Transformational | Digital ID universally accepted across all public services; cross-border government service access enabled. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.3.NE.Q1` — 🟢 Stakeholder

**Question:** How widely is digital ID integrated into government services?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No government service accepts digital ID; physical documents are always required. |
| 2 | 2 – Opportunistic | Digital ID is accepted in one or two pilot government services only. |
| 3 | 3 – Systematic | Digital ID is accepted across several core government services through a standard connection process. |
| 4 | 4 – Differentiating | A single digital ID login works across all government services; adoption is tracked and publicly reported. |
| 5 | 5 – Transformational | Digital ID is accepted by all public services and some cross-border services. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.3.EX.Q2` — 🔵 Expert

**Question:** How broadly is digital ID accepted by the private sector and sub-national institutions?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Digital ID not accepted by any private sector entity or sub-national institution. |
| 2 | 2 – Opportunistic | A small number of private companies accept digital ID voluntarily; sub-national governments operate independent identity systems. |
| 3 | 3 – Systematic | Private sector acceptance mandated for regulated industries (banking, telecoms); sub-national adoption under a standard process. |
| 4 | 4 – Differentiating | Widespread voluntary private sector adoption beyond mandated industries; thriving digital identity ecosystem. |
| 5 | 5 – Transformational | Universal private and sub-national acceptance achieved; cross-border private sector services enabled. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.3.NE.Q2` — 🟢 Stakeholder

**Question:** How broadly is digital ID accepted by the private sector and sub-national institutions?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Private companies and local governments do not accept digital ID. |
| 2 | 2 – Opportunistic | A few private companies accept digital ID voluntarily; local governments use separate identity systems. |
| 3 | 3 – Systematic | Banks and telecoms are required to accept digital ID; local governments have adopted it. |
| 4 | 4 – Differentiating | Most private companies accept digital ID and build value-added services on top of it. |
| 5 | 5 – Transformational | Private and sub-national acceptance is universal. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.3.EX.Q3` — 🔵 Expert

**Question:** How consistently can users rely on digital ID across priority service journeys?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Users cannot rely on digital ID for any service journey; authentication experiences are inconsistent or non-functional. |
| 2 | 2 – Opportunistic | Users can rely on digital ID for one or two service journeys but experience significant inconsistency. |
| 3 | 3 – Systematic | Users can consistently use digital ID across defined priority service journeys; reliability tracked with SLA targets. |
| 4 | 4 – Differentiating | User trust demonstrated through survey data; SLA performance publicly reported. |
| 5 | 5 – Transformational | Reliability exceeds 99.9% for all service journeys; user trust data publicly reported. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P1.4: Value

##### `P1.4.EX.Q1` — 🔵 Expert

**Question:** To what extent has digital ID reduced transaction time and cost for users and service providers?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No measurement of transaction time reduction; manual identity verification processes dominate service delivery. |
| 2 | 2 – Opportunistic | Basic time-tracking for enrollment conducted; limited automation yields anecdotally reported time savings. |
| 3 | 3 – Systematic | Transaction time reduction systematically measured for key services; documented improvements of at least 30% evidenced. |
| 4 | 4 – Differentiating | Real-time analytics measure transaction efficiency across all digital ID-enabled services; savings quantified in economic terms. |
| 5 | 5 – Transformational | International benchmarking confirms top-quartile transaction efficiency; time savings independently audited. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.4.NE.Q1` — 🟢 Stakeholder

**Question:** To what extent has digital ID reduced transaction time and cost for users and service providers?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No one measures whether using digital ID saves time; manual processes still dominate most services. |
| 2 | 2 – Opportunistic | Enrollment time has been tracked in one or two places; some time savings reported but not formally measured. |
| 3 | 3 – Systematic | Time savings from using digital ID are measured for the main services. |
| 4 | 4 – Differentiating | Transaction times are tracked in real time across all digital ID services and converted into economic savings. |
| 5 | 5 – Transformational | The country ranks among the best globally for transaction efficiency using digital ID. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.4.EX.Q2` — 🔵 Expert

**Question:** How much economic and social value has digital ID generated through cost savings or convenience gains?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No economic or social value assessment conducted; service delivery costs not tracked against a digital ID baseline. |
| 2 | 2 – Opportunistic | Anecdotal evidence of cost savings in one or two services; no formal cost-benefit analysis completed. |
| 3 | 3 – Systematic | Formal cost-benefit analysis or economic impact assessment conducted and published. |
| 4 | 4 – Differentiating | Demonstrable economic impact evidenced through independent studies; value tracked by service type and user segment. |
| 5 | 5 – Transformational | Digital ID's economic contribution recognized in national accounts or by international development organizations. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.4.NE.Q2` — 🟢 Stakeholder

**Question:** How much economic and social value has digital ID generated through cost savings or convenience gains?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No one has studied whether digital ID saves money or makes life easier for people. |
| 2 | 2 – Opportunistic | Some anecdotal evidence of savings exists but no formal study has been done. |
| 3 | 3 – Systematic | A formal study has been done showing the economic and social benefits of digital ID. |
| 4 | 4 – Differentiating | Independent studies show the economic impact of digital ID; results are broken down by service and user group. |
| 5 | 5 – Transformational | Digital ID's contribution to the economy is officially recognized nationally and internationally. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.4.EX.Q3` — 🔵 Expert

**Question:** How well are efficiency improvements measured and used to drive service delivery improvements?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Efficiency metrics not defined for digital ID-enabled services; no feedback loop links performance data to improvement decisions. |
| 2 | 2 – Opportunistic | Some performance metrics tracked informally; efficiency data reviewed periodically but does not systematically drive improvement. |
| 3 | 3 – Systematic | Performance measurement framework with defined KPIs operational for digital ID-enabled services. |
| 4 | 4 – Differentiating | Real-time performance analytics integrated into service management dashboards; improvements tracked publicly. |
| 5 | 5 – Transformational | Performance data informs agile service redesign in real time; methodology contributed to global DPI standards. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P1.5: Improvement

##### `P1.5.EX.Q1` — 🔵 Expert

**Question:** How systematically is user feedback collected and acted upon for digital ID-enabled services?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No formal user feedback mechanism exists; feedback received informally through ad hoc channels with no tracking. |
| 2 | 2 – Opportunistic | Basic feedback channel (email or complaints box) exists; feedback reviewed irregularly; no systematic tracking. |
| 3 | 3 – Systematic | Multi-channel feedback system with automated routing and SLA tracking operational; feedback categorized and reviewed in structured cycles. |
| 4 | 4 – Differentiating | Advanced analytics on feedback data identify systemic issues proactively; feedback informs co-design of service enhancements. |
| 5 | 5 – Transformational | Real-time feedback drives adaptive service optimization; feedback methodology contributed to global DPI service design standards. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.5.NE.Q1` — 🟢 Stakeholder

**Question:** How systematically is user feedback collected and acted upon for digital ID-enabled services?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There is no formal way for people to give feedback about their digital ID experience. |
| 2 | 2 – Opportunistic | There is a basic way to give feedback (like an email address) but it is checked irregularly. |
| 3 | 3 – Systematic | A multi-channel feedback system is in place; feedback is tracked and used to improve services. |
| 4 | 4 – Differentiating | Analytics on feedback data identify problems before they escalate; feedback informs service redesign. |
| 5 | 5 – Transformational | Feedback drives real-time service adaptation; the feedback approach is shared internationally as a best practice. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.5.EX.Q2` — 🔵 Expert

**Question:** How well is service performance monitored and acted upon?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No service performance monitoring exists for digital ID-enabled services. |
| 2 | 2 – Opportunistic | Basic performance metrics (e.g., system uptime) monitored internally; no public reporting. |
| 3 | 3 – Systematic | Performance monitoring framework with defined KPIs, SLA targets, and public dashboards operational. |
| 4 | 4 – Differentiating | Advanced analytics detect performance degradation proactively; improvement actions tracked in a public register. |
| 5 | 5 – Transformational | Real-time performance monitoring drives adaptive management; framework contributed to global DPI service management standards. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.5.NE.Q2` — 🟢 Stakeholder

**Question:** How well is service performance monitored and acted upon?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No one monitors how well digital ID services are performing. |
| 2 | 2 – Opportunistic | Basic performance data (like whether the system is online) is tracked internally but not shared publicly. |
| 3 | 3 – Systematic | A performance monitoring system with clear targets and public dashboards is in place. |
| 4 | 4 – Differentiating | Advanced tools detect problems before they affect users; improvement actions are publicly tracked. |
| 5 | 5 – Transformational | Performance monitoring is real time and drives continuous improvement; the approach is recognized globally. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P1.5.EX.Q3` — 🔵 Expert

**Question:** How effective are continuous improvement processes for fixing problems and optimizing service delivery?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No continuous improvement process exists; service problems recur without systemic resolution. |
| 2 | 2 – Opportunistic | Informal improvement process exists; some problems fixed reactively; retrospective reviews occur after major incidents only. |
| 3 | 3 – Systematic | Structured continuous improvement process (e.g., PDCA) institutionalized for digital ID-enabled services. |
| 4 | 4 – Differentiating | Improvement processes data-driven and time-bound; co-design with users standard practice for major improvements. |
| 5 | 5 – Transformational | Improvement methodology fully embedded and contributes to adaptive service design; shared globally. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

### Pillar P2: Safeguards, Trust & Accountability

#### Sub-Pillar P2.1: Consent & Data Minimization

##### `P2.1.EX.Q1` — 🔵 Expert

**Question:** How well does the system implement informed consent for data collection and sharing?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No consent mechanism exists; data collected and shared without user knowledge; no legal basis for processing documented. |
| 2 | 2 – Opportunistic | Basic consent notices provided at enrollment but not informed (complex language, pre-ticked boxes); no withdrawal mechanism. |
| 3 | 3 – Systematic | Informed consent obtained in plain language at point of data collection; user portal enables consent management and withdrawal. |
| 4 | 4 – Differentiating | Granular, dynamic consent allows users to control data sharing per service; consent logs available to users in real time. |
| 5 | 5 – Transformational | Consent architecture is a global reference for privacy-respecting digital identity; advanced consent technologies deployed. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.1.NE.Q1` — 🟢 Stakeholder

**Question:** How well does the system implement informed consent for data collection and sharing?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Data is collected without asking permission; people do not know what information is taken or how it is used. |
| 2 | 2 – Opportunistic | A consent notice is shown during enrollment but it uses complex language and people cannot withdraw consent. |
| 3 | 3 – Systematic | Consent is obtained in plain language; a user portal allows people to manage and withdraw consent. |
| 4 | 4 – Differentiating | People can control exactly which services see which data; consent records are available in real time. |
| 5 | 5 – Transformational | The consent system is recognized globally as a best practice for privacy-respecting digital identity. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.1.EX.Q2` — 🔵 Expert

**Question:** To what extent are data minimization and purpose limitation applied in practice?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Data beyond what is necessary for service delivery routinely collected; no purpose limitation applied. |
| 2 | 2 – Opportunistic | Data minimization and purpose limitation stated in policy but not technically enforced. |
| 3 | 3 – Systematic | Data minimization implemented in system design; only data required for each specific service collected and exchanged. |
| 4 | 4 – Differentiating | Automated data minimization routines purge data exceeding retention limits; purpose limitation verified through independent audits. |
| 5 | 5 – Transformational | Privacy-preserving credential technologies (e.g., selective disclosure, zero-knowledge proofs) eliminate unnecessary data sharing. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.1.NE.Q2` — 🟢 Stakeholder

**Question:** To what extent are data minimization and purpose limitation applied in practice?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | More data is collected than is needed for services; there are no limits on how it can be used. |
| 2 | 2 – Opportunistic | Policies mention collecting only what is needed but this is not technically enforced in practice. |
| 3 | 3 – Systematic | The system is designed to collect only the minimum data needed for each service. |
| 4 | 4 – Differentiating | Automated tools delete data after its permitted use; independent audits check that only the right data is used. |
| 5 | 5 – Transformational | Advanced privacy technologies mean that sharing any unnecessary data is technically impossible. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.1.EX.Q3` — 🔵 Expert

**Question:** How strong are user rights and controls over their personal data (access, correction, portability, deletion)?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Users have no rights to access, correct, port, or delete personal data; no mechanism to exercise such rights exists. |
| 2 | 2 – Opportunistic | User rights stated in policy but exercising them requires a complex manual process with long response times. |
| 3 | 3 – Systematic | Users can access, correct, and (where legally applicable) delete or port their data through a self-service portal. |
| 4 | 4 – Differentiating | User rights exercisable in real time via a digital dashboard; rights exercise logged and independently verified. |
| 5 | 5 – Transformational | User rights mechanisms technically advanced (e.g., machine-readable personal data export); recognized globally. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P2.2: Transparency & Explainability

##### `P2.2.EX.Q1` — 🔵 Expert

**Question:** How transparent are digital ID system rules, operations, and decision processes to the public?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No public information available on how the digital ID system operates; decision-making logic undisclosed. |
| 2 | 2 – Opportunistic | High-level system descriptions published; key operational rules documented internally but not publicly accessible. |
| 3 | 3 – Systematic | Comprehensive public reporting covers system rules, operational performance, and key decision processes. |
| 4 | 4 – Differentiating | Real-time transparency dashboards enable public monitoring of system performance and compliance. |
| 5 | 5 – Transformational | Transparency tools contributed to global DPI repositories; model independently recognized as a regional standard. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.2.NE.Q1` — 🟢 Stakeholder

**Question:** How transparent are digital ID system rules, operations, and decision processes to the public?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Nothing is publicly available about how the digital ID system works or how decisions are made. |
| 2 | 2 – Opportunistic | High-level descriptions are published but the rules governing the system are not publicly available. |
| 3 | 3 – Systematic | Comprehensive public reports cover how the system works, what rules it follows, and how it performs. |
| 4 | 4 – Differentiating | Real-time dashboards allow anyone to see system performance and compliance. |
| 5 | 5 – Transformational | Transparency tools are shared with other countries; the model is recognized as a regional standard. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.2.EX.Q2` — 🔵 Expert

**Question:** How understandable are automated decisions and technical processes for affected users and institutions?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Automated decisions opaque; no explanation provided to affected individuals or institutions. |
| 2 | 2 – Opportunistic | High-level explanations of automated decision logic available to institutions but not to individual users. |
| 3 | 3 – Systematic | Plain-language explanations of automated decision logic available to all affected individuals and institutions. |
| 4 | 4 – Differentiating | Interactive explainability tools enable affected individuals to understand and query specific decisions. |
| 5 | 5 – Transformational | Explainability tools open-source and contributed to global DPI repositories; adopted by peer jurisdictions. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.2.NE.Q2` — 🟢 Stakeholder

**Question:** How understandable are automated decisions and technical processes for affected users and institutions?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | When an automated decision affects someone, no explanation is given and there is no way to understand why. |
| 2 | 2 – Opportunistic | General information about how the system makes decisions is available to institutions but not to individual users. |
| 3 | 3 – Systematic | Anyone affected by an automated decision can receive a plain-language explanation of how and why it was made. |
| 4 | 4 – Differentiating | Interactive tools let individuals query specific decisions made about them. |
| 5 | 5 – Transformational | Explainability tools are open-source; the approach is adopted by other countries. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.2.EX.Q3` — 🔵 Expert

**Question:** How proactively are system documentation, privacy notices, and operational information disclosed?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | System documentation, privacy notices, and operational information only provided upon formal request; no proactive disclosure. |
| 2 | 2 – Opportunistic | Basic privacy notices published at enrollment; system changes not proactively communicated to affected users. |
| 3 | 3 – Systematic | Privacy notices, system change notifications, and operational documentation proactively published and updated in real time. |
| 4 | 4 – Differentiating | Users proactively notified of all changes affecting their data or rights; documentation available in multiple formats and languages. |
| 5 | 5 – Transformational | Proactive disclosure embedded as a core system design principle; transparency model contributed to global DPI governance frameworks. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P2.3: Accountability & Redress

##### `P2.3.EX.Q1` — 🔵 Expert

**Question:** How clear and accessible are mechanisms for lodging complaints about digital ID issues?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No formal complaint mechanism specific to digital ID exists; complaints handled informally with no tracking. |
| 2 | 2 – Opportunistic | Basic complaint channel (phone or in-person) exists but not widely advertised; complaints acknowledged inconsistently. |
| 3 | 3 – Systematic | Multi-channel complaint system (online, phone, in-person) operational; complaints acknowledged within defined timeframes. |
| 4 | 4 – Differentiating | Complaint mechanisms accessible in all relevant languages and formats; digital self-service options enable submission and tracking. |
| 5 | 5 – Transformational | Complaint accessibility recognized as a model for inclusive redress; mechanism design contributed to global DPI accountability frameworks. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.3.NE.Q1` — 🟢 Stakeholder

**Question:** How clear and accessible are mechanisms for lodging complaints about digital ID issues?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There is no official way for people to complain about the digital ID system. |
| 2 | 2 – Opportunistic | A way to complain exists but it is not widely known about and complaints are not consistently acknowledged. |
| 3 | 3 – Systematic | A formal multi-channel complaint system is in place; complaints are acknowledged within set timeframes. |
| 4 | 4 – Differentiating | The complaint system is accessible in all relevant languages; people can submit and track complaints digitally. |
| 5 | 5 – Transformational | The complaint system is a regional model for accessible redress. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.3.EX.Q2` — 🔵 Expert

**Question:** How timely and effective is resolution of digital ID complaints and disputes?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No resolution timeframe exists; most complaints not resolved; no escalation or appeal pathway available. |
| 2 | 2 – Opportunistic | Resolution timeframes defined but not consistently met; most complaints result in a response but not necessarily a remedy. |
| 3 | 3 – Systematic | Resolution timeframes legally defined and met in the majority of cases; remedies provided where complaints are upheld. |
| 4 | 4 – Differentiating | SLA compliance for complaint resolution publicly reported; repeat complaints trigger systemic reviews. |
| 5 | 5 – Transformational | Resolution timelines and remedy rates published in real time; systemic issues identified through complaints drive proactive improvements. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.3.NE.Q2` — 🟢 Stakeholder

**Question:** How timely and effective is resolution of digital ID complaints and disputes?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There is no time limit for resolving complaints; most complaints lead to no outcome. |
| 2 | 2 – Opportunistic | Time limits for resolving complaints exist but are not consistently met. |
| 3 | 3 – Systematic | Resolution timeframes are set by law and mostly met; where complaints are upheld, remedies are provided. |
| 4 | 4 – Differentiating | Complaint resolution performance is publicly reported; patterns in complaints trigger fixes to systemic problems. |
| 5 | 5 – Transformational | Resolution rates and times are published in real time; complaint patterns proactively improve the system. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.3.EX.Q3` — 🔵 Expert

**Question:** How functional are administrative or judicial review channels for challenging digital ID decisions?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No administrative or judicial review channel specific to digital ID decisions exists. |
| 2 | 2 – Opportunistic | Administrative appeal process exists in theory but is difficult to navigate; judicial review costly and complex. |
| 3 | 3 – Systematic | Accessible administrative review channel with defined timelines and standards operational; judicial review available and affordable. |
| 4 | 4 – Differentiating | Administrative and judicial review channels actively used and effective; success rates, timelines, and remedies publicly reported. |
| 5 | 5 – Transformational | Review channels continuously improved based on outcomes data; model contributed to global DPI accountability frameworks. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P2.4: Inclusion & Non-Discrimination

##### `P2.4.EX.Q1` — 🔵 Expert

**Question:** How strong are legal and operational protections against exclusion and discrimination in the digital ID system?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No non-discrimination provisions in legislation or policy governing digital ID; no monitoring of differential exclusion impacts. |
| 2 | 2 – Opportunistic | Non-discrimination mentioned in policy but not operationally implemented; no complaint mechanism addresses discrimination in ID access. |
| 3 | 3 – Systematic | Comprehensive anti-discrimination framework with explicit digital ID provisions enacted and operationally enforced. |
| 4 | 4 – Differentiating | Anti-discrimination provisions enforced by an independent body; algorithmic bias detection applied to ID system decision-making. |
| 5 | 5 – Transformational | Equity safeguards technically embedded at system level; safeguard model contributed to global DPI standards. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.4.NE.Q1` — 🟢 Stakeholder

**Question:** How strong are legal and operational protections against exclusion and discrimination in the digital ID system?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There are no rules preventing the digital ID system from excluding or discriminating against certain groups. |
| 2 | 2 – Opportunistic | Non-discrimination is mentioned in policy but there is no mechanism to detect or address it in practice. |
| 3 | 3 – Systematic | A comprehensive framework prevents discrimination in digital ID; it is actively enforced. |
| 4 | 4 – Differentiating | An independent body enforces anti-discrimination rules; AI-based checks detect bias in ID decisions. |
| 5 | 5 – Transformational | Protections against bias are built into the technical system; the model is shared globally. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.4.EX.Q2` — 🔵 Expert

**Question:** How systematically are equity risks assessed and mitigated for vulnerable groups?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No equity risk assessment conducted for digital ID system design, deployment, or updates. |
| 2 | 2 – Opportunistic | Equity risks considered informally during design; no structured risk assessment process or mitigation plan exists. |
| 3 | 3 – Systematic | Structured equity risk assessment conducted for all major system changes and new deployments; mitigation measures documented. |
| 4 | 4 – Differentiating | Equity risk assessments conducted by independent experts; risk registers maintained and publicly shared. |
| 5 | 5 – Transformational | Equity risk assessment a mandatory, continuous process embedded in system governance. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.4.NE.Q2` — 🟢 Stakeholder

**Question:** How systematically are equity risks assessed and mitigated for vulnerable groups?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No one checks whether the digital ID system creates unfair outcomes for specific groups. |
| 2 | 2 – Opportunistic | Equity risks are considered informally during design but there is no structured process. |
| 3 | 3 – Systematic | A formal equity risk assessment is done for all major system changes; mitigation measures are documented. |
| 4 | 4 – Differentiating | Independent experts conduct equity risk assessments; risk registers are publicly shared. |
| 5 | 5 – Transformational | Equity risk assessment is a mandatory, continuous process built into how the system is governed. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.4.EX.Q3` — 🔵 Expert

**Question:** How well do safeguards address surveillance misuse or disproportionate harm to marginalized populations?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Digital ID infrastructure has no legal or technical safeguards against surveillance misuse. |
| 2 | 2 – Opportunistic | Draft guidelines address surveillance limitations but are not legally binding; no independent review of surveillance requests. |
| 3 | 3 – Systematic | Legally binding limits on surveillance use of ID infrastructure in place; independent review of law enforcement access requests operational. |
| 4 | 4 – Differentiating | Independent oversight of all surveillance access to ID data operational and publicly reported. |
| 5 | 5 – Transformational | Surveillance safeguards technically enforced at system architecture level; model contributed to global DPI standards. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P2.5: Independent Oversight

##### `P2.5.EX.Q1` — 🔵 Expert

**Question:** How independent and well-resourced are oversight bodies for digital ID?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No independent oversight body with a mandate over digital ID exists; oversight entirely internal to implementing agency. |
| 2 | 2 – Opportunistic | Oversight body nominally responsible for digital ID exists but lacks explicit mandate, adequate resourcing, or operational independence. |
| 3 | 3 – Systematic | Independent oversight body with clear statutory mandate for digital ID, investigative powers, and adequate resourcing is operational. |
| 4 | 4 – Differentiating | Oversight body has guaranteed budget independence, expert technical capacity, and authority to impose sanctions. |
| 5 | 5 – Transformational | Oversight body internationally recognized for independence and effectiveness; governance model contributed to global standards. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.5.NE.Q1` — 🟢 Stakeholder

**Question:** How independent and well-resourced are oversight bodies for digital ID?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No independent body oversees the digital ID system; oversight is done internally by the same agency that runs it. |
| 2 | 2 – Opportunistic | An oversight body exists on paper but lacks the resources and independence to do its job effectively. |
| 3 | 3 – Systematic | An independent oversight body with legal powers and adequate resources is actively monitoring the digital ID system. |
| 4 | 4 – Differentiating | The oversight body has guaranteed funding, technical expertise, and the power to impose penalties. |
| 5 | 5 – Transformational | The oversight body is internationally recognized for its independence and effectiveness. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.5.EX.Q2` — 🔵 Expert

**Question:** How regularly are independent audits conducted and acted upon?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No independent audits of the digital ID system conducted; only internal reviews occur, if at all. |
| 2 | 2 – Opportunistic | Voluntary third-party audits conducted at least once but scope limited and findings not systematically acted upon. |
| 3 | 3 – Systematic | Regular comprehensive third-party audits conducted at defined intervals; findings tracked and formally responded to by management. |
| 4 | 4 – Differentiating | Independent audits cover security, privacy, equity, and performance; findings published in full; action plans publicly tracked. |
| 5 | 5 – Transformational | Real-time audit dashboards provide continuous independent visibility; automated alerts trigger immediate management response. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.5.NE.Q2` — 🟢 Stakeholder

**Question:** How regularly are independent audits conducted and acted upon?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No independent audits of the digital ID system take place. |
| 2 | 2 – Opportunistic | At least one audit has been done by an outside party but what it covered was limited and findings were not acted on. |
| 3 | 3 – Systematic | Regular comprehensive audits are conducted on schedule; findings are formally responded to and responses are published. |
| 4 | 4 – Differentiating | Audits cover security, privacy, equity, and performance; full findings are published. |
| 5 | 5 – Transformational | Real-time audit dashboards provide continuous independent monitoring; immediate alerts trigger management action. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P2.5.EX.Q3` — 🔵 Expert

**Question:** How transparent are oversight findings, parliamentary review, and public reporting?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Oversight findings and audit results not published; parliamentary oversight limited to annual budget approval. |
| 2 | 2 – Opportunistic | Some oversight findings published in summary form; parliamentary review of digital ID system occurs informally. |
| 3 | 3 – Systematic | Oversight findings published in full; parliamentary committee with technical expertise reviews digital ID system at least annually. |
| 4 | 4 – Differentiating | All oversight findings, parliamentary committee reports, and management responses publicly available online. |
| 5 | 5 – Transformational | Oversight transparency fully automated with real-time public access to all non-sensitive findings. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

### Pillar P3: Ecosystem & Innovation

#### Sub-Pillar P3.1: Private Sector Participation

##### `P3.1.EX.Q1` — 🔵 Expert

**Question:** How clear and effective are frameworks for private sector entities to use or rely on digital ID?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No framework exists for private sector access to digital ID infrastructure; API access restricted to government systems. |
| 2 | 2 – Opportunistic | Basic relying party framework drafted but not operationalized; private sector access by informal arrangement. |
| 3 | 3 – Systematic | Comprehensive relying party framework operational; automated onboarding enables private sector access with standardized accountability requirements. |
| 4 | 4 – Differentiating | Advanced trust framework with dynamic accreditation tiers governs private sector participation; real-time compliance monitoring embedded. |
| 5 | 5 – Transformational | Trust framework recognized as a global model for open digital identity ecosystems; design contributed to international standards. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.1.NE.Q1` — 🟢 Stakeholder

**Question:** How clear and effective are frameworks for private sector entities to use or rely on digital ID?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There are no rules for private companies to use or rely on the digital ID system. |
| 2 | 2 – Opportunistic | Some draft rules exist but private companies access the system by informal arrangement without clear accountability. |
| 3 | 3 – Systematic | A formal framework governs how private companies can join the digital ID ecosystem. |
| 4 | 4 – Differentiating | An advanced accreditation system governs private sector access at different trust levels; compliance is monitored in real time. |
| 5 | 5 – Transformational | The framework is a global model for open digital identity ecosystems. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.1.EX.Q2` — 🔵 Expert

**Question:** How well are private sector access, compliance, and accountability requirements enforced?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No enforcement mechanism exists for private sector compliance with digital ID access rules; non-compliance has no consequences. |
| 2 | 2 – Opportunistic | Compliance obligations stated in contracts but enforcement rare; monitoring of private sector access limited to log review. |
| 3 | 3 – Systematic | Compliance monitored through automated API usage analytics; contractual breaches trigger defined penalties. |
| 4 | 4 – Differentiating | Real-time compliance dashboards monitor all private sector API usage; automated alerts trigger investigation and enforcement. |
| 5 | 5 – Transformational | Enforcement proactive and technology-assisted; private sector compliance independently audited. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.1.NE.Q2` — 🟢 Stakeholder

**Question:** How well are private sector access, compliance, and accountability requirements enforced?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There is no enforcement of rules for private companies using the digital ID system. |
| 2 | 2 – Opportunistic | Compliance rules exist in contracts but enforcement is rare and monitoring is limited. |
| 3 | 3 – Systematic | Compliance is monitored automatically; breaches trigger defined penalties. |
| 4 | 4 – Differentiating | Real-time dashboards monitor all private sector usage; automated alerts trigger enforcement. |
| 5 | 5 – Transformational | Enforcement is proactive and technology-assisted; compliance is independently audited. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.1.EX.Q3` — 🔵 Expert

**Question:** How mature are certification or approval mechanisms for private sector participation in the ecosystem?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No certification or approval process exists for private entities wishing to participate in the digital ID ecosystem. |
| 2 | 2 – Opportunistic | Informal approval process operates by ministerial discretion; no criteria published; no compliance audit required. |
| 3 | 3 – Systematic | Formal certification scheme with published criteria, independent assessment, and publicly accessible registry of approved entities operational. |
| 4 | 4 – Differentiating | Tiered certification scheme aligned with international trust assurance frameworks operational; re-certification required periodically. |
| 5 | 5 – Transformational | Certification scheme recognized internationally and aligned with global trust frameworks (e.g., eIDAS, NIST SP 800-63). |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P3.2: Digital ID Use Cases

##### `P3.2.EX.Q1` — 🔵 Expert

**Question:** How many meaningful use cases across sectors are enabled by digital ID today?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No documented use cases beyond basic government authentication; digital ID not enabling value in any specific sector. |
| 2 | 2 – Opportunistic | One or two pilot use cases in regulated sectors (banking KYC, welfare enrollment); use cases not yet scaled. |
| 3 | 3 – Systematic | Multiple validated and scaled use cases across three or more sectors (finance, health, social protection, e-government); impact documented. |
| 4 | 4 – Differentiating | Advanced multi-sector use case ecosystem operational with measurable economic impact; cross-sector data publicly available. |
| 5 | 5 – Transformational | Digital ID-enabled innovations contribute to GDP growth; use case ecosystem is a global reference. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.2.NE.Q1` — 🟢 Stakeholder

**Question:** How many meaningful use cases across sectors are enabled by digital ID today?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | The digital ID is only used for basic government login; no meaningful use cases exist in any sector. |
| 2 | 2 – Opportunistic | One or two pilot use cases exist in specific sectors (like banking or welfare) but they have not been scaled up. |
| 3 | 3 – Systematic | Several validated use cases are operating across multiple sectors; their economic and social impact is documented. |
| 4 | 4 – Differentiating | A rich multi-sector use case ecosystem operates with measurable economic impact. |
| 5 | 5 – Transformational | Digital ID use cases contribute to economic growth; the ecosystem is a global reference. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.2.EX.Q2` — 🔵 Expert

**Question:** How effectively does digital ID support innovation in sectors such as finance, health, or tourism?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No innovation support mechanisms exist; digital ID system has not enabled any demonstrable innovation in any sector. |
| 2 | 2 – Opportunistic | Digital ID used for basic identity verification in one regulated sector; no structured innovation support available. |
| 3 | 3 – Systematic | Digital ID enables demonstrable innovation in at least two sectors; innovation support mechanisms (sandbox, grants) operational. |
| 4 | 4 – Differentiating | Digital ID is a platform for significant cross-sector innovation; advanced innovation ecosystem with measurable economic impact documented. |
| 5 | 5 – Transformational | Digital ID-enabled innovation internationally recognized as a driver of inclusive economic growth. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.2.NE.Q2` — 🟢 Stakeholder

**Question:** How effectively does digital ID support innovation in sectors such as finance, health, or tourism?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | The digital ID has not enabled innovation in any sector; there is no support for businesses wanting to build on it. |
| 2 | 2 – Opportunistic | Digital ID is used for basic checks in one sector; no structured innovation support is available. |
| 3 | 3 – Systematic | Digital ID powers innovation in at least two sectors; innovation support mechanisms are in place. |
| 4 | 4 – Differentiating | Digital ID is a platform for innovation across many sectors; measurable economic impact is documented. |
| 5 | 5 – Transformational | Digital ID-enabled innovation is internationally recognized as an inclusive growth driver. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.2.EX.Q3` — 🔵 Expert

**Question:** How mature are mechanisms such as pilots or sandboxes to test new digital ID use cases?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No pilot or sandbox mechanism exists; new use cases must be deployed in production without testing capability. |
| 2 | 2 – Opportunistic | Basic test environment available with restricted access; no structured pilot program or mentorship exists. |
| 3 | 3 – Systematic | Production-like sandbox with realistic synthetic data available; structured pilot program with defined success criteria operational. |
| 4 | 4 – Differentiating | Advanced sandbox ecosystem supports complex multi-system integration testing; pilot outcomes tracked and published. |
| 5 | 5 – Transformational | Sandbox recognized as a global model for digital identity innovation enablement. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P3.3: Standards & Certification

##### `P3.3.EX.Q1` — 🔵 Expert

**Question:** To what extent does the ecosystem adopt recognized international technical and trust standards?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No international technical or trust standards adopted; ecosystem operates on proprietary specifications with no conformance testing. |
| 2 | 2 – Opportunistic | Selected international standards partially adopted for specific use cases; adoption not systematic; conformance not independently tested. |
| 3 | 3 – Systematic | Comprehensive adoption of recognized international standards (ISO/IEC 29115, NIST SP 800-63, eIDAS LoA) mandatory for ecosystem participants. |
| 4 | 4 – Differentiating | Standards adoption comprehensive, current, and proactively tracked against international developments; country leads in adapting standards. |
| 5 | 5 – Transformational | Ecosystem recognized internationally as a standards-compliant reference implementation; standards contributions acknowledged by international bodies. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.3.NE.Q1` — 🟢 Stakeholder

**Question:** To what extent does the ecosystem adopt recognized international technical and trust standards?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No international standards are adopted; the ecosystem uses its own proprietary specifications. |
| 2 | 2 – Opportunistic | Some international standards are partially adopted for specific use cases but adoption is not systematic. |
| 3 | 3 – Systematic | Recognized international standards are mandatory for all ecosystem participants; conformance is independently tested. |
| 4 | 4 – Differentiating | Standards adoption is comprehensive and proactively tracked; the country leads in adapting global standards. |
| 5 | 5 – Transformational | The ecosystem is recognized internationally as a standards-compliant reference implementation. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.3.EX.Q2` — 🔵 Expert

**Question:** How mature are certification, conformance testing, and compliance assurance arrangements?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No certification program exists; conformance testing not conducted. |
| 2 | 2 – Opportunistic | Voluntary certification program exists with basic criteria; conformance testing limited in scope and conducted internally. |
| 3 | 3 – Systematic | Mandatory certification program with independent conformance testing and public registry of certified entities operational. |
| 4 | 4 – Differentiating | Certification includes tiered assurance levels aligned with international frameworks; automated conformance testing tools publicly available. |
| 5 | 5 – Transformational | Open conformance testing tools contributed to global DPI repositories; certification scheme referenced in international standards. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.3.NE.Q2` — 🟢 Stakeholder

**Question:** How mature are certification, conformance testing, and compliance assurance arrangements?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There is no certification program; no one checks whether ecosystem participants meet required standards. |
| 2 | 2 – Opportunistic | A voluntary certification program exists but it is limited in scope and not independently tested. |
| 3 | 3 – Systematic | A mandatory certification program with independent testing and a public registry of certified entities is operational. |
| 4 | 4 – Differentiating | Certification includes tiered assurance levels; automated testing tools are publicly available. |
| 5 | 5 – Transformational | Open testing tools are shared globally; the certification scheme is referenced in international standards. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.3.EX.Q3` — 🔵 Expert

**Question:** How actively does the country participate in regional or global standards-setting processes?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Country does not participate in regional or global digital identity standards-setting bodies. |
| 2 | 2 – Opportunistic | Country has observer status in one or more regional standards bodies; participation passive with no substantive contributions. |
| 3 | 3 – Systematic | Country actively participates in regional and international standards bodies; technical experts contribute to working groups. |
| 4 | 4 – Differentiating | Country provides leadership in at least one regional or international standards body. |
| 5 | 5 – Transformational | Country recognized as a global leader in digital identity standards development. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P3.4: Developer Ecosystem

##### `P3.4.EX.Q1` — 🔵 Expert

**Question:** How available are APIs, documentation, and technical resources for developers?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No developer-facing APIs, documentation, or technical resources publicly available; developer access requires a formal government contract. |
| 2 | 2 – Opportunistic | Basic API documentation available on request; access to test environment requires manual onboarding approval; developer support ad hoc. |
| 3 | 3 – Systematic | Comprehensive developer portal with full API documentation, code samples in multiple languages, interactive API explorer, and community forums publicly accessible. |
| 4 | 4 – Differentiating | Developer portal includes real-time API status dashboards, usage analytics, SDKs for all major platforms, and production-like sandbox. |
| 5 | 5 – Transformational | Developer resources open-sourced and contributed to global DPI repositories; developer portal recognized as a regional reference. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.4.NE.Q1` — 🟢 Stakeholder

**Question:** How available are APIs, documentation, and technical resources for developers?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There are no publicly available tools or documentation for developers wanting to build on the digital ID system. |
| 2 | 2 – Opportunistic | Basic documentation is available on request; access to a test environment requires manual approval. |
| 3 | 3 – Systematic | A comprehensive developer portal with full documentation, code samples, and community forums is publicly accessible. |
| 4 | 4 – Differentiating | The developer portal includes real-time status dashboards, SDKs for all major platforms, and a production-like sandbox. |
| 5 | 5 – Transformational | Developer resources are open-sourced and shared globally; the portal is recognized as a regional reference. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.4.EX.Q2` — 🔵 Expert

**Question:** How useful and accessible are sandbox environments for testing digital ID integrations?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No sandbox environment available; developers must test integrations in the live production system. |
| 2 | 2 – Opportunistic | Test environment available but access restricted, data synthetic and unrealistic, and support minimal. |
| 3 | 3 – Systematic | Production-like sandbox with realistic synthetic data available with self-service access; sandbox documentation matches production documentation. |
| 4 | 4 – Differentiating | Sandbox mirrors production infrastructure including security controls; sandbox performance metrics publicly available. |
| 5 | 5 – Transformational | Sandbox ecosystem recognized as a global reference for developer enablement. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.4.NE.Q2` — 🟢 Stakeholder

**Question:** How useful and accessible are sandbox environments for testing digital ID integrations?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There is no safe testing environment; developers must test in the live system. |
| 2 | 2 – Opportunistic | A test environment is available but access is restricted and the data is not realistic. |
| 3 | 3 – Systematic | A realistic testing environment is available with self-service access; documentation matches the live system. |
| 4 | 4 – Differentiating | The testing environment mirrors the live system including security controls; performance metrics are publicly available. |
| 5 | 5 – Transformational | The testing environment is recognized as a global reference for developer enablement. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.4.EX.Q3` — 🔵 Expert

**Question:** How strong is support for the developer ecosystem through outreach, events, or financial incentives?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No developer outreach, events, or financial incentives exist; developer engagement entirely passive. |
| 2 | 2 – Opportunistic | Occasional developer events held; no structured outreach program or financial incentives for developers exist. |
| 3 | 3 – Systematic | Structured developer engagement program includes regular hackathons with prize funding, startup support programs, and dedicated developer relations team. |
| 4 | 4 – Differentiating | Innovation grants and accelerator programs specifically for digital ID use cases operational. |
| 5 | 5 – Transformational | Developer support tools contributed to open-source DPI repositories; developer community internationally recognized. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P3.5: Cross-Border Interoperability

##### `P3.5.EX.Q1` — 🔵 Expert

**Question:** How developed are cross-border digital ID recognition and interoperability arrangements?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No cross-border digital ID recognition or interoperability arrangement exists; ID system entirely domestic in scope. |
| 2 | 2 – Opportunistic | Exploratory discussions with one or more neighboring countries on cross-border digital ID recognition underway; no formal agreement concluded. |
| 3 | 3 – Systematic | Operational mutual recognition agreements with at least one neighboring country enable cross-border digital ID use for defined services. |
| 4 | 4 – Differentiating | Leadership in a regional interoperability initiative established; multilateral mutual recognition with automated verification operational. |
| 5 | 5 – Transformational | Country recognized as a regional hub for interoperable digital public infrastructure; governance model contributed to global standards. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.5.NE.Q1` — 🟢 Stakeholder

**Question:** How developed are cross-border digital ID recognition and interoperability arrangements?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | The digital ID only works within the country; no arrangements exist to recognize it across borders. |
| 2 | 2 – Opportunistic | Discussions with neighboring countries about cross-border digital ID recognition have started but no agreement has been reached. |
| 3 | 3 – Systematic | At least one cross-border agreement is operational; digital ID can be used for defined services across borders. |
| 4 | 4 – Differentiating | The country leads a regional interoperability initiative; multilateral recognition with automated verification is operational. |
| 5 | 5 – Transformational | The country is a recognized hub for cross-border digital identity. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.5.EX.Q2` — 🔵 Expert

**Question:** How well do laws and technical systems support trusted cross-border data exchange?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No legal framework or technical protocol supports trusted cross-border data exchange involving digital ID; cross-border data flows unregulated. |
| 2 | 2 – Opportunistic | Basic data flow protocols being established for limited cross-border use cases under exploratory arrangements. |
| 3 | 3 – Systematic | Comprehensive cross-border data governance frameworks covering legal basis, consent, security, and data sovereignty operational under formal agreements. |
| 4 | 4 – Differentiating | Cross-border data exchange automated and privacy-preserving; legal frameworks harmonized with regional partners. |
| 5 | 5 – Transformational | Cross-border data exchange framework recognized as a global model for privacy-preserving, sovereignty-respecting identity federation. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.5.NE.Q2` — 🟢 Stakeholder

**Question:** How well do laws and technical systems support trusted cross-border data exchange?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There are no rules or technical systems to support trustworthy exchange of digital ID data across borders. |
| 2 | 2 – Opportunistic | Basic data protocols are being set up for limited cross-border uses. |
| 3 | 3 – Systematic | A comprehensive legal and technical framework governs cross-border data sharing. |
| 4 | 4 – Differentiating | Cross-border data exchange is automated and privacy-preserving; legal frameworks are harmonized across the region. |
| 5 | 5 – Transformational | The framework is recognized globally as a model for privacy-preserving, sovereignty-respecting cross-border identity federation. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P3.5.EX.Q3` — 🔵 Expert

**Question:** How resilient and vendor-independent is the cross-border interoperability approach?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Cross-border interoperability (where it exists) depends on proprietary vendor solutions with no government-controlled fallback. |
| 2 | 2 – Opportunistic | Cross-border interoperability relies on bilateral technical agreements that are vendor-dependent; no open standards underpin cross-border exchange. |
| 3 | 3 – Systematic | Cross-border interoperability based on open standards and government-controlled protocols; resilience tested regularly. |
| 4 | 4 – Differentiating | Cross-border architecture fully vendor-independent, based on open standards, and tested for resilience under failure scenarios. |
| 5 | 5 – Transformational | Cross-border interoperability architecture is a regional reference model for vendor-independent, resilient digital identity federation. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

### Pillar P4: Technology & DPI Integration

#### Sub-Pillar P4.1: ID System Architecture

##### `P4.1.EX.Q1` — 🔵 Expert

**Question:** How well does the foundational ID architecture follow modular, scalable, and API-first design principles?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Architecture is monolithic with no API layer; system components tightly coupled; scalability constrained to current enrollment volume. |
| 2 | 2 – Opportunistic | Modular design documented but inconsistently implemented; basic API endpoints exist for core enrollment and authentication functions. |
| 3 | 3 – Systematic | API-first architecture fully implemented with comprehensive OpenAPI documentation; microservices enable independent scaling of components. |
| 4 | 4 – Differentiating | Event-driven architecture with real-time data synchronization operational; infrastructure-as-code enables automated environment replication. |
| 5 | 5 – Transformational | Self-healing systems with automated failover and zero-downtime deployments operational; architecture contributed to open-source DPI commons. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.1.NE.Q1` — 🟢 Stakeholder

**Question:** How well does the foundational ID architecture follow modular, scalable, and API-first design principles?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | The ID system is built as a single block of technology with no way to connect it to other systems or scale it up easily. |
| 2 | 2 – Opportunistic | The system is designed to have separate parts but this is not fully put into practice. |
| 3 | 3 – Systematic | The system is fully designed around open connections (APIs); separate parts can be upgraded or scaled independently. |
| 4 | 4 – Differentiating | The system updates itself automatically and recovers quickly from problems. |
| 5 | 5 – Transformational | The system heals itself after failures; the technical design has been shared openly for other countries to adopt. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.1.EX.Q2` — 🔵 Expert

**Question:** How appropriate is the architectural model (centralized or federated) for national needs and DPI alignment?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Architectural model selected without formal requirements analysis; no alignment with DPI principles documented. |
| 2 | 2 – Opportunistic | Architectural model chosen but rationale not documented; alignment with DPI principles and national context is partial. |
| 3 | 3 – Systematic | Architectural model documented with formal rationale aligned to national data sovereignty, inclusion requirements, and DPI integration needs. |
| 4 | 4 – Differentiating | Architecture regularly reviewed against evolving national needs and DPI standards; review findings publicly reported. |
| 5 | 5 – Transformational | Architecture optimally balances centralization and federation based on evidence; model contributed to global DPI knowledge. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.1.NE.Q2` — 🟢 Stakeholder

**Question:** How appropriate is the architectural model (centralized or federated) for national needs and DPI alignment?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | The design of the ID system was chosen without a clear analysis of what the country actually needs. |
| 2 | 2 – Opportunistic | A design was chosen but the reasons for the choice are not clearly explained and it does not fully reflect national priorities. |
| 3 | 3 – Systematic | The design of the system was chosen based on a documented analysis of national needs including inclusion and data ownership. |
| 4 | 4 – Differentiating | The design is regularly reviewed to ensure it keeps meeting national needs as the country and technology evolve. |
| 5 | 5 – Transformational | The system design is continuously tested and refined based on evidence; the model is shared globally. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.1.EX.Q3` — 🔵 Expert

**Question:** How well is the architecture documented, governed, and adaptable to future growth?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No architecture documentation exists; system design decisions undocumented; no governance process controls changes. |
| 2 | 2 – Opportunistic | High-level architecture diagrams exist but are outdated; no governance process controls changes to the architecture. |
| 3 | 3 – Systematic | Comprehensive architecture documentation maintained and version-controlled; architecture review board approves changes. |
| 4 | 4 – Differentiating | Architecture documentation publicly available; change governance includes security and privacy impact assessments. |
| 5 | 5 – Transformational | Architecture documentation a living asset updated in near-real-time; contributed to open DPI repositories. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P4.2: Data Exchange

##### `P4.2.EX.Q1` — 🔵 Expert

**Question:** How available and well-documented are APIs and data exchange interfaces for digital ID?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No documented APIs exist; data exchange relies on ad hoc file transfers in proprietary formats. |
| 2 | 2 – Opportunistic | Basic API endpoints for core functions available with minimal documentation; API versioning not managed; no developer portal. |
| 3 | 3 – Systematic | Comprehensive API catalog with OpenAPI specifications and version management publicly available; developer portal with documentation and sandbox operational. |
| 4 | 4 – Differentiating | API documentation includes interactive testing tools; usage analytics inform API roadmap decisions. |
| 5 | 5 – Transformational | APIs contributed to open DPI repositories with reference implementations; API documentation standards contributed to international bodies. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.2.NE.Q1` — 🟢 Stakeholder

**Question:** How available and well-documented are APIs and data exchange interfaces for digital ID?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There are no published connections (APIs) for other systems to use; sharing data requires one-off arrangements. |
| 2 | 2 – Opportunistic | Basic system connections exist but documentation is minimal. |
| 3 | 3 – Systematic | A full catalog of system connections is publicly documented with a developer portal and sandbox. |
| 4 | 4 – Differentiating | Documentation is interactive and includes testing tools; developers are notified automatically when connections change. |
| 5 | 5 – Transformational | Connection standards are published openly and contributed to international bodies. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.2.EX.Q2` — 🔵 Expert

**Question:** To what extent does the system use recognized technical standards for interoperability?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | System uses proprietary data formats and protocols; no recognized international technical standards (ISO/IEC, W3C, NIST) implemented. |
| 2 | 2 – Opportunistic | Partial adoption of ISO/IEC biometric standards; data exchange uses generic formats (CSV/XML) with custom schemas. |
| 3 | 3 – Systematic | Full compliance with relevant ISO/IEC identity standards; OpenID Connect and OAuth 2.0 implemented for authentication. |
| 4 | 4 – Differentiating | Standards adoption comprehensive and proactively tracked against emerging international developments; conformance testing automated. |
| 5 | 5 – Transformational | System contributes to international standards development; recognized as a reference implementation. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.2.NE.Q2` — 🟢 Stakeholder

**Question:** To what extent does the system use recognized technical standards for interoperability?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | The ID system uses its own formats that do not follow international standards. |
| 2 | 2 – Opportunistic | Some international standards are used for specific parts (like biometrics) but overall the system does not consistently follow them. |
| 3 | 3 – Systematic | The system fully follows recognized international standards for identity and authentication. |
| 4 | 4 – Differentiating | Standards are tracked as they evolve and the system is kept up to date; conformance is tested automatically. |
| 5 | 5 – Transformational | The system contributes to developing the standards it uses. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.2.EX.Q3` — 🔵 Expert

**Question:** How effectively does digital ID exchange data with other government systems in practice?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Data exchange with other government systems does not occur in practice; manual data re-entry or periodic batch file transfers only. |
| 2 | 2 – Opportunistic | Semi-automated data exchange occurs with 1–2 government systems via point-to-point interfaces; errors require manual reconciliation. |
| 3 | 3 – Systematic | Real-time API-based data exchange operational with 3 or more government systems; data exchange gateway manages security and logging. |
| 4 | 4 – Differentiating | Event-driven data exchange operational across the wider government ecosystem; data lineage and consent tracked. |
| 5 | 5 – Transformational | Cross-government data exchange frictionless and privacy-preserving; exchange architecture contributed to global DPI standards. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P4.3: DPI Integration

##### `P4.3.EX.Q1` — 🔵 Expert

**Question:** How deeply is digital ID integrated with other DPI components such as payments and registries?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Digital ID not integrated with any other DPI component; citizens must enroll separately in payments, health, and social protection systems. |
| 2 | 2 – Opportunistic | Point-to-point integration exists with one or two systems; integration one-directional and batch-based; duplicate enrollment common. |
| 3 | 3 – Systematic | API-based integration with three or more DPI components (payments, civil registry, health) uses standardized protocols. |
| 4 | 4 – Differentiating | Event-driven integration ecosystem connects all major DPI components; automated consent management tracks data sharing. |
| 5 | 5 – Transformational | Integration frameworks contributed to global DPI commons; country serves as a regional hub for cross-border service delivery. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.3.NE.Q1` — 🟢 Stakeholder

**Question:** How deeply is digital ID integrated with other DPI components such as payments and registries?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | The digital ID system is completely separate from other government digital systems like payments or health records. |
| 2 | 2 – Opportunistic | The digital ID connects to one or two other systems but connections are one-way and not updated in real time. |
| 3 | 3 – Systematic | Digital ID connects in real time to three or more government systems using standard methods. |
| 4 | 4 – Differentiating | All major government digital systems share data through the digital ID. |
| 5 | 5 – Transformational | The integration approach is shared globally; the country is a regional hub for cross-border service delivery. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.3.EX.Q2` — 🔵 Expert

**Question:** How effectively does digital ID support seamless service delivery across priority sectors?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Digital ID does not support service delivery in any sector; sector agencies operate independent identity verification processes. |
| 2 | 2 – Opportunistic | Digital ID used for authentication in one or two pilot services within a priority sector; user journeys require switching between multiple systems. |
| 3 | 3 – Systematic | Digital ID supports seamless authentication and pre-population of user data across three or more priority service journeys. |
| 4 | 4 – Differentiating | Single digital ID login enables access to the full range of priority public services. |
| 5 | 5 – Transformational | Digital ID-enabled service delivery recognized as a global exemplar; cross-border service access operational. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.3.NE.Q2` — 🟢 Stakeholder

**Question:** How effectively does digital ID support seamless service delivery across priority sectors?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Using the digital ID does not make it easier to access government services. |
| 2 | 2 – Opportunistic | Digital ID is used to log in to one or two pilot services but the overall experience is still fragmented. |
| 3 | 3 – Systematic | Digital ID gives seamless access to several important services; users do not have to re-enter their data each time. |
| 4 | 4 – Differentiating | One digital ID login works for the full range of major public services. |
| 5 | 5 – Transformational | The service delivery model using digital ID is recognized as a global best practice. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.3.EX.Q3` — 🔵 Expert

**Question:** How mature is integration with social protection, health, and other high-impact public services?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Digital ID has no integration with social protection or health systems. |
| 2 | 2 – Opportunistic | Digital ID piloted in one social protection or health program; integration shallow (authentication only); beneficiary data not synchronized. |
| 3 | 3 – Systematic | Digital ID integrated with core social protection and health systems enabling automated eligibility verification and service delivery. |
| 4 | 4 – Differentiating | Integration with social protection, health, and at least one other high-impact sector is mature. |
| 5 | 5 – Transformational | Integration with all high-impact public services complete; economic and social impact independently measured. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P4.4: Cybersecurity & Resilience

##### `P4.4.EX.Q1` — 🔵 Expert

**Question:** How strongly is cybersecurity built into the design and operation of the ID system?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No formal cybersecurity policy applies to the digital ID system; data stored without encryption; no security architecture documentation. |
| 2 | 2 – Opportunistic | Basic security controls implemented reactively; encryption applied to data at rest but not in transit. |
| 3 | 3 – Systematic | Comprehensive security architecture aligned with NIST Cybersecurity Framework or ISO 27001 implemented and certified. |
| 4 | 4 – Differentiating | Zero-trust architecture with continuous authentication and micro-segmentation implemented; threat modeling embedded in SDLC. |
| 5 | 5 – Transformational | International cybersecurity certification held; threat intelligence proactively shared with regional partners. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.4.NE.Q1` — 🟢 Stakeholder

**Question:** How strongly is cybersecurity built into the design and operation of the ID system?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | The ID system has no formal security policy. |
| 2 | 2 – Opportunistic | Basic security measures are in place but they were added after the fact; data in transit is not always encrypted. |
| 3 | 3 – Systematic | The system is built to a recognized security standard with full encryption and formal processes for managing encryption keys. |
| 4 | 4 – Differentiating | The system is designed so that every user and device must continuously prove they are authorized. |
| 5 | 5 – Transformational | The system holds international security certifications; security knowledge is shared with neighbouring countries. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.4.EX.Q2` — 🔵 Expert

**Question:** How mature are resilience measures such as backup, recovery, and business continuity?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No disaster recovery or business continuity plan exists for the digital ID system; single points of failure present. |
| 2 | 2 – Opportunistic | Draft disaster recovery plan exists; data backups taken regularly but restoration not tested; recovery time objectives not defined. |
| 3 | 3 – Systematic | Tested disaster recovery plan with defined RTO and RPO operational; data backed up in multiple locations. |
| 4 | 4 – Differentiating | Automated failover to geo-redundant infrastructure operational; recovery procedures tested quarterly. |
| 5 | 5 – Transformational | Self-healing systems with automated failover achieve near-zero downtime; resilience architecture contributed to global DPI standards. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.4.NE.Q2` — 🟢 Stakeholder

**Question:** How mature are resilience measures such as backup, recovery, and business continuity?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There is no plan for what to do if the ID system breaks down. |
| 2 | 2 – Opportunistic | A recovery plan exists on paper; backups are taken but it has not been confirmed that data can actually be restored. |
| 3 | 3 – Systematic | A tested recovery plan is in place with clear time targets; data is backed up in more than one location. |
| 4 | 4 – Differentiating | The system automatically switches to a backup if the main system fails; recovery is tested every three months. |
| 5 | 5 – Transformational | The system recovers automatically from failures with near-zero downtime. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.4.EX.Q3` — 🔵 Expert

**Question:** How regularly are the system's security controls monitored, tested, and improved?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Security controls not monitored; no penetration testing or vulnerability scanning conducted. |
| 2 | 2 – Opportunistic | Ad hoc vulnerability scans conducted occasionally; penetration tests have occurred at least once. |
| 3 | 3 – Systematic | Regular penetration testing (at least annually) by qualified third parties conducted; continuous vulnerability scanning automated. |
| 4 | 4 – Differentiating | Continuous security monitoring with AI/ML-assisted threat detection operational; red team exercises held semi-annually. |
| 5 | 5 – Transformational | Security monitoring fully automated with real-time alerts; threat intelligence feeds integrated. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P4.5: Digital Public Goods

##### `P4.5.EX.Q1` — 🔵 Expert

**Question:** To what extent does the digital ID system use open standards and interoperable components?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | System built entirely on proprietary technology; no recognized open standards implemented. |
| 2 | 2 – Opportunistic | Partial adoption of open standards for specific components (e.g., biometric capture); majority of system relies on proprietary protocols. |
| 3 | 3 – Systematic | Core system components built on recognized open standards (OpenID Connect, W3C DID/VC, ISO/IEC biometric standards). |
| 4 | 4 – Differentiating | Open standards adoption comprehensive and verifiable through public conformance testing; country actively shapes future international standards. |
| 5 | 5 – Transformational | System recognized as a reference implementation for open digital identity; standards contributions acknowledged by international bodies. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.5.NE.Q1` — 🟢 Stakeholder

**Question:** To what extent does the digital ID system use open standards and interoperable components?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | The ID system uses proprietary technology that cannot easily connect to other systems or be adapted by others. |
| 2 | 2 – Opportunistic | Some open international standards are used for specific parts but most of the system still relies on proprietary technology. |
| 3 | 3 – Systematic | The main parts of the system use recognized open international standards. |
| 4 | 4 – Differentiating | Open standards use is comprehensive and publicly verifiable; the country actively shapes future international standards. |
| 5 | 5 – Transformational | The system is internationally recognized as a model for open digital identity. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.5.EX.Q2` — 🔵 Expert

**Question:** How much does the system rely on open-source components or digital public goods where appropriate?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | System uses no open-source components; all software proprietary; digital public goods (e.g., MOSIP, OpenCRVS) not evaluated. |
| 2 | 2 – Opportunistic | Some open-source libraries used as dependencies but not documented; digital public goods evaluated but not adopted. |
| 3 | 3 – Systematic | Core system functionality relies on evaluated and documented open-source components or digital public goods. |
| 4 | 4 – Differentiating | Open-source digital public goods form the basis of major system components; government actively contributes upstream. |
| 5 | 5 – Transformational | Majority of system code open-sourced and contributed to global DPI commons. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.5.NE.Q2` — 🟢 Stakeholder

**Question:** How much does the system rely on open-source components or digital public goods where appropriate?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | The ID system uses only commercial software; free and open tools have not been considered. |
| 2 | 2 – Opportunistic | Some free and open tools are used but this has not been documented or formally planned. |
| 3 | 3 – Systematic | Major parts of the system use recognized open and free tools; a public list of which tools are used is maintained. |
| 4 | 4 – Differentiating | Open-source tools are central to the system; the government contributes improvements back to those tools. |
| 5 | 5 – Transformational | Most of the system code is shared freely online for anyone to use. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P4.5.EX.Q3` — 🔵 Expert

**Question:** How available is technical documentation, and how actively does the system contribute to shared public resources?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No public technical documentation exists; architecture diagrams, API specifications, and data models classified or held exclusively by vendor. |
| 2 | 2 – Opportunistic | Basic technical documentation available to approved partners under NDA; public documentation limited to high-level system descriptions. |
| 3 | 3 – Systematic | Comprehensive technical documentation including API specifications, architecture diagrams, data models, and security guidelines publicly available under open license. |
| 4 | 4 – Differentiating | Technical documentation actively maintained and version-controlled; contributed to international DPI repositories. |
| 5 | 5 – Transformational | Technical documentation a global reference for digital identity implementation. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

### Pillar P5: Legal & Regulatory Foundations

#### Sub-Pillar P5.1: Legal Identity & Civil Registration

##### `P5.1.EX.Q1` — 🔵 Expert

**Question:** Does the legal framework clearly define legal identity, enrollment status, and eligibility?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No primary digital ID legislation exists; legal identity undefined in statute; no enrollment criteria or eligibility thresholds codified. |
| 2 | 2 – Opportunistic | Draft digital ID bill defines legal identity in broad terms but enrollment status categories and eligibility thresholds remain undefined. |
| 3 | 3 – Systematic | Primary legislation enacted with statutory definitions of legal identity, enrollment status categories, and eligibility criteria. |
| 4 | 4 – Differentiating | Legislation and subsidiary regulations fully operational; eligibility determinations automated against civil registration data. |
| 5 | 5 – Transformational | Independent statutory review confirms legislative completeness; legal framework cited as a regional model. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.1.NE.Q1` — 🟢 Stakeholder

**Question:** Does the legal framework clearly define legal identity, enrollment status, and eligibility?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There is no law that defines who qualifies for a digital ID or what counts as legal identity. |
| 2 | 2 – Opportunistic | A draft law is being reviewed but it does not yet clearly state who is eligible or what enrollment steps are required. |
| 3 | 3 – Systematic | A law has been passed that defines legal identity and sets out who can enroll and under what conditions. |
| 4 | 4 – Differentiating | The law is fully in force and the process for determining who qualifies for a digital ID is largely automated. |
| 5 | 5 – Transformational | Independent reviews confirm the law covers everyone and leaves no gaps. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.1.EX.Q2` — 🔵 Expert

**Question:** How well is civil registration linked to the digital ID system to prevent statelessness?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Civil registration operates in isolation with no data exchange protocol or interoperability mechanism connecting it to digital ID issuance. |
| 2 | 2 – Opportunistic | Civil registration records exist but linkage to digital ID is manual, event-driven only, and dependent on individual application. |
| 3 | 3 – Systematic | Formal linkage protocol enacted and operational; vital events trigger automated updates to the digital ID registry. |
| 4 | 4 – Differentiating | Civil registration and digital ID databases fully integrated via real-time APIs; de-duplication and reconciliation automated. |
| 5 | 5 – Transformational | Independent audit confirms zero statelessness attributable to registration gaps; birth registration coverage exceeds 95%. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.1.NE.Q2` — 🟢 Stakeholder

**Question:** How well is civil registration linked to the digital ID system to prevent statelessness?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Birth, marriage, and death records are kept separately and are not connected to the digital ID system at all. |
| 2 | 2 – Opportunistic | Civil records exist but the connection to digital ID is done manually and only when someone applies. |
| 3 | 3 – Systematic | A formal process links civil records to the digital ID system so that major life events automatically update ID records. |
| 4 | 4 – Differentiating | Civil registration and the digital ID system are fully connected in real time. |
| 5 | 5 – Transformational | Audits confirm no one is left without an ID because of registration gaps. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.1.EX.Q3` — 🔵 Expert

**Question:** Are biometric roles, safeguards, and authorities clearly established and implemented?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No legislation or policy designates a biometric authority; biometric data collected without defined safeguards. |
| 2 | 2 – Opportunistic | Draft policy proposes a biometric authority and basic safeguards but designation is informal. |
| 3 | 3 – Systematic | Legislation designates a biometric authority with defined roles, safeguards, and access controls. |
| 4 | 4 – Differentiating | Biometric authority operates with full statutory independence; safeguards periodically audited; access logs reviewed. |
| 5 | 5 – Transformational | Independent audits certify biometric governance meets international standards; safeguard framework is a reference for regional peers. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P5.2: Data Protection & Privacy

##### `P5.2.EX.Q1` — 🔵 Expert

**Question:** Does the data protection framework clearly apply to the digital ID system?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No data protection legislation exists or applicable law explicitly exempts digital ID systems from its provisions. |
| 2 | 2 – Opportunistic | General data protection framework exists but ID-specific provisions absent; ID system subject to generic government data handling rules only. |
| 3 | 3 – Systematic | Comprehensive data protection legislation with explicit ID-system provisions enacted; independent supervisory authority operational. |
| 4 | 4 – Differentiating | Data protection authority actively supervises the ID system; compliance reports published; international adequacy assessments underway. |
| 5 | 5 – Transformational | Real-time compliance monitoring integrated into ID system operations; automated privacy impact assessments trigger corrective action. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.2.NE.Q1` — 🟢 Stakeholder

**Question:** Does the data protection framework clearly apply to the digital ID system?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There is no law that protects personal data held by the digital ID system. |
| 2 | 2 – Opportunistic | A general data protection law exists but it does not specifically address the digital ID system. |
| 3 | 3 – Systematic | A law clearly states how personal data in the ID system must be protected, and an independent body oversees compliance. |
| 4 | 4 – Differentiating | The oversight body actively monitors the ID system and publishes compliance reports. |
| 5 | 5 – Transformational | The system automatically checks for privacy compliance. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.2.EX.Q2` — 🔵 Expert

**Question:** How strong are rules and controls for consent, purpose limitation, and data minimization?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No legal provisions for informed consent, purpose limitation, or data minimization apply to ID data processing. |
| 2 | 2 – Opportunistic | High-level data protection principles stated in policy but consent mechanisms, purpose limitation clauses, and data minimization rules not operationalized. |
| 3 | 3 – Systematic | Consent requirements, purpose limitation clauses, and data minimization standards codified in law and implemented in system design. |
| 4 | 4 – Differentiating | Purpose limitation technically enforced at API level; consent logs auditable; independent audits verify compliance. |
| 5 | 5 – Transformational | Automated enforcement of consent and purpose constraints embedded in system architecture. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.2.NE.Q2` — 🟢 Stakeholder

**Question:** How strong are rules and controls for consent, purpose limitation, and data minimization?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There are no rules about obtaining permission before collecting data or limits on how that data can be used. |
| 2 | 2 – Opportunistic | Policies mention consent and data limits but these are not yet applied in practice. |
| 3 | 3 – Systematic | The law requires consent to be obtained and limits how ID data can be used. |
| 4 | 4 – Differentiating | Data use limits are enforced automatically by the system; consent records can be audited. |
| 5 | 5 – Transformational | The system is built so that it is technically impossible to use data beyond its permitted purpose. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.2.EX.Q3` — 🔵 Expert

**Question:** How effective is independent oversight and enforcement for data protection in digital ID?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No independent oversight body has jurisdiction over digital ID data processing. |
| 2 | 2 – Opportunistic | Oversight body exists but lacks specific mandate over ID systems, is under-resourced, and has not investigated any ID-related breach. |
| 3 | 3 – Systematic | Independent data protection authority with explicit ID oversight mandate operational; has conducted at least one formal investigation. |
| 4 | 4 – Differentiating | Oversight body conducts proactive compliance audits of the ID system; findings published; sanctions levied. |
| 5 | 5 – Transformational | Oversight continuous and technology-assisted; authority collaborates with international counterparts. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P5.3: Trust Services (eID, Signatures)

##### `P5.3.EX.Q1` — 🔵 Expert

**Question:** Are digital identities and electronic signatures legally recognized?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No legislation grants legal recognition to digital identities or electronic signatures; their use in transactions carries no legal standing. |
| 2 | 2 – Opportunistic | Draft legislation proposes legal recognition for e-signatures in limited contexts; recognition of digital identity credentials not yet established. |
| 3 | 3 – Systematic | Legislation grants legal recognition to digital identities and e-signatures for defined use cases; trust services framework designates supervised providers. |
| 4 | 4 – Differentiating | Full legal equivalence with physical identity documents established across the public sector; regulated private sector adoption mandated. |
| 5 | 5 – Transformational | Universal legal recognition across all sectors and transaction types in force; cross-border recognition agreements operational. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.3.NE.Q1` — 🟢 Stakeholder

**Question:** Are digital identities and electronic signatures legally recognized?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Digital IDs and electronic signatures have no legal status and cannot be used in official transactions. |
| 2 | 2 – Opportunistic | A law is being drafted to recognize digital IDs and e-signatures, but it has not yet been passed. |
| 3 | 3 – Systematic | A law has been passed recognizing digital IDs and electronic signatures for specific official uses. |
| 4 | 4 – Differentiating | Digital IDs are legally equal to physical ID documents across the public sector. |
| 5 | 5 – Transformational | Digital IDs and e-signatures are legally recognized everywhere; cross-border recognition agreements are operational. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.3.EX.Q2` — 🔵 Expert

**Question:** How broadly are digital credentials accepted across public and private services?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Digital credentials not accepted for any public service transaction; all interactions require physical document presentation. |
| 2 | 2 – Opportunistic | Digital credentials accepted in one or two pilot public services; acceptance inconsistent and not mandated by policy. |
| 3 | 3 – Systematic | Digital credentials mandatorily accepted across a defined set of core public services; regulated private sector adoption underway. |
| 4 | 4 – Differentiating | Digital credentials accepted across the full public sector with a single sign-on experience; private sector adoption widespread. |
| 5 | 5 – Transformational | Digital credentials accepted across all public and private services; cross-border service access enabled. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.3.NE.Q2` — 🟢 Stakeholder

**Question:** How broadly are digital credentials accepted across public and private services?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Digital IDs are not accepted for any government service; people must always show a physical document. |
| 2 | 2 – Opportunistic | Digital IDs are accepted in one or two government pilot services but are not widely used. |
| 3 | 3 – Systematic | Digital IDs are accepted across a core set of government services and the system is linked to the national login infrastructure. |
| 4 | 4 – Differentiating | Digital IDs are accepted across all government services through a single login. |
| 5 | 5 – Transformational | Digital IDs are accepted everywhere — government, private sector, and across borders. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.3.EX.Q3` — 🔵 Expert

**Question:** How mature is the trust services framework, including regulated provider arrangements?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No trust services framework exists; no regulated providers designated; liability limits for digital identity services undefined. |
| 2 | 2 – Opportunistic | Draft trust services framework circulated; no providers licensed yet. |
| 3 | 3 – Systematic | Trust services framework operational; qualified providers licensed against defined criteria; liability regimes established. |
| 4 | 4 – Differentiating | Trust services framework includes tiered assurance levels aligned with international standards (eIDAS, NIST SP 800-63). |
| 5 | 5 – Transformational | Framework recognized as an international reference; trust marks enable seamless cross-border transactions. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P5.4: Emerging Tech Safeguards

##### `P5.4.EX.Q1` — 🔵 Expert

**Question:** Are there binding rules to assess and manage risks from AI and automated decision-making in ID systems?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No legal or regulatory requirement mandates risk assessment for AI or automated decision-making used in identity verification. |
| 2 | 2 – Opportunistic | Draft guidelines reference the need for AI risk assessments (DPIA, HRIA) but application is voluntary and there is no enforcement mechanism. |
| 3 | 3 – Systematic | Binding regulations require mandatory impact assessments (DPIA/HRIA) for all AI-assisted ID decisions; standards for transparency and bias testing legally defined. |
| 4 | 4 – Differentiating | Mandatory impact assessments enforced by an independent body; continuous monitoring for algorithmic bias required; audit results publicly reported. |
| 5 | 5 – Transformational | Full lifecycle AI governance regime in force with real-time monitoring, third-party audits, and redress mechanisms. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.4.NE.Q1` — 🟢 Stakeholder

**Question:** Are there binding rules to assess and manage risks from AI and automated decision-making in ID systems?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There are no rules requiring checks on AI or automated systems used to make decisions about digital IDs. |
| 2 | 2 – Opportunistic | Guidelines suggest checking AI systems for risks, but following them is optional and there is no enforcement. |
| 3 | 3 – Systematic | The law requires that AI systems used in ID decisions be assessed for risks, including bias. |
| 4 | 4 – Differentiating | Risk assessments are independently checked; AI systems are continuously monitored for unfair outcomes. |
| 5 | 5 – Transformational | AI in the ID system is governed throughout its full lifecycle with real-time monitoring and independent audits. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.4.EX.Q2` — 🔵 Expert

**Question:** How systematically are impact assessments, bias testing, and human oversight applied in practice?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No impact assessments or bias testing protocols conducted on AI components of the ID system; human oversight of automated decisions absent. |
| 2 | 2 – Opportunistic | Impact assessments conducted on an ad hoc basis for high-profile deployments; bias testing methodology undefined. |
| 3 | 3 – Systematic | Impact assessments (DPIA/HRIA) mandatory for all AI-assisted ID processes; human override mechanisms legally mandated. |
| 4 | 4 – Differentiating | Assessments conducted by independent third parties; bias metrics tracked longitudinally and published. |
| 5 | 5 – Transformational | Real-time bias monitoring automated; impact assessment findings drive iterative model improvement. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.4.EX.Q3` — 🔵 Expert

**Question:** How strong are transparency, monitoring, and independent review for automated ID decisions?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Automated ID decisions opaque; no audit trail exists; affected individuals have no right to explanation or review. |
| 2 | 2 – Opportunistic | High-level information about automated decision processes available internally; audit trails maintained but not accessible externally. |
| 3 | 3 – Systematic | Legally mandated transparency requirements apply to automated ID decisions; audit trails maintained and accessible to oversight bodies. |
| 4 | 4 – Differentiating | Algorithmic transparency operationalized through publicly accessible model cards and audit logs. |
| 5 | 5 – Transformational | Explainability tools available to affected individuals in plain language; tools contributed to global DPI repositories. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.4.NE.Q3` — 🟢 Stakeholder

**Question:** How strong are transparency, monitoring, and independent review for automated ID decisions?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | When AI makes a decision about someone's digital ID, there is no explanation given and no way to challenge it. |
| 2 | 2 – Opportunistic | Some information is available internally about how automated decisions are made, but affected people cannot see it. |
| 3 | 3 – Systematic | People have the right to receive an explanation for automated ID decisions and to request human review. |
| 4 | 4 – Differentiating | Anyone affected by an automated ID decision can see how it was made through publicly accessible tools. |
| 5 | 5 – Transformational | Plain-language explanations are available to all affected individuals; tools are shared globally. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P5.5: Legal Interoperability

##### `P5.5.EX.Q1` — 🔵 Expert

**Question:** Are implementing regulations in place to operationalize the ID law?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No implementing regulations issued; primary ID law cannot be operationalized; legal gaps prevent enrollment, issuance, or verification. |
| 2 | 2 – Opportunistic | Draft implementing regulations circulating for comment but not gazetted; operational guidance relies on ad hoc ministerial directives. |
| 3 | 3 – Systematic | Key implementing regulations gazetted and operational; cover enrollment procedures, credential formats, verification protocols, and data governance. |
| 4 | 4 – Differentiating | Comprehensive regulatory framework in place; regulations regularly reviewed and updated through a defined legislative cycle. |
| 5 | 5 – Transformational | Regulatory framework adaptive; regulations updated through fast-track mechanisms to respond to technology change; cited as a model for regulatory agility. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.5.NE.Q1` — 🟢 Stakeholder

**Question:** Are implementing regulations in place to operationalize the ID law?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | The ID law has been passed but the detailed rules needed to put it into practice have not yet been issued. |
| 2 | 2 – Opportunistic | Draft rules to implement the ID law are being reviewed but have not been officially published. |
| 3 | 3 – Systematic | The detailed rules needed to operate the ID system have been officially issued and cover enrollment, ID formats, and data handling. |
| 4 | 4 – Differentiating | The rules are comprehensive and reviewed regularly; a formal process exists to update them when needed. |
| 5 | 5 – Transformational | The rules can be updated quickly to keep up with new technology. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.5.EX.Q2` — 🔵 Expert

**Question:** How clearly are legacy credentials and existing IDs recognized within the legal framework?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Legal status of legacy credentials (old national IDs, paper certificates) undefined; no transition or recognition pathway exists. |
| 2 | 2 – Opportunistic | Draft regulations acknowledge legacy IDs but transitional recognition rules inconsistently applied. |
| 3 | 3 – Systematic | Legislation establishes clear hierarchy of recognized credentials; legacy ID transitional pathways with defined validity periods enacted. |
| 4 | 4 – Differentiating | Legacy credential recognition operationalized with automated validation; sunset timelines publicly communicated. |
| 5 | 5 – Transformational | All legacy credentials formally retired or migrated; legal hierarchy of credentials stable and internationally recognized. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.5.NE.Q2` — 🟢 Stakeholder

**Question:** How clearly are legacy credentials and existing IDs recognized within the legal framework?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | It is unclear whether old ID documents are still valid or what happens to people who only have legacy credentials. |
| 2 | 2 – Opportunistic | Draft rules acknowledge old IDs but it is not consistently clear how they are treated or when they will be phased out. |
| 3 | 3 – Systematic | The law clearly states which old IDs are still valid and for how long. |
| 4 | 4 – Differentiating | The transition from old to new IDs is tracked publicly; sunset timelines are communicated. |
| 5 | 5 – Transformational | All old ID types have been fully transitioned to the new system. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P5.5.EX.Q3` — 🔵 Expert

**Question:** How mature are domestic and cross-border legal frameworks for interoperability and data sharing?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No domestic data-sharing framework for digital ID exists; cross-border data flows unregulated. |
| 2 | 2 – Opportunistic | Domestic data-sharing framework in draft; cross-border data flows occur under ad hoc arrangements; initial bilateral negotiations underway. |
| 3 | 3 – Systematic | Domestic data-sharing framework enacted with standardized data exchange agreements; cross-border framework under negotiation. |
| 4 | 4 – Differentiating | Mature domestic framework supports automated credential validation across government systems; cross-border agreements operational. |
| 5 | 5 – Transformational | Adaptive legal frameworks enable real-time, privacy-preserving cross-border verification; multilateral agreements govern data sovereignty. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

### Pillar P6: Institutional Capacity & Governance

#### Sub-Pillar P6.1: Leadership & Coordination

##### `P6.1.EX.Q1` — 🔵 Expert

**Question:** Is there a clearly designated lead institution with a defined mandate for digital ID?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No institution formally designated as the lead for digital ID; overlapping mandates across ministries create jurisdictional ambiguity. |
| 2 | 2 – Opportunistic | Lead agency designated by ministerial directive but mandate is non-statutory, narrowly defined, and contested by other agencies. |
| 3 | 3 – Systematic | Lead institution established by law with defined mandate, published organizational chart, and sufficient legal authority to coordinate across government. |
| 4 | 4 – Differentiating | Lead agency has operational independence, security of tenure for its leadership, and enforcement authority over other agencies. |
| 5 | 5 – Transformational | Lead agency operates within an adaptive governance structure with civil society and private sector representation; model replicated regionally. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.1.NE.Q1` — 🟢 Stakeholder

**Question:** Is there a clearly designated lead institution with a defined mandate for digital ID?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No single government body is clearly in charge of the digital ID system; responsibilities are split and unclear. |
| 2 | 2 – Opportunistic | A ministry has been given responsibility for digital ID but it is not backed by law and other agencies do not consistently follow its lead. |
| 3 | 3 – Systematic | A specific institution is legally responsible for digital ID with a clear mandate and authority to coordinate other government departments. |
| 4 | 4 – Differentiating | The lead institution is independent and has real authority over other agencies on digital ID matters. |
| 5 | 5 – Transformational | The lead institution includes voices from civil society and the private sector; the model is replicated regionally. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.1.EX.Q2` — 🔵 Expert

**Question:** How effective are inter-agency coordination mechanisms for digital ID policy and implementation?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Inter-agency coordination entirely ad hoc; no formal mechanism, shared agenda, or documented meeting record exists. |
| 2 | 2 – Opportunistic | Inter-agency coordination body exists but meets irregularly; attendance inconsistent; no binding decisions made. |
| 3 | 3 – Systematic | Formal inter-agency coordination body meets on a regular schedule with documented agendas and minutes; decisions binding. |
| 4 | 4 – Differentiating | Coordination body has enforcement authority; cross-sector policy decisions documented and implemented via shared digital workflows. |
| 5 | 5 – Transformational | Coordination extends to sub-national and regional levels; civil society participates in a structured advisory role. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.1.NE.Q2` — 🟢 Stakeholder

**Question:** How effective are inter-agency coordination mechanisms for digital ID policy and implementation?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Government agencies do not coordinate in any organized way on digital ID; each acts independently. |
| 2 | 2 – Opportunistic | An inter-agency group exists but meets irregularly and has no power to make binding decisions. |
| 3 | 3 – Systematic | A formal coordination body meets regularly; decisions are recorded and agencies must follow agreed policies. |
| 4 | 4 – Differentiating | The coordination body can enforce its decisions; shared digital tools support coordination across agencies. |
| 5 | 5 – Transformational | Coordination includes local governments and civil society. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.1.EX.Q3` — 🔵 Expert

**Question:** How strong is whole-of-government policy harmonization across sectors using digital ID?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Digital ID policy siloed within the lead agency; no cross-sector harmonization. |
| 2 | 2 – Opportunistic | Some sector ministries reference digital ID in their policies but alignment is informal and inconsistently applied. |
| 3 | 3 – Systematic | Policy harmonization protocols enacted for key sectors; sector-specific digital ID adoption plans approved. |
| 4 | 4 – Differentiating | Cross-sector policy alignment automated via shared workflow tools; joint cross-sector service delivery operational. |
| 5 | 5 – Transformational | Policy harmonization extends to sub-national governments; joint cross-sector service delivery using digital ID is operational. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P6.2: Skills & Capacity

##### `P6.2.EX.Q1` — 🔵 Expert

**Question:** Do digital ID institutions have structured training programs and competency frameworks?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No formal training program or competency framework exists for digital ID roles; skill requirements undefined and capacity building unplanned. |
| 2 | 2 – Opportunistic | Basic induction training exists for new hires; competency requirements documented informally; no formal certification or assessment in place. |
| 3 | 3 – Systematic | Structured competency framework defines skills required for all digital ID roles; regular certified training cycles delivered. |
| 4 | 4 – Differentiating | Competency framework aligned with international digital identity standards; training delivered via international partnerships; career pathways defined. |
| 5 | 5 – Transformational | National digital academy offers digital ID training with regional hub status; continuous learning embedded in institutional culture. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.2.NE.Q1` — 🟢 Stakeholder

**Question:** Do digital ID institutions have structured training programs and competency frameworks?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There is no formal training program or skill requirements defined for people working on the digital ID system. |
| 2 | 2 – Opportunistic | New staff receive basic induction training but there is no structured program or certification for digital ID roles. |
| 3 | 3 – Systematic | A formal training program exists with defined skill requirements; staff are certified through regular training cycles. |
| 4 | 4 – Differentiating | Training meets international standards; career paths for digital ID specialists are clearly mapped. |
| 5 | 5 – Transformational | A national training hub offers digital ID courses to the region. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.2.EX.Q2` — 🔵 Expert

**Question:** How strong are staffing, retention, and specialist capacity for operating the ID system?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Critical technical roles in the ID system unfilled or frequently vacated; no retention strategy exists. |
| 2 | 2 – Opportunistic | Core technical roles filled but turnover high; no formal retention mechanisms in place. |
| 3 | 3 – Systematic | Staffing plan identifies critical roles and required competencies; retention incentives (career paths, competitive pay) approved. |
| 4 | 4 – Differentiating | Retention rates for specialist roles above sector benchmarks; succession planning operationalized. |
| 5 | 5 – Transformational | Institution recognized as employer of choice for digital identity specialists. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.2.NE.Q2` — 🟢 Stakeholder

**Question:** How strong are staffing, retention, and specialist capacity for operating the ID system?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Key technical positions in the ID agency are often vacant or filled by outside contractors with no institutional memory. |
| 2 | 2 – Opportunistic | Core roles are filled but staff leave frequently. |
| 3 | 3 – Systematic | A staffing plan covers all critical roles; pay and career development incentives are approved to keep skilled staff. |
| 4 | 4 – Differentiating | Staff turnover in specialist roles is low; succession plans exist. |
| 5 | 5 – Transformational | The agency is known as a top employer for digital identity experts. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.2.EX.Q3` — 🔵 Expert

**Question:** How well is change management and user adoption support embedded across implementing institutions?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No change management function exists; technology deployments proceed without stakeholder engagement, communications planning, or adoption support. |
| 2 | 2 – Opportunistic | Change communications issued on an ad hoc basis for major deployments; no dedicated change management team exists. |
| 3 | 3 – Systematic | Dedicated change management team supports all major digital ID deployments; staff receive training. |
| 4 | 4 – Differentiating | Change management proactive and data-driven; adoption metrics tracked and inform iterative communications. |
| 5 | 5 – Transformational | Change management capability institutionalized across the whole-of-government digital ID ecosystem. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P6.3: Vendor & Technical Management

##### `P6.3.EX.Q1` — 🔵 Expert

**Question:** How strong are procurement and contract management arrangements for digital ID systems?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No formal procurement guidelines specific to digital ID exist; contracts awarded without competitive process. |
| 2 | 2 – Opportunistic | General government procurement rules apply but no ID-specific criteria exist. |
| 3 | 3 – Systematic | Competitive procurement with transparent, published evaluation criteria is standard practice; contracts include performance bonds and SLA enforcement. |
| 4 | 4 – Differentiating | Advanced procurement framework mandates open standards compliance; procurement decisions publicly reported. |
| 5 | 5 – Transformational | Procurement regime recognized as international best practice; contract templates contributed to global DPI procurement standards. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.3.NE.Q1` — 🟢 Stakeholder

**Question:** How strong are procurement and contract management arrangements for digital ID systems?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Digital ID contracts are awarded without a clear competitive process and without proper performance expectations. |
| 2 | 2 – Opportunistic | Standard government procurement rules are used but they do not address the specific needs of digital ID systems. |
| 3 | 3 – Systematic | Digital ID contracts are awarded through open competition with published evaluation criteria. |
| 4 | 4 – Differentiating | Procurement decisions are publicly reported; a dedicated team monitors vendor performance against contract requirements. |
| 5 | 5 – Transformational | Procurement practices are recognized internationally; contract templates are shared for other countries to use. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.3.EX.Q2` — 🔵 Expert

**Question:** To what extent does the architecture and contracting approach reduce vendor lock-in?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Digital ID system entirely dependent on a single proprietary vendor. |
| 2 | 2 – Opportunistic | Vendor contracts include basic data portability clauses but not technically implemented; no alternative vendor assessed. |
| 3 | 3 – Systematic | Contracts include source code escrow, data portability, and API interoperability clauses. |
| 4 | 4 – Differentiating | Multi-vendor architecture operational; open standards compliance mandatory criterion in all procurement. |
| 5 | 5 – Transformational | Government retains full sovereignty over core infrastructure, data, and intellectual property. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.3.NE.Q2` — 🟢 Stakeholder

**Question:** To what extent does the architecture and contracting approach reduce vendor lock-in?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | The digital ID system can only be operated by one vendor; switching would be extremely costly and difficult. |
| 2 | 2 – Opportunistic | Contracts say data can be taken away if needed but this has not been tested. |
| 3 | 3 – Systematic | The system is designed so that individual parts can be replaced; contracts include data portability clauses. |
| 4 | 4 – Differentiating | The system uses multiple vendors and open standards. |
| 5 | 5 – Transformational | The government fully owns the system and all its data. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.3.EX.Q3` — 🔵 Expert

**Question:** How effective is government technical oversight of vendors, systems, and performance?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Government has no independent technical capability to oversee vendors; oversight entirely reliant on vendor self-reporting. |
| 2 | 2 – Opportunistic | Technical oversight conducted using external consultants on an ad hoc basis; audit rights exist in contracts but rarely exercised. |
| 3 | 3 – Systematic | Dedicated government technical oversight unit has defined audit authority; regular audits conducted. |
| 4 | 4 – Differentiating | Third-party technical audits with public reporting conducted annually. |
| 5 | 5 – Transformational | Technical oversight continuous, automated, and supplemented by third-party red-team exercises. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P6.4: Institutional Accountability

##### `P6.4.EX.Q1` — 🔵 Expert

**Question:** Are institutional roles, mandates, and reporting lines for digital ID clearly defined?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Institutional roles for digital ID fragmented across multiple agencies with no clear mandate allocation; reporting lines undefined. |
| 2 | 2 – Opportunistic | Roles and responsibilities partially documented in policy but ambiguous in practice; reporting lines informal and frequently disputed. |
| 3 | 3 – Systematic | Institutional mandates clearly defined in law or formal policy; organizational chart with reporting lines published and updated. |
| 4 | 4 – Differentiating | Institutional mandates regularly reviewed; performance against mandate publicly reported; inter-agency reporting automated. |
| 5 | 5 – Transformational | Institutional framework adaptive and continuously evaluated; recognized as a model for clear accountability in digital public infrastructure. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.4.NE.Q1` — 🟢 Stakeholder

**Question:** Are institutional roles, mandates, and reporting lines for digital ID clearly defined?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | It is not clear which government bodies are responsible for which parts of the digital ID system. |
| 2 | 2 – Opportunistic | Responsibilities are described in documents but in practice they overlap or fall into gaps between agencies. |
| 3 | 3 – Systematic | Each agency involved in digital ID has a clearly defined role set out in law. |
| 4 | 4 – Differentiating | Each institution regularly reports on its performance; governance tools automate reporting between agencies. |
| 5 | 5 – Transformational | The institutional framework is regularly updated and independently evaluated. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.4.EX.Q2` — 🔵 Expert

**Question:** How effective are internal accountability and compliance processes across implementing agencies?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Internal accountability mechanisms absent or inconsistently applied across implementing agencies; compliance obligations undefined. |
| 2 | 2 – Opportunistic | Basic internal reporting exists within agencies but cross-agency compliance inconsistent. |
| 3 | 3 – Systematic | Internal accountability processes — including compliance reporting, audit findings tracking, and corrective action plans — functioning across all implementing agencies. |
| 4 | 4 – Differentiating | Compliance monitored in real time through shared dashboards; non-compliance triggers automated escalation. |
| 5 | 5 – Transformational | Fully integrated accountability ecosystem enables continuous monitoring and improvement. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.4.NE.Q2` — 🟢 Stakeholder

**Question:** How effective are internal accountability and compliance processes across implementing agencies?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There are no consistent internal checks to ensure agencies follow digital ID rules; non-compliance has no consequences. |
| 2 | 2 – Opportunistic | Some internal reporting exists within agencies but checking compliance across agencies is inconsistent. |
| 3 | 3 – Systematic | All implementing agencies have working compliance processes; audit findings are tracked and acted upon. |
| 4 | 4 – Differentiating | Compliance is tracked in real time across agencies; failures trigger automatic escalation and are publicly reported. |
| 5 | 5 – Transformational | Accountability is continuous and system-wide. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.4.EX.Q3` — 🔵 Expert

**Question:** How strong is oversight of institutional performance, coordination, and enforcement?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No mechanism exists to oversee institutional performance across the digital ID ecosystem; enforcement of inter-agency obligations absent. |
| 2 | 2 – Opportunistic | Oversight function nominally exists but under-resourced; performance data not independently collected. |
| 3 | 3 – Systematic | Oversight bodies operational with defined authority to review institutional performance; enforcement mechanisms legally grounded. |
| 4 | 4 – Differentiating | Oversight bodies actively monitor performance indicators and coordinate enforcement; regular inter-agency performance reports published. |
| 5 | 5 – Transformational | Real-time performance monitoring embedded in governance infrastructure; continuous improvement driven by oversight findings. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

#### Sub-Pillar P6.5: Financing & Sustainability

##### `P6.5.EX.Q1` — 🔵 Expert

**Question:** Is there a long-term financing plan for operating and improving the digital ID system?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | No multi-year financial plan exists for digital ID; operations rely on annual appropriations with no sustainability pathway. |
| 2 | 2 – Opportunistic | Annual budget appropriations cover core operations; multi-year financial planning exercise initiated but not approved. |
| 3 | 3 – Systematic | Multi-year financial plan with dedicated budget lines for operations, maintenance, and technology refresh formally approved. |
| 4 | 4 – Differentiating | Financial plan incorporates scenario analysis and contingency reserves; technology refresh cycles fully funded. |
| 5 | 5 – Transformational | Transparent full-cost accounting with public reporting underpins a self-sustaining financial model; surplus reinvested in an innovation fund. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.5.NE.Q1` — 🟢 Stakeholder

**Question:** Is there a long-term financing plan for operating and improving the digital ID system?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | There is no multi-year plan for funding the digital ID system. |
| 2 | 2 – Opportunistic | Annual funding is available for core operations but there is no approved long-term financial plan. |
| 3 | 3 – Systematic | A multi-year financial plan has been approved covering operations, maintenance, and upgrades; it is reviewed each year. |
| 4 | 4 – Differentiating | The plan includes emergency reserves and fully funds future technology upgrades. |
| 5 | 5 – Transformational | Full costs are transparently reported publicly; the system generates enough to reinvest in innovation. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.5.EX.Q2` — 🔵 Expert

**Question:** How diversified and reliable are funding sources for digital ID?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Digital ID system funded entirely from a single source (general government revenue or a single donor). |
| 2 | 2 – Opportunistic | Funding comes from government appropriations with some donor supplementation; cost recovery options explored but not implemented. |
| 3 | 3 – Systematic | Funding diversified across government budget, development partner contributions under a formal framework, and modest cost recovery. |
| 4 | 4 – Differentiating | Multiple revenue streams — government, development partners, user fees, and commercial API usage fees — operational and tracked. |
| 5 | 5 – Transformational | Self-sustaining revenue ecosystem funds operations and innovation. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.5.NE.Q2` — 🟢 Stakeholder

**Question:** How diversified and reliable are funding sources for digital ID?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | The digital ID system is funded by only one source and would be at risk if that source of funding were reduced. |
| 2 | 2 – Opportunistic | Funding comes mainly from government and donors. |
| 3 | 3 – Systematic | Several funding sources are in use — government budget, donor grants, and some fees for premium services. |
| 4 | 4 – Differentiating | Multiple funding streams are active and tracked; reserves covering at least one year of operations are maintained. |
| 5 | 5 – Transformational | The system is financially self-sustaining through diverse revenue streams. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

##### `P6.5.EX.Q3` — 🔵 Expert

**Question:** How effective is coordination with development partners and budget authorities to support sustainability?

| Score | Label | Description |
|-------|-------|-------------|
| 1 | 1 – Basic | Development partners operate independently with no coordination mechanism; budget authority engagement limited to annual appropriation requests. |
| 2 | 2 – Opportunistic | Donor coordination forum meets occasionally but has no formal terms of reference. |
| 3 | 3 – Systematic | Formal development partner coordination framework with agreed reporting and alignment protocols operational. |
| 4 | 4 – Differentiating | Development partners aligned to national priorities through a co-financed program framework; joint reviews held semi-annually. |
| 5 | 5 – Transformational | Development partners fully embedded in the national financial sustainability strategy. |
| 9 | I don't know / Unable to assess | Insufficient information to make an assessment. |

> `allow_unknown: true`

---

## Section 3 — TypeScript Coding Instructions

### 3.1 Frozen Pillar & Sub-Pillar Codes

| Pillar Code | Pillar Name | Sub-Pillar Codes |
|-------------|-------------|-----------------|
| P1 | Legal & Regulatory Foundations | P1.1, P1.2, P1.3, P1.4, P1.5 |
| P2 | Data Governance & Privacy | P2.1, P2.2, P2.3, P2.4, P2.5 |
| P3 | Interoperability & Standards | P3.1, P3.2, P3.3, P3.4, P3.5 |
| P4 | Technology & Infrastructure | P4.1, P4.2, P4.3, P4.4, P4.5 |
| P5 | Inclusion, Trust & Safeguards | P5.1, P5.2, P5.3, P5.4, P5.5 |
| P6 | Governance & Accountability | P6.1, P6.2, P6.3, P6.4, P6.5 |

### 3.2 q_code Mapping Rule

```
Workbook code:  P{pillar}.{subpillar}.Q{n}
Expert TS code: P{pillar}.{subpillar}.EX.Q{n}
Stakeholder TS: P{pillar}.{subpillar}.NE.Q{n}
```

### 3.3 Entry Ordering

Sort all 150 entries by:
1. Sub-pillar code (P1.1 → P6.5)
2. Q number (Q1 → Q3)
3. Survey type (expert before stakeholder)

### 3.4 P5.4 Special Case

```
P5.4.EX.Q1  expert
P5.4.NE.Q1  stakeholder
P5.4.EX.Q2  expert      ← expert only, NO NE equivalent
P5.4.EX.Q3  expert
P5.4.NE.Q3  stakeholder ← NE uses Q3, not Q2
```

### 3.5 TypeScript File Template

```typescript
import { FrameworkQuestion } from './types';

export const frameworkQuestions: FrameworkQuestion[] = [
  {
    q_code: 'P1.1.EX.Q1',
    pillar_code: 'P1',
    pillar_name: 'Legal & Regulatory Foundations',
    subpillar_code: 'P1.1',
    subpillar_name: '<subpillar name>',
    survey_type: 'expert',
    question_text: '<refined question text>',
    options: [
      { score: 1, label: '1 – Basic',            description: '<score 1 text>' },
      { score: 2, label: '2 – Opportunistic',    description: '<score 2 text>' },
      { score: 3, label: '3 – Systematic',       description: '<score 3 text>' },
      { score: 4, label: '4 – Differentiating',  description: '<score 4 text>' },
      { score: 5, label: '5 – Transformational', description: '<score 5 text>' },
      { score: 9, label: "I don't know / Unable to assess", description: 'Insufficient information to make an assessment.' },
    ],
    allow_unknown: true,
  },
  // ... 149 more entries
];
```

### 3.6 Validation Checklist

Before committing `frameworkQuestions.ts`, verify:

- [ ] Total entries = 150 (90 expert + 60 stakeholder)
- [ ] All expert q_codes contain `.EX.`
- [ ] All stakeholder q_codes contain `.NE.`
- [ ] Every entry has exactly 6 options (scores 1–5 + 9)
- [ ] Score 9 label = `I don't know / Unable to assess` on every entry
- [ ] `allow_unknown: true` on every entry
- [ ] `P5.4.NE.Q2` does NOT exist (expert-only)
- [ ] `P5.4.NE.Q3` EXISTS (P5.4 exception)
- [ ] No stakeholder Q3 entries except `P5.4.NE.Q3`
- [ ] Entries ordered: sub-pillar → Q number → expert before stakeholder

---

## Section 4 — Summary of All Changes

| Change Type | Count | Detail |
|-------------|-------|--------|
| q_code format corrected | 150 | All codes now include EX/NE infix |
| Stakeholder survey reduced | 30 dropped | From 90 to 60 (Q3s removed per sub-pillar) |
| P5.4 special case applied | 1 | NE uses Q1+Q3; Q2 is expert-only |
| Score 9 standardised | 150 | Uniform label and description across all entries |
| Barbados/Trident contextualisation | ~40 | Where 'digital ID system' or 'national system' appears |
| CARICOM substitution | ~10 | Where 'neighboring countries' or 'cross-border' appears |
| Tourism sector callout | ~8 | Where 'key sectors' or 'service delivery' appears |
| Redundancy differentiation | 6 pairs | Language clarified to distinguish overlapping questions |
| Response choice tightening | 150 | Expert: ≤2 sentences; Stakeholder: plain language |
| allow_unknown set | 150 | All entries set to true |

---

*End of Refinement Plan v3 — Barbados Trident Digital ID Assessment Framework*
*Generated for UNDP Digital AI Innovation Hub & DPI Safeguards Team*