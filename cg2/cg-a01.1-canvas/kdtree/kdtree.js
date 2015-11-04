/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: kdtree
 *
 *
 */


/* requireJS module definition */
define(["kdutil", "vec2", "Scene", "KdNode", "BoundingBox"],
    (function(KdUtil, vec2, Scene, KdNode, BoundingBox) {

        "use strict";

        /**
         * Creates a kd-tree. The build function is directly called
         * on generation
         *
         * @param pointList
         * @constructor
         */
        var KdTree = function (pointList) {

            /**
             *
             * @param pointList - list of points
             * @param dim       - current axis
             * @param parent    - current parent (starts with root)
             * @param isLeft    - flag if node is left or right child of its parent
             * @returns returns root node after tree is build
             */
            this.build = function(pointList, dim, parent, isLeft) {

                // IMPLEMENT!
                // create new node
				if(pointList.length == 0)
					return;
				var node = new KdNode(dim);

                // find median position in pointList
                var median = KdUtil.median(pointList, dim);
                // compute next axis
                var nextAxis;

				if(dim)
					nextAxis = 0 ;
				else
					nextAxis = 1;
                // set point in node
                node.point = pointList[median];
                // compute bounding box for node
                // check if node is root (has no parent)
                //
                // take a look in findNearestNeighbor why we
                // need this bounding box!

				var box;
                if( !parent ) {
                    // Note: hardcoded canvas size here
					box = new BoundingBox(0,0,499,399,node.point,dim);
                } else {
					//console.log(parent);
                    // create bounding box and distinguish between axis and
                    // which side (left/right) the node is on
					if(isLeft && dim)
						box = new BoundingBox(parent.bbox.xmin, parent.bbox.ymin, parent.point.center[0], parent.bbox.ymax, node.point, dim);
					else if(!isLeft && dim){
						box = new BoundingBox(parent.point.center[0], parent.bbox.ymin, parent.bbox.xmax, parent.bbox.ymax, node.point, dim);
					}
					else if(isLeft && !dim){
						box = new BoundingBox(parent.bbox.xmin, parent.point.center[1], parent.bbox.xmax, parent.bbox.ymax, node.point, dim);
					}else if(!isLeft && !dim){
						box = new BoundingBox(parent.bbox.xmin, parent.bbox.ymin, parent.bbox.xmax, parent.point.center[1], node.point, dim);
					}

				}
				node.bbox = box;

                // create point list left/right and

				var leftList = [];
				var rightList = [];

				if(!dim){
					for(var i = 0; i < median; i++){
						leftList.push(pointList[i]);
					}
					for(var i = median+1; i < pointList.length; i++){
						rightList.push(pointList[i]);
					}

				}else{
					for(var i = 0; i < median; i++){
						rightList.push(pointList[i]);
					}

					for(var i = median+1; i < pointList.length; i++){
						leftList.push(pointList[i]);
					}
				}



                // call build for left/right arrays
                node.leftChild = this.build(leftList, nextAxis, node, 1);
				node.rightChild = this.build(rightList, nextAxis, node, 0);

                return node;
            };

            /**
             * Given a query point the function return its nearest neighbor by traversing
             * down the tree
             *
             * @param node - current tree node
             * @param query - query node
             * @param nearestDistance - current nearest distance to query node
             * @param currentBest - current best/nearest node to query node
             * @param dim - current axis (x or y)
             * @returns closest tree node to query node
             */
            this.findNearestNeighbor = function(node, query, nearestDistance, currentBest, dim) {

                if( !node ) {
                    return currentBest;
                }

                var closest = currentBest;
                var closestDistance = nearestDistance;

                var dist = KdUtil.distance(node.point.center, query.center);
                if( dist < nearestDistance ) {
                    closestDistance = dist;
                    closest = node;
                }

                var first, second;
                if (dim == 0) {
                    if ( query.center[0] < node.point.center[0]) {
                        first = node.leftChild;
                        second = node.rightChild;
                    } else {
                        first = node.rightChild;
                        second = node.leftChild;
                    }
                } else {
                    if (query.center[1] < node.point.center[1]) {
                        first = node.leftChild;
                        second = node.rightChild;
                    } else {
                        first = node.rightChild;
                        second = node.leftChild;
                    }
                }

                var nextDim = (dim === 0) ? 1 : 0;
                if( first && first.bbox.distanceTo(query.center) < closestDistance) {
                    closest = this.findNearestNeighbor(first, query, closestDistance, closest, nextDim);
                    closestDistance = KdUtil.distance(closest.point.center, query.center);
                }

                if( second && second.bbox.distanceTo(query.center) < closestDistance) {
                    closest = this.findNearestNeighbor(second, query, closestDistance, closest, nextDim);
                }

                return closest;
            };


            //
            this.root = this.build(pointList, 0);
            console.log(" this is the root: ", this.root);

        };

        return KdTree;


    })); // define


