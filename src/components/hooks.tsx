import { useState } from 'react';

const usePreferences = (availableSources:string[]) => {
  const storedPreferences = localStorage.getItem("preferences") || "{}";
  const parsedPreferences = JSON.parse(storedPreferences);
  //To set default sources if no preferences are stored
  const [sources, setSources] = useState<string[]>(parsedPreferences.selectedSources ? parsedPreferences.selectedSources : availableSources);
  const [categories, setCategories] = useState<string[]>(parsedPreferences.selectedCategories || []);
  const [authors, setAuthors] = useState<string[]>(parsedPreferences.selectedAuthors || []);

  return {
    sources,
    setSources,
    categories,
    setCategories,
    authors,
    setAuthors,
  };
};

export { usePreferences }; 
