'use strict';
$(document).ready(function(){
  const submit = $('#getNewPost');  
  function getWiki(){
    var input = $("#wikiInput").val().toLowerCase();
    // console.log(input);
    var remoteUrlWithOrigin = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=" + input + "&format=json&rnlimit=10";
    $.getJSON(remoteUrlWithOrigin, (data) =>{
      // console.log(data[1]);
      var output = $('.datum');
      $('.search').css("top","0");
      for(var i = 0; i< data[1].length; i++){
        $('.data').append("<div class='datum'>" + data[1][i] + "<div class='info'>" + data[2][i] + "</div>");
      // console.log(data[2][i]); 
      }
      // console.log(data[1][1]);
      // $('#submission').html(data);
    });
  }
  submit.on('click', getWiki);  
});