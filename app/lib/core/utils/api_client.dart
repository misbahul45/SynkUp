import 'dart:convert';
import 'package:http/http.dart' as http;
import 'api_response.dart';

class ApiClient {
  static const Map<String, String> _headers = {
    "Content-Type": "application/json",
  };

  static Future<ApiResponse<Map<String, dynamic>>> request({
    required String method,
    required String url,
    Map<String, dynamic>? body,
  }) async {
    try {
      final req = http.Request(method, Uri.parse(url));
      req.headers.addAll(_headers);

      if (body != null) {
        req.body = jsonEncode(body);
      }

      final streamed = await req.send();
      final res = await http.Response.fromStream(streamed);

      final json = res.body.isNotEmpty ? jsonDecode(res.body) : {};

      final status = json["status"];

      if (res.statusCode >= 200 && res.statusCode < 300 &&
          status == "success") {
        return ApiResponse.success(
          json["data"],
          res.statusCode,
        );
      }

      return ApiResponse.error(
        json["message"] ?? "Unknown error",
        res.statusCode,
      );
    } catch (e) {
      return ApiResponse.error("Network error", null);
    }
  }

  static Future<ApiResponse<Map<String, dynamic>>> get(String url) =>
      request(method: "GET", url: url);

  static Future<ApiResponse<Map<String, dynamic>>> post(
    String url,
    Map<String, dynamic> body,
  ) =>
      request(method: "POST", url: url, body: body);

  static Future<ApiResponse<Map<String, dynamic>>> put(
    String url,
    Map<String, dynamic> body,
  ) =>
      request(method: "PUT", url: url, body: body);

  static Future<ApiResponse<Map<String, dynamic>>> delete(String url) =>
      request(method: "DELETE", url: url);
}
