/* requireJS module definition */
define(["jquery", "three", "shaders"],
    (function($, THREE, Shaders) {

        "use strict";

        var Explosion = function(scene) {

            console.log("explosion wird jebaut");


            this.root = new THREE.Object3D();

            var scope = this;

            var time = 0.0;
            var weight = 2;
            var freqScale = 0.5;
            var colorScale = 0.1;
            var explosionTex;


            // load explosion texture
            //
            // Loading textures is asynchronous. That means you the load function
            // takes the file url as input and three callback functions
            // onLoadSuccess, onLoadProgress and onLoadError
            // we need to handle these cases. Only in onLoadSuccess we can setup
            // the scene, the texture and the shaders correctly.
            // correctly this would be implemented with promises (see assignment add-on question)

            var loader = new THREE.TextureLoader();
            loader.load( "textures/explosion.png" , function ( texture )
                {
                    explosionTex = texture;
                },
                function ( xhr ) {
                    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
                function ( xhr ) {
                    console.log( 'An error happened' );
                });


            // define a shader with these uniform values

            // var material = new THREE.ShaderMaterial( {
            //         uniforms: {
            //             explosionTex: ... aka explosion texture
            //             time: ... time since start
            //             weight: ... aka displacement weight - how strong is the displacement
            //             freqScale: ... frequency of the noise f < 0 = only low frequency noise, f > 0 more and more high frequency noise
            //                            comes on
            //             colorScale: ... rescales the access positioning into the explosion textures (high value = lighter color, low value = darker color)
            //         },
            //         vertexShader: Shaders.getVertexShader("explosion"),
            //         fragmentShader: Shaders.getFragmentShader("explosion")
            //     } );

             var material = new THREE.ShaderMaterial( {
                     uniforms: {
                         explosionTex: {type:"t", value: explosionTex},
                         time: {type: "f", value: time},
                         weight: {type: "f", value: weight},
                         freqScale: {type: "f", value: freqScale},
                         colorScale:{type: "f", value: colorScale},
                     },
                     vertexShader: Shaders.getVertexShader("explosion"),
                     fragmentShader: Shaders.getFragmentShader("explosion")
                 } );


            scope.mesh = new THREE.Mesh( new THREE.SphereGeometry( 300, 50, 50 ), material );
            scope.mesh.name = "explosion";
            scope.root.add(scope.mesh);





            this.getMesh = function() {
                return this.root;
            };


        }; // constructor


        return Explosion;

    })); // define module

