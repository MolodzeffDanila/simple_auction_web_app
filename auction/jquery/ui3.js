$(document).ready(function () {
    $('#modal').click(function () {
        $('.main').css('filter', 'blur(10px)');
        $('#redact_text').fadeIn();
    });

    $('.x-btn').click(function () {
        $('.main').css('filter', 'none');
        $('.overlay').fadeOut();
    });

    $('#modal2').click(function () {
        $('.main').css('filter', 'blur(10px)');
        $('#redact_image').fadeIn();
    });
});