/* eslint-disable @typescript-eslint/no-require-imports */
const xlsx = require('xlsx');
const fs = require('fs');

const rubric = JSON.parse(fs.readFileSync('src/config/rubric_config.json', 'utf8'));
const allowedQCodes = new Set();
for (const subpillarKey in rubric.subpillars) {
  const subpillar = rubric.subpillars[subpillarKey];
  for (const qKey in subpillar.questions) {
    if (qKey.includes('.EX.') || qKey.includes('.NE.')) {
      allowedQCodes.add(qKey);
    }
  }
}

const workbook = xlsx.readFile('Digital_ID_Assessment_Framework.xlsx');
const sheet = workbook.Sheets['Survey Response Choices'];
const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

const questions = [];

for (let i = 3; i < rows.length; i++) {
  const row = rows[i];
  if (!row || row.length < 5) continue;
  
  const rawQCode = row[1]; // P1.1.Q1
  const pillarName = row[2];
  const subPillarName = row[3];
  const questionText = row[4];
  const respondentType = row[5];
  
  const desc1 = row[6] || "";
  const desc2 = row[7] || "";
  const desc3 = row[8] || "";
  const desc4 = row[9] || "";
  const desc5 = row[10] || "";

  if (!rawQCode) continue;

  const parts = rawQCode.split('.');
  if (parts.length !== 3) continue;
  
  const pillarCode = parts[0]; // P1
  const subPillarCode = `${parts[0]}.${parts[1]}`; // P1.1
  
  let qType = respondentType === 'Expert' ? 'EX' : 'NE';
  let surveyType = respondentType === 'Expert' ? 'expert' : 'stakeholder';
  let qNum = parts[2]; // Q1
  
  let finalQCode = `${subPillarCode}.${qType}.${qNum}`;

  if (!allowedQCodes.has(finalQCode)) {
    // skip questions not in the new rubric
    continue;
  }

  questions.push({
    q_code: finalQCode,
    pillar_code: pillarCode,
    pillar_name: pillarName,
    subpillar_code: subPillarCode,
    subpillar_name: subPillarName,
    survey_type: surveyType,
    question_text: questionText,
    options: [
      { score: 1, label: "1 - Basic", description: desc1 },
      { score: 2, label: "2 - Opportunistic", description: desc2 },
      { score: 3, label: "3 - Systematic", description: desc3 },
      { score: 4, label: "4 - Differentiating", description: desc4 },
      { score: 5, label: "5 - Transformational", description: desc5 },
      { score: 9, label: "I don't know", description: "I do not have enough information to answer this question." }
    ],
    allow_unknown: true
  });
}

console.log("Extracted questions count:", questions.length);

const expertCount = questions.filter(q => q.survey_type === 'expert').length;
const stakeholderCount = questions.filter(q => q.survey_type === 'stakeholder').length;
console.log(`Expert: ${expertCount}, Stakeholder: ${stakeholderCount}`);

const outContent = `export type FrameworkQuestion = {
  q_code: string;
  pillar_code: string;
  pillar_name: string;
  subpillar_code: string;
  subpillar_name: string;
  survey_type: "expert" | "stakeholder";
  question_text: string;
  options: {
    score: 1 | 2 | 3 | 4 | 5 | 9;
    label: string;
    description: string;
  }[];
  allow_unknown: boolean;
};

export const frameworkQuestions: FrameworkQuestion[] = ${JSON.stringify(questions, null, 2)};
`;

fs.writeFileSync('src/data/frameworkQuestions.ts', outContent);
console.log("Wrote src/data/frameworkQuestions.ts");
