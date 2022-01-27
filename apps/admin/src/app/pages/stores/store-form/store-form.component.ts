import { StoresService, Store } from '@agsa-shop/products';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
    selector: 'admin-store-form',
    templateUrl: './store-form.component.html',
    styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit {
    form!: FormGroup;
    isSubmitted = false;
    editMode = false;
    storePramId = '';

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private storesService: StoresService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            phone: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['#eee']
        });

        this._checkEditMode();
    }
    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        const store: Store = {
            id: this.storePramId,
            phone: this.storeForm.phone.value,
            name: this.storeForm.name.value,
            icon: this.storeForm.icon.value,
            color: this.storeForm.color.value
        };
        if (this.editMode) {
            this._updateStore(store);
        } else {
            this._createStore(store);
        }
    }

    // method for creating a store
    private _createStore(store: Store) {
        // creating ...
        this.storesService.createStore(store).subscribe(
            (store: Store) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Store ${store.name} was created!`
                });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Sorry, store not created!'
                });
            }
        );
    }

    // method for updating a specific store
    private _updateStore(store: Store) {
        // Updating ...
        this.storesService
            .updateStore(store, this.storePramId)
            .subscribe(
                (store: Store) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Store ${store.name} was updated!`
                    });
                    timer(2000)
                        .toPromise()
                        .then(() => {
                            this.location.back();
                        });
                },
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Sorry, store was not updated!'
                    });
                }
            );
    }
    // method for cheching if an id was passed so that a store get updated

    private _checkEditMode() {
        // some code
        this.route.params.subscribe((pararms) => {
            if (pararms.id) {
                this.storePramId = pararms.id;
                this.editMode = true;
                this.storesService
                    .getSingleStore(pararms.id)
                    .subscribe((store) => {
                        this.storeForm.name.setValue(store.name);
                        this.storeForm.icon.setValue(store.icon);
                        this.storeForm.color.setValue(store.color);
                    });
            }
        });
    }

    // refactoring for getting the form controls
    get storeForm() {
        return this.form.controls;
    }
}
