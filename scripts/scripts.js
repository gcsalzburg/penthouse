
// Container for temperature data
var temp_json;	

// Create graph with appropriate formatting
var ctx = document.getElementById('myChart').getContext('2d');

// Initiate chart
var chart = new Chart(ctx, config);

// Fetch data
function load_new_data(display_date){

   getCORS('https://mqtt.designedbycave.co.uk/temps/'+display_date.toISOString().substr(0,10), function(request){

      // Get response as JSON
      var response_data = JSON.parse(request.currentTarget.response || request.target.responseText);

      // Clear existing data
      chart.data.datasets = [];
               
      // Temperature data object
      temp_data = response_data.data;

      // Iterate over each device
      for(var device of Object.keys(temp_data)) {
         // Create map function to get x,y values from temperature and timestamp
         var points = temp_data[device].map(function(e) {
            return {
             //  x: convertDateToUTC(new Date(e.ts*1000)),
               x: new Date(e.ts*1000),
               y: e.message
            };
         });

         // Cheeky copy of object the budget way https://stackoverflow.com/a/10869248/10240581
         var new_dataset = JSON.parse(JSON.stringify(dataset_template));
         
         // Add new properties
         new_dataset.label       = device.replace("-"," ").toTitlecase(),
         new_dataset.pointStyle  = point_styles[0];
         new_dataset.data        = points;

         // Add data to graph
         chart.data.datasets.push(new_dataset);
      };

      // Set range for graph (in case ends are missing)
      chart.config.options.scales.xAxes[0].time.min = new Date(response_data.range[0]*1000);
      chart.config.options.scales.xAxes[0].time.max = new Date(response_data.range[1]*1000);

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