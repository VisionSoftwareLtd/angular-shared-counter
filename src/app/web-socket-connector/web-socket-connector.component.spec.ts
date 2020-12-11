import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSocketConnectorComponent } from './web-socket-connector.component';

describe('WebSocketConnectorComponent', () => {
  let component: WebSocketConnectorComponent;
  let fixture: ComponentFixture<WebSocketConnectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebSocketConnectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSocketConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
