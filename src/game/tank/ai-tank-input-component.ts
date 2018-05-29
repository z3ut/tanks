import { InputComponent } from '../core/input-component';
import { GameObject } from '../core/game-object';
import { EventTypes } from '../events/event-types';
import { Direction } from '../core/direction';
import { AiTankState } from './ai-tank-states/ai-tank-state';
import { AiTankFireState } from './ai-tank-states/ai-tank-fire-state';
import { AiTankIdleState } from './ai-tank-states/ai-tank-idle-state';
import { AiTankMoveState } from './ai-tank-states/ai-tank-move-state';
import { getWholeNumberUnder } from '../utils/math-utils';

export class AiTankImportComponent implements InputComponent {
  private currentState: AiTankState;
  private states: { state: AiTankState, weight: number }[];
  private totalWeights: number;

  constructor() {
    this.states = [
      { state: new AiTankFireState(), weight: 1 },
      { state: new AiTankIdleState(), weight: 2 },
      { state: new AiTankMoveState(), weight: 4 }
    ];
    this.totalWeights = this.states.reduce((acc, cur) => acc + cur.weight, 0);
    this.setRandomState();
  }

  update(gameObject: GameObject) {
    this.currentState.update(gameObject, this);
  }

  clone(): InputComponent {
    return new AiTankImportComponent();
  }

  setState(state: AiTankState) {
    this.currentState = state;
  }

  setRandomState() {
    const randomHeight = getWholeNumberUnder(this.totalWeights);
    let currentWeightSum = 0;
    for (let s of this.states) {
      currentWeightSum += s.weight
      if (currentWeightSum >= randomHeight) {
        this.currentState = s.state;
        return;
      }
    }
  }
}
