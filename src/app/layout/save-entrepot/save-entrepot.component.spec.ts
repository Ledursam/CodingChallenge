import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEntrepotComponent } from './save-entrepot.component';

describe('SaveEntrepotComponent', () => {
  let component: SaveEntrepotComponent;
  let fixture: ComponentFixture<SaveEntrepotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveEntrepotComponent]
    });
    fixture = TestBed.createComponent(SaveEntrepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
