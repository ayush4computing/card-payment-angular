import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
      { id: 1, name: 'Product 1', price: 10, description: 'Description 1' },
      { id: 2, name: 'Product 2', price: 20, description: 'Description 2' },
      { id: 3, name: 'Product 3', price: 30, description: 'Description 3' },
      { id: 4, name: 'Product 4', price: 40, description: 'Description 4' },
      { id: 5, name: 'Product 5', price: 50, description: 'Description 5' },
    ];

    return { products };
  }
}
