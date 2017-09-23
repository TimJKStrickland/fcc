$(document).ready(function(){
  var coders = ["HardlyDifficult", "ESL_SC2", "OgamingSC2", "adobe", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "brunokin"];
  var url = "https://wind-bow.glitch.me/twitch-api/";
  
  coders.map(channel=>{
    function makeURL(type, name) {
      return url + type + "/" + name + "/" + "?callback";
    };
    $.getJSON(makeURL("streams", channel), function(data) {
      let game,
      status;
      if(data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if(data.stream === undefined) {
        game = "Account closed";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      };
      $.getJSON(makeURL("channels", channel), function(data) {
          var logo = data.logo != null ? data.logo : "http://placehold.it/150x150",
            name = data.display_name != null ? data.display_name : channel,
            description = status === "online" ? "" : "";
            var html = 
                `<div class="row channel ${status}">
                  <img src=" ${logo}" class="logo">
                  <div class="name">
                    <a class="nameText" href="${data.url}" target="_blank">${name}</a>
                    <div class="game" id="streaming">${game}
                      <span class="hidden-xs">${description}</span>
                    </div>
                  </div>
                </div>`;
        status == "offline" ? $("#users").append(html) : $("#users").prepend(html);
      });
    });
  });
  $('.nav').click((clicked) => {
    var idVal = clicked.target.id;
    console.log(idVal);
    if(idVal === 'all'){
      $('#all').addClass('active');
      $('#on').removeClass('active');
      $('#off').removeClass('active');
       $(".online, .offline").removeClass("hidden");
    } else if (idVal === 'off'){
      $('#all').removeClass('active');
      $('#on').removeClass('active');
      $('#off').addClass('active');
      $("#online").addClass("active");
      $(".offline").removeClass("hidden");
      $(".online").addClass("hidden");
    } else {
      $('#all').removeClass('active');
      $('#off').removeClass('active');
      $('#on').addClass('active');
      $(".offline").addClass("hidden");
      $(".online").removeClass("hidden");
    }   
  });
});