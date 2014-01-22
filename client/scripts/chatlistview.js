var ChatListView = Backbone.View.extend({
  initialize: function() {
    this.collection.on("reset", this.render, this);
    this.collection.on("add", this.addOne, this);

    var that = this;
    setInterval(function() {
      that.collection.fetch();
    }, 1000);
  },
  events: {
  },
  render: function () {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function (chat, collection) {
    console.log(collection.length);
    var chatView = new ChatView({model: chat});
    this.$el.append(chatView.render());
  }

});

$(document).ready(function() {

  chatList = new ChatList();
  var chatListView = new ChatListView({el: $(".chats"), collection: chatList});
  chatList.fetch({reset: true});
});