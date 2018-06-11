import { World } from '../core/world';
import { settings } from '../core/settings';
import { UserTankInputComponent } from '../tank/user-tank-input-component';
import { BasicPhysicComponent } from '../shared/basic-physic-component';
import { ImgGraphicComponent } from '../shared/img-graphic-components';
import { GameObject } from '../core/game-object';
import { AiTankInputComponent } from '../tank/ai-tank-input-component';
import { BrickWallLogicComponent } from '../wall/brick-wall-logic-component';
import { SpawnerLogicComponent } from '../spawner/spawner-logic-component';
import { PhoenixLogicComponent } from '../phoenix/phoenix-logic-component';
import { EventTypes } from '../events/event-types';
import { WorldJsonDescription } from './world-json-description';
import { TankLogicComponent } from '../tank/tank-logic-component';
import { GameStatusLogicComponent } from '../game-status/game-status-logic-component';
import { Boundaries } from '../core/boundaries';
import { LogicComponent } from '../core/logic-component';

const worldJsonDescription = require('./worlds/world_1.json') as WorldJsonDescription;

const aiTankJson = require('./game-objects/ai-tank.json') as { width: number, height: number, speed: number };
const userTankJson = require('./game-objects/user-tank.json') as { width: number, height: number, speed: number };
const phoenixJson = require('./game-objects/phoenix.json') as { width: number, height: number };

export class WorldBootstrapper {

  field: any;

  bootstrapWorld(id: number): World {
    const world = new World();
    world.gameObjects = [];
    world.width = worldJsonDescription.field.width;
    world.height = worldJsonDescription.field.height;

    this.initField(world, worldJsonDescription);

    this.addUserTank(world, worldJsonDescription);
    this.addSpawners(world, worldJsonDescription);
    this.addGameStat(world, worldJsonDescription);
    this.addWalls(world, worldJsonDescription);
    this.addPhoenix(world, worldJsonDescription);

    return world;
  }

  private initField(world: World, worldJson: WorldJsonDescription) {
    this.field = document.querySelector('[data-field]') as any;
    this.field.style.width = (worldJson.field.width + 1) * settings.pxPerCoord + 'px';
    this.field.style.height = (worldJson.field.height + 1) * settings.pxPerCoord + 'px';
  }

  private addUserTank(world: World, worldJson: WorldJsonDescription) {
    const userTankInputComponent = new UserTankInputComponent();
    const userTankBasicPhysicComponent = new BasicPhysicComponent(userTankJson.speed);
    const userTankLogicComponent = new TankLogicComponent(EventTypes.UserTankKilled);
    const userTankGraphicComponent = new ImgGraphicComponent(userTankJson.width,
      userTankJson.height, settings.pxPerCoord, this.field, ['unit'],
      require('~/assets/user-tank.png'));

    const userTank = new GameObject(userTankInputComponent, userTankLogicComponent,
      userTankBasicPhysicComponent, userTankGraphicComponent);
    userTank.width = userTankJson.width;
    userTank.height = userTankJson.height;

    userTank.x = Math.round(worldJson.field.startX);
    userTank.y = Math.round(worldJson.field.startY);
    userTank.direction = worldJson.field.startDirection;

    world.gameObjects.push(userTank);
  }

  private addSpawners(world: World, worldJson: WorldJsonDescription) {
    const aiTankInputComponent = new AiTankInputComponent();
    const aiTankBasicPhysicComponent = new BasicPhysicComponent(aiTankJson.speed);
    const aiTankLogicComponent = new TankLogicComponent(EventTypes.AiTankKilled);
    const aiTankGraphicComponent = new ImgGraphicComponent(aiTankJson.width, aiTankJson.height,
      settings.pxPerCoord, this.field, ['unit'], require('~/assets/ai-tank.png'));

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
  }

  private addGameStat(world: World, worldJson: WorldJsonDescription) {
    const gameStatusLogicComponent = new GameStatusLogicComponent(worldJson.game.enemiesToKillForWin);
    const gameStatus = new GameObject(null, gameStatusLogicComponent, null, null);
    world.gameObjects.push(gameStatus);
  }

  private addWalls(world: World, worldJson: WorldJsonDescription) {
    this.addConcreteWalls(world, worldJson.gameObjects.walls.brick,
      new BrickWallLogicComponent(), require('~/assets/wall-brick.png'));
    this.addConcreteWalls(world, worldJson.gameObjects.walls.steel,
      null, require('~/assets/wall-steel.png'));
  }

  private addConcreteWalls(world: World, boundaries: Boundaries[], logicComponent: LogicComponent, image: any) {
    boundaries.forEach(wallJson => {
      for (let x = wallJson.leftX; x <= wallJson.rightX; x++) {
        for (let y = wallJson.topY; y <= wallJson.bottomY; y++) {
          const wall = new GameObject(null, logicComponent ? logicComponent.clone() : null, null,
            new ImgGraphicComponent(1, 1, settings.pxPerCoord, this.field, ['unit'], image));
          wall.x = x;
          wall.y = y;
          wall.width = 1;
          wall.height = 1;
          world.gameObjects.push(wall);
        }
      }
    });
  }

  private addPhoenix(world: World, worldJson: WorldJsonDescription) {
    const phoenix = new GameObject(null, new PhoenixLogicComponent(), null,
      new ImgGraphicComponent(phoenixJson.width, phoenixJson.height,
        settings.pxPerCoord, this.field, ['unit'], require('~/assets/phoenix.png')));
    phoenix.x = worldJson.gameObjects.phoenix.x;
    phoenix.y = worldJson.gameObjects.phoenix.y;
    phoenix.width = phoenixJson.width;
    phoenix.height = phoenixJson.height;
    world.gameObjects.push(phoenix);
  }
}
