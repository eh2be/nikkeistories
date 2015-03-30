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
    // navigationTooltips: ['Home', 'Maps', 'Chronology', 'Videos', 'Education', 'Contact', 'Credits'],
    navigationPosition: 'left',
    slidesNavPosition: 'top',

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
// Powell Street MAP
// var centerPowellStreet = new google.maps.LatLng(49.2827812,-123.0958854); // Powell Street Center
 
    var optionsPowellSt = {
      streetViewControl: false,
      tilt: 0,
      // mapTypeId: google.maps.MapTypeId.HYBRID,
      zoom: 18,

      // center: centerPowellStreet,
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

    var map = new google.maps.Map(document.getElementById("map-canvas"), optionsPowellSt);

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

    var centerSteveston = new google.maps.LatLng(49.125735, -123.178775);     // Steveston Center

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

    // var mapPowellStreet = new google.maps.Map(document.getElementById('map-canvas-PowellSt'), optionsPowellSt);   // Powell Street Map
    var mapSteveston = new google.maps.Map(document.getElementById('map-canvas-Steveston'), optionsSteveston); // Steveston Map


    // Powell Street Marker Settings
    var marker477PowellSt_Pole754 = new google.maps.Marker({
      position: {lat: 49.283170, lng: -123.093410},
      map: map, //mapPowellStreet,
      title: "First Immigrants",
      icon: "/assets/1_FirstImmigrants_32.png"
    });
    var marker457PowellSt_Pole554 = new google.maps.Marker({
      position: {lat: 49.2831113, lng: -123.0939076},
      map: map, //mapPowellStreet,
      title: "Lives of Women",
      icon: "/assets/2_Women_32.png"
    });
    var marker369PowellSt_Pole753 = new google.maps.Marker({
      position: {lat: 49.2831381, lng: -123.0961},
      map: map, //mapPowellStreet,
      title: "Maikawa Brothers",
      icon: "/assets/3_Maikawa_32.png"
    });
    var marker357PowellSt_Pole553 = new google.maps.Marker({
      position: {lat: 49.2831441, lng: -123.0965021},
      map: map, //mapPowellStreet,
      title: "Masumi Mitsui",
      icon: "/assets/4_Mitsui_32.png"
    });        
    var marker314PowellSt_Pole153 = new google.maps.Marker({
      position: {lat: 49.283215, lng: -123.097358},
      map: map, //mapPowellStreet,
      title: "Internment",
      icon: "/assets/5_Internment_32.png"
    });
    var marker394PowellSt_Pole1053 = new google.maps.Marker({
      position: {lat: 49.2831287, lng: -123.0954779},
      map: map, //mapPowellStreet,
      title: "Tom Shoyama",
      icon: "/assets/6_Shoyama_32.png"
    });        
    var markerPowellGrounds_Pole254 = new google.maps.Marker({
      position: {lat: 49.283124, lng: -123.095049},
      map: map, //mapPowellStreet,
      title: "The Asahi",
      icon: "/assets/7_Asahi_32.png"
    });
    var marker362AlexanderSt_Pole453 = new google.maps.Marker({
      position: {lat: 49.284014, lng: -123.09552},
      map: map, //mapPowellStreet,
      title: "Etsuji Morii",
      icon: "/assets/8_Morii_32.png"
    });
    var marker487AlexanderSt_Pole254 = new google.maps.Marker({
      position: {lat: 49.283978, lng: -123.094065},
      map: map, //mapPowellStreet,
      title: "Japanese Language School",
      icon: "/assets/9_JLS_32.png"
    });
    var markerOppenheimerPark_Pole12 = new google.maps.Marker({
      position: {lat: 49.282795, lng: -123.093344},
      map: map, //mapPowellStreet,
      title: "Redress",
      icon: "/assets/10_Redress_32.png"
    });

//    INFOWINDOW START

  //   // var contentString1 = '<a href="http://vimeo.com/32071937" class="video-link" style="outline:none"><div class="ns-th-video"><img src="/assets/ns-thumb-01.jpg"><h2 style="color:white;">01</h2></div></a>';
  //   var contentString1 = '<a href="http://vimeo.com/32071937" class="video-link" >' +
  //                             '<img src="/assets/1_FirstImmigrants_150.jpg">' +
  //                         '</a>';
  //   var contentString2 = '<img src="/assets/2_Women_150.jpg">';
  //   var contentString3 = '<img src="/assets/3_Maikawa_150.jpg">';
  //   var contentString4 = 'MASUMI MITSUI';
  //   var contentString5 = 'INTERNMENT';
  //   var contentString6 = 'TOM SHOYAMA';
  //   var contentString7 = 'THE ASAHI';
  //   var contentString8 = 'ETSUJI MORII';
  //   var contentString9 = 'JAPANESE LANGUAGE SCHOOL';
  //   var contentString10 = 'REDRESS';

  //   var infowindow1 = new google.maps.InfoWindow({
  //     content: contentString1
  //   });
  //   var infowindow2 = new google.maps.InfoWindow({
  //     content: contentString2
  //   });
  //   var infowindow3 = new google.maps.InfoWindow({
  //     content: contentString3
  //   });
  //   var infowindow4 = new google.maps.InfoWindow({
  //     content: contentString4
  //   });
  //   var infowindow5 = new google.maps.InfoWindow({
  //     content: contentString5
  //   });
  //   var infowindow6 = new google.maps.InfoWindow({
  //     content: contentString6
  //   });
  //   var infowindow7 = new google.maps.InfoWindow({
  //     content: contentString7
  //   });
  //   var infowindow8 = new google.maps.InfoWindow({
  //     content: contentString8
  //   });    
  //   var infowindow9 = new google.maps.InfoWindow({
  //     content: contentString9
  //   });
  //   var infowindow10 = new google.maps.InfoWindow({
  //     content: contentString10
  //   });

  //   google.maps.event.addListener(marker477PowellSt_Pole754, 'click', function() {
  //     infowindow1.open(map,this);
  //   });
  //   // google.maps.event.addListener(marker477PowellSt_Pole754, 'mouseout', function() {
  //   //   setTimeout(function() {
  //   //     infowindow1.close(map, this);
  //   //   }, 2000);
  //   // });
  //   google.maps.event.addListener(marker457PowellSt_Pole554, 'click', function() {
  //     infowindow2.open(map,this);
  //   });

  //   google.maps.event.addListener(infowindow2, 'click', function() {
  //     magnificPopup.open({
  //       items: {
  //         src: "http://vimeo.com/32071937"
  //       },
  //       type: 'iframe'
  // // You may add options here, they're exactly the same as for $.fn.magnificPopup call
  // // Note that some settings that rely on click event (like disableOn or midClick) will not work here
  //     }, 0);
  //   });



  //   google.maps.event.addListener(marker369PowellSt_Pole753, 'click', function() {
  //     infowindow3.open(map,this);
  //   });
  //   google.maps.event.addListener(marker357PowellSt_Pole553, 'click', function() {
  //     infowindow4.open(map,this);
  //   });

    //INFOWINDOW END

// START Infobox (THIS WORKS KINDA)
 var boxText = document.createElement("div");
        boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
        boxText.innerHTML = '<button>HELLO</button><a href="http://vimeo.com/32071937">'+
              '<img src="/assets/ns-thumb-01.jpg">'+
          '</a>';
    
  var myOptions = {
     content: boxText
    ,disableAutoPan: false
    ,maxWidth: 0
    ,pixelOffset: new google.maps.Size(-140, 0)
    ,zIndex: null
    ,boxStyle: { 
      background: "url('tipbox.gif') no-repeat"
      ,opacity: 0.75
      ,width: "280px"
     }
    ,closeBoxMargin: "10px 2px 2px 2px"
    ,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
    ,infoBoxClearance: new google.maps.Size(1, 1)
    ,isHidden: false
    ,pane: "floatPane"
    ,enableEventPropagation: false
  };

  var ib = new InfoBox(myOptions);
  
  google.maps.event.addListener(marker477PowellSt_Pole754, 'click', function() {
        ib.open(map, this);
        map.panTo(this);
    });

    // var ib;   

    // ib = new InfoBox({
    //      content: document.getElementById("infobox"),
    //      disableAutoPan: false,
    //      maxWidth: 150,
    //      pixelOffset: new google.maps.Size(-140, 0),
    //      zIndex: 1000,
    //      boxStyle: {
    //         background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
    //         opacity: 0.75,
    //         width: "280px"
    //     },
    //     closeBoxMargin: "12px 4px 2px 2px",
    //     closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
    //     infoBoxClearance: new google.maps.Size(1, 1)
    // });
    
    // google.maps.event.addListener(marker477PowellSt_Pole754, 'click', function() {
    //     ib.open(map, this);
    //     map.panTo(this);
    // });



window.google.maps.event.addListener(ib, "domready", function () {
    $('.open-popup').on('click', function () {
        // Open magnificPopup through API
        // See http://dimsemenov.com/plugins/magnific-popup/documentation.html#inline_type
        $.magnificPopup.open({
            items: {
                src: $('<div class="video-link">Dynamically created element</div>'), // Dynamically created element
                type: 'inline'
            }
        });
    });
});
// END Infobox

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
      map: map
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



