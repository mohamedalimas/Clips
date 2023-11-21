import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapsgroupComponent } from './tapsgroup.component';

describe('TapsgroupComponent', () => {
  let component: TapsgroupComponent;
  let fixture: ComponentFixture<TapsgroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TapsgroupComponent]
    });
    fixture = TestBed.createComponent(TapsgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
