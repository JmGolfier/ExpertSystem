angular.module(APP_NAME_CONTROLLERS).controller('BattleController', [ '$scope', 'ExpertSystemService',
    function($scope, ExpertSystemService) {
        var expertSystemService = new ExpertSystemService();

        $scope.currentQuestion = expertSystemService.nextQuestion();

        $scope.setUserResponse = function(value) {

        };
    }]);