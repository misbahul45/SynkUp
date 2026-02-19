import 'dart:convert';
import 'package:app/core/config/env.dart';
import 'package:app/features/auth/data/models/login_response.dart';
import 'package:app/features/auth/data/models/login_dto.dart';
import 'package:app/features/auth/data/models/register_dto.dart';
import 'package:app/features/auth/data/models/user_model.dart';
import 'package:http/http.dart' as http;

class AuthService {
  static String url = Env.API;

  static Future<LoginResponse> login(LoginDto dto) async {
    final response = await http.post(
      Uri.parse("$url/auth/sign-in/email"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode(dto.toJson()),
    );

    if (response.statusCode == 200) {
      return LoginResponse.fromJson(jsonDecode(response.body));
    } else {
      throw Exception("Login failed");
    }
  }

  static Future<LoginResponse> register(RegisterDto dto) async {
    final response = await http.post(
      Uri.parse("$url/auth/sign-up/email"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode(dto.toJson()),
    );

    if (response.statusCode == 200) {
      return LoginResponse.fromJson(jsonDecode(response.body));
    } else {
      throw Exception("Register failed");
    }
  }

  static Future<UserModel> getProfile(String token) async {
    final response = await http.get(
      Uri.parse("$url/auth/me"),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $token",
      },
    );

    if (response.statusCode == 200) {
      return UserModel.fromJson(jsonDecode(response.body));
    } else {
      throw Exception("Failed to get profile");
    }
  }

  static Future<void> logout(String token) async {
    await http.post(
      Uri.parse("$url/auth/logout"),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $token",
      },
    );
  }
}
