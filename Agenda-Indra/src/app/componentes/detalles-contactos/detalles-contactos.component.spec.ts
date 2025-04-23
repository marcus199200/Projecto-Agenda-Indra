import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesContactosComponent } from './detalles-contactos.component';

describe('DetallesContactosComponent', () => {
  let component: DetallesContactosComponent;
  let fixture: ComponentFixture<DetallesContactosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesContactosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
