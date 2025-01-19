import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 200, maxWidth: 200 }} size="small">
      <InputLabel id="demo-select-small-label">Category</InputLabel>
      <Select 
        sx={{background:"white"}}
        value={selectedCategory}
        label="Source"
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <MenuItem value="">
          <em>All Categories</em>
        </MenuItem>
        {
          categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
