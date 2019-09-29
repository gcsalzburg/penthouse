var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

var point_styles = ['circle', 'triangle', 'rect', 'star'];

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