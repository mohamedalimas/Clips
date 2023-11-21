import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclipComponent } from './editclip.component';

describe('EditclipComponent', () => {
  let component: EditclipComponent;
  let fixture: ComponentFixture<EditclipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditclipComponent]
    });
    fixture = TestBed.createComponent(EditclipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
