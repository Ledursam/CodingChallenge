import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntrepotComponent } from './edit-entrepot.component';

describe('EditEntrepotComponent', () => {
  let component: EditEntrepotComponent;
  let fixture: ComponentFixture<EditEntrepotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEntrepotComponent]
    });
    fixture = TestBed.createComponent(EditEntrepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
