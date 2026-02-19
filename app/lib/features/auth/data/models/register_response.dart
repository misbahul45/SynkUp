import 'package:app/features/auth/data/models/user_model.dart';

class RegisterResponse {
  final String token;
  final UserModel user;

  RegisterResponse({required this.token, required this.user});

  factory RegisterResponse.fromJson(Map<String, dynamic> json) {
    return RegisterResponse(
      token: json["token"],
      user: UserModel.fromJson(json["user"]),
    );
  }
}
