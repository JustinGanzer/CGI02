/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: scene
 *
 * A Scene is a depth-sorted collection of things to be drawn, 
 * plus a background fill style.
 *
 */



/* requireJS module definition */
define(["three", "util", "shaders", "BufferGeometry", "random", "band"],
    (function(THREE, util, shaders, BufferGeometry, Random, Band) {

        "use strict";

        /*
         * Scene constructor
         */
        var Scene = function(renderer, width, height) {

            // the scope of the object instance
            var scope = this;

            scope.renderer = renderer;
            scope.t = 0.0;

            scope.camera = new THREE.PerspectiveCamera( 66, width / height, 0.1, 2000 );
            scope.camera.position.z = 1000;
            scope.scene = new THREE.Scene();

            scope.animate = false;

            // Add a listener for 'keydown' events. By this listener, all key events will be
            // passed to the function 'onDocumentKeyDown'. There's another event type 'keypress'.
            document.addEventListener("keydown", onDocumentKeyDown, false);


            function onDocumentKeyDown(event){
                // Get the key code of the pressed key
                var keyCode = event.which;

                if(keyCode == 38){
                    console.log("cursor up");
                    scope.currentMesh.rotation.x += 0.05;
                    // Cursor down
                } else if(keyCode == 40){
                    console.log("cursor down");
                    scope.currentMesh.rotation.x += -0.05;
                    // Cursor left
                } else if(keyCode == 37){
                    console.log("cursor left");
                    scope.currentMesh.rotation.y += 0.05;
                    // Cursor right
                } else if(keyCode == 39){
                    console.log("cursor right");
                    scope.currentMesh.rotation.y += -0.05;
                    // Cursor up
                }
                else if(keyCode == 190){
                    console.log("point");
                    scope.currentMesh.rotation.z += 0.05;
                } else if(keyCode == 173){
                    console.log("dash");
                    scope.currentMesh.rotation.z += -0.05;
                }

                // select Robot-parts===================================================================================
                // upper body..........................................................
                else if (keyCode == 54 ){ // 6
                    scope.currentMesh = scope.scene.getObjectByName("head", true);
                    if(scope.currentMesh){console.log("select head");}
                    else console.warn("selection went wrong!")
                }
                else if (keyCode == 84 ){ // t
                    scope.currentMesh = scope.scene.getObjectByName("leftShoulder", true);
                    if(scope.currentMesh){console.log("select leftShoulder");}
                    else console.warn("selection went wrong!")
                }
                else if (keyCode == 90 ){ // z
                    scope.currentMesh = scope.scene.getObjectByName("rightShoulder", true);
                    if(scope.currentMesh){console.log("select rightShoulder");}
                    else console.warn("selection went wrong!")
                }
                else if (keyCode == 82 ){ // r
                    scope.currentMesh = scope.scene.getObjectByName("leftElbow", true);
                    if(scope.currentMesh){console.log("select leftElbow");}
                    else console.warn("selection went wrong!")
                }
                else if (keyCode == 85 ){ // u
                    scope.currentMesh = scope.scene.getObjectByName("rightElbow", true);
                    if(scope.currentMesh){console.log("select rightElbow");}
                    else console.warn("selection went wrong!")
                }
                // lower body..........................................................
                else if (keyCode == 71 ){ // g
                    scope.currentMesh = scope.scene.getObjectByName("leftHip", true);
                    if(scope.currentMesh){console.log("select leftHip");}
                    else console.warn("selection went wrong!")
                }
                else if (keyCode == 72 ){ // h
                    scope.currentMesh = scope.scene.getObjectByName("rightHip", true);
                    if(scope.currentMesh){console.log("select rightHip");}
                    else console.warn("selection went wrong!")
                }
                else if (keyCode == 66 ){ // b
                    scope.currentMesh = scope.scene.getObjectByName("leftKnee", true);
                    if(scope.currentMesh){console.log("select leftKnee");}
                    else console.warn("selection went wrong!")
                }
                else if (keyCode == 78 ){ // n
                    scope.currentMesh = scope.scene.getObjectByName("rightKnee", true);
                    if(scope.currentMesh){console.log("select rightKnee");}
                    else console.warn("selection went wrong!")
                }
            };

            this.addBufferGeometry = function(bufferGeometry) {

                scope.currentMesh = bufferGeometry.getMesh();
                scope.scene.add( scope.currentMesh );

            }

            this.addMesh = function(newMesh) {
                scope.currentMesh = newMesh;
                scope.scene.add( scope.currentMesh );
            }

            this.addLight = function(newLight) {
                scope.scene.add(newLight);
            }

            this.toggleAnimation = function (bool){
                scope.animate = bool;
            }


            /*
             * drawing the scene
             */
            var start = Date.now();
            this.draw = function() {

                var sin = Math.sin((Date.now() - start)/1750);
                var cos = Math.cos((Date.now() - start)/1750);

                scope.t +=1;
                requestAnimFrame( scope.draw );
                scope.renderer.render(scope.scene, scope.camera);

                if (scope.animate && scope.currentMesh) {
                    scope.currentMesh.rotateY(0.05)
                }

                var speed = 0.3
                if (scope.animate){
                    scope.scene.getObjectByName("torso", true).translateY(Math.sin(scope.t*speed)*20);
                    scope.scene.getObjectByName("torso", true).translateX(Math.sin(scope.t*speed/8)*8);
                    scope.scene.getObjectByName("leftHip", true).scale.y = Math.sin(scope.t*speed/2)*(1/3)+1 ;
                    scope.scene.getObjectByName("rightHip", true).scale.y = Math.sin(scope.t*speed/2 + Math.PI/2)*(1/3)+1 ;
                }

                var planet = scope.scene.getObjectByName("planet");
                var dLight = scope.scene.getObjectByName("dLight");
                var explosion = scope.scene.getObjectByName("explosion");

                if(planet){
                    if ($("#dLightAnimate")[0].checked) {
                        dLight.position.set(sin,0,-cos);
                    }
                }
                if(explosion){
                    explosion.material.uniforms[ 'time' ].value = .000035 * ( Date.now() - start);
                }
            };
        };


        // this module only exports the constructor for Scene objects
        return Scene;

    })); // define

    
