ig.module( 
	'game.screens.cinematics' 
	
)
.requires(
	'impact.game',
	'impact.font',
	'game.data.data'
	
)
.defines(function(){
	
StoryIntroduction = ig.Game.extend({
	font: new ig.Font( 'media/04b03.font.png' ),
	
	subtitles: [
		"Hey You",
		"Reading this Tutorial",
		"Skip it with Enter",
		"It doesn't work right, yet."
	],
	
	subtitleTimer:null,
	subDelay:3,
	curSub:0,
	
	
	init:function(){
		ig.input.bind(ig.KEY.ENTER, 'start');
		
		this.subtitleTimer = new ig.Timer();
	},
	
	update:function(){
		this.parent();
		
		
		if(this.subtitleTimer.delta() > this.subDelay){
			this.curSub++;
			this.subtitleTimer.reset();
		}
		
		if(ig.input.pressed("start")){
			ig.system.setGame(Map);
		}
	},
	
	draw:function(){
		this.parent();
		
		if(this.subtitles[this.curSub] != undefined){
			this.font.draw(this.subtitles[this.curSub], ig.system.width/2, 195, ig.Font.ALIGN.CENTER);
		} else {
			ig.system.setGame(Map);
		}
	}

});


});