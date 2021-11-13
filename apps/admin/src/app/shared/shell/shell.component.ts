import { Component } from '@angular/core';

@Component({
    selector: 'admin-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
    navToggle() {
        const sideBar = document.getElementById('side-bar');

        sideBar?.classList.toggle('side-nav');
    }
}
