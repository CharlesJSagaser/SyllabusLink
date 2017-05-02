angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider,$locationProvider){

	$routeProvider

		.when('/',{
			templateUrl: 'app/views/pages/home.html'
		})

		.when('/about',{
			templateUrl: 'app/views/pages/about.html'
		})

		.when('/login', {
			templateUrl: 'app/views/pages/login.html'
		})

		.when('/register', {
			templateUrl: 'app/views/pages/users/register.html',
			controller: 'regCtrl',
			controllerAs: 'register'
		})

		.when('/login', {
			templateUrl: 'app/views/pages/users/login.html'
		})

		.when('/logout', {
			templateUrl: 'app/views/pages/users/logout.html'
		})

		.when('/profile', {
			templateUrl: 'app/views/pages/users/profile.html'
		})
		.when('/facebook/:token', {
			templateUrl: 'app/views/pages/users/social/social.html'
		})

		.when('/google/:token', {
			templateUrl: 'app/views/pages/users/social/social.html',
			controller: 'twitterCtrl',
			controllerAs: 'twitter'
		})

		.when('/googleerror', {
			templateUrl: 'app/views/pages/users/login.html',
			controller: 'googleCtrl',
			controllerAs: 'google'
		})

		.when('/syllabus', {
			templateUrl: 'app/views/pages/users/syllabus.html'
		})



	.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode({
	enabled: true,
 	requireBase: false 
 });

});

