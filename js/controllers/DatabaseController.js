angular.module(APP_NAME_CONTROLLERS).controller('DatabaseController', [ '$scope', 'KnowledgeRepository',
    function($scope, KnowledgeRepository) {
        var repository = new KnowledgeRepository();
        $scope.database = repository.exportDatabase();
    }]);