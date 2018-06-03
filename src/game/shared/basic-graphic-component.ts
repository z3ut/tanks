import { GraphicComponent } from '../core/graphic-component';
import { GameObject } from '../core/game-object';

export class BasicGraphicComponent implements GraphicComponent {

  private isInited = false;
  private unit: HTMLDivElement;

  constructor(private width: number, private height: number,
    private pxPerCoord: number, private field: Element,
    private cssClasses: string[]) {
  }

  update(gameObject: GameObject) {
    if (!this.isInited) {
      this.init(gameObject);
    }

    this.updatePosition(gameObject);
  }

  destroy(gameObject: GameObject) {
    if (!this.isInited) {
      return;
    }
    this.field.removeChild(this.unit);
  }

  clone(): GraphicComponent {
    return new BasicGraphicComponent(this.width, this.height,
      this.pxPerCoord, this.field, this.cssClasses);
  }

  init(gameObject: GameObject) {
    this.unit = document.createElement('div');
    this.unit.classList.add(...this.cssClasses);
    this.unit.style.width = this.width * this.pxPerCoord + 'px';
    this.unit.style.height = this.height * this.pxPerCoord + 'px';
    this.field.appendChild(this.unit);
    this.isInited = true;

    this.updatePosition(gameObject);
  }

  private updatePosition(gameObject: GameObject) {
    this.unit.style.left = ((gameObject.x - (this.width - 1) / 2) * this.pxPerCoord) + 'px';
    this.unit.style.top = ((gameObject.y - (this.height - 1) / 2) * this.pxPerCoord) + 'px';
  }
}
