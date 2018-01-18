var selection = document.getElementById('selectColour');
selection.addEventListener('click', getData, false);

var val;


function getData(){
	var val = document.getElementById('selectColour').value;
	console.log(val);
}



// google.charts.load('current', {packages: ['corechart']});
// google.charts.setOnLoadCallback(drawChart);


// function drawChart(){
// 	$.ajax({
// 		url:"js/mockData.json",
// 		dataType: "json",
// 		success: function(statData){
// 		var data = new google.visualization.DataTable();
// 		data.addColumn('number', 'Red');
// 		data.addColumn('number', 'Green');
// 		data.addColumn('number', 'Blue');
// 		data.addColumn('number', 'Orange');

		
		
// 		for(var i = 0; i < statData.length; i++){
// 			data.addRow([statData[i].LifeExpectancy, statData[i].Height]);
// 		}
		

// 		var options = {

// 			title: 'Favourite Colour',
// 			hAxis: {
// 				title: 'Age',
// 				minValue: 25,
// 				maxValue:100
				
// 			},

// 			vAxis: {
// 				title: 'Height',
// 				minValue: 120,
// 				maxValue:200
// 			},
// 			animation:{
// 				startup: true,
// 				duration: 1000,
// 				easing: 'out'
// 			},
	

// 		};



// 		var chart = new google.visualization.Bar(document.getElementById('chartLocation'));
// 		chart.draw(data, options);

		
// 				},
// 				error: function(){
// 					alert('something went wrong cant connect to the server.');
// 				}
// 		});
// };