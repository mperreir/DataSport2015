var chemin,r,ide,ide1;

var o = {
	init: function(){
		this.diagram();
	},
	random: function(l, u){
		return Math.floor((Math.random()*(u-l+1))+l);
	},
	diagram: function(){
		 r = Raphael('diagram', 600, 600),
			rad = 73,
			defaultText = '',
			speed = 50;
		
		
		
		var title = r.text(300, 300, defaultText).attr({
			font: '20px Arial',
			fill: '#fff'
		}).toFront();
		
		r.customAttributes.arc = function(value, color, rad){
			var v = 3.6*value,
				alpha = v == 360 ? 359.99 : v,
				random =180,
				a = (random-alpha) * Math.PI/180,
				b = random * Math.PI/180,
				sx = 300 + rad * Math.cos(b),
				sy = 300 - rad * Math.sin(b),
				x = 300 + rad * Math.cos(a),
				y = 300 - rad * Math.sin(a),
				path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
			return { path: path, stroke: color }
		}
		
		$('.get').find('.arc').each(function(i){
			
			var t = $(this), 
				color = t.find('.color').val(),
				value = t.find('.percent').val(),
				
				chemin = t.find('.chemin').val();

			
			rad += 35;	
			var z = r.path().attr({ arc: [value, color, rad], 'stroke-width': 26 });
			
			
			
			z.mouseover(function(){
                switch(t.find('.text').text())
					{
							case "Junior":
								ide='Jun';
								ide1='Jun1';
								break;
							
							case "Espoir":
								ide='Esp';
								ide1='Esp1';
								break;
							
							case "Senior":
								ide='Sen';
								ide1='Sen1';
								break;
							
							case "Veteran1":
								ide='Vet';
								ide1='Vet1';
								break;

							case "Veteran2":
								ide='Vet2';
								ide1='Vet3';
								break;


	
					}

				afficheImage(ide);
				afficheImage(ide1);
                this.animate({ 'stroke-width': 40, opacity: .75 }, 1000, 'elastic');
                if(Raphael.type != 'VML') //solves IE problem
				this.toFront();
				title.stop().animate({ opacity: 0 }, speed, '>', function(){
					this.attr({ text: text + '\n' + value + '%' }).animate({ opacity: 1 }, speed, '<');
				});
            }).mouseout(function(){
				
				cacheImage(ide);
				cacheImage(ide1);
				this.stop().animate({ 'stroke-width': 26, opacity: 1 }, speed*4, 'elastic');
				title.stop().animate({ opacity: 0 }, speed, '>', function(){
					title.attr({ text: defaultText }).animate({ opacity: 1 }, speed, '<');
				});	
            });
		});
		
	},
	

}

