var mainApp= angular.module("mainApp", []);

mainApp.controller("studentController", function ($scope) {
  $scope.student= {
    firstName: "Kapil",
    lastName: "Kumar",
    fees: 500,
    subjects:[{name: 'physics' , marks:70}, {name: 'chemistry' , marks:90}, {name: 'math' , marks:80}],
    fullName: function () {
      var obj;
      obj=$scope.student;
      return obj.firstName+" "+obj.lastName;
    }
  };
});
