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
		
		shapesPasses: [
			{
				ignoreClimbable: true,
				discardBoundaryInner: true
			}
		],
		
		init:function(){
			this.parent();
			
			
       	 	ig.input.bind(ig.KEY.LEFT_ARROW, 'slow');
       	 	ig.input.bind(ig.KEY.RIGHT_ARROW, 'fast');
       	 	
       	 	ig.input.bind(ig.KEY.UP_ARROW, 'up')
       	 	ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
       	 	
       	 	var baseSize = 50;
	   	    var stickSize = 20;
	        var margin = 10;
	        var y = ig.system.height - baseSize - margin;
	        var x1 = baseSize + margin;
	
	        this.stickLeft = new ig.AnalogStick( x1, y, baseSize, stickSize );                      
	        
       	 	
		},
		
		update:function(){
			this.parent();
			
			
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
			        this.stickLeft.draw();

			
		}
		
	})
})
