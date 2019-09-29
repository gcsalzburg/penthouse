
// Container for temperature data
var temp_json;	

// Create graph with appropriate formatting
var ctx = document.getElementById('myChart').getContext('2d');

// Initiate chart
var chart = new Chart(ctx, config);

// Fetch data
function load_new_data(display_date){

   getCORS('https://mqtt.designedbycave.co.uk/temps/'+display_date.toISOString().substr(0,10), function(request){
      var data = request.currentTarget.response || request.target.responseText;
               
      // Get temperature pairs
      temp_json = JSON.parse(data);
      // Create map function to get x,y values from temperature and timestamp
      var points1 = temp_json["living-space"].map(function(e) {
         return {
            x: new Date(e.ts*1000),
            y: e.value
         };
      });
      chart.data.datasets[0].data = points1;
      
      var points2 = temp_json["fridge"].map(function(e) {
         return {
            x: new Date(e.ts*1000),
            y: e.value
         };
      });
      chart.data.datasets[1].data = points2;

      // Update graph with temperature data
      chart.update();
      
      // Draw new label in background
      set_date_label(display_date);
   });
}

// Reference for today's date
var display_date = new Date();

// Do initial data load
load_new_data(display_date);

// keydown handler function
keydown_handler = function(e){
   var key = window.event ? e.keyCode : e.which;
   if(key == 37){
      // back a day
      display_date.setDate(display_date.getDate()-1);
      load_new_data(display_date);
   }else if(key == 39){
      // forward a day
      display_date.setDate(display_date.getDate()+1);
      load_new_data(display_date);
   }
};
if (document.attachEvent){
   document.attachEvent('onkeydown', keydown_handler);
}else{
    document.addEventListener('keydown', keydown_handler);
}

// Set the graph label in the background of the page
function set_date_label(input_date){

   // Create references to today and yesterday
   var today = new Date();
   var yesterday = new Date();
   yesterday.setDate(today.getDate()-1);

   var label_div = document.getElementById('date_title');

   // Compare
   if(input_date.getTime() > today.getTime()){
      label_div.innerHTML = "FUTURE";
   }else if(today.toISOString().substr(0,10) === input_date.toISOString().substr(0,10)) {
      label_div.innerHTML = "TODAY";
   }else if( yesterday.toISOString().substr(0,10) == input_date.toISOString().substr(0,10)){
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