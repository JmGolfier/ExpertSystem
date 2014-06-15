describe("ExpertSystem", function () {
    var expertSytem;

    beforeEach(function () {
        expertSytem = new ExpertSystem();
    });

    describe("initialization", function () {
        it("should be defined", function () {
            expect(expertSytem).toBeDefined();
        });
    });

    describe("inferForward", function() {
        describe("initial  facts", function () {
            it("should not have conclusion with none facts", function () {
                var conclusions = expertSytem.inferForward();
                expect(conclusions.length).toBe(0);
            });

            it("should have one conclusion with a simple fact", function () {
                expertSytem.addFact("A");
                expertSytem.addFact("B");
                expertSytem.addRule("conclusion", ["A", "B"]);
                expertSytem.setFactValid("A", true);
                expertSytem.setFactValid("B", true);

                var conclusions = expertSytem.inferForward();

                expect(conclusions.length).toBe(1);
                expect(conclusions[0]).toEqual("conclusion");
            });

            it("should have none conclusions if not enought facts are valided", function () {
                expertSytem.addFact("A");
                expertSytem.addFact("B");
                expertSytem.addRule("conclusion", ["A", "B"]);
                expertSytem.setFactValid("A", true);
                expertSytem.setFactValid("B", false);

                var conclusions = expertSytem.inferForward();

                expect(conclusions.length).toBe(0);
            });

            it("should have two conclusions", function () {
                expertSytem.addFact("A");
                expertSytem.addFact("B");
                expertSytem.addRule("conclusion", ["A", "B"]);
                expertSytem.addRule("conclusion", ["B"]);
                expertSytem.setFactValid("A", true);
                expertSytem.setFactValid("B", true);

                var conclusions = expertSytem.inferForward();

                expect(conclusions.length).toBe(2);
            });
        });

        describe("intermediate facts", function () {
            it("should find conclusion with intermediate", function () {
                expertSytem.addFact("A");
                expertSytem.addFact("B");
                expertSytem.addFact("C", ["A", "B"]);
                expertSytem.addRule("conclusion", ["C"]);
                expertSytem.setFactValid("A", true);
                expertSytem.setFactValid("B", true);

                var conclusions = expertSytem.inferForward();

                expect(conclusions.length).toBe(1);
                expect(conclusions[0]).toEqual("conclusion");
            });
        });
    });

    describe("inferBackward", function() {
        it("should return an empty fact if none conclusion", function () {
            var infered = expertSytem.inferBackward();
            expect(infered).toBeUndefined();
        });

        it("should return fact if one conclusion", function () {
            expertSytem.addFact("A");
            expertSytem.addRule("conclusion",["A"]);
            var infered= expertSytem.inferBackward();
            expect(infered.name).toBe("A");
        });
        it("should ask for answered one", function () {
            expertSytem.addFact("A");
            expertSytem.setFactValid("A", true);
            expertSytem.addFact("B");
            expertSytem.addFact("C");
            expertSytem.addRule("1",["A","B"]);
            expertSytem.addRule("1",["B","C"]);
            var infered= expertSytem.inferBackward();
            expect(infered.name).toBe("B");
        });

        it("sould not return intermediate fact", function () {
            expertSytem.addFact("A");
            expertSytem.addFact("B");
            expertSytem.addFact("C",["A","B"]);

            expertSytem.addRule("1",["C"]);
            var infered= expertSytem.inferBackward();
            expect(infered.name).toBe("A");
        });

        it("should not ask for a fact after a false one", function () {
            expertSytem.addFact("A");
            expertSytem.setFactValid("A",false);
            expertSytem.addFact("B");
            expertSytem.addFact("C");
            expertSytem.addRule("1",["A","B"]);
            expertSytem.addRule("2",["B","C"]);
            var infered= expertSytem.inferBackward();
            expect(infered.name).toBe("B");

        });
      });

    describe("addRule", function () {
        it("should have one conclusion with two facts", function () {
            var facts = ["A", "B"];
            expertSytem.addRule("conclusion", facts);

            expect(expertSytem.conclusions.length).toBe(1);
            var conclusion = expertSytem.conclusions[0];
            expect(conclusion.name).toBe("conclusion");
            expect(conclusion.facts).toEqual(facts);
        });
    });

    describe("setFactValid", function () {
        it("should set some fact to true", function () {
            expertSytem.addFact("A");
            expertSytem.addRule("conclusion", ["A"]);
            expect(expertSytem.facts["A"].isFalse()).toBe(false);
            expertSytem.setFactValid("A", true);
            expect(expertSytem.facts["A"].isTrue()).toBe(true);
        });
    });

    describe("addFact", function () {
        it("should declare an initial fact", function () {
            expertSytem.addFact("A");
            expect(expertSytem.facts["A"].type).toBe("initial");
            expect(expertSytem.facts["A"].isFalse()).toBe(false);
        });

        it("should declare an intermediate fact", function () {
            expertSytem.addFact("A");
            expertSytem.addFact("B");
            expertSytem.addFact("C", ["A", "B"]);
            expect(expertSytem.facts["C"].isFalse()).toBe(false);
            expect(expertSytem.facts["C"].type).toBe("intermediate");
            expect(expertSytem.facts["C"].parentNames).toEqual(["A", "B"]);
        });
    });
});