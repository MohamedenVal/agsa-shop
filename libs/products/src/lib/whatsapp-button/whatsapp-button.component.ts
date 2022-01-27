import { Component, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'products-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss']
})
export class WhatsappButtonComponent {
  @Input() product!: Product;

  options = {
    "enabled":true,
    "brandSetting":{
        "brandName":"Rim Mart | ريم مارت",
        "messageText":"السلام علكم, انا مهتم بهذا العنصر: https://rimmarting.rf.gd/products/",
        // "phoneNumber": this.product.store.phone
    }
  };
  

  // constructor() { }

  // ngOnInit(): void {
  // }implements OnInit , OnInit 

}
