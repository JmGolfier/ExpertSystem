angular.module(APP_NAME_SERVICES).factory('KnowledgeRepository', ["localStorageService",
    function(localStorageService) {
        var KnowledgeRepository = function(notImportDefault) {
            var existingConclusions = this.getConclusions(true);
            if(existingConclusions.length == 0 && !notImportDefault)
                this.importDefaultData();
        };

        KnowledgeRepository.prototype.importDefaultData = function() {
            var request = new XMLHttpRequest();
            request.open('GET', 'data/default.json', false);  // `false` makes the request synchronous
            request.send(null);
            this.importDatabase(request.responseText);
        };

        KnowledgeRepository.prototype.getConclusions = function(notByPriority) {
            var existingConclusions = localStorageService.get("conclusions");
            if(!existingConclusions) {
                existingConclusions = [];
            }
            if(!notByPriority) {
                var prioritedConclusions = this.organizeByPriority(existingConclusions);
                if(prioritedConclusions.length != 0)
                    existingConclusions = prioritedConclusions;
            }
            return existingConclusions;
        };

        KnowledgeRepository.prototype.organizeByPriority = function(conclusions) {
            var ordered = [];
            var currentPriority = 1;
            while(currentPriority != conclusions.length + 1) {
                var priorityConclusion = getPriority(conclusions, currentPriority);
                if(!priorityConclusion)
                    break;
                ordered.push(priorityConclusion);
                currentPriority++;
            }
            return ordered;
        };

        function getPriority(conclusions, priority) {
            for(var i=0; i<conclusions.length; i++) {
                if(conclusions[i].priority == priority) {
                    return conclusions[i];
                }
            }
        }

        KnowledgeRepository.prototype.addConclusion = function(conclusion) {
            var existingConclusions = this.getConclusions(true);
            existingConclusions.push(conclusion);
            localStorageService.set("conclusions", existingConclusions);
        };

        KnowledgeRepository.prototype.getConclusion = function(name) {
            var existingConclusions = this.getConclusions(true);
            for(var i=0; i<existingConclusions.length; i++) {
                if(existingConclusions[i].name == name)
                    return existingConclusions[i];
            }
        };

        KnowledgeRepository.prototype.deleteConclusion = function(name) {
            var existingConclusions = this.getConclusions(true);
            for(var i = 0; i<existingConclusions.length;i++) {
                if(existingConclusions[i].name == name){
                    existingConclusions.splice(i, 1);
                    localStorageService.set("conclusions", existingConclusions);
                    break;
                }
            }
        };

        KnowledgeRepository.prototype.deleteFact = function(name) {
            var existingFacts = this.getFacts();
            for(var i = 0; i<existingFacts.length;i++) {
                if(existingFacts[i].name == name){
                    existingFacts.splice(i, 1);
                    localStorageService.set("facts", existingFacts);
                    break;
                }
            }
        };

        KnowledgeRepository.prototype.getFacts = function() {
            var existingFacts = localStorageService.get("facts");
            if(!existingFacts) {
                existingFacts = [];
            }
            return existingFacts;
        };

        KnowledgeRepository.prototype.getFact = function(name){
            var existingFacts = this.getFacts();
            for (var i = 0; i<existingFacts.length;i++){
                if(existingFacts[i].name == name)
                    return existingFacts[i];
            }
        };

        KnowledgeRepository.prototype.getFactsFromGroup = function(groupName) {
            var existingFacts = this.getFacts();
            var factFromGroup = [];
            for(var i=0; i<existingFacts.length; i++) {
                if(existingFacts[i].group == groupName)
                    factFromGroup.push(existingFacts[i]);
            }
            return factFromGroup;
        };

        KnowledgeRepository.prototype.addFact = function(fact) {
            var existingFacts = this.getFacts();
            existingFacts.push(fact);
            localStorageService.set("facts", existingFacts);
        };

        KnowledgeRepository.prototype.clear = function() {
            localStorageService.clearAll();
        };

        KnowledgeRepository.prototype.importDatabase = function (dataBaseString) {
            var dataBaseJSON = JSON.parse(dataBaseString);
            localStorageService.set("facts", dataBaseJSON.facts);
            localStorageService.set("conclusions", dataBaseJSON.conclusions);
        };

        KnowledgeRepository.prototype.exportDatabase = function () {
            var dataBase = {};
            dataBase.facts = this.getFacts();
            dataBase.conclusions = this.getConclusions();
            return dataBase;
        };

        return KnowledgeRepository;
    }]);