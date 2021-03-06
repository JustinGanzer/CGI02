/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "BufferGeometry", "random", "band", "parametric", "robot", "planet", "explosion"],
    (function($,BufferGeometry, Random, Band, Parametric, Robot, Planet, Explosion) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(scene) {


            $("#random").show();
            $("#band").hide();
            $("#parametric").hide();
            $("#robot").hide();
            $("#planet").hide();
            $("#explosion").hide();

            $("#btnRandom").click( (function() {
                $("#random").show();
                $("#band").hide();
                $("#parametric").hide();
                $("#robot").hide();
                $("#planet").hide();
                $("#explosion").hide();
            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
                $("#band").show();
                $("#parametric").hide();
                $("#robot").hide();
                $("#planet").hide();
                $("#explosion").hide();
            }));

            $("#btnParametric").click( (function() {
                $("#parametric").show();
                $("#random").hide();
                $("#band").hide();
                $("#robot").hide();
                $("#planet").hide();
                $("#explosion").hide();
            }));

            $("#btnPlanet").click( (function() {
                $("#parametric").hide();
                $("#random").hide();
                $("#band").hide();
                $("#robot").hide();
                $("#planet").show();
                $("#explosion").hide();
            }));

            $("#btnExplosion").click( (function() {
                $("#parametric").hide();
                $("#random").hide();
                $("#band").hide();
                $("#robot").hide();
                $("#planet").hide();
                $("#explosion").show();
            }));

            $('#rotate').click((function () {
                scene.setAutoRotate($("#rotate").is(":checked"));
            }));

            $("#btnNewRandom").click( (function() {

                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometry();
                bufferGeometryRandom.addAttribute("position", random.getPositions());
                bufferGeometryRandom.addAttribute("color", random.getColors());

                if($("#wireframe")[0].checked) {
                    bufferGeometryRandom.mesh.add(bufferGeometryRandom.setIndices(random.getIndices()));
                }
                if($("#solid")[0].checked) {
                    bufferGeometryRandom.mesh.add(bufferGeometryRandom.makeSolid(random.getSolid()));
                }

                scene.addBufferGeometry(bufferGeometryRandom);
            }));


            $("#btnNewBand").click( (function() {

                var config = {
                    segments : parseInt($("#numSegments").attr("value")),
                    radius : parseInt($("#radius").attr("value")),
                    height : parseInt($("#height").attr("value"))
                };


                var band = new Band(config);
                var bufferGeometryBand = new BufferGeometry();
                bufferGeometryBand.addAttribute("position", band.getPositions());
                bufferGeometryBand.addAttribute("color", band.getColors());

                if($("#wireframe")[0].checked) {
                    bufferGeometryBand.mesh.add(bufferGeometryBand.setIndices(band.getIndices()));
                }
                if($("#solid")[0].checked) {
                    bufferGeometryBand.mesh.add(bufferGeometryBand.makeSolid(band.getSolid()));
                }

                scene.addBufferGeometry(bufferGeometryBand);
            }));

            $("#btnNewParametric").click( (function() {

                var config = {
                    segmentsU: parseInt($("#segmentsU").attr("value")),
                    segmentsV: parseInt($("#segmentsV").attr("value")),
                    minU : parseInt($("#uMin").attr("value")),
                    maxU : parseInt($("#uMax").attr("value")),
                    minV : parseInt($("#vMin").attr("value")),
                    maxV : parseInt($("#vMax").attr("value"))
                };


                // Scale factors
                var scaleFactore = [200,300,500];

                // Parameters for ellipsoid
                var posFunc = function(u,v){
                    var vert = [
                        scaleFactore[0] * Math.cos(u) * Math.sin(v),
                        scaleFactore[1] * Math.sin(u) * Math.sin(v),
                        scaleFactore[2] * Math.cos(v)
                    ];
                    return vert;
                }


                var parametric = new Parametric(posFunc, config);
                var bufferGeometryParametric = new BufferGeometry();
                bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                bufferGeometryParametric.addAttribute("color", parametric.getColors());

                if($("#wireframe")[0].checked) {
                    bufferGeometryParametric.mesh.add(bufferGeometryParametric.setIndices(parametric.getIndices()));
                }
                if($("#solid")[0].checked) {
                    bufferGeometryParametric.mesh.add(bufferGeometryParametric.makeSolid(parametric.getSolid()));
                }

                scene.addBufferGeometry(bufferGeometryParametric);
            }));

            $("#btnNewTorus").click( (function() {

                var config = {
                    segmentsU: parseInt($("#segmentsU").attr("value")),
                    segmentsV: parseInt($("#segmentsV").attr("value")),
                    minU : 0,
                    maxU : 2*Math.PI,
                    minV : 0,
                    maxV : 2*Math.PI
                };


                // Scale factors
                var scaleFactore = [200,100];

                // Parameters for Torus/Donut
                var posFunc = function(u,v){
                    var vert = [
                        (scaleFactore[0] + scaleFactore[1] * Math.cos(v)) * Math.cos(u),
                        (scaleFactore[0] + scaleFactore[1] * Math.cos(v)) * Math.sin(u),
                        scaleFactore[1] * Math.sin(v)
                    ];
                    return vert;
                }


                var parametric = new Parametric(posFunc, config);
                var bufferGeometryParametric = new BufferGeometry();
                bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                bufferGeometryParametric.addAttribute("color", parametric.getColors());

                if($("#wireframe")[0].checked) {
                    bufferGeometryParametric.mesh.add(bufferGeometryParametric.setIndices(parametric.getIndices()));
                }
                if($("#solid")[0].checked) {
                    bufferGeometryParametric.mesh.add(bufferGeometryParametric.makeSolid(parametric.getSolid()));
                }

                scene.addBufferGeometry(bufferGeometryParametric);
            }));

            $("#btnNewHorn").click( (function() {

                var config = {
                    segmentsU: parseInt($("#segmentsU").attr("value")),
                    segmentsV: parseInt($("#segmentsV").attr("value")),
                    minU : 0,
                    maxU : Math.PI,
                    minV : -Math.PI,
                    maxV : Math.PI
                };


                // Scale factors
                var scaleFactore = [500];

                // Parameters for Horn
                var posFunc = function(u,v){
                    var vert = [
                        Math.cos(u),
                        Math.cos(v),
                        scaleFactore[0]*Math.sin(u)*Math.sin(v)
                    ];
                    return vert;
                }


                var parametric = new Parametric(posFunc, config);
                var bufferGeometryParametric = new BufferGeometry();
                bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                bufferGeometryParametric.addAttribute("color", parametric.getColors());

                scene.addBufferGeometry(bufferGeometryParametric);
            }));

            $("#btnRobot").click( (function() {
                $("#robot").show();
                var robot = new Robot();
                var bufferGeometryRobot = new BufferGeometry();

                scene.addMesh(robot.getMesh());
            }));

            $("#btnNewPlanet").click( (function() {
                var planet = new Planet();
                scene.addMesh(planet.getMesh());

                var color = new THREE.Color();
                color.setRGB(1,1,1);

                var aLight= new THREE.AmbientLight(0x404040);
                scene.addLight(aLight);
                var dlight = new THREE.DirectionalLight(color,0.5);
                dlight.name="dLight";
                dlight.position.set(1, 0, 0.3).normalize();
                scene.addLight(dlight);
                }));

            $("#btnNewExplosion").click( (function() {
                var explosion = new Explosion();

                scene.addMesh(explosion.getMesh());
                //scene.addBufferGeometry(explosion);
            }));

            $("#animate").click((function () {
                scene.toggleAnimation($("#animate")[0].checked );
            }));

        };

        // return the constructor function
        return HtmlController;


    })); // require



            
