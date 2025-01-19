import { newsApiClient, guardianApiClient} from './apiClient.ts';

const fetchAggregatedData = async (
  searchTerm: string,
  sources: string,
  category: string,
  authors: string
) => {
  const params: Record<string, string> = {};
  if (searchTerm) params.q = searchTerm ? searchTerm : "";
  if (sources) params.sources = sources;
  // if (category) params.category = category;
  if (authors) params.authors = authors;
  
  // const response = await newsApiClient.get('/top-headlines', { params });
  const response: any = await new Promise((res,rej)=>{
    setTimeout(()=>{
      res({
        "status": "ok",
        "totalResults": 34,
        "articles": [
        {
        "source": {
        "id": null,
        "name": "BBC News"
        },
        "author": null,
        "title": "Israel's cabinet approves Gaza ceasefire and hostage release deal - BBC.com",
        "description": "The vote paves the way for exchanges of Israeli hostages for Palestinian prisoners to begin on Sunday.",
        "url": "https://www.bbc.com/news/articles/cvg44dkz551o",
        "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/11dd/live/5e8abfe0-d4e7-11ef-9aad-49f5f16e12eb.jpg",
        "publishedAt": "2025-01-18T06:07:46Z",
        "content": "Israel's Security Cabinet approved the deal earlier, saying it \"supports the achievement of the objectives of the war\"\r\nIsrael's government has approved the new Gaza ceasefire and hostage release dea… [+7114 chars]"
        },
        {
        "source": {
        "id": "the-washington-post",
        "name": "The Washington Post"
        },
        "author": "Dylan Wells",
        "title": "Vivek Ramaswamy plans to announce Ohio gubernatorial run - The Washington Post",
        "description": "The  co-leader of Trump’s Department of Government Efficiency initiative plans to announce a run for Ohio governor, two people familiar with his plans said.",
        "url": "https://www.washingtonpost.com/politics/2025/01/17/vivek-ramaswamy-ohio-governor-run/",
        "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/LECM5U5YKUKZJ64FFLOWWQ7KMI.JPG&w=1440",
        "publishedAt": "2025-01-18T04:42:17Z",
        "content": "Biotech entrepreneur and former presidential candidate Vivek Ramaswamy plans to run for Ohio governor, according to two people familiar with his plans who say that the co-leader of President-elect Do… [+1824 chars]"
        },
        {
        "source": {
        "id": "cbs-news",
        "name": "CBS News"
        },
        "author": "Camilo Montoya-Galvez, Fin Gómez",
        "title": "ICE planning to ramp up arrests in major U.S. cities after Trump takes office, sources say - CBS News",
        "description": "The locations expected to be targeted by deportation teams from ICE include those with large populations of immigrants, one source said.",
        "url": "https://www.cbsnews.com/news/ice-planning-increase-arrests-undocumented-immigrants-major-u-s-cities-after-trump-takes-office/",
        "urlToImage": "https://assets2.cbsnewsstatic.com/hub/i/r/2025/01/18/c5beb85d-9bce-4f73-85c6-7275447d5602/thumbnail/1200x630/4600494d50c428af17d088fd81af7474/gettyimages-2190505867.jpg?v=b37f0cace52a6645c18f53563f47da2c",
        "publishedAt": "2025-01-18T04:38:00Z",
        "content": "Washington — The incoming Trump administration is planning to ramp up operations to arrest unauthorized immigrants across major U.S. cities next week after President-elect Donald Trump takes office, … [+2212 chars]"
        },
        {
        "source": {
        "id": null,
        "name": "KSL.com"
        },
        "author": "Laura Ungar, Associated Press",
        "title": "Finding sheds light on what causes Huntington's disease, a devastating fatal brain disorder - KSL.com",
        "description": "Scientists are unraveling the mystery of what triggers Huntington's disease, a devastating hereditary disorder that strikes in the prime of life.",
        "url": "https://www.ksl.com/article/51230613/finding-sheds-light-on-what-causes-huntingtons-disease-a-devastating-fatal-brain-disorder",
        "urlToImage": "https://img.ksl.com/slc/3036/303629/30362953.jpg?filter=kslv2/responsive_story_lg",
        "publishedAt": "2025-01-18T02:59:08Z",
        "content": "BOSTON Scientists are unraveling the mystery of what triggers Huntington's disease, a devastating and fatal hereditary disorder that strikes in the prime of life, causing nerve cells in parts of the … [+3862 chars]"
        },
        {
        "source": {
        "id": null,
        "name": "TVLine"
        },
        "author": "Dave Nemetz",
        "title": "David Lynch Was Working on a Netflix Series ‘Filled With Mystery and Risks’ Before His Death, Ted Sarandos Says - TVLine",
        "description": "Celebrated auteur David Lynch was working on a limited series for Netflix prior to his death, CEO Ted Sarandos revealed — get the details.",
        "url": "https://tvline.com/news/david-lynch-netflix-series-death-ted-sarandos-tribute-1235400356/",
        "urlToImage": "https://tvline.com/wp-content/uploads/2025/01/david-lynch-netflix-series.jpg?w=650",
        "publishedAt": "2025-01-18T02:11:42Z",
        "content": "Sadly, we never got to see David Lynch‘s final project make it to television.\r\nThe celebrated auteur, who died Thursday at the age of 78, was working on a limited series for Netflix in the years prec… [+1288 chars]"
        },
        {
        "source": {
        "id": "cnn",
        "name": "CNN"
        },
        "author": "Jackie Wattles, Kia Fatahi",
        "title": "Regulators are investigating reports of property damage from SpaceX Starship’s explosion - CNN",
        "description": "The FAA says it has grounded the Starship vehicle pending a mishap investigation, and it’s working with SpaceX to assess reports of property damage in Turks and Caicos.",
        "url": "https://www.cnn.com/2025/01/17/science/spacex-starship-explosion-investigation/index.html",
        "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/2025-01-17t024724z-676391000-rc2ebcagya7x-rtrmadp-3-space-exploration-starship.JPG?c=16x9&q=w_800,c_fill",
        "publishedAt": "2025-01-18T02:11:00Z",
        "content": "Sign up for CNNs Wonder Theory science newsletter. Explore the universe with news on fascinating discoveries, scientific advancements and more.\r\nUS regulators and government officials in Turks and Ca… [+9983 chars]"
        },
        {
        "source": {
        "id": "the-wall-street-journal",
        "name": "The Wall Street Journal"
        },
        "author": "Alexandra Wexler",
        "title": "Hundreds of Miners Were Trapped for Months—Until an Extraordinary Two-Man Rescue Mission - The Wall Street Journal",
        "description": "Volunteers risked their lives to venture thousands of feet underground and retrieve their neighbors. What they found was horrific.",
        "url": "https://www.wsj.com/world/asia/trapped-miners-south-africa-rescue-misson-fb99d8ec",
        "urlToImage": "https://images.wsj.net/im-22411540/social",
        "publishedAt": "2025-01-18T02:00:00Z",
        "content": "STILFONTEIN, South AfricaWith hundreds of miners trapped below ground without food or water, two men from down the road volunteered to venture where no police, government officials or professional re… [+599 chars]"
        },
        {
        "source": {
        "id": null,
        "name": "Deadline"
        },
        "author": "Rosy Cordero, Nellie Andreeva",
        "title": "‘Frasier’ Canceled By Paramount+ After 2 Seasons; Revival Will Be Shopped By CBS Studios - Deadline",
        "description": "Paramount+ has opted not to renew Frasier for a third season. Producer CBS Studios remains committed to the series and will it to other outlets.",
        "url": "http://deadline.com/2025/01/frasier-canceled-paramount-plus-no-season-3-shopped-new-home-1236260286/",
        "urlToImage": "https://deadline.com/wp-content/uploads/2025/01/Frasier.jpg?w=1024",
        "publishedAt": "2025-01-18T01:30:00Z",
        "content": "Frasier‘s return has hit a major bump. Paramount+ has opted not to renew the Kelsey Grammer-led comedy for a third season. Producer CBS Studios remains committed to the series and plans to shop it to… [+2701 chars]"
        },
        {
        "source": {
        "id": "the-washington-post",
        "name": "The Washington Post"
        },
        "author": "Emily Davies, Michael Brice-Saddler, Ellie Silverman",
        "title": "How moving Trump’s inauguration inside spurred an all-out scramble - The Washington Post",
        "description": "The sudden weather-induced change forced a scramble for hundreds of thousands of people who had spent months planning for the swearing-in of the nation’s 47th president.",
        "url": "https://www.washingtonpost.com/dc-md-va/2025/01/17/why-trump-inauguration-moved-indoors-capitol-rotunda-extreme-cold/",
        "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/YIN66QVQRQQQIV5VZERUNWB6BQ_size-normalized.JPG&w=1440",
        "publishedAt": "2025-01-18T00:54:55Z",
        "content": "President-elect Donald Trump on Friday ordered his inauguration moved indoors for the first time in four decades, a sudden weather-induced change that forced a scramble for hundreds of thousands of p… [+8367 chars]"
        },
        {
        "source": {
        "id": null,
        "name": "San Francisco Chronicle"
        },
        "author": "Aidin Vaziri",
        "title": "Experts warn of a ‘quad-demic’ as flu, RSV, COVID-19 and norovirus converge in California - San Francisco Chronicle",
        "description": "California is seeing a rise in COVID-19, flu, RSV and norovirus cases, prompting warnings of a “quad-demic” that could strain health care systems.",
        "url": "https://www.sfchronicle.com/health/article/california-faces-quad-demic-as-viral-20041052.php",
        "urlToImage": "https://s.hdnux.com/photos/01/46/55/07/26923476/3/rawImage.jpg",
        "publishedAt": "2025-01-17T23:48:08Z",
        "content": "California is seeing a rise in COVID-19, flu, RSV and norovirus cases, prompting warnings of a quad-demic that could strain health care systems.\r\nGuido Mieth/Getty Images\r\nAfter the holiday season an… [+6779 chars]"
        },
        {
        "source": {
        "id": "reuters",
        "name": "Reuters"
        },
        "author": "Jack Queen",
        "title": "CNN settles with US Navy veteran after $5 million defamation verdict - Reuters",
        "description": "CNN reached a settlement on Friday with a U.S. Navy veteran who helped evacuate people from Afghanistan after the U.S. military withdrew from the country in 2021, a judge said on Friday, hours after a jury found the TV news outlet liable for defaming him.",
        "url": "https://www.reuters.com/legal/cnn-found-liable-defaming-us-navy-veteran-who-helped-people-evacuate-afghanistan-2025-01-17/",
        "urlToImage": "https://www.reuters.com/resizer/v2/GX65ITFCNJKEZO7RVXTWUAYDDM.jpg?auth=800837212f25ddf9ce883be9fc815da8df8e05ce2b33434be1860cbcd6e12c2b&height=1005&width=1920&quality=80&smart=true",
        "publishedAt": "2025-01-17T23:34:09Z",
        "content": null
        },
        {
        "source": {
        "id": "espn",
        "name": "ESPN"
        },
        "author": "Alden Gonzalez",
        "title": "Japanese star Sasaki says he's joining Dodgers - ESPN",
        "description": "Roki Sasaki, the prized Japanese pitching prospect who has had scouts drooling over his potential since high school, has chosen the Los Angeles Dodgers as his major league team, he announced on Instagram on Friday.",
        "url": "https://www.espn.com/mlb/story/_/id/43457102/japanese-star-roki-sasaki-says-joining-dodgers",
        "urlToImage": "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2025%2F0114%2Fmlb_roki_sasaki_dodgers_fc_16x9.jpg",
        "publishedAt": "2025-01-17T23:26:00Z",
        "content": "Roki Sasaki, the prized Japanese pitching prospect who has had scouts drooling over his potential since high school, has chosen the Los Angeles Dodgers as his major league team, he announced on Insta… [+5158 chars]"
        },
        {
        "source": {
        "id": "reuters",
        "name": "Reuters"
        },
        "author": "Reuters",
        "title": "US awards Moderna $590 million for bird flu vaccine development - Reuters",
        "description": "The U.S. government has awarded Moderna $590 million to advance the development of its bird flu vaccine, as the country doubles down on efforts to tackle increasing infections in humans.",
        "url": "https://www.reuters.com/business/healthcare-pharmaceuticals/us-awards-moderna-590-million-bird-flu-vaccine-development-2025-01-17/",
        "urlToImage": "https://www.reuters.com/resizer/v2/Q4CLEKHTANONJA2GIMMU7BMBTA.jpg?auth=cf3439b5610a576d3ca5e628adcf0d23e13f19c833d6d4ee805ec91000371b72&height=1005&width=1920&quality=80&smart=true",
        "publishedAt": "2025-01-17T23:05:41Z",
        "content": null
        },
        {
        "source": {
        "id": "politico",
        "name": "Politico"
        },
        "author": "Jasper Goodman",
        "title": "Crypto firms pour millions into Trump inauguration - POLITICO",
        "description": "Crypto executives and their lobbyists are scrambling to gain sway over the incoming administration.",
        "url": "https://www.politico.com/news/2025/01/17/crypto-money-trump-inauguration-00199088",
        "urlToImage": "https://static.politico.com/b8/b4/76640b3a4c98a464e550fa90cb34/trump-crypto-68359.jpg",
        "publishedAt": "2025-01-17T23:00:00Z",
        "content": "The donations, which will fund the glitzy official events surrounding the inauguration, exemplify the giddiness across the digital asset sector as Trump prepares to become the first-ever explicitly p… [+3834 chars]"
        },
        {
        "source": {
        "id": null,
        "name": "New York Post"
        },
        "author": "Sean Mandell",
        "title": "Meghan Markle and Prince Harry are ‘so hot for each other,’ former colleague says - New York Post ",
        "description": "Hot for Harry; mad for Meghan.",
        "url": "https://nypost.com/2025/01/17/entertainment/meghan-markle-prince-harry-so-hot-for-each-other-former-colleague/",
        "urlToImage": "https://nypost.com/wp-content/uploads/sites/2/2025/01/96864012.jpg?quality=75&strip=all&w=1024",
        "publishedAt": "2025-01-17T22:46:00Z",
        "content": "Hot for Harry; mad for Meghan.\r\nOver six years into their marriage, Prince Harry and Meghan Markle are as loved-up as ever, according to a former colleague. \r\nThey are so hot for each other, one pers… [+2976 chars]"
        },
        {
        "source": {
        "id": "ign",
        "name": "IGN"
        },
        "author": "Rebekah Valentine",
        "title": "Nintendo Switch 2 Is a Great Name for Nintendo's New Console, Analysts Say - IGN",
        "description": "Super Nintendo Switch. Nintendo Switch Pro. New Nintendo Switch. All were floated as potential names for Nintendo's new console. But Nintendo settled on the most normal possibility of all, which also just happened to be the most abnormal one for Nintendo spec…",
        "url": "https://www.ign.com/articles/nintendo-switch-2-is-a-great-name-for-nintendos-new-console-analysts-say",
        "urlToImage": "https://assets-prd.ignimgs.com/2025/01/16/1-1737032881143.png?width=1280",
        "publishedAt": "2025-01-17T22:41:03Z",
        "content": "Super Nintendo Switch. Nintendo Switch Pro. New Nintendo Switch. Swiitch. Switch U. New Nintendo Switch HD 3D XL Final Chapter Prologue. All were floated as potential names for Nintendo's new console… [+3441 chars]"
        },
        {
        "source": {
        "id": "associated-press",
        "name": "Associated Press"
        },
        "author": "ISABELLA O'MALLEY, NADIA LATHAN",
        "title": "A battery plant fire in California started during a boom for energy storage - The Associated Press",
        "description": "A fire at a one of the world’s largest battery plants in California contained tens of thousands of lithium batteries that store power from renewable energy sources. The batteries have become a growing source of electricity in California and Texas, where extre…",
        "url": "https://apnews.com/article/batteries-fire-climate-california-e5957a710670930ca23c4b2d2e3ed75f",
        "urlToImage": "https://dims.apnews.com/dims4/default/41ebc3e/2147483647/strip/true/crop/1600x900+0+56/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F1f%2Fda%2F594fe9f3970815e69621f93352c1%2F58cc19e5b8174706a54ae5ae6a469fdb",
        "publishedAt": "2025-01-17T22:19:00Z",
        "content": "AUSTIN, Texas (AP) A fire at one of the worlds largest battery plants in Northern California contained tens of thousands of lithium batteries that store power from renewable energy and have become a … [+4646 chars]"
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
        "publishedAt": "2025-01-17T22:10:00Z",
        "content": "[Removed]"
        },
        {
        "source": {
        "id": null,
        "name": "Variety"
        },
        "author": "Ethan Shanfeld",
        "title": "'Severance' Recap Season 2 Episode 1: Why Helly Lies, Gemma Ending - Variety",
        "description": "'Severance' creator Dan Erickson breaks down Season 2, Episode 1, including Helly's lie, that Gemma tease and the new child boss.",
        "url": "https://variety.com/2025/tv/news/severance-recap-season-2-episode-1-why-helly-lies-1236276867/",
        "urlToImage": "https://variety.com/wp-content/uploads/2025/01/Severance_Photo_020107-e1737085054948.jpg?crop=0px%2C126px%2C4590px%2C2581px&resize=1000%2C563",
        "publishedAt": "2025-01-17T22:00:00Z",
        "content": "SPOILER ALERT: This story contains spoilers for Season 2, Episode 1 of “Severance,” streaming now on Apple TV+.\r\nThe Season 1 finale of “Severance” left audiences with a cruel, spectacular cliffhange… [+15210 chars]"
        },
        {
        "source": {
        "id": "reuters",
        "name": "Reuters"
        },
        "author": "Jeff Mason, Susan Heavey",
        "title": "Biden declares Equal Rights Amendment US law, even though it is not - Reuters",
        "description": "U.S. President Joe Biden called the Equal Rights Amendment \"the law of the land,\" on Friday, backing an effort to enshrine the change into the U.S. Constitution even though it long ago failed to secure the approval of enough states to become an amendment.",
        "url": "https://www.reuters.com/world/us/biden-says-equal-rights-amendment-is-law-land-2025-01-17/",
        "urlToImage": "https://www.reuters.com/resizer/v2/5RSBAUXPHBLWBILG6FMYX7APIY.jpg?auth=239c02cd34f2a9e9920eb7a3f1568f3936b3b69087e53bd40f39f7a2168f81a7&height=1005&width=1920&quality=80&smart=true",
        "publishedAt": "2025-01-17T21:45:33Z",
        "content": null
        }
        ]
        })
    }, 1000)
  })
  // const response = await guardianApiClient.get('/search', { params });
  return response.articles;
};

export { fetchAggregatedData };