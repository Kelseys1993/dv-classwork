google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);


function drawChart(){

	$.ajax({
		url: 'js/mock.json',
		dataType:'json',
		success: function(dataFromServer){
			console.log(dataFromServer);
			var data = new google.visualization.DataTable();
			data.addColumn('string','Month');
			data.addColumn('number', 'High');
			data.addColumn('number', 'Low');
			data.addColumn('number', 'Opening');
			data.addColumn('number', 'Closing');

			for (var i = 0; i < dataFromServer.length; i++) {
				data.addRow([dataFromServer[i].month, 
					dataFromServer[i].high,
					dataFromServer[i].low,
					dataFromServer[i].opening,
					dataFromServer[i].closing ]);
			};

			var options = {
				title: 'Companies Yearly Sales',
				legend: 'none',
				vAxis:{
					ticks: [40, 50, 60, 70, 80, 90]
				},
				candlestick:{
					hollowIsRising: true
				}

			}

			var chart = new google.visualization.CandlestickChart(document.getElementById('chartLocation'));
			chart.draw(data, options);
		},
		error: function(errorFromServer){
			console.log(errorFromServer);
			alert("Error connecting to server");
		}
	});
}