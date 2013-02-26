var GAME_TYPE = "STORY";

//Inventory
var NUM_BOMBS = 3;
var NUM_LASERS = 3;
var NUM_SHIELDS = 3;

//STATISTIC VARIABLES
var magnetism = 1;
var laser_time = 5;
var shield_time = 5;

//TEMPORARY VARIABLES
var new_money = 0;
var new_exp = 0;

//TOTAL VARIABLES
var TOTAL_MONEY = 0;
var TOTAL_EXP = 0;
var CURRENT_LEVEL = 0;

var SAVEGAME;

//CURRENT BUILD
var VERSION = .1;

ig.module(
	'game.data.data'
)
.requires(
	'impact.system'
)
.defines(function(){
	
ig.Data = ig.Class.extend({
	
	test:"test",
	
	
	
	saveMoney:function(){
		SAVEGAME.set('money', TOTAL_MONEY)
	}
	
	
})

})