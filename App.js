import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import Onboarding1Screen from './src/screens/Onboarding1Screen';
import Onboarding2Screen from './src/screens/Onboarding2Screen';
import Onboarding3Screen from './src/screens/Onboarding3Screen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import VerificationScreen from './src/screens/VerificationScreen';

export default function App() {
  // 1. Luôn khởi đầu từ màn hình 'splash'
  const [currentScreen, setCurrentScreen] = useState('splash');
  // Lưu thông tin tài khoản đã đăng ký để kiểm tra khi đăng nhập
  const [registeredUser, setRegisteredUser] = useState(null);

  return (
    <View style={styles.container}>
      {/* 1. Màn hình Splash */}
      {currentScreen === 'splash' && (
        <SplashScreen onFinish={() => setCurrentScreen('onboarding1')} />
      )}

      {/* 2. Màn hình Onboarding 1 */}
      {currentScreen === 'onboarding1' && (
        <Onboarding1Screen
          onNext={() => setCurrentScreen('onboarding2')}
          onSkip={() => setCurrentScreen('signin')}
        />
      )}

      {/* 3. Màn hình Onboarding 2 */}
      {currentScreen === 'onboarding2' && (
        <Onboarding2Screen
          onNext={() => setCurrentScreen('onboarding3')}
          onSkip={() => setCurrentScreen('signin')}
        />
      )}

      {/* 4. Màn hình Onboarding 3 */}
      {currentScreen === 'onboarding3' && (
        <Onboarding3Screen
          onNext={() => setCurrentScreen('signin')}
          onSkip={() => setCurrentScreen('signin')}
        />
      )}

      {/* 5. Màn hình Sign In (Trước Sign Up; có tài khoản rồi thì đăng nhập được ngay) */}
      {currentScreen === 'signin' && (
        <SignInScreen
          registeredUser={registeredUser}
          onBack={() => setCurrentScreen('onboarding3')}
          onSignUp={() => setCurrentScreen('signup')}
          onLoginSuccess={() => setCurrentScreen('verification')}
          onForgotPassword={() => setCurrentScreen('verification')}
        />
      )}

      {/* 6. Màn hình Sign Up (Dành cho người dùng chưa có tài khoản đăng ký) */}
      {currentScreen === 'signup' && (
        <SignUpScreen
          onBack={() => setCurrentScreen('signin')}
          onSignIn={() => setCurrentScreen('signin')}
          onSignUpSuccess={(userData) => {
            setRegisteredUser(userData);
            alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
            setCurrentScreen('signin');
          }}
        />
      )}

      {/* 7. Màn hình Verification (Đăng nhập thành công mới verify) */}
      {currentScreen === 'verification' && (
        <VerificationScreen
          phoneNumber="+1 2620 0323 7631"
          onBack={() => setCurrentScreen('signin')}
          onSuccess={(code) => {
            alert(`Xác thực thành công với mã: ${code}`);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
