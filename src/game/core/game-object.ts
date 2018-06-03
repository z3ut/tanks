import { World } from './world';
import { InputComponent } from './input-component';
import { Direction } from './direction';
import { Boundaries } from './boundaries';
import { LogicComponent } from './logic-component';
import { EventTypes } from '../events/event-types';
import { GraphicComponent } from './graphic-component';
import { PhysicComponent } from './physic-component';
import { Clonable } from './clonable';

export class GameObject implements Clonable<GameObject> {

  x: number;
  y: number;
  width: number;
  height: number;
  direction: Direction;
  isNotPhysical: boolean;

  isDestroyed: boolean;

  get boundaries(): Boundaries {
    return {
      topY: this.y - (this.height - 1) / 2,
      rightX: this.x + (this.width - 1) / 2,
      bottomY: this.y + (this.height - 1) / 2,
      leftX: this.x - (this.width - 1 ) / 2
    };
  }

  constructor(private inputComponent: InputComponent,
    private logicComponent: LogicComponent,
    private physicComponent: PhysicComponent,
    private graphicComponent: GraphicComponent) {

  }

  clone(): GameObject {
    const gameObject = new GameObject(this.inputComponent.clone(), this.logicComponent.clone(),
      this.physicComponent.clone(), this.graphicComponent.clone());
    gameObject.x = this.x;
    gameObject.y = this.y;
    gameObject.width = this.width;
    gameObject.height = this.height;
    gameObject.direction = this.direction;
    gameObject.isNotPhysical = this.isNotPhysical;
    return gameObject;
  }

  init(world: World) {
    this.physicComponent && this.physicComponent.init(this, world);
    this.logicComponent && this.logicComponent.init(this, world);
    this.graphicComponent && this.graphicComponent.init(this);
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
    world.gameObjects = world.gameObjects.filter(g => g !== this);
    this.isDestroyed = true;
  }
}
