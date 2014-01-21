var latest = 0;
var url = 'https://api.parse.com/1/classes/chatterbox';
var roomFilter = false;
var room;
var roomList = [];

var appendNode = function(response) {
  var node = $("<div class='chat' data-room='" + response.roomname + "'></div>");
  var user = $("<span class='username'></span>").text(response.username + ":");
  var message = $("<span class'text'></span>").text(response.text);
  var time = $("<span class='createdAt'></span>").text(response.createdAt);
  var chatroom = $("<span class='roomname'></span>").text("(" + response.roomname + ")");
  node.append(user, message, time, chatroom);
  $(".chats").prepend(node);
};


var getChats = function() {
  $.get(url + "?order=-createdAt", function(response) {
    var messages = response.results;
    for (var i = messages.length -1; i >= 0 ; i--) {
      var date = new Date(messages[i].createdAt);
      if (date > latest) {
        appendNode(messages[i]);
        if (!_.contains(roomList, messages[i].roomname)) {
          roomList.push(messages[i].roomname);
          $("#rooms").append("<option value='" + messages[i].roomname + "'>");
        }
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
      $(".newMessage").val("");
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
    room = undefined;
    roomFilter = false;
    $(".chat").show();
    return;
  }
  roomFilter = true;

  $.each($(".chat"),function(index, value) {
    var currRoom = $(value).data("room");

    if (currRoom === undefined || room !== currRoom) {
      $(value).hide();
    } else {
      $(value).show();
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