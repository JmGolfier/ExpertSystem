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

        KnowledgeRepository.prototype.clear = function() {
            localStorageService.clearAll();
        };

        return KnowledgeRepository;
    }]);