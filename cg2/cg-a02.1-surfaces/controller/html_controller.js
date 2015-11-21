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
define(["jquery", "BufferGeometry", "random", "band", "ellipsoid"],
    (function($,BufferGeometry, Random, Band, Ellipsoid) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(scene) {


            $("#random").show();
            $("#band").hide();
            $("#elipsoid").hide();

            $("#btnRandom").click( (function() {
                $("#random").show();
                $("#elipsoid").hide();
                $("#band").hide();
            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
                $("#elipsoid").hide();
                $("#band").show();
            }));

            $("#btnEllipsoid").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#elipsoid").show();
            }));


            $("#btnNewRandom").click( (function() {

                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometry();
                bufferGeometryRandom.addAttribute("position", random.getPositions());
                bufferGeometryRandom.addAttribute("color", random.getColors());

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

                scene.addBufferGeometry(bufferGeometryBand);
            }));


            $("#btnNewEllipsoid").click( (function() {

                var config = {
                    segmentsW : parseInt($("#numSegmentsW").attr("value")),
                    segmentsUV : parseInt($("#numSegmentsUV").attr("value")),
                    radius : parseInt($("#radius").attr("value")),
                    height : parseInt($("#height").attr("value"))
                };


                var ellipsoid = new Ellipsoid(config);
                var bufferGeometryEllipsoid = new BufferGeometry();
                bufferGeometryEllipsoid.addAttribute("position", band.getPositions());
                bufferGeometryEllipsoid.addAttribute("color", band.getColors());

                scene.addBufferGeometry(bufferGeometryEllipsoid);

            }));

        };

        // return the constructor function
        return HtmlController;


    })); // require



            
