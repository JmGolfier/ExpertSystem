describe("Fact", function () {
    describe("initialization", function () {
        it("should be defined", function () {
            var fact = new Fact("A");
            expect(fact).toBeDefined();
            expect(fact.name).toBe("A");
            expect(fact.type).toBe("initial");
        });

        it("should declare an intermediate fact", function () {
            var factA = new Fact("A");
            var factB = new Fact("B");
            var factC = new Fact("C");
            factC.addParents([factA, factB]);
            expect(factC.parents.length).toBe(2);
            expect(factC.parentNames).toEqual(["A", "B"]);
            expect(factC.type).toBe("intermediate");
        });
    });

    describe("getValue", function () {
        it("should be not answered by default", function () {
            var fact = new Fact("A");
            expect(fact.isNotAnswered()).toBe(true);
        });

        it("should be not answered by default for intermediate fact", function () {
            var factA = new Fact("A");
            var factB = new Fact("B");
            var factC = new Fact("C");
            factC.addParents([factA, factB]);
            expect(factC.isNotAnswered()).toBe(true);
        });

        it("should be true for initiale", function(){
            var fact = new Fact("A");
            fact.setValue(true);
            expect(fact.isTrue()).toBe(true);
        });

        it("should be true for intermediate", function () {
            var factA = new Fact("A");
            var factB = new Fact("B");
            var factC = new Fact("C");
            factA.setValue(true);
            factB.setValue(true);
            factC.addParents([factA, factB]);
            expect(factC.isTrue()).toBe(true);
        });
    });
});