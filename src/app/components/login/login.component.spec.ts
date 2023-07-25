import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthService} from "../../services/auth-service.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, BrowserModule],
      providers: [AuthService, HttpHandler, HttpClient]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call authService.login with the correct username and password', () => {
    const username = 'testUser';
    const password = 'testPassword';

    spyOn(authService, 'login');

    component.username = username;
    component.password = password;

    component.login();

    expect(authService.login).toHaveBeenCalledWith(username, password);
  });

});
