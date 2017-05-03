angular.module('userApp',['appRoutes', 'userControllers','userServices','mainController', 'authServices', 'managementController', 'homeworkControllers' ])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors'); //intercept all http request with the factory which assigns token to header.
});
