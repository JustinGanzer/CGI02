/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: Random
 *
 * Generates a random set of points
 * inspired by http://threejs.org/examples/#webgl_interactive_buffergeometry
 */

/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        /**
         *
         * @param scene  - reference to the scene
         * @constructor
         */
        var Band = function (config) {

            var segments = config.segments || 100;
            var radius = config.radius || 300;
            var height = config.height || 100;

            this.positions = new Float32Array( 2*segments * 3);
            this.colors = new Float32Array( 2*segments * 3 );
            this.vertices = new Float32Array(this.positions.length / 3);

            var color = new THREE.Color();

            for(var i=0; i<this.positions.length; i+=6) {

                // X and Z coordinates are on a circle around the origin
                var t = (i/this.positions.length)*Math.PI*2;
                // alte, fehlerhafte :
                //var t = (i/segments)*Math.PI*2;
                var x = Math.sin(t) * radius;
                var z = Math.cos(t) * radius;
                // Y coordinates are simply -height/2 and +height/2
                var y0 = height/2;
                var y1 = -height/2;

                // add two points for each position on the circle
                // IMPORTANT: push each float value separately!
                this.positions[ i ]     = x;
                this.positions[ i + 1 ] = y0;
                this.positions[ i + 2 ] = z;

                this.positions[ i + 3 ] = x;
                this.positions[ i + 4 ] = y1;
                this.positions[ i + 5 ] = z;


                color.setRGB( 1,0,0 );

                this.colors[ i ]     = color.r;
                this.colors[ i + 1 ] = color.g;
                this.colors[ i + 2 ] = color.b;

                this.colors[ i + 3 ] = color.r;
                this.colors[ i + 4 ] = color.g;
                this.colors[ i + 5 ] = color.b;
            };

            this.vertices[0] = [this.positions[0],this.positions[0+1],this.positions[0+2]];
            this.vertices[0+1] = [this.positions[0+3],this.positions[0+4],this.positions[0+5]];
            this.vertices[0+2] = [this.positions[0+6],this.positions[0+7],this.positions[0+8]];

            for(var i=3; i<this.vertices.length; i+=3) {

                this.vertices[i] = this.vertices[i-1];
                this.vertices[i+1] = [this.positions[i+6],this.positions[i+7],this.positions[i+8]];
                this.vertices[i+2] = [this.positions[i+9],this.positions[i+10],this.positions[i+11]];
            }

            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };

        };

        return Band;
    }));
    
