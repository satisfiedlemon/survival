
//# sourceMappingURL=scripts.map

(function($){
  $(document).ready(function() {
    // Execute code once the DOM is ready.

    //deadline for picks
    var deadline = 1405875600000;
    var current_week = 1;

    var currentDate = new Date();
    var currentTime = currentDate.getTime();

    //alert(currentTime);

    //Adding Team Names as Classes
    $("#block-views-available_picks-block .views-row").each(function(index, value) {
      var team_name_class = $(".views-field-title a", this).text().replace(/ /g, '-').toLowerCase();
      $(this).removeClass("views-row-odd views-row-even views-row-first views-row-last");
      $(this).addClass(team_name_class);
    });

    //Selected Pick
    $("#block-views-available_picks-block .views-row").click(function() {
      //alert($(".views-field-title a", this).text());

      if(currentTime <= deadline) {
        var confirmed = confirm('Are you sure? You CANNOT change your pick once it\'s submitted');
        var picked_team = $(".views-field-title a", this).text();

        if(confirmed == true) {

          $.ajax({
            type: 'POST',
            url: 'save_teams',
            data: { 
                    team_name: picked_team, 
                    week: current_week, 
                    current_date: currentTime
                  },
            success: function(data) {
              //$(".field.field-name-field-afc-north.field-type-list-text.field-label-above .field-items .baltimore-ravens").hide();
              //$(".node-1.node.node-picks.node-promoted.view-mode-full").hide();
              $("body").append("You have chosen " + picked_team);
              //$('#block-survivors-survivors').hide();
              //$('#block-dead-dead').hide();
            },
            error: function(httpRequest, textStatus, errorThrown) { 
             alert("status = " + textStatus + ", error = " + errorThrown);
            }
          });
        }
      } else {
        alert('You missed your deadline to pick for this week. GG');
      }
    });

  });
})(jQuery);