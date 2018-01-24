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
					width: '100wh',
					height: '100vh',
					legend: 'none',
					title: 'Age Vs. Annual Income'
				},
				view: {
					columns: [1, 2]
				}

			});

			// var tableChart = new google.visualization.ChartWrapper({
			// 	chartType: 'Table',
			// 	containerId: 'chart2',
			

			// 	});

			

			var incomeRangeSlider = new google.visualization.ControlWrapper({
				controlType: 'NumberRangeFilter',
				containerId: 'control1',
				options:{
					filterColumnLabel: 'Income',
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

			dashboard.bind([incomeRangeSlider, genderPicker], [scatterChart]);
			dashboard.draw(data);
			drawPie(dataFromJSON);

			google.visualization.events.addListener(incomeRangeSlider, 'statechange', function(){

						// getting state of incomeRangeSlider getState is a google function 
						var range = incomeRangeSlider.getState();
						// taking a copy of the original table
						var view = new google.visualization.DataView(data);	
						// telling it what rows we want and filtereing 
						// it on column 2 which is income 
						// then use min and max value from the variable range 
						// which is where the slider is set to 
						view.setRows(data.getFilteredRows([
								{
									column: 2,
									minValue: range.lowValue ,
									maxValue: range.highValue
								}
							]));			
					// ol is what the row numbers of the values are
					var filteredRows = view.ol;
					// blank array to push the data into
					var newData = [];
					// push dataFromJSON and filteredRows 
					for (var i = 0; i < filteredRows.length; i++) {
						newData.push(dataFromJSON[filteredRows[i]]);
					};
					// now the pie will change depending on the newData 
					// passed through the drawchart function
					// newData and dataFromJSON are same but newData 
					// is just filtered this is why we can use it
					drawPie(newData);
					
			});

			
			

		},
		error: function(errorFromJSON){
			console.log(errorFromJson);
			console.log('something went wrong');
			alert('erorr!!!!')
		}
	})
};





function drawPie(data){
 // getting data then looping over each entry
 //created variables male and female to = 0
 // we then ask if gender is male or female then add to count
	var dataGender = new google.visualization.DataTable();
	dataGender.addColumn('string', 'Gender');
	dataGender.addColumn('number', 'Count');
	var male = 0, female = 0;

	for (var i = 0; i <data.length; i++) {
			if(data[i].gender == "Male"){
				male++
			}else if (data[i].gender == "Female"){
				female++
			}
	};
	dataGender.addRow(["Male", male]);
	dataGender.addRow(["Female", female]);

	var options = {
		title: 'Male and Female Split',
		backgroundColor:{
			fill: 'transparent'
		}
	};
	var pie = new google.visualization.PieChart(document.getElementById('chart2'));
	pie.draw(dataGender, options);
};

// for Geo chart

// loop through the data getting each country
// put in an array if it already exists then add count if not push to array




