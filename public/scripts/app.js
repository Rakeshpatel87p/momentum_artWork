// Make API calls for background image, poem
// Render background image on client
// Render poem on body
// Create back-end to handle posts and gets request for backend
// Create client-side to-do list and lets users add/remove

angular.module('momentumArtApp', [])
    .controller('backgroundImage', ['$scope', '$http', '$log', function($scope, $http, $log) {
        $scope.time = updatedClock();
        // $scope.getBackgroundImage = getBackgroundImage();

        // THIS IS WORKING BUT GETTING CROSS_ORIGIN PROB w/ getImage FUNCTION
        // function getBackgroundImage() {
        //     // var params = {
        //     //     'key': '3367371-c4da2ff0f6b2449e818db68b5',
        //     //     'q': 'yellow flowers',
        //     //     'image_type': 'photo',
        //     //     // special permission - applied
        //     //     // 'response_group': 'high_resolution'
        //     // }
        //     var params = {
        //         'client_id': 'cd7051715d376f899232',
        //         'client_secret': 'de9378d3d12c2cbfb24221e8b96d212c',
        //     }

        //     $http({
        //             method: 'POST',
        //             url: 'https://api.artsy.net/api/tokens/xapp_token',
        //             params: params
        //         })
        //         .then(function(response) {
        //                 // $scope.getBackgroundImage = response.data.hits[0].webformatURL + ;
        //                 var authorization = response.data.token
        //                 console.log('authorization1-------', authorization);
        //                 getImage(authorization);
        //                 $log.info(response);
        //             },
        //             function(error) {
        //                 $log.info(error);
        //             })

        // }

        // var getImage = function(authorization) {
        //     console.log('authorization in getImage-------', authorization);
        //     var params = {
        //     	'Accept': 'application/vnd.artsy-v2+json',
        //     	'X-Xapp-Token': authorization
        //     }
        //     $http({
        //             method: 'GET',
        //             url: 'https://api.artsy.net/api/artists/andy-warhol',
        //             headers: params
        //         })
        //         .then(function(response) {
        //                 // $scope.getBackgroundImage = response.data.hits[0].webformatURL + ;
        //                 $log.info(response);
        //             },
        //             function(error) {
        //                 $log.info(error);
        //             })

        // }


    }]);

var updatedClock = function() {
    // setInterval(updatedClock, 1000);
    var currentTime = new Date();
    // console.log(new Date());
    return currentTime.getHours() + ':' + currentTime.getMinutes();
}

// var getQuote = function() {
//     $http({
//         method: 'GET',
//         url: 'https://favqs.com/api/qotd'
//     })

//     .then(function(response) {
//         console.log(response)
//     })
// }


// https://pixabay.com/api/?key=3367371-c4da2ff0f6b2449e818db68b5&q=yellow+flowers&image_type=photo
