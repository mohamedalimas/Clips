import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyclipComponent } from './modifyclip.component';

describe('ModifyclipComponent', () => {
  let component: ModifyclipComponent;
  let fixture: ComponentFixture<ModifyclipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyclipComponent]
    });
    fixture = TestBed.createComponent(ModifyclipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
