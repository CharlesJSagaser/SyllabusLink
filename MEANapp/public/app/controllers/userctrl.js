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
	})

.controller('googleCtrl', function($routeParams, Auth, $location, $window) {
    var app = this;

    if($window.location.pathname == '/googleerror') {
        app.errorMsg = 'Google e-mail not found in database.';
    } else {
        Auth.facebook($routeParams.token);
        $location.path('/');
    }
})

.controller('twitterCtrl', function($routeParams, Auth, $location, $window, $scope) {

    var app = this;
    app.errorMsg = false; // Clear errorMsg on page load
    app.expired = false; // Clear expired on page load
    app.disabled = true; // On page load, remove disable lock from form

    // Check if callback was successful
    if ($window.location.pathname == '/twittererror') {
        $scope.alert = 'alert alert-danger'; // Set class for message
        app.errorMsg = 'Twitter e-mail not found in database.'; // If error, display custom message
    } else if ($window.location.pathname == '/twitter/inactive/error') {
        app.expired = true; // Variable to activate "Resend Link Button"
        $scope.alert = 'alert alert-danger'; // Set class for message
        app.errorMsg = 'Account is not yet activated. Please check your e-mail for activation link.'; // If error, display custom message
    } else if ($window.location.pathname == '/twitter/unconfirmed/error') {
        $scope.alert = 'alert alert-danger'; // Set class for message
        app.errorMsg = 'Your twitter account is either inactive or does not have an e-mail address attached to it.'; // If error, display custom message
    } else {
        Auth.socialMedia($routeParams.token); // If no error, set the token
        $location.path('/'); // Redirect to home page
    }
});