angular.module(APP_NAME_CONTROLLERS).controller('FillKnowledgeController', [ '$scope', 'KnowledgeRepository',
    function($scope, KnowledgeRepository) {
        var knoledgeRepository = new KnowledgeRepository();
        $scope.conclusions = knoledgeRepository.getConclusions();
        initFacts();
        $scope.newFactParents = [];

        $scope.addFact = function () {
            var fact = {
                name : $scope.newFactName,
                question : $scope.newFactQuestion,
                type : $scope.newFactType
            };

            if(fact.type == "intermediate"){
                fact.parents = $scope.newFactParents;
            }
            knoledgeRepository.addFact(fact);
            initFacts();
        };

        $scope.addConclusion = function() {
            var factNames = [];
            for(var i=0; i<$scope.newConclusionFacts.length; i++) {
                factNames.push($scope.newConclusionFacts[i].name);
            }
            var conclusion = {
                name: $scope.newConclusionName,
                label : $scope.newConclusionLabel,
                facts : factNames
            };
            knoledgeRepository.addConclusion(conclusion);
            $scope.conclusions = knoledgeRepository.getConclusions();
        };

        $scope.clearConclusions = function() {
            knoledgeRepository.clear();
            $scope.conclusions = knoledgeRepository.getConclusions();
            initFacts();
        };

        $scope.editConclusion = function(conclusion) {
            $scope.newConclusionName = conclusion.name;
            $scope.newConclusionLabel = conclusion.label;
        };

        $scope.editFact = function(fact) {
            $scope.newFactName = fact.name;
            $scope.newFactQuestion = fact.question;
            $scope.newFactType = fact.type;
        };

        function initFacts() {
            $scope.conclusionFacts = getFactsAndUntickByDefault();
            $scope.factFacts = getFactsAndUntickByDefault();
            $scope.facts = knoledgeRepository.getFacts();
        }

        function getFactsAndUntickByDefault(){
            var facts = knoledgeRepository.getFacts();
            for(var i =0; i<facts.length;i++) {
                facts[i].ticked = false;
            }
            return facts;
        }
    }]);