import { World } from '../core/world';
import { settings } from '../core/settings';
import { UserTankInputComponent } from '../tank/user-tank-input-component';
import { BasicPhysicComponent } from '../shared/basic-physic-component';
import { ImgGraphicComponent } from '../shared/img-graphic-components';
import { GameObject } from '../core/game-object';
import { Direction } from '../core/direction';
import { AiTankInputComponent } from '../tank/ai-tank-input-component';
import { BrickWallLogicComponent } from '../wall/brick-wall-logic-component';
import { SpawnerLogicComponent } from '../spawner/spawner-logic-component';
import { PhoenixLogicComponent } from '../phoenix/phoenix-logic-component';
import { EventTypes } from '../events/event-types';
import { WorldJsonDescription } from './world-json-description';
import { TankLogicComponent } from '../tank/tank-logic-component';
import { GameStatusLogicComponent } from '../game-status/game-status-logic-component';

const worldJson = require('./worlds/world_1.json') as WorldJsonDescription;

const aiTankJson = require('./game-objects/ai-tank.json') as { width: number, height: number, speed: number };
const userTankJson = require('./game-objects/user-tank.json') as { width: number, height: number, speed: number };
const phoenixJson = require('./game-objects/phoenix.json') as { width: number, height: number };

export class WorldBootstrapper {

  bootstrapWorld(id: number): World {
    const world = new World();

    const field = document.querySelector('[data-field]') as any;
    field.style.width = (worldJson.field.width + 1) * settings.pxPerCoord + 'px';
    field.style.height = (worldJson.field.height + 1) * settings.pxPerCoord + 'px';

    world.gameObjects = [];
    world.width = worldJson.field.width;
    world.height = worldJson.field.height;

    const userTankInputComponent = new UserTankInputComponent();
    const userTankBasicPhysicComponent = new BasicPhysicComponent(userTankJson.speed);
    const userTankLogicComponent = new TankLogicComponent(EventTypes.UserTankKilled);
    const userTankGraphicComponent = new ImgGraphicComponent(userTankJson.width,
      userTankJson.height, settings.pxPerCoord, field, ['unit'],
      require('~/assets/user-tank.png'));

    const userTank = new GameObject(userTankInputComponent, userTankLogicComponent,
      userTankBasicPhysicComponent, userTankGraphicComponent);
    userTank.width = userTankJson.width;
    userTank.height = userTankJson.height;

    userTank.x = Math.round(worldJson.field.startX);
    userTank.y = Math.round(worldJson.field.startY);
    userTank.direction = worldJson.field.startDirection;

    world.gameObjects.push(userTank);

    const gameStatusLogicComponent = new GameStatusLogicComponent(worldJson.game.enemiesToKillForWin);
    const gameStatus = new GameObject(null, gameStatusLogicComponent, null, null);
    world.gameObjects.push(gameStatus);

    worldJson.gameObjects.walls.brick.forEach(brickWallJson => {
      const brickWall = new GameObject(null, new BrickWallLogicComponent(), null,
      new ImgGraphicComponent(1, 1, settings.pxPerCoord, field, ['unit'],
      require('~/assets/wall-brick.png')));
      brickWall.x = brickWallJson.x;
      brickWall.y = brickWallJson.y;
      brickWall.width = 1;
      brickWall.height = 1;
      world.gameObjects.push(brickWall);
    });

    worldJson.gameObjects.walls.steel.forEach(steelWallJson => {
      const steelWall = new GameObject(null, null, null,
        new ImgGraphicComponent(1, 1, settings.pxPerCoord, field, ['unit'],
          require('~/assets/wall-steel.png')));
      steelWall.x = steelWallJson.x;
      steelWall.y = steelWallJson.y;
      steelWall.width = 1;
      steelWall.height = 1;
      world.gameObjects.push(steelWall);
    });


    const aiTankInputComponent = new AiTankInputComponent();
    const aiTankBasicPhysicComponent = new BasicPhysicComponent(aiTankJson.speed);
    const aiTankLogicComponent = new TankLogicComponent(EventTypes.AiTankKilled);
    const aiTankGraphicComponent = new ImgGraphicComponent(aiTankJson.width, aiTankJson.height,
      settings.pxPerCoord, field, ['unit'], require('~/assets/ai-tank.png'));

    const aiTank = new GameObject(aiTankInputComponent, aiTankLogicComponent,
      aiTankBasicPhysicComponent, aiTankGraphicComponent);
    aiTank.width = aiTankJson.width;
    aiTank.height = aiTankJson.height;


    const spawnerLogicComponent = new SpawnerLogicComponent(
      worldJson.gameObjects.tankSpawns.maxTanksCountSimultaniously, 20, 50,
      EventTypes.AiTankKilled, aiTank, worldJson.gameObjects.tankSpawns.areas);
    const spawner = new GameObject(null, spawnerLogicComponent, null, null);
    spawner.isNotPhysical = true;
    world.gameObjects.push(spawner);

    const phoenix = new GameObject(null, new PhoenixLogicComponent(), null,
      new ImgGraphicComponent(phoenixJson.width, phoenixJson.height,
        settings.pxPerCoord, field, ['unit'], require('~/assets/phoenix.png')));
    phoenix.x = worldJson.gameObjects.phoenix.x;
    phoenix.y = worldJson.gameObjects.phoenix.y;
    phoenix.width = phoenixJson.width;
    phoenix.height = phoenixJson.height;
    world.gameObjects.push(phoenix);

    return world;
  }
}
