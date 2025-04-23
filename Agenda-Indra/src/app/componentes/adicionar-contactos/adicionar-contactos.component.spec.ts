import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearContactoComponent } from './adicionar-contactos.component';

describe('AdicionarContactosComponent', () => {
  let component: CrearContactoComponent;
  let fixture: ComponentFixture<CrearContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearContactoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
