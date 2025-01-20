import { data } from 'react-router-dom';
import { newsApiClient, guardianApiClient, newYorkTimesApiClient} from './apiClient.ts';

const sourcess = {
  "status": "ok",
  "sources": [
      {
          "id": "abc-news",
          "name": "ABC News",
          "description": "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
          "url": "https://abcnews.go.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "abc-news-au",
          "name": "ABC News (AU)",
          "description": "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
          "url": "https://www.abc.net.au/news",
          "category": "general",
          "language": "en",
          "country": "au"
      },
      {
          "id": "al-jazeera-english",
          "name": "Al Jazeera English",
          "description": "News, analysis from the Middle East and worldwide, multimedia and interactives, opinions, documentaries, podcasts, long reads and broadcast schedule.",
          "url": "https://www.aljazeera.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "ars-technica",
          "name": "Ars Technica",
          "description": "The PC enthusiast's resource. Power users and the tools they love, without computing religion.",
          "url": "https://arstechnica.com",
          "category": "technology",
          "language": "en",
          "country": "us"
      },
      {
          "id": "associated-press",
          "name": "Associated Press",
          "description": "The AP delivers in-depth coverage on the international, politics, lifestyle, business, and entertainment news.",
          "url": "https://apnews.com/",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "australian-financial-review",
          "name": "Australian Financial Review",
          "description": "The Australian Financial Review reports the latest news from business, finance, investment and politics, updated in real time. It has a reputation for independent, award-winning journalism and is essential reading for the business and investor community.",
          "url": "http://www.afr.com",
          "category": "business",
          "language": "en",
          "country": "au"
      },
      {
          "id": "axios",
          "name": "Axios",
          "description": "Axios are a new media company delivering vital, trustworthy news and analysis in the most efficient, illuminating and shareable ways possible.",
          "url": "https://www.axios.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "bbc-news",
          "name": "BBC News",
          "description": "Use BBC News for up-to-the-minute news, breaking news, video, audio and feature stories. BBC News provides trusted World and UK news as well as local and regional perspectives. Also entertainment, business, science, technology and health news.",
          "url": "https://www.bbc.co.uk/news",
          "category": "general",
          "language": "en",
          "country": "gb"
      },
      {
          "id": "bbc-sport",
          "name": "BBC Sport",
          "description": "The home of BBC Sport online. Includes live sports coverage, breaking news, results, video, audio and analysis on Football, F1, Cricket, Rugby Union, Rugby League, Golf, Tennis and all the main world sports, plus major events such as the Olympic Games.",
          "url": "http://www.bbc.co.uk/sport",
          "category": "sports",
          "language": "en",
          "country": "gb"
      },
      {
          "id": "bleacher-report",
          "name": "Bleacher Report",
          "description": "Sports journalists and bloggers covering NFL, MLB, NBA, NHL, MMA, college football and basketball, NASCAR, fantasy sports and more. News, photos, mock drafts, game scores, player profiles and more!",
          "url": "http://www.bleacherreport.com",
          "category": "sports",
          "language": "en",
          "country": "us"
      },
      {
          "id": "bloomberg",
          "name": "Bloomberg",
          "description": "Bloomberg delivers business and markets news, data, analysis, and video to the world, featuring stories from Businessweek and Bloomberg News.",
          "url": "http://www.bloomberg.com",
          "category": "business",
          "language": "en",
          "country": "us"
      },
      {
          "id": "breitbart-news",
          "name": "Breitbart News",
          "description": "Syndicated news and opinion website providing continuously updated headlines to top news and analysis sources.",
          "url": "http://www.breitbart.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "business-insider",
          "name": "Business Insider",
          "description": "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.",
          "url": "http://www.businessinsider.com",
          "category": "business",
          "language": "en",
          "country": "us"
      },
      {
          "id": "buzzfeed",
          "name": "Buzzfeed",
          "description": "BuzzFeed is a cross-platform, global network for news and entertainment that generates seven billion views each month.",
          "url": "https://www.buzzfeed.com",
          "category": "entertainment",
          "language": "en",
          "country": "us"
      },
      {
          "id": "cbc-news",
          "name": "CBC News",
          "description": "CBC News is the division of the Canadian Broadcasting Corporation responsible for the news gathering and production of news programs on the corporation's English-language operations, namely CBC Television, CBC Radio, CBC News Network, and CBC.ca.",
          "url": "http://www.cbc.ca/news",
          "category": "general",
          "language": "en",
          "country": "ca"
      },
      {
          "id": "cbs-news",
          "name": "CBS News",
          "description": "CBS News: dedicated to providing the best in journalism under standards it pioneered at the dawn of radio and television and continue in the digital age.",
          "url": "http://www.cbsnews.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "cnn",
          "name": "CNN",
          "description": "View the latest news and breaking news today for U.S., world, weather, entertainment, politics and health at CNN",
          "url": "http://us.cnn.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "crypto-coins-news",
          "name": "Crypto Coins News",
          "description": "Providing breaking cryptocurrency news - focusing on Bitcoin, Ethereum, ICOs, blockchain technology, and smart contracts.",
          "url": "https://www.ccn.com",
          "category": "technology",
          "language": "en",
          "country": "us"
      },
      {
          "id": "engadget",
          "name": "Engadget",
          "description": "Engadget is a web magazine with obsessive daily coverage of everything new in gadgets and consumer electronics.",
          "url": "https://www.engadget.com",
          "category": "technology",
          "language": "en",
          "country": "us"
      },
      {
          "id": "entertainment-weekly",
          "name": "Entertainment Weekly",
          "description": "Online version of the print magazine includes entertainment news, interviews, reviews of music, film, TV and books, and a special area for magazine subscribers.",
          "url": "http://www.ew.com",
          "category": "entertainment",
          "language": "en",
          "country": "us"
      },
      {
          "id": "espn",
          "name": "ESPN",
          "description": "ESPN has up-to-the-minute sports news coverage, scores, highlights and commentary for NFL, MLB, NBA, College Football, NCAA Basketball and more.",
          "url": "https://www.espn.com",
          "category": "sports",
          "language": "en",
          "country": "us"
      },
      {
          "id": "espn-cric-info",
          "name": "ESPN Cric Info",
          "description": "ESPN Cricinfo provides the most comprehensive cricket coverage available including live ball-by-ball commentary, news, unparalleled statistics, quality editorial comment and analysis.",
          "url": "http://www.espncricinfo.com/",
          "category": "sports",
          "language": "en",
          "country": "us"
      },
      {
          "id": "financial-post",
          "name": "Financial Post",
          "description": "Find the latest happenings in the Canadian Financial Sector and stay up to date with changing trends in Business Markets. Read trading and investing advice from professionals.",
          "url": "https://financialpost.com",
          "category": "business",
          "language": "en",
          "country": "ca"
      },
      {
          "id": "football-italia",
          "name": "Football Italia",
          "description": "Italian football news, analysis, fixtures and results for the latest from Serie A, Serie B and the Azzurri.",
          "url": "http://www.football-italia.net",
          "category": "sports",
          "language": "en",
          "country": "it"
      },
      {
          "id": "fortune",
          "name": "Fortune",
          "description": "Fortune 500 Daily and Breaking Business News",
          "url": "http://fortune.com",
          "category": "business",
          "language": "en",
          "country": "us"
      },
      {
          "id": "four-four-two",
          "name": "FourFourTwo",
          "description": "The latest football news, in-depth features, tactical and statistical analysis from FourFourTwo, the UK&#039;s favourite football monthly.",
          "url": "http://www.fourfourtwo.com/news",
          "category": "sports",
          "language": "en",
          "country": "gb"
      },
      {
          "id": "fox-news",
          "name": "Fox News",
          "description": "Breaking News, Latest News and Current News from FOXNews.com. Breaking news and video. Latest Current News: U.S., World, Entertainment, Health, Business, Technology, Politics, Sports.",
          "url": "http://www.foxnews.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "fox-sports",
          "name": "Fox Sports",
          "description": "Find live scores, player and team news, videos, rumors, stats, standings, schedules and fantasy games on FOX Sports.",
          "url": "http://www.foxsports.com",
          "category": "sports",
          "language": "en",
          "country": "us"
      },
      {
          "id": "google-news",
          "name": "Google News",
          "description": "Comprehensive, up-to-date news coverage, aggregated from sources all over the world by Google News.",
          "url": "https://news.google.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "google-news-au",
          "name": "Google News (Australia)",
          "description": "Comprehensive, up-to-date Australia news coverage, aggregated from sources all over the world by Google News.",
          "url": "https://news.google.com",
          "category": "general",
          "language": "en",
          "country": "au"
      },
      {
          "id": "google-news-ca",
          "name": "Google News (Canada)",
          "description": "Comprehensive, up-to-date Canada news coverage, aggregated from sources all over the world by Google News.",
          "url": "https://news.google.com",
          "category": "general",
          "language": "en",
          "country": "ca"
      },
      {
          "id": "google-news-in",
          "name": "Google News (India)",
          "description": "Comprehensive, up-to-date India news coverage, aggregated from sources all over the world by Google News.",
          "url": "https://news.google.com",
          "category": "general",
          "language": "en",
          "country": "in"
      },
      {
          "id": "google-news-uk",
          "name": "Google News (UK)",
          "description": "Comprehensive, up-to-date UK news coverage, aggregated from sources all over the world by Google News.",
          "url": "https://news.google.com",
          "category": "general",
          "language": "en",
          "country": "gb"
      },
      {
          "id": "hacker-news",
          "name": "Hacker News",
          "description": "Hacker News is a social news website focusing on computer science and entrepreneurship. It is run by Paul Graham's investment fund and startup incubator, Y Combinator. In general, content that can be submitted is defined as \"anything that gratifies one's intellectual curiosity\".",
          "url": "https://news.ycombinator.com",
          "category": "technology",
          "language": "en",
          "country": "us"
      },
      {
          "id": "ign",
          "name": "IGN",
          "description": "IGN is your site for Xbox One, PS4, PC, Wii-U, Xbox 360, PS3, Wii, 3DS, PS Vita and iPhone games with expert reviews, news, previews, trailers, cheat codes, wiki guides and walkthroughs.",
          "url": "http://www.ign.com",
          "category": "entertainment",
          "language": "en",
          "country": "us"
      },
      {
          "id": "independent",
          "name": "Independent",
          "description": "National morning quality (tabloid) includes free online access to news and supplements. Insight by Robert Fisk and various other columnists.",
          "url": "http://www.independent.co.uk",
          "category": "general",
          "language": "en",
          "country": "gb"
      },
      {
          "id": "mashable",
          "name": "Mashable",
          "description": "Mashable is a global, multi-platform media and entertainment company.",
          "url": "https://mashable.com",
          "category": "entertainment",
          "language": "en",
          "country": "us"
      },
      {
          "id": "medical-news-today",
          "name": "Medical News Today",
          "description": "Medical news and health news headlines posted throughout the day, every day.",
          "url": "http://www.medicalnewstoday.com",
          "category": "health",
          "language": "en",
          "country": "us"
      },
      {
          "id": "msnbc",
          "name": "MSNBC",
          "description": "Breaking news and in-depth analysis of the headlines, as well as commentary and informed perspectives from The Rachel Maddow Show, Morning Joe & more.",
          "url": "http://www.msnbc.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "mtv-news",
          "name": "MTV News",
          "description": "The ultimate news source for music, celebrity, entertainment, movies, and current events on the web. It's pop culture on steroids.",
          "url": "http://www.mtv.com/news",
          "category": "entertainment",
          "language": "en",
          "country": "us"
      },
      {
          "id": "mtv-news-uk",
          "name": "MTV News (UK)",
          "description": "All the latest celebrity news, gossip, exclusive interviews and pictures from the world of music and entertainment.",
          "url": "http://www.mtv.co.uk/news",
          "category": "entertainment",
          "language": "en",
          "country": "gb"
      },
      {
          "id": "national-geographic",
          "name": "National Geographic",
          "description": "Reporting our world daily: original nature and science news from National Geographic.",
          "url": "http://news.nationalgeographic.com",
          "category": "science",
          "language": "en",
          "country": "us"
      },
      {
          "id": "national-review",
          "name": "National Review",
          "description": "National Review: Conservative News, Opinion, Politics, Policy, & Current Events.",
          "url": "https://www.nationalreview.com/",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "nbc-news",
          "name": "NBC News",
          "description": "Breaking news, videos, and the latest top stories in world news, business, politics, health and pop culture.",
          "url": "http://www.nbcnews.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "news24",
          "name": "News24",
          "description": "South Africa's premier news source, provides breaking news on national, world, Africa, sport, entertainment, technology and more.",
          "url": "http://www.news24.com",
          "category": "general",
          "language": "en",
          "country": "za"
      },
      {
          "id": "new-scientist",
          "name": "New Scientist",
          "description": "Breaking science and technology news from around the world. Exclusive stories and expert analysis on space, technology, health, physics, life and Earth.",
          "url": "https://www.newscientist.com/section/news",
          "category": "science",
          "language": "en",
          "country": "us"
      },
      {
          "id": "news-com-au",
          "name": "News.com.au",
          "description": "We say what people are thinking and cover the issues that get people talking balancing Australian and global moments — from politics to pop culture.",
          "url": "http://www.news.com.au",
          "category": "general",
          "language": "en",
          "country": "au"
      },
      {
          "id": "newsweek",
          "name": "Newsweek",
          "description": "Newsweek provides in-depth analysis, news and opinion about international issues, technology, business, culture and politics.",
          "url": "https://www.newsweek.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "new-york-magazine",
          "name": "New York Magazine",
          "description": "NYMAG and New York magazine cover the new, the undiscovered, the next in politics, culture, food, fashion, and behavior nationally, through a New York lens.",
          "url": "https://nymag.com/",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "next-big-future",
          "name": "Next Big Future",
          "description": "Coverage of science and technology that have the potential for disruption, and analysis of plans, policies, and technology that enable radical improvement.",
          "url": "https://www.nextbigfuture.com",
          "category": "science",
          "language": "en",
          "country": "us"
      },
      {
          "id": "nfl-news",
          "name": "NFL News",
          "description": "The official source for NFL news, schedules, stats, scores and more.",
          "url": "https://www.nfl.com",
          "category": "sports",
          "language": "en",
          "country": "us"
      },
      {
          "id": "nhl-news",
          "name": "NHL News",
          "description": "The most up-to-date breaking hockey news from the official source including interviews, rumors, statistics and schedules.",
          "url": "https://www.nhl.com/news",
          "category": "sports",
          "language": "en",
          "country": "us"
      },
      {
          "id": "politico",
          "name": "Politico",
          "description": "Political news about Congress, the White House, campaigns, lobbyists and issues.",
          "url": "https://www.politico.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "polygon",
          "name": "Polygon",
          "description": "Polygon is a gaming website in partnership with Vox Media. Our culture focused site covers games, their creators, the fans, trending stories and entertainment news.",
          "url": "http://www.polygon.com",
          "category": "entertainment",
          "language": "en",
          "country": "us"
      },
      {
          "id": "recode",
          "name": "Recode",
          "description": "Get the latest independent tech news, reviews and analysis from Recode with the most informed and respected journalists in technology and media.",
          "url": "http://www.recode.net",
          "category": "technology",
          "language": "en",
          "country": "us"
      },
      {
          "id": "reddit-r-all",
          "name": "Reddit /r/all",
          "description": "Reddit is an entertainment, social news networking service, and news website. Reddit's registered community members can submit content, such as text posts or direct links.",
          "url": "https://www.reddit.com/r/all",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "reuters",
          "name": "Reuters",
          "description": "Reuters.com brings you the latest news from around the world, covering breaking news in business, politics, entertainment, technology, video and pictures.",
          "url": "https://www.reuters.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "rte",
          "name": "RTE",
          "description": "Get all of the latest breaking local and international news stories as they happen, with up to the minute updates and analysis, from Ireland's National Broadcaster.",
          "url": "https://www.rte.ie/news",
          "category": "general",
          "language": "en",
          "country": "ie"
      },
      {
          "id": "talksport",
          "name": "TalkSport",
          "description": "Tune in to the world's biggest sports radio station - Live Premier League football coverage, breaking sports news, transfer rumours &amp; exclusive interviews.",
          "url": "http://talksport.com",
          "category": "sports",
          "language": "en",
          "country": "gb"
      },
      {
          "id": "techcrunch",
          "name": "TechCrunch",
          "description": "TechCrunch is a leading technology media property, dedicated to obsessively profiling startups, reviewing new Internet products, and breaking tech news.",
          "url": "https://techcrunch.com",
          "category": "technology",
          "language": "en",
          "country": "us"
      },
      {
          "id": "techradar",
          "name": "TechRadar",
          "description": "The latest technology news and reviews, covering computing, home entertainment systems, gadgets and more.",
          "url": "https://www.techradar.com",
          "category": "technology",
          "language": "en",
          "country": "us"
      },
      {
          "id": "the-american-conservative",
          "name": "The American Conservative",
          "description": "Realism and reform. A new voice for a new generation of conservatives.",
          "url": "http://www.theamericanconservative.com/",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "the-globe-and-mail",
          "name": "The Globe And Mail",
          "description": "The Globe and Mail offers the most authoritative news in Canada, featuring national and international news.",
          "url": "https://www.theglobeandmail.com",
          "category": "general",
          "language": "en",
          "country": "ca"
      },
      {
          "id": "the-hill",
          "name": "The Hill",
          "description": "The Hill is a top US political website, read by the White House and more lawmakers than any other site -- vital for policy, politics and election campaigns.",
          "url": "https://thehill.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "the-hindu",
          "name": "The Hindu",
          "description": "The Hindu. latest news, analysis, comment, in-depth coverage of politics, business, sport, environment, cinema and arts from India's national newspaper.",
          "url": "http://www.thehindu.com",
          "category": "general",
          "language": "en",
          "country": "in"
      },
      {
          "id": "the-huffington-post",
          "name": "The Huffington Post",
          "description": "The Huffington Post is a politically liberal American online news aggregator and blog that has both localized and international editions founded by Arianna Huffington, Kenneth Lerer, Andrew Breitbart, and Jonah Peretti, featuring columnists.",
          "url": "http://www.huffingtonpost.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "the-irish-times",
          "name": "The Irish Times",
          "description": "The Irish Times online. Latest news including sport, analysis, business, weather and more from the definitive brand of quality news in Ireland.",
          "url": "https://www.irishtimes.com",
          "category": "general",
          "language": "en",
          "country": "ie"
      },
      {
          "id": "the-jerusalem-post",
          "name": "The Jerusalem Post",
          "description": "The Jerusalem Post is the leading online newspaper for English speaking Jewry since 1932, bringing news and updates from the Middle East and all over the Jewish world.",
          "url": "https://www.jpost.com/",
          "category": "general",
          "language": "en",
          "country": "is"
      },
      {
          "id": "the-lad-bible",
          "name": "The Lad Bible",
          "description": "The LAD Bible is one of the largest community for guys aged 16-30 in the world. Send us your funniest pictures and videos!",
          "url": "https://www.theladbible.com",
          "category": "entertainment",
          "language": "en",
          "country": "gb"
      },
      {
          "id": "the-next-web",
          "name": "The Next Web",
          "description": "The Next Web is one of the world’s largest online publications that delivers an international perspective on the latest news about Internet technology, business and culture.",
          "url": "http://thenextweb.com",
          "category": "technology",
          "language": "en",
          "country": "us"
      },
      {
          "id": "the-sport-bible",
          "name": "The Sport Bible",
          "description": "TheSPORTbible is one of the largest communities for sports fans across the world. Send us your sporting pictures and videos!",
          "url": "https://www.thesportbible.com",
          "category": "sports",
          "language": "en",
          "country": "gb"
      },
      {
          "id": "the-times-of-india",
          "name": "The Times of India",
          "description": "Times of India brings the Latest News and Top Breaking headlines on Politics and Current Affairs in India and around the World, Sports, Business, Bollywood News and Entertainment, Science, Technology, Health and Fitness news, Cricket and opinions from leading columnists.",
          "url": "http://timesofindia.indiatimes.com",
          "category": "general",
          "language": "en",
          "country": "in"
      },
      {
          "id": "the-verge",
          "name": "The Verge",
          "description": "The Verge covers the intersection of technology, science, art, and culture.",
          "url": "http://www.theverge.com",
          "category": "technology",
          "language": "en",
          "country": "us"
      },
      {
          "id": "the-wall-street-journal",
          "name": "The Wall Street Journal",
          "description": "WSJ online coverage of breaking news and current headlines from the US and around the world. Top stories, photos, videos, detailed analysis and in-depth reporting.",
          "url": "https://www.wsj.com",
          "category": "business",
          "language": "en",
          "country": "us"
      },
      {
          "id": "the-washington-post",
          "name": "The Washington Post",
          "description": "Breaking news and analysis on politics, business, world national news, entertainment more. In-depth DC, Virginia, Maryland news coverage including traffic, weather, crime, education, restaurant reviews and more.",
          "url": "https://www.washingtonpost.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "the-washington-times",
          "name": "The Washington Times",
          "description": "The Washington Times delivers breaking news and commentary on the issues that affect the future of our nation.",
          "url": "https://www.washingtontimes.com/",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "time",
          "name": "Time",
          "description": "Breaking news and analysis from TIME.com. Politics, world news, photos, video, tech reviews, health, science and entertainment news.",
          "url": "http://time.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "usa-today",
          "name": "USA Today",
          "description": "Get the latest national, international, and political news at USATODAY.com.",
          "url": "http://www.usatoday.com/news",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "vice-news",
          "name": "Vice News",
          "description": "Vice News is Vice Media, Inc.'s current affairs channel, producing daily documentary essays and video through its website and YouTube channel. It promotes itself on its coverage of \"under - reported stories\".",
          "url": "https://news.vice.com",
          "category": "general",
          "language": "en",
          "country": "us"
      },
      {
          "id": "wired",
          "name": "Wired",
          "description": "Wired is a monthly American magazine, published in print and online editions, that focuses on how emerging technologies affect culture, the economy, and politics.",
          "url": "https://www.wired.com",
          "category": "technology",
          "language": "en",
          "country": "us"
      }
  ]
}

const sources1 = {
    "status": "ok",
    "totalResults": 59,
    "articles": [
        {
            "source": {
                "id": "cnn",
                "name": "CNN"
            },
            "author": "Clare Duffy",
            "title": "Instagram rolls out TikTok-like features amid uncertainty about rival’s future - CNN",
            "description": "Instagram has made changes in recent days that appear to be aimed at attracting TikTok users while the short-video app’s future remains in limbo.",
            "url": "https://www.cnn.com/2025/01/19/tech/instagram-tiktok-features-shutdown/index.html",
            "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/sipausa-52620036-copy-20250119162236017.jpg?c=16x9&q=w_800,c_fill",
            "publishedAt": "2025-01-19T17:37:00Z",
            "content": "Instagram has made changes in recent days that appear to be aimed at attracting TikTok users while the short-video apps future remains in limbo.\r\nAdam Mosseri, head of the Meta-owned platform, said o… [+1859 chars]"
        },
        {
            "source": {
                "id": "techcrunch",
                "name": "TechCrunch"
            },
            "author": "Charles Rollet",
            "title": "AI isn’t very good at history, new paper finds - TechCrunch",
            "description": "Top LLMs performed poorly on a high-level history test, a new paper has found.",
            "url": "https://techcrunch.com/2025/01/19/ai-isnt-very-good-at-history-new-paper-finds/",
            "urlToImage": "https://techcrunch.com/wp-content/uploads/2024/08/GettyImages-1305439239-1.jpg?resize=1200,629",
            "publishedAt": "2025-01-19T15:01:00Z",
            "content": "AI might excel at certain tasks like coding or generating a podcast. But it struggles to pass a high-level history exam, a new paper has found.\r\nA team of researchers has created a new benchmark to t… [+2944 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "TrueAchievements"
            },
            "author": null,
            "title": "Diablo 4 Season 7 guide — all class changes and new additions for Xbox - TrueAchievements",
            "description": "The Season of Witchcraft kicks off in Diablo 4 this month, taking us to Hawezar to uncover the mysteries of the Coven — here's everything you need to know.",
            "url": "https://www.trueachievements.com/news/diablo-4-season",
            "urlToImage": "https://www.trueachievements.com/imgs/155717/diablo-4-season-of-witchcraft.jpg",
            "publishedAt": "2025-01-19T14:01:08Z",
            "content": "Diablo fans will be able to dive into Diablo 4: Season 7 on Tuesday, January 21, 2025 . With the roughly 400-hour completion time on the Diablo 4 achievements, we're sure that this Season of Witchcra… [+26254 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "My Nintendo News"
            },
            "author": "Sickr",
            "title": "Leaker doubles down on the Nintendo Switch 2 having Hall Effect joysticks - My Nintendo News",
            "description": "One of the more prominent leakers of Nintendo Switch 2 information was NextHandheld who has recently doubled down on the newly announced platform’s Joy-Con controller having Hall Effect joysticks.",
            "url": "https://mynintendonews.com/2025/01/19/leaker-doubles-down-on-the-nintendo-switch-2-having-hall-effect-joysticks/",
            "urlToImage": "https://i0.wp.com/mynintendonews.com/wp-content/uploads/2025/01/nintendo_switch_2.jpg?fit=1920%2C1080&ssl=1",
            "publishedAt": "2025-01-19T13:41:46Z",
            "content": "One of the more prominent leakers of Nintendo Switch 2 information was NextHandheld who has recently doubled down on the newly announced platform’s Joy-Con controller having Hall Effect joysticks. Ne… [+1076 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Forbes"
            },
            "author": "Paul Tassi",
            "title": "‘Marvel Snap’ Developer Wasn’t Told It Would Be Banned, Recommends VPN - Forbes",
            "description": "Not only was Marvel Snap just banned in the US, its developer wasn't even told this was happening, so they couldn't let fans now.",
            "url": "https://www.forbes.com/sites/paultassi/2025/01/19/marvel-snap-developer-wasnt-told-it-would-be-banned-recommends-vpn/",
            "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/678c8d342e92d76e45ebfa20/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
            "publishedAt": "2025-01-19T13:34:07Z",
            "content": "The message\r\nMarvel Snap\r\nIf the fact that Marvel Snap was banned and taken offline in the US alongside the TikTok ban wasnt weird enough, the story has taken an even stranger turn.\r\nMany players wer… [+2759 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "MacRumors"
            },
            "author": "Joe Rossignol",
            "title": "iPhone SE Inventory 'Quickly' Dwindling at Apple Stores Ahead of New Model With These Upgrades - MacRumors",
            "description": "Apple is widely rumored to be planning a new iPhone SE, and there is now a fresh hint that the device's launch is approaching.   In his Power On...",
            "url": "https://www.macrumors.com/2025/01/19/iphone-se-4-launch-timeframe-revealed/",
            "urlToImage": "https://images.macrumors.com/t/KkEtcGzO12V5eKcf75Yo34LZCMY=/2500x/article-new/2024/05/iPhone-SE-4-Thumb-1.jpg",
            "publishedAt": "2025-01-19T13:10:00Z",
            "content": "Apple is widely rumored to be planning a new iPhone SE, and there is now a fresh hint that the device's launch is approaching.\r\nIn his Power On newsletter today, Bloomberg's Mark Gurman said iPhone S… [+1051 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Notebookcheck.net"
            },
            "author": "Abid Ahsan Shanto",
            "title": "Nintendo Switch 2 leak reveals possible launch price of new gaming handheld - Notebookcheck.net",
            "description": "After weeks of leaks, Nintendo has officially showcased the Switch 2. While the announcement gave a detailed look at the gaming handheld, the company didn't share anything about the price, which a new leak has shed light on.",
            "url": "https://www.notebookcheck.net/Nintendo-Switch-2-leak-reveals-possible-launch-price-of-new-gaming-handheld.949439.0.html",
            "urlToImage": "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/Nintendo-Switch-2-price-leak.jpg",
            "publishedAt": "2025-01-19T13:00:00Z",
            "content": "The Nintendo Switch 2 has made its official debut, but even though the company has showcased the design of the gaming handheld, pricing details are still under wraps. Well, that's what a new leak has… [+1413 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "9to5google.com"
            },
            "author": "Abner Li",
            "title": "Google says Eclipsa Audio support is coming to Chrome and Android - 9to5Google",
            "description": "Following the announcement by Samsung at the start of 2025, Google earlier this week shared more details about Eclipsa Audio...",
            "url": "http://9to5google.com/2025/01/19/eclipsa-audio-google-chrome-android/",
            "urlToImage": "https://i0.wp.com/9to5google.com/wp-content/uploads/sites/4/2023/12/google-chrome-android-3.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1",
            "publishedAt": "2025-01-19T12:30:00Z",
            "content": "Following the announcement by Samsung at the start of 2025, Google earlier this week shared more details about Eclipsa Audio. \r\nThis is Google and Samsungs open source spatial audio format for everyo… [+1505 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "The Daily Galaxy --Great Discoveries Channel"
            },
            "author": null,
            "title": "Elon Musk Joins the Ranks of the World’s Top 20 Gamers at This Video Game - The Daily Galaxy --Great Discoveries Channel",
            "description": "Elon Musk is making waves far beyond rockets and electric cars—this time in the dark, demon-filled world of Diablo IV. The tech mogul has quietly climbed the global leaderboard, earning a coveted spot among the top 20 players. But how does the billionaire CEO…",
            "url": "https://dailygalaxy.com/2025/01/elon-musk-joins-the-top-20-best-players-in-the-world-at-this-video-game/",
            "urlToImage": "https://dailygalaxy.com/wp-content/uploads/2025/01/A-digitally-edited-image-of-Musk-sitting-at-a-futuristic-gaming-setup.jpg",
            "publishedAt": "2025-01-19T12:30:00Z",
            "content": "Elon Musk has always been a figure of intrigue, known for pushing the boundaries of technology with Tesla, SpaceX, and his vision for AI-driven futures. But now, the billionaire has taken his competi… [+4366 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Wccftech"
            },
            "author": null,
            "title": "ASRock’s Radeon RX 9070 Series GPUs Surfaces Online; Revealing Steel Legend & Taichi Variants - Wccftech",
            "description": "ASRock's Radeon RX 9070 series GPUs have surfaced online, revealing the upcoming Steel Legend, and Taichi custom models.",
            "url": "https://wccftech.com/asrock-radeon-rx-9070-series-gpus-surfaces-online-revealing-steel-legend-taichi-variants/",
            "urlToImage": "https://cdn.wccftech.com/wp-content/uploads/2025/01/Untitled-design-12.png",
            "publishedAt": "2025-01-19T12:01:00Z",
            "content": "ASRock's Radeon RX 9070 series GPUs have surfaced online, revealing the upcoming Steel Legend, and Taichi custom models.\r\nWell, it seems like ASRock has prepped for a decent range of AMD's RDNA 4 GPU… [+1571 chars]"
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
            "urlToImage": null,
            "publishedAt": "2025-01-19T11:31:54Z",
            "content": "[Removed]"
        },
        {
            "source": {
                "id": null,
                "name": "ZDNet"
            },
            "author": "Cesar Cadenas",
            "title": "4 surprise products we could see at Samsung Unpacked 2025 - and are worth getting excited about - ZDNet",
            "description": "The Galaxy S25 series is slated to be announced on Wednesday, but we may also get surprise appearances on the wearables side.",
            "url": "https://www.zdnet.com/article/4-surprise-products-we-could-see-at-samsung-unpacked-2025-and-are-worth-getting-excited-about/",
            "urlToImage": "https://www.zdnet.com/a/img/resize/e2ba5a4afcb5b3327b95da9b87297b3c2609489e/2024/03/03/73c05b3b-19da-45d6-b9df-17d3036ca5bd/dsc09948.jpg?auto=webp&fit=crop&height=675&width=1200",
            "publishedAt": "2025-01-19T11:30:00Z",
            "content": "Kerry Wan/ZDNET\r\nSamsung is kicking off its first Unpacked event for 2025 this coming Wednesday, on January 22. Although there are still a few more days until airing, we have a good sense of what wil… [+6116 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Forbes"
            },
            "author": "Davey Winder",
            "title": "Critical Hidden Email Danger Confirmed For Gmail And Outlook Users - Forbes",
            "description": "This critical credential-stealing threat hides in your email, waiting to strike—here’s how it works and how to stop it.",
            "url": "https://www.forbes.com/sites/daveywinder/2025/01/19/critical-hidden-email-hack-warning-issued-for-gmail-and-outlook-users/",
            "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/678a5eb82f3eb8132902c92d/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
            "publishedAt": "2025-01-19T11:07:00Z",
            "content": "Malware hidden in images strikes at Gmail and Outlook users.\r\ngetty\r\nUpdate, Jan. 19, 2025: This story, originally published Jan. 18, now includes mitigation advice to help protect against the hidden… [+4110 chars]"
        },
        {
            "source": {
                "id": "the-washington-post",
                "name": "The Washington Post"
            },
            "author": "Kasha Patel",
            "title": "Earth’s north magnetic pole is on the move again - The Washington Post",
            "description": "Earth’s magnetic north is not static. Like an anchorless buoy pushed by ocean waves, the magnetic field is constantly on the move as liquid iron sloshes around in the planet’s outer core.",
            "url": "https://www.washingtonpost.com/weather/2025/01/19/earth-magnetic-north-pole-moving/",
            "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://d1i4t8bqe7zgj6.cloudfront.net/01-02-2025/t_c1cf278dff874ed1921b1ae223cbd62a_name_magneticpoles_share_scaled.jpg&w=1440",
            "publishedAt": "2025-01-19T11:02:23Z",
            "content": "Check your compass again Earths north magnetic pole is moving toward Siberia.\r\nSince at least the early 19th century, Earths north magnetic pole has been situated in the Canadian Arctic and slowly mo… [+5986 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Rock Paper Shotgun"
            },
            "author": "Graham Smith",
            "title": "The Sunday Papers - Rock Paper Shotgun",
            "description": "A roundup of the week's best writing (and videos) about (mostly) video games.",
            "url": "https://www.rockpapershotgun.com/the-sunday-papers-749",
            "urlToImage": "https://assetsio.gnwcdn.com/the-sunday-papers-big.jpg?width=1200&height=630&fit=crop&enable=upscale&auto=webp",
            "publishedAt": "2025-01-19T11:00:00Z",
            "content": "The Sunday Papers is our weekly roundup of great writing about (mostly) videogames from across the web.\r\nSundays are for resting, supposedly, but it can also be for mopping the floors, washing the be… [+3487 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Android Authority"
            },
            "author": null,
            "title": "Googler shares potential release dates for Android 16 beta builds - Android Authority",
            "description": "A Googler has shared possible release dates for Android 16 beta builds in a recent comment on the Android Gerrit.",
            "url": "https://www.androidauthority.com/android-16-beta-release-date-3517882/",
            "urlToImage": "https://www.androidauthority.com/wp-content/uploads/2024/11/Android-16-logo-on-smartphone-11.jpg",
            "publishedAt": "2025-01-19T10:45:16Z",
            "content": "<ul><li>The official Android 16 release timeline states that Google will release the first three beta builds in January, February, and March.</li><li>A Googler has revealed the potential release date… [+1839 chars]"
        },
        {
            "source": {
                "id": "buzzfeed",
                "name": "Buzzfeed"
            },
            "author": "Taylor Steele",
            "title": "31 Genius Products You’ll Wish You’d Gone On “Shark Tank” With - BuzzFeed",
            "description": "You might've missed the boat on inventing these products, but don't let that stop you from owning them now.",
            "url": "https://www.buzzfeed.com/taylor_steele/genius-items-youll-wish-youd-gone-on-shark-tank-an",
            "urlToImage": "https://img.buzzfeed.com/buzzfeed-static/static/2025-01/3/17/enhanced/58c0a277aaaf/original-2228-1735924865-2.jpg?crop=3000:1575;0,0%26downsize=1250:*",
            "publishedAt": "2025-01-19T04:31:02Z",
            "content": "And BuzzFeed writer Melanie Aman is in love with this thing:\r\n\"This stuff is MAGICAL. I have stick-straight Asian lashes that refuse to hold a curl with wetter mascara formulas. As a result, I have t… [+445 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "SciTechDaily"
            },
            "author": null,
            "title": "100x Faster: Light-Powered Memory That’s Revolutionizing Computing - SciTechDaily",
            "description": "A new era in computing is emerging as researchers overcome the limitations of Moore's Law through photonics. This cutting-edge approach boosts processing speeds and slashes energy use, potentially revolutionizing AI and machine learning applications. Photonic…",
            "url": "https://scitechdaily.com/100x-faster-light-powered-memory-thats-revolutionizing-computing/",
            "urlToImage": "https://scitechdaily.com/images/Photonic-Memory-Array-Artist-Concept.jpg",
            "publishedAt": "2025-01-19T03:31:23Z",
            "content": "Artist’s concept illustration of a photonic memory array. Credit: Brian Long\r\nA new era in computing is emerging as researchers overcome the limitations of Moore’s Law through photonics.\r\nThis cuttin… [+4010 chars]"
        },
        {
            "source": {
                "id": "buzzfeed",
                "name": "Buzzfeed"
            },
            "author": "Emma Lord",
            "title": "These 44 Reliable Products Have Some Real “I’m In My Thirties And Too Tired For Nonsense” Energy - BuzzFeed",
            "description": "You have spent too many years trying too many subpar products — you deserve this holy grail dry shampoo and game-changing \"no scrub\" shower cleaner as a reward.",
            "url": "https://www.buzzfeed.com/emmalord9/reliable-thirties-products",
            "urlToImage": "https://img.buzzfeed.com/buzzfeed-static/static/2025-01/9/16/enhanced/5f7af13e5dc7/original-3329-1736441328-2.jpg?crop=3001:1575;0,0%26downsize=1250:*",
            "publishedAt": "2025-01-19T01:01:06Z",
            "content": "Check out a TikTok of the foot masks in action. \r\nI'm a long-ish distance runner, and these were certainly an interesting experience for my feet! You slide them on and, after a few minutes, feel a ti… [+653 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "ComicBook.com"
            },
            "author": "Tyler Fischer",
            "title": "Indiana Jones Fans Surprised With New Release Coming Next Week - ComicBook.com",
            "description": "Indiana Jones fans have begun 2025 with a special new release that is set to be available for free for some.",
            "url": "http://comicbook.com/gaming/news/indiana-jones-game-new-release/",
            "urlToImage": "https://comicbook.com/wp-content/uploads/sites/4/2025/01/i-n-d-i-a-n-a-j-o-n-e-s_cac44e.png?resize=2000,1125",
            "publishedAt": "2025-01-18T23:23:44Z",
            "content": "Indiana Jones fans have been surprised with a new release coming next week. After being dormant for several years, the Indiana Jones series has started to make a significant return. In 2023, there wa… [+2106 chars]"
        }
    ]
}

const fetchNewsApiData = async (searchTerm: string) => {
  //fetch "top-headlines/sources" from newsApiClient to get the category of each sources    
  // const newsApiSources = await newsApiClient.get('/sources');
  const newsApiSources = {data:sourcess};
  // To create a mapping of sources to their respective categories
  const newsApiCategoriesMap = {};
  newsApiSources.data.sources.forEach((source: { category: string; id: string; }) => 
  {
    newsApiCategoriesMap[source.id] = source.category;
  });
  
  const params: Record<string, string> = { q: searchTerm };

  try {
    // const response = await newsApiClient.get('/top-headlines', { params });
    const response = {data:sources1};
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
    const finaldata = response?.data?.response?.results?.map((article:any) => ({
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
    // const response = await newYorkTimesApiClient.get('/home.json');
    const response = await new Promise((resolve, reject) => {
      resolve({
        "data": {
        "status": "OK",
        "copyright": "Copyright (c) 2025 The New York Times Company. All Rights Reserved.",
        "section": "home",
        "last_updated": "2025-01-20T13:31:22-05:00",
        "num_results": 25,
        "results": [
            {
                "section": "us",
                "subsection": "politics",
                "title": "Biden Pardons 5 Members of His Family in Final Minutes in Office",
                "abstract": "Mr. Biden emphasized that he did not believe his family did anything wrong, but he feared political attacks by Donald J. Trump.",
                "url": "https://www.nytimes.com/2025/01/20/us/politics/biden-pardons-family.html",
                "uri": "nyt://article/e4fa5ff0-c930-54ba-b97b-2a4f1a0f4bb5",
                "byline": "By Michael D. Shear",
                "item_type": "Article",
                "updated_date": "2025-01-20T12:23:55-05:00",
                "created_date": "2025-01-20T11:55:10-05:00",
                "published_date": "2025-01-20T11:55:10-05:00",
                "material_type_facet": "",
                "kicker": "",
                "des_facet": [
                    "United States Politics and Government",
                    "Amnesties, Commutations and Pardons"
                ],
                "org_facet": [],
                "per_facet": [
                    "Biden, Joseph R Jr"
                ],
                "geo_facet": [],
                "multimedia": [
                    {
                        "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20executive-orders-blog-new-biden-pardon-family-01-kzhp/20executive-orders-blog-new-biden-pardon-family-01-kzhp-superJumbo.jpg",
                        "format": "Super Jumbo",
                        "height": 1365,
                        "width": 2048,
                        "type": "image",
                        "subtype": "photo",
                        "caption": "President Biden at the beginning of the swearing in ceremony inside the Capitol on Monday.",
                        "copyright": "Kenny Holston/The New York Times"
                    },
                    {
                        "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20executive-orders-blog-new-biden-pardon-family-01-kzhp/20executive-orders-blog-new-biden-pardon-family-01-kzhp-threeByTwoSmallAt2X.jpg",
                        "format": "threeByTwoSmallAt2X",
                        "height": 400,
                        "width": 600,
                        "type": "image",
                        "subtype": "photo",
                        "caption": "President Biden at the beginning of the swearing in ceremony inside the Capitol on Monday.",
                        "copyright": "Kenny Holston/The New York Times"
                    },
                    {
                        "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20executive-orders-blog-new-biden-pardon-family-01-kzhp/20executive-orders-blog-new-biden-pardon-family-01-kzhp-thumbLarge.jpg",
                        "format": "Large Thumbnail",
                        "height": 150,
                        "width": 150,
                        "type": "image",
                        "subtype": "photo",
                        "caption": "President Biden at the beginning of the swearing in ceremony inside the Capitol on Monday.",
                        "copyright": "Kenny Holston/The New York Times"
                    }
                ],
                "short_url": ""
            },
            {
                "section": "us",
                "subsection": "politics",
                "title": "Here Are Trump’s Expected Executive Orders",
                "abstract": "The incoming president’s team said he would take unilateral action on a variety of fronts during his first hours in office, including 10 executive orders cracking down on immigration and immigrants.",
                "url": "https://www.nytimes.com/2025/01/20/us/politics/trump-executive-orders-list.html",
                "uri": "nyt://article/5a21a321-5cc8-502e-a032-f2db8defa72f",
                "byline": "By Zolan Kanno-Youngs and Michael D. Shear",
                "item_type": "Article",
                "updated_date": "2025-01-20T13:05:52-05:00",
                "created_date": "2025-01-20T10:15:04-05:00",
                "published_date": "2025-01-20T10:15:04-05:00",
                "material_type_facet": "",
                "kicker": "",
                "des_facet": [
                    "Executive Orders and Memorandums",
                    "United States Politics and Government"
                ],
                "org_facet": [],
                "per_facet": [
                    "Trump, Donald J"
                ],
                "geo_facet": [],
                "multimedia": [
                    {
                        "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20dc-trump-orders-list-cpbg/20dc-trump-orders-list-cpbg-superJumbo.jpg",
                        "format": "Super Jumbo",
                        "height": 1365,
                        "width": 2048,
                        "type": "image",
                        "subtype": "photo",
                        "caption": "The Capitol building in Washington on Monday.",
                        "copyright": "Chang W. Lee/The New York Times"
                    },
                    {
                        "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20dc-trump-orders-list-cpbg/20dc-trump-orders-list-cpbg-threeByTwoSmallAt2X.jpg",
                        "format": "threeByTwoSmallAt2X",
                        "height": 400,
                        "width": 600,
                        "type": "image",
                        "subtype": "photo",
                        "caption": "The Capitol building in Washington on Monday.",
                        "copyright": "Chang W. Lee/The New York Times"
                    },
                    {
                        "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20dc-trump-orders-list-cpbg/20dc-trump-orders-list-cpbg-thumbLarge.jpg",
                        "format": "Large Thumbnail",
                        "height": 150,
                        "width": 150,
                        "type": "image",
                        "subtype": "photo",
                        "caption": "The Capitol building in Washington on Monday.",
                        "copyright": "Chang W. Lee/The New York Times"
                    }
                ],
                "short_url": ""
            },
          ]
    }})});
    const finaldata = response?.data?.results?.map((article:any) => ({
      ...article, 
      category: article.section,
      url:  article.url,
      title: article.title,
      description: article.abstract,
      urlToImage: article.multimedia[0]?.url,
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