$(document).ready(function() {
  $('#fullpage').fullpage({
    verticalCentered: false,
    resize: true,
    anchors: ['home', 'chronology', 'maps', 'videos', 'education', 'contact', 'credits'],
    sectionsColor: ['#8FB98B', '#DE564B', '#EAE1C0'],
    menu: '#menu',
    slidesNavigation: true,
    navigation: true,
    navigationTooltips: ['Home', 'Chronology', 'Maps', 'Videos', 'Education', 'Contact', 'Credits'],
    continuousVertical: true,
    // scrollBar: true, //scrollbar make the pages snap more abruptly
    // responsive: 600
    });
  });