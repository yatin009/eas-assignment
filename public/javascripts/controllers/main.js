angular.module('easController', [])

// inject the Todo service factory into our controller
    .controller('mainController', ['$scope', '$http', 'GITHUB_AUTHENTICATE', function ($scope, $http, GITHUB_AUTHENTICATE) {
        $scope.formData = {};

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.authenticateUser = function () {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            // call the create function from our service (returns a promise object)
            GITHUB_AUTHENTICATE.create($scope.formData)
            // if successful creation, call our get function to get all the new todos
                .success(function (data) {
                    console.log('SUCCESS');
                    // $scope.formData = {}; // clear the form so our user is ready to enter another
                    // $scope.todos = data; // assign our new list of todos
                });
        };

    }]);