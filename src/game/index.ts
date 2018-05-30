import { GameObject } from './core/game-object';
import { World } from './core/world';
import { settings } from './core/settings';
import { WorldGenerator } from './world-generator/world-generator';

const MS_PER_UPDATE = settings.msPerUpdate;
const worldGenerator = new WorldGenerator();
const world = worldGenerator.getWorld(1);

export function main() {
  setInterval(() => {
    world.update();
    world.render();
  }, MS_PER_UPDATE);
}
