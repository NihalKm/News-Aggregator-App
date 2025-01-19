import React from 'react';

interface SourceFilterProps {
  sources: string[];
  selectedSource: string;
  onSelectSource: (source: string) => void;
}

const SourceFilter: React.FC<SourceFilterProps> = ({ sources, selectedSource, onSelectSource }) => {
  return (
    <select
      value={selectedSource}
      onChange={(e) => onSelectSource(e.target.value)}
      style={{ margin: '10px', padding: '8px' }}
    >
      <option value="">All Sources</option>
      {sources.map((source) => (
        <option key={source} value={source}>
          {source}
        </option>
      ))}
    </select>
  );
};

export default SourceFilter;
