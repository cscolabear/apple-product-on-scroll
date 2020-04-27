// http://rocksaying.tw/archives/25899028.html
String.prototype.interpolate = function()
{
    if (arguments.length < 1) // do nothing
        return this;

    var s = this;
    var args = arguments;
    // see ECMA-262 3rd edition, 15.5.4.11 String.prototype.replace.


    return s.replace(/\{\d+\}/g, function(matched, offset, src) {
        var k = matched.substring(1,matched.length-1); // index base from 0.


        return (args[k] !== 'undefined' ? args[k] : matched);
    });
}

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

/**
 * @param jqueryDom $container_ele 主要容器
 * @param jqueryDomList $products  需要被檢查 inset 對像列表 e.g. $('.product._2, .product._3')
 * @param string inset_tpl         'inset({0}% 0px 0px 0px)'
 */
const scrollTopMonitor = ($container_ele, $products, inset_tpl) => {
  const container_detail = getEleDetail($container_ele);
  const view_detail = getViewDetail();

  //
  if (view_detail.top < container_detail.top) {
    setClipPath($products, inset_tpl.interpolate(100));
  }

  //
  if (view_detail.bottom > container_detail.bottom) {
    setClipPath($products, inset_tpl.interpolate('0'));
  }

  if (view_detail.top >= container_detail.top &&
    view_detail.bottom <= container_detail.bottom) {
      // console.log('in sec: ' + view_detail.top);

    $products.each((index, product_ele) => {
      // 第 index 層 section  bottom 位置
      const current_section_bottom = (container_detail.top + (view_detail.height * (index + 1)));

      // 目前 view_top 在該層佔多少百分比
      let inset_value = (current_section_bottom - view_detail.top) / view_detail.height * 100;
      // 極值保護: 不小於 0，不大於 100
      inset_value =
        Math.min(
          100,
          Math.max(0, inset_value)
        );
      // console.log(inset_value);
      setClipPath($(product_ele), inset_tpl.interpolate(inset_value));
    });
  }
  window.requestAnimationFrame(() => scrollTopMonitor($container_ele, $products, inset_tpl));
}
window.requestAnimationFrame(() => scrollTopMonitor($('.color-section'), $product_list, 'inset({0}% 0px 0px 0px)'));
window.requestAnimationFrame(() => scrollTopMonitor($('.color-section-2'), $product_list2, 'inset(0px {0}% 0px 0px)'));
