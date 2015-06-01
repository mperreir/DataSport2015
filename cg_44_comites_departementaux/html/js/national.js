var svg = dimple.newSvg("#nationalTrends", 590, 400);
    d3.json("js/data/national.json", function (data) {
      //alert(data.data);
      var myChart = new dimple.chart(svg, data.data);
      myChart.setBounds(20, 20, 460, 360)
      myChart.addMeasureAxis("p", "national");
      var outerRing = myChart.addSeries("federation", dimple.plot.pie);
      myChart.addMeasureAxis("p", "44");
      var innerRing = myChart.addSeries("federation", dimple.plot.pie);
      // Negatives are calculated from outside edge, positives from center
      outerRing.innerRadius = "-30px";
      innerRing.outerRadius = "-40px";
      innerRing.innerRadius = "-100px";
      myChart.addLegend(500, 20, 90, 300, "left");
      myChart.draw();
    });