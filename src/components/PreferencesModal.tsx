import React, { useState } from 'react';

interface PreferencesModalProps {
  sources: string[];
  categories: string[];
  authors: string[];
  onSave: (selectedSources: string[], selectedCategories: string[], selectedAuthors: string[]) => void;
}

const PreferencesModal: React.FC<PreferencesModalProps> = ({ sources, categories, authors, onSave }) => {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  const handleSave = () => {
    onSave(selectedSources, selectedCategories, selectedAuthors);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd' }}>
      <h2>Customize Your Feed</h2>
      
      {/* Sources */}
      <h4>Sources</h4>
      {sources.map((source) => (
        <div key={source}>
          <input
            type="checkbox"
            value={source}
            checked={selectedSources.includes(source)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedSources([...selectedSources, source]);
              } else {
                setSelectedSources(selectedSources.filter((s) => s !== source));
              }
            }}
          />
          {source}
        </div>
      ))}

      {/* Categories */}
      <h4>Categories</h4>
      {categories.map((category) => (
        <div key={category}>
          <input
            type="checkbox"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedCategories([...selectedCategories, category]);
              } else {
                setSelectedCategories(selectedCategories.filter((c) => c !== category));
              }
            }}
          />
          {category}
        </div>
      ))}

      {/* Authors */}
      <h4>Authors</h4>
      {authors.map((author) => (
        <div key={author}>
          <input
            type="checkbox"
            value={author}
            checked={selectedAuthors.includes(author)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedAuthors([...selectedAuthors, author]);
              } else {
                setSelectedAuthors(selectedAuthors.filter((a) => a !== author));
              }
            }}
          />
          {author}
        </div>
      ))}

      <button onClick={handleSave} style={{ marginTop: '20px', padding: '10px' }}>
        Save Preferences
      </button>
    </div>
  );
};

export default PreferencesModal;

{/* <FormControlLabel 
control={<Checkbox onChange={(e) => {
  if (e.target.checked) {
    setSelectedSources([...selectedSources, source]);
  } else {
    setSelectedSources(selectedSources.filter((s) => s !== source));
  }
}} 
checked={selectedSources.includes(source)} label={source} value={source} key={source} size="small" />} label={source} /> */}
