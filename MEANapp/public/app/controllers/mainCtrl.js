angular.module('mainController', ['authServices'])

    .controller('mainCtrl', function(Auth, $location){
        var app = this; // so we can access outside of scope

        this.doLogin = function(loginData) { //when the register button is pressed controller
            app.loading = true;
            app.errorMsg = false;

            Auth.login(app.loginData).then(function(data){
                if(data.data.success){
                    app.loading = false;
                    app.successMsg = data.data.message;
                    $location.path('/about');



                } else {
                    app.loading = false;
                    app.errorMsg = data.data.message;


                }
            });
        };
    });


