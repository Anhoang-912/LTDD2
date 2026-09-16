import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import Onboarding1Screen from './src/screens/Onboarding1Screen';
import Onboarding2Screen from './src/screens/Onboarding2Screen';
import Onboarding3Screen from './src/screens/Onboarding3Screen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import MenuWhiteScreen from './src/screens/MenuWhiteScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';

export default function App() {
  // Đặt mặc định 'eventDetails' để bạn xem và kiểm tra ngay màn hình mới
  // (Bạn có thể đổi thành 'home' hoặc 'splash' để chạy các luồng khác)
  const [currentScreen, setCurrentScreen] = useState('eventDetails');
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

      {/* 5. Màn hình Sign In */}
      {currentScreen === 'signin' && (
        <SignInScreen
          registeredUser={registeredUser}
          onBack={() => setCurrentScreen('onboarding3')}
          onSignUp={() => setCurrentScreen('signup')}
          onLoginSuccess={() => setCurrentScreen('verification')}
          onForgotPassword={() => setCurrentScreen('resetPassword')}
        />
      )}

      {/* 6. Màn hình Sign Up */}
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

      {/* 7. Màn hình Verification */}
      {currentScreen === 'verification' && (
        <VerificationScreen
          phoneNumber="+1 2620 0323 7631"
          onBack={() => setCurrentScreen('signin')}
          onSuccess={(code) => {
            alert(`Xác thực thành công với mã: ${code}`);
            setCurrentScreen('home');
          }}
        />
      )}

      {/* 8. Màn hình Reset Password */}
      {currentScreen === 'resetPassword' && (
        <ResetPasswordScreen
          onBack={() => setCurrentScreen('signin')}
          onSendSuccess={(email) => {
            alert(`Mã xác nhận đặt lại mật khẩu đã được gửi tới ${email}!`);
            setCurrentScreen('verification');
          }}
        />
      )}

      {/* 9. Màn hình Home (Trang chủ) */}
      {currentScreen === 'home' && (
        <HomeScreen
          onOpenMenu={() => setCurrentScreen('menuWhite')}
          onEventPress={() => setCurrentScreen('eventDetails')}
        />
      )}

      {/* 10. Màn hình Menu White (Khi bấm dấu 3 gạch ở trang Home) */}
      {currentScreen === 'menuWhite' && (
        <MenuWhiteScreen
          onClose={() => setCurrentScreen('home')}
          onSignOut={() => setCurrentScreen('signin')}
        />
      )}

      {/* 11. Màn hình Event Details (Chi tiết sự kiện) */}
      {currentScreen === 'eventDetails' && (
        <EventDetailsScreen
          onBack={() => setCurrentScreen('home')}
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
