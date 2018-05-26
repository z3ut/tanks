import { Boundaries } from "../core/boundaries";
import { Direction } from "../core/direction";

export interface SpawnArea {
  x: number;
  y: number;
  direction: Direction;
  boundaries: Boundaries;
}
