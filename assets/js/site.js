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
  document.getElementById('cbmContactoSede').addEventListener('change', mapaSedeLima, false);
});

$('#terminos-condiciones').click(function(){
  $('#modalBottom').empty();
  $('#modalBottom').css('max-height', '75%');
  var template = null;
	$.ajax({
	   url: BASE_URL + '/modals/terminos-condiciones.html',
	   type: 'GET',
	   async: false,
	   success: function(source) {
	     template = source;
	   }
	});
  $('#modalBottom').append(template);
  var btnModal = document.getElementById('modal-bottom-btn');
  btnModal.click();
});

function myMap(latitud, longitud, contentString, title) {
  if(latitud == null){
    latitud = -12.097211298666057;
  }
  if(longitud == null){
    longitud = -77.03266450118309;
  }
  if(title == null){
    title = '<b>CEDE CENTRAL</b>';
  }
  if(contentString == null){
    contentString = title + '<br>' + 'AV. JUAN DE ARONA 425, <br>San Isidro, Lima, Perú';
  }else{
    contentString = '<b>' + title + '</b>' + '<br>' + contentString;
  }
  var mapOptions = {
    center: new google.maps.LatLng(latitud, longitud),
    zoom: 15,
  }
  var map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  var image = BASE_URL + '/assets/img/marker.png';
  var marker = new google.maps.Marker({
    position: {
      lat: parseFloat(latitud),
      lng: parseFloat(longitud),
    },
    map: map,
    icon: image,
    title: title,
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  infowindow.open(map,marker);
}

function llenarCombo(idCombo, uri){
  $.ajax({
	  url: API_URL + uri,
	  type: 'GET',
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
  var sedeId = this.value;
  $('#modalPopUp').empty();
  $.ajax({
	  url: API_URL + 'sede/director_odontologos/' + sedeId,
	  type: 'GET',
	  async: false,
    data: {},
		headers: {
			[CSRF_KEY]: CSRF,
		},
	  success: function(data) {
      var data = JSON.parse(data);
      var odontologos = data.odontologos;
      var director = data.director;
      var modalBody = '<div class="modal-content"><h4 class="color-primary bold">SEDE ' + director.sede + '</h4>';
      var modalBody = modalBody + '<p class="bold">' + director.director + '<br>' + director.titulo + '</p>';
      var tabla = '<table class="striped"><thead class="color-primary"><tr class="bold"><th>APELLIDOS</th><th>NOMBRE(S)</th><th>ESPECIALIDAD</th><th>COP</th><th>RNE</th></tr></thead><tbody>';
	    for(var i = 0; i < odontologos.length; i++){
        tabla = tabla + '<tr>';
        tabla = tabla + '<td>';
        tabla = tabla + odontologos[i].paterno + ' ' + odontologos[i].materno;
        tabla = tabla + '</td>';
        tabla = tabla + '<td>';
        tabla = tabla + odontologos[i].nombres;
        tabla = tabla + '</td>';
        tabla = tabla + '<td>';
        tabla = tabla + odontologos[i].especialidad;
        tabla = tabla + '</td>';
        tabla = tabla + '<td>';
        tabla = tabla + odontologos[i].cop;
        tabla = tabla + '</td>';
        tabla = tabla + '<td>';
        tabla = tabla + odontologos[i].rne;
        tabla = tabla + '</td>';
        tabla = tabla + '</tr>';
      }
      tabla = tabla + '</tbody></table>';
      modalBody = modalBody + tabla;
      modalBody = modalBody + '</div>';
      document.getElementById('modalPopUp').innerHTML = modalBody;
	  }
	});
  var btnModal = document.getElementById('modal-popup-btn');
  btnModal.click();
}

function cargasSedes(){
  var departamentoId = this.value;
  $.ajax({
	  url: API_URL + 'sede/departamento/' + departamentoId,
	  type: 'GET',
	  async: false,
    data: {},
		headers: {
			[CSRF_KEY]: CSRF,
		},
	  success: function(data) {
      var data = JSON.parse(data);
      var combo = document.getElementById('cbmContactoSede');
      $('#cbmContactoSede').empty();
      if(departamentoId == 0){
        for(var i = 0; i < data.length; i++){
          var option = document.createElement('option');
          option.value = data[i].id;
          option.text = data[i].nombre;
          option.setAttribute('latitud', data[i].latitud);
          option.setAttribute('longitud', data[i].longitud);
          option.setAttribute('direccion', data[i].direccion);
          option.setAttribute('title', 'SEDE ' + data[i].nombre);
          combo.appendChild(option);
          document.getElementById('cbmContactoSede').disabled = false;
        }
        myMap(data[0].latitud, data[0].longitud);
      }else{
        var option = document.createElement('option');
        option.value = data.id;
        option.text = 'SEDE ' + data.nombre;
        combo.appendChild(option);
        document.getElementById('cbmContactoSede').disabled = true;
        var latitud = data.latitud;
        var longitud = data.longitud;
        var contentString = data.direccion;
        var title = '<b>SEDE ' + data.nombre+ '</b>';
        myMap(latitud, longitud, contentString, title);
      }
      $('#cbmContactoSede').formSelect();
	  }
	});
}

function mapaSedeLima(){
  var option = document.getElementById('cbmContactoSede').options[this.value];
  var latitud = parseFloat(option.getAttribute('latitud'));
  var longitud = parseFloat(option.getAttribute('longitud'));
  var contentString = option.getAttribute('direccion');
  var title = option.getAttribute('title');
  myMap(latitud, longitud, contentString, title);

}
