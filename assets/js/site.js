$(document).ready(function(){
  // componentes de marterialize
  $('.parallax').parallax();
  $('.sidenav').sidenav();
  $('.slider').slider();
  $('.modal').modal();
  // navbar
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
  // slider
  var elems = document.querySelectorAll('.slider');
  var instances = M.Slider.init(elems, {'height' : 770, 'indicators' : true});
  // cargar información a los selects
  llenarCombo('cbmObontologoDistrito', 'sede/lima');
  llenarCombo('cbmObontologoProvincia', 'sede/provincia');
  llenarCombo('cbmContactoDepartamento', 'sede/departamento');
  $('select').formSelect();
  document.getElementById('cbmObontologoDistrito').addEventListener('change', mostrarOdontologos, false);
  document.getElementById('cbmObontologoProvincia').addEventListener('change', mostrarOdontologos, false);
  document.getElementById('cbmContactoDepartamento').addEventListener('change', cargasSedes, false);
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

function myMap() {
  var mapOptions = {
    center: new google.maps.LatLng(-12.097211298666057, -77.03266450118309),
    zoom: 15,
  }
  var map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
}

function llenarCombo(idCombo, uri){
  $.ajax({
	  url: API_URL + uri,
	  type: "GET",
	  async: false,
    data: {},
		headers: {
			[CSRF_KEY]: CSRF,
		},
	  success: function(data) {
      var lista = JSON.parse(data);
      var combo = document.getElementById(idCombo);
	    for(var i = 0; i < lista.length; i++){
        var option = document.createElement('option');
        option.value = lista[i].id;
        option.text = lista[i].nombre;
        combo.appendChild(option);
      }
	  }
	});
}

function mostrarOdontologos(){
  alert(this.value);
}

function cargasSedes(){
  alert(this.value);
}
