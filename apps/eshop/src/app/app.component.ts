import { Component } from '@angular/core';

@Component({
  selector: 'eshop-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'eshop';
  state = false;

  toggleNav() {
    this.state = !this.state;

  }

  hideNav() {
    this.state = false;
  }
}
