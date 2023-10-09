import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersDetailsComponent } from './characters-details.component';

describe('CharactersDetailsComponent', () => {
  let component: CharactersDetailsComponent;
  let fixture: ComponentFixture<CharactersDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharactersDetailsComponent]
    });
    fixture = TestBed.createComponent(CharactersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
