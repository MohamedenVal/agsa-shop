import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from "@agsa-shop/products";
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientMessageService {
  apiURLUsers = environment.apiURL + 'messages/';

  constructor(
    private http: HttpClient,
  ) { }

  sendMessage(message: Message) {
    return this.http.post<Message>(`${this.apiURLUsers}`, message);
  }

  getMessages() {
    return this.http.get<Message[]>(`${this.apiURLUsers}`);
  }

  getMessage(id: string) {
    return this.http.get<Message>(`${this.apiURLUsers}${id}`)
  }

  deleteMessage(id: string) {
    return this.http.delete<any>(`${this.apiURLUsers}${id}`)
  }

}
