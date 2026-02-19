import 'package:app/core/router/app_routes.dart';
import 'package:app/features/auth/data/models/register_dto.dart';
import 'package:app/features/auth/presentation/bloc/auth_bloc.dart';
import 'package:app/features/auth/presentation/bloc/auth_event.dart';
import 'package:app/features/auth/presentation/bloc/auth_state.dart';
import 'package:app/features/auth/presentation/widgets/auth_button.dart';
import 'package:app/features/auth/presentation/widgets/auth_text_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class RegisterScreen extends StatelessWidget {
  final nameCtrl = TextEditingController();
  final emailCtrl = TextEditingController();
  final passCtrl = TextEditingController();
  final confirmPassCtrl = TextEditingController();

  RegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: BlocConsumer<AuthBloc, AuthState>(
          listener: (context, state) {
            if (state is AuthAuthenticated) {
              Navigator.pushReplacementNamed(context, AppRoutes.home);
            }

            if (state is AuthError) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text(state.message)),
              );
            }
          },
          builder: (context, state) {
            final loading = state is AuthLoading;

            return SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const SizedBox(height: 60),

                  const Text(
                    "Create Account 🚀",
                    style: TextStyle(
                      fontSize: 26,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 40),

                  AuthTextField(
                    hint: "Full Name",
                    controller: nameCtrl,
                  ),

                  const SizedBox(height: 16),

                  AuthTextField(
                    hint: "Email",
                    controller: emailCtrl,
                  ),

                  const SizedBox(height: 16),

                  AuthTextField(
                    hint: "Password",
                    controller: passCtrl,
                    obscure: true,
                  ),

                  const SizedBox(height: 16),

                  AuthTextField(
                    hint: "Confirm Password",
                    controller: confirmPassCtrl,
                    obscure: true,
                  ),

                  const SizedBox(height: 24),

                  AuthButton(
                    text: "Register",
                    loading: loading,
                    onPressed: () {
                      if (passCtrl.text != confirmPassCtrl.text) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text("Password tidak sama"),
                          ),
                        );
                        return;
                      }

                      context.read<AuthBloc>().add(
                            RegisterRequested(
                              RegisterDto(
                                name: nameCtrl.text.trim(),
                                email: emailCtrl.text.trim(),
                                password: passCtrl.text.trim(),
                              ),
                            ),
                          );
                    },
                  ),

                  const SizedBox(height: 24),

                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text("Already have an account? "),
                      GestureDetector(
                        onTap: () {
                          Navigator.pushNamed(
                              context, AppRoutes.login);
                        },
                        child: const Text(
                          "Login",
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Colors.blue,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
