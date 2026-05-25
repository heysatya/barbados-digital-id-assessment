import fs from 'fs';
import path from 'path';

export interface IndicatorDefinition {
  code: string;
  pillar_code: string;
  subpillar_code: string;
  subpillar_name?: string;
  description: string;
  weight: number;
  source?: string;
  normalization: string;
  max_value?: number;
  input_type?: 'numeric' | 'binary' | 'ternary';
  // NEW: Headless CMS Auto-Population Fields
  sheet_value?: number | null;
  sheet_year?: string;
  sheet_link?: string;
}

export function getIndicatorRegistry(): IndicatorDefinition[] {
  const indicators: IndicatorDefinition[] = [];

  try {
    const csvPath = path.join(process.cwd(), 'src', 'config', 'indicators_master.csv');

    if (!fs.existsSync(csvPath)) {
      console.warn("Notice: indicators_master.csv not found in src/config/. UI will show 0 indicators.");
      return [];
    }

    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = fileContent.split(/\r?\n/);

    let currentPillar = '';
    let currentSubpillar = '';
    let currentSource = '';
    let subpillarCounter = 1;

    const parseRow = (row: string) => {
      const result = [];
      let insideQuotes = false;
      let currentVal = '';
      for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '"' && row[i + 1] === '"') { currentVal += '"'; i++; }
        else if (char === '"') { insideQuotes = !insideQuotes; }
        else if (char === ',' && !insideQuotes) { result.push(currentVal); currentVal = ''; }
        else { currentVal += char; }
      }
      result.push(currentVal);
      return result;
    };

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const cols = parseRow(line);

      const pillarCol = cols[0]?.trim();
      const subpillarCol = cols[2]?.trim();
      const subpillarNameCol = cols[3]?.trim();
      const sourceCol = cols[5]?.trim();
      const descCol = cols[6]?.trim();

      // CMS Extraction Columns
      const dataColRaw = cols[7]?.trim() || '';
      const dataCol = dataColRaw.toLowerCase();
      const yearCol = cols[8]?.trim();
      const linkCol = cols[9]?.trim();

      if (pillarCol) currentPillar = pillarCol;
      if (subpillarCol) {
        currentSubpillar = subpillarCol;
        subpillarCounter = 1;
      }
      let currentSubpillarName = '';
      if (subpillarNameCol) {
        currentSubpillarName = subpillarNameCol;
      }
      if (sourceCol) currentSource = sourceCol;

      if (!descCol || descCol === '') continue;

      // Baseline Smart Inference (UI can override this later)
      const isBinary = dataCol === 'yes' || dataCol === 'no' || dataCol === 'exist';
      const inputType = isBinary ? 'binary' : 'numeric';

      let normalization = 'pct_to_5';
      let maxVal = 100;

      if (isBinary) {
        normalization = 'binary_map';
        maxVal = 100;
      } else {
        const parsedNum = parseFloat(dataColRaw);
        if (!isNaN(parsedNum) && parsedNum <= 1.0 && parsedNum >= 0 && !dataColRaw.includes('%')) {
          normalization = 'index_to_5';
          maxVal = 1.0;
        } else {
          normalization = 'pct_to_5';
          maxVal = 100;
        }
      }

      // Pre-Populate Values safely
      let sheetVal = null;
      if (dataCol) {
        if (isBinary) {
          sheetVal = (dataCol === 'yes' || dataCol === 'exist') ? 100 : 0;
        } else {
          const parsed = parseFloat(dataColRaw.replace(/[^0-9.-]/g, ''));
          if (!isNaN(parsed)) sheetVal = parsed;
        }
      }

      indicators.push({
        code: `IND.${currentSubpillar}.${String(subpillarCounter).padStart(2, '0')}`,
        pillar_code: currentPillar,
        subpillar_code: currentSubpillar,
        subpillar_name: currentSubpillarName,
        description: descCol.replace(/^;+|;+$/g, '').trim(),
        weight: 1,
        source: currentSource,
        normalization: normalization,
        max_value: maxVal,
        input_type: inputType,
        sheet_value: sheetVal,
        sheet_year: yearCol,
        sheet_link: linkCol
      });

      subpillarCounter++;
    }

  } catch (error) {
    console.error("Failed to parse indicators_master.csv:", error);
  }

  return indicators;
}