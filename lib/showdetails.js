const models = require('../models');
const url1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';
const url2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/';
const https = require('https');
const callback = (error, data) => {
      console.log(JSON.parse(data));
    };
const testurl = (urltotest, callbacktest) => {
  https.get(urltotest, (response) => {
    //response.setEncoding('UTF8');

    response.on('data', (data) => {
      // console.log(data);
      // console.log(data);
      callbacktest(null, 'success');
      return JSON.parse(data);
    });

    response.on('error', (error) => {
      // console.log(error);
      callbacktest(error, 'responseerror');
    });
  });
};
exports.books = {
  all(request, reply) {
    reply(testurl(url1,callback));
  },
};
module.exports.testurl = testurl;
