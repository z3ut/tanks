import { Command } from '../core/command';
import { GameObject } from '../core/game-object';
import { Direction } from '../core/direction';
import { World } from '../core/world';
import { ShellLogicComponent } from '../shell/shell-logic-component';
import { settings } from '../core/settings';
import { ShellGraphicComponent } from '../shell/shell-graphic-component';
import { BasicPhysicComponent } from '../shared/basic-physic-component';
import { calculatePointOnBoundaries } from '../utils/coords';

export interface FireCommandOptions {
  direction: Direction;
  x: number;
  y: number;
  world: World;
}

export class FireCommand implements Command {
  do(gameObject: GameObject, options: FireCommandOptions) {
    const shellBasicPhysicComponent = new BasicPhysicComponent(settings.shellSpeed);
    const shellLogic = new ShellLogicComponent(settings.shellSpeed, gameObject.direction);
    const shellGraphic = new ShellGraphicComponent(settings.shellWidth, settings.shellHeight, settings.pxPerCoord);
    const shell = new GameObject(null, shellLogic, shellBasicPhysicComponent, shellGraphic);
    
    const { x: shellX, y: shellY } = calculatePointOnBoundaries(gameObject.boundaries, gameObject.direction);

    shell.x = shellX;
    shell.y = shellY;
    shell.width = settings.shellWidth;
    shell.height = settings.shellHeight;
    options.world.gameObjects.push(shell);
  }
}

export const fireCommand = new FireCommand();
