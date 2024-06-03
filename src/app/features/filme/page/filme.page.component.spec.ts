import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmePageComponent } from './filme.page.component';

describe('FilmePageComponent', () => {
  let component: FilmePageComponent;
  let fixture: ComponentFixture<FilmePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
