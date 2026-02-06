import 'package:flutter/material.dart';

class Pallete {
  // ✅ Base Purple Color (from image)
  static const Color primaryColor = Color(0xFFA294F9);

  // ✅ Soft Variations
  static const Color lightPurple1 = Color(0xFFF3F0FF);
  static const Color lightPurple2 = Color(0xFFE6E0FF);
  static const Color lightPurple3 = Color(0xFFD2C9FF);

  // ✅ Darker Purple
  static const Color darkPurple = Color(0xFF7B6CF6);

  // ✅ Neutral Colors
  static const Color whiteColor = Colors.white;
  static const Color blackColor = Colors.black;
  static const Color greyText = Color(0xFF555555);

  // ---------------------------
  // ✅ Light Theme
  // ---------------------------
  static final ThemeData lightModeAppTheme = ThemeData.light().copyWith(
    scaffoldBackgroundColor: lightPurple1,

    appBarTheme: const AppBarTheme(
      backgroundColor: lightPurple1,
      elevation: 0,
      iconTheme: IconThemeData(color: blackColor),
    ),

    colorScheme: const ColorScheme.light().copyWith(
      primary: primaryColor,
      secondary: darkPurple,
      background: lightPurple1,
      surface: whiteColor,
    ),

    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryColor,
        foregroundColor: whiteColor,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    ),

    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: whiteColor,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide.none,
      ),
    ),
  );

  // ---------------------------
  // ✅ Dark Theme (optional)
  // ---------------------------
  static final ThemeData darkModeAppTheme = ThemeData.dark().copyWith(
    scaffoldBackgroundColor: Colors.black,

    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.black,
      elevation: 0,
    ),

    colorScheme: const ColorScheme.dark().copyWith(
      primary: primaryColor,
      secondary: darkPurple,
      background: Colors.black,
      surface: Color(0xFF1E1E1E),
    ),
  );
}
