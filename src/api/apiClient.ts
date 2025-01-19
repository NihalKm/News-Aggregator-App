import axios from 'axios';

const newsApiClient = axios.create({
  baseURL: 'https://newsapi.org/v2/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apiKey: '8a85d593f78345ea9fd6b2f99259c571', // Default query parameter (for example, the API key)
  },
});

const guardianApiClient = axios.create({
  baseURL: 'https://content.guardianapis.com/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apiKey: '6ad49e04-0805-4958-876e-29ea4e350b49', // Default query parameter (for example, the API key)
  },
});

export { newsApiClient, guardianApiClient };
