var Todos = new Meteor.Collection("todos");

Meteor.startup(function () {
  // code to run on server at startup
});

Router.map(function () {
  this.route('serverRoute', {
    where: 'server',
    path: 'get_todos',
    action: function () {
      // some special server side properties are available here
      todos = Todos.find().fetch();
      this.response.end(JSON.stringify(todos));
    }
  });
});