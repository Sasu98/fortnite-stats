//Function from https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year ;
    return time;
  }
//

function selectOption(e){
  let item = e.innerHTML;
  e.parentElement.previousSibling.previousSibling.innerHTML = item;
}

function requestNews(){

  let news = $.ajax({
    method: "GET",
    url: "ajax.php",
    data: { request: "news" }
  })

  news.done(function( returned ) {
    let data = JSON.parse(returned);
    let html = "";
    data.forEach(function(element){
      html += `<li class="list-group-item">
        <h6>${element["title"]}</h6>
        <table style="display: block !important;"><tr>
        <td><img id="newsimg" src="${element["image"]}" width="100" height="100"></td>
        <td valign="top">${element["body"]} - <b>${timeConverter(element["time"])}</b></td>
      </tr></table></li>`;
    });

    $("#news-list").empty();
    $("#news-list").append(html);
  });
}
//requestNews();

var firstSearch = false;
var lastPlatform = "";
var lastSearch = "";
var loadingData = false

$("#username").on("keyup", function(event){
  let username = $("#username").val();
  let pf = $("#platform").text().toLowerCase();
  if (event.keyCode === 13 && !loadingData){
    if (pf == "console") alert("Elige la consola!");
    else if (username == "") alert("Escribe el usuario!");
    else if ((lastSearch != username || lastPlatform != pf) && pf != "console"){

      if (!firstSearch) {
        $("#news-list").empty().css("display", "none");
        firstSearch = true;
      }

      lastSearch = username;
      lastPlatform = pf;
      loadingData = true;
      $("#Player-data").empty().append("<ul class='list-group center'><li class='list-group-item'><img src='assets/loader.gif' width=50px height=50px></li></ul>");

      let userdata = $.ajax({
        method: "GET",
        url: "ajax.php",
        data: { request: "userdata", user: username, platform: (pf == "xbox" && "xb1" || pf) }
      })
      userdata.done(function(returned){
        loadingData = false;
        console.log(returned);

        if (returned !== "null"){
          let data = JSON.parse(returned);
          let pStats = data["stats"];

          let solo = `Total kills: ${pStats["kills_solo"]}<br>
          Won matches: ${pStats["placetop1_solo"]}<br>
          Played matches: ${pStats["matchesplayed_solo"]}<br>
          Playtime (min): ${pStats["minutesplayed_solo"]}<br>
          Total score: ${pStats["score_solo"]}<br>
          K/D: ${pStats["kd_solo"]}`;

          let duo = `Total kills: ${pStats["kills_duo"]}<br>
          Won matches: ${pStats["placetop1_duo"]}<br>
          Played matches: ${pStats["matchesplayed_duo"]}<br>
          Playtime (min): ${pStats["minutesplayed_duo"]}<br>
          Total score: ${pStats["score_duo"]}<br>
          K/D: ${pStats["kd_duo"]}`;

          let squad = `Total kills: ${pStats["kills_squad"]}<br>
          Won matches: ${pStats["placetop1_squad"]}<br>
          Played matches: ${pStats["matchesplayed_squad"]}<br>
          Playtime (min): ${pStats["minutesplayed_squad"]}<br>
          Total score: ${pStats["score_squad"]}<br>
          K/D: ${pStats["kd_squad"]}`;

          $("#news-list").append(`
            <li class="list-group-item"><h3>Epic account: ${username} - Season 5</h3></li>
            <li class="list-group-item"><h4>Player name: ${data["username"]}</h4></li>
            <li class="list-group-item"><h5>Platform: ${data["platform"]}</h5></li>
            `).css("display", "block");

          let html = `
            <div class="card userdata">
              <div class="card-body">
                <h5 class="card-title">Solo</h5>
                <p class="card-text">${solo}</p>
              </div>
            </div>

            <div class="card userdata">
              <div class="card-body">
                <h5 class="card-title">Duo</h5>
                <p class="card-text">${duo}</p>
              </div>
            </div>

            <div class="card userdata">
              <div class="card-body">
                <h5 class="card-title">Squad</h5>
                <p class="card-text">${squad}</p>
              </div>
            </div>
          `;

          $("#Player-data").empty().append(html);
        }
        else {
          $("#Player-data").empty();
          $("#news-list").empty().append(`<li class="list-group-item"><h5>Epic account ${username} not found. Try with other.</h5></li>`).css("display", "block");
        }
      })
    }
  }

})
