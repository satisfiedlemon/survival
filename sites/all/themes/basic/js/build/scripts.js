
//# sourceMappingURL=scripts.map

(function($){
  $(document).ready(function() {
    // Execute code once the DOM is ready.

    //deadline for picks
    var deadline = 1905875600000;
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

    //Selected Pick
    $("#block-views-available_picks-block .views-row").click(function() {
      //alert($(".views-field-title a", this).text());

      if(currentTime <= deadline) {
        var confirmed = confirm("Are you sure? You CANNOT change your pick once it\'s submitted");
        var picked_team = $(".views-field-title span", this).text();

        if(confirmed == true) {

          $.ajax({
            type: "POST",
            url: "save_teams",
            data: { 
                    team_name: picked_team, 
                    week: current_week, 
                    current_date: currentTime
                  },
            success: function(data) {
              //$("body").append("You have chosen " + picked_team);
              $("body").append("<div id=\"matchup\"><div id=\"cancel\"></div><div id=\"submit\"></div></div>");
              showMatchupBlock(picked_team);
              $("#block-views-available_picks-block").hide();
              $("#matchup").show();
            },
            error: function(httpRequest, textStatus, errorThrown) { 
             alert("status = " + textStatus + ", error = " + errorThrown);
            }
          });
        }
      } else {
        alert("This week's picks are locked.");
      }
    });

    //On Success Show Matchup Block
    function showMatchupBlock(userPick) {

      if($("#matchup").length) {
        $("#matchup").append(userPick);
      }
    }

    //on ajax success give them div ids
    $(document).ajaxComplete(function() {

      //$("body").append("<div id=\"matchup\"><div id=\"cancel\"></div><div id=\"submit\"></div></div>");

      switch($("#matchup").text()) {
        case "Jacksonville Jaguars":
          $("#matchup").append("<div class=\"jacksonville-jaguars user-pick\"></div>");
          break;
        default:
          break;
      }

      //if the users click cancel
      $("#cancel").click(function() {
        $("#block-views-available_picks-block").show();
        //$("")
        //$("#matchup").hide();
      });
    });


    //Organizing the teams in division order
   /* $("#block-views-available_picks-block .views-row").each(function() {

      if($(this).hasClass("baltimore-ravens") || $(this).hasClass("cincinnati-bengals") || 
         $(this).hasClass("cleveland-browns") || $(this).hasClass("pittsburgh-steelers")) {

        for(var i = 0; i < $(this).length; i += 4) {
          $(this).slice(i, i + 4).wrapAll("<div class=\"afc-north\"></div>");
        }

      } else if($(this).hasClass("chicago-bears") || $(this).hasClass("detroit-lions") || 
                $(this).hasClass("green-bay-packers") || $(this).hasClass("minnesota-vikings")) {

        for(var i = 0; i < $(this).length; i += 4) {
          $(this).slice(i, i+4).wrapAll("<div class=\"nfc-north\"></div>");
        }

      } else if($(this).hasClass("houston-texans") || $(this).hasClass("indianapolis-colts") || 
                $(this).hasClass("jacksonville-jaguars") || $(this).hasClass("tennessee-titans")) {

        for(var i = 0; i < $(this).length; i += 4) {
          $(this).slice(i, i+4).wrapAll("<div class=\"afc-south\"></div>");
        }

      } else if($(this).hasClass("atlanta-falcons") || $(this).hasClass("carolina-panthers") || 
                $(this).hasClass("new-orleans-saints") || $(this).hasClass("tampa-bay-buccaneers")) {

        for(var i = 0; i < $(this).length; i += 4) {
          $(this).slice(i, i+4).wrapAll("<div class=\"nfc-south\"></div>");
        }

      } else if($(this).hasClass("buffalo-bills") || $(this).hasClass("miami-dolphins") || 
                $(this).hasClass("new-england-patriots") || $(this).hasClass("new-york-jets")) {

        for(var i = 0; i < $(this).length; i += 4) {
          $(this).slice(i, i+4).wrapAll("<div class=\"afc-east\"></div>");
        }

      } else if($(this).hasClass("dallas-cowboys") || $(this).hasClass("new-york-giants") || 
                $(this).hasClass("philadelphia-eagles") || $(this).hasClass("washington-redskins")) {

        for(var i = 0; i < $(this).length; i += 4) {
          $(this).slice(i, i+4).wrapAll("<div class=\"nfc-east\"></div>");
        }

      } else if($(this).hasClass("denver-broncos") || $(this).hasClass("kansas-city-chiefs") || 
                $(this).hasClass("oakland-raiders") || $(this).hasClass("san-diego-chargers")) {

        for(var i = 0; i < $(this).length; i += 4) {
          $(this).slice(i, i+4).wrapAll("<div class=\"afc-west\"></div>");
        }

      } else if($(this).hasClass("arizona-cardinals") || $(this).hasClass("san-francisco-49ers") || 
                $(this).hasClass("seattle-seahawks") || $(this).hasClass("st-louis-rams")) {

        for(var i = 0; i < $(this).length; i += 4) {
          $(this).slice(i, i+4).wrapAll("<div class=\"nfc-west\"></div>");
        }

      }
    });*/

  });
})(jQuery);