angular.module(APP_NAME_CONTROLLERS).controller('BattleController', [ '$scope', 'ExpertSystemService',
    function($scope, ExpertSystemService) {
        var expertSystemService = new ExpertSystemService();

        $scope.nbQuestions = 1;
        $scope.currentQuestion = expertSystemService.nextQuestion();

        $scope.setUserResponse = function(value) {
            expertSystemService.setFactValid($scope.currentQuestion.name, value);
            var conclusion = expertSystemService.analyze();
            if(conclusion){
                $scope.conclusion = conclusion;
                $scope.currentQuestion = null;
            }
            else{
                $scope.currentQuestion = expertSystemService.nextQuestion();
                $scope.nbQuestions++;
            }

        };
    }]);