import { WorldDescription } from "./world-description";
import { WorldBootstrapper } from "./world-bootstrapper";

export class WorldGenerator {

  private worldBootstrapper = new WorldBootstrapper();

  private worlds: WorldDescription[] = [
    { id: 1, description: 'world 1' }
  ];

  getWorldList() {
    return this.worlds;
  }

  getWorld(id: number) {
    return this.worldBootstrapper.bootstrapWorld();
  }
}