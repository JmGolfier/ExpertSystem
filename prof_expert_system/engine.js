function InferenceEngine() {

}

InferenceEngine.prototype.inferForward = function(factBase, ruleBase) {
	var inferedFacts = [];
	var finished = false;
	while(!finished) {
		finished = true;
		for(ruleIndex in ruleBase.rules) {
			var rule = ruleBase.rules[ruleIndex];
			if(!rule.goal.isValid() && rule.isValid()) {
				rule.goal.value = true;
				inferedFacts.push(rule.goal.label);

				finished = false;
			}
		}
	}

	return inferedFacts;
};

InferenceEngine.prototype.inferBackward = function(factBase, ruleBase) {
	var primaryGoals = ruleBase.primaryGoals();
	for(goalIndex in primaryGoals) {
		var goalLabel = primaryGoals[goalIndex];
		var initialPremises = ruleBase.initialPremises(goalLabel);
		for(premiseIndex in initialPremises) {
			var premiseLabel = initialPremises[premiseIndex];
			if(!factBase.isFactValid(premiseLabel)) {
				return premiseLabel;
			}
		}
	}
	return null;
};
