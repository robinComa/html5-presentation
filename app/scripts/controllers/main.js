'use strict';

angular.module('presentationApp')
  .controller('MainCtrl', function ($scope, $resource, RevealFactory) {

        var Config = $resource('presentation-config.json', {});
        Config.get({}, function(config) {

            $scope.title = config.title;
            var MAX_LEFT = config.maxLeft;
            $scope.sections = config.sections;
            RevealFactory.setSections($scope.sections);

            $scope.navigateLeft = function(){
                RevealFactory.navigateLeft();
            };

            $scope.navigate = function(id){
                RevealFactory.navigate(id);
            };

            $scope.isActive = function(id){
                return RevealFactory.getCurrentSlide() == id;
            };

            $scope.navigateRight = function(){
                RevealFactory.navigateRight();
            };

            $scope.getTitle = function(id){
                var MAX = 18;
                var title = $scope.sections[id].title;
                return title.length > MAX ? title.substring(0, MAX - 3) + '...' : title;
            };

            $scope.isDone = function(id){
                return RevealFactory.getCurrentSlide() > id;
            };

            $scope.beforeActive = false;
            $scope.afterActive = false;

            $scope.beforeActiveFn = function(){
                $scope.beforeActive = !$scope.beforeActive;
            };

            $scope.afterActiveFn = function(){
                $scope.afterActive = !$scope.afterActive;
            };

            $scope.isShow = function(id){
                return $scope.beforeActive || $scope.afterActive || Math.abs(RevealFactory.getCurrentSlide() - id) < MAX_LEFT / 2;
            };

            $scope.hasBefore = function(){
                return RevealFactory.getCurrentSlide() >= MAX_LEFT - MAX_LEFT / 2;
            };

            $scope.hasAfter = function(){
                return Math.abs(RevealFactory.getCurrentSlide() - ($scope.sections.length - 1)) > MAX_LEFT / 2;
            };

        });

  });
