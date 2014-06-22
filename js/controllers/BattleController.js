angular.module(APP_NAME_CONTROLLERS).controller('BattleController', [ '$scope', 'ExpertSystemService',
    function($scope, ExpertSystemService) {
        var expertSystemService = new ExpertSystemService();

        $scope.nbQuestions = 1;
        $scope.currentQuestion = expertSystemService.nextQuestion();

        $scope.setUserResponse = function(value) {
            expertSystemService.setFactValid($scope.currentQuestion, value);
            nextStep();
        };

        $scope.setUserResponseOption = function() {
            expertSystemService.setFactValid($scope.selectedOptions, true);
            nextStep();
        };

        function nextStep() {
            var conclusion = expertSystemService.analyze();
            if(conclusion){
                $scope.conclusion = conclusion;
                $scope.currentQuestion = null;
            }
            else{
                $scope.currentQuestion = expertSystemService.nextQuestion();
                console.log($scope.currentQuestion);
                $scope.nbQuestions++;
            }
        }
    }]);