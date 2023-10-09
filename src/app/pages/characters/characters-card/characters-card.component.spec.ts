import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersCardComponent } from './characters-card.component';

describe('CharactersCardComponent', () => {
  let component: CharactersCardComponent;
  let fixture: ComponentFixture<CharactersCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharactersCardComponent]
    });
    fixture = TestBed.createComponent(CharactersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
