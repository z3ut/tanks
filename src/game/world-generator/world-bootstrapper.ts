import { World } from "../core/world";
import { settings } from "../core/settings";
import { UserTankInputComponent } from "../tank/user-tank-input-component";
import { BasicPhysicComponent } from "../shared/basic-physic-component";
import { UserTankLogicComponent } from "../tank/user-tank-logic-component";
import { ImgGraphicComponent } from "../shared/img-graphic-components";
import { GameObject } from "../core/game-object";
import { Direction } from "../core/direction";
import { AiTankInputComponent } from "../tank/ai-tank-input-component";
import { AiTankLogicComponent } from "../tank/ai-tank-logic-component";
import { BrickWallLogicComponent } from "../wall/brick-wall-logic-component";
import { SpawnerLogicComponent } from "../spawner/spawner-logic-component";
import { PhoenixLogicComponent } from "../phoenix/phoenix-logic-component";
import { EventTypes } from "../events/event-types";

export class WorldBootstrapper {

  bootstrapWorld(): World {
    const world = new World();

    const field = document.querySelector('[data-field]') as any;
    field.style.width = (settings.fieldWidth + 1) * settings.pxPerCoord + 'px';
    field.style.height = (settings.fieldHeight + 1) * settings.pxPerCoord + 'px';

    world.gameObjects = [];
    world.width = settings.fieldWidth;
    world.height = settings.fieldHeight;

    const userTankInputComponent = new UserTankInputComponent();
    const userTankBasicPhysicComponent = new BasicPhysicComponent(settings.tankSpeed);
    const userTankLogicComponent = new UserTankLogicComponent(settings.tankSpeed);
    const userTankGraphicComponent = new ImgGraphicComponent(settings.tankWidth, settings.tankHeight, settings.pxPerCoord, field, ['unit'], require('~/assets/user-tank.png'));

    const userTank = new GameObject(userTankInputComponent, userTankLogicComponent, userTankBasicPhysicComponent, userTankGraphicComponent);
    userTank.width = settings.tankWidth;
    userTank.height = settings.tankHeight;

    userTank.x = Math.round(settings.fieldHeight / 2);
    userTank.y = Math.round(settings.fieldWidth / 2);
    userTank.direction = Direction.Top;

    world.gameObjects.push(userTank);


    const brickWall = new GameObject(null, new BrickWallLogicComponent(), null, new ImgGraphicComponent(1, 1, settings.pxPerCoord, field, ['unit'], require('~/assets/wall-brick.png')));
    brickWall.x = 5;
    brickWall.y = 20;
    brickWall.width = 1;
    brickWall.height = 1;
    world.gameObjects.push(brickWall);

    const steelWall = new GameObject(null, null, null, new ImgGraphicComponent(1, 1, settings.pxPerCoord, field, ['unit'], require('~/assets/wall-steel.png')));
    steelWall.x = 5;
    steelWall.y = 21;
    steelWall.width = 1;
    steelWall.height = 1;
    world.gameObjects.push(steelWall);

    for (let i = 0; i <= settings.fieldWidth; i++) {
      const wall = new GameObject(null, null, null, new ImgGraphicComponent(1, 1, settings.pxPerCoord, field, ['unit'], require('~/assets/wall-steel.png')));
      wall.x = i;
      wall.y = 15;
      wall.width = 1;
      wall.height = 1;
      world.gameObjects.push(wall);
    }

    for (let j = 0; j < 3; j++) {
      for (let i = 16; i <= settings.fieldHeight; i++) {
        const wall = new GameObject(null, new BrickWallLogicComponent(), null, new ImgGraphicComponent(1, 1, settings.pxPerCoord, field, ['unit'], require('~/assets/wall-brick.png')));
        wall.x = j;
        wall.y = i;
        wall.width = 1;
        wall.height = 1;
        world.gameObjects.push(wall);
      }
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

    const aiTankInputComponent = new AiTankInputComponent();
    const aiTankBasicPhysicComponent = new BasicPhysicComponent(settings.tankSpeed);
    const aiTankLogicComponent = new AiTankLogicComponent(settings.tankSpeed);
    const aiTankGraphicComponent = new ImgGraphicComponent(settings.tankWidth, settings.tankHeight, settings.pxPerCoord, field, ['unit'], require('~/assets/ai-tank.png'));

    const aiTank = new GameObject(aiTankInputComponent, aiTankLogicComponent, aiTankBasicPhysicComponent, aiTankGraphicComponent);
    aiTank.width = settings.tankWidth;
    aiTank.height = settings.tankHeight;

    const spawner = new GameObject(null, new SpawnerLogicComponent(2, 20, 50, EventTypes.AiTankKilled, aiTank, spawnAreas), null, null);
    spawner.isNotPhysical = true;
    world.gameObjects.push(spawner);

    const phoenix = new GameObject(null, new PhoenixLogicComponent(), null, new ImgGraphicComponent(5, 5, settings.pxPerCoord, field, ['unit'], require('~/assets/phoenix.png')));
    phoenix.x = 30;
    phoenix.y = 35;
    phoenix.width = 5;
    phoenix.height = 5;
    world.gameObjects.push(phoenix);

    return world;
  }
}
