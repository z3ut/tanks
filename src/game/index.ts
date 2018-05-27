import { GameObject } from './core/game-object';
import { World } from './core/world';
import { settings } from './core/settings';
import { UserTankImportComponent } from './tank/user-tank-input-component';
import { AiTankLogicComponent } from './tank/ai-tank-logic-component';
import { UserTankLogicComponent } from './tank/user-tank-logic-component';
import { Direction } from './core/direction';
import { AiTankImportComponent } from './tank/ai-tank-input-component';
import { BasicPhysicComponent } from './shared/basic-physic-component';
import { BrickWallLogicComponent } from './wall/brick-wall-logic-component';
import { SpawnerLogicComponent } from './spawner/spawner-logic-component';
import { EventTypes } from './events/event-types';
import { PhoenixLogicComponent } from './phoenix/phoenix-logic-component';
import { BasicGraphicComponent } from './shared/basic-graphic-component';

const MS_PER_UPDATE = settings.msPerUpdate;

const world = new World();

const field = document.querySelector('.field') as any;
field.style.width = (settings.fieldWidth + 1) * settings.pxPerCoord + 'px';
field.style.height = (settings.fieldHeight + 1) * settings.pxPerCoord + 'px';

world.gameObjects = [];
world.width = settings.fieldWidth;
world.height = settings.fieldHeight;

const userTankInputComponent = new UserTankImportComponent();
const userTankBasicPhysicComponent = new BasicPhysicComponent(settings.tankSpeed);
const userTankLogicComponent = new UserTankLogicComponent(settings.tankSpeed);
const userTankGraphicComponent = new BasicGraphicComponent(settings.tankWidth, settings.tankHeight, settings.pxPerCoord, field, ['unit', 'user-tank']);

const userTank = new GameObject(userTankInputComponent, userTankLogicComponent, userTankBasicPhysicComponent, userTankGraphicComponent);
userTank.width = settings.tankWidth;
userTank.height = settings.tankHeight;

userTank.x = Math.round(settings.fieldHeight / 2);
userTank.y = Math.round(settings.fieldWidth / 2);
userTank.direction = Direction.Top;

world.gameObjects.push(userTank);


const aiTankInputComponent = new AiTankImportComponent();
const aiTankBasicPhysicComponent = new BasicPhysicComponent(settings.tankSpeed);
const aiTankLogicComponent = new AiTankLogicComponent(settings.tankSpeed);
const aiTankGraphicComponent = new BasicGraphicComponent(settings.tankWidth, settings.tankHeight, settings.pxPerCoord, field, ['unit', 'ai-tank']);

const aiTank = new GameObject(aiTankInputComponent, aiTankLogicComponent, aiTankBasicPhysicComponent, aiTankGraphicComponent);
aiTank.width = settings.tankWidth;
aiTank.height = settings.tankHeight;

// aiTank.x = Math.round(settings.fieldHeight / 2);
// aiTank.y = 10;
// aiTank.direction = Direction.Top;
// world.gameObjects.push(aiTank);



const brickWall = new GameObject(null, new BrickWallLogicComponent(), null, new BasicGraphicComponent(1, 1, settings.pxPerCoord, field, ['unit', 'wall', 'brick']));
brickWall.x = 5;
brickWall.y = 20;
brickWall.width = 1;
brickWall.height = 1;
world.gameObjects.push(brickWall);

const steelWall = new GameObject(null, null, null, new BasicGraphicComponent(1, 1, settings.pxPerCoord, field, ['unit', 'wall', 'steel']));
steelWall.x = 5;
steelWall.y = 21;
steelWall.width = 1;
steelWall.height = 1;
world.gameObjects.push(steelWall);

for (let i = 0; i <= settings.fieldWidth; i++) {
  const wall = new GameObject(null, null, null, new BasicGraphicComponent(1, 1, settings.pxPerCoord, field, ['unit', 'wall', 'steel']));
  wall.x = i;
  wall.y = 15;
  wall.width = 1;
  wall.height = 1;
  world.gameObjects.push(wall);
}

const spawnAreas = [
  {
    x: 10,
    y: 10,
    direction: Direction.Bottom,
    boundaries: {
      topY: 9,
      rightX: 11,
      bottomY: 11,
      leftX: 9
    } 
  },
  {
    x: 30,
    y: 10,
    direction: Direction.Bottom,
    boundaries: {
      topY: 9,
      rightX: 31,
      bottomY: 11,
      leftX: 29
    } 
  }
];
const spawner = new GameObject(null, new SpawnerLogicComponent(1, 20, 50, EventTypes.AiTankKilled, aiTank, spawnAreas), null, null);
spawner.isNotPhysical = true;
world.gameObjects.push(spawner);

const phoenix = new GameObject(null, new PhoenixLogicComponent(), null, new BasicGraphicComponent(3, 3, settings.pxPerCoord, field, ['unit', 'phoenix']));
phoenix.x = 30;
phoenix.y = 35;
phoenix.width = 3;
phoenix.height = 3;
world.gameObjects.push(phoenix);

// main loop
// main();

// export function main() {
//   let previousTime = Date.now();
//   let lag = 0;

//   while (true) {
//     let currentTime = Date.now();
//     const elaspedTime = currentTime - previousTime;
//     previousTime = currentTime;
//     lag += elaspedTime;

//     while (lag > MS_PER_UPDATE) {
//       world.update();
//       lag -= MS_PER_UPDATE;
//     }

//     world.render();
//   }
// }

export function main() {
  setInterval(() => {
    // console.log('main()');
    world.update();
    world.render();
  }, MS_PER_UPDATE);
}
