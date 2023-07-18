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
  product: Product = {
    id: 1,
    name: 'Sample Product 1',
    price: 1000,
    description: 'Sample Description'
  };
  updatedProductName: string = '';
  updatedProductPrice: number = 0;
  updatedProductDescription: string = '';

  constructor(public productService: ProductService) { }

  // Existing products should load at the time of starting the application
  ngOnInit() {
    
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
        // After the product is added, the form fields should be cleared, write a code for this.
    
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
    // Validate Product Name and Price and show an error like this - 'Please enter valid product name, price, and description.'
    if (!this.updatedProductName || this.updatedProductPrice <= 0 || !this.updatedProductDescription) {
      
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

    // if products are updated successfully the update form should be cleared, write a code for this
    this.productService.updateProduct(product).subscribe(
      () => {
        console.log('Product updated successfully.');
        this.selectedProductId = null;
      },
      error => console.log(error)
    );
  }

  deleteProduct(id: number) {
    // write a code to delete the product

  }

  resetForm() {
    // Write a code to reset the form
  }

  selectProductForUpdate(product: Product) {
    // Write a code to select product for update
  }

  cancelUpdate() {
    // Write a code to cancel the update, clear the error message and form

  }

  resetUpdatedFields() {
    // Write a code to reset the updated fields

  }
}
