document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.parallax');
  var instances = M.Parallax.init(elems);
});

// Or with jQuery

$(document).ready(function(){
  $('.parallax').parallax();

  $(window).scroll(function(){
    if($(window).scrollTop() > 300){
  	  $('nav').addClass('white');
      $('#nav-mobile li a').addClass('color-primary');
      $('.brand-logo img').attr('src',BASE_URL + '/assets/img/logo-coa.png');
    }else{
  	  $('nav').removeClass('white');
      $('#nav-mobile li a').removeClass('color-primary');
      $('.brand-logo img').attr('src',BASE_URL + '/assets/img/logo-coa-blanco.png');
    }
  })
});
