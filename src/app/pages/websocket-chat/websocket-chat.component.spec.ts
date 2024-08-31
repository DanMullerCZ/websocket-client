import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsocketChatComponent } from './websocket-chat.component';

describe('WebsocketChatComponent', () => {
  let component: WebsocketChatComponent;
  let fixture: ComponentFixture<WebsocketChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsocketChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsocketChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
