Zum Inhalt
logo
OpenHolidays API
Welcome

api : 
https://holidays.abstractapi.com/v1?country=US&year=2026&month=12&day=25

Suche
 
 On GitHub
47
7
OpenHolidays API
Welcome
Reference
Change Log
Data Sources
Client Libraries
Community
FAQ
API
Inhaltsverzeichnis
Let's start
Countries
Languages
Subdivisions
Groups
Public holidays
School holidays
Tips and tricks
Welcome
OpenHolidays API is a small Open Data project that collects public holiday and school holiday data and makes it available via an open REST API interface. The following countries are currently supported:

Albanien (public holidays and school holidays from 2020)
Andorra (public holidays and school holidays from 2020)
Austria (public holidays and school holidays from 2020)
Belarus (public holidays and school holidays from 2020)
Belgium (public holidays and school holidays from 2020)
Brazil (public holidays from 2020)
Bulgaria (public holidays and school holidays from 2020)
Croatia (public holidays and school holidays from 2020)
Czechia (public holidays and school holidays from 2020)
Estonia (public holidays and school holidays from 2020)
France (public holidays and school holidays from 2020)
Germany (public holidays and school holidays from 2020)
Hungary (public holidays and school holidays from 2020)
Ireland (public holidays and school holidays from 2020)
Italy (public holidays and school holidays from 2020)
Latvia (public holidays and school holidays from 2020)
Liechtenstein (public holidays and school holidays from 2020)
Lithuania (public holidays and school holidays from 2020)
Luxembourg (public holidays and school holidays from 2020)
Malta (public holidays and school holidays from 2020)
Mexico (public holidays and school holidays from 2020)
Moldova (public holidays and school holidays from 2020)
Monaco (public holidays and school holidays from 2020)
Netherlands (public holidays and school holidays from 2020)
Poland (public holidays and school holidays from 2020)
Portugal (public holidays and school holidays from 2020)
Romania (public holidays and school holidays from 2020)
San Marino (public holidays and school holidays from 2020)
Serbia (public holidays and school holidays from 2020)
Slovakia (public holidays and school holidays from 2020)
Slovenia (public holidays and school holidays from 2020)
South Africa (public holidays and school holidays from 2020)
Spain (public holidays and school holidays from 2020)
Sweden (public holidays from 2020)
Switzerland (public holidays and school holidays from 2020)
Vatican City (public holidays from 2020)
Public holidays and school holidays are returned optionally as JSON or in iCal format.

Let's start¶
The easiest way to use the API is via the command line. We will work with the command line application curl in this chapter.

Under Linux, curl is usually pre-installed. Under Windows, curl is defined as an alias of the Invoke-WebRequest cmdlet, so it can be used via Powershell. The command sequences used here vary slightly, so they are given separately for Powershell 7 (Windows) and Bash (Linux).

Countries¶
First, we query which countries are supported by the OpenHolidays API:


Powershell 7
Bash

curl -X GET 'https://openholidaysapi.org/Countries' -H 'accept: text/json' | ConvertFrom-Json | ConvertTo-Json

The codes of the countries correspond to the standard ISO 3166-1.

Languages¶
The names of public holidays or school holidays are stored in several languages. Usually there are translations in the respective official languages of a country (e.g. Polish for Poland) as well as a translation into German and English.

The languages currently used by OpenHolidays API can be queried as follows:


Powershell 7
Bash

curl -X GET 'https://openholidaysapi.org/Languages' -H 'accept: text/json' | ConvertFrom-Json | ConvertTo-Json

The codes of the languages correspond to the standard ISO 639-1.

Subdivisions¶
For each country, the relevant principal subdivisions (e.g. federal states, Swiss cantons or holiday zones) can be queried. Administrative units are only returned if they are relevant for the filtering of public holidays and/or school holidays.

Here is an example query for Germany (DE):


Powershell 7
Bash

curl -X GET 'https://openholidaysapi.org/Subdivisions?countryIsoCode=DE' -H 'accept: text/json' | ConvertFrom-Json | ConvertTo-Json

The codes of the subdivisions are based on the standard ISO 3166-2 as well as the coding list Hierarchical administrative subdivision codes (HASC).

Groups¶
For school holidays, filters that cannot be mapped by administrative units of a country will be defined via groups. Groups can be anything, e.g. holiday zones, language boundaries or school types. Groups are not defined for every country.

Here is an example query for Belgium (BE) that returns the language boundaries for school holidays:


Powershell 7
Bash

curl -X GET 'https://openholidaysapi.org/groups?countryIsoCode=BE' -H 'accept: text/json' | ConvertFrom-Json | ConvertTo-Json

Public holidays¶
Public holidays can be queried per country and for any period (which must not be greater than three years). Optionally, the names of the public holidays can be restricted to a specific language.

Here is an example query for Swiss public holidays between 1 January 2022 and 30 June 2022 with German output language:


Powershell 7
Bash

curl -X GET 'https://openholidaysapi.org/PublicHolidays?countryIsoCode=CH&languageIsoCode=DE&validFrom=2022-01-01&validTo=2022-06-30' -H 'accept: text/json' | ConvertFrom-Json | ConvertTo-Json

If you wish, you can also have the data returned in iCal format:


Powershell 7
Bash

curl -X GET 'https://openholidaysapi.org/PublicHolidays?countryIsoCode=CH&languageIsoCode=DE&validFrom=2022-01-01&validTo=2022-06-30' -H 'accept: text/calendar'

School holidays¶
School holidays can be queried per country and administrative unit as well as for any period (which must not be longer than three years). Optionally, the names of the school holidays can be restricted to a specific language.

Here is an example query for school holidays in Austria between 1 January 2022 and 31 December 2022 for the federal state of Carinthia with English output language:


Powershell 7
Bash

curl -X GET 'https://openholidaysapi.org/SchoolHolidays?countryIsoCode=AT&subdivisionCode=AT-KÄ&languageIsoCode=EN&validFrom=2022-01-01&validTo=2022-12-31' -H 'accept: text/json' | ConvertFrom-Json | ConvertTo-Json

Here, too, the data can optionally be returned in iCal format:


Powershell
Bash

curl -X GET 'https://openholidaysapi.org/SchoolHolidays?countryIsoCode=AT&subdivisionCode=AT-KÄ&languageIsoCode=EN&validFrom=2022-01-01&validTo=2022-12-31' -H 'accept: text/calendar'

Tips and tricks¶
To write the screen output of curl to a file, the parameter -o can be used. The following example saves all German public holidays for 2022 in an iCal file that can be imported into Outlook, for example.


Powershell 7
Bash

curl -X GET 'https://openholidaysapi.org/PublicHolidays?countryIsoCode=DE&validFrom=2022-01-01&validTo=2022-12-31' -H 'accept: text/calendar' -o 'kalendar.ics'

 Zurück zum Seitenanfang
Weiter
Error messages
© 2025 STÜBER SYSTEMS GmbH : Imprint : Privacy
Made with Material for MkDocs
Skip to content
gaupoit
free-apis-collection
Repository navigation
Code
Issues
Pull requests
Actions
Projects
Security and quality
Insights
Owner avatar
free-apis-collection
Public
gaupoit/free-apis-collection
Go to file
t
Name		
gaupoitclaude
gaupoit
and
claude
Fix pyproject.toml for hatchling build
52de3bf
 · 
3 months ago
mcp-server
Fix pyproject.toml for hatchling build
3 months ago
AGENTS.md
Add MCP server and AI agent documentation
3 months ago
README.md
Add MCP server and AI agent documentation
3 months ago
apis.json
Add JSON data file and GitHub topics
3 months ago
Repository files navigation
README
Free APIs for Developers
A curated collection of free APIs perfect for testing, learning, and building projects. Most require no authentication.

Now with MCP Server support for AI Agents!

Table of Contents
For AI Agents
Weather & Environment
Finance & Cryptocurrency
Entertainment & Media
Data & Demographics
Fun & Random
Development & Testing
Science & Education
Location & Geography
Food & Lifestyle
Animals
For AI Agents
This collection includes an MCP Server that lets AI agents (Claude, etc.) discover and call these APIs directly.

Quick Setup (Claude Code)
# Install dependencies
cd mcp-server && pip install -e .

# Add to Claude Code
claude mcp add free-apis -- python /path/to/free-apis-collection/mcp-server/server.py
MCP Tools Available
Tool	Description
list_categories()	See all API categories
list_apis(category, auth_required)	Filter APIs by category or auth
search_apis(query)	Search by keyword
get_api(name)	Get full API details
quick_test(api_name)	Instantly test a no-auth API
call_api(url)	Call any API endpoint
get_random_api()	Discover a random API
For Vibe Coders
Just tell your AI assistant:

"Get me a random dog image" → Uses Dog CEO API
"What's Bitcoin worth?" → Uses CoinDesk API
"I'm bored" → Uses Bored API
"Tell me a joke" → Uses Joke API
See AGENTS.md for full AI agent documentation.

Weather & Environment
API	URL	Description
OpenWeather	https://openweathermap.org/api	Current weather, forecasts, and historical data
Finance & Cryptocurrency
API	URL	Description
CoinDesk	https://api.coindesk.com/v1/bpi/currentprice.json	Bitcoin Price Index in real-time (No Auth)
CoinGecko	https://www.coingecko.com/en/api	Cryptocurrency prices, market data, and exchanges
ExchangeRate-API	https://www.exchangerate-api.com/	Currency exchange rates
Entertainment & Media
API	URL	Description
The Movie DB	https://www.themoviedb.org/documentation/api	Movies, TV shows, and actor information
Giphy	https://developers.giphy.com	GIFs, stickers, and animated content
JokeAPI	https://jokeapi.dev	Programming, misc, dark, pun jokes
Official Joke API	https://official-joke-api.appspot.com/random_joke	Random jokes (No Auth)
Bored API	https://www.boredapi.com/api/activity	Activity suggestions when bored (No Auth)
PokeAPI	https://pokeapi.co/	Pokemon data and sprites (No Auth)
Open Trivia DB	https://opentdb.com/api_config.php	Trivia questions across categories (No Auth)
Chuck Norris API	https://api.chucknorris.io/	Chuck Norris jokes (No Auth)
Quotable	https://github.com/lukePeavey/quotable	Random quotes (No Auth)
Data & Demographics
API	URL	Description
REST Countries	https://restcountries.com	Country information, flags, currencies, languages
Data USA	https://datausa.io/api/data?drilldowns=Nation	U.S. demographic and population data (No Auth)
Agify.io	https://api.agify.io?name=michael	Estimate age from name (No Auth)
Genderize.io	https://api.genderize.io?name=luc	Predict gender from name (No Auth)
Nationalize.io	https://api.nationalize.io?name=nathaniel	Infer nationality from name (No Auth)
RandomUser	https://randomuser.me/api/	Generate fake user data (No Auth)
Universities List	http://universities.hipolabs.com/search?country=United+States	Universities by country (No Auth)
Public APIs	https://api.publicapis.org/entries	Directory of public APIs (No Auth)
Fun & Random
API	URL	Description
Cat Facts	https://cat-fact.herokuapp.com/facts	Random cat facts (No Auth)
Numbers API	http://numbersapi.com/	Facts about numbers (No Auth)
Advice Slip	https://api.adviceslip.com/	Random life advice (No Auth)
Yes No	https://yesno.wtf/api	Random yes/no answers with GIFs (No Auth)
Useless Facts	https://uselessfacts.jsph.pl/	Random useless facts (No Auth)
Development & Testing
API	URL	Description
JSONPlaceholder	https://jsonplaceholder.typicode.com	Fake REST API for testing and prototyping
GitHub REST API	https://docs.github.com/en/rest	GitHub repositories, users, and activity
HTTPBin	https://httpbin.org/	HTTP request & response testing (No Auth)
ReqRes	https://reqres.in/	Fake REST API for front-end testing (No Auth)
IPify	https://api.ipify.org?format=json	Get your public IP address (No Auth)
IPinfo	https://ipinfo.io/json	IP geolocation data
Science & Education
API	URL	Description
NASA Open API	https://api.nasa.gov	Space imagery, Mars rover photos, asteroids
SpaceX API	https://github.com/r-spacex/SpaceX-API	SpaceX launches, rockets, and capsules (No Auth)
Open Library	https://openlibrary.org/developers/api	Books and author information (No Auth)
Wikipedia API	https://www.mediawiki.org/wiki/API:Main_page	Wikipedia content and search (No Auth)
arXiv API	https://arxiv.org/help/api	Scientific papers and preprints (No Auth)
Free Dictionary	https://dictionaryapi.dev/	English word definitions (No Auth)
Location & Geography
API	URL	Description
Zippopotam	https://api.zippopotam.us/us/33162	Postal code lookup (No Auth)
IP Geolocation	https://ip-api.com/	IP-based location data (No Auth)
OpenSky Network	https://opensky-network.org/apidoc/	Live flight tracking data
Open Charge Map	https://openchargemap.org/site/develop/api	EV charging station locations (No Auth)
Food & Lifestyle
API	URL	Description
OpenFoodFacts	https://world.openfoodfacts.org/data	Food products and nutritional data
TheMealDB	https://www.themealdb.com/api.php	Recipes and meal data (No Auth)
TheCocktailDB	https://www.thecocktaildb.com/api.php	Cocktail recipes (No Auth)
Trefle	https://trefle.io	Plants database and botanical data
Animals
API	URL	Description
Dog CEO	https://dog.ceo/api/breeds/image/random	Random dog images (No Auth)
Cat API	https://thecatapi.com/	Cat images and breeds
Dog API	https://thedogapi.com/	Dog images and breed information
RandomFox	https://randomfox.ca/floof/	Random fox images (No Auth)
Shibe.online	https://shibe.online/	Random shiba inu, cat, bird images (No Auth)
Quick Test URLs (No Auth Required)
Try these directly in your browser:

# Random dog image
curl https://dog.ceo/api/breeds/image/random

# Your IP address
curl https://api.ipify.org?format=json

# Random joke
curl https://official-joke-api.appspot.com/random_joke

# Random activity
curl https://www.boredapi.com/api/activity

# Bitcoin price
curl https://api.coindesk.com/v1/bpi/currentprice.json

# Random user
curl https://randomuser.me/api/
Contributing
Found a great free API? Open a PR to add it!

Resources
public-apis/public-apis - Massive community-curated list
Free Public APIs - No-auth APIs collection
Apipheny Free API List - 90+ public APIs
License
MIT - Feel free to use and share!

About
Curated collection of 50+ free APIs for developers - testing, learning, and building projects

Topics
api rest-api developer-tools open-api public-api learning-resources free-api api-list no-auth api-collection
Resources
 Readme
 Activity
Stars
 1 star
Watchers
 0 watching
Forks
 0 forks
Report repository
Releases
No releases published
Packages
No packages published
Contributors
2
@claude
claude Claude
@gaupoit
gaupoit 0xGP
Languages
Python
100.0%
Footer
© 2026 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Community
Docs
Contact
Manage cookies
Do not share my personal information
{
  "meta": {
    "title": "Free APIs Collection",
    "description": "Curated collection of free APIs for developers",
    "version": "1.0.0",
    "lastUpdated": "2025-01-04",
    "totalApis": 52
  },
  "categories": [
    {
      "name": "Weather & Environment",
      "slug": "weather",
      "apis": [
        {
          "name": "OpenWeather",
          "url": "https://openweathermap.org/api",
          "description": "Current weather, forecasts, and historical data",
          "auth": "apiKey",
          "https": true,
          "cors": "yes"
        }
      ]
    },
    {
      "name": "Finance & Cryptocurrency",
      "slug": "finance",
      "apis": [
        {
          "name": "CoinDesk",
          "url": "https://api.coindesk.com/v1/bpi/currentprice.json",
          "description": "Bitcoin Price Index in real-time",
          "auth": "none",
          "https": true,
          "cors": "yes",
          "testUrl": "https://api.coindesk.com/v1/bpi/currentprice.json"
        },
        {
          "name": "CoinGecko",
          "url": "https://www.coingecko.com/en/api",
          "description": "Cryptocurrency prices, market data, and exchanges",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "ExchangeRate-API",
          "url": "https://www.exchangerate-api.com/",
          "description": "Currency exchange rates",
          "auth": "apiKey",
          "https": true,
          "cors": "yes"
        }
      ]
    },
    {
      "name": "Entertainment & Media",
      "slug": "entertainment",
      "apis": [
        {
          "name": "The Movie DB",
          "url": "https://www.themoviedb.org/documentation/api",
          "description": "Movies, TV shows, and actor information",
          "auth": "apiKey",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "Giphy",
          "url": "https://developers.giphy.com",
          "description": "GIFs, stickers, and animated content",
          "auth": "apiKey",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "JokeAPI",
          "url": "https://jokeapi.dev",
          "description": "Programming, misc, dark, pun jokes",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "Official Joke API",
          "url": "https://official-joke-api.appspot.com/random_joke",
          "description": "Random jokes",
          "auth": "none",
          "https": true,
          "cors": "yes",
          "testUrl": "https://official-joke-api.appspot.com/random_joke"
        },
        {
          "name": "Bored API",
          "url": "https://www.boredapi.com/api/activity",
          "description": "Activity suggestions when bored",
          "auth": "none",
          "https": true,
          "cors": "yes",
          "testUrl": "https://www.boredapi.com/api/activity"
        },
        {
          "name": "PokeAPI",
          "url": "https://pokeapi.co/",
          "description": "Pokemon data and sprites",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "Open Trivia DB",
          "url": "https://opentdb.com/api_config.php",
          "description": "Trivia questions across categories",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "Chuck Norris API",
          "url": "https://api.chucknorris.io/",
          "description": "Chuck Norris jokes",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "Quotable",
          "url": "https://github.com/lukePeavey/quotable",
          "description": "Random quotes",
          "auth": "none",
          "https": true,
          "cors": "yes"
        }
      ]
    },
    {
      "name": "Data & Demographics",
      "slug": "data",
      "apis": [
        {
          "name": "REST Countries",
          "url": "https://restcountries.com",
          "description": "Country information, flags, currencies, languages",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "Data USA",
          "url": "https://datausa.io/api/data?drilldowns=Nation",
          "description": "U.S. demographic and population data",
          "auth": "none",
          "https": true,
          "cors": "yes",
          "testUrl": "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        },
        {
          "name": "Agify.io",
          "url": "https://agify.io",
          "description": "Estimate age from name",
          "auth": "none",
          "https": true,
          "cors": "yes",
          "testUrl": "https://api.agify.io?name=michael"
        },
        {
          "name": "Genderize.io",
          "url": "https://genderize.io",
          "description": "Predict gender from name",
          "auth": "none",
          "https": true,
          "cors": "yes",
          "testUrl": "https://api.genderize.io?name=luc"
        },
        {
          "name": "Nationalize.io",
          "url": "https://nationalize.io",
          "description": "Infer nationality from name",
          "auth": "none",
          "https": true,
          "cors": "yes",
          "testUrl": "https://api.nationalize.io?name=nathaniel"
        },
        {
          "name": "RandomUser",
          "url": "https://randomuser.me/",
          "description": "Generate fake user data",
          "auth": "none",
          "https": true,
          "cors": "yes",
          "testUrl": "https://randomuser.me/api/"
        },
        {
          "name": "Universities List",
          "url": "http://universities.hipolabs.com",
          "description": "Universities by country",
          "auth": "none",
          "https": false,
          "cors": "yes",
          "testUrl": "http://universities.hipolabs.com/search?country=United+States"
        },
        {
          "name": "Public APIs",
          "url": "https://api.publicapis.org",
          "description": "Directory of public APIs",
          "auth": "none",
          "https": true,
          "cors": "yes",
          "testUrl": "https://api.publicapis.org/entries"
        }
      ]
    },
    {
      "name": "Fun & Random",
      "slug": "fun",
      "apis": [
        {
          "name": "Cat Facts",
          "url": "https://cat-fact.herokuapp.com",
          "description": "Random cat facts",
          "auth": "none",
          "https": true,
          "cors": "yes",
          "testUrl": "https://cat-fact.herokuapp.com/facts"
        },
        {
          "name": "Numbers API",
          "url": "http://numbersapi.com/",
          "description": "Facts about numbers",
          "auth": "none",
          "https": false,
          "cors": "yes"
        },
        {
          "name": "Advice Slip",
          "url": "https://api.adviceslip.com/",
          "description": "Random life advice",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "Yes No",
          "url": "https://yesno.wtf/api",
          "description": "Random yes/no answers with GIFs",
          "auth": "none",
          "https": true,
          "cors": "yes",
          "testUrl": "https://yesno.wtf/api"
        },
        {
          "name": "Useless Facts",
          "url": "https://uselessfacts.jsph.pl/",
          "description": "Random useless facts",
          "auth": "none",
          "https": true,
          "cors": "yes"
        }
      ]
    },
    {
      "name": "Development & Testing",
      "slug": "development",
      "apis": [
        {
          "name": "JSONPlaceholder",
          "url": "https://jsonplaceholder.typicode.com",
          "description": "Fake REST API for testing and prototyping",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "GitHub REST API",
          "url": "https://docs.github.com/en/rest",
          "description": "GitHub repositories, users, and activity",
          "auth": "oauth",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "HTTPBin",
          "url": "https://httpbin.org/",
          "description": "HTTP request & response testing",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "ReqRes",
          "url": "https://reqres.in/",
          "description": "Fake REST API for front-end testing",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "IPify",
          "url": "https://www.ipify.org/",
          "description": "Get your public IP address",
          "auth": "none",
          "https": true,
          "cors": "yes",
          "testUrl": "https://api.ipify.org?format=json"
        },
        {
          "name": "IPinfo",
          "url": "https://ipinfo.io/",
          "description": "IP geolocation data",
          "auth": "apiKey",
          "https": true,
          "cors": "yes",
          "testUrl": "https://ipinfo.io/json"
        }
      ]
    },
    {
      "name": "Science & Education",
      "slug": "science",
      "apis": [
        {
          "name": "NASA Open API",
          "url": "https://api.nasa.gov",
          "description": "Space imagery, Mars rover photos, asteroids",
          "auth": "apiKey",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "SpaceX API",
          "url": "https://github.com/r-spacex/SpaceX-API",
          "description": "SpaceX launches, rockets, and capsules",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "Open Library",
          "url": "https://openlibrary.org/developers/api",
          "description": "Books and author information",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "Wikipedia API",
          "url": "https://www.mediawiki.org/wiki/API:Main_page",
          "description": "Wikipedia content and search",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "arXiv API",
          "url": "https://arxiv.org/help/api",
          "description": "Scientific papers and preprints",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "Free Dictionary",
          "url": "https://dictionaryapi.dev/",
          "description": "English word definitions",
          "auth": "none",
          "https": true,
          "cors": "yes"
        }
      ]
    },
    {
      "name": "Location & Geography",
      "slug": "location",
      "apis": [
        {
          "name": "Zippopotam",
          "url": "https://api.zippopotam.us",
          "description": "Postal code lookup",
          "auth": "none",
          "https": true,
          "cors": "yes",
          "testUrl": "https://api.zippopotam.us/us/33162"
        },
        {
          "name": "IP-API",
          "url": "https://ip-api.com/",
          "description": "IP-based location data",
          "auth": "none",
          "https": false,
          "cors": "yes"
        },
        {
          "name": "OpenSky Network",
          "url": "https://opensky-network.org/apidoc/",
          "description": "Live flight tracking data",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "Open Charge Map",
          "url": "https://openchargemap.org/site/develop/api",
          "description": "EV charging station locations",
          "auth": "none",
          "https": true,
          "cors": "yes"
        }
      ]
    },
    {
      "name": "Food & Lifestyle",
      "slug": "food",
      "apis": [
        {
          "name": "OpenFoodFacts",
          "url": "https://world.openfoodfacts.org/data",
          "description": "Food products and nutritional data",
          "auth": "none",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "TheMealDB",
          "url": "https://www.themealdb.com/api.php",
          "description": "Recipes and meal data",
          "auth": "apiKey",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "TheCocktailDB",
          "url": "https://www.thecocktaildb.com/api.php",
          "description": "Cocktail recipes",
          "auth": "apiKey",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "Trefle",
          "url": "https://trefle.io",
          "description": "Plants database and botanical data",
          "auth": "apiKey",
          "https": true,
          "cors": "yes"
        }
      ]
    },
    {
      "name": "Animals",
      "slug": "animals",
      "apis": [
        {
          "name": "Dog CEO",
          "url": "https://dog.ceo/dog-api/",
          "description": "Random dog images",
          "auth": "none",
          "https": true,
          "cors": "yes",
          "testUrl": "https://dog.ceo/api/breeds/image/random"
        },
        {
          "name": "The Cat API",
          "url": "https://thecatapi.com/",
          "description": "Cat images and breeds",
          "auth": "apiKey",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "The Dog API",
          "url": "https://thedogapi.com/",
          "description": "Dog images and breed information",
          "auth": "apiKey",
          "https": true,
          "cors": "yes"
        },
        {
          "name": "RandomFox",
          "url": "https://randomfox.ca/",
          "description": "Random fox images",
          "auth": "none",
          "https": true,
          "cors": "yes",
          "testUrl": "https://randomfox.ca/floof/"
        },
        {
          "name": "Shibe.online",
          "url": "https://shibe.online/",
          "description": "Random shiba inu, cat, bird images",
          "auth": "none",
          "https": true,
          "cors": "yes"
        }
      ]
    }
  ]
}

# Try Public APIs for free
The Public APIs repository is manually curated by community members like you and folks working at [APILayer](https://apilayer.com/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo). It includes an extensive list of public APIs from many domains that you can use for your own products. Consider it a treasure trove of APIs well-managed by the community over the years.

<br >

<p>
    <a href="https://apilayer.com">
        <div>
            <img src=".github/cs1586-APILayerLogoUpdate2022-LJ_v2-HighRes.png" width="100%" alt="APILayer Logo" />
        </div>
    </a>
  </p>

APILayer is the fastest way to integrate APIs into any product. Explore [APILayer APIs](https://apilayer.com/products/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo) here for your next project.

Join our [Discord server](https://discord.com/invite/hgjA78638n/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo) to get updates, ask questions, get answers, random community calls, and more.

<br >

## APILayer APIs
| API | Description | Call this API |
|:---|:---|:---|
| [IPstack](https://ipstack.com/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Locate and Identify Website Visitors by IP Address | [<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/10131015-55145132-244c-448c-8e6f-8780866e4862?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D10131015-55145132-244c-448c-8e6f-8780866e4862%26entityType%3Dcollection%26workspaceId%3D2b7498b6-6d91-4fa8-817f-608441fe42a8)|
| [Marketstack](https://marketstack.com/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Free, easy-to-use REST API interface delivering worldwide stock market data in JSON format | [<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/10131015-9cbac391-3611-4f50-9bfd-d24ae41c97c1?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D10131015-9cbac391-3611-4f50-9bfd-d24ae41c97c1%26entityType%3Dcollection%26workspaceId%3D2b7498b6-6d91-4fa8-817f-608441fe42a8)|
| [Weatherstack](https://weatherstack.com/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Retrieve instant, accurate weather information for any location in the world in lightweight JSON format | [<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/10131015-276c4312-f682-425d-b6b1-0f82c0a7f2b3?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D10131015-276c4312-f682-425d-b6b1-0f82c0a7f2b3%26entityType%3Dcollection%26workspaceId%3D2b7498b6-6d91-4fa8-817f-608441fe42a8)|
| [Numverify](https://numverify.com/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers ) | Global Phone Number Validation & Lookup JSON API |[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/10131015-0760d25e-b802-412e-b0e4-26e5ca3b9ffa?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D10131015-0760d25e-b802-412e-b0e4-26e5ca3b9ffa%26entityType%3Dcollection%26workspaceId%3D2b7498b6-6d91-4fa8-817f-608441fe42a8)|
| [Fixer](https://fixer.io/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Fixer is a simple and lightweight API for current and historical foreign exchange (forex) rates. |[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/10131015-0d9c66b3-5f1a-42ed-a5ca-379217bd629d?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D10131015-0d9c66b3-5f1a-42ed-a5ca-379217bd629d%26entityType%3Dcollection%26workspaceId%3D2b7498b6-6d91-4fa8-817f-608441fe42a8)|
| [Aviationstack](https://aviationstack.com/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Free, real-time flight status and global Aviation data API |[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/10131015-72ee0d35-018e-4370-a2b6-a66d3ebd5b5a?action=collection/fork)|
| [Zenserp](https://zenserp.com/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Fast, Accurate Google Search Data Built for Developers |[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/10131015-a3d63243-081e-4961-a2f0-39c7a9394b8d?action=collection/fork)|
| [Screenshotlayer](https://screenshotlayer.com/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Capture highly customizable screenshots of any website |[Documentation](https://docs.apilayer.com/screenshotlayer/docs/api-documentation?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers)|
| [Exchangerate Host](https://exchangerate.host/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Real-time current and historical foreign exchange and crypto rates |[Documentation](https://docs.apilayer.com/Exchangerate/docs/api-documentation?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers)|
| [Mailboxlayer](https://mailboxlayer.com/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Email Validation & Verification JSON API for Developers |[Documentation](https://docs.apilayer.com/mailboxlayer/docs/api-documentation?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers)|

<br >

## Learn more about Public APIs

<strong>Get Involved</strong>

* [Contributing Guide](CONTRIBUTING.md)
* [API for this project](https://github.com/davemachado/public-api)
* [Issues](https://github.com/public-apis/public-apis/issues)
* [Pull Requests](https://github.com/public-apis/public-apis/pulls)
* [LICENSE](LICENSE) 

<br />

## Index

* [Animals](#animals)
* [Anime](#anime)
* [Anti-Malware](#anti-malware)
* [Art & Design](#art--design)
* [Authentication & Authorization](#authentication--authorization)
* [Blockchain](#blockchain)
* [Books](#books)
* [Business](#business)
* [Calendar](#calendar)
* [Cloud Storage & File Sharing](#cloud-storage--file-sharing)
* [Continuous Integration](#continuous-integration)
* [Cryptocurrency](#cryptocurrency)
* [Currency Exchange](#currency-exchange)
* [Data Validation](#data-validation)
* [Development](#development)
* [Dictionaries](#dictionaries)
* [Documents & Productivity](#documents--productivity)
* [Email](#email)
* [Entertainment](#entertainment)
* [Environment](#environment)
* [Events](#events)
* [Finance](#finance)
* [Food & Drink](#food--drink)
* [Games & Comics](#games--comics)
* [Geocoding](#geocoding)
* [Government](#government)
* [Health](#health)
* [Jobs](#jobs)
* [Machine Learning](#machine-learning)
* [Music](#music)
* [News](#news)
* [Open Data](#open-data)
* [Open Source Projects](#open-source-projects)
* [Patent](#patent)
* [Personality](#personality)
* [Phone](#phone)
* [Photography](#photography)
* [Programming](#programming)
* [Science & Math](#science--math)
* [Security](#security)
* [Shopping](#shopping)
* [Social](#social)
* [Sports & Fitness](#sports--fitness)
* [Test Data](#test-data)
* [Text Analysis](#text-analysis)
* [Tracking](#tracking)
* [Transportation](#transportation)
* [URL Shorteners](#url-shorteners)
* [Vehicle](#vehicle)
* [Video](#video)
* [Weather](#weather)
<br >

### Animals
API | Description | Auth | HTTPS | CORS 
|:---|:---|:---|:---|:---|
| [AdoptAPet](https://www.adoptapet.com/public/apis/pet_list.html) | Resource to help get pets adopted | `apiKey` | Yes | Yes |
| [Axolotl](https://theaxolotlapi.netlify.app/) | Collection of axolotl pictures and facts | No | Yes | No |
| [Cat Facts](https://alexwohlbruck.github.io/cat-facts/) | Daily cat facts | No | Yes | No | |
| [Cataas](https://cataas.com/) | Cat as a service (cats pictures and gifs) | No | Yes | No |
| [Cats](https://docs.thecatapi.com/) | Pictures of cats from Tumblr | `apiKey` | Yes | No |
| [Dog Facts](https://dukengn.github.io/Dog-facts-API/) | Random dog facts | No | Yes | Yes |
| [Dog Facts](https://kinduff.github.io/dog-api/) | Random facts of Dogs | No | Yes | Yes |
| [Dogs](https://dog.ceo/dog-api/) | Based on the Stanford Dogs Dataset | No | Yes | Yes |
| [eBird](https://documenter.getpostman.com/view/664302/S1ENwy59) | Retrieve recent or notable birding observations within a region | `apiKey` | Yes | No |
| [FishWatch](https://www.fishwatch.gov/developers) | Information and pictures about individual fish species | No | Yes | Yes |
| [HTTP Cat](https://http.cat/) | Cat for every HTTP Status | No | Yes | Yes |
| [HTTP Dog](https://http.dog/) | Dogs for every HTTP response status code | No | Yes | Yes |
| [IUCN](http://apiv3.iucnredlist.org/api/v3/docs) | IUCN Red List of Threatened Species | `apiKey` | No | No |
| [MeowFacts](https://github.com/wh-iterabb-it/meowfacts) | Get random cat facts | No | Yes | No |
| [Movebank](https://github.com/movebank/movebank-api-doc) | Movement and Migration data of animals | No | Yes | Yes |
| [Petfinder](https://www.petfinder.com/developers/) | Petfinder is dedicated to helping pets find homes, another resource to get pets adopted | `apiKey` | Yes | Yes |
| [PlaceBear](https://placebear.com/) | Placeholder bear pictures | No | Yes | Yes |
| [PlaceDog](https://place.dog) | Placeholder Dog pictures | No | Yes | Yes |
| [PlaceKitten](https://placekitten.com/) | Placeholder Kitten pictures | No | Yes | Yes |
| [RandomDog](https://random.dog/woof.json) | Random pictures of dogs | No | Yes | Yes |
| [RandomDuck](https://random-d.uk/api) | Random pictures of ducks | No | Yes | No |
| [RandomFox](https://randomfox.ca/floof/) | Random pictures of foxes | No | Yes | No |
| [RescueGroups](https://userguide.rescuegroups.org/display/APIDG/API+Developers+Guide+Home) | Adoption | No | Yes | Unknown |
| [Shibe.Online](http://shibe.online/) | Random pictures of Shiba Inu, cats or birds | No | Yes | Yes |
| [The Dog](https://thedogapi.com/) | A public service all about Dogs, free to use when making your fancy new App, Website or Service | `apiKey` | Yes | No |
| [xeno-canto](https://xeno-canto.org/explore/api) | Bird recordings | No | Yes | Unknown |
| [Zoo Animals](https://zoo-animal-api.herokuapp.com/) | Facts and pictures of zoo animals | No | Yes | Yes |

**[⬆ Back to Index](#index)**
<br >
<br >

### Anime
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [AniAPI](https://aniapi.com/docs/) | Anime discovery, streaming & syncing with trackers | `OAuth` | Yes | Yes |
| [AniDB](https://wiki.anidb.net/HTTP_API_Definition) | Anime Database | `apiKey` | No | Unknown |
| [AniList](https://github.com/AniList/ApiV2-GraphQL-Docs) | Anime discovery & tracking | `OAuth` | Yes | Unknown |
| [AnimeChan](https://github.com/RocktimSaikia/anime-chan) | Anime quotes (over 10k+) | No | Yes | No |
| [AnimeFacts](https://chandan-02.github.io/anime-facts-rest-api/) | Anime Facts (over 100+) | No | Yes | Yes |
| [AnimeNewsNetwork](https://www.animenewsnetwork.com/encyclopedia/api.php) | Anime industry news | No | Yes | Yes |
| [Catboy](https://catboys.com/api) | Neko images, funny GIFs & more | No | Yes | Yes |
| [Danbooru Anime](https://danbooru.donmai.us/wiki_pages/help:api) | Thousands of anime artist database to find good anime art | `apiKey` | Yes | Yes |
| [Jikan](https://jikan.moe) | Unofficial MyAnimeList API | No | Yes | Yes |
| [Kitsu](https://kitsu.docs.apiary.io/) | Anime discovery platform | `OAuth` | Yes | Yes |
| [MangaDex](https://api.mangadex.org/docs.html) | Manga Database and Community | `apiKey` | Yes | Unknown |
| [Mangapi](https://rapidapi.com/pierre.carcellermeunier/api/mangapi3/) | Translate manga pages from one language to another | `apiKey` | Yes | Unknown |
| [MyAnimeList](https://myanimelist.net/clubs.php?cid=13727) | Anime and Manga Database and Community | `OAuth` | Yes | Unknown |
| [NekosBest](https://docs.nekos.best) | Neko Images & Anime roleplaying GIFs | No | Yes | Yes |
| [Shikimori](https://shikimori.one/api/doc) | Anime discovery, tracking, forum, rates | `OAuth` | Yes | Unknown |
| [Studio Ghibli](https://ghibliapi.herokuapp.com) | Resources from Studio Ghibli films | No | Yes | Yes |
| [Trace Moe](https://soruly.github.io/trace.moe-api/#/) | A useful tool to get the exact scene of an anime from a screenshot | No | Yes | No |
| [Waifu.im](https://waifu.im/docs) | Get waifu pictures from an archive of over 4000 images and multiple tags | No | Yes | Yes |
| [Waifu.pics](https://waifu.pics/docs) | Image sharing platform for anime images | No | Yes | No |

**[⬆ Back to Index](#index)**
<br >
<br >

### Anti-Malware
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [AbuseIPDB](https://docs.abuseipdb.com/) | IP/domain/URL reputation | `apiKey` | Yes | Unknown |
| [AlienVault Open Threat Exchange (OTX)](https://otx.alienvault.com/api) | IP/domain/URL reputation | `apiKey` | Yes | Unknown |
| [CAPEsandbox](https://capev2.readthedocs.io/en/latest/usage/api.html) | Malware execution and analysis | `apiKey` | Yes | Unknown |
| [Google Safe Browsing](https://developers.google.com/safe-browsing/) | Google Link/Domain Flagging | `apiKey` | Yes | Unknown |
| [MalDatabase](https://maldatabase.com/api-doc.html) | Provide malware datasets and threat intelligence feeds | `apiKey` | Yes | Unknown |
| [MalShare](https://malshare.com/doc.php) | Malware Archive / file sourcing | `apiKey` | Yes | No |
| [MalwareBazaar](https://bazaar.abuse.ch/api/) | Collect and share malware samples | `apiKey` | Yes | Unknown |
| [Metacert](https://metacert.com/) | Metacert Link Flagging | `apiKey` | Yes | Unknown |
| [NoPhishy](https://rapidapi.com/Amiichu/api/exerra-phishing-check/) | Check links to see if they're known phishing attempts | `apiKey` | Yes | Yes |
| [Phisherman](https://phisherman.gg/) | IP/domain/URL reputation | `apiKey` | Yes | Unknown |
| [Scanii](https://docs.scanii.com/) | Simple REST API that can scan submitted documents/files for the presence of threats | `apiKey` | Yes | Yes |
| [URLhaus](https://urlhaus-api.abuse.ch/) | Bulk queries and Download Malware Samples | No | Yes | Yes |
| [URLScan.io](https://urlscan.io/about-api/) | Scan and Analyse URLs | `apiKey` | Yes | Unknown |
| [VirusTotal](https://www.virustotal.com/en/documentation/public-api/) | VirusTotal File/URL Analysis | `apiKey` | Yes | Unknown |
| [Web of Trust](https://support.mywot.com/hc/en-us/sections/360004477734-API-) | IP/domain/URL reputation | `apiKey` | Yes | Unknown | 

**[⬆ Back to Index](#index)**
<br >
<br >
### Art & Design
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Améthyste](https://api.amethyste.moe/) | Generate images for Discord users | `apiKey` | Yes | Unknown |
| [Art Institute of Chicago](https://api.artic.edu/docs/) | Art | No | Yes | Yes |
| [Colormind](http://colormind.io/api-access/) | Color scheme generator | No | No | Unknown |
| [ColourLovers](http://www.colourlovers.com/api) | Get various patterns, palettes and images | No | No | Unknown |
| [Cooper Hewitt](https://collection.cooperhewitt.org/api) | Smithsonian Design Museum | `apiKey` | Yes | Unknown |
| [Dribbble](https://developer.dribbble.com) | Discover the world’s top designers & creatives | `OAuth` | Yes | Unknown |
| [EmojiHub](https://github.com/cheatsnake/emojihub) | Get emojis by categories and groups | No | Yes | Yes |
| [Europeana](https://pro.europeana.eu/resources/apis/search) | European Museum and Galleries content | `apiKey` | Yes | Unknown |
| [Harvard Art Museums](https://github.com/harvardartmuseums/api-docs) | Art | `apiKey` | No | Unknown |
| [Icon Horse](https://icon.horse) | Favicons for any website, with fallbacks | No | Yes | Yes |
| [Iconfinder](https://developer.iconfinder.com) | Icons | `apiKey` | Yes | Unknown |
| [Icons8](https://img.icons8.com/) | Icons (find "search icon" hyperlink in page) | No | Yes | Unknown |
| [Lordicon](https://lordicon.com/) | Icons with predone Animations | No | Yes | Yes |
| [Metropolitan Museum of Art](https://metmuseum.github.io/) | Met Museum of Art | No | Yes | No |
| [Noun Project](http://api.thenounproject.com/index.html) | Icons | `OAuth` | No | Unknown |
| [PHP-Noise](https://php-noise.com/) | Noise Background Image Generator | No | Yes | Yes |
| [Pixel Encounter](https://pixelencounter.com/api) | SVG Icon Generator | No | Yes | No |
| [Rijksmuseum](https://data.rijksmuseum.nl/object-metadata/api/) | RijksMuseum Data | `apiKey` | Yes | Unknown |
| [Word Cloud](https://wordcloudapi.com/) | Easily create word clouds | `apiKey` | Yes | Unknown |
| [xColors](https://x-colors.herokuapp.com/) | Generate & convert colors | No | Yes | Yes |

**[⬆ Back to Index](#index)**
<br >
<br >
### Authentication & Authorization
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Auth0](https://auth0.com) | Easy to implement, adaptable authentication and authorization platform | `apiKey` | Yes | Yes |
| [GetOTP](https://otp.dev/en/docs/) | Implement OTP flow quickly | `apiKey` | Yes | No |
| [Micro User Service](https://m3o.com/user) | User management and authentication | `apiKey` | Yes | No |
| [MojoAuth](https://mojoauth.com) | Secure and modern passwordless authentication platform | `apiKey` | Yes | Yes |
| [SAWO Labs](https://sawolabs.com) | Simplify login and improve user experience by integrating passwordless authentication in your app | `apiKey` | Yes | Yes |
| [Stytch](https://stytch.com/) | User infrastructure for modern applications | `apiKey` | Yes | No |
| [Warrant](https://warrant.dev/) | APIs for authorization and access control | `apiKey` | Yes | Yes |

**[⬆ Back to Index](#index)**
<br >
<br >
### Blockchain
| API | Description | Auth | HTTPS | CORS |
|---|:---|:---|:---|:---|
| [Bitquery](https://graphql.bitquery.io/ide) | Onchain GraphQL APIs & DEX APIs | `apiKey` | Yes | Yes |
| [Chainlink](https://chain.link/developer-resources) | Build hybrid smart contracts with Chainlink | No | Yes | Unknown |
| [Chainpoint](https://tierion.com/chainpoint/) | Chainpoint is a global network for anchoring data to the Bitcoin blockchain | No | Yes | Unknown |
| [Covalent](https://www.covalenthq.com/docs/api/) | Multi-blockchain data aggregator platform | `apiKey` | Yes | Unknown |
| [Etherscan](https://etherscan.io/apis) | Ethereum explorer API | `apiKey` | Yes | Yes |
| [Helium](https://docs.helium.com/api/blockchain/introduction/) | Helium is a global, distributed network of Hotspots that create public, long-range wireless coverage | No | Yes | Unknown |
| [Nownodes](https://nownodes.io/) | Blockchain-as-a-service solution that provides high-quality connection via API | `apiKey` | Yes | Unknown |
| [Steem](https://developers.steem.io/) | Blockchain-based blogging and social media website | No | No | No |
| [The Graph](https://thegraph.com) | Indexing protocol for querying networks like Ethereum with GraphQL | `apiKey` | Yes | Unknown |
| [Walltime](https://walltime.info/api.html) | To retrieve Walltime's market info | No | Yes | Unknown |
| [Watchdata](https://docs.watchdata.io) | Provide simple and reliable API access to Ethereum blockchain | `apiKey` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Books
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [A Bíblia Digital](https://www.abibliadigital.com.br/en) | Do not worry about managing the multiple versions of the Bible | `apiKey` | Yes | No |
| [Bhagavad Gita](https://docs.bhagavadgitaapi.in) | Open Source Shrimad Bhagavad Gita API including 21+ authors translation in Sanskrit/English/Hindi | `apiKey` | Yes | Yes |
| [Bhagavad Gita](https://bhagavadgita.io/api) | Bhagavad Gita text | `OAuth` | Yes | Yes |
| [Bhagavad Gita telugu](https://gita-api.vercel.app) | Bhagavad Gita API in telugu and odia languages | No | Yes | Yes |
| [Bible-api](https://bible-api.com/) | Free Bible API with multiple languages | No | Yes | Yes |
| [British National Bibliography](http://bnb.data.bl.uk/) | Books | No | No | Unknown |
| [Crossref Metadata Search](https://github.com/CrossRef/rest-api-doc) | Books & Articles Metadata | No | Yes | Unknown |
| [Ganjoor](https://api.ganjoor.net) | Classic Persian poetry works including access to related manuscripts, recitations and music tracks | `OAuth` | Yes | Yes |
| [Google Books](https://developers.google.com/books/) | Books | `OAuth` | Yes | Unknown |
| [GurbaniNow](https://github.com/GurbaniNow/api) | Fast and Accurate Gurbani RESTful API | No | Yes | Unknown |
| [Gutendex](https://gutendex.com/) | Web-API for fetching data from Project Gutenberg Books Library | No | Yes | Unknown |
| [Open Library](https://openlibrary.org/developers/api) | Books, book covers and related data | No | Yes | No |
| [Penguin Publishing](http://www.penguinrandomhouse.biz/webservices/rest/) | Books, book covers and related data | No | Yes | Yes |
| [PoetryDB](https://github.com/thundercomb/poetrydb#readme) | Enables you to get instant data from our vast poetry collection | No | Yes | Yes |
| [Quran](https://quran.api-docs.io/) | RESTful Quran API with multiple languages | No | Yes | Yes |
| [Quran Cloud](https://alquran.cloud/api) | A RESTful Quran API to retrieve an Ayah, Surah, Juz or the entire Holy Quran | No | Yes | Yes |
| [Quran-api](https://github.com/fawazahmed0/quran-api#readme) | Free Quran API Service with 90+ different languages and 400+ translations | No | Yes | Yes |
| [Rig Veda](https://aninditabasu.github.io/indica/html/rv.html) | Gods and poets, their categories, and the verse meters, with the mandal and sukta number | No | Yes | Unknown |
| [The Bible](https://docs.api.bible) | Everything you need from the Bible in one discoverable place | `apiKey` | Yes | Unknown |
| [Thirukkural](https://api-thirukkural.web.app/) | 1330 Thirukkural poems and explanation in Tamil and English | No | Yes | Yes |
| [Vedic Society](https://aninditabasu.github.io/indica/html/vs.html) | Descriptions of all nouns (names, places, animals, things) from vedic literature | No | Yes | Unknown |
| [Wizard World](https://wizard-world-api.herokuapp.com/swagger/index.html) | Get information from the Harry Potter universe | No | Yes | Yes |
| [Wolne Lektury](https://wolnelektury.pl/api/) | API for obtaining information about e-books available on the WolneLektury.pl website | No | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Business
API | Description | Auth | HTTPS | CORS |
|---|:---|:---|:---|:---|
| [Apache Superset](https://superset.apache.org/docs/api) | API to manage your BI dashboards and data sources on Superset | `apiKey` | Yes | Yes |
| [Charity Search](http://charityapi.orghunter.com/) | Non-profit charity data | `apiKey` | No | Unknown 
| [Clearbit Logo](https://clearbit.com/docs#logo-api) | Search for company logos and embed them in your projects | `apiKey` | Yes | Unknown |
| [Domainsdb.info](https://domainsdb.info/) | Registered Domain Names Search | No | Yes | No |
| [Freelancer](https://developers.freelancer.com) | Hire freelancers to get work done | `OAuth` | Yes | Unknown |
| [Gmail](https://developers.google.com/gmail/api/) | Flexible, RESTful access to the user's inbox | `OAuth` | Yes | Unknown |
| [Google Analytics](https://developers.google.com/analytics/) | Collect, configure and analyze your data to reach the right audience | `OAuth` | Yes | Unknown |
| [Instatus](https://instatus.com/help/api) | Post to and update maintenance and incidents on your status page through an HTTP REST API | `apiKey` | Yes | Unknown |
| [Mailchimp](https://mailchimp.com/developer/) | Send marketing campaigns and transactional mails | `apiKey` | Yes | Unknown |
| [mailjet](https://www.mailjet.com/) | Marketing email can be sent and mail templates made in MJML or HTML can be sent using API | `apiKey` | Yes | Unknown |
| [markerapi](https://markerapi.com) | Trademark Search | No | No | Unknown |
| [ORB Intelligence](https://api.orb-intelligence.com/docs/) | Company lookup | `apiKey` | Yes | Unknown |
| [Redash](https://redash.io/help/user-guide/integrations-and-api/api) | Access your queries and dashboards on Redash | `apiKey` | Yes | Yes |
| [Smartsheet](https://smartsheet.redoc.ly/) | Allows you to programmatically access and Smartsheet data and account information | `OAuth` | Yes | No |
| [Square](https://developer.squareup.com/reference/square) | Easy way to take payments, manage refunds, and help customers checkout online | `OAuth` | Yes | Unknown |
| [SwiftKanban](https://www.digite.com/knowledge-base/swiftkanban/article/api-for-swift-kanban-web-services/#restapi) | Kanban software, Visualize Work, Increase Organizations Lead Time, Throughput & Productivity | `apiKey` | Yes | Unknown |
| [Tenders in Hungary](https://tenders.guru/hu/api) | Get data for procurements in Hungary in JSON format | No | Yes | Unknown |
| [Tenders in Poland](https://tenders.guru/pl/api) | Get data for procurements in Poland in JSON format | No | Yes | Unknown |
| [Tenders in Romania](https://tenders.guru/ro/api) | Get data for procurements in Romania in JSON format | No | Yes | Unknown |
| [Tenders in Spain](https://tenders.guru/es/api) | Get data for procurements in Spain in JSON format | No | Yes | Unknown |
| [Tenders in Ukraine](https://tenders.guru/ua/api) | Get data for procurements in Ukraine in JSON format | No | Yes | Unknown |
| [Tomba email finder](https://tomba.io/api) | Email Finder for B2B sales and email marketing and email verifier | `apiKey` | Yes | Yes |
| [Trello](https://developers.trello.com/) | Boards, lists and cards to help you organize and prioritize your projects | `OAuth` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Calendar
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Calendarific](https://calendarific.com/) | Worldwide Holidays | `apiKey` | Yes | Unknown |
| [Checkiday - National Holiday API](https://apilayer.com/marketplace/checkiday-api) | Industry-leading Holiday API. Over 5,000 holidays and thousands of descriptions. Trusted by the World’s leading companies | `apiKey` | Yes | Unknown |
| [Church Calendar](http://calapi.inadiutorium.cz/) | Catholic liturgical calendar | No | No | Unknown |
| [Czech Namedays Calendar](https://svatky.adresa.info) | Lookup for a name and returns nameday date | No | No | Unknown |
| [Festivo Public Holidays](https://docs.getfestivo.com/docs/products/public-holidays-api/intro) | Fastest and most advanced public holiday and observance service on the market | `apiKey` | Yes | Yes |
| [Google Calendar](https://developers.google.com/google-apps/calendar/) | Display, create and modify Google calendar events | `OAuth` | Yes | Unknown |
| [Hebrew Calendar](https://www.hebcal.com/home/developer-apis) | Convert between Gregorian and Hebrew, fetch Shabbat and Holiday times, etc | No | No | Unknown |
| [Holidays](https://holidayapi.com/) | Historical data regarding holidays | `apiKey` | Yes | Unknown |
| [LectServe](http://www.lectserve.com) | Protestant liturgical calendar | No | No | Unknown |
| [Nager.Date](https://date.nager.at) | Public holidays for more than 90 countries | No | Yes | No |
| [Namedays Calendar](https://nameday.abalin.net) | Provides namedays for multiple countries | No | Yes | Yes |
| [Non-Working Days](https://github.com/gadael/icsdb) | Database of ICS files for non working days | No | Yes | Unknown |
| [Non-Working Days](https://isdayoff.ru) | Simple REST API for checking working, non-working or short days for Russia, CIS, USA and other | No | Yes | Yes |
| [Public Holidays](https://www.abstractapi.com/holidays-api) | Data on national, regional, and religious holidays via API | `apiKey` | Yes | Yes |
| [Russian Calendar](https://github.com/egno/work-calendar) | Check if a date is a Russian holiday or not | No | Yes | No |
| [UK Bank Holidays](https://www.gov.uk/bank-holidays.json) | Bank holidays in England and Wales, Scotland and Northern Ireland | No | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Cloud Storage & File Sharing
API | Description | Auth | HTTPS | CORS |
|---|:---|:---|:---|:---|
| [AnonFiles](https://anonfiles.com/docs/api) | Upload and share your files anonymously | No | Yes | Unknown | |
| [BayFiles](https://bayfiles.com/docs/api) | Upload and share your files | No | Yes | Unknown | |
| [Box](https://developer.box.com/) | File Sharing and Storage | `OAuth` | Yes | Unknown | |
| [ddownload](https://ddownload.com/api) | File Sharing and Storage | `apiKey` | Yes | Unknown | |
| [Dropbox](https://www.dropbox.com/developers) | File Sharing and Storage | `OAuth` | Yes | Unknown | |
| [File.io](https://www.file.io) | Super simple file sharing, convenient, anonymous and secure | No | Yes | Unknown | |
| [Filestack](https://www.filestack.com) | Filestack File Uploader & File Upload API | `apiKey` | Yes | Unknown |    |
| [GoFile](https://gofile.io/api) | Unlimited size file uploads for free | `apiKey` | Yes | Unknown | |
| [Google Drive](https://developers.google.com/drive/) | File Sharing and Storage | `OAuth` | Yes | Unknown | |
| [Gyazo](https://gyazo.com/api/docs) | Save & Share screen captures instantly | `apiKey` | Yes | Unknown | |
| [Imgbb](https://api.imgbb.com/) | Simple and quick private image sharing | `apiKey` | Yes | Unknown | |
| [OneDrive](https://developer.microsoft.com/onedrive) | File Sharing and Storage | `OAuth` | Yes | Unknown | |
| [Pantry](https://getpantry.cloud/) | Free JSON storage for small projects | No | Yes | Yes | |
| [Pastebin](https://pastebin.com/doc_api) | Plain Text Storage | `apiKey` | Yes | Unknown | |
| [Pinata](https://docs.pinata.cloud/) | IPFS Pinning Services API | `apiKey` | Yes | Unknown | |
| [Quip](https://quip.com/dev/automation/documentation) | File Sharing and Storage for groups | `apiKey` | Yes | Yes | |
| [Storj](https://docs.storj.io/dcs/) | Decentralized Open-Source Cloud Storage | `apiKey` | Yes | Unknown | |
| [The Null Pointer](https://0x0.st) | No-bullshit file hosting and URL shortening service | No | Yes | Unknown | |
| [Web3 Storage](https://web3.storage/) | File Sharing and Storage for Free with 1TB Space | `apiKey` | Yes | Yes | |

**[⬆ Back to Index](#index)**
<br >
<br >
### Continuous Integration
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Azure DevOps Health](https://docs.microsoft.com/en-us/rest/api/resourcehealth) | Resource health helps you diagnose and get support when an Azure issue impacts your resources | `apiKey` | No | No |
| [Bitrise](https://api-docs.bitrise.io/) | Build tool and processes integrations to create efficient development pipelines | `apiKey` | Yes | Unknown |
| [Buddy](https://buddy.works/docs/api/getting-started/overview) | The fastest continuous integration and continuous delivery platform | `OAuth` | Yes | Unknown |
| [CircleCI](https://circleci.com/docs/api/v1-reference/) | Automate the software development process using continuous integration and continuous delivery | `apiKey` | Yes | Unknown |
| [Codeship](https://docs.cloudbees.com/docs/cloudbees-codeship/latest/api-overview/) | Codeship is a Continuous Integration Platform in the cloud | `apiKey` | Yes | Unknown |
| [Travis CI](https://docs.travis-ci.com/api/) | Sync your GitHub projects with Travis CI to test your code in minutes | `apiKey` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Cryptocurrency
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Coinlayer](https://coinlayer.com?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Real-time Crypto Currency Exchange Rates | `apiKey` | Yes | Unknown |
| [0x](https://0x.org/api) | API for querying token and pool stats across various liquidity pools | No | Yes | Yes |
| [1inch](https://1inch.io/api/) | API for querying decentralize exchange | No | Yes | Unknown |
| [Alchemy Ethereum](https://docs.alchemy.com/alchemy/) | Ethereum Node-as-a-Service Provider | `apiKey` | Yes | Yes |
| [Binance](https://github.com/binance/binance-spot-api-docs) | Exchange for Trading Cryptocurrencies based in China | `apiKey` | Yes | Unknown |
| [Bitcambio](https://nova.bitcambio.com.br/api/v3/docs#a-public) | Get the list of all traded assets in the exchange | No | Yes | Unknown |
| [BitcoinAverage](https://apiv2.bitcoinaverage.com/) | Digital Asset Price Data for the blockchain industry | `apiKey` | Yes | Unknown |
| [BitcoinCharts](https://bitcoincharts.com/about/exchanges/) | Financial and Technical Data related to the Bitcoin Network | No | Yes | Unknown |
| [Bitfinex](https://docs.bitfinex.com/docs) | Cryptocurrency Trading Platform | `apiKey` | Yes | Unknown |
| [Bitmex](https://www.bitmex.com/app/apiOverview) | Real-Time Cryptocurrency derivatives trading platform based in Hong Kong | `apiKey` | Yes | Unknown |
| [Bittrex](https://bittrex.github.io/api/v3) | Next Generation Crypto Trading Platform | `apiKey` | Yes | Unknown |
| [Block](https://block.io/docs/basic) | Bitcoin Payment, Wallet & Transaction Data | `apiKey` | Yes | Unknown |
| [Blockchain](https://www.blockchain.com/api) | Bitcoin Payment, Wallet & Transaction Data | `apiKey` | Yes | Unknown |
| [blockfrost Cardano](https://blockfrost.io/) | Interaction with the Cardano mainnet and several testnets | `apiKey` | Yes | Unknown |
| [Brave NewCoin](https://bravenewcoin.com/developers) | Real-time and historic crypto data from more than 200+ exchanges | `apiKey` | Yes | Unknown |
| [BtcTurk](https://docs.btcturk.com/) | Real-time cryptocurrency data, graphs and API that allows buy&sell | `apiKey` | Yes | Yes |
| [Bybit](https://bybit-exchange.github.io/docs/linear/#t-introduction) | Cryptocurrency data feed and algorithmic trading | `apiKey` | Yes | Unknown |
| [CoinAPI](https://docs.coinapi.io/) | All Currency Exchanges integrate under a single api | `apiKey` | Yes | No |
| [Coinbase](https://developers.coinbase.com) | Bitcoin, Bitcoin Cash, Litecoin and Ethereum Prices | `apiKey` | Yes | Unknown |
| [Coinbase Pro](https://docs.pro.coinbase.com/#api) | Cryptocurrency Trading Platform | `apiKey` | Yes | Unknown |
| [CoinCap](https://docs.coincap.io/) | Real time Cryptocurrency prices through a RESTful API | No | Yes | Unknown |
| [CoinDCX](https://docs.coindcx.com/) | Cryptocurrency Trading Platform | `apiKey` | Yes | Unknown |
| [CoinDesk](https://old.coindesk.com/coindesk-api/) | CoinDesk's Bitcoin Price Index (BPI) in multiple currencies | No | Yes | Unknown |
| [CoinGecko](http://www.coingecko.com/api) | Cryptocurrency Price, Market, and Developer/Social Data | No | Yes | Yes |
| [Coinigy](https://coinigy.docs.apiary.io) | Interacting with Coinigy Accounts and Exchange Directly | `apiKey` | Yes | Unknown |
| [Coinlib](https://coinlib.io/apidocs) | Crypto Currency Prices | `apiKey` | Yes | Unknown |
| [Coinlore](https://www.coinlore.com/cryptocurrency-data-api) | Cryptocurrencies prices, volume and more | No | Yes | Unknown |
| [CoinMarketCap](https://coinmarketcap.com/api/) | Cryptocurrencies Prices | `apiKey` | Yes | Unknown |
| [Coinpaprika](https://api.coinpaprika.com) | Cryptocurrencies prices, volume and more | No | Yes | Yes |
| [CoinRanking](https://developers.coinranking.com/api/documentation) | Live Cryptocurrency data | `apiKey` | Yes | Unknown |
| [Coinremitter](https://coinremitter.com/docs) | Cryptocurrencies Payment & Prices | `apiKey` | Yes | Unknown |
| [CoinStats](https://documenter.getpostman.com/view/5734027/RzZ6Hzr3?version=latest) | Crypto Tracker | No | Yes | Unknown |
| [CryptAPI](https://docs.cryptapi.io/) | Cryptocurrency Payment Processor | No | Yes | Unknown |
| [CryptingUp](https://www.cryptingup.com/apidoc/#introduction) | Cryptocurrency data | No | Yes | Unknown |
| [CryptoCompare](https://www.cryptocompare.com/api#) | Cryptocurrencies Comparison | No | Yes | Unknown |
| [CryptoMarket](https://api.exchange.cryptomkt.com/) | Cryptocurrencies Trading platform | `apiKey` | Yes | Yes |
| [Cryptonator](https://www.cryptonator.com/api/) | Cryptocurrencies Exchange Rates | No | Yes | Unknown |
| [dYdX](https://docs.dydx.exchange/) | Decentralized cryptocurrency exchange | `apiKey` | Yes | Unknown |
| [Ethplorer](https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API) | Ethereum tokens, balances, addresses, history of transactions, contracts, and custom structures | `apiKey` | Yes | Unknown |
| [EXMO](https://documenter.getpostman.com/view/10287440/SzYXWKPi) | Cryptocurrencies exchange based in UK | `apiKey` | Yes | Unknown |
| [FTX](https://docs.ftx.com/) | Complete REST, websocket, and FTX APIs to suit your algorithmic trading needs | `apiKey` | Yes | Yes |
| [Gateio](https://www.gate.io/api2) | API provides spot, margin and futures trading operations | `apiKey` | Yes | Unknown |
| [Gemini](https://docs.gemini.com/rest-api/) | Cryptocurrencies Exchange | No | Yes | Unknown |
| [Hirak Exchange Rates](https://rates.hirak.site/) | Exchange rates between 162 currency & 300 crypto currency update each 5 min, accurate, no limits | `apiKey` | Yes | Unknown |
| [Huobi](https://huobiapi.github.io/docs/spot/v1/en/) | Seychelles based cryptocurrency exchange | `apiKey` | Yes | Unknown |
| [icy.tools](https://developers.icy.tools/) | GraphQL based NFT API | `apiKey` | Yes | Unknown |
| [Indodax](https://github.com/btcid/indodax-official-api-docs) | Trade your Bitcoin and other assets with rupiah | `apiKey` | Yes | Unknown |
| [INFURA Ethereum](https://infura.io/product/ethereum) | Interaction with the Ethereum mainnet and several testnets | `apiKey` | Yes | Yes |
| [Kraken](https://docs.kraken.com/rest/) | Cryptocurrencies Exchange | `apiKey` | Yes | Unknown |
| [KuCoin](https://docs.kucoin.com/) | Cryptocurrency Trading Platform | `apiKey` | Yes | Unknown |
| [Localbitcoins](https://localbitcoins.com/api-docs/) | P2P platform to buy and sell Bitcoins | No | Yes | Unknown |
| [Mempool](https://mempool.space/api) | Bitcoin API Service focusing on the transaction fee | No | Yes | No |
| [MercadoBitcoin](https://www.mercadobitcoin.com.br/api-doc/) | Brazilian Cryptocurrency Information | No | Yes | Unknown |
| [Messari](https://messari.io/api) | Provides API endpoints for thousands of crypto assets | No | Yes | Unknown |
| [Nexchange](https://nexchange2.docs.apiary.io/) | Automated cryptocurrency exchange service | No | No | Yes |
| [Nomics](https://nomics.com/docs/) | Historical and realtime cryptocurrency prices and market data | `apiKey` | Yes | Yes |
| [NovaDax](https://doc.novadax.com/en-US/#introduction) | NovaDAX API to access all market data, trading management endpoints | `apiKey` | Yes | Unknown |
| [OKEx](https://www.okex.com/docs/) | Cryptocurrency exchange based in Seychelles | `apiKey` | Yes | Unknown |
| [Poloniex](https://docs.poloniex.com) | US based digital asset exchange | `apiKey` | Yes | Unknown |
| [Solana JSON RPC](https://docs.solana.com/developing/clients/jsonrpc-api) | Provides various endpoints to interact with the Solana Blockchain | No | Yes | Unknown |
| [Technical Analysis](https://technical-analysis-api.com) | Cryptocurrency prices and technical analysis | `apiKey` | Yes | No |
| [VALR](https://docs.valr.com/) | Cryptocurrency Exchange based in South Africa | `apiKey` | Yes | Unknown |
| [WorldCoinIndex](https://www.worldcoinindex.com/apiservice) | Cryptocurrencies Prices | `apiKey` | Yes | Unknown |
| [ZMOK](https://zmok.io) | Ethereum JSON RPC API and Web3 provider | No | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Currency Exchange
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Currencylayer](https://currencylayer.com?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Exchange rates and currency conversion | `apiKey` | Yes | Unknown |
| [Exchangerate.host](https://exchangerate.host?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Free foreign exchange & crypto rates API | No | Yes | Unknown |
| [Exchangeratesapi.io](https://exchangeratesapi.io?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Exchange rates with currency conversion | `apiKey` | Yes | Yes |
| [Fixer](https://fixer.io?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Exchange rates and currency conversion | `apiKey` | No | Unknown |
| [1Forge](https://1forge.com/forex-data-api/api-documentation) | Forex currency market data | `apiKey` | Yes | Unknown |
| [Amdoren](https://www.amdoren.com/currency-api/) | Free currency API with over 150 currencies | `apiKey` | Yes | Unknown |
| [Bank of Russia](https://www.cbr.ru/development/SXML/) | Exchange rates and currency conversion | No | Yes | Unknown |
| [Currency-api](https://github.com/fawazahmed0/currency-api#readme) | Free Currency Exchange Rates API with 150+ Currencies & No Rate Limits | No | Yes | Yes |
| [CurrencyFreaks](https://currencyfreaks.com/) | Provides current and historical currency exchange rates with free plan 1K requests/month | `apiKey` | Yes | Yes |
| [CurrencyScoop](https://currencyscoop.com/api-documentation) | Real-time and historical currency rates JSON API | `apiKey` | Yes | Yes |
| [Czech National Bank](https://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.xml) | A collection of exchange rates | No | Yes | Unknown |
| [Economia.Awesome](https://docs.awesomeapi.com.br/api-de-moedas) | Portuguese free currency prices and conversion with no rate limits | No | Yes | Unknown |
| [ExchangeRate-API](https://www.exchangerate-api.com) | Free currency conversion | `apiKey` | Yes | Yes |
| [Frankfurter](https://www.frankfurter.app/docs) | Exchange rates, currency conversion and time series | No | Yes | Yes |
| [FreeForexAPI](https://freeforexapi.com/Home/Api) | Real-time foreign exchange rates for major currency pairs | No | Yes | No |
| [National Bank of Poland](http://api.nbp.pl/en.html) | A collection of currency exchange rates (data in XML and JSON) | No | Yes | Yes |
| [VATComply.com](https://www.vatcomply.com/documentation) | Exchange rates, geolocation and VAT number validation | No | Yes | Yes |

**[⬆ Back to Index](#index)**
<br >
<br >
### Data Validation
API | Description | Auth | HTTPS | CORS |
|---|:---|:---|:---|:---|
| [VATlayer](https://vatlayer.com/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | VAT number validation | `apiKey` | Yes | Unknown | |
| [Lob.com](https://lob.com/) | US Address Verification | `apiKey` | Yes | Unknown | |
| [Postman Echo](https://www.postman-echo.com) | Test api server to receive and return value from HTTP method | No | Yes | Unknown | |
| [PurgoMalum](http://www.purgomalum.com) | Content validator against profanity & obscenity | No | No | Unknown | |
| [US Autocomplete](https://www.smarty.com/docs/cloud/us-autocomplete-pro-api) | Enter address data quickly with real-time address suggestions | `apiKey` | Yes | Yes | |
| [US Extract](https://www.smarty.com/products/apis/us-extract-api) | Extract postal addresses from any text including emails | `apiKey` | Yes | Yes | |
| [US Street Address](https://www.smarty.com/docs/cloud/us-street-api) | Validate and append data for any US postal address | `apiKey` | Yes | Yes | |

**[⬆ Back to Index](#index)**
<br >
<br >
### Development
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Userstack](https://userstack.com/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Secure User-Agent String Lookup JSON API | `OAuth` | Yes | Unknown |
| [24 Pull Requests](https://24pullrequests.com/api) | Project to promote open source collaboration during December | No | Yes | Yes |
| [Agify.io](https://agify.io) | Estimates the age from a first name | No | Yes | Yes |
| [API Grátis](https://apigratis.com.br/) | Multiples services and public APIs | No | Yes | Unknown |
| [ApicAgent](https://www.apicagent.com) | Extract device details from user-agent string | No | Yes | Yes |
| [ApiFlash](https://apiflash.com/) | Chrome based screenshot API for developers | `apiKey` | Yes | Unknown |
| [APIs.guru](https://apis.guru/api-doc/) | Wikipedia for Web APIs, OpenAPI/Swagger specs for public APIs | No | Yes | Unknown |
| [Azure DevOps](https://docs.microsoft.com/en-us/rest/api/azure/devops) | The Azure DevOps basic components of a REST API request/response pair | `apiKey` | Yes | Unknown |
| [Base](https://www.base-api.io/) | Building quick backends | `apiKey` | Yes | Yes |
| [Beeceptor](https://beeceptor.com/) | Build a mock Rest API endpoint in seconds | No | Yes | Yes |
| [Bitbucket](https://developer.atlassian.com/bitbucket/api/2/reference/) | Bitbucket API | `OAuth` | Yes | Unknown |
| [Blague.xyz](https://blague.xyz/) | La plus grande API de Blagues FR/The biggest FR jokes API | `apiKey` | Yes | Yes |
| [Blitapp](https://blitapp.com/api/) | Schedule screenshots of web pages and sync them to your cloud | `apiKey` | Yes | Unknown |
| [Blynk-Cloud](https://blynkapi.docs.apiary.io/#) | Control IoT Devices from Blynk IoT Cloud | `apiKey` | No | Unknown |
| [Bored](https://www.boredapi.com/) | Find random activities to fight boredom | No | Yes | Unknown |
| [Brainshop.ai](https://brainshop.ai/) | Make A Free A.I Brain | `apiKey` | Yes | Yes |
| [Browshot](https://browshot.com/api/documentation) | Easily make screenshots of web pages in any screen size, as any device | `apiKey` | Yes | Yes |
| [CDNJS](https://api.cdnjs.com/libraries/jquery) | Library info on CDNJS | No | Yes | Unknown |
| [Changelogs.md](https://changelogs.md) | Structured changelog metadata from open source projects | No | Yes | Unknown |
| [Ciprand](https://github.com/polarspetroll/ciprand) | Secure random string generator | No | Yes | No |
| [Cloudflare Trace](https://github.com/fawazahmed0/cloudflare-trace-api) | Get IP Address, Timestamp, User Agent, Country Code, IATA, HTTP Version, TLS/SSL Version & More | No | Yes | Yes |
| [Codex](https://github.com/Jaagrav/CodeX) | Online Compiler for Various Languages | No | Yes | Unknown |
| [Contentful Images](https://www.contentful.com/developers/docs/references/images-api/) | Used to retrieve and apply transformations to images | `apiKey` | Yes | Yes |
| [CORS Proxy](https://github.com/burhanuday/cors-proxy) | Get around the dreaded CORS error by using this proxy as a middle man | No | Yes | Yes |
| [CountAPI](https://countapi.xyz) | Free and simple counting service. You can use it to track page hits and specific events | No | Yes | Yes |
| [Databricks](https://docs.databricks.com/dev-tools/api/latest/index.html) | Service to manage your databricks account,clusters, notebooks, jobs and workspaces | `apiKey` | Yes | Yes |
| [DigitalOcean Status](https://status.digitalocean.com/api) | Status of all DigitalOcean services | No | Yes | Unknown |
| [Docker Hub](https://docs.docker.com/docker-hub/api/latest/) | Interact with Docker Hub | `apiKey` | Yes | Yes |
| [DomainDb Info](https://api.domainsdb.info/) | Domain name search to find all domains containing particular words/phrases/etc | No | Yes | Unknown |
| [ExtendsClass JSON Storage](https://extendsclass.com/json-storage.html) | A simple JSON store API | No | Yes | Yes |
| [GeekFlare](https://apidocs.geekflare.com/docs/geekflare-api) | Provide numerous capabilities for important testing and monitoring methods for websites | `apiKey` | Yes | Unknown |
| [Genderize.io](https://genderize.io) | Estimates a gender from a first name | No | Yes | Yes |
| [GETPing](https://www.getping.info) | Trigger an email notification with a simple GET request | `apiKey` | Yes | Unknown |
| [Ghost](https://ghost.org/) | Get Published content into your Website, App or other embedded media | `apiKey` | Yes | Yes |
| [GitHub](https://docs.github.com/en/free-pro-team@latest/rest) | Make use of GitHub repositories, code and user info programmatically | `OAuth` | Yes | Yes |
| [Gitlab](https://docs.gitlab.com/ee/api/) | Automate GitLab interaction programmatically | `OAuth` | Yes | Unknown |
| [Gitter](https://developer.gitter.im/docs/welcome) | Chat for Developers | `OAuth` | Yes | Unknown |
| [Glitterly](https://developers.glitterly.app) | Image generation API | `apiKey` | Yes | Yes |
| [Google Docs](https://developers.google.com/docs/api/reference/rest) | API to read, write, and format Google Docs documents | `OAuth` | Yes | Unknown |
| [Google Firebase](https://firebase.google.com/docs) | Google's mobile application development platform that helps build, improve, and grow app | `apiKey` | Yes | Yes |
| [Google Fonts](https://developers.google.com/fonts/docs/developer_api) | Metadata for all families served by Google Fonts | `apiKey` | Yes | Unknown |
| [Google Keep](https://developers.google.com/keep/api/reference/rest) | API to read, write, and format Google Keep notes | `OAuth` | Yes | Unknown |
| [Google Sheets](https://developers.google.com/sheets/api/reference/rest) | API to read, write, and format Google Sheets data | `OAuth` | Yes | Unknown |
| [Google Slides](https://developers.google.com/slides/api/reference/rest) | API to read, write, and format Google Slides presentations | `OAuth` | Yes | Unknown |
| [Gorest](https://gorest.co.in/) | Online REST API for Testing and Prototyping | `OAuth` | Yes | Unknown |
| [Hasura](https://hasura.io/opensource/) | GraphQL and REST API Engine with built in Authorization | `apiKey` | Yes | Yes |
| [Heroku](https://devcenter.heroku.com/articles/platform-api-reference/) | REST API to programmatically create apps, provision add-ons and perform other task on Heroku | `OAuth` | Yes | Yes |
| [host-t.com](https://host-t.com) | Basic DNS query via HTTP GET request | No | Yes | No |
| [Host.io](https://host.io) | Domains Data API for Developers | `apiKey` | Yes | Yes |
| [HTTP2.Pro](https://http2.pro/doc/api) | Test endpoints for client and server HTTP/2 protocol support | No | Yes | Unknown |
| [Httpbin](https://httpbin.org/) | A Simple HTTP Request & Response Service | No | Yes | Yes |
| [Httpbin Cloudflare](https://cloudflare-quic.com/b/) | A Simple HTTP Request & Response Service with HTTP/3 Support by Cloudflare | No | Yes | Yes |
| [Hunter](https://hunter.io/api) | API for domain search, professional email finder, author finder and email verifier | `apiKey` | Yes | Unknown |
| [IBM Text to Speech](https://cloud.ibm.com/docs/text-to-speech/getting-started.html) | Convert text to speech | `apiKey` | Yes | Yes |
| [Icanhazepoch](https://icanhazepoch.com) | Get Epoch time | No | Yes | Yes |
| [Icanhazip](https://major.io/icanhazip-com-faq/) | IP Address API | No | Yes | Yes |
| [IFTTT](https://platform.ifttt.com/docs/connect_api) | IFTTT Connect API | No | Yes | Unknown |
| [Image-Charts](https://documentation.image-charts.com/) | Generate charts, QR codes and graph images | No | Yes | Yes |
| [import.io](http://api.docs.import.io/) | Retrieve structured data from a website or RSS feed | `apiKey` | Yes | Unknown |
| [ip-fast.com](https://ip-fast.com/docs/) | IP address, country and city | No | Yes | Yes |
| [IP2WHOIS Information Lookup](https://www.ip2whois.com/) | WHOIS domain name lookup | `apiKey` | Yes | Unknown |
| [ipfind.io](https://ipfind.io) | Geographic location of an IP address or any domain name along with some other useful information | `apiKey` | Yes | Yes |
| [IPify](https://www.ipify.org/) | A simple IP Address API | No | Yes | Unknown |
| [IPinfo](https://ipinfo.io/developers) | Another simple IP Address API | No | Yes | Unknown |
| [jsDelivr](https://github.com/jsdelivr/data.jsdelivr.com) | Package info and download stats on jsDelivr CDN | No | Yes | Yes |
| [JSON 2 JSONP](https://json2jsonp.com/) | Convert JSON to JSONP (on-the-fly) for easy cross-domain data requests using client-side JavaScript | No | Yes | Unknown |
| [JSONbin.io](https://jsonbin.io) | Free JSON storage service. Ideal for small scale Web apps, Websites and Mobile apps | `apiKey` | Yes | Yes |
| [Kroki](https://kroki.io) | Creates diagrams from textual descriptions | No | Yes | Yes |
| [License-API](https://github.com/cmccandless/license-api/blob/master/README.md) | Unofficial REST API for choosealicense.com | No | Yes | No |
| [Logs.to](https://logs.to/) | Generate logs | `apiKey` | Yes | Unknown |
| [Lua Decompiler](https://lua-decompiler.ferib.dev/) | Online Lua 5.1 Decompiler | No | Yes | Yes |
| [MAC address vendor lookup](https://macaddress.io/api) | Retrieve vendor details and other information regarding a given MAC address or an OUI | `apiKey` | Yes | Yes |
| [Micro DB](https://m3o.com/db) | Simple database service | `apiKey` | Yes | Unknown |
| [MicroENV](https://microenv.com/) | Fake Rest API for developers | No | Yes | Unknown |
| [Mocky](https://designer.mocky.io/) | Mock user defined test JSON for REST API endpoints | No | Yes | Yes |
| [MY IP](https://www.myip.com/api-docs/) | Get IP address information | No | Yes | Unknown |
| [Nationalize.io](https://nationalize.io) | Estimate the nationality of a first name | No | Yes | Yes |
| [Netlify](https://docs.netlify.com/api/get-started/) | Netlify is a hosting service for the programmable web | `OAuth` | Yes | Unknown |
| [NetworkCalc](https://networkcalc.com/api/docs) | Network calculators, including subnets, DNS, binary, and security tools | No | Yes | Yes |
| [npm Registry](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md) | Query information about your favorite Node.js libraries programatically | No | Yes | Unknown |
| [OneSignal](https://documentation.onesignal.com/docs/onesignal-api) | Self-serve customer engagement solution for Push Notifications, Email, SMS & In-App | `apiKey` | Yes | Unknown |
| [Open Page Rank](https://www.domcop.com/openpagerank/) | API for calculating and comparing metrics of different websites using Page Rank algorithm | `apiKey` | Yes | Unknown |
| [OpenAPIHub](https://hub.openapihub.com/) | The All-in-one API Platform | `X-Mashape-Key` | Yes | Unknown |
| [OpenGraphr](https://opengraphr.com/docs/1.0/overview) | Really simple API to retrieve Open Graph data from an URL | `apiKey` | Yes | Unknown |
| [oyyi](https://oyyi.xyz/docs/1.0) | API for Fake Data, image/video conversion, optimization, pdf optimization and thumbnail generation | No | Yes | Yes |
| [PageCDN](https://pagecdn.com/docs/public-api) | Public API for javascript, css and font libraries on PageCDN | `apiKey` | Yes | Yes |
| [Postman](https://www.postman.com/postman/workspace/postman-public-workspace/documentation/12959542-c8142d51-e97c-46b6-bd77-52bb66712c9a) | Tool for testing APIs | `apiKey` | Yes | Unknown |
| [ProxyCrawl](https://proxycrawl.com) | Scraping and crawling anticaptcha service | `apiKey` | Yes | Unknown |
| [ProxyKingdom](https://proxykingdom.com) | Rotating Proxy API that produces a working proxy on every request | `apiKey` | Yes | Yes |
| [Pusher Beams](https://pusher.com/beams) | Push notifications for Android & iOS | `apiKey` | Yes | Unknown |
| [QR code](https://www.qrtag.net/api/) | Create an easy to read QR code and URL shortener | No | Yes | Yes |
| [QR code](http://goqr.me/api/) | Generate and decode / read QR code graphics | No | Yes | Unknown |
| [Qrcode Monkey](https://www.qrcode-monkey.com/qr-code-api-with-logo/) | Integrate custom and unique looking QR codes into your system or workflow | No | Yes | Unknown |
| [QuickChart](https://quickchart.io/) | Generate chart and graph images | No | Yes | Yes |
| [Random Stuff](https://api-docs.pgamerx.com/) | Can be used to get AI Response, jokes, memes, and much more at lightning-fast speed | `apiKey` | Yes | Yes |
| [Rejax](https://rejax.io/) | Reverse AJAX service to notify clients | `apiKey` | Yes | No |
| [ReqRes](https://reqres.in/ ) | A hosted REST-API ready to respond to your AJAX requests | No | Yes | Unknown |
| [RSS feed to JSON](https://rss-to-json-serverless-api.vercel.app) | Returns RSS feed in JSON format using feed URL | No | Yes | Yes |
| [SavePage.io](https://www.savepage.io) | A free, RESTful API used to screenshot any desktop, or mobile website | `apiKey` | Yes | Yes |
| [ScrapeNinja](https://scrapeninja.net) | Scraping API with Chrome fingerprint and residential proxies | `apiKey` | Yes | Unknown |
| [ScraperApi](https://www.scraperapi.com) | Easily build scalable web scrapers | `apiKey` | Yes | Unknown |
| [scraperBox](https://scraperbox.com/) | Undetectable web scraping API | `apiKey` | Yes | Yes |
| [scrapestack](https://scrapestack.com/) | Real-time, Scalable Proxy & Web Scraping REST API | `apiKey` | Yes | Unknown |
| [ScrapingAnt](https://scrapingant.com) | Headless Chrome scraping with a simple API | `apiKey` | Yes | Unknown |
| [ScrapingDog](https://www.scrapingdog.com/) | Proxy API for Web scraping | `apiKey` | Yes | Unknown |
| [Screenshot](https://www.abstractapi.com/website-screenshot-api) | Take programmatic screenshots of web pages from any website | `apiKey` | Yes | Yes |
| [ScreenshotAPI.net](https://screenshotapi.net/) | Create pixel-perfect website screenshots | `apiKey` | Yes | Yes |
| [Serialif Color](https://color.serialif.com/) | Color conversion, complementary, grayscale and contrasted text | No | Yes | No |
| [serpstack](https://serpstack.com/) | Real-Time & Accurate Google Search Results API | `apiKey` | Yes | Yes |
| [Sheetsu](https://sheetsu.com/) | Easy google sheets integration | `apiKey` | Yes | Unknown |
| [SHOUTCLOUD](http://shoutcloud.io/) | ALL-CAPS AS A SERVICE | No | No | Unknown |
| [Sonar](https://github.com/Cgboal/SonarSearch) | Project Sonar DNS Enumeration API | No | Yes | Yes |
| [SonarQube](https://sonarcloud.io/web_api) | SonarQube REST APIs to detect bugs, code smells & security vulnerabilities | `OAuth` | Yes | Unknown |
| [StackExchange](https://api.stackexchange.com/) | Q&A forum for developers | `OAuth` | Yes | Unknown |
| [Statically](https://statically.io/) | A free CDN for developers | No | Yes | Yes |
| [Supportivekoala](https://developers.supportivekoala.com/) | Autogenerate images with template | `apiKey` | Yes | Yes |
| [Tyk](https://tyk.io/open-source/) | Api and service management platform | `apiKey` | Yes | Yes |
| [Wandbox](https://github.com/melpon/wandbox/blob/master/kennel2/API.rst) | Code compiler supporting 35+ languages mentioned at wandbox.org | No | Yes | Unknown |
| [WebScraping.AI](https://webscraping.ai/) | Web Scraping API with built-in proxies and JS rendering | `apiKey` | Yes | Yes |
| [ZenRows](https://www.zenrows.com/) | Web Scraping API that bypasses anti-bot solutions while offering JS rendering, and rotating proxies | `apiKey` | Yes | Unknown |


**[⬆ Back to Index](#index)**
<br >
<br >
### Dictionaries
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Chinese Character Web](http://ccdb.hemiola.com/) | Chinese character definitions and pronunciations | No | No | No |
| [Chinese Text Project](https://ctext.org/tools/api) | Online open-access digital library for pre-modern Chinese texts | No | Yes | Unknown |
| [Collins](https://api.collinsdictionary.com/api/v1/documentation/html/) | Bilingual Dictionary and Thesaurus Data | `apiKey` | Yes | Unknown |
| [Free Dictionary](https://dictionaryapi.dev/) | Definitions, phonetics, pronounciations, parts of speech, examples, synonyms | No | Yes | Unknown |
| [Indonesia Dictionary](https://new-kbbi-api.herokuapp.com/) | Indonesia dictionary many words | No | Yes | Unknown |
| [Lingua Robot](https://www.linguarobot.io) | Word definitions, pronunciations, synonyms, antonyms and others | `apiKey` | Yes | Yes |
| [Merriam-Webster](https://dictionaryapi.com/) | Dictionary and Thesaurus Data | `apiKey` | Yes | Unknown |
| [OwlBot](https://owlbot.info/) | Definitions with example sentence and photo if available | `apiKey` | Yes | Yes |
| [Oxford](https://developer.oxforddictionaries.com/) | Dictionary Data | `apiKey` | Yes | No |
| [Synonyms](https://www.synonyms.com/synonyms_api.php) | Synonyms, thesaurus and antonyms information for any given word | `apiKey` | Yes | Unknown |
| [Wiktionary](https://en.wiktionary.org/w/api.php) | Collaborative dictionary data | No | Yes | Yes |
| [Wordnik](https://developer.wordnik.com) | Dictionary Data | `apiKey` | Yes | Unknown |
| [Words](https://www.wordsapi.com/docs/) | Definitions and synonyms for more than 150,000 words | `apiKey` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Documents & Productivity
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Airtable](https://airtable.com/api) | Integrate with Airtable | `apiKey` | Yes | Unknown |
| [Api2Convert](https://www.api2convert.com/) | Online File Conversion API | `apiKey` | Yes | Unknown |
| [apilayer pdflayer](https://pdflayer.com) | HTML/URL to PDF | `apiKey` | Yes | Unknown |
| [Asana](https://developers.asana.com/docs) | Programmatic access to all data in your asana system | `apiKey` | Yes | Yes |
| [ClickUp](https://clickup.com/api) | ClickUp is a robust, cloud-based project management tool for boosting productivity | `OAuth` | Yes | Unknown |
| [Clockify](https://clockify.me/developers-api ) | Clockify's REST-based API can be used to push/pull data to/from it & integrate it with other systems | `apiKey` | Yes | Unknown |
| [CloudConvert](https://cloudconvert.com/api/v2) | Online file converter for audio, video, document, ebook, archive, image, spreadsheet, presentation | `apiKey` | Yes | Unknown |
| [Cloudmersive Document and Data Conversion](https://cloudmersive.com/convert-api) | HTML/URL to PDF/PNG, Office documents to PDF, image conversion | `apiKey` | Yes | Yes |
| [Code::Stats](https://codestats.net/api-docs) | Automatic time tracking for programmers | `apiKey` | Yes | No |
| [CraftMyPDF](https://craftmypdf.com) | Generate PDF documents from templates with a drop-and-drop editor and a simple API | `apiKey` | Yes | No |
| [Flowdash](https://docs.flowdash.com/docs/api-introduction) | Automate business workflows | `apiKey` | Yes | Unknown |
| [Html2PDF](https://html2pdf.app/) | HTML/URL to PDF | `apiKey` | Yes | Unknown |
| [iLovePDF](https://developer.ilovepdf.com/) | Convert, merge, split, extract text and add page numbers for PDFs. Free for 250 documents/month | `apiKey` | Yes | Yes |
| [JIRA](https://developer.atlassian.com/server/jira/platform/rest-apis/) | JIRA is a proprietary issue tracking product that allows bug tracking and agile project management | `OAuth` | Yes | Unknown |
| [Mattermost](https://api.mattermost.com/) | An open source platform for developer collaboration | `OAuth` | Yes | Unknown |
| [Mercury](https://mercury.postlight.com/web-parser/) | Web parser | `apiKey` | Yes | Unknown |
| [Monday](https://api.developer.monday.com/docs) | Programmatically access and update data inside a monday.com account | `apiKey` | Yes | Unknown |
| [Notion](https://developers.notion.com/docs/getting-started) | Integrate with Notion | `OAuth` | Yes | Unknown |
| [PandaDoc](https://developers.pandadoc.com) | DocGen and eSignatures API | `apiKey` | Yes | No |
| [Pocket](https://getpocket.com/developer/) | Bookmarking service | `OAuth` | Yes | Unknown |
| [Podio](https://developers.podio.com) | File sharing and productivity | `OAuth` | Yes | Unknown |
| [PrexView](https://prexview.com) | Data from XML or JSON to PDF, HTML or Image | `apiKey` | Yes | Unknown |
| [Restpack](https://restpack.io/) | Provides screenshot, HTML to PDF and content extraction APIs | `apiKey` | Yes | Unknown |
| [Todoist](https://developer.todoist.com) | Todo Lists | `OAuth` | Yes | Unknown |
| [Smart Image Enhancement API](https://apilayer.com/marketplace/image_enhancement-api) | Performs image upscaling by adding detail to images through multiple super-resolution algorithms | `apiKey` | Yes | Unknown |
| [Vector Express v2.0](https://vector.express) | Free vector file converting API | No | Yes | No |
| [WakaTime](https://wakatime.com/developers) | Automated time tracking leaderboards for programmers | No | Yes | Unknown |
| [Zube](https://zube.io/docs/api) | Full stack project management | `OAuth` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Email
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [mailboxlayer](https://mailboxlayer.com?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Email address validation | `apiKey` | Yes | Unknown |
| [Cloudmersive Validate](https://cloudmersive.com/validate-api) | Validate email addresses, phone numbers, VAT numbers and domain names | `apiKey` | Yes | Yes |
| [Disify](https://www.disify.com/) | Validate and detect disposable and temporary email addresses | No | Yes | Yes |
| [DropMail](https://dropmail.me/api/#live-demo) | GraphQL API for creating and managing ephemeral e-mail inboxes | No | Yes | Unknown |
| [Email Validation](https://www.abstractapi.com/email-verification-validation-api) | Validate email addresses for deliverability and spam | `apiKey` | Yes | Yes |
| [EVA](https://eva.pingutil.com/) | Validate email addresses | No | Yes | Yes |
| [Guerrilla Mail](https://www.guerrillamail.com/GuerrillaMailAPI.html) | Disposable temporary Email addresses | No | Yes | Unknown |
| [ImprovMX](https://improvmx.com/api) | API for free email forwarding service | `apiKey` | Yes | Unknown |
| [Kickbox](https://open.kickbox.com/) | Email verification API | No | Yes | Yes |
| [mail.gw](https://docs.mail.gw) | 10 Minute Mail | No | Yes | Yes |
| [mail.tm](https://docs.mail.tm) | Temporary Email Service | No | Yes | Yes |
| [MailboxValidator](https://www.mailboxvalidator.com/api-email-free) | Validate email address to improve deliverability | `apiKey` | Yes | Unknown |
| [MailCheck.ai](https://www.mailcheck.ai/#documentation) | Prevent users to sign up with temporary email addresses | No | Yes | Unknown |
| [Mailtrap](https://mailtrap.docs.apiary.io/#) | A service for the safe testing of emails sent from the development and staging environments | `apiKey` | Yes | Unknown |
| [Sendgrid](https://docs.sendgrid.com/api-reference/) | A cloud-based SMTP provider that allows you to send emails without having to maintain email servers | `apiKey` | Yes | Unknown |
| [Sendinblue](https://developers.sendinblue.com/docs) | A service that provides solutions relating to marketing and/or transactional email and/or SMS | `apiKey` | Yes | Unknown |
| [Verifier](https://verifier.meetchopra.com/docs#/) | Verifies that a given email is real | `apiKey` | Yes | Yes |

**[⬆ Back to Index](#index)**
<br >
<br >
### Entertainment
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [chucknorris.io](https://api.chucknorris.io) | JSON API for hand curated Chuck Norris jokes | No | Yes | Unknown |
| [Corporate Buzz Words](https://github.com/sameerkumar18/corporate-bs-generator-api) | REST API for Corporate Buzz Words | No | Yes | Yes |
| [Excuser](https://excuser.herokuapp.com/) | Get random excuses for various situations | No | Yes | Unknown |
| [Fun Fact](https://api.aakhilv.me) | A simple HTTPS api that can randomly select and return a fact from the FFA database | No | Yes | Yes |
| [Imgflip](https://imgflip.com/api) | Gets an array of popular memes | No | Yes | Unknown |
| [Meme Maker](https://mememaker.github.io/API/) | REST API for create your own meme | No | Yes | Unknown |
| [NaMoMemes](https://github.com/theIYD/NaMoMemes) | Memes on Narendra Modi | No | Yes | Unknown |
| [Random Useless Facts](https://uselessfacts.jsph.pl/) | Get useless, but true facts | No | Yes | Unknown |
| [Techy](https://techy-api.vercel.app/) | JSON and Plaintext API for tech-savvy sounding phrases | No | Yes | Unknown |
| [Yo Momma Jokes](https://github.com/beanboi7/yomomma-apiv2) | REST API for Yo Momma Jokes | No | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Environment
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [BreezoMeter Pollen](https://docs.breezometer.com/api-documentation/pollen-api/v2/) | Daily Forecast pollen conditions data for a specific location | `apiKey` | Yes | Unknown |
| [Carbon Interface](https://docs.carboninterface.com/) | API to calculate carbon (C02) emissions estimates for common C02 emitting activities | `apiKey` | Yes | Yes |
| [Climatiq](https://docs.climatiq.io) | Calculate the environmental footprint created by a broad range of emission-generating activities | `apiKey` | Yes | Yes |
| [Cloverly](https://www.cloverly.com/carbon-offset-documentation) | API calculates the impact of common carbon-intensive activities in real time | `apiKey` | Yes | Unknown |
| [CO2 Offset](https://co2offset.io/api.html) | API calculates and validates the carbon footprint | No | Yes | Unknown |
| [Danish data service Energi](https://www.energidataservice.dk/) | Open energy data from Energinet to society | No | Yes | Unknown |
| [GrünstromIndex](https://gruenstromindex.de/) | Green Power Index for Germany (Grünstromindex/GSI) | No | No | Yes |
| [IQAir](https://www.iqair.com/air-pollution-data-api) | Air quality and weather data | `apiKey` | Yes | Unknown |
| [Luchtmeetnet](https://api-docs.luchtmeetnet.nl/) | Predicted and actual air quality components for The Netherlands (RIVM) | No | Yes | Unknown |
| [National Grid ESO](https://data.nationalgrideso.com/) | Open data from Great Britain’s Electricity System Operator | No | Yes | Unknown |
| [OpenAQ](https://docs.openaq.org/) | Open air quality data | `apiKey` | Yes | Unknown |
| [PM2.5 Open Data Portal](https://pm25.lass-net.org/#apis) | Open low-cost PM2.5 sensor data | No | Yes | Unknown |
| [PM25.in](http://www.pm25.in/api_doc) | Air quality of China | `apiKey` | No | Unknown |
| [PVWatts](https://developer.nrel.gov/docs/solar/pvwatts/v6/) | Energy production photovoltaic (PV) energy systems | `apiKey` | Yes | Unknown |
| [Srp Energy](https://srpenergy-api-client-python.readthedocs.io/en/latest/api.html) | Hourly usage energy report for Srp customers | `apiKey` | Yes | No |
| [UK Carbon Intensity](https://carbon-intensity.github.io/api-definitions/#carbon-intensity-api-v1-0-0) | The Official Carbon Intensity API for Great Britain developed by National Grid | No | Yes | Unknown |
| [Website Carbon](https://api.websitecarbon.com/) | API to estimate the carbon footprint of loading web pages | No | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Events
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Eventbrite](https://www.eventbrite.com/platform/api/) | Find events | `OAuth` | Yes | Unknown |
| [SeatGeek](https://platform.seatgeek.com/) | Search events, venues and performers | `apiKey` | Yes | Unknown |
| [Ticketmaster](http://developer.ticketmaster.com/products-and-docs/apis/getting-started/) | Search events, attractions, or venues | `apiKey` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Finance
API | Description | Auth | HTTPS | CORS |
|---|:---|:---|:---|:---|
| [Marketstack](https://marketstack.com/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Real-Time, Intraday & Historical Market Data API | `apiKey` | Yes | Unknown | |
| [Aletheia](https://aletheiaapi.com/) | Insider trading data, earnings call analysis, financial statements, and more | `apiKey` | Yes | Yes | |
| [Alpaca](https://alpaca.markets/docs/api-documentation/api-v2/market-data/alpaca-data-api-v2/) | Realtime and historical market data on all US equities and ETFs | `apiKey` | Yes | Yes | |
| [Alpha Vantage](https://www.alphavantage.co/) | Realtime and historical stock data | `apiKey` | Yes | Unknown | |
| [Banco do Brasil](https://developers.bb.com.br/home) | All Banco do Brasil financial transaction APIs | `OAuth` | Yes | Yes | |
| [Bank Data API](https://apilayer.com/marketplace/bank_data-api) | Instant IBAN and SWIFT number validation across the globe | `apiKey` | Yes | Unknown | |
| [Billplz](https://www.billplz.com/api) | Payment platform | `apiKey` | Yes | Unknown | |
| [Binlist](https://binlist.net/) | Public access to a database of IIN/BIN information | No | Yes | Unknown | |
| [Boleto.Cloud](https://boleto.cloud/) | A api to generate boletos in Brazil | `apiKey` | Yes | Unknown | |
| [Citi](https://sandbox.developerhub.citi.com/api-catalog-list) | All Citigroup account and statement data APIs | `apiKey` | Yes | Unknown | |
| [Econdb](https://www.econdb.com/api/) | Global macroeconomic data | No | Yes | Yes | |
| [Fed Treasury](https://fiscaldata.treasury.gov/api-documentation/) | U.S. Department of the Treasury Data | No | Yes | Unknown | |
| [Finage](https://finage.co.uk) | Finage is a stock, currency, cryptocurrency, indices, and ETFs real-time & historical data provider | `apiKey` | Yes | Unknown | |
| [Financial Modeling Prep](https://site.financialmodelingprep.com/developer/docs) | Realtime and historical stock data | `apiKey` | Yes | Unknown | |
| [Finnhub](https://finnhub.io/docs/api) | Real-Time RESTful APIs and Websocket for Stocks, Currencies, and Crypto | `apiKey` | Yes | Unknown | |
| [FRED](https://fred.stlouisfed.org/docs/api/fred/) | Economic data from the Federal Reserve Bank of St. Louis | `apiKey` | Yes | Yes | |
| [Front Accounting APIs](https://frontaccounting.com/fawiki/index.php?n=Devel.SimpleAPIModule) | Front accounting is multilingual and multicurrency software for small businesses | `OAuth` | Yes | Yes | |
| [Hotstoks](https://hotstoks.com?utm_source=public-apis) | Stock market data powered by SQL | `apiKey` | Yes | Yes | |
| [IEX Cloud](https://iexcloud.io/docs/api/) | Realtime & Historical Stock and Market Data | `apiKey` | Yes | Yes | |
| [IG](https://labs.ig.com/gettingstarted) | Spreadbetting and CFD Market Data | `apiKey` | Yes | Unknown | |
| [Indian Mutual Fund](https://www.mfapi.in/) | Get complete history of India Mutual Funds Data | No | Yes | Unknown | |
| [Intrinio](https://intrinio.com/) | A wide selection of financial data feeds | `apiKey` | Yes | Unknown | |
| [Klarna](https://docs.klarna.com/klarna-payments/api/payments-api/) | Klarna payment and shopping service | `apiKey` | Yes | Unknown | |
| [MercadoPago](https://www.mercadopago.com.br/developers/es/reference) | Mercado Pago API reference - all the information you need to develop your integrations | `apiKey` | Yes | Unknown | |
| [Mono](https://mono.co/) | Connect with users’ bank accounts and access transaction data in Africa | `apiKey` | Yes | Unknown | |
| [Moov](https://docs.moov.io/api/) | The Moov API makes it simple for platforms to send, receive, and store money | `apiKey` | Yes | Unknown | |
| [Nordigen](https://nordigen.com/en/account_information_documenation/integration/quickstart_guide/) | Connect to bank accounts using official bank APIs and get raw transaction data | `apiKey` | Yes | Unknown | |
| [OpenFIGI](https://www.openfigi.com/api) | Equity, index, futures, options symbology from Bloomberg LP | `apiKey` | Yes | Yes | |
| [Plaid](https://www.plaid.com/docs) | Connect with user's bank accounts and access transaction data	 | `apiKey` | YES | |  |
| [Polygon](https://polygon.io/) | Historical stock market data | `apiKey` | Yes | Unknown | |
| [Portfolio Optimizer](https://portfoliooptimizer.io/) | Portfolio analysis and optimization | No | Yes | Yes | |
| [Razorpay IFSC](https://razorpay.com/docs/) | Indian Financial Systems Code (Bank Branch Codes) | No | Yes | Unknown | |
| [Real Time Finance](https://github.com/Real-time-finance/finance-websocket-API/) | Websocket API to access realtime stock data | `apiKey` | No | Unknown | |
| [SEC EDGAR Data](https://www.sec.gov/edgar/sec-api-documentation) | API to access annual reports of public US companies | No | Yes | Yes | |
| [SmartAPI](https://smartapi.angelbroking.com/) | Gain access to set of <SmartAPI> and create end-to-end broking services | `apiKey` | Yes | Unknown | |
| [StockData](https://www.StockData.org) | Real-Time, Intraday & Historical Market Data, News and Sentiment API | `apiKey` | Yes | Yes | |
| [Styvio](https://www.Styvio.com) | Realtime and historical stock data and current stock sentiment | `apiKey` | Yes | Unknown | |
| [Tax Data API](https://apilayer.com/marketplace/tax_data-api) | Instant VAT number and tax validation across the globe | `apiKey` | Yes | Unkown | |
| [Tradier](https://developer.tradier.com) | US equity/option market data (delayed, intraday, historical) | `OAuth` | Yes | Yes | |
| [Twelve Data](https://twelvedata.com/) | Stock market data (real-time & historical) | `apiKey` | Yes | Unknown | |
| [VAT Validation](https://www.abstractapi.com/vat-validation-rates-api) | Validate VAT numbers and calculate VAT rates | `apiKey` | Yes | Yes | |
| [WallstreetBets](https://dashboard.nbshare.io/apps/reddit/api/) | WallstreetBets Stock Comments Sentiment Analysis | No | Yes | Unknown | |
| [Yahoo Finance](https://www.yahoofinanceapi.com/) | Real time low latency Yahoo Finance API for stock market, crypto currencies, and currency exchange | `apiKey` | Yes | Yes | |
| [YNAB](https://api.youneedabudget.com/) | Budgeting & Planning | `OAuth` | Yes | Yes | |
| [Zoho Books](https://www.zoho.com/books/api/v3/) | Online accounting software, built for your business | `OAuth` | Yes | Unknown | |

**[⬆ Back to Index](#index)**
<br >
<br >
### Food & Drink
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [BaconMockup](https://baconmockup.com/) | Resizable bacon placeholder images | No | Yes | Yes |
| [Chomp](https://chompthis.com/api/) | Data about various grocery products and foods | `apiKey` | Yes | Unknown |
| [Coffee](https://coffee.alexflipnote.dev/) | Random pictures of coffee | No | Yes | Unknown |
| [Edamam nutrition](https://developer.edamam.com/edamam-docs-nutrition-api) | Nutrition Analysis | `apiKey` | Yes | Unknown |
| [Edamam recipes](https://developer.edamam.com/edamam-docs-recipe-api) | Recipe Search | `apiKey` | Yes | Unknown |
| [Foodish](https://github.com/surhud004/Foodish#readme) | Random pictures of food dishes | No | Yes | Yes |
| [Fruityvice](https://www.fruityvice.com) | Data about all kinds of fruit | No | Yes | Unknown |
| [Kroger](https://developer.kroger.com/reference) | Supermarket Data | `apiKey` | Yes | Unknown |
| [LCBO](https://lcboapi.com/) | Alcohol | `apiKey` | Yes | Unknown |
| [Open Brewery DB](https://www.openbrewerydb.org) | Breweries, Cideries and Craft Beer Bottle Shops | No | Yes | Yes |
| [Open Food Facts](https://world.openfoodfacts.org/data) | Food Products Database | No | Yes | Unknown |
| [PunkAPI](https://punkapi.com/) | Brewdog Beer Recipes | No | Yes | Unknown |
| [Rustybeer](https://rustybeer.herokuapp.com/) | Beer brewing tools | No | Yes | No |
| [Spoonacular](https://spoonacular.com/food-api) | Recipes, Food Products, and Meal Planning | `apiKey` | Yes | Unknown |
| [Systembolaget](https://api-portal.systembolaget.se) | Govornment owned liqour store in Sweden | `apiKey` | Yes | Unknown |
| [TacoFancy](https://github.com/evz/tacofancy-api) | Community-driven taco database | No | No | Unknown |
| [Tasty](https://rapidapi.com/apidojo/api/tasty/) | API to query data about recipe, plan, ingredients | `apiKey` | Yes | Unknown |
| [The Report of the Week](https://github.com/andyklimczak/TheReportOfTheWeek-API) | Food & Drink Reviews | No | Yes | Unknown |
| [TheCocktailDB](https://www.thecocktaildb.com/api.php) | Cocktail Recipes | `apiKey` | Yes | Yes |
| [TheMealDB](https://www.themealdb.com/api.php) | Meal Recipes | `apiKey` | Yes | Yes |
| [Untappd](https://untappd.com/api/docs) | Social beer sharing | `OAuth` | Yes | Unknown |
| [What's on the menu?](http://nypl.github.io/menus-api/) | NYPL human-transcribed historical menu collection | `apiKey` | No | Unknown |
| [WhiskyHunter](https://whiskyhunter.net/api/) | Past online whisky auctions statistical data | No | Yes | Unknown |
| [Zestful](https://zestfuldata.com/) | Parse recipe ingredients | `apiKey` | Yes | Yes |

**[⬆ Back to Index](#index)**
<br >
<br >
### Games & Comics
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Age of Empires II](https://age-of-empires-2-api.herokuapp.com) | Get information about Age of Empires II resources | No | Yes | No |
| [AmiiboAPI](https://amiiboapi.com/) | Nintendo Amiibo Information | No | Yes | Yes |
| [Animal Crossing: New Horizons](http://acnhapi.com/) | API for critters, fossils, art, music, furniture and villagers | No | Yes | Unknown |
| [Autochess VNG](https://github.com/didadadida93/autochess-vng-api) | Rest Api for Autochess VNG | No | Yes | Yes |
| [Barter.VG](https://github.com/bartervg/barter.vg/wiki) | Provides information about Game, DLC, Bundles, Giveaways, Trading | No | Yes | Yes |
| [Battle.net](https://develop.battle.net/documentation/guides/getting-started) | Diablo III, Hearthstone, StarCraft II and World of Warcraft game data APIs | `OAuth` | Yes | Yes |
| [Board Game Geek](https://boardgamegeek.com/wiki/page/BGG_XML_API2) | Board games, RPG and videogames | No | Yes | No |
| [Brawl Stars](https://developer.brawlstars.com) | Brawl Stars Game Information | `apiKey` | Yes | Unknown |
| [Bugsnax](https://www.bugsnaxapi.com/) | Get information about Bugsnax | No | Yes | Yes |
| [CheapShark](https://www.cheapshark.com/api) | Steam/PC Game Prices and Deals | No | Yes | Yes |
| [Chess.com](https://www.chess.com/news/view/published-data-api) | Chess.com read-only REST API | No | Yes | Unknown |
| [Chuck Norris Database](http://www.icndb.com/api/) | Jokes | No | No | Unknown |
| [Clash of Clans](https://developer.clashofclans.com) | Clash of Clans Game Information | `apiKey` | Yes | Unknown |
| [Clash Royale](https://developer.clashroyale.com) | Clash Royale Game Information | `apiKey` | Yes | Unknown |
| [Comic Vine](https://comicvine.gamespot.com/api/documentation) | Comics | No | Yes | Unknown |
| [Crafatar](https://crafatar.com) | API for Minecraft skins and faces | No | Yes | Yes |
| [Cross Universe](https://crossuniverse.psychpsyo.com/apiDocs.html) | Cross Universe Card Data | No | Yes | Yes |
| [Deck of Cards](http://deckofcardsapi.com/) | Deck of Cards | No | No | Unknown |
| [Destiny The Game](https://bungie-net.github.io/multi/index.html) | Bungie Platform API | `apiKey` | Yes | Unknown |
| [Digimon Information](https://digimon-api.vercel.app/) | Provides information about digimon creatures | No | Yes | Unknown |
| [Digimon TCG](https://documenter.getpostman.com/view/14059948/TzecB4fH) | Search for Digimon cards in digimoncard.io | No | Yes | Unknown |
| [Disney](https://disneyapi.dev) | Information of Disney characters | No | Yes | Yes |
| [Dota 2](https://docs.opendota.com/) | Provides information about Player stats , Match stats, Rankings for Dota 2 | `apiKey` | Yes | Unknown |
| [Dungeons and Dragons](https://www.dnd5eapi.co/docs/) | Reference for 5th edition spells, classes, monsters, and more | No | No | No |
| [Dungeons and Dragons (Alternate)](https://open5e.com/) | Includes all monsters and spells from the SRD (System Reference Document) as well as a search API | No | Yes | Yes |
| [Eve Online](https://esi.evetech.net/ui) | Third-Party Developer Documentation | `OAuth` | Yes | Unknown |
| [FFXIV Collect](https://ffxivcollect.com/) | Final Fantasy XIV data on collectables | No | Yes | Yes |
| [FIFA Ultimate Team](https://www.easports.com/fifa/ultimate-team/api/fut/item) | FIFA Ultimate Team items API | No | Yes | Unknown |
| [Final Fantasy XIV](https://xivapi.com/) | Final Fantasy XIV Game data API | No | Yes | Yes |
| [Fortnite](https://fortnitetracker.com/site-api) | Fortnite Stats | `apiKey` | Yes | Unknown |
| [Forza](https://docs.forza-api.tk) | Show random image of car from Forza | No | Yes | Unknown |
| [FreeToGame](https://www.freetogame.com/api-doc) | Free-To-Play Games Database | No | Yes | Yes |
| [Fun Facts](https://asli-fun-fact-api.herokuapp.com/) | Random Fun Facts | No | Yes | Yes |
| [FunTranslations](https://api.funtranslations.com/) | Translate Text into funny languages | No | Yes | Yes |
| [GamerPower](https://www.gamerpower.com/api-read) | Game Giveaways Tracker | No | Yes | Yes |
| [GDBrowser](https://gdbrowser.com/api) | Easy way to use the Geometry Dash Servers | No | Yes | Unknown |    
| [Geek-Jokes](https://github.com/sameerkumar18/geek-joke-api) | Fetch a random geeky/programming related joke for use in all sorts of applications | No | Yes | Yes |
| [Genshin Impact](https://genshin.dev) | Genshin Impact game data | No | Yes | Yes |
| [Giant Bomb](https://www.giantbomb.com/api/documentation) | Video Games | `apiKey` | Yes | Unknown |
| [GraphQL Pokemon](https://github.com/favware/graphql-pokemon) | GraphQL powered Pokemon API. Supports generations 1 through 8 | No | Yes | Yes |
| [Guild Wars 2](https://wiki.guildwars2.com/wiki/API:Main) | Guild Wars 2 Game Information | `apiKey` | Yes | Unknown |
| [GW2Spidy](https://github.com/rubensayshi/gw2spidy/wiki) | GW2Spidy API, Items data on the Guild Wars 2 Trade Market | No | Yes | Unknown |
| [Halo](https://developer.haloapi.com/) | Halo 5 and Halo Wars 2 Information | `apiKey` | Yes | Unknown |
| [Hearthstone](http://hearthstoneapi.com/) | Hearthstone Cards Information | `X-Mashape-Key` | Yes | Unknown |
| [Humble Bundle](https://rapidapi.com/Ziggoto/api/humble-bundle) | Humble Bundle's current bundles | `apiKey` | Yes | Unknown |
| [Humor](https://humorapi.com) | Humor, Jokes, and Memes | `apiKey` | Yes | Unknown |
| [Hypixel](https://api.hypixel.net/) | Hypixel player stats | `apiKey` | Yes | Unknown |
| [Hyrule Compendium](https://github.com/gadhagod/Hyrule-Compendium-API) | Data on all interactive items from The Legend of Zelda: BOTW | No | Yes | Unknown |
| [Hytale](https://hytale-api.com/) | Hytale blog posts and jobs | No | Yes | Unknown |
| [IGDB.com](https://api-docs.igdb.com) | Video Game Database | `apiKey` | Yes | Unknown |
| [JokeAPI](https://sv443.net/jokeapi/v2/) | Programming, Miscellaneous and Dark Jokes | No | Yes | Yes |
| [Jokes One](https://jokes.one/api/joke/) | Joke of the day and large category of jokes accessible via REST API | `apiKey` | Yes | Yes |
| [Jservice](http://jservice.io) | Jeopardy Question Database | No | No | Unknown |
| [Lichess](https://lichess.org/api) | Access to all data of users, games, puzzles and etc on Lichess | `OAuth` | Yes | Unknown |
| [Magic The Gathering](http://magicthegathering.io/) | Magic The Gathering Game Information | No | No | Unknown |
| [Mario Kart Tour](https://mario-kart-tour-api.herokuapp.com/) | API for Drivers, Karts, Gliders and Courses | `OAuth` | Yes | Unknown |
| [Marvel](https://developer.marvel.com) | Marvel Comics | `apiKey` | Yes | Unknown |
| [Minecraft Server Status](https://api.mcsrvstat.us) | API to get Information about a Minecraft Server | No | Yes | No |    
| [MMO Games](https://www.mmobomb.com/api) | MMO Games Database, News and Giveaways | No | Yes | No |
| [mod.io](https://docs.mod.io) | Cross Platform Mod API | `apiKey` | Yes | Unknown |
| [Mojang](https://wiki.vg/Mojang_API) | Mojang / Minecraft API | `apiKey` | Yes | Unknown |
| [Monster Hunter World](https://docs.mhw-db.com/) | Monster Hunter World data | No | Yes | Yes |
| [Open Trivia](https://opentdb.com/api_config.php) | Trivia Questions | No | Yes | Unknown |
| [PandaScore](https://developers.pandascore.co/) | E-sports games and results | `apiKey` | Yes | Unknown |
| [Path of Exile](https://www.pathofexile.com/developer/docs) | Path of Exile Game Information | `OAuth` | Yes | Unknown |
| [PlayerDB](https://playerdb.co/) | Query Minecraft, Steam and XBox Accounts | No | Yes | Unknown |
| [Pokéapi](https://pokeapi.co) | Pokémon Information | No | Yes | Unknown |
| [PokéAPI (GraphQL)](https://github.com/mazipan/graphql-pokeapi) | The Unofficial GraphQL for PokeAPI | No | Yes | Yes |
| [Pokémon TCG](https://pokemontcg.io) | Pokémon TCG Information | No | Yes | Unknown |
| [Psychonauts](https://psychonauts-api.netlify.app/) | Psychonauts World Characters Information and PSI Powers | No | Yes | Yes |
| [PUBG](https://developer.pubg.com/) | Access in-game PUBG data | `apiKey` | Yes | Yes |
| [Puyo Nexus](https://github.com/deltadex7/puyodb-api-deno) | Puyo Puyo information from Puyo Nexus Wiki | No | Yes | Yes |
| [quizapi.io](https://quizapi.io/) | Access to various kind of quiz questions | `apiKey` | Yes | Yes |
| [Raider](https://raider.io/api) | Provides detailed character and guild rankings for Raiding and Mythic+ content in World of Warcraft | No | Yes | Unknown |
| [RAWG.io](https://rawg.io/apidocs) | 500,000+ games for 50 platforms including mobiles | `apiKey` | Yes | Unknown |
| [Rick and Morty](https://rickandmortyapi.com) | All the Rick and Morty information, including images | No | Yes | Yes |
| [Riot Games](https://developer.riotgames.com/) | League of Legends Game Information | `apiKey` | Yes | Unknown |
| [RPS 101](https://rps101.pythonanywhere.com/api) | Rock, Paper, Scissors with 101 objects | No | Yes | Yes |
| [RuneScape](https://runescape.wiki/w/Application_programming_interface) | RuneScape and OSRS RPGs information | No | Yes | No |
| [Sakura CardCaptor](https://github.com/JessVel/sakura-card-captor-api) | Sakura CardCaptor Cards Information | No | Yes | Unknown |
| [Scryfall](https://scryfall.com/docs/api) | Magic: The Gathering database | No | Yes | Yes |
| [SpaceTradersAPI](https://spacetraders.io?rel=pub-apis) | A playable inter-galactic space trading MMOAPI | `OAuth` | Yes | Yes |
| [Steam](https://steamapi.xpaw.me/) | Steam Web API documentation | `apiKey` | Yes | No |
| [Steam](https://github.com/Revadike/InternalSteamWebAPI/wiki) | Internal Steam Web API documentation | No | Yes | No |
| [SuperHeroes](https://superheroapi.com) | All SuperHeroes and Villains data from all universes under a single API | `apiKey` | Yes | Unknown |
| [TCGdex](https://www.tcgdex.net/docs) | Multi languages Pokémon TCG Information | No | Yes | Yes |
| [Tebex](https://docs.tebex.io/plugin/) | Tebex API for information about game purchases | `X-Mashape-Key` | Yes | No |
| [TETR.IO](https://tetr.io/about/api/) | TETR.IO Tetra Channel API | No | Yes | Unknown |
| [Tronald Dump](https://www.tronalddump.io/) | The dumbest things Donald Trump has ever said | No | Yes | Unknown |
| [Universalis](https://universalis.app/docs/index.html) | Final Fantasy XIV market board data | No | Yes | Yes |
| [Valorant (non-official)](https://valorant-api.com) | An extensive API containing data of most Valorant in-game items, assets and more | No | Yes | Unknown |
| [Warface (non-official)](https://api.wfstats.cf) | Official API proxy with better data structure and more features | No | Yes | No |
| [Wargaming.net](https://developers.wargaming.net/) | Wargaming.net info and stats | `apiKey` | Yes | No |
| [When is next MCU film](https://github.com/DiljotSG/MCU-Countdown/blob/develop/docs/API.md) | Upcoming MCU film information | No | Yes | Unknown |
| [xkcd](https://xkcd.com/json.html) | Retrieve xkcd comics as JSON | No | Yes | No |
| [Yu-Gi-Oh!](https://db.ygoprodeck.com/api-guide/) | Yu-Gi-Oh! TCG Information | No | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Geocoding
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [IPstack](https://ipstack.com/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Locate and identify website visitors by IP address | `apiKey` | Yes | Unknown |
| [ipapi.com](https://ipapi.com/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Real-time Geolocation & Reverse IP Lookup REST API | `apiKey` | Yes | Unknown |
| [Actinia Grass GIS](https://actinia.mundialis.de/api_docs/) | Actinia is an open source REST API for geographical data that uses GRASS GIS | `apiKey` | Yes | Unknown |
| [administrative-divisons-db](https://github.com/kamikazechaser/administrative-divisions-db) | Get all administrative divisions of a country | No | Yes | Yes |
| [adresse.data.gouv.fr](https://adresse.data.gouv.fr) | Address database of France, geocoding and reverse | No | Yes | Unknown |
| [Airtel IP](https://sys.airtel.lv/ip2country/1.1.1.1/?full=true) | IP Geolocation API. Collecting data from multiple sources | No | Yes | Unknown |
| [Apiip](https://apiip.net/) | Get location information by IP address | `apiKey` | Yes | Yes |
| [Battuta](http://battuta.medunes.net) | A (country/region/city) in-cascade location API | `apiKey` | No | Unknown |
| [BigDataCloud](https://www.bigdatacloud.com/ip-geolocation-apis) | Provides fast and accurate IP geolocation APIs along with security checks and confidence area | `apiKey` | Yes | Unknown |
| [Bing Maps](https://www.microsoft.com/maps/) | Create/customize digital maps based on Bing Maps data | `apiKey` | Yes | Unknown |
| [bng2latlong](https://www.getthedata.com/bng2latlong) | Convert British OSGB36 easting and northing (British National Grid) to WGS84 latitude and longitude | No | Yes | Yes |
| [Cartes.io](https://github.com/M-Media-Group/Cartes.io/wiki/API) | Create maps and markers for anything | No | Yes | Unknown |
| [Cep.la](http://cep.la/) | Brazil RESTful API to find information about streets, zip codes, neighborhoods, cities and states | No | No | Unknown |
| [CitySDK](http://www.citysdk.eu/citysdk-toolkit/) | Open APIs for select European cities | No | Yes | Unknown |
| [Country](http://country.is/) | Get your visitor's country from their IP | No | Yes | Yes |
| [CountryStateCity](https://countrystatecity.in/) | World countries, states, regions, provinces, cities & towns in JSON, SQL, XML, YAML, & CSV format | `apiKey` | Yes | Yes |
| [Ducks Unlimited](https://gis.ducks.org/datasets/du-university-chapters/api) | API explorer that gives a query URL with a JSON response of locations and cities | No | Yes | No |
| [GeoApi](https://api.gouv.fr/api/geoapi.html) | French geographical data | No | Yes | Unknown |
| [Geoapify](https://www.geoapify.com/api/geocoding-api/) | Forward and reverse geocoding, address autocomplete | `apiKey` | Yes | Yes |
| [Geocod.io](https://www.geocod.io/) | Address geocoding / reverse geocoding in bulk | `apiKey` | Yes | Unknown |
| [Geocode.xyz](https://geocode.xyz/api) | Provides worldwide forward/reverse geocoding, batch geocoding and geoparsing | No | Yes | Unknown |
| [Geocodify.com](https://geocodify.com/) | Worldwide geocoding, geoparsing and autocomplete for addresses | `apiKey` | Yes | Yes |
| [Geodata.gov.gr](https://geodata.gov.gr/en/) | Open geospatial data and API service for Greece | No | Yes | Unknown |
| [GeoDataSource](https://www.geodatasource.com/web-service) | Geocoding of city name by using latitude and longitude coordinates | `apiKey` | Yes | Unknown |
| [GeoDB Cities](http://geodb-cities-api.wirefreethought.com/) | Get global city, region, and country data | `apiKey` | Yes | Unknown |
| [GeographQL](https://geographql.netlify.app) | A Country, State, and City GraphQL API | No | Yes | Yes |
| [GeoJS](https://www.geojs.io/) | IP geolocation with ChatOps integration | No | Yes | Yes |
| [Geokeo](https://geokeo.com) | Geokeo geocoding service- with 2500 free api requests daily | No | Yes | Yes |
| [GeoNames](http://www.geonames.org/export/web-services.html) | Place names and other geographical data | No | No | Unknown |
| [geoPlugin](https://www.geoplugin.com) | IP geolocation and currency conversion | No | Yes | Yes |
| [Google Earth Engine](https://developers.google.com/earth-engine/) | A cloud-based platform for planetary-scale environmental data analysis | `apiKey` | Yes | Unknown |
| [Google Maps](https://developers.google.com/maps/) | Create/customize digital maps based on Google Maps data | `apiKey` | Yes | Unknown |
| [Graph Countries](https://github.com/lennertVanSever/graphcountries) | Country-related data like currencies, languages, flags, regions+subregions and bordering countries | No | Yes | Unknown |
| [HelloSalut](https://fourtonfish.com/project/hellosalut-api/) | Get hello translation following user language | No | Yes | Unknown |
| [HERE Maps](https://developer.here.com) | Create/customize digital maps based on HERE Maps data | `apiKey` | Yes | Unknown |
| [Hirak IP to Country](https://iplocation.hirak.site/) | Ip to location with country code, currency code & currency name, fast response, unlimited requests | `apiKey` | Yes | Unknown |
| [Hong Kong GeoData Store](https://geodata.gov.hk/gs/) | API for accessing geo-data of Hong Kong | No | Yes | Unknown |
| [IBGE](https://servicodados.ibge.gov.br/api/docs/) | Aggregate services of IBGE (Brazilian Institute of Geography and Statistics) | No | Yes | Unknown |
| [IP 2 Country](https://ip2country.info) | Map an IP to a country | No | Yes | Unknown |
| [IP Address Details](https://ipinfo.io/) | Find geolocation with ip address | No | Yes | Unknown |
| [IP Vigilante](https://www.ipvigilante.com/) | Free IP Geolocation API | No | Yes | Unknown |
| [ip-api](https://ip-api.com/docs) | Find location with IP address or domain | No | No | Unknown |
| [IP Geolocation](https://www.abstractapi.com/ip-geolocation-api) | Geolocate website visitors from their IPs | `apiKey` | Yes | Yes |
| [IP2Location](https://www.ip2location.com/web-service/ip2location) | IP geolocation web service to get more than 55 parameters | `apiKey` | Yes | Unknown |
| [IP2Proxy](https://www.ip2location.com/web-service/ip2proxy) | Detect proxy and VPN using IP address | `apiKey` | Yes | Unknown |
| [ipapi.co](https://ipapi.co/api/#introduction) | Find IP address location information | No | Yes | Yes |
| [IPGEO](https://api.techniknews.net/ipgeo/) | Unlimited free IP Address API with useful information | No | Yes | Unknown |
| [ipgeolocation](https://ipgeolocation.io/) | IP Geolocation AP with free plan 30k requests per month | `apiKey` | Yes | Yes |
| [IPInfoDB](https://www.ipinfodb.com/api) | Free Geolocation tools and APIs for country, region, city and time zone lookup by IP address | `apiKey` | Yes | Unknown |
| [ipstack](https://ipstack.com/) | Locate and identify website visitors by IP address | `apiKey` | Yes | Unknown |
| [Kakao Maps](https://apis.map.kakao.com) | Kakao Maps provide multiple APIs for Korean maps | `apiKey` | Yes | Unknown |
| [keycdn IP Location Finder](https://tools.keycdn.com/geo) | Get the IP geolocation data through the simple REST API. All the responses are JSON encoded | `apiKey` | Yes | Unknown |
| [LocationIQ](https://locationiq.org/docs/) | Provides forward/reverse geocoding and batch geocoding | `apiKey` | Yes | Yes |
| [Longdo Map](https://map.longdo.com/docs/) | Interactive map with detailed places and information portal in Thailand | `apiKey` | Yes | Yes |
| [Mapbox](https://docs.mapbox.com/) | Create/customize beautiful digital maps | `apiKey` | Yes | Unknown |
| [MapQuest](https://developer.mapquest.com/) | To access tools and resources to map the world | `apiKey` | Yes | No | Yes
| [Mexico](https://github.com/IcaliaLabs/sepomex) | Mexico RESTful zip codes API | No | Yes | Unknown |
| [Nominatim](https://nominatim.org/release-docs/latest/api/Overview/) | Provides worldwide forward / reverse geocoding | No | Yes | Yes |
| [One Map, Singapore](https://www.onemap.gov.sg/docs/) | Singapore Land Authority REST API services for Singapore addresses | `apiKey` | Yes | Unknown |
| [OnWater](https://onwater.io/) | Determine if a lat/lon is on water or land | No | Yes | Unknown |
| [Open Topo Data](https://www.opentopodata.org) | Elevation and ocean depth for a latitude and longitude | No | Yes | No |
| [OpenCage](https://opencagedata.com) | Forward and reverse geocoding using open data | `apiKey` | Yes | Yes |
| [openrouteservice.org](https://openrouteservice.org/) | Directions, POIs, isochrones, geocoding (+reverse), elevation, and more | `apiKey` | Yes | Unknown |
| [OpenStreetMap](http://wiki.openstreetmap.org/wiki/API) | Navigation, geolocation and geographical data | `OAuth` | No | Unknown |
| [Pinball Map](https://pinballmap.com/api/v1/docs) | A crowdsourced map of public pinball machines | No | Yes | Yes |
| [positionstack](https://positionstack.com/) | Forward & Reverse Batch Geocoding REST API | `apiKey` | Yes | Unknown |
| [Postali](https://postali.app/api) | Mexico Zip Codes API | No | Yes | Yes |
| [PostcodeData.nl](http://api.postcodedata.nl/v1/postcode/?postcode=1211EP&streetnumber=60&ref=domeinnaam.nl&type=json) | Provide geolocation data based on postcode for Dutch addresses | No | No | Unknown |
| [Postcodes.io](https://postcodes.io) | Postcode lookup & Geolocation for the UK | No | Yes | Yes |
| [Queimadas INPE](https://queimadas.dgi.inpe.br/queimadas/dados-abertos/) | Access to heat focus data (probable wildfire) | No | Yes | Unknown |
| [REST Countries](https://restcountries.com) | Get information about countries via a RESTful API | No | Yes | Yes |
| [RoadGoat Cities](https://www.roadgoat.com/business/cities-api) | Cities content & photos API | `apiKey` | Yes | No |
| [Rwanda Locations](https://rapidapi.com/victorkarangwa4/api/rwanda) | Rwanda Provences, Districts, Cities, Capital City, Sector, cells, villages and streets | No | Yes | Unknown |
| [SLF](https://github.com/slftool/slftool.github.io/blob/master/API.md) | German city, country, river, database | No | Yes | Yes |
| [SpotSense](https://spotsense.io/) | Add location based interactions to your mobile app | `apiKey` | Yes | Unknown |
| [Telize](https://rapidapi.com/fcambus/api/telize/) | Telize offers location information from any IP address | `apiKey` | Yes | Yes |
| [TomTom](https://developer.tomtom.com/) | Maps, Directions, Places and Traffic APIs | `apiKey` | Yes | Yes |
| [Uebermaps](https://uebermaps.com/api/v2) | Discover and share maps with friends | `apiKey` | Yes | Unknown |
| [US ZipCode](https://www.smarty.com/docs/cloud/us-zipcode-api) | Validate and append data for any US ZipCode | `apiKey` | Yes | Yes |
| [Utah AGRC](https://api.mapserv.utah.gov) | Utah Web API for geocoding Utah addresses | `apiKey` | Yes | Unknown |
| [ViaCep](https://viacep.com.br) | Brazil RESTful zip codes API | No | Yes | Unknown |
| [What3Words](https://what3words.com) | Three words as rememberable and unique coordinates worldwide | `apiKey` | Yes | Unknown |
| [Yandex.Maps Geocoder](https://yandex.com/dev/maps/geocoder) | Use geocoding to get an object's coordinates from its address | `apiKey` | Yes | Unknown |
| [ZipCodeAPI](https://www.zipcodeapi.com) | US zip code distance, radius and location API | `apiKey` | Yes | Unknown |
| [Zippopotam.us](http://www.zippopotam.us) | Get information about place such as country, city, state, etc | No | No | Unknown |
| [Ziptastic](https://ziptasticapi.com/) | Get the country, state, and city of any US zip-code | No | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Government
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Bank Negara Malaysia Open Data](https://apikijangportal.bnm.gov.my/) | Malaysia Central Bank Open Data | No | Yes | Unknown |
| [BCLaws](https://www.bclaws.gov.bc.ca/civix/template/complete/api/index.html) | Access to the laws of British Columbia | No | No | Unknown |
| [Brazil](https://brasilapi.com.br/) | Community driven API for Brazil Public Data | No | Yes | Yes |
| [Brazil Central Bank Open Data](https://dadosabertos.bcb.gov.br/) | Brazil Central Bank Open Data | No | Yes | Unknown |
| [Brazil Receita WS](https://www.receitaws.com.br/) | Consult companies by CNPJ for Brazilian companies | No | Yes | Unknown |
| [Brazilian Chamber of Deputies Open Data](https://dadosabertos.camara.leg.br/swagger/api.html) | Provides legislative information in Apis XML and JSON, as well as files in various formats | No | Yes | No |
| [Census.gov](https://www.census.gov/data/developers/data-sets.html) | The US Census Bureau provides various APIs and data sets on demographics and businesses | No | Yes | Unknown |
| [City, Berlin](https://daten.berlin.de/) | Berlin(DE) City Open Data | No | Yes | Unknown |
| [City, Gdańsk](https://ckan.multimediagdansk.pl/en) | Gdańsk (PL) City Open Data | No | Yes | Unknown |
| [City, Gdynia](http://otwartedane.gdynia.pl/en/api_doc.html) | Gdynia (PL) City Open Data | No | No | Unknown |
| [City, Helsinki](https://hri.fi/en_gb/) | Helsinki(FI) City Open Data | No | Yes | Unknown |
| [City, Lviv](https://opendata.city-adm.lviv.ua/) | Lviv(UA) City Open Data | No | Yes | Unknown |
| [City, Nantes Open Data](https://data.nantesmetropole.fr/pages/home/) | Nantes(FR) City Open Data | `apiKey` | Yes | Unknown |
| [City, New York Open Data](https://opendata.cityofnewyork.us/) | New York (US) City Open Data | No | Yes | Unknown |
| [City, Prague Open Data](http://opendata.praha.eu/en) | Prague(CZ) City Open Data | No | No | Unknown |
| [City, Toronto Open Data](https://open.toronto.ca/) | Toronto (CA) City Open Data | No | Yes | Yes |
| [Code.gov](https://code.gov) | The primary platform for Open Source and code sharing for the U.S. Federal Government | `apiKey` | Yes | Unknown |
| [Colorado Information Marketplace](https://data.colorado.gov/) | Colorado State Government Open Data | No | Yes | Unknown |
| [Data USA](https://datausa.io/about/api/) | US Public Data | No | Yes | Unknown |
| [Data.gov](https://api.data.gov/) | US Government Data | `apiKey` | Yes | Unknown |
| [Data.parliament.uk](https://explore.data.parliament.uk/?learnmore=Members) | Contains live datasets including information about petitions, bills, MP votes, attendance and more | No | No | Unknown |
| [Deutscher Bundestag DIP](https://dip.bundestag.de/documents/informationsblatt_zur_dip_api_v01.pdf) | This API provides read access to DIP entities (e.g. activities, persons, printed material) | `apiKey` | Yes | Unknown |
| [District of Columbia Open Data](http://opendata.dc.gov/pages/using-apis) | Contains D.C. government public datasets, including crime, GIS, financial data, and so on | No | Yes | Unknown |
| [EPA](https://www.epa.gov/developers/data-data-products#apis) | Web services and data sets from the US Environmental Protection Agency | No | Yes | Unknown |
| [FBI Wanted](https://www.fbi.gov/wanted/api) | Access information on the FBI Wanted program | No | Yes | Unknown |
| [FEC](https://api.open.fec.gov/developers/) | Information on campaign donations in federal elections | `apiKey` | Yes | Unknown |
| [Federal Register](https://www.federalregister.gov/reader-aids/developer-resources/rest-api) | The Daily Journal of the United States Government | No | Yes | Unknown |
| [Food Standards Agency](http://ratings.food.gov.uk/open-data/en-GB) | UK food hygiene rating data API | No | No | Unknown |
| [Gazette Data, UK](https://www.thegazette.co.uk/data) | UK official public record API | `OAuth` | Yes | Unknown |
| [Gun Policy](https://www.gunpolicy.org/api) | International firearm injury prevention and policy | `apiKey` | Yes | Unknown |
| [INEI](http://iinei.inei.gob.pe/microdatos/) | Peruvian Statistical Government Open Data | No | No | Unknown |
| [Interpol Red Notices](https://interpol.api.bund.dev/) | Access and search Interpol Red Notices | No | Yes | Unknown |
| [Istanbul (İBB) Open Data](https://data.ibb.gov.tr) | Data sets from the İstanbul Metropolitan Municipality (İBB) | No | Yes | Unknown |
| [National Park Service, US](https://www.nps.gov/subjects/developer/) | Data from the US National Park Service | `apiKey` | Yes | Yes |
| [Open Government, ACT](https://www.data.act.gov.au/) | Australian Capital Territory Open Data | No | Yes | Unknown |
| [Open Government, Argentina](https://datos.gob.ar/) | Argentina Government Open Data | No | Yes | Unknown |
| [Open Government, Australia](https://www.data.gov.au/) | Australian Government Open Data | No | Yes | Unknown |
| [Open Government, Austria](https://www.data.gv.at/) | Austria Government Open Data | No | Yes | Unknown |
| [Open Government, Belgium](https://data.gov.be/) | Belgium Government Open Data | No | Yes | Unknown |
| [Open Government, Canada](http://open.canada.ca/en) | Canadian Government Open Data | No | No | Unknown |
| [Open Government, Colombia](https://www.dane.gov.co/) | Colombia Government Open Data | No | No | Unknown |
| [Open Government, Cyprus](https://data.gov.cy/?language=en) | Cyprus Government Open Data | No | Yes | Unknown |
| [Open Government, Czech Republic](https://data.gov.cz/english/) | Czech Republic Government Open Data | No | Yes | Unknown |
| [Open Government, Denmark](https://www.opendata.dk/) | Denmark Government Open Data | No | Yes | Unknown |
| [Open Government, Estonia](https://avaandmed.eesti.ee/instructions/opendata-dataset-api) | Estonia Government Open Data | `apiKey` | Yes | Unknown |
| [Open Government, Finland](https://www.avoindata.fi/en) | Finland Government Open Data | No | Yes | Unknown |
| [Open Government, France](https://www.data.gouv.fr/) | French Government Open Data | `apiKey` | Yes | Unknown |
| [Open Government, Germany](https://www.govdata.de/daten/-/details/govdata-metadatenkatalog) | Germany Government Open Data | No | Yes | Unknown |
| [Open Government, Greece](https://data.gov.gr/) | Greece Government Open Data | `OAuth` | Yes | Unknown |
| [Open Government, India](https://data.gov.in/) | Indian Government Open Data | `apiKey` | Yes | Unknown |
| [Open Government, Ireland](https://data.gov.ie/pages/developers) | Ireland Government Open Data | No | Yes | Unknown |
| [Open Government, Italy](https://www.dati.gov.it/) | Italy Government Open Data | No | Yes | Unknown |
| [Open Government, Korea](https://www.data.go.kr/) | Korea Government Open Data | `apiKey` | Yes | Unknown |
| [Open Government, Lithuania](https://data.gov.lt/public/api/1) | Lithuania Government Open Data | No | Yes | Unknown |
| [Open Government, Luxembourg](https://data.public.lu) | Luxembourgish Government Open Data | `apiKey` | Yes | Unknown |
| [Open Government, Mexico](https://www.inegi.org.mx/datos/) | Mexican Statistical Government Open Data | No | Yes | Unknown |
| [Open Government, Mexico](https://datos.gob.mx/) | Mexico Government Open Data | No | Yes | Unknown |
| [Open Government, Netherlands](https://data.overheid.nl/en/ondersteuning/data-publiceren/api) | Netherlands Government Open Data | No | Yes | Unknown |
| [Open Government, New South Wales](https://api.nsw.gov.au/) | New South Wales Government Open Data | `apiKey` | Yes | Unknown |
| [Open Government, New Zealand](https://www.data.govt.nz/) | New Zealand Government Open Data | No | Yes | Unknown |
| [Open Government, Norway](https://data.norge.no/dataservices) | Norwegian Government Open Data | No | Yes | Yes |
| [Open Government, Peru](https://www.datosabiertos.gob.pe/) | Peru Government Open Data | No | Yes | Unknown |
| [Open Government, Poland](https://dane.gov.pl/en) | Poland Government Open Data | No | Yes | Yes |
| [Open Government, Portugal](https://dados.gov.pt/en/docapi/) | Portugal Government Open Data | No | Yes | Yes |
| [Open Government, Queensland Government](https://www.data.qld.gov.au/) | Queensland Government Open Data | No | Yes | Unknown |
| [Open Government, Romania](http://data.gov.ro/) | Romania Government Open Data | No | No | Unknown |
| [Open Government, Saudi Arabia](https://data.gov.sa) | Saudi Arabia Government Open Data | No | Yes | Unknown |
| [Open Government, Singapore](https://data.gov.sg/developer) | Singapore Government Open Data | No | Yes | Unknown |
| [Open Government, Slovakia](https://data.gov.sk/en/) | Slovakia Government Open Data | No | Yes | Unknown |
| [Open Government, Slovenia](https://podatki.gov.si/) | Slovenia Government Open Data | No | Yes | No |
| [Open Government, South Australian Government](https://data.sa.gov.au/) | South Australian Government Open Data | No | Yes | Unknown |
| [Open Government, Spain](https://datos.gob.es/en) | Spain Government Open Data | No | Yes | Unknown |
| [Open Government, Sweden](https://www.dataportal.se/en/dataservice/91_29789/api-for-the-statistical-database) | Sweden Government Open Data | No | Yes | Unknown |
| [Open Government, Switzerland](https://handbook.opendata.swiss/de/content/nutzen/api-nutzen.html) | Switzerland Government Open Data | No | Yes | Unknown |
| [Open Government, Taiwan](https://data.gov.tw/) | Taiwan Government Open Data | No | Yes | Unknown |
| [Open Government, Thailand](https://data.go.th/) | Thailand Government Open Data | `apiKey` | Yes | Unknown |
| [Open Government, UK](https://data.gov.uk/) | UK Government Open Data | No | Yes | Unknown |
| [Open Government, USA](https://www.data.gov/) | United States Government Open Data | No | Yes | Unknown |
| [Open Government, Victoria State Government](https://www.data.vic.gov.au/) | Victoria State Government Open Data | No | Yes | Unknown |
| [Open Government, West Australia](https://data.wa.gov.au/) | West Australia Open Data | No | Yes | Unknown |
| [PRC Exam Schedule](https://api.whenisthenextboardexam.com/docs/) | Unofficial Philippine Professional Regulation Commission's examination schedule | No | Yes | Yes |
| [Represent by Open North](https://represent.opennorth.ca/) | Find Canadian Government Representatives | No | Yes | Unknown |
| [UK Companies House](https://developer.company-information.service.gov.uk/) | UK Companies House Data from the UK government | `OAuth` | Yes | Unknown |
| [US Presidential Election Data by TogaTech](https://uselection.togatech.org/api/) | Basic candidate data and live electoral vote counts for top two parties in US presidential election | No | Yes | No |
| [USA.gov](https://www.usa.gov/developer) | Authoritative information on U.S. programs, events, services and more | `apiKey` | Yes | Unknown |
| [USAspending.gov](https://api.usaspending.gov/) | US federal spending data | No | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Health
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [CMS.gov](https://data.cms.gov/provider-data/) | Access to the data from the CMS - medicare.gov | `apiKey` | Yes | Unknown |
| [Coronavirus](https://pipedream.com/@pravin/http-api-for-latest-wuhan-coronavirus-data-2019-ncov-p_G6CLVM/readme) | HTTP API for Latest Covid-19 Data | No | Yes | Unknown |
| [Coronavirus in the UK](https://coronavirus.data.gov.uk/details/developers-guide) | UK Government coronavirus data, including deaths and cases by region | No | Yes | Unknown |
| [Covid Tracking Project](https://covidtracking.com/data/api/version-2) | Covid-19  data for the US | No | Yes | No |
| [Covid-19](https://covid19api.com/) | Covid 19 spread, infection and recovery | No | Yes | Yes |
| [Covid-19](https://github.com/M-Media-Group/Covid-19-API) | Covid 19 cases, deaths and recovery per country | No | Yes | Yes |
| [Covid-19 Datenhub](https://npgeo-corona-npgeo-de.hub.arcgis.com) | Maps, datasets, applications and more in the context of COVID-19 | No | Yes | Unknown |
| [Covid-19 Government Response](https://covidtracker.bsg.ox.ac.uk) | Government measures tracker to fight against the Covid-19 pandemic | No | Yes | Yes |
| [Covid-19 India](https://data.covid19india.org/) | Covid 19 statistics state and district wise about cases, vaccinations, recovery within India | No | Yes | Unknown |
| [Covid-19 JHU CSSE](https://nuttaphat.com/covid19-api/) | Open-source API for exploring Covid19 cases based on JHU CSSE | No | Yes | Yes |
| [Covid-19 Live Data](https://github.com/mathdroid/covid-19-api) | Global and countrywise data of Covid 19 daily Summary, confirmed cases, recovered and deaths | No | Yes | Yes |
| [Covid-19 Philippines](https://github.com/Simperfy/Covid-19-API-Philippines-DOH) | Unofficial Covid-19 Web API for Philippines from data collected by DOH | No | Yes | Yes |
| [COVID-19 Tracker Canada](https://api.covid19tracker.ca/docs/1.0/overview) | Details on Covid-19 cases across Canada | No | Yes | Unknown |
| [COVID-19 Tracker Sri Lanka](https://www.hpb.health.gov.lk/en/api-documentation) | Provides situation of the COVID-19 patients reported in Sri Lanka | No | Yes | Unknown |
| [COVID-ID](https://data.covid19.go.id/public/api/prov.json) | Indonesian government Covid data per province | No | Yes | Yes |
| [Dataflow Kit COVID-19](https://covid-19.dataflowkit.com) | COVID-19 live statistics into sites per hour | No | Yes | Unknown |
| [FoodData Central](https://fdc.nal.usda.gov/) | National Nutrient Database for Standard Reference | `apiKey` | Yes | Unknown |
| [Healthcare.gov](https://www.healthcare.gov/developers/) | Educational content about the US Health Insurance Marketplace | No | Yes | Unknown |
| [Humanitarian Data Exchange](https://data.humdata.org/) | Humanitarian Data Exchange (HDX) is open platform for sharing data across crises and organisations | No | Yes | Unknown |
| [Infermedica](https://developer.infermedica.com/docs/) | NLP based symptom checker and patient triage API for health diagnosis from text | `apiKey` | Yes | Yes |
| [LAPIS](https://cov-spectrum.ethz.ch/public) | SARS-CoV-2 genomic sequences from public sources | No | Yes | Yes |
| [Lexigram](https://docs.lexigram.io/) | NLP that extracts mentions of clinical concepts from text, gives access to clinical ontology | `apiKey` | Yes | Unknown |
| [Makeup](http://makeup-api.herokuapp.com/) | Makeup Information | No | No | Unknown |
| [MyVaccination](https://documenter.getpostman.com/view/16605343/Tzm8GG7u) | Vaccination data for Malaysia | No | Yes | Unknown |
| [NPPES](https://npiregistry.cms.hhs.gov/registry/help-api) | National Plan & Provider Enumeration System, info on healthcare providers registered in US | No | Yes | Unknown |
| [Nutritionix](https://developer.nutritionix.com/) | Worlds largest verified nutrition database | `apiKey` | Yes | Unknown |
| [Open Data NHS Scotland](https://www.opendata.nhs.scot) | Medical reference data and statistics by Public Health Scotland | No | Yes | Unknown |
| [Open Disease](https://disease.sh/) | API for Current cases and more stuff about COVID-19 and Influenza | No | Yes | Yes |
| [openFDA](https://open.fda.gov) | Public FDA data about drugs, devices and foods | `apiKey` | Yes | Unknown |
| [Orion Health](https://developer.orionhealth.io/) | Medical platform which allows the development of applications for different healthcare scenarios | `OAuth` | Yes | Unknown |
| [Quarantine](https://quarantine.country/coronavirus/api/) | Coronavirus API with free COVID-19 live updates | No | Yes | Yes |

**[⬆ Back to Index](#index)**
<br >
<br >
### Jobs
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Adzuna](https://developer.adzuna.com/overview) | Job board aggregator | `apiKey` | Yes | Unknown |
| [Arbeitnow](https://documenter.getpostman.com/view/18545278/UVJbJdKh) | API for Job board aggregator in Europe / Remote | No | Yes | Yes |
| [Arbeitsamt](https://jobsuche.api.bund.dev/) | API for the "Arbeitsamt", which is a german Job board aggregator | `OAuth` | Yes | Unknown |
| [Careerjet](https://www.careerjet.com/partners/api/) | Job search engine | `apiKey` | No | Unknown |
| [DevITjobs UK](https://devitjobs.uk/job_feed.xml) | Jobs with GraphQL | No | Yes | Yes |
| [Findwork](https://findwork.dev/developers/) | Job board | `apiKey` | Yes | Unknown |
| [GraphQL Jobs](https://graphql.jobs/docs/api/) | Jobs with GraphQL | No | Yes | Yes |
| [Jobs2Careers](http://api.jobs2careers.com/api/spec.pdf) | Job aggregator | `apiKey` | Yes | Unknown |
| [Jooble](https://jooble.org/api/about) | Job search engine | `apiKey` | Yes | Unknown |
| [Juju](http://www.juju.com/publisher/spec/) | Job search engine | `apiKey` | No | Unknown |
| [Open Skills](https://github.com/workforce-data-initiative/skills-api/wiki/API-Overview) | Job titles, skills and related jobs data | No | No | Unknown |
| [Reed](https://www.reed.co.uk/developers) | Job board aggregator | `apiKey` | Yes | Unknown |
| [The Muse](https://www.themuse.com/developers/api/v2) | Job board and company profiles | `apiKey` | Yes | Unknown |
| [Upwork](https://developers.upwork.com/) | Freelance job board and management system | `OAuth` | Yes | Unknown |
| [USAJOBS](https://developer.usajobs.gov/) | US government job board | `apiKey` | Yes | Unknown |
| [WhatJobs](https://www.whatjobs.com/affiliates) | Job search engine | `apiKey` | Yes | Unknown |
| [ZipRecruiter](https://www.ziprecruiter.com/publishers) | Job search app and website | `apiKey` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Machine Learning
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [AI For Thai](https://aiforthai.in.th/index.php) | Free Various Thai AI API | `apiKey` | Yes | Yes |
| [Clarifai](https://docs.clarifai.com/api-guide/api-overview) | Computer Vision | `OAuth` | Yes | Unknown |
| [Cloudmersive](https://www.cloudmersive.com/image-recognition-and-processing-api) | Image captioning, face recognition, NSFW classification | `apiKey` | Yes | Yes |
| [Deepcode](https://www.deepcode.ai) | AI for code review | No | Yes | Unknown |
| [Dialogflow](https://cloud.google.com/dialogflow/docs/) | Natural Language Processing | `apiKey` | Yes | Unknown |
| [EXUDE-API](http://uttesh.com/exude-api/) | Used for the primary ways for filtering the stopping, stemming words from the text data | No | Yes | Yes |
| [Hirak FaceAPI](https://faceapi.hirak.site/) | Face detection, face recognition with age estimation/gender estimation, accurate, no quota limits | `apiKey` | Yes | Unknown |    
| [Imagga](https://imagga.com/) | Image Recognition Solutions like Tagging, Visual Search, NSFW moderation | `apiKey` | Yes | Unknown |
| [Inferdo](https://rapidapi.com/user/inferdo) | Computer Vision services like Facial detection, Image labeling, NSFW classification | `apiKey` | Yes | Unknown |
| [IPS Online](https://docs.identity.ps/docs) | Face and License Plate Anonymization | `apiKey` | Yes | Unknown |
| [Irisnet](https://irisnet.de/api/) | Realtime content moderation API that blocks or blurs unwanted images in real-time | `apiKey` | Yes | Yes |
| [Keen IO](https://keen.io/) | Data Analytics | `apiKey` | Yes | Unknown |
| [Machinetutors](https://www.machinetutors.com/portfolio/MT_api.html) | AI Solutions: Video/Image Classification & Tagging, NSFW, Icon/Image/Audio Search, NLP | `apiKey` | Yes | Yes |
| [MessengerX.io](https://messengerx.rtfd.io) | A FREE API for developers to build and monetize personalized ML based chat apps | `apiKey` | Yes | Yes |
| [NLP Cloud](https://nlpcloud.io) | NLP API using spaCy and transformers for NER, sentiments, classification, summarization, and more | `apiKey` | Yes | Unknown |
| [OpenVisionAPI](https://openvisionapi.com) | Open source computer vision API based on open source models | No | Yes | Yes |
| [Perspective](https://perspectiveapi.com) | NLP API to return probability that if text is toxic, obscene, insulting or threatening | `apiKey` | Yes | Unknown |
| [Roboflow Universe](https://universe.roboflow.com) | Pre-trained computer vision models | `apiKey` | Yes | Yes |
| [SkyBiometry](https://skybiometry.com/documentation/) | Face Detection, Face Recognition and Face Grouping | `apiKey` | Yes | Unknown |
| [Time Door](https://timedoor.io) | A time series analysis API | `apiKey` | Yes | Yes |
| [Unplugg](https://unplu.gg/test_api.html) | Forecasting API for timeseries data | `apiKey` | Yes | Unknown |
| [WolframAlpha](https://products.wolframalpha.com/api/) | Provides specific answers to questions using data and algorithms | `apiKey` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Music
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [7digital](https://docs.7digital.com/reference) | Api of Music store 7digital | `OAuth` | Yes | Unknown |
| [AI Mastering](https://aimastering.com/api_docs/) | Automated Music Mastering | `apiKey` | Yes | Yes |
| [Audiomack](https://www.audiomack.com/data-api/docs) | Api of the streaming music hub Audiomack | `OAuth` | Yes | Unknown |
| [Bandcamp](https://bandcamp.com/developer) | API of Music store Bandcamp | `OAuth` | Yes | Unknown |
| [Bandsintown](https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0) | Music Events | No | Yes | Unknown |
| [Deezer](https://developers.deezer.com/api) | Music | `OAuth` | Yes | Unknown |
| [Discogs](https://www.discogs.com/developers/) | Music | `OAuth` | Yes | Unknown |
| [Freesound](https://freesound.org/docs/api/) | Music Samples | `apiKey` | Yes | Unknown |
| [Gaana](https://github.com/cyberboysumanjay/GaanaAPI) | API to retrieve song information from Gaana | No | Yes | Unknown |
| [Genius](https://docs.genius.com/) | Crowdsourced lyrics and music knowledge | `OAuth` | Yes | Unknown |
| [Genrenator](https://binaryjazz.us/genrenator-api/) | Music genre generator | No | Yes | Unknown |
| [iTunes Search](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/) | Software products | No | Yes | Unknown |
| [Jamendo](https://developer.jamendo.com/v3.0/docs) | Music | `OAuth` | Yes | Unknown |
| [JioSaavn](https://github.com/cyberboysumanjay/JioSaavnAPI) | API to retrieve song information, album meta data and many more from JioSaavn | No | Yes | Unknown |
| [KKBOX](https://developer.kkbox.com) | Get music libraries, playlists, charts, and perform out of KKBOX's platform | `OAuth` | Yes | Unknown |
| [KSoft.Si Lyrics](https://docs.ksoft.si/api/lyrics-api) | API to get lyrics for songs | `apiKey` | Yes | Unknown |
| [LastFm](https://www.last.fm/api) | Music | `apiKey` | Yes | Unknown |
| [Lyrics.ovh](https://lyricsovh.docs.apiary.io) | Simple API to retrieve the lyrics of a song | No | Yes | Unknown |
| [Mixcloud](https://www.mixcloud.com/developers/) | Music | `OAuth` | Yes | Yes |
| [MusicBrainz](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2) | Music | No | Yes | Unknown |
| [Musixmatch](https://developer.musixmatch.com/) | Music | `apiKey` | Yes | Unknown |
| [Napster](https://developer.napster.com/api/v2.2) | Music | `apiKey` | Yes | Yes |
| [Openwhyd](https://openwhyd.github.io/openwhyd/API) | Download curated playlists of streaming tracks (YouTube, SoundCloud, etc...) | No | Yes | No |
| [Phishin](https://phish.in/api-docs) | A web-based archive of legal live audio recordings of the improvisational rock band Phish | `apiKey` | Yes | No |
| [Radio Browser](https://api.radio-browser.info/) | List of internet radio stations | No | Yes | Yes |
| [Songkick](https://www.songkick.com/developer/) | Music Events | `apiKey` | Yes | Unknown |
| [Songlink / Odesli](https://www.notion.so/API-d0ebe08a5e304a55928405eb682f6741) | Get all the services on which a song is available | `apiKey` | Yes | Yes |
| [Songsterr](https://www.songsterr.com/a/wa/api/) | Provides guitar, bass and drums tabs and chords | No | Yes | Unknown |
| [SoundCloud](https://developers.soundcloud.com/docs/api/guide) | With SoundCloud API you can build applications that will give more power to control your content | `OAuth` | Yes | Unknown |
| [Spotify](https://beta.developer.spotify.com/documentation/web-api/) | View Spotify music catalog, manage users' libraries, get recommendations and more | `OAuth` | Yes | Unknown |
| [TasteDive](https://tastedive.com/read/api) | Similar artist API (also works for movies and TV shows) | `apiKey` | Yes | Unknown |
| [TheAudioDB](https://www.theaudiodb.com/api_guide.php) | Music | `apiKey` | Yes | Unknown |
| [Vagalume](https://api.vagalume.com.br/docs/) | Crowdsourced lyrics and music knowledge | `apiKey` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### News
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Mediastack](https://mediastack.com?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Free, Simple REST API for Live News & Blog Articles | `apiKey` | Yes | Unknown |
| [Associated Press](https://developer.ap.org/) | Search for news and metadata from Associated Press | `apiKey` | Yes | Unknown |
| [Chronicling America](http://chroniclingamerica.loc.gov/about/api/) | Provides access to millions of pages of historic US newspapers from the Library of Congress | No | No | Unknown |
| [Currents](https://currentsapi.services/) | Latest news published in various news sources, blogs and forums | `apiKey` | Yes | Yes |
| [Feedbin](https://github.com/feedbin/feedbin-api) | RSS reader | `OAuth` | Yes | Unknown |
| [GNews](https://gnews.io/) | Search for news from various sources | `apiKey` | Yes | Yes |
| [Graphs for Coronavirus](https://corona.dnsforfamily.com/api.txt) | Each Country separately and Worldwide Graphs for Coronavirus. Daily updates | No | Yes | Yes |
| [Inshorts News](https://github.com/cyberboysumanjay/Inshorts-News-API) | Provides news from inshorts | No | Yes | Unknown |
| [MarketAux](https://www.marketaux.com/) | Live stock market news with tagged tickers + sentiment and stats JSON API | `apiKey` | Yes | Yes |
| [New York Times](https://developer.nytimes.com/) | The New York Times Developer Network | `apiKey` | Yes | Unknown |
| [News](https://newsapi.org/) | Headlines currently published on a range of news sources and blogs | `apiKey` | Yes | Unknown |
| [NewsData](https://newsdata.io/docs) | News data API for live-breaking news and headlines from reputed  news sources | `apiKey` | Yes | Unknown |
| [NewsX](https://rapidapi.com/machaao-inc-machaao-inc-default/api/newsx/) | Get or Search Latest Breaking News with ML Powered Summaries 🤖 | `apiKey` | Yes | Unknown |
| [NPR One](http://dev.npr.org/api/) | Personalized news listening experience from NPR | `OAuth` | Yes | Unknown |
| [Spaceflight News](https://spaceflightnewsapi.net) | Spaceflight related news 🚀 | No | Yes | Yes |
| [The Guardian](http://open-platform.theguardian.com/) | Access all the content the Guardian creates, categorised by tags and section | `apiKey` | Yes | Unknown |
| [The Old Reader](https://github.com/theoldreader/api) | RSS reader | `apiKey` | Yes | Unknown |
| [TheNews](https://www.thenewsapi.com/) | Aggregated headlines, top story and live news JSON API | `apiKey` | Yes | Yes |
| [Trove](https://trove.nla.gov.au/about/create-something/using-api) | Search through the National Library of Australia collection of 1000s of digitised newspapers | `apiKey` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Open Data
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [18F](http://18f.github.io/API-All-the-X/) | Unofficial US Federal Government API Development | No | No | Unknown |
| [API Setu](https://www.apisetu.gov.in/) | An Indian Government platform that provides a lot of APIS for KYC, business, education & employment | No | Yes | Yes |
| [Archive.org](https://archive.readme.io/docs) | The Internet Archive | No | Yes | No |
| [Black History Facts](https://www.blackhistoryapi.io/docs) | Contribute or search one of the largest black history fact databases on the web | `apiKey` | Yes | Yes |
| [BotsArchive](https://botsarchive.com/docs.html) | JSON formatted details about Telegram Bots available in database | No | Yes | Unknown |
| [Callook.info](https://callook.info) | United States ham radio callsigns | No | Yes | Unknown |
| [CARTO](https://carto.com/) | Location Information Prediction | `apiKey` | Yes | Unknown |
| [CollegeScoreCard.ed.gov](https://collegescorecard.ed.gov/data/) | Data on higher education institutions in the United States | No | Yes | Unknown |
| [Enigma Public](https://developers.enigma.com/docs) | Broadest collection of public data | `apiKey` | Yes | Yes |
| [French Address Search](https://geo.api.gouv.fr/adresse) | Address search via the French Government | No | Yes | Unknown |
| [GENESIS](https://www.destatis.de/EN/Service/OpenData/api-webservice.html) | Federal Statistical Office Germany | `OAuth` | Yes | Unknown |
| [Joshua Project](https://api.joshuaproject.net/) | People groups of the world with the fewest followers of Christ | `apiKey` | Yes | Unknown |
| [Kaggle](https://www.kaggle.com/docs/api) | Create and interact with Datasets, Notebooks, and connect with Kaggle | `apiKey` | Yes | Unknown |
| [LinkPreview](https://www.linkpreview.net) | Get JSON formatted summary with title, description and preview image for any requested URL | `apiKey` | Yes | Yes |
| [Lowy Asia Power Index](https://github.com/0x0is1/lowy-index-api-docs) | Get measure resources and influence to rank the relative power of states in Asia | No | Yes | Unknown |
| [Microlink.io](https://microlink.io) | Extract structured data from any website | No | Yes | Yes |
| [Nasdaq Data Link](https://docs.data.nasdaq.com/) | Stock market data | `apiKey` | Yes | Unknown |
| [Nobel Prize](https://www.nobelprize.org/about/developer-zone-2/) | Open data about nobel prizes and events | No | Yes | Yes |
| [Open Data Minneapolis](https://opendata.minneapolismn.gov/) | Spatial (GIS) and non-spatial city data for Minneapolis | No | Yes | No |
| [openAFRICA](https://africaopendata.org/) | Large datasets repository of African open data | No | Yes | Unknown |
| [OpenCorporates](http://api.opencorporates.com/documentation/API-Reference) | Data on corporate entities and directors in many countries | `apiKey` | Yes | Unknown |
| [OpenSanctions](https://www.opensanctions.org/docs/api/) | Data on international sanctions, crime and politically exposed persons | No | Yes | Yes |
| [PeakMetrics](https://rapidapi.com/peakmetrics-peakmetrics-default/api/peakmetrics-news) | News articles and public datasets | `apiKey` | Yes | Unknown |
| [Recreation Information Database](https://ridb.recreation.gov/) | Recreational areas, federal lands, historic sites, museums, and other attractions/resources(US) | `apiKey` | Yes | Unknown |
| [Scoop.it](http://www.scoop.it/dev) | Content Curation Service | `apiKey` | No | Unknown |
| [Socrata](https://dev.socrata.com/) | Access to Open Data from Governments, Non-profits and NGOs around the world | `OAuth` | Yes | Yes |
| [Teleport](https://developers.teleport.org/) | Quality of Life Data | No | Yes | Unknown |
| [Umeå Open Data](https://opendata.umea.se/api/) | Open data of the city Umeå in northen Sweden | No | Yes | Yes |
| [Universities List](https://github.com/Hipo/university-domains-list) | University names, countries and domains | No | Yes | Unknown |
| [University of Oslo](https://data.uio.no/) | Courses, lecture videos, detailed information for courses etc. for the University of Oslo (Norway) | No | Yes | Unknown |
| [UPC database](https://upcdatabase.org/api) | More than 1.5 million barcode numbers from all around the world | `apiKey` | Yes | Unknown |
| [Urban Observatory](https://urbanobservatory.ac.uk) | The largest set of publicly available real time urban data in the UK | No | No | No |
| [Wikidata](https://www.wikidata.org/w/api.php?action=help) | Collaboratively edited knowledge base operated by the Wikimedia Foundation | `OAuth` | Yes | Unknown |
| [Wikipedia](https://www.mediawiki.org/wiki/API:Main_page) | Mediawiki Encyclopedia | No | Yes | Unknown |
| [Yelp](https://www.yelp.com/developers/documentation/v3) | Find Local Business | `OAuth` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Open Source Projects
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Countly](https://api.count.ly/reference) | Countly web analytics | No | No | Unknown |
| [Creative Commons Catalog](https://api.creativecommons.engineering/) | Search among openly licensed and public domain works | `OAuth` | Yes | Yes |
| [Datamuse](https://www.datamuse.com/api/) | Word-finding query engine | No | Yes | Unknown |
| [Drupal.org](https://www.drupal.org/drupalorg/docs/api) | Drupal.org | No | Yes | Unknown |
| [Evil Insult Generator](https://evilinsult.com/api) | Evil Insults | No | Yes | Yes |
| [GitHub Contribution Chart Generator](https://github-contributions.vercel.app) | Create an image of your GitHub contributions | No | Yes | Yes |
| [GitHub ReadMe Stats](https://github.com/anuraghazra/github-readme-stats) | Add dynamically generated statistics to your GitHub profile ReadMe | No | Yes | Yes |
| [Metabase](https://www.metabase.com/) | An open source Business Intelligence server to share data and analytics inside your company | No | Yes | Yes |
| [Shields](https://shields.io/) | Concise, consistent, and legible badges in SVG and raster format | No | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Patent
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [EPO](https://developers.epo.org/) | European patent search system api | `OAuth` | Yes | Unknown |
| [PatentsView ](https://patentsview.org/apis/purpose) | API is intended to explore and visualize trends/patterns across the US innovation landscape | No | Yes | Unknown |
| [TIPO](https://tiponet.tipo.gov.tw/Gazette/OpenData/OD/OD05.aspx?QryDS=API00) | Taiwan patent search system api | `apiKey` | Yes | Unknown |
| [USPTO](https://www.uspto.gov/learning-and-resources/open-data-and-mobility) | USA patent api services | No | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Personality
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Advice Slip](http://api.adviceslip.com/) | Generate random advice slips | No | Yes | Unknown |
| [Biriyani As A Service](https://biriyani.anoram.com/) | Biriyani images placeholder | No | Yes | No |
| [Dev.to](https://developers.forem.com/api) | Access Forem articles, users and other resources via API | `apiKey` | Yes | Unknown |
| [Dictum](https://github.com/fisenkodv/dictum) | API to get access to the collection of the most inspiring expressions of mankind | No | Yes | Unknown |
| [FavQs.com](https://favqs.com/api) | FavQs allows you to collect, discover and share your favorite quotes | `apiKey` | Yes | Unknown |
| [FOAAS](http://www.foaas.com/) | Fuck Off As A Service | No | No | Unknown |
| [Forismatic](http://forismatic.com/en/api/) | Inspirational Quotes | No | No | Unknown |
| [icanhazdadjoke](https://icanhazdadjoke.com/api) | The largest selection of dad jokes on the internet | No | Yes | Unknown |
| [Inspiration](https://inspiration.goprogram.ai/docs/) | Motivational and Inspirational quotes | No | Yes | Yes |
| [kanye.rest](https://kanye.rest) | REST API for random Kanye West quotes | No | Yes | Yes |
| [kimiquotes](https://kimiquotes.herokuapp.com/doc) | Team radio and interview quotes by Finnish F1 legend Kimi Räikkönen | No | Yes | Yes |
| [Medium](https://github.com/Medium/medium-api-docs) | Community of readers and writers offering unique perspectives on ideas | `OAuth` | Yes | Unknown |
| [Programming Quotes](https://github.com/skolakoda/programming-quotes-api) | Programming Quotes API for open source projects | No | Yes | Unknown |
| [Quotable Quotes](https://github.com/lukePeavey/quotable) | Quotable is a free, open source quotations API | No | Yes | Unknown |
| [Quote Garden](https://pprathameshmore.github.io/QuoteGarden/) | REST API for more than 5000 famous quotes | No | Yes | Unknown |
| [quoteclear](https://quoteclear.web.app/) | Ever-growing list of James Clear quotes from the 3-2-1 Newsletter | No | Yes | Yes |
| [Quotes on Design](https://quotesondesign.com/api/) | Inspirational Quotes | No | Yes | Unknown |
| [Stoicism Quote](https://github.com/tlcheah2/stoic-quote-lambda-public-api) | Quotes about Stoicism | No | Yes | Unknown |
| [They Said So Quotes](https://theysaidso.com/api/) | Quotes Trusted by many fortune brands around the world | No | Yes | Unknown |
| [Traitify](https://app.traitify.com/developer) | Assess, collect and analyze Personality | No | Yes | Unknown |
| [Udemy(instructor)](https://www.udemy.com/developers/instructor/) | API for instructors on Udemy | `apiKey` | Yes | Unknown |
| [Vadivelu HTTP Codes](https://vadivelu.anoram.com/) | On demand HTTP Codes with images | No | Yes | No |
| [Zen Quotes](https://zenquotes.io/) | Large collection of Zen quotes for inspiration | No | Yes | Yes |

**[⬆ Back to Index](#index)**
<br >
<br >
### Phone
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Numverify](https://numverify.com?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Phone number validation | `apiKey` | Yes | Unknown |
| [Cloudmersive Validate](https://cloudmersive.com/phone-number-validation-API) | Validate international phone numbers | `apiKey` | Yes | Yes |
| [Phone Specification](https://github.com/azharimm/phone-specs-api) | Rest Api for Phone specifications | No | Yes | Yes |
| [Phone Validation](https://www.abstractapi.com/phone-validation-api) | Validate phone numbers globally | `apiKey` | Yes | Yes |
| [Veriphone](https://veriphone.io) | Phone number validation & carrier lookup | `apiKey` | Yes | Yes |

**[⬆ Back to Index](#index)**
<br >
<br >
### Photography
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Screenshotlayer](https://screenshotlayer.com?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | URL to screenshot | No | Yes | Unknown |
| [APITemplate.io](https://apitemplate.io) | Dynamically generate images and PDFs from templates with a simple API | `apiKey` | Yes | Yes |    
| [Bruzu](https://docs.bruzu.com) | Image generation with query string | `apiKey` | Yes | Yes |
| [CheetahO](https://cheetaho.com/docs/getting-started/) | Photo optimization and resize | `apiKey` | Yes | Unknown |
| [Dagpi](https://dagpi.xyz) | Image manipulation and processing | `apiKey` | Yes | Unknown |
| [Duply](https://duply.co/docs#getting-started-api) | Generate, Edit, Scale and Manage Images and Videos Smarter & Faster | `apiKey` | Yes | Yes |
| [DynaPictures](https://dynapictures.com/docs/) | Generate Hundreds of Personalized Images in Minutes | `apiKey` | Yes | Yes |
| [Flickr](https://www.flickr.com/services/api/) | Flickr Services | `OAuth` | Yes | Unknown |
| [Getty Images](http://developers.gettyimages.com/en/) | Build applications using the world's most powerful imagery | `OAuth` | Yes | Unknown |
| [Gfycat](https://developers.gfycat.com/api/) | Jiffier GIFs | `OAuth` | Yes | Unknown |
| [Giphy](https://developers.giphy.com/docs/) | Get all your gifs | `apiKey` | Yes | Unknown |
| [Google Photos](https://developers.google.com/photos) | Integrate Google Photos with your apps or devices | `OAuth` | Yes | Unknown |
| [Image Upload](https://apilayer.com/marketplace/image_upload-api) | Image Optimization | `apiKey` | Yes | Unknown |
| [Imgur](https://apidocs.imgur.com/) | Images | `OAuth` | Yes | Unknown |
| [Imsea](https://imsea.herokuapp.com/) | Free image search | No | Yes | Unknown |
| [Lorem Picsum](https://picsum.photos/) | Images from Unsplash | No | Yes | Unknown |
| [ObjectCut](https://objectcut.com/) | Image Background removal | `apiKey` | Yes | Yes |
| [Pexels](https://www.pexels.com/api/) | Free Stock Photos and Videos | `apiKey` | Yes | Yes |
| [PhotoRoom](https://www.photoroom.com/api/) | Remove background from images | `apiKey` | Yes | Unknown |
| [Pixabay](https://pixabay.com/sk/service/about/api/) | Photography | `apiKey` | Yes | Unknown |
| [PlaceKeanu](https://placekeanu.com/) | Resizable Keanu Reeves placeholder images with grayscale and young Keanu options | No | Yes | Unknown |
| [Readme typing SVG](https://github.com/DenverCoder1/readme-typing-svg) | Customizable typing and deleting text SVG | No | Yes | Unknown |
| [Remove.bg](https://www.remove.bg/api) | Image Background removal | `apiKey` | Yes | Unknown |
| [ReSmush.it](https://resmush.it/api) | Photo optimization | No | No | Unknown |
| [shutterstock](https://api-reference.shutterstock.com/) | Stock Photos and Videos | `OAuth` | Yes | Unknown |
| [Sirv](https://apidocs.sirv.com/) | Image management solutions like optimization, manipulation, hosting | `apiKey` | Yes | Unknown |
| [Unsplash](https://unsplash.com/developers) | Photography | `OAuth` | Yes | Unknown |
| [Wallhaven](https://wallhaven.cc/help/api) | Wallpapers | `apiKey` | Yes | Unknown |
| [Webdam](https://www.damsuccess.com/hc/en-us/articles/202134055-REST-API) | Images | `OAuth` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Programming
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Codeforces](https://codeforces.com/apiHelp) | Get access to Codeforces data | `apiKey` | Yes | Unknown |
| [Hackerearth](https://www.hackerearth.com/docs/wiki/developers/v4/) | For compiling and running code in several languages | `apiKey` | Yes | Unknown |
| [Judge0 CE](https://ce.judge0.com/) | Online code execution system | `apiKey` | Yes | Unknown |
| [KONTESTS](https://kontests.net/api) | For upcoming and ongoing competitive coding contests | No | Yes | Unknown |
| [Mintlify](https://docs.mintlify.com) | For programmatically generating documentation for code | `apiKey` | Yes | Yes |

**[⬆ Back to Index](#index)**
<br >
<br >
### Science & Math
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [arcsecond.io](https://api.arcsecond.io/) | Multiple astronomy data sources | No | Yes | Unknown |
| [arXiv](https://arxiv.org/help/api/user-manual) | Curated research-sharing platform: physics, mathematics, quantitative finance, and economics | No | Yes | Unknown |
| [CORE](https://core.ac.uk/services#api) | Access the world's Open Access research papers | `apiKey` | Yes | Unknown |
| [GBIF](https://www.gbif.org/developer/summary) | Global Biodiversity Information Facility | No | Yes | Yes |
| [iDigBio](https://github.com/idigbio/idigbio-search-api/wiki) | Access millions of museum specimens from organizations around the world | No | Yes | Unknown |
| [inspirehep.net](https://github.com/inspirehep/rest-api-doc) | High Energy Physics info. system | No | Yes | Unknown |
| [isEven (humor)](https://isevenapi.xyz/) | Check if a number is even | No | Yes | Unknown |
| [ISRO](https://isro.vercel.app) | ISRO Space Crafts Information | No | Yes | No |
| [ITIS](https://www.itis.gov/ws_description.html) | Integrated Taxonomic Information System | No | Yes | Unknown |
| [Launch Library 2](https://thespacedevs.com/llapi) | Spaceflight launches and events database | No | Yes | Yes |
| [Materials Platform for Data Science](https://mpds.io) | Curated experimental data for materials science | `apiKey` | Yes | No |
| [Minor Planet Center](http://www.asterank.com/mpc) | Asterank.com Information | No | No | Unknown |
| [NASA](https://api.nasa.gov) | NASA data, including imagery | No | Yes | No |
| [NASA ADS](https://ui.adsabs.harvard.edu/help/api/api-docs.html) | NASA Astrophysics Data System | `OAuth` | Yes | Yes |
| [Newton](https://newton.vercel.app) | Symbolic and Arithmetic Math Calculator | No | Yes | No |
| [Noctua](https://api.noctuasky.com/api/v1/swaggerdoc/) | REST API used to access NoctuaSky features | No | Yes | Unknown |
| [Numbers](https://math.tools/api/numbers/) | Number of the day, random number, number facts and anything else you want to do with numbers | `apiKey` | Yes | No |
| [Numbers](http://numbersapi.com) | Facts about numbers | No | No | No |
| [Ocean Facts](https://oceanfacts.herokuapp.com/) | Facts pertaining to the physical science of Oceanography | No | Yes | Unknown |
| [Open Notify](http://open-notify.org/Open-Notify-API/) | ISS astronauts, current location, etc | No | No | No |
| [Open Science Framework](https://developer.osf.io) | Repository and archive for study designs, research materials, data, manuscripts, etc | No | Yes | Unknown |
| [Purple Air](https://www2.purpleair.com/) | Real Time Air Quality Monitoring | No | Yes | Unknown |
| [Remote Calc](https://github.com/elizabethadegbaju/remotecalc) | Decodes base64 encoding and parses it to return a solution to the calculation in JSON | No | Yes | Yes |
| [SHARE](https://share.osf.io/api/v2/) | A free, open, dataset about research and scholarly activities | No | Yes | No |
| [SpaceX](https://github.com/r-spacex/SpaceX-API) | Company, vehicle, launchpad and launch data | No | Yes | No |
| [SpaceX](https://api.spacex.land/graphql/) | GraphQL, Company, Ships, launchpad and launch data | No | Yes | Unknown |
| [Sunrise and Sunset](https://sunrise-sunset.org/api) | Sunset and sunrise times for a given latitude and longitude | No | Yes | No |
| [Times Adder](https://github.com/FranP-code/API-Times-Adder) | With this API you can add each of the times introduced in the array sended | No | Yes | No |
| [TLE](https://tle.ivanstanojevic.me/#/docs) | Satellite information | No | Yes | No |
| [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/fdsnws/event/1/) | Earthquakes data real-time | No | Yes | No |
| [USGS Water Services](https://waterservices.usgs.gov/) | Water quality and level info for rivers and lakes | No | Yes | No |
| [World Bank](https://datahelpdesk.worldbank.org/knowledgebase/topics/125589) | World Data | No | Yes | No |
| [xMath](https://x-math.herokuapp.com/) | Random mathematical expressions | No | Yes | Yes |

**[⬆ Back to Index](#index)**
<br >
<br >
### Security
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Application Environment Verification](https://github.com/fingerprintjs/aev) | Android library and API to verify the safety of user devices, detect rooted devices and other risks | `apiKey` | Yes | Yes |
| [BinaryEdge](https://docs.binaryedge.io/api-v2.html) | Provide access to BinaryEdge 40fy scanning platform | `apiKey` | Yes | Yes |
| [BitWarden](https://bitwarden.com/help/api/) | Best open-source password manager | `OAuth` | Yes | Unknown |
| [Botd](https://github.com/fingerprintjs/botd) | Botd is a browser library for JavaScript bot detection | `apiKey` | Yes | Yes |
| [Bugcrowd](https://docs.bugcrowd.com/api/getting-started/) | Bugcrowd API for interacting and tracking the reported issues programmatically | `apiKey` | Yes | Unknown |
| [Censys](https://search.censys.io/api) | Search engine for Internet connected host and devices | `apiKey` | Yes | No |
| [Classify](https://classify-web.herokuapp.com/#/api) | Encrypting & decrypting text messages | No | Yes | Yes |
| [Complete Criminal Checks](https://completecriminalchecks.com/Developers) | Provides data of offenders from all U.S. States and Pureto Rico | `apiKey` | Yes | Yes |
| [CRXcavator](https://crxcavator.io/apidocs) | Chrome extension risk scoring | `apiKey` | Yes | Unknown |
| [Dehash.lt](https://github.com/Dehash-lt/api) | Hash decryption MD5, SHA1, SHA3, SHA256, SHA384, SHA512 | No | Yes | Unknown |
| [EmailRep](https://docs.emailrep.io/) | Email address threat and risk prediction | No | Yes | Unknown |
| [Escape](https://github.com/polarspetroll/EscapeAPI) | An API for escaping different kind of queries | No | Yes | No |
| [FilterLists](https://filterlists.com) | Lists of filters for adblockers and firewalls | No | Yes | Unknown |
| [FingerprintJS Pro](https://dev.fingerprintjs.com/docs) | Fraud detection API offering highly accurate browser fingerprinting | `apiKey` | Yes | Yes |
| [FraudLabs Pro](https://www.fraudlabspro.com/developer/api/screen-order) | Screen order information using AI to detect frauds | `apiKey` | Yes | Unknown |
| [FullHunt](https://api-docs.fullhunt.io/#introduction) | Searchable attack surface database of the entire internet | `apiKey` | Yes | Unknown |
| [GitGuardian](https://api.gitguardian.com/doc) | Scan files for secrets (API Keys, database credentials) | `apiKey` | Yes | No |
| [GreyNoise](https://docs.greynoise.io/reference/get_v3-community-ip) | Query IPs in the GreyNoise dataset and retrieve a subset of the full IP context data | `apiKey` | Yes | Unknown |
| [HackerOne](https://api.hackerone.com/) | The industry’s first hacker API that helps increase productivity towards creative bug bounty hunting | `apiKey` | Yes | Unknown |
| [Hashable](https://hashable.space/pages/api/) | A REST API to access high level cryptographic functions and methods | No | Yes | Yes |
| [HaveIBeenPwned](https://haveibeenpwned.com/API/v3) | Passwords which have previously been exposed in data breaches | `apiKey` | Yes | Unknown |
| [Intelligence X](https://github.com/IntelligenceX/SDK/blob/master/Intelligence%20X%20API.pdf) | Perform OSINT via Intelligence X | `apiKey` | Yes | Unknown |
| [LoginRadius](https://www.loginradius.com/docs/) | Managed User Authentication Service | `apiKey` | Yes | Yes |
| [Microsoft Security Response Center (MSRC)](https://msrc.microsoft.com/report/developer) | Programmatic interfaces to engage with the Microsoft Security Response Center (MSRC) | No | Yes | Unknown |
| [Mozilla http scanner](https://github.com/mozilla/http-observatory/blob/master/httpobs/docs/api.md) | Mozilla observatory http scanner | No | Yes | Unknown |
| [Mozilla tls scanner](https://github.com/mozilla/tls-observatory#api-endpoints) | Mozilla observatory tls scanner | No | Yes | Unknown |
| [National Vulnerability Database](https://nvd.nist.gov/vuln/Data-Feeds/JSON-feed-changelog) | U.S. National Vulnerability Database | No | Yes | Unknown |
| [Passwordinator](https://github.com/fawazsullia/password-generator/) | Generate random passwords of varying complexities | No | Yes | Yes |
| [PhishStats](https://phishstats.info/) | Phishing database | No | Yes | Unknown |
| [Privacy.com](https://privacy.com/developer/docs) | Generate merchant-specific and one-time use credit card numbers that link back to your bank | `apiKey` | Yes | Unknown |
| [Pulsedive](https://pulsedive.com/api/) | Scan, search and collect threat intelligence data in real-time | `apiKey` | Yes | Unknown |
| [SecurityTrails](https://securitytrails.com/corp/apidocs) | Domain and IP related information such as current and historical WHOIS and DNS records | `apiKey` | Yes | Unknown |
| [Shodan](https://developer.shodan.io/) | Search engine for Internet connected devices | `apiKey` | Yes | Unknown |
| [Spyse](https://spyse-dev.readme.io/reference/quick-start) | Access data on all Internet assets and build powerful attack surface management applications | `apiKey` | Yes | Unknown |
| [Threat Jammer](https://threatjammer.com/docs/index) | Risk scoring service from curated threat intelligence data | `apiKey` | Yes | Unknown |
| [UK Police](https://data.police.uk/docs/) | UK Police data | No | Yes | Unknown |
| [Virushee](https://api.virushee.com/) | Virushee file/data scanning | No | Yes | Yes |
| [VulDB](https://vuldb.com/?doc.api) | VulDB API allows to initiate queries for one or more items along with transactional bots | `apiKey` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Shopping
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Best Buy](https://bestbuyapis.github.io/api-documentation/#overview) | Products, Buying Options, Categories, Recommendations, Stores and Commerce | `apiKey` | Yes | Unknown |
| [Digi-Key](https://www.digikey.com/en/resources/api-solutions) | Retrieve price and inventory of electronic components as well as place orders | `OAuth` | Yes | Unknown |
| [Dummy Products](https://dummyproducts-api.herokuapp.com/) | An api to fetch dummy e-commerce products JSON data with placeholder images | `apiKey` | Yes | Yes |
| [eBay](https://developer.ebay.com/) | Sell and Buy on eBay | `OAuth` | Yes | Unknown |
| [Etsy](https://www.etsy.com/developers/documentation/getting_started/api_basics) | Manage shop and interact with listings | `OAuth` | Yes | Unknown |
| [Flipkart Marketplace](https://seller.flipkart.com/api-docs/FMSAPI.html) | Product listing management, Order Fulfilment in the Flipkart Marketplace | `OAuth` | Yes | Yes |
| [Lazada](https://open.lazada.com/doc/doc.htm) | Retrieve product ratings and seller performance metrics | `apiKey` | Yes | Unknown |
| [Mercadolibre](https://developers.mercadolibre.cl/es_ar/api-docs-es) | Manage sales, ads, products, services and Shops | `apiKey` | Yes | Unknown |
| [Octopart](https://octopart.com/api/v4/reference) | Electronic part data for manufacturing, design, and sourcing | `apiKey` | Yes | Unknown |
| [OLX Poland](https://developer.olx.pl/api/doc#section/) | Integrate with local sites by posting, managing adverts and communicating with OLX users | `apiKey` | Yes | Unknown |
| [Rappi](https://dev-portal.rappi.com/) | Manage orders from Rappi's app | `OAuth` | Yes | Unknown |
| [Shopee](https://open.shopee.com/documents?version=1) | Shopee's official API for integration of various services from Shopee | `apiKey` | Yes | Unknown |
| [Tokopedia](https://developer.tokopedia.com/openapi/guide/#/) | Tokopedia's Official API for integration of various services from Tokopedia | `OAuth` | Yes | Unknown |
| [WooCommerce](https://woocommerce.github.io/woocommerce-rest-api-docs/) | WooCommerce REST APIS to create, read, update, and delete data on wordpress website in JSON format | `apiKey` | Yes | Yes |

**[⬆ Back to Index](#index)**
<br >
<br >
<br >
<br >
### Social
API | Description | Auth | HTTPS | CORS |
|---|---|---|---|---|
| [4chan](https://github.com/4chan/4chan-API) | Simple image-based bulletin board dedicated to a variety of topics | No | Yes | Yes |
| [Ayrshare](https://www.ayrshare.com) | Social media APIs to post, get analytics, and manage multiple users social media accounts | `apiKey` | Yes | Yes |
| [aztro](https://aztro.sameerkumar.website/) | Daily horoscope info for yesterday, today, and tomorrow | No | Yes | Unknown |
| [Blogger](https://developers.google.com/blogger/) | The Blogger APIs allows client applications to view and update Blogger content | `OAuth` | Yes | Unknown |
| [Cisco Spark](https://developer.ciscospark.com) | Team Collaboration Software | `OAuth` | Yes | Unknown |
| [Dangerous Discord Database](https://discord.riverside.rocks/docs/index.php) | Database of malicious Discord accounts | `apiKey` | Yes | Unknown |
| [Discord](https://discord.com/developers/docs/intro) | Make bots for Discord, integrate Discord onto an external platform | `OAuth` | Yes | Unknown | | |
| [Disqus](https://disqus.com/api/docs/auth/) | Communicate with Disqus data | `OAuth` | Yes | Unknown |
| [Doge-Meme](https://api.doge-meme.lol/docs) | Top meme posts from r/dogecoin which include 'Meme' flair | No | Yes | Yes |
| [Facebook](https://developers.facebook.com/) | Facebook Login, Share on FB, Social Plugins, Analytics and more | `OAuth` | Yes | Unknown |
| [Foursquare](https://developer.foursquare.com/) | Interact with Foursquare users and places (geolocation-based checkins, photos, tips, events, etc) | `OAuth` | Yes | Unknown |
| [Fuck Off as a Service](https://www.foaas.com) | Asks someone to fuck off | No | Yes | Unknown |
| [Full Contact](https://docs.fullcontact.com/) | Get Social Media profiles and contact Information | `OAuth` | Yes | Unknown |
| [HackerNews](https://github.com/HackerNews/API) | Social news for CS and entrepreneurship | No | Yes | Unknown |
| [Hashnode](https://hashnode.com) | A blogging platform built for developers | No | Yes | Unknown |
| [Instagram](https://www.instagram.com/developer/) | Instagram Login, Share on Instagram, Social Plugins and more | `OAuth` | Yes | Unknown |
| [Kakao](https://developers.kakao.com/) | Kakao Login, Share on KakaoTalk, Social Plugins and more | `OAuth` | Yes | Unknown |
| [Lanyard](https://github.com/Phineas/lanyard) | Retrieve your presence on Discord through an HTTP REST API or WebSocket | No | Yes | Yes |
| [Line](https://developers.line.biz/) | Line Login, Share on Line, Social Plugins and more | `OAuth` | Yes | Unknown |
| [LinkedIn](https://docs.microsoft.com/en-us/linkedin/?context=linkedin/context) | The foundation of all digital integrations with LinkedIn | `OAuth` | Yes | Unknown |
| [Meetup.com](https://www.meetup.com/api/guide) | Data about Meetups from Meetup.com | `apiKey` | Yes | Unknown |
| [Microsoft Graph](https://docs.microsoft.com/en-us/graph/api/overview) | Access the data and intelligence in Microsoft 365, Windows 10, and Enterprise Mobility | `OAuth` | Yes | Unknown |
| [NAVER](https://developers.naver.com/main/) | NAVER Login, Share on NAVER, Social Plugins and more | `OAuth` | Yes | Unknown |
| [Open Collective](https://docs.opencollective.com/help/developers/api) | Get Open Collective data | No | Yes | Unknown |
| [Pinterest](https://developers.pinterest.com/) | The world's catalog of ideas | `OAuth` | Yes | Unknown |
| [Product Hunt](https://api.producthunt.com/v2/docs) | The best new products in tech | `OAuth` | Yes | Unknown |
| [Reddit](https://www.reddit.com/dev/api) | Homepage of the internet | `OAuth` | Yes | Unknown |
| [Revolt](https://developers.revolt.chat/api/) | Revolt open source Discord alternative | `apiKey` | Yes | Unknown |
| [Saidit](https://www.saidit.net/dev/api) | Open Source Reddit Clone | `OAuth` | Yes | Unknown |
| [Slack](https://api.slack.com/) | Team Instant Messaging | `OAuth` | Yes | Unknown |
| [TamTam](https://dev.tamtam.chat/) | Bot API to interact with TamTam | `apiKey` | Yes | Unknown |
| [Telegram Bot](https://core.telegram.org/bots/api) | Simplified HTTP version of the MTProto API for bots | `apiKey` | Yes | Unknown |
| [Telegram MTProto](https://core.telegram.org/api#getting-started) | Read and write Telegram data | `OAuth` | Yes | Unknown |
| [Telegraph](https://telegra.ph/api) | Create attractive blogs easily, to share | `apiKey` | Yes | Unknown |
| [TikTok](https://developers.tiktok.com/doc/login-kit-web) | Fetches user info and user's video posts on TikTok platform | `OAuth` | Yes | Unknown |
| [Trash Nothing](https://trashnothing.com/developer) | A freecycling community with thousands of free items posted every day | `OAuth` | Yes | Yes |
| [Tumblr](https://www.tumblr.com/docs/en/api/v2) | Read and write Tumblr Data | `OAuth` | Yes | Unknown |
| [Twitch](https://dev.twitch.tv/docs) | Game Streaming API | `OAuth` | Yes | Unknown |
| [Twitter](https://developer.twitter.com/en/docs) | Read and write Twitter data | `OAuth` | Yes | No |
| [vk](https://vk.com/dev/sites) | Read and write vk data | `OAuth` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Sports & Fitness
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [API-FOOTBALL](https://www.api-football.com/documentation-v3) | Get information about Football Leagues & Cups | `apiKey` | Yes | Yes |
| [ApiMedic](https://apimedic.com/) | ApiMedic offers a medical symptom checker API primarily for patients | `apiKey` | Yes | Unknown |
| [balldontlie](https://www.balldontlie.io) | Balldontlie provides access to stats data from the NBA | No | Yes | Yes |
| [Canadian Football League (CFL)](http://api.cfl.ca/) | Official JSON API providing real-time league, team and player statistics about the CFL | `apiKey` | Yes | No |
| [City Bikes](https://api.citybik.es/v2/) | City Bikes around the world | No | Yes | Unknown |
| [Cloudbet](https://www.cloudbet.com/api/) | Official Cloudbet API provides real-time sports odds and betting API to place bets programmatically | `apiKey` | Yes | Yes |
| [CollegeFootballData.com](https://collegefootballdata.com) | Unofficial detailed American college football statistics, records, and results API | `apiKey` | Yes | Unknown |
| [Ergast F1](http://ergast.com/mrd/) | F1 data from the beginning of the world championships in 1950 | No | Yes | Unknown |
| [Fitbit](https://dev.fitbit.com/) | Fitbit Information | `OAuth` | Yes | Unknown |
| [Football](https://rapidapi.com/GiulianoCrescimbeni/api/football98/) | A simple Open Source Football API to get squads’ stats, best scorers and more | `X-Mashape-Key` | Yes | Unknown |
| [Football (Soccer) Videos](https://www.scorebat.com/video-api/) | Embed codes for goals and highlights from Premier League, Bundesliga, Serie A and many more | No | Yes | Yes |
| [Football Standings](https://github.com/azharimm/football-standings-api) | Display football standings e.g epl, la liga, serie a etc. The data is based on espn site | No | Yes | Yes |
| [Football-Data](https://www.football-data.org) | Football data with matches info, players, teams, and competitions | `X-Mashape-Key` | Yes | Unknown |
| [JCDecaux Bike](https://developer.jcdecaux.com/) | JCDecaux's self-service bicycles | `apiKey` | Yes | Unknown |
| [MLB Records and Stats](https://appac.github.io/mlb-data-api-docs/) | Current and historical MLB statistics | No | No | Unknown |
| [NBA Data](https://rapidapi.com/api-sports/api/api-nba/) | All NBA Stats DATA, Games, Livescore, Standings, Statistics | `apiKey` | Yes | Unknown |
| [NBA Stats](https://any-api.com/nba_com/nba_com/docs/API_Description) | Current and historical NBA Statistics | No | Yes | Unknown |
| [NHL Records and Stats](https://gitlab.com/dword4/nhlapi) | NHL historical data and statistics | No | Yes | Unknown |
| [Oddsmagnet](https://data.oddsmagnet.com) | Odds history from multiple UK bookmakers | No | Yes | Yes |
| [OpenLigaDB](https://www.openligadb.de) | Crowd sourced sports league results | No | Yes | Yes |
| [Premier League Standings ](https://rapidapi.com/heisenbug/api/premier-league-live-scores/) | All Current Premier League Standings and Statistics | `apiKey` | Yes | Unknown |
| [Sport Data](https://sportdataapi.com) | Get sports data from all over the world | `apiKey` | Yes | Unknown |
| [Sport List & Data](https://developers.decathlon.com/products/sports) | List of and resources related to sports | No | Yes | Yes |
| [Sport Places](https://developers.decathlon.com/products/sport-places) | Crowd-source sports places around the world | No | Yes | No |
| [Sport Vision](https://developers.decathlon.com/products/sport-vision) | Identify sport, brands and gear in an image. Also does image sports captioning | `apiKey` | Yes | Yes |
| [Sportmonks Cricket](https://docs.sportmonks.com/cricket/) | Live cricket score, player statistics and fantasy API | `apiKey` | Yes | Unknown |
| [Sportmonks Football](https://docs.sportmonks.com/football/) | Football score/schedule, news api, tv channels, stats, history, display standing e.g. epl, la liga | `apiKey` | Yes | Unknown |
| [Squiggle](https://api.squiggle.com.au) | Fixtures, results and predictions for Australian Football League matches | No | Yes | Yes |
| [Strava](https://strava.github.io/api/) | Connect with athletes, activities and more | `OAuth` | Yes | Unknown |
| [SuredBits](https://suredbits.com/api/) | Query sports data, including teams, players, games, scores and statistics | No | No | No |
| [TheSportsDB](https://www.thesportsdb.com/api.php) | Crowd-Sourced Sports Data and Artwork | `apiKey` | Yes | Yes |
| [Tredict](https://www.tredict.com/blog/oauth_docs/) | Get and set activities, health data and more | `OAuth` | Yes | Unknown |
| [Wger](https://wger.de/en/software/api) | Workout manager data as exercises, muscles or equipment | `apiKey` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Test Data
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Bacon Ipsum](https://baconipsum.com/json-api/) | A Meatier Lorem Ipsum Generator | No | Yes | Unknown |
| [Dicebear Avatars](https://avatars.dicebear.com/) | Generate random pixel-art avatars | No | Yes | No |
| [English Random Words](https://random-words-api.vercel.app/word) | Generate English Random Words with Pronunciation | No | Yes | No |
| [FakeJSON](https://fakejson.com) | Service to generate test and fake data | `apiKey` | Yes | Yes |
| [FakerAPI](https://fakerapi.it/en) | APIs collection to get fake data | No | Yes | Yes |
| [FakeStoreAPI](https://fakestoreapi.com/) | Fake store rest API for your e-commerce or shopping website prototype | No | Yes | Unknown |
| [GeneradorDNI](https://api.generadordni.es) | Data generator API. Profiles, vehicles, banks and cards, etc | `apiKey` | Yes | Unknown |
| [ItsThisForThat](https://itsthisforthat.com/api.php) | Generate Random startup ideas | No | Yes | No |
| [JSONPlaceholder](http://jsonplaceholder.typicode.com/) | Fake data for testing and prototyping | No | No | Unknown |
| [Loripsum](http://loripsum.net/) | The "lorem ipsum" generator that doesn't suck | No | No | Unknown |
| [Mailsac](https://mailsac.com/docs/api) | Disposable Email | `apiKey` | Yes | Unknown |
| [Metaphorsum](http://metaphorpsum.com/) | Generate demo paragraphs giving number of words and sentences | No | No | Unknown |
| [Mockaroo](https://www.mockaroo.com/docs) | Generate fake data to JSON, CSV, TXT, SQL and XML | `apiKey` | Yes | Unknown |
| [QuickMocker](https://quickmocker.com) | API mocking tool to generate contextual, fake or random data | No | Yes | Yes |
| [Random Data](https://random-data-api.com) | Random data generator | No | Yes | Unknown |
| [Randommer](https://randommer.io/randommer-api) | Random data generator | `apiKey` | Yes | Yes |
| [RandomUser](https://randomuser.me) | Generates and list user data | No | Yes | Unknown |
| [RoboHash](https://robohash.org/) | Generate random robot/alien avatars | No | Yes | Unknown |
| [Spanish random names](https://random-names-api.herokuapp.com/public) | Generate spanish names (with gender) randomly | No | Yes | Unknown |
| [Spanish random words](https://palabras-aleatorias-public-api.herokuapp.com) | Generate spanish words randomly | No | Yes | Unknown |
| [This Person Does not Exist](https://thispersondoesnotexist.com) | Generates real-life faces of people who do not exist | No | Yes | Unknown |
| [Toolcarton](https://testimonialapi.toolcarton.com/) | Generate random testimonial data | No | Yes | Unknown |
| [UUID Generator](https://www.uuidtools.com/docs) | Generate UUIDs | No | Yes | No |
| [What The Commit](http://whatthecommit.com/index.txt) | Random commit message generator | No | No | Yes |
| [Yes No](https://yesno.wtf/api) | Generate yes or no randomly | No | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Text Analysis
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Code Detection API](https://codedetectionapi.runtime.dev) | Detect, label, format and enrich the code in your app or in your data pipeline | `OAuth` | Yes | Unknown |
| [apilayer languagelayer](https://languagelayer.com/) | Language Detection JSON API supporting 173 languages | `OAuth` | Yes | Unknown |
| [Aylien Text Analysis](https://docs.aylien.com/textapi/#getting-started) | A collection of information retrieval and natural language APIs | `apiKey` | Yes | Unknown |
| [Cloudmersive Natural Language Processing](https://www.cloudmersive.com/nlp-api) | Natural language processing and text analysis | `apiKey` | Yes | Yes |
| [Detect Language](https://detectlanguage.com/) | Detects text language | `apiKey` | Yes | Unknown |
| [ELI](https://nlp.insightera.co.th/docs/v1.0) | Natural Language Processing Tools for Thai Language | `apiKey` | Yes | Unknown |
| [Google Cloud Natural](https://cloud.google.com/natural-language/docs/) | Natural language understanding technology, including sentiment, entity and syntax analysis | `apiKey` | Yes | Unknown |
| [Hirak OCR](https://ocr.hirak.site/) | Image to text -text recognition- from image more than 100 language, accurate, unlimited requests | `apiKey` | Yes | Unknown |
| [Hirak Translation](https://translate.hirak.site/) | Translate between 21 of most used languages, accurate, unlimited requests | `apiKey` | Yes | Unknown |
| [Lecto Translation](https://rapidapi.com/lecto-lecto-default/api/lecto-translation/) | Translation API with free tier and reasonable prices | `apiKey` | Yes | Yes |
| [LibreTranslate](https://libretranslate.com/docs) | Translation tool with 17 available languages | No | Yes | Unknown |
| [Semantria](https://semantria.readme.io/docs) | Text Analytics with sentiment analysis, categorization & named entity extraction | `OAuth` | Yes | Unknown |
| [Sentiment Analysis](https://www.meaningcloud.com/developer/sentiment-analysis) | Multilingual sentiment analysis of texts from different sources | `apiKey` | Yes | Yes |
| [Tisane](https://tisane.ai/) | Text Analytics with focus on detection of abusive content and law enforcement applications | `OAuth` | Yes | Yes |
| [Watson Natural Language Understanding](https://cloud.ibm.com/apidocs/natural-language-understanding/natural-language-understanding) | Natural language processing for advanced text analysis | `OAuth` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Tracking
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Aftership](https://developers.aftership.com/reference/quick-start) | API to update, manage and track shipment efficiently | `apiKey` | Yes | Yes |
| [Correios](https://cws.correios.com.br/ajuda) | Integration to provide information and prepare shipments using Correio's services | `apiKey` | Yes | Unknown |
| [Pixela](https://pixe.la) | API for recording and tracking habits or effort, routines | `X-Mashape-Key` | Yes | Yes |
| [PostalPinCode](http://www.postalpincode.in/Api-Details) | API for getting Pincode details in India | No | Yes | Unknown |
| [Postmon](http://postmon.com.br) | An API to query Brazilian ZIP codes and orders easily, quickly and free | No | No | Unknown |
| [PostNord](https://developer.postnord.com/api) | Provides information about parcels in transport for Sweden and Denmark | `apiKey` | No | Unknown |
| [UPS](https://www.ups.com/upsdeveloperkit) | Shipment and Address information | `apiKey` | Yes | Unknown |
| [WeCanTrack](https://docs.wecantrack.com) | Automatically place subids in affiliate links to attribute affiliate conversions to click data | `apiKey` | Yes | Yes |
| [WhatPulse](https://developer.whatpulse.org/#web-api) | Small application that measures your keyboard/mouse usage | No | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Transportation
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [ADS-B Exchange](https://www.adsbexchange.com/data/) | Access real-time and historical data of any and all airborne aircraft | No | Yes | Unknown |
| [airportsapi](https://airport-web.appspot.com/api/docs/) | Get name and website-URL for airports by ICAO code | No | Yes | Unknown |
| [AIS Hub](http://www.aishub.net/api) | Real-time data of any marine and inland vessel equipped with AIS tracking system | `apiKey` | No | Unknown |
| [Amadeus for Developers](https://developers.amadeus.com/self-service) | Travel Search - Limited usage | `OAuth` | Yes | Unknown |
| [apilayer aviationstack](https://aviationstack.com/) | Real-time Flight Status & Global Aviation Data API | `OAuth` | Yes | Unknown |
| [AviationAPI](https://docs.aviationapi.com) | FAA Aeronautical Charts and Publications, Airport Information, and Airport Weather | No | Yes | No |
| [AZ511](https://www.az511.com/developers/doc) | Access traffic data from the ADOT API | `apiKey` | Yes | Unknown |
| [Bay Area Rapid Transit](http://api.bart.gov) | Stations and predicted arrivals for BART | `apiKey` | No | Unknown |
| [BC Ferries](https://www.bcferriesapi.ca) | Sailing times and capacities for BC Ferries | No | Yes | Yes |
| [BIC-Boxtech](https://docs.bic-boxtech.org/) | Container technical detail for the global container fleet | `OAuth` | Yes | Unknown |
| [BlaBlaCar](https://dev.blablacar.com) | Search car sharing trips | `apiKey` | Yes | Unknown |
| [Boston MBTA Transit](https://www.mbta.com/developers/v3-api) | Stations and predicted arrivals for MBTA | `apiKey` | Yes | Unknown |
| [Community Transit](https://github.com/transitland/transitland-datastore/blob/master/README.md#api-endpoints) | Transitland API | No | Yes | Unknown |
| [Compare Flight Prices](https://rapidapi.com/obryan-software-obryan-software-default/api/compare-flight-prices/) | API for comparing flight prices across platforms | `apiKey` | Yes | Unknown |
| [CTS](https://api.cts-strasbourg.eu/) | CTS Realtime API | `apiKey` | Yes | Yes |
| [Grab](https://developer.grab.com/docs/) | Track deliveries, ride fares, payments and loyalty points | `OAuth` | Yes | Unknown |
| [GraphHopper](https://docs.graphhopper.com/) | A-to-B routing with turn-by-turn instructions | `apiKey` | Yes | Unknown |
| [Icelandic APIs](http://docs.apis.is/) | Open APIs that deliver services in or regarding Iceland | No | Yes | Unknown |
| [Impala Hotel Bookings](https://docs.impala.travel/docs/booking-api/) | Hotel content, rates and room bookings | `apiKey` | Yes | No |
| [Izi](http://api-docs.izi.travel/) | Audio guide for travellers | `apiKey` | Yes | Unknown |
| [Land Transport Authority DataMall, Singapore](https://datamall.lta.gov.sg/content/dam/datamall/datasets/LTA_DataMall_API_User_Guide.pdf) | Singapore transport information | `apiKey` | No | Unknown |
| [Metro Lisboa](http://app.metrolisboa.pt/status/getLinhas.php) | Delays in subway lines | No | No | No |
| [Navitia](https://doc.navitia.io/) | The open API for building cool stuff with transport data | `apiKey` | Yes | Unknown |
| [Open Charge Map](https://openchargemap.org/site/develop/api) | Global public registry of electric vehicle charging locations | `apiKey` | Yes | Yes |
| [OpenSky Network](https://opensky-network.org/apidoc/index.html) | Free real-time ADS-B aviation data | No | Yes | Unknown |
| [Railway Transport for France](https://www.digital.sncf.com/startup/api) | SNCF public API | `apiKey` | Yes | Unknown |
| [REFUGE Restrooms](https://www.refugerestrooms.org/api/docs/#!/restrooms) | Provides safe restroom access for transgender, intersex and gender nonconforming individuals | No | Yes | Unknown |
| [Sabre for Developers](https://developer.sabre.com/guides/travel-agency/quickstart/getting-started-in-travel) | Travel Search - Limited usage | `apiKey` | Yes | Unknown |
| [Schiphol Airport](https://developer.schiphol.nl/) | Schiphol | `apiKey` | Yes | Unknown |
| [Tankerkoenig](https://creativecommons.tankerkoenig.de/swagger/) | German realtime gas/diesel prices | `apiKey` | Yes | Yes |
| [TransitLand](https://www.transit.land/documentation/datastore/api-endpoints.html) | Transit Aggregation | No | Yes | Unknown |
| [Transport for Atlanta, US](http://www.itsmarta.com/app-developer-resources.aspx) | Marta | No | No | Unknown |
| [Transport for Auckland, New Zealand](https://dev-portal.at.govt.nz/) | Auckland Transport | No | Yes | Unknown |
| [Transport for Belgium](https://docs.irail.be/) | The iRail API is a third-party API for Belgian public transport by train | No | Yes | Yes |
| [Transport for Berlin, Germany](https://github.com/derhuerst/vbb-rest/blob/3/docs/index.md) | Third-party VBB API | No | Yes | Unknown |
| [Transport for Bordeaux, France](https://opendata.bordeaux-metropole.fr/explore/) | Bordeaux Métropole public transport and more (France) | `apiKey` | Yes | Unknown |
| [Transport for Budapest, Hungary](https://bkkfutar.docs.apiary.io) | Budapest public transport API | No | Yes | Unknown |
| [Transport for Chicago, US](http://www.transitchicago.com/developers/) | Chicago Transit Authority (CTA) | `apiKey` | No | Unknown |
| [Transport for Czech Republic](https://www.chaps.cz/eng/products/idos-internet) | Czech transport API | No | Yes | Unknown |
| [Transport for Denver, US](http://www.rtd-denver.com/gtfs-developer-guide.shtml) | RTD | No | No | Unknown |
| [Transport for Finland](https://digitransit.fi/en/developers/ ) | Finnish transport API | No | Yes | Unknown |
| [Transport for Germany](http://data.deutschebahn.com/dataset/api-fahrplan) | Deutsche Bahn (DB) API | `apiKey` | No | Unknown |
| [Transport for Grenoble, France](https://www.mobilites-m.fr/pages/opendata/OpenDataApi.html) | Grenoble public transport | No | No | No |
| [Transport for Hessen, Germany](https://opendata.rmv.de/site/start.html) | RMV API (Public Transport in Hessen) | No | Yes | Unknown |
| [Transport for Honolulu, US](http://hea.thebus.org/api_info.asp) | Honolulu Transportation Information | `apiKey` | No | Unknown |
| [Transport for Lisbon, Portugal](https://emel.city-platform.com/opendata/) | Data about buses routes, parking and traffic | `apiKey` | Yes | Unknown |
| [Transport for London, England](https://api.tfl.gov.uk) | TfL API | `apiKey` | Yes | Unknown |
| [Transport for Los Angeles, US](https://developer.metro.net/api/) | Data about positions of Metro vehicles in real time and travel their routes | No | Yes | Unknown |
| [Transport for Manchester, England](https://developer.tfgm.com/) | TfGM transport network data | `apiKey` | Yes | No |
| [Transport for Norway](https://developer.entur.org/) | Transport APIs and dataset for Norway | No | Yes | Unknown |
| [Transport for Ottawa, Canada](https://www.octranspo.com/en/plan-your-trip/travel-tools/developers) | OC Transpo API | `apiKey` | Yes | Unknown |
| [Transport for Paris, France](http://data.ratp.fr/api/v1/console/datasets/1.0/search/) | RATP Open Data API | No | No | Unknown |
| [Transport for Philadelphia, US](http://www3.septa.org/hackathon/) | SEPTA APIs | No | No | Unknown |
| [Transport for Sao Paulo, Brazil](http://www.sptrans.com.br/desenvolvedores/api-do-olho-vivo-guia-de-referencia/documentacao-api/) | SPTrans | `OAuth` | No | Unknown |
| [Transport for Spain](https://data.renfe.com/api/1/util/snippet/api_info.html?resource_id=a2368cff-1562-4dde-8466-9635ea3a572a) | Public trains of Spain | No | Yes | Unknown |
| [Transport for Sweden](https://www.trafiklab.se/api) | Public Transport consumer | `OAuth` | Yes | Unknown |
| [Transport for Switzerland](https://opentransportdata.swiss/en/) | Official Swiss Public Transport Open Data | `apiKey` | Yes | Unknown |
| [Transport for Switzerland](https://transport.opendata.ch/) | Swiss public transport API | No | Yes | Unknown |
| [Transport for The Netherlands](http://www.ns.nl/reisinformatie/ns-api) | NS, only trains | `apiKey` | No | Unknown |
| [Transport for The Netherlands](https://github.com/skywave/KV78Turbo-OVAPI/wiki) | OVAPI, country-wide public transport | No | Yes | Unknown |
| [Transport for Toronto, Canada](https://myttc.ca/developers) | TTC | No | Yes | Unknown |
| [Transport for UK](https://developer.transportapi.com) | Transport API and dataset for UK | `apiKey` | Yes | Unknown |
| [Transport for United States](https://retro.umoiq.com/xmlFeedDocs/NextBusXMLFeed.pdf) | NextBus API | No | No | Unknown |
| [Transport for Vancouver, Canada](https://developer.translink.ca/) | TransLink | `OAuth` | Yes | Unknown |
| [Transport for Washington, US](https://developer.wmata.com/) | Washington Metro transport API | `OAuth` | Yes | Unknown |
| [transport.rest](https://transport.rest) | Community maintained, developer-friendly public transport API | No | Yes | Yes |
| [Tripadvisor](https://developer-tripadvisor.com/home/) | Rating content for a hotel, restaurant, attraction or destination | `apiKey` | Yes | Unknown |
| [Uber](https://developer.uber.com/products) | Uber ride requests and price estimation | `OAuth` | Yes | Yes |
| [Velib metropolis, Paris, France](https://www.velib-metropole.fr/donnees-open-data-gbfs-du-service-velib-metropole) | Velib Open Data API | No | Yes | No |

**[⬆ Back to Index](#index)**
<br >
<br >
### URL Shorteners
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [1pt](https://github.com/1pt-co/api/blob/main/README.md) | A simple URL shortener | No | Yes | Yes |
| [Bitly](http://dev.bitly.com/get_started.html) | URL shortener and link management | `OAuth` | Yes | Unknown |
| [CleanURI](https://cleanuri.com/docs) | URL shortener service | No | Yes | Yes |
| [ClickMeter](https://support.clickmeter.com/hc/en-us/categories/201474986) | Monitor, compare and optimize your marketing links | `apiKey` | Yes | Unknown |
| [Clico](https://cli.com/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config) | URL shortener service | `apiKey` | Yes | Unknown |
| [Cutt.ly](https://cutt.ly/api-documentation/cuttly-links-api) | URL shortener service | `apiKey` | Yes | Unknown |
| [Drivet URL Shortener](https://wiki.drivet.xyz/en/url-shortener/add-links) | Shorten a long URL easily and fast | No | Yes | Unknown |
| [Free Url Shortener](https://ulvis.net/developer.html) | Free URL Shortener offers a powerful API to interact with other sites | No | Yes | Unknown |
| [Git.io](https://github.blog/2011-11-10-git-io-github-url-shortener/) | Git.io URL shortener | No | Yes | Unknown |
| [GoTiny](https://github.com/robvanbakel/gotiny-api) | A lightweight URL shortener, focused on ease-of-use for the developer and end-user | No | Yes | Yes |
| [Kutt](https://docs.kutt.it/) | Free Modern URL Shortener | `apiKey` | Yes | Yes |
| [Mgnet.me](http://mgnet.me/api.html) | Torrent URL shorten API | No | Yes | No |
| [owo](https://owo.vc/api) | A simple link obfuscator/shortener | No | Yes | Unknown |
| [Rebrandly](https://developers.rebrandly.com/v1/docs) | Custom URL shortener for sharing branded links | `apiKey` | Yes | Unknown |
| [Short Link](https://github.com/FayasNoushad/Short-Link-API) | Short URLs support so many domains | No | Yes | Unknown |
| [Shrtcode](https://shrtco.de/docs) | URl Shortener with multiple Domains | No | Yes | Yes |
| [Shrtlnk](https://shrtlnk.dev/developer) | Simple and efficient short link creation | `apiKey` | Yes | Yes |
| [TinyURL](https://tinyurl.com/app/dev) | Shorten long URLs | `apiKey` | Yes | No |
| [UrlBae](https://urlbae.com/developers) | Simple and efficient short link creation | `apiKey` | Yes | Yes |

**[⬆ Back to Index](#index)**
<br >
<br >
### Vehicle
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Brazilian Vehicles and Prices](https://deividfortuna.github.io/fipe/) | Vehicles information from Fundação Instituto de Pesquisas Econômicas - Fipe | No | Yes | No |
| [Helipaddy sites](https://helipaddy.com/api/) | Helicopter and passenger drone landing site directory, Helipaddy data and much more | `apiKey` | Yes | Unknown |
| [Kelley Blue Book](http://developer.kbb.com/#!/data/1-Default) | Vehicle info, pricing, configuration, plus much more | `apiKey` | Yes | No |
| [Mercedes-Benz](https://developer.mercedes-benz.com/apis) | Telematics data, remotely access vehicle functions, car configurator, locate service dealers | `apiKey` | Yes | No |
| [NHTSA](https://vpic.nhtsa.dot.gov/api/) | NHTSA Product Information Catalog and Vehicle Listing | No | Yes | Unknown |
| [Smartcar](https://smartcar.com/docs/) | Lock and unlock vehicles and get data like odometer reading and location. Works on most new cars | `OAuth` | Yes | Yes |

**[⬆ Back to Index](#index)**
<br >
<br >
### Video
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [An API of Ice And Fire](https://anapioficeandfire.com/) | Game Of Thrones API | No | Yes | Unknown |
| [Bob's Burgers](https://bobs-burgers-api-ui.herokuapp.com) | Bob's Burgers API | No | Yes | Yes |
| [Breaking Bad](https://breakingbadapi.com/documentation) | Breaking Bad API | No | Yes | Unknown |
| [Breaking Bad Quotes](https://github.com/shevabam/breaking-bad-quotes) | Some Breaking Bad quotes | No | Yes | Unknown |
| [Catalogopolis](https://api.catalogopolis.xyz/docs/) | Doctor Who API | No | Yes | Unknown |
| [Catch The Show](https://catchtheshow.herokuapp.com/api/documentation) | REST API for next-episode.net | No | Yes | Unknown |
| [Czech Television](http://www.ceskatelevize.cz/xml/tv-program/) | TV programme of Czech TV | No | No | Unknown |
| [Dailymotion](https://developer.dailymotion.com/) | Dailymotion Developer API | `OAuth` | Yes | Unknown |
| [Dune](https://github.com/ywalia01/dune-api) | A simple API which provides you with book, character, movie and quotes JSON data | No | Yes | Yes |
| [Final Space](https://finalspaceapi.com/docs/) | Final Space API | No | Yes | Yes |
| [Game of Thrones Quotes](https://gameofthronesquotes.xyz/) | Some Game of Thrones quotes | No | Yes | Unknown |
| [Harry Potter Charactes](https://hp-api.herokuapp.com/) | Harry Potter Characters Data with with imagery | No | Yes | Unknown |
| [IMDb-API](https://imdb-api.com/) | API for receiving movie, serial and cast information | `apiKey` | Yes | Unknown |
| [IMDbOT](https://github.com/SpEcHiDe/IMDbOT) | Unofficial IMDb Movie / Series Information | No | Yes | Yes |
| [JSON2Video](https://json2video.com) | Create and edit videos programmatically: watermarks,resizing,slideshows,voice-over,text animations | `apiKey` | Yes | No |
| [Lucifer Quotes](https://github.com/shadowoff09/lucifer-quotes) | Returns Lucifer quotes | No | Yes | Unknown |
| [MCU Countdown](https://github.com/DiljotSG/MCU-Countdown) | A Countdown to the next MCU Film | No | Yes | Yes |
| [Motivational Quotes](https://nodejs-quoteapp.herokuapp.com/) | Random Motivational Quotes | No | Yes | Unknown |
| [Movie Quote](https://github.com/F4R4N/movie-quote/) | Random Movie and Series Quotes | No | Yes | Yes |
| [Open Movie Database](http://www.omdbapi.com/) | Movie information | `apiKey` | Yes | Unknown |
| [Owen Wilson Wow](https://owen-wilson-wow-api.herokuapp.com) | API for actor Owen Wilson's "wow" exclamations in movies | No | Yes | Yes |
| [Ron Swanson Quotes](https://github.com/jamesseanwright/ron-swanson-quotes#ron-swanson-quotes-api) | Television | No | Yes | Unknown |
| [Simkl](https://simkl.docs.apiary.io) | Movie, TV and Anime data | `apiKey` | Yes | Unknown |
| [STAPI](http://stapi.co) | Information on all things Star Trek | No | No | No |
| [Stranger Things Quotes](https://github.com/shadowoff09/strangerthings-quotes) | Returns Stranger Things quotes | No | Yes | Unknown |
| [Stream](https://api.stream.cz/graphiql) | Czech internet television, films, series and online videos for free | No | Yes | No |
| [Stromberg Quotes](https://www.stromberg-api.de/) | Returns Stromberg quotes and more | No | Yes | Unknown |
| [SWAPI](https://swapi.dev/) | All the Star Wars data you've ever wanted | No | Yes | Yes |
| [SWAPI](https://www.swapi.tech) | All things Star Wars | No | Yes | Yes |
| [SWAPI GraphQL](https://graphql.org/swapi-graphql) | Star Wars GraphQL API | No | Yes | Unknown |
| [The Lord of the Rings](https://the-one-api.dev/) | The Lord of the Rings API | `apiKey` | Yes | Unknown |
| [The Vampire Diaries](https://vampire-diaries-api.netlify.app/) | TV Show Data | `apiKey` | Yes | Yes |
| [ThronesApi](https://thronesapi.com/) | Game Of Thrones Characters Data with imagery | No | Yes | Unknown |
| [TMDb](https://www.themoviedb.org/documentation/api) | Community-based movie data | `apiKey` | Yes | Unknown |
| [TrailerAddict](https://www.traileraddict.com/trailerapi) | Easily embed trailers from TrailerAddict | `apiKey` | No | Unknown |    
| [Trakt](https://trakt.docs.apiary.io/) | Movie and TV Data | `apiKey` | Yes | Yes |
| [TVDB](https://thetvdb.com/api-information) | Television data | `apiKey` | Yes | Unknown |
| [TVMaze](http://www.tvmaze.com/api) | TV Show Data | No | No | Unknown |
| [uNoGS](https://rapidapi.com/unogs/api/unogsng) | Unofficial Netflix Online Global Search, Search all netflix regions in one place | `apiKey` | Yes | Yes |
| [Vimeo](https://developer.vimeo.com/) | Vimeo Developer API | `OAuth` | Yes | Unknown |
| [Watchmode](https://api.watchmode.com/) | API for finding out the streaming availability of movies & shows | `apiKey` | Yes | Unknown |
| [Web Series Quotes Generator](https://github.com/yogeshwaran01/web-series-quotes) | API generates various Web Series Quote Images | No | Yes | Yes |
| [YouTube](https://developers.google.com/youtube/) | Add YouTube functionality to your sites and apps | `OAuth` | Yes | Unknown |

**[⬆ Back to Index](#index)**
<br >
<br >
### Weather
API | Description | Auth | HTTPS | CORS |
|:---|:---|:---|:---|:---|
| [Weatherstack](https://weatherstack.com/?utm_source=Github&utm_medium=Referral&utm_campaign=Public-apis-repo-Best-sellers) | Real-Time & Historical World Weather Data API | `apiKey` | Yes | Unknown |
| [7Timer!](http://www.7timer.info/doc.php?lang=en) | Weather, especially for Astroweather | No | No | Unknown |
| [AccuWeather](https://developer.accuweather.com/apis) | Weather and forecast data | `apiKey` | No | Unknown |
| [Aemet](https://opendata.aemet.es/centrodedescargas/inicio) | Weather and forecast data from Spain | `apiKey` | Yes | Unknown |
| [APIXU](https://www.apixu.com/doc/request.aspx) | Weather | `apiKey` | Yes | Unknown |
| [AQICN](https://aqicn.org/api/) | Air Quality Index Data for over 1000 cities | `apiKey` | Yes | Unknown |
| [AviationWeather](https://www.aviationweather.gov/dataserver) | NOAA aviation weather forecasts and observations | No | Yes | Unknown |
| [ColorfulClouds](https://open.caiyunapp.com/ColorfulClouds_Weather_API) | Weather | `apiKey` | Yes | Yes |
| [Euskalmet](https://opendata.euskadi.eus/api-euskalmet/-/api-de-euskalmet/) | Meteorological data of the Basque Country | `apiKey` | Yes | Unknown |
| [Foreca](https://developer.foreca.com) | Weather | `OAuth` | Yes | Unknown |
| [HG Weather](https://hgbrasil.com/status/weather) | Provides weather forecast data for cities in Brazil | `apiKey` | Yes | Yes |
| [Hong Kong Obervatory](https://www.hko.gov.hk/en/abouthko/opendata_intro.htm) | Provide weather information, earthquake information, and climate data | No | Yes | Unknown |
| [MetaWeather](https://www.metaweather.com/api/) | Weather | No | Yes | No |
| [Meteorologisk Institutt](https://api.met.no/weatherapi/documentation) | Weather and climate data | `User-Agent` | Yes | Unknown |
| [Micro Weather](https://m3o.com/weather/api) | Real time weather forecasts and historic data | `apiKey` | Yes | Unknown |
| [ODWeather](http://api.oceandrivers.com/static/docs.html) | Weather and weather webcams | No | No | Unknown |
| [Oikolab](https://docs.oikolab.com) | 70+ years of global, hourly historical and forecast weather data from NOAA and ECMWF | `apiKey` | Yes | Yes |
| [Open-Meteo](https://open-meteo.com/) | Global weather forecast API for non-commercial use | No | Yes | Yes |
| [openSenseMap](https://api.opensensemap.org/) | Data from Personal Weather Stations called senseBoxes | No | Yes | Yes |
| [OpenUV](https://www.openuv.io) | Real-time UV Index Forecast | `apiKey` | Yes | Unknown |
| [OpenWeatherMap](https://openweathermap.org/api) | Weather | `apiKey` | Yes | Unknown |
| [QWeather](https://dev.qweather.com/en/) | Location-based weather data | `apiKey` | Yes | Yes |
| [RainViewer](https://www.rainviewer.com/api.html) | Radar data collected from different websites across the Internet | No | Yes | Unknown |
| [Storm Glass](https://stormglass.io/) | Global marine weather from multiple sources | `apiKey` | Yes | Yes |
| [Tomorrow](https://docs.tomorrow.io) | Weather API Powered by Proprietary Technology | `apiKey` | Yes | Unknown |
| [US Weather](https://www.weather.gov/documentation/services-web-api) | US National Weather Service | No | Yes | Yes |
| [Visual Crossing](https://www.visualcrossing.com/weather-api) | Global historical and weather forecast data | `apiKey` | Yes | Yes |
| [weather-api](https://github.com/robertoduessmann/weather-api) | A RESTful free API to check the weather | No | Yes | No |
| [WeatherAPI](https://www.weatherapi.com/) | Weather API with other stuff like Astronomy and Geolocation API | `apiKey` | Yes | Yes |
| [Weatherbit](https://www.weatherbit.io/api) | Weather | `apiKey` | Yes | Unknown |
| [Yandex.Weather](https://yandex.com/dev/weather/) | Assesses weather condition in specific locations | `apiKey` | Yes | No |

**[⬆ Back to Index](#index)**
<br >
<br >

<br>

## License
[MIT](LICENSE) (c) 2022 public-apis
OMDb API
Usage
Parameters
Examples
Change Log
API Key
Become a Patron
Donate
Contact
OMDb API
The Open Movie Database

The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.

If you find this service useful, please consider making a one-time donation or become a patron.


Poster API
The Poster API is only available to patrons.

Currently over 280,000 posters, updated daily with resolutions up to 2000x3000.

×
My Tesla Referral Link

Sponsors
Emby, Trakt, FileBot, Reelgood, Xirvik Servers, Yidio, mi.tv, Couchpop, Edu Reviewer, Flixboss, Scripts on Screen, Topagency.webflow.io, Ramotion.com, Phone Trackers, Classics on DVD, Streaming App, How to make a FinTech app, Vid2 - Create movie lists with AI, Popflick, Custom Couch, TV.GURU, Deploy Vision - Nearshore Software Development, Phictly, DoMyEssay, EssayPro, HomeworkGuy, The Streaming Codex, WriteMyEssay
Usage
Send all data requests to:

http://www.omdbapi.com/?apikey=[yourkey]&

Poster API requests:

http://img.omdbapi.com/?apikey=[yourkey]&
Parameters
By ID or Title
Parameter	Required	Valid Options	Default Value	Description
i	Optional*		<empty>	A valid IMDb ID (e.g. tt1285016)
t	Optional*		<empty>	Movie title to search for.
type	No	movie, series, episode	<empty>	Type of result to return.
y	No		<empty>	Year of release.
plot	No	short, full	short	Return short or full plot.
r	No	json, xml	json	The data type to return.
callback	No		<empty>	JSONP callback name.
v	No		1	API version (reserved for future use).
*Please note while both "i" and "t" are optional at least one argument is required.
By Search
Parameter	Required	Valid options	Default Value	Description
s	Yes		<empty>	Movie title to search for.
type	No	movie, series, episode	<empty>	Type of result to return.
y	No		<empty>	Year of release.
r	No	json, xml	json	The data type to return.
page New!	No	1-100	1	Page number to return.
callback	No		<empty>	JSONP callback name.
v	No		1	API version (reserved for future use).
Examples
By Title
Title: 
    Year: 
    Plot: 
Short
    Response: 
JSON
    Search Reset
By ID
ID: 
IMDb ID
    Plot: 
Short
    Response: 
JSON
    Search Reset
Change Log
04/08/19
Added support for eight digit IMDb IDs.
01/20/19
Supressed adult content from search results.
01/20/19
Added Swagger files (YAML, JSON) to expose current API abilities and upcoming REST functions.
11/02/17
FREE KEYS! The "open" API is finally open again!
08/20/17
I created a GitHub repository for tracking bugs.
05/10/17
Due to some security concerns on how the keys were being distributed I updated the form to email them and also changed the algorithm used, which means your older keys not obtained through email will eventually stop working.
01/12/17
Removed single character restriction from title/search results.
06/11/16
"totalSeasons" count has been added to series results.
1/20/16
To accommodate search paging "totalResults" is now returned at the root level.
12/12/15
Search pagination added: http://www.omdbapi.com/?s=Batman&page=2
11/16/15
Season+Episode now works with "i" parameter: http://www.omdbapi.com/?i=tt0944947&Season=1
Fixed the max pool size connection issues.
10/18/15
You can now return all episodes by using just the "Season" parameter: http://www.omdbapi.com/?t=Game of Thrones&Season=1
9/9/15
New server is up, response times should be < 500ms.
Setup a CDN/Caching service with CloudFlare
8/15/15
Created and Fixed a bad parsing error with JSON response. -Sorry about that!
HTTPS (with TLS) is now active: https://www.omdbapi.com/
5/10/15
Season+Episode search parameters added: http://www.omdbapi.com/?t=Game of Thrones&Season=1&Episode=1
Back to topLegalDonate
API by Brian Fritz.

All content licensed under CC BY-NC 4.0.

This site is not endorsed by or affiliated with IMDb.com.



Tastedive API is now avaliable!

Check it out!
×
Find something great
Join
|
Sign in
music
movies
shows
books
games
podcasts
people
places
brands
Lists
Tastebuds
TV
API
As of 2019, TasteDive has joined forces with Qloo to bring the best privacy-centric taste-based personalization to developers and enterprises.

For information on the most up to date API, please visit Qloo.com.

Please see below for the legacy TasteDive API, which will continue to be supported until full migration occurs.

ACCESS
Feel free to make a few requests to experiment with the API. If you decide to use it, you have to request an access key. Using this key, you can perform 300 requests per hour.

BASE ENDPOINT AND EXAMPLE
This retrieves recommendations for Red Hot Chili Peppers and Pulp Fiction:

https://tastedive.com/api/similar?q=red+hot+chili+peppers%2C+pulp+fiction&type=music

PARAMETERS
q: the search query; consists of a series (at least one) of music, movie, show, podcast, book, game, person, place, brand separated by commas. Sometimes it is useful to specify the type of a certain resource in the query (e.g. if a movie and a book share the same title). You can do this by using the "music:", "movie:", "show:", "podcast:", "book:", "game:" "person:", "place:", "brand:" operators, for example: "music:underworld, movie:harry potter, book:trainspotting". Don't forget to encode this parameter.
type: query type, specifies the desired type of results. It can be one of the following: music, movie, show, podcast, book, game, person, place, brand. This param is required.
info: when set to 1, additional information is provided for the recommended items, like a description and a related Youtube clip (when available). Default is 0.
limit: maximum number of recommendations to retrieve. Default is 20.
slimit: maximum number of search results to retrieve for each query item. Should be between 1 and 3.
k: Your API access key.
RESPONSE
The output of the API uses the JSON format.

The returned object contains, under the Similar key, the item(s) that were searched for (a list in the Info key) and the recommended items (a list in the Results key). Each item in a list has the Name and Type keys. The type can be music, movie, show, book, game, person, place, brand.

When verbose=1 in the request, each item can also contains the following additional keys:

wTeaser: item description
wUrl: item Wikipedia URL
yUrl: item Youtube clip URL
yID: item Youtube clip ID
QUESTIONS?
If you have questions, please contact us.

About TasteDive
Contact
API Usage
Terms of Service
API Terms of Service
Privacy Policy
AI Model Governance Privacy
Facebook icon
Twitter icon
Instagram icon
By clicking “Accept All Cookies”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.
Cookies Settings Reject All Accept All Cookies

OMDb API
Usage
Parameters
Examples
Change Log
API Key
Become a Patron
Donate
Contact
OMDb API
The Open Movie Database

The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.

If you find this service useful, please consider making a one-time donation or become a patron.


Poster API
The Poster API is only available to patrons.

Currently over 280,000 posters, updated daily with resolutions up to 2000x3000.

×
My Tesla Referral Link

Sponsors
Emby, Trakt, FileBot, Reelgood, Xirvik Servers, Yidio, mi.tv, Couchpop, Edu Reviewer, Flixboss, Scripts on Screen, Topagency.webflow.io, Ramotion.com, Phone Trackers, Classics on DVD, Streaming App, How to make a FinTech app, Vid2 - Create movie lists with AI, Popflick, Custom Couch, TV.GURU, Deploy Vision - Nearshore Software Development, Phictly, DoMyEssay, EssayPro, HomeworkGuy, The Streaming Codex, WriteMyEssay
Usage
Send all data requests to:

http://www.omdbapi.com/?apikey=[yourkey]&

Poster API requests:

http://img.omdbapi.com/?apikey=[yourkey]&
Parameters
By ID or Title
Parameter	Required	Valid Options	Default Value	Description
i	Optional*		<empty>	A valid IMDb ID (e.g. tt1285016)
t	Optional*		<empty>	Movie title to search for.
type	No	movie, series, episode	<empty>	Type of result to return.
y	No		<empty>	Year of release.
plot	No	short, full	short	Return short or full plot.
r	No	json, xml	json	The data type to return.
callback	No		<empty>	JSONP callback name.
v	No		1	API version (reserved for future use).
*Please note while both "i" and "t" are optional at least one argument is required.
By Search
Parameter	Required	Valid options	Default Value	Description
s	Yes		<empty>	Movie title to search for.
type	No	movie, series, episode	<empty>	Type of result to return.
y	No		<empty>	Year of release.
r	No	json, xml	json	The data type to return.
page New!	No	1-100	1	Page number to return.
callback	No		<empty>	JSONP callback name.
v	No		1	API version (reserved for future use).
Examples
By Title
Title: 
    Year: 
    Plot: 
Short
    Response: 
JSON
    Search Reset
By ID
ID: 
IMDb ID
    Plot: 
Short
    Response: 
JSON
    Search Reset
Change Log
04/08/19
Added support for eight digit IMDb IDs.
01/20/19
Supressed adult content from search results.
01/20/19
Added Swagger files (YAML, JSON) to expose current API abilities and upcoming REST functions.
11/02/17
FREE KEYS! The "open" API is finally open again!
08/20/17
I created a GitHub repository for tracking bugs.
05/10/17
Due to some security concerns on how the keys were being distributed I updated the form to email them and also changed the algorithm used, which means your older keys not obtained through email will eventually stop working.
01/12/17
Removed single character restriction from title/search results.
06/11/16
"totalSeasons" count has been added to series results.
1/20/16
To accommodate search paging "totalResults" is now returned at the root level.
12/12/15
Search pagination added: http://www.omdbapi.com/?s=Batman&page=2
11/16/15
Season+Episode now works with "i" parameter: http://www.omdbapi.com/?i=tt0944947&Season=1
Fixed the max pool size connection issues.
10/18/15
You can now return all episodes by using just the "Season" parameter: http://www.omdbapi.com/?t=Game of Thrones&Season=1
9/9/15
New server is up, response times should be < 500ms.
Setup a CDN/Caching service with CloudFlare
8/15/15
Created and Fixed a bad parsing error with JSON response. -Sorry about that!
HTTPS (with TLS) is now active: https://www.omdbapi.com/
5/10/15
Season+Episode search parameters added: http://www.omdbapi.com/?t=Game of Thrones&Season=1&Episode=1
Back to topLegalDonate
API by Brian Fritz.

All content licensed under CC BY-NC 4.0.

This site is not endorsed by or affiliated with IMDb.com.


QR Code Generator
QR code with logo
QR code management
QR code API
Deutsche Version
QR code API
You can generate and decode / read QR code graphics with our QR code generator web API at api.qrserver.com.

Important features
Create QR codes via Internet (develop your own QR code generator)
Read / scan QR codes via Internet (develop your own QR code reader)
Social QR code with logo (Facebook or Twitter logo / image embedded in the QR code) (coming soon)
Create colored QR codes
Professional QR code print file formats (vector graphics, QR code EPS and SVG)
High performance server
Encrypted communication via HTTPS (SSL/TLS)
Just try it, create an image
Call the URL https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example to get a QR code with the content "Example":


Now replace "Example" in the URL to get a new QR code with a text choosen by you. You can find a detailed function description and examples at our API documentation.

Colored QR codes
You can create colored QR codes with our API. Just choose a background and / or a foreground color and take care of good contrast between the light and dark modules / pixels. Furthermore, a colorized QR code should be no negative (in terms of color, the actually black pixels / modules have to be darker than the normally white pixels) as the dark modules / pixels contain the data and a negative will confuse many QR code readers:


You can find a detailed function description and examples at our API documentation.

API documentation
Please have a look at the API documentation for detailed instructions, parameters and examples.

API command: create-qr-code (create / generate a QR code)
API command: read-qr-code (read / scan a QR code)
About goQR.me
goQR.me is one of the leading sites on the web for QR Codes, QR Code marketing and QR in general. We're offering our customers expertise to all things concerning the right usage of QR Codes. Besides that, we're the people behind QR Server, a professional marketing platform for targeted QR Code Management (Campaigns, editable QR Codes etc.)

More
QR Codes with logo/image
QR Code management
Imprint
goQR.me is offered by

Foundata GmbH
Steinhäuserstraße 20
76135 Karlsruhe

Imprint • Privacy Policy • Legal

„QR Code“ is a trademark of DENSO WAVE INCORPORATED

0bd5e00f-57eb-4f36-b226-9b4586832250 – en



World
Search

News
Views
New Anime
Encyclopedia
Forum
My ANN
About
 Login or Register
Encyclopedia API
ANN now provides a direct feed to the Encyclopedia data in XML format. There are two parts to the API.
1. Reports
On the reports page you'll find a list of various dynamically-generated reports. Click on any of these and you'll see a "display as xml" link to get the results in XML format.

The number of rows in any report (either HTML or XML format) can be controlled with the url parameters nskip and nlist. For example you can get the first 50 rows with nskip=0&nlist=50, the next 50 rows with nskip=50&nlist=50, or all rows at once with nlist=all. Some reports accept additional parameters, like this one where type=anime limits the results to anime titles only, and name=Z limits the results to titles starting with the letter Z. See individual reports for details.

If you are building an application which requires a database of anime titles, a typical usage scenario would be to make an initial import with reports.xml?id=155&type=anime&nlist=all and then do a daily import of newly added titles with reports.xml?id=155&type=anime&nlist=50

2. Anime/Manga Details
If you need more information than the basic details provided in the reports, use this API to fetch detailled information for each title. The basic syntax is https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=id. Instead of anime you should use manga if you are fetching a manga's details, or title if it could be either. For example:
api.xml?anime=4658 or api.xml?title=4658 to get details of Jinki:Extend (TV)
api.xml?manga=4199 or api.xml?title=4199 to get details of Jinki:Extend (manga)
Details for a single title can contain a lot of data so please try to spare our poor servers by fetching (and then caching) details from this API only as needed. In a typical usage scenario, you could present to your users a list of all anime titles imported using the reports above. When a user needs additional info about a certain title your backend would fetch the details for that single title and cache them for a week (older titles especially tend not to change so much).

2a. Batching
You can request details for several titles at once by specifying the anime/manga/title parameter more than once, or by using a slash-separated list of ids instead of a single id. You can also get results by name by specifying ~name instead of an id. Please note this does not match alternative titles, only the primary name (the one in the page title). For example these are all equivalent ways to get details for the 3 titles in the Jinki franchise at once:
api.xml?anime=4658&manga=4199&manga=11608
api.xml?anime=4658&manga=4199/11608
api.xml?title=4658/4199/11608
api.xml?title=~jinki
Please note that you can only batch up to 50 titles at once.
Terms of Service
We provide this API free of charge but you must
list Anime News Network as the source of the data
include a link to the relevant Encyclopedia entry (like "full details at Anime News Network") on any page that displays anime/manga/person details
Usage Limits
The API is rate-limited to 1 request per second per IP address; requests over this threshold will be delayed. If you would rather make 5 requests close together every 5 seconds, use nodelay.api.xml instead; but requests over the 1/s threshold will get a 503 error.
⬋-
review
Devil's in the Lunch Deals Manga Review
Apr 5, 16:00 manga
This tale of an outcast goddess of death who makes delicious food and tries to do good deeds as penance for being, you know, a goddess of death, is prickly and weird, and I think I love it.
feature98 comments
The Spring 2026 Anime Preview Guide
Apr 5, 13:44 anime
The Spring Anime Preview Guide continues with MAO, the latest series from Rumiko Takahashi! Also check out our reviewers' thoughts on Ghost Concert: missing Songs, Nippon Sangoku The Three Nations of the Crimson Sun, Ascendance of a Bookworm, and more!
feature2 comments
Sailor Guardians Take on a Modern Threat in Stunning New Musical Show
Apr 5, 13:00 live-action
In a world that demands perfection insofar as we're creating algorithms to streamline the humanity out of art, the cast sings that "imperfection is fine" and that it's what is necessary to make us human.
review
Oshi no Ko Volumes 9-10 Manga Review
Apr 4, 16:00 manga
It’s painful to read this flawed yet sympathetic character slide further towards self-destruction, but that’s all part of the dark appeal of Oshi no Ko.
review
From a Knight to a Lady Volume 1 K-Comic Review
Apr 3, 16:00 korean
Luci's mission becomes greater than just her own situation; she's the woman who will take back what other women lost and rewrite the narrative.
column19 comments
Column - Screamer Interview with Milestone and Polygon Pictures
Apr 3, 14:00 games
Bad news about Sony's PlayStation pricing is tempered by an interview about Screamer in this week's column.
feature3 comments
Absolute Borderline: The Early Days of Evangelion Fandom, Part Three
Apr 3, 13:00 anime industry
Brian brings us to the end of the beginning in the final part of his history of Evangelion fandom.
news
Kamen Rider Franchise Establishes Animated Film Label With 1st Project by Aniplex, Shirogumi (Updated)
Apr 3, 10:32 anime live-action games
Franchise also announces new Kamen Rider MY-TH series, live-action films, game project
review2 comments
Pokémon Horizons Season 3 - Rising Hope Part 2 Anime Series Review
Apr 2, 16:00 anime
The show is still taking advantage of the timeskip to tell a slightly more mature story; most of the cast is given a lot more depth, the symbolism is stronger, and the animation has greatly improved.
column14 comments
This Week in Anime - How Many Figures Do You Earn Annually?
Apr 2, 14:00 merch
Is it the return of Astro Toy? No, it's just Coop and Chris waxing eloquent about the pains and joys of collecting anime toys.
All material Copyright © Anime News Network LLC. All rights reserved.
served by mayu-chan
 Report a Problem
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Jikan REST API v4 Docs</title>
    
    <!-- SEO/OGP -->
    <meta name="author" content="@irfanDahir">
    <meta name="keywords" content="jikan, rest, php, api, myanimelist, free, open, source, 2017, 2018, 2019, anime, manga, people, characters, novels, manhua, manhwa, wrapper, ruby, python, restful, dart, node, javascript, js, nodejs, java, net">
    <meta name="description" content="Jikan API v4 Documentation - Unofficial MyAnimeList REST API">
    <meta name="image" content="https://i.imgur.com/ctoJ3Jp.png">
    <meta itemprop="name" content="Jikan REST API v4 Docs">
    <meta itemprop="description" content="Jikan API v4 Documentation - Unofficial MyAnimeList REST API">
    <meta itemprop="image" content="https://i.imgur.com/ctoJ3Jp.png">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="Jikan REST API v4 Docs">
    <meta name="twitter:description" content="Jikan API v4 Documentation - Unofficial MyAnimeList REST API">
    <meta name="twitter:creator" content="@irfanDahir">
    <meta name="twitter:site" content="@irfanDahir">
    <meta name="twitter:image:src" content="https://i.imgur.com/ctoJ3Jp.png">
    <meta name="twitter:image:alt" content="Jikan.moe brand image">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="og:title" content="Jikan REST API v4 Docs">
    <meta name="og:description" content="Jikan API v4 Documentation - Unofficial MyAnimeList REST API">
    <meta name="og:image" content="https://i.imgur.com/ctoJ3Jp.png">
    <meta name="og:url" content="https://docs.api.jikan.moe">
    <meta name="og:site_name" content="Jikan API v4 Documentation - Unofficial MyAnimeList REST API">
    <meta name="og:locale" content="en_US">
    <meta name="og:type" content="website">

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="https://jikan.moe/assets/images/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://jikan.moe/assets/images/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://jikan.moe/assets/images/favicon/favicon-16x16.png">
    <link rel="manifest" href="https://jikan.moe/assets/images/favicon/manifest.json">
    <link rel="mask-icon" href="https://jikan.moe/assets/images/favicon/safari-pinned-tab.svg" color="#5bbad5">
    <link rel="shortcut icon" href="https://jikan.moe/assets/images/favicon/favicon.ico">
    <meta name="msapplication-TileColor" content="#2e51a2">
    <meta name="msapplication-TileImage" content="https://jikan.moe/assets/images/favicon/mstile-144x144.png">
    <meta name="msapplication-config" content="https://jikan.moe/assets/images/favicon/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">

    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">

    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-49BR62K3LX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-49BR62K3LX');
    </script>
  </head>
  <body>
    <redoc spec-url='https://raw.githubusercontent.com/jikan-me/jikan-rest/master/storage/api-docs/api-docs.json'></redoc>
    <script type="module" src="https://cdn.redoc.ly/redoc/v3.0.0-rc.0/redoc.standalone.js"> </script>
  </body>
</html>
World
Search

News
Views
New Anime
Encyclopedia
Forum
My ANN
About
 Login or Register
Encyclopedia
Anime
Top 10
Licensed
Latest in Japan	Manga
Top 10
Licensed
Latest in Japan	People
Most prolific cast
Most prolific staff

Releases
This month	
Companies
licensors	
Lexicon
Tools
Search by name or genre or use our list tool
Compare anime to find out which staff & cast they have in common (or vice-versa)
Customize the appearance of the Encyclopedia
API for programmers
Contribute
Participate in audits to increase the reliability of the Encyclopedia
Approve or reject submitted anime and submitted manga titles
Confirm if error reports are justified or not
Lookup all the contributions and error reports you made
Additional resources
Upcoming TV series, movies, and OAVs
Various reports such as recently added anime or manga
Contributors
Bibliography
At the moment, the encyclopedia holds:
- 38578 titles
   - 12581 anime titles (+ 900 related)
      - 6031 TV series, 2947 OAVs, 2282 movies, 779 ONAs, 481 TV specials, 61 omnibus
   - 23138 manga titles (+ 1959 related)
      - 22677 manga, 461 manga anthologies
   - 11850 licensed / 26728 unlicensed
   - 84054 alternative titles
   - 12092 with cast information
   - 37595 with staff information
- 265692 persons' names
   - 207819 staff with 2136108 credits
   - 68425 cast with 1056222 roles
- 57026 releases
  - 6459 Bluray, 13757 DVD, 1806 VHS, 28126 manga, 1831 novels, 5561 eBooks
- 25378 companies
- 109 lexicon entries
- In My Anime / My Manga:
   - 208262 users have entered 7328203 titles in their categories
   - 14087 users have entered 966933 items in their collections
   - 66870 users have entered 2959969 ratings for 20053 different titles

⬋-
review
Devil's in the Lunch Deals Manga Review
Apr 5, 16:00 manga
This tale of an outcast goddess of death who makes delicious food and tries to do good deeds as penance for being, you know, a goddess of death, is prickly and weird, and I think I love it.
feature98 comments
The Spring 2026 Anime Preview Guide
Apr 5, 13:44 anime
The Spring Anime Preview Guide continues with MAO, the latest series from Rumiko Takahashi! Also check out our reviewers' thoughts on Ghost Concert: missing Songs, Nippon Sangoku The Three Nations of the Crimson Sun, Ascendance of a Bookworm, and more!
feature2 comments
Sailor Guardians Take on a Modern Threat in Stunning New Musical Show
Apr 5, 13:00 live-action
In a world that demands perfection insofar as we're creating algorithms to streamline the humanity out of art, the cast sings that "imperfection is fine" and that it's what is necessary to make us human.
review
Oshi no Ko Volumes 9-10 Manga Review
Apr 4, 16:00 manga
It’s painful to read this flawed yet sympathetic character slide further towards self-destruction, but that’s all part of the dark appeal of Oshi no Ko.
review
From a Knight to a Lady Volume 1 K-Comic Review
Apr 3, 16:00 korean
Luci's mission becomes greater than just her own situation; she's the woman who will take back what other women lost and rewrite the narrative.
column19 comments
Column - Screamer Interview with Milestone and Polygon Pictures
Apr 3, 14:00 games
Bad news about Sony's PlayStation pricing is tempered by an interview about Screamer in this week's column.
feature3 comments
Absolute Borderline: The Early Days of Evangelion Fandom, Part Three
Apr 3, 13:00 anime industry
Brian brings us to the end of the beginning in the final part of his history of Evangelion fandom.
news
Kamen Rider Franchise Establishes Animated Film Label With 1st Project by Aniplex, Shirogumi (Updated)
Apr 3, 10:32 anime live-action games
Franchise also announces new Kamen Rider MY-TH series, live-action films, game project
review2 comments
Pokémon Horizons Season 3 - Rising Hope Part 2 Anime Series Review
Apr 2, 16:00 anime
The show is still taking advantage of the timeskip to tell a slightly more mature story; most of the cast is given a lot more depth, the symbolism is stronger, and the animation has greatly improved.
column14 comments
This Week in Anime - How Many Figures Do You Earn Annually?
Apr 2, 14:00 merch
Is it the return of Astro Toy? No, it's just Coop and Chris waxing eloquent about the pains and joys of collecting anime toys.
All material Copyright © Anime News Network LLC. All rights reserved.
served by mayu-chan
 Report a Problem


<!DOCTYPE html>
<html render_time="390.15469068371584" lang="en" class="skin-mode-1 mobile-mode-0 gutter-mode-2 sidebar-mode-1 menu-mode-0 grid-mode-3 grid-mode-not-1 js-off desktop-device touch-mode-0"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="HandheldFriendly" content="true">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="referrer" content="origin-when-cross-origin">
  
  
  
  <link rel="canonical" href="https://www.animenewsnetwork.com/encyclopedia/anime.php?id=4773"> 
    <link rel="shortcut icon" href="/meta/favicon.ico" type="image/x-icon">
  <link rel="search" type="application/opensearchdescription+xml" title="Anime News Network" href="/meta/search.general.xml">
  <link rel="search" type="application/opensearchdescription+xml" title="ANN Encyclopedia" href="/meta/search.encyclopedia.xml">
  <meta name="copyright" content="Copyright (C) 2006 Anime News Network">
  <title>Sex Ward (OAV) - Anime News Network:W</title>
   

  
  
  <link rel="stylesheet" type="text/css" href="/assets/ab85518f5293b2bf7befa908114c95ce30508a80.css" cdn="no">
  <link rel="stylesheet" type="text/css" href="//cdn.animenewsnetwork.com/assets/9f68e933738bd3b5c9df1f8bac4713a427c6478a.css" media="screen, projection, tv">
  <style class="easyread-style-sheet">
    html.mobile-mode-0 .easyread-width,
    html.mobile-mode-0 .easyread-maxwidth { max-width: 50.0em; }
    html.mobile-mode-0 .maincontent.forum { width: 59.0em; }
  </style>
  <noscript><style>.requires-javascript { display:none !important }</style></noscript>
  
    <link rel="stylesheet" type="text/css" href="//cdn.animenewsnetwork.com/assets/0f948422ec61291716aa94dfbdaa8223b1b634ae.css" media="screen, projection, tv">
  <link rel="stylesheet" type="text/css" href="//cdn.animenewsnetwork.com/assets/d539752c907e6cc40e61b8028e7e760078a18145.css">
  <noscript><style>.js-content{ display:none !important }</style></noscript>

  
  <script>if (typeof JSON == 'undefined' || typeof JSON.stringify == 'undefined') document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js"><\/script>');</script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script><script>if (typeof window.jQuery == 'undefined') document.write('<script src="/javascripts/jquery.min.js"><\/script>');</script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script><script>if (typeof window.Hammer == 'undefined') document.write('<script src="/javascripts/hammer.min.js"><\/script>');</script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/svg4everybody/2.1.9/svg4everybody.min.js"></script><script>if (typeof window.svg4everybody == 'undefined') document.write('<script src="/javascripts/svg4everybody.js"><\/script>');</script>
  <script src="//cdn.animenewsnetwork.com/assets/089c574d6a71f05968e97e81330340206ead51f8.js" onload=" if (typeof ANN == 'undefined'){ to_recover = { name: 'ANN', url: event.path[0].src, }; document.write('&lt;script src=&quot;/assets/a579bb4379ff2aee7c69238bc7c1b38353a7f523.js&quot;&gt;&lt;/script&gt;'); } "></script>
  
  <script src="//cdn.animenewsnetwork.com/javascripts/ads.js"></script>
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prototype/1.7.3/prototype.js"></script>
  <script>if (typeof Prototype == 'undefined') document.write('<script src="/javascripts/prototype.js"><\/script>');</script>
  <script>
    P = $;
    Prototype_setup_ajax();
  </script>

    <script src="//cdn.animenewsnetwork.com/assets/6e80f2d8fdc68508ed23d22d847f470d747b73a8.js"></script>
      <script>
  ANN.ads.pageinfo.section = 'encyc';
   
  </script>

  
  <script>
    ANN.edition = "en-W";
    
    ANN.ads.pageinfo.ref = 'annsearch';
    ANN.lazyload.use_cdn = true;
    ANN.user_preferences.namespace = "";
    ANN.user_preferences.profile_and_name = ["desktop","Desktop"];
    ANN.user_preferences.available_schema = ["sidebar_images","sidebar_minimize","mainfeed_viewmode","grid_filters","easyread_text_width","infinite_scroll","infinite_scroll_mix_news_and_interest","no_sexy_ad_skins","hide_report_a_problem","data_grid","i_am_18"];
    ANN.user_preferences.server_list = {};
    ANN.user_preferences.setup();
    J.extend(ANN.logev.entry.info, {
      server: "mayu",
      ann5_session: 'crypted:L_3HCWBHDhVu.5zUuf01Au8U5MYMqgTxib7bI7d5ZjJzNaWgdLpRmLyq5tgLp8ye4V4bwfeLf-d_AgbWRIwwmCyIC669xVRR6PU2l',
      cf_ray: "9e7c8ab71e7d190f-FRA",
      current_location: "en-W/lst/encyc/encyclopedia/anime.php/;MA/00/;annsearch/desktop;-",
      generated_at: J.extend({"time":1775433936.55,"main_age":0}, {duration: ANN.performance.render_time}),
    });
    ANN.performance.log.push('recv=200');
    ANN.logev.save();
    ANN.logev.server_log('head');
  </script>
  <script>ANN.data_grid.user_configs_are_loaded = true;</script>
  <script>ANN.ads.pageinfo.anime = 4773;</script>
  
  
  
  
  

</head>
 <body>
  <script>ANN.layout.body_start();</script>
  
  <div id="page">
   <div class="left side gutter">
    <span class="top-area"></span>
    <a href="/sponsor/click.php/19147/7969/1775433936/549999/3" target="_blank" untracked-href="https://yenpress.com/titles/9798855430493-frieren-beyond-journey-s-end-prelude-vol-1-novel" rel="sponsored nofollow"></a>
   </div>
   <div id="canvas">
<div id="header" class="top-area">
  
  <div class="left half">
    <div class="actionable hamburger">
      <div class="header-button" title="Open Menu">
        <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#menu"></use></svg>
      </div>
    </div>
    <div class="actionable logo">
      <a href="/" title="Return to Homepage"><img src="//cdn.animenewsnetwork.com/stylesheets/img/logo.name.no-dot.png" width="313" height="37" alt=""></a>
    </div>
    <div class="actionable edition">
      <div class="dropdown button" title="Choose Your Edition">
        <span class="oneline">World</span>
        <ul>
          <li onclick="ANN.set_edition('en-W')">World</li>
          <li onclick="ANN.set_edition('en-US')">USA &amp; Canada</li>
          <li onclick="ANN.set_edition('en-AU')">Australia &amp; New-Zealand</li>
          <li onclick="ANN.set_edition('en-IN')">India</li>
          <li onclick="ANN.set_edition('en-SEA')">Southeast Asia</li>
          <li onclick="ANN.set_edition('fr-FR')">Français</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="right half">
    <div class="actionable hamburger">
      <div class="header-button" title="Open Menu">
        <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#menu"></use></svg>
      </div>
    </div>
    
    <div class="actionable short-logo">
      <img src="//cdn.animenewsnetwork.com/stylesheets/img/logo.short.png" width="88" height="24" alt="">
    </div>
    
    <div class="actionable socials">
      <div class="header-button twitter" title="Twitter">
        <a href="https://twitter.com/anime" target="_blank">
          <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#twitter"></use></svg></a>
      </div>
      <div class="header-button youtube" title="Youtube">
        <a href="https://www.youtube.com/c/animenewsnetworkANN" target="_blank">
          <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#youtube"></use></svg></a>
      </div>
      <div class="header-button facebook" title="Facebook">
        <a href="https://www.facebook.com/animenewsnetwork" target="_blank">
          <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#facebook"></use></svg></a>
      </div>
      <div class="header-button instagram" title="Instagram">
        <a href="https://www.instagram.com/animenewsnetwork/" target="_blank">
          <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#instagram"></use></svg></a>
      </div>
      <div class="header-button tiktok" title="TikTok">
        <a href="https://www.tiktok.com/@animenewsnetwork" target="_blank">
          <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#tiktok"></use></svg></a>
      </div>
      <div class="header-button bluesky" title="Bluesky">
        <a href="https://bsky.app/profile/animenewsnetwork.com" target="_blank">
          <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#bluesky"></use></svg></a>
      </div>
    </div>
    
    <div class="actionable buttons">
      <div class="header-button report" title="Report a Problem">
        <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#bubble_exclamation"></use></svg>
      </div>
      <div class="header-button user" title="Login or Register">
        <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#enter"></use></svg>

<div class="user_menu login_register">
  <div class="content">
    <form class="block login" action="https://www.animenewsnetwork.com/account/login" method="post">
      <div class="block-heading">Login</div>
      <hr>
      <input type="text" name="l" placeholder="Username or Email" class="rounded-textbox">
      <input type="password" name="p" placeholder="Password" class="rounded-textbox">
      <a class="password-reminder" href="/account/reminder" rel="nofollow">forgot it?</a>
      <label><input type="checkbox" name="remember" value="yes">remember me</label>
      <input type="hidden" name="redirect" value="https://www.animenewsnetwork.com/encyclopedia/anime.php?id=4773">
      <input type="submit" value="Login">
      
      <div class="or-divider">or</div>
      
      <a class="social_login facebook" href="/auth/facebook/login">
        <div class="sicon"><svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#facebook"></use></svg></div>
        <div class="stext">Login with Facebook</div></a>
      <a class="social_login twitter" href="/auth/twitter/login">
        <div class="sicon"><svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#twitter"></use></svg></div>
        <div class="stext">Login with Twitter</div></a></form>
    
    
    <form class="block register" action="/account/register!" method="post">
      <div class="block-heading">Register</div>
      <hr>
      <div class="pitch">
        No account yet?
        <a href="/account/register" rel="nofollow">Registering</a> is <b>free</b>, <b>easy</b>, and <b>private</b>.
        Discuss in the forum, contribute to the Encyclopedia, build your own MyAnime lists, and more.
      </div>
      <input type="email" name="email" placeholder="Email (we'll send a sign-in key)" class="rounded-textbox">
      <input type="submit" value="Register"></form>
    
  </div>
</div>

      </div>
      <div class="header-button search" title="Search">
        <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#search"></use></svg>
      </div>
    </div>
    
    <div class="actionable" id="searchbox">
      <form method="get" action="/search" class="search">
        <input type="text" name="q" placeholder="Search" autocomplete="off" class="rounded-textbox">
        <button class="submit" type="submit"></button>
        <div class="close">×</div>
        <ul class="search-suggest">
          <li class="selected" data-action="/search" data-param="q"><span></span> anywhere on the site</li>
          <li data-action="/encyclopedia/search/name" data-param="q"><span></span> in the encyclopedia</li>
          <li data-action="/bbs/phpBB2/search.php" data-param="search_keywords"><span></span> in the forums</li>
        </ul></form>
      
    </div>
    
  </div>
  
</div>
    <div class="top gutter">
     <a href="/sponsor/click.php/19147/7969/1775433936/549999/0" target="_blank" untracked-href="https://yenpress.com/titles/9798855430493-frieren-beyond-journey-s-end-prelude-vol-1-novel" rel="sponsored nofollow"></a>
    </div>
    <div class="middle-area">
     <div class="iab top">
            <div>
              <noscript>
                <iframe src="/show.aframe?t=B&amp;js=no" scrolling="no"></iframe>
              </noscript>
            </div>
          </div>
     <div id="menu">
<nav id="mega">
  
  <div class="news menu">
    <span>News</span>
    <div><nav>
      <ul class="colspan1of2">
        <li><h4>
          <a href="/news/">News</a>
          <a href="/news/archive" class="archives">chronological archives</a>
        </h4></li>
        


<li>
  <span class="time-posted"><time datetime="2026-04-05T12:12:46-04:00">12:12</time></span>
  <span><a href="/news/2026-04-05/wistoria-wand-and-sword-season-2-casts-mai-nakahara/.236115"><cite>Wistoria: Wand and Sword</cite> Season 2 Casts Mai Nakahara</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T11:42:50-04:00">11:42</time></span>
  <span><a href="/news/2026-04-05/all-pokemon-centers-in-japan-cancel-most-events-in-april/.236091">All Pokémon Centers in Japan Cancel Most Events in April</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T11:37:49-04:00">11:37</time></span>
  <span><a href="/news/2026-04-05/the-promised-neverland-manga-gets-stage-musical-this-winter/.236113"><cite>The Promised Neverland</cite> Manga Gets Stage Musical This Winter</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T09:32:09-04:00">09:32</time></span>
  <span><a href="/news/2026-04-05/the-detective-is-already-dead-anime-unveils-season-2-1st-video-switch-game/.236114"><cite>The Detective Is Already Dead</cite> Anime Unveils Season 2's 1st Video, Switch Game</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T07:05:00-04:00">07:05</time></span>
  <span><a href="/news/2026-04-05/japan-video-game-rankings-march-23-29/.236107">Japan's Video Game Rankings, March 23-29</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T06:05:00-04:00">06:05</time></span>
  <span><a href="/news/2026-04-05/japan-video-game-rankings-march-16-22/.236105">Japan's Video Game Rankings, March 16-22</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T03:05:00-04:00">03:05</time></span>
  <span><a href="/news/2026-04-05/86-asato-asato-launches-new-light-novel-series-in-june/.236092"><cite>86's</cite> Asato Asato Launches New Light Novel Series in June</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T01:14:25-04:00">01:14</time></span>
  <span><a href="/news/2026-04-05/inklore-announces-new-titles-previews-at-anime-boston/.236104">Inklore Announces New Titles, Previews at Anime Boston</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T00:00:30-04:00">00:00</time></span>
  <span><a href="/news/2026-04-05/star-detective-precure-anime-gets-film-opening-on-september-18/.236103"><cite>Star Detective Precure!</cite> Anime Gets Film Opening on September 18</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-04T17:00:00-04:00">Apr  4</time></span>
  <span><a href="/news/2026-04-04/ize-press-licenses-4-webtoons-for-english-print-release/.236061">Ize Press Licenses 4 Webtoons for English Print Release</a></span>
</li>



        
        <li><h4>
          <a href="/convention/">Convention reports</a>
          <a href="/convention/archive" class="archives">chronological archives</a>
        </h4></li>
        


<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-29T11:41:46-04:00">Mar 29</time></span>
  <span><a href="/convention/2026/animejapan/.235923">AnimeJapan 2026</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2025-10-16T17:30:00-04:00">Oct 16</time></span>
  <span><a href="/convention/2025/ronin-and-sith-reunite-in-star-wars-visions-the-duel-payback/.229769">Ronin and Sith Reunite in <cite>Star Wars Visions The Duel: Payback</cite></a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2025-10-16T16:30:00-04:00">Oct 16</time></span>
  <span><a href="/convention/2025/trigun-stargaze-aims-for-the-stars-episode-1-2-review/.230015"><cite>Trigun Stargaze</cite> Aims for the Stars: Episode 1-2 Review</a></span>
</li>




        <li><h4><a href="/newsfeed/">Newsfeed</a></h4></li>
      </ul>
      <ul class="colspan1of2">
        <li><h4>
          <a href="/interest/">Interest</a>
          <a href="/interest/archive" class="archives">chronological archives</a>
        </h4></li>
        


<li>
  <span class="time-posted"><time datetime="2026-04-04T23:59:00-04:00">Apr  4</time></span>
  <span><a href="/interest/2026-04-04/japan-iconic-licca-chan-doll-makes-american-debut/.235639">Japan's Iconic Licca-chan Doll Makes American Debut</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-03T23:59:00-04:00">Apr  3</time></span>
  <span><a href="/interest/2026-04-03/sailor-moon-artemis-watches-over-nasa-artemis-ii-mission/.236058"><i>Sailor Moon's</i> Artemis Watches Over NASA's Artemis II Mission</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-03T00:00:00-04:00">Apr  3</time></span>
  <span><a href="/interest/2026-04-03/bandai-announces-macross-f-x-top-gun-maverick-crossover-toy/.236006">Bandai Announces <i>Macross F x Top Gun: Maverick</i> Crossover Toy</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-02T22:00:00-04:00">Apr  2</time></span>
  <span><a href="/interest/2026-04-02/animate-apologizes-for-inappropriate-april-fool-joke-for-unlimited-mates-dating-game/.236042">Animate Apologizes for 'Inappropriate' April Fool's Joke for <i>Unlimited Mates</i> Dating 'Game'</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-02T13:15:27-04:00">Apr  2</time></span>
  <span><a href="/interest/2026-04-02/crunchyroll-anime-awards-reveals-2026-nominees/.236046">Crunchyroll Anime Awards Reveals 2026 Nominees</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-01T23:59:00-04:00">Apr  1</time></span>
  <span><a href="/interest/2026-04-01/happy-april-fool-day-2026-from-around-the-anime-world-part-v/.236026">Happy April Fool's Day 2026 From Around the Anime World, Part V</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-01T19:25:00-04:00">Apr  1</time></span>
  <span><a href="/interest/2026-04-01/happy-april-fool-day-2026-from-around-the-anime-world-part-iv/.236024">Happy April Fool's Day 2026 From Around the Anime World, Part IV</a></span>
</li>



        
        <li><h4>
          <a href="/press-release/">Press Releases</a>
          <a href="/press-release/archive" class="archives">chronological archives</a>
        </h4></li>
        


<li>
  <span class="time-posted"><time datetime="2026-04-04T22:09:38-04:00">Apr  4</time></span>
  <span><a href="/press-release/2026-04-04/hikaru-utada-returns-with-new-single-pappaparadise-out-may-6-serves-as-the-ending-theme-for-beloved-/.236100">Hikaru Utada Returns With New Single “PAPPAPARADISE” Out May 6: Serves As The Ending Theme For Beloved Anime <cite>Chibi Maruko-chan</cite></a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-04T17:00:00-04:00">Apr  4</time></span>
  <span><a href="/press-release/2026-04-04/ize-press-unveils-four-new-webcomic-print-editions-at-sakura-con-2026/.235832">Ize Press Unveils Four New Webcomic Print Editions at Sakura-Con 2026</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-04T17:00:00-04:00">Apr  4</time></span>
  <span><a href="/press-release/2026-04-04/yen-press-ignites-a-fateful-fall-with-eight-new-licenses/.236087">Yen Press Ignites a Fateful Fall with Eight New Licenses</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-03T17:03:00-04:00">Apr  3</time></span>
  <span><a href="/press-release/2026-04-03/seven-knights-re-birth-unleashes-celestial-guardian-randgrid-in-new-update/.236086"><cite>Seven Knights Re:BIRTH</cite> Unleashes Celestial Guardian 'Randgrid' In New Update</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-03T17:02:00-04:00">Apr  3</time></span>
  <span><a href="/press-release/2026-04-03/viz-media-lands-rumiko-takahashi-mao-sets-april-4-premiere-on-hulu-in-the-u.s-and-disney-in-select-/.236085">Viz Media Lands Rumiko Takahashi's <cite>MAO</cite>, Sets April 4 Premiere on Hulu in the U.S. and Disney+ in Select International Markets</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-03T17:01:00-04:00">Apr  3</time></span>
  <span><a href="/press-release/2026-04-03/toei-unveils-global-kamen-rider-franchise-expansion-for-iconic-character-55th-anniversary/.236083">Toei Unveils Global <cite>Kamen Rider</cite> Franchise Expansion for Iconic Character's 55th Anniversary</a></span>
</li>



      </ul>
    </nav></div>
  </div>
  
  <div class="views menu">
    <span>Views</span>
    <div><nav>
      <ul class="colspan1of2">
        <li><h4>
          <a href="/feature/">Features</a>
          <a href="/feature/archive" class="archives">chronological archives</a>
        </h4></li>
        


<li>
  <span class="time-posted"><time datetime="2026-04-05T09:00:00-04:00">09:00</time></span>
  <span><a href="/feature/2026-04-05/sailor-guardians-take-on-a-modern-threat-in-stunning-new-musical-show/.236106">Sailor Guardians Take on a Modern Threat in Stunning New Musical Show</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-03T09:00:00-04:00">Apr  3</time></span>
  <span><a href="/feature/2026-04-03/absolute-borderline-the-early-days-of-evangelion-fandom-part-three/.235164">Absolute Borderline: The Early Days of Evangelion Fandom, Part Three</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-01T09:00:00-04:00">Apr  1</time></span>
  <span><a href="/preview-guide/2026/spring/.234640">The Spring 2026 Anime Preview Guide</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-01T09:00:00-04:00">Apr  1</time></span>
  <span><a href="/interview/2026-04-01/creating-a-fanclub-director-sou-toyama-on-kirio-fan-club/.235964">Creating a Fanclub: Director Sou Toyama on <i>Kirio Fan Club</i></a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-27T09:00:00-04:00">Mar 27</time></span>
  <span><a href="/seasonal/2026/spring/.234642">The Most Anticipated Anime of Spring 2026</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-25T09:00:00-04:00">Mar 25</time></span>
  <span><a href="/seasonal/2026/winter/.234643">The Worst Anime of Winter 2026</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-23T19:30:00-04:00">Mar 23</time></span>
  <span><a href="/watch/2026-03-23/the-spring-2026-anime-trailer-party-premieres-tomorrow-night/.235658">The Spring 2026 Anime Trailer Watch Party Premieres Tomorrow Night!</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-23T17:30:00-04:00">Mar 23</time></span>
  <span><a href="/weekly-ranking/2026/winter/.235654">Your Anime Rankings - Best of Winter 2026, Mar 12-18</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-23T09:00:00-04:00">Mar 23</time></span>
  <span><a href="/interview/2026-03-23/making-bad-animation-beautiful-an-with-chao-director-yasuhiro-aoki/.231093">Making 'Bad' Animation Beautiful: An Interview with <i>ChaO</i> Director Yasuhiro Aoki</a></span>
</li>



        
        <li><h4>
          <a href="/review/">Reviews</a>
          <a href="/review/archive" class="archives">alphabetical archives</a>
        </h4></li>
        


<li>
  <span class="time-posted"><time datetime="2026-04-05T12:00:00-04:00">12:00</time></span>
  <span><a href="/review/devil-in-the-lunch-deals-manga/.233335"><cite>Devil's in the Lunch Deals</cite> Manga Review</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-04T12:00:00-04:00">Apr  4</time></span>
  <span><a href="/review/oshi-no-ko-volumes-9-10-manga/.234208"><cite>Oshi no Ko</cite> Volumes 9-10 Manga Review</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-03T12:00:00-04:00">Apr  3</time></span>
  <span><a href="/review/from-a-knight-to-a-lady/volume-1/.235771"><cite>From a Knight to a Lady</cite> Volume 1 K-Comic Review</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-02T12:00:00-04:00">Apr  2</time></span>
  <span><a href="/review/pokemon-horizons-season-3-rising-hope/part-2/.235825"><cite>Pokémon Horizons Season 3 - Rising Hope</cite> Part 2 Anime Series Review</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-01T12:00:00-04:00">Apr  1</time></span>
  <span><a href="/review/mcdonald-x-evangelion-transforming-toys/.235983">McDonald's x Evangelion Transforming Toys Review</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-31T12:00:00-04:00">Mar 31</time></span>
  <span><a href="/review/demon-king-daughter-is-too-kind/anime-series/.235824"><cite>Demon King's Daughter Is Too Kind!!</cite> Anime Series Review</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-30T12:00:00-04:00">Mar 30</time></span>
  <span><a href="/review/be-forever-yamato/star-blazers/rebel-3199-episodes-15-18-anime/.235310"><i>Be Forever Yamato: Star Blazers: Rebel 3199</i> Episodes 15-18 Anime Review</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-29T12:00:00-04:00">Mar 29</time></span>
  <span><a href="/review/gizmo-riser-volume-1-manga/.234209"><cite>Gizmo Riser</cite> Volume 1 Manga Review</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-28T12:00:00-04:00">Mar 28</time></span>
  <span><a href="/review/kowloon-generic-romance-volumes-9-10-manga/.234211"><cite>Kowloon Generic Romance</cite> Volumes 9-10 Manga Review</a></span>
</li>



      </ul>
      <ul class="colspan1of2">
        <li><h4>
          <a href="/column/">Columns</a>
          <a href="/column/archive" class="archives">chronological archives</a>
        </h4></li>
        


<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-02T10:00:00-04:00">Apr  2</time></span>
  <span><a href="/this-week-in-anime/2026-04-02/.236021">This Week in Anime - How Many Figures Do You Earn Annually?</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-27T10:00:00-04:00">Mar 27</time></span>
  <span><a href="/this-week-in-games/2026-03-27/interview-with-patricia-summersett-voice-of-princess-zelda/.235609">This Week in Games - Interview with Patricia Summersett, Voice of Princess Zelda</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-23T10:00:00-04:00">Mar 23</time></span>
  <span><a href="/answerman/2026-03-23/.235570">Answerman - Hiding Behind Pen Names</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-10T12:48:06-04:00">Mar 10</time></span>
  <span><a href="/this-week-in-mobile-games/2026-03-10/.235052">This Week in Mobile Games - I Wanna Be The Very Best, Like Mobile Ever Was</a></span>
</li>



        
        <li><h4>
          <a href="/newtype/" class="t-newtype">Newtype</a>...
          <a href="/newtype/archive" class="archives">chronological archives</a>
        </h4></li>
        


<li class="not_recent">
  <span class="time-posted"><time datetime="2025-04-29T09:00:00-04:00">Apr 29</time></span>
  <span><a href="/newtype/2025-04-29/exclusive-interview-with-sakamoto-days-cast-tomokazu-sugita-as-taro-sakamoto-and-nobunaga-shimazaki-/.223555">Newtype Exclusive Interview with <cite>SAKAMOTO DAYS</cite> Cast, Tomokazu Sugita as Taro Sakamoto and Nobunaga Shimazaki as Shin Asakura!</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2025-03-13T09:00:00-04:00">Mar 13</time></span>
  <span><a href="/newtype/2025-03-13/exclusive-interview-with-composer-kaoru-wada-crafting-the-soundscape-of-ranma/.221672">Newtype Exclusive Interview with Composer Kaoru Wada: Crafting the Soundscape of <cite>Ranma ½</cite></a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2025-02-11T09:00:00-05:00">Feb 11</time></span>
  <span><a href="/newtype/2025-02-11/exclusive-interview-with-creators-behind-one-piece-fan-letter-part-2/.220541">Newtype Exclusive Interview with Creators Behind <cite>ONE PIECE FAN LETTER</cite> - Part 2</a></span>
</li>



        
        <li><h4>
          <a href="/views/">Everything</a>
          <a href="/views/archive" class="archives">chronological archives</a>
        </h4></li>
        <li class="subtypes">
          <a href="/feature/">Features</a>
          (incl.
          <a href="/interviews/">Interviews</a> and
          <a href="/newtype/">Newtype</a>,
          and also as
          <a href="/seasonal/">Seasonal</a> features like
          <a href="/anime-spotlight/">Anime Spotlight</a>,
          <a href="/preview-guide/">Preview Guide</a>,
          <a href="/weekly-ranking/">Weekly Rankings</a>)
        </li>
        <li class="subtypes">
          <a href="/review/">Reviews</a>
          (incl. <a href="/game-review/">Game Reviews</a>)
        </li>
        <li class="subtypes">
          <a href="/column/">Current Columns</a>
          (incl. <a href="/answerman/">Answerman</a>, <a href="/azure/">Intern Annika</a>, <a href="/aftershow/">The ANN Aftershow</a>, <a href="/anime-backlog/">The Anime Backlog</a>, <a href="/this-week-in-anime/">This Week in Anime</a>, <a href="/this-week-in-games/">This Week in Games</a>, <a href="/this-week-in-mobile-games/">This Week in Mobile Games</a>)
        </li>
        <li class="subtypes">
          <a href="/old-column/">Archived Columns</a>
          (incl. <a href="/anncast/">ANNCast</a>, <a href="/ann-tv/">ANNtv</a>, <a href="/anime-news-nina/">Anime News Nina!</a>, <a href="/astro-toy/">Astro Toy</a>, <a href="/brain-diving/">Brain Diving</a>, <a href="/buried-treasure/">Buried Treasure</a>, <a href="/chicks-on-anime/">Chicks On Anime</a>, <a href="/crashing-japan/">Crashing Japan</a>, <a href="/epic-threads/">Epic Threads</a>, <a href="/from-the-gallery/">From The Gallery</a>, <a href="/hai-fidelity/">Hai Fidelity</a>, <a href="/house-of-1000-manga/">House of 1000 Manga</a>, <a href="/ima-kore-ga-hoshiin-da/">Ima Kore Ga Hoshiin Da</a>, <a href="/old-school/">Old School</a>, <a href="/pile-of-shame/">Pile of Shame</a>, <a href="/right-turn-only/">RIGHT TURN ONLY!!</a>, <a href="/shelf-life/">Shelf Life</a>, <a href="/sound-decision/">Sound Decision</a>, <a href="/sub-culture/">Sub Culture</a>, <a href="/super-plastic/">Super Plastic</a>, <a href="/tales-of-the-industry/">Tales Of The Industry</a>, <a href="/tankobon-tower/">Tankobon Tower</a>, <a href="/the-click/">The Click</a>, <a href="/dub-track/">The Dub Track</a>, <a href="/edit-list/">The Edit List</a>, <a href="/the-gallery/">The Gallery</a>, <a href="/the-list/">The List</a>, <a href="/the-mike-toole-show/">The Mike Toole Show</a>, <a href="/the-set-list/">The Set List</a>, <a href="/the-stream/">The Stream</a>, <a href="/the-x-button/">The X Button</a>, <a href="/vice-and-luna/">Vice &amp; Luna</a>)
        </li>
        <li class="subtypes">
          <a href="/editorial/">Editorials</a>
          (incl. <a href="/industry-comments/">Industry Comments</a>)
        </li>
        <li class="subtypes">
          <a href="/advertorial/">Advertorials</a>
        </li>
      </ul>
    </nav></div>
  </div>
  
  <div class="newanime menu">
    <span>New Anime</span>
    <div><nav>
      <ul>
        <li><h4><a href="/season/2026/spring/">Spring 2026 current season</a></h4></li>
        <li><a href="/encyclopedia/anime/episodes/latest"><b>Your Score:</b> Rate the Latest Simulcasts</a></li>
        <li><a href="/encyclopedia/anime/upcoming/tv">Upcoming Anime List</a></li>
        <li><a href="/encyclopedia/releases.php?format=video" rel="nofollow">Upcoming DVD &amp; Blu-ray</a></li>
        <li><a href="/weekly-ranking/">Your Anime Rankings: The Best of the Season So Far According to Readers</a></li>
        <li><h4>Anime Spotlight</h4></li>
        <li><a href="/anime-spotlight/">» previous seasons</a></li>
      </ul>
      <ul>
        

<li><h4><a href="/preview-guide/2026/spring/.234640">Spring 2026 Preview Guide</a></h4></li>

<li>
  <a href="/preview-guide/2026/spring/ghost-concert-missing-songs/.234703">Ghost Concert: missing Songs</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/nippon-sangoku-the-three-nations-of-the-crimson-sun/.234704">The Spring 2026 Anime Preview Guide:  Nippon Sangoku The Three Nations of the Crimson Sun</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/mao/.234732">MAO</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/needy-girl-overdose/.234726">Needy Girl Overdose</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/kusunoki-garden-of-gods/.234700">Kusunoki's Garden of Gods</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/akane-banashi/.234701">Akane-banashi</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/mistress-kanan-is-devilishly-easy/.234699">Mistress Kanan is Devilishly Easy</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/ascendance-of-a-bookworm-part-3-adopted-daughter-of-an-archduke/.234702">Ascendance of a Bookworm Part 3: Adopted Daughter of an Archduke</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/welcome-to-demon-school-iruma-kun-season-4/.234747">Welcome to Demon School! Iruma-kun Season 4</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/the-angel-next-door-spoils-me-rotten-season-2/.234695">The Angel Next Door Spoils Me Rotten Season 2</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/that-time-i-got-reincarnated-as-a-slime-season-4/.234696">That Time I Got Reincarnated as a Slime Season 4</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/snowball-earth/.234697">Snowball Earth</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/an-observation-log-of-my-fiancee-who-calls-herself-a-villainess/.234705">An Observation Log of My Fiancée Who Calls Herself a Villainess</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/haibara-teenage-new-game/.234738">Haibara's Teenage New Game+</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/killed-again-mr-detective/.234729">Killed Again, Mr. Detective?</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/petals-of-reincarnation/.234716">Petals of Reincarnation</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/dr-stone-science-future-season-4/.234694">Dr. STONE SCIENCE FUTURE Season 4</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/kirio-fan-club/.234692">Kirio Fan Club</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/the-ramparts-of-ice/.234693">The Ramparts of Ice</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/classroom-of-the-elite-4th-season-second-year-first-semester/.234691">Classroom of the Elite 4th Season: Second Year, First Semester</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/reborn-as-a-vending-machine-i-now-wander-the-dungeon-season-3/.234739">Reborn as a Vending Machine, I Now Wander the Dungeon Season 3</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/the-beginning-after-the-end-season-2/.234733">The Beginning After The End Season 2</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/always-a-catch/.234722">Always a Catch!</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/dorohedoro-season-2/.234748">Dorohedoro Season 2</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/beastars-final-season-part-2/.235897">BEASTARS Final Season Part 2</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/daemons-of-the-shadow-realm/.234698">Daemons of the Shadow Realm</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/witch-hat-atelier/.234706">Witch Hat Atelier</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/the-strongest-job-is-apparently-not-a-hero-or-a-sage-but-an-appraiser/.234718">The Strongest Job is Apparently Not a Hero or a Sage, But an Appraiser (Provisional)</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/the-drops-of-god/.234730">The Drops of God</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/the-food-diary-of-miss-maid/.234746">The Food Diary of Miss Maid</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/go-for-it-nakamura-kun/.234689">Go For It, Nakamura-kun!!</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/agents-of-the-four-seasons-dance-of/.234688">Agents of the Four Seasons: Dance of Spring</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/rooster-fighter/.234686">Rooster Fighter</a>
</li>



        <li><a href="/preview-guide/">» previous seasons</a></li>
      </ul>
      <ul id="episode-review-for-aside">
        <li>
          <h4><a href="/episode-review/">Daily Streaming Reviews</a></h4>
        </li>
        


<li class="not_recent">
  <a href="/review/chained-soldier-season-2/.233090">Chained Soldier Season 2</a>
  <a href="/review/chained-soldier-season-2/episode-12/.235791">#12</a>
</li>

<li class="not_recent">
  <a href="/review/champignon-witch/.233101">Champignon Witch</a>
  <a href="/review/champignon-witch/episode-12/.235526">#12</a>
</li>

<li class="not_recent">
  <a href="/review/dead-account/.233110">Dead Account</a>
  <a href="/review/dead-account/episode-12/.235934">#12</a>
</li>

<li class="not_recent">
  <a href="/review/fate-strange-fake/.233103">Fate/strange Fake</a>
  <a href="/review/fate-strange-fake/episode-13/.235933">#13</a>
</li>

<li class="not_recent">
  <a href="/review/fire-force-season-3/.223500">Fire Force Season 3</a>
  <a href="/review/fire-force-season-3/episode-24/.235835">#24</a>
</li>

<li class="not_recent">
  <a href="/review/frieren-beyond-journey-end-season-2/.233104">Frieren: Beyond Journey's End Season 2</a>
  <a href="/review/frieren-beyond-journey-end-season-2/episode-10/.235937">#10</a>
</li>

<li class="not_recent">
  <a href="/review/golden-kamuy-final-season/.233108">Golden Kamuy Final Season</a>
  <a href="/review/golden-kamuy-final-season/episode-62/.235989">#62</a>
</li>

<li class="not_recent">
  <a href="/review/hana-kimi/.233112">Hana-Kimi</a>
  <a href="/review/hana-kimi/episodes-11-12/.235469">#11-12</a>
</li>

<li class="not_recent">
  <a href="/review/hell-teacher-jigoku-sensei-nube/.226673">Hell Teacher: Jigoku Sensei Nube</a>
  <a href="/review/hell-teacher-jigoku-sensei-nube/episodes-25-26/.235746">#25-26</a>
</li>

<li class="not_recent">
  <a href="/review/hell-paradise-season-2/.233092">Hell's Paradise Season 2</a>
  <a href="/review/hell-paradise-season-2/episode-12/.235974">#12</a>
</li>

<li class="not_recent">
  <a href="/review/in-the-clear-moonlit-dusk/.233111">In the Clear Moonlit Dusk</a>
  <a href="/review/in-the-clear-moonlit-dusk/episode-11/.235826">#11</a>
</li>

<li class="not_recent">
  <a href="/review/isekai-office-worker-the-other-world-books-depend-on-the-bean-counter/.233102">Isekai Office Worker: The Other World's Books Depend on the Bean Counter</a>
  <a href="/review/isekai-office-worker-the-other-world-books-depend-on-the-bean-counter/episode-12/.235688">#12</a>
</li>

<li class="not_recent">
  <a href="/review/journal-with-witch/.233084">Journal with Witch</a>
  <a href="/review/journal-with-witch/episode-13/.236010">#13</a>
</li>

<li class="not_recent">
  <a href="/review/jujutsu-kaisen-season-3-the-culling-game-part-1/.233107">Jujutsu Kaisen Season 3: The Culling Game Part 1</a>
  <a href="/review/jujutsu-kaisen-season-3-the-culling-game-part-1/episode-59/.235814">#59</a>
</li>

<li class="not_recent">
  <a href="/review/medalist-season-2/.233095">Medalist Season 2</a>
  <a href="/review/medalist-season-2/episode-6/.235887">#6</a>
</li>

<li class="not_recent">
  <a href="/review/my-hero-academia-vigilantes-season-2/.233093">My Hero Academia: Vigilantes Season 2</a>
  <a href="/review/my-hero-academia-vigilantes-season-2/episode-26/.235985">#26</a>
</li>

<li class="not_recent">
  <a href="/review/oshi-no-ko-season-3/.233083">Oshi no Ko Season 3</a>
  <a href="/review/oshi-no-ko-season-3/episode-11/.235766">#11</a>
</li>

<li class="not_recent">
  <a href="/review/roll-over-and-die/.233085">Roll Over and Die</a>
  <a href="/review/roll-over-and-die/episode-12/.235928">#12</a>
</li>

<li class="not_recent">
  <a href="/review/rooster-fighter/.234500">Rooster Fighter</a>
  <a href="/review/rooster-fighter/episode-3/.235942">#3</a>
</li>

<li class="not_recent">
  <a href="/review/sentenced-to-be-a-hero/.233082">Sentenced to Be a Hero</a>
  <a href="/review/sentenced-to-be-a-hero/episode-12/.235856">#12</a>
</li>

<li class="not_recent">
  <a href="/review/shiboyugi-playing-death-games-to-put-food-on-the-table/.233089">SHIBOYUGI: Playing Death Games to Put Food on the Table</a>
  <a href="/review/shiboyugi-playing-death-games-to-put-food-on-the-table/episode-11/.235504">#11</a>
</li>

<li class="not_recent">
  <a href="/review/tamon-b-side/.233091">Tamon's B-Side</a>
  <a href="/review/tamon-b-side/episode-13/.235981">#13</a>
</li>

<li class="not_recent">
  <a href="/review/the-darwin-incident/.233086">The Darwin Incident</a>
  <a href="/review/the-darwin-incident/episode-12/.235709">#12</a>
</li>

<li class="not_recent">
  <a href="/review/the-holy-grail-of-eris/.233100">The Holy Grail of Eris</a>
  <a href="/review/the-holy-grail-of-eris/episode-12/.235781">#12</a>
</li>

<li class="not_recent">
  <a href="/review/the-invisible-man-and-his-soon-to-be-wife/.233094">The Invisible Man and His Soon-to-Be Wife</a>
  <a href="/review/the-invisible-man-and-his-soon-to-be-wife/episode-12/.235779">#12</a>
</li>

<li class="not_recent">
  <a href="/review/trigun-stargaze/.233105">Trigun Stargaze</a>
  <a href="/review/trigun-stargaze/episode-12/.235898">#12</a>
</li>

<li class="not_recent">
  <a href="/review/wash-it-all-away/.233109">Wash It All Away</a>
  <a href="/review/wash-it-all-away/episode-12/.235675">#12</a>
</li>

<li class="not_recent">
  <a href="/review/yoroi-shinden-samurai-troopers/.233087">Yoroi-Shinden Samurai Troopers</a>
  <a href="/review/yoroi-shinden-samurai-troopers/episode-12/.235706">#12</a>
</li>

<li class="not_recent">
  <a href="/review/you-and-i-are-polar-opposites/.233096">You and I Are Polar Opposites</a>
  <a href="/review/you-and-i-are-polar-opposites/episode-12/.235936">#12</a>
</li>



      </ul>
    </nav></div>
  </div>
  
  <div class="encyc menu">
    <span>Encyclopedia</span>
    <div><nav>
      <ul>
        <li><h4><a href="/encyclopedia/anime.php">Anime</a></h4></li>
        <li>
          <form class="search" action="/encyclopedia/search/name">
            <input type="hidden" name="only" value="anime">
            <input type="text" placeholder="Search anime" name="q" class="rounded-textbox">
            <button type="submit"></button></form>
          
        </li>
        <li><a href="/encyclopedia/ratings-anime.php">Top 10</a></li>
        <li><a href="/encyclopedia/anime/episodes/latest">Latest Simulcasts</a></li>
        <li><a href="/encyclopedia/anime-list.php?licensed=1&amp;sort=title&amp;showT=1&amp;showM=1&amp;showO=1&amp;showN=1&amp;showS=1" rel="nofollow">Licensed</a></li>
        <li><a href="/encyclopedia/anime-list.php?showdate=1&amp;limit_to=100&amp;sort=date&amp;invertsort=1&amp;showT=1&amp;showM=1&amp;showO=1&amp;showN=1&amp;showS=1" rel="nofollow">Latest in Japan</a></li>
        <li>
          <a href="/encyclopedia/anime/upcoming/tv">Upcoming TV series</a>,
          <a href="/encyclopedia/anime/upcoming/movie">movies</a>,
          <a href="/encyclopedia/anime/upcoming/oav">OAVs</a>
        </li>
        
        <li><h4><a href="/encyclopedia/manga.php">Manga</a></h4></li>
        <li>
          <form class="search" action="/encyclopedia/search/name">
            <input type="hidden" name="only" value="manga">
            <input type="text" placeholder="Search manga" name="q" class="rounded-textbox">
            <button type="submit"></button></form>
          
        </li>
        <li><a href="/encyclopedia/ratings-manga.php">Top 10</a></li>
        <li><a href="/encyclopedia/anime-list.php?licensed=1&amp;sort=title&amp;showG=1" rel="nofollow">Licensed</a></li>
        <li><a href="/encyclopedia/anime-list.php?showdate=1&amp;limit_to=100&amp;sort=date&amp;invertsort=1&amp;showG=1" rel="nofollow">Latest in Japan</a></li>
      </ul>
      <ul>
        <li><h4><a href="/encyclopedia/people.php">People</a></h4></li>
        <li>
          <form class="search" action="/encyclopedia/search/name">
            <input type="hidden" name="only" value="person">
            <input type="text" placeholder="Search people" name="q" class="rounded-textbox">
            <button type="submit"></button></form>
          
        </li>
        <li><a href="/encyclopedia/people.php?most_prolific=cast">Most prolific cast</a></li>
        <li><a href="/encyclopedia/people.php?most_prolific=staff">Most prolific staff</a></li>
        
        <li><h4><a href="/encyclopedia/releases.php">Releases</a></h4></li>
        <li>
          <form class="search" action="/encyclopedia/releases.php">
            <input type="hidden" name="yearmonth" value="all">
            <input type="text" placeholder="Search releases" name="anime" class="rounded-textbox">
            <button type="submit"></button></form>
          
        </li>
        <li><a href="/encyclopedia/releases.php?yearmonth=2026-04" rel="nofollow">This month</a></li>
      </ul>
      <ul>
        <li><h4><a href="/encyclopedia/company.php">Companies</a></h4></li>
        <li>
          <form class="search" action="/encyclopedia/search/name">
            <input type="hidden" name="only" value="company">
            <input type="text" placeholder="Search companies" name="q" class="rounded-textbox">
            <button type="submit"></button></form>
          
        </li>
        <li><a href="/encyclopedia/company.php?list=licensing">Licensors</a></li>
        
        <li><h4><a href="/encyclopedia/lexicon.php">Lexicon</a></h4></li>
        <li>
          <form class="search" action="/encyclopedia/search/name">
            <input type="hidden" name="only" value="lexicon">
            <input type="text" placeholder="Search lexicon" name="q" class="rounded-textbox">
            <button type="submit"></button></form>
          
        </li>
        
        <li><h4>Tools</h4></li>
        <li><a href="/encyclopedia/search/genre" rel="nofollow">Search by genre, theme, year</a></li>
        <li><a href="/encyclopedia/compare.php" rel="nofollow">Comparison tool</a></li>
        <li><a href="/encyclopedia/preferences.php">Personal settings</a></li>
        <li><a href="/encyclopedia/">more »</a></li>
      </ul>
    </nav></div>
  </div>
  
  <div class="forum menu">
    <span>Forum</span>
    <div><nav>
      <ul>
        <li><h4><a href="/bbs/phpBB2/">Forum Categories</a></h4></li>
        
        <li><a href="/bbs/phpBB2/?c=5">Site-Related</a></li>
        <li><a href="/bbs/phpBB2/?c=2">General</a></li>
        <li><a href="/bbs/phpBB2/?c=6">Industry</a></li>
        <li><a href="/bbs/phpBB2/?c=8">For Subscribers</a></li>
      </ul>
      <ul>
        <li><h4><a href="/bbs/phpBB2/">Forums</a></h4></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=15">Talkback</a></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=1">Anime</a> &gt;
            <a href="/bbs/phpBB2/viewforum.php?f=65">Series Discussion</a></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=14">Manga</a></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=8">Encyclopedia</a></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=50">Feedback</a></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=22">Retail</a></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=42">Community</a></li>
      </ul>
      <ul>
        <li><h4>Forum Information</h4></li>
        <li><a href="/bbs/phpBB2/search.php" rel="nofollow">Search</a></li>
        <li><a href="/bbs/phpBB2/faq.php">FAQ</a></li>
        <li><a href="/bbs/phpBB2/groupcp.php">Usergroups</a></li>
      </ul>
    </nav></div>
  </div>
  
  <div class="my menu">
    <span>My ANN</span>
    <div><nav>
      <ul>
        <li><h4>Public</h4></li>
        <li><a href="/MyAnime/public.php">Public Anime Lists</a></li>
        <li><a href="/survey/">Surveys</a></li>
        <li><a href="/contest/">Contests</a> &amp; <a href="/giveaway/">Giveaways</a></li>
        <li><a href="/newsletter">Newsletter</a></li>
        <li><a href="/connect/">ANN:Connect</a></li>
      </ul>
      <ul>
        <li><h4>Subscribers</h4></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=42">Subscriber Forum</a></li>
          <li><a href="/subscription/">Subscribe »</a></li>
      </ul>
      <ul>
        <li><h4><a href="/my/">Personal</a></h4></li>
        <li><a href="/MyAnime/">My Anime</a></li>
        <li><a href="/MyManga/">My Manga</a></li>
        <li><a href="/skin/">Change skin</a></li>
        <li><a href="/myann">My Anime 2 (beta)</a></li>
      </ul>
    </nav></div>
  </div>
  
  <div class="about menu">
    <span>About</span>
    <div><nav>
      <ul>
        <li><a href="/staff">Our Team</a></li>
        <li><a href="/contact">Contact us</a></li>
        <li><a href="/site-news/">Site news</a></li>
        <li><a href="/staff-openings">Staff openings</a></li>
      </ul>
      <ul>
        <li><a href="/privacy-policy">Privacy policy</a></li>
        <li><a href="/copyright-policy">Copyright policy</a></li>
        <li><a href="/policy">Other policies</a></li>
        <li><a href="/advertising">Advertise with ANN</a></li>
      </ul>
      <ul>
        <li><h4>Help</h4></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="#" data-report-button="">Report a Problem <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#bubble_exclamation"></use></svg></a></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=6">Bugs &amp; Technical Questions Forum</a></li>
      </ul>
    </nav></div>
  </div>
  
  
  
  <div class="login menu">
    <span>
      <span class="icon"><svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#enter"></use></svg></span>
      <span class="text">Login or Register</span>
    </span>
    <div><nav class="login_register">
      <ul class="login">
        <li>
          <form action="https://www.animenewsnetwork.com/account/login" method="post">
            <input type="text" name="l" placeholder="Username or Email" class="rounded-textbox">
            <input type="password" name="p" placeholder="Password" class="rounded-textbox">
            <div class="password-reminder"><a href="/account/reminder" rel="nofollow">forgot it?</a></div>
            <label><input type="checkbox" name="remember" value="yes">remember me</label>
            <input type="hidden" name="redirect" value="https://www.animenewsnetwork.com/encyclopedia/anime.php?id=4773">
            <input type="submit" value="Login"></form>
          
        </li>
      </ul>
      <ul>
        <li>
          <a class="social_login facebook" href="/auth/facebook/login">
            <div class="sicon"><svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#facebook"></use></svg></div>
            <div class="stext">Login with Facebook</div></a>
          <a class="social_login twitter" href="//www.animenewsnetwork.com/auth/twitter/login">
            <div class="sicon"><svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#twitter"></use></svg></div>
            <div class="stext">Login with Twitter</div></a>
        </li>
      </ul>
      <ul>
        <li>No account yet?
          <a href="/account/register" rel="nofollow">Registering</a> is <b>free</b>, <b>easy</b>, and <b>private</b>.
          Discuss in the forum, contribute to the Encyclopedia, build your own MyAnime lists, and more.
          
        </li>
        <li>
          <form action="/account/register!" method="post" class="register">
            <input type="email" name="email" placeholder="Email (we'll send a sign-in key)" class="rounded-textbox">
            <input type="submit" value="Register">
            <small>You must be at least 13 years old.</small></form>
          
        </li>
      </ul>
    </nav></div>
  </div>
  
  <div class="clear"></div>
</nav>

     </div>
     

<div id="page-header-extramenus">

 


 


 


</div>
 

     <div id="content">
     
      <div id="main">
       <div>
        <div id="notifications" class="same-width-as-main">
         
         

         
         
        </div>
          <div id="content-preferences">
            <div class="open-preferences" title="open preferences" data-user-preferences-action-open="miscellaneous">
              <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#gear"></use></svg>
            </div>
          </div>
        <div class="en-W php-css">
  <div id="maincontent" class="maincontent encyc">
     
     
     
    
<div id="page-title">
<h1 id="page_header" class="same-width-as-main">
  Sex Ward (OAV) 
</h1>
 
 

</div>
 
    
     
    
<div id="content-zone">
<div class="">
   
  <!-- google_ad_section_start -->
  <script type="text/javascript">
	function init_promo_area(div)
	{
		var info33 = $('infotype-33');
		if (info33) div.insert(info33);
				if (info33) info33.id = 'infotype-33';
	}
	</script>
	<div ann_init="init_promo_area(this)"></div><div class="my-anime-rating same-width-as-main">Have you seen this?
				<a href="/MyAnime/anime-set-categ.php?want_to_see=4773" rel="nofollow">want to</a> /
				<a href="/MyAnime/anime-set-categ.php?seen_some=4773" rel="nofollow">seen some</a> /
				<a href="/MyAnime/anime-set-categ.php?seen_all=4773" rel="nofollow">seen all</a></div><div id="infotype-19" class="encyc-info-type same-width-as-main">
	<div class="fright"><div><a href="/images/encyc/A4773-12.jpg" onclick="Encyc.bigger_image(event)" title="Click for full 354x500 version" style="cursor:sw-resize"><img src="//cdn.animenewsnetwork.com/thumbnails/fit200x200/encyc/A4773-12.jpg" style="border: 1px solid black"></a><br></div></div>
</div><div id="infotype-related"><small>[ part of <a href="/encyclopedia/anime.php?id=2153"><small>(The)</small> Vanilla Series (meta)</a> ]<br><br></small></div>
<div id="infotype-2" class="encyc-info-type same-width-as-main">
<strong>Alternative title:</strong> 
	<div class="tab">Heisa Byōtō (Japanese)</div>
	<div class="tab">閉鎖病棟 (Japanese)</div>
</div>
<div id="infotype-30" class="encyc-info-type br same-width-as-main">
<strong>Genres:</strong> 
	<span><a href="/encyclopedia/search/genreresults?w=series&amp;a=AO&amp;g=erotica&amp;o=rating" class="discreet" rel="nofollow">erotica</a></span>
</div>
<div id="infotype-31" class="encyc-info-type same-width-as-main">
<strong>Themes:</strong> 
	<span><a href="/encyclopedia/search/genreresults?w=series&amp;a=AO&amp;th=nurses&amp;o=rating" class="discreet" rel="nofollow">nurses</a></span>
</div>
<div id="infotype-36" class="encyc-info-type same-width-as-main">
	<span><a href="/encyclopedia/search/genreresults?w=series&amp;movies&amp;a=AO&amp;g=erotica&amp;th=nurses&amp;o=rating" rel="nofollow">find similar anime based on genres &amp; themes</a></span>
</div>
<div id="infotype-17" class="encyc-info-type same-width-as-main">
<strong>Objectionable content:</strong> 
	<span><span title="">Pornography</span></span>
</div>
<div id="infotype-12" class="encyc-info-type br same-width-as-main">
<strong>Plot Summary:</strong> 
	<span>Satsuki, quiet and shy nurse of Ishikawa General Hospital, only wants to make a good impression, but she keeps screwing everything up. When she accidentally gives an aching patient the wrong medication, he cons her into releasing his pain with a healthy dose of hot and heavy sex—but by the end, it's Satsuki that's moaning in pleasure. Now, Satsuki will make sure that all of her mistakes are remedied with a little sexual therapy. But is she taking things too far. And what would her co-workers say if they knew...</span>
</div>
<div id="infotype-8" class="encyc-info-type br same-width-as-main">
<strong>User Ratings:</strong> 
	<span>48 ratings have been given [<a style="cursor:pointer; text-decoration:underline" href="#rating-details" onclick="
var ratingbox = document.getElementById('ratingbox');
if (ratingbox.className == 'ratings-collapsed')
	ratingbox.className = 'ratings-expanded';
else
	ratingbox.className = 'ratings-collapsed';
return false;">details</a>]
<style>
	.ratings-collapsed, .ratings-expanded {
		margin-left: 20px;
	}
	.ratings-collapsed .one-rating {
		height: 5px;
		overflow: hidden;
	}
	.ratings-collapsed span {
		display: none;
	}
	.ratings-expanded .one-rating {
		height: 1.3em;
		overflow: hidden;
	}
	.ratings-expanded span span {
		font-size: 11px;
		font-family: Arial,Verdana;
		color: #808080;
	}
</style>
<div id="ratingbox" class="ratings-collapsed">
	<div class="one-rating"><div style="float:left; width:13px; background-color:#00f000; height:100px"></div><span> Masterpiece: 4 votes <span>(sub:2, dub:2)</span></span></div>
	<div class="one-rating"><div style="float:left; width:7px; background-color:#30f000; height:100px"></div><span> Excellent: 1 vote <span>(dub:1)</span></span></div>
	<div class="one-rating"><div style="float:left; width:33px; background-color:#60f000; height:100px"></div><span> Very good: 2 votes <span>(sub:2)</span></span></div>
	<div class="one-rating"><div style="float:left; width:102px; background-color:#90f000; height:100px"></div><span> Good: 6 votes <span>(sub:4, dub:2)</span></span></div>
	<div class="one-rating"><div style="float:left; width:160px; background-color:#c0f000; height:100px"></div><span> Decent: 10 votes <span>(sub:9, dub:1)</span></span></div>
	<div class="one-rating"><div style="float:left; width:154px; background-color:#f0f000; height:100px"></div><span> So-so: 10 votes <span>(sub:10)</span></span></div>
	<div class="one-rating"><div style="float:left; width:56px; background-color:#f0c000; height:100px"></div><span> Not really good: 4 votes <span>(sub:3, dub:1)</span></span></div>
	<div class="one-rating"><div style="float:left; width:47px; background-color:#f09000; height:100px"></div><span> Weak: 3 votes <span>(sub:2, dub:1)</span></span></div>
	<div class="one-rating"><div style="float:left; width:62px; background-color:#f06000; height:100px"></div><span> Bad: 4 votes <span>(sub:3, raw:1)</span></span></div>
	<div class="one-rating"><div style="float:left; width:22px; background-color:#f03000; height:100px"></div><span> Awful: 2 votes <span>(sub:2)</span></span></div>
	<div class="one-rating"><div style="float:left; width:20px; background-color:#f00000; height:100px"></div><span> Worst ever: 2 votes <span>(sub:1, dub:1)</span></span></div>
	<span><b>Seen</b> in part or in whole by 147 users, rank: #4684 (of 10311)<br><b>Median rating:</b> So-so<br><b>Arithmetic mean:</b> 5.250 (So-so+), std. dev.: 2.4958, rank: #9397 (of 10489)<br><b>Weighted mean:</b> 5.046 (So-so), rank: #9627 (of 10489) <span style="white-space:nowrap">(seen all: 5.05 / seen some: 6.00 / won't finish: 0.00)</span><br><b>Bayesian estimate:</b> 5.563 (Decent−), rank: #7479 (of 7886)<br></span>
</div></span>
</div>
<div id="infotype-4" class="encyc-info-type br same-width-as-main">
<strong>Running time:</strong> 
	<span>Half hour per episode</span>
</div>
<div id="infotype-3" class="encyc-info-type same-width-as-main">
<strong>Number of episodes:</strong> 
	<span>2</span>
</div>
<div id="infotype-7" class="encyc-info-type br same-width-as-main">
<strong>Vintage:</strong> 
	<span>2001-07-13</span>
</div>
<div id="infotype-28" class="encyc-info-type same-width-as-main">
<strong>Release dates:</strong> <a href="/encyclopedia/anime.php?id=4773&amp;page=28">We have 2</a>
</div>
<div id="infotype-10" class="encyc-info-type br same-width-as-main">
<strong>Official website:</strong> 
	<div class="tab"><a target="_blank" rel="nofollow" href="http://www.vanilla-jp.com/catalog/heisa/re_heisa1.html">Digital Works' official Heisa Byōtō pages (Adults Only)</a> (Japanese)</div>
</div>
<div id="infotype-22" class="encyc-info-type same-width-as-main">
<strong>Trivia:</strong> <a href="/encyclopedia/anime.php?id=4773&amp;page=22">We have 1</a>
</div>
<div id="infotype-13" class="encyc-info-type br same-width-as-main">
<strong>Comment:</strong> 
	<div class="tab">Not to be confused with Digital Works' <a href="anime.php?id=6183"><i>Heisa <b>Byōin</b></i></a> (<i>Naughty Nurses</i>).</div>
</div>
	<script type="text/javascript">
		function show_more_articles(radio)
		{
			var div = $(radio.parentNode.parentNode.parentNode);
			div.className = div.className.replace(/\bS[012]-(show|hide)\b/," ").strip();
			div.addClassName(radio.value);
		}
	</script><div class="encyc-info-type br articles"><strong>News:</strong><div class="limit-height"><div class="tab S0 show"><a href="/news/2013-03-05/north-american-anime-manga-releases-march-3-9">North American Anime, Manga Releases, March 3-9</a> <small>(Mar  5, 2013)</small></div></div></div><div class="encyc-info-type br articles"><strong>Press Release:</strong><div class="limit-height"><div class="tab S0 show"><a href="/press-release/2012-11-07/critical-mass-video-announces-sex-ward-on-dvd-for-march-2013">Critical Mass Video Announces <cite>Sex Ward</cite> on DVD for March 2013</a> <small>(Nov  7, 2012)</small></div></div></div><table class="encyc-interactive" cellspacing="0" id="contribute-information"><tbody><tr><td>You can contribute information to this page, but first you must <code onclick="ANN.show_login()">login or register</code></td></tr></tbody></table><style>TD.STAFF{ padding-left:5px; white-space:nowrap; }</style><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td style="padding-top:6px"><b>DVD <small>(Region 1)</small></b></td></tr><tr bgcolor="WHITE"><td>    <a href="/encyclopedia/releases.php?id=3679">Sex Ward - [Vanilla Series] (DVD)</a> 2005-02-22</td></tr><tr bgcolor="WHITE"><td>    <a href="/encyclopedia/releases.php?id=22723">Sex Ward (DVD)</a> 2013-03-12</td></tr></tbody></table><p></p><table id="credits" class="layout" style="clear:both;" width="100%"><tbody><tr><td class="left-cap horizontal" colspan="2"><div></div><nobr>Japanese staff</nobr></td><td class="horizontal vertical"><div class="downward-T"></div></td><td class="horizontal"><nobr>Japanese cast</nobr></td><td class="right-cap horizontal"><div></div></td></tr><tr><td colspan="2" rowspan="3"><div class="overflow-down"><div class="ENTAB"><b>Director</b>: <a class="discreet" href="people.php?id=69744">Kuboyama 1862</a><br></div><div class="ENTAB"><b>Screenplay</b>: <a href="people.php?id=14350">Rokurōta Makabe</a><br></div><div class="ENTAB"><b>Storyboard</b>: <a href="people.php?id=31874">Mamoru Sakisaka</a><br></div><div class="ENTAB"><b>Music</b>: <a href="people.php?id=22416">Yoshi Etc.</a><br></div><div class="ENTAB"><b>Original story</b>: <a href="people.php?id=47224">Shinbashi Makino</a><br></div><div class="ENTAB"><b>Character Design</b>: <a href="people.php?id=47226">Jyouki Satsumaya</a><br></div><div class="ENTAB"><b>Art Director</b>: <a href="people.php?id=1381">Eiji Utakata</a><br></div><div class="ENTAB"><b>Producer</b>:<br><a href="people.php?id=14349">Chikara Niki</a><br><a href="people.php?id=20714">Shiyuuta Biwajima</a><br><br></div><div class="ENTAB"><b>Animation</b>: <a href="people.php?id=47226">Jyouki Satsumaya</a><br></div><div class="ENTAB"><b>Animation producer</b>: <a href="people.php?id=20712">Shinichi Omata</a><br></div><div class="ENTAB"><b title="Background">Background Art</b>:<br><a class="discreet" href="people.php?id=47237">Falcon</a><br><a class="discreet" href="people.php?id=47238">Kuma-tan</a><br><a href="people.php?id=45945">Mayutan</a><br><a href="people.php?id=30536">sniper-Minoru</a><br><a href="people.php?id=30552">St. Tulip</a><br></div><div class="ENTAB"><b title="Coloring">Color</b>: <a href="people.php?id=14353">Kuroneko</a><br></div><div class="ENTAB"><b>Color Setup</b>: <a href="people.php?id=14353">Kuroneko</a><br></div><div class="ENTAB"><b>Digital Production</b>: <a href="people.php?id=15141">Masaki Nakamura</a><br></div><div class="ENTAB"><b>Editing</b>: <a href="people.php?id=15174">Shigenari Nishi</a><br></div><div class="ENTAB"><b title="Original Picture">Key Animation</b>:<br><a href="people.php?id=34254">Daifuku Suginami</a><br><a class="discreet" href="people.php?id=47235">Heitarou Takashima</a><br><a href="people.php?id=90478">Hiroshi Itō</a><br><a href="people.php?id=241139">Hiroshi Yamada</a><br><a class="discreet" href="people.php?id=47236">Shirou Kanehira</a><br><a class="discreet" href="people.php?id=47234">Takume Shinome</a><br><a href="people.php?id=34259">Yuichiro Masuda</a><br></div><div class="ENTAB"><b>Photography</b>:<br><a href="people.php?id=30987">Mitsue Motomiya</a><br><a href="people.php?id=30986">Naoyuki Taniguchi</a><br><a href="people.php?id=61105">Ryōji Akiyama</a><br><a href="people.php?id=30988">Yuki Okada</a><br></div><div class="ENTAB"><b>Photography Supervision</b>: <a href="people.php?id=1380">Hideo Okazaki</a><br></div><div class="ENTAB"><b>Production Generalization</b>: <a href="people.php?id=30559">Natsu Motoki</a><br></div><div class="ENTAB"><b>Production Progress</b>: <a href="people.php?id=34647">Miki Kaneko</a><br></div><div class="ENTAB"><b>Sound Supervision</b>: <a href="people.php?id=6586">Tomohiro Yoshida</a><br></div><div class="ENTAB"><b>Special Effects</b>: <a href="people.php?id=30979">Masanori Kei</a><br></div></div></td><td class="vertical"><div></div></td><td colspan="2"><div><div class="ENTAB"><a href="people.php?id=47227">Narumi Ikehata</a> <i>as</i> <nobr><b>Satsuki Aoyagi</b></nobr></div><br><div class="ENTAB"><a class="discreet" href="people.php?id=47231">Michihiko Ōba</a> <i>as</i> <nobr><b>Hedeyuki Ishikawa</b></nobr></div><div class="ENTAB"><a href="people.php?id=47228">Ran Asō</a> <i>as</i> <nobr><b>Naho Ōta</b></nobr></div><br><div class="ENTAB"><a href="people.php?id=47230">Chikako Oumi</a> <i>as</i> <nobr><b>Yuriko Satō</b></nobr></div><div class="ENTAB"><a href="people.php?id=47229">Eiko Shiraki</a> <i>as</i> <nobr><b>Midori Nakamura</b></nobr></div><div class="ENTAB"><a class="discreet" href="people.php?id=47232">Kenji Mineo</a> <i>as</i> <nobr><b>Junichirō Takebayashi</b></nobr></div><div class="ENTAB"><a class="discreet" href="people.php?id=47233">Michiru Sakata</a> <i>as</i> <nobr><b>Atsuhito Kamiya</b></nobr></div><br><div class="ENTAB"><a href="people.php?id=336">Yuu Asakawa</a><nobr><b></b></nobr></div></div></td></tr><tr><td class="horizontal vertical"><div class="bottom-left"></div></td><td class="horizontal"><nobr>Japanese companies</nobr></td><td class="right-side horizontal vertical"><div class="top-right"></div></td></tr><tr><td class="top-cap vertical"><div></div></td><td><div><div class="ENTAB"><b>Animation</b>:<br><a href="company.php?id=3569">FAI International</a><br><a href="company.php?id=2001">Y.O.U.C.</a><br></div><div class="ENTAB"><b>Editing</b>: <a href="company.php?id=4540">AMGA</a><br></div><div class="ENTAB"><b>Finish Animation</b>: <a href="company.php?id=3569">FAI International</a><br></div><div class="ENTAB"><b>Marketing Agency</b>: <a href="company.php?id=4400">JVD</a><br></div><div class="ENTAB"><b>Photography</b>: <a href="company.php?id=4540">AMGA</a><br></div><div class="ENTAB"><b>Production</b>: <a href="company.php?id=1428">Digital Works</a><br></div><div class="ENTAB"><b>Recording Studio</b>: <a href="company.php?id=2159">Three S Studio</a><br></div><div class="ENTAB"><b>Sales Agency</b>: <a href="company.php?id=4512">Vanilla</a><br></div><div class="ENTAB"><b>Sound Production</b>: <a href="company.php?id=994">Arts Production</a><br></div><div class="ENTAB"><b>special effects</b>: <a href="company.php?id=4540">AMGA</a><br></div><div class="ENTAB"><b>Video Editing</b>: <a href="company.php?id=353">TOVIC</a><br></div></div></td><td class="right-side vertical"><div></div></td></tr><tr><td colspan="2"><div></div></td><td class="horizontal vertical"><div class="rightward-T"></div></td><td class="horizontal"><nobr>English cast</nobr></td><td class="right-side horizontal vertical"><div class="bottom-right"></div></td></tr><tr><td class="left-cap horizontal" colspan="2"><div></div><nobr>English staff</nobr></td><td class="horizontal vertical"><div class="leftward-T"></div></td><td colspan="2"><div></div></td></tr><tr><td colspan="2"><div><div class="ENTAB"><b>Director</b>: <a href="people.php?id=11525">Eric Tomosunas</a><br></div><div class="ENTAB"><b>Executive producer</b>: <a href="people.php?id=2206">Shawne Kleckner</a><br></div><div class="ENTAB"><b>Producer</b>: <a href="people.php?id=34649">Noriko Ai</a><br></div></div></td><td class="vertical"><div></div></td><td colspan="2" rowspan="3"><div class="overflow-up"><div class="ENTAB"><a href="people.php?id=22421">Darcy Lang</a> <i>as</i> <nobr><b>Satsuki Aoyagi</b></nobr></div><br><div class="ENTAB"><a href="people.php?id=42558">Benji Guess</a> <i>as</i> <nobr><b>Hideyuki Ishikawa</b></nobr></div><div class="ENTAB"><a href="people.php?id=30992">Fifi Barcelona</a> <i>as</i> <nobr><b>Midori Nakamura</b></nobr></div><div class="ENTAB"><a href="people.php?id=22419">Laura Palmer</a> <i>as</i> <nobr><b>Yuriko Satou</b></nobr></div><div class="ENTAB"><a href="people.php?id=42560">Suzee Swallows</a> <i>as</i> <nobr><b>Naho Oota</b></nobr></div><br><div class="ENTAB"><a href="people.php?id=34842">Amy Gorgen</a> <i>as</i> <nobr><b>Mom</b></nobr></div><div class="ENTAB"><a href="people.php?id=42562">Danielle Tittalatti</a> <i>as</i> <nobr><b>Nurse</b></nobr></div><div class="ENTAB"><a href="people.php?id=14374">Jericho</a> <i>as</i> <nobr><b>Atsuhito Kamiya</b></nobr></div><div class="ENTAB"><a class="discreet" href="people.php?id=42561">Nick Bottom</a> <i>as</i> <nobr><b>Junichirou Takebayashi</b></nobr></div><div class="ENTAB"><a href="people.php?id=5703">Shaun O'Rourke</a> <i>as</i> <nobr><b>Doctor</b></nobr></div><div class="ENTAB"><a href="people.php?id=143426">Tony De'Longo</a> <i>as</i> <nobr><b>Director</b></nobr></div></div></td></tr><tr><td class="left-side horizontal vertical"><div class="top-left"></div></td><td class="horizontal"><nobr>English companies</nobr></td><td class="horizontal vertical"><div class="leftward-T"></div></td></tr><tr><td class="left-side vertical"><div></div></td><td><div><div class="ENTAB"><b>Distributor</b>:<br><a href="company.php?id=2076">Critical Mass Video</a><br><a href="company.php?id=12788">Siren Visual</a> <small>(Australia &amp; New Zealand)</small><br></div><div class="ENTAB"><b>Licensed by</b>: <a href="company.php?id=1">The Right Stuf International</a><br></div><div class="ENTAB"><b>Recording Studio</b>: <a href="company.php?id=2408">Swirl Recordings &amp; Film, Inc.</a><br></div></div></td><td class="bottom-cap vertical"><div></div></td></tr><tr><td class="left-side horizontal vertical"><div class="bottom-left"></div></td><td class="horizontal"><div></div></td><td class="horizontal"><div></div></td><td class="horizontal"><div></div></td><td class="right-cap horizontal"><div></div></td></tr></tbody></table>
<div class="encyc-interactive">
	<center>
		This encyclopedia is collaboratively edited by the users of this site
		<table cellspacing="0">
			<tbody><tr>
				<td><strong><a href="/encyclopedia/disclaimer">DISCLAIMER</a></strong></td>
				<td><strong><a onclick=" " href="#contribute-information">add information</a></strong></td>
				<td><strong><a rel="nofollow" href="/encyclopedia/anime.php?id=4773&amp;lookup=error">report an error</a></strong></td>
				<td><strong><a rel="nofollow" href="/encyclopedia/anime.php?id=4773&amp;lookup=source">lookup sources</a></strong></td>
							</tr>
		</tbody></table>
	</center>
</div>

<script>
	Encyc.user_lookup_table = {};
	</script>

<p><a href="/encyclopedia/compare.php?comp=a&amp;add=4773" rel="nofollow">Compare this anime's credits with others</a></p><p align="center"><a href="/encyclopedia/anime.php?list=9">#</a> <a href="/encyclopedia/anime.php?list=A">A</a> <a href="/encyclopedia/anime.php?list=B">B</a> <a href="/encyclopedia/anime.php?list=C">C</a> <a href="/encyclopedia/anime.php?list=D">D</a> <a href="/encyclopedia/anime.php?list=E">E</a> <a href="/encyclopedia/anime.php?list=F">F</a> <a href="/encyclopedia/anime.php?list=G">G</a> <a href="/encyclopedia/anime.php?list=H">H</a> <a href="/encyclopedia/anime.php?list=I">I</a> <a href="/encyclopedia/anime.php?list=J">J</a> <a href="/encyclopedia/anime.php?list=K">K</a> <a href="/encyclopedia/anime.php?list=L">L</a> <a href="/encyclopedia/anime.php?list=M">M</a> <a href="/encyclopedia/anime.php?list=N">N</a> <a href="/encyclopedia/anime.php?list=O">O</a> <a href="/encyclopedia/anime.php?list=P">P</a> <a href="/encyclopedia/anime.php?list=Q">Q</a> <a href="/encyclopedia/anime.php?list=R">R</a> <a href="/encyclopedia/anime.php?list=S"><font size="+2"><b>S</b></font></a> <a href="/encyclopedia/anime.php?list=T">T</a> <a href="/encyclopedia/anime.php?list=U">U</a> <a href="/encyclopedia/anime.php?list=V">V</a> <a href="/encyclopedia/anime.php?list=W">W</a> <a href="/encyclopedia/anime.php?list=X">X</a> <a href="/encyclopedia/anime.php?list=Y">Y</a> <a href="/encyclopedia/anime.php?list=Z">Z</a><br> <a href="/encyclopedia/anime.php?list=anthology">Anime anthology</a></p><br> 
  <!-- google_ad_section_end -->
</div>

</div>
 
  </div>
</div>


  
  
  <div id="infinite-scroll-outlet" style="height: 0;"></div>
  
  

       </div>
      </div>
<div id="sidebar" class="grid-view thumb-view">
  <div>
    <div class="options-menu requires-javascript">
      <div class="minimize-off icon" title="maximize sidebar" onclick="ANN.sidebar.minimize(false);">⬈</div>
      <div class="minimize-on icon" title="minimize sidebar" onclick="ANN.sidebar.minimize(true);">⬋</div>
      <div class="images-off icon" title="hide images" onclick="ANN.sidebar.images(false)">-</div>
      <div class="images-on icon" title="show images" onclick="ANN.sidebar.images(true)">+</div>
      <div class="open-preferences icon" title="open preferences" data-user-preferences-action-open="sidebar">
        <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#gear"></use></svg>
      </div>
    </div>
    
    <div class="herald-boxes">
      
      <div id="page-menu" class="encyc box">
		<h3>Compare Credits</h3>
		<a href="/encyclopedia/compare.php?comp=a&amp;add=4773" rel="nofollow">Compare this anime with others</a>
	</div>
      
      
      
      
   <div class="box iab side">
          <div>
            <noscript>
              <iframe src="/show.aframe?t=R&amp;js=no" scrolling="no"></iframe>
            </noscript>
          </div>
        </div>
  <div class="herald box aside reviews t-review" data-topics="article233335 reviews manga">
    <div class="category-line reviews t-review"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gR4/cms/review.2/233335/the-devil-s-in-the-lunch-deals-title-art.jpg">
      <div class="overlay">
        <div class="category reviews t-review">
          review
        </div>
        
      </div>
      
      <a href="/review/devil-in-the-lunch-deals-manga/.233335" data-track="id=196622&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/review/devil-in-the-lunch-deals-manga/.233335" data-track="id=196622&amp;from=SB"><cite>Devil's in the Lunch Deals</cite> Manga Review</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-05T16:00:00+00:00">Apr  5, 16:00</time>
          
          <span class="topics">
            <a topic="manga" href="/all/?topic=manga" target="intro-by-topic">
              manga</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">This tale of an outcast goddess of death who makes delicious food and tries to do good deeds as penance for being, you know, a goddess of death, is prickly and weird, and I think I love it.</span>
          <span class="full">― Fairytales play a significant role in human society. They stand in as simplistic moral education, tales of punishment and reward. They are also expressions of psychological and philosophical experimentation. Fai...</span>
        </div>
      </div>
    </div>
  </div>

   
  <div class="herald box aside views t-preview-guide" data-topics="article234640 views anime">
    <div class="category-line views t-preview-guide"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gHJ/cms/preview-guide/234732/rhs-mao-cap-2.png.jpg">
      <div class="overlay">
        <div class="category views t-preview-guide">
          feature
        </div>
        <div class="comments"><a href="/cms/discuss/234640">98 comments</a></div>
      </div>
      
      <a href="/preview-guide/2026/spring/.234640" data-track="id=196744&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/preview-guide/2026/spring/.234640" data-track="id=196744&amp;from=SB">The Spring 2026 Anime Preview Guide</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-05T13:44:06+00:00">Apr  5, 13:44</time>
          <div class="comments"><a href="/cms/discuss/234640">98 comments</a></div>
          <span class="topics">
            <a topic="anime" href="/all/?topic=anime" target="intro-by-topic">
              anime</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">The Spring Anime Preview Guide continues with <b>MAO</b>, the latest series from Rumiko Takahashi! Also check out our reviewers' thoughts on Ghost Concert: missing Songs, Nippon Sangoku The Three Nations of the Crimson Sun, Ascendance of a Bookworm, and more!</span>
          <span class="full">―  Welcome to Anime News Network's Spring 2026 Anime Preview Guide! Here's how it goes: our team of critics writes up their impressions instantly, to ...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="herald box aside views t-feature" data-topics="article236106 views live-action">
    <div class="category-line views t-feature"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gK9/cms/feature/236106/sailormoon03.jpg">
      <div class="overlay">
        <div class="category views t-feature">
          feature
        </div>
        <div class="comments"><a href="/cms/discuss/236106">2 comments</a></div>
      </div>
      
      <a href="/feature/2026-04-05/sailor-guardians-take-on-a-modern-threat-in-stunning-new-musical-show/.236106" data-track="id=196738&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/feature/2026-04-05/sailor-guardians-take-on-a-modern-threat-in-stunning-new-musical-show/.236106" data-track="id=196738&amp;from=SB">Sailor Guardians Take on a Modern Threat in Stunning New Musical Show</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-05T13:00:00+00:00">Apr  5, 13:00</time>
          <div class="comments"><a href="/cms/discuss/236106">2 comments</a></div>
          <span class="topics">
            <a topic="live-action" href="/all/?topic=live-action" target="intro-by-topic">
              live-action</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">In a world that demands perfection insofar as we're creating algorithms to streamline the humanity out of art, the cast sings that "imperfection is fine" and that it's what is necessary to make us human.</span>
          <span class="full">― It felt like a full-circle career moment. There I was, in Japan, mostly for the annual AnimeJapan event coverage. This is my third year flying out of the country to intermingle with Japanese compan...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="herald box aside reviews t-review" data-topics="article234208 reviews manga">
    <div class="category-line reviews t-review"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200g13/cms/review.2/234208/oshi-no-ko-volume-12-cover.jpg">
      <div class="overlay">
        <div class="category reviews t-review">
          review
        </div>
        
      </div>
      
      <a href="/review/oshi-no-ko-volumes-9-10-manga/.234208" data-track="id=196621&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/review/oshi-no-ko-volumes-9-10-manga/.234208" data-track="id=196621&amp;from=SB"><cite>Oshi no Ko</cite> Volumes 9-10 Manga Review</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-04T16:00:00+00:00">Apr  4, 16:00</time>
          
          <span class="topics">
            <a topic="manga" href="/all/?topic=manga" target="intro-by-topic">
              manga</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">It’s painful to read this flawed yet sympathetic character slide further towards self-destruction, but that’s all part of the dark appeal of <i>Oshi no Ko</i>.</span>
          <span class="full">― For readers wanting to catch up on the manga story after the point where the anime adaptation's second season left off, volume nine is the place to start. <i>Oshi no Ko</i>'s anime maintains close fidelity to its manga source, and the four volumes covered...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="herald box aside reviews t-review" data-topics="article235771 reviews korean">
    <div class="category-line reviews t-review"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gF6/cms/review.2/235771/knight-to-lady.jpg">
      <div class="overlay">
        <div class="category reviews t-review">
          review
        </div>
        
      </div>
      
      <a href="/review/from-a-knight-to-a-lady/volume-1/.235771" data-track="id=196620&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/review/from-a-knight-to-a-lady/volume-1/.235771" data-track="id=196620&amp;from=SB"><cite>From a Knight to a Lady</cite> Volume 1 K-Comic Review</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-03T16:00:00+00:00">Apr  3, 16:00</time>
          
          <span class="topics">
            <a topic="korean" href="/all/?topic=korean" target="intro-by-topic">
              korean</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">Luci's mission becomes greater than just her own situation; she's the woman who will take back what other women lost and rewrite the narrative.</span>
          <span class="full">― Estelle spent most of her life defying gender norms. As an orphaned girl, she wanted to be in a position to protect rather than be protected, and to that end, she became one of her country's first lady knights. She continued her rise to the top, proving all...</span>
        </div>
      </div>
    </div>
  </div>

   
  <div class="herald box aside column t-column" data-topics="article235938 column games">
    <div class="category-line column t-column"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gJA/cms/column/235938/screamerdog.png.jpg">
      <div class="overlay">
        <div class="category column t-column">
          column
        </div>
        <div class="comments"><a href="/cms/discuss/235938">19 comments</a></div>
      </div>
      
      <a href="/this-week-in-games/2026-04-03/.235938" data-track="id=196715&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/this-week-in-games/2026-04-03/.235938" data-track="id=196715&amp;from=SB">Column - Screamer Interview with Milestone and Polygon Pictures</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-03T14:00:00+00:00">Apr  3, 14:00</time>
          <div class="comments"><a href="/cms/discuss/235938">19 comments</a></div>
          <span class="topics">
            <a topic="games" href="/all/?topic=games" target="intro-by-topic">
              games</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">Bad news about Sony's PlayStation pricing is tempered by an interview about <i>Screamer</i> in this week's column.</span>
          <span class="full">― Welcome back, folks! This past weekend, I was lucky enough to get invited onto the Axe of the Blood God podcast to discuss the .hack//IMOQ games, as well as the rest of the early .hack franchise. It was a great time, I deeply enjoyed getting to speak with Victor and Harper, and I'd love to do...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="herald box aside views t-feature" data-topics="article235164 views anime industry">
    <div class="category-line views t-feature"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gRV/cms/feature/232185/adv-first-ad.jpg">
      <div class="overlay">
        <div class="category views t-feature">
          feature
        </div>
        <div class="comments"><a href="/cms/discuss/235164">3 comments</a></div>
      </div>
      
      <a href="/feature/2026-04-03/absolute-borderline-the-early-days-of-evangelion-fandom-part-three/.235164" data-track="id=196655&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/feature/2026-04-03/absolute-borderline-the-early-days-of-evangelion-fandom-part-three/.235164" data-track="id=196655&amp;from=SB">Absolute Borderline: The Early Days of Evangelion Fandom, Part Three</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-03T13:00:00+00:00">Apr  3, 13:00</time>
          <div class="comments"><a href="/cms/discuss/235164">3 comments</a></div>
          <span class="topics">
            <a topic="anime" href="/all/?topic=anime" target="intro-by-topic">
              anime</a>
            <a topic="industry" href="/all/?topic=industry" target="intro-by-topic">
              industry</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">Brian brings us to the end of the beginning in the final part of his history of <i>Evangelion</i> fandom.</span>
          <span class="full">― So, ADV had just announced that they had acquired the North American rights to the Evangelion TV series. Not only that, but they also promised a version with all new animation, confusing Western fans. And how did Gainax respond to the news? Four days after ADV's announcement, Michael House, Gainax's i...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="herald box aside news t-news" data-topics="article236073 news anime live-action games">
    <div class="category-line news t-news"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gW0/cms/news.9/236073/kamen-rider.jfif.jpeg">
      <div class="overlay">
        <div class="category news t-news">
          news
        </div>
        
      </div>
      
      <a href="/news/2026-04-03/kamen-rider-franchise-establishes-new-label-for-animated-films-with-1st-project-by-aniplex-shirogumi/.236073" data-track="id=196722&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/news/2026-04-03/kamen-rider-franchise-establishes-new-label-for-animated-films-with-1st-project-by-aniplex-shirogumi/.236073" data-track="id=196722&amp;from=SB"><cite>Kamen Rider</cite> Franchise Establishes Animated Film Label With 1st Project by Aniplex, Shirogumi (Updated)</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-03T10:32:38+00:00">Apr  3, 10:32</time>
          
          <span class="topics">
            <a topic="anime" href="/all/?topic=anime" target="intro-by-topic">
              anime</a>
            <a topic="live-action" href="/all/?topic=live-action" target="intro-by-topic">
              live-action</a>
            <a topic="games" href="/all/?topic=games" target="intro-by-topic">
              games</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">Franchise also announces new <cite>Kamen Rider MY-TH</cite> series, live-action films, game project</span>
          <span class="full">― Toei announced on Friday the establishment of a "The Kamen Rider Animated" label for animated film projects in the <cite>Kamen Rider</cite> franchise. The first work will be a co-production between Aniplex and Shirogumi. ┌──── KAMEN RIDER ────┐　　　　THE KAMENRIDER　　　　　 ANIMATED　　　Aniplex・白組とタッグ└──── 55th GOGO!! ────┘現在企画進行中！続報を...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="herald box aside reviews t-review" data-topics="article235825 reviews anime">
    <div class="category-line reviews t-review"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gH2/cms/review.2/235825/horizons-169-en.png.jpg">
      <div class="overlay">
        <div class="category reviews t-review">
          review
        </div>
        <div class="comments"><a href="/cms/discuss/235825">2 comments</a></div>
      </div>
      
      <a href="/review/pokemon-horizons-season-3-rising-hope/part-2/.235825" data-track="id=196619&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/review/pokemon-horizons-season-3-rising-hope/part-2/.235825" data-track="id=196619&amp;from=SB"><cite>Pokémon Horizons Season 3 - Rising Hope</cite> Part 2 Anime Series Review</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-02T16:00:00+00:00">Apr  2, 16:00</time>
          <div class="comments"><a href="/cms/discuss/235825">2 comments</a></div>
          <span class="topics">
            <a topic="anime" href="/all/?topic=anime" target="intro-by-topic">
              anime</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">The show is still taking advantage of the timeskip to tell a slightly more mature story; most of the cast is given a lot more depth, the symbolism is stronger, and the animation has greatly improved.</span>
          <span class="full">― The status quo has shifted, the villains are in power, and the Rising Volt Tacklers are on the back foot. But now that they're finally back together, it's time to start launching a counterattack or at ...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="herald box aside column t-this-week-in-anime" data-topics="article236021 column merch">
    <div class="category-line column t-this-week-in-anime"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gHN/cms/this-week-in-anime/236021/chris12.jpg">
      <div class="overlay">
        <div class="category column t-this-week-in-anime">
          column
        </div>
        <div class="comments"><a href="/cms/discuss/236021">14 comments</a></div>
      </div>
      
      <a href="/this-week-in-anime/2026-04-02/.236021" data-track="id=196675&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/this-week-in-anime/2026-04-02/.236021" data-track="id=196675&amp;from=SB">This Week in Anime - How Many Figures Do You Earn Annually?</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-02T14:00:00+00:00">Apr  2, 14:00</time>
          <div class="comments"><a href="/cms/discuss/236021">14 comments</a></div>
          <span class="topics">
            <a topic="merch" href="/all/?topic=merch" target="intro-by-topic">
              merch</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">Is it the return of Astro Toy? No, it's just Coop and Chris waxing eloquent about the pains and joys of collecting anime toys.</span>
          <span class="full">―  Is it the return of Astro Toy? No, it's just Coop and Chris waxing eloquent about the pains and joys of collecting anime toys. Disclaimer: The views and opinions expressed by the participants in this chatlog are not the views of Anime News Network. @RiderStrike @BWProwl @L...</span>
        </div>
      </div>
    </div>
  </div>

   

      
      
    </div>
  </div>
</div>
      
     </div>
     <div id="footer">
       All material <a href="/copyright-policy">Copyright</a> © Anime News Network LLC. All rights reserved.<br>
       <small>served by mayu-chan</small>
       <div id="Adbanner"></div>
     </div>
    </div>
    <div class="bottom gutter">
     <a href="/sponsor/click.php/19147/7969/1775433936/549999/2" target="_blank" untracked-href="https://yenpress.com/titles/9798855430493-frieren-beyond-journey-s-end-prelude-vol-1-novel" rel="sponsored nofollow"></a>
    </div>
   </div>
   <div class="right side gutter">
    <span class="top-area"></span>
    <a href="/sponsor/click.php/19147/7969/1775433936/549999/1" target="_blank" untracked-href="https://yenpress.com/titles/9798855430493-frieren-beyond-journey-s-end-prelude-vol-1-novel" rel="sponsored nofollow"></a>
   </div>
  </div>
  
  <button class="report_button" type="button" data-report-button="">
    <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#bubble_exclamation"></use></svg>
    <span>Report a Problem</span>
  </button>
<div id="mobile-menu-overlay"></div>
<div id="mobile-menu">
  <button class="close" type="button">×</button>
  
  <ul class="sections">
  
    <li class="news front">
      <a href="/news/">News</a>
      <div class="subsections-wrapper">
        <ul class="subsections">
          <li><a href="/convention/">Convention reports</a></li>
          <li><a href="/newsfeed/">Newsfeed</a></li>
          <li><a href="/interest/">Interest</a></li>
          <li><a href="/press-release/">Press Releases</a></li>
        </ul>
      </div>
    </li>
    
    <li class="views">
      <a href="/views/">Views</a>
      <div class="subsections-wrapper">
        <ul class="subsections">
          <li><a href="/feature/">Features</a></li>
          <li><a href="/review/">Reviews</a></li>
          <li><a href="/column/">Columns</a></li>
        </ul>
      </div>
    </li>
    
    <li class="newanime">
      <div class="heading">New Anime</div>
      <div class="subsections-wrapper">
        <ul class="subsections">
          <li><a href="/season/2026/spring/">Spring 2026 current season</a></li>
          <li><a href="/encyclopedia/anime/episodes/latest"><b>Your Score</b> for Recent Simulcasts</a></li>
          <li><a href="/encyclopedia/anime/upcoming/tv">Upcoming Anime List</a></li>
          <li><a href="/encyclopedia/releases.php?format=video" rel="nofollow">Upcoming DVD &amp; Blu-ray</a></li>
          <li><a href="/weekly-ranking/">Weekly Rankings</a></li>
          
          
  
    <li><a href="/preview-guide/2026/spring/.234640">Spring 2026 Preview Guide</a></li>
  

          <li><a href="/episode-review/">Daily Streaming Reviews</a></li>
        </ul>
      </div>
    </li>
    
    <li class="encyc">
      <a href="/encyclopedia/">Encyclopedia</a>
    </li>
    
    <li class="forum">
      <a href="/bbs/phpBB2/">Forum</a>
    </li>
    
    <li class="interactive">
      <a href="/my/">My ANN</a>
      <div class="subsections-wrapper">
        <ul class="subsections">
            <li><a href="/subscription/">Subscribe »</a></li>
          <li><a href="/MyAnime/">My Anime</a></li>
          <li><a href="/MyManga/">My Manga</a></li>
          <li><a href="/newsletter">Newsletter</a></li>
          <li><a href="/connect/">ANN:Connect</a></li>
        </ul>
      </div>
    </li>
    
    <li class="about">
      <div class="heading">About</div>
      <div class="subsections-wrapper">
        <ul class="subsections">
          <li><a href="/staff">Our Team</a></li>
          <li><a href="/contact">Contact us</a></li>
          <li><a href="/staff-openings">Staff openings</a></li>
          <li><a href="/privacy-policy">Privacy policy</a></li>
          <li><a href="/copyright-policy">Copyright policy</a></li>
          <li><a href="/advertising">Advertise with ANN</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="#" data-report-button="">Report a Problem</a></li>
          <li><a href="/bbs/phpBB2/viewforum.php?f=6">Bugs &amp; Technical Questions Forum</a></li>
        </ul>
      </div>
    </li>
    
  </ul>
</div>
  
<!--foot-->

<script>jQuery.ready();</script>


  <script defer type="text/javascript">ann_init();</script><span id="DOM_end"></span> 


<script>ANN.data_grid.load_if_ready()</script>

<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "fbd98daa56204e41bdfee66421e0a2f8"}'></script>

  <script async="" src="https://www.googletagmanager.com/gtag/js?id=UA-921142-1"></script>
  <script>
    gtag('js', new Date());
    gtag('config', 'UA-921142-1', {
      'custom_map': {'dimension1': 'edition', 'dimension2': 'section', 'dimension3': 'errorpage'}
    });
    //gtag('config', 'G-...', {
    gtag('event', 'page_info', {
      'edition': "World",
      'section': ANN.ads.pageinfo.section || "encyc",
      'errorpage': document.ann_errorpage || null,
    });
  </script>

  <script>
    ANN.logev.server_log('foot');
    ANN.matomo.LOGGER_URL = "https://eta.animenewsnetwork.com/m/";
    ANN.matomo.track_page();
  </script>
  <script async="" src="//cdn.animenewsnetwork.com/assets/2aad8740afe4a5d49c2de29a52b886b2be5bc94c.js"></script>




  
  
 

</body></html>

<!DOCTYPE html>
<html render_time="66.34878574121093" lang="en" class="skin-mode-1 mobile-mode-0 gutter-mode-2 sidebar-mode-1 menu-mode-0 grid-mode-3 grid-mode-not-1 js-off desktop-device touch-mode-0"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="HandheldFriendly" content="true">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="referrer" content="origin-when-cross-origin">
  
  
  
  <link rel="canonical" href="https://www.animenewsnetwork.com/encyclopedia/api.php"> 
    <link rel="shortcut icon" href="/meta/favicon.ico" type="image/x-icon">
  <link rel="search" type="application/opensearchdescription+xml" title="Anime News Network" href="/meta/search.general.xml">
  <link rel="search" type="application/opensearchdescription+xml" title="ANN Encyclopedia" href="/meta/search.encyclopedia.xml">
  <meta name="copyright" content="Copyright (C) 2006 Anime News Network">
  <title>Encyclopedia API - Anime News Network:W</title>
   

  
  
  <link rel="stylesheet" type="text/css" href="/assets/ab85518f5293b2bf7befa908114c95ce30508a80.css" cdn="no">
  <link rel="stylesheet" type="text/css" href="//cdn.animenewsnetwork.com/assets/9f68e933738bd3b5c9df1f8bac4713a427c6478a.css" media="screen, projection, tv">
  <style class="easyread-style-sheet">
    html.mobile-mode-0 .easyread-width,
    html.mobile-mode-0 .easyread-maxwidth { max-width: 50.0em; }
    html.mobile-mode-0 .maincontent.forum { width: 59.0em; }
  </style>
  <noscript><style>.requires-javascript { display:none !important }</style></noscript>
  
    <link rel="stylesheet" type="text/css" href="//cdn.animenewsnetwork.com/assets/0f948422ec61291716aa94dfbdaa8223b1b634ae.css" media="screen, projection, tv">
  <link rel="stylesheet" type="text/css" href="//cdn.animenewsnetwork.com/assets/d539752c907e6cc40e61b8028e7e760078a18145.css">
  <noscript><style>.js-content{ display:none !important }</style></noscript>

  
  <script>if (typeof JSON == 'undefined' || typeof JSON.stringify == 'undefined') document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js"><\/script>');</script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script><script>if (typeof window.jQuery == 'undefined') document.write('<script src="/javascripts/jquery.min.js"><\/script>');</script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script><script>if (typeof window.Hammer == 'undefined') document.write('<script src="/javascripts/hammer.min.js"><\/script>');</script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/svg4everybody/2.1.9/svg4everybody.min.js"></script><script>if (typeof window.svg4everybody == 'undefined') document.write('<script src="/javascripts/svg4everybody.js"><\/script>');</script>
  <script src="//cdn.animenewsnetwork.com/assets/089c574d6a71f05968e97e81330340206ead51f8.js" onload=" if (typeof ANN == 'undefined'){ to_recover = { name: 'ANN', url: event.path[0].src, }; document.write('&lt;script src=&quot;/assets/a579bb4379ff2aee7c69238bc7c1b38353a7f523.js&quot;&gt;&lt;/script&gt;'); } "></script>
  
  <script src="//cdn.animenewsnetwork.com/javascripts/ads.js"></script>
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prototype/1.7.3/prototype.js"></script>
  <script>if (typeof Prototype == 'undefined') document.write('<script src="/javascripts/prototype.js"><\/script>');</script>
  <script>
    P = $;
    Prototype_setup_ajax();
  </script>

    <script src="//cdn.animenewsnetwork.com/assets/6e80f2d8fdc68508ed23d22d847f470d747b73a8.js"></script>
      <script>
  ANN.ads.pageinfo.section = 'encyc';
   
  </script>

  
  <script>
    ANN.edition = "en-W";
    
    ANN.ads.pageinfo.ref = 'annsearch';
    ANN.lazyload.use_cdn = true;
    ANN.user_preferences.namespace = "";
    ANN.user_preferences.profile_and_name = ["desktop","Desktop"];
    ANN.user_preferences.available_schema = ["sidebar_images","sidebar_minimize","mainfeed_viewmode","grid_filters","easyread_text_width","infinite_scroll","infinite_scroll_mix_news_and_interest","no_sexy_ad_skins","hide_report_a_problem","data_grid","i_am_18"];
    ANN.user_preferences.server_list = {};
    ANN.user_preferences.setup();
    J.extend(ANN.logev.entry.info, {
      server: "mayu",
      ann5_session: 'crypted:gO2uyfHij_10.cGTrJ1x5MkECztrAVvrTtWpfje-ItWee2wN9ivllf6s0nNMMwe6xhiEiBDH2yifXKwKPnWvahhsuCicLy5TA6vIa',
      cf_ray: "9e7c8d012d08190f-FRA",
      current_location: "en-W/lst/encyc/encyclopedia/api.php/;MA/00/;annsearch/desktop;-",
      generated_at: J.extend({"time":1775434030.434,"main_age":0.396}, {duration: ANN.performance.render_time}),
    });
    ANN.performance.log.push('recv=3');
    ANN.logev.save();
    ANN.logev.server_log('head');
  </script>
  <script>ANN.data_grid.user_configs_are_loaded = true;</script>
  
  
  
  
  
  

</head>
 <body>
  <script>ANN.layout.body_start();</script>
  
  <div id="page">
   <div class="left side gutter">
    <span class="top-area"></span>
    <a href="/sponsor/click.php/19147/7969/1775434030/434000/3" target="_blank" untracked-href="https://yenpress.com/titles/9798855430493-frieren-beyond-journey-s-end-prelude-vol-1-novel" rel="sponsored nofollow"></a>
   </div>
   <div id="canvas">
<div id="header" class="top-area">
  
  <div class="left half">
    <div class="actionable hamburger">
      <div class="header-button" title="Open Menu">
        <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#menu"></use></svg>
      </div>
    </div>
    <div class="actionable logo">
      <a href="/" title="Return to Homepage"><img src="//cdn.animenewsnetwork.com/stylesheets/img/logo.name.no-dot.png" width="313" height="37" alt=""></a>
    </div>
    <div class="actionable edition">
      <div class="dropdown button" title="Choose Your Edition">
        <span class="oneline">World</span>
        <ul>
          <li onclick="ANN.set_edition('en-W')">World</li>
          <li onclick="ANN.set_edition('en-US')">USA &amp; Canada</li>
          <li onclick="ANN.set_edition('en-AU')">Australia &amp; New-Zealand</li>
          <li onclick="ANN.set_edition('en-IN')">India</li>
          <li onclick="ANN.set_edition('en-SEA')">Southeast Asia</li>
          <li onclick="ANN.set_edition('fr-FR')">Français</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="right half">
    <div class="actionable hamburger">
      <div class="header-button" title="Open Menu">
        <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#menu"></use></svg>
      </div>
    </div>
    
    <div class="actionable short-logo">
      <img src="//cdn.animenewsnetwork.com/stylesheets/img/logo.short.png" width="88" height="24" alt="">
    </div>
    
    <div class="actionable socials">
      <div class="header-button twitter" title="Twitter">
        <a href="https://twitter.com/anime" target="_blank">
          <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#twitter"></use></svg></a>
      </div>
      <div class="header-button youtube" title="Youtube">
        <a href="https://www.youtube.com/c/animenewsnetworkANN" target="_blank">
          <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#youtube"></use></svg></a>
      </div>
      <div class="header-button facebook" title="Facebook">
        <a href="https://www.facebook.com/animenewsnetwork" target="_blank">
          <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#facebook"></use></svg></a>
      </div>
      <div class="header-button instagram" title="Instagram">
        <a href="https://www.instagram.com/animenewsnetwork/" target="_blank">
          <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#instagram"></use></svg></a>
      </div>
      <div class="header-button tiktok" title="TikTok">
        <a href="https://www.tiktok.com/@animenewsnetwork" target="_blank">
          <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#tiktok"></use></svg></a>
      </div>
      <div class="header-button bluesky" title="Bluesky">
        <a href="https://bsky.app/profile/animenewsnetwork.com" target="_blank">
          <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#bluesky"></use></svg></a>
      </div>
    </div>
    
    <div class="actionable buttons">
      <div class="header-button report" title="Report a Problem">
        <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#bubble_exclamation"></use></svg>
      </div>
      <div class="header-button user" title="Login or Register">
        <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#enter"></use></svg>

<div class="user_menu login_register">
  <div class="content">
    <form class="block login" action="https://www.animenewsnetwork.com/account/login" method="post">
      <div class="block-heading">Login</div>
      <hr>
      <input type="text" name="l" placeholder="Username or Email" class="rounded-textbox">
      <input type="password" name="p" placeholder="Password" class="rounded-textbox">
      <a class="password-reminder" href="/account/reminder" rel="nofollow">forgot it?</a>
      <label><input type="checkbox" name="remember" value="yes">remember me</label>
      <input type="hidden" name="redirect" value="https://www.animenewsnetwork.com/encyclopedia/api.php">
      <input type="submit" value="Login">
      
      <div class="or-divider">or</div>
      
      <a class="social_login facebook" href="/auth/facebook/login">
        <div class="sicon"><svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#facebook"></use></svg></div>
        <div class="stext">Login with Facebook</div></a>
      <a class="social_login twitter" href="/auth/twitter/login">
        <div class="sicon"><svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#twitter"></use></svg></div>
        <div class="stext">Login with Twitter</div></a></form>
    
    
    <form class="block register" action="/account/register!" method="post">
      <div class="block-heading">Register</div>
      <hr>
      <div class="pitch">
        No account yet?
        <a href="/account/register" rel="nofollow">Registering</a> is <b>free</b>, <b>easy</b>, and <b>private</b>.
        Discuss in the forum, contribute to the Encyclopedia, build your own MyAnime lists, and more.
      </div>
      <input type="email" name="email" placeholder="Email (we'll send a sign-in key)" class="rounded-textbox">
      <input type="submit" value="Register"></form>
    
  </div>
</div>

      </div>
      <div class="header-button search" title="Search">
        <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#search"></use></svg>
      </div>
    </div>
    
    <div class="actionable" id="searchbox">
      <form method="get" action="/search" class="search">
        <input type="text" name="q" placeholder="Search" autocomplete="off" class="rounded-textbox">
        <button class="submit" type="submit"></button>
        <div class="close">×</div>
        <ul class="search-suggest">
          <li class="selected" data-action="/search" data-param="q"><span></span> anywhere on the site</li>
          <li data-action="/encyclopedia/search/name" data-param="q"><span></span> in the encyclopedia</li>
          <li data-action="/bbs/phpBB2/search.php" data-param="search_keywords"><span></span> in the forums</li>
        </ul></form>
      
    </div>
    
  </div>
  
</div>
    <div class="top gutter">
     <a href="/sponsor/click.php/19147/7969/1775434030/434000/0" target="_blank" untracked-href="https://yenpress.com/titles/9798855430493-frieren-beyond-journey-s-end-prelude-vol-1-novel" rel="sponsored nofollow"></a>
    </div>
    <div class="middle-area">
     <div class="iab top">
            <div>
              <noscript>
                <iframe src="/show.aframe?t=B&amp;js=no" scrolling="no"></iframe>
              </noscript>
            </div>
          </div>
     <div id="menu">
<nav id="mega">
  
  <div class="news menu">
    <span>News</span>
    <div><nav>
      <ul class="colspan1of2">
        <li><h4>
          <a href="/news/">News</a>
          <a href="/news/archive" class="archives">chronological archives</a>
        </h4></li>
        


<li>
  <span class="time-posted"><time datetime="2026-04-05T12:12:46-04:00">12:12</time></span>
  <span><a href="/news/2026-04-05/wistoria-wand-and-sword-season-2-casts-mai-nakahara/.236115"><cite>Wistoria: Wand and Sword</cite> Season 2 Casts Mai Nakahara</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T11:42:50-04:00">11:42</time></span>
  <span><a href="/news/2026-04-05/all-pokemon-centers-in-japan-cancel-most-events-in-april/.236091">All Pokémon Centers in Japan Cancel Most Events in April</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T11:37:49-04:00">11:37</time></span>
  <span><a href="/news/2026-04-05/the-promised-neverland-manga-gets-stage-musical-this-winter/.236113"><cite>The Promised Neverland</cite> Manga Gets Stage Musical This Winter</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T09:32:09-04:00">09:32</time></span>
  <span><a href="/news/2026-04-05/the-detective-is-already-dead-anime-unveils-season-2-1st-video-switch-game/.236114"><cite>The Detective Is Already Dead</cite> Anime Unveils Season 2's 1st Video, Switch Game</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T07:05:00-04:00">07:05</time></span>
  <span><a href="/news/2026-04-05/japan-video-game-rankings-march-23-29/.236107">Japan's Video Game Rankings, March 23-29</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T06:05:00-04:00">06:05</time></span>
  <span><a href="/news/2026-04-05/japan-video-game-rankings-march-16-22/.236105">Japan's Video Game Rankings, March 16-22</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T03:05:00-04:00">03:05</time></span>
  <span><a href="/news/2026-04-05/86-asato-asato-launches-new-light-novel-series-in-june/.236092"><cite>86's</cite> Asato Asato Launches New Light Novel Series in June</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T01:14:25-04:00">01:14</time></span>
  <span><a href="/news/2026-04-05/inklore-announces-new-titles-previews-at-anime-boston/.236104">Inklore Announces New Titles, Previews at Anime Boston</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-05T00:00:30-04:00">00:00</time></span>
  <span><a href="/news/2026-04-05/star-detective-precure-anime-gets-film-opening-on-september-18/.236103"><cite>Star Detective Precure!</cite> Anime Gets Film Opening on September 18</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-04T17:00:00-04:00">Apr  4</time></span>
  <span><a href="/news/2026-04-04/ize-press-licenses-4-webtoons-for-english-print-release/.236061">Ize Press Licenses 4 Webtoons for English Print Release</a></span>
</li>



        
        <li><h4>
          <a href="/convention/">Convention reports</a>
          <a href="/convention/archive" class="archives">chronological archives</a>
        </h4></li>
        


<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-29T11:41:46-04:00">Mar 29</time></span>
  <span><a href="/convention/2026/animejapan/.235923">AnimeJapan 2026</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2025-10-16T17:30:00-04:00">Oct 16</time></span>
  <span><a href="/convention/2025/ronin-and-sith-reunite-in-star-wars-visions-the-duel-payback/.229769">Ronin and Sith Reunite in <cite>Star Wars Visions The Duel: Payback</cite></a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2025-10-16T16:30:00-04:00">Oct 16</time></span>
  <span><a href="/convention/2025/trigun-stargaze-aims-for-the-stars-episode-1-2-review/.230015"><cite>Trigun Stargaze</cite> Aims for the Stars: Episode 1-2 Review</a></span>
</li>




        <li><h4><a href="/newsfeed/">Newsfeed</a></h4></li>
      </ul>
      <ul class="colspan1of2">
        <li><h4>
          <a href="/interest/">Interest</a>
          <a href="/interest/archive" class="archives">chronological archives</a>
        </h4></li>
        


<li>
  <span class="time-posted"><time datetime="2026-04-04T23:59:00-04:00">Apr  4</time></span>
  <span><a href="/interest/2026-04-04/japan-iconic-licca-chan-doll-makes-american-debut/.235639">Japan's Iconic Licca-chan Doll Makes American Debut</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-03T23:59:00-04:00">Apr  3</time></span>
  <span><a href="/interest/2026-04-03/sailor-moon-artemis-watches-over-nasa-artemis-ii-mission/.236058"><i>Sailor Moon's</i> Artemis Watches Over NASA's Artemis II Mission</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-03T00:00:00-04:00">Apr  3</time></span>
  <span><a href="/interest/2026-04-03/bandai-announces-macross-f-x-top-gun-maverick-crossover-toy/.236006">Bandai Announces <i>Macross F x Top Gun: Maverick</i> Crossover Toy</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-02T22:00:00-04:00">Apr  2</time></span>
  <span><a href="/interest/2026-04-02/animate-apologizes-for-inappropriate-april-fool-joke-for-unlimited-mates-dating-game/.236042">Animate Apologizes for 'Inappropriate' April Fool's Joke for <i>Unlimited Mates</i> Dating 'Game'</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-02T13:15:27-04:00">Apr  2</time></span>
  <span><a href="/interest/2026-04-02/crunchyroll-anime-awards-reveals-2026-nominees/.236046">Crunchyroll Anime Awards Reveals 2026 Nominees</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-01T23:59:00-04:00">Apr  1</time></span>
  <span><a href="/interest/2026-04-01/happy-april-fool-day-2026-from-around-the-anime-world-part-v/.236026">Happy April Fool's Day 2026 From Around the Anime World, Part V</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-01T19:25:00-04:00">Apr  1</time></span>
  <span><a href="/interest/2026-04-01/happy-april-fool-day-2026-from-around-the-anime-world-part-iv/.236024">Happy April Fool's Day 2026 From Around the Anime World, Part IV</a></span>
</li>



        
        <li><h4>
          <a href="/press-release/">Press Releases</a>
          <a href="/press-release/archive" class="archives">chronological archives</a>
        </h4></li>
        


<li>
  <span class="time-posted"><time datetime="2026-04-04T22:09:38-04:00">Apr  4</time></span>
  <span><a href="/press-release/2026-04-04/hikaru-utada-returns-with-new-single-pappaparadise-out-may-6-serves-as-the-ending-theme-for-beloved-/.236100">Hikaru Utada Returns With New Single “PAPPAPARADISE” Out May 6: Serves As The Ending Theme For Beloved Anime <cite>Chibi Maruko-chan</cite></a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-04T17:00:00-04:00">Apr  4</time></span>
  <span><a href="/press-release/2026-04-04/ize-press-unveils-four-new-webcomic-print-editions-at-sakura-con-2026/.235832">Ize Press Unveils Four New Webcomic Print Editions at Sakura-Con 2026</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-04T17:00:00-04:00">Apr  4</time></span>
  <span><a href="/press-release/2026-04-04/yen-press-ignites-a-fateful-fall-with-eight-new-licenses/.236087">Yen Press Ignites a Fateful Fall with Eight New Licenses</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-03T17:03:00-04:00">Apr  3</time></span>
  <span><a href="/press-release/2026-04-03/seven-knights-re-birth-unleashes-celestial-guardian-randgrid-in-new-update/.236086"><cite>Seven Knights Re:BIRTH</cite> Unleashes Celestial Guardian 'Randgrid' In New Update</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-03T17:02:00-04:00">Apr  3</time></span>
  <span><a href="/press-release/2026-04-03/viz-media-lands-rumiko-takahashi-mao-sets-april-4-premiere-on-hulu-in-the-u.s-and-disney-in-select-/.236085">Viz Media Lands Rumiko Takahashi's <cite>MAO</cite>, Sets April 4 Premiere on Hulu in the U.S. and Disney+ in Select International Markets</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-03T17:01:00-04:00">Apr  3</time></span>
  <span><a href="/press-release/2026-04-03/toei-unveils-global-kamen-rider-franchise-expansion-for-iconic-character-55th-anniversary/.236083">Toei Unveils Global <cite>Kamen Rider</cite> Franchise Expansion for Iconic Character's 55th Anniversary</a></span>
</li>



      </ul>
    </nav></div>
  </div>
  
  <div class="views menu">
    <span>Views</span>
    <div><nav>
      <ul class="colspan1of2">
        <li><h4>
          <a href="/feature/">Features</a>
          <a href="/feature/archive" class="archives">chronological archives</a>
        </h4></li>
        


<li>
  <span class="time-posted"><time datetime="2026-04-05T09:00:00-04:00">09:00</time></span>
  <span><a href="/feature/2026-04-05/sailor-guardians-take-on-a-modern-threat-in-stunning-new-musical-show/.236106">Sailor Guardians Take on a Modern Threat in Stunning New Musical Show</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-03T09:00:00-04:00">Apr  3</time></span>
  <span><a href="/feature/2026-04-03/absolute-borderline-the-early-days-of-evangelion-fandom-part-three/.235164">Absolute Borderline: The Early Days of Evangelion Fandom, Part Three</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-01T09:00:00-04:00">Apr  1</time></span>
  <span><a href="/preview-guide/2026/spring/.234640">The Spring 2026 Anime Preview Guide</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-01T09:00:00-04:00">Apr  1</time></span>
  <span><a href="/interview/2026-04-01/creating-a-fanclub-director-sou-toyama-on-kirio-fan-club/.235964">Creating a Fanclub: Director Sou Toyama on <i>Kirio Fan Club</i></a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-27T09:00:00-04:00">Mar 27</time></span>
  <span><a href="/seasonal/2026/spring/.234642">The Most Anticipated Anime of Spring 2026</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-25T09:00:00-04:00">Mar 25</time></span>
  <span><a href="/seasonal/2026/winter/.234643">The Worst Anime of Winter 2026</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-23T19:30:00-04:00">Mar 23</time></span>
  <span><a href="/watch/2026-03-23/the-spring-2026-anime-trailer-party-premieres-tomorrow-night/.235658">The Spring 2026 Anime Trailer Watch Party Premieres Tomorrow Night!</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-23T17:30:00-04:00">Mar 23</time></span>
  <span><a href="/weekly-ranking/2026/winter/.235654">Your Anime Rankings - Best of Winter 2026, Mar 12-18</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-23T09:00:00-04:00">Mar 23</time></span>
  <span><a href="/interview/2026-03-23/making-bad-animation-beautiful-an-with-chao-director-yasuhiro-aoki/.231093">Making 'Bad' Animation Beautiful: An Interview with <i>ChaO</i> Director Yasuhiro Aoki</a></span>
</li>



        
        <li><h4>
          <a href="/review/">Reviews</a>
          <a href="/review/archive" class="archives">alphabetical archives</a>
        </h4></li>
        


<li>
  <span class="time-posted"><time datetime="2026-04-05T12:00:00-04:00">12:00</time></span>
  <span><a href="/review/devil-in-the-lunch-deals-manga/.233335"><cite>Devil's in the Lunch Deals</cite> Manga Review</a></span>
</li>

<li>
  <span class="time-posted"><time datetime="2026-04-04T12:00:00-04:00">Apr  4</time></span>
  <span><a href="/review/oshi-no-ko-volumes-9-10-manga/.234208"><cite>Oshi no Ko</cite> Volumes 9-10 Manga Review</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-03T12:00:00-04:00">Apr  3</time></span>
  <span><a href="/review/from-a-knight-to-a-lady/volume-1/.235771"><cite>From a Knight to a Lady</cite> Volume 1 K-Comic Review</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-02T12:00:00-04:00">Apr  2</time></span>
  <span><a href="/review/pokemon-horizons-season-3-rising-hope/part-2/.235825"><cite>Pokémon Horizons Season 3 - Rising Hope</cite> Part 2 Anime Series Review</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-01T12:00:00-04:00">Apr  1</time></span>
  <span><a href="/review/mcdonald-x-evangelion-transforming-toys/.235983">McDonald's x Evangelion Transforming Toys Review</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-31T12:00:00-04:00">Mar 31</time></span>
  <span><a href="/review/demon-king-daughter-is-too-kind/anime-series/.235824"><cite>Demon King's Daughter Is Too Kind!!</cite> Anime Series Review</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-30T12:00:00-04:00">Mar 30</time></span>
  <span><a href="/review/be-forever-yamato/star-blazers/rebel-3199-episodes-15-18-anime/.235310"><i>Be Forever Yamato: Star Blazers: Rebel 3199</i> Episodes 15-18 Anime Review</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-29T12:00:00-04:00">Mar 29</time></span>
  <span><a href="/review/gizmo-riser-volume-1-manga/.234209"><cite>Gizmo Riser</cite> Volume 1 Manga Review</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-28T12:00:00-04:00">Mar 28</time></span>
  <span><a href="/review/kowloon-generic-romance-volumes-9-10-manga/.234211"><cite>Kowloon Generic Romance</cite> Volumes 9-10 Manga Review</a></span>
</li>



      </ul>
      <ul class="colspan1of2">
        <li><h4>
          <a href="/column/">Columns</a>
          <a href="/column/archive" class="archives">chronological archives</a>
        </h4></li>
        


<li class="not_recent">
  <span class="time-posted"><time datetime="2026-04-02T10:00:00-04:00">Apr  2</time></span>
  <span><a href="/this-week-in-anime/2026-04-02/.236021">This Week in Anime - How Many Figures Do You Earn Annually?</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-27T10:00:00-04:00">Mar 27</time></span>
  <span><a href="/this-week-in-games/2026-03-27/interview-with-patricia-summersett-voice-of-princess-zelda/.235609">This Week in Games - Interview with Patricia Summersett, Voice of Princess Zelda</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-23T10:00:00-04:00">Mar 23</time></span>
  <span><a href="/answerman/2026-03-23/.235570">Answerman - Hiding Behind Pen Names</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2026-03-10T12:48:06-04:00">Mar 10</time></span>
  <span><a href="/this-week-in-mobile-games/2026-03-10/.235052">This Week in Mobile Games - I Wanna Be The Very Best, Like Mobile Ever Was</a></span>
</li>



        
        <li><h4>
          <a href="/newtype/" class="t-newtype">Newtype</a>...
          <a href="/newtype/archive" class="archives">chronological archives</a>
        </h4></li>
        


<li class="not_recent">
  <span class="time-posted"><time datetime="2025-04-29T09:00:00-04:00">Apr 29</time></span>
  <span><a href="/newtype/2025-04-29/exclusive-interview-with-sakamoto-days-cast-tomokazu-sugita-as-taro-sakamoto-and-nobunaga-shimazaki-/.223555">Newtype Exclusive Interview with <cite>SAKAMOTO DAYS</cite> Cast, Tomokazu Sugita as Taro Sakamoto and Nobunaga Shimazaki as Shin Asakura!</a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2025-03-13T09:00:00-04:00">Mar 13</time></span>
  <span><a href="/newtype/2025-03-13/exclusive-interview-with-composer-kaoru-wada-crafting-the-soundscape-of-ranma/.221672">Newtype Exclusive Interview with Composer Kaoru Wada: Crafting the Soundscape of <cite>Ranma ½</cite></a></span>
</li>

<li class="not_recent">
  <span class="time-posted"><time datetime="2025-02-11T09:00:00-05:00">Feb 11</time></span>
  <span><a href="/newtype/2025-02-11/exclusive-interview-with-creators-behind-one-piece-fan-letter-part-2/.220541">Newtype Exclusive Interview with Creators Behind <cite>ONE PIECE FAN LETTER</cite> - Part 2</a></span>
</li>



        
        <li><h4>
          <a href="/views/">Everything</a>
          <a href="/views/archive" class="archives">chronological archives</a>
        </h4></li>
        <li class="subtypes">
          <a href="/feature/">Features</a>
          (incl.
          <a href="/interviews/">Interviews</a> and
          <a href="/newtype/">Newtype</a>,
          and also as
          <a href="/seasonal/">Seasonal</a> features like
          <a href="/anime-spotlight/">Anime Spotlight</a>,
          <a href="/preview-guide/">Preview Guide</a>,
          <a href="/weekly-ranking/">Weekly Rankings</a>)
        </li>
        <li class="subtypes">
          <a href="/review/">Reviews</a>
          (incl. <a href="/game-review/">Game Reviews</a>)
        </li>
        <li class="subtypes">
          <a href="/column/">Current Columns</a>
          (incl. <a href="/answerman/">Answerman</a>, <a href="/azure/">Intern Annika</a>, <a href="/aftershow/">The ANN Aftershow</a>, <a href="/anime-backlog/">The Anime Backlog</a>, <a href="/this-week-in-anime/">This Week in Anime</a>, <a href="/this-week-in-games/">This Week in Games</a>, <a href="/this-week-in-mobile-games/">This Week in Mobile Games</a>)
        </li>
        <li class="subtypes">
          <a href="/old-column/">Archived Columns</a>
          (incl. <a href="/anncast/">ANNCast</a>, <a href="/ann-tv/">ANNtv</a>, <a href="/anime-news-nina/">Anime News Nina!</a>, <a href="/astro-toy/">Astro Toy</a>, <a href="/brain-diving/">Brain Diving</a>, <a href="/buried-treasure/">Buried Treasure</a>, <a href="/chicks-on-anime/">Chicks On Anime</a>, <a href="/crashing-japan/">Crashing Japan</a>, <a href="/epic-threads/">Epic Threads</a>, <a href="/from-the-gallery/">From The Gallery</a>, <a href="/hai-fidelity/">Hai Fidelity</a>, <a href="/house-of-1000-manga/">House of 1000 Manga</a>, <a href="/ima-kore-ga-hoshiin-da/">Ima Kore Ga Hoshiin Da</a>, <a href="/old-school/">Old School</a>, <a href="/pile-of-shame/">Pile of Shame</a>, <a href="/right-turn-only/">RIGHT TURN ONLY!!</a>, <a href="/shelf-life/">Shelf Life</a>, <a href="/sound-decision/">Sound Decision</a>, <a href="/sub-culture/">Sub Culture</a>, <a href="/super-plastic/">Super Plastic</a>, <a href="/tales-of-the-industry/">Tales Of The Industry</a>, <a href="/tankobon-tower/">Tankobon Tower</a>, <a href="/the-click/">The Click</a>, <a href="/dub-track/">The Dub Track</a>, <a href="/edit-list/">The Edit List</a>, <a href="/the-gallery/">The Gallery</a>, <a href="/the-list/">The List</a>, <a href="/the-mike-toole-show/">The Mike Toole Show</a>, <a href="/the-set-list/">The Set List</a>, <a href="/the-stream/">The Stream</a>, <a href="/the-x-button/">The X Button</a>, <a href="/vice-and-luna/">Vice &amp; Luna</a>)
        </li>
        <li class="subtypes">
          <a href="/editorial/">Editorials</a>
          (incl. <a href="/industry-comments/">Industry Comments</a>)
        </li>
        <li class="subtypes">
          <a href="/advertorial/">Advertorials</a>
        </li>
      </ul>
    </nav></div>
  </div>
  
  <div class="newanime menu">
    <span>New Anime</span>
    <div><nav>
      <ul>
        <li><h4><a href="/season/2026/spring/">Spring 2026 current season</a></h4></li>
        <li><a href="/encyclopedia/anime/episodes/latest"><b>Your Score:</b> Rate the Latest Simulcasts</a></li>
        <li><a href="/encyclopedia/anime/upcoming/tv">Upcoming Anime List</a></li>
        <li><a href="/encyclopedia/releases.php?format=video" rel="nofollow">Upcoming DVD &amp; Blu-ray</a></li>
        <li><a href="/weekly-ranking/">Your Anime Rankings: The Best of the Season So Far According to Readers</a></li>
        <li><h4>Anime Spotlight</h4></li>
        <li><a href="/anime-spotlight/">» previous seasons</a></li>
      </ul>
      <ul>
        

<li><h4><a href="/preview-guide/2026/spring/.234640">Spring 2026 Preview Guide</a></h4></li>

<li>
  <a href="/preview-guide/2026/spring/ghost-concert-missing-songs/.234703">Ghost Concert: missing Songs</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/nippon-sangoku-the-three-nations-of-the-crimson-sun/.234704">The Spring 2026 Anime Preview Guide:  Nippon Sangoku The Three Nations of the Crimson Sun</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/mao/.234732">MAO</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/needy-girl-overdose/.234726">Needy Girl Overdose</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/kusunoki-garden-of-gods/.234700">Kusunoki's Garden of Gods</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/akane-banashi/.234701">Akane-banashi</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/mistress-kanan-is-devilishly-easy/.234699">Mistress Kanan is Devilishly Easy</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/ascendance-of-a-bookworm-part-3-adopted-daughter-of-an-archduke/.234702">Ascendance of a Bookworm Part 3: Adopted Daughter of an Archduke</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/welcome-to-demon-school-iruma-kun-season-4/.234747">Welcome to Demon School! Iruma-kun Season 4</a>
</li>

<li>
  <a href="/preview-guide/2026/spring/the-angel-next-door-spoils-me-rotten-season-2/.234695">The Angel Next Door Spoils Me Rotten Season 2</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/that-time-i-got-reincarnated-as-a-slime-season-4/.234696">That Time I Got Reincarnated as a Slime Season 4</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/snowball-earth/.234697">Snowball Earth</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/an-observation-log-of-my-fiancee-who-calls-herself-a-villainess/.234705">An Observation Log of My Fiancée Who Calls Herself a Villainess</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/haibara-teenage-new-game/.234738">Haibara's Teenage New Game+</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/killed-again-mr-detective/.234729">Killed Again, Mr. Detective?</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/petals-of-reincarnation/.234716">Petals of Reincarnation</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/dr-stone-science-future-season-4/.234694">Dr. STONE SCIENCE FUTURE Season 4</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/kirio-fan-club/.234692">Kirio Fan Club</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/the-ramparts-of-ice/.234693">The Ramparts of Ice</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/classroom-of-the-elite-4th-season-second-year-first-semester/.234691">Classroom of the Elite 4th Season: Second Year, First Semester</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/reborn-as-a-vending-machine-i-now-wander-the-dungeon-season-3/.234739">Reborn as a Vending Machine, I Now Wander the Dungeon Season 3</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/the-beginning-after-the-end-season-2/.234733">The Beginning After The End Season 2</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/always-a-catch/.234722">Always a Catch!</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/dorohedoro-season-2/.234748">Dorohedoro Season 2</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/beastars-final-season-part-2/.235897">BEASTARS Final Season Part 2</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/daemons-of-the-shadow-realm/.234698">Daemons of the Shadow Realm</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/witch-hat-atelier/.234706">Witch Hat Atelier</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/the-strongest-job-is-apparently-not-a-hero-or-a-sage-but-an-appraiser/.234718">The Strongest Job is Apparently Not a Hero or a Sage, But an Appraiser (Provisional)</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/the-drops-of-god/.234730">The Drops of God</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/the-food-diary-of-miss-maid/.234746">The Food Diary of Miss Maid</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/go-for-it-nakamura-kun/.234689">Go For It, Nakamura-kun!!</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/agents-of-the-four-seasons-dance-of/.234688">Agents of the Four Seasons: Dance of Spring</a>
</li>

<li class="not_recent">
  <a href="/preview-guide/2026/spring/rooster-fighter/.234686">Rooster Fighter</a>
</li>



        <li><a href="/preview-guide/">» previous seasons</a></li>
      </ul>
      <ul id="episode-review-for-aside">
        <li>
          <h4><a href="/episode-review/">Daily Streaming Reviews</a></h4>
        </li>
        


<li class="not_recent">
  <a href="/review/chained-soldier-season-2/.233090">Chained Soldier Season 2</a>
  <a href="/review/chained-soldier-season-2/episode-12/.235791">#12</a>
</li>

<li class="not_recent">
  <a href="/review/champignon-witch/.233101">Champignon Witch</a>
  <a href="/review/champignon-witch/episode-12/.235526">#12</a>
</li>

<li class="not_recent">
  <a href="/review/dead-account/.233110">Dead Account</a>
  <a href="/review/dead-account/episode-12/.235934">#12</a>
</li>

<li class="not_recent">
  <a href="/review/fate-strange-fake/.233103">Fate/strange Fake</a>
  <a href="/review/fate-strange-fake/episode-13/.235933">#13</a>
</li>

<li class="not_recent">
  <a href="/review/fire-force-season-3/.223500">Fire Force Season 3</a>
  <a href="/review/fire-force-season-3/episode-24/.235835">#24</a>
</li>

<li class="not_recent">
  <a href="/review/frieren-beyond-journey-end-season-2/.233104">Frieren: Beyond Journey's End Season 2</a>
  <a href="/review/frieren-beyond-journey-end-season-2/episode-10/.235937">#10</a>
</li>

<li class="not_recent">
  <a href="/review/golden-kamuy-final-season/.233108">Golden Kamuy Final Season</a>
  <a href="/review/golden-kamuy-final-season/episode-62/.235989">#62</a>
</li>

<li class="not_recent">
  <a href="/review/hana-kimi/.233112">Hana-Kimi</a>
  <a href="/review/hana-kimi/episodes-11-12/.235469">#11-12</a>
</li>

<li class="not_recent">
  <a href="/review/hell-teacher-jigoku-sensei-nube/.226673">Hell Teacher: Jigoku Sensei Nube</a>
  <a href="/review/hell-teacher-jigoku-sensei-nube/episodes-25-26/.235746">#25-26</a>
</li>

<li class="not_recent">
  <a href="/review/hell-paradise-season-2/.233092">Hell's Paradise Season 2</a>
  <a href="/review/hell-paradise-season-2/episode-12/.235974">#12</a>
</li>

<li class="not_recent">
  <a href="/review/in-the-clear-moonlit-dusk/.233111">In the Clear Moonlit Dusk</a>
  <a href="/review/in-the-clear-moonlit-dusk/episode-11/.235826">#11</a>
</li>

<li class="not_recent">
  <a href="/review/isekai-office-worker-the-other-world-books-depend-on-the-bean-counter/.233102">Isekai Office Worker: The Other World's Books Depend on the Bean Counter</a>
  <a href="/review/isekai-office-worker-the-other-world-books-depend-on-the-bean-counter/episode-12/.235688">#12</a>
</li>

<li class="not_recent">
  <a href="/review/journal-with-witch/.233084">Journal with Witch</a>
  <a href="/review/journal-with-witch/episode-13/.236010">#13</a>
</li>

<li class="not_recent">
  <a href="/review/jujutsu-kaisen-season-3-the-culling-game-part-1/.233107">Jujutsu Kaisen Season 3: The Culling Game Part 1</a>
  <a href="/review/jujutsu-kaisen-season-3-the-culling-game-part-1/episode-59/.235814">#59</a>
</li>

<li class="not_recent">
  <a href="/review/medalist-season-2/.233095">Medalist Season 2</a>
  <a href="/review/medalist-season-2/episode-6/.235887">#6</a>
</li>

<li class="not_recent">
  <a href="/review/my-hero-academia-vigilantes-season-2/.233093">My Hero Academia: Vigilantes Season 2</a>
  <a href="/review/my-hero-academia-vigilantes-season-2/episode-26/.235985">#26</a>
</li>

<li class="not_recent">
  <a href="/review/oshi-no-ko-season-3/.233083">Oshi no Ko Season 3</a>
  <a href="/review/oshi-no-ko-season-3/episode-11/.235766">#11</a>
</li>

<li class="not_recent">
  <a href="/review/roll-over-and-die/.233085">Roll Over and Die</a>
  <a href="/review/roll-over-and-die/episode-12/.235928">#12</a>
</li>

<li class="not_recent">
  <a href="/review/rooster-fighter/.234500">Rooster Fighter</a>
  <a href="/review/rooster-fighter/episode-3/.235942">#3</a>
</li>

<li class="not_recent">
  <a href="/review/sentenced-to-be-a-hero/.233082">Sentenced to Be a Hero</a>
  <a href="/review/sentenced-to-be-a-hero/episode-12/.235856">#12</a>
</li>

<li class="not_recent">
  <a href="/review/shiboyugi-playing-death-games-to-put-food-on-the-table/.233089">SHIBOYUGI: Playing Death Games to Put Food on the Table</a>
  <a href="/review/shiboyugi-playing-death-games-to-put-food-on-the-table/episode-11/.235504">#11</a>
</li>

<li class="not_recent">
  <a href="/review/tamon-b-side/.233091">Tamon's B-Side</a>
  <a href="/review/tamon-b-side/episode-13/.235981">#13</a>
</li>

<li class="not_recent">
  <a href="/review/the-darwin-incident/.233086">The Darwin Incident</a>
  <a href="/review/the-darwin-incident/episode-12/.235709">#12</a>
</li>

<li class="not_recent">
  <a href="/review/the-holy-grail-of-eris/.233100">The Holy Grail of Eris</a>
  <a href="/review/the-holy-grail-of-eris/episode-12/.235781">#12</a>
</li>

<li class="not_recent">
  <a href="/review/the-invisible-man-and-his-soon-to-be-wife/.233094">The Invisible Man and His Soon-to-Be Wife</a>
  <a href="/review/the-invisible-man-and-his-soon-to-be-wife/episode-12/.235779">#12</a>
</li>

<li class="not_recent">
  <a href="/review/trigun-stargaze/.233105">Trigun Stargaze</a>
  <a href="/review/trigun-stargaze/episode-12/.235898">#12</a>
</li>

<li class="not_recent">
  <a href="/review/wash-it-all-away/.233109">Wash It All Away</a>
  <a href="/review/wash-it-all-away/episode-12/.235675">#12</a>
</li>

<li class="not_recent">
  <a href="/review/yoroi-shinden-samurai-troopers/.233087">Yoroi-Shinden Samurai Troopers</a>
  <a href="/review/yoroi-shinden-samurai-troopers/episode-12/.235706">#12</a>
</li>

<li class="not_recent">
  <a href="/review/you-and-i-are-polar-opposites/.233096">You and I Are Polar Opposites</a>
  <a href="/review/you-and-i-are-polar-opposites/episode-12/.235936">#12</a>
</li>



      </ul>
    </nav></div>
  </div>
  
  <div class="encyc menu">
    <span>Encyclopedia</span>
    <div><nav>
      <ul>
        <li><h4><a href="/encyclopedia/anime.php">Anime</a></h4></li>
        <li>
          <form class="search" action="/encyclopedia/search/name">
            <input type="hidden" name="only" value="anime">
            <input type="text" placeholder="Search anime" name="q" class="rounded-textbox">
            <button type="submit"></button></form>
          
        </li>
        <li><a href="/encyclopedia/ratings-anime.php">Top 10</a></li>
        <li><a href="/encyclopedia/anime/episodes/latest">Latest Simulcasts</a></li>
        <li><a href="/encyclopedia/anime-list.php?licensed=1&amp;sort=title&amp;showT=1&amp;showM=1&amp;showO=1&amp;showN=1&amp;showS=1" rel="nofollow">Licensed</a></li>
        <li><a href="/encyclopedia/anime-list.php?showdate=1&amp;limit_to=100&amp;sort=date&amp;invertsort=1&amp;showT=1&amp;showM=1&amp;showO=1&amp;showN=1&amp;showS=1" rel="nofollow">Latest in Japan</a></li>
        <li>
          <a href="/encyclopedia/anime/upcoming/tv">Upcoming TV series</a>,
          <a href="/encyclopedia/anime/upcoming/movie">movies</a>,
          <a href="/encyclopedia/anime/upcoming/oav">OAVs</a>
        </li>
        
        <li><h4><a href="/encyclopedia/manga.php">Manga</a></h4></li>
        <li>
          <form class="search" action="/encyclopedia/search/name">
            <input type="hidden" name="only" value="manga">
            <input type="text" placeholder="Search manga" name="q" class="rounded-textbox">
            <button type="submit"></button></form>
          
        </li>
        <li><a href="/encyclopedia/ratings-manga.php">Top 10</a></li>
        <li><a href="/encyclopedia/anime-list.php?licensed=1&amp;sort=title&amp;showG=1" rel="nofollow">Licensed</a></li>
        <li><a href="/encyclopedia/anime-list.php?showdate=1&amp;limit_to=100&amp;sort=date&amp;invertsort=1&amp;showG=1" rel="nofollow">Latest in Japan</a></li>
      </ul>
      <ul>
        <li><h4><a href="/encyclopedia/people.php">People</a></h4></li>
        <li>
          <form class="search" action="/encyclopedia/search/name">
            <input type="hidden" name="only" value="person">
            <input type="text" placeholder="Search people" name="q" class="rounded-textbox">
            <button type="submit"></button></form>
          
        </li>
        <li><a href="/encyclopedia/people.php?most_prolific=cast">Most prolific cast</a></li>
        <li><a href="/encyclopedia/people.php?most_prolific=staff">Most prolific staff</a></li>
        
        <li><h4><a href="/encyclopedia/releases.php">Releases</a></h4></li>
        <li>
          <form class="search" action="/encyclopedia/releases.php">
            <input type="hidden" name="yearmonth" value="all">
            <input type="text" placeholder="Search releases" name="anime" class="rounded-textbox">
            <button type="submit"></button></form>
          
        </li>
        <li><a href="/encyclopedia/releases.php?yearmonth=2026-04" rel="nofollow">This month</a></li>
      </ul>
      <ul>
        <li><h4><a href="/encyclopedia/company.php">Companies</a></h4></li>
        <li>
          <form class="search" action="/encyclopedia/search/name">
            <input type="hidden" name="only" value="company">
            <input type="text" placeholder="Search companies" name="q" class="rounded-textbox">
            <button type="submit"></button></form>
          
        </li>
        <li><a href="/encyclopedia/company.php?list=licensing">Licensors</a></li>
        
        <li><h4><a href="/encyclopedia/lexicon.php">Lexicon</a></h4></li>
        <li>
          <form class="search" action="/encyclopedia/search/name">
            <input type="hidden" name="only" value="lexicon">
            <input type="text" placeholder="Search lexicon" name="q" class="rounded-textbox">
            <button type="submit"></button></form>
          
        </li>
        
        <li><h4>Tools</h4></li>
        <li><a href="/encyclopedia/search/genre" rel="nofollow">Search by genre, theme, year</a></li>
        <li><a href="/encyclopedia/compare.php" rel="nofollow">Comparison tool</a></li>
        <li><a href="/encyclopedia/preferences.php">Personal settings</a></li>
        <li><a href="/encyclopedia/">more »</a></li>
      </ul>
    </nav></div>
  </div>
  
  <div class="forum menu">
    <span>Forum</span>
    <div><nav>
      <ul>
        <li><h4><a href="/bbs/phpBB2/">Forum Categories</a></h4></li>
        
        <li><a href="/bbs/phpBB2/?c=5">Site-Related</a></li>
        <li><a href="/bbs/phpBB2/?c=2">General</a></li>
        <li><a href="/bbs/phpBB2/?c=6">Industry</a></li>
        <li><a href="/bbs/phpBB2/?c=8">For Subscribers</a></li>
      </ul>
      <ul>
        <li><h4><a href="/bbs/phpBB2/">Forums</a></h4></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=15">Talkback</a></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=1">Anime</a> &gt;
            <a href="/bbs/phpBB2/viewforum.php?f=65">Series Discussion</a></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=14">Manga</a></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=8">Encyclopedia</a></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=50">Feedback</a></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=22">Retail</a></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=42">Community</a></li>
      </ul>
      <ul>
        <li><h4>Forum Information</h4></li>
        <li><a href="/bbs/phpBB2/search.php" rel="nofollow">Search</a></li>
        <li><a href="/bbs/phpBB2/faq.php">FAQ</a></li>
        <li><a href="/bbs/phpBB2/groupcp.php">Usergroups</a></li>
      </ul>
    </nav></div>
  </div>
  
  <div class="my menu">
    <span>My ANN</span>
    <div><nav>
      <ul>
        <li><h4>Public</h4></li>
        <li><a href="/MyAnime/public.php">Public Anime Lists</a></li>
        <li><a href="/survey/">Surveys</a></li>
        <li><a href="/contest/">Contests</a> &amp; <a href="/giveaway/">Giveaways</a></li>
        <li><a href="/newsletter">Newsletter</a></li>
        <li><a href="/connect/">ANN:Connect</a></li>
      </ul>
      <ul>
        <li><h4>Subscribers</h4></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=42">Subscriber Forum</a></li>
          <li><a href="/subscription/">Subscribe »</a></li>
      </ul>
      <ul>
        <li><h4><a href="/my/">Personal</a></h4></li>
        <li><a href="/MyAnime/">My Anime</a></li>
        <li><a href="/MyManga/">My Manga</a></li>
        <li><a href="/skin/">Change skin</a></li>
        <li><a href="/myann">My Anime 2 (beta)</a></li>
      </ul>
    </nav></div>
  </div>
  
  <div class="about menu">
    <span>About</span>
    <div><nav>
      <ul>
        <li><a href="/staff">Our Team</a></li>
        <li><a href="/contact">Contact us</a></li>
        <li><a href="/site-news/">Site news</a></li>
        <li><a href="/staff-openings">Staff openings</a></li>
      </ul>
      <ul>
        <li><a href="/privacy-policy">Privacy policy</a></li>
        <li><a href="/copyright-policy">Copyright policy</a></li>
        <li><a href="/policy">Other policies</a></li>
        <li><a href="/advertising">Advertise with ANN</a></li>
      </ul>
      <ul>
        <li><h4>Help</h4></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="#" data-report-button="">Report a Problem <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#bubble_exclamation"></use></svg></a></li>
        <li><a href="/bbs/phpBB2/viewforum.php?f=6">Bugs &amp; Technical Questions Forum</a></li>
      </ul>
    </nav></div>
  </div>
  
  
  
  <div class="login menu">
    <span>
      <span class="icon"><svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#enter"></use></svg></span>
      <span class="text">Login or Register</span>
    </span>
    <div><nav class="login_register">
      <ul class="login">
        <li>
          <form action="https://www.animenewsnetwork.com/account/login" method="post">
            <input type="text" name="l" placeholder="Username or Email" class="rounded-textbox">
            <input type="password" name="p" placeholder="Password" class="rounded-textbox">
            <div class="password-reminder"><a href="/account/reminder" rel="nofollow">forgot it?</a></div>
            <label><input type="checkbox" name="remember" value="yes">remember me</label>
            <input type="hidden" name="redirect" value="https://www.animenewsnetwork.com/encyclopedia/api.php">
            <input type="submit" value="Login"></form>
          
        </li>
      </ul>
      <ul>
        <li>
          <a class="social_login facebook" href="/auth/facebook/login">
            <div class="sicon"><svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#facebook"></use></svg></div>
            <div class="stext">Login with Facebook</div></a>
          <a class="social_login twitter" href="//www.animenewsnetwork.com/auth/twitter/login">
            <div class="sicon"><svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#twitter"></use></svg></div>
            <div class="stext">Login with Twitter</div></a>
        </li>
      </ul>
      <ul>
        <li>No account yet?
          <a href="/account/register" rel="nofollow">Registering</a> is <b>free</b>, <b>easy</b>, and <b>private</b>.
          Discuss in the forum, contribute to the Encyclopedia, build your own MyAnime lists, and more.
          
        </li>
        <li>
          <form action="/account/register!" method="post" class="register">
            <input type="email" name="email" placeholder="Email (we'll send a sign-in key)" class="rounded-textbox">
            <input type="submit" value="Register">
            <small>You must be at least 13 years old.</small></form>
          
        </li>
      </ul>
    </nav></div>
  </div>
  
  <div class="clear"></div>
</nav>

     </div>
     

<div id="page-header-extramenus">

 


 


 


</div>
 

     <div id="content">
     
      <div id="main">
       <div>
        <div id="notifications" class="same-width-as-main">
         
         

         
         
        </div>
          <div id="content-preferences">
            <div class="open-preferences" title="open preferences" data-user-preferences-action-open="miscellaneous">
              <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#gear"></use></svg>
            </div>
          </div>
        <div class="en-W php-css">
  <div id="maincontent" class="maincontent encyc">
     
     
     
    
<div id="page-title">
<h1 id="page_header" class="same-width-as-main">
  Encyclopedia API 
</h1>
 
 

</div>
 
    
     
    
<div id="content-zone">
<div class="">
   
  <!-- google_ad_section_start -->
  	<style>
	tt{ color:blue }
	</style>
	<div class="text-zone easyread-width">
	ANN now provides a direct feed to the Encyclopedia data in XML format.
	There are two parts to the API.
	
	<h3>1. Reports</h3>
	
	<p>On the <a href="reports.php">reports</a> page you'll find a list of various dynamically-generated reports.
	Click on any of these and you'll see a "display as xml" link to get the results in XML format.
	
	</p><p>The number of rows in any report (either HTML or XML format) can be controlled with the url parameters <tt>nskip</tt> and <tt>nlist</tt>.
	For example you can get the first 50 rows with <tt>nskip=0&amp;nlist=50</tt>, the next 50 rows with <tt>nskip=50&amp;nlist=50</tt>, or all rows at once with <tt>nlist=all</tt>.
	Some reports accept additional parameters, like <a href="reports.php?id=155">this one</a> where <tt>type=anime</tt> limits the results to anime titles only, and <tt>name=Z</tt> limits the results to titles starting with the letter Z.
	See individual reports for details.
	
	</p><p>If you are building an application which requires a database of anime titles,
	a typical usage scenario would be to make an initial import with <tt>reports.xml?id=155&amp;type=anime&amp;nlist=all</tt>
	and then do a daily import of newly added titles with <tt>reports.xml?id=155&amp;type=anime&amp;nlist=50</tt>
	
	</p><h3>2. Anime/Manga Details</h3>
	
	If you need more information than the basic details provided in the reports, use this API to fetch detailled information for each title.
	The basic syntax is <tt>https://cdn.animenewsnetwork.com/encyclopedia/api.xml?<b>anime</b>=<b>id</b></tt>.
	Instead of <tt>anime</tt> you should use <tt>manga</tt> if you are fetching a manga's details, or <tt>title</tt> if it could be either.
	For example:
	<ul>
	<li><a href="https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=4658">api.xml?anime=4658</a> or <a href="https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=4658">api.xml?title=4658</a> to get details of <a class="ENCYC" href="anime.php?id=4658">Jinki:Extend (TV)</a></li>
	<li><a href="https://cdn.animenewsnetwork.com/encyclopedia/api.xml?manga=4199">api.xml?manga=4199</a> or <a href="https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=4199">api.xml?title=4199</a> to get details of <a class="ENCYC" href="manga.php?id=4199">Jinki:Extend (manga)</a></li>
	</ul>
	
	<p>Details for a single title can contain a lot of data so please try to spare our poor servers by fetching (and then caching) details from this API only as needed.
	In a typical usage scenario, you could present to your users a list of all anime titles imported using the reports above.
	When a user needs additional info about a certain title your backend would fetch the details for that single title and cache them for a week (older titles especially tend not to change so much).
	
	</p><h4>2a. Batching</h4>
	You can request details for several titles at once by specifying the <tt>anime</tt>/<tt>manga</tt>/<tt>title</tt> parameter more than once,
	or by using a slash-separated list of ids instead of a single id.
	You can also get results by name by specifying <tt>~name</tt> instead of an id.
	Please note this does not match alternative titles, only the <em>primary</em> name (the one in the page title).
	For example these are all equivalent ways to get details for the 3 titles in the Jinki franchise at once:
	<ul>
	<li><a href="https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=4658&amp;manga=4199&amp;manga=11608">api.xml?anime=4658&amp;manga=4199&amp;manga=11608</a>
	</li><li><a href="https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=4658&amp;manga=4199/11608">api.xml?anime=4658&amp;manga=4199/11608</a>
	</li><li><a href="https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=4658/4199/11608">api.xml?title=4658/4199/11608</a>
	</li><li><a href="https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=~jinki">api.xml?title=~jinki</a>
	</li></ul>
	Please note that you can only batch up to 50 titles at once.
	
	<h3>Terms of Service</h3>
	We provide this API free of charge but you must
	<ol>
	<li>list Anime News Network as the source of the data</li>
	<li>include a link to the relevant Encyclopedia entry (like "<a href="/encyclopedia/anime.php?id=4658">full details at Anime News Network</a>") on any page that displays anime/manga/person details</li>
	</ol>
	
	<h3>Usage Limits</h3>
	The API is rate-limited to 1 request per second per IP address;
		requests over this threshold will be delayed.
	If you would rather make 5 requests close together every 5 seconds, use nodelay.api.xml instead;
		but requests over the 1/s threshold will get a 503 error.
	</div>
	 
  <!-- google_ad_section_end -->
</div>

</div>
 
  </div>
</div>


  
  
  <div id="infinite-scroll-outlet" style="height: 0;"></div>
  
  

       </div>
      </div>
<div id="sidebar" class="grid-view thumb-view">
  <div>
    <div class="options-menu requires-javascript">
      <div class="minimize-off icon" title="maximize sidebar" onclick="ANN.sidebar.minimize(false);">⬈</div>
      <div class="minimize-on icon" title="minimize sidebar" onclick="ANN.sidebar.minimize(true);">⬋</div>
      <div class="images-off icon" title="hide images" onclick="ANN.sidebar.images(false)">-</div>
      <div class="images-on icon" title="show images" onclick="ANN.sidebar.images(true)">+</div>
      <div class="open-preferences icon" title="open preferences" data-user-preferences-action-open="sidebar">
        <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#gear"></use></svg>
      </div>
    </div>
    
    <div class="herald-boxes">
      
      
      
      
      
      
   <div class="box iab side">
          <div>
            <noscript>
              <iframe src="/show.aframe?t=R&amp;js=no" scrolling="no"></iframe>
            </noscript>
          </div>
        </div>
  <div class="herald box aside reviews t-review" data-topics="article233335 reviews manga">
    <div class="category-line reviews t-review"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gR4/cms/review.2/233335/the-devil-s-in-the-lunch-deals-title-art.jpg">
      <div class="overlay">
        <div class="category reviews t-review">
          review
        </div>
        
      </div>
      
      <a href="/review/devil-in-the-lunch-deals-manga/.233335" data-track="id=196622&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/review/devil-in-the-lunch-deals-manga/.233335" data-track="id=196622&amp;from=SB"><cite>Devil's in the Lunch Deals</cite> Manga Review</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-05T16:00:00+00:00">Apr  5, 16:00</time>
          
          <span class="topics">
            <a topic="manga" href="/all/?topic=manga" target="intro-by-topic">
              manga</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">This tale of an outcast goddess of death who makes delicious food and tries to do good deeds as penance for being, you know, a goddess of death, is prickly and weird, and I think I love it.</span>
          <span class="full">― Fairytales play a significant role in human society. They stand in as simplistic moral education, tales of punishment and reward. They are also expressions of psychological and philosophical experimentation. Fai...</span>
        </div>
      </div>
    </div>
  </div>

   
  <div class="herald box aside views t-preview-guide" data-topics="article234640 views anime">
    <div class="category-line views t-preview-guide"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gHJ/cms/preview-guide/234732/rhs-mao-cap-2.png.jpg">
      <div class="overlay">
        <div class="category views t-preview-guide">
          feature
        </div>
        <div class="comments"><a href="/cms/discuss/234640">98 comments</a></div>
      </div>
      
      <a href="/preview-guide/2026/spring/.234640" data-track="id=196744&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/preview-guide/2026/spring/.234640" data-track="id=196744&amp;from=SB">The Spring 2026 Anime Preview Guide</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-05T13:44:06+00:00">Apr  5, 13:44</time>
          <div class="comments"><a href="/cms/discuss/234640">98 comments</a></div>
          <span class="topics">
            <a topic="anime" href="/all/?topic=anime" target="intro-by-topic">
              anime</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">The Spring Anime Preview Guide continues with <b>MAO</b>, the latest series from Rumiko Takahashi! Also check out our reviewers' thoughts on Ghost Concert: missing Songs, Nippon Sangoku The Three Nations of the Crimson Sun, Ascendance of a Bookworm, and more!</span>
          <span class="full">―  Welcome to Anime News Network's Spring 2026 Anime Preview Guide! Here's how it goes: our team of critics writes up their impressions instantly, to ...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="herald box aside views t-feature" data-topics="article236106 views live-action">
    <div class="category-line views t-feature"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gK9/cms/feature/236106/sailormoon03.jpg">
      <div class="overlay">
        <div class="category views t-feature">
          feature
        </div>
        <div class="comments"><a href="/cms/discuss/236106">2 comments</a></div>
      </div>
      
      <a href="/feature/2026-04-05/sailor-guardians-take-on-a-modern-threat-in-stunning-new-musical-show/.236106" data-track="id=196738&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/feature/2026-04-05/sailor-guardians-take-on-a-modern-threat-in-stunning-new-musical-show/.236106" data-track="id=196738&amp;from=SB">Sailor Guardians Take on a Modern Threat in Stunning New Musical Show</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-05T13:00:00+00:00">Apr  5, 13:00</time>
          <div class="comments"><a href="/cms/discuss/236106">2 comments</a></div>
          <span class="topics">
            <a topic="live-action" href="/all/?topic=live-action" target="intro-by-topic">
              live-action</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">In a world that demands perfection insofar as we're creating algorithms to streamline the humanity out of art, the cast sings that "imperfection is fine" and that it's what is necessary to make us human.</span>
          <span class="full">― It felt like a full-circle career moment. There I was, in Japan, mostly for the annual AnimeJapan event coverage. This is my third year flying out of the country to intermingle with Japanese compan...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="herald box aside reviews t-review" data-topics="article234208 reviews manga">
    <div class="category-line reviews t-review"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200g13/cms/review.2/234208/oshi-no-ko-volume-12-cover.jpg">
      <div class="overlay">
        <div class="category reviews t-review">
          review
        </div>
        
      </div>
      
      <a href="/review/oshi-no-ko-volumes-9-10-manga/.234208" data-track="id=196621&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/review/oshi-no-ko-volumes-9-10-manga/.234208" data-track="id=196621&amp;from=SB"><cite>Oshi no Ko</cite> Volumes 9-10 Manga Review</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-04T16:00:00+00:00">Apr  4, 16:00</time>
          
          <span class="topics">
            <a topic="manga" href="/all/?topic=manga" target="intro-by-topic">
              manga</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">It’s painful to read this flawed yet sympathetic character slide further towards self-destruction, but that’s all part of the dark appeal of <i>Oshi no Ko</i>.</span>
          <span class="full">― For readers wanting to catch up on the manga story after the point where the anime adaptation's second season left off, volume nine is the place to start. <i>Oshi no Ko</i>'s anime maintains close fidelity to its manga source, and the four volumes covered...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="herald box aside reviews t-review" data-topics="article235771 reviews korean">
    <div class="category-line reviews t-review"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gF6/cms/review.2/235771/knight-to-lady.jpg">
      <div class="overlay">
        <div class="category reviews t-review">
          review
        </div>
        
      </div>
      
      <a href="/review/from-a-knight-to-a-lady/volume-1/.235771" data-track="id=196620&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/review/from-a-knight-to-a-lady/volume-1/.235771" data-track="id=196620&amp;from=SB"><cite>From a Knight to a Lady</cite> Volume 1 K-Comic Review</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-03T16:00:00+00:00">Apr  3, 16:00</time>
          
          <span class="topics">
            <a topic="korean" href="/all/?topic=korean" target="intro-by-topic">
              korean</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">Luci's mission becomes greater than just her own situation; she's the woman who will take back what other women lost and rewrite the narrative.</span>
          <span class="full">― Estelle spent most of her life defying gender norms. As an orphaned girl, she wanted to be in a position to protect rather than be protected, and to that end, she became one of her country's first lady knights. She continued her rise to the top, proving all...</span>
        </div>
      </div>
    </div>
  </div>

   
  <div class="herald box aside column t-column" data-topics="article235938 column games">
    <div class="category-line column t-column"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gJA/cms/column/235938/screamerdog.png.jpg">
      <div class="overlay">
        <div class="category column t-column">
          column
        </div>
        <div class="comments"><a href="/cms/discuss/235938">19 comments</a></div>
      </div>
      
      <a href="/this-week-in-games/2026-04-03/.235938" data-track="id=196715&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/this-week-in-games/2026-04-03/.235938" data-track="id=196715&amp;from=SB">Column - Screamer Interview with Milestone and Polygon Pictures</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-03T14:00:00+00:00">Apr  3, 14:00</time>
          <div class="comments"><a href="/cms/discuss/235938">19 comments</a></div>
          <span class="topics">
            <a topic="games" href="/all/?topic=games" target="intro-by-topic">
              games</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">Bad news about Sony's PlayStation pricing is tempered by an interview about <i>Screamer</i> in this week's column.</span>
          <span class="full">― Welcome back, folks! This past weekend, I was lucky enough to get invited onto the Axe of the Blood God podcast to discuss the .hack//IMOQ games, as well as the rest of the early .hack franchise. It was a great time, I deeply enjoyed getting to speak with Victor and Harper, and I'd love to do...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="herald box aside views t-feature" data-topics="article235164 views anime industry">
    <div class="category-line views t-feature"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gRV/cms/feature/232185/adv-first-ad.jpg">
      <div class="overlay">
        <div class="category views t-feature">
          feature
        </div>
        <div class="comments"><a href="/cms/discuss/235164">3 comments</a></div>
      </div>
      
      <a href="/feature/2026-04-03/absolute-borderline-the-early-days-of-evangelion-fandom-part-three/.235164" data-track="id=196655&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/feature/2026-04-03/absolute-borderline-the-early-days-of-evangelion-fandom-part-three/.235164" data-track="id=196655&amp;from=SB">Absolute Borderline: The Early Days of Evangelion Fandom, Part Three</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-03T13:00:00+00:00">Apr  3, 13:00</time>
          <div class="comments"><a href="/cms/discuss/235164">3 comments</a></div>
          <span class="topics">
            <a topic="anime" href="/all/?topic=anime" target="intro-by-topic">
              anime</a>
            <a topic="industry" href="/all/?topic=industry" target="intro-by-topic">
              industry</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">Brian brings us to the end of the beginning in the final part of his history of <i>Evangelion</i> fandom.</span>
          <span class="full">― So, ADV had just announced that they had acquired the North American rights to the Evangelion TV series. Not only that, but they also promised a version with all new animation, confusing Western fans. And how did Gainax respond to the news? Four days after ADV's announcement, Michael House, Gainax's i...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="herald box aside news t-news" data-topics="article236073 news anime live-action games">
    <div class="category-line news t-news"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gW0/cms/news.9/236073/kamen-rider.jfif.jpeg">
      <div class="overlay">
        <div class="category news t-news">
          news
        </div>
        
      </div>
      
      <a href="/news/2026-04-03/kamen-rider-franchise-establishes-new-label-for-animated-films-with-1st-project-by-aniplex-shirogumi/.236073" data-track="id=196722&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/news/2026-04-03/kamen-rider-franchise-establishes-new-label-for-animated-films-with-1st-project-by-aniplex-shirogumi/.236073" data-track="id=196722&amp;from=SB"><cite>Kamen Rider</cite> Franchise Establishes Animated Film Label With 1st Project by Aniplex, Shirogumi (Updated)</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-03T10:32:38+00:00">Apr  3, 10:32</time>
          
          <span class="topics">
            <a topic="anime" href="/all/?topic=anime" target="intro-by-topic">
              anime</a>
            <a topic="live-action" href="/all/?topic=live-action" target="intro-by-topic">
              live-action</a>
            <a topic="games" href="/all/?topic=games" target="intro-by-topic">
              games</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">Franchise also announces new <cite>Kamen Rider MY-TH</cite> series, live-action films, game project</span>
          <span class="full">― Toei announced on Friday the establishment of a "The Kamen Rider Animated" label for animated film projects in the <cite>Kamen Rider</cite> franchise. The first work will be a co-production between Aniplex and Shirogumi. ┌──── KAMEN RIDER ────┐　　　　THE KAMENRIDER　　　　　 ANIMATED　　　Aniplex・白組とタッグ└──── 55th GOGO!! ────┘現在企画進行中！続報を...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="herald box aside reviews t-review" data-topics="article235825 reviews anime">
    <div class="category-line reviews t-review"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gH2/cms/review.2/235825/horizons-169-en.png.jpg">
      <div class="overlay">
        <div class="category reviews t-review">
          review
        </div>
        <div class="comments"><a href="/cms/discuss/235825">2 comments</a></div>
      </div>
      
      <a href="/review/pokemon-horizons-season-3-rising-hope/part-2/.235825" data-track="id=196619&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/review/pokemon-horizons-season-3-rising-hope/part-2/.235825" data-track="id=196619&amp;from=SB"><cite>Pokémon Horizons Season 3 - Rising Hope</cite> Part 2 Anime Series Review</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-02T16:00:00+00:00">Apr  2, 16:00</time>
          <div class="comments"><a href="/cms/discuss/235825">2 comments</a></div>
          <span class="topics">
            <a topic="anime" href="/all/?topic=anime" target="intro-by-topic">
              anime</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">The show is still taking advantage of the timeskip to tell a slightly more mature story; most of the cast is given a lot more depth, the symbolism is stronger, and the animation has greatly improved.</span>
          <span class="full">― The status quo has shifted, the villains are in power, and the Rising Volt Tacklers are on the back foot. But now that they're finally back together, it's time to start launching a counterattack or at ...</span>
        </div>
      </div>
    </div>
  </div>
  <div class="herald box aside column t-this-week-in-anime" data-topics="article236021 column merch">
    <div class="category-line column t-this-week-in-anime"></div>
    <div class="thumbnail lazyload" data-src="/thumbnails/crop348x200gHN/cms/this-week-in-anime/236021/chris12.jpg">
      <div class="overlay">
        <div class="category column t-this-week-in-anime">
          column
        </div>
        <div class="comments"><a href="/cms/discuss/236021">14 comments</a></div>
      </div>
      
      <a href="/this-week-in-anime/2026-04-02/.236021" data-track="id=196675&amp;from=SB"></a>
    </div>
    <div class="wrap">
      <div>
        <h3>
          <a href="/this-week-in-anime/2026-04-02/.236021" data-track="id=196675&amp;from=SB">This Week in Anime - How Many Figures Do You Earn Annually?</a>
        </h3>
        <div class="byline">
          <time datetime="2026-04-02T14:00:00+00:00">Apr  2, 14:00</time>
          <div class="comments"><a href="/cms/discuss/236021">14 comments</a></div>
          <span class="topics">
            <a topic="merch" href="/all/?topic=merch" target="intro-by-topic">
              merch</a>
          </span>
        </div>
        <div class="snippet">
          <span class="hook">Is it the return of Astro Toy? No, it's just Coop and Chris waxing eloquent about the pains and joys of collecting anime toys.</span>
          <span class="full">―  Is it the return of Astro Toy? No, it's just Coop and Chris waxing eloquent about the pains and joys of collecting anime toys. Disclaimer: The views and opinions expressed by the participants in this chatlog are not the views of Anime News Network. @RiderStrike @BWProwl @L...</span>
        </div>
      </div>
    </div>
  </div>

   

      
      
    </div>
  </div>
</div>
      
     </div>
     <div id="footer">
       All material <a href="/copyright-policy">Copyright</a> © Anime News Network LLC. All rights reserved.<br>
       <small>served by mayu-chan</small>
       <div id="Adbanner"></div>
     </div>
    </div>
    <div class="bottom gutter">
     <a href="/sponsor/click.php/19147/7969/1775434030/434000/2" target="_blank" untracked-href="https://yenpress.com/titles/9798855430493-frieren-beyond-journey-s-end-prelude-vol-1-novel" rel="sponsored nofollow"></a>
    </div>
   </div>
   <div class="right side gutter">
    <span class="top-area"></span>
    <a href="/sponsor/click.php/19147/7969/1775434030/434000/1" target="_blank" untracked-href="https://yenpress.com/titles/9798855430493-frieren-beyond-journey-s-end-prelude-vol-1-novel" rel="sponsored nofollow"></a>
   </div>
  </div>
  
  <button class="report_button" type="button" data-report-button="">
    <svg role="img" class="icon"><use xlink:href="/stylesheets/icons/all.svg?1747874973#bubble_exclamation"></use></svg>
    <span>Report a Problem</span>
  </button>
<div id="mobile-menu-overlay"></div>
<div id="mobile-menu">
  <button class="close" type="button">×</button>
  
  <ul class="sections">
  
    <li class="news front">
      <a href="/news/">News</a>
      <div class="subsections-wrapper">
        <ul class="subsections">
          <li><a href="/convention/">Convention reports</a></li>
          <li><a href="/newsfeed/">Newsfeed</a></li>
          <li><a href="/interest/">Interest</a></li>
          <li><a href="/press-release/">Press Releases</a></li>
        </ul>
      </div>
    </li>
    
    <li class="views">
      <a href="/views/">Views</a>
      <div class="subsections-wrapper">
        <ul class="subsections">
          <li><a href="/feature/">Features</a></li>
          <li><a href="/review/">Reviews</a></li>
          <li><a href="/column/">Columns</a></li>
        </ul>
      </div>
    </li>
    
    <li class="newanime">
      <div class="heading">New Anime</div>
      <div class="subsections-wrapper">
        <ul class="subsections">
          <li><a href="/season/2026/spring/">Spring 2026 current season</a></li>
          <li><a href="/encyclopedia/anime/episodes/latest"><b>Your Score</b> for Recent Simulcasts</a></li>
          <li><a href="/encyclopedia/anime/upcoming/tv">Upcoming Anime List</a></li>
          <li><a href="/encyclopedia/releases.php?format=video" rel="nofollow">Upcoming DVD &amp; Blu-ray</a></li>
          <li><a href="/weekly-ranking/">Weekly Rankings</a></li>
          
          
  
    <li><a href="/preview-guide/2026/spring/.234640">Spring 2026 Preview Guide</a></li>
  

          <li><a href="/episode-review/">Daily Streaming Reviews</a></li>
        </ul>
      </div>
    </li>
    
    <li class="encyc">
      <a href="/encyclopedia/">Encyclopedia</a>
    </li>
    
    <li class="forum">
      <a href="/bbs/phpBB2/">Forum</a>
    </li>
    
    <li class="interactive">
      <a href="/my/">My ANN</a>
      <div class="subsections-wrapper">
        <ul class="subsections">
            <li><a href="/subscription/">Subscribe »</a></li>
          <li><a href="/MyAnime/">My Anime</a></li>
          <li><a href="/MyManga/">My Manga</a></li>
          <li><a href="/newsletter">Newsletter</a></li>
          <li><a href="/connect/">ANN:Connect</a></li>
        </ul>
      </div>
    </li>
    
    <li class="about">
      <div class="heading">About</div>
      <div class="subsections-wrapper">
        <ul class="subsections">
          <li><a href="/staff">Our Team</a></li>
          <li><a href="/contact">Contact us</a></li>
          <li><a href="/staff-openings">Staff openings</a></li>
          <li><a href="/privacy-policy">Privacy policy</a></li>
          <li><a href="/copyright-policy">Copyright policy</a></li>
          <li><a href="/advertising">Advertise with ANN</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="#" data-report-button="">Report a Problem</a></li>
          <li><a href="/bbs/phpBB2/viewforum.php?f=6">Bugs &amp; Technical Questions Forum</a></li>
        </ul>
      </div>
    </li>
    
  </ul>
</div>
  
<!--foot-->

<script>jQuery.ready();</script>


  <script defer type="text/javascript">ann_init();</script><span id="DOM_end"></span> 


<script>ANN.data_grid.load_if_ready()</script>

<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "fbd98daa56204e41bdfee66421e0a2f8"}'></script>

  <script async="" src="https://www.googletagmanager.com/gtag/js?id=UA-921142-1"></script>
  <script>
    gtag('js', new Date());
    gtag('config', 'UA-921142-1', {
      'custom_map': {'dimension1': 'edition', 'dimension2': 'section', 'dimension3': 'errorpage'}
    });
    //gtag('config', 'G-...', {
    gtag('event', 'page_info', {
      'edition': "World",
      'section': ANN.ads.pageinfo.section || "encyc",
      'errorpage': document.ann_errorpage || null,
    });
  </script>

  <script>
    ANN.logev.server_log('foot');
    ANN.matomo.LOGGER_URL = "https://eta.animenewsnetwork.com/m/";
    ANN.matomo.track_page();
  </script>
  <script async="" src="//cdn.animenewsnetwork.com/assets/2aad8740afe4a5d49c2de29a52b886b2be5bc94c.js"></script>




  
  
 

</body></html>
