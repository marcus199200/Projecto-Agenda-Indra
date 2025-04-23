import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarContactosComponent } from './editar-contactos.component';

describe('EditarContactosComponent', () => {
  let component: EditarContactosComponent;
  let fixture: ComponentFixture<EditarContactosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarContactosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
