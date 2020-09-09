import { TestBed } from '@angular/core/testing';

import { SubcategoriaService } from './subcategoria.service';

describe('SubcategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubcategoriaService = TestBed.get(SubcategoriaService);
    expect(service).toBeTruthy();
  });
});
