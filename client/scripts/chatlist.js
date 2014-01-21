var ChatList = Backbone.Collection.extend({
  model: Chat,
  url: "https://api.parse.com/1/classes/chatterbox",
  parse: function(response) {
    return response.results;
  }
});