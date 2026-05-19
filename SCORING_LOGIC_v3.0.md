# Digital ID Assessment — Scoring Engine Specification (v3.0)

> **Status: Final.** This version supersedes v1.0, v2.0, and v2.1.
> Verified against: `AILA_2_0_Manual_Calculation_Sheet.xlsx`, `Rubric_AILA.xlsx`, `Digital_ID_Assessment_Framework_FINAL.xlsx`.

---

## Preface: What This Spec Mirrors from AILA — and Where It Improves

This spec takes the **methodological intent** of the AILA rubric and implements it without the logical inconsistencies present in AILA's Excel workbook. Every divergence is documented and justified.

### What is adopted from AILA

| AILA Feature | Adopted | Location in this spec |
|---|---|---|
| Three data components: survey, expert, indicators | ✅ | §3 |
| Explicit, rubric-defined per-question weights | ✅ | §4.1 |
| Weights sum to 1.0 per sub-pillar across all components | ✅ | §4.1 |
| Zero-weight questions excluded before scoring | ✅ | §2 |
| Sentinel value for "I don't know" excluded from denominator | ✅ | §2 |
| Survey uses population vote counts → mean rating | ✅ | §3.1 |
| Expert uses single-assessor score per question | ✅ | §3.2 |
| Indicators sourced from third-party data, normalised | ✅ | §3.3 |
| Five maturity bands with label and colour | ✅ | §6 |
| Maturity mapped at sub-pillar, pillar, and overall levels | ✅ | §6 |

### What is corrected from AILA

| AILA Issue | Correction in this spec |
|---|---|
| **Scale inconsistency:** Survey/expert produce 0–1 scores; indicators produce 0–5. These are summed directly, making indicator contributions up to 5× more impactful than intended. | All three components are kept on a **consistent 1–5 scale** throughout. Survey uses mean rating (not normalised by /5). Indicators use `1 + (raw/max) × 4` normalization. |
| **Pillar aggregation via SUM (not mean):** AILA sums sub-pillar totals into a pillar total, producing a pillar score that scales with the number of sub-pillars (e.g. a 4-sub-pillar pillar has max score 4.0; a 3-sub-pillar pillar has max 3.0). This makes pillar and overall scores non-comparable across pillars. | Pillar score = **mean** of sub-pillar scores. All levels (sub-pillar, pillar, overall) stay on the same 1–5 scale. |
| **Overall score on non-standard scale:** AILA's `(G3+G7+G11)/3` averages three pillar sums with different denominators, producing an overall score on a ~0–3.67 range — inconsistent with the stated 1–5 maturity bands. | Overall score = mean of pillar scores. Range is strictly 1.0–5.0, directly matching the maturity bands. |
| **Sub-pillar aggregation via separate component buckets:** v2.1 of this spec computed each component's contribution separately, then summed them. This required a redistribution formula that was complex and fragile. | All questions (any component) in a sub-pillar form **one unified weight pool**. Sub-pillar score = `sum(w_q × s_q) / sum(w_q for valid q)`. Null redistribution is automatic via the denominator. |
| **Post-hoc 70/30 expert/non-expert blend:** v1.0 applied a separate blending step after scoring, double-weighting the expert preference already encoded in the rubric weights. | No separate blend. The rubric weight budget already encodes the expert vs. survey balance. The sub-pillar score is the single authoritative integrated score. |

---

## 1. Execution Pipeline

Execute strictly in sequence. No stage may depend on a downstream result.

| Stage | Function | Input | Output |
|---|---|---|---|
| 1 | `validate_responses()` | Raw assessment JSON | Validated responses with `is_valid` flag |
| 2 | `normalize_indicators()` | Raw indicator values + rubric normalization rules | `indicator_score` on 1–5 scale |
| 3 | `score_survey_questions()` | Survey response counts per question | `survey_question_score` on 1–5 scale |
| 4 | `score_expert_questions()` | Expert single-assessor raw scores | `expert_question_score` on 1–5 scale |
| 5 | `aggregate_subpillars()` | All question/indicator scores + rubric weights | `subpillar_score` (1–5 or null), `data_quality_flag` |
| 6 | `aggregate_pillars()` | Sub-pillar scores per pillar | `pillar_score` (1–5 or null) |
| 7 | `compute_overall()` | Pillar scores | `overall_score` (1–5 or null) |
| 8 | `compute_discrepancy_flags()` | Per-component unweighted means | `discrepancy_flag` per sub-pillar |
| 9 | `map_maturity()` | Any numeric score | `maturity_stage`, `color_hex` |

---

## 2. Input Validation

```
ALLOWED_SURVEY_EXPERT_INPUTS  = {1, 2, 3, 4, 5, 9, null, ""}
SENTINEL_UNKNOWN               = 9          // "I don't know" — mapped at instrument layer
VALID_SCORES                   = {1, 2, 3, 4, 5}

is_valid(x)             = x ∈ VALID_SCORES
exclude_from_scoring(x) = x ∈ {9, null, ""} or x ∉ VALID_SCORES
is_zero_weight(q)       = rubric_config[q].weight == 0
```

**Type coercion:**
- Float that is a whole number (e.g. `3.0`) → cast to `int` before validation.
- Float with fractional part (e.g. `3.5`) → `exclude_from_scoring`.
- String (e.g. `"I don't know"`) → `exclude_from_scoring`. The survey instrument maps all non-numeric answer options (including "I don't know", "No regulation exists", etc.) to `9` before data enters the engine.

**Zero-weight questions:** Excluded from the scoring pool entirely before any computation. They are not null responses — they are not scoreable and do not affect the denominator, coverage count, or quality flag.

**Error handling:** Invalid inputs are logged to `metadata.validation_log` and skipped. The engine does not crash.

---

## 3. Component Scoring (All outputs on 1–5 scale)

### 3.1 Non-Expert Survey — Population Mean Rating

Multiple stakeholder respondents each select a rating from 1–5 (or "I don't know"). The question score is the **arithmetic mean** of valid ratings.

```
// response_counts[r] = number of respondents selecting rating r ∈ {1,2,3,4,5}
// Respondents who selected "I don't know" (sentinel=9) are excluded from counts.

total_respondents = Σ response_counts[r]  for r ∈ {1,2,3,4,5}

IF total_respondents = 0:
    survey_question_score = null

ELSE:
    survey_question_score = Σ (response_counts[r] × r) / total_respondents
    // Result range: 1.0 to 5.0
```

> **Why not divide by 5 (as AILA does)?** AILA's formula `sum(count×r) / (total×5)` normalises the result to 0–1. This was AILA's internal choice, but it introduces a scale inconsistency with indicators (which AILA normalises to 0–5). By keeping the mean rating on the natural 1–5 scale, all three components stay consistent throughout and no rescaling is needed.

### 3.2 Expert Assessment — Single Assessor Score

One expert assessor selects a rating from 1–5 for each question.

```
expert_question_score = raw_score    if is_valid(raw_score)
                      = null         otherwise
// Result range: 1.0 to 5.0 (integers; treated as float in all downstream computation)
```

### 3.3 Indicators — Third-Party Data Normalised to 1–5

Raw indicator values arrive on source-specific scales and must be normalised to 1–5 before entering the scoring pool. The normalization method for each indicator is defined in the rubric config.

```
// Method A — Percentage-based (raw ∈ [0, 100]):
indicator_score = 1 + (raw_value / 100) × 4
// raw=0   → 1.0 (worst),  raw=50  → 3.0,  raw=100 → 5.0 (best)

// Method B — Index-based (raw ∈ [0, 1]):
indicator_score = 1 + raw_value × 4
// raw=0.0 → 1.0,  raw=0.5 → 3.0,  raw=1.0 → 5.0

// Method C — Custom range (raw ∈ [source_min, source_max]):
indicator_score = 1 + ((raw_value - source_min) / (source_max - source_min)) × 4
// Linear rescale from any range to [1, 5]

IF raw_value is null (data unavailable for this country):
    indicator_score = null
```

> **Why 1 + (raw/max) × 4 and not raw × 5/max?** AILA uses `raw×5/100` for percentage indicators, which maps 0% → 0.0. This is inconsistent with the survey/expert minimum of 1.0 (a respondent who selects the lowest rating gives 1, not 0). A country with zero indicator coverage would score 0.0 and fall outside the maturity bands entirely. The `1 + (raw/max) × 4` formula maps the full source range to [1.0, 5.0], maintaining consistency across all components.

---

## 4. Sub-Pillar Aggregation

### 4.1 The Unified Weight Pool

Every scoreable question and indicator in a sub-pillar — regardless of which component it belongs to — is assigned an explicit rubric weight. The complete set of weights for a sub-pillar sums to **exactly 1.0**.

The component budget split (e.g. "Survey: 0.35, Expert: 0.55, Indicators: 0.10") is expressed implicitly through the question weights. For example, if the expert budget is 0.55 and there are two expert questions, they might have weights 0.30 and 0.25. The engine does not need a separate "component budget" concept — the question weights encode it directly.

**Rubric config validation:** At startup the engine checks that `Σ weight_q = 1.0 ± 0.001` for every sub-pillar. Any sub-pillar that fails this check raises a `RubricConfigError`.

### 4.2 Sub-Pillar Score Formula

```
// For sub-pillar sp, collect all scoreable questions (weight_q > 0):
scoreable_questions = {q ∈ sp : weight_q > 0}
valid_questions     = {q ∈ scoreable_questions : score_q ≠ null}
invalid_questions   = scoreable_questions − valid_questions

IF valid_questions is empty:
    subpillar_score   = null
    data_quality_flag = "N/A"

ELSE:
    sum_weighted      = Σ (weight_q × score_q)  for q ∈ valid_questions
    sum_valid_weights = Σ weight_q               for q ∈ valid_questions

    subpillar_score   = sum_weighted / sum_valid_weights
    // Result range: 1.0 to 5.0

    // The division by sum_valid_weights (not 1.0) automatically redistributes
    // the weight of null questions to valid questions, proportionally.
    // This is equivalent to re-normalising: a sub-pillar answered 70% responds
    // as if those 70% hold 100% of the weight budget.
```

**Data quality flag:**

```
coverage = |valid_questions| / |scoreable_questions|

IF coverage = 0:         flag = "N/A"
IF 0 < coverage < 0.67:  flag = "⚠️ Partial"
IF coverage ≥ 0.67:      flag = ""
```

> **On the 0.67 threshold:** Two-thirds coverage is the minimum at which a sub-pillar score is considered reliable. A score based on fewer than 67% of scoreable items is included in downstream aggregation but flagged for human review. This threshold should be reviewed empirically once baseline data from multiple assessments is available.

### 4.3 Pillar Score

```
valid_subpillars = {sp ∈ pillar : subpillar_score_sp ≠ null}

IF valid_subpillars is empty:
    pillar_score = null
ELSE:
    pillar_score = mean(subpillar_score_sp  for sp ∈ valid_subpillars)
    // Equal weight per sub-pillar unless rubric config specifies otherwise
    // Result range: 1.0 to 5.0
```

> **Why mean and not sum?** AILA uses a pillar SUM of sub-pillar scores. Because sub-pillar scores are on a 0–1 scale in AILA, the sum scales with the number of sub-pillars, making pillar scores non-comparable across pillars with different sub-pillar counts. Using the **mean** keeps pillar scores on the same 1–5 scale as sub-pillar scores. This is a deliberate improvement over AILA.

### 4.4 Overall Score

```
valid_pillars = {p : pillar_score_p ≠ null}

IF valid_pillars is empty:
    overall_score = null
ELSE:
    overall_score = mean(pillar_score_p  for p ∈ valid_pillars)
    // Equal weight per pillar unless rubric config specifies otherwise
    // Result range: 1.0 to 5.0
```

**Floating-point precision:** All intermediate calculations at full float precision. Apply `round(value, 2)` **only at output serialisation**. Never round during aggregation.

---

## 5. Discrepancy Flag

The discrepancy flag signals a meaningful perception gap between how survey respondents and the expert assessor rate the same sub-pillar. It is a diagnostic flag — it does not modify any score.

```
// Compute unweighted mean ratings per component (ignoring rubric weights):
survey_mean_sp  = mean(survey_question_score_q  for valid survey q ∈ sp)
expert_mean_sp  = mean(expert_question_score_q  for valid expert q ∈ sp)

IF survey_mean_sp is null OR expert_mean_sp is null:
    discrepancy_flag = "N/A"

ELSE IF |survey_mean_sp − expert_mean_sp| ≥ 1.0:
    discrepancy_flag = "⚠️ Review"

ELSE:
    discrepancy_flag = ""
```

> **Why unweighted means?** We want to measure whether experts and non-experts *perceive things differently* — a human judgement question, not a scoring question. Applying rubric weights here would conflate weight differences with perception differences (e.g. a question worth 0.30 vs. one worth 0.10 would dominate the comparison for reasons unrelated to perception). Unweighted means give each question equal voice in the perception comparison.

> **On the 1.0 threshold:** A 1-point gap on the 1–5 scale (25% of total range) is the initial calibration for "meaningful divergence." This threshold may be refined per pillar once empirical data is available. For example, a lower threshold (e.g. 0.75) might be appropriate for Pillar 2 (Safeguards) where civil society perception gaps are particularly significant.

> **Indicators are excluded from the discrepancy flag.** Indicators are objective data, not perception ratings. The discrepancy flag is specifically about the gap between human survey respondents and the human expert assessor.

---

## 6. Maturity Stage Mapping

Applied identically at **sub-pillar, pillar, and overall** levels. Input is the rounded score.

| Min (inclusive) | Max (inclusive) | Label | Hex |
|---|---|---|---|
| 1.00 | 1.80 | Basic | `#C00000` |
| 1.81 | 2.60 | Opportunistic | `#FFC000` |
| 2.61 | 3.40 | Systematic | `#FFFF00` |
| 3.41 | 4.20 | Differentiating | `#92D050` |
| 4.21 | 5.00 | Transformational | `#00B050` |

```python
def map_maturity(score: float | None) -> tuple[str, str]:
    if score is None:
        return ("N/A", "#FFFFFF")
    bands = [
        (1.00, 1.80, "Basic",            "#C00000"),
        (1.81, 2.60, "Opportunistic",    "#FFC000"),
        (2.61, 3.40, "Systematic",       "#FFFF00"),
        (3.41, 4.20, "Differentiating",  "#92D050"),
        (4.21, 5.00, "Transformational", "#00B050"),
    ]
    s = round(score, 2)
    for lo, hi, label, color in bands:
        if lo <= s <= hi:
            return (label, color)
    raise ValueError(f"Score {score:.4f} is outside valid range [1.00, 5.00]")
```

**Boundary test cases** (apply to rounded value):

| Raw score | Rounded | Maturity |
|---|---|---|
| 1.804 | 1.80 | Basic |
| 1.805 | 1.81 | Opportunistic |
| 3.404 | 3.40 | Systematic |
| 3.405 | 3.41 | Differentiating |
| 4.204 | 4.20 | Differentiating |
| 4.205 | 4.21 | Transformational |

---

## 7. JSON Schema

### 7.1 Input

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Digital ID Assessment Input",
  "type": "object",
  "required": ["assessment_id", "country", "survey_responses", "expert_responses", "indicator_values"],
  "properties": {
    "assessment_id": { "type": "string", "format": "uuid" },
    "country":       { "type": "string" },

    "survey_responses": {
      "description": "Non-expert stakeholder survey — response counts per rating per question",
      "type": "array",
      "items": {
        "required": ["q_code", "subpillar_code", "pillar_code", "response_counts"],
        "properties": {
          "q_code":         { "type": "string", "pattern": "^P[1-6]\\.[1-5]\\.NE\\.Q\\d+$" },
          "subpillar_code": { "type": "string", "pattern": "^P[1-6]\\.[1-5]$" },
          "pillar_code":    { "type": "string", "pattern": "^P[1-6]$" },
          "response_counts": {
            "type": "object",
            "description": "Count of respondents selecting each rating. Omit or 0 for unused ratings.",
            "properties": {
              "r1": {"type":"integer","minimum":0},
              "r2": {"type":"integer","minimum":0},
              "r3": {"type":"integer","minimum":0},
              "r4": {"type":"integer","minimum":0},
              "r5": {"type":"integer","minimum":0}
            }
          }
        }
      }
    },

    "expert_responses": {
      "description": "Expert assessor — one score per question",
      "type": "array",
      "items": {
        "required": ["q_code", "subpillar_code", "pillar_code", "score"],
        "properties": {
          "q_code":         { "type": "string", "pattern": "^P[1-6]\\.[1-5]\\.EX\\.Q\\d+$" },
          "subpillar_code": { "type": "string", "pattern": "^P[1-6]\\.[1-5]$" },
          "pillar_code":    { "type": "string", "pattern": "^P[1-6]$" },
          "score": {
            "oneOf": [
              { "type": "integer", "enum": [1,2,3,4,5,9] },
              { "type": "null" }
            ]
          }
        }
      }
    },

    "indicator_values": {
      "description": "Third-party objective indicators — raw values before normalization",
      "type": "array",
      "items": {
        "required": ["indicator_code", "subpillar_code", "pillar_code", "raw_value"],
        "properties": {
          "indicator_code": { "type": "string" },
          "subpillar_code": { "type": "string", "pattern": "^P[1-6]\\.[1-5]$" },
          "pillar_code":    { "type": "string", "pattern": "^P[1-6]$" },
          "raw_value":      { "type": ["number","null"] }
        }
      }
    }
  }
}
```

### 7.2 Output

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Digital ID Assessment Output",
  "type": "object",
  "required": ["assessment_id", "overall", "pillars", "subpillars", "metadata"],
  "properties": {

    "assessment_id": { "type": "string" },

    "overall": {
      "properties": {
        "score":    { "type": ["number","null"] },
        "maturity": { "type": "string" },
        "color":    { "type": "string" }
      }
    },

    "pillars": {
      "type": "array",
      "items": {
        "properties": {
          "code":     { "type": "string" },
          "name":     { "type": "string" },
          "score":    { "type": ["number","null"] },
          "maturity": { "type": "string" },
          "color":    { "type": "string" }
        }
      }
    },

    "subpillars": {
      "type": "array",
      "items": {
        "properties": {
          "code":                   { "type": "string" },
          "name":                   { "type": "string" },
          "pillar_code":            { "type": "string" },
          "score":                  { "type": ["number","null"] },
          "survey_mean":            { "type": ["number","null"],
                                      "description": "Unweighted mean of valid survey question scores" },
          "expert_mean":            { "type": ["number","null"],
                                      "description": "Unweighted mean of valid expert question scores" },
          "indicator_mean":         { "type": ["number","null"],
                                      "description": "Unweighted mean of valid normalised indicator scores" },
          "discrepancy_flag":       { "type": "string" },
          "data_quality_flag":      { "type": "string" },
          "coverage_pct":           { "type": ["number","null"],
                                      "description": "Percentage of scoreable questions with valid responses" },
          "valid_count":            { "type": "integer" },
          "scoreable_count":        { "type": "integer" },
          "maturity":               { "type": "string" },
          "color":                  { "type": "string" }
        }
      }
    },

    "metadata": {
      "properties": {
        "computed_at":      { "type": "string", "format": "date-time" },
        "engine_version":   { "type": "string" },
        "rubric_version":   { "type": "string" },
        "validation_log":   {
          "type": "array",
          "items": {
            "properties": {
              "item":    { "type": "string" },
              "value":   {},
              "action":  { "type": "string" },
              "reason":  { "type": "string" }
            }
          }
        }
      }
    }
  }
}
```

---

## 8. Rubric Configuration Contract

The engine reads all weights and normalization rules from a rubric config object. Weights are never hardcoded.

```json
{
  "version": "1.0",
  "subpillars": {
    "P1.1": {
      "name": "Coverage & Inclusion",
      "pillar": "P1",
      "questions": {
        "P1.1.NE.Q1": { "weight": 0.10, "component": "survey",    "zero_weight": false },
        "P1.1.NE.Q2": { "weight": 0.12, "component": "survey",    "zero_weight": false },
        "P1.1.NE.Q3": { "weight": 0.00, "component": "survey",    "zero_weight": true  },
        "P1.1.EX.Q1": { "weight": 0.25, "component": "expert",    "zero_weight": false },
        "P1.1.EX.Q2": { "weight": 0.20, "component": "expert",    "zero_weight": false },
        "P1.1.EX.Q3": { "weight": 0.18, "component": "expert",    "zero_weight": false },
        "IND.P1.1.01": {
          "weight": 0.10, "component": "indicator", "zero_weight": false,
          "source": "ITU", "normalization": "pct_to_5",
          "description": "Mobile ID enrollment rate (%)"
        },
        "IND.P1.1.02": {
          "weight": 0.05, "component": "indicator", "zero_weight": false,
          "source": "WorldBank", "normalization": "index_to_5",
          "description": "Digital inclusion index (0–1)"
        }
      }
    }
  },
  "normalization_rules": {
    "pct_to_5":   { "formula": "1 + (raw / 100) * 4",    "raw_range": [0, 100] },
    "index_to_5": { "formula": "1 + raw * 4",            "raw_range": [0, 1]   },
    "custom":     { "formula": "1 + ((raw - min) / (max - min)) * 4", "raw_range": "defined per indicator" }
  }
}
```

**Startup validation rules — `RubricConfigError` raised if any fail:**
1. For every sub-pillar: `Σ weight_q` (for non-zero-weight questions) `= 1.0 ± 0.001`
2. Every `component` value is one of `{survey, expert, indicator}`
3. Every `normalization` value references a defined rule in `normalization_rules`
4. No question code appears in more than one sub-pillar

---

## 9. Test Cases

### Test 1 — Full Sub-Pillar, All Three Components

**Rubric weights:** NE.Q1=0.10, NE.Q2=0.15, EX.Q1=0.30, EX.Q2=0.25, IND.01=0.10, IND.02=0.10 (sum=1.0)

**Input:**
- NE.Q1 responses: {r5:2, r4:3, r3:1} → score = (2×5+3×4+1×3)/6 = 25/6 = **4.167**
- NE.Q2 responses: {r4:2, r3:2} → score = (2×4+2×3)/4 = 14/4 = **3.500**
- EX.Q1: raw=4 → score = **4.000**
- EX.Q2: raw=3 → score = **3.000**
- IND.01: raw=72% → score = 1+(72/100)×4 = **3.880**
- IND.02: raw=0.60 (index) → score = 1+0.60×4 = **3.400**

```
sum_weighted      = 4.167×0.10 + 3.500×0.15 + 4.000×0.30 + 3.000×0.25 + 3.880×0.10 + 3.400×0.10
                  = 0.4167 + 0.5250 + 1.2000 + 0.7500 + 0.3880 + 0.3400
                  = 3.6197
sum_valid_weights = 1.00  (all valid)
subpillar_score   = 3.6197 / 1.00 = 3.62  (at output)

coverage          = 6/6 = 100%  →  flag = ""
survey_mean       = (4.167 + 3.500) / 2 = 3.833
expert_mean       = (4.000 + 3.000) / 2 = 3.500
|3.833 − 3.500|   = 0.333 < 1.0  →  discrepancy_flag = ""
maturity(3.62)    = Differentiating  (3.41 ≤ 3.62 ≤ 4.20)
```

**Expected output:**
```json
{ "score": 3.62, "coverage_pct": 100, "data_quality_flag": "", "discrepancy_flag": "",
  "survey_mean": 3.83, "expert_mean": 3.5, "maturity": "Differentiating", "color": "#92D050" }
```

---

### Test 2 — Partial Responses (Automatic Weight Redistribution)

**Rubric weights:** NE.Q1=0.10, NE.Q2=0.15, EX.Q1=0.30, EX.Q2=0.25, IND.01=0.10, IND.02=0.10

**Input:** NE.Q1=null(sentinel 9), NE.Q2=3.5, EX.Q1=4, EX.Q2=null, IND.01=raw:50%, IND.02=null(unavailable)

```
NE.Q1: sentinel 9 → excluded
NE.Q2: score = 3.5 (valid, w=0.15)
EX.Q1: score = 4.0 (valid, w=0.30)
EX.Q2: null → excluded
IND.01: score = 1+(50/100)×4 = 3.0 (valid, w=0.10)
IND.02: null → excluded

valid_questions   = {NE.Q2, EX.Q1, IND.01}
sum_weighted      = 3.5×0.15 + 4.0×0.30 + 3.0×0.10 = 0.525+1.200+0.300 = 2.025
sum_valid_weights = 0.15+0.30+0.10 = 0.55
subpillar_score   = 2.025 / 0.55 = 3.6818... → 3.68

coverage          = 3/6 = 50%  <67%  →  flag = "⚠️ Partial"
survey_mean       = 3.5 / 1 = 3.5      (only NE.Q2 valid)
expert_mean       = 4.0 / 1 = 4.0      (only EX.Q1 valid)
|3.5 − 4.0|       = 0.5 < 1.0  →  discrepancy_flag = ""
```

**Expected output:**
```json
{ "score": 3.68, "coverage_pct": 50, "data_quality_flag": "⚠️ Partial", "discrepancy_flag": "",
  "valid_count": 3, "scoreable_count": 6, "maturity": "Differentiating", "color": "#92D050" }
```

---

### Test 3 — Discrepancy Flag

**Same rubric as Test 1.** All indicators and survey/expert questions valid.

**Input:** Survey questions mean = 2.1, Expert questions mean = 3.9

```
|2.1 − 3.9| = 1.8 ≥ 1.0  →  discrepancy_flag = "⚠️ Review"
```

The sub-pillar score is computed normally using all weighted scores. The flag is diagnostic only and does not alter the score.

---

### Test 4 — All Responses Null

```
valid_questions = {}
subpillar_score = null
data_quality_flag = "N/A"
coverage_pct = 0
```

This sub-pillar is excluded from pillar aggregation.

---

### Test 5 — Pillar Aggregation with One Null Sub-Pillar

**Pillar P3, 5 sub-pillars:** P3.1=4.2, P3.2=3.6, P3.3=null, P3.4=3.0, P3.5=2.8

```
valid_subpillars = [4.2, 3.6, 3.0, 2.8]
pillar_score     = (4.2+3.6+3.0+2.8) / 4 = 13.6 / 4 = 3.40
maturity(3.40)   → Systematic (2.61 ≤ 3.40 ≤ 3.40)
```

**Expected:** `{ "score": 3.40, "maturity": "Systematic", "color": "#FFFF00" }`

---

### Test 6 — Full Overall Score

**6 pillar scores:** P1=3.5, P2=2.9, P3=3.4, P4=4.1, P5=3.8, P6=2.6

```
overall = (3.5+2.9+3.4+4.1+3.8+2.6) / 6 = 20.3 / 6 = 3.3833...  →  3.38
maturity(3.38) → Systematic (2.61 ≤ 3.38 ≤ 3.40)
```

**Expected:** `{ "score": 3.38, "maturity": "Systematic", "color": "#FFFF00" }`

---

### Test 7 — Indicator Normalization

| Source scale | Raw value | Formula | Expected score |
|---|---|---|---|
| Percentage (0–100) | 0 | 1+(0/100)×4 | 1.00 |
| Percentage (0–100) | 50 | 1+(50/100)×4 | 3.00 |
| Percentage (0–100) | 100 | 1+(100/100)×4 | 5.00 |
| Index (0–1) | 0.0 | 1+0.0×4 | 1.00 |
| Index (0–1) | 0.75 | 1+0.75×4 | 4.00 |
| Index (0–1) | 1.0 | 1+1.0×4 | 5.00 |
| Custom (20–80) | 20 | 1+((20-20)/(80-20))×4 | 1.00 |
| Custom (20–80) | 50 | 1+((50-20)/(80-20))×4 | 3.00 |
| Custom (20–80) | 80 | 1+((80-20)/(80-20))×4 | 5.00 |

---

## 10. Implementation Directives

1. **No hardcoded weights.** All weights and normalization rules come from the rubric config. The engine raises `RubricConfigError` on startup if the config is absent or fails §8 validation.

2. **No external dependencies.** Python standard library only: `json`, `datetime`, `math`, `dataclasses`, `typing`.

3. **Floating-point safety.** Full precision throughout all computation. `round(value, 2)` at output serialisation only, never during aggregation.

4. **Deterministic ordering.** Outputs sorted by `pillar_code` (P1→P6) → `subpillar_code` (P1.1→P6.5) → `q_code`.

5. **Idempotency.** Identical input + identical rubric config → identical output on every run.

6. **Strict schema validation.** Reject q_codes that fail pattern matching. Log and skip; do not crash.

7. **Component independence.** Survey, expert, and indicator inputs are scored independently (Stages 2–4) before being merged into the unified weight pool at Stage 5.

8. **Audit trail.** Every excluded item logged to `metadata.validation_log`:
   ```json
   { "item": "P2.3.EX.Q2", "value": 9,    "action": "excluded_sentinel",  "reason": "I don't know" },
   { "item": "IND.P3.1.01", "value": null, "action": "excluded_null",      "reason": "indicator data unavailable" },
   { "item": "P1.4.NE.Q3",  "value": 0,   "action": "excluded_zero_weight","reason": "rubric weight = 0" }
   ```

9. **Rubric versioning.** `metadata.rubric_version` records the config version used. Scores from different rubric versions are not directly comparable.

---

## 11. Framework Structure Reference

| Pillar | Name | Sub-Pillars |
|---|---|---|
| P1 | Service Delivery & User Value | P1.1 Coverage & Inclusion, P1.2 User Experience, P1.3 Service Integration, P1.4 Value, P1.5 Improvement |
| P2 | Safeguards, Trust & Accountability | P2.1 Consent & Data Minimization, P2.2 Transparency & Explainability, P2.3 Accountability & Redress, P2.4 Inclusion & Non-Discrimination, P2.5 Independent Oversight |
| P3 | Ecosystem & Innovation | P3.1 Private Sector Participation, P3.2 Digital ID Use Cases, P3.3 Standards & Certification, P3.4 Developer Ecosystem, P3.5 Cross-Border Interoperability |
| P4 | Technology & DPI Integration | P4.1 ID System Architecture, P4.2 Data Exchange, P4.3 DPI Integration, P4.4 Cybersecurity & Resilience, P4.5 Digital Public Goods |
| P5 | Legal & Regulatory Foundations | P5.1 Legal Identity & Civil Registration, P5.2 Data Protection & Privacy, P5.3 Trust Services, P5.4 Emerging Tech Safeguards, P5.5 Legal Interoperability |
| P6 | Institutional Capacity & Governance | P6.1 Leadership & Coordination, P6.2 Skills & Capacity, P6.3 Vendor & Technical Management, P6.4 Institutional Accountability, P6.5 Financing & Sustainability |

**Totals:** 6 pillars · 30 sub-pillars · weights and indicators per sub-pillar defined in rubric config.

---

## Appendix: AILA Issues Not Replicated

| # | AILA Issue | Evidence | Decision |
|---|---|---|---|
| 1 | Survey/expert formula divides by `total×5`, producing 0–1 scale instead of 1–5 | `Survey!S3 = ((M3*5)+(N3*4)+(O3*3)+(P3*2)+(Q3*1))/(SUM(M3:Q3)*5)` | **Not replicated.** Use mean rating directly (1–5). |
| 2 | Indicator formula `raw×5/100` produces 0–5 scale | `Indicators!H3 = (G3*5)/100` → raw=100% gives 5.0, raw=0% gives 0.0 | **Not replicated.** Use `1+(raw/100)×4` (1–5 scale). |
| 3 | Survey (0–1) and indicators (0–5) summed directly — inconsistent scales | `Overview!F = SUM(C,D,E)` | **Not replicated.** All three components on 1–5 scale. |
| 4 | Pillar score = SUM of sub-pillar totals, so max varies by sub-pillar count | `Overview!G3 = SUM(F3:F6)` → Ecosystem max=4.0, Reg&Ethics max=3.0 | **Not replicated.** Use mean; all levels stay on 1–5. |
| 5 | Overall score not on a fixed scale (0 to ~3.67) | `Overview!H3 = (G3+G7+G11)/3` with G3 max=4, G11 max=3 | **Not replicated.** Mean of pillar means = 1–5 throughout. |
| 6 | Maturity bands defined on 1–5 but scores are on 0–3.67 — bands are miscalibrated | Maturity labels in rubric use 1–5 scale | **Bands preserved at 1–5.** Scores now correctly match. |
| 7 | Separate 70/30 post-hoc expert/survey blend double-counts expert weighting | Not in AILA itself; introduced in v1.0 of this spec | **Removed.** Weight budget in rubric already encodes the balance. |

---

*Version 3.0 · Issued against AILA_2_0_Manual_Calculation_Sheet.xlsx, Rubric_AILA.xlsx, Digital_ID_Assessment_Framework_FINAL.xlsx*
