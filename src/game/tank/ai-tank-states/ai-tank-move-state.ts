import { AiTankState } from "./ai-tank-state";
import { GameObject } from "../../core/game-object";
import { AiTankImportComponent } from "../ai-tank-input-component";
import { Direction } from "../../core/direction";
import { EventTypes } from "../../events/event-types";
import { getWholeNumberUnder } from "../../utils/math-utils";

export class AiTankMoveState implements AiTankState {

  private numberOfCurrentUpdates = 0;
  private currentWaitBeforeMove = 0;
  private waitBeforeMove = 3;
  private updateSteps = getWholeNumberUnder(10);
  private direction: Direction;

  constructor() {
  }

  update(gameObject: GameObject, aiTankInput: AiTankImportComponent) {
    if (this.numberOfCurrentUpdates === 0) {
      const random = getWholeNumberUnder(4);
      switch (random) {
        case 0:
          this.direction = Direction.Top;
          break;
        case 1:
          this.direction = Direction.Right;
          break;
        case 2:
          this.direction = Direction.Bottom;
          break;
        case 3:
          this.direction = Direction.Left;
          break;
        default:
      }
    }

    if (this.currentWaitBeforeMove < this.waitBeforeMove) {
      this.currentWaitBeforeMove ++;
      return;
    }

    this.currentWaitBeforeMove = 0;

    if (this.numberOfCurrentUpdates < this.updateSteps) {
      this.numberOfCurrentUpdates++;
      gameObject.handleEvent(EventTypes.Move, { direction:this.direction });
      return;
    }

    this.numberOfCurrentUpdates = 0;
    this.updateSteps = getWholeNumberUnder(10);
    aiTankInput.setRandomState();
  }
}
