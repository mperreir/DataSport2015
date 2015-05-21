$(function () {
$.get('Data/data1.csv', function(csv) {
    $('#page5_graphe').highcharts({
        chart: {
            type: 'areaspline',
            backgroundColor:'transparent'
        },
        colors: [
            '#DF574A'
            ],
        data: {
            
            csv: csv
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        xAxis: {

                  plotLines: [{
    color: '#24445C', // Color value
    dashStyle: 'DashDot', // Style of the plot line. Default to solid
    value: Date.UTC(2013, 03, 21), // Value of where the line will appear
    width: 1, // Width of the line 
    
    label: { 
    text: '21/04/2014<br>+44 Likes', // Content of the label. 
    align: 'right', // Positioning of the label. 
    y: 15,
    x: -6,
    rotation: 0,
            style: {
            fontFamily: 'Montserrat',
            color :'#24445C'
            
        }
   
  }
  },
  {
    color: '#24445C', // Color value
    dashStyle: 'DashDot', // Style of the plot line. Default to solid
    value: Date.UTC(2014, 03, 27), // Value of where the line will appear
    width: 1, // Width of the line 
    
    label: { 
    text: '27/04/2013<br>+115 Likes', // Content of the label. 
    align: 'right', // Positioning of the label. 
    rotation: 0,
    y: 15,
    x: -6,
        style: {
            fontFamily: 'Montserrat',
            color :'#24445C'
        }
   
  }
  },
  {
    color: '#24445C', // Color value
    dashStyle: 'DashDot', // Style of the plot line. Default to solid
    value: Date.UTC(2015, 03, 19), // Value of where the line will appear
    width: 1, // Width of the line 
    
    label: { 
    text: '19/04/2015<br>+78 Likes', // Content of the label. 
    align: 'right', // Positioning of the label. 
    rotation: 0,
    y: 15,
    x: -6,
            style: {
            fontFamily: 'Montserrat',
            color :'#24445C'
        }
   
  }
  }]


},
        yAxis: {
            title: {
                text: 'Likes'
            }
        },
        exporting: {
            enabled: false 
        },
        credits: {
         enabled: false
        }
    });
});
});