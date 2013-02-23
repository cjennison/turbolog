ig.module( 
	'game.screens.endscreen' 
	
)
.requires(
	'impact.game',
	'impact.font',
	'game.data.data'
	
)
.defines(function(){

EndScreen = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	curMoney:0,
	data:new ig.Data(),
		
	init: function() {
		// Initialize your game here; bind keys etc.
		curMoney = TOTAL_MONEY;
		//Keys
		ig.input.bind(ig.KEY.ENTER, 'start');
     	
     	
     	
     	
	},
	
	update: function() {
		
		//Increase EXP Earned
		if(new_exp > 0){
			new_exp--;
			TOTAL_EXP++;	
		}
		
		//Increase Money Earned
		if(new_money > 0){
			new_money--;
			TOTAL_MONEY++;	
		} else {
			this.data.saveMoney();
			if(ig.input.pressed("start")){
				ig.system.setGame(EndlessMode);
			}
		}
		
		this.parent();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		

		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		this.font.draw("MONEY: " + TOTAL_MONEY, x,y, ig.Font.ALIGN.LEFT)
		this.font.draw("EXP: " + TOTAL_EXP, x,y + 20, ig.Font.ALIGN.LEFT)

		if(new_money <= 0){
			this.font.draw( 'Press Enter to Replay', x, y + 40, ig.Font.ALIGN.CENTER );
		}

		
	}
});

});