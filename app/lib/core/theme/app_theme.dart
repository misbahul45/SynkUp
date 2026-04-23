import 'package:flutter/material.dart';
import '../constants/app_colors.dart';
import '../constants/app_typography.dart';
import '../constants/app_spacing.dart';

class AppTheme {
  static ThemeData get lightTheme => ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    colorScheme: const ColorScheme.light(
      primary: AppColors.primary,
      secondary: AppColors.accentPrimary,
      tertiary: AppColors.accentSecondary,
      surface: AppColors.white,
      error: AppColors.error,
    ),
    scaffoldBackgroundColor: AppColors.background,
    textTheme: TextTheme(
      displayLarge: AppTypography.heading1.copyWith(color: AppColors.textDark),
      displayMedium: AppTypography.heading2.copyWith(color: AppColors.textDark),
      displaySmall: AppTypography.heading3.copyWith(color: AppColors.textDark),
      bodyLarge: AppTypography.bodyLarge.copyWith(color: AppColors.textDark),
      bodyMedium: AppTypography.bodyMedium.copyWith(color: AppColors.textDark),
      bodySmall: AppTypography.bodySmall.copyWith(color: AppColors.textDark),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true, fillColor: AppColors.background,
      contentPadding: const EdgeInsets.symmetric(horizontal: AppSpacing.base, vertical: AppSpacing.md),
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
      enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
      focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: AppColors.primary, width: 1.5)),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.accentPrimary, foregroundColor: AppColors.white,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.white, foregroundColor: AppColors.primary,
      elevation: 0, centerTitle: true,
    ),
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
      backgroundColor: AppColors.white, selectedItemColor: AppColors.accentPrimary,
      unselectedItemColor: AppColors.primary, type: BottomNavigationBarType.fixed,
    ),
  );
}