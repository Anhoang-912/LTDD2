import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

export default function App() {
  // Thứ tự màn hình: Splash hiển thị đầu tiên -> sau đó đến Onboarding
  const [stage, setStage] = useState('splash'); // 'splash' | 'onboarding'

  const handleSplashFinish = () => {
    setStage('onboarding');
  };

  const handleOnboardingFinish = () => {
    // Khi hoàn tất onboarding, quay lại splash để xem lại từ đầu (hoặc mở trang chủ)
    setStage('splash');
  };

  return (
    <View style={styles.container}>
      {stage === 'splash' ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <OnboardingScreen onFinish={handleOnboardingFinish} />
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
