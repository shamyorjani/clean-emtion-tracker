$(document).ready(function () {
  $(".albums-tabs").slick({
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: true,
  });
  $(".mobile-albums-list-carousel").slick({
    autoplay: true,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: false,
  });
});
