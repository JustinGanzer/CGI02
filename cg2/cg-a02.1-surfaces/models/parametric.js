/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: ParametricSurface
 *
 */

/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var ParametricSurface = function (posFunc, config) {

            var minU = config.minU || 0;
            var minV = config.minV || 0;

            var maxU = config.maxU || 1;
            var maxV = config.maxV || 1;

            var segmentsU = config.segmentsU || 100;
            var segmentsV = config.segmentsV || 100;



            this.posFunc=posFunc;

            var color = new THREE.Color();
            color.setRGB(1,0,0);

            this.positions = new Float32Array( (segmentsU+1)*(segmentsV+1)*3 );
            this.colors = new Float32Array( (segmentsU+1)*(segmentsV+1)*3 );


            // vertex
            var i=0;

            for(var us = 0; us <= segmentsU; us++){

                for(var vs = 0; vs <= segmentsV; vs++){
                    var u = us * (maxU - minU) / segmentsU;
                    var v = vs * (maxV - minV) / segmentsV;

                    var pos = this.posFunc(u,v);

                    this.positions[i] = pos[0];
                    this.positions[i + 1] = pos[1];
                    this.positions[i + 2] = pos[2];

                    this.colors[ i ]     = color.r;
                    this.colors[ i + 1 ] = color.g;
                    this.colors[ i + 2 ] = color.b;

                    i+=3;
                }
            }

            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };

        };

        return ParametricSurface;
    }));

