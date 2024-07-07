$(document).ready(function () {
  $(".albums-tabs").slick({
    // infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: true,
  });
  $(".mobile-albums-list-carousel").slick({
    // autoplay: false,
    // infinite: false,
    speed: 200,
    slidesToShow: 4, // Increase the number of slides to show to 4
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: false,
  });
});
