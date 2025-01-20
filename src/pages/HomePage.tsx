import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar.tsx';
import SourceFilter from '../components/SourceFilter.tsx';
import CategoryFilter from '../components/CategoryFilter.tsx';
import PreferencesModal from '../components/PreferencesModal.tsx';
import { usePreferences } from '../components/hooks.tsx';
import { fetchGuardianData, fetchNewsApiData, fetchNYTData } from '../api/fetchAggregatedData.ts';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Divider, Drawer, Stack } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NewsCard, NewsCardSkeleton } from '../components/NewsCard.tsx';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import TuneIcon from '@mui/icons-material/Tune';

interface DateSelectionType {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string;
}

const HomePage: React.FC = () => {
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // State to manage preferences
  const availableSources = [
    "New York Times",
    "News API",
    "The Guardian"
  ];
  const { sources, setSources, categories, setCategories, authors, setAuthors } = usePreferences(availableSources);
  const [ dateDrawer, setDateDrawer ] = useState(false);
  const [ preferencesOpen, setPreferencesOpen ] = useState(false);
  const [ availableAuthors, setAvailableAuthors ] = useState([
    "Karissa Bell",
    "Bradley Hope",
    "Kylie Mohr",
    "Daniel Cooper",
    "Mariella Moon",
    "Jessica Conditt",
    "Lawrence Bonk",
    "Billy Steele",
    "Kathy Willis",
    "Brian Barrett",
    "Matt Burgess",
    "Eric Geller",
    "Joseph Howlett",
    "Pete Etchells",
    "Chris Welch"
  ]);
  // const [ sourceOptions, setSourceOptions ] = useState([]);
  // const [ categoryOptions, setCategoryOptions ] = useState([]);
  const [ selectionRange, setSelectionRange ] = useState<DateSelectionType>({
    startDate: undefined,
    endDate: undefined,
    key: 'selection',
  });

  const availableCategories1 = [
    "business", 
    "entertainment", 
    "general", 
    "health", 
    "science", 
    "sports", 
    "technology"
  ];

  const handleSavePreferences = (selectedSources: string[], selectedCategories: string[], selectedAuthors: string[]) => {
    setSources(selectedSources);
    setCategories(selectedCategories);
    setAuthors(selectedAuthors);
    setPreferencesOpen(false);
    fetchData();
  };

  const [articles, setArticles] = useState<any[]>([]);
  const [articlesAfterFilter, setArticlesAfterFilter] = useState<any[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[] | any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dummyItems = Array.from({ length: 12 }, (_, id) => id + 1);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      // Create a mapping of sources to their respective fetch functions
      const sourceFetchers: Record<string, Function> = {
        'News API': fetchNewsApiData,
        'The Guardian': fetchGuardianData,
        'New York Times': fetchNYTData,
      };

      // Push relevant promises into the array based on the selected sources
      const promises = Object.keys(sourceFetchers)
        .map((source) => sourceFetchers[source](searchTerm)); // Map to fetch functions

      // Wait for all promises to resolve and combine the results
      const combinedResults = (await Promise.all(promises)).flat();
      const uniqueCategories = new Set();
      const uniqueAuthors = new Set();
      combinedResults.forEach((x) => {
        uniqueCategories.add(x.category);
        uniqueAuthors.add(x.author);
      });
      const uniqueCategoriesArray = [...uniqueCategories];
      const uniqueAuthorsArray = [...uniqueAuthors];
      setAvailableCategories(uniqueCategoriesArray);

      setArticles(combinedResults);
      setArticlesAfterFilter(combinedResults);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);   

  // Filter data whenever filters change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        console.log(category,sources,articles)
        var result = [];
        // Filter based on sources and categories
        articles.forEach((article) => {
          if (sources.includes(article.sourceName) && (category === '' || category === article.category)) {
            result.push(article);
          }
        });
        setArticlesAfterFilter(result);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category, sources]);

  const handleSelect = (ranges:{selection:DateSelectionType}) => {
    setSelectionRange({ ...ranges.selection });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer PaperProps={{sx:{borderRadius: "0px 0px 30px 30px"}}} anchor={"top"} open={preferencesOpen} onClose={()=>setPreferencesOpen(false)}>
        <PreferencesModal
          availableSources={availableSources}
          availableCategories={availableCategories1}
          availableAuthors={availableAuthors}
          savedSources={sources}
          savedCategories={categories}
          savedAuthors={authors}
          onSave={handleSavePreferences}
        />
      </Drawer>
      <AppBar sx={{backgroundColor:"#D9AFD9", backgroundImage: "linear-gradient(to right, #cdc6c6 0%, #9b9494 51%, #939393 72%)"}} position="static">
        <Toolbar sx={{ 
          flexDirection: { xs: 'column', sm:"column", md:"row" }, 
          padding: { xs: '8px 16px', sm:"0px 24px" },
          gap: { xs: '2px'},
          justifyContent: "space-between"
          }}>
          <Stack flexDirection="row" alignItems="center" gap={1}>
            <NewspaperIcon sx={{color:"#535370"}} />
            <Typography noWrap  variant="h6" component="div" sx={{ color:"#1f1f29ab", flexGrow: 1, fontSize: { xs:"1rem", sm:"1.25rem"}, fontWeight: { xs:"bold" } }}>
              News Aggregator
            </Typography>
          </Stack>
          <Stack alignItems="center" sx={{flexDirection:{xs:"column", sm:"row"}, width: {xs:"100%", md:"initial"}, justifyContent: {sm:"space-between"}}}>
            <Stack flexDirection="row">
              <IconButton onClick={()=>setDateDrawer(true)}>
                <CalendarMonthIcon/>
              </IconButton>
              <SourceFilter sources={availableSources} selectedSource={sources} onSelectSource={setSources} />
              <CategoryFilter categories={availableCategories} selectedCategory={category} onSelectCategory={setCategory} />
            </Stack>
            <Stack flexDirection="row" sx={{justifyContent:{xs:"space-between", sm:"end"}, width:"100%"}}>
              <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
              <IconButton onClick={()=>setPreferencesOpen(true)}><TuneIcon/></IconButton>
            </Stack>
          </Stack>
          <Drawer
            // sx={{maxWidth:{xs:"400px"}}}
            anchor={"right"}
            open={dateDrawer}
            onClose={()=>setDateDrawer(false)}
          >
            <Stack divider={<Divider orientation="horizontal" flexItem />}>
              <Stack justifyContent={"start"} flexDirection="row">
                <IconButton onClick={()=>setDateDrawer(false)}>
                  <ArrowBackIcon />
                </IconButton>
              </Stack>
              <DateRangePicker
                showSelectionPreview={false}
                ranges={[selectionRange]}
                onChange={handleSelect}
              />
            </Stack>
          </Drawer>
        </Toolbar>
      </AppBar>
      <Stack flexDirection="row" flexWrap={"wrap"} sx={{borderTop:"1px solid #7c6b6b", background:"linear-gradient(to right, #cdc6c6 0%, #9b9494 51%, #939393 72%)", rowGap:"8px", columnGap:"8px", padding:"16px"}}>
        {
          isLoading ? 
          dummyItems.map((article,idx)=> <NewsCardSkeleton key={idx} />) :
          articlesAfterFilter.map((article,idx)=> <NewsCard key={idx} url={article.url} title={article.title} subtitle={article.description} imageUrl={article.urlToImage} author={article.author} />) 
        }
      </Stack>
    </Box>
  );
};

export default HomePage;
