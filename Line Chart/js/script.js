google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(){

	$.ajax({

		url:'js/mock.json',
		dataType:'json',
		success: function(dataFromServer){
			console.log(dataFromServer);
			var data = new google. visualization.DataTable();
			data.addColumn('string', 'Year');
			data.addColumn('number', 'Sales');
			data.addColumn('number', 'Expenses');

			for (var i = 0; i < dataFromServer.length; i++) {
				data.addRow([dataFromServer[i].Year,
				dataFromServer[i].Sales,
				dataFromServer[i].Expenses ]);
			};

			var options = {
				title: 'Company Performance',
				curveType: 'function'
			}

			var chart = new google.visualization.LineChart(document.getElementById('chartLocation'));
			chart.draw(data, options);
		},
		error: function(errorFromServer){
			console.log(errorFromServer);
			alert("Error connecting to server");
		}


	});
}