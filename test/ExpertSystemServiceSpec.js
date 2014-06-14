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