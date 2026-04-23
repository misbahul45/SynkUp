class ApiConstants {
  static const String baseUrl = 'http://localhost:3000/api/v1';
  static const String authLogin = '/auth/login';
  static const String authRegister = '/auth/signup';
  static const String feed = '/posts';
  static const String search = '/search';
  static const String notifications = '/notifications';
}

class EnvConfig {
  static const String baseUrl = 'http://localhost:3000/api/v1';
  static const bool isDebug = true;
  static const bool enableLogging = true;
}