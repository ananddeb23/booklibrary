const httpclient = require('../../lib/showdetails');
const Lab = require('lab');
//const Server = require('../../index');
const Chai = require('chai');
const models = require('../../models');

exports.lab = Lab.script();
const { lab } = exports;
const { expect } = Chai;
lab.experiment('chekcing the http get responses', () => {
  lab.test('Data must be returned from valid url get request', (done) => {
    const callback = (error, data) => {
      expect(data).to.equal('success');
      done();
    };
    httpclient.testurl('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', callback);
  });
});
