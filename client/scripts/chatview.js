var ChatView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, "removeView", this.remove, this);
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
  }
});

