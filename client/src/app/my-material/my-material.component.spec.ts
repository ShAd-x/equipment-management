import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMaterialComponent } from './my-material.component';

describe('MyMaterialComponent', () => {
  let component: MyMaterialComponent;
  let fixture: ComponentFixture<MyMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
