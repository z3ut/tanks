import { GameObject } from "../../core/game-object";
import { AiTankImportComponent } from "../ai-tank-input-component";

export interface AiTankState {
  update(gameObject: GameObject, aiTankInput: AiTankImportComponent);
}
