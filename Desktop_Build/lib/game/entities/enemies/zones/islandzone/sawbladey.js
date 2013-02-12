ig.module(
    'game.entities.enemies.zones.islandzone.sawbladey'
)
.requires(
    'impact.game',
    'impact.entity'
)
.defines(function(){
 
EntityEnemyController = ig.Entity.extend({
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
		},
		
		update:function(){
			this.parent();
		}

});


});