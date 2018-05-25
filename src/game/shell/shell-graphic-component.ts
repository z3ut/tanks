import { GraphicComponent } from '../core/graphic-component';
import { GameObject } from '../core/game-object';

export class ShellGraphicComponent implements GraphicComponent {

  private field = document.querySelector('.field');
  private shell = document.createElement('div');

  constructor(private width: number, private height: number, private pxPerCoord: number) {
    this.shell.classList.add('shell'); 
    this.shell.style.width = width * pxPerCoord + 'px';
    this.shell.style.height = height * pxPerCoord + 'px';
    this.field.appendChild(this.shell);
  }

  update(gameObject: GameObject) {
    this.shell.style.left = ((gameObject.x - (this.width - 1) / 2) * this.pxPerCoord) + 'px';
    this.shell.style.top = ((gameObject.y - (this.height - 1) / 2) * this.pxPerCoord) + 'px';
  }

  destroy(gameObject: GameObject) {
    this.field.removeChild(this.shell);
  }
}