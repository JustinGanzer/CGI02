


/* requireJS module definition */
define(["util", "vec2", "Scene", "Line", "PointDragger", "parametricCurve"],
    (function(util,vec2,Scene,Line,PointDragger,ParametricCurve) {

        "use strict";




        var BezierCurve = function() {

            this.p0 = [randomX(),randomY()];
            this.p1 = [randomX(),randomY()];
            this.p2 = [randomX(),randomY()];
            this.p3 = [randomX(),randomY()];

            this.drawStyle = {
                width: Math.floor(Math.random()*3)+1,
                color: randomColor()
            };

            this.mint = 0;
            this.maxt = 1;
            this.segments = 10;
            this.marks = 0;

            var b0 = "(1-t)*(1-t)*(1-t)";
            var b1 = "3*(1-t)*(1-t)*t";
            var b2 = "3*(1-t)*t*t";
            var b3 = "t*t*t";




        this.draw = function(context) {
            this.xt = b0 + "*" + this.p0[0] + " + " +
                b1 + "*" + this.p1[0] + " + " +
                b2 + "*" + this.p2[0] + " + " +
                b3 + "*" + this.p3[0];

            this.yt = b0 + "*" + this.p0[1] + " + " +
                b1 + "*" + this.p1[1] + " + " +
                b2 + "*" + this.p2[1] + " + " +
                b3 + "*" + this.p3[1];
            this.parametricCurve = new ParametricCurve(this.xt, this.yt, this.mint, this.maxt, this.segments, this.drawStyle, this.marks);
            this.parametricCurve.draw(context);

            };

        
            this.isHit = function(context,pos) {
                return this.parametricCurve.isHit(context, pos);
            };

            // return list of draggers to manipulate this circle
            this.createDraggers = function() {

                var draggerStyle = { radius:4, color:this.drawStyle.color, width:0, fill:true }
                var draggers = [];

                var _curve = this;
                var getP0 = function() { return _curve.p0; };
                var getP1 = function() { return _curve.p1; };
                var getP2 = function() { return _curve.p2; };
                var getP3 = function() { return _curve.p3; };


                var setP0 = function(dragEvent) { _curve.p0 = dragEvent.position; };
                var setP1 = function(dragEvent) { _curve.p1 = dragEvent.position; };
                var setP2 = function(dragEvent) { _curve.p2 = dragEvent.position; };
                var setP3 = function(dragEvent) { _curve.p3 = dragEvent.position; };


                draggers.push( new PointDragger(getP0, setP0, draggerStyle) );
                draggers.push( new PointDragger(getP1, setP1, draggerStyle) );
                draggers.push( new PointDragger(getP2, setP2, draggerStyle) );
                draggers.push( new PointDragger(getP3, setP3, draggerStyle) );
                
                return draggers;

            };


        };

        // generate random X coordinate within the canvas
        var randomX = function() {
            return Math.floor(Math.random()*(400-10))+5;
        };

        // generate random Y coordinate within the canvas
        var randomY = function() {
            return Math.floor(Math.random()*(400-10))+5;
        };

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

        // this module only exports the constructor for StraightLine objects
        return BezierCurve;

    })); // define

    
