import { Direction } from "../core/direction";
import { Boundaries } from "../core/boundaries";

export interface WorldJsonDescription {
  field: {
    width: number,
    height: number,
    startX: number,
    startY: number,
    startDirection: Direction
  },
  game: {
    enemiesToKillForWin: number
  },
  gameObjects: {
    walls: {
      brick: {
        x: number,
        y: number
      }[],
      steel: {
        x: number,
        y: number
      }[]
    },
    tankSpawns: {
      maxTanksCountSimultaniously: number,
      areas: {
        x: number,
        y: number,
        direction: Direction,
        boundaries: Boundaries
      }[]
    },
    phoenix: {
      x: number,
      y: number
    }
  }
}
