import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import Onboarding1Screen from './src/screens/Onboarding1Screen';
import Onboarding2Screen from './src/screens/Onboarding2Screen';
import Onboarding3Screen from './src/screens/Onboarding3Screen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

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
          onSignUp={() => setCurrentScreen('signup')}
          onLoginSuccess={() => alert('Đăng nhập thành công!')}
        />
      )}

      {/* 6. Màn hình Sign Up */}
      {currentScreen === 'signup' && (
        <SignUpScreen
          onSignIn={() => setCurrentScreen('signin')}
          onSignUpSuccess={() => setCurrentScreen('signin')}
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
