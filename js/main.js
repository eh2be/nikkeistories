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


// START Google Maps API
  function initialize() {

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
    var marker477PowellSt = new google.maps.Marker({
      position: {lat: 49.2831059, lng: -123.0934385},
      map: mapPowellStreet,
      title:"First Immigrants"
    });
    var marker457PowellSt = new google.maps.Marker({
      position: {lat: 49.2831114, lng: -123.0939237},
      map: mapPowellStreet,
      title:"Lives of Women"
    });
    var marker369PowellSt = new google.maps.Marker({
      position: {lat: 49.2831381, lng: -123.0961},
      map: mapPowellStreet,
      title:"Maikawa Family"
    });
    var marker310PowellSt = new google.maps.Marker({
      position: {lat: 49.2831582, lng: -123.0974325},
      map: mapPowellStreet,
      title:"Internment"
    });
    var marker324PowellSt = new google.maps.Marker({
      position: {lat: 49.2831542, lng: -123.0971718},
      map: mapPowellStreet,
      title:"Masajiro Miyazaki"
    });
    var marker382PowellSt = new google.maps.Marker({
      position: {lat: 49.2830166, lng: -123.0958526},
      map: mapPowellStreet,
      title:"Etsuji Moriii"
    });
    var marker394PowellSt = new google.maps.Marker({
      position: {lat: 49.2831294, lng: -123.0955259},
      map: mapPowellStreet,
      title:"Tom Shoyama"
    });        
    var marker213ECordovaSt = new google.maps.Marker({
      position: {lat: 49.2822899, lng: -123.0997395},
      map: mapPowellStreet,
      title:"Soldier Stories"
    });        
    var marker487AlexanderSt = new google.maps.Marker({
      position: {lat: 49.2840703, lng: -123.0937238},
      map: mapPowellStreet,
      title:"Japanese Language School"
    });
    var markerOppenheimerPark = new google.maps.Marker({
      position: {lat: 49.282708, lng: -123.094319},
      map: mapPowellStreet,
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



