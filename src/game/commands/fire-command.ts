import { Command } from '../core/command';
import { GameObject } from '../core/game-object';
import { Direction } from '../core/direction';
import { World } from '../core/world';
import { ShellLogicComponent } from '../shell/shell-logic-component';
import { settings } from '../core/settings';
import { BasicPhysicComponent } from '../shared/basic-physic-component';
import { calculatePointOnBoundaries } from '../utils/coords';
import { BasicGraphicComponent } from '../shared/basic-graphic-component';
import { ImgGraphicComponent } from '../shared/img-graphic-components';
import { ShellInputComponent } from '../shell/shell-input-component';

const shellJson = require('../world-generator/game-objects/shell.json') as {
  width: number, height: number, speed: number
};

export interface FireCommandOptions {
  direction: Direction;
  world: World;
}

export class FireCommand implements Command {
  do(gameObject: GameObject, options: FireCommandOptions) {
    const shellInputComponent = new ShellInputComponent(options.direction);
    const shellBasicPhysicComponent = new BasicPhysicComponent(shellJson.speed);
    const shellLogic = new ShellLogicComponent(shellJson.speed, gameObject.direction);
    const shellGraphic = new ImgGraphicComponent(shellJson.width,
      shellJson.height, settings.pxPerCoord, document.querySelector('[data-field]'),
      ['unit'], require('~/assets/shell.png'));
    const shell = new GameObject(shellInputComponent, shellLogic,
      shellBasicPhysicComponent, shellGraphic);

    const { x: shellX, y: shellY } = calculatePointOnBoundaries(
      gameObject.boundaries, gameObject.direction);

    shell.x = shellX;
    shell.y = shellY;
    shell.width = shellJson.width;
    shell.height = shellJson.height;
    options.world.gameObjects.push(shell);

    shell.init(options.world);
  }
}

export const fireCommand = new FireCommand();
