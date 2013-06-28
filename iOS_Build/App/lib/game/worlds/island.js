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
	'game.entities.characters.TurboLog'
)
.defines(function(){
	WorldIsland = ig.TurboLevel.extend({
		
		//Level Variables
		
		
		shapesPasses: [
			{
				ignoreClimbable: true,
				discardBoundaryInner: true
			}
		],
		init:function(){
			this.parent();
			
			//Add background (includes foreground)		
			this.addBackground(EntityIslandBackground);
			this.turbolog = this.spawnEntity(EntityTurboLog, 50, ig.system.height/2 );
			this.sortEntitiesDeferred();
			
			//this.camera.follow(this.turbolog, true)
			//this.loadLevel(ig.global.LevelTest);
			//this.camera.addAtmosphere(100, {r:0,g:0,b:0, a:.1});
		},
		
		
		
		
		update:function(){
			this.parent();
			
			var y = this.turbolog.pos.y - (ig.system.height / 2);
			this.screen.y = (y > 0 && y < ig.system.height) ? y : this.screen.y;
			//console.log(this.screen.y)
		},
		
		
		draw:function(){
			this.parent();
			
			
		}
	
	
	})
	
});


