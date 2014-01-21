var ChatListView = Backbone.View.extend({
  initialize: function() {
    this.collection.on("reset", this.render, this);
  },
  events: {

  },
  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (chat) {
    var chatView = new ChatView({model: chat});
    this.$el.append(chatView.render());
  }
});

$(document).ready(function() {

  var chatList = new ChatList();
  var chatListView = new ChatListView({el: $(".chats"), collection: chatList});

  chatList.fetch({reset: true});

});