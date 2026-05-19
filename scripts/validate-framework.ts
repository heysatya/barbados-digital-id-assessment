import fs from 'fs';
import path from 'path';

// Import using require for JSON to avoid TS module resolution issues
const rubricConfigPath = path.join(process.cwd(), 'src/config/rubric_config.json');
const rubric = JSON.parse(fs.readFileSync(rubricConfigPath, 'utf8'));

import { frameworkQuestions } from '../src/data/frameworkQuestions';

function runValidation() {
  let errors = 0;
  
  // 1. 170 Total Questions (90 expert, 80 stakeholder)
  if (frameworkQuestions.length !== 170) {
    console.error(`❌ Expected 170 questions, found ${frameworkQuestions.length}`);
    errors++;
  }
  
  const expertCount = frameworkQuestions.filter(q => q.survey_type === 'expert').length;
  if (expertCount !== 90) {
    console.error(`❌ Expected 90 expert questions, found ${expertCount}`);
    errors++;
  }
  
  const neCount = frameworkQuestions.filter(q => q.survey_type === 'stakeholder').length;
  if (neCount !== 80) {
    console.error(`❌ Expected 80 stakeholder questions, found ${neCount}`);
    errors++;
  }

  // Gather rubric questions
  const rubricQuestions = new Set<string>();
  const subpillarExpertCounts: Record<string, number> = {};
  const subpillarNECounts: Record<string, number> = {};
  
  for (const sp in rubric.subpillars) {
    subpillarExpertCounts[sp] = 0;
    subpillarNECounts[sp] = 0;
    
    for (const q in rubric.subpillars[sp].questions) {
      if (q.includes('.EX.') || q.includes('.NE.')) {
        rubricQuestions.add(q);
      }
    }
  }

  // 2. Every app question has a matching scoring item in rubric_config.json
  const appQCodes = new Set<string>();
  
  frameworkQuestions.forEach(q => {
    if (appQCodes.has(q.q_code)) {
      console.error(`❌ Duplicate q_code found: ${q.q_code}`);
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
    
    // 5. all answer options have scores 1-5 and 9
    const scores = q.options.map(o => o.score);
    const expectedScores = [1, 2, 3, 4, 5, 9];
    for (const s of expectedScores) {
      if (!scores.includes(s as 1 | 2 | 3 | 4 | 5 | 9)) {
        console.error(`❌ Question ${q.q_code} is missing option for score ${s}`);
        errors++;
      }
    }
    
    // 6. all questions include allow_unknown: true
    if (q.allow_unknown !== true) {
      console.error(`❌ Question ${q.q_code} does not have allow_unknown = true`);
      errors++;
    }
  });

  // 3. Every rubric scoring question has a matching app question
  rubricQuestions.forEach(q => {
    if (!appQCodes.has(q)) {
      console.error(`❌ Question ${q} exists in rubric_config.json but not in app`);
      errors++;
    }
  });

  // 4. every expert sub-pillar has exactly 3 expert questions
  // and stakeholder sub-pillars follow the 2-3 question distribution
  for (const sp in rubric.subpillars) {
    if (subpillarExpertCounts[sp] !== 3) {
      console.error(`❌ Sub-pillar ${sp} should have exactly 3 expert questions, found ${subpillarExpertCounts[sp]}`);
      errors++;
    }
    
    const neCount = subpillarNECounts[sp];
    if (neCount < 2 || neCount > 3) {
      console.error(`❌ Sub-pillar ${sp} has invalid stakeholder question count: ${neCount}`);
      errors++;
    }
  }

  if (errors > 0) {
    console.error(`\\n💥 Validation failed with ${errors} errors.`);
    process.exit(1);
  } else {
    console.log("✅ Framework validation passed successfully.");
  }
}

runValidation();
