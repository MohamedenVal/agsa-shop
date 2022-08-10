import { Message } from '@agsa-shop/products';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientMessageService } from '../../services/client-message.service';

@Component({
  selector: 'agsa-shop-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  message!: Message;

  constructor(
    private formBuilder: FormBuilder,
    private clentMsgService: ClientMessageService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      topic: [],
      message: ['', Validators.required]
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid) return;

    const message: Message = {
      id: '',
      username: this.messageForm['username'].value,
      email: this.messageForm['email'].value,
      message: this.messageForm['message'].value,
    }

    this.sendMessage(message);
  }

  private sendMessage(message: Message) {
    this.clentMsgService.sendMessage(message)
      .subscribe((res) => {
        this.message = res;
      }, (err) => {
        console.log(err);

      })
  }

  get messageForm() {
    return this.form.controls;
  }

}
