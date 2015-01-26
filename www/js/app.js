// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova','starter.controllers', 'starter.services'])

    .run(function ($ionicPlatform) {


        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            //通知
             //window.plugin.notification.local.add({ message: 'Great app!' });

            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);


            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });


    })

    .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $ionicConfigProvider.platform.android.tabs.position("bottom");
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.friends', {
                url: '/friends',
                views: {
                    'tab-friends': {
                        templateUrl: 'templates/tab-friends.html',
                        controller: 'FriendsCtrl'
                    }
                }
            })
            .state('tab.friend-detail', {
                url: '/friend/:friendId',
                views: {
                    'tab-friends': {
                        templateUrl: 'templates/friend-detail.html',
                        controller: 'FriendDetailCtrl'
                    }
                }
            })
            /***************************************************************/
            .state('monitortabs',{/*自动监测Tab 整个页面*/
            url: "/monitortabs",
               // abstract: true,
                templateUrl: "templates/monitor/monitor-tabs.html"

        })
            .state('monitortabs.automonior',{/*自动监测内容区*/
            url: '/automonior',
                abstract: true,
            views: {
                'monitor-automonior': {
                    templateUrl: "templates/monitor/auto-monitor.html",
                    controller: 'AutomoniorCtrl'
                }
            }
        })

            .state('monitortabs.automonior.monitoritem', {/*在线监测*/
                url: '/monitoritem',
                views: {
                    'automonitoritem': {
                        templateUrl: "templates/monitor/auto-monitor-linechart.html"
                        , controller: 'AutoMonitorLinechart'

                    }
                }

            })

            .state('monitortabs.automonior.selfMonitoritem', {/*自行检测*/
                url: '/selfMonitoritem',
                views: {
                    'automonitoritem': {
                        templateUrl: "templates/monitor/auto-monitor-byself-chart.html"
                       // , controller: 'AutoMonitorLinechart'

                    }
                }

            })
            .state('monitortabs.automonior.pollutant', {/*污染排放*/
                url: '/pollutant',
                views: {
                    'automonitoritem': {
                        templateUrl: "templates/monitor/auto-monitor-pollutant-release-chart.html"
                         , controller: 'PollutantCtrl'

                    }
                }

            })


            .state('monitortabs.automonior.supervise', {/*监督检测*/
                url: '/supervise',
                views: {
                    'automonitoritem': {
                        templateUrl: "templates/monitor/auto-monitor-supervise-release-chart.html"
                        // , controller: 'AutoMonitorLinechart'

                    }
                }

            })



            /***************************************************************/

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('tab.automonior', { /*自动监测*/
                url: '/automonior',
                abstract: true,
                views: {
                    'tab-automonior': {
                        templateUrl: "templates/automonitor/auto-monitor.html",
                        controller: 'AutomoniorCtrl'
                    }
                }
            })
            .state('tab.automonior.automonitoritem', {/*自动监测*/

                url: '/monitoritem',
                views: {
                    'automonitoritem': {
                     templateUrl: "templates/automonitor/auto-monitor-linechart.html"
                        , controller: 'AutoMonitorLinechart'

                    }
                }



        });






        // if none of the above states are matched, use this as the fallback
        // monitortabs/automonior/monitoritem


        $urlRouterProvider.otherwise('monitortabs/automonior/monitoritem');//tab/friends

    });
