ExpertSystem = function() {
    this.conclusions = [];
    this.facts={};
};

ExpertSystem.prototype.inferForward = function() {
    var conclusions = [];
    for(var i = 0; i < this.conclusions.length; i++){
        var facts = this.conclusions[i].facts;
        var isValid = true;
        for(var j = 0; j < facts.length; j++){
            if(!this.facts[facts[j]].getValue()) {
                isValid = false;
                break;
            }
        }
        if(isValid)
            conclusions.push(this.conclusions[i].name);
    }
    return conclusions;
};

ExpertSystem.prototype.inferBackward = function() {
    for(var i=0; i<this.conclusions.length; i++) {
        var factsInferred = this.getFactsFromConclusion(this.conclusions[i]);
        for(var j = 0; j < factsInferred.length; j++) {
            if (factsInferred[j].isNotAnswered()){
                return factsInferred[j];
            }
        }
    }
};

ExpertSystem.prototype.setFactValid = function(fact, value) {
    this.facts[fact].setValue(value);
};

ExpertSystem.prototype.addRule = function(conclusion, facts) {
    this.conclusions.push({
        name : conclusion,
        facts : facts
    });
};

ExpertSystem.prototype.addFact = function(name, parents) {
    var fact = new Fact(name);
    if(parents) {
        var parentFacts = [];
        for (var i = 0; i < parents.length; i++) {
            parentFacts.push(this.facts[parents[i]]);
        }
        fact.addParents(parentFacts);
    }
    this.facts[name] = fact;
};

ExpertSystem.prototype.getFactsFromConclusion = function(conclusion) {
    var factsFromConclusion = [];
    for(var i = 0; i < this.conclusions.length; i++){
        if(this.conclusions[i].name == conclusion.name){
            var factNames = this.conclusions[i].facts;
            var facts = [];
            for(var j=0; j<factNames.length; j++) {
                facts.push(this.facts[factNames[j]]);
            }
            readFactsAndPush(facts);
        }
    }
    return factsFromConclusion;

    function readFactsAndPush(facts) {
        for(var i = 0; i < facts.length; i++)
        {
            if(facts[i].isFalse())
                break;
            if(facts[i].type == "initial") {
                //if facts from conclusion doesnt already contains fact
                if (factsFromConclusion.indexOf(facts[i]) == -1) {
                    factsFromConclusion.push(facts[i]);
                }
            } else {
                readFactsAndPush(facts[i].parents);
            }
        }
    }
};