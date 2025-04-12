angular.module('bookstoreApp', [])
  .controller('BookController', function ($scope, $http) {
    $scope.books = [];
    $scope.newBook = {};

    $http.get('http://localhost:5000/api/books')
      .then(function (response) {
        $scope.books = response.data;
      });

    $scope.addBook = function () {
      $http.post('http://localhost:5000/api/books', $scope.newBook)
        .then(function (response) {
          $scope.books.push(response.data);
          $scope.newBook = {};
        });
    };

    $scope.deleteBook = function (id) {
      $http.delete(`http://localhost:5000/api/books/${id}`)
        .then(function () {
          $scope.books = $scope.books.filter(book => book._id !== id);
        });
    };
  });
