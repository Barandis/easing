## @barandis/easing
#### *Time-dependent JavaScript easing functions*

A bit of an accidental library that came when I couldn't find what I was looking for in easing functions for another project I was working on.

The functions are adapted from the old [jquery.easing.js][1] JQuery plugin. However, the requirements of JQuery were that easing functions take a number of parameters: current time, animation duration, and starting and ending values of the animated term. This is quite a lot, and much of it has to do with scaling rather than with easing. It led to unwieldy function signatures and comparatively complex code.

This library contains the same easing functions, but each takes only the current time as a parameter. That time is a number from 0 (the start) to 1 (the end), inclusive. They return another number where 0 represents the value at the start and 1 represents the value at the end.

In addition to the old easing functions, a couple of new ones have been included: `linear`, which is just a constant-speed easing, and `makeBezier`, which creates an easing function that replicates the CSS `cubic-bezier` function. The latter is an updated version of the [bezier-easing][2] library.

### Current Status

@barandis/easing is a work in progress. As I write this, the project has existed for a few hours. Testing and documentation will be added before I consider publishing it to npm.

[1]: http://gsgd.co.uk/sandbox/jquery/easing/
[2]: https://github.com/gre/bezier-easing