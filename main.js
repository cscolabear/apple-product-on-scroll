const $product_list = $('.product._2, .product._3');
const $product_list2 = $('.product2._2, .product2._3');

const getEleDetail = ($ele) => {
  const top = $ele.offset().top;
  const height = $ele.outerHeight(true);
  const bottom = top + height;

  return {
    top, height, bottom
  };
}

const getViewDetail = () => {
  const top = $(window).scrollTop();
  const height = $(window).height();
  const bottom = top + height;

  return {
    top, height, bottom
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
  const ele_detail = getEleDetail($('.color-section'));
  const view_detail = getViewDetail();

  //
  if (view_detail.top < ele_detail.top) {
    const inset = 'inset(100% 0px 0px 0px)';
    setClipPath($product_list, inset);
  }

  //
  if (view_detail.bottom > ele_detail.bottom) {
    const inset = 'inset(0% 0px 0px 0px)';
    setClipPath($product_list, inset);
  }

  if (view_detail.top >= ele_detail.top &&
    view_detail.bottom <= ele_detail.bottom) {
    // console.log('in sec: ' + view_top);

    $product_list.each((index, ele) => {
      // 第 index 層 section  bottom 位置
      const current_section_bottom = (ele_detail.top + (view_detail.height * (index + 1)));
      // console.log($ele.attr('class') + ': ' + color_section_bottom);

      // 目前 view_top 在該層佔多少百分比
      let inset_value = (current_section_bottom - view_detail.top) / view_detail.height * 100;
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
  const ele_detail = getEleDetail($('.color-section-2'));
  const view_detail = getViewDetail();

  //
  if (view_detail.top < ele_detail.top) {
    const inset = 'inset(0px 100% 0px 0px)';
    if ($product_list2.css('clip-path') !== inset) {
      setClipPath($product_list2, inset);
    }
  }

  //
  if (view_detail.bottom > ele_detail.bottom) {
    const inset = 'inset(0px 0% 0px 0px)';
    setClipPath($product_list2, inset);
  }

  if (view_detail.top >= ele_detail.top &&
    view_detail.bottom <= ele_detail.bottom) {
      // console.log('in sec: ' + view_detail.top);

    $product_list2.each((index, ele) => {
      // 第 index 層 section  bottom 位置
      const current_section_bottom = (ele_detail.top + (view_detail.height * (index + 1)));
      // console.log($(ele).attr('class') + ': ' + current_section_bottom2);

      // 目前 view_top 在該層佔多少百分比
      let inset_value = (current_section_bottom - view_detail.top) / view_detail.height * 100;
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
