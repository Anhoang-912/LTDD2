import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Onboarding2Screen({ onNext, onSkip }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/image/Onboarding-2.png')}
        style={{ width, height }}
        resizeMode="cover"
      />

      {/* Thanh điều hướng: Skip - 3 Dots (chấm 2 sáng) - Next */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={onSkip}>
          <Text style={styles.skipBtn}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity onPress={onNext}>
          <Text style={styles.nextBtn}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#5669FF' },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 36,
  },
  skipBtn: { color: 'rgba(255,255,255,0.7)', fontSize: 16, fontWeight: '500' },
  nextBtn: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  dots: { flexDirection: 'row', gap: 8 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  activeDot: { backgroundColor: '#FFFFFF' },
});
