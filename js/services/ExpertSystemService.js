angular.module(APP_NAME_SERVICES).factory('ExpertSystemService', ['KnowledgeRepository', 'ExpertSystem'
    function (KnowledgeRepository, ExpertSystem) {
        var ExpertSystemService = function() {
            this.expertSystem = new ExpertSystem();
            //checkRepo and fill expertSystem
        };

        //perception, analyse, conclusion
        ExpertSystemService.prototype.nextQuestion = function() {
            //return conclusion or fact to ask
        };

        return ExpertSystemService;
    }]);