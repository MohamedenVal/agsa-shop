import { Category } from './category';

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
    countInStock?: number;
    rating?: number;
    nmuReviews?: number;
    isFeatured?: boolean;
    dateCreated?: string;
}
