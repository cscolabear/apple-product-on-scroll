const $color_section = $('.color-section');
const color_section_top = $color_section.offset().top;
const color_section_bottom = $color_section.offset().top + $color_section.outerHeight(true);
const product_list = [$('.product._2'), $('.product._3')];

const setClipPath = () => {
  const view_top = $(window).scrollTop();
  const view_height = $(window).height();
  const view_bottom = view_top + view_height;

  //
  if (view_top < $color_section.offset().top) {
    const inset = 'inset(100% 0px 0px 0px)';
    $.each(product_list, function (index, $ele) {
      $ele.css({
        'clip-path': inset,
        '-webkit-clip-path': inset,
      });
    });
  }

  //
  if (view_bottom > color_section_bottom) {
    const inset = 'inset(0% 0px 0px 0px)';
    $.each(product_list, function (index, $ele) {
      $ele.css({
        'clip-path': inset,
        '-webkit-clip-path': inset,
      });
    });
  }

  if (view_top >= $color_section.offset().top &&
    view_bottom <= color_section_bottom) {
    // console.log('in sec: ' + view_top);

    product_list.forEach(($ele, index) => {
      const current_section_bottom = (color_section_top + (view_height * (index + 1)));
      // console.log($ele.attr('class') + ': ' + color_section_bottom);

      let inset_value = (current_section_bottom - view_top) / view_height * 100;
      inset_value = inset_value < 0 ? 0 : inset_value;
      inset_value = inset_value > 100 ? 100 : inset_value;
      const inset = `inset(${inset_value}% 0px 0px 0px)`;
      // console.log(inset);
      $ele.css({
        'clip-path': inset,
        '-webkit-clip-path': inset,
      });
    });
  }
  window.requestAnimationFrame(setClipPath);
}
window.requestAnimationFrame(setClipPath);
