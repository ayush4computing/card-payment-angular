import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductService } from './product.service';
import { of } from 'rxjs';
import { Product } from './product.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ProductsComponent],
      providers: [ProductService]
    }).compileComponents();
  });
  
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

  it('should reset the update fields', () => {
    component.updatedProductName = 'Updated Product';
    component.updatedProductPrice = 30;
    component.updatedProductDescription = 'Updated Description';
  
    component.resetUpdatedFields();
  
    expect(component.updatedProductName).toBe('');
    expect(component.updatedProductPrice).toBe(0);
    expect(component.updatedProductDescription).toBe('');
  });
  

  it('should not update an existing product with invalid name, price, or description', () => {
    fixture.detectChanges();
    component.selectProductForUpdate(component.products[0]);
    component.updatedProductName = '';
    component.updatedProductPrice = 0;
    component.updatedProductDescription = '';

    component.updateProduct(component.products[0]);

    expect(productService.updateProduct).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Please enter valid product name, price, and description.');
  });

  it('should cancel the update and reset the selectedProductId', () => {
    fixture.detectChanges();
    component.selectProductForUpdate(component.products[0]);

    component.cancelUpdate();

    expect(component.selectedProductId).toBeNull();
    expect(component.updatedProductName).toBe('');
    expect(component.updatedProductPrice).toBe(0);
    expect(component.updatedProductDescription).toBe('');
  });



  it('should show error message for invalid product name', () => {
    fixture.detectChanges();
    component.selectProductForUpdate(component.products[0]);
    component.updatedProductName = '';

    fixture.detectChanges();
    const errorMessageElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement.textContent).toContain('Product Name is required.');
  });

  it('should show error message for invalid product price', () => {
    fixture.detectChanges();
    component.selectProductForUpdate(component.products[0]);
    component.updatedProductPrice = 0;

    fixture.detectChanges();
    const errorMessageElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement.textContent).toContain('Product Price must be greater than 0.');
  });

  it('should show error message for invalid product description', () => {
    fixture.detectChanges();
    component.selectProductForUpdate(component.products[0]);
    component.updatedProductDescription = '';

    fixture.detectChanges();
    const errorMessageElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessageElement.textContent).toContain('Product Description is required.');
  });
  
  it('should delete a product', () => {
    // Arrange
    const productIdToDelete = 1;
    const initialProducts = [...component.products];
  
    // Act
    component.deleteProduct(productIdToDelete);
  
    // Assert
    expect(productService.deleteProduct).toHaveBeenCalledWith(productIdToDelete);
    expect(component.products).toEqual(initialProducts.filter((product) => product.id !== productIdToDelete));
    expect(component.selectedProductId).toBeNull();
  });
  
  
  it('should reset the form after adding a product', fakeAsync(() => {
    // Arrange
    component.newProductName = 'New Product';
    component.newProductPrice = 25;
    component.newProductDescription = 'New Description';
  
    // Create a mock product to be returned by the spy
    const mockProduct: Product = {
      id: 3, // You can use any valid ID here
      name: 'New Product',
      price: 25,
      description: 'New Description'
    };
  
    spyOn(productService, 'addProduct').and.returnValue(of(mockProduct));
  
    // Act
    component.addProduct();
    tick(); // Simulate passage of time for async operations
    fixture.detectChanges(); // Trigger change detection
  
    // Assert
    expect(component.newProductName).toBe('');
    expect(component.newProductPrice).toBe(0);
    expect(component.newProductDescription).toBe('');
    expect(component.errorMessage).toBe('');
  }));
  
  
  
  it('should reset the error message after canceling update', () => {
    // Arrange
    component.updatedProductName = '';
    component.updatedProductPrice = 0;
    component.updatedProductDescription = '';
  
    // Act
    component.cancelUpdate();
  
    // Assert
    expect(component.errorMessage).toBe('');
  });
  
  it('should display product details in the product cards', () => {
    // Arrange
    component.products = [
      { id: 1, name: 'Product 1', price: 10, description: 'Description 1' },
      { id: 2, name: 'Product 2', price: 20, description: 'Description 2' },
    ];
    fixture.detectChanges();
  
    // Act
    const productCardElements = fixture.nativeElement.querySelectorAll('.product-card');
  
    // Assert
    expect(productCardElements.length).toBe(2);
    expect(productCardElements[0].textContent).toContain('Product 1');
    expect(productCardElements[0].textContent).toContain('$ 10');
    expect(productCardElements[0].textContent).toContain('Description 1');
    // Similarly, you can check for the details of the second product card.
  });
  
});