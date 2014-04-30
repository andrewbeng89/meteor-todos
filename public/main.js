define(function(require, exports, module) {
    var Engine     = require("famous/core/Engine");
    var Surface    = require("famous/core/Surface");
    var Scrollview = require("famous/views/Scrollview");
    var Utility    = require("famous/utilities/Utility");
    var mainContext = Engine.createContext();

    var scrollview = new Scrollview();
    var surfaces = [];

    scrollview.sequenceFrom(surfaces);
    Utility.loadURL ('get_todos', function(rawData) {
      todos = JSON.parse(rawData);
      length = todos.length;
      for (var i = 0, temp; i < length; i++) {
          temp = new Surface({
               content: "Todo: " + todos[i].title,
               size: [undefined, 200],
               properties: {
                   backgroundColor: "hsl(" + (i * 360 / 40) + ", 100%, 50%)",
                   lineHeight: "200px",
                   textAlign: "center"
               }
          });
  
          temp.pipe(scrollview);
          surfaces.push(temp);
      }
  
      mainContext.add(scrollview);
    });
});