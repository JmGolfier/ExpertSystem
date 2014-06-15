angular.module(APP_NAME_SERVICES).factory('ExpertSystemService', ['KnowledgeRepository', 'ExpertSystem',
    function (KnowledgeRepository, ExpertSystem) {
        var ExpertSystemService = function() {
            this.expertSystem = new ExpertSystem();
            this.knowledgeRepository = new KnowledgeRepository();
            var conclusions = this.knowledgeRepository.getConclusions();
            for(var i = 0; i<=conclusions.length-1;i++){
                this.expertSystem.addRule(conclusions[i].name,conclusions[i].facts)
            }
        };

        ExpertSystemService.prototype.nextQuestion = function() {
            return this.expertSystem.inferBackward();
        };

        ExpertSystemService.prototype.analyze = function() {
            return this.expertSystem.inferForward();
        };

        ExpertSystemService.prototype.setFactValid = function(fact, value) {
            this.expertSystem.setFactValid(fact, value);
        };

        return ExpertSystemService;
    }]);