$(document).ready(function() {
  
// START fullPage.js plugin
  $('#fullpage').fullpage({
    // Design
    verticalCentered: false,
    resize: false,
    anchors: ['home', 'maps', 'chronology', 'videos', 'education', 'contact', 'credits'],
    // sectionsColor: ['#8FB98B', '#DE564B', '#EAE1C0'],
    touchSensitivity: 5, //test this
    
    // Navigation //
    // menu: '#menu',
    slidesNavigation: true,
    navigation: true,
    navigationTooltips: ['Home', 'Maps', 'Chronology', 'Videos', 'Education', 'Contact', 'Credits'],
    

    // Scrolling //
    scrollOverflow: true,
    autoScrolling: true,
    continuousVertical: false,
    loopHorizontal: false,
    // scrollBar: true, //scrollbar make the pages snap more abruptly; Foundation off-canvas navbar doesn't work either.
    // responsive: 600
    // normalScrollElements: '#map-canvas-PowellSt, #map-canvas-Steveston' // swipe/scroll doesn't work over maps on macbook
  });
// END fullpage.js plugin

// Bootstrap menu
  $(".nav li").on("click", function() {
    $(".nav li").removeClass("active");
    $(this).addClass("active");
  });
  $(".navbar-brand").on("click", function() {
    $(".nav li").removeClass("active");
  });

// START Magnific Popup (video lightbox) plugin
  $('.video-link').magnificPopup({
    type:'iframe',
    iframe: {
      markup: '<div class="mfp-iframe-scaler">'+
                '<div class="mfp-close"></div>'+
                '<iframe class="mfp-iframe" frameborder="1" allowfullscreen></iframe>'+
                '<div class="mfp-title">Some caption</div>'+
              '</div>'
    },
  });
// END Magnific Popup


// // START Google Maps API

  function initialize() {

  // MAPTILER init START
    // var opts = {
    //     streetViewControl: false,
    //     center: new google.maps.LatLng(49.283113, -123.095757),
    //     zoom: 13
    // };
    // map = new google.maps.Map(document.getElementById("map"), opts);
    // map.setMapTypeId('satellite');
    // map.overlayMapTypes.insertAt(0, maptiler);


    var mapBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(49.27784668, -123.10978977),
      new google.maps.LatLng(49.2883785, -123.08172343)
    );
    var mapBounds2 = new google.maps.LatLngBounds(
      new google.maps.LatLng(49.282036, -123.098632),
      new google.maps.LatLng(49.284374, -123.091508)
    );
    var mapMinZoom = 13;
    var mapMaxZoom = 21;
    var opts = {
      streetViewControl: false,
      tilt: 0,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      zoom: 18,
      
      disableDefaultUI: true,
      mapTypeControl: false,
      panControl: true,
      panControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      scrollwheel: false,
      scaleControl: true,
      draggable: false,
      disableDoubleClickZoom: true

    }
    var map = new google.maps.Map(document.getElementById("map-canvas"), opts);
    
    // https://developers.google.com/maps/documentation/javascript/examples/maptype-image-overlay
    var imageMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var proj = map.getProjection();
          var z2 = Math.pow(2, zoom);
          var tileXSize = 256 / z2;
          var tileYSize = 256 / z2;
          var tileBounds = new google.maps.LatLngBounds(
            proj.fromPointToLatLng(new google.maps.Point(coord.x * tileXSize, (coord.y + 1) * tileYSize)),
            proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * tileXSize, coord.y * tileYSize))
          );
          if (!mapBounds.intersects(tileBounds) || zoom < mapMinZoom || zoom > mapMaxZoom) return null;
          return "{z}/{x}/{y}.png".replace('{z}',zoom).replace('{x}',coord.x).replace('{y}',coord.y);
        },
        tileSize: new google.maps.Size(256, 256),
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        name: 'Tiles'
    });

    map.overlayMapTypes.push(imageMapType);
    map.fitBounds(mapBounds2);
  // MAPTILER init END

    var centerPowellStreet = new google.maps.LatLng(49.2827812,-123.0958854); // Powell Street Center
    var centerSteveston = new google.maps.LatLng(49.125735, -123.178775);     // Steveston Center

    // Powell Street Map Settings
    var optionsPowellSt = {
      center: centerPowellStreet,
      zoom: 17,
      disableDefaultUI: true,
      mapTypeControl: false,
      panControl: true,
      panControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      scrollwheel: false,
      scaleControl: true,
      draggable: false,
      disableDoubleClickZoom: true,
    };

    // Steveston Map Settings
    var optionsSteveston = {
      zoom: 15, 
      center: centerSteveston,
      disableDefaultUI: true,
      mapTypeControl: false,
      panControl: true,
      panControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      scrollwheel: false,
      scaleControl: true,
      draggable: false,
      disableDoubleClickZoom: true
    };

    var mapPowellStreet = new google.maps.Map(document.getElementById('map-canvas-PowellSt'), optionsPowellSt);   // Powell Street Map
    var mapSteveston = new google.maps.Map(document.getElementById('map-canvas-Steveston'), optionsSteveston); // Steveston Map


    // Powell Street Marker Settings
    var marker477PowellSt_Pole754 = new google.maps.Marker({
      position: {lat: 49.2831059, lng: -123.0934385},
      map: map, //mapPowellStreet,
      title:"First Immigrants"
    });
    var marker457PowellSt_Pole554 = new google.maps.Marker({
      position: {lat: 49.2831113, lng: -123.0939076},
      map: map, //mapPowellStreet,
      title:"Lives of Women"
    });
    var marker369PowellSt_Pole753 = new google.maps.Marker({
      position: {lat: 49.2831381, lng: -123.0961},
      map: map, //mapPowellStreet,
      title:"Maikawa Brothers"
    });
    var marker357PowellSt_Pole553 = new google.maps.Marker({
      position: {lat: 49.2831441, lng: -123.0965021},
      map: map, //mapPowellStreet,
      title:"Masumi Mitsui"
    });        
    var marker314PowellSt_Pole153 = new google.maps.Marker({
      position: {lat: 49.283157, lng: -123.097358},
      map: map, //mapPowellStreet,
      title:"Internment"
    });
    var marker394PowellSt_Pole1053 = new google.maps.Marker({
      position: {lat: 49.2831287, lng: -123.0954779},
      map: map, //mapPowellStreet,
      title:"Tom Shoyama"
    });        
    var markerPowellGrounds_Pole254 = new google.maps.Marker({
      position: {lat: 49.283124, lng: -123.095049},
      map: map, //mapPowellStreet,
      title:"The Asahi"
    });
    var marker362AlexanderSt_Pole453 = new google.maps.Marker({
      position: {lat: 49.284014, lng: -123.09552},
      map: map, //mapPowellStreet,
      title:"Etsuji Moriii"
    });
    var marker487AlexanderSt_Pole254 = new google.maps.Marker({
      position: {lat: 49.283978, lng: -123.094065},
      map: map, //mapPowellStreet,
      title:"Japanese Language School"
    });
    var markerOppenheimerPark_Pole12 = new google.maps.Marker({
      position: {lat: 49.282795, lng: -123.093344},
      map: map, //mapPowellStreet,
      title:"Redress"
    });

    // START geolocation 
    // Marker for my location (http://stackoverflow.com/questions/9142833/show-my-location-on-google-maps-api-v3) - does this update in realtime on iPhone/iPad?
    var myloc = new google.maps.Marker({
      clickable: false,
      icon:
        new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
        new google.maps.Size(22,22),
        new google.maps.Point(0,18),
        new google.maps.Point(11,11)),
      shadow: null,
      zIndex: 999,
      map: mapPowellStreet
    });

    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
      var me = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      myloc.setPosition(me);
    }, function(error) {
        // ...
    });
    // END geolocation

  };

  google.maps.event.addDomListener(window, 'load', initialize);

function drop() {
  for (var i = 0; i < neighborhoods.length; i++) {
    setTimeout(function() {
      addMarker();
    }, i * 200);
  }
}


// END Google Maps API





});



