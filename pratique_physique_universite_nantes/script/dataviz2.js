//Variables texte
  var sousTitreGeneral2="Comment s'expliquent-elles?"
  var texteGeneral2="<font size='3'>On remarque que certains étudiants débutent une activité sportive en entrant à l'Université, alors que d’autres cessent de pratiquer: pourquoi? Cliquez sur les bulles pour découvrir quelles sont les motivations qui ont poussé les étudiants à pratiquer en entrant à l’Université, et quelles sont les difficultés qui ont empêché ces étudiants de pratiquer une activité sportive.";
  var sousTitreDifficultes="<font color='#D66525'>Raisons du désengagement</font>";
  var sousTitreMotivations="<font color='#64B7B4'>Motivations pour débuter</font>";
  var texteDifficultes="Comme on pouvait le prévoir, on remarque que les étudiants ont un cruel manque de temps consacré à la pratique sportive.";
  var texteMotivations="Le monde du sport-santé est en plein essort actuellement. Cela se retranscrit dans les motivations qui ont poussé les étudiants à commencer la pratique sportive en arrivant à l'université. ";
  
  var margin = 0,
      diameter = 580;
      
  
  var color = d3.scale.linear()
      .domain([-1, 5])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl);
  
  var pack = d3.layout.pack()
      // .padding(2)
      .size([diameter, diameter])
      .value(function(d) { return d.size; })
  
  var svg = d3.select("#dataviz2").append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox","0 0 600 600")
      
    .append("g")
      .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
  
  d3.json("json/dataviz2.json", function(error, root) {
    if (error) return console.error(error);
  
    var focus = root,
        nodes = pack.nodes(root),
        view;
    
    var col1 = '#D66525';  
    var col2 = '#64B7B4';
    var col3 = '#F9CBB0';
    var col4 = '#C1E2DD';
  
    var circle = svg.selectAll("#dataviz2 circle")
        .data(nodes)
      .enter().append("circle")
        .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
        
       
        .style("visibility",function(d) {
           if(d.children && !d.parent)
                        return 'hidden';
                     
          
        })
        
        
        .style("fill", function(d) {
            
            if(d.parent&&d.parent.parent&&d.parent.children.length==6) return col1;
            else if(d.parent&&d.parent.parent&&d.parent.children.length==5) return col2;
                else if(d.parent&&d.children&&d.children.length==6) return col3;
                      else if(d.parent&&d.children&&d.children.length==5) return col4;
          
        })
        
       
        .on("click", function(d) { 
          
          if (focus !== d) zoom(d), d3.event.stopPropagation(); 
         
          
          var elem1 = document.getElementById("parag2");
          if(d.name=="Motivations") {
              elem1.innerHTML=texteMotivations; 
              }
          else if(d.name=="Difficutés") {
              elem1.innerHTML=texteDifficultes; 
              }
          
          var td2Dif = document.getElementById("t2Dif").style.visibility = "hidden";
          var td2Mot = document.getElementById("t2Mot").style.visibility = "hidden";
          
          var elem2 = document.getElementById("titleparag2");
          if(d.name=="Motivations") {
            elem2.innerHTML=sousTitreMotivations;
            // elem2.innerHTML.fontcolor("#D66525");
          }
          else if(d.name=="Difficutés") {
            elem2.innerHTML=sousTitreDifficultes; 
          }
     });
  
  
  
    var text = svg.selectAll("#dataviz2 text")
        .data(nodes)
      .enter().append("text")
        .attr("class", "label")
         .style("fill-opacity", function(d) { return d.parent === root ? 0 : 0; })
        
        .style("display", function(d) { 
          
          
          if(d.children) return "none";
          // return d.parent === root ? null : "none"; 
          
        })
        
         .text(function(d) { if(!d.children) return d.name; });
        
    
    var node = svg.selectAll("#dataviz2 circle,text")
    .style("font-size", function(d) { 
       
       var size= d.r/1.7;
       return size;
        
     })
     
  //   .style("font-family","arial,helvetica")
     
    ;
    
  
    d3.select("#dataviz2")
      //.style("background", color(-1))
        .on("click", function() { zoom(root); 
         
          var elem1 =document.getElementById("parag2");
          elem1.innerHTML=texteGeneral2;
          var elem2 =document.getElementById("titleparag2");
          elem2.innerHTML=sousTitreGeneral2;
         
          var td2Dif = document.getElementById("t2Dif").style.visibility = "visible";
          var td2Mot = document.getElementById("t2Mot").style.visibility = "visible";
          
        });
  
    zoomTo([root.x, root.y, root.r * 2 + margin]);
  
    function zoom(d) {
      var focus0 = focus; focus = d;
  
      var transition = d3.transition()
          .duration(d3.event.altKey ? 7500 : 750)
          .tween("zoom", function(d) {
            var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return function(t) { zoomTo(i(t)); };
          });
  
      transition.selectAll("#dataviz2 text")
        .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
          .style("fill", "white")
          .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
          .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
          .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }
  
    function zoomTo(v) {
      var k = diameter / v[2]; view = v;
      node.attr("transform", function(d) { return "translate(" + (d.x- v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
      circle.attr("r", function(d) { return d.r * k; });
    }
  });
  
  d3.select(self.frameElement).style("height", diameter + "px");