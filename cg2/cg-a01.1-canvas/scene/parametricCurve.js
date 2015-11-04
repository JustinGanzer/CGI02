


/* requireJS module definition */
define(["util", "vec2", "Scene", "Line", "PointDragger"],
    (function(util,vec2,Scene,Line,PointDragger) {

        "use strict";


        var ParametricCurve = function( xt, yt, mint, maxt, segments, drawStyle, tickmarks ) {


            var exi = Math.floor(Math.random()*350);
            var eyi = Math.floor(Math.random()*200);
            this.xt = xt || exi+ "+100*Math.sin(t)";
            this.yt = yt || eyi+ "+100*Math.cos(t)";
            this.mint = mint || 0;
            this.maxt = maxt || 5;
            this.segments = segments || 20;
            this.tickmarks = tickmarks || 0;
            this.lines = [];
            this.points = [];
            this.drawStyle = drawStyle || {
                width: Math.floor(Math.random()*3)+1,
                color: randomColor()
            };

            this.xfunction = function(t){
                try{
                    var temp = eval(this.xt);
                } catch (e){
                    alert("Fehler mit der X-Funktion " + e);}
                return temp;
            }

            this.yfunction = function(t){
                try{
                    var temp = eval(this.yt);
                } catch (e){
                    alert("Fehler mit der Y-Funktion " + e);}
                return temp;
            }



        
            this.draw = function(context) {

                context.beginPath();
           
                var delta = (this.maxt - this.mint) / this.segments;

                //console.log(this.delta);
                var t = this.mint;              // aktueller mint
                var x = this.xfunction(t);      // xFunktion zuweisen
                var y = this.yfunction(t);      // yFunktion zuweisen
            
                context.moveTo(x,y);
                
               
                this.points.push([x, y]);       // pass die aktuellen Koordinaten an
               
                for (var e = this.mint + delta;   e <= this.maxt;   e = e + delta) {  

                   var e = e - delta;               //
                   var xfirst = this.xfunction(e);  // neues t in die Funktion x(t) einsetzen
                   var yfirst = this.yfunction(e);  // neues t in die Funktion y(t) einsetzen
                  
                   var e = e + delta;               // 
                   var x = this.xfunction(e);       // x neues x zuweisen
                   var y = this.yfunction(e);       // y neues y zuweisen
                 
                   this.points.push([x,y]);              // pass die neuen Koordinaten an

                   context.lineTo(x,y);
                  
                   var line = new Line([xfirst,yfirst],     //
                                               [x,y],               //
                                               this.drawStyle); 
                    
                   this.lines.push(line);


                   //--------------------------------------------------------------------
                }; 
              
                context.lineWidth = this.drawStyle.width; 
                context.strokeStyle = this.drawStyle.color; 
                context.fillStyle   = this.drawStyle.color; 
               
                context.stroke(); 

            };

            // test whether the mouse position is on this circle segment
            this.isHit = function(context,pos) {
				for(var i = 0; i < this.lines.length; i++){            
                    if(this.lines[i].isHit(context, pos)){
                        return true;
                    } 
                }; 
                return false;        
                
            };

            // soll laut Aufgabenstellung leer sein
            this.createDraggers = function() {
                var draggers = [];
                return draggers;
            };
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
    return ParametricCurve;

    }))

    
