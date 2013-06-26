

// players might need some basic functionality
// like input handling, camera following, etc
// to take advantage of these extend ig.Player
ig.module(
    'game.entities.player'
)
// now require the appropriate files
.requires(
    // note that anything in abstractities
    // is an abstract entity that needs to be extended
    'plusplus.abstractities.player',
	// require the projectile for the grenade
	'plusplus.abstractities.projectile',
	// and an explosion for fun
	'plusplus.entities.explosion',
	// require the shoot ability
	'plusplus.abilities.ability-shoot',
	// require the glow ability
	// lets see some lights!
	'plusplus.abilities.glow',
	// if you want to use the config
    // don't forget to require it
    'plusplus.core.config',
	'plusplus.helpers.utils'
)
// define the main module
.defines(function () {
    "use strict";
	
	var _c = ig.CONFIG;
	var _ut = ig.utils;
	
    ig.EntityPlayer = ig.global.EntityPlayer = ig.Player.extend({
		
		size: {x: 8, y:14},
		offset: {x: 4, y: 2},
		
		health: 10,
		
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'player.png', 16, 16 ),	
		
		// add animations
		
		animSettings: {
			idle: {
				frameTime: 1,
				sequence: [0]
			},
			run: {
				frameTime: 0.07, 
				sequence: [0,1,2,3,4,5]
			},
			jump: {
				frameTime: 1, 
				sequence: [9]
			},
			fall: {
				frameTime: 0.4, 
				sequence: [6,7]
			}
		},
		
		// settings for glow
		
		glowSettings: {
			light: {
				performance: _c.DYNAMIC,
				castsShadows: true
			}
		},
		
		initProperties: function () {
			
			this.parent();
			
			this.abilities.addDescendants( [
				new ig.AbilityGlow( this, {
					sizeMod: 10
				}),
				new ig.GrenadeLauncher( this )
			]);
			
		}
		
	});

	/**
	 * Projectile for player shoot ability.
	 **/
	ig.EntitySlimeGrenade = ig.global.EntitySlimeGrenade = ig.Projectile.extend({
		
		collides: ig.Entity.COLLIDES.LITE,
		
		size: {x: 4, y: 4},
		
		offset: {x: 2, y: 2},
			
		animSheet: new ig.AnimationSheet( _c.PATH_TO_MEDIA + 'slime-grenade.png', 8, 8 ),
		
		animSettings: {
			idle: {
				frameTime: 0.2,
				sequence: [0,1]
			}
		},
		
		damage: 10,
		
		// 2 second fuse!
		
		lifeDuration: 2,
		
		// less gravity
		
		gravityFactor: 0.5,
		
		// low friction
		
		friction: { x: 5, y: 0 },
		
		
		glowSettings: {
			light: {
				performance: _c.DYNAMIC,
				castsShadows: true
			}
		},
		
		
		
		
		die: function () {
			
			if ( !this.dieingSilently ) {
				
				// EXPLOSIONS!
				
				ig.game.spawnEntity(ig.EntityExplosion, this.pos.x, this.pos.y, {
                    entity: this,
					spawnCountMax: 10,
					spawnSettings: {
						animTileOffset: ig.EntityParticleColor.colorOffsets.GREEN
					}
                });
				
			}
			
			this.parent();
			
		}
		
	});
	
	/**
	 * Ability for shooting grenades.
	 **/
	ig.GrenadeLauncher = ig.AbilityShoot.extend( {
		
		spawningEntity: ig.EntitySlimeGrenade,
		
		offsetVelX: 200,
		offsetVelY: 200,
		
		relativeVelPctX: 1,
		relativeVelPctY: 0.5,
		
		initTypes: function () {

			this.parent();

			_ut.addType(ig.Ability, this, 'type', "SPAMMABLE");

		}
		
	} );

});