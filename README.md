# Rewound
Rewound is a customizable vintage player for Apple Music. Built with Apple's MusicKit, Expo and React Native. 

## Getting started
NOTE: Node.js and npm are required for this project.

**Step 1:**
Install Expo Command Line interface, needed for compilation to web, iOS and android. An expo user account is needed. 
    
    npm install -g expo-cli
    
**Step 2:**
Install all the required dependencies. In the root directory run...

    npm install

## The music player
Rewound interfaces with Apple Music via Apple's [MusicKit JS]( https://developer.apple.com/documentation/musickitjs ).
It interfaces to Rewound via the `Music` class in `Music.js`

## Coverflow
Aditional to the clickwheel, future generations of the iPod brought an innovative UI concept called coverflow that eventually made its way into OS X (now macOS) and the iPod app in the original iPhone (Music in the pre-iOS 7 era). In order to ensure efficiency an alternative way of generating the view was thought. The selected element is displayed at the center, with the maximum z-index and scale. Elements farther away to the center.

**In a way, such behaviour is reminiscent of a quadratic equation with its maximum at the selected element and its domain above the x-axis determined by the number of elements to be shown on screen.** 

Therefore, the equation can be identified as `y = (1/a)*(x^2-a*x)` where a is the number of elements to be shown on screen. 
When selection changes, the equation will be translated s places horizontally, so that `y = (1/a)*( (x-s)^2 - a*(x-s) )`. Therefore, the scale of the elements can be identified by the function

    function f(display, current, x){
        let result = (1/display)*( (x-current)^2 - display*(x-current) );
        return result < 0 ? 0 : result
    }
