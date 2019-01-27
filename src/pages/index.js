// Two separate things matter needs
// First thing : an engine - computation and  math behind this
// Second thing : a renderer - this draw the engine

// alias is a shortcut to make our code cleaner
// const Engine = Matter.Engine
// const Render = Matter.Render
const {Engine, Render, Bodies, World, MouseConstraint, Composites, Query} = Matter;

// Where matter being deployed
const sectionTag = document.querySelector("section.shapes");

// what is the width and height of the page
const w = window.innerWidth;
const h = window.innerHeight;

const engine = Engine.create();
const renderer = Render.create({
  element: sectionTag,
  engine: engine,
  options: {
  	height: h,
    width: w,
    background: "#000000",
    wireframes: false,
    pixelRatio: window.devicePixelRatio
}
});

// have the ability to create a brand new shape
const createShape = function (x, y) {
    const randomNum = Math.random();
    if (randomNum > 0.5) {
        return Bodies.rectangle(x, y, 141, 49, {
            render: {
                sprite: {
                    texture: "https://wishes-2019.superhi.com/best-x2.png",
                    xScale: 0.5,
                    yScale: 0.5
                }
            }
        });
    } else {
        return Bodies.rectangle(x, y, 214, 52, {
            render: {
                sprite: {
                    texture: "https://wishes-2019.superhi.com/wishes-x2.png",
                    xScale: 0.5,
                    yScale: 0.5
                }
            }
        })
    };
};

let newYear = Bodies.rectangle(w/2, h/2, Math.min(w/2.4), Math.min(h/4.7),{
  isStatic: true,
        render: {
        sprite: {
          texture: "https://wishes-2019.superhi.com/outline-2019.png",
          xScale: 0.5,
          yScale: 0.5
        }
      }
});

if (w < 768) {
  newYear = Bodies.rectangle(w/2, h/2, Math.min(w/3), Math.min(h/18),{
  	isStatic: true,
        render: {
        sprite: {
          texture: "https://wishes-2019.superhi.com/outline2019.svg",
          xScale: 0.5,
          yScale: 0.5
        }
      }
	})
};

const wallOptions = {
    isStatic: true,
  	render: {
    visible: false
  }
};

const ground = Bodies.rectangle(w/2, h+50, w+100, 100, wallOptions)
const ceiling = Bodies.rectangle(w/2, -50, w+100, 100, wallOptions)
const leftWall = Bodies.rectangle(-50, h/2, 100, h+100, wallOptions)
const rightWall = Bodies.rectangle(w+50, h/2, 100, h+100, wallOptions)

const mouseControl = MouseConstraint.create(engine, {
  element: sectionTag,
  constraint: {
    render: {
      visible: false
    }
  }
});

const initialShapes = Composites.stack(50, 50, 15, 5, 40, 40, function (x, y) {
  return createShape(x, y)
});

World.add(engine.world, [
  newYear,
  ground,
  ceiling,
	leftWall,
	rightWall, 
  mouseControl,
  initialShapes
]);

// when we click the page, add a new shape
document.addEventListener("click", function (event) {
  const shape = createShape(event.pageX, event.pageY)
  World.add(engine.world, shape)
});
// when we touch : 
// when we click the page, add a new shape
document.addEventListener("touchstart", function (event) {
  const shape = createShape(event.pageX, event.pageY)
  World.add(engine.world, shape)
});

// Run both, the engine and the renderer
Engine.run(engine);
Render.run(renderer);

window.addEventListener("deviceorientation", function (event) {
  engine.world.gravity.x = event.gamma / 30 
  engine.world.gravity.y = event.beta / 30
});


// ServiceWorker PWA : 
(function () {
  if ('serviceWorker' in navigator) {
 navigator.serviceWorker.register('./service-worker.js', {scope: '/'})
 .then(() => console.log('Service Worker registered successfully.'))
 .catch(error => console.log('Service Worker registration failed:', error));
 }
 })();