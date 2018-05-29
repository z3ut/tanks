import { GraphicComponent } from '../core/graphic-component';
import { GameObject } from '../core/game-object';
import { directionToDegree } from '../utils/direction';

export class ImgGraphicComponent implements GraphicComponent {

  private isInited = false;
  private unit: HTMLImageElement;

  constructor(private width: number, private height: number, private pxPerCoord: number,
    private field: Element, private cssClasses: string[], private src: string) {
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
    return new ImgGraphicComponent(this.width, this.height, this.pxPerCoord, this.field, this.cssClasses, this.src);
  }

  init(gameObject: GameObject) {
    this.unit = document.createElement('img');
    this.unit.src = this.src;
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
    this.unit.style.transform = `rotate(${directionToDegree(gameObject.direction)}deg)`;
  }
}
