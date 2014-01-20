var latest = 0;
var url = 'https://api.parse.com/1/classes/chatterbox';

var getChats = function() {
  $.get(url + "?order=-createdAt", function(response) {
    var messages = response.results;
    for (var i = messages.length -1; i >= 0 ; i--) {
      var date = new Date(messages[i].createdAt);
      if (date > latest) {
        console.log("new Div");
        var node = $("<div class='chat'></div>");
        var user = $("<p></p>").text(messages[i].username);
        var message = $("<p></p>").text(messages[i].text);
        var time = $("<p></p>").text(messages[i].createdAt);
        node.append(user, message, time);
        $(".chats").prepend(node);
      }
      if (i === 0) {
        latest = new Date(messages[i].createdAt);
      }
    }
  });
};

var getURLParameter = function(name) {
  return decodeURI(
    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
  );
};

var sendMessage = function(event){
  event.preventDefault();
  var message = {
    username: getURLParameter('username'),
    text: $('.newMessage').val(),
    roomname: 'test'
  };


  $.ajax({
    url: url,
    type: "POST",
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(response){
      console.log("post");
    },
    error: function(req, errType, errMsg){
      console.error("Error sending request: ", errMsg);
    }
  });

};

$(document).ready(function() {

  getChats();
  setInterval(getChats, 1000);

  $('form').submit(sendMessage);

});