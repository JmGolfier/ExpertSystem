angular.module(APP_NAME_CONTROLLERS).controller('FillKnowledgeController', [ '$scope', 'KnowledgeRepository',
    function($scope, KnowledgeRepository) {
        var knoledgeRepository = new KnowledgeRepository();
        $scope.conclusions = knoledgeRepository.getConclusions();

        $scope.addConclusion = function() {
            var conclusion = {
                name: $scope.newConclusionName,
                facts: $scope.newConclusionFacts.split(",")
            };
            knoledgeRepository.addConclusion(conclusion);
            $scope.conclusions = knoledgeRepository.getConclusions();
        };

        $scope.clearConclusions = function() {
            knoledgeRepository.clear();
            $scope.conclusions = knoledgeRepository.getConclusions();
        };
    }]);