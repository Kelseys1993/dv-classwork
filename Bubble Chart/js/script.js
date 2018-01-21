google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(){

	$.ajax({
		url: 'js/mock.json',
		dataType: 'json',
		success: function(dataFromServer){
			console.log(dataFromServer);

			var data = new google.visualization.DataTable();
			data.addColumn('string','ID');
			data.addColumn('number', 'Life Expectancy');
			data.addColumn('number', 'Fertility Rate');
			data.addColumn('string', 'Region');
			data.addColumn('number', 'Population');

			for (var i = 0; i < dataFromServer.length; i++) {
				data.addRow([dataFromServer[i].codes, 
					dataFromServer[i].life_expectancey,
					dataFromServer[i].fertility_rate,
					dataFromServer[i].region,
					dataFromServer[i].population]);
			};

			var options = {

				title: 'Correlation between life expectancy, fertility rate and population',
				hAxis: {
					title: 'Life Expectancy'
				},
      		  	vAxis: {
      		  		title: 'Fertility Rate'
      		  	}

			}


			var chart = new google.visualization.BubbleChart(document.getElementById('chartLocation'));
			chart.draw(data, options);
		},
		error: function(errorFromServer){
			console.log(errorFromServer);
			alert('error connecting to server');

		}



	});
}
