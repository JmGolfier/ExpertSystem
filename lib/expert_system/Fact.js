Fact = function(name) {
    this.name = name;
    this.value = undefined;
    this.type = "initial";
    this.parents = [];
    this.parentNames = [];
};

Fact.prototype.addParents = function (parents) {
    this.type = "intermediate";
    this.parents = parents;
    for(var i = 0; i < parents.length; i++){
        this.parentNames.push(parents[i].name);
    }
};

Fact.prototype.getValue = function () {
    if(this.type == "intermediate"){
        this.value = true;
        for(var i = 0; i < this.parents.length;i++){
            if(!this.parents[i].getValue()){
                this.value = this.parents[i].getValue();
                break;
            }
        }
    }
    return this.value;
};

Fact.prototype.isTrue = function() {
    return this.getValue() == true;
};

Fact.prototype.isFalse = function() {
    return this.getValue() == false;
};

Fact.prototype.isNotAnswered = function() {
    return this.getValue() === undefined;
};

Fact.prototype.setValue = function(value){
    this.value = value;
};
