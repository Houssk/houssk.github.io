// namespaces
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
//external
var Kinetic = Kinetic || {};

var onPeutTraceTrapeze=false;
var tailleDépassementDroite = 100;
/**
 * ROI factory.
 * @constructor
 */
dwv.tool.RoiFactory = function ()
{
    /**
     * Get the number of points needed to build the shape.
     * @return {Number} The number of points.
     */
    this.getNPoints = function () { return 4; };
    /**
     * Get the timeout between point storage.
     * @return {Number} The timeout in milliseconds.
     */
    this.getTimeout = function () { return 20; };
};

/**
 * Create a roi shape to be displayed.
 * @param {Array} points The points from which to extract the line.
 * @param {Object} style The drawing style.
 * @param {Object} image The associated image.
 */
dwv.tool.RoiFactory.prototype.create = function (points, style /*, image*/)
{
    //console.log("RoiFactory");
    //console.log("RoiFactory nb points "+points);
    if (sessionStorage.getItem("premierPointTrapeze")===null) {
        sessionStorage.setItem("premierPointTrapeze", points[0]);
        var tempNbTrapeze = sessionStorage.getItem("nbTrapeze");
        tempNbTrapeze++;
        sessionStorage.setItem("nbTrapeze", tempNbTrapeze);
        onPeutTraceTrapeze=true;
    } else {
        //console.log("points[0] "+points[0]);
        //console.log("sessionStorage.getItem(premierPointTrapeze) "+sessionStorage.getItem("premierPointTrapeze"));
        if (sessionStorage.getItem("premierPointTrapeze")!=points[0]) {
            sessionStorage.setItem("premierPointTrapeze", points[0]);
            //console.log("sessionStorage.getItem(nbTrapeze) "+ sessionStorage.getItem("nbTrapeze"));
            if (sessionStorage.getItem("nbTrapeze")<=2) {
                var tempNbTrapeze = sessionStorage.getItem("nbTrapeze");
                tempNbTrapeze++;
                sessionStorage.setItem("nbTrapeze", tempNbTrapeze);
                onPeutTraceTrapeze=true;
            } else {
                alert("Veuillez supprimez un trapèze pour en recréer un nouveau");
                onPeutTraceTrapeze=false;
            }
        }
    }

    if (onPeutTraceTrapeze == true) {
        // physical shape
        var roi = new dwv.math.ROI();
        // add input points to the ROI
        roi.addPoints(points);
        // points stored the kineticjs way
        var arr = [];
        var Yarr = [];
        var Xarr = [];
        for( var i = 0; i < roi.getLength(); ++i )
        {
            arr.push( roi.getPoint(i).getX() );
            arr.push( roi.getPoint(i).getY() );
            Yarr.push( roi.getPoint(i).getY() );
        }

        // draw shape
        var kshape = new Kinetic.Line({
            points: arr,
            stroke: style.getLineColour(),
            strokeWidth: style.getScaledStrokeWidth(),
            name: "shape",
            closed: true
        });

        Yarr.sort(function(a, b){return a-b});
        for (var i = 0; i < Yarr.length; i++) {
            for (var j = 1; j < arr.length; j+=2) {
                if(Yarr[i]==arr[j])
                {
                    Xarr.push(arr[j-1]);
                }
            };
        };

        var x1 = Xarr[2] / 2 + Xarr[3] / 2 ;
        var y1 = Yarr[2] / 2 + Yarr[3] / 2 ;
        var x2 = Xarr[0] / 2 + Xarr[1] / 2 ;
        var y2 = Yarr[0] / 2 + Yarr[1] / 2 ;

        coeffDirect=(y2-y1)/(x2-x1);

        //test pour savoir de quel cote est le trapeze sauvegarde
        if(x1>(sessionStorage.getItem("imageLargeur")/2)){
            var trapezeAxePosition=[];
            trapezeAxePosition.push(x1);
            trapezeAxePosition.push(y1);
            trapezeAxePosition.push(x2);
            trapezeAxePosition.push(y2);
            sessionStorage.setItem("trapezeDroitPosition", JSON.stringify(trapezeAxePosition));
            sessionStorage.setItem("trapezeDroitcoeffDirect", coeffDirect);
            //console.log("trapezeDroitPosition "+sessionStorage.getItem("trapezeDroitPosition"));
            //console.log("trapezeDroitcoeffDirect "+sessionStorage.getItem("trapezeDroitcoeffDirect"));
        } else {
            var trapezeAxePosition=[];
            trapezeAxePosition.push(x1);
            trapezeAxePosition.push(y1);
            trapezeAxePosition.push(x2);
            trapezeAxePosition.push(y2);
            sessionStorage.setItem("trapezeGauchePosition", JSON.stringify(trapezeAxePosition));
            sessionStorage.setItem("trapezeGauchecoeffDirect", coeffDirect);
            //console.log("trapezeGauchePosition "+sessionStorage.getItem("trapezeGauchePosition"));
            //console.log("trapezeGauchecoeffDirect "+sessionStorage.getItem("trapezeGauchecoeffDirect"));
        }

        x1=x1+(tailleDépassementDroite/coeffDirect);
        y1=y1+tailleDépassementDroite;
        x2=x2-(tailleDépassementDroite/coeffDirect);
        y2=y2-tailleDépassementDroite;
        var pointsAxeCentre = [] ;
        pointsAxeCentre.push(x1);
        pointsAxeCentre.push(y1);
        pointsAxeCentre.push(x2);
        pointsAxeCentre.push(y2);

        //console.log("x1 "+x1+", y1 "+y1+", x2 "+x2+", y2 "+y2);

        var kAxeCentre = new Kinetic.Line({
           points: pointsAxeCentre,
           stroke: "red",
           strokeWidth: 5,
           lineJoin: 'round',
           name: "AxeCentre"
        });
        // Ligne en pointillé
        kAxeCentre.dashArray([10,2]);
        // return group
        var group = new Kinetic.Group();
        group.name("roi-group");
        group.add(kshape);
        group.add(kAxeCentre);
        return group;
    } else {
        return null;
    }
    
};

/**
 * Update a roi shape.
 * @param {Object} anchor The active anchor.
 * @param {Object} image The associated image.
 */
dwv.tool.UpdateRoi = function (anchor /*, image*/)
{
    //console.log("roi update");
    // parent group
    var group = anchor.getParent();
    // associated shape
    var kroi = group.getChildren( function (node) {
        return node.name() === 'shape';
    })[0];
    // update self
    var point = group.getChildren( function (node) {
        return node.id() === anchor.id();
    })[0];
    point.x( anchor.x() );
    point.y( anchor.y() );
    // update the roi point and compensate for possible drag
    // (the anchor id is the index of the point in the list)
    var points = kroi.points();
    points[anchor.id()] = anchor.x() - kroi.x();
    points[anchor.id()+1] = anchor.y() - kroi.y();
    kroi.points( points );

    var kAxe = group.getChildren( function (node) {
        return node.name() === 'AxeCentre';
    })[0];

    //update axe
    var Xarr = [];
    var Yarr = [];

    for (var i = 1; i < points.length; i+=2) {
        Yarr.push(points[i]);
    };

    Yarr.sort(function(a, b){return a-b});
    for (var i = 0; i < Yarr.length; i++) {
        for (var j = 1; j < points.length; j+=2) {
            if(Yarr[i]==points[j])
            {
                Xarr.push(points[j-1]);
            }
        };
    };
    
    var x1 = Xarr[2] / 2 + Xarr[3] / 2 ;
    var y1 = Yarr[2] / 2 + Yarr[3] / 2 ;
    var x2 = Xarr[0] / 2 + Xarr[1] / 2 ;
    var y2 = Yarr[0] / 2 + Yarr[1] / 2 ;

    coeffDirect=(y2-y1)/(x2-x1);
    x1=x1+(tailleDépassementDroite/coeffDirect);
    y1=y1+tailleDépassementDroite;
    x2=x2-(tailleDépassementDroite/coeffDirect);
    y2=y2-tailleDépassementDroite;

    //test pour savoir de quel cote est le trapeze sauvegarde
    if(x1>(sessionStorage.getItem("imageLargeur")/2)){
        var trapezeAxePosition=[];
        trapezeAxePosition.push(x1);
        trapezeAxePosition.push(y1);
        trapezeAxePosition.push(x2);
        trapezeAxePosition.push(y2);
        sessionStorage.setItem("trapezeDroitPosition", JSON.stringify(trapezeAxePosition));
        sessionStorage.setItem("trapezeDroitcoeffDirect", coeffDirect);
    } else {
        var trapezeAxePosition=[];
        trapezeAxePosition.push(x1);
        trapezeAxePosition.push(y1);
        trapezeAxePosition.push(x2);
        trapezeAxePosition.push(y2);
        sessionStorage.setItem("trapezeGauchePosition", JSON.stringify(trapezeAxePosition));
        sessionStorage.setItem("trapezeDroitcoeffDirect", coeffDirect);
    }
    //console.log("x1 "+x1+", y1 "+y1+", x2 "+x2+", y2 "+y2);

    kAxe.points( [x1,y1,x2,y2] );
};
