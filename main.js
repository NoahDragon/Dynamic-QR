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
    console.log(data);
    var dest = getUrlParameter('dest');
    const url = data[dest].url;
    var author;
    if (data[dest].author && !data[dest].author.trim()) {
      author = data[dest].author;
    }

    $.getJSON(url, function(data) {
      console.log(data);
      var len = data.length;
      for (var i = len-1; i >= 0; i--) {
        var matches = data[i].body.match(/\bhttps?:\/\/\S+/gi);

        if (matches && ( !author || (author && author === data[i].user.login))) { // contain url
          window.location.replace(matches[0]); // If have multiple url only the first one will be used.
        }
      }
    });

  });
}