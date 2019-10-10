import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsEditorComponent } from './playlists-editor.component';

describe('PlaylistsEditorComponent', () => {
  let component: PlaylistsEditorComponent;
  let fixture: ComponentFixture<PlaylistsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
