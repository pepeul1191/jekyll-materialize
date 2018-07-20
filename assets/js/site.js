document.addEventListener('DOMContentLoaded', function() {

});

// Or with jQuery

$(document).ready(function(){
  $('.parallax').parallax();
  $('.sidenav').sidenav();

  $(window).scroll(function(){
    if($(window).scrollTop() > 300){
  	  $('nav').addClass('white');
      $('nav i.material-icons').addClass('color-primary');
      $('#nav-mobile li a').addClass('color-primary');
      $('.brand-logo img').attr('src',BASE_URL + '/assets/img/logo-coa.png');
    }else{
  	  $('nav').removeClass('white');
      $('#nav-mobile li a').removeClass('color-primary');
      $('nav i.material-icons').removeClass('color-primary');
      $('.brand-logo img').attr('src',BASE_URL + '/assets/img/logo-coa-blanco.png');
    }
  })
});
