import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const slides = [
  require('../assets/image/Onboarding-1.png'),
  require('../assets/image/Onboarding-2.png'),
  require('../assets/image/Onboarding-3.png'),
];

export default function OnboardingScreen({ onFinish }) {
  const [index, setIndex] = useState(0);
  const listRef = useRef(null);

  const scrollTo = (i) => {
    listRef.current?.scrollToIndex({ index: i, animated: true });
    setIndex(i);
  };

  const handleNext = () => {
    if (index < slides.length - 1) scrollTo(index + 1);
    else onFinish?.();
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) =>
          setIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        renderItem={({ item }) => (
          <Image source={item} style={{ width, height }} resizeMode="cover" />
        )}
      />

      {/* Điều hướng: Skip - 3 Dots - Next */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => scrollTo(slides.length - 1)}>
          <Text style={styles.skipBtn}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, index === i && styles.activeDot]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.nextBtn}>
            {index === slides.length - 1 ? 'Start' : 'Next'}
          </Text>
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
