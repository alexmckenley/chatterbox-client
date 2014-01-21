var ChatView = Backbone.View.extend({
  initialize: function() {
    this.model.on("remove", this.deleteNode, this);
  },
  events: {

  },
  template: _.template(
  "<div class ='chat' data-room='<%- roomname %>'>" +
    "<a href='#' class='username' data-user='<%- username %>'><%- username %>: </a>" +
    "<span class='text'><%- text %></span>" +
    "<span class='createdAt'><%= createdAt %></span>" +
    "<span class='roomname'>(<%- roomname %>)</span>" +
  "</div> "),
  render: function() {
    this.$el.append(this.template(this.model.attributes));
    return this.$el;
  },
  deleteNode: function() {
    this.$el.remove();
  }
});

