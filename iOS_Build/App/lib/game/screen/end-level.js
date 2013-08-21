ig.module(
	'game.screen.end-level'
)
.requires(
	'plusplus.core.config',
    'plusplus.core.loader',
    'plusplus.core.game',
	
	'impact.font',
	'plugins.touch-button',
	'plugins.button',
	'game.screen.main-menu',
	'game.screen.my-log'
)
.defines(function(){
	_c = ig.CONFIG;
	buttons = [];
	
	endlevel = ig.GameExtended.extend({
        font: new ig.Font( 'media/04b03.font.png' ),
	
		
		init: function(){
			this.parent();
			
			
		},
		
		update:function(){
			this.parent();
			
			
		},
		
		draw:function(){
			this.parent();
			
			this.font.draw("END LEVEL", ig.system.width/2, ig.system.height/2, ig.Font.ALIGN.CENTER);
		}
		
	})
	
})
