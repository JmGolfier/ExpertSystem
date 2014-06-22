angular.module(APP_NAME_SERVICES).factory('ExpertSystemService', ['KnowledgeRepository', 'ExpertSystem',
    function (KnowledgeRepository, ExpertSystem) {
        var ExpertSystemService = function() {
            this.expertSystem = new ExpertSystem();
            this.knowledgeRepository = new KnowledgeRepository();

            var facts = this.knowledgeRepository.getFacts();
            for(var i=0; i<facts.length; i++) {
                var currentFact = facts[i];
                if(currentFact.type == "intermediate") {
                    var parentNames = [];
                    for(var j=0; j<currentFact.parents.length; j++) {
                        parentNames.push(currentFact.parents[j].name);
                    }
                    this.expertSystem.addFact(currentFact.name, parentNames);
                }
                else
                    this.expertSystem.addFact(currentFact.name);
            }

            var conclusions = this.knowledgeRepository.getConclusions();
            for(var i = 0; i<=conclusions.length-1;i++){
                this.expertSystem.addRule(conclusions[i].name,conclusions[i].facts)
            }
        };

        ExpertSystemService.prototype.nextQuestion = function() {
            var questionInferred = this.expertSystem.inferBackward();
            if(questionInferred) {
                var fact = this.knowledgeRepository.getFact(questionInferred.name);
                if (fact.group)
                    return this.knowledgeRepository.getFactsFromGroup(fact.group);
                else
                    return fact;
            } else
                return null;
        };

        ExpertSystemService.prototype.analyze = function() {
            var conclusions = this.expertSystem.inferForward();
            if(conclusions.length != 0)
                return this.knowledgeRepository.getConclusion(conclusions[0]);
        };

        ExpertSystemService.prototype.setFactValid = function(fact, value) {
            if(fact.group) {
                var factsFromGroup = this.knowledgeRepository.getFactsFromGroup(fact.group);
                for(var i = 0; i < factsFromGroup.length; i++) {
                    this.expertSystem.setFactValid(factsFromGroup[i].name, false);
                }
            }
            this.expertSystem.setFactValid(fact.name, value);
        };

        return ExpertSystemService;
    }]);