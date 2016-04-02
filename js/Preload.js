var PlatformerGame = PlatformerGame || {};

//loading the game assets
PlatformerGame.Preload = function(){};

PlatformerGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.spritesheet('logo-tiles', 'assets/images/logo-tiles.png', 17, 16);
    
    this.game.load.image('car', 'assets/images/car_blue_1.png');
    this.game.load.image('grass', 'assets/images/grass.png');
    this.game.load.image('road', 'assets/images/asphalt.png');
    this.game.load.image('oil', 'assets/images/oil.png');

    this.game.load.spritesheet('explosion1', 'assets/images/explosion_01_strip13.png', 196, 190);
    this.game.load.spritesheet('explosion2', 'assets/images/explosion_02_strip13.png', 205, 190);
    this.game.load.spritesheet('explosion3', 'assets/images/explosion_03_strip13.png', 190, 190);

    this.game.load.audio('music', 'assets/audio/music.ogg');

  },
  create: function() {
    this.state.start('Game');
  }
};
