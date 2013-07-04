ig.module(
        'plusplus.config-user'
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
			
			// speeds
			MAX_SPEED: 100,
			MIN_SPEED: 0,
			
			//Money
			MONEY:0,
			
			//Experience
			EXP:95,
			
			//Player Level
			LEVEL:1,
			
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
			
			FIRST_LOG:true,
			
			//////////   FIRE TREE   /////////
			
			
			//////////   EARTH TREE   /////////
			
			
			//////////   AIR TREE   /////////
		};
		
		

    });