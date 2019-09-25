
// CORS function from https://plainjs.com/javascript/ajax/making-cors-ajax-get-requests-54/
function getCORS(url, success) {
   var xhr = new XMLHttpRequest();
   if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
   xhr.open('GET', url);
   xhr.onload = success;
   xhr.send();
   return xhr;
}