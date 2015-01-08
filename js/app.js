var app = angular.module('enHueco', ['ngRoute', 'ngCookies']);
var baseURL = 'http://192.168.168.102:8888/';
var baseAPI = baseURL + 'api/';

app.config(function ($routeProvider) {
    $routeProvider
        .when('/en hueco', {
            controller: 'ehCtrl',
            templateUrl: 'view/app_eh.html'
        })
        .when('/amigos', {
            controller: 'amigosCtrl',
            templateUrl: 'view/app_amigos.html'
        })
        .when('/mi cuenta', {
            controller: 'cuentaCtrl',
            templateUrl: 'view/app_cuenta.html'
        })
        .when('/login', {
            controller: 'loginCtrl',
            templateUrl: 'view/app_login.html'
        })
        .when('/salir', {
            controller: 'logoutCtrl',
            templateUrl: 'view/app_salir.html'
        })
        .when('/registro', {
            controller: 'registroCtrl',
            templateUrl: 'view/app_registro.html'
        })
        .otherwise({
            redirectTo: '/login'
        });
});

/*
 Controlador del navbar
 */
app.controller('navCtrl', function ($scope, $rootScope, $route, $location, $log, $cookies) {
    //$cookies.token = 'hola';
    if ($cookies.token == undefined || $cookies.token == '')
        $rootScope.token = '';
    else
        $rootScope.token = $cookies.token;

    $scope.isLoggedActions = function () {
        if ($rootScope.token === '') {
            return ['login', 'registro'];
        } else {
            return ['en hueco', 'amigos', 'mi cuenta', 'salir']
        }
    };

    $scope.actions = $scope.isLoggedActions();

    $scope.isActive = function (le) {
        return $location.path().indexOf(le) === 0;
    };

    $rootScope.$on('$routeChangeSuccess', function () {
        $scope.actions = $scope.isLoggedActions();
    });
});

/*
 Controlador de la aplicación
 */
app.controller('ehCtrl', function ($rootScope, $scope, $log, $route, $routeParams, $location, $http, $cookies, $cookieStore) {
    if ($rootScope.token === '') {
        $location.path('/login');
    }

    $scope.friends = [{
        name: 'Diego',
        lastName: 'Rodríguez',
        smallPictureURL: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p100x100/10846360_10152902407449313_4495160373544755770_n.jpg?oh=c9c6760ccaa317afa763b328c5d8e641&oe=55094D6B&__gda__=1425639102_cdce0995e8a428bd6b0755ef5825abe1',
        email: 'diego@email.com'
    }];

    $scope.getFriends = function () {
        $http.post(baseAPI + 'friends', {token: $rootScope.token})
            .success(function (data) {
                $scope.friends = data;
                //$log.log(data);
            });
    };

    //$scope.getFriends();

});

/*
 Controlador de la aplicación
 */
app.controller('amigosCtrl', function ($rootScope, $scope, $log, $route, $routeParams, $location, $http, $cookies, $cookieStore) {
    if ($rootScope.token === '') {
        $location.path('/login');
    }

    $scope.friends = [{
        name: 'Diego',
        lastName: 'Rodríguez',
        smallPictureURL: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p100x100/10846360_10152902407449313_4495160373544755770_n.jpg?oh=c9c6760ccaa317afa763b328c5d8e641&oe=55094D6B&__gda__=1425639102_cdce0995e8a428bd6b0755ef5825abe1',
        email: 'diego@email.com'
    }];

    $scope.getFriends = function () {
        $http.post(baseAPI + 'friends', {token: $rootScope.token})
            .success(function (data) {
                $scope.friends = data;
                //$log.log(data);
            });
    };

    $scope.getFriends();
});

/*
 Controlador de la aplicación
 */
app.controller('cuentaCtrl', function ($rootScope, $scope, $log, $route, $routeParams, $location, $http, $cookies, $cookieStore) {
    if ($rootScope.token === '') {
        $location.path('/login');
    }

    $scope.hours = ['7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM'];
    $scope.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

});

/*
 Controlador de la aplicación
 */
app.controller('loginCtrl', function ($rootScope, $scope, $log, $route, $routeParams, $location, $http, $cookies, $cookieStore) {
    if ($rootScope.token !== '') {
        $location.path('/en hueco');
    }

    $scope.formData = {};
    $scope.formData.username = "da.gomez11";
    $scope.formData.password = "hola123";

    $scope.login = function () {
        $http.post(baseAPI + 'user/login', {
            email: $scope.formData.username + '@uniandes.edu.co',
            password: $scope.formData.password
        })
            .success(function (data) {
                $rootScope.token = data.token;
                $cookies.token = $rootScope.token;
                $location.path('/en hueco');
            });
    };
});

/*
 Controlador de la aplicación
 */
app.controller('logoutCtrl', function ($rootScope, $scope, $log, $route, $routeParams, $location, $http, $cookies, $cookieStore, $timeout, $window) {
    $http.post(baseAPI + 'user/logout', {token: $rootScope.token})
        .success(function (data) {
            //$log.log(data);
        });
    $rootScope.token = '';
    $cookieStore.remove('token');
    $timeout(function() {
        $location.path('/login');
        //$window.location.href = "";
    }, 2000);
});

/*
 Controlador de la aplicación
 */
app.controller('registroCtrl', function ($rootScope, $scope, $log, $route, $routeParams, $location, $http, $cookies, $cookieStore) {
    $scope.formData = {};
    $scope.formData.username = "da.gomez11";
    $scope.formData.password = "hola123";

    $scope.register = function () {
        $log.log($scope);
        $http.post(baseAPI + 'user/register', {
            email: $scope.formData.username + '@uniandes.edu.co',
            password: $scope.formData.password,
            password_confirmation: $scope.formData.password_confirmation
        })
            .success(function (data) {
                $rootScope.token = data.token;
                $cookies.token = $rootScope.token;
                $location.path('/en hueco');
            });
    };
});

/*
 Controlador de la aplicación
 */
app.controller('appCtrl', function ($rootScope, $scope, $log, $route, $routeParams, $location, $http, $cookies, $cookieStore) {
    $scope.formData = {};
    $scope.formData.username = "da.gomez11";
    $scope.formData.password = "hola123";
    $scope.friends = [{
        name: 'Diego',
        lastName: 'Rodríguez',
        smallPictureURL: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p100x100/10846360_10152902407449313_4495160373544755770_n.jpg?oh=c9c6760ccaa317afa763b328c5d8e641&oe=55094D6B&__gda__=1425639102_cdce0995e8a428bd6b0755ef5825abe1',
        email: 'diego@email.com'
    }];

    $scope.login = function () {
        $http.post(baseAPI + 'user/login', {
            email: $scope.formData.username + '@uniandes.edu.co',
            password: $scope.formData.password
        })
            .success(function (data) {
                $rootScope.token = data.token;
                $cookies.token = $rootScope.token;
                $location.path('/app/en hueco');
            });
    };

    $scope.register = function () {
        $log.log($scope);
        $http.post(baseAPI + 'user/register', {
            email: $scope.formData.username + '@uniandes.edu.co',
            password: $scope.formData.password,
            password_confirmation: $scope.formData.password_confirmation
        })
            .success(function (data) {
                $rootScope.token = data.token;
                $cookies.token = $rootScope.token;
                $location.path('/app/en hueco');
            });
    };

    $scope.getFriends = function () {
        $http.post(baseAPI + 'friends', {token: $rootScope.token})
            .success(function (data) {
                $scope.friends = data;
                //$log.log(data);
            });
    };

    $scope.isSub = function (page, bool) {
        return $routeParams.action === page && (bool ? $scope.isLogged() : !$scope.isLogged());
    };


    $scope.isLogged = function () {
        return $rootScope.token !== '';
    };

    $scope.action = $routeParams.action;

    switch ($routeParams.action) {
        case 'salir':
            $http.post(baseAPI + 'user/logout', {token: $rootScope.token})
                .success(function (data) {
                    //$log.log(data);
                });
            $rootScope.token = '';
            $cookieStore.remove('token');
            $location.path('/');
            break;
        case 'registro':

            break;
        case 'en hueco':

            break;
        case 'amigos':
            //$scope.getFriends();
            break;
        case undefined:
            if (!$scope.isLogged()) {
                $location.path('/app/login');
            } else {
                $location.path('/app/en hueco');
            }
            break;
    }
});