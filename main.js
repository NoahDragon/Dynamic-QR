function main() {
  var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          }
      }
  };

  var config = 'config.json';

  // Testing code
  var config = getUrlParameter('testconfig');

  // Actual logic
  config && $.getJSON(config, function(data) {
    testconfig && console.log(data);
    var dest = getUrlParameter('dest');
    const url = data[dest].url;
    const author = data[dest].author;

    $.getJSON(url, function(data) {
      testconfig && console.log(data);
    });

  });
}