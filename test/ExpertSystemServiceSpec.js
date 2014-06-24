describe("ExpertSystemService", function () {
    beforeEach(module(APP_NAME));

    describe("initialization", function () {
        it("should be defined",function(){
            injectDependencies(function (expertSystemService) {
                expect(expertSystemService).toBeDefined();
            });
        });

        it("should be defined with some fake dependency", function () {
            var FakeExpertSystem = function () {

            };

            FakeExpertSystem.prototype.echo = function () {
                return "echo";
            };

            injectDependencies(function (expertSystemService) {
                expect(expertSystemService).toBeDefined();
                expect(expertSystemService.expertSystem.echo()).toBe("echo");
            }, null, FakeExpertSystem);
        });
    });
    describe("fill system expert", function(){
        it("should have an expert system with two conclusions", function(){
            var repoConclusions = [{
                name : "dudu",
                facts : []
            }, {
                    name :  "manu",
                    facts : []
                }];

            var FakeRepo = function(){

            };

            FakeRepo.prototype.getConclusions = function(){
                return repoConclusions;
            };
            FakeRepo.prototype.getFacts = function(){
                return [];
            };

            var FakeExpertSystem = function(){
                this.conclusions = [];
            };

            FakeExpertSystem.prototype.addRule = function(name, facts){
                var conclusion = {
                    name : name,
                    facts : facts
                };
                this.conclusions.push(conclusion);
            };

            FakeExpertSystem.prototype.getConclusions = function(){
                return this.conclusions;
            };

            injectDependencies(function(expertSystemService){
                var systemConclusions = expertSystemService.expertSystem.getConclusions();
                expect(systemConclusions).toEqual(repoConclusions);
            }, FakeRepo, FakeExpertSystem);
        });
    });

    describe("nextQuestion", function () {
        it("should get the next question from expert system inferBackward", function () {
            var fact = {
                name: "someName",
                label: "someLabel"
            };

            var FakeExpertSytstem = function() {

            };

            FakeExpertSytstem.prototype.inferBackward = function() {
                return {
                    name: "someName",
                    type: "initial",
                    value: undefined
                };
            };

            var FakeRepo = function(){

            };

            FakeRepo.prototype.getFact = function(name){
                return fact;
            };

            FakeRepo.prototype.getConclusions = function() {
                return [];
            };
            FakeRepo.prototype.getFacts = function(){
                return [];
            };

            injectDependencies(function (service) {
                var question = service.nextQuestion();
                expect(question).toBeDefined();
                expect(question.name).toBe(fact.name);
                expect(question.label).toBe(fact.label);
            }, FakeRepo, FakeExpertSytstem);
        });

        it("should get multiple questions from group", function(){
            var fact1 = {
                name: "1",
                group: "a"
            };
            var fact2 = {
                name: "2",
                group: "b"
            };
            var fact3 = {
                name: "3",
                group:"a"
            };

            var FakeRepo = function() {

            };

            FakeRepo.prototype.getFactsFromGroup = function() {
                return [fact1, fact3];
            };

            FakeRepo.prototype.getConclusions = function() {
                return [];
            };
            FakeRepo.prototype.getFacts = function(){
                return [];
            };
            FakeRepo.prototype.getFact = function(){
                return fact1;
            };

            var FakeExpertSystem = function() {

            };

            FakeExpertSystem.prototype.inferBackward = function() {
                return fact1;
            };

            injectDependencies(function (service) {
                var questions = service.nextQuestion();
                expect(questions).toBeDefined();
                expect(questions.length).toBe(2);
            }, FakeRepo, FakeExpertSystem);
        });
    });

    describe("analyze", function () {
        it("should not have any conclusion", function () {

            var FakeExpertSystem = function() {

            };

             FakeExpertSystem.prototype.inferForward = function() {
                 return [];
             };

            injectDependencies(function (service) {
                var conclusions = service.analyze();
                expect(conclusions).toBeUndefined();
            }, null, FakeExpertSystem);
        });

        it("should get the right conclusion infos", function () {
            var conclusion = {
                name : "a",
                label : "conclusion !"
            };

            var FakeRepo = function(){

            };

            FakeRepo.prototype.getConclusions = function() {
                return [];
            };

            FakeRepo.prototype.getConclusion = function(name){
                return conclusion;
            };
            FakeRepo.prototype.getFacts = function(){
                return [];
            };

            var FakeExpertSystem = function() {

            };

            FakeExpertSystem.prototype.inferForward = function() {
                return [{
                    name: "a"
                }];
            };

            injectDependencies(function (service) {
                var conclusion = service.analyze();
                expect(conclusion).toBeDefined();
                expect(conclusion.label).toBe("conclusion !");
                expect(conclusion.name).toBe("a");
            }, FakeRepo, FakeExpertSystem);
        });
    });

    describe("setFactValid", function () {
        it("should set the expert system fact true", function () {

            var FakeExpertSystem = function () {

            };

            FakeExpertSystem.prototype.setFactValid = function(fact, value) {

            };

            FakeExpertSystem.prototype.getFact = function(factName){
                return {name: factName, getValue: function() {return true}};
            };

            injectDependencies(function (service) {
                service.setFactValid("string", true);
                expect(service.expertSystem.getFact("string").getValue()).toBe(true);
            }, null, FakeExpertSystem);
        });

        it("should set one from group true, the rest is false", function () {
            var fact1 = {
                name: "a",
                group: "group"
            };
            var fact2 = {
                name: "b",
                group: "group"
            };
            var fact3 = {
                name: "c",
                group: "group2"
            };

            var FakeExpertSystem = function(){
                this.facts = {"c": {
                    getValue: function() {
                        return undefined;
                    }
                }};
            };
            FakeExpertSystem.prototype.getFact = function(name){
                var self = this;
                return {
                    getValue : function(){
                        return self.facts[name].value;
                    }
                }
            };
            FakeExpertSystem.prototype.setFactValid = function(fact, value){
                this.facts[fact] = {value: value};
            };

            var FakeRepository = function(){};
            FakeRepository.prototype.getFactsFromGroup = function(){
                return [fact1, fact2];
            };
            FakeRepository.prototype.getConclusions = function(){
                return [];
            };
            FakeRepository.prototype.getFacts = function(){
                return [];
            };

            injectDependencies(function (service) {
                service.setFactValid(fact2, true);
                expect(service.expertSystem.getFact("b").getValue()).toBe(true);
                expect(service.expertSystem.getFact("a").getValue()).toBe(false);
                expect(service.expertSystem.getFact("c").getValue()).toBe(undefined);
            }, FakeRepository, FakeExpertSystem);
        });
    });
});

function injectDependencies(callback, KnowledgeRepository, ExpertSystem) {
    module(function ($provide) {
        if(!KnowledgeRepository) {
            KnowledgeRepository = function() {

            };
            KnowledgeRepository.prototype.getFacts = function() {
                return [];
            };

            KnowledgeRepository.prototype.getConclusions = function() {
                return [];
            };
        }
        $provide.value("KnowledgeRepository", KnowledgeRepository);

        if(ExpertSystem) {
            $provide.value("ExpertSystem", ExpertSystem);
        }
    });

    inject(function (ExpertSystemService) {
        callback(new ExpertSystemService());
    });
}