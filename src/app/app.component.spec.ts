import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { of } from 'rxjs';
import { Product } from './products/product.model';
import { ProductService } from './products/product.service';

describe('AppComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ProductsComponent],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);

    // Sample product data
    const products: Product[] = [
      { id: 1, name: 'Product 1', price: 100, description: 'Description 1' },
      { id: 2, name: 'Product 2', price: 200, description: 'Description 2' }
    ];
    spyOn(productService, 'getProducts').and.returnValue(of(products));
    // spyOn(productService, 'addProduct').and.returnValue(of());
    spyOn(productService, 'updateProduct').and.returnValue(of());
    spyOn(productService, 'deleteProduct').and.returnValue(of());
  });

  it('should load products on component initialization', () => {
    fixture.detectChanges();
    expect(component.products.length).toBe(2);
    expect(component.products[0].name).toBe('Product 1');
    expect(component.products[1].name).toBe('Product 2');
  });

  it('should select a product for update', () => {
    const productToUpdate = { id: 1, name: 'Product 1', price: 10, description: 'Description 1' };
  
    component.selectProductForUpdate(productToUpdate);
  
    expect(component.selectedProductId).toBe(productToUpdate.id);
    expect(component.updatedProductName).toBe(productToUpdate.name);
    expect(component.updatedProductPrice).toBe(productToUpdate.price);
    expect(component.updatedProductDescription).toBe(productToUpdate.description);
  });
  
  it('should not add a new product with invalid name or price', () => {
    fixture.detectChanges();
    component.newProductName = '';
    component.newProductPrice = 0;
    spyOn(productService, 'addProduct').and.returnValue(of());
    component.addProduct();

    expect(productService.addProduct).not.toHaveBeenCalled();
    expect(component.products.length).toBe(2);
    expect(component.errorMessage).toBe('Please enter a valid product name and price.');
  });

  it('should update an existing product', () => {
    fixture.detectChanges();
    component.selectProductForUpdate(component.products[0]);
    component.updatedProductName = 'Updated Product';
    component.updatedProductPrice = 150;
    component.updatedProductDescription = 'Updated Description';

    component.updateProduct(component.products[0]);

    expect(productService.updateProduct).toHaveBeenCalledWith({
      id: 1,
      name: 'Updated Product',
      price: 150,
      description: 'Updated Description'
    });
    expect(component.products[0].name).toBe('Updated Product');
    expect(component.products[0].price).toBe(150);
  });
});
