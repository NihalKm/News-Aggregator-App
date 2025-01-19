import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, IconButton, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import '../App.css'

interface PreferencesModalProps {
  sources: string[];
  categories: string[];
  authors: string[];
  onSave: (selectedSources: string[], selectedCategories: string[], selectedAuthors: string[]) => void;
}

const CheckBoxComponent: React.FC<{label:string, value:boolean, onChange:(e) => void}> = (props) => {
  const { label, value, onChange,  } = props;
  return (
    <FormControlLabel key={label} label={label}
      control={<Checkbox  onChange={e => onChange(e)}
      checked={value} label={label} value={label} size="small" />} 
    />
  )
}

const PreferencesModal: React.FC<PreferencesModalProps> = ({ sources, categories, authors, onSave }) => {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  const handleSave = () => {
    onSave(selectedSources, selectedCategories, selectedAuthors);
  };

  const handleChange = (event, currentList:string[], setFunction:(e)=>void, item:string ) => {
    if (event.target.checked) {
      setFunction([...currentList, item]);
    } else {
      setFunction(currentList.filter((s) => s !== item));
    }
  }

  return (
    <Stack style={{ padding: '20px', borderBottom: '4px solid #3d3b3b', borderRadius: "30px" }}>
      <h2>Customize Your Feed</h2>
      {/* Sources */}
      <h5>Sources</h5>
      {sources.map((source) => (
        <CheckBoxComponent label={source} value={selectedSources.includes(source)} onChange={(e)=>handleChange(e, selectedSources, setSelectedSources, source)} />
      ))}

      {/* Categories */}
      <h5>Categories</h5>
      {categories.map((category) => (
        <CheckBoxComponent label={category} value={selectedCategories.includes(category)} onChange={(e)=>handleChange(e, selectedCategories, setSelectedCategories, category)} />
      ))}

      {/* Authors */}
      <h5>Authors</h5>
      {authors.map((author) => (
        <CheckBoxComponent label={author} value={selectedAuthors.includes(author)} onChange={(e)=>handleChange(e, selectedAuthors, setSelectedAuthors, author)} />
      ))}
      <Stack sx={{width:"100%", alignItems:"center"}}>
        <Button variant="contained" style={{width:{xs:"100%", sm:"50%"}, background:"#828b93"}} onClick={handleSave} startIcon={<SaveIcon />} >
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default PreferencesModal;