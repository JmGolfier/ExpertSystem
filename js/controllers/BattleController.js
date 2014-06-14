angular.module(APP_NAME_CONTROLLERS).controller('BattleController', [ '$scope', 'ExpertSystemService',
    function($scope, ExpertSystemService) {
        var expertSystemService = new ExpertSystemService();

        $scope.nextQuestion = function() {
            //return fact or conclusion
        };
    }]);