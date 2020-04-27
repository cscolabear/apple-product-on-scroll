const $color_section = $('.color-section');
const color_section_top = $color_section.offset().top;
const color_section_bottom = $color_section.offset().top + $color_section.outerHeight(true);
const $product_list = $('.product._2, .product._3');

const $color_section2 = $('.color-section-2');
const color_section_top2 = $color_section2.offset().top;
const color_section_bottom2 = $color_section2.offset().top + $color_section2.outerHeight(true);
const $product_list2 = $('.product2._2, .product2._3');

const getViewDetail = () => {
  const view_top = $(window).scrollTop();
  const view_height = $(window).height();
  const view_bottom = view_top + view_height;

  return {
    view_top, view_height, view_bottom
  };
}


const setClipPath = ($ele, inset) => {
  if ($product_list.css('clip-path') === inset) {
    return;
  }

  $ele.css({
    'clip-path': inset,
    '-webkit-clip-path': inset,
  });
}

const scrollTopMonitor = () => {
  const view_detail = getViewDetail();

  //
  if (view_detail.view_top < color_section_top) {
    const inset = 'inset(100% 0px 0px 0px)';
    setClipPath($product_list, inset);
  }

  //
  if (view_detail.view_bottom > color_section_bottom) {
    const inset = 'inset(0% 0px 0px 0px)';
    setClipPath($product_list, inset);
  }

  if (view_detail.view_top >= color_section_top &&
    view_detail.view_bottom <= color_section_bottom) {
    // console.log('in sec: ' + view_top);

    $product_list.each((index, ele) => {
      // 第 index 層 section  bottom 位置
      const current_section_bottom = (color_section_top + (view_detail.view_height * (index + 1)));
      // console.log($ele.attr('class') + ': ' + color_section_bottom);

      // 目前 view_top 在該層佔多少百分比
      let inset_value = (current_section_bottom - view_detail.view_top) / view_detail.view_height * 100;
      // 極值保護: 不小於 0，不大於 100
      inset_value =
        Math.min(
          100,
          Math.max(0, inset_value)
        );
      setClipPath($(ele), `inset(${inset_value}% 0px 0px 0px)`);
    });
  }
  window.requestAnimationFrame(scrollTopMonitor);
}
window.requestAnimationFrame(scrollTopMonitor);



const scrollTopMonitor2 = () => {
  const view_detail = getViewDetail();

  //
  if (view_detail.view_top < color_section_top2) {
    const inset = 'inset(0px 100% 0px 0px)';
    if ($product_list2.css('clip-path') !== inset) {
      setClipPath($product_list2, inset);
    }
  }

  //
  if (view_detail.view_bottom > color_section_bottom2) {
    const inset = 'inset(0px 0% 0px 0px)';
    setClipPath($product_list2, inset);
  }

  if (view_detail.view_top >= color_section_top2 &&
    view_detail.view_bottom <= color_section_bottom2) {
    // console.log('in sec: ' + view_top);

    $product_list2.each((index, ele) => {
      // 第 index 層 section  bottom 位置
      const current_section_bottom2 = (color_section_top2 + (view_detail.view_height * (index + 1)));
      // console.log($(ele).attr('class') + ': ' + current_section_bottom2);

      // 目前 view_top 在該層佔多少百分比
      let inset_value = (current_section_bottom2 - view_detail.view_top) / view_detail.view_height * 100;
      // 極值保護: 不小於 0，不大於 100
      inset_value =
        Math.min(
          100,
          Math.max(0, inset_value)
        );
      // console.log(inset_value);
      setClipPath($(ele), `inset(0px ${inset_value}% 0px 0px)`);
    });
  }
  window.requestAnimationFrame(scrollTopMonitor2);
}
window.requestAnimationFrame(scrollTopMonitor2);
