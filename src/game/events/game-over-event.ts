import { GameOverType } from './game-over-type';

export interface GameOverEvent {
  result: GameOverType;
  enemiesKilled: number;
}
