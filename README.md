Skills-Wheel-HTML5-Canvas
=========================

The Skills Wheel is a special effects wheel using HTML5 Canvas and JavaScript.

The Wheel is not initially visible although uses a combination of animation effects; spiral, fade out and grow, 
to display rings and arcs.

The Inner ring has a white overlay and and is displayed as the white overlay spirals out of existance 
exposing the underlying category of skills being back end and front end technologies. The surrounding
rings also have a white overlay however are displayed as the transparency of the cover fades out of 
existance exposing the underlying areas of work placement and education where these category of skills where achieved.

Finally the skills themselves are displayed as they grow like spokes from a wheel one after the other starting
with back end and spiralling around to front end skills. This is a timed animation and will only occur once the central
rings are displayed and occur in sequence around the wheel itself.

Code Declared
=============

Initial variables declared include; a list of colours, from and to angle degrees per individual arc and circle,
canvas variables initialised using the getElementById to animate the Skills Wheel into existance.

Functions are declared to convert radians to degrees and vice versa, along with a function to create a skills segment. 
An animation object is created containing objects per arc with the same properties and functions assigned to property
for ease of looping through these objects; front end/back end arcs, work and education arcs and skill segments. Properties
per object include value initialised to 0 that increments by two each time the increment property is called on
the animation type object - representing percentage completion not to exceed 100 and set to 100 for property finished.
The canStart property ensures that arcs are created in a certain order and will not start animating until a previous arc
is either partially complete or finished animating.

Functions for drawing text on the arcs are declared both concave text written on arcs between 0 and 180 degrees 
(3 o'clock to 9 o'clock position) and convex for text written on arcs between 180 and 360 degrees (9 o'clock and
back to the 3 o'clock position). The pen for drawing text is poised in the middle of the wheel, translate and rotate
arc are used to reposition and a loop per character draws the text on the arc.

Code Summary
============

The program starts with a call to animate() inside which the canvas is cleared and redrawn each call to animate and
each arc is drawn calling the arc method, with x,y position for the wheel middle, radius thickness giving the arc depth,
a start and end angle with rotation of either anti/clockwise specified and then a call to the text draw method 
passing the context object, text, x,y of wheel middle and start and end angles, each arc is drawn sequentially with 
a white cover for animated exposure; swirl or fade-out for the inner circles. Spokes of the wheel are drawn
only after the inner circles are displayed, checking values contained in the animation object, all back end skills
grow out from the wheel followed by front end skills after which the animation is in full view and complete.

