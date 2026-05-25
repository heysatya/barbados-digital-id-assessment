import fs from 'fs';
import path from 'path';
import { frameworkQuestions } from '../src/data/frameworkQuestions';
import { getIndicatorRegistry } from '../src/data/indicatorRegistry';

// Import using require for JSON to avoid TS module resolution issues
const rubricConfigPath = path.join(process.cwd(), 'src/config/rubric_config.json');
const rubric = JSON.parse(fs.readFileSync(rubricConfigPath, 'utf8'));

function runValidation() {
  let errors = 0;
  
  console.log("=== Running Digital ID Assessment Integrity Check ===");
  console.log(`Rubric Version: ${rubric.version}`);
  console.log(`Total Active Framework Questions: ${frameworkQuestions.length}`);

  // 1. 135 Total Questions (75 expert, 60 stakeholder)
  if (frameworkQuestions.length !== 135) {
    console.error(`❌ Expected 135 questions, found ${frameworkQuestions.length}`);
    errors++;
  }
  
  const expertCount = frameworkQuestions.filter(q => q.survey_type === 'expert').length;
  if (expertCount !== 75) {
    console.error(`❌ Expected 75 expert questions, found ${expertCount}`);
    errors++;
  }
  
  const neCount = frameworkQuestions.filter(q => q.survey_type === 'stakeholder').length;
  if (neCount !== 60) {
    console.error(`❌ Expected 60 stakeholder questions, found ${neCount}`);
    errors++;
  }

  // Gather rubric questions and indicators
  const rubricQuestions = new Set<string>();
  const rubricIndicators = new Set<string>();
  const subpillarExpertCounts: Record<string, number> = {};
  const subpillarNECounts: Record<string, number> = {};
  
  for (const sp in rubric.subpillars) {
    subpillarExpertCounts[sp] = 0;
    subpillarNECounts[sp] = 0;
    
    // Check total subpillar weight sums to exactly 1.0
    let subpillarWeightSum = 0;

    for (const q in rubric.subpillars[sp].questions) {
      const qConfig = rubric.subpillars[sp].questions[q];
      subpillarWeightSum += qConfig.weight;

      if (q.startsWith('IND.')) {
        rubricIndicators.add(q);
      } else {
        rubricQuestions.add(q);
      }
    }

    const roundedWeight = Number(subpillarWeightSum.toFixed(4));
    if (Math.abs(roundedWeight - 1.0) > 0.0001) {
      console.error(`❌ Sub-pillar ${sp} total weight is ${roundedWeight}, expected exactly 1.0`);
      errors++;
    }
  }

  // 2. Every active framework question has a matching scoring item in rubric_config.json
  const appQCodes = new Set<string>();
  
  frameworkQuestions.forEach(q => {
    if (appQCodes.has(q.q_code)) {
      console.error(`❌ Duplicate q_code found in framework: ${q.q_code}`);
      errors++;
    }
    appQCodes.add(q.q_code);

    if (!rubricQuestions.has(q.q_code)) {
      console.error(`❌ Question ${q.q_code} exists in app but not in rubric_config.json`);
      errors++;
    }

    if (q.survey_type === 'expert') {
      subpillarExpertCounts[q.subpillar_code] = (subpillarExpertCounts[q.subpillar_code] || 0) + 1;
    } else {
      subpillarNECounts[q.subpillar_code] = (subpillarNECounts[q.subpillar_code] || 0) + 1;
    }
    
    // all answer options have scores 1-5 and 9
    const scores = q.options.map(o => o.score);
    const expectedScores = [1, 2, 3, 4, 5, 9];
    for (const s of expectedScores) {
      if (!scores.includes(s as any)) {
        console.error(`❌ Question ${q.q_code} is missing option for score ${s}`);
        errors++;
      }
    }
    
    // all questions include allow_unknown: true
    if (q.allow_unknown !== true) {
      console.error(`❌ Question ${q.q_code} does not have allow_unknown = true`);
      errors++;
    }
  });

  // 3. Every rubric scoring question has a matching active framework question
  rubricQuestions.forEach(q => {
    if (!appQCodes.has(q)) {
      console.error(`❌ Question ${q} exists in rubric_config.json but not in active frameworkQuestions`);
      errors++;
    }
  });

  // 4. Validate indicator registry and rubric alignment
  const registry = getIndicatorRegistry();
  const registryCodes = new Set(registry.map(ind => ind.code));
  
  rubricIndicators.forEach(indCode => {
    if (!registryCodes.has(indCode)) {
      console.error(`❌ Indicator ${indCode} exists in rubric_config.json but not in indicatorRegistry.ts`);
      errors++;
    }
  });

  registryCodes.forEach(registryCode => {
    if (!rubricIndicators.has(registryCode)) {
      console.error(`❌ Indicator ${registryCode} exists in indicatorRegistry.ts but not in rubric_config.json`);
      errors++;
    }
  });

  // 5. expert and stakeholder sub-pillar counts should be either 2 or 3
  for (const sp in rubric.subpillars) {
    const expCount = subpillarExpertCounts[sp] || 0;
    if (expCount < 2 || expCount > 3) {
      console.error(`❌ Sub-pillar ${sp} has invalid expert question count: ${expCount}`);
      errors++;
    }
    
    const neCount = subpillarNECounts[sp] || 0;
    if (neCount < 2 || neCount > 3) {
      console.error(`❌ Sub-pillar ${sp} has invalid stakeholder question count: ${neCount}`);
      errors++;
    }
  }

  if (errors > 0) {
    console.error(`\n💥 Integrity check failed with ${errors} errors.`);
    process.exit(1);
  } else {
    console.log("✅ Integrity check passed successfully! Rubric is 100% consistent with framework questions and indicators.");
  }
}

runValidation();
