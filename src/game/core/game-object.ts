import { World } from './world';
import { InputComponent } from './input-component';
import { Direction } from './direction';
import { Boundaries } from './boundaries';
import { LogicComponent } from './logic-component';
import { EventTypes } from '../events/event-types';
import { GraphicComponent } from './graphic-component';
import { PhysicComponent } from './physic-component';

export class GameObject {

  x: number;
  y: number;
  width: number;
  height: number;
  direction: Direction;
  isNotPhysical: boolean;

  get boundaries(): Boundaries {
    return {
      topY: this.y - (this.height - 1) / 2,
      rightX: this.x + (this.width - 1) / 2,
      bottomY: this.y + (this.height - 1) / 2,
      leftX: this.x - (this.width -1 )/ 2
    }
  }

  constructor(private inputComponent: InputComponent,
    private logicComponent: LogicComponent,
    private physicComponent: PhysicComponent,
    private graphicComponent: GraphicComponent) {

  }

  update(world: World) {
    this.inputComponent && this.inputComponent.update(this);
    this.physicComponent && this.physicComponent.update(this, world);
    this.logicComponent && this.logicComponent.update(this, world);
  }

  render() {
    this.graphicComponent && this.graphicComponent.update(this);
  }

  handleEvent(type: EventTypes, options?: any) {
    this.logicComponent && this.logicComponent.handleEvent(type, options);
    this.physicComponent && this.physicComponent.handleEvent(type, options);
  }

  destroy(world: World) {
    this.logicComponent && this.logicComponent.destroy(this, world);
    this.physicComponent && this.physicComponent.destroy(this, world);
    this.graphicComponent && this.graphicComponent.destroy(this);
    world.gameObjects = world.gameObjects.filter(g => g != this);
  }
}
