ig.module(
	'game.worlds.island'
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
	'game.entities.player',
	'game.entities.spike',
	'game.entities.background.island-bg',
	'game.levels.test'
)
.defines(function(){
	island = ig.GameExtended.extend({
		background: null,
		
		shapesPasses: [
			{
				ignoreClimbable: true,
				discardBoundaryInner: true
			}
		],
		init:function(){
			this.parent();
			this.loadLevel(ig.global.LevelTest);
			//this.camera.addAtmosphere(100, {r:0,g:0,b:0, a:.1});
			this.background = this.spawnEntity(EntityIslandBackground,0,0)
			//var light = ig.game.spawnEntity(ig.EntityLight, 0, 0);
			//light.radius = 60;

		},
		
		
		update:function(){
			this.parent();
			
			
		},
		
		
		draw:function(){
			this.parent();
			
			
		}
	
	
	})
	
});
