/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 */


/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"],
    (function(util,vec2,Scene,PointDragger) {

        "use strict";

        /**
         *  A simple straight line that can be dragged
         *  around by its endpoints.
         *  Parameters:
         *  - point0 and point1: array objects representing [x,y] coordinates of start and end point
         *  - drawStyle: object defining width and color attributes for line drawing,
         *       begin of the form { width: 2, color: "#00FF00" }
         */

        var Circle = function(point0, radius, drawStyle) {
		
            console.log("creating circle at [" +
            point0[0] + "," + point0[1] + "].");

			// initial values in case either point is undefined
            this.p0 = point0 || [10,10];
			this.radius = radius || 70;
			
			console.log(this.radius);
			
            // draw style for drawing the line
            this.drawStyle = drawStyle || { width: "2", color: "#0000AA" };
			this.drawStyle.radius = this.radius || 5;
            this.drawStyle.width = drawStyle.width || 2;
            this.drawStyle.color = drawStyle.color || "#ff0000";
            this.drawStyle.fill = false;


            // draw this line into the provided 2D rendering context
            this.draw = function(context) {

                // draw actual line
                context.beginPath();

                // set arc to be drawn
                context.arc(this.p0[0], this.p0[1], this.radius, 0, 2 * Math.PI);

                // set drawing style
                context.lineWidth = this.drawStyle.width;
                context.strokeStyle = this.drawStyle.color;

                // actually start drawing
                context.stroke();

            };

            /*
             * test whether the specified mouse position "hits" this circle
             */
            this.isHit = function (context,mousePos) {

                // what is my current position?
                var pos = this.p0;
                // check whether distance between mouse and dragger's center
                // is less or equal ( radius + (line width)/2 )
                var dx = mousePos[0] - pos[0];
                var dy = mousePos[1] - pos[1];
                var r = this.drawStyle.radius+this.drawStyle.width/2;
                return (Math.sqrt(dx*dx + dy*dy) >= (Math.sqrt(r*r) - 2) && Math.sqrt(dx*dx + dy*dy) <= (Math.sqrt(r*r) + 2) );

            };

            // return list of draggers to manipulate this line
            this.createDraggers = function() {

                var draggerStyle = { radius:4, color: this.drawStyle.color, width:0, fill:true }
                var draggers = [];

                // create closure and callbacks for dragger
                var _circle = this;
                var getP0 = function() { return _circle.p0; };
                var setP0 = function(dragEvent) { _circle.p0 = dragEvent.position; };
                draggers.push( new PointDragger(getP0, setP0, draggerStyle) );

                return draggers;

            };


        };

        // this module only exports the constructor for StraightLine objects
        return Circle;

    })); // define

    
