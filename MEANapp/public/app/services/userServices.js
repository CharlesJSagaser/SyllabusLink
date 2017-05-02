angular.module('userServices', [])

.factory('User', function($http){
	userFactory = {};


	userFactory.create = function(regData) {
		return $http.post('api/users', regData);
	}

	

	userFactory.getPermission = function(){
		return $http.get('/api/permission');
	};

	return userFactory;
});
