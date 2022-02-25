import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialodComponent } from './confirmation-dialod.component';

describe('ConfirmationDialodComponent', () => {
  let component: ConfirmationDialodComponent;
  let fixture: ComponentFixture<ConfirmationDialodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDialodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
