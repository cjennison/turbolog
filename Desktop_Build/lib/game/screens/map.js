ig.module( 
	'game.screens.map' 
	
)
.requires(
	'impact.game',
	'impact.font',
	'game.data.data'
	
)
.defines(function(){
	
Map = ig.Game.extend({
		
	font: new ig.Font( 'media/04b03.font.png' ),
	curMoney:0,
	data:new ig.Data(),
	mapbg: new ig.Image('media/screens/map/map.png'),
	node: new ig.Image('media/screens/map/mapnode.png'),
	
	init: function() {
		// Initialize your game here; bind keys etc.
		curMoney = TOTAL_MONEY;
		//Keys
		ig.input.bind(ig.KEY.ENTER, 'start');

	},
	
	update: function() {
		
		
		if(ig.input.pressed("start")){
			ig.system.setGame(EndlessMode);
		}
		
		
		this.parent();
	},
	
	draw:function(){
		this.parent();
		this.mapbg.draw(0,0);
		this.node.draw(110, 180);
		
		this.font.draw( 'Press Enter to Start Trial Mode', ig.system.width/2, 195, ig.Font.ALIGN.CENTER );

	}
	
});	




});