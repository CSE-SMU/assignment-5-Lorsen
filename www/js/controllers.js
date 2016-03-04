angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

})

.factory('BeerData', function () { // This factory stores information as a singleton so multiple controllers can access it
    return {
        data: {}
    };
})

.controller('SearchCtrl', function ($scope, $state, $http, BeerData) { // use dependency injection to get the BeerData factory
    $scope.form = {}; // used to store your form data

    console.log("made it to SearchCtrl");

    var searchTerms = {}

    if ($scope.form.name) {
        searchTerms.name = $scope.form.name;
    }
    if ($scope.form.year) {
        searchTerms.year = $scope.form.year;
    }
    if ($scope.form.ibu) {
        searchTerms.ibu = $scope.form.ibu;
    }
    if ($scope.form.isDark) {
        searchTerms.isDark = $scope.form.isDark ? 'Y' : 'N';
    }
    if ($scope.form.isOrganic) {
        searchTerms.isOrganic = $scope.form.isOrganic ? 'Y' : 'N';
    }

    $scope.search = function () { // called when the search button is clicked
        $http({
            method: 'GET',
            url: 'https://salty-taiga-88147.herokuapp.com/beers', // the link to my proxy
            params: { // sets the GET params
                searchTerms
            }
        }).then(function successCallback(response) {
            BeerData.data = response.data; // save the response data in the factory
            $state.go('app.beers'); // go to the beer results state
        });
    }
})

.controller('BeersCtrl', function ($scope, BeerData) {
    console.log(BeerData.data); // test to make sure that the data got passed through
    console.log("Made it to Beers Ctrl");
    
    
    if (BeerData.data.totalResults>50 ){
    BeerData.data.totalResults = 50;
                        }                       // this should be updated to contain the beer data
                                                    // this should be updated to contain the beer data
    $scope.beerlist = [];
  for (var i = 0; i<=BeerData.data.totalResults - 1; i++) {
    if(!BeerData.data.data[i].labels)
    {
      BeerData.data.data[i].labels= "null";
      console.log("no picture");
    }
        $scope.playlists.push({title:BeerData.data.data[i].nameDisplay, image:BeerData.data.data[i].labels,  id:i})
         };  
         console.log (i);

    $scope.getInfo = function(item) {
    beerDetails.data = item;
    $state.go('app.details');
  }
    
})


.controller('BeerCtrl', function ($scope, $stateParams, BeerData) { // use dependency injection to get the BeerData factory
    console.log($stateParams.id); // test to make sure the id gets passed through the URL

    // make another http request to get the beer or...
    // loop through BeerData to find the beer with the same id
});
