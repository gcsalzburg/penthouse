
// Container for temperature data
var temp_json;	

// Create graph with appropriate formatting
var ctx = document.getElementById('myChart').getContext('2d');


// Initiate chart
var chart = new Chart(ctx, config);


// Fetch data
function load_data(display_date){

   getCORS('https://mqtt.designedbycave.co.uk/temps/'+display_date.toISOString().substr(0,10), function(request){
      var data = request.currentTarget.response || request.target.responseText;
               
      // Get temperature pairs
      temp_json = JSON.parse(data);

      // Create map function to get x,y values from temperature and timestamp
      var points = temp_json.map(function(e) {
         return {
            x: new Date(e.ts*1000),
            y: e.value
         };
      });

      // Update graph with temperature data
      chart.data.datasets[0].data = points;
      chart.update();
   });
}

// CORS function from https://plainjs.com/javascript/ajax/making-cors-ajax-get-requests-54/
function getCORS(url, success) {
   var xhr = new XMLHttpRequest();
   if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
   xhr.open('GET', url);
   xhr.onload = success;
   xhr.send();
   return xhr;
}

// Reference for today's date
var display_date = new Date();

// Do initial data load
set_date_label(display_date);
load_data(display_date);


// event handler function
function handler(e) {
   var key = window.event ? e.keyCode : e.which;
   if(key == 37){
      // back a day
      display_date.setDate(display_date.getDate()-1);

      set_date_label(display_date);
      load_data(display_date);
   }else if(key == 39){
      // forward a day
      display_date.setDate(display_date.getDate()+1);

      set_date_label(display_date);
      load_data(display_date);
   }
}

function set_date_label(input_date){

   // WHAT A MESS!!
   var input_string = input_date.toISOString().substr(0,10);
   var today = new Date();
   var today_string = today.toISOString().substr(0,10);
   var yesterday = new Date();
   yesterday.setDate(today.getDate()-1);
   var yesterday_string = yesterday.toISOString().substr(0,10);

   var label_div = document.getElementById('date_title');

   // Compare
   if(input_date.getTime() > today.getTime()){
      label_div.innerHTML = "FUTURE";
   }else if(input_string === today_string) {
      label_div.innerHTML = "TODAY";
   }else if( yesterday_string == input_string){
      label_div.innerHTML = "YESTERDAY";
   }else if( today.getMonth() == input_date.getMonth()){
      label_div.innerHTML = getOrdinalNum(input_date.getDate());
   }else if( today.getFullYear() == input_date.getFullYear()){
      label_div.innerHTML = getOrdinalNum(input_date.getDate()) + " " + months[input_date.getMonth()];
   }else{
      label_div.innerHTML = getOrdinalNum(input_date.getDate()) + " " + months[input_date.getMonth()] + input_date.getFullYear();
   }
}

function getOrdinalNum(n) {
   return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}

// attach handler to the keydown event of the document
if (document.attachEvent) document.attachEvent('onkeydown', handler);
else document.addEventListener('keydown', handler);
