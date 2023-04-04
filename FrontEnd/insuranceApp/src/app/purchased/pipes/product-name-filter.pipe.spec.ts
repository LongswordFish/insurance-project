import { ProductNameFilterPipe } from './product-name-filter.pipe';

describe('ProductNameFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductNameFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
