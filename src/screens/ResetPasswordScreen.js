import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function ResetPasswordScreen({ onBack, onSendSuccess }) {
  const [email, setEmail] = useState('');

  const handleSend = () => {
    const inputEmail = email.trim();
    if (!inputEmail) {
      const msg = 'Vui lòng nhập địa chỉ email của bạn!';
      if (Platform.OS === 'web') {
        window.alert(msg);
      } else {
        Alert.alert('Thông báo', msg);
      }
      return;
    }

    // Basic email format validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(inputEmail)) {
      const msg = 'Định dạng email không hợp lệ!';
      if (Platform.OS === 'web') {
        window.alert(msg);
      } else {
        Alert.alert('Thông báo', msg);
      }
      return;
    }

    if (onSendSuccess) {
      onSendSuccess(inputEmail);
    } else {
      const msg = `Mã xác nhận đặt lại mật khẩu đã được gửi tới ${inputEmail}`;
      if (Platform.OS === 'web') {
        window.alert(msg);
      } else {
        Alert.alert('Thành công', msg);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#120D26" />
          </TouchableOpacity>

          {/* Heading */}
          <Text style={styles.heading}>Resset Password</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Please enter your email address to{'\n'}request a password reset
          </Text>

          {/* Email Input */}
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
              autoCorrect={false}
            />
          </View>

          {/* Send Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSend}
            style={styles.mainBtn}
          >
            <View style={styles.mainBtnContent}>
              <Text style={styles.mainBtnText}>SEND</Text>
              <View style={styles.arrowCircle}>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </View>
            </View>
          </TouchableOpacity>
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#747688',
    marginBottom: 28,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
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
    marginTop: 10,
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
});
