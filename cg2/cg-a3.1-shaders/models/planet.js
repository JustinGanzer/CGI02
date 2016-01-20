/* requireJS module definition */
define(["three", "shaders"],
    (function(THREE, Shaders) {

        "use strict";

        var Planet = function() {


            this.root = new THREE.Object3D();

            // load and create required textures
            
            var scope = this;

            // implement ShaderMaterial using the code from
            // the lecture
            
            // hint:
            // texture can be assigned only when it is loaded completely, e.g. like this
            //material.uniforms.daytimeTexture.value   = textureName;
            //new THREE.MeshNormalMaterial()


            var material2 = new THREE.MeshPhongMaterial();
            var color = new THREE.Color();
            color.setRGB(1,0,0);
            material2.color = color;

            var daytex = 0;
            var nighttex = 0;
            var cloudtex = 0;

            if($("#daytexture")[0].checked){
                daytex = 1;
            }
            if($("#nighttexture")[0].checked){
                nighttex = 1;
            }
            if($("#clouds")[0].checked){
                cloudtex = 1;
            }


            var material = new THREE.ShaderMaterial( {
                uniforms: THREE.UniformsUtils.merge( [
                    THREE.UniformsLib['lights'],
                    {
                        diffuseMaterial: { type: 'c', value: new THREE.Color(1,0,0) },
                        specularMaterial: { type: 'c', value: new THREE.Color(0.7,0.7,0.7) },
                        ambientMaterial: { type: 'c', value: new THREE.Color(0.8,0.2,0.2) },
                        shininessMaterial: { type: 'f', value: 16.0 },
                        daytimeTexture: {type: "t", value: null},
                        cloudTexture: {type: "t", value: null},
                        nightTexture:{type: "t", value: null},
                        topoTexture:{type: "t", value: null},
                        time: {type: "f", value: 1.0},
                        cloundOn: {type: "i", value: cloudtex} ,
                        dayOn: {type: "i", value: daytex} ,
                        nightOn: {type: "i", value: nighttex}
                    }
                ]),
                vertexShader: Shaders.getVertexShader("planet"),
                fragmentShader: Shaders.getFragmentShader("planet"),
                lights: true
            } );

            var loader = new THREE.TextureLoader();
            loader.load( "textures/earth_month04.jpg" , function ( texture )
                {
                    material.uniforms.daytimeTexture.value = texture;
                },
                function ( xhr ) {
                    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
                function ( xhr ) {
                    console.log( 'An error happened' );
                });
            loader.load( "textures/earth_at_night_2048.jpg" , function ( texture )
                {
                    material.uniforms.nightTexture.value  = texture;
                },
                function ( xhr ) {
                    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
                function ( xhr ) {
                    console.log( 'An error happened' );
                });
            loader.load( "textures/earth_topography_2048.jpg" , function ( texture )
                {
                    material.uniforms.topoTexture.value  = texture;
                },
                function ( xhr ) {
                    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
                function ( xhr ) {
                    console.log( 'An error happened' );
                });
            loader.load( "textures/earth_clouds_2048.jpg" , function ( texture )
                {
                    material.uniforms.cloudTexture.value  = texture;
                    material.uniforms.cloudTexture.value.wrapS = THREE.RepeatWrapping;
                    material.uniforms.cloudTexture.value.wrapT = THREE.RepeatWrapping;
                },
                function ( xhr ) {
                    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
                function ( xhr ) {
                    console.log( 'An error happened' );
                });

            scope.mesh = new THREE.Mesh( new THREE.SphereGeometry(400, 100,100), material );
            scope.mesh.name = "planet";

            scope.root.add(scope.mesh);




            this.getMesh = function() {
                return this.root;
            };


        }; // constructor

        return Planet;

    })); // define module


