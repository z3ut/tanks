import { LogicComponent } from '../core/logic-component';
import { World } from '../core/world';
import { GameObject } from '../core/game-object';
import { EventTypes } from '../events/event-types';
import { Clonable } from '../core/clonable';
import { GameOverEvent } from '../events/game-over-event';
import { GameOverType } from '../events/game-over-type';

export class GameStatusLogicComponent implements LogicComponent {

  private isUserTankKilled: boolean;
  private isPhoenixKilled: boolean;
  private numberOfEnemiesKilled = 0;

  constructor(private numberOfEnemiesToKillForWin: number) {
  }

  handleEvent(type: EventTypes, options?: any) {
    switch (type) {
      case EventTypes.UserTankKilled:
        this.isUserTankKilled = true;
        break;
      case EventTypes.PhoenixKilled:
        this.isUserTankKilled = true;
        break;
      case EventTypes.AiTankKilled:
        this.numberOfEnemiesKilled++;
        break;
      default:
    }
  }

  init(gameObject: GameObject, word: World) {
  }

  update(gameObject: GameObject, world: World) {
    if (this.isUserTankKilled || this.isPhoenixKilled) {
      this.gameOver(world, GameOverType.Lose);
    }
    if (this.numberOfEnemiesKilled >= this.numberOfEnemiesToKillForWin) {
      this.gameOver(world, GameOverType.Win);
    }
    this.isUserTankKilled = false;
    this.isPhoenixKilled = false;
  }

  destroy(gameObject: GameObject, world: World) {
  }

  clone(): LogicComponent {
    return new GameStatusLogicComponent(this.numberOfEnemiesToKillForWin);
  }

  gameOver(world: World, result: GameOverType) {
    world.sendEvent(EventTypes.GameOver, {
      result: result,
      enemiesKilled: this.numberOfEnemiesKilled
    } as GameOverEvent);
    alert('game over. tank killed: ' + this.numberOfEnemiesKilled);
  }
}
