describe("KnowledgeRepository", function () {
    var repository;

    beforeEach(module(APP_NAME));

    beforeEach(inject(function (KnowledgeRepository) {
        repository = new KnowledgeRepository();
    }));

    describe("initialization", function () {
        it("should be defined", function () {
            expect(repository).toBeDefined();
        });
    });
});