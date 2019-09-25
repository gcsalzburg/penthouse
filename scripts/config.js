var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

var config = {
   type: 'scatter',
   data: {
      datasets: [{
         label: 'Temp Line',
         fill: false,
         pointRadius: 2,
         pointBorderWidth: 0,
         pointBackgroundColor: 'rgba(255,255,255,1)',
         showLine: true,
         borderColor: 'rgba(255,255,255,1)',
         borderWidth: 2,
         cubicInterpolationMode: 'monotone',
      }]
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
               suggestedMin: 16,
               suggestedMax: 40,
               fontColor: 'rgba(255,255,255,0.7)',
               fontFamily: 'Open Sans',
               fontSize: 16,
               padding: 15,
               callback: function(value, index, values){
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
            }
         }],
      },
   }
};