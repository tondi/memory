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
            component: 'game'
        })
        // .otherwise({
        //     redirectTo: "/"
        // });
});

angular.module('app').component('game', {
    template: require('../app/components/game.component.html'),
    controller: function() {
        this.$onInit = function() {
            this.tabsCtrl.addPane(this);
            console.log(this);
        };
    }
});

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

console.log(app)

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