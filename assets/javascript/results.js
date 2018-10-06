// global variable declaration for API specific data
var map;
var googleLatLng;
var hotels = [];

// set variables from session storage
var addressInput = sessionStorage.getItem("addressInput");
var radiusMeters = sessionStorage.getItem("radiusMeters");
var entertainment = sessionStorage.getItem("entertainment");

$(document).ready(function() {
    console.log(radiusMeters);
    console.log("Results.html has loaded.");
    /* !!!! start Google API !!! */
    var googleURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressInput}&country=US&key=AIzaSyCkWLplfERYd7MKirTiRwl9rhCzsPDVN8Q`;
    console.log(googleURL);
    $.ajax({
        url: googleURL,
        method: "GET"
    }).then(function(response) {
        addLat = response.results[0].geometry.location.lat;
        addLng = response.results[0].geometry.location.lng;
        var locdata = [addLat, addLng];
        localStorage.setItem("locdata", JSON.stringify(locdata));

        /* !!!!!start travel API!!!! */
        //query for list of hotels
        /*var travelURL = `https://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=nG40G2MNyhpYFWNBKWFpW83hKIUnrkHO&latitude=${addLat}&longitude=${addLng}&radius=42&check_in=2018-12-15&check_out=2018-12-16`;
        $.ajax({
            url: travelURL,
            method: "GET"
        }).then(function(response){
            hotels = response.results;
            console.log("HOTELS:::");
            console.log(hotels);
            localStorage.setItem("hotels", JSON.stringify(hotels));
            console.log(window.location);
            window.location.href= "results.html";
        });*/
    /* !!!! Contintue Google Maps API !!!! */
    }).then(function() {
        console.log({lat: addLat, lng: addLng});
        initMap();
    });
});

// start of google maps api functions
function initMap() {
    console.log("Inside initMap function.");
    // latitude and longitude converted to a google map coordinate
    googleLatLng = new google.maps.LatLng(addLat, addLng);
    map = new google.maps.Map(document.getElementById("map"), {
        center: googleLatLng,
        zoom: 12,
        fullscreenControl: false,
        gestureHandling: "cooperative",
        noClear: true
    });
    const marker = new google.maps.Marker({
        position: googleLatLng, 
        map: map
    });
    $("#map").css("background-color", "red");
    console.log(radiusMeters);
    const request = {
        location: googleLatLng,
        radius: radiusMeters,
        // rankBy: google.maps.places.RankBy.DISTANCE, 
        /*Note that you cannot specify a custom bounds and/or radius if you specify RankBy.DISTANCE. When you specify RankBy.DISTANCE, one or more of keyword, name, or type is required.*/
        type: entertainment
    }
    const placesInfo = new google.maps.places.PlacesService(map);
    placesInfo.nearbySearch(request, callback);
}

function callback(result, status) {
    console.log("Inside callback function.");
    const googleStatus = google.maps.places.PlacesServiceStatus;
    if (status === googleStatus.OK) {
        console.log("The response contains a valid result.");
        for (i = 0; i < 3; i++) {
        console.log(result[i]);
        $(`#result${i}`).attr("value", result[i].place_id)
        console.log(result[i].name);
        let resultName = $("<h2>").text(result[i].name);
        let imgURL = result[i].photos[0].getUrl();
        console.log(imgURL);
        let resultImg = $("<img>").attr("src", imgURL);
        // const resultDescription = $("h2").text(result[i].name);
        $(`#result${i}`)
                    .append(resultName)
                    .append(resultImg)
                    // .append(resultDescription);
        }
    }
    else if (status === googleStatus.ERROR) {
        console.log("There was a problem contacting the Google servers.");
    }
    else if (status === googleStatus.INVALID_REQUEST) {
        console.log("This request was invalid.");
    }
    else if (status === googleStatus.OVER_QUERY_LIMIT) {
        console.log("The webpage has gone over its request quota.");
    }
    else if (status === googleStatus.NOT_FOUND) {
        console.log("The referenced location was not found in the Places database.");
    }
    else if (status === googleStatus.REQUEST_DENIED) {
        console.log("The webpage is not allowed to use the PlacesService.");
    }
    else if (status === googleStatus.UNKNOWN_ERROR) {
        console.log("The PlacesService request could not be processed due to a server error. The request may succeed if you try again.");
    }
    else if (status === googleStatus.ZERO_RESULTS) {
        console.log("No result was found for this request.");
    }
}

$(".card-panel").on("click", function() {
    console.log($(this)[0].attributes[2].value);
    const destination = $(this)[0].attributes[2].value;
    getDirections(destination);
});

function getDirections(destination) {
    console.log("Inside getDirections function.");
    const directionsRequest = new google.maps.DirectionsService();
    const directionsResults = new google.maps.DirectionsRenderer();
    directionsResults.setMap(map);
    console.log(googleLatLng);
    console.log(destination);
    const request = {
        origin: googleLatLng,
        destination: destination,
        travelMode: "DRIVING",
        // waypoints: DirectionsWaypoint,
        // optimizeWaypoints: false,
        provideRouteAlternatives: false
    }
    directionsRequest.route(request, function(result, status) {
        if(status === "OK"){
            console.log("Route found.");
            directionsResults.setDirections(result);
        }
        else if(status === "NOT_FOUND"){
            console.log("At least one of the locations specified in the request's origin, destination, or waypoints could not be geocoded.");
        }
        else if(status === "ZERO_RESULTS"){
            console.log("No route could be found between the origin and destination.");
        }
        else if(status === "MAX_WAYPOINTS_EXCEEDED"){
            console.log("Too many DirectionsWaypoint fields were provided in the DirectionsRequest.");
        }
        else if(status === "MAX_ROUTE_LENGTH_EXCEEDED"){
            console.log("Requested route is too long and cannot be processed. This error occurs when more complex directions are returned. Try reducing the number of waypoints, turns, or instructions.");
        }
        else if(status === "INVALID_REQUEST"){
            console.log("The provided DirectionsRequest was invalid. The most common causes of this error code are requests that are missing either an origin or destination, or a transit request that includes waypoints.");
        }
        else if(status === "OVER_QUERY_LIMIT"){
            console.log("Webpage has sent too many requests within the allowed time period.");
        }
        else if(status === "REQUEST_DENIED"){
            console.log("The webpage is not allowed to use the directions service.");
        }
        else if(status === "UNKNOWN_ERROR"){
            console.log("Directions request could not be processed due to a server error. The request may succeed if you try again.");
        }
    });
}