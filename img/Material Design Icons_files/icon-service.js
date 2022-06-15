(function () {
    "use strict";
    if (!("SVGPathSeg" in window)) {
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathSeg
        window.SVGPathSeg = function (type, typeAsLetter, owningPathSegList) {
            this.pathSegType = type;
            this.pathSegTypeAsLetter = typeAsLetter;
            this._owningPathSegList = owningPathSegList;
        }

        SVGPathSeg.prototype.classname = "SVGPathSeg";

        SVGPathSeg.PATHSEG_UNKNOWN = 0;
        SVGPathSeg.PATHSEG_CLOSEPATH = 1;
        SVGPathSeg.PATHSEG_MOVETO_ABS = 2;
        SVGPathSeg.PATHSEG_MOVETO_REL = 3;
        SVGPathSeg.PATHSEG_LINETO_ABS = 4;
        SVGPathSeg.PATHSEG_LINETO_REL = 5;
        SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6;
        SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7;
        SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8;
        SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9;
        SVGPathSeg.PATHSEG_ARC_ABS = 10;
        SVGPathSeg.PATHSEG_ARC_REL = 11;
        SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12;
        SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13;
        SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14;
        SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15;
        SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16;
        SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17;
        SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18;
        SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19;

        // Notify owning PathSegList on any changes so they can be synchronized back to the path element.
        SVGPathSeg.prototype._segmentChanged = function () {
            if (this._owningPathSegList)
                this._owningPathSegList.segmentChanged(this);
        }

        window.SVGPathSegClosePath = function (owningPathSegList) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CLOSEPATH, "z", owningPathSegList);
        }
        SVGPathSegClosePath.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegClosePath.prototype.toString = function () { return "[object SVGPathSegClosePath]"; }
        SVGPathSegClosePath.prototype._asPathString = function () { return this.pathSegTypeAsLetter; }
        SVGPathSegClosePath.prototype.clone = function () { return new SVGPathSegClosePath(undefined); }

        window.SVGPathSegMovetoAbs = function (owningPathSegList, x, y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_MOVETO_ABS, "M", owningPathSegList);
            this._x = x;
            this._y = y;
        }
        SVGPathSegMovetoAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegMovetoAbs.prototype.toString = function () { return "[object SVGPathSegMovetoAbs]"; }
        SVGPathSegMovetoAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        SVGPathSegMovetoAbs.prototype.clone = function () { return new SVGPathSegMovetoAbs(undefined, this._x, this._y); }
        Object.defineProperty(SVGPathSegMovetoAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegMovetoAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegMovetoRel = function (owningPathSegList, x, y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_MOVETO_REL, "m", owningPathSegList);
            this._x = x;
            this._y = y;
        }
        SVGPathSegMovetoRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegMovetoRel.prototype.toString = function () { return "[object SVGPathSegMovetoRel]"; }
        SVGPathSegMovetoRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        SVGPathSegMovetoRel.prototype.clone = function () { return new SVGPathSegMovetoRel(undefined, this._x, this._y); }
        Object.defineProperty(SVGPathSegMovetoRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegMovetoRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoAbs = function (owningPathSegList, x, y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_ABS, "L", owningPathSegList);
            this._x = x;
            this._y = y;
        }
        SVGPathSegLinetoAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegLinetoAbs.prototype.toString = function () { return "[object SVGPathSegLinetoAbs]"; }
        SVGPathSegLinetoAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        SVGPathSegLinetoAbs.prototype.clone = function () { return new SVGPathSegLinetoAbs(undefined, this._x, this._y); }
        Object.defineProperty(SVGPathSegLinetoAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegLinetoAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoRel = function (owningPathSegList, x, y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_REL, "l", owningPathSegList);
            this._x = x;
            this._y = y;
        }
        SVGPathSegLinetoRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegLinetoRel.prototype.toString = function () { return "[object SVGPathSegLinetoRel]"; }
        SVGPathSegLinetoRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        SVGPathSegLinetoRel.prototype.clone = function () { return new SVGPathSegLinetoRel(undefined, this._x, this._y); }
        Object.defineProperty(SVGPathSegLinetoRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegLinetoRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoCubicAbs = function (owningPathSegList, x, y, x1, y1, x2, y2) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "C", owningPathSegList);
            this._x = x;
            this._y = y;
            this._x1 = x1;
            this._y1 = y1;
            this._x2 = x2;
            this._y2 = y2;
        }
        SVGPathSegCurvetoCubicAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoCubicAbs.prototype.toString = function () { return "[object SVGPathSegCurvetoCubicAbs]"; }
        SVGPathSegCurvetoCubicAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
        SVGPathSegCurvetoCubicAbs.prototype.clone = function () { return new SVGPathSegCurvetoCubicAbs(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2); }
        Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "x1", { get: function () { return this._x1; }, set: function (x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "y1", { get: function () { return this._y1; }, set: function (y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "x2", { get: function () { return this._x2; }, set: function (x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicAbs.prototype, "y2", { get: function () { return this._y2; }, set: function (y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoCubicRel = function (owningPathSegList, x, y, x1, y1, x2, y2) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "c", owningPathSegList);
            this._x = x;
            this._y = y;
            this._x1 = x1;
            this._y1 = y1;
            this._x2 = x2;
            this._y2 = y2;
        }
        SVGPathSegCurvetoCubicRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoCubicRel.prototype.toString = function () { return "[object SVGPathSegCurvetoCubicRel]"; }
        SVGPathSegCurvetoCubicRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
        SVGPathSegCurvetoCubicRel.prototype.clone = function () { return new SVGPathSegCurvetoCubicRel(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2); }
        Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "x1", { get: function () { return this._x1; }, set: function (x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "y1", { get: function () { return this._y1; }, set: function (y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "x2", { get: function () { return this._x2; }, set: function (x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicRel.prototype, "y2", { get: function () { return this._y2; }, set: function (y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoQuadraticAbs = function (owningPathSegList, x, y, x1, y1) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "Q", owningPathSegList);
            this._x = x;
            this._y = y;
            this._x1 = x1;
            this._y1 = y1;
        }
        SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoQuadraticAbs.prototype.toString = function () { return "[object SVGPathSegCurvetoQuadraticAbs]"; }
        SVGPathSegCurvetoQuadraticAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y; }
        SVGPathSegCurvetoQuadraticAbs.prototype.clone = function () { return new SVGPathSegCurvetoQuadraticAbs(undefined, this._x, this._y, this._x1, this._y1); }
        Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "x1", { get: function () { return this._x1; }, set: function (x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoQuadraticAbs.prototype, "y1", { get: function () { return this._y1; }, set: function (y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoQuadraticRel = function (owningPathSegList, x, y, x1, y1) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "q", owningPathSegList);
            this._x = x;
            this._y = y;
            this._x1 = x1;
            this._y1 = y1;
        }
        SVGPathSegCurvetoQuadraticRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoQuadraticRel.prototype.toString = function () { return "[object SVGPathSegCurvetoQuadraticRel]"; }
        SVGPathSegCurvetoQuadraticRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y; }
        SVGPathSegCurvetoQuadraticRel.prototype.clone = function () { return new SVGPathSegCurvetoQuadraticRel(undefined, this._x, this._y, this._x1, this._y1); }
        Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "x1", { get: function () { return this._x1; }, set: function (x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoQuadraticRel.prototype, "y1", { get: function () { return this._y1; }, set: function (y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegArcAbs = function (owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_ARC_ABS, "A", owningPathSegList);
            this._x = x;
            this._y = y;
            this._r1 = r1;
            this._r2 = r2;
            this._angle = angle;
            this._largeArcFlag = largeArcFlag;
            this._sweepFlag = sweepFlag;
        }
        SVGPathSegArcAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegArcAbs.prototype.toString = function () { return "[object SVGPathSegArcAbs]"; }
        SVGPathSegArcAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y; }
        SVGPathSegArcAbs.prototype.clone = function () { return new SVGPathSegArcAbs(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag); }
        Object.defineProperty(SVGPathSegArcAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegArcAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegArcAbs.prototype, "r1", { get: function () { return this._r1; }, set: function (r1) { this._r1 = r1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegArcAbs.prototype, "r2", { get: function () { return this._r2; }, set: function (r2) { this._r2 = r2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegArcAbs.prototype, "angle", { get: function () { return this._angle; }, set: function (angle) { this._angle = angle; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegArcAbs.prototype, "largeArcFlag", { get: function () { return this._largeArcFlag; }, set: function (largeArcFlag) { this._largeArcFlag = largeArcFlag; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegArcAbs.prototype, "sweepFlag", { get: function () { return this._sweepFlag; }, set: function (sweepFlag) { this._sweepFlag = sweepFlag; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegArcRel = function (owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_ARC_REL, "a", owningPathSegList);
            this._x = x;
            this._y = y;
            this._r1 = r1;
            this._r2 = r2;
            this._angle = angle;
            this._largeArcFlag = largeArcFlag;
            this._sweepFlag = sweepFlag;
        }
        SVGPathSegArcRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegArcRel.prototype.toString = function () { return "[object SVGPathSegArcRel]"; }
        SVGPathSegArcRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y; }
        SVGPathSegArcRel.prototype.clone = function () { return new SVGPathSegArcRel(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag); }
        Object.defineProperty(SVGPathSegArcRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegArcRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegArcRel.prototype, "r1", { get: function () { return this._r1; }, set: function (r1) { this._r1 = r1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegArcRel.prototype, "r2", { get: function () { return this._r2; }, set: function (r2) { this._r2 = r2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegArcRel.prototype, "angle", { get: function () { return this._angle; }, set: function (angle) { this._angle = angle; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegArcRel.prototype, "largeArcFlag", { get: function () { return this._largeArcFlag; }, set: function (largeArcFlag) { this._largeArcFlag = largeArcFlag; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegArcRel.prototype, "sweepFlag", { get: function () { return this._sweepFlag; }, set: function (sweepFlag) { this._sweepFlag = sweepFlag; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoHorizontalAbs = function (owningPathSegList, x) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "H", owningPathSegList);
            this._x = x;
        }
        SVGPathSegLinetoHorizontalAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegLinetoHorizontalAbs.prototype.toString = function () { return "[object SVGPathSegLinetoHorizontalAbs]"; }
        SVGPathSegLinetoHorizontalAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x; }
        SVGPathSegLinetoHorizontalAbs.prototype.clone = function () { return new SVGPathSegLinetoHorizontalAbs(undefined, this._x); }
        Object.defineProperty(SVGPathSegLinetoHorizontalAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoHorizontalRel = function (owningPathSegList, x) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "h", owningPathSegList);
            this._x = x;
        }
        SVGPathSegLinetoHorizontalRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegLinetoHorizontalRel.prototype.toString = function () { return "[object SVGPathSegLinetoHorizontalRel]"; }
        SVGPathSegLinetoHorizontalRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x; }
        SVGPathSegLinetoHorizontalRel.prototype.clone = function () { return new SVGPathSegLinetoHorizontalRel(undefined, this._x); }
        Object.defineProperty(SVGPathSegLinetoHorizontalRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoVerticalAbs = function (owningPathSegList, y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "V", owningPathSegList);
            this._y = y;
        }
        SVGPathSegLinetoVerticalAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegLinetoVerticalAbs.prototype.toString = function () { return "[object SVGPathSegLinetoVerticalAbs]"; }
        SVGPathSegLinetoVerticalAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._y; }
        SVGPathSegLinetoVerticalAbs.prototype.clone = function () { return new SVGPathSegLinetoVerticalAbs(undefined, this._y); }
        Object.defineProperty(SVGPathSegLinetoVerticalAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoVerticalRel = function (owningPathSegList, y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "v", owningPathSegList);
            this._y = y;
        }
        SVGPathSegLinetoVerticalRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegLinetoVerticalRel.prototype.toString = function () { return "[object SVGPathSegLinetoVerticalRel]"; }
        SVGPathSegLinetoVerticalRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._y; }
        SVGPathSegLinetoVerticalRel.prototype.clone = function () { return new SVGPathSegLinetoVerticalRel(undefined, this._y); }
        Object.defineProperty(SVGPathSegLinetoVerticalRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoCubicSmoothAbs = function (owningPathSegList, x, y, x2, y2) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "S", owningPathSegList);
            this._x = x;
            this._y = y;
            this._x2 = x2;
            this._y2 = y2;
        }
        SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoCubicSmoothAbs.prototype.toString = function () { return "[object SVGPathSegCurvetoCubicSmoothAbs]"; }
        SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
        SVGPathSegCurvetoCubicSmoothAbs.prototype.clone = function () { return new SVGPathSegCurvetoCubicSmoothAbs(undefined, this._x, this._y, this._x2, this._y2); }
        Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "x2", { get: function () { return this._x2; }, set: function (x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicSmoothAbs.prototype, "y2", { get: function () { return this._y2; }, set: function (y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoCubicSmoothRel = function (owningPathSegList, x, y, x2, y2) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "s", owningPathSegList);
            this._x = x;
            this._y = y;
            this._x2 = x2;
            this._y2 = y2;
        }
        SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoCubicSmoothRel.prototype.toString = function () { return "[object SVGPathSegCurvetoCubicSmoothRel]"; }
        SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
        SVGPathSegCurvetoCubicSmoothRel.prototype.clone = function () { return new SVGPathSegCurvetoCubicSmoothRel(undefined, this._x, this._y, this._x2, this._y2); }
        Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "x2", { get: function () { return this._x2; }, set: function (x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoCubicSmoothRel.prototype, "y2", { get: function () { return this._y2; }, set: function (y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoQuadraticSmoothAbs = function (owningPathSegList, x, y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "T", owningPathSegList);
            this._x = x;
            this._y = y;
        }
        SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString = function () { return "[object SVGPathSegCurvetoQuadraticSmoothAbs]"; }
        SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone = function () { return new SVGPathSegCurvetoQuadraticSmoothAbs(undefined, this._x, this._y); }
        Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoQuadraticSmoothRel = function (owningPathSegList, x, y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "t", owningPathSegList);
            this._x = x;
            this._y = y;
        }
        SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString = function () { return "[object SVGPathSegCurvetoQuadraticSmoothRel]"; }
        SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString = function () { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone = function () { return new SVGPathSegCurvetoQuadraticSmoothRel(undefined, this._x, this._y); }
        Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothRel.prototype, "x", { get: function () { return this._x; }, set: function (x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(SVGPathSegCurvetoQuadraticSmoothRel.prototype, "y", { get: function () { return this._y; }, set: function (y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        // Add createSVGPathSeg* functions to SVGPathElement.
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathElement.
        SVGPathElement.prototype.createSVGPathSegClosePath = function () { return new SVGPathSegClosePath(undefined); }
        SVGPathElement.prototype.createSVGPathSegMovetoAbs = function (x, y) { return new SVGPathSegMovetoAbs(undefined, x, y); }
        SVGPathElement.prototype.createSVGPathSegMovetoRel = function (x, y) { return new SVGPathSegMovetoRel(undefined, x, y); }
        SVGPathElement.prototype.createSVGPathSegLinetoAbs = function (x, y) { return new SVGPathSegLinetoAbs(undefined, x, y); }
        SVGPathElement.prototype.createSVGPathSegLinetoRel = function (x, y) { return new SVGPathSegLinetoRel(undefined, x, y); }
        SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function (x, y, x1, y1, x2, y2) { return new SVGPathSegCurvetoCubicAbs(undefined, x, y, x1, y1, x2, y2); }
        SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function (x, y, x1, y1, x2, y2) { return new SVGPathSegCurvetoCubicRel(undefined, x, y, x1, y1, x2, y2); }
        SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function (x, y, x1, y1) { return new SVGPathSegCurvetoQuadraticAbs(undefined, x, y, x1, y1); }
        SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function (x, y, x1, y1) { return new SVGPathSegCurvetoQuadraticRel(undefined, x, y, x1, y1); }
        SVGPathElement.prototype.createSVGPathSegArcAbs = function (x, y, r1, r2, angle, largeArcFlag, sweepFlag) { return new SVGPathSegArcAbs(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag); }
        SVGPathElement.prototype.createSVGPathSegArcRel = function (x, y, r1, r2, angle, largeArcFlag, sweepFlag) { return new SVGPathSegArcRel(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag); }
        SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function (x) { return new SVGPathSegLinetoHorizontalAbs(undefined, x); }
        SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function (x) { return new SVGPathSegLinetoHorizontalRel(undefined, x); }
        SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function (y) { return new SVGPathSegLinetoVerticalAbs(undefined, y); }
        SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function (y) { return new SVGPathSegLinetoVerticalRel(undefined, y); }
        SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function (x, y, x2, y2) { return new SVGPathSegCurvetoCubicSmoothAbs(undefined, x, y, x2, y2); }
        SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function (x, y, x2, y2) { return new SVGPathSegCurvetoCubicSmoothRel(undefined, x, y, x2, y2); }
        SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function (x, y) { return new SVGPathSegCurvetoQuadraticSmoothAbs(undefined, x, y); }
        SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function (x, y) { return new SVGPathSegCurvetoQuadraticSmoothRel(undefined, x, y); }
    }

    if (!("SVGPathSegList" in window)) {
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathSegList
        window.SVGPathSegList = function (pathElement) {
            this._pathElement = pathElement;
            this._list = this._parsePath(this._pathElement.getAttribute("d"));

            // Use a MutationObserver to catch changes to the path's "d" attribute.
            this._mutationObserverConfig = { "attributes": true, "attributeFilter": ["d"] };
            this._pathElementMutationObserver = new MutationObserver(this._updateListFromPathMutations.bind(this));
            this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
        }

        SVGPathSegList.prototype.classname = "SVGPathSegList";

        Object.defineProperty(SVGPathSegList.prototype, "numberOfItems", {
            get: function () {
                this._checkPathSynchronizedToList();
                return this._list.length;
            },
            enumerable: true
        });

        // Add the pathSegList accessors to SVGPathElement.
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGAnimatedPathData
        Object.defineProperty(SVGPathElement.prototype, "pathSegList", {
            get: function () {
                if (!this._pathSegList)
                    this._pathSegList = new SVGPathSegList(this);
                return this._pathSegList;
            },
            enumerable: true
        });
        // FIXME: The following are not implemented and simply return SVGPathElement.pathSegList.
        Object.defineProperty(SVGPathElement.prototype, "normalizedPathSegList", { get: function () { return this.pathSegList; }, enumerable: true });
        Object.defineProperty(SVGPathElement.prototype, "animatedPathSegList", { get: function () { return this.pathSegList; }, enumerable: true });
        Object.defineProperty(SVGPathElement.prototype, "animatedNormalizedPathSegList", { get: function () { return this.pathSegList; }, enumerable: true });

        // Process any pending mutations to the path element and update the list as needed.
        // This should be the first call of all public functions and is needed because
        // MutationObservers are not synchronous so we can have pending asynchronous mutations.
        SVGPathSegList.prototype._checkPathSynchronizedToList = function () {
            this._updateListFromPathMutations(this._pathElementMutationObserver.takeRecords());
        }

        SVGPathSegList.prototype._updateListFromPathMutations = function (mutationRecords) {
            if (!this._pathElement)
                return;
            var hasPathMutations = false;
            mutationRecords.forEach(function (record) {
                if (record.attributeName == "d")
                    hasPathMutations = true;
            });
            if (hasPathMutations)
                this._list = this._parsePath(this._pathElement.getAttribute("d"));
        }

        // Serialize the list and update the path's 'd' attribute.
        SVGPathSegList.prototype._writeListToPath = function () {
            this._pathElementMutationObserver.disconnect();
            this._pathElement.setAttribute("d", SVGPathSegList._pathSegArrayAsString(this._list));
            this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
        }

        // When a path segment changes the list needs to be synchronized back to the path element.
        SVGPathSegList.prototype.segmentChanged = function (pathSeg) {
            this._writeListToPath();
        }

        SVGPathSegList.prototype.clear = function () {
            this._checkPathSynchronizedToList();

            this._list.forEach(function (pathSeg) {
                pathSeg._owningPathSegList = null;
            });
            this._list = [];
            this._writeListToPath();
        }

        SVGPathSegList.prototype.initialize = function (newItem) {
            this._checkPathSynchronizedToList();

            this._list = [newItem];
            newItem._owningPathSegList = this;
            this._writeListToPath();
            return newItem;
        }

        SVGPathSegList.prototype._checkValidIndex = function (index) {
            if (isNaN(index) || index < 0 || index >= this.numberOfItems)
                throw "INDEX_SIZE_ERR";
        }

        SVGPathSegList.prototype.getItem = function (index) {
            this._checkPathSynchronizedToList();

            this._checkValidIndex(index);
            return this._list[index];
        }

        SVGPathSegList.prototype.insertItemBefore = function (newItem, index) {
            this._checkPathSynchronizedToList();

            // Spec: If the index is greater than or equal to numberOfItems, then the new item is appended to the end of the list.
            if (index > this.numberOfItems)
                index = this.numberOfItems;
            if (newItem._owningPathSegList) {
                // SVG2 spec says to make a copy.
                newItem = newItem.clone();
            }
            this._list.splice(index, 0, newItem);
            newItem._owningPathSegList = this;
            this._writeListToPath();
            return newItem;
        }

        SVGPathSegList.prototype.replaceItem = function (newItem, index) {
            this._checkPathSynchronizedToList();

            if (newItem._owningPathSegList) {
                // SVG2 spec says to make a copy.
                newItem = newItem.clone();
            }
            this._checkValidIndex(index);
            this._list[index] = newItem;
            newItem._owningPathSegList = this;
            this._writeListToPath();
            return newItem;
        }

        SVGPathSegList.prototype.removeItem = function (index) {
            this._checkPathSynchronizedToList();

            this._checkValidIndex(index);
            var item = this._list[index];
            this._list.splice(index, 1);
            this._writeListToPath();
            return item;
        }

        SVGPathSegList.prototype.appendItem = function (newItem) {
            this._checkPathSynchronizedToList();

            if (newItem._owningPathSegList) {
                // SVG2 spec says to make a copy.
                newItem = newItem.clone();
            }
            this._list.push(newItem);
            newItem._owningPathSegList = this;
            // TODO: Optimize this to just append to the existing attribute.
            this._writeListToPath();
            return newItem;
        }

        SVGPathSegList._pathSegArrayAsString = function (pathSegArray) {
            var string = "";
            var first = true;
            pathSegArray.forEach(function (pathSeg) {
                if (first) {
                    first = false;
                    string += pathSeg._asPathString();
                } else {
                    string += " " + pathSeg._asPathString();
                }
            });
            return string;
        }

        // This closely follows SVGPathParser::parsePath from Source/core/svg/SVGPathParser.cpp.
        SVGPathSegList.prototype._parsePath = function (string) {
            if (!string || string.length == 0)
                return [];

            var owningPathSegList = this;

            var Builder = function () {
                this.pathSegList = [];
            }

            Builder.prototype.appendSegment = function (pathSeg) {
                this.pathSegList.push(pathSeg);
            }

            var Source = function (string) {
                this._string = string;
                this._currentIndex = 0;
                this._endIndex = this._string.length;
                this._previousCommand = SVGPathSeg.PATHSEG_UNKNOWN;

                this._skipOptionalSpaces();
            }

            Source.prototype._isCurrentSpace = function () {
                var character = this._string[this._currentIndex];
                return character <= " " && (character == " " || character == "\n" || character == "\t" || character == "\r" || character == "\f");
            }

            Source.prototype._skipOptionalSpaces = function () {
                while (this._currentIndex < this._endIndex && this._isCurrentSpace())
                    this._currentIndex++;
                return this._currentIndex < this._endIndex;
            }

            Source.prototype._skipOptionalSpacesOrDelimiter = function () {
                if (this._currentIndex < this._endIndex && !this._isCurrentSpace() && this._string.charAt(this._currentIndex) != ",")
                    return false;
                if (this._skipOptionalSpaces()) {
                    if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ",") {
                        this._currentIndex++;
                        this._skipOptionalSpaces();
                    }
                }
                return this._currentIndex < this._endIndex;
            }

            Source.prototype.hasMoreData = function () {
                return this._currentIndex < this._endIndex;
            }

            Source.prototype.peekSegmentType = function () {
                var lookahead = this._string[this._currentIndex];
                return this._pathSegTypeFromChar(lookahead);
            }

            Source.prototype._pathSegTypeFromChar = function (lookahead) {
                switch (lookahead) {
                    case "Z":
                    case "z":
                        return SVGPathSeg.PATHSEG_CLOSEPATH;
                    case "M":
                        return SVGPathSeg.PATHSEG_MOVETO_ABS;
                    case "m":
                        return SVGPathSeg.PATHSEG_MOVETO_REL;
                    case "L":
                        return SVGPathSeg.PATHSEG_LINETO_ABS;
                    case "l":
                        return SVGPathSeg.PATHSEG_LINETO_REL;
                    case "C":
                        return SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
                    case "c":
                        return SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
                    case "Q":
                        return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
                    case "q":
                        return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
                    case "A":
                        return SVGPathSeg.PATHSEG_ARC_ABS;
                    case "a":
                        return SVGPathSeg.PATHSEG_ARC_REL;
                    case "H":
                        return SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
                    case "h":
                        return SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
                    case "V":
                        return SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
                    case "v":
                        return SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
                    case "S":
                        return SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
                    case "s":
                        return SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
                    case "T":
                        return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
                    case "t":
                        return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
                    default:
                        return SVGPathSeg.PATHSEG_UNKNOWN;
                }
            }

            Source.prototype._nextCommandHelper = function (lookahead, previousCommand) {
                // Check for remaining coordinates in the current command.
                if ((lookahead == "+" || lookahead == "-" || lookahead == "." || (lookahead >= "0" && lookahead <= "9")) && previousCommand != SVGPathSeg.PATHSEG_CLOSEPATH) {
                    if (previousCommand == SVGPathSeg.PATHSEG_MOVETO_ABS)
                        return SVGPathSeg.PATHSEG_LINETO_ABS;
                    if (previousCommand == SVGPathSeg.PATHSEG_MOVETO_REL)
                        return SVGPathSeg.PATHSEG_LINETO_REL;
                    return previousCommand;
                }
                return SVGPathSeg.PATHSEG_UNKNOWN;
            }

            Source.prototype.initialCommandIsMoveTo = function () {
                // If the path is empty it is still valid, so return true.
                if (!this.hasMoreData())
                    return true;
                var command = this.peekSegmentType();
                // Path must start with moveTo.
                return command == SVGPathSeg.PATHSEG_MOVETO_ABS || command == SVGPathSeg.PATHSEG_MOVETO_REL;
            }

            // Parse a number from an SVG path. This very closely follows genericParseNumber(...) from Source/core/svg/SVGParserUtilities.cpp.
            // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-PathDataBNF
            Source.prototype._parseNumber = function () {
                var exponent = 0;
                var integer = 0;
                var frac = 1;
                var decimal = 0;
                var sign = 1;
                var expsign = 1;

                var startIndex = this._currentIndex;

                this._skipOptionalSpaces();

                // Read the sign.
                if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "+")
                    this._currentIndex++;
                else if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "-") {
                    this._currentIndex++;
                    sign = -1;
                }

                if (this._currentIndex == this._endIndex || ((this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") && this._string.charAt(this._currentIndex) != "."))
                    // The first character of a number must be one of [0-9+-.].
                    return undefined;

                // Read the integer part, build right-to-left.
                var startIntPartIndex = this._currentIndex;
                while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9")
                    this._currentIndex++; // Advance to first non-digit.

                if (this._currentIndex != startIntPartIndex) {
                    var scanIntPartIndex = this._currentIndex - 1;
                    var multiplier = 1;
                    while (scanIntPartIndex >= startIntPartIndex) {
                        integer += multiplier * (this._string.charAt(scanIntPartIndex--) - "0");
                        multiplier *= 10;
                    }
                }

                // Read the decimals.
                if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ".") {
                    this._currentIndex++;

                    // There must be a least one digit following the .
                    if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9")
                        return undefined;
                    while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9")
                        decimal += (this._string.charAt(this._currentIndex++) - "0") * (frac *= 0.1);
                }

                // Read the exponent part.
                if (this._currentIndex != startIndex && this._currentIndex + 1 < this._endIndex && (this._string.charAt(this._currentIndex) == "e" || this._string.charAt(this._currentIndex) == "E") && (this._string.charAt(this._currentIndex + 1) != "x" && this._string.charAt(this._currentIndex + 1) != "m")) {
                    this._currentIndex++;

                    // Read the sign of the exponent.
                    if (this._string.charAt(this._currentIndex) == "+") {
                        this._currentIndex++;
                    } else if (this._string.charAt(this._currentIndex) == "-") {
                        this._currentIndex++;
                        expsign = -1;
                    }

                    // There must be an exponent.
                    if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9")
                        return undefined;

                    while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
                        exponent *= 10;
                        exponent += (this._string.charAt(this._currentIndex) - "0");
                        this._currentIndex++;
                    }
                }

                var number = integer + decimal;
                number *= sign;

                if (exponent)
                    number *= Math.pow(10, expsign * exponent);

                if (startIndex == this._currentIndex)
                    return undefined;

                this._skipOptionalSpacesOrDelimiter();

                return number;
            }

            Source.prototype._parseArcFlag = function () {
                if (this._currentIndex >= this._endIndex)
                    return undefined;
                var flag = false;
                var flagChar = this._string.charAt(this._currentIndex++);
                if (flagChar == "0")
                    flag = false;
                else if (flagChar == "1")
                    flag = true;
                else
                    return undefined;

                this._skipOptionalSpacesOrDelimiter();
                return flag;
            }

            Source.prototype.parseSegment = function () {
                var lookahead = this._string[this._currentIndex];
                var command = this._pathSegTypeFromChar(lookahead);
                if (command == SVGPathSeg.PATHSEG_UNKNOWN) {
                    // Possibly an implicit command. Not allowed if this is the first command.
                    if (this._previousCommand == SVGPathSeg.PATHSEG_UNKNOWN)
                        return null;
                    command = this._nextCommandHelper(lookahead, this._previousCommand);
                    if (command == SVGPathSeg.PATHSEG_UNKNOWN)
                        return null;
                } else {
                    this._currentIndex++;
                }

                this._previousCommand = command;

                switch (command) {
                    case SVGPathSeg.PATHSEG_MOVETO_REL:
                        return new SVGPathSegMovetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
                    case SVGPathSeg.PATHSEG_MOVETO_ABS:
                        return new SVGPathSegMovetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
                    case SVGPathSeg.PATHSEG_LINETO_REL:
                        return new SVGPathSegLinetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
                    case SVGPathSeg.PATHSEG_LINETO_ABS:
                        return new SVGPathSegLinetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
                    case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                        return new SVGPathSegLinetoHorizontalRel(owningPathSegList, this._parseNumber());
                    case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                        return new SVGPathSegLinetoHorizontalAbs(owningPathSegList, this._parseNumber());
                    case SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                        return new SVGPathSegLinetoVerticalRel(owningPathSegList, this._parseNumber());
                    case SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                        return new SVGPathSegLinetoVerticalAbs(owningPathSegList, this._parseNumber());
                    case SVGPathSeg.PATHSEG_CLOSEPATH:
                        this._skipOptionalSpaces();
                        return new SVGPathSegClosePath(owningPathSegList);
                    case SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                        var points = { x1: this._parseNumber(), y1: this._parseNumber(), x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                        return new SVGPathSegCurvetoCubicRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
                    case SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                        var points = { x1: this._parseNumber(), y1: this._parseNumber(), x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                        return new SVGPathSegCurvetoCubicAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
                    case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                        var points = { x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                        return new SVGPathSegCurvetoCubicSmoothRel(owningPathSegList, points.x, points.y, points.x2, points.y2);
                    case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                        var points = { x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                        return new SVGPathSegCurvetoCubicSmoothAbs(owningPathSegList, points.x, points.y, points.x2, points.y2);
                    case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                        var points = { x1: this._parseNumber(), y1: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                        return new SVGPathSegCurvetoQuadraticRel(owningPathSegList, points.x, points.y, points.x1, points.y1);
                    case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                        var points = { x1: this._parseNumber(), y1: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber() };
                        return new SVGPathSegCurvetoQuadraticAbs(owningPathSegList, points.x, points.y, points.x1, points.y1);
                    case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
                        return new SVGPathSegCurvetoQuadraticSmoothRel(owningPathSegList, this._parseNumber(), this._parseNumber());
                    case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
                        return new SVGPathSegCurvetoQuadraticSmoothAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
                    case SVGPathSeg.PATHSEG_ARC_REL:
                        var points = { x1: this._parseNumber(), y1: this._parseNumber(), arcAngle: this._parseNumber(), arcLarge: this._parseArcFlag(), arcSweep: this._parseArcFlag(), x: this._parseNumber(), y: this._parseNumber() };
                        return new SVGPathSegArcRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
                    case SVGPathSeg.PATHSEG_ARC_ABS:
                        var points = { x1: this._parseNumber(), y1: this._parseNumber(), arcAngle: this._parseNumber(), arcLarge: this._parseArcFlag(), arcSweep: this._parseArcFlag(), x: this._parseNumber(), y: this._parseNumber() };
                        return new SVGPathSegArcAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
                    default:
                        throw "Unknown path seg type."
                }
            }

            var builder = new Builder();
            var source = new Source(string);

            if (!source.initialCommandIsMoveTo())
                return [];
            while (source.hasMoreData()) {
                var pathSeg = source.parseSegment();
                if (!pathSeg)
                    return [];
                builder.appendSegment(pathSeg);
            }

            return builder.pathSegList;
        }
    }
}());

angular.module('main')
.service('IconService', [
    '$http', '$q',
    function ($http, $q) {

        this.getPackages = function () {
            /// <summary>Get a list of all packages registered to this domain.</summary>
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'api/init',
                cache: true
            }).
            success(function (data, status, headers, config) {
                deferred.resolve(data.packages);
            }).
            error(function (data, status, headers, config) {
                deferred.reject();
            });

            return deferred.promise;
        };

        this.getPackage = function () {
            /// <summary>Get selected package</summary>
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'api/init',
                cache: true
            }).
            success(function (data, status, headers, config) {
                deferred.resolve(data.packages[0]);
            }).
            error(function (data, status, headers, config) {
                deferred.reject();
            });

            return deferred.promise;
        };

        this.getIcon = function (id) {
            /// <summary>Data is based on auth level</summary>
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'api/icon/' + id,
                cache: true
            }).
            success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                deferred.reject();
            });

            return deferred.promise;
        };

        var extraIconProperties = function (data) {
            if (!("icons" in data)) { return; }
            for (var i = 0; i < data.icons.length; i++) {
                data.icons[i].hidden = false;
            }
        };

        this.getIcons = function (packageId) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'api/package/' + packageId,
                cache: true
            }).
            success(function (data, status, headers, config) {
                extraIconProperties(data);
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                deferred.reject();
            });

            return deferred.promise;
        };

        this.getIconsByUser = function (packageId, user) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'api/package/' + packageId + '?name=' + (user || ''),
                cache: true
            }).
            success(function (data, status, headers, config) {
                extraIconProperties(data);
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                deferred.reject();
            });

            return deferred.promise;
        };

        this.getIconsByTag = function (packageId, tag) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'api/package/' + packageId + '?tag=' + tag,
                cache: true
            }).
            success(function (data, status, headers, config) {
                extraIconProperties(data);
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                deferred.reject();
            });

            return deferred.promise;
        };

        this.getIconsByName = function (packageId, iconName) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'api/package/' + packageId + '?iconName=' + iconName,
                cache: true
            }).
            success(function (data, status, headers, config) {
                extraIconProperties(data);
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                deferred.reject();
            });

            return deferred.promise;
        };

        this.addTag = function (iconId, tagId) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: 'api/admin/icon/tag/' + iconId + '/' + tagId
            }).
            success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                deferred.reject();
            });

            return deferred.promise;
        };

        this.removeTag = function (tagId) {
            var deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: 'api/admin/icon/tag/' + tagId
            }).
            success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                deferred.reject();
            });

            return deferred.promise;
        };

        this.setCustomIcon = function (iconData) {
            /// <summary></summary>
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: 'api/download/custom',
                data: iconData
            }).
            success(function (data, status, headers, config) {
                deferred.resolve();
            }).
            error(function (data, status, headers, config) {
                deferred.reject();
            });

            return deferred.promise;
        };

        var spaces = "\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029";
        var pathCommand = new RegExp("([a-z])["
            + spaces
            + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?["
            + spaces
            + "]*,?["
            + spaces
            + "]*)+)", "ig");
        var pathValues = new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)["
            + spaces + "]*,?["
            + spaces + "]*", "ig");
        function r(n) {
            return Math.round(n * 100) / 100;
        };
        function parsePathString(pathString) {
            /// <summary>Taken from Snap Library</summary>
            var paramCounts = { a: 7, c: 6, o: 2, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, u: 3, z: 0 },
                data = [];
            pathString.replace(pathCommand, function (a, b, c) {
                var params = [],
                    name = b.toLowerCase();
                c.replace(pathValues, function (a, b) {
                    b && params.push(+b);
                });
                if (name == "m" && params.length > 2) {
                    data.push([b].concat(params.splice(0, 2)));
                    name = "l";
                    b = b == "m" ? "l" : "L";
                }
                if (name == "o" && params.length == 1) {
                    data.push([b, params[0]]);
                }
                if (name == "r") {
                    data.push([b].concat(params));
                } else while (params.length >= paramCounts[name]) {
                    data.push([b].concat(params.splice(0, paramCounts[name])));
                    if (!paramCounts[name]) {
                        break;
                    }
                }
            });
            return data;
        };
        this.parsePathString = parsePathString;
        function convertToAbsolute(pathString) {
            var svgNS = "http://www.w3.org/2000/svg";
            var path = document.createElementNS(svgNS, "path");
            path.setAttribute('d', pathString);
            var x0, y0, x1, y1, x2, y2, segs = path.pathSegList;
            for (var x = 0, y = 0, i = 0, len = segs.numberOfItems; i < len; ++i) {
                var seg = segs.getItem(i), c = seg.pathSegTypeAsLetter;
                if (/[MLHVCSQTA]/.test(c)) {
                    if ('x' in seg) x = seg.x;
                    if ('y' in seg) y = seg.y;
                } else {
                    if ('x1' in seg) x1 = x + seg.x1;
                    if ('x2' in seg) x2 = x + seg.x2;
                    if ('y1' in seg) y1 = y + seg.y1;
                    if ('y2' in seg) y2 = y + seg.y2;
                    if ('x' in seg) x += seg.x;
                    if ('y' in seg) y += seg.y;
                    switch (c) {
                        case 'm': segs.replaceItem(path.createSVGPathSegMovetoAbs(x, y), i); break;
                        case 'l': segs.replaceItem(path.createSVGPathSegLinetoAbs(x, y), i); break;
                        case 'h': segs.replaceItem(path.createSVGPathSegLinetoHorizontalAbs(x), i); break;
                        case 'v': segs.replaceItem(path.createSVGPathSegLinetoVerticalAbs(y), i); break;
                        case 'c': segs.replaceItem(path.createSVGPathSegCurvetoCubicAbs(x, y, x1, y1, x2, y2), i); break;
                        case 's': segs.replaceItem(path.createSVGPathSegCurvetoCubicSmoothAbs(x, y, x2, y2), i); break;
                        case 'q': segs.replaceItem(path.createSVGPathSegCurvetoQuadraticAbs(x, y, x1, y1), i); break;
                        case 't': segs.replaceItem(path.createSVGPathSegCurvetoQuadraticSmoothAbs(x, y), i); break;
                        case 'a': segs.replaceItem(path.createSVGPathSegArcAbs(x, y, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag), i); break;
                        case 'z': case 'Z': x = x0; y = y0; break;
                    }
                }
                // Record the start of a subpath
                if (c == 'M' || c == 'm') x0 = x, y0 = y;
            }
            return path.getAttribute('d');
        };
        function curveToArc(x, y, part) {
            // Is valid diagonal
            if (Math.abs(x - part[5]) == Math.abs(y - part[6])) {
                var radius = r(Math.abs(x - part[5]));
                var match = {
                    exact: r(radius * 0.44773) == Math.abs(r(Math.abs(x == part[1] ? part[2] - y : part[1] - x) - radius)),
                    rounded: r(radius * 0.45) == Math.abs(r(Math.abs(x == part[1] ? part[2] - y : part[1] - x) - radius))
                };
                if (!(match.exact || match.rounded)) { return part; }
                var c = { x: part[5] - x, y: part[6] - y };
                //console.log('x: ' + x + ' y: ' + y + ' r: ' + radius + '   ' + part.join() + ' match: ' + (match.exact || match.rounded));
                if ((part[1] < part[3] && part[2] > part[4] && x < part[5] && y > part[6]) ||
                    (part[1] > part[3] && part[2] < part[4] && x > part[5] && y < part[6])) { // 1
                    if (x == part[1]) {
                        return ['A', radius, radius, 0, 0, 1, part[5], part[6]];
                    } else {
                        return ['A', radius, radius, 0, 0, 0, part[5], part[6]];
                    }
                } else if ((part[1] < part[3] && part[2] < part[4] && x < part[5] && y < part[6]) ||
                           (part[1] > part[3] && part[2] > part[4] && x > part[5] && y > part[6])) {
                    if (y == part[2]) {
                        return ['A', radius, radius, 0, 0, 1, part[5], part[6]];
                    } else {
                        return ['A', radius, radius, 0, 0, 0, part[5], part[6]];
                    }
                } else {
                    console.log('error');
                }
            }
            return part;
        };
        function optimize(parts) {
            var current = {
                x: 0,
                y: 0
            };
            for (var i = 0; i < parts.length; i++) {
                for (var j = 1; j < parts[i].length; j++) {
                    parts[i][j] = r(parts[i][j]);
                }
                if (i == 0) { continue; }
                switch (parts[i - 1][0]) {
                    case 'M':
                    case 'L':
                        current.x = parts[i - 1][1];
                        current.y = parts[i - 1][2];
                        if (parts[i][0] == 'L') {
                            if (parts[i][1] == parts[i - 1][1]) { // X axis equal so vertical line
                                parts[i] = ['V', parts[i][2]];
                            } else if (parts[i][2] == parts[i - 1][2]) { // Y axis equal so horizontal line
                                parts[i] = ['H', parts[i][1]];
                            }
                        } else if (parts[i][0] == 'C') {
                            parts[i] = curveToArc(current.x, current.y, parts[i]);
                        }
                        break;
                    case 'H':
                        current.x = parts[i - 1][1];
                        if (parts[i][0] == 'L') {
                            if (parts[i][1] == parts[i - 1][1]) { // X axis equal so vertical line
                                parts[i] = ['V', parts[i][2]];
                            }
                        } else if (parts[i][0] == 'C') {
                            parts[i] = curveToArc(current.x, current.y, parts[i]);
                        }
                        break;
                    case 'V':
                        current.y = parts[i - 1][1];
                        if (parts[i][0] == 'L') {
                            if (parts[i][2] == parts[i - 1][1]) { // Y axis equal so vertical line
                                parts[i] = ['H', parts[i][1]];
                            }
                        } else if (parts[i][0] == 'C') {
                            parts[i] = curveToArc(current.x, current.y, parts[i]);
                        }
                        break;
                    case 'C':
                        current.x = parts[i - 1][5];
                        current.y = parts[i - 1][6];
                        if (parts[i][0] == 'L') {
                            if (parts[i][1] == parts[i - 1][5]) { // X axis equal so vertical line
                                parts[i] = ['V', parts[i][2]];
                            } else if (parts[i][2] == parts[i - 1][6]) { // Y axis equal so horizontal line
                                parts[i] = ['H', parts[i][1]];
                            }
                        } else if (parts[i][0] == 'C') {
                            parts[i] = curveToArc(current.x, current.y, parts[i]);
                        }
                        break;
                    case 'A':
                        current.x = parts[i - 1][6];
                        current.y = parts[i - 1][7];
                        if (parts[i][0] == 'C') {
                            parts[i] = curveToArc(current.x, current.y, parts[i]);
                        } else if (parts[i][0] == 'L') {
                            if (parts[i][2] == current.y) {
                                parts[i] = ['H', parts[i][1]];
                            } else if (parts[i][1] == current.x) {
                                parts[i] = ['V', parts[i][2]];
                            }
                        }
                        break;
                }
            }
            return parts;
        };

        function partsToPath(parts) {
            var path = '';
            for (var i = 0; i < parts.length; i++) {
                switch (parts[i][0]) {
                    case 'M':
                    case 'L':
                        path += parts[i][0] + parts[i][1] + ',' + parts[i][2];
                        break;
                    case 'V':
                    case 'H':
                        path += parts[i][0] + parts[i][1];
                        break;
                    case 'C':
                        path += 'C' + parts[i][1] + ',' + parts[i][2] + ' '
                                    + parts[i][3] + ',' + parts[i][4] + ' '
                                    + parts[i][5] + ',' + parts[i][6];
                        break;
                    case 'A':
                        path += 'A' + parts[i][1] + ',' + parts[i][2] + ' '
                                    + parts[i][3] + ' ' + parts[i][4] + ','
                                    + parts[i][5] + ' ' + parts[i][6] + ',' + parts[i][7];
                        break;
                    case 'Z':
                        path += 'Z';
                        break;
                }
            }
            return path;
        };

        function cleanRounding(text) {
            text = text.replace(/-?\d+.\d+e-\d+/g, '0'); // e notation
            text = text.replace(/Z[ ]*M/g, 'M'); // 1 continous path only for font!
            text = text.replace(/(\d+)\.(\d{2,})/g, function (a, b, c) {
                // 2 Decimal Rounding
                a = (Math.round(parseFloat(a) * 100) / 100).toString();
                var p = a.split('.');
                if (p.length == 1) {
                    return a;
                }
                if (p[1] == '00') {
                    return b;
                } else if (p[1] == '99' || p[1] == '98') {
                    return Math.ceil(parseFloat(a));
                } else if (p[1] == '01' || p[1] == '02') {
                    return Math.floor(parseFloat(a));
                } else if (p[1] == '50' || p[1] == '49'
                    || p[1] == '48' || p[1] == '51' || p[1] == '52') {
                    return b + '.5';
                }
                return a;
            });
            return text;
        }

        this.optimizePath = function (path) {
            var parts = optimize(parsePathString(cleanRounding(convertToAbsolute(path))))
            return partsToPath(parts);
        };

        this.getFont = function (fontId) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'api/fonts/' + fontId
            }).
            success(function (data, status, headers, config) {
                data.map(function (icon) {
                    icon.html = "&#x" + icon.codePoint + ";";
                    icon.character = String.fromCharCode(parseInt(icon.codePoint, 16));
                    return icon;
                });
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        };

        this.getFontVersions = function (fontId) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'api/fonts/versions/' + fontId
            }).
            success(function (data, status, headers, config) {
                data = data.map(function (version) {
                    version.name = 'v' + version.version;
                    return version;
                }).filter(function (value) {
                    return value.released == 1;
                });
                deferred.resolve(data);
            }).
            error(function (data, status, headers, config) {
                deferred.reject(status);
            });

            return deferred.promise;
        };

        this.admin = {
            getIcon: function (id) {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'api/admin/icon/' + id
                }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            },
            setIcon: function (icon) {
                var deferred = $q.defer();

                $http({
                    method: 'PUT',
                    url: 'api/admin/icon',
                    data: icon
                }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            },
            publish: function (id) {
                var deferred = $q.defer();

                $http({
                    method: 'PUT',
                    url: 'api/admin/icon/publish',
                    data: {
                        id: id
                    }
                }).
                success(function (data, status, headers, config) {
                    deferred.resolve();
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            },
            unpublish: function (id) {
                var deferred = $q.defer();

                $http({
                    method: 'PUT',
                    url: 'api/admin/icon/unpublish',
                    data: {
                        id: id
                    }
                }).
                success(function (data, status, headers, config) {
                    deferred.resolve();
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            },
            createIcon: function (icon) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: 'api/admin/icon',
                    data: icon
                }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    if (status == 400) {
                        deferred.reject(data.message);
                    } else {
                        deferred.reject('Failed to create icon, try again.');
                    }
                });

                return deferred.promise;
            },
            getIcons: function (packageId) {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'api/admin/package/' + packageId
                }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            },
            getTopIconsThisWeek: function () {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'api/admin/stats/week'
                }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            },
            getFonts: function () {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'api/admin/fonts'
                }).
                success(function (data, status, headers, config) {
                    data.map(function (icon) {
                        icon.versions.map(function (version) {
                            version.name = 'v' + version.version;
                            return version;
                        });
                        return icon;
                    });
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            },
            getIconsByFont: function (fontId) {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'api/admin/fonts/' + fontId
                }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(status);
                });

                return deferred.promise;
            },
            setFontCodePoint: function (fontId, iconId, versionId, codePoint) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: 'api/admin/fonts/set',
                    data: {
                        fontId: fontId,
                        iconId: iconId,
                        versionId: versionId,
                        codePoint: codePoint
                    }
                }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    if (status == 400) {
                        deferred.reject(data.message);
                    } else {
                        deferred.reject('Failed to set icon to font, try again.');
                    }
                });

                return deferred.promise;
            }
        };

    }
]);