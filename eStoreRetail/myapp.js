var myapp= angular.module("MyApp", ["ngRoute", "firebase", "valid-number"]);

myapp.controller("storeLoginController", function ($scope, $location, userInfoService) {

    $scope.signUp= function () {
      $location.path("/signup");
    }
    $scope.addItems= function () {
      $location.path("/addItem");
    }

    $scope.signIn= function () {
      firebase.auth().signInWithEmailAndPassword($scope.username, $scope.password)
      .then(function (user) {
          if (user) {
          userInfoService.setUser(user);
          $location.path("/info");
          $scope.$apply();
          } else {
            $scope.errorMessage = 'User is not logged in yet';
            $scope.$apply();
          }
        })
      .catch(function(error) {
          $scope.errorCode = error.code;
          $scope.errorMessage = error.message;
          $scope.$apply();
        });
    }

});

myapp.controller("userInfoController", function ($scope, userInfoService) {
        $scope.userData= userInfoService.getUser();
});

myapp.controller("signUpController", function ($scope, $http, $firebaseObject ) {

        $scope.insertData= function () {
          var ref= firebase.database().ref();
          var newPostRef = ref.child('users');
          newPostRef.push().set({
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            phone: $scope.phone,
            address: $scope.address,
            email: $scope.email,
            password : $scope.password

          });
          $scope.firstname= null;
          $scope.email=null;
          $scope.password=null;
          $scope.address= null;
          $scope.phone= null;
          $scope.lastname= null;
      }
});

myapp.controller("addItemController", function ($scope, $http, $firebaseObject ) {

   $scope.categories= ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

    $scope.filterValue = function($event){
      if(isNaN(String.fromCharCode($event.keyCode))){
          $event.preventDefault();
        }
    };

        var returnArr = [];
        var ref = firebase.database().ref('items');
        ref.once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            returnArr.push(childSnapshot.val());
          });
          $scope.itemList= returnArr;
          $scope.$apply();
        });

        $scope.addItem= function () {

          var ref= firebase.database().ref();
          var newItem = ref.child('items');
          newItem.push().set({
            name: $scope.name,
            quantity: $scope.quantity,
            price: $scope.price,
            discount: $scope.discount,
            category: $scope.category
          });
          $scope.name= null;
          $scope.quantity=null;
          $scope.price=null;
          $scope.category=null;
          $scope.discount=null;

      var list= [];
      var recentItems = firebase.database().ref('items');
        recentItems.on('child_added', function(data) {
          //alert('helllo');
          list.push(data);
          $scope.list= list;
          $scope.$apply();
        });

      }

});

myapp.service("userInfoService", function () {
  this.setUser= function (user) {
    this.user= user;
  }
  this.getUser= function (){
    return this.user;
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
    .when("/addItem", {
      templateUrl: "add_item.html"
    })
    .otherwise({
      redirectTo: "/login"
    })
});
