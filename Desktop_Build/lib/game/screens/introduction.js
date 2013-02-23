ig.module( 
	'game.screens.introduction' 
)
.requires(
	'impact.game',
    'impact.sound',
    'impact.animation',
	'impact.font',
	'game.data.data'
)
.defines(function(){

Introduction = ig.Game.extend({
	
	//SaveGame
	savegame:null,
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
    
	reaktant: new ig.Image('media/screens/intro/reaktantbg.png'),
   	Ralpha:0,
	
	
	RIn:true,
	
	RDone:false,
	data:new ig.Data(),
	
	init: function() {
		//Load Player Data
		this.savegame = new ig.Savegame(1);
		SAVEGAME = this.savegame;
		
		TOTAL_MONEY = this.savegame.get('money');
		console.log(TOTAL_MONEY)
		if(TOTAL_MONEY == undefined){
			TOTAL_MONEY = 0;
		}
		
		
		
        ig.input.bind(ig.KEY.ENTER, 'start');
        
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		if( ig.input.pressed('start') ) {
			ig.system.setGame(MainMenu);
		}
		
		
		
				
		
		// Add your own, additional update code here
	},
                        
   
	
	draw: function() {
		// Draw all entities and backgroundMaps
		
		this.parent();
		
		// Create animation
		var RanimSheet = new ig.AnimationSheet( 'media/screens/intro/reaktantbg.png', 500, 200 );
		var Ranim = new ig.Animation( RanimSheet, 1, [0] );
		
		
		
		// Update animation to current frame
		Ranim.update();
		
		Ranim.alpha = this.Ralpha;
		//this.Ralpha -= .01;
		//
		
		
		
		var mid = ig.system.width/2;
		
		
		
		
		if(this.RIn){
			this.Ralpha += 0.01;
			if(this.Ralpha >= 1){
				this.RIn = false;
				this.RDone = true;
			}
			Ranim.draw(mid - 275 ,0);
		}
		
		if(this.RDone){
			this.Ralpha -= 0.01;
			if(this.Ralpha <= 0){
				this.RDone = false;
				ig.system.setGame(MainMenu);
			}
			Ranim.draw(mid - 275 ,0);
		}
		

		
        //this.acidbath.draw(ig.system.width - this.acidbath.width, 0);
		// Add your own drawing code here
		var x = ig.system.width - 60,
			y = ig.system.height - 10;
		 if(!ig.ua.mobile){
        	this.font.draw( 'PRESS ENTER TO SKIP', x, y, ig.Font.ALIGN.CENTER );
        }
	}
});

});