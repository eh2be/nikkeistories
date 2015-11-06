$(document).ready(function() {
  
// START fullPage.js plugin
  $('#fullpage').fullpage({
    // Design
    verticalCentered: false,
    resize: false,
    anchors: ['home', 'videos', 'maps', 'chronology', 'education', 'credits'],
    // sectionsColor: ['#8FB98B', '#DE564B', '#EAE1C0'],
    touchSensitivity: 20, //test this
    
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
    // scrollBar: true, //scrollbar make the pages snap more abruptly. Nav menu and info menu buttons disappear
    responsive: 0,
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

// // START Google Maps API

  function initialize() {
// Powell Street MAP
    // var centerPowellStreet = new google.maps.LatLng(49.2827812,-123.0958854); // Powell Street Center
 
    var MapOptions = {
      streetViewControl: false,
      tilt: 0,


      // turn off points of interest on underlying map
      styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]}], 
      // center: centerPowellStreet,
      disableDefaultUI: true,
      mapTypeControl: false,
      panControl: false,
      panControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      scrollwheel: false,
      scaleControl: false,
      draggable: true,
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
      new google.maps.LatLng(49.284282, -123.097537),
      new google.maps.LatLng(49.281966, -123.092527)
    );
    var mapMinZoom = 13;
    var mapMaxZoom = 21;

    var mapPowellStreet = new google.maps.Map(document.getElementById("map-canvas"), MapOptions);

    // https://developers.google.com/maps/documentation/javascript/examples/maptype-image-overlay
    var imageMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var proj = mapPowellStreet.getProjection();
          var z2 = Math.pow(2, zoom);
          var tileXSize = 256 / z2;
          var tileYSize = 256 / z2;
          var tileBounds = new google.maps.LatLngBounds(
            proj.fromPointToLatLng(new google.maps.Point(coord.x * tileXSize, (coord.y + 1) * tileYSize)),
            proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * tileXSize, coord.y * tileYSize))
          );
          if (!mapBounds.intersects(tileBounds) || zoom < mapMinZoom || zoom > mapMaxZoom) return null;
          return "/assets/map-powellstreet/{z}/{x}/{y}.png".replace('{z}',zoom).replace('{x}',coord.x).replace('{y}',coord.y);
        },
        tileSize: new google.maps.Size(256, 256),
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        name: 'Tiles'
    });

    mapPowellStreet.overlayMapTypes.push(imageMapType);
    mapPowellStreet.fitBounds(mapBounds2);



// Maptiler Steveston

        var mapBoundsSteveston = new google.maps.LatLngBounds(
            new google.maps.LatLng(49.11765444, -123.19464336),
            new google.maps.LatLng(49.13023623, -123.16053058));
        var mapBoundsSteveston2 = new google.maps.LatLngBounds(
            new google.maps.LatLng(49.127222, -123.190019),
            new google.maps.LatLng(49.119780, -123.165729));
        var mapMinZoom2 = 13;
        var mapMaxZoom2 = 21;

        // var map = new google.maps.Map(document.getElementById("map-canvas-StevestonB"), optionsStevestonB);
        var mapStevestonB = new google.maps.Map(document.getElementById('map-canvas-StevestonB'), MapOptions); // Steveston Map
 
        // https://developers.google.com/maps/documentation/javascript/examples/maptype-image-overlay
        var imageMapTypeSteveston = new google.maps.ImageMapType({
            getTileUrl: function(coord, zoom) {
              var proj = mapStevestonB.getProjection();
              var z2 = Math.pow(2, zoom);
              var tileXSize = 256 / z2;
              var tileYSize = 256 / z2;
              var tileBoundsSteveston = new google.maps.LatLngBounds(
                proj.fromPointToLatLng(new google.maps.Point(coord.x * tileXSize, (coord.y + 1) * tileYSize)),
                proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * tileXSize, coord.y * tileYSize))
              );
              if (!mapBoundsSteveston.intersects(tileBoundsSteveston) || zoom < mapMinZoom2 || zoom > mapMaxZoom2) return null;
              return "/assets/map-steveston/{z}/{x}/{y}.png".replace('{z}',zoom).replace('{x}',coord.x).replace('{y}',coord.y);
            },
            tileSize: new google.maps.Size(256, 256),
            minZoom: mapMinZoom2,
            maxZoom: mapMaxZoom2,
            name: 'Tiles'
        });

        mapStevestonB.overlayMapTypes.push(imageMapTypeSteveston);
        mapStevestonB.fitBounds(mapBoundsSteveston2);
        
// https://developers.google.com/maps/documentation/javascript/examples/maptype-image-overlay
// END Maptiler Steveston
// MAPTILER init END

    var centerStevestonB = new google.maps.LatLng(49.124303, -123.177491);     // Steveston B Center

    // var optionsStevestonB = {
    //   zoom: 16, 
    //   center: centerStevestonB,
    //   disableDefaultUI: true,
    //   mapTypeControl: false,
    //   streetViewControl: false,
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


// Powell Street Marker Settings
    var marker477PowellSt_Pole754 = new google.maps.Marker({
      position: {lat: 49.283165, lng: -123.093410},
      map: mapPowellStreet,
      title: "First Immigrants",
      icon: "/assets/1_FirstImmigrants_32.png"
    });
    var marker457PowellSt_Pole554 = new google.maps.Marker({
      position: {lat: 49.283165, lng: -123.0939076},
      map: mapPowellStreet,
      title: "Lives of Women",
      icon: "/assets/2_Women_32.png"
    });
    var marker369PowellSt_Pole753 = new google.maps.Marker({
      position: {lat: 49.283190, lng: -123.0961},
      map: mapPowellStreet,
      title: "Maikawa Brothers",
      icon: "/assets/3_Maikawa_32.png"
    });
    var marker357PowellSt_Pole553 = new google.maps.Marker({
      position: {lat: 49.283190, lng: -123.0965021},
      map: mapPowellStreet,
      title: "Masumi Mitsui",
      icon: "/assets/4_Mitsui_32.png"
    });        
    var marker314PowellSt_Pole153 = new google.maps.Marker({
      position: {lat: 49.283215, lng: -123.097380},
      map: mapPowellStreet,
      title: "Internment",
      icon: "/assets/5_Internment_32.png"
    });
    var marker394PowellSt_Pole1053 = new google.maps.Marker({
      position: {lat: 49.283080, lng: -123.09547},
      map: mapPowellStreet,
      title: "Tom Shoyama",
      icon: "/assets/6_Shoyama_32.png"
    });        
    var markerPowellGrounds_Pole254 = new google.maps.Marker({
      position: {lat: 49.283080, lng: -123.095049},
      map: mapPowellStreet,
      title: "The Asahi",
      icon: "/assets/7_Asahi_32.png"
    });
    var marker362AlexanderSt_Pole453 = new google.maps.Marker({
      position: {lat: 49.28395, lng: -123.09552},
      map: mapPowellStreet,
      title: "Etsuji Morii",
      icon: "/assets/8_Morii_32.png"
    });
    var marker487AlexanderSt_Pole254 = new google.maps.Marker({
      position: {lat: 49.283930, lng: -123.094065},
      map: mapPowellStreet,
      title: "Japanese Language School",
      icon: "/assets/9_JLS_32.png"
    });
    var markerOppenheimerPark_Pole12 = new google.maps.Marker({
      position: {lat: 49.282795, lng: -123.093400},
      map: mapPowellStreet,
      title: "Redress",
      icon: "/assets/10_Redress_32.png"
    });

    // Steveston Option B Marker Settings UNCOMMENT FOR STEVESTON
    var markerSteveston01HommaB = new google.maps.Marker({
      position: {lat: 49.1252888, lng: -123.18320},
      map: mapStevestonB,
      title: "Tomekichi Homma",
      icon: "/assets/01SE_32.png"
    });
    var markerSteveston02FirstImmigrantsB = new google.maps.Marker({
      position: {lat: 49.1243000, lng: -123.18430},
      map: mapStevestonB,
      title: "First Immigrants",
      icon: "/assets/2_Women_32.png"
    });
    var markerSteveston03RintaroHayashiB = new google.maps.Marker({
      position: {lat: 49.124208, lng: -123.1865},
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
    var markerSteveston05HideHyodoShimizuB = new google.maps.Marker({
      position: {lat: 49.126630, lng: -123.18075},
      map: mapStevestonB,
      title: "Hide Hyodo Shimizu",
      icon: "/assets/5_Internment_32.png"
    });
    var markerSteveston06CreatingCommunityB = new google.maps.Marker({
      position: {lat: 49.126630, lng: -123.178000},
      map: mapStevestonB,
      title: "Creating Community",
      icon: "/assets/6_Shoyama_32.png"
    });
    var markerSteveston07MartialArtsB = new google.maps.Marker({
      position: {lat: 49.1252888, lng: -123.177086},
      map: mapStevestonB,
      title: "Martial Arts",
      icon: "/assets/07SW_32.png"
    });
    var markerSteveston08BoatBuildersB = new google.maps.Marker({
      position: {lat: 49.120806, lng: -123.169433},
      map: mapStevestonB,
      title: "Boat Builders",
      icon: "/assets/8_Morii_32.png"
    });
    var markerSteveston09InternmentB = new google.maps.Marker({
      position: {lat: 49.1252888, lng: -123.18063},
      map: mapStevestonB,
      title: "Internment",
      icon: "/assets/9_JLS_32.png"
    });
    var markerSteveston10BackToStevestonB = new google.maps.Marker({
      position: {lat: 49.125000, lng: -123.1818000},
      map: mapStevestonB,
      title: "Back to Steveston",
      icon: "/assets/10_Redress_32.png"
    });




//    INFOWINDOW START

    // var contentString1 = '<a href="http://vimeo.com/32071937" class="video-link" style="outline:none"><div class="ns-th-video"><img src="/assets/ns-thumb-01.jpg"><h2 style="color:white;">01</h2></div></a>';
    // var contentString1 = '<img src="/assets/1_FirstImmigrants_150.jpg" id="Powell-01">';
    // var contentString2 = '<img src="/assets/2_Women_150.jpg">';
    // var contentString3 = '<img src="/assets/3_Maikawa_150.jpg">';
    // var contentString4 = '<img src="/assets/4_Mitsui_150.jpg">';
    // var contentString5 = '<img src="/assets/5_Internment_150.jpg">';
    // var contentString6 = '<img src="/assets/6_Shoyama_150.jpg">';
    // var contentString7 = '<img src="/assets/7_Asahi_150.jpg">';
    // var contentString8 = '<img src="/assets/8_Morii_150.jpg">';
    // var contentString9 = '<img src="/assets/9_JLS_150.jpg">';
    // var contentString10 = '<img src="/assets/10_Redress_150.jpg">';

    // var infowindow1 = new google.maps.InfoWindow({
    //   content: contentString1
    // });
    // var infowindow2 = new google.maps.InfoWindow({
    //   content: contentString2 
    // });
    // var infowindow3 = new google.maps.InfoWindow({
    //   content: contentString3
    // });
    // var infowindow4 = new google.maps.InfoWindow({
    //   content: contentString4
    // });
    // var infowindow5 = new google.maps.InfoWindow({
    //   content: contentString5
    // });
    // var infowindow6 = new google.maps.InfoWindow({
    //   content: contentString6
    // });
    // var infowindow7 = new google.maps.InfoWindow({
    //   content: contentString7
    // });
    // var infowindow8 = new google.maps.InfoWindow({
    //   content: contentString8
    // });    
    // var infowindow9 = new google.maps.InfoWindow({
    //   content: contentString9
    // });
    // var infowindow10 = new google.maps.InfoWindow({
    //   content: contentString10
    // });

    // google.maps.event.addListener('#map-canvas', 'click', function() {
    //   map.panTo({lat: 15, lng: -15});
    // });

    google.maps.event.addListener(marker477PowellSt_Pole754, 'click', function() {
      // infowindow1.open(mapPowellStreet,this);
      Fresco.show({
        url: 'https://vimeo.com/126504239',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(marker457PowellSt_Pole554, 'click', function() {
      // infowindow2.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/126504315',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(marker369PowellSt_Pole753, 'click', function() {
      // infowindow3.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/126504240',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(marker357PowellSt_Pole553, 'click', function() {
      // infowindow4.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/126504241',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(marker314PowellSt_Pole153, 'click', function() {
      // infowindow5.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/126504189',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(marker394PowellSt_Pole1053, 'click', function() {
      // infowindow6.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/126504316',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(markerPowellGrounds_Pole254, 'click', function() {
      // infowindow7.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/126504187',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(marker362AlexanderSt_Pole453, 'click', function() {
      // infowindow8.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/126504186',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(marker487AlexanderSt_Pole254, 'click', function() {
      // infowindow9.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/126504188',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(markerOppenheimerPark_Pole12, 'click', function() {
      // infowindow10.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/126504242',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });  

// Steveston marker click listeners
    google.maps.event.addListener(markerSteveston01HommaB, 'click', function() {
      // infowindow1.open(mapPowellStreet,this);
      Fresco.show({
        url: 'https://vimeo.com/143544568',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(markerSteveston02FirstImmigrantsB, 'click', function() {
      // infowindow2.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/143544565',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(markerSteveston03RintaroHayashiB, 'click', function() {
      // infowindow3.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/143543294',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(markerSteveston04WomenAtWorkB, 'click', function() {
      // infowindow4.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/143544567',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(markerSteveston05HideHyodoShimizuB, 'click', function() {
      // infowindow5.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/143544566',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(markerSteveston06CreatingCommunityB, 'click', function() {
      // infowindow6.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/143543292',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(markerSteveston07MartialArtsB, 'click', function() {
      // infowindow7.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/143543291',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(markerSteveston08BoatBuildersB, 'click', function() {
      // infowindow8.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/143543290',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(markerSteveston09InternmentB, 'click', function() {
      // infowindow9.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/143543293',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });
    google.maps.event.addListener(markerSteveston10BackToStevestonB, 'click', function() {
      // infowindow10.open(map,this);
      Fresco.show({
        url: 'https://vimeo.com/144525261',
        options: {
          vimeo: { autoplay: 1 }
        }
      });
    });  

    //INFOWINDOW END


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

  }; // end intialize
  google.maps.event.addDomListener(window, 'load', initialize);



// function drop() {
//   for (var i = 0; i < neighborhoods.length; i++) {
//     setTimeout(function() {
//       addMarker();
//     }, i * 200);
//   }
// }


// END Google Maps API


//IGOR
  $('.video-thumb').on({
    mouseover: function(){
        $(this).addClass('highlight');
    },
    mouseleave: function(){
        $(this).removeClass('highlight');
    },
    click: function(){
        var vimeoId = $(this).data('video');
        Fresco.show({
            url: 'https://vimeo.com/' + vimeoId,
            options: {
                vimeo: {autoplay: 1}
            }
        });

    }
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
    delay: 6000,
    slides: [
        { src: '/assets/Photos/BG_2010-80-2-64.jpg' },
        { src: '/assets/Photos/BG_CRA_2009-16-111.jpg' },
        { src: '/assets/Photos/BG_2010-30-14.jpg' },
        { src: '/assets/Photos/BG_2010-23-2-4-550.jpg' },
        { src: '/assets/Photos/BG_VPL_1368.jpg' },
        { src: '/assets/Photos/BG_CRA_1978-34-42.jpg' },
        { src: '/assets/Photos/BG_2010-23-2-4-236.jpg' },
        { src: '/assets/Photos/BG_CRA_1978-34-41.jpg' }
    ],
    overlay: "/assets/vegas/overlays/01.png"
  });


  $( "#ns-chrono-header-1" ).click(function() {
    $( "#ns-chrono-image-1" ).slideToggle( "slow", function() {
      // Animation complete.
    });
  });

  $( "#ns-chrono-header-2" ).click(function() {
    $( "#ns-chrono-image-2" ).slideToggle( "slow", function() {
      // Animation complete.
    });
  });

  $( "#ns-chrono-header-3" ).click(function() {
    $( "#ns-chrono-image-3" ).slideToggle( "slow", function() {
      // Animation complete.
    });
  });

  $( "#ns-chrono-header-4" ).click(function() {
    $( "#ns-chrono-image-4" ).slideToggle( "slow", function() {
      // Animation complete.
    });
  });

  $( "#ns-chrono-header-5" ).click(function() {
    $( "#ns-chrono-image-5" ).slideToggle( "slow", function() {
      // Animation complete.
    });
  });

  $( "#ns-chrono-header-6" ).click(function() {
    $( "#ns-chrono-image-6" ).slideToggle( "slow", function() {
      // Animation complete.
    });
  });



  $('#scotch-panel').scotchPanel({
      containerSelector: 'body',
      direction: 'right',
      duration: 400,
      transition: 'ease', //'cubic-bezier(.76,-0.52,.33,1.02)'
      // closeAfter: 5000,
      touchSelector: '.toggle-on-touch-only, .toggle-on-both',
      hoverSelector: '.toggle-panel-on-hover',
      clickSelector: '.toggle-on-click-only, .toggle-on-both',
      // clickSelector: '.toggle-panel',
      distanceX: '210px',
      enableEscapeKey: true
  });

});


//IGOR
//Had to move it to onLoad event cause otherwise Fresco didn't initialize properly and put background on foreground
$(window).load(function(){

    // PRELOADER Animate loader off screen  
    $(".se-pre-con").fadeOut("slow");

    //Checking if there's anything in the hash at all
    if (window.location.hash) {
      var hash = window.location.hash;

      //Checking if the hash starts with #video-
      if (hash.substr(0,7) === '#video-') {

        //Clicking a video thumb with this ID
        $(hash).eq(0).click();
      };
    }
});




