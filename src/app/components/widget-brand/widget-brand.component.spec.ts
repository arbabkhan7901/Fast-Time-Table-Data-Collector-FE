import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetBrandComponent } from './widget-brand.component';

describe('WidgetBrandComponent', () => {
  let component: WidgetBrandComponent;
  let fixture: ComponentFixture<WidgetBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
