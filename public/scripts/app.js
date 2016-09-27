// Render background image on client
// Render poem on body
// Create back-end to handle posts and gets request for backend
// Create client-side to-do list and lets users add/remove

// DEF: asynchronous calls get run even tho data is not available. a promise is returned until it can be filled w/ data
angular.module('momentumArtApp', [])
    .controller('backgroundImage', ['$scope', 'getBackgroundImage', function($scope, getBackgroundImage) {
        $scope.time = updatedClock();
        $scope.userName = 'testUser';
        getBackgroundImage.getImage().then(function successCallbackFn(data) {
            var randomNumber = getRandomNumber(0, 5)
            console.log(randomNumber)
            console.log('this is the data that is returned', data)
            $scope.backgroundImageUrl = data[randomNumber];

        }, function errorCallbackFn(response) {
            console.log(response)
        })
    }])

// Returns link by resolving promise before passing in
.factory('getBackgroundImage', ['$http', function($http) {
    var user = 'testUser';
    var getBackgroundImage = {
        getImage: function() {
            var promise = $http.get(user + '/paintingToDisplay').then(function(response) {
                return response.data
            });
            return promise
        }

    }
    return getBackgroundImage
}]);

// Still want?
// function getQuote() {
//     var headers = { 
//      'Access-Control-Allow-Origin': '*/*',
//      // 'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
//      'Authorization': 'Token token=10a53e0df64459197af44941ade67c80'
//     }

//     var headers =
//         $http({
//             method: 'GET',
//             url: 'https://favqs.com/api/quotes',
//             headers: headers
//         })
//         .then(function(response) {
//                 var x = response.data;
//                 $log.info(x)
//             },
//             function(error) {
//                 $log.info(error)
//             })
// }

var updatedClock = function() {
    // setInterval(updatedClock, 1000);
    var currentTime = new Date();
    // console.log(new Date());
    return currentTime.getHours() + ':' + currentTime.getMinutes();
}

var getRandomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
