import 'package:app/core/contants/contants.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({ Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar:AppBar(
        centerTitle: true,
        title: Image.asset(
          Contants.logo,
          height: 40,
          width: 40,
        ),
      ),
    );
  }
}