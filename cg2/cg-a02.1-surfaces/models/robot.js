/**
 * Created by Justin on 14-Dec-15.
 */


define(["three"],
    (function(THREE) {

        "use strict";

        /**
         *
         * @param scene  - reference to the scene
         * @constructor
         */
        var Robot = function () {

            var headSize=[130,130,130];
            var torsoSize=[250,400,150];

            //radiusTop, radiusBottom, height, radiusSegments
            var armSize=[40,40,250,32];

            this.root=new THREE.Object3D();

            //skeleton================================================================================================================
            this.head=new THREE.Object3D();
            this.head.name="head";
            this.head.translateY(torsoSize[1]/2+headSize[1]/2);

            this.torso=new THREE.Object3D();
            this.torso.add(this.head);

            //ARMS..........................................................
            this.leftArm = new THREE.Object3D();
            this.leftArm.translateX(torsoSize[2] + armSize[0]/2);
            this.rightArm = new THREE.Object3D();
            this.rightArm.translateX(-torsoSize[2] - armSize[0]/2);

            this.torso.add(this.leftArm);
            this.torso.add(this.rightArm);

            //skin====================================================================================================================
            this.headSkin=new THREE.Mesh(new THREE.CubeGeometry(headSize[0],headSize[1],
            headSize[2]),new THREE.MeshNormalMaterial());
            this.headSkin.rotateY(Math.PI/4);

            this.torsoSkin=new THREE.Mesh(new THREE.CubeGeometry(torsoSize[0],torsoSize
            [1],torsoSize[2]),new THREE.MeshNormalMaterial());

            //ARMS..........................................................
            this.leftArmSkin = new THREE.Mesh(new THREE.CylinderGeometry(armSize[0],armSize[1],armSize[2],armSize[3]),new THREE.MeshNormalMaterial());
            this.leftArm.add(this.leftArmSkin);
            this.rightArmSkin = new THREE.Mesh(new THREE.CylinderGeometry(armSize[0],armSize[1],armSize[2],armSize[3]),new THREE.MeshNormalMaterial());
            this.rightArm.add(this.rightArmSkin);


            this.torso.add(this.torsoSkin);
            this.head.add(this.headSkin);

            this.root.add(this.torso);

            this.getMesh = function() {
                return this.root;
            }

        };

        return Robot;
    }));