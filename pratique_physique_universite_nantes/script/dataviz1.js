//Variables textes 
    var sousTitreGeneral1="variable texte -> sousTitreGeneral1";
    //var textGeneral1="L'entrée à l'université fait-elle évoluer la pratique sportive des étudiants?";
    var textGeneral1="";
    var zoomOrange="<font color='#D66525'>Ces étudiants ne pratiquent pas le sport à l'université</font>";
    var zoomBleu="<font color='#64B7B4'>Ces étudiants pratiquent le sport à l'université</font>";
    
    
var margin1 = {top: 350, right: 480, bottom: 350, left: 480},
    radius1 = Math.min(margin1.top, margin1.right, margin1.bottom, margin1.left) - 100;

var z = 0; //boolean zoom

var hue = d3.scale.category10();

var luminance = d3.scale.sqrt()
    .domain([0, 1e6])
    .clamp(true)
    .range([90, 20]);

var svg1 = d3.select("#dataviz1").append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox","50 50 500 500")
    
  .append("g")
     .attr("transform", "translate(" + 300 + "," + 300 + ")");

var partition = d3.layout.partition()
    .sort(function(a, b) { return d3.ascending(a.name, b.name); })
    .size([2 * Math.PI, radius1]);
    



var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) {   return d.x + d.dx - .01 / (d.depth + 5); 
      
    })
   
    .innerRadius(function(d) { 
       
          
       
          return radius1 / 3 * d.depth;
          
    })
    .outerRadius(function(d) { return radius1 / 3 * (d.depth + 0.5) - 1; });

d3.json("json/dataviz1.json", function(error, root) {

  // Compute the initial layout on the entire tree to sum sizes.
  // Also compute the full name and fill color for each node,
  // and stash the children so they can be restored as we descend.
  partition
      .value(function(d) { return d.size; })
      .nodes(root)
      .forEach(function(d) {
        d._children = d.children;
        d.sum = d.value;
        d.key = key(d);
        d.fill = fill(d);
      });

  // Now redefine the value function to use the previously-computed sum.
  partition
      .children(function(d, depth) { 
        
        if(depth < 2)
        return d._children
        else return null; 
        
        
      })
      .value(function(d) { return d.sum; })
      
      ;

  var center = svg1.append("circle")
      .attr("r", radius1 / 3)
      .on("click", zoomOut)
      
      .style("fill","white");

  // center.append("title")
  //     .text("zoom out");

  
  
  var path = svg1.selectAll("#dataviz1 path")
      .data(partition.nodes(root).slice(1))
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) { return d.fill; })
      .each(function(d) { this._current = updateArc(d); })
     
      .on("mouseover",update_legend)
	    .on("mouseout",remove_legend)
      
      .on("click", zoomIn)
      
      
      

  function zoomIn(p) {
     z = 1; //boolean zoom
    var elem1 = document.getElementById("parag1");
        if(p.name=="pratiquent le sport à l'université."||p.parent.name=="pratiquent le sport à l'université.") {
            elem1.innerHTML=zoomBleu; 
            }
        else if(p.name=="ne pratiquent pas le sport à l'université."||p.parent.name=="ne pratiquent pas le sport à l'université.") {
            elem1.innerHTML=zoomOrange; 
            }
     if (p.depth > 1) p = p.parent;
     if (!p.children) return;
      zoom(p, p);
  }

  function zoomOut(p) {
    z= 0; //boolean zoom
    var elem1 = document.getElementById("parag1");
    elem1.innerHTML=textGeneral1; 
    if (!p.parent) return;
    zoom(p.parent, p);
  }

  // Zoom to the specified new root.
  function zoom(root, p) {
    
    if (document.documentElement.__transition__) return;

    // Rescale outside angles to match the new layout.
 
   var enterArc,
        exitArc,
        outsideAngle = d3.scale.linear().domain([0, 2 * Math.PI]);

    function insideArc(d) {
      
      if (p.key > d.key)
      {
        return {depth: d.depth - 1, x: 0, dx: 0}
      }
      else if ( p.key < d.key  )
          
            return {depth: d.depth - 1, x: 2 * Math.PI, dx: 0} 
            else return {depth: 0, x: 0, dx: 2 * Math.PI};
      
    }

    function outsideArc(d) {
      return {depth: d.depth + 1, x: outsideAngle(d.x), dx: outsideAngle(d.x + d.dx) - outsideAngle(d.x)};
    }

    center.datum(root);
    // When zooming in, arcs enter from the outside and exit to the inside.
    // Entering outside arcs start from the old layout.
     if (root === p) enterArc = outsideArc, exitArc = insideArc, outsideAngle.range([p.x, p.x + p.dx]);

     path = path.data(partition.nodes(root).slice(1), function(d) { return d.key; });

    // When zooming out, arcs enter from the inside and exit to the outside.
    // Exiting outside arcs transition to the new layout.

    if (root !== p) enterArc = insideArc, exitArc = outsideArc, outsideAngle.range([p.x, p.x + p.dx]);

    d3.transition().duration(d3.event.altKey ? 7500 : 750).each(function() {
      path.exit().transition()
          .style("fill-opacity", function(d) { return d.depth === 1 + (root === p) ? 1 : 0; })
          .attrTween("d", function(d) { return arcTween.call(this, exitArc(d)); })
          .remove();

      path.enter().append("path")
      
          .style("fill-opacity", function(d) { return d.depth === 2 - (root === p) ? 1 : 0; })
          .style("fill", function(d) {  return d.fill; })
          
          .on("mouseover",update_legend)
	  	    .on("mouseout",remove_legend)
	  	    
          .on("click",  zoomIn)
          .each(function(d) { this._current = enterArc(d); });
          

      path.transition()
          .style("fill-opacity", 1)
          .attrTween("d", function(d) { return arcTween.call(this, updateArc(d)); });
     });
  } //fin zoom
});

function key(d) {
  var k = [], p = d;
  while (p.depth) k.push(p.name), p = p.parent;
   return k.reverse().join(".");
}

function fill(d) {
  // var p = d;
  // while (p.depth > 1) p = p.parent;
  // var c = d3.lab(hue(p.name));
  // c.l = luminance(d.sum);
  // return c;
  if (d.children)
    {
      if (d.name=="ne pratiquent pas le sport à l'université.") return "#D66525";
      else if (d.name=="pratiquent le sport à l'université.") return "#64B7B4";
    }
  else if (d.parent) 
  
    {
      if (d.parent.name=="ne pratiquent pas le sport à l'université." && d.name=="ont arrêté le sport après le lycée.") return "#E49163"
      else if (d.parent.name=="ne pratiquent pas le sport à l'université." && d.name=="n'ont jamais pratiqué le sport.") return "#F9CBB0"
          else if (d.parent.name=="pratiquent le sport à l'université." && d.name=="ont continué à pratiquer le sport en entrant à l'université.") return "#8BC9C8"
                else if (d.parent.name=="pratiquent le sport à l'université." && d.name=="ont commencé le sport après le lycée.") return "#C1E2DD";
    }
  
  
}

function arcTween(b) {
  var i = d3.interpolate(this._current, b);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

function updateArc(d) {
  return {depth: d.depth, x: d.x, dx: d.dx};
}

var legend = d3.select("#legend")

	function update_legend(d)
    {
      
      if(z==0)// pas de zoom
      
      
      {
             if(d.parent.name=="pratiquent le sport à l'université."||d.name=="pratiquent le sport à l'université.")
            	legend.html("<h1 class='bleu'> " + d.pourcentage + "% </h1><h2>  des étudiants " +d.name+" </h2>")
             else if(d.parent.name=="ne pratiquent pas le sport à l'université."||d.name=="ne pratiquent pas le sport à l'université.")
                  legend.html("<h1 class='orange'> " + d.pourcentage + "% </h1><h2>  des étudiants " +d.name+" </h2>")
       }
      else if (z==1)//avec zoom
      {
              if(d.parent.name=="pratiquent le sport à l'université."||d.name=="pratiquent le sport à l'université.")
                  	legend.html("<h1 class='bleu'> Sur les pratiquants, " + d.pourcentage2 + "% </h1><h2>  " +d.name2+" </h2>")
                   else if(d.parent.name=="ne pratiquent pas le sport à l'université."||d.name=="ne pratiquent pas le sport à l'université.")
                        legend.html("<h1 class='orange'> Sur les non pratiquants, " + d.pourcentage2 + "% </h1><h2>  " +d.name2+" </h2>")
      }
      
    legend.transition().duration(200).style("opacity","1");
    }
    
    
    function remove_legend(d)
    {
        //pour enlever la legende
        // legend.transition().duration(1000).style("opacity","0");

         legend.html("<p> SURVOLEZ OU CLIQUEZ SUR LES ARCS POUR ZOOMER</p><p> CLIQUEZ AU CENTRE POUR DEZOOMER</p>")
    }


d3.select(self.frameElement).style("height", margin1.top + margin1.bottom + "px");