import { Category } from './category';
import { Store } from './store';

export class Product {
    id?: string;
    name?: string;
    description?: string;
    richDescription?: string;
    image?: string;
    images!: string[];
    brand?: string;
    price!: number;
    category!: Category;
    store!: Store;
    countInStock?: number;
    rating?: number;
    nmuReviews?: number;
    isFeatured?: boolean;
    dateCreated?: string;
}
