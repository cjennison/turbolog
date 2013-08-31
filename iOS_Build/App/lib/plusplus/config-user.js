ig.module(
        'plusplus.config-user'
    )
    .requires(
    	'impact.image',
    	'plugins.touch-button'
    )
    .defines(function () {

        /**
         * User configuration of Impact++.
         * <span class="alert alert-info"><strong>Tip:</strong> it is recommended to modify this configuration file!</span>
         * @example
         * // in order to add your own custom configuration to Impact++
         * // edit the file defining ig.CONFIG_USER, 'plusplus/config-user.js'
         * // ig.CONFIG_USER is never modified by Impact++ (it is strictly for your use)
         * // ig.CONFIG_USER is automatically merged over Impact++'s config
         * @static
         * @readonly
         * @memberof ig
         * @namespace ig.CONFIG_USER
         * @author Collin Hover - collinhover.com
         **/
        ig.CONFIG_USER = {
			
			// make it bigger!
			SCALE: 1,
			
			RESULT:"LOSE",
			
			// speeds
			MAX_SPEED: 100,
			MIN_SPEED: 0,
			
			//Money
			MONEY:0,
			
			//Experience
			EXP:95,
			
			//Player Level
			LEVEL:1,
			
			DAMAGE:1,
			ARMOR:1,
			
			//EXP REQS
			REQ_LEVEL_2:100,
			REQ_LEVEL_3:200,
			REQ_LEVEL_4:12500,
			
			CUR_GOAL:100,
			
			//Level of Item Magnetism
			MAGNETISM:5,
			
			EQUIPPED_ABILITIES:[
				{
					name:'shoot',
					type:'ability',
					button_up:'media/ui/gameplay/abilities/Ui_generalabilitybtn.png',
					button_down:'media/ui/gameplay/abilities/Ui_generalDown.png',
					mana:1,
				},
				{
					name:'fire',
					type:'ability',
					button_up:'media/ui/gameplay/abilities/Ui_generalabilitybtn.png',
					button_down:'media/ui/gameplay/abilities/Ui_generalDown.png',
					mana:1,
				},
				{
					name:'fire',
					type:'ability',
					button_up:'media/ui/gameplay/abilities/Ui_generalabilitybtn.png',
					button_down:'media/ui/gameplay/abilities/Ui_generalDown.png',
					mana:1,
				},
			],
			
			EQUIPPED_ITEMS:[
				{
					name:'bomb',
					type:'item',
					button_up:'media/ui/gameplay/items/Ui_itembombUP.png',
					button_down:'media/ui/gameplay/items/Ui_itembombDOWN.png',
					count:3,
				},
				{
					name:'laser',
					type:'item',
					button_up:'media/ui/gameplay/items/Ui_itemlaserUP.png',
					button_down:'media/ui/gameplay/items/Ui_itemlaserDOWN.png',
					count:2,
				},
			
			],
			
			EQUIPPED_GEAR:{
				//head:null,
				//body:null,
				//legs:null
			},
			
			FIRST_LOG:true,
			SELECTED_TREE:null,
			
			//////////   FIRE TREE   /////////
			TREES:[
				{
					name:"FIRE",
					id:"fire",
					base_abilities:[
						{
							mod:"DAMAGE",
							amt:5,
							active:true
						}
					],
					
					abilities:[
						{
							name:"Flame Up",
							id:"ABI_FLAME_UP",
							type:"MODIFIER",
							image:"fire_up.png",
							mod:"DAMAGE",
							amt:1,
							amt_mod:1,
							max_stage:5,
							active:true,
							level:1,
							pos:.5,
							tier:1,
							stage:1
						},
						{
							name:"Fire Armor",
							id:"ABI_FLAME_ARMOR",
							type:"MODIFIER",
							image:"fire_armor.png",
							mod:"ARMOR",
							amt:1,
							max_stage:5,
							amt_mod:.5,
							active:true,
							level:1,
							tier:1,
							pos:1.5,
							stage:1
						},
						{
							name:"Volitility",
							id:"ABI_VOLITILE",
							type:"MODIFIER",
							image:"fire_armor.png",
							mod:"ARMOR",
							amt:1,
							amt_mod:2,
							max_stage:3,
							active:true,
							level:5,
							tier:2,
							pos:0,
							stage:1
						},
						{
							name:"Flamey Warz",
							type:"MODIFIER",
							id:"ABI_VOLITILE",
							image:"fire_armor.png",
							mod:"ARMOR",
							amt:1,
							amt_mod:2,
							max_stage:3,
							active:true,
							level:5,
							tier:2,
							pos:1,
							stage:1
						},
						{
							name:"BANG DING OW",
							id:"ABI_BANG_DING",
							type:"MODIFIER",
							image:"fire_armor.png",
							mod:"ARMOR",
							amt:1,
							amt_mod:2,
							max_stage:3,
							active:true,
							level:5,
							tier:2,
							pos:2,
							stage:1
						}
					]
				},
				{
					name:"EARTH",
					base_abilities:[
						{
							mod:"ARMOR",
							amt:5,
							active:true
						}
					],
				},
				{
					name:"AIR",
					base_abilities:[
						{
							mod:"DAMAGE",
							amt:2,
							active:true
						}
					],
				},
			
			],
			
			//////////   EARTH TREE   /////////
			
			
			//////////   AIR TREE   /////////
			
			INVENTORY:[
				{
					id:'test_head_1',
					name:"Super Test Head",
					component:"head",
					mod:"ARMOR",
					amt:2,
					set:"The Tester",
					icon:"test_head.png",
					obj:new ig.Image('/media/ui/my_log/gear/gear_objects/test_object.png')
				},
				{
					id:'test_body_1',
					name:"Super Test Body",
					component:"body",
					mod:"ARMOR",
					amt:4,
					set:"The Tester",
					icon:"test_body.png",
					obj:new ig.Image('/media/ui/my_log/gear/gear_objects/test_object.png')
				},
				{
					id:'test_legs_1',
					name:"Super Test Legs",
					component:"legs",
					mod:"ARMOR",
					amt:3,
					set:"The Tester",
					icon:"test_body.png",
					obj:new ig.Image('/media/ui/my_log/gear/gear_objects/test_object.png')
				}
				
				
			
			],
			
			
			//Statistics
			KILLS:0,
			DEATHS:0,
			GAMES_PLAYED:0,
			TIME_PLAYED:0,
			MONEY_EARNED:0,
			MONEY_SPENT:0,
			
			
		};
		
		
		
		

    });