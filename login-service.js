angular.module('loginModule', []).
factory('loginService', function ($rootScope) {
    // Example
    // var loginService = {};

    // loginService.login = function () {
    //     $rootScope.$broadcast('login');
    // };

    // loginService.logout = function () {
    //     $rootScope.$broadcast('logout');
    // }
    // return loginService;
}).
directive('loginCenter', function (loginService) {
    return {
        restrict: 'E',
        scope: {
            login: '&',
            logout: '&',
            signup: '&',
            user: '=user'
        },
        templateUrl: 'modules/login-service/partials/login-template.html',
        controller: function ($scope, $attrs, loginService) {
            //set this variable to either a cookie or a request
            $scope.loggedIn = false;
            $scope.templates = [
            {
                templateUrl: 'modules/login-service/partials/not-logged-in.html',
                title: 'Not Logged In'
            },
            {
                templateUrl: 'modules/login-service/partials/logged-in.html',
                title: 'Logged In'
            }];
            $scope.$watch('loggedIn', function(newValue, oldValue){
                if(!newValue){
                    $scope.currentTemplate = $scope.templates[0].templateUrl;
                }
                else{
                    $scope.currentTemplate = $scope.templates[1].templateUrl;
                }
            });

            /* Event BroadCasts */
            // Handles the server response
            $scope.$on('login', function () {
                $scope.loggedIn = true;
            });
            $scope.$on('logout', function () {
                $scope.loggedIn = false;
            });
            
            $scope.submitLogin = function(){

                if($scope.login({form: this.formLogin})){
                    console.log('login success');
                }
                else{
                    console.log('login fail');
                }
            }

            $scope.submitLogout = function(){
                if($scope.logout()){
                    console.log('logout success');
                }
                else{
                    console.log('logout fail');
                }
            }

            /* SignUp Form */
            $scope.resetSignUp = function(){                
                this.formSignUp = {};
                this.formSignUp.email = '';
            }

            $scope.submitSignUp = function(){
                if($scope.signup({form: this.formSignUp})){
                    $scope.resetSignUp();
                    this.signupModal = false;
                }
                else{
                    alert('There was an error signing up. Please contact an administrator.')
                }
            }
            
            $scope.cancelSignUp = function(){
                this.formSignUp = {};
                this.formSignUp.email = '';
                this.signupModal = false;
            }
        }
    };
}).
directive('passidate', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        // scope: {
        //     dupDel: '&'
        // }
        link: function (scope, element, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(newValue, oldValue){
                if(scope.$eval(attrs.passidate) == newValue){
                    ctrl.$setValidity('passidate', true);
                }
                else{
                    ctrl.$setValidity('passidate', false);
                }
            }, true)
        }
    }
});