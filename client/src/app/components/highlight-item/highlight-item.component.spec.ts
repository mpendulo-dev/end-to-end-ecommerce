import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightItemComponent } from './highlight-item.component';

describe('HighlightItemComponent', () => {
  let component: HighlightItemComponent;
  let fixture: ComponentFixture<HighlightItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlightItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
