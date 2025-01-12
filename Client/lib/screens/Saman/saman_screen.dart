import 'package:client/screens/Home%20Page/home_screen.dart';
import 'package:client/screens/Saman/Saman%20Form/saman_form.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SamanScreen extends StatefulWidget {
  final String userId;

  const SamanScreen({Key? key, required this.userId}) : super(key: key);

  @override
  State<SamanScreen> createState() => _SamanScreenState();
}

class _SamanScreenState extends State<SamanScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        foregroundColor: Colors.black,
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
        title: Text("Saman"),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            // Navigate to a specific page when the back button is pressed
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                builder: (context) => HomePage(userId: widget.userId), // Replace `HomePage` with your desired page
              ),
            );
          },
        ),
      ),

      body: SamanForm(userId: widget.userId),
    );
  }
}
