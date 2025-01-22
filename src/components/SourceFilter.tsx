import React from 'react';
import { Checkbox, FormControl, ListItemText, MenuItem, Select } from '@mui/material';

interface SourceFilterProps {
  sources: string[];
  selectedSource: string[];
  onSelectSource: (source: string[]) => void;
}

const SourceFilter: React.FC<SourceFilterProps> = ({ sources, selectedSource, onSelectSource }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: {xs: 150, lg:200}, maxWidth: {xs:150, lg:200} }} size="small">
      <Select
        sx={{background:"white"}}
        value={selectedSource}
        multiple
        displayEmpty
        renderValue={(selected) => selected.length === 0 ? "Select Source" : selected.length===sources.length ? "All Sources" : (selected as string[]).join(', ')}
        onChange={(e) => {
          var { target: { value }, } = e;
          const isSelectAll = value.includes("Select All");
          if (isSelectAll) {
            if (value.length===sources.length+1) value = []; else value = sources;
          } 
          const newValue = typeof value === 'string' ? value.split(',') : value;
          onSelectSource(newValue);
        }}
      >
        <MenuItem value={"Select All"}>
          <Checkbox checked={sources.length===selectedSource.length} />
          <ListItemText primary={"Select All"} />
        </MenuItem>
        {
          sources.map((source) => (
            <MenuItem key={source} value={source}>
              <Checkbox checked={selectedSource.includes(source)} />
              <ListItemText primary={source} />
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

export default SourceFilter;
