var latest = 0;
var url = 'https://api.parse.com/1/classes/chatterbox';

  var getChats = function() {
    $.get(url + "?order=-createdAt", function(response) {
      var messages = response.results;
      for (var i = messages.length -1; i >= 0 ; i--) {
        var date = new Date(messages[i].createdAt);
        if (date > latest) {
          var node = $("<div class='chat'></div>");
          var user = $("<p></p>").text(messages[i].username);
          var message = $("<p></p>").text(messages[i].text);
          var time = $("<p></p>").text(messages[i].createdAt);
          node.append(user, message, time);
          $(".chats").prepend(node);
        }
        if (i === 0) {
          latest = messages[i].createdAt;
        }
      }
    });
  };

$(document).ready(function() {

  getChats();
  setInterval(getChats, 1000);

});