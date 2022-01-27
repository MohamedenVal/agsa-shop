import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ui-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    showMore() {
        this.router.navigate(['/products']);
    }
}
