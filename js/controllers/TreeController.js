angular.module(APP_NAME_CONTROLLERS).controller('TreeController', [ '$scope', 'KnowledgeRepository',
    function($scope, KnowledgeRepository) {
        var repository = new KnowledgeRepository();
        $scope.datas = repository.exportDatabase();


        $scope.createJSON = function(){
            var json = {};

            for(var i = 0; i<$scope.datas.conclusions.count; i++){
                var data = $scope.datas.conclusions;
                json.push({
                    id: i,
                    name: data.label,
                    data: {},
                    children: [{}]
                });
                var facts = data.conclusion.facts;
                for(var j = 0; j<facts.count; j++){
                    json.i.children.push({
                        id: facts[j],
                        name: facts[j],
                        data: {},
                        children: [{}]
                    })
                }
            }
            return json;
        }
    }]);