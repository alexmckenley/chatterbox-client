var ChatListView = Backbone.View.extend({
  initialize: function() {
    this.collection.on("reset", this.render, this);

    var that = this;
    setInterval(function() {
      // console.log("Before", that.collection);
      // console.log(that.collection);
      var temp = JSON.stringify({createdAt: {"$gte":{"__type":"Date","iso":"2014-01-21T21:20:15.887Z"}}});

      that.collection.fetch({reset: true, data: { where: temp }});
    }, 1000);
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