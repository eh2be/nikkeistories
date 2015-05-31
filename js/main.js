$(document).ready(function() {
  
// START Slidebars
    // $.slidebars();
// END Slidebars

// START fullPage.js plugin
  $('#fullpage').fullpage({
    // Design
    verticalCentered: false,
    resize: false,
    anchors: ['home', 'videos', 'maps', 'chronology', 'contact', 'credits'],
    // sectionsColor: ['#8FB98B', '#DE564B', '#EAE1C0'],
    touchSensitivity: 5, //test this
    
    // Navigation //
    // menu: '#menu',
    slidesNavigation: true,
    navigation: true,
    // navigationTooltips: ['Home', 'Maps', 'Chronology', 'Videos', 'Education', 'Contact', 'Credits'],
    navigationPosition: 'left',
    slidesNavPosition: 'bottom',

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
  // $('.video-link').magnificPopup({
  //   type:'iframe',
  //   iframe: {
  //     markup: '<div class="mfp-iframe-scaler">'+
  //               '<div class="mfp-close"></div>'+
  //               '<iframe class="mfp-iframe" frameborder="1" allowfullscreen></iframe>'+
  //               '<div class="mfp-title">Some caption</div>'+
  //             '</div>'
  //   },
  // });
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

    // var centerSteveston = new google.maps.LatLng(49.125292, -123.186321);     // Steveston Center
    var centerStevestonB = new google.maps.LatLng(49.124303, -123.177491);     // Steveston B Center

    // Steveston Map Settings
    // var optionsSteveston = {
    //   zoom: 16, 
    //   center: centerSteveston,
    //   disableDefaultUI: true,
    //   mapTypeControl: false,
    //   panControl: true,
    //   panControlOptions: {
    //     position: google.maps.ControlPosition.LEFT_BOTTOM
    //   },
    //   zoomControl: true,
    //   zoomControlOptions: {
    //     style: google.maps.ZoomControlStyle.LARGE,
    //     position: google.maps.ControlPosition.LEFT_BOTTOM
    //   },
    //   scrollwheel: false,
    //   scaleControl: true,
    //   draggable: false,
    //   disableDoubleClickZoom: true
    // };

    var optionsStevestonB = {
      zoom: 16, 
      center: centerStevestonB,
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
    // var mapSteveston = new google.maps.Map(document.getElementById('map-canvas-Steveston'), optionsSteveston); // Steveston Map

    var mapStevestonB = new google.maps.Map(document.getElementById('map-canvas-StevestonB'), optionsStevestonB); // Steveston Map

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

    // Steveston Marker Settings
    // var markerSteveston01Homma = new google.maps.Marker({
    //   position: {lat: 49.1252888, lng: -123.18320},
    //   map: mapSteveston,
    //   title: "Tomekichi Homma",
    //   icon: "/assets/01SE_32.png"
    // });
    // var markerSteveston02FirstImmigrants = new google.maps.Marker({
    //   position: {lat: 49.124208, lng: -123.18410},
    //   map: mapSteveston,
    //   title: "First Immigrants",
    //   icon: "/assets/2_Women_32.png"
    // });
    // var markerSteveston03RintaroHayashi = new google.maps.Marker({
    //   position: {lat: 49.124572, lng: -123.18530},
    //   map: mapSteveston,
    //   title: "Rintaro Hayashi",
    //   icon: "/assets/03SW_32.png"
    // });
    // var markerSteveston04WomenAtWork = new google.maps.Marker({
    //   position: {lat: 49.125129, lng: -123.1861},
    //   map: mapSteveston,
    //   title: "Women at Work",
    //   icon: "/assets/04SE_32.png"
    // });
    // var markerSteveston05BoatBuilders = new google.maps.Marker({
    //   position: {lat: 49.125398, lng: -123.193096},
    //   map: mapSteveston,
    //   title: "Boat Builders",
    //   icon: "/assets/5_Internment_32.png"
    // });
    // var markerSteveston06CreatingCommunity = new google.maps.Marker({
    //   position: {lat: 49.126630, lng: -123.18075},
    //   map: mapSteveston,
    //   title: "Creating Community",
    //   icon: "/assets/6_Shoyama_32.png"
    // });
    // var markerSteveston07HideHyodoShimizu = new google.maps.Marker({
    //   position: {lat: 49.126630, lng: -123.179855},
    //   map: mapSteveston,
    //   title: "Hide Hyodo Shimizu",
    //   icon: "/assets/07SW_32.png"
    // });
    // var markerSteveston08MartialArts = new google.maps.Marker({
    //   position: {lat: 49.1252888, lng: -123.177086},
    //   map: mapSteveston,
    //   title: "Martial Arts",
    //   icon: "/assets/8_Morii_32.png"
    // });
    // var markerSteveston09Internment = new google.maps.Marker({
    //   position: {lat: 49.1252888, lng: -123.18063},
    //   map: mapSteveston,
    //   title: "Internment",
    //   icon: "/assets/9_JLS_32.png"
    // });
    // var markerSteveston10BackToSteveston = new google.maps.Marker({
    //   position: {lat: 49.1252888, lng: -123.18225},
    //   map: mapSteveston,
    //   title: "Back to Steveston",
    //   icon: "/assets/10_Redress_32.png"
    // });



    // Steveston Option B Marker Settings
    var markerSteveston01HommaB = new google.maps.Marker({
      position: {lat: 49.1252888, lng: -123.18320},
      map: mapStevestonB,
      title: "Tomekichi Homma",
      icon: "/assets/01SE_32.png"
    });
    var markerSteveston02FirstImmigrantsB = new google.maps.Marker({
      position: {lat: 49.124208, lng: -123.18410},
      map: mapStevestonB,
      title: "First Immigrants",
      icon: "/assets/2_Women_32.png"
    });
    var markerSteveston03RintaroHayashiB = new google.maps.Marker({
      position: {lat: 49.124572, lng: -123.18530},
      map: mapStevestonB,
      title: "Rintaro Hayashi",
      icon: "/assets/03SW_32.png"
    });
    var markerSteveston04WomenAtWorkB = new google.maps.Marker({
      position: {lat: 49.125129, lng: -123.1861},
      map: mapStevestonB,
      title: "Women at Work",
      icon: "/assets/04SE_32.png"
    });
    var markerSteveston05BoatBuildersB = new google.maps.Marker({
      position: {lat: 49.120806, lng: -123.169433},
      map: mapStevestonB,
      title: "Boat Builders",
      icon: "/assets/8_Morii_32.png"
    });
    var markerSteveston06CreatingCommunityB = new google.maps.Marker({
      position: {lat: 49.126630, lng: -123.18075},
      map: mapStevestonB,
      title: "Creating Community",
      icon: "/assets/5_Internment_32.png"
    });
    var markerSteveston07HideHyodoShimizuB = new google.maps.Marker({
      position: {lat: 49.126630, lng: -123.179855},
      map: mapStevestonB,
      title: "Hide Hyodo Shimizu",
      icon: "/assets/6_Shoyama_32.png"
    });
    var markerSteveston08MartialArtsB = new google.maps.Marker({
      position: {lat: 49.1252888, lng: -123.177086},
      map: mapStevestonB,
      title: "Martial Arts",
      icon: "/assets/07SW_32.png"
    });
    var markerSteveston09InternmentB = new google.maps.Marker({
      position: {lat: 49.1252888, lng: -123.18063},
      map: mapStevestonB,
      title: "Internment",
      icon: "/assets/9_JLS_32.png"
    });
    var markerSteveston10BackToStevestonB = new google.maps.Marker({
      position: {lat: 49.1252888, lng: -123.18225},
      map: mapStevestonB,
      title: "Back to Steveston",
      icon: "/assets/10_Redress_32.png"
    });




//    INFOWINDOW START

    // var contentString1 = '<a href="http://vimeo.com/32071937" class="video-link" style="outline:none"><div class="ns-th-video"><img src="/assets/ns-thumb-01.jpg"><h2 style="color:white;">01</h2></div></a>';
    var contentString1 = '<img src="/assets/1_FirstImmigrants_150.jpg" id="Powell-01">';
    var contentString2 = '<img src="/assets/2_Women_150.jpg">';
    var contentString3 = '<img src="/assets/3_Maikawa_150.jpg">';
    var contentString4 = '<img src="/assets/4_Mitsui_150.jpg">';
    var contentString5 = '<img src="/assets/5_Internment_150.jpg">';
    var contentString6 = '<img src="/assets/6_Shoyama_150.jpg">';
    var contentString7 = '<img src="/assets/7_Asahi_150.jpg">';
    var contentString8 = '<img src="/assets/8_Morii_150.jpg">';
    var contentString9 = '<img src="/assets/9_JLS_150.jpg">';
    var contentString10 = '<img src="/assets/10_Redress_150.jpg">';

    var infowindow1 = new google.maps.InfoWindow({
      content: contentString1
    });
    var infowindow2 = new google.maps.InfoWindow({
      content: contentString2 
    });
    var infowindow3 = new google.maps.InfoWindow({
      content: contentString3
    });
    var infowindow4 = new google.maps.InfoWindow({
      content: contentString4
    });
    var infowindow5 = new google.maps.InfoWindow({
      content: contentString5
    });
    var infowindow6 = new google.maps.InfoWindow({
      content: contentString6
    });
    var infowindow7 = new google.maps.InfoWindow({
      content: contentString7
    });
    var infowindow8 = new google.maps.InfoWindow({
      content: contentString8
    });    
    var infowindow9 = new google.maps.InfoWindow({
      content: contentString9
    });
    var infowindow10 = new google.maps.InfoWindow({
      content: contentString10
    });

    google.maps.event.addListener(marker477PowellSt_Pole754, 'click', function() {
      // infowindow1.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/126504239',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(marker457PowellSt_Pole554, 'click', function() {
      infowindow2.open(map,this);
    });
    google.maps.event.addListener(marker369PowellSt_Pole753, 'click', function() {
      infowindow3.open(map,this);
    });
    google.maps.event.addListener(marker357PowellSt_Pole553, 'click', function() {
      infowindow4.open(map,this);
    });
    google.maps.event.addListener(marker314PowellSt_Pole153, 'click', function() {
      infowindow5.open(map,this);
    });
    google.maps.event.addListener(marker394PowellSt_Pole1053, 'click', function() {
      infowindow6.open(map,this);
    });
    google.maps.event.addListener(markerPowellGrounds_Pole254, 'click', function() {
      infowindow7.open(map,this);
    });
    google.maps.event.addListener(marker362AlexanderSt_Pole453, 'click', function() {
      infowindow8.open(map,this);
    });
    google.maps.event.addListener(marker487AlexanderSt_Pole254, 'click', function() {
      infowindow9.open(map,this);
    });
    google.maps.event.addListener(markerOppenheimerPark_Pole12, 'click', function() {
      infowindow10.open(map,this);
    });    


    //INFOWINDOW END

// START Infobox (THIS WORKS KINDA)
 // var boxText = document.createElement("div");
 //        boxText.style.cssText = "border: 1px solid black; background: black; padding: 0px;";
 //        boxText.innerHTML = '<a href="http://vimeo.com/32071937">'+
 //              '<img src="/assets/1_FirstImmigrants_150.jpg">'+
 //          '</a>';
    
 //  var myOptions = {
 //     content: boxText
 //    ,disableAutoPan: false
 //    ,maxWidth: 0
 //    ,pixelOffset: new google.maps.Size(-140, 0)
 //    ,zIndex: null
 //    ,boxStyle: { 
 //      background: "url('tipbox.gif') no-repeat"
 //      ,opacity: 1
 //      ,width: "auto"
 //     }
 //    ,closeBoxMargin: "2px 2px 2px 2px"
 //    ,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
 //    ,infoBoxClearance: new google.maps.Size(1, 1)
 //    ,isHidden: false
 //    ,pane: "floatPane"
 //    ,enableEventPropagation: false
 //  };

 //  var ib = new InfoBox(myOptions);
  
 //  google.maps.event.addListener(marker477PowellSt_Pole754, 'click', function() {
 //        ib.open(map, this);
 //        map.panTo(this);
 //    });
// INFOBOX end

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



// window.google.maps.event.addListener(ib, "domready", function () {
//     $('.open-popup').on('click', function () {
//         // Open magnificPopup through API
//         // See http://dimsemenov.com/plugins/magnific-popup/documentation.html#inline_type
//         $.magnificPopup.open({
//             items: {
//                 src: $('<div class="video-link">Dynamically created element</div>'), // Dynamically created element
//                 type: 'inline'
//             }
//         });
//     });
// });
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


  $("#Powell-01,#Powell-02,#Powell-03,#Powell-04,#Powell-05,#Powell-06,#Powell-07,#Powell-08,#Powell-09,#Powell-10,#Steveston-01,#Steveston-02,#Steveston-03,#Steveston-04,#Steveston-05,#Steveston-06,#Steveston-07,#Steveston-08,#Steveston-09,#Steveston-10").on({
      mouseover: function(){
        var box = $(this).addClass('highlight');
      },  
      mouseleave: function(){
        var box = $(this).removeClass('highlight');
      }
  });

  $("#Powell-01").on( "click", function(){
    Fresco.show({
      url: 'https://vimeo.com/126504239',
      options: {
        vimeo: { autoplay: 1 }
      }
    });
  });

  $("#Powell-02").on( "click", function(){
    Fresco.show({
      url: 'https://vimeo.com/126504315',
      options: {
        vimeo: { autoplay: 1 }
      }
    });
  });

    $("#Powell-03").on( "click", function(){
    Fresco.show({
      url: 'https://vimeo.com/126504240',
      options: {
        vimeo: { autoplay: 1 }
      }
    });
  });

  $("#Powell-04").on( "click", function(){
    Fresco.show({
      url: 'https://vimeo.com/126504241',
      options: {
        vimeo: { autoplay: 1 }
      }
    });
  });

  $("#Powell-05").on( "click", function(){
    Fresco.show({
      url: 'https://vimeo.com/126504189',
      options: {
        vimeo: { autoplay: 1 }
      }
    });
  });

  $("#Powell-06").on( "click", function(){
    Fresco.show({
      url: 'https://vimeo.com/126504316',
      options: {
        vimeo: { autoplay: 1 }
      }
    });
  });

  $("#Powell-07").on( "click", function(){
    Fresco.show({
      url: 'https://vimeo.com/126504187',
      options: {
        vimeo: { autoplay: 1 }
      }
    });
  });

  $("#Powell-08").on( "click", function(){
    Fresco.show({
      url: 'https://vimeo.com/126504186',
      options: {
        vimeo: { autoplay: 1 }
      }
    });
  });

  $("#Powell-09").on( "click", function(){
    Fresco.show({
      url: 'https://vimeo.com/126504188',
      options: {
        vimeo: { autoplay: 1 }
      }
    });
  });

  $("#Powell-10").on( "click", function(){
    Fresco.show({
      url: 'https://vimeo.com/126504242',
      options: {
        vimeo: { autoplay: 1 }
      }
    });
  });

  $("playIcon").on({
      mouseover: function(){
        var box = $(this).addClass('highlight');
      },  
      mouseleave: function(){
        var box = $(this).removeClass('highlight');
      }
  });

// vegas plugin slideshow
  $('#landing').vegas({
    delay: 12000,
    slides: [
        { src: '/assets/Photos/BG_2010-80-2-64.jpg' },
        { src: '/assets/Photos/BG_CRA_2009-16-111.jpg' },
        { src: '/assets/Photos/BG_2010-30-14.jpg' },
        { src: '/assets/Photos/BG_CRA_1977-22-7.jpg' },
        { src: '/assets/Photos/BG_2010-23-2-4-550.jpg' },
        { src: '/assets/Photos/BG_CRA_1978-34-42.jpg' },
        { src: '/assets/Photos/BG_CRA_2006-39-80.jpg' },
        { src: '/assets/Photos/BG_CRA_1978-34-41.jpg' },        
        { src: '/assets/Photos/BG_VPL_1368.jpg' }
    ],
    overlay: "/assets/vegas/overlays/01.png"
  });

// Slidebars
  // var mySlidebars = new $.slidebars();
  // $('.ns-navopen').on('touchend click', function() {
  //   mySlidebars.slidebars.open('right');
  // });
  // $('.ns-navclose').on('touchend click', function() {
  //   mySlidebars.slidebars.close();
  // });



  $('#scotch-panel').scotchPanel({
      containerSelector: 'body',
      direction: 'right',
      duration: 500,
      transition: 'ease', //'cubic-bezier(.76,-0.52,.33,1.02)'
      closeAfter: 5000,
      clickSelector: '.toggle-panel',
      distanceX: '210px',
      enableEscapeKey: true
  });

});



