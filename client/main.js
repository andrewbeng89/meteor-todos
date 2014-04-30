var Todos = new Meteor.Collection("todos");
var activeTab = {
  view1: {
    name: "home",
    class: ""
  },
  view2: {
    name: "todos",
    class: ""
  },
  view3: {
    name: "about",
    class: ""
  }
};
var loaded = false;
var currentTab = "";

if (Meteor.isClient) {
  Router.map(function() {
    this.route('home', {
      path: '/',
      template: 'home',
      layoutTemplate: 'layout'
    });
    this.route('todos', {
      path: '/todos',
      template: 'todos',
      layoutTemplate: 'layout'
    });
    this.route('about', {
      path: '/about',
      template: 'about',
      layoutTemplate: 'layout'
    });
  });

  Template.content.users = function () {
    return Meteor.users.find();
  };

  Template.todos.todos = function () {
    loaded = true;
    return Todos.find();
  };

  Template.todos.existingTodos = function() {
    todos = Todos.find().fetch();
    return todos.length <= 0;
  }

  Template.layout.activeTab = function() {
    var current = Router.current();
    var previousTab = currentTab;
    if (activeTab[previousTab]) 
      activeTab[previousTab].class = "";
    if (current) {
      switch (current.path) {
        case "/":
          activeTab.view1.class = "active";
          currentTab = "view1";
          break;
        case "/todos":
          activeTab.view2.class = "active";
          currentTab = "view2";
          break;
        case "/about":
          activeTab.view3.class = "active";
          currentTab = "view3";
          break;
        default:
          break;
      }
      return activeTab;
    }
  }

  Template.todos.events = {
    'click #add-btn': function() {
      if ($("#todo-title").val() != "") {
        var newTodoId = Todos.insert({
          title: $("#todo-title").val(),
          completed: false
        });
        $("#todo-title").val("");
      } else {
        alert("Please enter a todo item!");
      }
    },
    'click #remove-completed-btn': function() {
      var completedTodos = Todos.find({
        completed: true
      }).fetch();
      completedTodos.forEach(function(todo) {
        Todos.remove(todo._id);
      });
      alert("Removed completed todos!");
    }
  };

  Template.todo.events = {
    'change': function() {
      var selectedTodoId = this._id;
      var _this = this;
      _this.completed = (this.completed === true) ? false : true;
      Todos.update(selectedTodoId, this);
    }
  };
}

if (Meteor.isServer) {
  
}
