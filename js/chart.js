      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="https://www.google.com/jsapi"></script>
<script type="text/javascript">	
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
</script>

<script type="text/javascript">
    
      function drawChart(a, b) {
		  
		  
        var data = google.visualization.arrayToDataTable([
          ['Mode of Transport', 'Users choice'],
          ['AC Transit',  parseInt(a)],
          ['BART',      parseInt(b)],
          ['Cal Train',  2],
          ['Dumbarton Express', 2],
          ['Marin Transit',7],
		  ['Sam Trans',7],
		  ['SF-Muni',9],
		  ['Vine',14],
		  ['VTA',18],
		  ['Westcat',5]
        ]);

        var options = {
          title: 'User Preference',
          pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(document.getElementById('div4'));
        chart.draw(data, options);
      }
</script>
<script>
$(function () {
        $("#form").on("submit", function (e) {
          e.preventDefault();
          $.ajax({
            type: "POST",
            url: "user.php",
            data: $("#form").serialize(),
			dataType:"html",
            success: function (data) {
				var a = data.split(",")
				drawChart(a[0], a[1]);
            }
          });

        });

      });
</script>