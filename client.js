/*  Copyright 2012-2016 Sven "underscorediscovery" Bergström
    
    written by : http://underscorediscovery.ca
    written for : http://buildnewgames.com/real-time-multiplayer/
    
    MIT Licensed.
*/

	//A window global for our game root variable.
var game = {};

	//When loading, we store references to our
	//drawing canvases, and initiate a game instance.
window.onload = function(){

		//Create our game client instance.
	game = new game_core();

			//Fetch the viewport
		game.viewport = document.getElementById('viewport');
		
		        	    var WIDTH = 640,
            HEIGHT = 360;
    //set some camera attributes
    var VIEW_ANGLE = 50,
            ASPECT = WIDTH / HEIGHT,
            NEAR = 0.1,
            FAR = 1000;
            
            game.renderer = new THREE.WebGLRenderer();
		
		game.camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);
	game.scene = new THREE.Scene();
		
		game.scene.add(game.camera);
    //set a default position for the camera
    //not doing this somehow messes up shadow rendering
    game.camera.position.z = 320;
    //start the renderer
    game.renderer.setSize(WIDTH, HEIGHT);
    document.getElementById('gameCanvas').appendChild(renderer.domElement);
		
		var planeWidth = 400,
            planeHeight = 200,
            planeQuality = 10;
    // create the plane's material	
    var planeMaterial =
            new THREE.MeshLambertMaterial(
                    {
                        color: 0x4BD121
                    });
    game.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(
                    planeWidth * 0.95, // 95% of table width, since we want to show where the ball goes out-of-bounds
                    planeHeight,
                    planeQuality,
                    planeQuality),
            planeMaterial);
    game.scene.add(game.plane);
    
        game.pointLight =
            new THREE.PointLight(0xF8D898);
    // set its position
    game.pointLight.position.x = -1000;
    game.pointLight.position.y = 0;
    game.pointLight.position.z = 1000;
    game.pointLight.intensity = 2.9;
    game.pointLight.distance = 10000;
    // add to the scene
    game.scene.add(game.pointLight);
			
			//Adjust their size
		game.viewport.width = game.world.width;
		game.viewport.height = game.world.height;

			//Fetch the rendering contexts
		game.ctx = game.viewport.getContext('2d');

			//Set the draw style for the font
		game.ctx.font = '11px "Helvetica"';

		//Finally, start the loop
	game.update( new Date().getTime() );

}; //window.onload
