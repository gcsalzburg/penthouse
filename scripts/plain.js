
// CORS function from https://plainjs.com/javascript/ajax/making-cors-ajax-get-requests-54/
function getCORS(url, success) {
   var xhr = new XMLHttpRequest();
   if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
   xhr.open('GET', url);
   xhr.onload = success;
   xhr.send();
   return xhr;
}

// Adapted from: https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
String.prototype.toTitlecase = function() {
   return this.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
}


// Converts a timestamp into UTC time
// From: https://stackoverflow.com/a/14006555/10240581
function convertDateToUTC(date) { 
   return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
}