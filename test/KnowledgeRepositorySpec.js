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

    describe("getConclusion", function(){
       it("should get one conclusion", function(){
           var conclusion1 = {
               name : "a",
               label : "a"
           };
           var conclusion2 = {
               name : "b",
               label : "b"
           };

           repository.addConclusion(conclusion1);
           repository.addConclusion(conclusion2);
           var conclusion = repository.getConclusion("a");
           expect(conclusion.name).toBe("a");
           expect(conclusion.label).toBe("a");
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

    describe("delete conclusion", function () {
        it("should delete a conclusion", function () {
            var conclusion1 = {
                name : "conc1"
            };
            var conclusion2 = {
                name : "conc2"
            };
            repository.addConclusion(conclusion1);
            repository.addConclusion(conclusion2);
            repository.deleteConclusion("conc1");
            var conclusions = repository.getConclusions();
            expect(conclusions.length).toBe(1);
        });
    });

    describe("getFacts", function () {
        it("should return one fact", function () {
            var fact = {
                name: "THE FACT",
                question: "woot?",
                type: "initial"
            };
            repository.addFact(fact);
            var facts = repository.getFacts();
            expect(facts.length).toBe(1);
        });
    });

    describe("getFact", function () {
        it("should get one fact", function () {
            var fact1 = {
                name: "1"
            };
            var fact2 = {
                name: "2"
            };
            repository.addFact(fact1);
            repository.addFact(fact2);

            var fact = repository.getFact("2");
            expect(fact.name).toBe("2");
        });
    });

    describe("getFactsFromGroup", function(){
        it("should get two facts from one group", function(){
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
            repository.addFact(fact1);
            repository.addFact(fact2);
            repository.addFact(fact3);

            var facts = repository.getFactsFromGroup("a");
            expect(facts.length).toBe(2);
        });
    });
    describe("delete fact", function() {
        it("should delete a fact", function () {
            var fact1 = {
                name: "a"
            };
            var fact2 = {
                name: "b"
            };

            repository.addFact(fact1);
            repository.addFact(fact2);

            repository.deleteFact("a");
            var facts = repository.getFacts();
            expect(facts.length).toBe(1);
        });
    });

    describe("importDatabase", function () {
        it("should import database", function () {
            var dataBase = {
                conclusions: [{name: "1"}],
                facts: [{name: "a"}]
            };
            var databaseString = JSON.stringify(dataBase);

            repository.importDatabase(databaseString);

            var conclusions = repository.getConclusions();
            var facts = repository.getFacts();
            expect(facts.length).toBe(1);
            expect(conclusions.length).toBe(1);
        });
    });
});