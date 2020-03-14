function openNav() {
    document.getElementById("myNav").style.height = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.height = "0%";
  }
  
  $(window).scroll(function () {
    if ($(this).scrollTop() > 80) {
      $('.navbar').addClass("sticky");
      $('.navbar').css({"background-color": "#fff", "transition": "0.5s all"});
    } else {
      $('.navbar').removeClass("sticky");
      $('.navbar').css({"background-color": "transparent"});
  
    }
  });
  $( document ).ready(function() {
    $(".tab").click(function () {
      $(".menu li").removeClass("active");
      $(this).addClass("active");   
      });
  });
  $('.menu li a').click(function () {
    $('#myNav').css("height", "0%");
  });
  
  $(document).ready(function () {
    $(document).mouseup(function(e) 
    {
      
      var cont = $("#search_ip");
      if (!cont.is(e.target) && cont.has(e.target).length === 0) 
      {
          cont.hide();
      }
    $(".serch").click(function () {
      $("#search_ip").toggle();
    });
  });
});

// When the user clicks on the button, scroll to the top of the document
$(document).ready(function () {
    $("#scroll_btn").click(function (event) {
      event.preventDefault();
      $("html, body").animate({
        scrollTop: 0
      }, "slow");
      return false;
    });
  
  });
  /* Scroll Top Function end */
  /* Scroll Down Start  */
  $(document).ready(function () {
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
  });
  
  /* Scroll Down end */
  /* Scroll Top Function start */
        window.onscroll = function() {scrollFunction()};
  
           function scrollFunction() {
             if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
               document.getElementById("scroll_btn").style.display = "block";
             } else {
               document.getElementById("scroll_btn").style.display = "none";
             }
           }
  
           // When the user clicks on the button, scroll to the top of the document
           $(document).ready(function() {
               $("#scroll_btn").click(function(event) {
                   event.preventDefault();
                   $("html, body").animate({ scrollTop: 0 }, "slow");
                   return false;
               });
  
           });         
  /* Scroll Top Function end */ 


// Login Page
var myInput = document.getElementById("psw");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

var conPass = document.getElementById("conformpass");
var cpassmsg = document.getElementById("cpassmsg");
conPass = " ";
myInput = " ";
conPass.onkeyup = function() {

  if((conPass.value == myInput.value)) {  
  cpassmsg.classList.remove("invalid");
  cpassmsg.classList.add("valid");
  } else {
  cpassmsg.classList.remove("valid");
  cpassmsg.classList.add("invalid");
  }

}
// When the user starts to type something inside the password field
myInput.onkeyup = function() {

  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
  letter.classList.remove("invalid");
  letter.classList.add("valid");
  } else {
  letter.classList.remove("valid");
  letter.classList.add("invalid");
  }
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
  capital.classList.remove("invalid");
  capital.classList.add("valid");
  } else {
  capital.classList.remove("valid");
  capital.classList.add("invalid");
  }
  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
  number.classList.remove("invalid");
  number.classList.add("valid");
  } else {
  number.classList.remove("valid");
  number.classList.add("invalid");
  }
  // Validate length
  if(myInput.value.length >= 8) {
  length.classList.remove("invalid");
  length.classList.add("valid");
  } else {
  length.classList.remove("valid");
  length.classList.add("invalid");
  }

}


// Register Page
function validation(){
var Username = document.getElementById('username').value;
var Password = document.getElementById('password').value;
var Conformpass = document.getElementById('conformpass').value;
var Email = document.getElementById('email').value;
var mobileno = document.getElementById('mobileno').value;

var usercheck = /^[A-Za-z. ]{3,30}$/ ;
var passcheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})/ ;
var emailcheck = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ ;
var mobilenocheck = /^(\+\d{1,3}[- ]?)?\d{10}$/ ;

if( usercheck.test(Username)){
document.getElementById('usererror').innerHTML = "";
}else {
document.getElementById('usererror').innerHTML = "**Please enter your username";
return false;
} 

if(passcheck.test(Password)){
document.getElementById('passworderror').innerHTML = "";
}else {
document.getElementById('passworderror').innerHTML = "**Please enter your password";
return false;
}
if(Conformpass.match(Password)){
document.getElementById('cpassworderror').innerHTML = "";
}else {
document.getElementById('cpassworderror').innerHTML = "** password is not matching";
return false;
}

if(emailcheck.test(Email)){
document.getElementById('emailerror').innerHTML = "";
}else {
document.getElementById('emailerror').innerHTML = "**Please enter your Email";
return false;
}

if( mobilenocheck.test(mobileno)){
document.getElementById('mobileerror').innerHTML = "";
}else {
document.getElementById('mobileerror').innerHTML = "**Please enter your Mobile no";
return false;
}
}


$(document).ready(function(){
  $('.m-top-search').click(function(){
    $('.search-box').toggle();
  });
});


// Admin
$(document).ready(function(){
  $('.hide_show a').click(function(){
    $('.sidebar').toggleClass("Amenu-space-remov");  
    var abc = $( "#myvideo" ).text();
    if(abc == ">"){
      $("#myvideo").text("<");
      $('.hide_show a').css({"transition-delay":"0.5s","border-radius":"0","border-top-right-radius":"50%","border-bottom-right-radius":"50%"});
    }else{
      $("#myvideo").text(">");
      $('.hide_show a').css({"transition-delay":"0.5s","border-radius":"0","border-top-right-radius":"50%","border-bottom-right-radius":"50%"});
    }
 });
});
