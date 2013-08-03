ig.module(
	'game.entities.screens.stats'
)
.requires(
	'plusplus.core.entity'
)
.defines(function(){
	
	var _c = ig.CONFIG;
	
	EntityStats = ig.EntityExtended.extend({
		performance: _c.KINEMATIC,
		maxVel:{x:10000, y:100},
		size: {x:2000, y:240},
		//vel:{x:-10, y:0},
		targetPos:0,
		tweening:false,
		
		statsPosition:0,
		statsArea:{
			x:0,
			width:640,
			y:0,
			height:480,
			touched:false,
			lastY:0,
			change:0,
			firstTouch:true,
		},
		
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'ui/my_log/win_Stats.png', 480, 320),
		animSettings: {
			idle: {
				frameTime: 1,
				sequence: [0]
			}
		},
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.gravityFactor = 0;
			
			this.statsPosition = this.pos.y;
			
			this.statsArea.y = 0;
			this.statsArea.x = this.pos.x + 30;
			this.statsArea.height = ig.system.height;
			document.addEventListener('touchstart', this.touchStart.bind(this), false);
			document.addEventListener('touchend', this.touchEnd.bind(this), false);
			document.addEventListener('touchmove', this.touchMove.bind(this), false);
		
		},
		
		touchStart:function(ev){
			ev.preventDefault();
			console.log("TOUCH START")
			
			var el = ig.system.canvas;
			var pos = {left: 0, top: 0};
			while( el != null ) {
				pos.left += el.offsetLeft;
				pos.top += el.offsetTop;
				el = el.offsetParent;
			}
			var x = ev.touches[0].pageX - pos.left,
				y = ev.touches[0].pageY - pos.top;
				
			if(x > this.statsArea.x && x < this.statsArea.x + this.statsArea.width){
				console.log("IN DA AREA")
				this.statsArea.touched = true;
			}
		},
		
		touchMove:function(ev){
			ev.preventDefault();
			if(this.statsArea.touched){
				var el = ig.system.canvas;
				var pos = {left: 0, top: 0};
				while( el != null ) {
					pos.left += el.offsetLeft;
					pos.top += el.offsetTop;
					el = el.offsetParent;
				}
				
				//console.log(this.skillPosition)
				
				var x = ev.touches[0].pageX - pos.left,
					y = (ev.touches[0].pageY - (pos.top));
					
				//y += this.skillPosition;
				//console.log(y);
				if(this.statsArea.firstTouch == false){
					this.statsArea.change = this.statsArea.lastY - y;
				} else {
					//this.skillPosition = 0;
					
				}
				console.log("[SKILLPOS]: " + this.statsPosition)
					console.log("[CHANGE]: " + this.statsArea.change)
				this.statsArea.firstTouch = false;
				//console.log(this.skillArea.change);
				this.statsArea.lastY = y;
			}
		},
		
		touchEnd:function(ev){
			ev.preventDefault();
			this.statsArea.change = 0;
			this.statsArea.lastY = this.statsPosition;
			//console.log("OUT")
			this.statsArea.firstTouch = true;
			this.statsArea.touched = false;
		},
		
		update:function(){
			this.parent();
			
			
			if(this.tweening == false){return;}
			//console.log(this.targetPos - this.pos.x)
			if(this.pos.x != this.targetPos){
				//console.log("WHY ME")
				if(this.pos.x < this.targetPos){
					this.vel.x  = (this.targetPos - this.pos.x) * 5;
					
				}
				if(this.pos.x > this.targetPos){
					this.vel.x  = (this.targetPos - this.pos.x) * 5;
				}
				
				
				if(Math.abs(this.vel.x) < 1){
					this.tweening = false;
					this.vel.x = 0;
					this.pos.x = this.targetPos;
				}
				
			}
			
		},
		
		draw:function(){
			this.parent();
			
			this.statsPosition -= this.statsArea.change;
			this.statsPosition = Clamp(this.statsPosition, 0, -200)
			var fY = (this.statsPosition);
			ig.game.font.draw("ENEMIES VANQUISHED: " + _c.KILLS, this.pos.x + 20, fY + 40, ig.Font.ALIGN.LEFT);
			ig.game.font.draw("TIMES EMBARASSED: " + _c.DEATHS, this.pos.x + 20, fY + 80, ig.Font.ALIGN.LEFT);
			ig.game.font.draw("MISSIONS ATTEMPTED: " + _c.GAMES_PLAYED, this.pos.x + 20, fY + 120, ig.Font.ALIGN.LEFT);
			ig.game.font.draw("TIME WASTED: " + _c.TIME_PLAYED + " Seconds", this.pos.x + 20, fY + 160, ig.Font.ALIGN.LEFT);
			ig.game.font.draw("MONEY EARNED: " + _c.MONEY_EARNED, this.pos.x + 20, fY + 200, ig.Font.ALIGN.LEFT);
			ig.game.font.draw("MONEY SPENT: " + _c.MONEY_SPENT, this.pos.x + 20, fY + 240, ig.Font.ALIGN.LEFT);
			this.statsArea.x = this.pos.x + 30;
		}
		
	})
	
	
	
	
})
