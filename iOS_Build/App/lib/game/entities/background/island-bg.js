ig.module(
	'game.entities.background.island-bg'
)
.requires(
	 'plusplus.core.entity'
) 
.defines(function(){
	
	
	EntityIslandBackground = ig.EntityExtended.extend({
		
		init:function(){
			this.parent();
			
			
			console.log("Background Added")
		}
	})
	
})
