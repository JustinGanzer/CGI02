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
define(["jquery", "Line", "Circle", "Point", "KdTree", "util", "kdutil", "parametricCurve", "bezierCurve"],
    (function($, Line, Circle, Point, KdTree, Util, KdUtil, ParametricCurve, BezierCurve) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(context,scene,sceneController) {

		var kdTree;
        var pointList = [];

            // generate random X coordinate within the canvas
            var randomX = function() {
                return Math.floor(Math.random()*(context.canvas.width-10))+5;
            };

            // generate random Y coordinate within the canvas
            var randomY = function() {
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
			
			$("#param_Radius").change( (function() {
				var temp_obj = sceneController.getSelectedObject();
				var radius = $("#param_Radius").val();
				temp_obj.radius = radius;
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
					var radius = temp_obj.radius;
					$("#radius_div").show();
					$("#param_Radius").val(radius);
				}else{
					$("#radius_div").hide();
				}
                
                // BLATT 3 :
                if(temp_obj instanceof ParametricCurve || BezierCurve){
                    var tempVal = temp_obj.xt;
                    $("#input_xt").val(tempVal);

                    tempVal = temp_obj.yt;
                    $("#input_yt").val(tempVal);

                     tempVal = temp_obj.maxt;
                    $("#input_maxt").val(tempVal);

                     tempVal = temp_obj.mint;
                    $("#input_mint").val(tempVal);

                     tempVal = temp_obj.segments;
                    $("#input_segments").val(tempVal);
                }else{
                    //nada
                }
			});
			
			/*
			!!!!!!!!!!!!!!!!!!! Blatt 2 !!!!!!!!!!!!!!!!!! */
			
			$("#btnNewPointList").click( (function() {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random()*3)+1,
                    color: randomColor()
                };

                var numPoints = parseInt($("#numPoints").attr("value"));;
                for(var i=0; i<numPoints; ++i) {
                    var point = new Point([randomX(), randomY()], 5,
                        style);
                    scene.addObjects([point]);
                    pointList.push(point);
                }

                // deselect all objects, then select the newly created object
                sceneController.deselect();

            }));

            $("#visKdTree").click( (function() {

                var showTree = $("#visKdTree").attr("checked");
                if(showTree && kdTree) {
                    KdUtil.visualizeKdTree(sceneController, scene, kdTree.root, 0, 0, 600, true);
                }

            }));

            $("#btnBuildKdTree").click( (function() {

                kdTree = new KdTree(pointList);

            }));

            /**
             * creates a random query point and
             * runs linear search and kd-nearest-neighbor search
             */
            $("#btnQueryKdTree").click( (function() {

                var style = {
                    width: 2,
                    color: "#ff0000"
                };
                var queryPoint = new Point([randomX(), randomY()], 2,
                    style);
                scene.addObjects([queryPoint]);
                sceneController.select(queryPoint); 

                console.log("query point: ", queryPoint.center);

                ////////////////////////////////////////////////
                // TODO: measure and compare timings of linear
                //       and kd-nearest-neighbor search
                ////////////////////////////////////////////////
                var linearTiming;
                var kdTiming;

                linearTiming = new Date().getTime();
                var minIdx = KdUtil.linearSearch(pointList, queryPoint);
                linearTiming = (linearTiming - new Date().getTime()) * (-1);

                console.log("nearest neighbor linear: ", pointList[minIdx].center, " Time needed: ", linearTiming);

                kdTiming = new Date().getTime();
                var kdNearestNeighbor = kdTree.findNearestNeighbor(kdTree.root, queryPoint, 10000000, kdTree.root, 0);
                kdTiming = (kdTiming - new Date().getTime()) * (-1);

                console.log("nearest neighbor kd: ", kdNearestNeighbor.point.center, " Time needed: ", kdTiming);

                sceneController.select(pointList[minIdx]);
                sceneController.select(kdNearestNeighbor.point);

            }));

            /* !!!!!!!!!!!!!!!!!!! Blatt 3 !!!!!!!!!!!!!!!!!! */

            $("#btnNewParametric").click( (function() {

                // create the actual ParametricCurve and add it to the scene
                var style = {
                    width: Math.floor(Math.random()*3)+1,
                    color: randomColor()
                };

                var para = new ParametricCurve();
                scene.addObjects([para]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(para); // this will also redraw

            }));

            $("#btnNewBezier").click( (function() {


                var bezi = new BezierCurve();
                scene.addObjects([bezi]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(bezi); // this will also redraw

            }));

            $("#input_xt").change( (function() {
                var temp_obj = sceneController.getSelectedObject();
                if(temp_obj instanceof ParametricCurve || BezierCurve){
                    var tempVal = $("#input_xt").val();
                    temp_obj.xt = tempVal;
                    sceneController.deselect();
                    sceneController.select(temp_obj);
                }else{
                    //nada
                }
            }));

            $("#input_yt").change( (function() {
                var temp_obj = sceneController.getSelectedObject();
                if(temp_obj instanceof ParametricCurve || BezierCurve){
                    var tempVal = $("#input_yt").val();
                    temp_obj.yt = tempVal;
                    sceneController.deselect();
                    sceneController.select(temp_obj);
                }else{
                    //nada
                }
            }));

            $("#input_mint").change( (function() {
                var temp_obj = sceneController.getSelectedObject();
                if(temp_obj instanceof ParametricCurve || BezierCurve){
                    var tempVal = $("#input_mint").val();
                    temp_obj.mint = tempVal;
                    sceneController.deselect();
                    sceneController.select(temp_obj);
                }else{
                    //nada
                }
            }));

            $("#input_maxt").change( (function() {
                var temp_obj = sceneController.getSelectedObject();
                if(temp_obj instanceof ParametricCurve || BezierCurve){
                    var tempVal = $("#input_maxt").val();
                    temp_obj.maxt = tempVal;
                    sceneController.deselect();
                    sceneController.select(temp_obj);
                }else{
                    //nada
                }
            }));

            $("#input_segments").change( (function() {
                var temp_obj = sceneController.getSelectedObject();
                if(temp_obj instanceof ParametricCurve || BezierCurve){
                    var tempVal = $("#input_segments").val();
                    temp_obj.segments = tempVal;
                    sceneController.deselect();
                    sceneController.select(temp_obj);
                }else{
                    //nada
                }
            }));
			


        };

        // return the constructor function
        return HtmlController;


    })); // require



            
