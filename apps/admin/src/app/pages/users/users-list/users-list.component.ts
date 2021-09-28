import { User, UsersService } from '@agsa-shop/users';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
    users: User[] = [];

    constructor(
        private usersService: UsersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }

    deleteUser(userId: string) {
        this.confirmationService.confirm({
            message: 'Do yo want to delete this user?',
            header: 'Delete categoty',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService.deleteUser(userId).subscribe(
                    () => {
                        this._getUsers();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'user was deleted'
                        });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'user was not deleted'
                        });
                    }
                );
            }
        });
    }

    updateUser(userId: string) {
        this.router.navigateByUrl(`users/form/${userId}`);
    }
    private _getUsers() {
        this.usersService.getUsers().subscribe((cats) => {
            this.users = cats;
        });
    }
}
