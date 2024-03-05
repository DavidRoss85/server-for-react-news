const apiKey = process.env.API_KEY

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI("apiKey");

// const searchRequest = {
//     q: 'bitcoin',
//     // sources: 'bbc-news,the-verge',
//     domains: 'bbc.co.uk, techcrunch.com',
//     from: '2017-12-01',
//     to: '2017-12-12',
//     language: undefined,
//     sortBy: 'relevancy',
//     page: 2
// }
Object.keys(searchRequest).forEach(key=>{
    if(!searchRequest[key]){
        delete searchRequest[key];
    }
});
const searchContainer = {...searchRequest};

module.exports.topHeadlines = (searchRequest)=>{
    console.log('\n**********\n', 'News request received: ', searchRequest)
    return searchRequest;
}
const buildNewsRequest = (searchCriteria) => {

    //console.log('Search Criteria: ', searchCriteria);
    const { endpoint = 'top-headlines', country, category, pageSize, page, keyword } = searchCriteria;
    const { searchIn, dateFrom, dateTo, language, sortBy } = searchCriteria;

    // //top-headlines
    // const searchRequest = {
    //     // sources: 'bbc-news,the-verge',
    //     q: 'bitcoin',
    //     category: 'business',
    //     language: 'en',
    //     country: 'us'
    //   }


    if (endpoint === 'top-headlines') {
        const immCountry = country ? country === 'all' || country ==='default' ? '' : country : '';
        const immKeyword = immCountry ? (keyword ? keyword : '') : (keyword ? keyword : 'news');
        const immCategory = category || '';
        const immPageSize = pageSize || null;
        const immPage = page || null;

        const searchRequest ={
            q: immKeyword,
            category: immCategory,
            country: immCountry,
            page: immPage,
            pageSize: immPageSize
        }
        return searchRequest;
    } else if (endpoint === 'everything') {
        //everything? q= &searchIn=(title/description/content) &from=(2024-01-20) &to=(2024-01-20)
        //&language=(ar/de/en/es/fr/he/it/nl/no/pt/ru/sv/ud/zh)
        //&sortBy=(relevancy/popularity/publishedAt)
        //&pageSize= &page=

        //everything
        const searchRequest = {
            q: 'bitcoin',
            // sources: 'bbc-news,the-verge',
            domains: 'bbc.co.uk, techcrunch.com',
            from: '2017-12-01',
            to: '2017-12-12',
            language: 'en',
            sortBy: 'relevancy',
            page: 2
        }
        const immKeyword = keyword ? `q=${keyword}` : '&q=news';
        const immSearchIn = searchIn ? `&searchIn=${searchIn}` : '';
        const immFrom = dateFrom ? `&from=${dateFrom}` : '';
        const immTo = dateTo ? `&to=${dateTo}` : '';
        const immLang = language ? `&language=${language}` : '';
        const immSort = sortBy ? `&sortBy${sortBy}` : '';
        const immPageSize = pageSize ? `&pageSize=${pageSize}` : '';
        const immPage = page ? `&page=${page}` : '';

        const newsURL =
            `${URL_BASE}${endpoint}?`
            + `${immKeyword}${immSearchIn}${immFrom}`
            + `${immTo}${immLang}${immSort}`
            + `${immPageSize}${immPage}`;
            //+ `${URL_API_PRE}${apiKey}`;

        // console.log('The built url: ' + newsURL)

        return newsURL;

    }

}
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