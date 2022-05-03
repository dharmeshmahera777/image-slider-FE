import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetImageComponent } from './set-image.component';

describe('SetImageComponent', () => {
  let component: SetImageComponent;
  let fixture: ComponentFixture<SetImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
