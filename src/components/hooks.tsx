import { useState } from 'react';

const usePreferences = (availableSources:string[]) => {
  const storedPreferences = localStorage.getItem("preferences") || "{}";
  const parsedPreferences = JSON.parse(storedPreferences);
  //To set default sources if no preferences are stored
  const [sources, setSources] = useState<string[]>(parsedPreferences.selectedSources ? parsedPreferences.selectedSources : availableSources);
  const [category, setCategory] = useState<string>(parsedPreferences.selectedCategory || "");
  const [authors, setAuthors] = useState<string[]>(parsedPreferences.selectedAuthors || []);

  return {
    sources,
    setSources,
    category,
    setCategory,
    authors,
    setAuthors,
  };
};

export { usePreferences }; 
