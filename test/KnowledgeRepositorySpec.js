describe("KnowledgeRepository", function () {
    var repository;

    beforeEach(module(APP_NAME));

    beforeEach(inject(function (KnowledgeRepository) {
        APP_LOCALSTORAGE_PREFIX = "testPokemon";
        repository = new KnowledgeRepository("test");
    }));

    afterEach(function () {
        repository.clear();
    });

    describe("initialization", function () {
        it("should be defined", function () {
            expect(repository).toBeDefined();
        });
    });

    describe("getConclusions", function () {
        it("should return an empty array", function () {
            var conclusions = repository.getConclusions();
            expect(conclusions.length).toBe(0);
        });

        it("should return an array with one conclusion", function () {
            var conclusion = {
                name: "someConclusion",
                facts: ["fact1", "fact2"]
            };
            repository.addConclusion(conclusion);
            var conclusions = repository.getConclusions();
            expect(conclusions.length).toBe(1);
            var firstConclusion = conclusions[0];
            expect(firstConclusion.name).toBe(conclusion.name);
            expect(firstConclusion.facts.length).toBe(conclusion.facts.length);
        });
    });
});