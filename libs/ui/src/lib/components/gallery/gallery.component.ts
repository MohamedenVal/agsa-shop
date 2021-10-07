import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ui-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
    selectedImage!: string;

    @Input() images!: string[];

    constructor() {
        //...
    }

    ngOnInit(): void {
        if (this.images.length) {
            this.selectedImage = this.images[0];
        }
    }

    changeSelectedImage(image: string) {
        this.selectedImage = image;
    }

    get hasImages() {
        return this.images?.length > 0;
    }
}