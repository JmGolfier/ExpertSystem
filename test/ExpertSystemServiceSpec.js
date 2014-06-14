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

    describe("filed system expert", function(){
        it("should exist", function(){
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