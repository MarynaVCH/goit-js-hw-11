export default function fixedform() {
  let searchForm = $('.search-form');
  let hederHeight = searchForm.height(); // вычисляем высоту шапки

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      searchForm.addClass('search-form_fixed');
      $('body').css({
        paddingTop: hederHeight + 'px', // делаем отступ у body, равный высоте шапки
      });
    } else {
      searchForm.removeClass('search-form_fixed');
      $('body').css({
        paddingTop: 0, // удаляю отступ у body, равный высоте шапки
      });
    }
  });
}
