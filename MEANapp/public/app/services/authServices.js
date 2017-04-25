angular.module('authServices', [])

    .factory('Auth', function($http, AuthToken){
        var authFactory = {};


        authFactory.login = function(loginData) {
            return $http.post('/api/authenticate', loginData).then(function(data){
                AuthToken.setToken(data.data.token);
                return data;
            });
        };


        //Auth.isLoggedIn();
        authFactory.isLoggedIn = function(){
            if (AuthToken.getToken()){
                return true;

            } else {

                return false;
            }

        };

        //Auth.getUser();
        authFactory.getUser = function(){
          if(AuthToken.getToken()) {
              return $http.post('/api/me');
          }  else {
              $q.reject({ message: 'User has no token'});
          }
        };

        authFactory.logout = function() {
            AuthToken.setToken();

        };

        return authFactory;
    })



    .factory('AuthToken', function($window) {
        var authTokenFactory = {};

        authTokenFactory.setToken = function(token){
            if (token) {
                $window.localStorage.setItem('token', token); //stores token in the browser
            } else {
                $window.localStorage.removeItem('token');
            }
        };

        authTokenFactory.getToken = function() {
            return $window.localStorage.getItem('token'); // grabs token from web browser
        };

        return authTokenFactory;
    })

.factory('AuthInterceptors', function(AuthToken) {
    var authInterceptorsFactory = {};

    authInterceptorsFactory.request = function(config){

        var token = AuthToken.getToken();

        if(token) {
            config.headers['x-access-token'] = token; //assign tokens to headers
        }

        return config;
    };

    return authInterceptorsFactory
});