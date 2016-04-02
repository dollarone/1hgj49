var PlatfomerGame = PlatformerGame || {};

//title screen
PlatformerGame.Game = function(){};

PlatformerGame.Game.prototype = {

    create: function() {
        this.game.stage.backgroundColor = "#000";

        this.game.camera.follow(this.player);


        this.grass_tiles = this.game.add.group();
        for (var x = 0; x < this.game.world.width; x += 128) {
            for (var y = -122; y < this.game.world.height; y += 128) {
                var grass = this.grass_tiles.create(x, y, 'grass');
            }
        }

        this.speed = 1;
        //var car = {}
        carspeed = 14;
        roadmin = 200;
        roadmax = 500;
        roadchange = 0;

        this.road_tiles = this.game.add.group();
        for (var x = roadmin; x < roadmax; x += 128) {
            for (var y = -122; y < this.game.world.height; y += 128) {
                var road = this.road_tiles.create(x, y, 'road');
                road.anchor.setTo(0, 0);
            }
        }


        this.sticky_tiles = this.game.add.group();
        this.sticky_tiles.enableBody = true;


        this.players = this.game.add.group();
        
        this.player = this.players.create(400, 400, 'car');
        this.player.scale.setTo(0.5, 0.5);

        this.game.physics.arcade.enable(this.player);

        this.player.anchor.setTo(0.5);
        this.player.body.collideWorldBounds = true;
        this.reset();
              
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(this.spawnOil, this);

        this.rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.rKey.onDown.add(this.spawnOil, this);
               
        this.music = this.game.add.audio('music');
        this.music.loop = true;
//        this.music.play();
        this.music.volume = 0.6;
        

        //  The score
        this.scoreText = this.game.add.text(16, 16, 'Distance: 0', { fontSize: '32px', fill: '#fff' });
        //this.scoreText.fixedToCamera = true;
        this.score = 0;
        this.scoreText.visible = false;

        //  Our controls.
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.timer = 0;

        this.showDebug = false;
    },

    reset: function() {
        this.speed = 300;
        this.score = 0;
        this.player.x = 400;
        this.player.y = 400;
        this.player.visible = true;
        this.timer = 0;
        this.deathWhat = false;

    },

    spawnOil: function() {

        var oil = this.sticky_tiles.create(this.game.rnd.integerInRange(roadmin + 64, roadmax + 16) + roadchange, -200, 'oil');
        oil.anchor.setTo(0.5);
        oil.slowActive = true;
    },

    update: function() {
        this.timer++;

        this.grass_tiles.forEach(function(tile) {
            tile.y += carspeed;//1; //this.speed;

            if (tile.y > 600) {
                tile.y -= (600 + 128);
            }

        }, null);
        this.road_tiles.forEach(function(tile) {
            tile.y += carspeed;//1; //this.speed;

            if (tile.y > 600) {
                tile.y -= (600 + 128);
                tile.x += roadchange;
            }

        }, null);

        this.sticky_tiles.forEach(function(tile) {
            tile.y += carspeed;//1; //this.speed;
        }, null);

        if (this.timer % 120 == 0) { 
            this.spawnOil(); 
            if (carspeed > 0.1) {
               carspeed -= 0.1
            }
        }

        this.scoreText.text = carspeed;

        if (this.timer > 300 && this.timer < 1100 && this.timer % 64 == 0) {
            roadchange++;
        }

        if (this.timer > 1300 && this.timer < 2100 && this.timer % 64 == 0) {
            roadchange--;
        }

        if (this.timer > 2000 && this.timer < 2700 && this.timer % 64 == 0) {
            roadchange--;
        }

        if (this.timer > 3000 && this.timer < 4400 && this.timer % 64 == 0) {
            roadchange++;
        }

        if (this.timer > 5000 && this.timer < 5700 && this.timer % 64 == 0) {
            roadchange--;
        }


        this.game.physics.arcade.overlap(this.player, this.sticky_tiles, this.slowdown, null, this);

        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown)
        {
            this.player.body.velocity.x = -this.speed;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.velocity.x = this.speed;
        }

        if (this.player.x > roadmax + roadchange + 80 || this.player.x < roadmin + roadchange) {
            if (carspeed > 0.1) {
               carspeed -= 0.1
            }

        }
    },

    slowdown: function(player, tile) {
        if (tile.slowActive) {
            carspeed -= 2;
        }
        tile.slowActive = false;
    },

    render: function() {

        if (this.showDebug) {
            this.game.debug.body(this.player);
        }
    },

};