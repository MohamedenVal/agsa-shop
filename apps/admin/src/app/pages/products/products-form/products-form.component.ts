import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import {
    CategoriesService,
    Category,
    Product,
    ProductsService
} from '@agsa-shop/products';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {
    form!: FormGroup;
    isSubmitted = false;
    editMode = false;
    productPramId = '';
    categories!: Category[];
    imageDisplay!: string | ArrayBuffer | null | undefined;

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._getCategories();
        this._checkEditMode();
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['', Validators.required],
            isFeatured: [false]
        });
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) return;

        const productFormData = new FormData();

        Object.keys(this.productForm).map((key) => {
            productFormData.append(key, this.productForm[key].value);
        });

        if (this.editMode) {
            this._updateProduct(productFormData);
        } else {
            this._createProduct(productFormData);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onImageUpload(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.form.patchValue({ image: file });
            this.form.get('image')?.updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result;
            };
            fileReader.readAsDataURL(file);
        }
    }

    // method for creating a ctegory
    private _createProduct(productFormData: FormData) {
        // creating ...
        this.productsService.createProduct(productFormData).subscribe(
            (product: Product) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Product ${product.name} was greated!`
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
                    detail: 'Sorry, product not created!'
                });
            }
        );
    }

    // method for updating a specific product
    private _updateProduct(productFormData: FormData) {
        // Updating ...
        this.productsService
            .updateProduct(productFormData, this.productPramId)
            .subscribe(
                (product: Product) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Product ${product.name} was updated!`
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
                        detail: 'Sorry, product was not updated!'
                    });
                }
            );
    }
    // method for cheching if an id was passed so that a product get updated

    private _checkEditMode() {
        // some code
        this.route.params.subscribe((pararms) => {
            if (pararms.id) {
                this.productPramId = pararms.id;
                this.editMode = true;
                this.productsService
                    .getSingleProduct(pararms.id)
                    .subscribe((product) => {
                        this.productForm.name.setValue(product.name);
                        this.productForm.brand.setValue(product.brand);
                        this.productForm.category.setValue(
                            product.category?.id
                        );
                        this.productForm.price.setValue(product.price);
                        this.productForm.countInStock.setValue(
                            product.countInStock
                        );
                        this.productForm.isFeatured.setValue(
                            product.isFeatured
                        );
                        this.productForm.description.setValue(
                            product.description
                        );
                        this.productForm.richDescription.setValue(
                            product.richDescription
                        );
                        this.imageDisplay = product.image;
                        this.productForm.image.setValidators([]);
                        this.productForm.image.updateValueAndValidity();
                    });
            }
        });
    }

    // refactoring for getting the form controls
    get productForm() {
        return this.form.controls;
    }
}
