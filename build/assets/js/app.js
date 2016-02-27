(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)
    .controller('GameCtrl', function($scope) {
        $scope.isModified = false;
        $scope.remained = 150000;
        $scope.savings = $scope.remained;
        $scope.home = 0;
        $scope.party = 0;
        $scope.food = 0;
        $scope.transport = 0;

        $scope.startStateOfHome = 0;
        $scope.startStateOfParty = 0;
        $scope.startStateOfFood = 0;
        $scope.startStateOfTransport = 0;
        $scope.startStateOfSavings = 0;

        $scope.getHome = function() {
            return $scope.home;
        }
        $scope.getParty = function() {
            return $scope.party;
        }
        $scope.getFood = function() {
            return $scope.food;
        }
        $scope.getTransport = function() {
            return $scope.transport;
        }

        $scope.filterValue = function($event){
          if ($event.keyCode < 48 || $event.keyCode > 57 ){
              $event.preventDefault();
          }
        };

        $scope.mentes = function() {
            $scope.isModified = false;
        }

        $scope.megse = function() {
            $scope.isModified = false;

            $scope.home = $scope.startStateOfHome;
            $scope.party = $scope.startStateOfParty;
            $scope.food = $scope.startStateOfFood;
            $scope.transport = $scope.startStateOfTransport;
            $scope.savings = $scope.startStateOfSavings;
        }

        $scope.valueChanged = function(value, target) {

          if (isNaN(parseInt(value))){
            value = 0;
          }else{
            value = parseInt(value);
          }

          if ($scope.isModified == false){
              $scope.isModified = true;

              $scope.startStateOfHome = $scope.home;
              $scope.startStateOfParty = $scope.party;
              $scope.startStateOfFood = $scope.food;
              $scope.startStateOfTransport = $scope.transport;
              $scope.startStateOfSavings = $scope.savings;
          }


            if (target == "home"){
                 $scope.savings = $scope.remained - $scope.party - $scope.food - $scope.transport;
            } else if (target == "party") {
                 $scope.savings = $scope.remained -$scope.food - $scope.transport - $scope.home;
            } else if (target == "food") {
                 $scope.savings = $scope.remained - $scope.party - $scope.transport - $scope.home;
            } else if (target == "transport") {
                 $scope.savings = $scope.remained - $scope.party - $scope.food - $scope.home;
            }

            if ($scope.savings == 0)
            {
              if (target == "home"){
                  return $scope.home;
              } else if (target == "party") {
                  return $scope.party;
              } else if (target == "food") {
                  return $scope.food;
              } else if (target == "transport") {
                  return $scope.transport;
              }
            } else if ($scope.savings - value < 0){

                if (target == "home"){
                    $scope.home = $scope.savings;
                    $scope.savings = 0;
                    return $scope.home;
                } else if (target == "party") {
                    $scope.party = $scope.savings;
                    $scope.savings = 0;
                    return $scope.party;
                } else if (target == "food") {
                    $scope.food = $scope.savings;
                    $scope.savings = 0;
                    return $scope.food;
                } else if (target == "transport") {
                    $scope.transport = $scope.savings;
                    $scope.savings = 0;
                    return $scope.transport;
                }
            } else {
                if (target == "home"){
                    $scope.savings = $scope.savings - value;
                    $scope.home = value;
                } else if (target == "party") {
                    $scope.savings = $scope.savings - value;
                    $scope.party = value;
                } else if (target == "food") {
                    $scope.savings = $scope.savings - value;
                    $scope.food = value;
                } else if (target == "transport") {
                    $scope.savings = $scope.savings - value;
                    $scope.transport = value;
                }

                return value;
            }
        };

    })
;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

})();
