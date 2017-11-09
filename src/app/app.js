import angular from 'angular';
//import GameComponent from '../app/components/';

import '../style/app.css';

var app = angular.module('app', ['ngRoute']);
app.controller('appController', function($scope, $http) {

})
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            template: require("./app.html")
        })
        .when("/mode/30", {
            template: require("./components/game.component.html"),
            //component: 'game'
        })
        .when("/mode/60", {
            template: require("./components/game.component.html"),
            //component: 'game'
        })
        .when("/mode/90", {
            template: require("./components/game.component.html"),
            //component: 'game'
        })
        .when("/summary", {
            template: require("./components/summary.component.html")
        })
        .otherwise({
            redirectTo: "/"
        });
});

app.controller('gameCtrl', ['$scope', '$window', function ($scope, $window) {
    $scope.time = $window.location.hash.split('').splice($window.location.hash.length - 2,).join('');
    $scope.$on('gameStarted', function(){
        $scope.$broadcast('gameStartedBroadcast', {})
    });
}]);

app
    .controller('timeCtrl', ['$scope', '$rootScope', '$interval', '$window', '$location', function($scope, $rootScope, $interval, $window, $location) {

        let startTime = 10000;
        $scope.timeLeft = startTime;

        $scope.$on('gameStartedBroadcast', function(){
            console.log("recieeeved game start");


            let start = Date.now();
            let timeLeft;
            let elapsed;

            let background = document.querySelector(".time-bar__background");
            let translate = 0;

            let timeInterval = $interval(function() {
                $scope.timeLeft = startTime - elapsed;
                elapsed = Date.now() - start;
                translate = Math.round(elapsed * 100 * 100 / startTime ) / 100;
                background.style.transform = `translateX(-${translate}%)`;
                if(startTime / 100 * 20 > startTime - elapsed) {
                    background.style.backgroundColor = `red`;
                }
                if(startTime - elapsed <= 0) {
                    $scope.timeLeft = 0;
                    $interval.cancel(timeInterval);
                    $location.path('/summary')
                }
            }, 1);
        });

    }])
    .directive('time', [function($scope) {
        return {
            template: require("./components/time.component.html")
        }
    }]);



app
    .controller('playfieldCtrl', ['$scope', '$rootScope', '$timeout', '$location', function($scope, $rootScope, $timeout, $location) {
        $scope.imagesPath = "/img/";
        let images = [
            '1.jpg',
            '2.jpg',
            '3.jpg',
            '4.jpg',
            '5.jpg',
            '6.jpg',
            '7.jpg',
            '8.jpg',
            '1.jpg',
            '2.jpg',
            '3.jpg',
            '4.jpg',
            '5.jpg',
            '6.jpg',
            '7.jpg',
            '8.jpg',
        ];

        // let result = [];
        // while(result.length < 16) {
        //     let randomIndex = Math.floor((Math.random() * images.length ));
        //     result.push(images[randomIndex]);
        //     images.splice(randomIndex, 1);
        // }

        $scope.images = images;

        $scope.shown = [];
        let timeout;
        let playfield = document.querySelector(".playfield")
        let done = [];

        $scope.finish = function () {
            $location.path('/summary')
        };

        let gameStarted = false;

        $scope.showCard = function ($event) {

            if(!gameStarted) {
                gameStarted = !gameStarted;
                $scope.$emit("gameStarted", {});
            }

            let clickedCard = $event.target;
            let clickedSrc = clickedCard.querySelector(".back").src;



            if($scope.shown.length == 1) {


                // $scope.shown = [];
                if($scope.shown.filter(el => el.src == clickedSrc).length > 0
                    &&
                    $scope.shown.filter(el => el.element == clickedCard).length == 0
                    &&
                    done.filter(el => el == clickedCard).length == 0) {

                    $scope.shown[0].element.classList.add("done");
                    clickedCard.classList.add("done");
                    done.push($scope.shown[0].element);
                    done.push(clickedCard);
                    //console.log(done);
                    //$scope.shown = [];
                    // $timeout.cancel(timeout);
                } else {
                    timeout = $timeout(() => {
                        if($scope.shown[0]) {
                            $scope.shown[0].element.classList.remove("flip");
                        }
                        if($scope.shown[1]) {
                            $scope.shown[1].element.classList.remove("flip");
                        }
                        $scope.shown = [];
                    }, 1000);
                }
            }

            if($scope.shown.length == 2) {
                $timeout.cancel(timeout);

                $scope.shown[0].element.classList.remove("flip");
                $scope.shown[1].element.classList.remove("flip");
                // return;
                $scope.shown = [];
                $scope.shown.push({element: clickedCard, src: clickedSrc});
                clickedCard.classList.add("flip");
                return;
            }
            clickedCard.classList.add("flip");



            $scope.shown.push({element: clickedCard, src: clickedSrc});



            if(done.length == 16) {
                // you won the game
                $location.path('/summary')
            }

            //console.log($scope.shown);
        }

    }])
    .directive('playfield', [function($scope) {
        return {
            template: require("./components/playfield.component.html")
        }
    }]);


app
    .controller('summaryCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.result = "20:30:400";
        $scope.restart = function () {
            $location.path('/');
        }
    }])
    .directive('summary', [function($scope) {
        return {
            template: require("./components/summary.component.html")
        }
    }]);
// let app = () => {
//     return {
//         template: require('./app.html'),
//         controller: 'AppCtrl',
//         controllerAs: 'app'
//     }
// };

// class AppCtrl {
//     constructor() {
//         this.url = 'https://github.com/preboot/angular-webpack';
//     }
//     method() {

//     }

// }

// const MODULE_NAME = 'app';

// angular.module(MODULE_NAME, ['ngRoute'])
//     .directive('app', app)
//     .controller('AppCtrl', AppCtrl);

//console.log(app)

// app.config(function($routeProvider) {
//     $routeProvider
//         .when("/", {
//             templateUrl: "components/main.html"
//         })
//         .when("/mode/30", {
//             templateUrl: "red.htm"
//         })
//         .when("/green", {
//             templateUrl: "green.htm"
//         })
//         .when("/blue", {
//             templateUrl: "blue.htm"
//         });
// });

// app.config(['$routeProvider', '$locationProvider',
//     function($routeProvider, $locationProvider) {

//         //$routerProvider code here

//         $locationProvider.html5Mode(true);

//     }
// ]);

//export default MODULE_NAME;
export default app;