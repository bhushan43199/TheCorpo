$(document).ready(function () {
   
  $(window).scroll(function () {
    if ($(this).scrollTop() > 80) {
      $('.navbar').addClass("sticky");
      $('.navbar').css({
        "background-color": "#fff",
        "transition": "0.5s all"
      });
    } else {
      $('.navbar').removeClass("sticky");
      $('.navbar').css({
        "background-color": "transparent"
      });

    }
  });

  $(".tab").click(function () {
    $(".menu li").removeClass("active");
    $(this).addClass("active");
  });

  $('.menu li a').click(function () {
    $('#myNav').css("height", "0%");
  });

  $(document).mouseup(function (e) {

    var cont = $("#search_ip");
    if (!cont.is(e.target) && cont.has(e.target).length === 0) {
      cont.hide();
    }
    $(".serch").click(function () {
      $("#search_ip").toggle();
    });
  });
  $("#scroll_btn").click(function (event) {
    event.preventDefault();
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
    return false;
  });
  $(".ct-btn-scroll").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        window.location.hash = hash;
      });
    }
  });
  window.onscroll = function () {
    scrollFunction()
  };
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("scroll_btn").style.display = "block";
    } else {
      document.getElementById("scroll_btn").style.display = "none";
    }
  }
  $("#scroll_btn").click(function (event) {
    event.preventDefault();
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
    return false;
  });
})

// function openNav() {
//   document.getElementById("myNav").style.height = "100%";
// }

// function closeNav() {
//   document.getElementById("myNav").style.height = "0%";
// }

// $(window).scroll(function () {
//   if ($(this).scrollTop() > 80) {
//     $('.navbar').addClass("sticky");
//     $('.navbar').css({
//       "background-color": "#fff",
//       "transition": "0.5s all"
//     });
//   } else {
//     $('.navbar').removeClass("sticky");
//     $('.navbar').css({
//       "background-color": "transparent"
//     });

//   }
  
// });

