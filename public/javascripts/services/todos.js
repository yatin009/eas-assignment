angular.module('easService', [])

	// super simple service
	// each function returns a promise object 
	.factory('GITHUB_AUTHENTICATE', ['$http',function($http) {
		return {
			create : function(authenticationData) {
				return $http.get('/users/authenticate', authenticationData);
			}
		}
	}]);