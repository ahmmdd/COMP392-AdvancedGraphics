/*
 *  This is the point.ts file that initilizes the x, y, and z coordinates of
 *  the object.
 *
 *  Source File Name:   point.ts
 *  Author Name:        Mohammed Juned Ahmed (300833356)
 *  Last Modified by:   Mohammed Juned Ahmed
 *  Date Last Modified: February 08, 2016
 *  Revision History:   0.0.1
 */
/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // POINT CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Point = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Point(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        return Point;
    })();
    objects.Point = Point;
})(objects || (objects = {}));

//# sourceMappingURL=point.js.map
