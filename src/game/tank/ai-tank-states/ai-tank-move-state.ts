import { AiTankState } from "./ai-tank-state";
import { GameObject } from "../../core/game-object";
import { AiTankInputComponent } from "../ai-tank-input-component";
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

  update(gameObject: GameObject, aiTankInput: AiTankInputComponent) {
    if (this.numberOfCurrentUpdates === 0) {
      const random = getWholeNumberUnder(4);
      this.direction = Direction[Direction[random]];
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
