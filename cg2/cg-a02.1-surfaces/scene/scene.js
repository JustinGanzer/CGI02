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

            this.toggleAnimation = function (bool){
                scope.animate = bool;
            }

            /*
             * drawing the scene
             */
            this.draw = function() {

                requestAnimFrame( scope.draw );
                scope.renderer.render(scope.scene, scope.camera);

                if (scope.animate && scope.currentMesh) {
                    scope.currentMesh.rotateY(0.05)
                }
            };
        };


        // this module only exports the constructor for Scene objects
        return Scene;

    })); // define

    
