$(document).ready(function(){
  $('.parallax').parallax();
  $('.sidenav').sidenav();
  $('.slider').slider();
  $('.modal').modal();
  $('select').formSelect();

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
  });

  var elems = document.querySelectorAll('.slider');
  var instances = M.Slider.init(elems, {'height' : 770, 'indicators' : true});
});

$('#terminos-condiciones').click(function(){
  $('#modal1').empty();
  $('#modal-btn').click();
  $('#modal1').css('max-height', '50%');
  var template = null;
	$.ajax({
	   url: BASE_URL + '/modals/terminos-condiciones.html',
	   type: "GET",
	   async: false,
	   success: function(source) {
	     template = source;
	   }
	});
  $('#modal1').append(template);
  var btnModal = document.getElementById('modal-btn');
  btnModal.click();
});
