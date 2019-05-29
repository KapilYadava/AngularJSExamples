var myapp= angular.module("MyApp", ["ngRoute", "firebase"]);


myapp.controller("loginController", function ($scope, $location, userInfoService) {
  //user object
    $scope.user= {
      name: null,
      password: null
    }
    $scope.isAuthenicated= "User yet not tried!";

    $scope.signUp= function () {
      $location.path("/signup");
    }
    $scope.signIn= function () {
        $scope.user.name= $scope.username;
        $scope.user.password= $scope.password;
        userInfoService.setUser($scope.user);
        if (!userInfoService.isUserValid($scope.user)) {
          $location.path("/login");
          $scope.isAuthenicated= "Wrong username and password, please try again!";
        }
        $location.path("/info");
    }
});

myapp.controller("userInfoController", function ($scope, userInfoService) {
        $scope.userData= userInfoService.getUser();
});

myapp.controller("findBankNameController", function ($scope, $http, $firebaseObject ) {

        $scope.findBank= function() {
          $http({method: 'GET',url: 'https://ifsc.razorpay.com/'+$scope.ifsc})
          .then(function successCallback(response) {
                $scope.response=response.data;
            }, function errorCallback(response) {
                $scope.response=response.data;
          });
        }

        $scope.insertData= function () {
          var ref= firebase.database().ref();
          var newPostRef = ref.child('users');
          newPostRef.push().set({
            username: $scope.name,
            email: $scope.email,
            password : $scope.password
          });
          $scope.name= null;
          $scope.email=null;
          $scope.password=null;
        }
});

myapp.service("userInfoService", function () {
  this.setUser= function (user) {
    this.user= user;
  }
  this.getUser= function (){
    return this.user;
  }
  this.isUserValid= function (user) {
      return false;
    }
});

myapp.config(function($routeProvider) {
    $routeProvider
    .when("/signup", {
        templateUrl : "signup.html"
    })
    .when("/login", {
      templateUrl: "login.html"
    })
    .when("/info", {
      templateUrl: "userinfo.html"

    })
    .otherwise({
      redirectTo: "/login"
    })
});
