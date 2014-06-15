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
                return fact;
            };

            injectDependencies(function (service) {
                var question = service.nextQuestion();
                expect(question).toBeDefined();
                expect(question.name).toBe(fact.name);
                expect(question.label).toBe(fact.label);
            }, null, FakeExpertSytstem);
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
                expect(conclusions).toBeDefined();
                expect(conclusions.length).toBe(0);
            }, null, FakeExpertSystem);
        });
    });

    describe("setFactValid", function () {
        it("should set the expert system fact true", function () {

            var FakeExpertSystem = function () {

            };

            FakeExpertSystem.prototype.setFactValid = function(fact, value) {

            };

            FakeExpertSystem.prototype.getFact = function(factName){
                return {name: factName, value: true};
            };

            injectDependencies(function (service) {
                service.setFactValid("string", true);
                expect(service.expertSystem.getFact("string").value).toBe(true);
            }, null, FakeExpertSystem);
        });
    });
});

function injectDependencies(callback, KnowledgeRepository, ExpertSystem) {
    module(function ($provide) {
        if(KnowledgeRepository) {
            $provide.value("KnowledgeRepository", KnowledgeRepository);
        }
        if(ExpertSystem) {
            $provide.value("ExpertSystem", ExpertSystem);
        }
    });

    inject(function (ExpertSystemService) {
        callback(new ExpertSystemService());
    });
}