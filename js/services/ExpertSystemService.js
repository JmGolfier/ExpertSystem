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

        //perception, analyse, conclusion
        ExpertSystemService.prototype.nextQuestion = function() {
            //return conclusion or fact to ask
        };

        return ExpertSystemService;
    }]);