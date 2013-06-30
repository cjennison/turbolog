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

		
		shapesPasses: [
			{
				ignoreClimbable: true,
				discardBoundaryInner: true
			}
		],
		
		init:function(){
			this.parent();
			
			this.startSpawnerTimer = new ig.Timer();
			
			
       	 	ig.input.bind(ig.KEY.LEFT_ARROW, 'slow');
       	 	ig.input.bind(ig.KEY.RIGHT_ARROW, 'fast');
       	 	
       	 	ig.input.bind(ig.KEY.UP_ARROW, 'up')
       	 	ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
            
            ig.input.bind(ig.KEY.F, 'shoot');
       	 	
       	 	//UI
       	 	var baseSize = 60;
	   	    var stickSize = 20;
	        var margin = 20;
	        var y = ig.system.height - baseSize - margin;
	        var x1 = baseSize + margin;
	        this.stickLeft = new ig.AnalogStick( x1, y, baseSize, stickSize );                      
	        
	        this.buttons = [
	        	new ig.TouchButton('shoot', ig.system.width - 70,  ig.system.height - 70, 64, 64, new ig.Image('/media/ui/gameplay/button_shoot_fire.png'), 0)
	        ]  
       	 	
		},
		
		update:function(){
			this.parent();
			if(this.startSpawnerTimer){
				if(this.startSpawnerTimer.delta() > 2){
					console.log("SPAWNING ENEMIES")
					this.spawningEnemies = true;
					this.startSpawnerTimer = null;
				}
			}
			
			
			
			
			if(ig.input.state('slow')){
				this.movementSpeed -= 2;
			}
			
			this.movementSpeed++;
			this.movementSpeed = Clamp(this.movementSpeed, 100, 1);
		},
		
		//Add the background with given entity (contains foreground and 'front'ground)
		addBackground:function(Entity){
			this.background = this.spawnEntity(Entity,0,0);
			this.sortEntitiesDeferred();
		},
		
		
		draw:function(){
			this.parent();
			
			//buttons
			this.stickLeft.draw();
			for(var i = 0;i < this.buttons.length;i++){
				this.buttons[i].draw();
			}
			
			//bars
			if(this.turbolog && this.turbolog.dying == false){
				var img = new ig.Image('media/ui/gameplay/ui_healthbar.png');
				img.draw(10,1, 0, 0, this.barWidth * this.turbolog.health, 25);	        
		        if(this.turbolog.magic > 0){
		        	var aimg = new ig.Image('media/ui/gameplay/ui_magicbar.png');
					aimg.draw(10,20, 0, 0, this.barWidth * this.turbolog.magic, 25);
		        }
		       // this.font.draw( 'Money: ' + this.money, 50, 50, ig.Font.ALIGN.CENTER );
			}
			
			
		}
		
	})
})


function Clamp(num, max, min){
	if(num > max){num = max}
	if(num < min){num = min}
	return num;
}
