import { AiTankState } from "./ai-tank-state";
import { GameObject } from "../../core/game-object";
import { AiTankImportComponent } from "../ai-tank-input-component";
import { EventTypes } from "../../events/event-types";

export class AiTankFireState implements AiTankState {

  update(gameObject: GameObject, aiTankInput: AiTankImportComponent) {
    gameObject.handleEvent(EventTypes.Fire);
    aiTankInput.setRandomState();
  }
}
