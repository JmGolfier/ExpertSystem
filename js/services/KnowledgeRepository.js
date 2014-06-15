angular.module(APP_NAME_SERVICES).factory('KnowledgeRepository', ["localStorageService",
    function(localStorageService) {
        var KnowledgeRepository = function() {
        };

        KnowledgeRepository.prototype.getConclusions = function() {
            var existingConclusions = localStorageService.get("conclusions");
            if(!existingConclusions) {
                existingConclusions = [];
            }
            return existingConclusions;
        };

        KnowledgeRepository.prototype.addConclusion = function(conclusion) {
            var existingConclusions = this.getConclusions();
            existingConclusions.push(conclusion);
            localStorageService.set("conclusions", existingConclusions);
        };

        KnowledgeRepository.prototype.getFacts = function() {
            var existingFacts = localStorageService.get("facts");
            if(!existingFacts) {
                existingFacts = [];
            }
            return existingFacts;
        };

        KnowledgeRepository.prototype.addFact = function(fact) {
            var existingFacts = this.getFacts();
            existingFacts.push(fact);
            localStorageService.set("facts", existingFacts);
        };

        KnowledgeRepository.prototype.clear = function() {
            localStorageService.clearAll();
        };

        return KnowledgeRepository;
    }]);