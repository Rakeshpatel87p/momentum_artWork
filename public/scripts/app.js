// Make API calls for background image, poem
// Render background image on client
// Render poem on body
// Create back-end to handle posts and gets request for backend
// Create client-side to-do list and lets users add/remove

angular.module('momentumArtApp', [])
    .controller('backgroundImage', ['$scope', '$http', function($scope, $http) {
        var d = new Date();
        console.log(new Date());
        $scope.time = d.getHours() + ':' + d.getMinutes();
        $scope.date = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
        $scope.response = getBackgroundImage();

        var getBackgroundImage = function() {
            var params = {
                'key': '3367371-c4da2ff0f6b2449e818db68b5',
                'q': 'yellow flowers',
                'image_type': 'photo'
            }

            $http({
                    url: 'https://pixabay.com/api',
                    method: 'GET',
                    params: params
                })
                .then(function(response) {
                    console.log(response);
                }, function(error, image) {
                    if (error) {
                        console.log(error)
                    }
                    console.log(image);
                    return image;
                })

        }

        // getBackgroundImage();
        // getQuote();

        // var getBackgroundImage = function() {
        //             var params = {
        //                 'API': '3367371-c4da2ff0f6b2449e818db68b5',
        //                 'q': 'yellow flowers',
        //                 'image_type': 'photo'
        //             }
        //             $http({
        //                 method: 'GET',
        //                 url: 'https://pixabay.com/api',
        //                 params: params
        //             })

        //             .then(function(response) {
        //                     $scope.response = response;
        //                 }),
        //                 // Handles errors?
        //                 function(data, status, headers, config) {
        //                     console.log('Failure');
        //                     // called when an error occurs or
        //                     // the server returns data with an error status
        //                 };
        //         };

        // var getQuote = function() {
        //     $http({
        //         method: 'GET',
        //         url: 'https://favqs.com/api/qotd'
        //     })

        //     .then(function(response) {
        //         console.log(response)
        //     })
        // }
    }]);

//https://pixabay.com/api/?key=3367371-c4da2ff0f6b2449e818db68b5&q=yellow+flowers&image_type=photo
