$(document).ready(function () {

    //*** CANVAS to draw CV Skills Wheel

    /* This is a graphical representation of the skills that I have accumulated. The inside ring separates back end from
    front end skills and subsequent rings two and three illustrate where these skills were acquired via my industry work
    placements, during my time as a lecturer and while undertaking my MSc. The skills are as spokes from the wheel with the
    height indicating ability, skills are according to the inner ring and colour back or front end categories.
    
    In the design of the skills wheel per quater was intended to contain an equal number of 4 slices 
    (4 * 1 Slice at 22.5 degrees = 90 deg angle) with a total of 16 slices for the entire wheel
    therefore for simplicity sake there can only be a nominated 16 skills in total,
    the animated wheel is not adaptable to more slices without manual recalculation. 

    Each slice of the pie projects out - to be associated with inner rings at the point of crossing and the
    level of skill proficiency indicated by the height of the slice

    The 0/360 degrees point of the circle starts at the 3 o'clock position and moves in a positive direction to the
    6 o'clock position which is 90 degrees, the 9 o'clock position which is 180 degrees, the 12 o'clock position which
    is 270 degrees and finally back to the 3 o'clock position at 360 degrees.

    A circle has 2Pi radians (a little more than six radians)
    A radian is almost 1/6 of a circle (a little more than 57 degrees)
    */

    /*********************************** 
    COLOUR VARIABLES
    ***********************************/

    // nominated colours for the Skills Wheel
    var orange = "#BE6D45";
    var pinkmusk = '#AD4448';
    var blue = "#547EA4";
    var bluelight = "#6890B4";
    var bluelighterstill = "#6E9CC0";
    var white = "#FFFFFF";
    var black = "#000000";


    var feskillscolour = orange;
    var beskillscolour = pinkmusk;
    var mscskillscolour = blue;
    var lecskillscolour = bluelight;
    var workskillscolour = bluelighterstill;

    //variable constants for Skills Wheel
    //four quadrants with four skills per quadrant
    var totSkills = 16;
    var singleSkillDeg = 22.5;
    var myLineWidth = 28;
    var myRadius = 40; //radius of the inner white circle + half the height of the first ring 

    /*********************************** 
    FIRST RING => SPIRAL DISPLAY 
    ***********************************/

    // Back End Technologies skills category - 11 pie slices/skills 
    // starting a pie slice (22.5deg) before the 9 o'clock position and ending two pie slices (45deg) after the 3 o'clock position
    var backendFromDeg = 157.5;
    var backendToDeg = 45;
    // Front End Technologies skills category - 5 pie slices/skills - fills the gap to complete the ring 
    // avoid gap by overlapping by 1px
    var frontendFromDeg = 44;
    var frontendToDeg = 158.5;

    /************************************************* 
    SECOND/THIRD RING => OVERLAY CIRCLE - FADE OUT 
    *************************************************/

    // Industry Placements 2000 to 2009 - 5 pie slices/skills
    // starting from the same point as the beginning of backend technologies and ending at the 12 o'clock position (270deg)
    var industryFromDeg = 157.5;
    var industryToDeg = 270;
    // Lecturing 2009 to 2011 - 3 pie slices/skills
    // starting one slice to the left of the 12 o'clock position
    var lecFromDeg = 247.5;
    var lecToDeg = 315;
    // MSc 2010 to 2013 - 14 pie slices - most skills attained during the MSc
    // used for both second ring [title] and third ring [years] of MSc
    var mscFromDeg = 270;
    var mscToDeg = 225;

    /****************************************** 
    SKILLS - SPOKES TO THE WHEEL - GROW OUT  
    ******************************************/

    // skills from-to angle with a small gap inbetween
    var skillsGap = 0.5;
    var restFromDeg = 0;
    var restToDeg = 22.5;
    var xmlFromDeg = 22.5;
    var xmlToDeg = 45;
    var ajaxFromDeg = 45;
    var ajaxToDeg = 67.5;
    var jsFromDeg = 67.5;
    var jsToDeg = 90;
    var jqueryFromDeg = 90;
    var jqueryToDeg = 112.5;
    var cssFromDeg = 112.5;
    var cssToDeg = 135;
    var htmlFromDeg = 135;
    var htmlToDeg = 157.5;
    var mysqlFromDeg = 157.5;
    var mysqlToDeg = 180;
    var sqlFromDeg = 180;
    var sqlToDeg = 202.5;
    var accessFromDeg = 202.5;
    var accessToDeg = 225;
    var cFromDeg = 225;
    var cToDeg = 247.5;
    var vbFromDeg = 247.5;
    var vbToDeg = 270;
    var aspFromDeg = 270;
    var aspToDeg = 292.5;
    var javaFromDeg = 292.5;
    var javaToDeg = 315;
    var androidFromDeg = 315;
    var androidToDeg = 337.5;
    var phpFromDeg = 337.5;
    var phpToDeg = 360;

    //skill levels - linewidth
    var skillLevel1 = 1;
    var skillLevel2 = 2;
    var skillLevel3 = 3;
    var skillLevel4 = 4;

    /*********************************** 
    CANVAS VARIABLES
    ***********************************/

    var canvas = document.getElementById('myCanvas');
    canvas.height = 500;
    var context = canvas.getContext('2d');

    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var radius = myRadius;
    var endPercent = 100;
    var curPerc = 0;
    var counterClockwise = false;
    var circ = Math.PI * 2;
    var quart = Math.PI / 2;
    var angle = Math.PI * 0.8; // radians
    var slice = 22.5;
    var halfSlice = 11.25;
    var textGap = 10;
    var offset = 0;

    /*********************************** 
    FUNCTIONS
    ***********************************/

    //Degree to Radian Conversion
    function dtor(degrees) {
        return degrees * (Math.PI / 180);
    }

    //Radian to Degree Conversion
    function rtod(radians) {
        return radians * (180 / Math.PI);
    }

    function createSkillSegment(skillsColour, lineWidthFromRadiusPlusExpLevel, fromDeg, toDeg) {
        context.strokeStyle = skillsColour;
        context.beginPath();
        context.arc(x, y, lineWidthFromRadiusPlusExpLevel, fromDeg, toDeg, false);
        context.stroke();
    }

    /**************************************************
    SKILLS OBJECTS with functions for some properties
    ***************************************************/

    /* backfront, msc, work etc are objects that have functions for some of their properties.  They represent 
    the animations of the shrinking of the arc that covers the Backend and Frontend sections and the fading out 
    of the arcs covering the MSc and Work sections, along with the growing of the spokes/skills. */

    /* Each object has been defined with the same function properties so that they can be looped through later on 
    in the code and their function properties can be checked to determine whether they have finished animating or not. */

    var animations = {

        backfront: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return true;
            }
        },
        msc: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            //commence animation only after the backfront object has finished animating
            canStart: function () {
                return animations.backfront.finished();
            }
        },
        work: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            //commence animation only after the msc object has finished animating
            canStart: function () {
                return animations.msc.finished();
            }
        },
        lec: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            //commence animation only after the work object has finished animating
            canStart: function () {
                return animations.work.finished();
            }
        },

        /*** BACK END TECHNOLOGIES ***/

        mysql: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.lec.finished();
            }
        },
        sqlserver: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.mysql.value === 30;
            }
        },
        access: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.sqlserver.value === 30;
            }
        },
        c: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.access.value === 30;
            }
        },
        vb: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.c.value === 30;
            }
        },
        asp: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.vb.value === 30;
            }
        },
        java: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.asp.value === 30;
            }
        },
        android: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.java.value === 30;
            }
        },
        php: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.android.value === 30;
            }
        },
        soaprest: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.php.value === 30;
            }
        },
        xmlxslt: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.soaprest.value === 30;
            }
        },

        /*** FRONT END TECHNOLOGIES ***/

        ajax: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.xmlxslt.value === 30;
            }
        },
        js: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.ajax.value === 30;
            }
        },
        jquery: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.js.value === 30;
            }
        },
        css3: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.jquery.value === 30;
            }
        },
        html5: {
            value: 0,
            finished: function () {
                return this.value == 100;
            },
            increment: function () {
                this.value += 2;
                if (this.value > 100) this.value = 100;
            },
            canStart: function () {
                return animations.css3.value === 30;
            }
        }
    };

    /************************************************
    CURVED TEXT
    *************************************************/

    //Curved Text - Convex
    function drawTextAlongArcConvex(context, str, centerX, centerY, radius, angle, offset) {
        // Save current context state
        context.save();
        // Move drawing point to centre of circle
        context.translate(centerX, centerY);
        // Rotate offset 
        context.rotate(offset);
        // Rotate anticlockwise half the angle the whole text will take up relative to 12 o'clock 
        context.rotate(-1 * angle / 2);
        // loops clockwise to print characters

        // for each letter in the string
        for (var n = 0; n < str.length; n++) {

            context.save();
            // move drawing point out to radius length
            context.translate(0, -1 * radius);
            var char = str[n];
            // draw character
            context.fillText(char, 0, 0);
            // move back to centre of circle
            context.restore();
            // rotate clockwise a single letter width
            context.rotate(angle / str.length);
        }
        context.restore();
    }

    //Curved Text - Concave
    function drawTextAlongArcConcave(context, str, centerX, centerY, radius, angle, offset) {
        // Save current context state
        context.save();
        // Move drawing point to centre of circle
        context.translate(centerX, centerY);
        // Start by making 6 o'clock our start point
        context.rotate(circ / 2);
        // Rotate offset 
        context.rotate(offset);
        // Rotate clockwise half the angle the whole text will take up relative to 12 o'clock 
        context.rotate(angle / 2);
        // loops anticlockwise to print characters

        // for each letter in the string
        for (var n = 0; n < str.length; n++) {

            context.save();
            // move drawing point out to radius length
            context.translate(0, -1 * radius);
            // flip context horizontally - otherwise characters appear backwards and upside down
            context.scale(-1, -1);
            var char = str[n];
            // draw character
            context.fillText(char, 0, 0);
            // move back to centre of circle
            context.restore();
            // rotate anticlockwise a single letter width
            context.rotate(-1 * (angle / str.length));
        }
        context.restore();
    }

    /************************************************
    ANIMATE
    *************************************************/

    function animate() {

        //method clears the specified pixels within a given rectangle (x,y,width,height)
        context.clearRect(0, 0, canvas.width, canvas.height);
        //reset linewidth each time the animate function is called
        context.lineWidth = myLineWidth;

        //** BACK END *****************************************************************************************

        context.strokeStyle = beskillscolour;
        context.beginPath();
        //create an arc/circle (x,y,radius-ThicknessOfArc, startAngleInRadians, endAngleInRadians, counterclockwise-optional-false-default)
        context.arc(x, y, radius, dtor(backendFromDeg), dtor(backendToDeg), false);
        context.stroke();
        context.strokeStyle = black;
        //monospace font best for text on a curve to avoid variable spacing
        context.font = 'bold 15px "Ubuntu Mono"';
        context.textBaseline = "middle";
        // 11 pie slices - 22.5deg per slice - angle is 247.5 - rounded down allowing for text from edge (230)
        // offset 1/2 pie slice from 12 o'clock in clockwise direction for convex text to middle of wedge/angle
        // (context, str, centerX, centerY, radius, angle, offset)
        drawTextAlongArcConvex(context, 'Back End Technology', x, y, radius, dtor(slice * 11 - textGap), dtor(halfSlice));

        //** FRONT END *****************************************************************************************

        context.strokeStyle = feskillscolour;
        context.beginPath();
        context.arc(x, y, radius, dtor(frontendFromDeg), dtor(frontendToDeg), false);
        context.stroke();
        // 5 pie slices - 22.5deg per slice - angle is 112.5 - minus textGap
        // offset 1/2 pie slice from 6 o'clock in anticlockwise direction for concave text to middle of wedge/angle
        drawTextAlongArcConcave(context, 'Front End', x, y, radius, dtor(slice * 5 - textGap), dtor(halfSlice));

        //White Overlay - spiral disappear 

        //Circle to hide Back End and Front End skills label on inner circle
        //increase the line width by one otherwise border of circle is displayed when should be hidden by overlayed white circle
        context.lineWidth = myLineWidth + 1;
        context.strokeStyle = white;
        context.beginPath();
        //(x, y, radius, fromAngle, toAngle, anticlockwiseDefaultfalse);
        //backfront.value as a percentage complete of 360 degrees being added to the from angle
        //as percentage increases the two angles get closer together until they are the same angle of 157.5 the backendFromDeg angle so stops drawing
        context.arc(x, y, radius, dtor(((animations.backfront.value / 100) * 360) + backendFromDeg), dtor(backendFromDeg + 360), false);
        context.stroke();

        //*** MSC WEB TECHNOLOGIES 2010-2013 *****************************************************************************************

        //three arcs deep (radius inner circle - white space, to mid first arc - BE/FE Tech, to mid second arc where MSc starts)
        context.lineWidth = myLineWidth * 3;
        //(skillsColour, lineWidthFromRadiusPlusExpLevel i.e. height of arc, fromDeg, toDeg)
        createSkillSegment(mscskillscolour, radius + myLineWidth * 2, dtor(mscFromDeg), dtor(mscToDeg));
        drawTextAlongArcConcave(context, 'MSc Web Technologies', x, y, radius + (myLineWidth * 2), dtor(slice * 5), 0);
        drawTextAlongArcConcave(context, '2010 - 2013', x, y, radius + myLineWidth * 3, dtor(slice * 2 - textGap), 0);

        //White Overlay - fade out 

        context.lineWidth = (myLineWidth * 3) + 1;
        //use the alternative rgba method in order to modify the alpha setting to fade out the white overlay
        //The alpha parameter is a number between 0.0 (fully transparent) and 1.0 (fully opaque - visible solid colour)
        //as the overlay starts off as fully opaque the minus 1 means that as the percentage animation value increases
        //the alpha value becomes smaller so that the white overlay fades out
        context.strokeStyle = "rgba(239, 239, 239, " + (1 - (animations.msc.value / 100)) + ")";
        context.beginPath();
        //overlay the from and to angles to completely cover borders of arc
        context.arc(x, y, radius + myLineWidth * 2, dtor(mscFromDeg - 1), dtor(mscToDeg + 1), false);
        context.stroke();

        //*** LECTURING - 2009 to 2011 *****************************************************************************************

        context.lineWidth = myLineWidth;
        // 3 pie slices - one pie slice to the left of 12 o'clock two after - angle 67.5 - offset half pie slice from 12 o'clock in clockwise direction
        createSkillSegment(lecskillscolour, radius + myLineWidth * 2, dtor(lecFromDeg), dtor(lecToDeg));
        drawTextAlongArcConvex(context, 'Lecturing 09-11', x, y, radius + myLineWidth * 2, dtor(4.29 * 15/*slice * 3 - textGap*/), dtor(halfSlice));

        //White Overlay - fade out 
        context.lineWidth = myLineWidth + 1;
        context.strokeStyle = "rgba(239, 239, 239, " + (1 - (animations.lec.value / 100)) + ")";
        context.beginPath();
        context.arc(x, y, radius + myLineWidth * 2, dtor(lecFromDeg - 1), dtor(lecToDeg + 1), false);
        context.stroke();

        //*** WORK PLACEMENT - 2000 to 2009 ************************************************************************************

        context.lineWidth = myLineWidth;
        // 5 pie slices one pie slice before 9 o'clock plus another four to 12 o'clock - angle 112.5 - offset 12.25
        createSkillSegment(workskillscolour, radius + myLineWidth, dtor(industryFromDeg), dtor(industryToDeg));
        //12 o'clock position to halfway point of Industry - angle moving in anticlockwise direction
        offset = (slice * 3 - halfSlice) * -1;
        drawTextAlongArcConvex(context, 'Industry 2000-09', x, y, radius + myLineWidth, dtor(slice * 5 - textGap), dtor(offset));
        context.lineWidth = myLineWidth + 1;

        //White Overlay - fade out ***
        context.strokeStyle = "rgba(239, 239, 239, " + (1 - (animations.work.value / 100)) + ")"; ;
        context.beginPath();
        context.arc(x, y, radius + myLineWidth, dtor(industryFromDeg - 1), dtor(industryToDeg + 1), false);
        context.stroke();


        /*************************************************
        GROWING SPOKES
        **************************************************/


        //*** MySQL - Back End - concave - Level 4 **************************************************************

        // check the mysql property value and run code block only if value is 1-100 not 0 
        if (animations.mysql.value) {
            var mysqlGrowPerc = animations.mysql.value / 100;
            // linewidth for skills spoke equate to level of expertise multiplied by percent completion until 100%
            context.lineWidth = (myLineWidth * skillLevel4) * mysqlGrowPerc;

            // the grow effect is the expanding radius of the spoke
            // radius + (myLineWidth * 3.5) == radius to edge of blue MSc circle
            // radius of slice == (myLineWidth * 4) / 2 because radius in middle of slice
            // each animation step radius is base radius + a percentage of slice radius
            var rad = (radius + myLineWidth * 3.5) + (mysqlGrowPerc * ((myLineWidth * skillLevel4) / 2));
            createSkillSegment(beskillscolour, rad, dtor(mysqlFromDeg + skillsGap), dtor(mysqlToDeg - skillsGap));
        }

        // add the text to the arc when the animation has finished
        if (animations.mysql.finished()) {
            //6 o'clock position to halfway point of MySQL 4th slice - angle moving in clockwise direction
            offset = (slice * skillLevel4 - halfSlice);
            //seven rings to the end of the skills spoke
            //from angle is full angle 22.5 deg minus a bit - trial and error for visually pleasing effect - text spacing
            drawTextAlongArcConcave(context, 'MySQL', x, y, radius + (myLineWidth * 7), dtor(10), dtor(offset));
        }

        //*** SQL Server - Back End - convex - Level 4 ************************************************************

        if (animations.sqlserver.value) {
            //animating percentage of spoke
            var sqlGrowPerc = animations.sqlserver.value / 100;
            context.lineWidth = (myLineWidth * skillLevel4) * sqlGrowPerc;
            var rad = (radius + myLineWidth * 3.5) + (sqlGrowPerc * ((myLineWidth * skillLevel4) / 2));
            createSkillSegment(beskillscolour, rad, dtor(sqlFromDeg + skillsGap), dtor(sqlToDeg - skillsGap));
        }

        if (animations.sqlserver.finished()) {
            //12 o'clock position to halfway point of SQL Server 4th slice - angle moving in anticlockwise direction
            offset = (slice * skillLevel4 - halfSlice) * -1;
            drawTextAlongArcConvex(context, 'SQL Server', x, y, radius + (myLineWidth * 7), dtor(20), dtor(offset));
        }

        //*** Access - Back End - convex - Level 4 ******************************************************************

        if (animations.access.value) {
            //animating percentage of slice
            var accessGrowPerc = animations.access.value / 100;
            context.lineWidth = (myLineWidth * skillLevel4) * accessGrowPerc;
            var rad = (radius + myLineWidth * 3.5) + (accessGrowPerc * ((myLineWidth * skillLevel4) / 2));
            createSkillSegment(beskillscolour, rad, dtor(accessFromDeg + skillsGap), dtor(accessToDeg - skillsGap));
        }

        if (animations.access.finished()) {
            //12 o'clock position to halfway point of Access 3rd slice - angle moving in anticlockwise direction
            offset = (slice * 3 - halfSlice) * -1;
            drawTextAlongArcConvex(context, 'Access', x, y, radius + (myLineWidth * 7), dtor(10), dtor(offset));
        }

        //*** C/C++ - Back End - convex - Level 3 ******************************************************************

        if (animations.c.value) {
            //animating percentage of slice
            var cGrowPerc = animations.c.value / 100;
            context.lineWidth = (myLineWidth * skillLevel3) * cGrowPerc;
            var rad = (radius + myLineWidth * 3.5) + (cGrowPerc * ((myLineWidth * skillLevel3) / 2));
            createSkillSegment(beskillscolour, rad, dtor(cFromDeg + skillsGap), dtor(cToDeg - skillsGap));
        }

        if (animations.c.finished()) {
            //12 o'clock position to halfway point of C/C++ 2nd slice - angle moving in anticlockwise direction
            offset = (slice * 2 - halfSlice) * -1;
            drawTextAlongArcConvex(context, 'C/C++', x, y, radius + (myLineWidth * 6), dtor(10), dtor(offset));
        }

        //*** VB/VB.NET - Back End - convex - Level 3 ******************************************************************

        if (animations.vb.value) {
            //animating percentage of slice
            var vbGrowPerc = animations.vb.value / 100;
            context.lineWidth = (myLineWidth * skillLevel3) * vbGrowPerc;
            var rad = (radius + myLineWidth * 3.5) + (vbGrowPerc * ((myLineWidth * skillLevel3) / 2));
            createSkillSegment(beskillscolour, rad, dtor(vbFromDeg + skillsGap), dtor(vbToDeg - skillsGap));
        }

        if (animations.vb.finished()) {
            //12 o'clock position to halfway point of VB/VB.NET 1st slice (left of 12 o'clock pos) - angle moving in anticlockwise direction
            offset = (slice - halfSlice) * -1;
            drawTextAlongArcConvex(context, 'VB/VB.NET', x, y, radius + (myLineWidth * 6), dtor(20), dtor(offset));
        }

        //*** ASP.NET C# - Back End - convex - Level 3 ******************************************************************

        if (animations.asp.value) {
            //animating percentage of slice
            var aspGrowPerc = animations.asp.value / 100;
            context.lineWidth = (myLineWidth * skillLevel3) * aspGrowPerc;
            var rad = (radius + myLineWidth * 3.5) + (aspGrowPerc * ((myLineWidth * skillLevel3) / 2));
            createSkillSegment(beskillscolour, rad, dtor(aspFromDeg + skillsGap), dtor(aspToDeg - skillsGap));
        }

        if (animations.asp.finished()) {
            //12 o'clock position to halfway point of VB/VB.NET 1st slice (right of 12 o'clock pos) - angle moving in clockwise direction
            offset = halfSlice;
            drawTextAlongArcConvex(context, 'ASP.NET C#', x, y, radius + (myLineWidth * 6), dtor(20), dtor(offset));
        }

        //*** Java - Back End - convex - Level 3 ******************************************************************

        if (animations.java.value) {
            //animating percentage of slice
            var javaGrowPerc = animations.java.value / 100;
            context.lineWidth = (myLineWidth * skillLevel3) * javaGrowPerc;
            var rad = (radius + myLineWidth * 3.5) + (javaGrowPerc * ((myLineWidth * skillLevel3) / 2));
            createSkillSegment(beskillscolour, rad, dtor(javaFromDeg + skillsGap), dtor(javaToDeg - skillsGap));
        }

        if (animations.java.finished()) {
            //12 o'clock position to halfway point of Java 2nd slice (right of 12 o'clock pos) - angle moving in clockwise direction
            offset = slice + halfSlice;
            drawTextAlongArcConvex(context, 'Java', x, y, radius + (myLineWidth * 6), dtor(10), dtor(offset));
        }

        //*** Android - Back End - convex - Level 3 ******************************************************************
        
        if (animations.android.value) {
            //animating percentage of slice
            var androidGrowPerc = animations.android.value / 100;
            context.lineWidth = (myLineWidth * skillLevel3) * androidGrowPerc;
            var rad = (radius + myLineWidth * 3.5) + (androidGrowPerc * ((myLineWidth * skillLevel3) / 2));
            createSkillSegment(beskillscolour, rad, dtor(androidFromDeg + skillsGap), dtor(androidToDeg - skillsGap));
        }

        if (animations.android.finished()) {
            //12 o'clock position to halfway point of Android 3rd slice (right of 12 o'clock pos) - angle moving in clockwise direction
            offset = (slice * 2) + halfSlice;
            drawTextAlongArcConvex(context, 'Android', x, y, radius + (myLineWidth * 6), dtor(15), dtor(offset));
        }
        
        //*** PHP - Back End - convex - Level 3 ******************************************************************
        
        if (animations.php.value) {
            //animating percentage of slice
            var phpGrowPerc = animations.php.value / 100;
            context.lineWidth = (myLineWidth * skillLevel3) * phpGrowPerc;
            var rad = (radius + myLineWidth * 3.5) + (phpGrowPerc * ((myLineWidth * skillLevel3) / 2));
            createSkillSegment(beskillscolour, rad, dtor(phpFromDeg + skillsGap), dtor(phpToDeg - skillsGap));
        }

        if (animations.php.finished()) {
            //12 o'clock position to halfway point of PHP 4th slice (right of 12 o'clock pos) - angle moving in clockwise direction
            offset = (slice * 3) + halfSlice;
            drawTextAlongArcConvex(context, 'PHP', x, y, radius + (myLineWidth * 6), dtor(8), dtor(offset));
        }
        
        //*** REST/SOAP - Back End - concave - Level 2 ******************************************************************
        
        if (animations.soaprest.value) {
            //animating percentage of slice
            var soaprestGrowPerc = animations.soaprest.value / 100;
            context.lineWidth = (myLineWidth * skillLevel2) * soaprestGrowPerc;
            var rad = (radius + myLineWidth * 3.5) + (soaprestGrowPerc * ((myLineWidth * skillLevel2) / 2));
            createSkillSegment(beskillscolour, rad, dtor(restFromDeg + skillsGap), dtor(restToDeg - skillsGap));
        }

        if (animations.soaprest.finished()) {
            //6 o'clock position to halfway point of REST/SOAP 4th slice (right of 6 o'clock pos) - angle moving in anticlockwise direction
            offset = (slice * 3 + halfSlice) * -1;
            drawTextAlongArcConcave(context, 'SOAP', x, y, radius + (myLineWidth * 4), dtor(10), dtor(offset));
            drawTextAlongArcConcave(context, 'REST', x, y, radius + (myLineWidth * 5), dtor(10), dtor(offset));
        }
     
        //*** XML/XSLT - Back End - concave - Level 2 ******************************************************************

        if (animations.xmlxslt.value) {
            //animating percentage of slice
            var xmlxsltGrowPerc = animations.xmlxslt.value / 100;
            context.lineWidth = (myLineWidth * skillLevel2) * xmlxsltGrowPerc;
            var rad = (radius + myLineWidth * 3.5) + (xmlxsltGrowPerc * ((myLineWidth * skillLevel2) / 2));
            createSkillSegment(beskillscolour, rad, dtor(xmlFromDeg + skillsGap), dtor(xmlToDeg - skillsGap));
        }

        if (animations.xmlxslt.finished()) {
            //6 o'clock position to halfway point of XML/XSLT 3rd slice (right of 6 o'clock pos) - angle moving in anticlockwise direction
            offset = (slice * 2 + halfSlice) * -1;
            drawTextAlongArcConcave(context, 'XML/XSLT', x, y, radius + (myLineWidth * 5), dtor(15), dtor(offset));
        }

        //*** AJAX - Front End - concave - Level 2 ******************************************************************

        if (animations.ajax.value) {
            //animating percentage of slice
            var ajaxGrowPerc = animations.ajax.value / 100;
            context.lineWidth = (myLineWidth * skillLevel2) * ajaxGrowPerc;
            var rad = (radius + myLineWidth * 3.5) + (ajaxGrowPerc * ((myLineWidth * skillLevel2) / 2));
            createSkillSegment(feskillscolour, rad, dtor(ajaxFromDeg + skillsGap), dtor(ajaxToDeg - skillsGap));
        }

        if (animations.ajax.finished()) {
            //6 o'clock position to halfway point of AJAX 2nd slice (right of 6 o'clock pos) - angle moving in anticlockwise direction
            offset = (slice + halfSlice) * -1;
            drawTextAlongArcConcave(context, 'AJAX', x, y, radius + (myLineWidth * 5), dtor(10), dtor(offset));
        }

        //*** JavaScript - Front End - concave - Level 3 ******************************************************************

        if (animations.js.value) {
            //animating percentage of slice
            var jsGrowPerc = animations.js.value / 100;
            context.lineWidth = (myLineWidth * skillLevel3) * jsGrowPerc;
            var rad = (radius + myLineWidth * 3.5) + (jsGrowPerc * ((myLineWidth * skillLevel3) / 2));
            createSkillSegment(feskillscolour, rad, dtor(jsFromDeg + skillsGap), dtor(jsToDeg - skillsGap));
        }

        if (animations.js.finished()) {
            //6 o'clock position to halfway point of JavaScript 1st slice (right of 6 o'clock pos)- angle moving in anticlockwise direction
            offset = halfSlice * -1;
            drawTextAlongArcConcave(context, 'JavaScript', x, y, radius + (myLineWidth * 6), dtor(20), dtor(offset));
        }

        //*** jQuery - Front End - concave - Level 3 ******************************************************************

        if (animations.jquery.value) {
            //animating percentage of slice
            var jqueryGrowPerc = animations.jquery.value / 100;
            context.lineWidth = (myLineWidth * skillLevel3) * jqueryGrowPerc;
            var rad = (radius + myLineWidth * 3.5) + (jqueryGrowPerc * ((myLineWidth * skillLevel3) / 2));
            createSkillSegment(feskillscolour, rad, dtor(jqueryFromDeg + skillsGap), dtor(jqueryToDeg - skillsGap));
        }

        if (animations.jquery.finished()) {
            //6 o'clock position to halfway point of jQuery 1st slice (left of 6 o'clock pos) - angle moving in clockwise direction
            offset = halfSlice;
            drawTextAlongArcConcave(context, 'jQuery', x, y, radius + (myLineWidth * 6), dtor(15), dtor(offset));
        }


        //*** CSS3 - Front End - concave - Level 3 ******************************************************************

        if (animations.css3.value) {
            //animating percentage of slice
            var css3GrowPerc = animations.css3.value / 100;
            context.lineWidth = (myLineWidth * skillLevel3) * css3GrowPerc;
            var rad = (radius + myLineWidth * 3.5) + (css3GrowPerc * ((myLineWidth * skillLevel3) / 2));
            createSkillSegment(feskillscolour, rad, dtor(cssFromDeg + skillsGap), dtor(cssToDeg - skillsGap));
        }

        if (animations.css3.finished()) {
            //6 o'clock position to halfway point of CSS3 2nd slice (left of 6 o'clock pos) - angle moving in clockwise direction
            offset = slice + halfSlice;
            drawTextAlongArcConcave(context, 'CSS3', x, y, radius + (myLineWidth * 6), dtor(10), dtor(offset));
        }
        
        //*** HTML5 - Front End - concave - Level 3 ******************************************************************

        if (animations.html5.value) {
            //animating percentage of slice
            var html5GrowPerc = animations.html5.value / 100;
            context.lineWidth = (myLineWidth * skillLevel3) * html5GrowPerc;
            var rad = (radius + myLineWidth * 3.5) + (html5GrowPerc * ((myLineWidth * skillLevel3) / 2));
            createSkillSegment(feskillscolour, rad, dtor(htmlFromDeg + skillsGap), dtor(htmlToDeg - skillsGap));
        }

        if (animations.html5.finished()) {
            //6 o'clock position to halfway point of HTML5 3rd slice (left of 6 o'clock pos) - angle moving in clockwise direction
            offset = slice * 2 + halfSlice;
            drawTextAlongArcConcave(context, 'HTML5', x, y, radius + (myLineWidth * 6), dtor(10), dtor(offset));
        }
        
        //reset linewidth to accomodate modified skill level
        context.lineWidth = myLineWidth;


        /***********************************************************
        CALL ANIMATE
        ************************************************************/

        // for each key in the animations array (in order)
        var allFinished = true;
        // loop through the objects in animation object
        for (var key in animations) {
            // backfront - msc - work - lec - mysql - sqlserver - access etc.
            var animation = animations[key];
            // returns a true/false value based on if property of object - value equal 100
            if (!animation.finished()) {
                allFinished = false;
                // either value being true call an increment on the animate object
                if (animation.value > 0 || animation.canStart())
                    animation.increment(); 
            }
        }

        // check flag to find out if all animations are complete if not call the animate function
        if (!allFinished) {
            // method browser can optimise so animations will be smoother
            requestAnimationFrame(animate);
        }
    }

    animate();

});

