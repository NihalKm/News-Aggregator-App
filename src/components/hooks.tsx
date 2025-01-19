import { useState } from 'react';

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
  const [sources, setSources] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);

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
