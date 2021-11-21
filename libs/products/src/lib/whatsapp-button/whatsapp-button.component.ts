import { Component, Input } from '@angular/core';
import { Product } from '@agsa-shop/products';

@Component({
  selector: 'products-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss']
})
export class WhatsappButtonComponent {
  options = {
    "enabled":true,
    "brandSetting":{
        "brandName":"Rim Mart | ريم مارت",
        "messageText":"السلام علكم, انا مهتم في هذا العنصر: https://rimmarting.rf.gd/products/",
        "phoneNumber":"22232074311"
    }
  };
  
  @Input() product!: Product;

  // constructor() { }

  // ngOnInit(): void {
  // }implements OnInit , OnInit 

}
