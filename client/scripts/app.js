$(document).ready(function() {
  var url = 'https://api.parse.com/1/classes/chatterbox';

  $.get(url, function(response) {
    var messages = response.results;
    for (var i = 0; i < messages.length; i++) {
      var node = $("<div class='chat'></div>");
      var temp = $("<p></p>");
      var user = temp.text(messages[i].username);
      var message = temp.text(messages[i].text);
      var time = temp.text(messages[i].createdAt);
      node.append(user, message, time);
      $(".chats").append(node);
    }
  });

});