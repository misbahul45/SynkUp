import 'user_model.dart';

class LoginResponse {
  final bool redirect;
  final String token;
  final UserModel user;

  LoginResponse({
    required this.redirect,
    required this.token,
    required this.user,
  });

  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return LoginResponse(
      redirect: json["redirect"],
      token: json["token"],
      user: UserModel.fromJson(json["user"]),
    );
  }
}
