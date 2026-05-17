export interface ParsedTrackerResult {
  data: unknown;
  repairSteps: string[];
}

export function parseJsonTrackerResponse(content: string): ParsedTrackerResult {
  const repairSteps: string[] = [];
  const candidates = [
    content,
    stripFences(content),
    extractBalancedJson(content),
  ].filter((candidate): candidate is string => typeof candidate === 'string' && candidate.trim().length > 0);

  for (const candidate of candidates) {
    const normalized = normalizeJsonCandidate(candidate, repairSteps);
    try {
      return {
        data: JSON.parse(normalized),
        repairSteps: [...new Set(repairSteps)],
      };
    } catch {
      // Try the next candidate.
    }
  }

  throw new Error('The model did not return valid JSON tracker data.');
}

function stripFences(content: string): string {
  const trimmed = content.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fenced) return fenced[1].trim();

  const firstFence = trimmed.indexOf('```');
  if (firstFence === -1) return trimmed;
  const afterOpen = trimmed.indexOf('\n', firstFence);
  const lastFence = trimmed.lastIndexOf('```');
  if (afterOpen !== -1 && lastFence > afterOpen) {
    return trimmed.slice(afterOpen + 1, lastFence).trim();
  }
  return trimmed;
}

function normalizeJsonCandidate(content: string, repairSteps: string[]): string {
  let out = content.trim().replace(/\r\n?/g, '\n');
  if (out !== content.trim()) repairSteps.push('line-ending normalization');

  const smartQuoteNormalized = out.replace(/[\u201c\u201d\u201e\u201f]/g, '"');
  if (smartQuoteNormalized !== out) repairSteps.push('smart quote normalization');
  out = smartQuoteNormalized;

  const trailingCommaNormalized = removeTrailingCommas(out);
  if (trailingCommaNormalized !== out) repairSteps.push('trailing comma removal');
  out = trailingCommaNormalized;

  return out;
}

function removeTrailingCommas(content: string): string {
  let output = '';
  let inString = false;
  let escaped = false;

  for (let i = 0; i < content.length; i += 1) {
    const char = content[i];
    if (inString) {
      output += char;
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      output += char;
      continue;
    }

    if (char === ',') {
      let j = i + 1;
      while (/\s/.test(content[j] ?? '')) j += 1;
      if (content[j] === '}' || content[j] === ']') {
        continue;
      }
    }

    output += char;
  }

  return output;
}

function extractBalancedJson(content: string): string | undefined {
  for (let i = 0; i < content.length; i += 1) {
    const char = content[i];
    if (char !== '{' && char !== '[') continue;
    const end = findBalancedEnd(content, i);
    if (end !== undefined) return content.slice(i, end + 1);
  }
  return undefined;
}

function findBalancedEnd(content: string, start: number): number | undefined {
  const stack = [content[start] === '{' ? '}' : ']'];
  let inString = false;
  let escaped = false;

  for (let i = start + 1; i < content.length; i += 1) {
    const char = content[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === '{') stack.push('}');
    if (char === '[') stack.push(']');
    if (char === '}' || char === ']') {
      const expected = stack.pop();
      if (expected !== char) return undefined;
      if (stack.length === 0) return i;
    }
  }

  return undefined;
}
