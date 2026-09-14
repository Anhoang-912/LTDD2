import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';

export default function MenuWhiteScreen({ onClose, onSignOut }) {
  // Danh sách các mục trong Menu
  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: 'person-outline' },
    { id: 'massage', label: 'Massage', icon: 'chatbubble-ellipses-outline', badge: '3' },
    { id: 'calender', label: 'Calender', icon: 'calendar-outline' },
    { id: 'bookmark', label: 'Bookmark', icon: 'bookmark-outline' },
    { id: 'contact', label: 'Contact Us', icon: 'mail-outline' },
    { id: 'settings', label: 'Settings', icon: 'settings-outline' },
    { id: 'help', label: 'Helps & FAQs', icon: 'help-circle-outline' },
    { id: 'signout', label: 'Sign Out', icon: 'exit-outline' },
  ];

  const handlePressItem = (item) => {
    if (item.id === 'signout') {
      onSignOut?.();
    } else {
      alert(`Bạn chọn: ${item.label}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. CỘT BÊN TRÁI: MENU TRẮNG (MENU WHITE) */}
      <View style={styles.leftMenu}>
        {/* Avatar và tên người dùng */}
        <View style={styles.profileBox}>
          <Image
            source={require('../assets/image/ashfak.png')}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Ashfak Sayem</Text>
        </View>

        {/* Danh sách các mục Menu */}
        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handlePressItem(item)}
            >
              <View style={styles.iconBox}>
                <Ionicons name={item.icon} size={22} color="#747688" />
                {/* Badge số 3 màu cam ở mục Massage */}
                {item.badge && (
                  <View style={styles.orangeBadge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nút Upgrade Pro */}
        <TouchableOpacity
          style={styles.upgradeBtn}
          onPress={() => alert('Nâng cấp tài khoản Pro!')}
        >
          <MaterialCommunityIcons name="crown" size={20} color="#00CCD6" style={{ marginRight: 8 }} />
          <Text style={styles.upgradeText}>Upgrade Pro</Text>
        </TouchableOpacity>
      </View>

      {/* 2. CỘT BÊN PHẢI: MÀN HÌNH HOME THU NHỎ (Bấm vào để quay lại màn Home) */}
      <TouchableOpacity
        style={styles.rightPreview}
        activeOpacity={0.9}
        onPress={onClose}
      >
        <View style={styles.scaledHome}>
          {/* Tái sử dụng màn hình Home hiển thị góc phải */}
          <HomeScreen onOpenMenu={onClose} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  // Menu bên trái
  leftMenu: {
    width: '65%',
    paddingLeft: 24,
    paddingTop: 20,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  profileBox: {
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EAEAEA',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#120D26',
    marginTop: 12,
  },
  menuList: {
    gap: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  iconBox: {
    width: 28,
    alignItems: 'center',
    marginRight: 12,
  },
  orangeBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FA6A55',
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  menuLabel: {
    fontSize: 15,
    color: '#120D26',
    fontWeight: '500',
  },
  upgradeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5FAFB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  upgradeText: {
    color: '#00CCD6',
    fontSize: 13,
    fontWeight: 'bold',
  },

  // Màn hình Home thu nhỏ bên phải
  rightPreview: {
    position: 'absolute',
    top: 30,
    bottom: 30,
    right: -130,
    width: '75%',
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  scaledHome: {
    flex: 1,
    pointerEvents: 'none', // Để khi bấm vào bất kỳ đâu trên phần này đều kích hoạt đóng menu
  },
});
