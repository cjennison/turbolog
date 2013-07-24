ig.module(
	'game.entities.screens.skills'
)
.requires(
	'plusplus.core.entity'
)
.defines(function(){
	
	var _c = ig.CONFIG;
	
	EntitySkills = ig.EntityExtended.extend({
		performance: _c.KINEMATIC,
		maxVel:{x:10000, y:100},
		size: {x:450, y:240},
		//vel:{x:-10, y:0},
		skillPosition:0,
		targetPos:0,
		tweening:false,
		skillButtons:null,
		skillIcons:[],
		skillArea:{
			x:0,
			width:300,
			y:0,
			height:300,
			touched:false,
			lastY:0,
			change:0,
			firstTouch:true,
		},
		animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'ui/my_log/win_Skills.png', 480, 320),
		animSettings: {
			idle: {
				frameTime: 1,
				sequence: [0]
			}
		},
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.gravityFactor = 0;
			
			this.skillPosition = this.pos.y;
			
			if(_c.FIRST_LOG){
				this.skillButtons = [
	                	new ig.TouchButton('CHOOSE_FIRE', this.pos.x + 50,  this.pos.y + 50, 106, 251, new ig.Image('/media/ui/my_log/fire_bar.png'), 0),
	                	new ig.TouchButton('CHOOSE_EARTH', this.pos.x + 106 + 10 + 50,  this.pos.y + 50, 106, 251, new ig.Image('/media/ui/my_log/earth_bar.png'), 0),
	                	new ig.TouchButton('CHOOSE_AIR', this.pos.x + (106 * 2) + 10 + 50,  this.pos.y + 50, 106, 251, new ig.Image('/media/ui/my_log/air_bar.png'), 0)
				]
			}else {
				this.buildIcons();
			}
			
			
			
		},
		
		buildIcons:function(){
			console.log("BUILDING ICONS")
			this.skillIcons = [];
			//Construct Skill Icons
			var abilities = _c.SELECTED_TREE.abilities;
			console.log(abilities);
			
			if(abilities.length == 0){
				console.log("NO ABILITIES");
				return;
			}
			
			for(var i = 0;i < abilities.length; i++){
				var ab = abilities[i];
				this.skillIcons[i] = new ig.TouchButton('UPGRADE_SKILL', ((this.pos.x + 30) + (ab.pos * 100)), (this.pos.y + (ab.tier * 50)) + 30, 50, 50, new ig.Image('/media/ui/my_log/talent_icons/' + _c.SELECTED_TREE.id + '/' + ab.image), 0, null, null, 0, true, ab, true)
				console.log(this.skillIcons.length);
			}
			this.skillArea.y = 0;
			this.skillArea.x = this.pos.x + 30;
			this.skillArea.width = 300;
			this.skillArea.height = ig.system.height;
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
				
			if(x > this.skillArea.x && x < this.skillArea.x + this.skillArea.width){
				console.log("IN DA AREA")
				this.skillArea.touched = true;
			}
		},
		
		touchMove:function(ev){
			ev.preventDefault();
			if(this.skillArea.touched){
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
				if(this.skillArea.firstTouch == false){
					this.skillArea.change = this.skillArea.lastY - y;
				} else {
					//this.skillPosition = 0;
					
				}
				console.log("[SKILLPOS]: " + this.skillPosition)
					console.log("[CHANGE]: " + this.skillArea.change)
				this.skillArea.firstTouch = false;
				//console.log(this.skillArea.change);
				this.skillArea.lastY = y;
			}
		},
		
		touchEnd:function(ev){
			ev.preventDefault();
			this.skillArea.change = 0;
			this.skillArea.lastY = this.skillPosition;
			//console.log("OUT")
			this.skillArea.firstTouch = true;
			this.skillArea.touched = false;
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
			
			
			//If the player is on their first time!
			if(_c.FIRST_LOG){
				var x = this.pos.x + this.size.x/2,
					y = ig.system.height/2;
					
				
				for(var i = 0;i < this.skillButtons.length;i++){
					if(ig.game.confirmationPopup.enabled == false){
						this.skillButtons[i].enabled = true;
						this.skillButtons[i].draw((this.pos.x + 50) + (i * (106 + 10))); //position + (i * width + spacing)
					} else {
						this.skillButtons[i].enabled = false;
					}
				}
								
			} else {
				if(this.skillIcons.length > 0){
					for(var ic = 0; ic < this.skillIcons.length;ic++){
						var icX = ((this.pos.x + 30) + (this.skillIcons[ic].settings.pos * 120))
						this.skillPosition -= this.skillArea.change;
						this.skillPosition = Clamp(this.skillPosition, 500, -50)
						var icY =  ((this.skillPosition + (this.skillIcons[ic].settings.tier * 50)) + 30);
						//console.log(icY)
						this.skillIcons[ic].draw(icX, icY);
						this.skillArea.change = 0;
						for(var ab = 0; ab < _c.SELECTED_TREE.abilities.length;ab++){
							if(this.skillIcons[ic].settings.id == _c.SELECTED_TREE.abilities[ab].id){
								ig.game.font.draw(_c.SELECTED_TREE.abilities[ab].stage + "/" + _c.SELECTED_TREE.abilities[ab].max_stage, icX, icY, ig.Font.ALIGN.LEFT)
							}
						}
					}
				}
				if(ig.game.buttonSettings){
					//ig.game.font.draw(ig.game.buttonSettings.name, this.pos.x + 400, 100, ig.Font.ALIGN.LEFT);
				}
				this.skillArea.x = this.pos.x + 30;
				
			}
			
			
			
		}
		
	})
	
	
	
	
})
