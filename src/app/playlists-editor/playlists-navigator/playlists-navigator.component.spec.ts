import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsNavigatorComponent } from './playlists-navigator.component';

describe('PlaylistsNavigatorComponent', () => {
  let component: PlaylistsNavigatorComponent;
  let fixture: ComponentFixture<PlaylistsNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistsNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
