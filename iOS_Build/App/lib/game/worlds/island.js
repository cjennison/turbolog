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
	'game.entities.enemies.pickups',
	'game.entities.enemies.island.bigbirdy',
	'game.entities.enemies.island.rocketsaw',
	    'game.entities.ui.healthbar',

	'game.entities.enemies.island.sawbladey'
)
.defines(function(){
	WorldIsland = ig.TurboLevel.extend({
		
		//Level Variables
		skyLimit:{min:10, max:300},
		waterLimit:{min:300, max:600},
		groundPos:220,
		//Spawner Collection
			//Timer - The Spawner Timer controller
			//Delay - The Delay of enemy spawning
		birdSpawner:null,
		birdDelay:4,
		
		sawSpawner:null,
		sawDelay:4,
		
		rocketSawSpawner:null,
		rocketSawDelay:7,
		
		shapesPasses: [
			{
				ignoreClimbable: true,
				discardBoundaryInner: true
			}
		],
		init:function(){
			this.parent();
			
			this.birdSpawner = new ig.Timer();
			this.sawSpawner = new ig.Timer();
			this.rocketSawSpawner = new ig.Timer();			
			
			//Add background (includes foreground)		
			this.addBackground(EntityIslandBackground);
			this.turbolog = this.spawnEntity(EntityTurboLog, 50, ig.system.height/2 );
			this.foreground = ig.game.spawnEntity(EntityIslandForeground,0,0)
			var h = this.spawnEntity(EntityHealthBar, 100, 100)
			console.log(h)
			this.sortEntitiesDeferred();
			
			this.spawnEntity(EntityBombPickup, 400, 100);
			
		},
		
		
		
		
		update:function(){
			this.parent();
			
			
			
			this.spawnEnemies();
			
		},
		
		
		spawnEnemies:function(){
			if(this.spawningEnemies){
				if(this.birdSpawner.delta() > this.birdDelay){
					var yPos = Math.random() * this.skyLimit.max + this.skyLimit.min;
					ig.game.spawnEntity(EntityBigbirdy, ig.system.width + 50, yPos);
					this.birdSpawner.reset()
				}
				
				if(this.sawSpawner.delta() > this.sawDelay){
					var yPos = Math.random() * this.skyLimit.max + this.skyLimit.min;
					ig.game.spawnEntity(EntitySawbladey, ig.system.width + 50, yPos);
					this.sawSpawner.reset()
				}
				
				if(this.rocketSawSpawner.delta() > this.rocketSawDelay){
					var yPos = Math.random() * this.skyLimit.max + this.skyLimit.min;
					ig.game.spawnEntity(EntityRocketsaw, ig.system.width + 50, yPos);
					this.rocketSawSpawner.reset()
				}
			} else {
				
				this.birdSpawner.reset();
				this.sawSpawner.reset()
			}
		},
		
		draw:function(){
			this.parent();
			
			
		}
	
	
	})
	
});


