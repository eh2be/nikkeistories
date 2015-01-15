$(document).ready(function() {
  
  $('#fullpage').fullpage({
    verticalCentered: false,
    resize: true,
    anchors: ['home', 'chronology', 'maps', 'videos', 'education', 'contact', 'credits'],
    sectionsColor: ['#8FB98B', '#DE564B', '#EAE1C0'],
    touchSensitivity: 1, //test this
    // Navigation //
    // menu: '#menu',
    slidesNavigation: true,
    navigation: true,
    navigationTooltips: ['Home', 'Chronology', 'Maps', 'Videos', 'Education', 'Contact', 'Credits'],
    continuousVertical: true,
    // Scrolling //
    scrollOverflow: true,
    autoScrolling: true,
    scrollBar: false, //scrollbar make the pages snap more abruptly; Foundation off-canvas navbar doesn't work either.
    // responsive: 600
    // normalScrollElements: '#map-canvas, #map-canvas2' // swipe/scroll doesn't work over maps on macbook
    });

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

  });

