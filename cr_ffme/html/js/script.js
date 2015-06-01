	
//fonction pour afficher le pourcentage des licenciers par département	
function lic2011(){

    // Build the chart
    $('#camm11').highcharts({
        chart: {
        	backgroundColor:'transparent',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Licenciés par département en 2011',
            style: {
                color: '#D8E8F6'
             }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '',
            data: [
                ['Loire Atlantique',   32.0],
                ['Maine et loire',       21.0],
                ['Mayenne',   17.0],
                {
                    name: 'Sarthe',
                    y: 11.0,
                    sliced: true,
                    selected: true
                },
                ['Vendée',     17.0]
            ]
        }]
    });
}



    //2015
function lic2015(){
   
    $('#camm11').highcharts({
    	series: [{
            type: 'pie',
            name: '',
            data: [
                ['Loire Atlantique',  40.0],
                ['Maine et loire',      17.0],
                ['Mayenne',   19.0],
                {
                    name: 'Sarthe',
                    y: 9.0,
                    sliced: true,
                    selected: true
                },

                ['Vendée',    15.0]
            ]
        }],
        chart: {
        	backgroundColor:'transparent',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Licenciés par département en 2015',
            style: {
                color: '#D8E8F6'
             }
        },
        tooltip: {
            pointFormat: 'proportion: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        }
    });
   
}




//fonction des participant copetition || loisir
//2011
function comLoi11(){
	
	  var colors = Highcharts.getOptions().colors,
      categories = ['Loire Atlantique', 'Maine et loire', 'Mayenne', 'Sarthe', 'Vendée'],
      data = [{
          y: 32.0,
          color: colors[0],
          drilldown: {
              name: 'Loire Atlantique',
              categories: ['Compétiteurs','Loisirs'],
              data: [24.0,8.0],
              color: colors[0]
          }
      }, {
          y: 21.0,
          color: colors[1],
          drilldown: {
              name: 'Maine et loire',
              categories: ['Compétiteurs','Loisirs'],
              data: [14.07,6.93],
              color: colors[1]
          }
      }, {
          y: 17.0,
          color: colors[2],
          drilldown: {
              name: 'Mayenne',
              categories: ['Compétiteurs','Loisirs'],
              data: [14.96,2.04],
              color: colors[2]
          }
      }, {
          y:11.0,
          color: colors[3],
          drilldown: {
              name: 'Sarthe',
              categories: ['Compétiteurs','Loisirs'],
              data: [7.7,3.3],
              color: colors[3]
          }
      }, {
          y: 17.0,
          color: colors[4],
          drilldown: {
              name: 'Vendée',
              categories: ['Compétiteurs','Loisirs'],
              data: [14.62,2.38],
              color: colors[4]
          }
      }],
      browserData = [],
      versionsData = [],
      i,
      j,
      dataLen = data.length,
      drillDataLen,
      brightness;


  // Build the data arrays
  for (i = 0; i < dataLen; i += 1) {

      // add browser data
      browserData.push({
          name: categories[i],
          y: data[i].y,
          color: data[i].color
      });

      // add version data
      drillDataLen = data[i].drilldown.data.length;
      for (j = 0; j < drillDataLen; j += 1) {
          brightness = 0.2 - (j / drillDataLen) / 5;
          versionsData.push({
              name: data[i].drilldown.categories[j],
              y: data[i].drilldown.data[j],
              color: Highcharts.Color(data[i].color).brighten(brightness).get()
          });
      }
  }

  // Create the chart
  $('#camm11').highcharts({
      chart: {
          type: 'pie',
          backgroundColor:'transparent',
      },
      title: {
          text: 'Répartition des licenciés par types de pratiques 2011',
          style: {
              color: '#D8E8F6'
           }
      },
      yAxis: {
          title: {
              text: 'Total percent market share',
              
          }
      },
      plotOptions: {
          pie: {
              shadow: false,
              center: ['50%', '50%']
          }
      },
      tooltip: {
          valueSuffix: '%'
      },
      series: [{
          name: 'Départements',
          data: browserData,
          size: '60%',
          dataLabels: {
              formatter: function () {
                  return this.y > 5 ? this.point.name : null;
              },
              color: 'white',
              distance: -30
          }
      }, {
          name: 'proportion',
          data: versionsData,
          size: '80%',
          innerSize: '60%',
          dataLabels: {
              formatter: function () {
                  // display only if larger than 1
                  return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%'  : null;
              }
          }
      }]
  });
	
}


//2011
function comLoi15() {
	
	  var colors = Highcharts.getOptions().colors,
      categories = ['Loire Atlantique', 'Maine et loire', 'Mayenne', 'Sarthe', 'Vendée'],
      data = [{
          y: 40.0,
          color: colors[0],
          drilldown: {
              name: 'Loire Atlantique',
              categories: ['Compétiteurs','Loisirs'],
              data: [28.4,11.6],
              color: colors[0]
          }
      }, {
          y: 17.0,
          color: colors[1],
          drilldown: {
              name: 'Maine et loire',
              categories: ['Compétiteurs','Loisirs'],
              data: [12.58,4.42],
              color: colors[1]
          }
      }, {
          y: 19.0,
          color: colors[2],
          drilldown: {
              name: 'Mayenne',
              categories: ['Compétiteurs','Loisirs'],
              data: [17.67,1.33],
              color: colors[2]
          }
      }, {
          y:9.0,
          color: colors[3],
          drilldown: {
              name: 'Sarthe',
              categories: ['Compétiteurs','Loisirs'],
              data: [5.94,3.06],
              color: colors[3]
          }
      }, {
          y: 15.0,
          color: colors[4],
          drilldown: {
              name: 'Vendée',
              categories: ['Compétiteurs','Loisirs'],
              data: [13.275,1.725],
              color: colors[4]
          }
      }],
      browserData = [],
      versionsData = [],
      i,
      j,
      dataLen = data.length,
      drillDataLen,
      brightness;


  // Build the data arrays
  for (i = 0; i < dataLen; i += 1) {

      // add browser data
      browserData.push({
          name: categories[i],
          y: data[i].y,
          color: data[i].color
      });

      // add version data
      drillDataLen = data[i].drilldown.data.length;
      for (j = 0; j < drillDataLen; j += 1) {
          brightness = 0.2 - (j / drillDataLen) / 5;
          versionsData.push({
              name: data[i].drilldown.categories[j],
              y: data[i].drilldown.data[j],
              color: Highcharts.Color(data[i].color).brighten(brightness).get()
          });
      }
  }

  // Create the chart
  $('#camm11').highcharts({
      chart: {
          type: 'pie',
          backgroundColor:'transparent',
      },
      title: {
          text: 'Répartition des licenciés par types de pratiques 2015',
          style: {
              color: '#D8E8F6'
           }
      },
      yAxis: {
          title: {
              text: 'Total percent market share'
          }
      },
      plotOptions: {
          pie: {
              shadow: false,
              center: ['50%', '50%']
          }
      },
      tooltip: {
          valueSuffix: '%'
      },
      series: [{
          name: 'Départements',
          data: browserData,
          size: '60%',
          dataLabels: {
              formatter: function () {
                  return this.y > 5 ? this.point.name : null;
              },
              color: 'white',
              distance: -30
          }
      }, {
          name: 'proportion',
          data: versionsData,
          size: '80%',
          innerSize: '60%',
          dataLabels: {
              formatter: function () {
                  // display only if larger than 1
                  return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%'  : null;
              }
          }
      }]
  });
	
}


//evolution de licenciers

function evolution(){
	 $('#camm11').highcharts({
		 chart: {
	          backgroundColor:'transparent',
	      },
	        title: {
	            text: 'Évolution des licenciés',
	            style: {
                    color: '#D8E8F6'
                 },
	            x: -20 //center
	        },
	        xAxis: {
	            categories: ['2009', '2010', '2011', '2012', '2013', '2014',
	                '2014', '2015'],
	                gridLineColor: '#707073',
	                labels: {
	                   style: {
	                      color: '#E0E0E3'
	                   }
	                },
	                lineColor: '#707073',
	                minorGridLineColor: '#505053',
	                tickColor: '#707073',
	                title: {
	                   style: {
	                      color: '#A0A0A3'

	                   }
	                }
	        },
	        yAxis: {
			        gridLineColor: '#707073',
			        labels: {
			           style: {
			              color: '#E0E0E3'
			           }
			        },
			        lineColor: '#707073',
			        minorGridLineColor: '#505053',
			        tickColor: '#707073',
			        tickWidth: 1,
			        title: {
			        	 text: 'Nombre des licenciés',
			           style: {
			              color: '#A0A0A3'
			           }
			        }
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: [{
	            name: 'Loire Atlantique',
	            data: [808,859,996,1123,1296,1402,1511]
	        }, {
	            name: 'Maine et Loire',
	            data: [606,597,641,593,662,696,662]
	        }, {
	            name: 'Mayenne',
	            data: [519,506,534,565,576,655,709]
	        }, {
	            name: 'Sarthe',
	            data: [339,316,353,339,347,326,339]
	        },{
	            name: 'Vendée',
	            data: [514,460,546,569,585,603,579]
	        }]
	    });
}



