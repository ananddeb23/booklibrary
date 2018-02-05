const showdetails = require('./showdetails');
// const create = require('./create');
// const update = require('./update');
// const delete1 = require('./delete');

module.exports = [
  {
    method: 'GET',
    path: '/showdetails/books',
    handler: showdetails.books.all,
  },
  // {
  //   method: 'POST',
  //   path: '/create/people/',
  //   handler: create.people.add,
  // },
  // {
  //   method: 'PUT',
  //   path: '/update/people/{firstName}/{lastName}',
  //   handler: update.people.update,
  // },
  // {
  //   method: 'DELETE',
  //   path: '/delete/people/{firstName}/{lastName}',
  //   handler: delete1.people.delete,
  // },

];
