import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function SignInScreen({
  onSignUp,
  onLoginSuccess,
  onForgotPassword,
  registeredUser,
  onBack,
}) {
  const [email, setEmail] = useState(registeredUser?.email || '');
  const [password, setPassword] = useState(registeredUser?.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Cập nhật khi có tài khoản đăng ký mới
  useEffect(() => {
    if (registeredUser?.email) {
      setEmail(registeredUser.email);
    }
    if (registeredUser?.password) {
      setPassword(registeredUser.password);
    }
  }, [registeredUser]);

  const handleLogin = () => {
    const inputEmail = email.trim();
    const inputPassword = password.trim();

    // Nếu chưa nhập email hoặc mật khẩu
    if (!inputEmail || !inputPassword) {
      const msg = 'Vui lòng nhập đầy đủ Email và Mật khẩu (hoặc bấm Sign up để đăng ký tài khoản mới)!';
      if (Platform.OS === 'web') {
        window.alert(msg);
      } else {
        Alert.alert('Thông báo', msg);
      }
      return;
    }

    // Nếu đã đăng ký tài khoản qua Sign Up thì kiểm tra xem có khớp không
    if (registeredUser) {
      if (registeredUser.email !== inputEmail || (registeredUser.password && registeredUser.password !== inputPassword)) {
        const msg = 'Email hoặc mật khẩu không chính xác với tài khoản đã đăng ký!';
        if (Platform.OS === 'web') {
          window.alert(msg);
        } else {
          Alert.alert('Lỗi đăng nhập', msg);
        }
        return;
      }
    }

    // Đăng nhập thành công -> tiếp tục đến màn hình Verification
    onLoginSuccess?.();
  };

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
          {onBack && (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={onBack}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#120D26" />
            </TouchableOpacity>
          )}

          {/* Logo & Brand Name */}
          <View style={styles.logoBox}>
            <Image
              source={require('../assets/image/Group.png')}
              style={styles.logoIcon}
              resizeMode="contain"
            />
            <Text style={styles.brandTitle}>EventHub</Text>
          </View>

          {/* Heading */}
          <Text style={styles.heading}>Sign in</Text>

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
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="oneTimeCode"
              autoComplete="off"
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

          {/* Remember Me & Forgot Password Row */}
          <View style={styles.optionsRow}>
            <View style={styles.rememberMeRow}>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{ false: '#E0E0E0', true: '#5669FF' }}
                thumbColor="#FFFFFF"
                style={styles.switchControl}
              />
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>

            <TouchableOpacity onPress={onForgotPassword} activeOpacity={0.7}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleLogin}
            style={styles.mainBtn}
          >
            <View style={styles.mainBtnContent}>
              <Text style={styles.mainBtnText}>SIGN IN</Text>
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
            <Text style={styles.footerText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={onSignUp}>
              <Text style={styles.footerLink}>Sign up</Text>
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
    paddingTop: 20,
    paddingBottom: 30,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 8,
  },
  logoBox: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logoIcon: {
    width: 56,
    height: 59,
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#120D26',
    letterSpacing: -0.5,
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 2,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchControl: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  rememberMeText: {
    fontSize: 13,
    color: '#120D26',
  },
  forgotText: {
    fontSize: 13,
    color: '#120D26',
    fontWeight: '500',
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
