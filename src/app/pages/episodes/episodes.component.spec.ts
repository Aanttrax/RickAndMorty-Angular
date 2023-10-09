import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesComponent } from './episodes.component';

describe('EpisodesComponent', () => {
  let component: EpisodesComponent;
  let fixture: ComponentFixture<EpisodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpisodesComponent]
    });
    fixture = TestBed.createComponent(EpisodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
