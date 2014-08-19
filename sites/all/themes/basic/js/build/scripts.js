
//# sourceMappingURL=scripts.map

(function($){
  $(document).ready(function() {
    // Execute code once the DOM is ready.

    //deadline for picks
    var deadline = 1905875600000;
    //var current_week = 1;
    var current_week = 1;

    var currentDate = new Date();
    var currentTime = currentDate.getTime();

    //alert(currentTime);

    //Adding Team Names as Classes
    $("#block-views-available_picks-block .views-row").each(function(index, value) {
      var team_name_class = $(".views-field-title span", this).text().replace(/ /g, '-').toLowerCase();
      $(this).removeClass("views-row-odd views-row-even views-row-first views-row-last");
      $(this).addClass(team_name_class);
    });

    $(".submission").each(function(index, value) {
      var team_name_class = $(this).text().replace(/_/g, '-').toLowerCase();
      $(this).removeClass("views-row-odd views-row-even views-row-first views-row-last");
      $(this).addClass(team_name_class);
    });

    //Selected Pick
    $("#block-views-available_picks-block .views-row").click(function() {
      var picked_team = $(".views-field-title span", this).text();

      if(currentTime <= deadline) {

        $("body").append("<div id=\"matchup\"><div id=\"cancel\" class=\"outline-inward\"></div><div id=\"submit\" class=\"outline-inward\"></div></div>");
        $("#matchup").show();

        if($("#matchup").length) {
          $("#block-views-available_picks-block").hide();
          showMatchupBlock(picked_team);

          $("#submit").click(function() {

            $.ajax({
              type: "POST",
              url: "save_teams",
              data: { 
                      team_name: picked_team, 
                      week: current_week, 
                      current_date: currentTime
                    },
              success: function(data) {
                alert('Success!');
              },
              error: function(httpRequest, textStatus, errorThrown) { 
               alert("Uh-oh something went wrong. Please contact the admin. status = " + textStatus + ", error = " + errorThrown);
              }
            });
          });
        }
        
        switch($("#matchup").text()) {
          case "Pittsburgh Steelers":
            $("#matchup").prepend("<div class=\"pittsburgh-steelers user-pick\"></div>");
            break;
          case "Cleveland Browns":
            $("#matchup").prepend("<div class=\"cleveland-browns user-pick\"></div>");
            break;
          case "Cincinnati Bengals":
            $("#matchup").prepend("<div class=\"cincinnati-bengals user-pick\"></div>");
            break;
          case "Baltimore Ravens":
            $("#matchup").prepend("<div class=\"baltimore-ravens user-pick\"></div>");
            break;
          case "Tennessee Titans":
            $("#matchup").prepend("<div class=\"tennessee-titans user-pick\"></div>");
            break;
          case "Jacksonville Jaguars":
            $("#matchup").prepend("<div class=\"jacksonville-jaguars user-pick\"></div>");
            break;
          case "Indianapolis Colts":
            $("#matchup").prepend("<div class=\"indianapolis-colts user-pick\"></div>");
            break;
          case "Houston Texans":
            $("#matchup").prepend("<div class=\"houston-texans user-pick\"></div>");
            break;
          case "New York Jets":
            $("#matchup").prepend("<div class=\"new-york-jets user-pick\"></div>");
            break;
          case "New England Patriots":
            $("#matchup").prepend("<div class=\"new-england-patriots user-pick\"></div>");
            break;
          case "Miami Dolphins":
            $("#matchup").prepend("<div class=\"miami-dolphins user-pick\"></div>");
            break;
          case "Buffalo Bills":
            $("#matchup").prepend("<div class=\"buffalo-bills user-pick\"></div>");
            break;
          case "San Diego Chargers":
            $("#matchup").prepend("<div class=\"san-diego-chargers user-pick\"></div>");
            break;
          case "Oakland Raiders":
            $("#matchup").prepend("<div class=\"oakland-raiders user-pick\"></div>");
            break;
          case "Kansas City Chiefs":
            $("#matchup").prepend("<div class=\"kansas-city-chiefs user-pick\"></div>");
            break;
          case "Denver Broncos":
            $("#matchup").prepend("<div class=\"denver-broncos user-pick\"></div>");
            break;
          case "Minnesota Vikings":
            $("#matchup").prepend("<div class=\"minnesota-vikings user-pick\"></div>");
            break;
          case "Green Bay Packers":
            $("#matchup").prepend("<div class=\"green-bay-packers user-pick\"></div>");
            break;
          case "Detroit Lions":
            $("#matchup").prepend("<div class=\"detroit-lions user-pick\"></div>");
            break;
          case "Chicago Bears":
            $("#matchup").prepend("<div class=\"chicago-bears user-pick\"></div>");
            break;
          case "Tampa Bay Buccaneers":
            $("#matchup").prepend("<div class=\"tampa-bay-buccaneers user-pick\"></div>");
            break;
          case "New Orleans Saints":
            $("#matchup").prepend("<div class=\"new-orleans-saints user-pick\"></div>");
            break;
          case "Carolina Panthers":
            $("#matchup").prepend("<div class=\"carolina-panthers user-pick\"></div>");
            break;
          case "Atlanta Falcons":
            $("#matchup").prepend("<div class=\"atlanta-falcons user-pick\"></div>");
            break;
          case "Washington Redskins":
            $("#matchup").prepend("<div class=\"washington-redskins user-pick\"></div>");
            break;
          case "Philadelphia Eagles":
            $("#matchup").prepend("<div class=\"philadelphia-eagles user-pick\"></div>");
            break;
          case "New York Giants":
            $("#matchup").prepend("<div class=\"new-york-giants user-pick\"></div>");
            break;
          case "Dallas Cowboys":
            $("#matchup").prepend("<div class=\"dallas-cowboys user-pick\"></div>");
            break;
          case "St Louis Rams":
            $("#matchup").prepend("<div class=\"st-louis-rams user-pick\"></div>");
            break;
          case "Seattle Seahawks":
            $("#matchup").prepend("<div class=\"seattle-seahawks user-pick\"></div>");
            break;
          case "San Francisco 49ers":
            $("#matchup").prepend("<div class=\"san-francisco-49ers user-pick\"></div>");
            break;
          case "Arizona Cardinals":
            $("#matchup").prepend("<div class=\"arizona-cardinals user-pick\"></div>");
            break;
          default:
            break;
        }

        //if the users click cancel
        $("#cancel").click(function() {
          $("#block-views-available_picks-block").show();
          $("#matchup").remove();
          $("#block-survivors-survivors").remove();
        });

        //if the user click submit
        $("#submit").click(function() {
          $("#submit, #cancel").hide();
          $("#block-picks-picks").show();
          $("#block-survivors-survivors").show();
        });


      } else {
        alert("This week's picks are locked.");
      }
    });

    //On Success Show Matchup Block
    function showMatchupBlock(userPick) {

      if($("#matchup").length) {
        $("#matchup").prepend('<div id="user-pick">' + userPick + '</div>');
      }
    }

    $(document).ajaxComplete(function() {
      $("#matchup").hide();
    });

  });
})(jQuery);