import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipslistComponent } from './clipslist.component';

describe('ClipslistComponent', () => {
  let component: ClipslistComponent;
  let fixture: ComponentFixture<ClipslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClipslistComponent]
    });
    fixture = TestBed.createComponent(ClipslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
