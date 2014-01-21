var ChatList = Backbone.Collection.extend({
  model: Chat,
  url: "https://api.parse.com/1/classes/chatterbox?order=-createdAt",
  parse: function(response) {
    return response.results;
  }
});

//where={"score":{"$gte":1000,"$lte":3000}}