import { LogicComponent } from '../core/logic-component';
import { World } from '../core/world';
import { GameObject } from '../core/game-object';
import { EventTypes } from '../events/event-types';
import { MoveEvent } from '../events/move-event';
import { moveCommand } from '../commands/move-command';
import { fireCommand } from '../commands/fire-command';
import { AiTankImportComponent } from '../tank/ai-tank-input-component';
import { BasicPhysicComponent } from '../shared/basic-physic-component';
import { AiTankLogicComponent } from '../tank/ai-tank-logic-component';
import { TankGraphicComponent } from '../tank/tank-graphic-component';
import { settings } from '../core/settings';
import { Direction } from '../core/direction';

export class SpawnerLogicComponent implements LogicComponent {

  private spawnedTanks = 0;

  private updatesTillNextSpawn = -1;

  private spawnAreas = [
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

  private get spawnAreasRandomOrder(){
    return this.spawnAreas.sort(() => .5 - Math.random());
  }

  constructor(private maxNumberOfTanks: number, private minimumSpawnCycle: number, private randomSpawnCycle: number) {

  }

  handleEvent(type: EventTypes, options?: any) {
    switch (type) {
      case EventTypes.AiTankKilled:
        this.spawnedTanks--;
        break;
      default:
    }
  }
  update(gameObject: GameObject, world: World) {
    if (this.spawnedTanks >= this.maxNumberOfTanks) {
      return;
    }

    if (this.updatesTillNextSpawn < 0) {
      this.updatesTillNextSpawn = Math.round(Math.random() * this.randomSpawnCycle + this.minimumSpawnCycle);
      return;
    }

    if (this.updatesTillNextSpawn > 0) {
      this.updatesTillNextSpawn--;
      return;
    }

    if (this.updatesTillNextSpawn === 0) {
      for (let s of this.spawnAreasRandomOrder) {
        if (world.findCollision(s.boundaries) == null) {
          this.spawnTank(world, s.x, s.y);
          this.updatesTillNextSpawn = -1;
          break;
        }
      }
      
      return;
    }
  }

  destroy(gameObject: GameObject, world: World) {
  }

  private spawnTank(world: World, x: number, y: number) {
    const aiTankInputComponent = new AiTankImportComponent();
    const aiTankBasicPhysicComponent = new BasicPhysicComponent(settings.tankSpeed);
    const aiTankLogicComponent = new AiTankLogicComponent(settings.tankSpeed);
    const aiTankGraphicComponent = new TankGraphicComponent(settings.tankWidth, settings.tankHeight, settings.pxPerCoord, 'ai-tank');

    const aiTank = new GameObject(aiTankInputComponent, aiTankLogicComponent, aiTankBasicPhysicComponent, aiTankGraphicComponent);
    aiTank.width = settings.tankWidth;
    aiTank.height = settings.tankHeight;

    aiTank.x = x;
    aiTank.y = y;
    aiTank.direction = Direction.Top;

    world.gameObjects.push(aiTank);

    this.spawnedTanks++;
  }
}
