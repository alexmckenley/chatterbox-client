var Chat = Backbone.Model.extend({
  url: "https://api.parse.com/1/classes/chatterbox",
  defaults: {
    roomname: "main"
  },
  parse: function(response) {
    if (response.text === undefined) {
      response.text = null;
    }
    if (response.username === undefined) {
      response.username = "anonymous";
    }
    if (response.roomname === undefined) {
      response.roomname = null;
    }
    return response;
  }
});