import { useEffect, useState } from 'react';

const useFilters = () => {
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');

  return { source, setSource, category, setCategory };
};

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return { searchTerm, setSearchTerm };
};

const usePreferences = () => {
  const storedPreferences = localStorage.getItem("preferences") || "{}";
  const [sources, setSources] = useState<string[]>(JSON.parse(storedPreferences).selectedSources || []);
  const [categories, setCategories] = useState<string[]>(JSON.parse(storedPreferences).selectedCategories || []);
  const [authors, setAuthors] = useState<string[]>(JSON.parse(storedPreferences).selectedAuthors || []);

  return {
    sources,
    setSources,
    categories,
    setCategories,
    authors,
    setAuthors,
  };
};

export { useFilters, useSearch, usePreferences }; 
