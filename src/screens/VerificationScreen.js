import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function VerificationScreen({
  phoneNumber = '+1 2620 0323 7631',
  onBack,
  onSuccess,
  onResend,
}) {
  // Pre-fill with '4', '4' to match the mockup UI exactly, while allowing full interaction
  const [code, setCode] = useState(['4', '4', '', '']);
  const [activeIndex, setActiveIndex] = useState(2);
  const [timer, setTimer] = useState(20);

  // Countdown timer for resending code
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Support physical / hardware keyboard on web & emulator
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const handleKeyDown = (e) => {
        if (/^[0-9]$/.test(e.key)) {
          handleKeyPress(e.key);
        } else if (e.key === 'Backspace') {
          handleBackspace();
        } else if (e.key === 'Enter') {
          handleContinue();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [code, activeIndex, timer]);

  // Handle number press from keypad
  const handleKeyPress = (num) => {
    setCode((prev) => {
      const next = [...prev];
      let target = activeIndex;

      // If activeIndex is at end and already filled, replace or do nothing
      if (target >= 4) {
        target = 3;
      }

      next[target] = num;

      // Advance activeIndex to the next empty slot
      const nextEmpty = next.findIndex((val) => val === '');
      if (nextEmpty !== -1) {
        setActiveIndex(nextEmpty);
      } else {
        setActiveIndex(3);
      }

      return next;
    });
  };

  // Handle backspace press from keypad
  const handleBackspace = () => {
    setCode((prev) => {
      const next = [...prev];

      if (next[activeIndex] !== '') {
        // Clear current active slot if it has a digit
        next[activeIndex] = '';
      } else if (activeIndex > 0) {
        // Otherwise step back and clear previous slot
        next[activeIndex - 1] = '';
        setActiveIndex(activeIndex - 1);
      }

      return next;
    });
  };

  // Handle Continue button press
  const handleContinue = () => {
    const fullCode = code.join('');
    if (fullCode.length < 4) {
      if (Platform.OS === 'web') {
        window.alert('Vui lòng nhập đầy đủ mã xác thực 4 chữ số!');
      } else {
        Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ mã xác thực 4 chữ số!');
      }
      return;
    }

    if (onSuccess) {
      onSuccess(fullCode);
    } else {
      if (Platform.OS === 'web') {
        window.alert(`Xác thực thành công với mã: ${fullCode}`);
      } else {
        Alert.alert('Thành công', `Xác thực thành công với mã: ${fullCode}`);
      }
    }
  };

  // Handle Resend code
  const handleResend = () => {
    setTimer(20);
    onResend?.();
    if (Platform.OS === 'web') {
      window.alert('Mã xác thực mới đã được gửi lại!');
    } else {
      Alert.alert('Thông báo', 'Mã xác thực mới đã được gửi lại!');
    }
  };

  // Keypad definitions
  const keypadRows = [
    [
      { num: '1', sub: '' },
      { num: '2', sub: 'ABC' },
      { num: '3', sub: 'DEF' },
    ],
    [
      { num: '4', sub: 'GHI' },
      { num: '5', sub: 'JKL' },
      { num: '6', sub: 'MNO' },
    ],
    [
      { num: '7', sub: 'PQRS' },
      { num: '8', sub: 'TUV' },
      { num: '9', sub: 'WXYZ' },
    ],
    [
      { type: 'empty' },
      { num: '0', sub: '' },
      { type: 'backspace' },
    ],
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#120D26" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.heading}>Verification</Text>

        {/* Description */}
        <Text style={styles.subtitle}>
          We've send you the verification{'\n'}code on {phoneNumber}
        </Text>

        {/* 4 OTP Digit Boxes */}
        <View style={styles.otpRow}>
          {code.map((digit, index) => {
            const isActive = activeIndex === index;
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => setActiveIndex(index)}
                style={[
                  styles.otpBox,
                  isActive && styles.otpBoxActive,
                ]}
              >
                {digit ? (
                  <Text style={styles.otpDigit}>{digit}</Text>
                ) : (
                  <Text
                    style={[
                      styles.otpDash,
                      isActive && styles.otpDashActive,
                    ]}
                  >
                    —
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinue}
          style={styles.continueBtn}
        >
          <View style={styles.continueBtnContent}>
            <Text style={styles.continueBtnText}>CONTINUE</Text>
            <View style={styles.arrowCircle}>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Resend Code Countdown */}
        <View style={styles.resendBox}>
          {timer > 0 ? (
            <Text style={styles.resendText}>
              Re-send code in{' '}
              <Text style={styles.timerHighlight}>
                0:{timer < 10 ? `0${timer}` : timer}
              </Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
              <Text style={styles.resendLink}>Re-send code</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Custom Numeric Keypad Area */}
      <View style={styles.keypadWrapper}>
        {keypadRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keypadRow}>
            {row.map((keyItem, colIndex) => {
              if (keyItem.type === 'empty') {
                return <View key={colIndex} style={styles.keyEmpty} />;
              }

              if (keyItem.type === 'backspace') {
                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={styles.keyBtn}
                    activeOpacity={0.65}
                    onPress={handleBackspace}
                  >
                    <Ionicons
                      name="backspace-outline"
                      size={22}
                      color="#120D26"
                    />
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  key={colIndex}
                  style={styles.keyBtn}
                  activeOpacity={0.65}
                  onPress={() => handleKeyPress(keyItem.num)}
                >
                  <Text style={styles.keyNum}>{keyItem.num}</Text>
                  {keyItem.sub ? (
                    <Text style={styles.keySub}>{keyItem.sub}</Text>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  contentContainer: {
    paddingHorizontal: 28,
    paddingTop: 16,
    flex: 1,
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#3C3E56',
    marginBottom: 32,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
  },
  otpBox: {
    width: 55,
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxActive: {
    borderColor: '#5669FF',
    borderWidth: 1.5,
  },
  otpDigit: {
    fontSize: 24,
    fontWeight: '700',
    color: '#120D26',
  },
  otpDash: {
    fontSize: 22,
    fontWeight: '400',
    color: '#D0D3DE',
  },
  otpDashActive: {
    color: '#A0A7D8',
  },
  continueBtn: {
    height: 58,
    backgroundColor: '#5669FF',
    borderRadius: 15,
    justifyContent: 'center',
    shadowColor: '#5669FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 24,
  },
  continueBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  continueBtnText: {
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
  resendBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendText: {
    fontSize: 15,
    color: '#120D26',
  },
  timerHighlight: {
    color: '#5669FF',
    fontWeight: '500',
  },
  resendLink: {
    fontSize: 15,
    color: '#5669FF',
    fontWeight: '600',
  },
  keypadWrapper: {
    backgroundColor: '#ECEEF2',
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 14,
  },
  keypadRow: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  keyBtn: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 1.5,
    elevation: 1.5,
  },
  keyEmpty: {
    flex: 1,
    height: 48,
  },
  keyNum: {
    fontSize: 22,
    fontWeight: '600',
    color: '#120D26',
    lineHeight: 24,
  },
  keySub: {
    fontSize: 9,
    fontWeight: '700',
    color: '#120D26',
    letterSpacing: 1.5,
    marginTop: 1,
  },
});
