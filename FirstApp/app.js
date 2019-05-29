var app= angular.module("myapp", []);

app.controller("reviewController", function($scope){
  $scope.review= {
    star: 5,
    body: 'I am having it',
    author: 'Kapilyadava.isa@gmail.com'
  }
  $scope.addReview= function () {
    $scope.review.star= $scope.stars;
    $scope.review.body= $scope.body;
    $scope.review.author= $scope.email;
  }
});
