var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

var point_styles = ['circle', 'triangle', 'rect', 'star'];

var dataset_template = {
   fill: false,
   pointRadius: 2,
   pointBorderWidth: 0,
   pointBackgroundColor: 'rgba(255,255,255,1)',
   showLine: true,
   borderColor: 'rgba(255,255,255,1)',
   borderWidth: 2,
   cubicInterpolationMode: 'monotone'
};

var config = {
   type: 'scatter',
   data: {
      datasets: []
   },
   options: {
      animation: {
         duration: 0,
      },
      legend: {
         display: false,
      },
      scales: {
         yAxes: [{
            type: 'linear',
            ticks: {
               suggestedMin: 0,
               suggestedMax: 40,
               fontColor: 'rgba(255,255,255,0.7)',
               fontFamily: 'Open Sans',
               fontSize: 16,
               padding: 15,
               callback: function(value){
                  return value + '°';
                 },
            },
            gridLines: {
               color: 'rgba(255,255,255,0.5)',
               lineWidth: 1,
               drawBorder: false,
            }
         }],
         xAxes: [{
            type: 'time',
            time: {
               unit: 'hour'
            },
            gridLines: {
               color: 'rgba(255,255,255,0.5)',
               lineWidth: 1,
               drawBorder: false,
            },
            ticks: {
               fontColor: 'rgba(255,255,255,0.7)',
               fontFamily: 'Open Sans',
               fontSize: 16,
               padding: 15,
               callback: function(value) { 
                  if(value.toUpperCase() == "12AM"){
                     return "Midnight";
                  }else if(value.toUpperCase() == "12PM"){
                     return "Noon";
                  }else{
                     return value; 
                  }
              },
            }
         }],
      },
      tooltips: {
         xPadding: 10,
         yPadding: 10,
         caretSize: 8,
         displayColors: false,
         callbacks: {
            label: function(tooltipItem, data) {
                return data.datasets[tooltipItem.datasetIndex].label + ": " + tooltipItem.yLabel + "°";
            },
            afterBody: function(tooltipItem, data) {
               // Add date in a second row of text
               // For more rows, add more items to this array
               return [tooltipItem[0].xLabel];
           }
        }
      }
   }
};