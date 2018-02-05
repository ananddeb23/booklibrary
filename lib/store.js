const models = require('../models');
const url1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';
const url2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/';
const https = require('https');
const rating = [];
const list = [];
const uniqAuth = [];
const datarec = [];
let ini =0;
require('es6-promise');
const callback =  (error, data) => {
	//console.log(JSON.parse(data));
	datarec = JSON.parse(data);
	uniqAuth = getuniquelist(datarec);
	console.log(uniqAuth);
	//  getid(datarec);
	//  const ratingsgot =checkallunitsdone(datarec);
	//console.log(ratingsgot);


	for( let i=0; i< datarec.books.length; i++){
		//console.log(i, 'call');
		list.push((datarec.books[i].id));

	}
	const promiselist = [];
	for( let i=0; i< datarec.books.length; i++){
		//console.log(i, 'call');
		promiselist.push(callpromise(list[i]));

	}
	//console.log(list);
	//  Promise.all(list)
	Promise.all(promiselist).then(function(values) {
		console.log(rating.length);
		console.log( 'all promiswe dnoe here');
	});
	//  console.log(rating,'rating');

};
function dojob(){
	for(let i=0; i<list.length;i++){
		models.books.create({
			bookid: datarec.books[i].id,
			author: datarec.books[i].Author,
			name:datarec.books[i].Name,
			rating:rating[i],

		})
			.then((newbook) => {
				console.log('New book record,has been created.');
				reply({
					statusCode: 201,
					message: 'User created',
				});
			});
	}
}


const callback2 =  (error, data) => {
	//console.log(JSON.parse(data));
	const datarec = JSON.parse(data);
	//rating.push(datarec.rating);
	//console.log(datarec.rating);
	rating.push(datarec.rating);
	console.log(rating);
	if(rating.length === 12){
		dojob();
	}
	// let uniqAuth = getuniquelist(datarec);
	// console.log(uniqAuth);
	// console.log(getid(datarec));
};
// function checkallunitsdone(jsonres){
//   const noofunits = jsonres.books.length;
//   let currlength = rating.length;
//   while(currlength != noofunits){
//     currlength = rating.length;
//     //console.log(currlength);
//   }
//   console.log(rating);
//   return 1;
// }
function getuniquelist(jsonres){
	const res = [];
	for( let i=0; i< jsonres.books.length; i++){
		if(res.indexOf(jsonres.books[i].Author) === -1){
			res.push(jsonres.books[i].Author);
		}
	}
	return res;
}
// function getscore(id){
//   https.get(`${url2}id`, (response) => {
//     //response.setEncoding('UTF8');
//
//     response.on('data', (data) => {
//       // console.log(data);
//       // console.log(data);
//       //callbacktest(null, data.toString());
//       return JSON.parse(data);
//     });
//
//     response.on('error', (error) => {
//        console.log(error);
//       //callbacktest(error, 'responseerror');
//     });
//   });
// }
// function getid(jsonres){
//
//
//  for( let i=0; i< jsonres.books.length; i++){
//    console.log(i);
//    const promise = new Promise((fulfill, reject) => {
//    fulfill('I FIRED');
//
//  });
//
//  promise.then((value)=> {
//    const datarec= JSON.parse(value);
//    rating.push(datarec.rating);
//  });
//    console.log(`${url2}${jsonres.books[i].id}`);
//       testurl(`${url2}${jsonres.books[i].id}`, callback2);
//      //res.push(temp.rating);
//
//  }
//console.log(res);
//return res;

//}
const iterate = (arg) => {
	// console.log(arg);
	//msg += arg.toString();
	console.log(arg);
	ini+=1;
	return testurl(`${url2}${arg}`, callback2);
};
// const iterate = (arg) => {
//   // console.log(arg);
//   msg += arg;
//   return msg;
// };
const promise3 = new Promise(function(resolve, reject) {
	resolve(() => {
		ini= list.pop();
		const val = testurl(`${url2}${ini}`, callback2);
		const datarec= JSON.parse(val);
		rating.push(datarec.rating);
	});
});
function callpromise(arg) {
	return Promise.resolve(arg)
		.then(iterate).then((msg)=> {
			ini+=1;
			const datarec= JSON.parse(msg);
			rating.push(datarec.rating);
			console.log(rating);
		}).catch(console.log);

}
const testurl = (urltotest, callbacktest) => {
	https.get(urltotest, (response) => {
		//response.setEncoding('UTF8');

		response.on('data', (data) => {
			// console.log(data);
			// console.log(data);
			callbacktest(null, data.toString());
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
		const holder =(testurl(url1,callback));


	},
};
module.exports.testurl = testurl;
