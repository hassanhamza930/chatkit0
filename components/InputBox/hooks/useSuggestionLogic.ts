import { useState, useEffect, useCallback } from "react";
import { SuggestionInterface, ModelInterface } from "@/app/interfaces";
import { callOpenRouter } from "@/app/chat/logic/chatUtils";
import { availableModels } from "@/app/const";
import { parseSuggestionsFromModelResponse } from "../inputboxUtils";

interface UseSuggestionLogicProps {
  searchQuery: string;
  openrouterKey: string;
  setSearchQuery: (query: string) => void;
}

interface UseSuggestionLogicReturn {
  suggestions: SuggestionInterface[];
  showSuggestions: boolean;
  handleSuggestionClick: (suggestionText: string) => void;
}

export const useSuggestionLogic = ({
  searchQuery,
  openrouterKey,
  setSearchQuery,
}: UseSuggestionLogicProps): UseSuggestionLogicReturn => {
  const [suggestions, setSuggestions] = useState<SuggestionInterface[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchQuery.length > 2) {
        try {
          const geminiFlashModel: ModelInterface = availableModels.find(
            (model) => model.value === "google/gemini-2.5-flash-preview-05-20"
          )!;

          const messages = [
            {
              sender: "user" as "user",
              content: `Provide 3 search suggestions for the query "${searchQuery}". Format your response using <suggestion> tags, like this:
<suggestion>Suggestion text 1</suggestion>
<suggestion>Suggestion text 2</suggestion>
<suggestion>Suggestion text 3</suggestion>
`,
            },
          ];

          const modelResponse = await callOpenRouter({
            selectedModel: geminiFlashModel,
            openrouterkey: openrouterKey,
            messages: messages,
          });

          const parsedSuggestions = parseSuggestionsFromModelResponse(modelResponse);
          setSuggestions(parsedSuggestions);
          setShowSuggestions(parsedSuggestions.length > 0);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, openrouterKey, setSearchQuery]);

  const handleSuggestionClick = useCallback(
    (suggestionText: string) => {
      setSearchQuery(suggestionText);
      setSuggestions([]);
      setShowSuggestions(false);
    },
    [setSearchQuery]
  );

  return { suggestions, showSuggestions, handleSuggestionClick };
};
