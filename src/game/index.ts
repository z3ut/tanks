import { GameObject } from './core/game-object';
import { World } from './core/world';
import { settings } from './core/settings';
import { UserTankImportComponent } from './tank/user-tank-input-component';
import { AiTankLogicComponent } from './tank/ai-tank-logic-component';
import { UserTankLogicComponent } from './tank/user-tank-logic-component';
import { TankGraphicComponent } from './tank/tank-graphic-component';
import { Direction } from './core/direction';
import { AiTankImportComponent } from './tank/ai-tank-input-component';
import { BasicPhysicComponent } from './shared/basic-physic-component';
import { BrickWallLogicComponent } from './wall/brick-wall-logic-component';
import { BrickWallGraphicComponent } from './wall/brick-wall-graphic-component';
import { SpawnerLogicComponent } from './spawner/spawner-logic.component';

const MS_PER_UPDATE = settings.msPerUpdate;

const world = new World();

world.gameObjects = [];
world.width = settings.fieldWidth;
world.height = settings.fieldHeight;

const userTankInputComponent = new UserTankImportComponent();
const userTankBasicPhysicComponent = new BasicPhysicComponent(settings.tankSpeed);
const userTankLogicComponent = new UserTankLogicComponent(settings.tankSpeed);
const userTankGraphicComponent = new TankGraphicComponent(settings.tankWidth, settings.tankHeight, settings.pxPerCoord, 'user-tank');

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
const aiTankGraphicComponent = new TankGraphicComponent(settings.tankWidth, settings.tankHeight, settings.pxPerCoord, 'ai-tank');

const aiTank = new GameObject(aiTankInputComponent, aiTankLogicComponent, aiTankBasicPhysicComponent, aiTankGraphicComponent);
aiTank.width = settings.tankWidth;
aiTank.height = settings.tankHeight;

// aiTank.x = Math.round(settings.fieldHeight / 2);
// aiTank.y = 10;
// aiTank.direction = Direction.Top;

// world.gameObjects.push(aiTank);


const brickWall = new GameObject(null, new BrickWallLogicComponent(), null, new BrickWallGraphicComponent(1, 1, settings.pxPerCoord));
brickWall.x = 5;
brickWall.y = settings.fieldHeight / 2;
brickWall.width = 1;
brickWall.height = 1;
world.gameObjects.push(brickWall);

const spawnAreas = [
  {
    x: 10,
    y: 10,
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
    boundaries: {
      topY: 9,
      rightX: 31,
      bottomY: 11,
      leftX: 29
    } 
  }
];
const spawner = new GameObject(null, new SpawnerLogicComponent(1, 20, 50, aiTank, spawnAreas), null, null);
spawner.isNotPhysical = true;
world.gameObjects.push(spawner);

const field = document.querySelector('.field') as any;
field.style.width = (settings.fieldWidth + 1) * settings.pxPerCoord + 'px';
field.style.height = (settings.fieldHeight + 1) * settings.pxPerCoord + 'px';

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
