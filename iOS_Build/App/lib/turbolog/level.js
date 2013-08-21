ig.module(
	'turbolog.level'
)
.requires(
	'plusplus.core.config',
    'plusplus.core.loader',
    'plusplus.core.game',
    'plusplus.core.layer',
    'plusplus.entities.light',
	
	'impact.font',
	'plugins.touch-button',
	'plugins.button',
	'game.entities.ui.healthbar',
	'plugins.analog-stick'
)
.defines(function(){
	
	
	var _c = ig.CONFIG;
	
	/*
	 * Turbo Level
	 * Handles all things level based!
	 * - Input
	 * - Bossfights
	 * - Scenary Changes
	 */
	ig.TurboLevel = ig.GameExtended.extend({
		
		
		movementSpeed:1,
		background: null,
		foreground:null,
		frontground:null,
		turbolog:null,
		
		spawningEnemies:false,
		bossActive:false,
		
		buttons:[],
		barWidth: 1.8,
		
		startSpawnerTimer:null,
		
		
		activeBar:'ability',
		
		//ui
		abilityImg: new ig.Image('media/ui/gameplay/Ui_abilityItembar.png'),
		healthImg: new ig.Image('media/ui/gameplay/lifebar/Ui_Lifebar.png'),
		healthBackImg: new ig.Image('media/ui/gameplay/lifebar/Ui_LifebarbackL1.png'),
		manaImg: new ig.Image('media/ui/gameplay/manabar/Ui_manabar.png'),
		manaBackImg: new ig.Image('media/ui/gameplay/manabar/Ui_ManabarbackL1.png'),
		moneyImg: new ig.Image('media/ui/gameplay/moneycounter/Ui_moneyCounter.png'),
		expImg:new ig.Image('media/ui/gameplay/experience/Ui_expbar.png'),
		expBackImg:new ig.Image('media/ui/gameplay/experience/Ui_expbarback.png'),
		pauseBtn:null,
		
		resumeBtn:null,
		quitBtn:null,
		
		font: new ig.Font( 'media/04b03.font.png' ),

		
		shapesPasses: [
			{
				ignoreClimbable: true,
				discardBoundaryInner: true
			}
		],
		
		init:function(){
			this.parent();
			
			this.startSpawnerTimer = new ig.Timer();
			
			
       	 	ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
       	 	ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
       	 	
       	 	ig.input.bind(ig.KEY.UP_ARROW, 'up')
       	 	ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
            
            ig.input.bind(ig.KEY.F, 'shoot');
            ig.input.bind(ig.KEY.S, 'switch');
      	 	
       	 	//UI
       	 	var baseSize = 60;
	   	    var stickSize = 20;
	        var margin = 20;
	        var y = ig.system.height - baseSize - margin;
	        var x1 = baseSize + margin;
	        this.stickLeft = new ig.AnalogStick( x1, y, baseSize, stickSize );                      
	        
	        this.buttons = [
	        	new ig.TouchButton('shoot', ig.system.width - 83,  ig.system.height - 70, 83, 60, new ig.Image('/media/ui/gameplay/Ui_firebtnUp.png'), 0, new ig.Image('/media/ui/gameplay/Ui_firebtnDown.png')),
	       		new ig.TouchButton('switch', ig.system.width/2 - 96, ig.system.height - 68, 28, 39, new ig.Image('/media/ui/gameplay/abilities/Ui_switchbtnUp.png'), 0, new ig.Image('/media/ui/gameplay/abilities/Ui_switchbtnUp.png'))
	        ];
	        
	        this.pauseBtn = new ig.TouchButton('pause', ig.system.width/2 + 100, 20, 20,20,new ig.Image('/media/ui/gameplay/pausebtn.png'));
	        this.resumeBtn = new ig.TouchButton('resume', ig.system.width/2, 20, 70,40, new ig.Image('/media/ui/gameplay/pause_menu/ui_resume.png'));
	        this.quitBtn = new ig.TouchButton('quit', ig.system.width/2, 90, 70,40, new ig.Image('/media/ui/gameplay/pause_menu/ui_quit.png'));

	        
	        for(var i = 0; i < _c.EQUIPPED_ABILITIES.length;i++){
	        	var ability = _c.EQUIPPED_ABILITIES[i];
	        	console.log(ability);
	        	var x = (ig.system.width/2 - 62) + (i * 38.75);
	        	this.buttons.push(new ig.TouchButton(ability.name, x, ig.system.height - 63, 33, 33, new ig.Image(ability.button_up), 0, new ig.Image(ability.button_down), ability.type));
	        } 
	         for(var i = 0; i < _c.EQUIPPED_ITEMS.length;i++){
	        	var ability = _c.EQUIPPED_ITEMS[i];
	        	console.log(ability);
	        	var x = (ig.system.width/2 - 62) + (i * 38.75);
	        	this.buttons.push(new ig.TouchButton(ability.name, x, ig.system.height - 63, 33, 33, new ig.Image(ability.button_up), 0, new ig.Image(ability.button_down), ability.type, i));
	        }   
       	 	
		},
		
		update:function(){
			this.parent();
			
			
			if(!this.paused){
				if(this.startSpawnerTimer){
					if(this.startSpawnerTimer.delta() > 2){
						console.log("SPAWNING ENEMIES")
						this.spawningEnemies = true;
						this.startSpawnerTimer = null;
					}
				}
				
				var y = this.turbolog.pos.y - (ig.system.height / 2) + 20;
				this.screen.y = (y > 0 && y < ig.system.height + 70) ? y : this.screen.y;
				//console.log(this.screen.y)
				
				
				if(ig.input.state('slow')){
					this.movementSpeed -= 2;
				}
				
				if(ig.input.pressed("switch")){
					console.log("SWITCH")
					if(this.activeBar == "ability"){
						this.activeBar = 'item';
					} else {
						this.activeBar = "ability";
					}
				}
				
				if(ig.input.pressed("pause")){
					this.pause();
				}
				
				if(ig.input.pressed("bomb")){				
					for(var b = 0;b < _c.EQUIPPED_ITEMS.length;b++){
						item = _c.EQUIPPED_ITEMS[b];
						if(item.name == 'bomb'){
							if(item.count > 0){
								item.count--;
								//USE ITEM
							}
						}
					}
				}
				if(ig.input.pressed("laser")){				
					for(var b = 0;b < _c.EQUIPPED_ITEMS.length;b++){
						item = _c.EQUIPPED_ITEMS[b];
						if(item.name == 'laser'){
							if(item.count > 0){
								item.count--;
								//USE ITEM
							}
						}
					}
				}
			
			}
			
			
			if(ig.input.pressed('resume')){
				this.unpause();
			}
			
			if(ig.input.pressed('quit')){
				ig.system.setGame(endlevel);
			}
			
			
			
			this.movementSpeed++;
			this.movementSpeed = Clamp(this.movementSpeed, 100, 1);
			
			
			if(_c.EXP > _c.CUR_GOAL){
				_c.LEVEL++;
				_c.CUR_GOAL = _c["REQ_LEVEL_" + (_c.LEVEL + 1)];
			}
			
			
		},
		
		//Add the background with given entity (contains foreground and 'front'ground)
		addBackground:function(Entity){
			this.background = this.spawnEntity(Entity,0,0);
			this.sortEntitiesDeferred();
		},
		
		endGame:function(){
			ig.system.setGame(endlevel);
		},
		
		
		draw:function(){
			this.parent();
			
			//buttons
			this.stickLeft.draw();
			this.pauseBtn.draw();
			
			
			//Backings
			this.healthBackImg.draw(10, -9);
			this.manaBackImg.draw(9, 23);

			
			
			//bars
			if(this.turbolog && this.turbolog.dying == false){
				
				var turbologhealthpct = (this.turbolog.health/this.turbolog.maxhealth) * 110;
				this.healthImg.draw(10,-15, 0, 0, turbologhealthpct, 80);	        
		        if(this.turbolog.magic > 0){
		        	
		        	var turbologmanapct = (this.turbolog.magic/this.turbolog.maxmagic) * 120;
					this.manaImg.draw(6,20,0,0,turbologmanapct, 80);
		        	//var aimg = new ig.Image('media/ui/gameplay/ui_magicbar.png');
					//aimg.draw(10,20, 0, 0, this.barWidth * this.turbolog.magic, 25);
		        }
			}
			
			var x = ig.system.width/2 - 136/2,
				y = ig.system.height - 70;
				//262
			this.abilityImg.draw(x,y);
			
			
			
			var exppct = (_c.EXP/_c.CUR_GOAL)*193;
			//console.log(exppct);
			
			
			
			this.expBackImg.draw(ig.system.width/2 - 100,ig.system.height - 60);
			this.expImg.draw(ig.system.width/2 - 66,ig.system.height - 56,0,0, exppct, 80);
			this.font.draw(_c.LEVEL, ig.system.width/2 - 80, ig.system.height - 20, ig.Font.ALIGN.RIGHT );

			
			this.moneyImg.draw(ig.system.width - 120, -15);
			this.font.draw(_c.MONEY, ig.system.width - 20, 23, ig.Font.ALIGN.RIGHT );
			for(var i = 0;i < this.buttons.length;i++){
				if(this.buttons[i].type == null || this.buttons[i].type == this.activeBar){
					this.buttons[i].draw();
					if(this.buttons[i].num != null){
						this.font.draw(_c.EQUIPPED_ITEMS[this.buttons[i].num].count, this.buttons[i].pos.x, this.buttons[i].pos.y - 20, ig.Font.ALIGN.RIGHT );
					}
				}
			}
			
			if(this.paused){
				this.resumeBtn.draw();
				this.quitBtn.draw();
			}
		}
		
	})
})


function Clamp(num, max, min){
	if(num > max){num = max}
	if(num < min){num = min}
	return num;
}
