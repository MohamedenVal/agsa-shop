import { Component, Input } from '@angular/core';

@Component({
  selector: 'eshop-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  @Input() state = false;

  hideNav() {
    this.state = false;
  }
}
