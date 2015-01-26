angular.module('starter.controllers', ['ionic'])

    .controller('DashCtrl', function ($scope) {


        StandaloneDashboard(function (db) {
            var chart = new ChartComponent("sales");
            chart.setDimensions(8, 6);
            chart.setCaption("Sales - 2013 vs 2012");
            chart.setLabels(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);
            chart.addSeries("sales2013", "2013", [22400, 24800, 21800, 21800, 24600, 27600, 26800, 27700, 23700, 25900, 26800, 24800]);
            chart.addSeries("sales2012", "2012", [10000, 11500, 12500, 15000, 16000, 17600, 18800, 19700, 21700, 21900, 22900, 20800]);
            chart.setYAxis("Sales", {numberPrefix: "$", numberHumanize: true});
            db.addComponent(chart);
        });


    })

    .controller('ChatsCtrl', function ($scope, Chats) { /*razorflaw 图表*/

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }

        initialize();


    })


    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('FriendsCtrl', function ($scope, Friends, $http) {
        $scope.friends = Friends.all();


        if ($scope.series == null) {

            //*读取模拟数据*//*/
            $http.get('data/motionchart.json').success(function (data) {

                $scope.series = data;

                console.log($scope.series);//正常输出JSON对象
                console.log(data);//正常输出JSON对象

            });

        } else {

            $http.get('data/motionchart.json').success(function (data) {

                $scope.series = data;

                console.log($scope.series);//正常输出JSON对象
                console.log(data);//正常输出JSON对象

            });

        }


        $scope.series = [{
            color: "#0073CC",
            name: '完成整改',

            data: [17, 31, 35, 20, 33, 44, 23, 44, 33]
        }, {


            color: "#6ED854",
            name: '正在整改',
            data: [13, 56, 47, 48, 69, 78, 99, 22, 9]
        }
        ];


        $(function () {
            $('#container').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: '2013年督察问题完成情况'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: ['地区10', '地区9', '地区8', '地区6', '地区5', '地区4', '地区3', '地区2', '地区1'],

                    title: {
                        text: null
                    }
                },
                yAxis: {

                    min: 0,
                    title: {
                        text: '2015年1月统计',
                        align: 'high'
                    },
                    labels: {

                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' 件'
                },
                plotOptions: {

                    bar: {

                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',

                    verticalAlign: 'top',
                    x: -40,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: $scope.series
            });
        });

    })

    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })
    .controller('AutomoniorCtrl', function ($scope) {
        if ($scope.currentitem == undefined) {
            $scope.currentitem = "在线监测";
        }


        $scope.leftMenuList = [{title: "在线监测", id: 0}, {title: "监督性监测", id: 1}, {title: "自行监测", id: 2}, {
            title: "污染排放",
            id: 3
        }

        ];




        $scope.curIndex = 0;
        $scope.title = "";

        $scope.onSelect = function (item) {

            $scope.leftMenuList[$scope.curIndex].show = false;
            $scope.title = item.title;
            $scope.curIndex = item.id;
            $scope.leftMenuList[item.id].show = true;

        };
        alert("start");
       // window.plugin.notification.local.add({ message: 'Great app!' });
      // $cordovaLocalNotification.add({ message: 'Great app!' });

        alert("end");
    })
    .controller('AutoMonitorLinechart', function ($scope) { /*自动监测*/

        new Highcharts.Chart({
                chart: {
                    renderTo: 'container',     //document.getElementById('container'),
                    height: 400,
                    type: 'line'
                },
                credits: {
                    // enabled:true,                    // 默认值，如果想去掉版权信息，设置为false即可
                    text: '',               // 显示的文字
                    href: 'http://www.ths.com.cn/',   // 链接地址
                    style: {                            // 样式设置
                        cursor: 'pointer',
                        color: 'red',
                        fontSize: '20px'
                    }
                },

                title: {text: 'so2小时均值'},
                subtitle: {text: '数据来源: 思路创新'},
                xAxis: {categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']},
                yAxis: {title: {text: '浓度（mg/L）'}},
                tooltip: {
                    enabled: false, formatter: function () {
                        return '<b>' + this.series.name + '</b><br>' + this.x + ': ' + this.y + '°C';
                    }
                },
                plotOptions: {line: {dataLabels: {enabled: true}, enableMouseTracking: false}},
                series: [{
                    name: 'so2值',
                    data: [177, 23, 888, 445, 45, 678, 500, 300, 440, 200, 300, 99, 33, 99, 560, 450, 346, 245, 557, 445, 44, 476, 88, 90]
                }]
                // , {name: 'London', data: [33, 99, 560, 450, 346, 245, 557, 445, 44, 476,88, 90]}

            }
        );
        //  $scope.initchat =function(){ };


        new Highcharts.Chart(
            {
                chart: {
                    renderTo: 'container1',     //document.getElementById('container'),
                    height: 400,
                    type: 'line'
                },

                credits: {
                    // enabled:true,                    // 默认值，如果想去掉版权信息，设置为false即可
                    text: '思路创新',               // 显示的文字
                    href: 'http://www.ths.com.cn/',   // 链接地址
                    style: {                            // 样式设置
                        cursor: 'pointer',
                        color: 'red',
                        fontSize: '20px'
                    }
                },

                  title: {text: 'so2小时均值'},
                  subtitle: {text: '数据来源: 思路创新'},
                  xAxis: {categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']},
                  yAxis: {title: {text: '浓度（mg/L）'}},
                  tooltip: {
                      enabled: false,
                      formatter: function () {
                          return '<b>' + this.series.name + '</b><br>' + this.x + ': ' + this.y + '°C';
                      }
                  },
                  plotOptions: {line: {dataLabels: {enabled: true}, enableMouseTracking: false}},


                  series: [{
                      name: 'so2值',
                      data: [177, 23, 888, 445, 45, 678, 500, 300, 440, 200, 300, 99, 33, 99, 560, 450, 346, 245, 557, 445, 44, 476, 88, 90]
                  }]
                  // , {name: 'London', data: [33, 99, 560, 450, 346, 245, 557, 445, 44, 476,88, 90]}

            }
        );


    }
)
    .controller('PollutantCtrl', function ($scope) { /*污染排放*/

        new Highcharts.Chart(
            {
                chart: {
                    renderTo: 'container2',     //document.getElementById('container'),
                    height: 400,
                    type: 'column'
                },
                title: {
                    text: '历年排污情况'
                },
                subtitle: {
                    text: '来源: 思创新'
                },
                xAxis: {
                    categories: [
                        '重点调查工业企业',
                        '非重点调查工业企业',
                        '生活源',
                        '农业源',
                        '机动车',
                        '生活垃圾处理厂',
                        '危险废物处理厂'

                    ],
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }

                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Rainfall (mm)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0,
                        borderWidth: 0
                    }
                },
                series: [{
                    color:"#990000",
                    name: '2011年',
                    data: [499, 715, 1064, 1292, 1440, 1760, 1356]

                }, {
                    color:"#008000",
                    name: '2012年',
                    data: [836, 788, 985, 934, 1060, 845, 1050]

                }, {
                    color: "#0000CC",
                    name: '2013年',
                    data: [489, 388, 393, 414, 470, 483, 590]

                }]
            }
        )


    })


;
