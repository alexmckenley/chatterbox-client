var latest = 0;
var url = 'https://api.parse.com/1/classes/chatterbox';
var roomFilter = false;
var room = "";

var getChats = function() {
  $.get(url + "?order=-createdAt", function(response) {
    var messages = response.results;
    for (var i = messages.length -1; i >= 0 ; i--) {
      var date = new Date(messages[i].createdAt);
      if (date > latest) {
        var node = $("<div class='chat' data-room='" + messages[i].roomname + "'></div>");
        var user = $("<p></p>").text(messages[i].username);
        var message = $("<p></p>").text(messages[i].text);
        var time = $("<p></p>").text(messages[i].createdAt);
        var chatroom = $("<p></p>").text(messages[i].roomname);
        node.append(user, message, chatroom, time);
        $(".chats").prepend(node);
        if (roomFilter && messages[i].roomname !== room) {
          node.hide();
        }
        if (i === 0) {
          latest = new Date(messages[i].createdAt);
        }
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
    roomname: room
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

var selectRoom = function(e) {
  e.preventDefault();
  room = $("input[name='rooms']").val();

  if (room === null || room === "") {
    roomFilter = false;
    $(".chat").show();
    return;
  }
  roomFilter = true;

  $.each($(".chat"),function(index, value) {
    var currRoom = $(value).data("room");
    if ((currRoom && currRoom !== room) || currRoom === null) {
      $(value).hide();
    }
  });

};

$(document).ready(function() {

  getChats();
  setInterval(getChats, 1000);

  $('#chatForm').submit(sendMessage);
  $('.toggleRoom').click(function(e) {
    e.preventDefault();
    $(".enterRoom").toggle();
  });
  $("#roomForm").submit(selectRoom);

});