import fs from 'fs';
import path from 'path';
import { frameworkQuestions } from '../src/data/frameworkQuestions';
import { getIndicatorRegistry } from '../src/data/indicatorRegistry';

const rubricConfigPath = path.join(process.cwd(), 'src/config/rubric_config.json');
const rubric = JSON.parse(fs.readFileSync(rubricConfigPath, 'utf8'));

function reconcile() {
  console.log("Starting Rubric & Indicators Reconciliation...");
  console.log(`Original Rubric Version: ${rubric.version}`);

  // 1. Get active framework questions
  const activeFrameworkQCodes = new Set(frameworkQuestions.map(q => q.q_code));
  console.log(`Loaded ${activeFrameworkQCodes.size} active question codes from frameworkQuestions.ts`);

  // 2. Get registered indicators
  const registeredIndicators = getIndicatorRegistry();
  console.log(`Loaded ${registeredIndicators.length} indicators from indicatorRegistry.ts`);

  // Group indicators by subpillar
  const indicatorsBySubpillar: Record<string, typeof registeredIndicators> = {};
  registeredIndicators.forEach(ind => {
    if (!indicatorsBySubpillar[ind.subpillar_code]) {
      indicatorsBySubpillar[ind.subpillar_code] = [];
    }
    indicatorsBySubpillar[ind.subpillar_code].push(ind);
  });

  let removedQuestionsCount = 0;
  let addedIndicatorsCount = 0;
  let subpillarsUpdated = 0;

  for (const [spCode, spConfig] of Object.entries<any>(rubric.subpillars)) {
    const componentBudgets = spConfig.component_budgets;
    const questions = spConfig.questions;
    
    // Categorize remaining active questions by component
    const remainingActiveQuestions: Record<string, string[]> = {
      expert: [],
      survey: []
    };

    // Filter expert and survey questions: only keep those that exist in frameworkQuestions
    const newQuestionsConfig: Record<string, any> = {};

    for (const [qCode, qConfig] of Object.entries<any>(questions)) {
      if (qCode.startsWith('IND.')) {
        // Skip existing indicators, we will rebuild them from the indicator registry
        continue;
      }
      
      if (activeFrameworkQCodes.has(qCode)) {
        newQuestionsConfig[qCode] = qConfig;
        const comp = qConfig.component; // 'expert' or 'survey'
        remainingActiveQuestions[comp].push(qCode);
      } else {
        removedQuestionsCount++;
        console.log(`Removing missing question: ${qCode} from subpillar ${spCode}`);
      }
    }

    // Now, rebuild indicators for this subpillar from registry
    const subpillarInds = indicatorsBySubpillar[spCode] || [];
    const indBudget = componentBudgets.indicator || 0;

    if (subpillarInds.length > 0) {
      if (indBudget > 0) {
        // Calculate equal weights for indicators
        const indCount = subpillarInds.length;
        const baseWeight = Number((indBudget / indCount).toFixed(4));
        
        subpillarInds.forEach((ind, index) => {
          let indWeight = baseWeight;
          if (index === 0) {
            // Adjust first weight for rounding
            const tempSum = baseWeight * indCount;
            const diff = Number((indBudget - tempSum).toFixed(4));
            indWeight = Number((baseWeight + diff).toFixed(4));
          }

          newQuestionsConfig[ind.code] = {
            weight: indWeight,
            component: 'indicator',
            zero_weight: false,
            source: ind.source || 'Unknown',
            normalization: ind.normalization || 'pct_to_5',
            description: ind.description
          };
          addedIndicatorsCount++;
        });
      } else {
        // If the indicator budget is 0, add them with zero weight
        subpillarInds.forEach(ind => {
          newQuestionsConfig[ind.code] = {
            weight: 0.0,
            component: 'indicator',
            zero_weight: true,
            source: ind.source || 'Unknown',
            normalization: ind.normalization || 'pct_to_5',
            description: ind.description
          };
          addedIndicatorsCount++;
        });
      }
    }

    // Redistribute weights for expert and survey components in this subpillar
    for (const component of ['expert', 'survey']) {
      const activeQs = remainingActiveQuestions[component];
      const budget = componentBudgets[component] || 0;

      if (activeQs.length === 0) continue;

      // Sort question codes alphabetically to assign weights consistently
      activeQs.sort();

      if (activeQs.length === 3) {
        // 40% / 35% / 25% of budget
        const w1 = Number((budget * 0.40).toFixed(4));
        const w2 = Number((budget * 0.35).toFixed(4));
        const w3 = Number((budget * 0.25).toFixed(4));

        const sum = Number((w1 + w2 + w3).toFixed(4));
        const diff = Number((budget - sum).toFixed(4));
        const finalW1 = Number((w1 + diff).toFixed(4));

        newQuestionsConfig[activeQs[0]].weight = finalW1;
        newQuestionsConfig[activeQs[1]].weight = w2;
        newQuestionsConfig[activeQs[2]].weight = w3;

      } else if (activeQs.length === 2) {
        // 55% / 45% of budget
        const w1 = Number((budget * 0.55).toFixed(4));
        const w2 = Number((budget * 0.45).toFixed(4));

        const sum = Number((w1 + w2).toFixed(4));
        const diff = Number((budget - sum).toFixed(4));
        const finalW1 = Number((w1 + diff).toFixed(4));

        newQuestionsConfig[activeQs[0]].weight = finalW1;
        newQuestionsConfig[activeQs[1]].weight = w2;
      } else if (activeQs.length === 1) {
        // 100% of budget
        newQuestionsConfig[activeQs[0]].weight = budget;
      }
    }

    // Double check that the total sum of question weights in this subpillar matches exactly 1.0000
    let totalWeight = 0;
    for (const qConfig of Object.values<any>(newQuestionsConfig)) {
      totalWeight += qConfig.weight;
    }
    
    const roundedTotal = Number(totalWeight.toFixed(4));
    if (Math.abs(roundedTotal - 1.0) > 0.0001) {
      console.warn(`Warning: Subpillar ${spCode} total weight is ${roundedTotal}, not 1.0! Adjusting...`);
      const firstQ = Object.keys(newQuestionsConfig)[0];
      const diff = Number((1.0 - roundedTotal).toFixed(4));
      newQuestionsConfig[firstQ].weight = Number((newQuestionsConfig[firstQ].weight + diff).toFixed(4));
    }

    spConfig.questions = newQuestionsConfig;
    subpillarsUpdated++;
  }

  // Update rubric metadata
  rubric.version = "1.2";
  rubric.description = "Digital ID Assessment Framework — Rubric Configuration v1.2. Synchronized with active questions in frameworkQuestions.ts and dynamic indicators from indicators_master.csv. All weights redistributed pro-rata and verified.";

  // Write reconciled rubric_config.json
  fs.writeFileSync(rubricConfigPath, JSON.stringify(rubric, null, 2), 'utf8');

  console.log("\nReconciliation completed successfully!");
  console.log(`Total missing Q3 questions removed: ${removedQuestionsCount}`);
  console.log(`Total active indicators synchronized: ${addedIndicatorsCount}`);
  console.log(`Total subpillars updated: ${subpillarsUpdated}`);
  console.log(`New Rubric Version saved: ${rubric.version}`);
}

reconcile();
