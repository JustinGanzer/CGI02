/**
 * Created by Justin on 14-Dec-15.
 */


define(["three", "BufferGeometry", "parametric"],
    (function(THREE, BufferGeometry, Parametric) {

        "use strict";

        /**
         *
         * @param scene  - reference to the scene
         * @constructor
         */
        var Robot = function () {

            //========================================================================================================================

            //Oberarm-Länge
            var OAL = 150;
            //Oberbein-Länge
            var OBL = 100;
            //Torso-Höhe
            var TH = 400;
            //Torso-Breite
            var TB = 250;
            //Torso-Dicke
            var TD = 150;
            //Gelenk-Groesse
            var jointSize= 50;
            //Leg-Gap aka Abstand zwischen den Beinen
            var LG = 40;
            //FootLength, FootHeight, FootThickness
            var FL = 100;
            var FH = 60;
            var FT = 40;
            //HatSize
            var HS = 40;

            var headSize=[130,130,130];
            var torsoSize=[TB, TH, TD];

            //radiusTop, radiusBottom, height, radiusSegments
            var armSize=[40,40,OAL,32];
            var LegSize=[40,40,OBL,32];


            this.root=new THREE.Object3D();
            this.root.name="root";

            //skeleton================================================================================================================
            //========================================================================================================================
            this.head=new THREE.Object3D();
            this.head.name="head";
            this.head.translateY(torsoSize[1]/2+headSize[1]/2);

            this.torso=new THREE.Object3D();
            this.torso.name="torso";
            this.torso.translateY(100);
            this.torso.add(this.head);

            //ARMS..........................................................
            this.leftArm = new THREE.Object3D();
            this.leftArm.translateY(-OAL/2);
            this.rightArm = new THREE.Object3D();
            this.rightArm.translateY(-OAL/2);

            this.leftLowerArm = new THREE.Object3D();
            this.leftLowerArm.translateY(-OAL/2 - jointSize/2);
            this.rightLowerArm = new THREE.Object3D();
            this.rightLowerArm.translateY(-OAL/2 - jointSize/2);


            //JOINTS........................................................
            this.leftShoulder = new THREE.Object3D();
            this.rightShoulder = new THREE.Object3D();
            this.leftShoulder.translateX(TB/2 + jointSize);
            this.rightShoulder.translateX(-TB/2 - jointSize);
            this.leftShoulder.translateY(TH/2 - jointSize);
            this.rightShoulder.translateY(TH/2 - jointSize);

            this.leftElbow = new THREE.Object3D();
            this.rightElbow = new THREE.Object3D();
            this.leftElbow.translateY(-OAL/2 - jointSize/2);
            this.rightElbow.translateY(-OAL/2 - jointSize/2);

            this.leftHip = new THREE.Object3D();
            this.rightHip = new THREE.Object3D();
            this.leftHip.translateX(LG/2 + jointSize);
            this.rightHip.translateX(-LG/2 - jointSize);
            this.leftHip.translateY(-TH/2 - jointSize/2);
            this.rightHip.translateY(-TH/2 - jointSize/2);

            this.leftKnee = new THREE.Object3D();
            this.rightKnee = new THREE.Object3D();
            this.leftKnee.translateY(-OBL/2 - jointSize/2);
            this.rightKnee.translateY(-OBL/2 - jointSize/2);

            this.leftShoulder.name="leftShoulder";
            this.rightShoulder.name="rightShoulder";
            this.leftElbow.name="leftElbow";
            this.rightElbow.name="rightElbow";
            this.leftHip.name="leftHip";
            this.rightHip.name="rightHip";
            this.leftKnee.name="leftKnee";
            this.rightKnee.name="rightKnee";


            //LEGS..........................................................
            this.leftLeg = new THREE.Object3D();
            this.leftLeg.translateY(-OBL/2);
            this.rightLeg = new THREE.Object3D();
            this.rightLeg.translateY(-OBL/2);

            this.leftLowerLeg = new THREE.Object3D();
            this.leftLowerLeg.translateY(-OBL/2 - jointSize/2);
            this.rightLowerLeg = new THREE.Object3D();
            this.rightLowerLeg.translateY(-OBL/2 - jointSize/2);

            //HANDS.........................................................
            this.leftHand = new THREE.Object3D();
            this.rightHand = new THREE.Object3D();
            this.leftHand.translateY(-OBL/2 - jointSize/2);
            this.rightHand.translateY(-OBL/2 - jointSize/2);

            //EXTRA.........................................................
            //FEET__________________________________________________________
            var config = {
                segmentsU: parseInt($("#segmentsU").attr("value")),
                segmentsV: parseInt($("#segmentsV").attr("value")),
                minU : parseInt($("#uMin").attr("value")),
                maxU : parseInt($("#uMax").attr("value")),
                minV : parseInt($("#vMin").attr("value")),
                maxV : parseInt($("#vMax").attr("value"))
            };

            var scaleFactore = [FT, FH, FL];
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

            this.leftFoot = new THREE.Object3D();
            this.leftFoot.add(bufferGeometryParametric.makeSolid(parametric.getSolid()));

            this.rightFoot = new THREE.Object3D();
            this.rightFoot.add(bufferGeometryParametric.makeSolid(parametric.getSolid()));

            this.leftFoot.translateY(-FH/2);
            this.rightFoot.translateY(-FH/2);
            this.leftFoot.rotateZ(Math.PI/2);
            this.rightFoot.rotateZ(Math.PI/2);

            //HAT_____________________________________________________________
            var config = {
                segmentsU: parseInt($("#segmentsU").attr("value")),
                segmentsV: parseInt($("#segmentsV").attr("value")),
                minU : 0,
                maxU : 2*Math.PI,
                minV : 0,
                maxV : 2*Math.PI
            };


            // Scale factors
            var scaleFactore = [HS*2,HS];

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

            this.hat = new THREE.Object3D();
            this.hat.add(bufferGeometryParametric.makeSolid(parametric.getSolid()));
            this.hat.rotateX(Math.PI/2);
            this.hat.translateZ(-headSize[1]/2);



            //skin====================================================================================================================
            //========================================================================================================================
            this.headSkin=new THREE.Mesh(new THREE.CubeGeometry(headSize[0],headSize[1],
            headSize[2]),new THREE.MeshNormalMaterial());
            this.headSkin.rotateY(Math.PI/4);

            this.torsoSkin=new THREE.Mesh(new THREE.CubeGeometry(torsoSize[0],torsoSize
            [1],torsoSize[2]),new THREE.MeshNormalMaterial());

            this.torso.add(this.torsoSkin);
            this.head.add(this.headSkin);

            //ARMS..........................................................
            this.leftArmSkin = new THREE.Mesh(new THREE.CylinderGeometry(armSize[0],armSize[1],armSize[2],armSize[3]),new THREE.MeshNormalMaterial());
            this.leftArm.add(this.leftArmSkin);
            this.rightArmSkin = new THREE.Mesh(new THREE.CylinderGeometry(armSize[0],armSize[1],armSize[2],armSize[3]),new THREE.MeshNormalMaterial());
            this.rightArm.add(this.rightArmSkin);

            this.leftLowerArmSkin = new THREE.Mesh(new THREE.CylinderGeometry(armSize[0],armSize[1],armSize[2],armSize[3]),new THREE.MeshNormalMaterial());
            this.leftLowerArm.add(this.leftLowerArmSkin);
            this.rightLowerArmSkin = new THREE.Mesh(new THREE.CylinderGeometry(armSize[0],armSize[1],armSize[2],armSize[3]),new THREE.MeshNormalMaterial());
            this.rightLowerArm.add(this.rightLowerArmSkin);
            //JOINTS........................................................
            this.leftShoulderSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize), new THREE.MeshNormalMaterial());
            this.rightShoulderSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize), new THREE.MeshNormalMaterial());
            this.leftShoulder.add(this.leftShoulderSkin);
            this.rightShoulder.add(this.rightShoulderSkin);

            this.leftElbowSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize), new THREE.MeshNormalMaterial());
            this.rightElbowSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize), new THREE.MeshNormalMaterial());
            this.leftElbow.add(this.leftElbowSkin);
            this.rightElbow.add(this.rightElbowSkin);

            this.leftHipSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize), new THREE.MeshNormalMaterial());
            this.rightHipSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize), new THREE.MeshNormalMaterial());
            this.leftHip.add(this.leftHipSkin);
            this.rightHip.add(this.rightHipSkin);

            this.leftKneeSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize), new THREE.MeshNormalMaterial());
            this.rightKneeSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize), new THREE.MeshNormalMaterial());
            this.leftKnee.add(this.leftKneeSkin);
            this.rightKnee.add(this.rightKneeSkin);
            
            //HANDS..........................................................
            this.leftHandSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize), new THREE.MeshNormalMaterial());
            this.rightHandSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSize), new THREE.MeshNormalMaterial());
            this.leftHand.add(this.leftHandSkin);
            this.rightHand.add(this.rightHandSkin);

            //LEGS..........................................................
            this.leftLegSkin = new THREE.Mesh(new THREE.CylinderGeometry(LegSize[0],LegSize[1],LegSize[2],LegSize[3]),new THREE.MeshNormalMaterial());
            this.leftLeg.add(this.leftLegSkin);
            this.rightLegSkin = new THREE.Mesh(new THREE.CylinderGeometry(LegSize[0],LegSize[1],LegSize[2],LegSize[3]),new THREE.MeshNormalMaterial());
            this.rightLeg.add(this.rightLegSkin);

            this.leftLowerLegSkin = new THREE.Mesh(new THREE.CylinderGeometry(LegSize[0],LegSize[1],LegSize[2],LegSize[3]),new THREE.MeshNormalMaterial());
            this.leftLowerLeg.add(this.leftLowerLegSkin);
            this.rightLowerLegSkin = new THREE.Mesh(new THREE.CylinderGeometry(LegSize[0],LegSize[1],LegSize[2],LegSize[3]),new THREE.MeshNormalMaterial());
            this.rightLowerLeg.add(this.rightLowerLegSkin);

            //EXTRA.........................................................


            //CONSTRUCTION===================================================================================================================

            this.rightLowerLeg.add(this.rightFoot);
            this.leftLowerLeg.add(this.leftFoot);

            this.leftKnee.add(this.leftLowerLeg);
            this.rightKnee.add(this.rightLowerLeg);

            this.leftLeg.add(this.leftKnee);
            this.rightLeg.add(this.rightKnee);
            this.leftHip.add(this.leftLeg);
            this.rightHip.add(this.rightLeg);

            this.leftLowerArm.add(this.leftHand);
            this.rightLowerArm.add(this.rightHand);
            this.leftElbow.add(this.leftLowerArm);
            this.rightElbow.add(this.rightLowerArm);
            this.leftArm.add(this.leftElbow);
            this.rightArm.add(this.rightElbow);
            this.leftShoulder.add(this.leftArm);
            this.rightShoulder.add(this.rightArm);

            this.torso.add(this.leftHip);
            this.torso.add(this.rightHip);
            this.torso.add(this.leftShoulder);
            this.torso.add(this.rightShoulder);

            this.head.add(this.hat);

            this.root.add(this.torso);

            this.getMesh = function() {
                return this.root;
            }

        };

        return Robot;
    }));