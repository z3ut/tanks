import { GraphicComponent } from '../core/graphic-component';
import { GameObject } from '../core/game-object';

export class BasicGraphicComponent implements GraphicComponent {

  private isInited = false;
  private field = document.querySelector('.field');
  private unit = document.createElement('div');

  constructor(private width: number, private height: number, private pxPerCoord: number, private cssClasses: string[]) {
    
  }

  update(gameObject: GameObject) {
    if (!this.isInited) {
      this.init();
    }

    this.unit.style.left = ((gameObject.x - (this.width - 1) / 2) * this.pxPerCoord) + 'px';
    this.unit.style.top = ((gameObject.y - (this.height - 1) / 2) * this.pxPerCoord) + 'px';
  }

  destroy(gameObject: GameObject) {
    this.field.removeChild(this.unit);
  }

  clone(): GraphicComponent {
    return new BasicGraphicComponent(this.width, this.height, this.pxPerCoord, this.cssClasses);
  }

  private init() {
    this.unit.classList.add(...this.cssClasses);
    this.unit.style.width = this.width * this.pxPerCoord + 'px';
    this.unit.style.height = this.height * this.pxPerCoord + 'px';
    this.field.appendChild(this.unit);
    this.isInited = true;
  }
}
