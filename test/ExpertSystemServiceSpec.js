describe("ExpertSystemService", function () {
    var expertService;

    beforeEach(module(APP_NAME));

    beforeEach(inject(function (ExpertSystemService) {
        expertService = new ExpertSystemService();
    }));

    describe("initialization", function () {
        it("should be defined", function () {
            module(function ($provide) {
                $provide.value("KnowledgeRepository", "test");
            });

            expect(expertService).toBeDefined();
        });

        it("should have facts array empty",function(){
//            expect(expertService)
        });
    });
});