import { AiTankState } from "./ai-tank-state";
import { GameObject } from "../../core/game-object";
import { AiTankInputComponent } from "../ai-tank-input-component";
import { EventTypes } from "../../events/event-types";

export class AiTankFireState implements AiTankState {

  update(gameObject: GameObject, aiTankInput: AiTankInputComponent) {
    gameObject.handleEvent(EventTypes.Fire);
    aiTankInput.setRandomState();
  }
}
