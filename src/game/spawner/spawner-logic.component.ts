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
import { Clonable } from '../core/clonable';
import { SpawnArea } from './spawn-area';

export class SpawnerLogicComponent implements LogicComponent {

  private spawnedTanks = 0;

  private updatesTillNextSpawn = -1;

  private get spawnAreasRandomOrder(){
    return this.spawnAreas.sort(() => .5 - Math.random());
  }

  constructor(private maxNumberOfTanks: number, private minimumSpawnCycle: number,
    private randomSpawnCycle: number, private spawn: Clonable<GameObject>, private spawnAreas: SpawnArea[]) {

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
      this.updatesTillNextSpawn = Math.round(
        Math.random() * this.randomSpawnCycle + this.minimumSpawnCycle);
      return;
    }

    if (this.updatesTillNextSpawn > 0) {
      this.updatesTillNextSpawn--;
      return;
    }

    if (this.updatesTillNextSpawn === 0) {
      for (let s of this.spawnAreasRandomOrder) {
        if (world.findCollision(s.boundaries) == null) {
          this.spawnGameObject(world, s.x, s.y);
          this.updatesTillNextSpawn = -1;
          break;
        }
      }
      
      return;
    }
  }

  destroy(gameObject: GameObject, world: World) {
  }

  clone(): LogicComponent {
    return new SpawnerLogicComponent(this.maxNumberOfTanks,
      this.minimumSpawnCycle, this.randomSpawnCycle, this.spawn, this.spawnAreas);
  }

  private spawnGameObject(world: World, x: number, y: number) {
    const gameObject = this.spawn.clone();

    gameObject.x = x;
    gameObject.y = y;

    world.gameObjects.push(gameObject);

    this.spawnedTanks++;
  }
}
