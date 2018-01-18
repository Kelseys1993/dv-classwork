google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);


function drawChart(){

		$.ajax({
			url: 'js/animals.json',
			dataType:'json',
			success: function(dataFromServer){
					console.log(dataFromServer);


					var data = new google.visualization.DataTable();
					data.addColumn('string', 'Animals');
					data.addColumn('number', 'percentage');

					for( i= 0; i < dataFromServer.length; i++){
					data.addRow([dataFromServer[i].Animals, dataFromServer[i].Numbers]);
					}
					

					var options = {

						title: 'Favourtite Animals',
						is3D: true,
						backgroundColor: 'lightgrey',
						chartArea:{
							width: '80%'
						}
						

					}
					
					var chart = new google.visualization.PieChart(document.getElementById('chartLocation'));
					google.visualization.events.addListener(chart, 'select', clickEvent);
					chart.draw(data, options);

					function clickEvent(){
						var tableRow = chart.getSelection()[0].row;
						var animalData = dataFromServer[tableRow]

						if(animalData){
								var options = {
								slices: [
									{color: 'purple'},
									{color: 'green'},
									{color: 'blue' },
									{color: 'red'},
									{color: 'pink'},
									{color: 'black'}
									]
								}
								
							document.getElementById('gender').innerText = animalData.Gender;
							document.getElementById('country').innerText = animalData.Country;

							
			
						}
					}
				
				},

			error: function(errorFromServer){
					console.log(error);
					alert('Error connecting to the server');
			}
		})

	};