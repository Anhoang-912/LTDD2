import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function SignUpScreen({ onSignIn, onSignUpSuccess }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={onSignIn}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#120D26" />
          </TouchableOpacity>

          {/* Heading */}
          <Text style={styles.heading}>Sign up</Text>

          {/* Input Full Name */}
          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color="#807A7A" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Full name"
              placeholderTextColor="#747688"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Input Email */}
          <View style={styles.inputContainer}>
            <Feather name="mail" size={20} color="#807A7A" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="abc@email.com"
              placeholderTextColor="#747688"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Input Password */}
          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#807A7A" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Your password"
              placeholderTextColor="#747688"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIconBtn}
            >
              <Feather
                name={showPassword ? 'eye' : 'eye-off'}
                size={18}
                color="#807A7A"
              />
            </TouchableOpacity>
          </View>

          {/* Input Confirm Password */}
          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#807A7A" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Confirm password"
              placeholderTextColor="#747688"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIconBtn}
            >
              <Feather
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={18}
                color="#807A7A"
              />
            </TouchableOpacity>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onSignUpSuccess}
            style={styles.mainBtn}
          >
            <View style={styles.mainBtnContent}>
              <Text style={styles.mainBtnText}>SIGN UP</Text>
              <View style={styles.arrowCircle}>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Divider Text */}
          <Text style={styles.orText}>OR</Text>

          {/* Login with Google */}
          <TouchableOpacity activeOpacity={0.85} style={styles.socialBtn}>
            <Image
              source={require('../assets/image/ic_google.png')}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text style={styles.socialBtnText}>Login with Google</Text>
          </TouchableOpacity>

          {/* Login with Facebook */}
          <TouchableOpacity activeOpacity={0.85} style={styles.socialBtn}>
            <Image
              source={require('../assets/image/ic-fb.png')}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text style={styles.socialBtnText}>Login with Facebook</Text>
          </TouchableOpacity>

          {/* Footer Link */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={onSignIn}>
              <Text style={styles.footerLink}>Signin</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 30,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#120D26',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    height: '100%',
    color: '#120D26',
    fontSize: 14,
  },
  eyeIconBtn: {
    padding: 6,
  },
  mainBtn: {
    height: 58,
    backgroundColor: '#5669FF',
    borderRadius: 15,
    justifyContent: 'center',
    shadowColor: '#5669FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 8,
    marginBottom: 16,
  },
  mainBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mainBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  arrowCircle: {
    position: 'absolute',
    right: 14,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3D50DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#9D9898',
    marginVertical: 14,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#D3D1D8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 14,
  },
  socialBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#120D26',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#120D26',
  },
  footerLink: {
    fontSize: 14,
    color: '#5669FF',
    fontWeight: '600',
  },
});
