$(document).ready(init);
var poke = '';
var url= '';
var end='autoip.json';
var conditions = '';
var forecast = '';
var urllocation = '';

function init() {
  $('.submit').click(button);
  urllocation = getUrl('geolookup');
  conditions = getUrl('conditions');
  forecast = getUrl('forecast');
  astronomy = getUrl('astronomy');
  getData();
}
function button(e){
  console.log("clicked button");
  if($('#zip').val()){
  end= $('#zip').val()+'.json';
  }
  else{
  end = $('#state').val()+'/'+snake($('#city').val())+'.json';
  }
  $('#tcurrent tr, #tforecast tr, span, .rem').remove();
  urllocation = getUrl('geolookup');
  conditions = getUrl('conditions');
  forecast = getUrl('forecast');
  astronomy = getUrl('astronomy');
  getData();
}

  function getUrl(input){
    return 'http://api.wunderground.com/api/8cffb182c1b00bca/'+input+'/q/'+end;
  }

function getData(){

  $.ajax({
    url: urllocation,
    method: 'GET',
    success: function(data){
    var state = $('<span>').text(data.location.state+', USA, Planet earth');
    var city = $('<span>').text(data.location.city+ ', ');
    $('#roWeird').append(city,state);
}
  });

  $.ajax({
    url: conditions,
    method: 'GET',
    success: function(data){
    var temp = $('<tr>').text(data.current_observation.temperature_string);
    var weather = $('<tr>').text(data.current_observation.weather);
    $('#tcurrent').prepend(weather,temp);
}
  });

  $.ajax({
    url: forecast,
    method: 'GET',
    success: function(data){
      var arr= [];
      var days = data.forecast.txt_forecast.forecastday
      for(var i=0; i<days.length; i++){
        arr.push($('<tr>').text('Day'+(i+1)+'- '+days[i].fcttext_metric));
        arr[i].append($('<br>'));
      }
    $('#tforecast').append(arr);
}
  });

  $.ajax({
    url: astronomy,
    method: 'GET',
    success: function(data){
    var astronomy = $('<th>').text('Astronomy').addClass('rem');
    var sunrise = $('<tr>').text('Sun rises in: '+data.moon_phase.sunrise.hour+ ' hour '+data.moon_phase.sunrise.minute+' minutes');
    var sunset = $('<tr>').text('Sun sets in: '+data.moon_phase.sunset.hour+ ' hour '+data.moon_phase.sunset.minute+' minutes');
    $('#tcurrent').append(astronomy,sunrise,sunset);
}
  });

}

function snake(str){
  if(str.split('').indexOf(' ')){
  str.split(' ').join('_');
}
return str;
}
