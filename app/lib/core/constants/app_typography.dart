import 'package:flutter/material.dart';

class AppTypography {
  static const String fontFamily = 'Inter';
  static const TextStyle heading1 = TextStyle(fontFamily: fontFamily, fontSize: 24, fontWeight: FontWeight.w700, letterSpacing: -0.02);
  static const TextStyle heading2 = TextStyle(fontFamily: fontFamily, fontSize: 20, fontWeight: FontWeight.w600, letterSpacing: -0.02);
  static const TextStyle heading3 = TextStyle(fontFamily: fontFamily, fontSize: 18, fontWeight: FontWeight.w600, letterSpacing: -0.02);
  static const TextStyle bodyLarge = TextStyle(fontFamily: fontFamily, fontSize: 16, fontWeight: FontWeight.w400, height: 1.5);
  static const TextStyle bodyMedium = TextStyle(fontFamily: fontFamily, fontSize: 14, fontWeight: FontWeight.w400, height: 1.5);
  static const TextStyle bodySmall = TextStyle(fontFamily: fontFamily, fontSize: 12, fontWeight: FontWeight.w400);
  static const TextStyle caption = TextStyle(fontFamily: fontFamily, fontSize: 12, fontWeight: FontWeight.w500);
  static const TextStyle button = TextStyle(fontFamily: fontFamily, fontSize: 16, fontWeight: FontWeight.w600);
  static const TextStyle link = TextStyle(fontFamily: fontFamily, fontSize: 14, fontWeight: FontWeight.w500, color: Color(0xFF5CB8C5));
}