import { GameObject } from './core/game-object';
import { World } from './core/world';
import { settings } from './core/settings';
import { WorldGenerator } from './world-generator/world-generator';
import { GameOverType } from './events/game-over-type';

const MS_PER_UPDATE = settings.msPerUpdate;
const worldGenerator = new WorldGenerator();
const world = worldGenerator.getWorld(1);

export function main() {
  const mailLoopInterval = setInterval(() => {
    if (world.isGameOver) {
      clearInterval(mailLoopInterval);
      const message = `
        ${ world.gameResult === GameOverType.Win ? 'You win!' : 'Game Over.' }\n
        Enemies killed: ${world.enemiesKilled}
      `;
      alert(message);
      return;
    }
    world.update();
    world.render();
  }, MS_PER_UPDATE);
}
