import { GraphicComponent } from '../core/graphic-component';
import { GameObject } from '../core/game-object';
import { Direction } from '../core/direction';

export class TankGraphicComponent implements GraphicComponent {

  private field = document.querySelector('.field');
  private tank = document.createElement('div');

  constructor(private width: number, private height: number, private pxPerCoord: number, private cssClass: string) {
    this.tank.classList.add('tank', cssClass);
    this.tank.style.width = width * pxPerCoord + 'px';
    this.tank.style.height = height * pxPerCoord + 'px';
    this.field.appendChild(this.tank);
  }

  update(gameObject: GameObject) {
    this.tank.style.left = ((gameObject.x - (this.width - 1) / 2) * this.pxPerCoord) + 'px';
    this.tank.style.top = ((gameObject.y - (this.height - 1) / 2) * this.pxPerCoord) + 'px';

    let rotate = 0;

    switch (gameObject.direction) {
      case Direction.Top:
        rotate = 0;
        break;
      case Direction.Right:
        rotate = 90;
        break;
      case Direction.Bottom:
        rotate = 180;
        break;
      case Direction.Left:
        rotate = 270;
        break;
        default:
    }

    this.tank.style.transform = `rotate(${rotate}deg)`;
  }

  destroy(gameObject: GameObject) {
    this.field.removeChild(this.tank);
  }
}