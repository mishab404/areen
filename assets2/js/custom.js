/*-----------------------------------------------------------------------------------

    Js INDEX

    ===================

    ## count-number
    ## custome index
    ## close butten
    ## logodata about-page
    ## comment-slide  about-page
    ## quantity
    ## loader
    ## Restaurant Сard Page info
    ## aos
    ## menu-btn
    ## mobile-nav

----------------------------------------------------------------------------------- */

/*---------   count-number    ----------------*/
(function($) {
  $.fn.countTo = function(options) {
    options = options || {};

    return $(this).each(function() {
      
      var settings = $.extend(
        {},
        $.fn.countTo.defaults,
        {
          from: $(this).data("from"),
          to: $(this).data("to"),
          speed: $(this).data("speed"),
          refreshInterval: $(this).data("refresh-interval"),
          decimals: $(this).data("decimals")
        },
        options
      );

      // how many times to update the value, and how much to increment the value on each update
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;

      // references & variables that will change with each update
      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data("countTo") || {};

      $self.data("countTo", data);

      // if an existing interval can be found, clear it first
      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);

      // initialize the element with the starting value
      render(value);

      function updateTimer() {
        value += increment;
        loopCount++;

        render(value);

        if (typeof settings.onUpdate == "function") {
          settings.onUpdate.call(self, value);
        }

        if (loopCount >= loops) {
          // remove the interval
          $self.removeData("countTo");
          clearInterval(data.interval);
          value = settings.to;

          if (typeof settings.onComplete == "function") {
            settings.onComplete.call(self, value);
          }
        }
      }

      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0, // the number the element should start at
    to: 0, // the number the element should end at
    speed: 1000, // how long it should take to count between the target numbers
    refreshInterval: 100, // how often the element should be updated
    decimals: 0, // the number of decimal places to show
    formatter: formatter, // handler for formatting the value before rendering
    onUpdate: null, // callback method for every time the element is updated
    onComplete: null // callback method for when the element finishes updating
  };

  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }
})(jQuery);

/*---------   count-number  ----------------*/

jQuery(function($) {
  // custom formatting example
  $(".count-number").data("countToOptions", {
    formatter: function(value, options) {
      return value
        .toFixed(options.decimals)
        .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
    }
  });

  // start all the timers
  $(".timer").each(count);

  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data("countToOptions") || {});
    $this.countTo(options);
  }
});
/*---------   custome index  ----------------*/
$(document).ready(function(){
if ( $.isFunction($.fn.owlCarousel) ) {
      $('.custome').owlCarousel({
           items: 1,
          loop: true,
          margin: 10,
          dot:false,
          nav:true,
          navText: ["<i class='fa-solid fa-arrow-left'></i>","<i class='fa-solid fa-arrow-right'></i>"]
        });
    }
/*---------  close butten  ----------------*/
$(".closeButton").click(function () {
    $(this).parent().remove();
});
/*---------   logodata about-page  ----------------*/
    if ( $.isFunction($.fn.owlCarousel) ) {
    $('.logodata').owlCarousel({
    loop:true,
    dot:false,
    nav:false,
    // autoplay:true,
    // autoplayTimeout:2000,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:5
        }
      }
    })
  }
/*---------  comment-slide  about-page  ----------------*/
  if ( $.isFunction($.fn.owlCarousel) ) {
  $('.comment-slide').owlCarousel({
    stagePadding: 100,
    loop:true,
    nav:true,
    margin:10,
    dot:false,
    autoplay:false,
    autoplayTimeout:3000,
    navText: ["<i class='fa-solid fa-arrow-left'></i>","<i class='fa-solid fa-arrow-right'></i>"],
    responsive:{
        0:{
            stagePadding: 0,
            loop:false,
            items:1
        },
        600:{
            stagePadding: 0,
            loop:false,
            items:1
        },
        1000:{
            items:2
        }
    }
})
}


});
/*----------------   quantity  -----------------------*/
var QtyInput = (function () {
  var $qtyInputs = $(".qty-input");

  if (!$qtyInputs.length) {
    return;
  }

  var $inputs = $qtyInputs.find(".product-qty");
  var $countBtn = $qtyInputs.find(".qty-count");
  var qtyMin = parseInt($inputs.attr("min"));
  var qtyMax = parseInt($inputs.attr("max"));

  $inputs.change(function () {
    var $this = $(this);
    var $minusBtn = $this.siblings(".qty-count--minus");
    var $addBtn = $this.siblings(".qty-count--add");
    var qty = parseInt($this.val());

    if (isNaN(qty) || qty <= qtyMin) {
      $this.val(qtyMin);
      $minusBtn.attr("disabled", true);
    } else {
      $minusBtn.attr("disabled", false);
      
      if(qty >= qtyMax){
        $this.val(qtyMax);
        $addBtn.attr('disabled', true);
      } else {
        $this.val(qty);
        $addBtn.attr('disabled', false);
      }
    }
  });

  $countBtn.click(function () {
    var operator = this.dataset.action;
    var $this = $(this);
    var $input = $this.siblings(".product-qty");
    var qty = parseInt($input.val());

    if (operator == "add") {
      qty += 1;
      if (qty >= qtyMin + 1) {
        $this.siblings(".qty-count--minus").attr("disabled", false);
      }

      if (qty >= qtyMax) {
        $this.attr("disabled", true);
      }
    } else {
      qty = qty <= qtyMin ? qtyMin : (qty -= 1);
      
      if (qty == qtyMin) {
        $this.attr("disabled", true);
      }

      if (qty < qtyMax) {
        $this.siblings(".qty-count--add").attr("disabled", false);
      }
    }

    $input.val(qty);
  });
})();
/*---------   loader  ----------------*/
$(window).on('load',function(){
  setTimeout(function(){ 
  $('.page-loader').fadeOut();
  });
});

/*---------  Restaurant Сard Page info  ----------------*/

$( ".info" ).click(function() {
  //$( ".dish-info" ).show('slow');
   $(this).parent().parent().parent().hide('slow');
  $(this).parent().parent().parent().next().show('slow');
  

});

$( ".info2" ).click(function() {
  $(this).parent().hide('slow');
   $(this).parent().prev().show('slow');
  //$('.dish-foods').show('slow');
});
/*---------  AOS  ----------------*/
//AOS animation 11
        AOS.init({
          once:true
});
/*---------      menu-btn   -------------------*/
$('.menu-btn').on('click', function () {
    $('body.menu-layer').addClass('active');
    return false;
  });
  $('.menu-cls-btn').on('click', function () {
    $('body.menu-layer').removeClass('active');
    return false;
  });
/*---------   mobile-nav    ----------*/  
$(document).ready(function(){
 

          jQuery('.mobile-nav .menu-item-has-children').on('click', function($) {

          jQuery(this).toggleClass('active');

        }); 



        jQuery('#nav-icon4').click(function($){

           // jQuery(this).toggleClass('open');

            jQuery('#mobile-nav').toggleClass('open');

        });



        jQuery('#res-cross').click(function($){

           jQuery('#mobile-nav').removeClass('open');

            //jQuery('#nav-icon4').removeClass('open')

        });


        jQuery('.bar-menu').click(function($){

           // jQuery(this).toggleClass('open');

            jQuery('#mobile-nav').toggleClass('open');
            jQuery('#mobile-nav').toggleClass('hmburger-menu');
            jQuery('#mobile-nav').show();

        });



        jQuery('#res-cross').click(function($){

           jQuery('#mobile-nav').removeClass('open');

            //jQuery('#nav-icon4').removeClass('open')

        });
});
