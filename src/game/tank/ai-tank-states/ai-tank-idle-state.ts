import { AiTankState } from './ai-tank-state';
import { GameObject } from '../../core/game-object';
import { AiTankInputComponent } from '../ai-tank-input-component';
import { getWholeNumberUnder } from '../../utils/math-utils';

export class AiTankIdleState implements AiTankState {

  private numberOfCurrentUpdates = 0;
  private maxUpdateSteps = 10;
  private maxNumberOfCurrentUpdates = getWholeNumberUnder(this.maxUpdateSteps);

  update(gameObject: GameObject, aiTankInput: AiTankInputComponent) {
    if (this.numberOfCurrentUpdates < this.maxNumberOfCurrentUpdates) {
      this.numberOfCurrentUpdates++;
      return;
    }

    this.numberOfCurrentUpdates = 0;
    this.maxNumberOfCurrentUpdates = getWholeNumberUnder(this.maxUpdateSteps);
    aiTankInput.setRandomState();
  }
}
