google.charts.load('current', {packages: ['corechart', 'controls']});
// controls in packages allows to use things like a slider
google.charts.setOnLoadCallback(drawDashboard);
// not drawchart as we have more than one chart

function drawDashboard(){
	$.ajax({
		url:'js/people.json',
		dataType: 'json',
		success: function(dataFromJSON){
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Name');
			data.addColumn('number', 'Age');
			data.addColumn('number', 'Income');
			data.addColumn('string', 'Gender');

			for (var i =0; i <  dataFromJSON.length; i++) {
				data.addRow([

						dataFromJSON[i].first_name + ' ' + dataFromJSON[i].last_name, 
						dataFromJSON[i].age, 
						dataFromJSON[i].annual_income, 
						dataFromJSON[i].gender

				]);
			
			};

			var dashboard = new google.visualization.Dashboard(
				document.getElementById('dashboard'));

			var scatterChart = new google.visualization.ChartWrapper({
				chartType: 'ScatterChart',
				containerId: 'chart1',
				options:{
					width: '100%',
					height: '100%',
					legend: 'none',
					title: 'Age Vs. Annual Income'
				},
				view: {
					columns: [1, 2]
				}

			});

			var tableChart = new google.visualization.ChartWrapper({
				chartType: 'Table',
				containerId: 'chart2',
			

				});

			var histogramChart= new google.visualization.ChartWrapper({

				chartType:'Histogram',
				containerId: 'chart3',
				options:{
					title: 'Income Trends',
					legend: 'none'
				},
				view:{
					columns: [3,2]
				}
			

			});
			

			var incomeRangeSlider = new google.visualization.ControlWrapper({
				controlType: 'NumberRangeFilter',
				containerId: 'control1',
				options:{
					filterColumnLabel: 'Income',
					minValue: 30000,
					maxValue: 100000,
					ui:{
						labelStacking: 'vertical'
					}
				}
			});


			var genderPicker = new google.visualization.ControlWrapper({

				controlType: 'CategoryFilter',
				containerId: 'control2',
				options:{
						filterColumnLabel: 'Gender',
						ui:{
							allowMultiple: false,
							allowTyping: false,
							labelStacking:'vertical'
						}
				
				}
			});

			dashboard.bind([incomeRangeSlider, genderPicker], [scatterChart,tableChart, histogramChart]);
			dashboard.draw(data);

			



			


		
			

		},
		error: function(errorFromJSON){
			console.log(errorFromJson);
			console.log('something went wrong');
			alert('erorr!!!!')
		}
	})
};