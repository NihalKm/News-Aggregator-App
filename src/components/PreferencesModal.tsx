import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import '../App.css'

interface PreferencesModalProps {
  availableSources: string[];
  availableCategories: string[];
  availableAuthors: string[];
  savedSources: string[];
  savedCategories: string[];
  savedAuthors: string[];
  onSave: (selectedSources: string[], selectedCategories: string[], selectedAuthors: string[]) => void;
}

const CheckBoxComponent: React.FC<{label:string, value:boolean, onChange:(e) => void}> = (props) => {
  const { label, value, onChange,  } = props;
  return (
    <FormControlLabel key={label} label={label}
      control={<Checkbox  onChange={e => onChange(e)}
      checked={value} value={label} size="small" />} 
    />
  )
}

const PreferencesModal: React.FC<PreferencesModalProps> = ({ availableSources, availableCategories, availableAuthors, savedSources, savedCategories, savedAuthors, onSave }) => {
  const [selectedSources, setSelectedSources] = useState<string[]>(savedSources);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(savedCategories);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(savedAuthors);

  const handleSave = () => {
    onSave(selectedSources, selectedCategories, selectedAuthors);
    const preferences = {
      selectedSources,
      selectedCategories,
      selectedAuthors,
    };
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }

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
      <h4 style={{margin:"8px 0px"}}>Sources</h4>
      <Stack flexDirection={"row"} flexWrap={"wrap"}>
        {
          availableSources.map((source, idx) => (
            <CheckBoxComponent key={idx} label={source} value={selectedSources.includes(source)} onChange={(e)=>handleChange(e, selectedSources, setSelectedSources, source)} />
          ))
        }
      </Stack>

      {/* Categories */}
      <h4 style={{margin:"8px 0px"}}>Categories</h4>
      <Stack flexDirection={"row"} flexWrap={"wrap"} textTransform={"capitalize"}>
        {
          availableCategories.map((category, idx) => (
            <CheckBoxComponent key={idx} label={category} value={selectedCategories.includes(category)} onChange={(e)=>handleChange(e, selectedCategories, setSelectedCategories, category)} />
          ))
        }
      </Stack>

      {/* Authors */}
      <h4 style={{margin:"8px 0px"}}>Authors</h4>
      <Stack flexDirection={"row"} flexWrap={"wrap"}>
        {
          availableAuthors.map((author, idx) => (
            <CheckBoxComponent key={idx} label={author} value={selectedAuthors.includes(author)} onChange={(e) => handleChange(e, selectedAuthors, setSelectedAuthors, author)} />
          ))
        }
      </Stack>
      <Stack sx={{width:"100%", alignItems:"center", mt:2}}>
        <Button variant="contained" sx={{width:{xs:"100%", sm:"50%"}, background:"#828b93"}} onClick={handleSave} startIcon={<SaveIcon />} >
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default PreferencesModal;