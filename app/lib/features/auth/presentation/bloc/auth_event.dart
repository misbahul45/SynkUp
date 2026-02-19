import 'package:app/features/auth/data/models/login_dto.dart';
import 'package:app/features/auth/data/models/register_dto.dart';

abstract class AuthEvent {}

class LoginRequested extends AuthEvent {
  final LoginDto dto;

  LoginRequested(this.dto);
}

class RegisterRequested extends AuthEvent {
  final RegisterDto dto;

  RegisterRequested(this.dto);
}

class LogoutRequested extends AuthEvent {
  LogoutRequested();
}

class AppStarted extends AuthEvent {}
