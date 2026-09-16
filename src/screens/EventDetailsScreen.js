import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function EventDetailsScreen({ onBack }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Nội dung có thể cuộn */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* 1. ẢNH BÌA CONCERT VÀ THANH HEADER TRÊN CÙNG */}
        <ImageBackground
          source={require('../assets/image/event-detail-1.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        >
          <SafeAreaView style={styles.topBar}>
            {/* Nút quay lại */}
            <TouchableOpacity onPress={onBack} style={styles.topBtn} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.topTitle}>Event Details</Text>

            {/* Nút Bookmark lưu sự kiện */}
            <TouchableOpacity
              onPress={() => setIsBookmarked(!isBookmarked)}
              style={styles.bookmarkBtn}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>

        {/* 2. THANH VIÊN THUỐC NỔI (DANH SÁCH NGƯỜI THAM GIA + NÚT INVITE) */}
        <View style={styles.floatingPillWrapper}>
          <View style={styles.floatingPill}>
            {/* Nhóm avatar người tham gia */}
            <View style={styles.avatarGroup}>
              <Image
                source={require('../assets/image/event-detail-3.png')}
                style={styles.attendeeAvatar}
              />
              <Image
                source={require('../assets/image/event-detail-4.png')}
                style={[styles.attendeeAvatar, { marginLeft: -10 }]}
              />
              <Image
                source={require('../assets/image/event-detail-5.png')}
                style={[styles.attendeeAvatar, { marginLeft: -10 }]}
              />
            </View>

            <Text style={styles.goingText}>+20 Going</Text>

            {/* Nút Invite */}
            <TouchableOpacity
              style={styles.inviteBtn}
              onPress={() => alert('Mời bạn bè tham gia sự kiện!')}
              activeOpacity={0.8}
            >
              <Text style={styles.inviteText}>Invite</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. NỘI DUNG CHI TIẾT SỰ KIỆN */}
        <View style={styles.detailsBody}>
          {/* Tên sự kiện */}
          <Text style={styles.eventTitle}>
            International Band{'\n'}Music Concert
          </Text>

          {/* Dòng 1: Thời gian & Ngày */}
          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <Ionicons name="calendar" size={24} color="#5669FF" />
            </View>
            <View style={styles.infoTextGroup}>
              <Text style={styles.infoPrimary}>14 December, 2021</Text>
              <Text style={styles.infoSecondary}>Tuesday, 4:00PM - 9:00PM</Text>
            </View>
          </View>

          {/* Dòng 2: Địa điểm tổ chức */}
          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <Ionicons name="location" size={24} color="#5669FF" />
            </View>
            <View style={styles.infoTextGroup}>
              <Text style={styles.infoPrimary}>Gala Convention Center</Text>
              <Text style={styles.infoSecondary}>36 Guild Street London, UK</Text>
            </View>
          </View>

          {/* Dòng 3: Nhà tổ chức (Organizer) */}
          <View style={styles.infoRow}>
            <Image
              source={require('../assets/image/event-detail-2.png')}
              style={styles.organizerAvatar}
            />
            <View style={[styles.infoTextGroup, { flex: 1 }]}>
              <Text style={styles.infoPrimary}>Ashfak Sayem</Text>
              <Text style={styles.infoSecondary}>Organizer</Text>
            </View>
            {/* Nút Follow */}
            <TouchableOpacity
              style={[
                styles.followBtn,
                isFollowing && { backgroundColor: '#5669FF' },
              ]}
              onPress={() => setIsFollowing(!isFollowing)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.followText,
                  isFollowing && { color: '#FFFFFF' },
                ]}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Mục About Event */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>About Event</Text>
            <Text style={styles.aboutText}>
              Enjoy your favorite dishe and a lovely your friends and family and have a great time.
              Food from local food trucks will be available for purchase.{' '}
              <Text
                onPress={() => setShowFullText(!showFullText)}
                style={styles.readMoreText}
              >
                {showFullText ? 'Read Less' : 'Read More...'}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 4. NÚT MUA VÉ DƯỚI CÙNG (BUY TICKET $120) */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.buyBtn}
          onPress={() => alert('Đặt vé thành công! Giá: $120')}
          activeOpacity={0.85}
        >
          <Text style={styles.buyBtnText}>BUY TICKET $120</Text>
          <View style={styles.arrowCircle}>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100, // Dành khoảng trống cho nút Buy Ticket dưới cùng
  },

  // 1. Ảnh bìa & Header
  bannerImage: {
    width: '100%',
    height: 240,
    justifyContent: 'flex-start',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 36 : 10,
  },
  topBtn: {
    width: 38,
    height: 38,
    justifyContent: 'center',
  },
  topTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bookmarkBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 2. Viên thuốc nổi (+20 Going & Invite)
  floatingPillWrapper: {
    alignItems: 'center',
    marginTop: -28,
  },
  floatingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
    width: '85%',
    justifyContent: 'space-between',
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  goingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3F38DD',
    marginLeft: 8,
    flex: 1,
  },
  inviteBtn: {
    backgroundColor: '#5669FF',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  inviteText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  // 3. Nội dung sự kiện
  detailsBody: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  eventTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#120D26',
    lineHeight: 38,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ECEEFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  organizerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 14,
  },
  infoTextGroup: {
    justifyContent: 'center',
  },
  infoPrimary: {
    fontSize: 15,
    fontWeight: '700',
    color: '#120D26',
    marginBottom: 4,
  },
  infoSecondary: {
    fontSize: 12,
    color: '#747688',
  },
  followBtn: {
    backgroundColor: '#ECEEFE',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  followText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5669FF',
  },
  aboutSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#120D26',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#747688',
  },
  readMoreText: {
    color: '#5669FF',
    fontWeight: '600',
  },

  // 4. Nút Buy Ticket dưới cùng
  bottomBar: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  buyBtn: {
    width: '100%',
    height: 56,
    backgroundColor: '#5669FF',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5669FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  buyBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  arrowCircle: {
    position: 'absolute',
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3D50DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
