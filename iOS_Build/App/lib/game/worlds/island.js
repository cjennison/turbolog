ig.module(
	'game.worlds.island'
)
.requires(
	'plusplus.core.config',
    'plusplus.core.loader',
    'plusplus.core.game',
    'plusplus.core.layer',
    'plusplus.entities.light',
    
    'turbolog.level',
	
	'impact.font',
	'plugins.touch-button',
	'plugins.button',
	'game.entities.player',
	'game.entities.spike',
	'game.entities.background.IslandBackground',
	'game.entities.characters.TurboLog',
	
	'game.entities.enemies.island.bigbirdy'
)
.defines(function(){
	WorldIsland = ig.TurboLevel.extend({
		
		//Level Variables
		skyLimit:{min:10, max:300},
		waterLimit:{min:300, max:600},
		
		//Spawner Collection
			//Timer - The Spawner Timer controller
			//Delay - The Delay of enemy spawning
		birdSpawner:null,
		birdDelay:4,
		
		shapesPasses: [
			{
				ignoreClimbable: true,
				discardBoundaryInner: true
			}
		],
		init:function(){
			this.parent();
			
			this.birdSpawner = new ig.Timer();
			
			//Add background (includes foreground)		
			this.addBackground(EntityIslandBackground);
			this.turbolog = this.spawnEntity(EntityTurboLog, 50, ig.system.height/2 );
			this.sortEntitiesDeferred();
			
		},
		
		
		
		
		update:function(){
			this.parent();
			
			var y = this.turbolog.pos.y - (ig.system.height / 2);
			this.screen.y = (y > 0 && y < ig.system.height) ? y : this.screen.y;
			//console.log(this.screen.y)
			
			this.spawnEnemies();
			
		},
		
		
		spawnEnemies:function(){
			if(this.spawningEnemies){
				if(this.birdSpawner.delta() > this.birdDelay){
					var yPos = Math.random() * this.skyLimit.max + this.skyLimit.min;
					ig.game.spawnEntity(EntityBigbirdy, ig.system.width + 50, yPos);
					this.birdSpawner.reset()
				}
			} else {
				
				this.birdSpawner.reset();
			}
		},
		
		draw:function(){
			this.parent();
			
			
		}
	
	
	})
	
});


