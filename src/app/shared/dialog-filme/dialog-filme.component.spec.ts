import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFilmeComponent } from './dialog-filme.component';

describe('DialogFilmeComponent', () => {
  let component: DialogFilmeComponent;
  let fixture: ComponentFixture<DialogFilmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFilmeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
