import { SuggestionInterface } from "@/app/interfaces";

export function parseSuggestionsFromModelResponse(responseText: string): SuggestionInterface[] {
  const suggestions: SuggestionInterface[] = [];
  const regex = /<suggestion>(.*?)<\/suggestion>/g;
  let match;

  while ((match = regex.exec(responseText)) !== null) {
    if (match[1]) {
      suggestions.push({ text: match[1].trim() });
    }
  }
  return suggestions;
}
