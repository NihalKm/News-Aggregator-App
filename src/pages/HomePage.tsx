import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar.tsx';
import SourceFilter from '../components/SourceFilter.tsx';
import CategoryFilter from '../components/CategoryFilter.tsx';
import PreferencesModal from '../components/PreferencesModal.tsx';
import { useFilters, usePreferences, useSearch } from '../components/hooks.tsx';
import { fetchAggregatedData } from '../api/fetchAggregatedData.ts';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { colors, Divider, Drawer, Stack } from '@mui/material';
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
  const { searchTerm, setSearchTerm } = useSearch();
  const { source, setSource, category, setCategory } = useFilters();
  const { sources, setSources, categories, setCategories, authors, setAuthors } = usePreferences();
  const [ dateDrawer, setDateDrawer ] = useState(false);
  const [ preferencesOpen, setPreferencesOpen ] = useState(false);
  const [ sourceOptions, setSourceOptions ] = useState([]);
  const [ categoryOptions, setCategoryOptions ] = useState([]);
  const [ selectionRange, setSelectionRange ] = useState<DateSelectionType>({
    startDate: undefined,
    endDate: undefined,
    key: 'selection',
  });

  const availableSources = ['Source1', 'Source2', 'Source3'];
  const availableCategories = ['Category1', 'Category2', 'Category3'];
  const availableAuthors = ['Author1', 'Author2', 'Author3'];

  const handleSavePreferences = (selectedSources: string[], selectedCategories: string[], selectedAuthors: string[]) => {
    setSources(selectedSources);
    setCategories(selectedCategories);
    setAuthors(selectedAuthors);
    setPreferencesOpen(false);
  };

  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dummyItems = Array.from({ length: 12 }, (_, id) => id + 1);
  const dummyItems1 = [
    {
        "source": {
            "id": null,
            "name": "Yahoo Entertainment"
        },
        "author": "Sarah Fielding",
        "title": "Discovery+ is raising prices for all customers",
        "description": "The price hikes for streaming services have already started for 2025. Discovery+ has announced its plans are increasing in price for all subscribers. The Discovery+ plan with ads will go up to $6 per month, from $5, while the ad-free plan will increase to $10…",
        "url": "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_52191b83-2526-4944-ac7c-9553076ae868",
        "urlToImage": "https://media.wired.com/photos/67785b691a5b04cc90892d39/191:100/w_1280,c_limit/ai-hardware-ces-gear.jpg",
        "publishedAt": "2025-01-07T16:06:47Z",
        "content": "If you click 'Accept all', we and our partners, including 238 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "[Removed]"
        },
        "author": null,
        "title": "[Removed]",
        "description": "[Removed]",
        "url": "https://removed.com",
        "urlToImage": "https://media.wired.com/photos/67785b691a5b04cc90892d39/191:100/w_1280,c_limit/ai-hardware-ces-gear.jpg",
        "publishedAt": "2025-01-08T19:44:26Z",
        "content": "[Removed]"
    },
    {
        "source": {
            "id": null,
            "name": "[Removed]"
        },
        "author": null,
        "title": "[Removed]",
        "description": "[Removed]",
        "url": "https://removed.com",
        "urlToImage": "https://media.wired.com/photos/67785b691a5b04cc90892d39/191:100/w_1280,c_limit/ai-hardware-ces-gear.jpg",
        "publishedAt": "2025-01-08T23:23:44Z",
        "content": "[Removed]"
    },
    {
        "source": {
            "id": null,
            "name": "[Removed]"
        },
        "author": null,
        "title": "[Removed]",
        "description": "[Removed]",
        "url": "https://removed.com",
        "urlToImage": "https://media.wired.com/photos/67785b691a5b04cc90892d39/191:100/w_1280,c_limit/ai-hardware-ces-gear.jpg",
        "publishedAt": "2024-12-24T13:15:23Z",
        "content": "[Removed]"
    }
  ]

  // Fetch data whenever search term change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchAggregatedData(searchTerm, sources.join(','), categories.join(','), authors.join(','));
        setArticles(result);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, source, category]);

  // Filter data whenever filters change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log(articles)
        const result = [];
        setArticles(result);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [source, category]);

  const handleSelect = (ranges:{selection:DateSelectionType}) => {
    setSelectionRange({ ...ranges.selection });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer PaperProps={{sx:{borderRadius: "0px 0px 30px 30px"}}} anchor={"top"} open={preferencesOpen} onClose={()=>setPreferencesOpen(false)}>
        <PreferencesModal
          sources={availableSources}
          categories={availableCategories}
          authors={availableAuthors}
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
              <SourceFilter sources={sourceOptions} selectedSource={source} onSelectSource={setSource} />
              <CategoryFilter categories={categoryOptions} selectedCategory={category} onSelectCategory={setCategory} />
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
          dummyItems.map((article,idx)=> <NewsCardSkeleton index={idx} />) :
          articles.map((article,idx)=> <NewsCard index={idx} title={article.title} subtitle={article.description} imageUrl={article.urlToImage} author={article.author} />) 
        }
      </Stack>
    </Box>
  );
};

export default HomePage;
