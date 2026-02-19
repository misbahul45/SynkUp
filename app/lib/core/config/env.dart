import 'package:flutter_dotenv/flutter_dotenv.dart';

class Env {
  static String get API => dotenv.env['API_URL'] ?? '';
}