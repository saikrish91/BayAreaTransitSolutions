      var autocomplete1, autocomplete2;
      var infowindow;
      var marker;
      var service;
	  var map;
      function initAutocomplete() {
			 map = new google.maps.Map(document.getElementById('jmap'), {
    center: {lat: 37.329732, lng:-121.901782},
    zoom: 15
  });
  
$.ajax({
    url: "bike.php" ,
    type: 'GET',
	dataType:'json',
    success: function (data) {
        $(data.stationBeanList).each(function(index,value)
		{
			var locationMarker = new google.maps.Marker(
			{
		  		position: {lat: value.latitude, lng: value.longitude},
		  		map: map,
				icon:"http://maps.google.com/mapfiles/ms/icons/cycling.png",
			  	title: ' '+value.stationName
			});
			var infowindow = new google.maps.InfoWindow(
			{
    			content: '<b><center>'+value.stationName+'</b></center><br>'+'Available Bikes: '+value.availableBikes+'<br>'+'Available Docs: '+value.availableDocks+' out of '+value.totalDocks
  			});
			locationMarker.addListener('click', function() {
    infowindow.open(map, locationMarker);
  });
		});
    },
    error: function(e){
        alert('Error: '+ e.message);
    }  
});
        autocomplete1 = new google.maps.places.Autocomplete((document.getElementById('from')),{types: ['geocode']});
        autocomplete2 = new google.maps.places.Autocomplete((document.getElementById('to')),{types: ['geocode']});

        autocomplete1.addListener('place_changed');
        autocomplete2.addListener('place_changed');
        }

      var myOptions, mapObject;
      var directionsDisplay;
      var directionsService ;
      function calculateRoute(from, to) {
        myOptions = {
          zoom: 10,
          center: new google.maps.LatLng(37.77, -122.447),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        // Draw the map
        mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
        directionsDisplay = new google.maps.DirectionsRenderer;
        directionsService = new google.maps.DirectionsService;
        var directionsRequest = {
          origin: from,
          destination: to,
          travelMode: google.maps.DirectionsTravelMode.TRANSIT,
          unitSystem: google.maps.UnitSystem.METRIC
        };
        directionsDisplay.setMap(mapObject);
        directionsDisplay.setPanel(document.getElementById('textDirection'));
        directionsService.route(
          directionsRequest,
          function(response, status)
          {
            if (status == google.maps.DirectionsStatus.OK)
            {
              directionsDisplay.setDirections(response);
              
            }
            else
              $("#error").append("Unable to retrieve your route<br />");
          }
        );
      }
      
      $(document).ready(function() {
        // If the browser supports the Geolocation API
        if (typeof navigator.geolocation == "undefined") {
          $("#error").text("Your browser doesn't support the Geolocation API");
          return;
        }

        $("#from-link, #to-link").click(function(event) {
          event.preventDefault();
          var addressId = this.id.substring(0, this.id.indexOf("-"));

          navigator.geolocation.getCurrentPosition(function(position) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
              "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
              if (status == google.maps.GeocoderStatus.OK)
                $("#" + addressId).val(results[0].formatted_address);
              else
                $("#error").append("Unable to retrieve your address<br />");
            });
          },
          function(positionError){
            $("#error").append("Error: " + positionError.message + "<br />");
          },
          {
            enableHighAccuracy: true,
            timeout: 10 * 1000 // 10 seconds
          });
        });

        $("#calculate-route").submit(function(event) {
          event.preventDefault();
          calculateRoute($("#from").val(), $("#to").val());
          insta();
        });

        $('#checkbox').click(function(){
          if (this.checked) {
            nearByPlaces($("#from").val());
            }
          });
        });
        
        function unset(){
        directionsDisplay.setMap(null);
        directionsDisplay.setPanel(null);
        document.getElementById("instafeed").innerHTML= "";
      }
      
         function insta(){
          var s1 = document.getElementById("to").value;
          var s2 = s1.split(",");
          var s3 = s2[0].replace(/\s/g, '');
          var feed = new Instafeed({
              get: "tagged",
              tagName: s3,
              limit: "12",
              clientId: "22176a52956c415699a64df994efb3e9"
            });
            feed.run();
          }
