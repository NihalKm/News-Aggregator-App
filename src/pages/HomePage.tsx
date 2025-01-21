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
import { NewsCard, NewsCardSkeleton } from '../components/NewsCard.tsx';
import { Tune, Newspaper, ArrowBack, CalendarMonth } from '@mui/icons-material';

const comb = [
  {
      "source": {
          "id": null,
          "name": "CNBC"
      },
      "author": "Ganesh Rao, Holly Ellyatt",
      "title": "European markets open flat ahead of Trump's inauguration as the 47th president of the U.S. - CNBC",
      "description": "European markets start the new trading week flat, with market attention on the inauguration of U.S. President-elect Donald Trump.",
      "url": "https://www.cnbc.com/2025/01/20/european-markets-live-updates-stocks-news-data-and-earnings.html",
      "urlToImage": "https://image.cnbcfm.com/api/v1/image/108081480-1735836135577-gettyimages-2191545935-AFP_36RV3X9.jpeg?v=1735836200&w=1920&h=1080",
      "publishedAt": "2025-01-20T10:19:00Z",
      "content": "European markets have started the new trading week flat, with market attention on the inauguration of U.S. President-elect Donald Trump later in the day.Most major indexes were marginally in the gree… [+1116 chars]",
      "date": "2025-01-20T10:19:00Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": null,
          "name": "Yahoo Entertainment"
      },
      "author": "Nell Mackenzie and Tom Westbrook",
      "title": "Dollar dips, stocks creep higher as second Trump term dawns - Yahoo Finance",
      "description": "LONDON/SINGAPORE (Reuters) -The dollar drifted lower and stocks were cautiously positive on Monday as investors awaited an expected flurry of policy...",
      "url": "https://finance.yahoo.com/news/dollar-strong-stocks-creep-higher-011653741.html",
      "urlToImage": "https://media.zenfs.com/en/reuters-finance.com/71c0befb8ed416c4b76492c7ceaca708",
      "publishedAt": "2025-01-20T10:02:57Z",
      "content": "By Nell Mackenzie and Tom Westbrook\r\nLONDON/SINGAPORE (Reuters) -The dollar drifted lower and stocks were cautiously positive on Monday as investors awaited an expected flurry of policy announcements… [+3587 chars]",
      "date": "2025-01-20T10:02:57Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": "associated-press",
          "name": "Associated Press"
      },
      "author": "The Associated Press",
      "title": "Live updates: Israel releases 90 Palestinian prisoners as part of ceasefire deal with Hamas - The Associated Press",
      "description": "A ceasefire in the Gaza Strip took effect on Sunday following an almost three-hour delay. Hamas released three hostages Sunday and Israel released 90 Palestinian prisoners early Monday.",
      "url": "https://apnews.com/live/mideast-israel-gaza-updates-1-19-25",
      "urlToImage": "https://dims.apnews.com/dims4/default/0548cbb/2147483647/strip/true/crop/1280x720+0+0/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F38%2F69%2Fd80a1acf49ea98f588c64cb6da5e%2Fpalestinianprisonerssite.jpg",
      "publishedAt": "2025-01-20T09:12:00Z",
      "content": "A drone photo shows humanitarian aid trucks enter through the Kerem Shalom crossing from Egypt into the Gaza Strip, as a ceasefire deal between Israel and Hamas went into effect, Sunday, Jan. 19, 202… [+1315 chars]",
      "category": "general",
      "date": "2025-01-20T09:12:00Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": null,
          "name": "NBCSports.com"
      },
      "author": "Michael David Smith",
      "title": "John Harbaugh, Lamar Jackson defend Mark Andrews after fumble and drop in Ravens' loss - NBC Sports",
      "description": "Ravens tight end Mark Andrews had a brutal fourth quarter in Sunday's loss to the Bills, losing a fumble and then dropping a game-tying two-point conversion attempt.",
      "url": "https://www.nbcsports.com/nfl/profootballtalk/rumor-mill/news/john-harbaugh-lamar-jackson-defend-mark-andrews-after-fumble-and-drop-in-ravens-loss",
      "urlToImage": "https://nbcsports.brightspotcdn.com/dims4/default/9238bc1/2147483647/strip/true/crop/4175x2348+0+217/resize/1440x810!/quality/90/?url=https%3A%2F%2Fnbc-sports-production-nbc-sports.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fb6%2F86%2F03fcc3c748a0badd09956d451fec%2Fhttps-delivery-gettyimages.com%2Fdownloads%2F2194258856",
      "publishedAt": "2025-01-20T09:07:49Z",
      "content": "Ravens tight end Mark Andrews had a brutal fourth quarter in Sundays loss to the Bills, losing a fumble and then dropping a game-tying two-point conversion attempt. After the game, coach John Harbaug… [+1009 chars]",
      "date": "2025-01-20T09:07:49Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": null,
          "name": "[Removed]"
      },
      "author": null,
      "title": "[Removed]",
      "description": "[Removed]",
      "url": null,
      "urlToImage": null,
      "publishedAt": "2025-01-20T08:54:41Z",
      "content": "[Removed]",
      "date": "2025-01-20T08:54:41Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": null,
          "name": "TMZ"
      },
      "author": "TMZ Staff",
      "title": "Jennifer Parker in 'Back To The Future' 'Memba Her?! - TMZ",
      "description": "American actress Claudia Wells was 18 years old when she played the role of Jennifer Parker in the 1985 sci-fi film \"Back to the Future.\" Guess what she looks like now!",
      "url": "https://www.tmz.com/2025/01/20/jennifer-parker-in-back-to-the-future-memba-her/",
      "urlToImage": "https://imagez.tmz.com/image/bd/16by9/2025/01/10/bd0a872ef2ae478c86d04e510e78c3eb_xl.jpg",
      "publishedAt": "2025-01-20T08:30:26Z",
      "content": "American actress Claudia Wells was 18 years old when she played the role of Jennifer Parker -- Marty McFly's sweet and caring girlfriend who prevents the Tannen family from taking over the future -- … [+520 chars]",
      "date": "2025-01-20T08:30:26Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": null,
          "name": "NBC Southern California"
      },
      "author": "NBC Staff",
      "title": "Live updates: Increased fire risk to accompany Santa Ana winds' return - NBC Los Angeles",
      "description": "Continuing coverage on the Eaton and Palisades Fires in Los Angeles County.",
      "url": "https://www.nbclosangeles.com/news/local/nbc4-liveblog-wildfires-eaton-palisades-jan-18-2025/3609090/",
      "urlToImage": "https://media.nbclosangeles.com/2025/01/GettyImages-2193560363.jpg?quality=85&strip=all&resize=1200%2C675",
      "publishedAt": "2025-01-20T08:15:00Z",
      "content": "This live blog has expired. Check back for updates\r\n<ul><li>The Palisades Fire is now 52% contained at 23,700 acres. The Eaton Fire is 81% contained at 14,100 acres.</li><li>More than two dozen death… [+460 chars]",
      "date": "2025-01-20T08:15:00Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": null,
          "name": "PhoneArena"
      },
      "author": "Anam Hamid",
      "title": "Leaked Galaxy S25 Ultra images seem to confirm Samsung's self-sabotaging move - PhoneArena",
      "description": "Promotional material seems to confirm our worst Galaxy S25 Ultra fear.",
      "url": "https://www.phonearena.com/news/Leaked-Galaxy-S25-Ultra-images-seem-to-confirm-Samsungs-self-sabotaging-move_id166774",
      "urlToImage": "https://m-cdn.phonearena.com/images/article/166774-wide-two_1200/Leaked-Galaxy-S25-Ultra-images-seem-to-confirm-Samsungs-self-sabotaging-move.jpg",
      "publishedAt": "2025-01-20T07:46:29Z",
      "content": "With the Galaxy S25 Ultra launch week finally here, leaks are intensifying. A promotional video briefly went online two days ago before being pulled from the internet. Some new official-looking of th… [+1681 chars]",
      "date": "2025-01-20T07:46:29Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": null,
          "name": "Www.geo.tv"
      },
      "author": "Web Desk",
      "title": "‘Abandoned' Prince Harry, Meghan's dynamic explained: ‘Here's why they work' - Geo News",
      "description": "A reporter has just gotten candid about Meghan Markle and Prince Harry’s relationship, explaining why they ‘just work’.The reporter shed light on everything in their conversation with Vanity Fair for an exposé...",
      "url": "https://www.geo.tv/latest/586288-abandoned-prince-harry-meghans-dynamic-explained-heres-why-they-work",
      "urlToImage": "https://www.geo.tv/assets/uploads/updates/2025-01-20/l_586288_104452_updates.jpg",
      "publishedAt": "2025-01-20T07:11:00Z",
      "content": "A reporter has just gotten candid about Meghan Markle and Prince Harrys relationship, explaining why they just work.\r\nThe reporter shed light on everything in their conversation with Vanity Fair for … [+1777 chars]",
      "date": "2025-01-20T07:11:00Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": "cnn",
          "name": "CNN"
      },
      "author": "Michael Williams",
      "title": "What to watch at Donald Trump’s second presidential inauguration - CNN",
      "description": "Donald Trump will be sworn in as president Monday, returning to power to enact his sweeping vision of America after leaving his office in shame four years ago.",
      "url": "https://www.cnn.com/2025/01/20/politics/how-to-watch-inauguration/index.html",
      "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/c-54137875059-585392e27e-o.jpg?c=16x9&q=w_800,c_fill",
      "publishedAt": "2025-01-20T07:00:00Z",
      "content": "Donald Trump will be sworn in as president Monday, returning to power to enact his sweeping vision of America after leaving his office in shame four years ago.\r\nTrump will become the nations 47th pre… [+7203 chars]",
      "category": "general",
      "date": "2025-01-20T07:00:00Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": "axios",
          "name": "Axios"
      },
      "author": "Rebecca Falconer",
      "title": "Trump at D.C. rally vows border crackdown will begin on Inauguration Day - Axios",
      "description": "\"With historic speed and strength and fix every single crisis facing our country,\" Trump said at a pre-inauguration rally today.",
      "url": "https://www.axios.com/2025/01/19/trump-pre-inauguration-rally",
      "urlToImage": "https://images.axios.com/-1j5VNsxLIhwQNWqOGBUCnTgsHQ=/0x92:5162x2995/1366x768/2025/01/20/1737333845833.jpg",
      "publishedAt": "2025-01-20T06:40:57Z",
      "content": "President-elect Trump pledged during a pre-inauguration victory rally in Washington, D.C. to act when he begins his second term from Monday \"with historic speed and strength and fix every single cris… [+2977 chars]",
      "category": "general",
      "date": "2025-01-20T06:40:57Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": null,
          "name": "[Removed]"
      },
      "author": null,
      "title": "[Removed]",
      "description": "[Removed]",
      "url": null,
      "urlToImage": null,
      "publishedAt": "2025-01-20T06:23:00Z",
      "content": "[Removed]",
      "date": "2025-01-20T06:23:00Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": null,
          "name": "Suntimes.com"
      },
      "author": "Georgia Nicols",
      "title": "Horoscope for Monday, January 20, 2025 - Chicago Sun-Times",
      "description": null,
      "url": "https://chicago.suntimes.com/horoscopes/2025/01/20/horoscopes-today-monday-january-20-2025",
      "urlToImage": "https://cst.brightspotcdn.com/dims4/default/2145dbd/2147483647/strip/true/crop/870x497+0+67/resize/1461x834!/quality/90/?url=https%3A%2F%2Fchorus-production-cst-web.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fac%2Ffd%2F790f04b15195427014757adc0272%2Fgeorgia-nicols.jpg",
      "publishedAt": "2025-01-20T06:01:22Z",
      "content": "Moon Alert\r\nAvoid shopping or important decisions after 10 p.m. Chicago time. The moon is in Libra.\r\nAries (March 21-April 19)\r\nBe more laid back today. In particular, be patient with partners, spous… [+3888 chars]",
      "date": "2025-01-20T06:01:22Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": null,
          "name": "[Removed]"
      },
      "author": null,
      "title": "[Removed]",
      "description": "[Removed]",
      "url": null,
      "urlToImage": null,
      "publishedAt": "2025-01-20T05:12:27Z",
      "content": "[Removed]",
      "date": "2025-01-20T05:12:27Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": null,
          "name": "Barron's"
      },
      "author": "Barron's",
      "title": "Is the Stock Market Open Today? Here Are the Trading Hours for Martin Luther King Jr. Day. and Inauguration Day. - Barron's",
      "description": null,
      "url": "https://www.barrons.com/articles/stock-market-open-closed-today-inauguration-mlk-day-07a7002d",
      "urlToImage": null,
      "publishedAt": "2025-01-20T05:01:00Z",
      "content": null,
      "date": "2025-01-20T05:01:00Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": "axios",
          "name": "Axios"
      },
      "author": "Avery Lotz",
      "title": "TikTok restoring service after Trump vows to delay ban - Axios",
      "description": "Trump said there will be \"no liability for any company that helped keep TikTok from going dark before my order.\"",
      "url": "https://www.axios.com/2025/01/19/trump-tiktok-ban-delay-executive-order",
      "urlToImage": "https://images.axios.com/K87ewLAPbc03wwVTWq_t8AZ6zl4=/0x20:3368x1915/1366x768/2025/01/19/1737300096561.jpg",
      "publishedAt": "2025-01-20T04:51:18Z",
      "content": "TikTok announced it is restoring service Sunday, just hours after President-elect Trump said he would sign an executive order on his first day in office to delay enforcing the U.S. ban of the social … [+4010 chars]",
      "category": "general",
      "date": "2025-01-20T04:51:18Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": "the-wall-street-journal",
          "name": "The Wall Street Journal"
      },
      "author": "The Wall Street Journal",
      "title": "Drone Makers Looking to Steer Clear of China Fear Beijing’s Wrath - The Wall Street Journal",
      "description": null,
      "url": "https://www.wsj.com/world/asia/drone-makers-looking-to-steer-clear-of-china-fear-beijings-wrath-8fea8508",
      "urlToImage": null,
      "publishedAt": "2025-01-20T04:36:00Z",
      "content": null,
      "category": "business",
      "date": "2025-01-20T04:36:00Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": null,
          "name": "SciTechDaily"
      },
      "author": null,
      "title": "First U.S. H5N1 Death Sparks Urgency: Scientists Warn That Bird Flu Is Mutating Faster Than Expected - SciTechDaily",
      "description": "Researchers at Texas Biomed have identified nine mutations in a strain of bird flu found in a person in Texas. Bad news: This strain shows an increased ability to cause disease and is more effective at replicating in the brain. Good news: Current approved ant…",
      "url": "https://scitechdaily.com/first-u-s-h5n1-death-sparks-urgency-scientists-warn-that-bird-flu-is-mutating-faster-than-expected/",
      "urlToImage": "https://scitechdaily.com/images/Luis-Martinez-Sobrido-and-Ahmed-Mostafa-Elsayed-Texas-Biomed-Bird-Flu-Research.jpg",
      "publishedAt": "2025-01-20T04:09:59Z",
      "content": "A human strain of H5N1 bird flu isolated in Texas shows mutations enabling better replication in human cells and causing more severe disease in mice compared to a bovine strain. While the virus isn’t… [+5625 chars]",
      "date": "2025-01-20T04:09:59Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": "cnn",
          "name": "CNN"
      },
      "author": "Kevin Dotson, Homero De la Fuente, Jacob Lev, Kyle Feldscher, David Close",
      "title": "What to know from Sunday’s dramatic NFL playoff games - CNN",
      "description": "On Sunday, in both Philadelphia and upstate New York, it came down to the final drives in the snow with freezing temperatures making the ball slippery and tough to handle.",
      "url": "https://www.cnn.com/2025/01/19/sport/what-to-know-from-sundays-dramatic-nfl-playoff-games/index.html",
      "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/ap25020020229582.jpg?c=16x9&q=w_800,c_fill",
      "publishedAt": "2025-01-20T03:31:00Z",
      "content": "On Sunday, in both Philadelphia and upstate New York, it came down to the final drives in the snow with freezing temperatures making the ball slippery and tough to handle.\r\nIt was January football at… [+10519 chars]",
      "category": "general",
      "date": "2025-01-20T03:31:00Z",
      "sourceName": "News API"
  },
  {
      "source": {
          "id": null,
          "name": "Financial Times"
      },
      "author": "Myles McCormick, James Politi, Aime Williams, Felicia Schwartz",
      "title": "Donald Trump plans blitz of executive orders for first days in White House - Financial Times",
      "description": "President-elect tells a rally of supporters in Washington he will act with ‘historic speed and strength’",
      "url": "https://www.ft.com/content/79e9ae9f-66c6-481e-a412-4c6475785109",
      "urlToImage": "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Fd7c402b6-d071-4bc3-8a15-b75deeed6e8d.jpg?source=next-barrier-page",
      "publishedAt": "2025-01-20T03:21:11Z",
      "content": "Join FT Edit\r\nOnly $4.99 per month\r\nAccess to eight fresh articles a day, hand-picked by senior editors.\r\nSelected to feed your curiosity.",
      "date": "2025-01-20T03:21:11Z",
      "sourceName": "News API"
  },
  {
      "id": "commentisfree/2017/dec/12/harry-potter-magic-jk-rowling",
      "type": "article",
      "sectionId": "commentisfree",
      "sectionName": "Opinion",
      "webPublicationDate": "2017-12-12T06:00:26Z",
      "webTitle": "Harry Potter and the £4.50 chocolate frog | Alice O’Keeffe",
      "webUrl": "https://www.theguardian.com/commentisfree/2017/dec/12/harry-potter-magic-jk-rowling",
      "apiUrl": "https://content.guardianapis.com/commentisfree/2017/dec/12/harry-potter-magic-jk-rowling",
      "fields": {
          "headline": "Harry Potter and the £4.50 chocolate frog",
          "trailText": "I was delighted when my son discovered JK Rowling’s books. But the magic is in danger of being sullied by merchandise, says freelance literary critic and journalist Alice O’Keeffe",
          "byline": "Alice O'Keeffe",
          "thumbnail": "https://media.guim.co.uk/c66852bfdbebb7c12cf66b9b98ccc3fd55fafabf/0_13_640_384/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/opinion",
      "pillarName": "Opinion",
      "category": "Opinion",
      "url": "https://www.theguardian.com/commentisfree/2017/dec/12/harry-potter-magic-jk-rowling",
      "title": "Harry Potter and the £4.50 chocolate frog",
      "description": "I was delighted when my son discovered JK Rowling’s books. But the magic is in danger of being sullied by merchandise, says freelance literary critic and journalist Alice O’Keeffe",
      "urlToImage": "https://media.guim.co.uk/c66852bfdbebb7c12cf66b9b98ccc3fd55fafabf/0_13_640_384/500.jpg",
      "author": "Alice O'Keeffe",
      "date": "2017-12-12T06:00:26Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "lifeandstyle/2017/dec/13/oumuamua-interstellar-body-sent-by-aliens-notes-queries",
      "type": "article",
      "sectionId": "lifeandstyle",
      "sectionName": "Life and style",
      "webPublicationDate": "2017-12-13T11:30:01Z",
      "webTitle": "What if the interstellar body Oumuamua really was sent by aliens? | Notes and queries",
      "webUrl": "https://www.theguardian.com/lifeandstyle/2017/dec/13/oumuamua-interstellar-body-sent-by-aliens-notes-queries",
      "apiUrl": "https://content.guardianapis.com/lifeandstyle/2017/dec/13/oumuamua-interstellar-body-sent-by-aliens-notes-queries",
      "fields": {
          "headline": "What if the interstellar body Oumuamua really was sent by aliens?",
          "trailText": "The long-running series in which readers answer other readers’ questions on subjects ranging from trivial flights of fancy to profound scientific concepts",
          "thumbnail": "https://media.guim.co.uk/520c0c5de51cc2722ba7e8f5deb156167a3e96a6/0_0_1280_768/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/lifestyle",
      "pillarName": "Lifestyle",
      "category": "Life and style",
      "url": "https://www.theguardian.com/lifeandstyle/2017/dec/13/oumuamua-interstellar-body-sent-by-aliens-notes-queries",
      "title": "What if the interstellar body Oumuamua really was sent by aliens?",
      "description": "The long-running series in which readers answer other readers’ questions on subjects ranging from trivial flights of fancy to profound scientific concepts",
      "urlToImage": "https://media.guim.co.uk/520c0c5de51cc2722ba7e8f5deb156167a3e96a6/0_0_1280_768/500.jpg",
      "date": "2017-12-13T11:30:01Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "us-news/2017/dec/16/mothers-cartoon-france-us",
      "type": "article",
      "sectionId": "us-news",
      "sectionName": "US news",
      "webPublicationDate": "2017-12-16T10:00:02Z",
      "webTitle": "How new moms are supported – or not – in France v the US: a feminist cartoon",
      "webUrl": "https://www.theguardian.com/us-news/2017/dec/16/mothers-cartoon-france-us",
      "apiUrl": "https://content.guardianapis.com/us-news/2017/dec/16/mothers-cartoon-france-us",
      "fields": {
          "headline": "How new moms are supported – or not – in France v the US: a feminist cartoon",
          "trailText": "France offers full coverage for prenatal and postnatal care, but young mothers get little help afterwards. In the US, things can be even worse",
          "byline": "Emma",
          "thumbnail": "https://media.guim.co.uk/c5000a8cf7ff34bf7fec1c2bf5d2f3f534c0b735/29_339_684_411/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/news",
      "pillarName": "News",
      "category": "US news",
      "url": "https://www.theguardian.com/us-news/2017/dec/16/mothers-cartoon-france-us",
      "title": "How new moms are supported – or not – in France v the US: a feminist cartoon",
      "description": "France offers full coverage for prenatal and postnatal care, but young mothers get little help afterwards. In the US, things can be even worse",
      "urlToImage": "https://media.guim.co.uk/c5000a8cf7ff34bf7fec1c2bf5d2f3f534c0b735/29_339_684_411/500.jpg",
      "author": "Emma",
      "date": "2017-12-16T10:00:02Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "artanddesign/2018/jan/02/best-architecture-design-of-2018-windermere-vanda",
      "type": "article",
      "sectionId": "artanddesign",
      "sectionName": "Art and design",
      "webPublicationDate": "2018-01-02T15:00:19Z",
      "webTitle": "Wet docks, giant ducks and the zero-waste city: the best architecture and design of 2018",
      "webUrl": "https://www.theguardian.com/artanddesign/2018/jan/02/best-architecture-design-of-2018-windermere-vanda",
      "apiUrl": "https://content.guardianapis.com/artanddesign/2018/jan/02/best-architecture-design-of-2018-windermere-vanda",
      "fields": {
          "headline": "Wet docks, giant ducks and the zero-waste city: the best architecture and design of 2018",
          "trailText": "Windermere catches a wave, the V&amp;A unveils the city of tomorrow, and Hope to Nope harnesses the explosive power of graphic design",
          "byline": "Oliver Wainwright",
          "thumbnail": "https://media.guim.co.uk/44ce5476cf861df6496183e503aea7ad0c63f1ee/0_160_5184_3110/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/arts",
      "pillarName": "Arts",
      "category": "Art and design",
      "url": "https://www.theguardian.com/artanddesign/2018/jan/02/best-architecture-design-of-2018-windermere-vanda",
      "title": "Wet docks, giant ducks and the zero-waste city: the best architecture and design of 2018",
      "description": "Windermere catches a wave, the V&amp;A unveils the city of tomorrow, and Hope to Nope harnesses the explosive power of graphic design",
      "urlToImage": "https://media.guim.co.uk/44ce5476cf861df6496183e503aea7ad0c63f1ee/0_160_5184_3110/500.jpg",
      "author": "Oliver Wainwright",
      "date": "2018-01-02T15:00:19Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "us-news/2017/dec/22/why-medical-students-are-practicing-abortions-on-papayas",
      "type": "article",
      "sectionId": "us-news",
      "sectionName": "US news",
      "webPublicationDate": "2017-12-22T12:00:00Z",
      "webTitle": "Why medical students are practicing abortions on papayas",
      "webUrl": "https://www.theguardian.com/us-news/2017/dec/22/why-medical-students-are-practicing-abortions-on-papayas",
      "apiUrl": "https://content.guardianapis.com/us-news/2017/dec/22/why-medical-students-are-practicing-abortions-on-papayas",
      "fields": {
          "headline": "Why medical students are practicing abortions on papayas",
          "trailText": "Amid fears of a future abortion ban, a group teaches a discreet procedure using a fruit that looks a bit like the female reproductive system",
          "byline": "Joanna Walters in Philadelphia",
          "thumbnail": "https://media.guim.co.uk/30c3961339afe9edc9de8b037b969e031a410480/0_117_3500_2100/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/news",
      "pillarName": "News",
      "category": "US news",
      "url": "https://www.theguardian.com/us-news/2017/dec/22/why-medical-students-are-practicing-abortions-on-papayas",
      "title": "Why medical students are practicing abortions on papayas",
      "description": "Amid fears of a future abortion ban, a group teaches a discreet procedure using a fruit that looks a bit like the female reproductive system",
      "urlToImage": "https://media.guim.co.uk/30c3961339afe9edc9de8b037b969e031a410480/0_117_3500_2100/500.jpg",
      "author": "Joanna Walters in Philadelphia",
      "date": "2017-12-22T12:00:00Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "football/blog/2017/dec/11/atletico-get-back-to-what-they-know-and-make-la-liga-a-four-horse-race",
      "type": "article",
      "sectionId": "football",
      "sectionName": "Football",
      "webPublicationDate": "2017-12-11T15:59:13Z",
      "webTitle": "Atlético get back to what they know and make La Liga a four-horse race | Sid Lowe",
      "webUrl": "https://www.theguardian.com/football/blog/2017/dec/11/atletico-get-back-to-what-they-know-and-make-la-liga-a-four-horse-race",
      "apiUrl": "https://content.guardianapis.com/football/blog/2017/dec/11/atletico-get-back-to-what-they-know-and-make-la-liga-a-four-horse-race",
      "fields": {
          "headline": "Atlético get back to what they know and make La Liga a four-horse race",
          "trailText": "Atlético Madrid, despite a number of issues this season, remain unbeaten in the league and still feel like one of the runners who will compete for the title",
          "byline": "Sid Lowe",
          "thumbnail": "https://media.guim.co.uk/980c55e2aeaab5ea857fe43106fe4b286f39610a/0_68_3876_2326/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/sport",
      "pillarName": "Sport",
      "category": "Football",
      "url": "https://www.theguardian.com/football/blog/2017/dec/11/atletico-get-back-to-what-they-know-and-make-la-liga-a-four-horse-race",
      "title": "Atlético get back to what they know and make La Liga a four-horse race",
      "description": "Atlético Madrid, despite a number of issues this season, remain unbeaten in the league and still feel like one of the runners who will compete for the title",
      "urlToImage": "https://media.guim.co.uk/980c55e2aeaab5ea857fe43106fe4b286f39610a/0_68_3876_2326/500.jpg",
      "author": "Sid Lowe",
      "date": "2017-12-11T15:59:13Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "books/2017/dec/15/the-house-of-government-by-yuri-slezkine-review-russian-revolution",
      "type": "article",
      "sectionId": "books",
      "sectionName": "Books",
      "webPublicationDate": "2017-12-15T09:00:12Z",
      "webTitle": "The House of Government by Yuri Slezkine review – the Russian Revolution told through one building",
      "webUrl": "https://www.theguardian.com/books/2017/dec/15/the-house-of-government-by-yuri-slezkine-review-russian-revolution",
      "apiUrl": "https://content.guardianapis.com/books/2017/dec/15/the-house-of-government-by-yuri-slezkine-review-russian-revolution",
      "fields": {
          "headline": "The House of Government by Yuri Slezkine review – the Russian Revolution told through one building",
          "trailText": "A dizzying epic history of a 1931 block of flats in Moscow, home to the Soviet elite, aims to tell of the rise and fall of Bolshevism",
          "byline": "Owen Hatherley",
          "thumbnail": "https://media.guim.co.uk/8e6a50e8653652ab3c7d9e72d2ab644c77d78228/35_47_5068_3041/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/arts",
      "pillarName": "Arts",
      "category": "Books",
      "url": "https://www.theguardian.com/books/2017/dec/15/the-house-of-government-by-yuri-slezkine-review-russian-revolution",
      "title": "The House of Government by Yuri Slezkine review – the Russian Revolution told through one building",
      "description": "A dizzying epic history of a 1931 block of flats in Moscow, home to the Soviet elite, aims to tell of the rise and fall of Bolshevism",
      "urlToImage": "https://media.guim.co.uk/8e6a50e8653652ab3c7d9e72d2ab644c77d78228/35_47_5068_3041/500.jpg",
      "author": "Owen Hatherley",
      "date": "2017-12-15T09:00:12Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "politics/2017/dec/12/theresa-may-puts-tackling-climate-change-back-on-tory-agenda",
      "type": "article",
      "sectionId": "politics",
      "sectionName": "Politics",
      "webPublicationDate": "2017-12-12T00:16:51Z",
      "webTitle": "Theresa May puts tackling climate change back on Tory agenda",
      "webUrl": "https://www.theguardian.com/politics/2017/dec/12/theresa-may-puts-tackling-climate-change-back-on-tory-agenda",
      "apiUrl": "https://content.guardianapis.com/politics/2017/dec/12/theresa-may-puts-tackling-climate-change-back-on-tory-agenda",
      "fields": {
          "headline": "Theresa May puts tackling climate change back on Tory agenda",
          "trailText": "Prime minister says there is a ‘moral imperative’ to help vulnerable countries as she prepares for summit in Paris",
          "byline": "Rowena Mason Deputy political editor",
          "thumbnail": "https://media.guim.co.uk/caf34c172797dc01c2cad6a4d811c2dd16fee9fc/0_157_4724_2834/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/news",
      "pillarName": "News",
      "category": "Politics",
      "url": "https://www.theguardian.com/politics/2017/dec/12/theresa-may-puts-tackling-climate-change-back-on-tory-agenda",
      "title": "Theresa May puts tackling climate change back on Tory agenda",
      "description": "Prime minister says there is a ‘moral imperative’ to help vulnerable countries as she prepares for summit in Paris",
      "urlToImage": "https://media.guim.co.uk/caf34c172797dc01c2cad6a4d811c2dd16fee9fc/0_157_4724_2834/500.jpg",
      "author": "Rowena Mason Deputy political editor",
      "date": "2017-12-12T00:16:51Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "world/2017/dec/11/vladimir-putin-visit-to-syria-airbase-bashir-al-assad",
      "type": "article",
      "sectionId": "world",
      "sectionName": "World news",
      "webPublicationDate": "2017-12-11T16:45:08Z",
      "webTitle": "Vladimir Putin makes triumphant visit to Syria airbase",
      "webUrl": "https://www.theguardian.com/world/2017/dec/11/vladimir-putin-visit-to-syria-airbase-bashir-al-assad",
      "apiUrl": "https://content.guardianapis.com/world/2017/dec/11/vladimir-putin-visit-to-syria-airbase-bashir-al-assad",
      "fields": {
          "headline": "Vladimir Putin makes triumphant visit to Syria airbase",
          "trailText": "President Assad tells Russian leader Syrian people will never forget Russia’s help in driving Islamic State from country<br>",
          "byline": "Shaun Walker in Moscow",
          "thumbnail": "https://media.guim.co.uk/304038367f6042bea77b78b5e70c825539656984/20_345_4720_2832/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/news",
      "pillarName": "News",
      "category": "World news",
      "url": "https://www.theguardian.com/world/2017/dec/11/vladimir-putin-visit-to-syria-airbase-bashir-al-assad",
      "title": "Vladimir Putin makes triumphant visit to Syria airbase",
      "description": "President Assad tells Russian leader Syrian people will never forget Russia’s help in driving Islamic State from country<br>",
      "urlToImage": "https://media.guim.co.uk/304038367f6042bea77b78b5e70c825539656984/20_345_4720_2832/500.jpg",
      "author": "Shaun Walker in Moscow",
      "date": "2017-12-11T16:45:08Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "lifeandstyle/2017/dec/30/seasonal-gardening-advice-winter-flowering-clematis-dead-hedge-book-of-seeds",
      "type": "article",
      "sectionId": "lifeandstyle",
      "sectionName": "Life and style",
      "webPublicationDate": "2017-12-30T11:00:10Z",
      "webTitle": "Gardens: what to do this week",
      "webUrl": "https://www.theguardian.com/lifeandstyle/2017/dec/30/seasonal-gardening-advice-winter-flowering-clematis-dead-hedge-book-of-seeds",
      "apiUrl": "https://content.guardianapis.com/lifeandstyle/2017/dec/30/seasonal-gardening-advice-winter-flowering-clematis-dead-hedge-book-of-seeds",
      "fields": {
          "headline": "Gardens: what to do this week",
          "trailText": "Plant winter-flowering clematis, make a dead hedge and read The Book Of Seeds",
          "byline": "Jane Perrone",
          "thumbnail": "https://media.guim.co.uk/b992a22d6dac53030e326394f9130a128f481e81/0_863_2511_1506/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/lifestyle",
      "pillarName": "Lifestyle",
      "category": "Life and style",
      "url": "https://www.theguardian.com/lifeandstyle/2017/dec/30/seasonal-gardening-advice-winter-flowering-clematis-dead-hedge-book-of-seeds",
      "title": "Gardens: what to do this week",
      "description": "Plant winter-flowering clematis, make a dead hedge and read The Book Of Seeds",
      "urlToImage": "https://media.guim.co.uk/b992a22d6dac53030e326394f9130a128f481e81/0_863_2511_1506/500.jpg",
      "author": "Jane Perrone",
      "date": "2017-12-30T11:00:10Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "lifeandstyle/2017/dec/29/anyone-can-change-any-habit-science-keeping-2018-resolutions",
      "type": "article",
      "sectionId": "lifeandstyle",
      "sectionName": "Life and style",
      "webPublicationDate": "2017-12-29T12:00:31Z",
      "webTitle": "‘Anyone can change any habit’: the science of keeping your 2018 resolutions",
      "webUrl": "https://www.theguardian.com/lifeandstyle/2017/dec/29/anyone-can-change-any-habit-science-keeping-2018-resolutions",
      "apiUrl": "https://content.guardianapis.com/lifeandstyle/2017/dec/29/anyone-can-change-any-habit-science-keeping-2018-resolutions",
      "fields": {
          "headline": "‘Anyone can change any habit’: the science of keeping your 2018 resolutions",
          "trailText": "Living a healthier lifestyle isn’t always down to sheer willpower – it can be <br> as simple as forming new habits. But how do we do that? ",
          "byline": "Moya Sarner"
      },
      "isHosted": false,
      "pillarId": "pillar/lifestyle",
      "pillarName": "Lifestyle",
      "category": "Life and style",
      "url": "https://www.theguardian.com/lifeandstyle/2017/dec/29/anyone-can-change-any-habit-science-keeping-2018-resolutions",
      "title": "‘Anyone can change any habit’: the science of keeping your 2018 resolutions",
      "description": "Living a healthier lifestyle isn’t always down to sheer willpower – it can be <br> as simple as forming new habits. But how do we do that? ",
      "author": "Moya Sarner",
      "date": "2017-12-29T12:00:31Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "politics/2017/dec/11/theresa-may-forced-accept-brexit-scrutiny-committee-revolt-henry-viii-powers",
      "type": "article",
      "sectionId": "politics",
      "sectionName": "Politics",
      "webPublicationDate": "2017-12-11T20:07:30Z",
      "webTitle": "Theresa May forced to accept new Brexit scrutiny committee",
      "webUrl": "https://www.theguardian.com/politics/2017/dec/11/theresa-may-forced-accept-brexit-scrutiny-committee-revolt-henry-viii-powers",
      "apiUrl": "https://content.guardianapis.com/politics/2017/dec/11/theresa-may-forced-accept-brexit-scrutiny-committee-revolt-henry-viii-powers",
      "fields": {
          "headline": "Theresa May forced to accept new Brexit scrutiny committee",
          "trailText": "Facing revolt, prime minister agrees to allow MPs power to monitor conversion of EU laws on to the UK statute book",
          "byline": "Rowena Mason, Heather Stewart and Patrick Wintour",
          "thumbnail": "https://media.guim.co.uk/31cc31f8fe126ba22ac1dd7757ec381ea9918f23/177_317_2381_1429/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/news",
      "pillarName": "News",
      "category": "Politics",
      "url": "https://www.theguardian.com/politics/2017/dec/11/theresa-may-forced-accept-brexit-scrutiny-committee-revolt-henry-viii-powers",
      "title": "Theresa May forced to accept new Brexit scrutiny committee",
      "description": "Facing revolt, prime minister agrees to allow MPs power to monitor conversion of EU laws on to the UK statute book",
      "urlToImage": "https://media.guim.co.uk/31cc31f8fe126ba22ac1dd7757ec381ea9918f23/177_317_2381_1429/500.jpg",
      "author": "Rowena Mason, Heather Stewart and Patrick Wintour",
      "date": "2017-12-11T20:07:30Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "lifeandstyle/2017/dec/30/fit-in-my-40s-zuu-exercise-regime-animal-zoe-williams",
      "type": "article",
      "sectionId": "lifeandstyle",
      "sectionName": "Life and style",
      "webPublicationDate": "2017-12-30T07:00:05Z",
      "webTitle": "Fit in my 40s: welcome to Zuu, the animal-themed exercise regime that makes everybody look ridiculous | Zoe Williams",
      "webUrl": "https://www.theguardian.com/lifeandstyle/2017/dec/30/fit-in-my-40s-zuu-exercise-regime-animal-zoe-williams",
      "apiUrl": "https://content.guardianapis.com/lifeandstyle/2017/dec/30/fit-in-my-40s-zuu-exercise-regime-animal-zoe-williams",
      "fields": {
          "headline": "Fit in my 40s: welcome to Zuu, the animal-themed exercise regime that makes everybody look ridiculous",
          "trailText": "It’s incredibly hard and everybody else covers way more ground, whether as a sideways gorilla or a crawling bear",
          "byline": "Zoe Williams",
          "thumbnail": "https://media.guim.co.uk/e1554ccf04268fa7f7e2a571d71408ab84a30b0d/276_0_2083_1250/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/lifestyle",
      "pillarName": "Lifestyle",
      "category": "Life and style",
      "url": "https://www.theguardian.com/lifeandstyle/2017/dec/30/fit-in-my-40s-zuu-exercise-regime-animal-zoe-williams",
      "title": "Fit in my 40s: welcome to Zuu, the animal-themed exercise regime that makes everybody look ridiculous",
      "description": "It’s incredibly hard and everybody else covers way more ground, whether as a sideways gorilla or a crawling bear",
      "urlToImage": "https://media.guim.co.uk/e1554ccf04268fa7f7e2a571d71408ab84a30b0d/276_0_2083_1250/500.jpg",
      "author": "Zoe Williams",
      "date": "2017-12-30T07:00:05Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "society/2017/dec/13/social-care-homes-increase-government-funding",
      "type": "article",
      "sectionId": "society",
      "sectionName": "Society",
      "webPublicationDate": "2017-12-13T07:30:13Z",
      "webTitle": "The state of social care shames us all",
      "webUrl": "https://www.theguardian.com/society/2017/dec/13/social-care-homes-increase-government-funding",
      "apiUrl": "https://content.guardianapis.com/society/2017/dec/13/social-care-homes-increase-government-funding",
      "fields": {
          "headline": "The state of social care shames us all",
          "trailText": "Care homes are unfairly relying on better-off residents to subsidise others’ care. The government urgently needs to increase funding to the sector",
          "byline": "David Brindle",
          "thumbnail": "https://media.guim.co.uk/9152553cae99eb5dd0f0549739ca5edad6b5d1d4/0_274_2978_1786/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/news",
      "pillarName": "News",
      "category": "Society",
      "url": "https://www.theguardian.com/society/2017/dec/13/social-care-homes-increase-government-funding",
      "title": "The state of social care shames us all",
      "description": "Care homes are unfairly relying on better-off residents to subsidise others’ care. The government urgently needs to increase funding to the sector",
      "urlToImage": "https://media.guim.co.uk/9152553cae99eb5dd0f0549739ca5edad6b5d1d4/0_274_2978_1786/500.jpg",
      "author": "David Brindle",
      "date": "2017-12-13T07:30:13Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "lifeandstyle/2017/dec/16/a-letter-to-our-child-who-is-deaf-for-whom-we-have-to-make-a-big-decision",
      "type": "article",
      "sectionId": "lifeandstyle",
      "sectionName": "Life and style",
      "webPublicationDate": "2017-12-16T06:45:55Z",
      "webTitle": "A letter to … our child, who is deaf, for whom we have to make a big decision",
      "webUrl": "https://www.theguardian.com/lifeandstyle/2017/dec/16/a-letter-to-our-child-who-is-deaf-for-whom-we-have-to-make-a-big-decision",
      "apiUrl": "https://content.guardianapis.com/lifeandstyle/2017/dec/16/a-letter-to-our-child-who-is-deaf-for-whom-we-have-to-make-a-big-decision",
      "fields": {
          "headline": "A letter to … our child, who is deaf, for whom we have to make a big decision",
          "trailText": "The letter you always wanted to write",
          "thumbnail": "https://media.guim.co.uk/1ea35e7f9bb6af4c5493401cc0ded67238b23ef4/2_0_1185_711/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/lifestyle",
      "pillarName": "Lifestyle",
      "category": "Life and style",
      "url": "https://www.theguardian.com/lifeandstyle/2017/dec/16/a-letter-to-our-child-who-is-deaf-for-whom-we-have-to-make-a-big-decision",
      "title": "A letter to … our child, who is deaf, for whom we have to make a big decision",
      "description": "The letter you always wanted to write",
      "urlToImage": "https://media.guim.co.uk/1ea35e7f9bb6af4c5493401cc0ded67238b23ef4/2_0_1185_711/500.jpg",
      "date": "2017-12-16T06:45:55Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "world/2017/dec/31/look-to-the-future-what-does-2018-have-in-store",
      "type": "article",
      "sectionId": "world",
      "sectionName": "World news",
      "webPublicationDate": "2017-12-31T06:00:22Z",
      "webTitle": "Look to the future: what does 2018 have in store?",
      "webUrl": "https://www.theguardian.com/world/2017/dec/31/look-to-the-future-what-does-2018-have-in-store",
      "apiUrl": "https://content.guardianapis.com/world/2017/dec/31/look-to-the-future-what-does-2018-have-in-store",
      "fields": {
          "headline": "Look to the future: what does 2018 have in store?",
          "trailText": "From news and politics to sport, culture and fashion, we preview the events likely to shape the year ahead",
          "byline": "Guardian staff",
          "thumbnail": "https://media.guim.co.uk/8bfa4af4dfba5e2e864d57222da0e1d5bf87f0e0/0_0_2560_1536/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/news",
      "pillarName": "News",
      "category": "World news",
      "url": "https://www.theguardian.com/world/2017/dec/31/look-to-the-future-what-does-2018-have-in-store",
      "title": "Look to the future: what does 2018 have in store?",
      "description": "From news and politics to sport, culture and fashion, we preview the events likely to shape the year ahead",
      "urlToImage": "https://media.guim.co.uk/8bfa4af4dfba5e2e864d57222da0e1d5bf87f0e0/0_0_2560_1536/500.jpg",
      "author": "Guardian staff",
      "date": "2017-12-31T06:00:22Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "lifeandstyle/2017/dec/13/guilty-buying-christmas-tree-notes-queries",
      "type": "article",
      "sectionId": "lifeandstyle",
      "sectionName": "Life and style",
      "webPublicationDate": "2017-12-13T11:30:01Z",
      "webTitle": "Should I feel guilty about buying Christmas tree? | Notes and queries",
      "webUrl": "https://www.theguardian.com/lifeandstyle/2017/dec/13/guilty-buying-christmas-tree-notes-queries",
      "apiUrl": "https://content.guardianapis.com/lifeandstyle/2017/dec/13/guilty-buying-christmas-tree-notes-queries",
      "fields": {
          "headline": "Should I feel guilty about buying a Christmas tree?",
          "trailText": "The long-running series in which readers answer other readers’ questions on subjects ranging from trivial flights of fancy to profound scientific concepts",
          "thumbnail": "https://media.guim.co.uk/3935f39fafb402e3193039d4d727b159b3c25044/0_183_3500_2100/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/lifestyle",
      "pillarName": "Lifestyle",
      "category": "Life and style",
      "url": "https://www.theguardian.com/lifeandstyle/2017/dec/13/guilty-buying-christmas-tree-notes-queries",
      "title": "Should I feel guilty about buying a Christmas tree?",
      "description": "The long-running series in which readers answer other readers’ questions on subjects ranging from trivial flights of fancy to profound scientific concepts",
      "urlToImage": "https://media.guim.co.uk/3935f39fafb402e3193039d4d727b159b3c25044/0_183_3500_2100/500.jpg",
      "date": "2017-12-13T11:30:01Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "lifeandstyle/2017/dec/17/the-shed-tripadvisors-best-london-restaurant-you-literally-couldnt-get-a-table",
      "type": "article",
      "sectionId": "lifeandstyle",
      "sectionName": "Life and style",
      "webPublicationDate": "2017-12-17T06:00:22Z",
      "webTitle": "The best restaurant in London? You literally can't get a table",
      "webUrl": "https://www.theguardian.com/lifeandstyle/2017/dec/17/the-shed-tripadvisors-best-london-restaurant-you-literally-couldnt-get-a-table",
      "apiUrl": "https://content.guardianapis.com/lifeandstyle/2017/dec/17/the-shed-tripadvisors-best-london-restaurant-you-literally-couldnt-get-a-table",
      "fields": {
          "headline": "The best restaurant in London? You literally can't get a table",
          "trailText": "A make-believe restaurant serving pretend food to imaginary customers for fake reviews… What Tripadvisor reviews tell us about the way we live, by Eva Wiseman",
          "byline": "Eva Wiseman",
          "thumbnail": "https://media.guim.co.uk/846ad19e4a8f8d026cf08645c2413251445816b2/9_5_2043_1226/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/lifestyle",
      "pillarName": "Lifestyle",
      "category": "Life and style",
      "url": "https://www.theguardian.com/lifeandstyle/2017/dec/17/the-shed-tripadvisors-best-london-restaurant-you-literally-couldnt-get-a-table",
      "title": "The best restaurant in London? You literally can't get a table",
      "description": "A make-believe restaurant serving pretend food to imaginary customers for fake reviews… What Tripadvisor reviews tell us about the way we live, by Eva Wiseman",
      "urlToImage": "https://media.guim.co.uk/846ad19e4a8f8d026cf08645c2413251445816b2/9_5_2043_1226/500.jpg",
      "author": "Eva Wiseman",
      "date": "2017-12-17T06:00:22Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "sport/2017/dec/12/nba-surpassed-nfl-league-of-americas-future-kareem-abdul-jabbar",
      "type": "article",
      "sectionId": "sport",
      "sectionName": "Sport",
      "webPublicationDate": "2017-12-12T10:00:30Z",
      "webTitle": "The NBA has surpassed the NFL as the league of America’s future | Kareem Abdul-Jabbar",
      "webUrl": "https://www.theguardian.com/sport/2017/dec/12/nba-surpassed-nfl-league-of-americas-future-kareem-abdul-jabbar",
      "apiUrl": "https://content.guardianapis.com/sport/2017/dec/12/nba-surpassed-nfl-league-of-americas-future-kareem-abdul-jabbar",
      "fields": {
          "headline": "The NBA, and not the NFL, is the league of America's future",
          "trailText": "The NFL may still be America’s most popular sport, but it’s become increasingly clear that football embodies the spirit of a nation as it once was – not as it is today",
          "byline": "Kareem Abdul-Jabbar",
          "thumbnail": "https://media.guim.co.uk/3ed2aaf3077c0cd88fbe5fca8cb6791e35776f93/0_0_2579_1547/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/sport",
      "pillarName": "Sport",
      "category": "Sport",
      "url": "https://www.theguardian.com/sport/2017/dec/12/nba-surpassed-nfl-league-of-americas-future-kareem-abdul-jabbar",
      "title": "The NBA, and not the NFL, is the league of America's future",
      "description": "The NFL may still be America’s most popular sport, but it’s become increasingly clear that football embodies the spirit of a nation as it once was – not as it is today",
      "urlToImage": "https://media.guim.co.uk/3ed2aaf3077c0cd88fbe5fca8cb6791e35776f93/0_0_2579_1547/500.jpg",
      "author": "Kareem Abdul-Jabbar",
      "date": "2017-12-12T10:00:30Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "media/2017/dec/12/keith-chegwin-a-born-entertainer-with-natural-likability",
      "type": "article",
      "sectionId": "media",
      "sectionName": "Media",
      "webPublicationDate": "2017-12-12T07:00:27Z",
      "webTitle": "Keith Chegwin: a born entertainer with natural likability",
      "webUrl": "https://www.theguardian.com/media/2017/dec/12/keith-chegwin-a-born-entertainer-with-natural-likability",
      "apiUrl": "https://content.guardianapis.com/media/2017/dec/12/keith-chegwin-a-born-entertainer-with-natural-likability",
      "fields": {
          "headline": "Keith Chegwin: a born entertainer with natural likability",
          "trailText": "From huge early success, to an adult entertainment blip, to a late career comeback, Cheggers was almost a family member to viewers",
          "byline": "Mark Lawson",
          "thumbnail": "https://media.guim.co.uk/810e4e9c876aae82ad8ed507bffcffd7ab81219a/0_124_3600_2159/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/news",
      "pillarName": "News",
      "category": "Media",
      "url": "https://www.theguardian.com/media/2017/dec/12/keith-chegwin-a-born-entertainer-with-natural-likability",
      "title": "Keith Chegwin: a born entertainer with natural likability",
      "description": "From huge early success, to an adult entertainment blip, to a late career comeback, Cheggers was almost a family member to viewers",
      "urlToImage": "https://media.guim.co.uk/810e4e9c876aae82ad8ed507bffcffd7ab81219a/0_124_3600_2159/500.jpg",
      "author": "Mark Lawson",
      "date": "2017-12-12T07:00:27Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "politics/2017/dec/12/nobody-cares-about-us-britons-living-in-rest-of-eu-british-brexit-future",
      "type": "article",
      "sectionId": "politics",
      "sectionName": "Politics",
      "webPublicationDate": "2017-12-12T08:00:28Z",
      "webTitle": "'Nobody cares about us': Britons living in rest of EU voice their dismay",
      "webUrl": "https://www.theguardian.com/politics/2017/dec/12/nobody-cares-about-us-britons-living-in-rest-of-eu-british-brexit-future",
      "apiUrl": "https://content.guardianapis.com/politics/2017/dec/12/nobody-cares-about-us-britons-living-in-rest-of-eu-british-brexit-future",
      "fields": {
          "headline": "'Nobody cares about us': Britons living in rest of EU voice their dismay",
          "trailText": "We asked British nationals living in the EU to tell us how they view the latest Brexit negotiations, and where they see the future<br>",
          "byline": "Guardian readers and Matthew Holmes",
          "thumbnail": "https://media.guim.co.uk/40568eb694084960a43ee383f458793641d463e2/0_116_3500_2101/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/news",
      "pillarName": "News",
      "category": "Politics",
      "url": "https://www.theguardian.com/politics/2017/dec/12/nobody-cares-about-us-britons-living-in-rest-of-eu-british-brexit-future",
      "title": "'Nobody cares about us': Britons living in rest of EU voice their dismay",
      "description": "We asked British nationals living in the EU to tell us how they view the latest Brexit negotiations, and where they see the future<br>",
      "urlToImage": "https://media.guim.co.uk/40568eb694084960a43ee383f458793641d463e2/0_116_3500_2101/500.jpg",
      "author": "Guardian readers and Matthew Holmes",
      "date": "2017-12-12T08:00:28Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "film/2017/dec/17/hayley-squires-i-used-to-argue-with-everyone",
      "type": "article",
      "sectionId": "film",
      "sectionName": "Film",
      "webPublicationDate": "2017-12-17T08:00:25Z",
      "webTitle": "Hayley Squires: ‘I used to argue with everyone’",
      "webUrl": "https://www.theguardian.com/film/2017/dec/17/hayley-squires-i-used-to-argue-with-everyone",
      "apiUrl": "https://content.guardianapis.com/film/2017/dec/17/hayley-squires-i-used-to-argue-with-everyone",
      "fields": {
          "headline": "Hayley Squires: ‘I used to argue with everyone’",
          "trailText": "She made her name in I, Daniel Blake – Ken Loach’s searing indictment of the welfare state. Now Hayley Squires is stealing the show in the BBC’s adaptation of The Miniaturist. But, finds Rebecca Nicholson, there are a few things she wants to get off her chest first",
          "byline": "Rebecca Nicholson",
          "thumbnail": "https://media.guim.co.uk/83d26f23e60240b61e90bfc4d02e85d69b307c9d/0_2696_4912_2948/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/arts",
      "pillarName": "Arts",
      "category": "Film",
      "url": "https://www.theguardian.com/film/2017/dec/17/hayley-squires-i-used-to-argue-with-everyone",
      "title": "Hayley Squires: ‘I used to argue with everyone’",
      "description": "She made her name in I, Daniel Blake – Ken Loach’s searing indictment of the welfare state. Now Hayley Squires is stealing the show in the BBC’s adaptation of The Miniaturist. But, finds Rebecca Nicholson, there are a few things she wants to get off her chest first",
      "urlToImage": "https://media.guim.co.uk/83d26f23e60240b61e90bfc4d02e85d69b307c9d/0_2696_4912_2948/500.jpg",
      "author": "Rebecca Nicholson",
      "date": "2017-12-17T08:00:25Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "books/2017/dec/12/attrib-this-eley-williamss-experimental-stories-are-a-microblast",
      "type": "article",
      "sectionId": "books",
      "sectionName": "Books",
      "webPublicationDate": "2017-12-12T12:06:51Z",
      "webTitle": "Attrib. this: Eley Williams's experimental stories are a microblast",
      "webUrl": "https://www.theguardian.com/books/2017/dec/12/attrib-this-eley-williamss-experimental-stories-are-a-microblast",
      "apiUrl": "https://content.guardianapis.com/books/2017/dec/12/attrib-this-eley-williamss-experimental-stories-are-a-microblast",
      "fields": {
          "headline": "Attrib. this: Eley Williams's experimental stories are a microblast",
          "trailText": "This thought-stoppingly daring debut (and other stories) offers the winterval reader a bounteous sharing platter of thinking experiments. And a whole lot of fun<br>",
          "byline": "Sam Jordison",
          "thumbnail": "https://media.guim.co.uk/22cb25a17994f18bb75fa2f7592aae0a778757db/1316_1456_3491_2095/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/arts",
      "pillarName": "Arts",
      "category": "Books",
      "url": "https://www.theguardian.com/books/2017/dec/12/attrib-this-eley-williamss-experimental-stories-are-a-microblast",
      "title": "Attrib. this: Eley Williams's experimental stories are a microblast",
      "description": "This thought-stoppingly daring debut (and other stories) offers the winterval reader a bounteous sharing platter of thinking experiments. And a whole lot of fun<br>",
      "urlToImage": "https://media.guim.co.uk/22cb25a17994f18bb75fa2f7592aae0a778757db/1316_1456_3491_2095/500.jpg",
      "author": "Sam Jordison",
      "date": "2017-12-12T12:06:51Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "science/live/2018/feb/06/spacex-falcon-heavy-launch-elon-musk-live-updates",
      "type": "liveblog",
      "sectionId": "science",
      "sectionName": "Science",
      "webPublicationDate": "2018-02-06T22:33:18Z",
      "webTitle": "Falcon Heavy, world's most powerful rocket, launches – as it happened",
      "webUrl": "https://www.theguardian.com/science/live/2018/feb/06/spacex-falcon-heavy-launch-elon-musk-live-updates",
      "apiUrl": "https://content.guardianapis.com/science/live/2018/feb/06/spacex-falcon-heavy-launch-elon-musk-live-updates",
      "fields": {
          "headline": "Falcon Heavy, world's most powerful rocket, launches – as it happened",
          "trailText": "A heavy-duty rocket from Elon Musk’s private company launches for the first time and aims to make spaceflight cheaper and easier ",
          "byline": "Alan Yuhas",
          "thumbnail": "https://media.guim.co.uk/d0c5490afe82bef1a329ea613a96fa2fae08a2a1/0_320_3500_2100/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/news",
      "pillarName": "News",
      "category": "Science",
      "url": "https://www.theguardian.com/science/live/2018/feb/06/spacex-falcon-heavy-launch-elon-musk-live-updates",
      "title": "Falcon Heavy, world's most powerful rocket, launches – as it happened",
      "description": "A heavy-duty rocket from Elon Musk’s private company launches for the first time and aims to make spaceflight cheaper and easier ",
      "urlToImage": "https://media.guim.co.uk/d0c5490afe82bef1a329ea613a96fa2fae08a2a1/0_320_3500_2100/500.jpg",
      "author": "Alan Yuhas",
      "date": "2018-02-06T22:33:18Z",
      "sourceName": "The Guardian"
  },
  {
      "id": "tv-and-radio/2017/dec/17/sundays-best-tv-sports-personality-of-the-year-2017-the-apprentice-final-the-alternativity",
      "type": "article",
      "sectionId": "tv-and-radio",
      "sectionName": "Television & radio",
      "webPublicationDate": "2017-12-17T06:00:23Z",
      "webTitle": "Sunday's best TV: Sports Personality of the Year 2017; The Apprentice final; The Alternativity",
      "webUrl": "https://www.theguardian.com/tv-and-radio/2017/dec/17/sundays-best-tv-sports-personality-of-the-year-2017-the-apprentice-final-the-alternativity",
      "apiUrl": "https://content.guardianapis.com/tv-and-radio/2017/dec/17/sundays-best-tv-sports-personality-of-the-year-2017-the-apprentice-final-the-alternativity",
      "fields": {
          "headline": "Sunday's best TV: Sports Personality of the Year 2017; The Apprentice final; The Alternativity",
          "trailText": "As Sports Personality of the Year is unveiled, will it finally be Mo Farah’s year? Elsewhere, Lord Sugar finally names his next business partner, and Danny Boyle offers an untraditional take on the nativity from Palestine.",
          "byline": "John Robinson, Hannah J Davies, Ellen E Jones, Sophie Harris, Jonathan Wright, Ben Arnold and Paul Howlett",
          "thumbnail": "https://media.guim.co.uk/2137171a613f56d094aada3238a0206a73696217/596_270_3197_1918/500.jpg"
      },
      "isHosted": false,
      "pillarId": "pillar/arts",
      "pillarName": "Arts",
      "category": "Television & radio",
      "url": "https://www.theguardian.com/tv-and-radio/2017/dec/17/sundays-best-tv-sports-personality-of-the-year-2017-the-apprentice-final-the-alternativity",
      "title": "Sunday's best TV: Sports Personality of the Year 2017; The Apprentice final; The Alternativity",
      "description": "As Sports Personality of the Year is unveiled, will it finally be Mo Farah’s year? Elsewhere, Lord Sugar finally names his next business partner, and Danny Boyle offers an untraditional take on the nativity from Palestine.",
      "urlToImage": "https://media.guim.co.uk/2137171a613f56d094aada3238a0206a73696217/596_270_3197_1918/500.jpg",
      "author": "John Robinson, Hannah J Davies, Ellen E Jones, Sophie Harris, Jonathan Wright, Ben Arnold and Paul Howlett",
      "date": "2017-12-17T06:00:23Z",
      "sourceName": "The Guardian"
  },
  {
      "section": "us",
      "subsection": "politics",
      "title": "A Determined Trump Vows Not to Be Thwarted at Home or Abroad",
      "abstract": "Wiser about the use of power, the newly sworn-in president suggests that this time he will not take no for an answer, whether in enacting an ambitious domestic agenda or in his expansionist worldview.",
      "url": "https://www.nytimes.com/2025/01/20/us/politics/trump-sworn-in-president.html",
      "uri": "nyt://article/a5b84422-4d25-517b-b0bc-85e8dfdf869a",
      "byline": "By David E. Sanger",
      "item_type": "Article",
      "updated_date": "2025-01-21T05:59:32-05:00",
      "created_date": "2025-01-20T19:09:11-05:00",
      "published_date": "2025-01-20T19:09:11-05:00",
      "material_type_facet": "",
      "kicker": "news analysis",
      "des_facet": [
          "United States Politics and Government",
          "Presidential Election of 2024",
          "Inaugurations"
      ],
      "org_facet": [],
      "per_facet": [
          "Trump, Donald J"
      ],
      "geo_facet": [],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20dc-assess-01-hgbl/20dc-assess-01-hgbl-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1365,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "In his inaugural address, President Trump spoke with a tone of aggression intended to be heard at home and around the world.",
              "copyright": "Kenny Holston/The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20dc-assess-01-hgbl/20dc-assess-01-hgbl-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "In his inaugural address, President Trump spoke with a tone of aggression intended to be heard at home and around the world.",
              "copyright": "Kenny Holston/The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20dc-assess-01-hgbl/20dc-assess-01-hgbl-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "In his inaugural address, President Trump spoke with a tone of aggression intended to be heard at home and around the world.",
              "copyright": "Kenny Holston/The New York Times"
          }
      ],
      "short_url": "",
      "category": "us",
      "description": "Wiser about the use of power, the newly sworn-in president suggests that this time he will not take no for an answer, whether in enacting an ambitious domestic agenda or in his expansionist worldview.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/20/multimedia/20dc-assess-01-hgbl/20dc-assess-01-hgbl-superJumbo.jpg",
      "author": "David E. Sanger",
      "date": "2025-01-20T19:09:11-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "us",
      "subsection": "politics",
      "title": "What Trump Did on Day 1: Tracking His Biggest Moves",
      "abstract": "President Trump made major policy moves immediately after taking office, withdrawing from major international agreements, promising steep tariffs and pardoning nearly all of the Jan. 6 rioters.",
      "url": "https://www.nytimes.com/2025/01/21/us/politics/trump-first-day-recap.html",
      "uri": "nyt://article/e7e9526b-85b1-52e2-891a-26fa65711895",
      "byline": "By Chris Cameron",
      "item_type": "Article",
      "updated_date": "2025-01-21T05:01:33-05:00",
      "created_date": "2025-01-21T05:01:33-05:00",
      "published_date": "2025-01-21T05:01:33-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [
          "Inaugurations",
          "United States Politics and Government",
          "Executive Orders and Memorandums",
          "Storming of the US Capitol (Jan, 2021)",
          "Immigration and Emigration",
          "Global Warming",
          "Customs (Tariff)",
          "Greenhouse Gas Emissions",
          "Treaties"
      ],
      "org_facet": [
          "Internal Revenue Service",
          "Justice Department",
          "TikTok (ByteDance)",
          "World Health Organization"
      ],
      "per_facet": [
          "Trump, Donald J"
      ],
      "geo_facet": [
          "Mexico",
          "Canada"
      ],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/21dc-first-day-recap-rh4f7y/20executive-orders-blog-new-reporter-updates-zbwg-superJumbo-v3.jpg",
              "format": "Super Jumbo",
              "height": 1365,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "President Trump on Monday pardoned members of the attack the Capitol on Jan. 6, 2021, and signed dozens of executive orders addressing the first priorities of his administration.",
              "copyright": "Doug Mills/The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/21dc-first-day-recap-rh4f7y/20executive-orders-blog-new-reporter-updates-zbwg-threeByTwoSmallAt2X-v3.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "President Trump on Monday pardoned members of the attack the Capitol on Jan. 6, 2021, and signed dozens of executive orders addressing the first priorities of his administration.",
              "copyright": "Doug Mills/The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/21dc-first-day-recap-rh4f7y/20executive-orders-blog-new-reporter-updates-zbwg-thumbLarge-v3.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "President Trump on Monday pardoned members of the attack the Capitol on Jan. 6, 2021, and signed dozens of executive orders addressing the first priorities of his administration.",
              "copyright": "Doug Mills/The New York Times"
          }
      ],
      "short_url": "",
      "category": "us",
      "description": "President Trump made major policy moves immediately after taking office, withdrawing from major international agreements, promising steep tariffs and pardoning nearly all of the Jan. 6 rioters.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/20/multimedia/21dc-first-day-recap-rh4f7y/20executive-orders-blog-new-reporter-updates-zbwg-superJumbo-v3.jpg",
      "author": "Chris Cameron",
      "date": "2025-01-21T05:01:33-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "podcasts",
      "subsection": "",
      "title": "What Trump Did on Day 1, and Biden’s Final Acts",
      "abstract": "Plus, an Olympic medal fail.",
      "url": "https://www.nytimes.com/2025/01/21/podcasts/trump-executive-orders-inauguration.html",
      "uri": "nyt://article/6f77f216-fbd8-5c0a-a6a2-6fc45f30ba2a",
      "byline": "By Tracy Mumford, Zolan Kanno-Youngs, Will Jarvis, Ian Stewart and Jessica Metzger",
      "item_type": "Article",
      "updated_date": "2025-01-21T06:32:33-05:00",
      "created_date": "2025-01-21T06:00:15-05:00",
      "published_date": "2025-01-21T06:00:15-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [
          "Olympic Games (2024)",
          "United States Politics and Government",
          "Presidents and Presidency (US)"
      ],
      "org_facet": [],
      "per_facet": [
          "Trump, Donald J"
      ],
      "geo_facet": [],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21headlines1-kzjc/21headlines1-kzjc-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1365,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "President Trump made major policy moves immediately after taking office, withdrawing from major international agreements, promising steep tariffs and pardoning nearly all of the Jan. 6 rioters.",
              "copyright": "Doug Mills/The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21headlines1-kzjc/21headlines1-kzjc-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "President Trump made major policy moves immediately after taking office, withdrawing from major international agreements, promising steep tariffs and pardoning nearly all of the Jan. 6 rioters.",
              "copyright": "Doug Mills/The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21headlines1-kzjc/21headlines1-kzjc-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "President Trump made major policy moves immediately after taking office, withdrawing from major international agreements, promising steep tariffs and pardoning nearly all of the Jan. 6 rioters.",
              "copyright": "Doug Mills/The New York Times"
          }
      ],
      "short_url": "",
      "category": "podcasts",
      "description": "Plus, an Olympic medal fail.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/21/multimedia/21headlines1-kzjc/21headlines1-kzjc-superJumbo.jpg",
      "author": "Tracy Mumford, Zolan Kanno-Youngs, Will Jarvis, Ian Stewart and Jessica Metzger",
      "date": "2025-01-21T06:00:15-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "us",
      "subsection": "politics",
      "title": "Trump Grants Sweeping Clemency to All Jan. 6 Rioters",
      "abstract": "The extraordinary pardons and commutations extended to those who committed both violent and nonviolent crimes on Jan. 6, including assaulting police officers and seditious conspiracy.",
      "url": "https://www.nytimes.com/2025/01/20/us/politics/trump-pardons-jan-6.html",
      "uri": "nyt://article/a8c1aa28-d00b-5798-a224-548abb1cca6f",
      "byline": "By Alan Feuer",
      "item_type": "Article",
      "updated_date": "2025-01-21T05:47:22-05:00",
      "created_date": "2025-01-20T20:04:21-05:00",
      "published_date": "2025-01-20T20:04:21-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [
          "Amnesties, Commutations and Pardons",
          "Storming of the US Capitol (Jan, 2021)",
          "United States Politics and Government"
      ],
      "org_facet": [
          "Justice Department"
      ],
      "per_facet": [
          "Trump, Donald J"
      ],
      "geo_facet": [],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20dc-j6-pardons01-photo-gbfh/20dc-j6-pardons01-photo-gbfh-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1365,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "Supporters of President Trump climbing the walls of the Capitol on Jan. 6, 2021.",
              "copyright": "Jason Andrew for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20dc-j6-pardons01-photo-gbfh/20dc-j6-pardons01-photo-gbfh-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "Supporters of President Trump climbing the walls of the Capitol on Jan. 6, 2021.",
              "copyright": "Jason Andrew for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20dc-j6-pardons01-photo-gbfh/20dc-j6-pardons01-photo-gbfh-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "Supporters of President Trump climbing the walls of the Capitol on Jan. 6, 2021.",
              "copyright": "Jason Andrew for The New York Times"
          }
      ],
      "short_url": "",
      "category": "us",
      "description": "The extraordinary pardons and commutations extended to those who committed both violent and nonviolent crimes on Jan. 6, including assaulting police officers and seditious conspiracy.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/20/multimedia/20dc-j6-pardons01-photo-gbfh/20dc-j6-pardons01-photo-gbfh-superJumbo.jpg",
      "author": "Alan Feuer",
      "date": "2025-01-20T20:04:21-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "us",
      "subsection": "politics",
      "title": "In Dueling Pardons, an Intensified Fight Over the Meaning of Jan. 6",
      "abstract": "President Trump’s grant of clemency to those who assaulted the Capitol in his name four years ago clashed with his predecessor’s decision to shield from retribution those who had sought to hold him to account.",
      "url": "https://www.nytimes.com/2025/01/20/us/politics/biden-trump-jan6-pardons.html",
      "uri": "nyt://article/a5ea600e-b564-55e7-9dc9-7f24452d92bf",
      "byline": "By Luke Broadwater",
      "item_type": "Article",
      "updated_date": "2025-01-20T20:08:24-05:00",
      "created_date": "2025-01-20T19:56:49-05:00",
      "published_date": "2025-01-20T19:56:49-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [
          "United States Politics and Government",
          "Storming of the US Capitol (Jan, 2021)",
          "Amnesties, Commutations and Pardons"
      ],
      "org_facet": [
          "House Select Committee to Investigate the January 6th Attack"
      ],
      "per_facet": [
          "Trump, Donald J",
          "Thompson, Bennie G",
          "Cheney, Liz",
          "Biden, Joseph R Jr"
      ],
      "geo_facet": [],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20DC-JAN6-vftj/20DC-JAN6-vftj-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1339,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "A broken window at the entrance to the Capitol Rotunda in 2021, after it was attacked by pro-Trump supporters, and where President Trump was inaugurated for a second term on Monday.",
              "copyright": "Erin Schaff/The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20DC-JAN6-vftj/20DC-JAN6-vftj-threeByTwoSmallAt2X-v2.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "A broken window at the entrance to the Capitol Rotunda in 2021, after it was attacked by pro-Trump supporters, and where President Trump was inaugurated for a second term on Monday.",
              "copyright": "Erin Schaff/The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20DC-JAN6-vftj/20DC-JAN6-vftj-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "A broken window at the entrance to the Capitol Rotunda in 2021, after it was attacked by pro-Trump supporters, and where President Trump was inaugurated for a second term on Monday.",
              "copyright": "Erin Schaff/The New York Times"
          }
      ],
      "short_url": "",
      "category": "us",
      "description": "President Trump’s grant of clemency to those who assaulted the Capitol in his name four years ago clashed with his predecessor’s decision to shield from retribution those who had sought to hold him to account.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/20/multimedia/20DC-JAN6-vftj/20DC-JAN6-vftj-superJumbo.jpg",
      "author": "Luke Broadwater",
      "date": "2025-01-20T19:56:49-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "us",
      "subsection": "politics",
      "title": "A Day of Triumph, Jubilation and Gloating in Washington",
      "abstract": "There were Proud Boys, billionaires, stiletto heels, cowboy hats, Village People, icy cold and happy Canadians at President Trump’s inaugural.",
      "url": "https://www.nytimes.com/2025/01/20/us/politics/trump-inaugural.html",
      "uri": "nyt://article/98e973e6-6a7f-58fb-8e35-9beb1c6b3cd2",
      "byline": "By Elisabeth Bumiller",
      "item_type": "Article",
      "updated_date": "2025-01-20T23:25:07-05:00",
      "created_date": "2025-01-20T20:48:59-05:00",
      "published_date": "2025-01-20T20:48:59-05:00",
      "material_type_facet": "",
      "kicker": "Reporter’s Notebook",
      "des_facet": [
          "Inaugurations",
          "United States Politics and Government",
          "Presidential Election of 2024"
      ],
      "org_facet": [
          "Turning Point USA",
          "Village People (Music Group)"
      ],
      "per_facet": [
          "Clinton, Hillary Rodham",
          "Trump, Donald J Jr",
          "Lake, Kari A",
          "Lopez, Jennifer",
          "Adelson, Miriam"
      ],
      "geo_facet": [],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20dc-scene-lmct/20dc-scene-lmct-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1366,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "“Now we can get stuff done like never before!” Donald Trump Jr. said.",
              "copyright": "Samuel Corum/Getty Images"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20dc-scene-lmct/20dc-scene-lmct-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "“Now we can get stuff done like never before!” Donald Trump Jr. said.",
              "copyright": "Samuel Corum/Getty Images"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20dc-scene-lmct/20dc-scene-lmct-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "“Now we can get stuff done like never before!” Donald Trump Jr. said.",
              "copyright": "Samuel Corum/Getty Images"
          }
      ],
      "short_url": "",
      "category": "us",
      "description": "There were Proud Boys, billionaires, stiletto heels, cowboy hats, Village People, icy cold and happy Canadians at President Trump’s inaugural.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/20/multimedia/20dc-scene-lmct/20dc-scene-lmct-superJumbo.jpg",
      "author": "Elisabeth Bumiller",
      "date": "2025-01-20T20:48:59-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "us",
      "subsection": "politics",
      "title": "A Closer Look at Who Attended President Donald J. Trump’s Second Inauguration",
      "abstract": "Former presidents, members of Congress, and tech C.E.O.s were among those present to witness Mr. Trump take the oath of office.",
      "url": "https://www.nytimes.com/interactive/2025/01/20/us/politics/trump-inauguration-attendees.html",
      "uri": "nyt://interactive/5161f73f-c1b1-5fd4-bce2-9eb5f531b763",
      "byline": "By Jon Huang, Rebecca Lieberman, Kalina Borkiewicz, Sarah Cahalan, Nick Corasaniti, Bora Erden, Alicia Parlapiano, Amy Schoenfeld Walker, Ashley Wu and Karen Yourish",
      "item_type": "Interactive",
      "updated_date": "2025-01-20T22:42:19-05:00",
      "created_date": "2025-01-20T15:25:04-05:00",
      "published_date": "2025-01-20T15:25:04-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [
          "Inaugurations"
      ],
      "org_facet": [],
      "per_facet": [
          "Trump, Donald J"
      ],
      "geo_facet": [],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/2024-12-11-inauguration-seating-chart-index/2024-12-11-inauguration-seating-chart-index-superJumbo-v2.jpg",
              "format": "Super Jumbo",
              "height": 1333,
              "width": 2000,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": ""
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/2024-12-11-inauguration-seating-chart-index/2024-12-11-inauguration-seating-chart-index-threeByTwoSmallAt2X-v3.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": ""
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/2024-12-11-inauguration-seating-chart-index/2024-12-11-inauguration-seating-chart-index-thumbLarge-v2.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": ""
          }
      ],
      "short_url": "",
      "category": "us",
      "description": "Former presidents, members of Congress, and tech C.E.O.s were among those present to witness Mr. Trump take the oath of office.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/20/multimedia/2024-12-11-inauguration-seating-chart-index/2024-12-11-inauguration-seating-chart-index-superJumbo-v2.jpg",
      "author": "Jon Huang, Rebecca Lieberman, Kalina Borkiewicz, Sarah Cahalan, Nick Corasaniti, Bora Erden, Alicia Parlapiano, Amy Schoenfeld Walker, Ashley Wu and Karen Yourish",
      "date": "2025-01-20T15:25:04-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "world",
      "subsection": "europe",
      "title": "Hostages Are Being Freed. Some Israelis Ask: At What Cost?",
      "abstract": "More than 30 hostages are set to be released during the cease-fire in Gaza. But many Israelis have mixed feelings about the deal because they feel it came at a high price.",
      "url": "https://www.nytimes.com/2025/01/21/world/europe/gaza-israel-hostages-ambivalence.html",
      "uri": "nyt://article/705ee7ac-d4ab-55ac-8fb0-c0cbbf5017bb",
      "byline": "By Patrick Kingsley and Natan Odenheimer",
      "item_type": "Article",
      "updated_date": "2025-01-21T05:31:49-05:00",
      "created_date": "2025-01-21T00:01:06-05:00",
      "published_date": "2025-01-21T00:01:06-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [
          "Israel-Gaza War (2023- )",
          "Kidnapping and Hostages",
          "Palestinians"
      ],
      "org_facet": [
          "Hamas"
      ],
      "per_facet": [
          "Netanyahu, Benjamin",
          "Issacharoff, Avi",
          "Goodman, Micah (1974- )"
      ],
      "geo_facet": [
          "Israel",
          "Gaza Strip"
      ],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20israel-mood/20mideast-crisis-update-funeral-lbfh-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1365,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "A mourner outside the cemetery in Poria Illit, Israel, during the funeral Monday of Oron Shaul, whose body was retrieved from Gaza after 10 years.",
              "copyright": "Amit Elkayam for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20israel-mood/20mideast-crisis-update-funeral-lbfh-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "A mourner outside the cemetery in Poria Illit, Israel, during the funeral Monday of Oron Shaul, whose body was retrieved from Gaza after 10 years.",
              "copyright": "Amit Elkayam for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20israel-mood/20mideast-crisis-update-funeral-lbfh-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "A mourner outside the cemetery in Poria Illit, Israel, during the funeral Monday of Oron Shaul, whose body was retrieved from Gaza after 10 years.",
              "copyright": "Amit Elkayam for The New York Times"
          }
      ],
      "short_url": "",
      "category": "world",
      "description": "More than 30 hostages are set to be released during the cease-fire in Gaza. But many Israelis have mixed feelings about the deal because they feel it came at a high price.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/20/multimedia/20israel-mood/20mideast-crisis-update-funeral-lbfh-superJumbo.jpg",
      "author": "Patrick Kingsley and Natan Odenheimer",
      "date": "2025-01-21T00:01:06-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "world",
      "subsection": "middleeast",
      "title": "Israeli Military Begins West Bank Raids",
      "abstract": "Amid rising tensions, Israeli troops embarked on what Israel described as a counterterrorism operation. That came hours after Jewish extremists attacked several Palestinian villages.",
      "url": "https://www.nytimes.com/2025/01/21/world/middleeast/israel-trump-settlers-west-bank-gaza.html",
      "uri": "nyt://article/a17ef12c-b3f4-5278-9120-9488cc1c7390",
      "byline": "By Isabel Kershner",
      "item_type": "Article",
      "updated_date": "2025-01-21T06:56:34-05:00",
      "created_date": "2025-01-21T06:30:12-05:00",
      "published_date": "2025-01-21T06:30:12-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [],
      "org_facet": [],
      "per_facet": [],
      "geo_facet": [
          "Israel",
          "West Bank",
          "Gaza Strip"
      ],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21mideast-ledeall-wqtc/21mideast-ledeall-wqtc-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1366,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "A Palestinian man inspecting the damage to his shop on Tuesday after it was burned in overnight Israeli settler attacks in the village of Jinsafot in the West Bank.",
              "copyright": "Jaafar Ashtiyeh/Agence France-Presse — Getty Images"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21mideast-ledeall-wqtc/21mideast-ledeall-wqtc-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "A Palestinian man inspecting the damage to his shop on Tuesday after it was burned in overnight Israeli settler attacks in the village of Jinsafot in the West Bank.",
              "copyright": "Jaafar Ashtiyeh/Agence France-Presse — Getty Images"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21mideast-ledeall-wqtc/21mideast-ledeall-wqtc-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "A Palestinian man inspecting the damage to his shop on Tuesday after it was burned in overnight Israeli settler attacks in the village of Jinsafot in the West Bank.",
              "copyright": "Jaafar Ashtiyeh/Agence France-Presse — Getty Images"
          }
      ],
      "short_url": "",
      "category": "world",
      "description": "Amid rising tensions, Israeli troops embarked on what Israel described as a counterterrorism operation. That came hours after Jewish extremists attacked several Palestinian villages.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/21/multimedia/21mideast-ledeall-wqtc/21mideast-ledeall-wqtc-superJumbo.jpg",
      "author": "Isabel Kershner",
      "date": "2025-01-21T06:30:12-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "weather",
      "subsection": "",
      "title": "A Rare Winter Storm Is Sweeping Through the Gulf Coast",
      "abstract": "“So many of you have never seen an event like this,” Louisiana’s state climatologist warned, with New Orleans facing possibly the most snow it has ever seen.",
      "url": "https://www.nytimes.com/2025/01/21/weather/cold-snow-storm-houston-texas-louisiana.html",
      "uri": "nyt://article/7c3c4dd4-ec52-5c58-a373-fd6efb3cd310",
      "byline": "By Campbell Robertson, Nazaneen Ghaffar and Judson Jones",
      "item_type": "Article",
      "updated_date": "2025-01-21T06:42:22-05:00",
      "created_date": "2025-01-21T05:48:10-05:00",
      "published_date": "2025-01-21T05:48:10-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [
          "Weather",
          "Snow and Snowstorms",
          "Cold and Cold Spells"
      ],
      "org_facet": [],
      "per_facet": [],
      "geo_facet": [
          "Alabama",
          "Austin (Tex)",
          "Baton Rouge (La)",
          "Florida",
          "Georgia",
          "Gulf Coast (US)",
          "Houston (Tex)",
          "New Orleans (La)",
          "Southeastern States (US)",
          "Texas"
      ],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21nat-winterstorm-vfkm/21nat-winterstorm-vfkm-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1365,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "A man selling firewood out of his pickup truck in Houston ahead of a winter storm on Monday.",
              "copyright": "David J. Phillip/Associated Press"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21nat-winterstorm-vfkm/21nat-winterstorm-vfkm-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "A man selling firewood out of his pickup truck in Houston ahead of a winter storm on Monday.",
              "copyright": "David J. Phillip/Associated Press"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21nat-winterstorm-vfkm/21nat-winterstorm-vfkm-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "A man selling firewood out of his pickup truck in Houston ahead of a winter storm on Monday.",
              "copyright": "David J. Phillip/Associated Press"
          }
      ],
      "short_url": "",
      "category": "weather",
      "description": "“So many of you have never seen an event like this,” Louisiana’s state climatologist warned, with New Orleans facing possibly the most snow it has ever seen.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/21/multimedia/21nat-winterstorm-vfkm/21nat-winterstorm-vfkm-superJumbo.jpg",
      "author": "Campbell Robertson, Nazaneen Ghaffar and Judson Jones",
      "date": "2025-01-21T05:48:10-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "travel",
      "subsection": "",
      "title": "It’s Zinc Bar vs. Barista in a Paris Battle of the Buzz",
      "abstract": "The city’s traditional cafes and bistros are staking out their cultural territory in an emerging duel against highly caffeinated upstarts serving up latte art.",
      "url": "https://www.nytimes.com/2025/01/21/travel/paris-coffee-shops-bistro.html",
      "uri": "nyt://article/eff3e7e4-6e01-56c0-aecc-6cb68da31fa5",
      "byline": "By Vivian Song",
      "item_type": "Article",
      "updated_date": "2025-01-21T05:01:15-05:00",
      "created_date": "2025-01-21T05:01:15-05:00",
      "published_date": "2025-01-21T05:01:15-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [
          "Coffeehouses",
          "Caffeine",
          "French Food (Cuisine)",
          "Coffee",
          "Politics and Government"
      ],
      "org_facet": [],
      "per_facet": [],
      "geo_facet": [
          "Paris (France)"
      ],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20paris-coffee-shops-01-pkfb/20paris-coffee-shops-01-pkfb-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1365,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "With their carefully curated aesthetic, artisanal fare and rapid growth, specialty coffee shops, some say, have been putting the squeeze on Paris’s cafes and bistros.",
              "copyright": "Dmitry Kostyukov for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20paris-coffee-shops-01-pkfb/20paris-coffee-shops-01-pkfb-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "With their carefully curated aesthetic, artisanal fare and rapid growth, specialty coffee shops, some say, have been putting the squeeze on Paris’s cafes and bistros.",
              "copyright": "Dmitry Kostyukov for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20paris-coffee-shops-01-pkfb/20paris-coffee-shops-01-pkfb-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "With their carefully curated aesthetic, artisanal fare and rapid growth, specialty coffee shops, some say, have been putting the squeeze on Paris’s cafes and bistros.",
              "copyright": "Dmitry Kostyukov for The New York Times"
          }
      ],
      "short_url": "",
      "category": "travel",
      "description": "The city’s traditional cafes and bistros are staking out their cultural territory in an emerging duel against highly caffeinated upstarts serving up latte art.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/20/multimedia/20paris-coffee-shops-01-pkfb/20paris-coffee-shops-01-pkfb-superJumbo.jpg",
      "author": "Vivian Song",
      "date": "2025-01-21T05:01:15-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "business",
      "subsection": "",
      "title": "C.E.O.s, and President Trump, Want Workers Back in the Office",
      "abstract": "Amazon, JPMorgan and others have been telling their employees that remote work is over. Now federal employees have been ordered to come to work in person, too.",
      "url": "https://www.nytimes.com/2025/01/21/business/return-to-office-remote-work.html",
      "uri": "nyt://article/999a97c0-ad4e-5e24-9239-7696ff27d197",
      "byline": "By Emma Goldberg",
      "item_type": "Article",
      "updated_date": "2025-01-21T05:32:22-05:00",
      "created_date": "2025-01-21T05:00:47-05:00",
      "published_date": "2025-01-21T05:00:47-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [
          "Labor and Jobs",
          "Telecommuting",
          "Workplace Environment",
          "Real Estate (Commercial)"
      ],
      "org_facet": [],
      "per_facet": [],
      "geo_facet": [],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/16/multimedia/00RTO-PUSH-ztbj/00RTO-PUSH-ztbj-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1365,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "JPMorgan told its employees they would have to return to the office five days a week.",
              "copyright": "Hiroko Masuike/The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/16/multimedia/00RTO-PUSH-ztbj/00RTO-PUSH-ztbj-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "JPMorgan told its employees they would have to return to the office five days a week.",
              "copyright": "Hiroko Masuike/The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/16/multimedia/00RTO-PUSH-ztbj/00RTO-PUSH-ztbj-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "JPMorgan told its employees they would have to return to the office five days a week.",
              "copyright": "Hiroko Masuike/The New York Times"
          }
      ],
      "short_url": "",
      "category": "business",
      "description": "Amazon, JPMorgan and others have been telling their employees that remote work is over. Now federal employees have been ordered to come to work in person, too.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/16/multimedia/00RTO-PUSH-ztbj/00RTO-PUSH-ztbj-superJumbo.jpg",
      "author": "Emma Goldberg",
      "date": "2025-01-21T05:00:47-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "nyregion",
      "subsection": "",
      "title": "The Voices in His Head Would Not Stop. Then a Boy Was Stabbed to Death.",
      "abstract": "Waldo Mejia’s psyche had been showing cracks, a longtime friend said. Now he is charged with killing 14-year-old Caleb Rijos at random.",
      "url": "https://www.nytimes.com/2025/01/21/nyregion/waldo-meija-caleb-rijos-stabbing-voices.html",
      "uri": "nyt://article/3c2a4e37-325d-519b-9338-14d801dba93b",
      "byline": "By Michael Wilson and Chelsia Rose Marcius",
      "item_type": "Article",
      "updated_date": "2025-01-21T03:00:07-05:00",
      "created_date": "2025-01-21T03:00:07-05:00",
      "published_date": "2025-01-21T03:00:07-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [
          "Murders, Attempted Murders and Homicides",
          "Content Type: Personal Profile",
          "Mental Health and Disorders",
          "Schizophrenia",
          "Teenagers and Adolescence"
      ],
      "org_facet": [
          "Save Our Streets"
      ],
      "per_facet": [
          "Hochul, Kathleen C",
          "Caleb Rijos",
          "Waldo Meija",
          "Mozart Beato"
      ],
      "geo_facet": [],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20child-stabbed-pmlw/20child-stabbed-pmlw-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1366,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "Caleb Rijos staggered and fell between two cars after he was fatally stabbed.",
              "copyright": "Dakota Santiago for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20child-stabbed-pmlw/20child-stabbed-pmlw-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "Caleb Rijos staggered and fell between two cars after he was fatally stabbed.",
              "copyright": "Dakota Santiago for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20child-stabbed-pmlw/20child-stabbed-pmlw-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "Caleb Rijos staggered and fell between two cars after he was fatally stabbed.",
              "copyright": "Dakota Santiago for The New York Times"
          }
      ],
      "short_url": "",
      "category": "nyregion",
      "description": "Waldo Mejia’s psyche had been showing cracks, a longtime friend said. Now he is charged with killing 14-year-old Caleb Rijos at random.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/20/multimedia/20child-stabbed-pmlw/20child-stabbed-pmlw-superJumbo.jpg",
      "author": "Michael Wilson and Chelsia Rose Marcius",
      "date": "2025-01-21T03:00:07-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "business",
      "subsection": "",
      "title": "India’s Economy Slows Down Just When It Was Supposed to Speed Up",
      "abstract": "Industrial growth, the stock market and the rupee are sinking, and most consumers earn too little to buoy them, stymieing India’s drive to become a developed economy.",
      "url": "https://www.nytimes.com/2025/01/21/business/indian-economy-rupee.html",
      "uri": "nyt://article/ae4f0610-3465-51e8-94f2-87c60d5bc204",
      "byline": "By Alex Travelli",
      "item_type": "Article",
      "updated_date": "2025-01-21T02:08:48-05:00",
      "created_date": "2025-01-21T00:00:08-05:00",
      "published_date": "2025-01-21T00:00:08-05:00",
      "material_type_facet": "",
      "kicker": "india’s economic promise",
      "des_facet": [
          "Economic Conditions and Trends",
          "Stocks and Bonds",
          "Labor and Jobs",
          "Foreign Investments",
          "Wages and Salaries"
      ],
      "org_facet": [],
      "per_facet": [
          "Modi, Narendra"
      ],
      "geo_facet": [
          "India"
      ],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/00india-econ-01-mfzv/00india-econ-01-mfzv-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1366,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "Workers at a factory in Karad, India, last year. Slowing economic growth has raised worries about India’s vulnerabilities. ",
              "copyright": "Saumya Khandelwal for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/00india-econ-01-mfzv/00india-econ-01-mfzv-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "Workers at a factory in Karad, India, last year. Slowing economic growth has raised worries about India’s vulnerabilities. ",
              "copyright": "Saumya Khandelwal for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/00india-econ-01-mfzv/00india-econ-01-mfzv-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "Workers at a factory in Karad, India, last year. Slowing economic growth has raised worries about India’s vulnerabilities. ",
              "copyright": "Saumya Khandelwal for The New York Times"
          }
      ],
      "short_url": "",
      "category": "business",
      "description": "Industrial growth, the stock market and the rupee are sinking, and most consumers earn too little to buoy them, stymieing India’s drive to become a developed economy.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/20/multimedia/00india-econ-01-mfzv/00india-econ-01-mfzv-superJumbo.jpg",
      "author": "Alex Travelli",
      "date": "2025-01-21T00:00:08-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "world",
      "subsection": "asia",
      "title": "A Nobel Laureate Who Mines Her Country’s Nightmares, and Her Own",
      "abstract": "Han Kang’s latest novel, about a South Korean massacre, delves into why atrocities must be remembered. “It’s pain and it is blood, but it’s the current of life,” she said.",
      "url": "https://www.nytimes.com/2025/01/21/world/asia/han-kang-jeju-book.html",
      "uri": "nyt://article/d8c1bb73-8dc6-5c77-b1be-6e4382125d94",
      "byline": "By Victoria Kim",
      "item_type": "Article",
      "updated_date": "2025-01-21T05:58:17-05:00",
      "created_date": "2025-01-21T00:01:10-05:00",
      "published_date": "2025-01-21T00:01:10-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [
          "Books and Literature",
          "Writing and Writers",
          "Politics and Government",
          "Nobel Prizes",
          "Content Type: Personal Profile"
      ],
      "org_facet": [],
      "per_facet": [
          "Han Kang (1970- )"
      ],
      "geo_facet": [
          "Gwangju (South Korea)",
          "Jeju Island (South Korea)",
          "South Korea"
      ],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21skorea-han-kang-wpzl-promo/21skorea-han-kang-wpzl-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1365,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "Han Kang in 2016. Ms. Kang, who received the Nobel Prize in Literature last year, has written books about two of South Korea’s darkest moments.",
              "copyright": "Jean Chung for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21skorea-han-kang-wpzl-promo/21skorea-han-kang-wpzl-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "Han Kang in 2016. Ms. Kang, who received the Nobel Prize in Literature last year, has written books about two of South Korea’s darkest moments.",
              "copyright": "Jean Chung for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21skorea-han-kang-wpzl-promo/21skorea-han-kang-wpzl-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "Han Kang in 2016. Ms. Kang, who received the Nobel Prize in Literature last year, has written books about two of South Korea’s darkest moments.",
              "copyright": "Jean Chung for The New York Times"
          }
      ],
      "short_url": "",
      "category": "world",
      "description": "Han Kang’s latest novel, about a South Korean massacre, delves into why atrocities must be remembered. “It’s pain and it is blood, but it’s the current of life,” she said.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/21/multimedia/21skorea-han-kang-wpzl-promo/21skorea-han-kang-wpzl-superJumbo.jpg",
      "author": "Victoria Kim",
      "date": "2025-01-21T00:01:10-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "opinion",
      "subsection": "",
      "title": "President Trump, You Can Remake the Middle East if You Dare",
      "abstract": "While the wages of success in the region will be enormous, the consequences of failure will be utterly hellish.",
      "url": "https://www.nytimes.com/2025/01/21/opinion/trump-middle-east.html",
      "uri": "nyt://article/b2ce6941-e630-503b-8b41-b18b995c69ef",
      "byline": "By Thomas L. Friedman",
      "item_type": "Article",
      "updated_date": "2025-01-21T01:00:05-05:00",
      "created_date": "2025-01-21T01:00:05-05:00",
      "published_date": "2025-01-21T01:00:05-05:00",
      "material_type_facet": "",
      "kicker": "Thomas L. Friedman",
      "des_facet": [
          "International Relations",
          "Israel-Gaza War (2023- )"
      ],
      "org_facet": [
          "Palestinian Authority"
      ],
      "per_facet": [
          "Trump, Donald J",
          "Netanyahu, Benjamin"
      ],
      "geo_facet": [
          "Middle East",
          "Gaza Strip",
          "Israel"
      ],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21friedman2-tkwg/21friedman2-tkwg-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1365,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": "Damon Winter/The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21friedman2-tkwg/21friedman2-tkwg-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": "Damon Winter/The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21friedman2-tkwg/21friedman2-tkwg-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "",
              "copyright": "Damon Winter/The New York Times"
          }
      ],
      "short_url": "",
      "category": "opinion",
      "description": "While the wages of success in the region will be enormous, the consequences of failure will be utterly hellish.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/21/multimedia/21friedman2-tkwg/21friedman2-tkwg-superJumbo.jpg",
      "author": "Thomas L. Friedman",
      "date": "2025-01-21T01:00:05-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "opinion",
      "subsection": "",
      "title": "Trump’s Opening Act of Contempt",
      "abstract": "To open his term with such an act of contempt toward the legal system is audacious, even for Mr. Trump.",
      "url": "https://www.nytimes.com/2025/01/20/opinion/trump-jan-6-pardons.html",
      "uri": "nyt://article/b5397be4-5535-580c-aa46-647be3cfc30a",
      "byline": "By The Editorial Board",
      "item_type": "Article",
      "updated_date": "2025-01-20T21:49:21-05:00",
      "created_date": "2025-01-20T21:09:19-05:00",
      "published_date": "2025-01-20T21:09:19-05:00",
      "material_type_facet": "",
      "kicker": "The Editorial Board",
      "des_facet": [
          "Storming of the US Capitol (Jan, 2021)",
          "Amnesties, Commutations and Pardons",
          "Right-Wing Extremism and Alt-Right",
          "Attacks on Police"
      ],
      "org_facet": [],
      "per_facet": [
          "Trump, Donald J",
          "Biden, Joseph R Jr",
          "Tarrio, Enrique",
          "Lamberth, Royce C",
          "Sicknick, Brian D (1978-2021)"
      ],
      "geo_facet": [],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/20/opinion/20pardons-image/20pardons-image-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 2048,
              "width": 2048,
              "type": "image",
              "subtype": "illustration",
              "caption": "",
              "copyright": "Illustration by Rebecca Chew/The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/opinion/20pardons-image/20pardons-image-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "illustration",
              "caption": "",
              "copyright": "Illustration by Rebecca Chew/The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/opinion/20pardons-image/20pardons-image-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "illustration",
              "caption": "",
              "copyright": "Illustration by Rebecca Chew/The New York Times"
          }
      ],
      "short_url": "",
      "category": "opinion",
      "description": "To open his term with such an act of contempt toward the legal system is audacious, even for Mr. Trump.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/20/opinion/20pardons-image/20pardons-image-superJumbo.jpg",
      "author": "The Editorial Board",
      "date": "2025-01-20T21:09:19-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "arts",
      "subsection": "television",
      "title": "Jimmy Fallon: Melania’s Hat Is Her ‘Very Own Border Wall’",
      "abstract": "The “Tonight Show” host donned his own version of the first lady’s inaugural hat, which seemed to prevent the president from kissing her.",
      "url": "https://www.nytimes.com/2025/01/21/arts/television/jimmy-fallon-melania-trump-hat.html",
      "uri": "nyt://article/a26b56fa-f9cb-5b14-a32a-77938e0a58b4",
      "byline": "By Trish Bendix",
      "item_type": "Article",
      "updated_date": "2025-01-21T07:11:36-05:00",
      "created_date": "2025-01-21T03:51:59-05:00",
      "published_date": "2025-01-21T03:51:59-05:00",
      "material_type_facet": "",
      "kicker": "Best of Late Night",
      "des_facet": [
          "Television",
          "Jimmy Kimmel Live (TV Program)",
          "The Tonight Show (TV Program)",
          "Late Show with Stephen Colbert (TV Program)",
          "Late Night with Seth Meyers (TV Program)",
          "Real Time With Bill Maher (TV Program)"
      ],
      "org_facet": [],
      "per_facet": [
          "Colbert, Stephen",
          "Fallon, Jimmy",
          "Maher, Bill",
          "Meyers, Seth",
          "Kimmel, Jimmy"
      ],
      "geo_facet": [],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/21/arts/21latenight/21latenight-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 963,
              "width": 1729,
              "type": "image",
              "subtype": "photo",
              "caption": "“After this, we’re going to play Who Wore It Better: Me, Melania or the Hamburglar,” Jimmy Fallon said on Monday.",
              "copyright": "NBC"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/arts/21latenight/21latenight-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "“After this, we’re going to play Who Wore It Better: Me, Melania or the Hamburglar,” Jimmy Fallon said on Monday.",
              "copyright": "NBC"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/arts/21latenight/21latenight-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "“After this, we’re going to play Who Wore It Better: Me, Melania or the Hamburglar,” Jimmy Fallon said on Monday.",
              "copyright": "NBC"
          }
      ],
      "short_url": "",
      "category": "arts",
      "description": "The “Tonight Show” host donned his own version of the first lady’s inaugural hat, which seemed to prevent the president from kissing her.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/21/arts/21latenight/21latenight-superJumbo.jpg",
      "author": "Trish Bendix",
      "date": "2025-01-21T03:51:59-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "world",
      "subsection": "europe",
      "title": "U.K. Attacker Who Stabbed Girls at Dance Class Had ‘Sickening’ Interest in Violence",
      "abstract": "Axel Rudakubana, who killed three young girls in the Southport attack, appeared to have no particular ideology but was obsessed by death and genocide, investigators said.",
      "url": "https://www.nytimes.com/2025/01/21/world/europe/uk-southport-axel-rudakubana-stabbing-violence.html",
      "uri": "nyt://article/5be9d87d-a001-50d9-81d0-d4603e3648dc",
      "byline": "By Megan Specia",
      "item_type": "Article",
      "updated_date": "2025-01-21T06:13:38-05:00",
      "created_date": "2025-01-21T05:36:27-05:00",
      "published_date": "2025-01-21T05:36:27-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [
          "Murders, Attempted Murders and Homicides",
          "Police",
          "Youth",
          "Terrorism",
          "Deaths (Fatalities)"
      ],
      "org_facet": [],
      "per_facet": [
          "Starmer, Keir"
      ],
      "geo_facet": [
          "Liverpool (England)",
          "Great Britain",
          "Lancashire (England)"
      ],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21UK-ATTACKER-pwhf/21UK-ATTACKER-pwhf-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1380,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "Outside the courthouse in Liverpool, England, where Axel Rudakubana pleaded guilty to murder on Monday.",
              "copyright": "Paul Ellis/Agence France-Presse — Getty Images"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21UK-ATTACKER-pwhf/21UK-ATTACKER-pwhf-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "Outside the courthouse in Liverpool, England, where Axel Rudakubana pleaded guilty to murder on Monday.",
              "copyright": "Paul Ellis/Agence France-Presse — Getty Images"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21UK-ATTACKER-pwhf/21UK-ATTACKER-pwhf-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "Outside the courthouse in Liverpool, England, where Axel Rudakubana pleaded guilty to murder on Monday.",
              "copyright": "Paul Ellis/Agence France-Presse — Getty Images"
          }
      ],
      "short_url": "",
      "category": "world",
      "description": "Axel Rudakubana, who killed three young girls in the Southport attack, appeared to have no particular ideology but was obsessed by death and genocide, investigators said.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/21/multimedia/21UK-ATTACKER-pwhf/21UK-ATTACKER-pwhf-superJumbo.jpg",
      "author": "Megan Specia",
      "date": "2025-01-21T05:36:27-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "us",
      "subsection": "",
      "title": "Border Patrol Agent Is Killed in Vermont Shooting",
      "abstract": "Officials said the agent was shot on Interstate 91, which was closed for several hours near the border with Canada.",
      "url": "https://www.nytimes.com/2025/01/20/us/border-patrol-shooting-vermont.html",
      "uri": "nyt://article/b2a1f906-a208-5f8a-9a91-ca6a0122e15a",
      "byline": "By Jenna Russell and Hamed Aleaziz",
      "item_type": "Article",
      "updated_date": "2025-01-21T06:41:49-05:00",
      "created_date": "2025-01-20T17:50:40-05:00",
      "published_date": "2025-01-20T17:50:40-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [
          "Attacks on Police",
          "Illegal Immigration"
      ],
      "org_facet": [
          "Border Patrol (US)"
      ],
      "per_facet": [],
      "geo_facet": [
          "Vermont",
          "Coventry (Vt)"
      ],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20borderpatrol-shooting-kwtz/20borderpatrol-shooting-kwtz-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1365,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "A U.S. Border Patrol unit is posted along the concrete blocks that mark the boundary between Vermont and the Canadian province of Quebec.",
              "copyright": "Carlos Osorio/Reuters"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20borderpatrol-shooting-kwtz/20borderpatrol-shooting-kwtz-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "A U.S. Border Patrol unit is posted along the concrete blocks that mark the boundary between Vermont and the Canadian province of Quebec.",
              "copyright": "Carlos Osorio/Reuters"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/20/multimedia/20borderpatrol-shooting-kwtz/20borderpatrol-shooting-kwtz-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "A U.S. Border Patrol unit is posted along the concrete blocks that mark the boundary between Vermont and the Canadian province of Quebec.",
              "copyright": "Carlos Osorio/Reuters"
          }
      ],
      "short_url": "",
      "category": "us",
      "description": "Officials said the agent was shot on Interstate 91, which was closed for several hours near the border with Canada.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/20/multimedia/20borderpatrol-shooting-kwtz/20borderpatrol-shooting-kwtz-superJumbo.jpg",
      "author": "Jenna Russell and Hamed Aleaziz",
      "date": "2025-01-20T17:50:40-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "us",
      "subsection": "politics",
      "title": "2 Americans Held in Afghanistan Are Freed in Prisoner Swap",
      "abstract": "In exchange, the Biden administration released an Afghan man convicted on narcotics charges in 2008.",
      "url": "https://www.nytimes.com/2025/01/21/us/politics/americans-taliban-prisoner-swap.html",
      "uri": "nyt://article/187f196f-0a88-5ca4-bac0-0d91317117f4",
      "byline": "By Adam Goldman, Carol Rosenberg and Julian E. Barnes",
      "item_type": "Article",
      "updated_date": "2025-01-21T02:09:16-05:00",
      "created_date": "2025-01-21T00:10:16-05:00",
      "published_date": "2025-01-21T00:10:16-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [
          "Drug Abuse and Traffic",
          "Amnesties, Commutations and Pardons",
          "United States International Relations",
          "Kidnapping and Hostages",
          "Afghanistan War (2001- )"
      ],
      "org_facet": [
          "Al Qaeda",
          "Taliban"
      ],
      "per_facet": [
          "Biden, Joseph R Jr"
      ],
      "geo_facet": [
          "Afghanistan",
          "Guantanamo Bay Naval Base (Cuba)"
      ],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21dc-hostages-zjmv/21dc-hostages-zjmv-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1365,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "The Taliban flag at the site of the former American embassy grounds in Kabul in 2022.",
              "copyright": "Kiana Hayeri for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21dc-hostages-zjmv/21dc-hostages-zjmv-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "The Taliban flag at the site of the former American embassy grounds in Kabul in 2022.",
              "copyright": "Kiana Hayeri for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/21/multimedia/21dc-hostages-zjmv/21dc-hostages-zjmv-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "The Taliban flag at the site of the former American embassy grounds in Kabul in 2022.",
              "copyright": "Kiana Hayeri for The New York Times"
          }
      ],
      "short_url": "",
      "category": "us",
      "description": "In exchange, the Biden administration released an Afghan man convicted on narcotics charges in 2008.",
      "urlToImage": "https://static01.nyt.com/images/2025/01/21/multimedia/21dc-hostages-zjmv/21dc-hostages-zjmv-superJumbo.jpg",
      "author": "Adam Goldman, Carol Rosenberg and Julian E. Barnes",
      "date": "2025-01-21T00:10:16-05:00",
      "sourceName": "New York Times"
  },
  {
      "section": "arts",
      "subsection": "music",
      "title": "In Minneapolis, a Layer of Hygge Warmth for a Top-Notch Orchestra",
      "abstract": "With the Nordic Soundscapes Festival, Thomas Sondergard puts his stamp on the Minnesota Orchestra (and its interior spaces).",
      "url": "https://www.nytimes.com/2025/01/21/arts/music/minnesota-orchestra-thomas-sondergard-nordic-festival.html",
      "uri": "nyt://article/499c8e1b-3f92-52a9-9c8e-437f5e353d1c",
      "byline": "By David Allen and Jenn Ackerman",
      "item_type": "Article",
      "updated_date": "2025-01-21T05:01:07-05:00",
      "created_date": "2025-01-21T05:01:07-05:00",
      "published_date": "2025-01-21T05:01:07-05:00",
      "material_type_facet": "",
      "kicker": "",
      "des_facet": [
          "Classical Music"
      ],
      "org_facet": [
          "Minnesota Orchestra"
      ],
      "per_facet": [
          "Sondergard, Thomas",
          "Vanska, Osmo"
      ],
      "geo_facet": [
          "Minneapolis (Minn)"
      ],
      "multimedia": [
          {
              "url": "https://static01.nyt.com/images/2025/01/26/multimedia/26minnesota-orch-wtgj/26minnesota-orch-wtgj-superJumbo.jpg",
              "format": "Super Jumbo",
              "height": 1366,
              "width": 2048,
              "type": "image",
              "subtype": "photo",
              "caption": "Thomas Sondergard, outside of Orchestra Hall in Minneapolis, is in his second season as the Minnesota Orchestra’s music director.",
              "copyright": "Jenn Ackerman for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/26/multimedia/26minnesota-orch-wtgj/26minnesota-orch-wtgj-threeByTwoSmallAt2X.jpg",
              "format": "threeByTwoSmallAt2X",
              "height": 400,
              "width": 600,
              "type": "image",
              "subtype": "photo",
              "caption": "Thomas Sondergard, outside of Orchestra Hall in Minneapolis, is in his second season as the Minnesota Orchestra’s music director.",
              "copyright": "Jenn Ackerman for The New York Times"
          },
          {
              "url": "https://static01.nyt.com/images/2025/01/26/multimedia/26minnesota-orch-wtgj/26minnesota-orch-wtgj-thumbLarge.jpg",
              "format": "Large Thumbnail",
              "height": 150,
              "width": 150,
              "type": "image",
              "subtype": "photo",
              "caption": "Thomas Sondergard, outside of Orchestra Hall in Minneapolis, is in his second season as the Minnesota Orchestra’s music director.",
              "copyright": "Jenn Ackerman for The New York Times"
          }
      ],
      "short_url": "",
      "category": "arts",
      "description": "With the Nordic Soundscapes Festival, Thomas Sondergard puts his stamp on the Minnesota Orchestra (and its interior spaces).",
      "urlToImage": "https://static01.nyt.com/images/2025/01/26/multimedia/26minnesota-orch-wtgj/26minnesota-orch-wtgj-superJumbo.jpg",
      "author": "David Allen and Jenn Ackerman",
      "date": "2025-01-21T05:01:07-05:00",
      "sourceName": "New York Times"
  }
];

interface DateSelectionType {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string;
}

const HomePage: React.FC = () => {
  //State to store the search term
  const [searchTerm, setSearchTerm] = useState('');
  // Available sources for user preferences
  const availableSources = [
    "New York Times",
    "News API",
    "The Guardian"
  ];
  // State from user preferences
  const { sources, setSources, category, setCategory, authors, setAuthors } = usePreferences(availableSources);
  // State to store the sources, category and date filter to be used in the filter components
  const [ source, setSource ] = useState(sources);
  const [ currentCategory, setCurrentCategory ] = useState(category);
  const [ selectionRange, setSelectionRange ] = useState<DateSelectionType>({
    startDate: undefined,
    endDate: undefined,
    key: 'selection',
  });
  // State to track toggle of date filter and preferences drawer
  const [ dateDrawer, setDateDrawer ] = useState(false);
  const [ preferencesOpen, setPreferencesOpen ] = useState(false);
  // Hardcoded authors for preferences
  const availableAuthors = [
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
  ];
  // Hardcoded categories for preferences
  const preferenceCategories = [
    "",
    "business", 
    "entertainment", 
    "general", 
    "health", 
    "science", 
    "sports", 
    "technology"
  ];

  // Function to save user preferences
  const handleSavePreferences = (selectedSources: string[], selectedCategory: string, selectedAuthors: string[]) => {
    setSources(selectedSources);
    setSource(selectedSources);
    setCategory(selectedCategory);
    setAuthors(selectedAuthors);
    setPreferencesOpen(false);
    fetchData(selectedSources, selectedCategory);
  };

  const [articles, setArticles] = useState<any[]>([]);
  const [articlesAfterFilter, setArticlesAfterFilter] = useState<any[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[] | any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const dummyItems = Array.from({ length: 12 }, (_, id) => id + 1);

  const fetchData = async (selSource:string[]|undefined, selCategory:string|undefined) => {
    setIsLoaded(false);

    try {
      // Create a mapping of sources to their respective fetch functions
      const sourceFetchers: Record<string, Function> = {
        // 'News API': fetchNewsApiData,
        // 'The Guardian': fetchGuardianData,
        // 'New York Times': fetchNYTData,
      };

      // Push relevant promises into the array based on the selected sources
      const promises = availableSources.map((source) => sourceFetchers[source](searchTerm));

      // Wait for all promises to resolve and combine the results
      // const combinedResults = (await Promise.all(promises)).flat();
      const combinedResults = comb;
      var result:any[] = [];
      const uniqueCategories = new Set();
      const currCategory = selCategory?selCategory:currentCategory;
      // Filter based on sources and categories
      combinedResults.forEach((article) => {
        // If the data comes from the selected source
        if ((selSource?selSource:source).includes(article.sourceName))
          // If the category is the same as the selected category or no category
          if((currCategory) === '' || (currCategory) === article.category) {
            result.push(article);
          }
        uniqueCategories.add(article.category);
      });
      setArticles(combinedResults);
      setArticlesAfterFilter(result);
      const uniqueCategoriesArray = [...uniqueCategories];
      setAvailableCategories(uniqueCategoriesArray);
      // To reset category filter
      setCurrentCategory(selCategory ? selCategory : currentCategory);
      // To reset date filter
      setSelectionRange({
        startDate: undefined,
        endDate: undefined,
        key: 'selection',
      })
    } catch (err) {
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchData(undefined, undefined);
  }, [searchTerm]);   

  // Filter data whenever filters change
  useEffect(() => {
    try {
      console.log(currentCategory,sources,articles,selectionRange)
      var result:any[] = [];
      // Filter based on sources and categories
      articles.forEach((article) => {
        if (source.includes(article.sourceName)){
          if (selectionRange.startDate && selectionRange.endDate) {
            const articleDate = new Date(article.date);
            if (articleDate >= selectionRange.startDate && articleDate <= selectionRange.endDate) {
              if (currentCategory === '' || currentCategory === article.category) {
                result.push(article);
              }
            }
          } else{
            if (currentCategory === '' || currentCategory === article.category) {
              result.push(article);
            }
          }
        }
      });
      setArticlesAfterFilter(result);
    } catch (err) {
    } finally {
    }
  }, [currentCategory, source, selectionRange]);

  const handleSelect = (ranges:{selection:DateSelectionType}) => {
    setSelectionRange({ ...ranges.selection });
  }

  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Drawer PaperProps={{sx:{borderRadius: "0px 0px 30px 30px"}}} anchor={"top"} open={preferencesOpen} onClose={()=>setPreferencesOpen(false)}>
        <PreferencesModal
          availableSources={availableSources}
          availableCategories={preferenceCategories}
          availableAuthors={availableAuthors}
          savedSources={sources}
          savedCategory={currentCategory}
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
            <Newspaper sx={{color:"#535370"}} />
            <Typography noWrap  variant="h6" component="div" sx={{ color:"#1f1f29ab", flexGrow: 1, fontSize: { xs:"1rem", sm:"1.25rem"}, fontWeight: { xs:"bold" } }}>
              News Aggregator
            </Typography>
          </Stack>
          <Stack alignItems="center" sx={{flexDirection:{xs:"column", sm:"row"}, width: {xs:"100%", md:"initial"}, justifyContent: {sm:"space-between"}}}>
            <Stack flexDirection="row">
              <IconButton onClick={()=>setDateDrawer(true)}>
                <CalendarMonth/>
              </IconButton>
              <SourceFilter sources={availableSources} selectedSource={source} onSelectSource={setSource} />
              <CategoryFilter categories={availableCategories} selectedCategory={currentCategory} onSelectCategory={setCurrentCategory} />
            </Stack>
            <Stack flexDirection="row" sx={{justifyContent:{xs:"space-between", sm:"end"}, width:"100%"}}>
              <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
              <IconButton onClick={()=>setPreferencesOpen(true)}><Tune/></IconButton>
            </Stack>
          </Stack>
          <Drawer
            anchor={"right"}
            open={dateDrawer}
            onClose={()=>setDateDrawer(false)}
          >
            <Stack divider={<Divider orientation="horizontal" flexItem />}>
              <Stack justifyContent={"start"} flexDirection="row">
                <IconButton onClick={()=>setDateDrawer(false)}>
                  <ArrowBack />
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
      <Stack justifyContent={articlesAfterFilter.length === 0 ? "center" : "initial"} flexDirection="row" flexWrap={"wrap"} sx={{height:"100%", borderTop:"1px solid #7c6b6b", background:"linear-gradient(to right, #cdc6c6 0%, #9b9494 51%, #939393 72%)", rowGap:"8px", columnGap:"8px", padding:"16px"}}>
        {
          !isLoaded ? 
          dummyItems.map((article,idx)=> <NewsCardSkeleton key={idx} />) :
          (
            articlesAfterFilter.length === 0 ? <Typography variant="h6" sx={{color:"#1f1f29ab"}}>No Articles Found</Typography> :
            articlesAfterFilter.map((article,idx)=> <NewsCard key={idx} url={article.url} title={article.title} subtitle={article.description} imageUrl={article.urlToImage} author={article.author} />) 
          )
        }
      </Stack>
    </Box>
  );
};

export default HomePage;
