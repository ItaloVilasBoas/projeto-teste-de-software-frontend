import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendaPageComponent } from './recomenda.page.component';

describe('RecomendaPageComponent', () => {
  let component: RecomendaPageComponent;
  let fixture: ComponentFixture<RecomendaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecomendaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
