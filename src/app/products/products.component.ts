import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  newProductName: string = '';
  newProductPrice: number = 0;
  newProductDescription: string = '';
  lastAssignedId: number = 0;
  errorMessage: string = '';
  selectedProductId: number | null = null;

  updatedProductName: string = '';
  updatedProductPrice: number = 0;
  updatedProductDescription: string = '';

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.lastAssignedId = Math.max(...products.map(product => product.id));
      },
      error => console.log(error)
    );
  }

  addProduct() {
    if (!this.newProductName || this.newProductPrice <= 0) {
      this.errorMessage = 'Please enter a valid product name and price.';
      return;
    }

    const newProductId = ++this.lastAssignedId;
    const newProduct: Product = {
      id: newProductId,
      name: this.newProductName,
      price: this.newProductPrice,
      description: this.newProductDescription
    };

    this.productService.addProduct(newProduct).subscribe(
      () => {
        this.products.push(newProduct);
        this.resetForm();
      },
      error => console.log(error)
    );
  }
  updateProductField(event: Event, field: string) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    if (field === 'name') {
      this.updatedProductName = target.value;
    } else if (field === 'price') {
      this.updatedProductPrice = +target.value; // Convert to number
    } else if (field === 'description') {
      this.updatedProductDescription = target.value;
    }
  }
  updateProduct(product: Product) {
    // Validate Product Name and Price
    if (!this.updatedProductName || this.updatedProductPrice <= 0 || !this.updatedProductDescription) {
      this.errorMessage = 'Please enter valid product name, price, and description.';
      return;
    }
    // Update the product fields with the updated values
    if (this.updatedProductName) {
      product.name = this.updatedProductName;
    }
    if (this.updatedProductPrice > 0) {
      product.price = this.updatedProductPrice;
    }
    if (this.updatedProductDescription) {
      product.description = this.updatedProductDescription;
    }

    this.productService.updateProduct(product).subscribe(
      () => {
        console.log('Product updated successfully.');
        this.selectedProductId = null;
        this.resetUpdatedFields();
      },
      error => console.log(error)
    );
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter(product => product.id !== id);
        if (this.selectedProductId === id) {
          this.selectedProductId = null;
        }
      },
      error => console.log(error)
    );
  }

  resetForm() {
    this.newProductName = '';
    this.newProductPrice = 0;
    this.newProductDescription = '';
    this.errorMessage = '';
  }

  selectProductForUpdate(product: Product) {
    this.selectedProductId = product.id;
    this.updatedProductName = product.name;
    this.updatedProductPrice = product.price;
    this.updatedProductDescription = product.description;
  }

  cancelUpdate() {
    this.selectedProductId = null;
    this.resetUpdatedFields();
  }

  resetUpdatedFields() {
    this.updatedProductName = '';
    this.updatedProductPrice = 0;
    this.updatedProductDescription = '';
  }
}
