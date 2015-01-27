angular.module('starter.services', [])
    .factory('Chat', function($rootScope,$http,$ionicScrollDelegate,Notification) {

        var username;
        var messages = [];

        var baseUrl, socket;

        if(window.location.origin.indexOf('localhost') == -1)
        //  baseUrl = 'http://192.168.4.208:443';
        // baseUrl = 'https://socket-chat-server.herokuapp.com:443';
            baseUrl = 'http://192.168.191.1:8080';

        /* baseUrl = 'https://socket-chat-server.herokuapp.com:443';*/
        else
        //  baseUrl = 'http://192.168.4.208:8080';
            baseUrl = 'http://192.168.191.1:8080';

        socket = io.connect(baseUrl);

        var functions = {
            all: function() {
                return friends;
            },
            get: function(friendId) {
                return friends[friendId];
            },
            getMessages: function(){
                return messages;
            },
            sendMessage: function(msg){
                messages.push({
                    username: username,
                    content: msg
                });
                socket.emit('new message', msg, username);
            },
            getUsername: function(){
                return username;
            },
            setUsername: function(newUsername){
                username = newUsername;
                socket.emit('add user', username);
            },
            getUsernames: function(){
                return $http.get(baseUrl+'/usernames');
            },
            typing: function(){
                socket.emit('typing');
            },
            stopTyping: function(){
                socket.emit('stop typing');
            }
        };

        socket.on('user joined', function(data){
            Notification.show(data.username + ' connected');
        });

        socket.on('new message', function(msg){
            $rootScope.$apply(function () {
                messages.push(msg);
                $ionicScrollDelegate.scrollBottom(true);
            });
        });

        socket.on('user left', function(data){
            Notification.show(data.username + ' disconnected');
        });

        socket.on('typing', function(data){
            console.log('typing');
            Notification.show(data.username + ' is typing');
        });

        socket.on('stop typing', function(data){
            console.log('stop typing');
            Notification.hide();
        });

        return functions;

    })

    .factory('Notification', function($timeout) {

        return {
            show: function(msg){
                var $notificationDiv = angular.element( document.querySelector( '.notification' ) );
                $notificationDiv.css('display','inherit');
                $notificationDiv.html(msg);
                if(msg.indexOf('typing') == -1){
                    $timeout(function(){
                        $notificationDiv.css('display','none');
                    }, 5000);
                }
            },
            hide: function(){
                var $notificationDiv = angular.element( document.querySelector( '.notification' ) );
                $notificationDiv.css('display','none');
            }
        }

    })
    /************************************************************/
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
