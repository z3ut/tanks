import { GraphicComponent } from '../core/graphic-component';
import { GameObject } from '../core/game-object';

export class BrickWallGraphicComponent implements GraphicComponent {

  private field = document.querySelector('.field');
  private wall = document.createElement('div');

  constructor(private width: number, private height: number, private pxPerCoord: number) {
    this.wall.classList.add('wall', 'brick');
    this.wall.style.width = width * pxPerCoord + 'px';
    this.wall.style.height = height * pxPerCoord + 'px';
    this.field.appendChild(this.wall);
  }

  update(gameObject: GameObject) {
    this.wall.style.left = ((gameObject.x - (this.width - 1) / 2) * this.pxPerCoord) + 'px';
    this.wall.style.top = ((gameObject.y - (this.height - 1) / 2) * this.pxPerCoord) + 'px';
  }

  destroy(gameObject: GameObject) {
    this.field.removeChild(this.wall);
  }

  clone(): GraphicComponent {
    return new BrickWallGraphicComponent(this.width, this.height, this.pxPerCoord);
  }
}
