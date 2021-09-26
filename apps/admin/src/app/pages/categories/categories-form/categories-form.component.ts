import { CategoriesService, Category } from '@agsa-shop/products';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
    form!: FormGroup;
    isSubmitted = false;
    editMode = false;
    categoryPramId = '';

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['#fff']
        });

        this._checkEditMode();
    }
    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        const category: Category = {
            name: this.categoryForm.name.value,
            icon: this.categoryForm.icon.value,
            color: this.categoryForm.color.value
        };
        if (this.editMode) {
            this._updateCategory(category);
        } else {
            this._createCategory(category);
        }
    }

    // method for creating a ctegory
    private _createCategory(category: Category) {
        // creating ...
        this.categoriesService.createCategory(category).subscribe(
            (category: Category) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Category ${category.name} was greated!`
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
                    detail: 'Sorry, category not created!'
                });
            }
        );
    }

    // method for updating a specific category
    private _updateCategory(category: Category) {
        // Updating ...
        this.categoriesService
            .updateCategory(category, this.categoryPramId)
            .subscribe(
                (category: Category) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Category ${category.name} was updated!`
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
                        detail: 'Sorry, category was not updated!'
                    });
                }
            );
    }
    // method for cheching if an id was passed so that a category get updated

    private _checkEditMode() {
        // some code
        this.route.params.subscribe((pararms) => {
            if (pararms.id) {
                this.categoryPramId = pararms.id;
                this.editMode = true;
                this.categoriesService
                    .getSingleCategory(pararms.id)
                    .subscribe((category) => {
                        this.categoryForm.name.setValue(category.name);
                        this.categoryForm.icon.setValue(category.icon);
                        this.categoryForm.color.setValue(category.color);
                    });
            }
        });
    }

    // refactoring for getting the form controls
    get categoryForm() {
        return this.form.controls;
    }
}
