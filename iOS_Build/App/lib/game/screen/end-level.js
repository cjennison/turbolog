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
		loot_btn:null,
		noloot_btn: new ig.Image('/media/noloot_button.png'),
		continue_btn:null,
		
		viewing_loot:false,
		
		//Loot Window
		loot_window:new ig.Image('/media/ui/end_level/loot_background.png'),
		loot_close:null,
		loot_leftbtn:null,
		loot_rightbtn:null,
		
		
		
		init: function(){
			this.parent();
			this.loot_btn = new ig.TouchButton('LOOT', ig.system.width - 140, 100, 130, 70, new ig.Image('/media/loot_button.png'), 0);
		
			//Loot Window
			this.loot_close = new ig.TouchButton('CLOSE_LOOT',ig.system.width/2 + 105, 50, 25, 25, new ig.Image('/media/ui/end_level/loot_close.png'), 0);
			this.continue_btn = new ig.TouchButton('CONTINUE', ig.system.width/2 - 65, ig.system.height - 80, 130, 50, new ig.Image('/media/ui/end_level/end_continue.png'), 0);
			
		
		
		
		
		},
		
		update:function(){
			this.parent();
			
			if(_c.LOOT.length > 0){
				if(ig.input.pressed("LOOT")){
					this.viewing_loot = true;
				}
			}
			
			if(ig.input.pressed("CLOSE_LOOT")){
				this.viewing_loot = false;
			}
			
			if(ig.input.pressed("CONTINUE")){
					ig.system.setGame(mainmenu);
			}
			
		},
		
		draw:function(){
			this.parent();
			
			//Draw Loot Buttons
			if(_c.LOOT.length > 0){
				this.loot_btn.draw();
			} else {
				this.noloot_btn.draw(ig.system.width - 140, 100);
			}
			
			if(_c.RESULT == "LOSE"){
				this.font.draw("FOILED AGAIN!", ig.system.width/2, 30, ig.Font.ALIGN.CENTER);
			} else {
				this.font.draw("GREAT SUCCESS!", ig.system.width/2, 30, ig.Font.ALIGN.CENTER);
			}
			
			this.font.draw("MONEY:  +" + _c.NEW_MONEY, ig.system.width/2, 100, ig.Font.ALIGN.CENTER);
			this.font.draw("END LEVEL", ig.system.width/2, ig.system.height/2, ig.Font.ALIGN.CENTER);
			
			this.continue_btn.draw();
			
			//Player is viewing their new loot
			if(this.viewing_loot){
				this.loot_window.draw(ig.system.width/2 - 150, 40);
				this.loot_close.draw();
			}
		
		}
		
	})
	
})
