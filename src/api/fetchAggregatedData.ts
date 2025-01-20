import { newsApiClient, guardianApiClient, newYorkTimesApiClient} from './apiClient.ts';

const fetchNewsApiData = async (searchTerm: string) => {
  //fetch "top-headlines/sources" from newsApiClient to get the category of each sources    
  const newsApiSources = await newsApiClient.get('/sources');
  // To create a mapping of sources to their respective categories
  const newsApiCategoriesMap = {};
  newsApiSources.data.sources.forEach((source: { category: string; id: string; }) => 
  {
    newsApiCategoriesMap[source.id] = source.category;
  });
  
  const params: Record<string, string> = { q: searchTerm };

  try {
    const response = await newsApiClient.get('/top-headlines', { params });
    const finaldata = response?.data?.articles?.map((article:any) => ({
      ...article, 
      category: newsApiCategoriesMap[article.source.id],
      date: article.publishedAt,
      sourceName: "News API"
    }));
    return finaldata || [];
  } catch (error) {
    console.error('Error fetching data with search term:', error);
    return []; // Return an empty array if the request fails
  }
};

const fetchGuardianData = async (searchTerm: string) => {
  const params: Record<string, string> = { q: searchTerm };

  try {
    const response = await guardianApiClient.get('/search', { params });
    const finaldata = response?.data?.response?.results?.map(article => ({
      ...article, 
      category: article.sectionName,
      url:  article.webUrl, 
      title: article?.fields?.headline,
      description: article?.fields?.trailText,
      urlToImage: article?.fields?.thumbnail,
      author: article?.fields?.byline, 
      date: article.webPublicationDate,
      sourceName: "The Guardian"
    })
    );
    return finaldata || [];
  } catch (error) {
    console.error('Error fetching data with search term:', error);
    return []; // Return an empty array if the request fails
  }
};

const fetchNYTData = async (searchTerm: string) => {
  //New York Times API does not support search by keyword, so we will fetch top stories and filter them by keyword
  try {
    const response = await newYorkTimesApiClient.get('/home.json');
    const finaldata = response?.data?.results?.map(article => ({
      ...article, 
      category: article.section,
      url:  article.url,
      title: article.title,
      description: article.abstract,
      urlToImage: article.multimedia?.[0]?.url,
      author: article.byline.split("By ")[1],
      date: article.published_date,
      sourceName: "New York Times"
    })
    );
    return finaldata || [];
  } catch (error) {
    console.error('Error fetching data with search term:', error);
    return []; // Return an empty array if the request fails
  }
};

export { fetchNewsApiData, fetchGuardianData, fetchNYTData };