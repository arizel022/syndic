$(document).ready(function() {

    $('.hero').addClass('active');

    $('#main, .logo').click(function () {
        $('.section').removeClass('active');
        $('.hero').addClass('active');
	});
    $('#about').click(function () {
        $('.section').removeClass('active');
        $('.about').addClass('active');
	});
    $('#price').click(function () {
        $('.section').removeClass('active');
        $('.price').addClass('active');
	});
    $('#cont').click(function () {
        $('.section').removeClass('active');
        $('.cont').addClass('active');
	});
    $('#loc').click(function () {
        $('.section').removeClass('active');
        $('.loc').addClass('active');
	});

    $('.media__btn').click(function () {
        $('.gallery').addClass('active');
	});

    $('.gallery__btn').click(function () {
        $('.gallery').removeClass('active');
	});

	$('.media__slider').slick({
		dots: false,
		infinite: true,
		arrows: false,
		autoplay: true
	});


    $('.gallery__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.gallery__nav'
    });
    $('.gallery__nav').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        asNavFor: '.gallery__slider',
        prevArrow: '<div class="slider-arrows slider-prev"></div>',
        nextArrow: '<div class="slider-arrows slider-next"></div>',
        arrows: true,
        centerMode: false,
        focusOnSelect: true
    });


});