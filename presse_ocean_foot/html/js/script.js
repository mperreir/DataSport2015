var pageActuelle;

var lic2015 = function () {

Highcharts.theme = {
   colors: ["#005827", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
      backgroundColor:'rgba(255, 255, 255, 0)',
      style: {
         fontFamily: "'Unica One', sans-serif"
      },
      plotBorderColor: '#ffec00'
   },
   title: {
      style: {
         color: '#000000',
         textTransform: 'uppercase',
         fontSize: '20px'
      }
   },
   subtitle: {
      style: {
         color: '#000000',
         textTransform: 'uppercase'
      }
   },
   xAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#000000'
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
            color: '#000000'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
         style: {
            color: '#000000'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      }
   },
   plotOptions: {
      series: {
         dataLabels: {
            color: '#B0B0B3'
         },
         marker: {
            lineColor: '#333'
         }
      },
      boxplot: {
         fillColor: '#000000'
      },
      candlestick: {
         lineColor: 'white'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#E0E0E3'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         stroke: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      },
      xAxis: {
         gridLineColor: '#505053'
      }
   },

   scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: '#C0C0C0',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};
	// Apply the theme
Highcharts.setOptions(Highcharts.theme);
	
$('#container').highcharts({
		chart: {
            type: 'column',
			
          
        },
        title: {
            text: 'Classement des joueurs',
			fontFamily: 'Eurostile'
        },
        subtitle: {
            text: 'Source: <a href="http://www.lfp.fr/LFPStats/stats_home?competition=D1">LFP</a>',
			fontFamily: 'Eurostile'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '11px',
                    fontFamily: 'Eurostile'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Note globale',
				fontFamily: 'Eurostile'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
			formatter: function() {
					setInformation(getDataParName(ser[this.x][0]));
                    return '<b>'+ ser[this.x][0] +'</b><br/>';
                }
				
        },
        series: [{
            name: 'Population',
            data: ser,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'left',
                format: '{point.y:.1f}', // one decimal
                y: -5, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Eurostile'
                }
            }
        }]
    });
	   


	
	
};


	
var ser=[];

function setInformation(don){
	$( "#photoJoueur" ).attr('src',"imgs/"+don[0]+".jpg");
	$( "#labPoste" ).text(don[1]);
	$( "#labAge" ).text(don[2]);
	$( "#labTaille" ).text(don[3]+" m");
	$( "#labPoids" ).text(don[4]+" kg");
	$( "#labTJ" ).text(Number((parseFloat(don[5]))*100).toFixed(2)+" %");
	$( "#labBM" ).text(don[6]);
	$( "#labPD" ).text(don[7]);
	$( "#labCJ" ).text(don[8]);
	$( "#labCR" ).text(don[9]);
	
}
function compare(a,b) {
  if (a[1]< b[1])
    return -1;
  if (a[1] > b[1])
    return 1;
  return 0;
}
function mafonction(type){
ser= getResult(type);
ser.sort(compare);
ser.reverse(compare);
setInformation(getDataParName(ser[0][0]));
lic2015();
}
function meilleur_attaquant(){
s(30);s1(0);s2(40);s3(2);s4(15);s5(10);s6(1);s7(2);s8(0);s9(0);
mafonction("attaquant");
pageActuelle="attaquant";
}
function meilleur_milieu(){
s(30);s1(25);s2(10);s3(0);s4(25);s5(10);s6(3);s7(7);s8(0);s9(0);
mafonction("milieu");
pageActuelle="milieu";
}
function meilleur_defenseur(){
s(30);s1(5);s2(0);s3(0);s4(0);s5(0);s6(5);s7(10);s8(10);s9(40);
mafonction("défenseur");
pageActuelle="défenseur";
}

    function plot (container,title,don) {
    $("#"+container).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: title
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y:.1f} </b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} % ',
                    distance : -85,
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Statistiques',
            data: don
        }]
    });
}
function resultatGeneral(){
var txt="Résultats tout match confondu";
var ser2=[
                ['Victoires', 11],
                ['Nuls',   11],
                ['Defaites',14]
		];
plot("container2",txt,ser2);
}
function resultatExterieur(){
var txt="Résultats à l'extérieur ";
var ser2=[
                ['Victoires', 4],
                ['Nuls',   5],
                ['Defaites',9]
            ];
plot("container2",txt,ser2);
}
function resultatDomicile(){
var txt="Résultats à domicile";
var ser2=[
                ['Victoires', 7],
                ['Nuls',   6],
                ['Defaites',5]
            ];
plot("container2",txt,ser2);
}
function butGeneral(){
var txt="Buts tout match confondu";
var ser2=[
                ['Buts Marqués', 28],
                ['Buts Encaissés',38]
            ];
plot("container3",txt,ser2);
}
function butDomicile(){
var txt="Buts à domicile";
var ser2=[
                ['Buts Marqués', 16],
                ['Buts Encaissés',16]
            ];
plot("container3",txt,ser2);
}
function butExterieur(){
var txt="Buts à l'extérieur";
var ser2=[
                ['Buts Marqués', 12],
                ['Buts Encaissés',22]
         ];
plot("container3",txt,ser2);
}
function classement() {

Highcharts.theme = {
   colors: ["#FDCC00", "#005827","#000000", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
     
		backgroundColor:'rgba(255, 255, 255, 0.1)',     
		
      style: {
         fontFamily: "'Unica One', sans-serif"
      },
      plotBorderColor: '#606063'
   },
   title: {
      style: {
         color: '#000000',
         textTransform: 'uppercase',
         fontSize: '20px'
      }
   },
   subtitle: {
      style: {
         color: '#000000',
         textTransform: 'uppercase'
      }
   },
   xAxis: {
      gridLineColor: '#000000',
      labels: {
         style: {
            color: '#000000'
         }
      },
      lineColor: '#000000',
      minorGridLineColor: '#000000',
      tickColor: '#000000',
      title: {
         style: {
            color: '#000000'

         }
      }
   },
   yAxis: {
      gridLineColor: '#000000',
      labels: {
         style: {
            color: '#000000'
         }
      },
      lineColor: '#000000',
      minorGridLineColor: '#000000',
      tickColor: '#000000',
      tickWidth: 1,
      title: {
         style: {
            color: '#000000'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      }
   },
   plotOptions: {
      series: {
         dataLabels: {
            color: '#000000'
         },
         marker: {
            lineColor: '#333'
         }
      },
      boxplot: {
         fillColor: '#505053'
      },
      candlestick: {
         lineColor: 'white'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#000000'
      },
      itemHoverStyle: {
         color: '#0000FF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         stroke: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
         color: '#000000',
         lineColor: '#000000'
      },
      xAxis: {
         gridLineColor: '#000000'
      }
   },

   scrollbar: {
      barBackgroundColor: '#F0F0F0',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: '#000000',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);
    $('#container4').highcharts({
        title: {
            text: 'Classement du FC Nantes saison 2014/2015 ',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: <a href="http://www.lfp.fr/ligue1/classement">LFP</a>',
            x: -20
        },
        xAxis: {
            categories: ['1ére journée', '9éme journée', '18éme journée', '28éme journée', '36éme journée']
        },
        yAxis: {
            title: {
                text: 'Classement'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ' place'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
			color:'000000'
        },
        series: [{
            name: 'Classement général',
            data: [6,5,10,17,15]
        }, {
            name: 'Classement par attaque',
            data: [11,16,13,19,20]
        }, {
            name: 'Classement par défense',
            data: [1,3,8,12,5]
        }]
    });
}
