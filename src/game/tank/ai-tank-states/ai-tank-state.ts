import { GameObject } from "../../core/game-object";
import { AiTankInputComponent } from "../ai-tank-input-component";

export interface AiTankState {
  update(gameObject: GameObject, aiTankInput: AiTankInputComponent);
}
