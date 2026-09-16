import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function MapViewScreen({ onBack, onEventPress }) {
  const [activeCategory, setActiveCategory] = useState('Sports');
  const [selectedPin, setSelectedPin] = useState('food'); // 'food', 'music', 'art', 'sports'

  // Danh mục bộ lọc nổi phía trên
  const categories = [
    { id: 'Sports', label: 'Sports', color: '#EE684A', icon: 'basketball-outline' },
    { id: 'Music', label: 'Music', color: '#5669FF', icon: 'musical-note' },
    { id: 'Food', label: 'Food', color: '#29D697', icon: 'restaurant-outline' },
    { id: 'Art', label: 'Art', color: '#46CDFB', icon: 'color-palette-outline' },
  ];

  // Danh sách các điểm ghim (pin) trên bản đồ
  const mapPins = [
    { id: 'food', type: 'Food', color: '#29D697', icon: 'restaurant', top: '30%', left: '58%' },
    { id: 'music', type: 'Music', color: '#5669FF', icon: 'musical-notes', top: '38%', left: '24%' },
    { id: 'art', type: 'Art', color: '#00CCD6', icon: 'color-palette', top: '46%', left: '66%' },
    { id: 'sports', type: 'Sports', color: '#EE684A', icon: 'basketball', top: '54%', left: '34%' },
  ];

  return (
    <View style={styles.container}>
      {/* 1. HÌNH NỀN BẢN ĐỒ (MAP BACKGROUND) */}
      <ImageBackground
        source={require('../assets/image/map-bg.jpg')}
        style={styles.mapBackground}
        resizeMode="cover"
      >
        {/* CÁC ĐIỂM GHIM (PINS) TRÊN BẢN ĐỒ */}
        {mapPins.map((pin) => {
          const isSelected = selectedPin === pin.id;
          return (
            <TouchableOpacity
              key={pin.id}
              style={[
                styles.pinWrapper,
                { top: pin.top, left: pin.left },
                isSelected && { transform: [{ scale: 1.15 }] },
              ]}
              activeOpacity={0.8}
              onPress={() => setSelectedPin(pin.id)}
            >
              {/* Khối icon ghim bo góc */}
              <View style={[styles.pinBox, { backgroundColor: pin.color }]}>
                <Ionicons name={pin.icon} size={18} color="#FFFFFF" />
              </View>
              {/* Mũi nhọn phía dưới ghim */}
              <View style={[styles.pinPointer, { borderTopColor: pin.color }]} />
            </TouchableOpacity>
          );
        })}

        {/* 2. PHẦN THANH TÌM KIẾM TRÊN CÙNG (TOP BAR) */}
        <SafeAreaView style={styles.safeAreaTop}>
          <View style={styles.topBar}>
            {/* Ô tìm kiếm có nút quay lại */}
            <View style={styles.searchBar}>
              <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
                <Ionicons name="chevron-back" size={22} color="#120D26" />
              </TouchableOpacity>
              <TextInput
                placeholder="Find for food or restaurant..."
                placeholderTextColor="#9B9B9B"
                style={styles.searchInput}
              />
            </View>

            {/* Nút định vị GPS (Current Location) */}
            <TouchableOpacity
              style={styles.gpsBtn}
              onPress={() => alert('Đang xác định vị trí của bạn...')}
              activeOpacity={0.8}
            >
              <Ionicons name="locate" size={22} color="#5669FF" />
            </TouchableOpacity>
          </View>

          {/* DẢI NÚT DANH MỤC NỔI (SPORTS, MUSIC, FOOD) */}
          <View style={styles.categoryContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {categories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryChip,
                      isSelected && styles.categoryChipActive,
                    ]}
                    onPress={() => setActiveCategory(cat.id)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name={cat.icon} size={17} color={cat.color} style={{ marginRight: 6 }} />
                    <Text style={styles.categoryLabel}>{cat.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>

        {/* 3. NÚT LAYER / FILTER GÓC PHẢI DƯỚI */}
        <TouchableOpacity
          style={styles.layerFab}
          onPress={() => alert('Bộ lọc lớp bản đồ')}
          activeOpacity={0.85}
        >
          <View style={styles.layerInnerCircle}>
            <Ionicons name="layers" size={18} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* 4. THẺ SỰ KIỆN NỔI DƯỚI CÙNG (BOTTOM EVENT CARD) */}
        <View style={styles.bottomCardWrapper}>
          <TouchableOpacity
            style={styles.bottomCard}
            activeOpacity={0.9}
            onPress={onEventPress}
          >
            {/* Ảnh minh họa bên trái */}
            <Image
              source={require('../assets/image/home-2.png')}
              style={styles.cardThumb}
              resizeMode="cover"
            />

            {/* Thông tin sự kiện */}
            <View style={styles.cardBody}>
              <Text style={styles.cardTime}>Wed, Apr 28 · 5:30 PM</Text>
              <Text style={styles.cardTitle} numberOfLines={2}>
                Jo Malone London's Mother's Day Presents
              </Text>
              <View style={styles.cardLocRow}>
                <Ionicons name="location-sharp" size={13} color="#747688" />
                <Text style={styles.cardLocText} numberOfLines={1}>
                  Radius Gallery - Santa Cruz, CA
                </Text>
              </View>
            </View>

            {/* Nút bookmark màu đỏ */}
            <View style={styles.bookmarkBox}>
              <Ionicons name="bookmark" size={16} color="#EB5757" />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  mapBackground: {
    width: '100%',
    height: '100%',
  },

  // 1. Top Bar & Search
  safeAreaTop: {
    paddingTop: Platform.OS === 'android' ? 36 : 10,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  backBtn: {
    paddingRight: 6,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 13,
    color: '#120D26',
  },
  gpsBtn: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  // Dải nút danh mục
  categoryContainer: {
    marginTop: 14,
  },
  categoryScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 22,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  categoryChipActive: {
    backgroundColor: '#F8F9FE',
    borderWidth: 1,
    borderColor: '#5669FF',
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#747688',
  },

  // Điểm ghim (Pin Markers)
  pinWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  pinPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },

  // Nút Layer Fab bên phải
  layerFab: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  layerInnerCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#5669FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Thẻ sự kiện nổi phía dưới
  bottomCardWrapper: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
  bottomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  cardThumb: {
    width: 76,
    height: 76,
    borderRadius: 14,
  },
  cardBody: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  cardTime: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5669FF',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#120D26',
    lineHeight: 18,
    marginBottom: 6,
  },
  cardLocRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLocText: {
    fontSize: 11,
    color: '#747688',
    marginLeft: 4,
    flex: 1,
  },
  bookmarkBox: {
    alignSelf: 'flex-start',
    padding: 4,
  },
});
