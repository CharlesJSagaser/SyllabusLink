//this file is a controller file that returns a data object when the user clicks submit

angular.module('userControllers', ['userServices'])

.controller('regCtrl', function($http, $location, User){

		var app = this; // so we can access outside of scope

		this.regUser = function(regData) { //when the register button is pressed controller
			app.loading = true;
			app.errorMsg = false;

			User.create(app.regData).then(function(data){
				if(data.data.success){
					app.loading = false;
					app.successMsg = data.data.message;
					$location.path('/');



				} else {
					app.loading = false;
					app.errorMsg = data.data.message;
					

				}
			});
		}; 
	});