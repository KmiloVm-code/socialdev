import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Auth } from './auth';
import { ApiService } from '../api';
import { Auth as AuthModel } from '../../models/auth';
import { User } from '../../models/user';
import { of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';

describe('Auth', () => {
  let service: Auth;
  let apiService: jasmine.SpyObj<ApiService>;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    _id: '123',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
  };

  const mockAuth: AuthModel = {
    id: '123',
    email: 'test@example.com',
    token: 'mock-token-123',
    user: mockUser,
  };

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['get', 'post', 'put', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        Auth,
        { provide: ApiService, useValue: apiServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    // Mock verifySession to prevent automatic session check during service initialization
    apiServiceSpy.get.and.returnValue(throwError(() => new Error('No session')));

    service = TestBed.inject(Auth);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('register', () => {
    it('should register a new user successfully', (done) => {
      const registerData = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123',
      };

      const mockResponse = { message: 'User registered successfully' };

      apiService.post.and.returnValue(of(mockResponse));

      service.register(registerData.name, registerData.email, registerData.password).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
          expect(apiService.post).toHaveBeenCalledWith('/auth/register', registerData, true);
          done();
        },
        error: done.fail,
      });
    });

    it('should mark session as checked after registration', (done) => {
      const mockResponse = { message: 'User registered successfully' };
      apiService.post.and.returnValue(of(mockResponse));

      service.sessionChecked$.pipe(take(1)).subscribe({
        next: (checked) => {
          if (checked) {
            expect(checked).toBe(true);
            done();
          }
        },
      });

      service.register('User', 'user@example.com', 'pass').subscribe();
    });

    it('should allow withCredentials to be set to false', (done) => {
      const mockResponse = { message: 'User registered successfully' };
      apiService.post.and.returnValue(of(mockResponse));

      service.register('User', 'user@example.com', 'pass', false).subscribe({
        next: () => {
          expect(apiService.post).toHaveBeenCalledWith(
            '/auth/register',
            { name: 'User', email: 'user@example.com', password: 'pass' },
            false
          );
          done();
        },
      });
    });
  });

  describe('login', () => {
    it('should login user successfully and update current user', (done) => {
      apiService.post.and.returnValue(of(mockAuth));

      service.login('test@example.com', 'password123').subscribe({
        next: (auth) => {
          expect(auth).toEqual(mockAuth);
          expect(apiService.post).toHaveBeenCalledWith(
            '/auth/login',
            { email: 'test@example.com', password: 'password123' },
            true
          );
          done();
        },
        error: done.fail,
      });
    });

    it('should update currentUser$ observable after login', (done) => {
      apiService.post.and.returnValue(of(mockAuth));

      service.currentUser$.subscribe({
        next: (user) => {
          if (user) {
            expect(user).toEqual(mockUser);
            expect(user._id).toBe('123');
            expect(user.email).toBe('test@example.com');
            done();
          }
        },
      });

      service.login('test@example.com', 'password123').subscribe();
    });

    it('should mark session as checked after login', (done) => {
      apiService.post.and.returnValue(of(mockAuth));

      let sessionCheckedEmissions = 0;

      service.sessionChecked$.subscribe({
        next: (checked) => {
          sessionCheckedEmissions++;
          if (sessionCheckedEmissions === 2 && checked) {
            expect(checked).toBe(true);
            done();
          }
        },
      });

      service.login('test@example.com', 'password123').subscribe();
    });

    it('should allow withCredentials to be set to false', (done) => {
      apiService.post.and.returnValue(of(mockAuth));

      service.login('test@example.com', 'password', false).subscribe({
        next: () => {
          expect(apiService.post).toHaveBeenCalledWith(
            '/auth/login',
            { email: 'test@example.com', password: 'password' },
            false
          );
          done();
        },
      });
    });
  });

  describe('logout', () => {
    it('should logout user successfully', (done) => {
      apiService.post.and.returnValue(of(void 0));

      service.logout().subscribe({
        next: () => {
          expect(apiService.post).toHaveBeenCalledWith('/auth/logout', {}, true);
          done();
        },
        error: done.fail,
      });
    });

    it('should clear current user after logout', (done) => {
      // First login
      apiService.post.and.returnValue(of(mockAuth));
      service.login('test@example.com', 'password').subscribe();

      // Then logout
      apiService.post.and.returnValue(of(void 0));

      let emissions = 0;
      service.currentUser$.subscribe({
        next: (user) => {
          emissions++;
          if (emissions === 2) {
            expect(user).toBeNull();
            done();
          }
        },
      });

      service.logout().subscribe();
    });

    it('should mark session as checked after logout', (done) => {
      apiService.post.and.returnValue(of(void 0));

      let sessionCheckedEmissions = 0;

      service.sessionChecked$.subscribe({
        next: (checked) => {
          sessionCheckedEmissions++;
          if (sessionCheckedEmissions === 2 && checked) {
            expect(checked).toBe(true);
            done();
          }
        },
      });

      service.logout().subscribe();
    });

    it('should allow withCredentials to be set to false', (done) => {
      apiService.post.and.returnValue(of(void 0));

      service.logout(false).subscribe({
        next: () => {
          expect(apiService.post).toHaveBeenCalledWith('/auth/logout', {}, false);
          done();
        },
      });
    });
  });

  describe('getCurrentUser', () => {
    it('should get current user successfully', (done) => {
      apiService.get.and.returnValue(of(mockUser));

      service.getCurrentUser().subscribe({
        next: (user) => {
          expect(user).toEqual(mockUser);
          expect(apiService.get).toHaveBeenCalledWith('/auth/me', true);
          done();
        },
        error: done.fail,
      });
    });

    it('should update currentUser$ observable after getting current user', (done) => {
      apiService.get.and.returnValue(of(mockUser));

      const subscription = service.currentUser$.subscribe({
        next: (user) => {
          if (user) {
            expect(user).toEqual(mockUser);
            subscription.unsubscribe();
            done();
          }
        },
      });

      service.getCurrentUser().subscribe();
    });

    it('should allow withCredentials to be set to false', (done) => {
      apiService.get.and.returnValue(of(mockUser));

      service.getCurrentUser(false).subscribe({
        next: () => {
          expect(apiService.get).toHaveBeenCalledWith('/auth/me', false);
          done();
        },
      });
    });
  });

  describe('verifySession', () => {
    it('should verify session successfully when user exists', (done) => {
      apiService.get.and.returnValue(of(mockUser));

      service.verifySession().subscribe({
        next: (isValid) => {
          expect(isValid).toBe(true);
          expect(apiService.get).toHaveBeenCalledWith('/auth/me', true);
          done();
        },
        error: done.fail,
      });
    });

    it('should update currentUser$ when session is valid', (done) => {
      apiService.get.and.returnValue(of(mockUser));

      const subscription = service.currentUser$.subscribe({
        next: (user) => {
          if (user) {
            expect(user).toEqual(mockUser);
            subscription.unsubscribe();
            done();
          }
        },
      });

      service.verifySession().subscribe();
    });

    it('should return false when session is invalid', (done) => {
      apiService.get.and.returnValue(throwError(() => new Error('Unauthorized')));

      service.verifySession().subscribe({
        next: (isValid) => {
          expect(isValid).toBe(false);
          done();
        },
        error: done.fail,
      });
    });

    it('should clear currentUser$ when session is invalid', (done) => {
      // First set a user
      apiService.get.and.returnValue(of(mockUser));
      service.getCurrentUser().subscribe();

      // Then verify session fails
      apiService.get.and.returnValue(throwError(() => new Error('Unauthorized')));

      let emissions = 0;
      service.currentUser$.subscribe({
        next: (user) => {
          emissions++;
          if (emissions === 2) {
            expect(user).toBeNull();
            done();
          }
        },
      });

      service.verifySession().subscribe();
    });

    it('should mark session as checked after verification', (done) => {
      apiService.get.and.returnValue(of(mockUser));

      let sessionCheckedEmissions = 0;

      service.sessionChecked$.subscribe({
        next: (checked) => {
          sessionCheckedEmissions++;
          if (sessionCheckedEmissions === 2 && checked) {
            expect(checked).toBe(true);
            done();
          }
        },
      });

      service.verifySession().subscribe();
    });

    it('should mark session as checked even when verification fails', (done) => {
      apiService.get.and.returnValue(throwError(() => new Error('Unauthorized')));

      let sessionCheckedEmissions = 0;

      service.sessionChecked$.subscribe({
        next: (checked) => {
          sessionCheckedEmissions++;
          if (sessionCheckedEmissions === 2 && checked) {
            expect(checked).toBe(true);
            done();
          }
        },
      });

      service.verifySession().subscribe();
    });
  });

  describe('isAuthenticated', () => {
    it('should return false when no user is logged in', () => {
      expect(service.isAuthenticated()).toBe(false);
    });

    it('should return true when user is logged in', (done) => {
      apiService.post.and.returnValue(of(mockAuth));

      service.login('test@example.com', 'password').subscribe({
        next: () => {
          expect(service.isAuthenticated()).toBe(true);
          done();
        },
      });
    });

    it('should return false after logout', (done) => {
      // First login
      apiService.post.and.returnValue(of(mockAuth));
      service.login('test@example.com', 'password').subscribe({
        next: () => {
          expect(service.isAuthenticated()).toBe(true);

          // Then logout
          apiService.post.and.returnValue(of(void 0));
          service.logout().subscribe({
            next: () => {
              expect(service.isAuthenticated()).toBe(false);
              done();
            },
          });
        },
      });
    });

    it('should return true when getCurrentUser succeeds', (done) => {
      apiService.get.and.returnValue(of(mockUser));

      service.getCurrentUser().subscribe({
        next: () => {
          expect(service.isAuthenticated()).toBe(true);
          done();
        },
      });
    });
  });

  describe('Observable streams', () => {
    it('currentUser$ should emit null initially', (done) => {
      service.currentUser$
        .subscribe({
          next: (user) => {
            expect(user).toBeNull();
            done();
          },
        })
        .unsubscribe();
    });

    it('sessionChecked$ should emit true after initialization', (done) => {
      service.sessionChecked$.subscribe({
        next: (checked) => {
          if (checked) {
            expect(checked).toBe(true);
            done();
          }
        },
      });
    });

    it('should handle multiple subscribers to currentUser$', (done) => {
      apiService.post.and.returnValue(of(mockAuth));

      let subscriber1Received = false;
      let subscriber2Received = false;

      // Add initial expectation
      expect(subscriber1Received).toBe(false);
      expect(subscriber2Received).toBe(false);

      service.currentUser$.subscribe({
        next: (user) => {
          if (user) {
            subscriber1Received = true;
            checkBothReceived();
          }
        },
      });

      service.currentUser$.subscribe({
        next: (user) => {
          if (user) {
            subscriber2Received = true;
            checkBothReceived();
          }
        },
      });

      function checkBothReceived() {
        if (subscriber1Received && subscriber2Received) {
          expect(subscriber1Received).toBe(true);
          expect(subscriber2Received).toBe(true);
          done();
        }
      }

      service.login('test@example.com', 'password').subscribe();
    });
  });
});
