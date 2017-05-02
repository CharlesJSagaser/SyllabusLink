var app = angular.module('appRoutes',['ngRoute'])

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

		.when('/addHomework', {
		templateUrl: 'app/views/pages/homework/addHomeWork.html',
		controller: 'addHwCtrl',
		controllerAs: 'addHomework'
	})

		.when('/logout', {
			templateUrl: 'app/views/pages/users/logout.html'
		})

		.when('/profile', {
			templateUrl: 'app/views/pages/users/profile.html',
			isteacher: true
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

		.when('/management', {
			templateUrl: 'app/views/pages/users/management.html',
			conoller: 'managementCtrl',
			controllerAs: 'management',
			permission: ['teacher', 'admin']

		})



	.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode({
	enabled: true,
 	requireBase: false 
 });

})

app.run(['$rootScope','Auth', 'User', '$location', function($rootScope, Auth, User, $location){

	$rootScope.$on('$routeChangeStart', function(event,next,current){

		
		if(next.$$route.permission){
			User.getPermission().then(function(data){
				if(next.$$route.permission[0] !== data.data.permission){
					if(next.$$route.permission[1] !== data.data.permission){
						event.preventDefault();
						$location.path('/');
					}
				}
			});
		}
 

		

	});

}]);
