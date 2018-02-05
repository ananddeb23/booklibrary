const Hapi = require('hapi');


// create the server
const server = new Hapi.Server();
server.connection({ port: 3000 });

// routes
server.route(require('./lib/route'));

// models.sequelize.sync().then(function() {
//   server.start(function() {
//     console.log('Running on 3000');
//   });
// });
if (!module.parent) {
	server.start((err) => {
		if (err) {
			throw (err);
		}
		console.log('Server started at port 3000');
	});
}
module.exports = server;
