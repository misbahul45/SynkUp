import 'package:flutter_bloc/flutter_bloc.dart';
import 'auth_event.dart';
import 'auth_state.dart';
import 'package:app/features/auth/data/services/auth_service.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final _storage = const FlutterSecureStorage();

  AuthBloc() : super(AuthInitial()) {
    on<AppStarted>(_onAppStarted);
    on<LoginRequested>(_onLogin);
    on<RegisterRequested>(_onRegister);
    on<LogoutRequested>(_onLogout);
  }

  Future<void> _onAppStarted(
    AppStarted event,
    Emitter<AuthState> emit,
  ) async {
    final token = await _storage.read(key: "token");

    if (token != null) {
      try {
        final user = await AuthService.getProfile(token);
        emit(AuthAuthenticated(user, token));
      } catch (_) {
        emit(AuthUnauthenticated());
      }
    } else {
      emit(AuthUnauthenticated());
    }
  }

  Future<void> _onLogin(
    LoginRequested event,
    Emitter<AuthState> emit,
  ) async {
    emit(AuthLoading());

    try {
      final res = await AuthService.login(event.dto);

      await _storage.write(key: "token", value: res.token);

      emit(AuthAuthenticated(res.user, res.token));
    } catch (_) {
      emit(AuthError("Login failed"));
    }
  }

  Future<void> _onRegister(
    RegisterRequested event,
    Emitter<AuthState> emit,
  ) async {
    emit(AuthLoading());

    try {
      final res = await AuthService.register(event.dto);

      await _storage.write(key: "token", value: res.token);

      emit(AuthAuthenticated(res.user, res.token));
    } catch (_) {
      emit(AuthError("Register failed"));
    }
  }

  Future<void> _onLogout(
    LogoutRequested event,
    Emitter<AuthState> emit,
  ) async {
    emit(AuthLoading());

    try {
      final token = await _storage.read(key: "token");

      if (token != null) {
        await AuthService.logout(token);
      }

      await _storage.delete(key: "token");

      emit(AuthUnauthenticated());
    } catch (_) {
      emit(AuthError("Logout failed"));
    }
  }
}
