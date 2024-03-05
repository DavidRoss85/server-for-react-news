const apiKey = process.env.API_KEY
console.log(apiKey);
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI("apiKey");

module.exports.results = (searchRequest) => {
    console.log('\n**********\n', 'News request received: ', searchRequest);
    // console.log('*********\nSearch Object: ', buildRequestObj(searchRequest));
    
    newsapi.v2.topHeadlines({...buildRequestObj(searchRequest)}).then(response => {
        console.log('News API Response: ', response);
      });
      
    return searchRequest;
};


const buildRequestObj = (searchRequest) => {

    const { endpoint = 'top-headlines', country, category, pageSize, page, keyword } = searchRequest;
    const { searchIn, dateFrom, dateTo, language, sortBy } = searchRequest;

    if (endpoint === 'top-headlines') {
        const immCountry = country ? country === 'all' || country === 'default' ? '' : country : '';
        const immCategory = category || '';
        const immKeyword = (immCountry || immCategory) ? (keyword ? keyword : '') : (keyword ? keyword : 'news');
        const immPageSize = parseInt(pageSize) || null;
        const immPage = parseInt(page) || null;

        const searchObj = {
            q: immKeyword,
            category: immCategory,
            country: immCountry,
            page: immPage,
            pageSize: immPageSize,
            //sources: 'bbc'
        };

        //remove falsy properties
        Object.keys(searchObj).forEach(key => {
            if (!searchObj[key]) {
                delete searchObj[key];
            }
        });

        return searchObj;

    } else if (endpoint === 'everything') {

        //everything
        const immKeyword = keyword || 'news';
        const immSearchIn = searchIn || '';
        const immFrom = dateFrom || '';
        const immTo = dateTo || '';
        const immLang = language || '';
        const immSort = sortBy || '';
        const immPageSize = parseInt(pageSize) || null;
        const immPage = parseInt(page) || null;

        const searchObj = {
            q: immKeyword,
            searchIn: immSearchIn,
            from: immFrom,
            to: immTo,
            language: immLang,
            sortBy: immSort,
            pageSize: immPageSize,
            page: immPage,
            // domains: 'bbc.co.uk, techcrunch.com',
            // sources: 'bbc-news,the-verge',
        }

        //remove falsy properties
        Object.keys(searchObj).forEach(key => {
            if (!searchObj[key]) {
                delete searchObj[key];
            }
        });

        return searchObj;
    }

};




// Installation
// $ npm install newsapi --save


// Usage
/*
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(apiKey);
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
  sources: 'bbc-news,the-verge',
  q: 'bitcoin',
  category: 'business',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);

});


// To query /v2/everything
// You must include at least one q, source, or domain
newsapi.v2.everything({
  q: 'bitcoin',
  sources: 'bbc-news,the-verge',
  domains: 'bbc.co.uk, techcrunch.com',
  from: '2017-12-01',
  to: '2017-12-12',
  language: 'en',
  sortBy: 'relevancy',
  page: 2
}).then(response => {
  console.log(response);

});



// To query sources
// All options are optional
newsapi.v2.sources({
  category: 'technology',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);

});
*/