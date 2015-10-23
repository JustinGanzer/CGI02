/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "Line", "Circle", "Point"],
    (function($, Line, Circle, Point) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(context,scene,sceneController) {


            // generate random X coordinate within the canvas
            var randomX = function() {
                return Math.floor(Math.random()*(context.canvas.width-10))+5;
            };

            // generate random Y coordinate within the canvas
            var randomY = function() {sceneController
                return Math.floor(Math.random()*(context.canvas.height-10))+5;
            };

            // generate random color in hex notation
            var randomColor = function() {

                // convert a byte (0...255) to a 2-digit hex string
                var toHex2 = function(byte) {
                    var s = byte.toString(16); // convert to hex string
                    if(s.length == 1) s = "0"+s; // pad with leading 0
                    return s;
                };

                var r = Math.floor(Math.random()*25.9)*10;
                var g = Math.floor(Math.random()*25.9)*10;
                var b = Math.floor(Math.random()*25.9)*10;

                // convert to hex notation
                return "#"+toHex2(r)+toHex2(g)+toHex2(b);
            };

            /*
             * event handler for "new line button".
             */
            $("#btnNewLine").click( (function() {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random()*3)+1,
                    color: randomColor()
                };

                var line = new Line( [randomX(),randomY()],
                    [randomX(),randomY()],
                    style );
                scene.addObjects([line]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(line); // this will also redraw

            }));
			
			 /*
             * event handler for "new circle button".
             */
            $("#btnNewCircle").click( (function() {

                // create the actual circle and add it to the scene
                var style = {
                    width: Math.floor(Math.random()*3)+1,
                    color: randomColor()
                };

                var circle = new Circle( [randomX(),randomY()],
                    Math.floor(Math.random()*50),
                    style );
                scene.addObjects([circle]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(circle); // this will also redraw

            }));
			
			 /*
             * event handler for "new point button".
             */
            $("#btnNewPoint").click( (function() {

                // create the actual point and add it to the scene
                var style = {
                    width: Math.floor(Math.random()*3)+1,
                    color: randomColor()
                };

                var point = new Point( [randomX(),randomY()],
                    6,
                    style );
                scene.addObjects([point]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(point); // this will also redraw

            }));
			
			/* Change-Handlers for Parameters(input) */
			$("#param_Number").change( (function() {
				var temp_obj = sceneController.getSelectedObject();
				var number = $("#param_Number").val();
				temp_obj.drawStyle.width = number;
				sceneController.deselect();
                sceneController.select(temp_obj);
			}));
			
			$("#param_Color").change( (function() {
				var temp_obj = sceneController.getSelectedObject();
				var color = $("#param_Color").val();
				temp_obj.drawStyle.color = color;
				sceneController.deselect();
                sceneController.select(temp_obj);
			}));
			
			
			/* OnSelection Event for all objects */
			sceneController.onSelection( function(){
				var temp_obj = sceneController.getSelectedObject();
				var number = temp_obj.drawStyle.width;
				var color = temp_obj.drawStyle.color;
				$("#param_Number").val(number);
				$("#param_Color").val(color);
				if(temp_obj instanceof Circle){
					var radius = temp_obj.drawStyle.radius;
					$("#param_Radius").show();
					$("#param_Radius").val(radius);
				}else{
					$("#param_Radius").hide();
				}
			});
			


        };

        // return the constructor function
        return HtmlController;


    })); // require



            