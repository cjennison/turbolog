ig.module(
    'game.entities.ui.distancemeter'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityDistanceMeter = ig.Entity.extend({
    size: {x:0, y:0},
    collides: ig.Entity.COLLIDES.NONE,
    gravityFactor: 0,
    
    meter: new ig.Image('media/ui/distance_meter.png'),
    log_icon: new ig.Image('media/ui/turbolog_meter.png'),
    
        
    update: function() {
        this.parent();
    },
    
    draw: function() {
    	this.meter.draw(ig.system.width/2 - this.meter.width/2,ig.system.height - 30);
    	this.log_icon.draw((ig.system.width/2 - this.meter.width/2 - 10) + ig.game.distance, 210);
        this.parent();
    }
    
});

});