import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function HomeScreen({ onOpenMenu, onEventPress }) {
  const [activeCategory, setActiveCategory] = useState('Sports');

  // Danh sách các danh mục sự kiện
  const categories = [
    { id: 'Sports', label: 'Sports', color: '#EE684A', icon: 'basketball-outline' },
    { id: 'Music', label: 'Music', color: '#F59762', icon: 'musical-note' },
    { id: 'Food', label: 'Food', color: '#29D697', icon: 'restaurant-outline' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A43EC" />

      {/* 1. PHẦN HEADER MÀU TÍM CONG */}
      <View style={styles.header}>
        <SafeAreaView>
          {/* Hàng trên cùng: Nút 3 gạch (Mở menu), Địa chỉ, Chuông thông báo */}
          <View style={styles.topRow}>
            {/* Nút 3 gạch mở Menu White */}
            <TouchableOpacity onPress={onOpenMenu} style={styles.menuBtn}>
              <Feather name="menu" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Vị trí hiện tại */}
            <View style={styles.locationBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.locationSub}>Current Location</Text>
                <Ionicons name="caret-down-sharp" size={10} color="#DADADA" style={{ marginLeft: 3 }} />
              </View>
              <Text style={styles.locationMain}>New York, USA</Text>
            </View>

            {/* Chuông thông báo */}
            <View style={styles.bellBtn}>
              <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
              <View style={styles.bellDot} />
            </View>
          </View>

          {/* Hàng tìm kiếm: Ô nhập Search & nút Filters */}
          <View style={styles.searchRow}>
            <View style={styles.searchBox}>
              <Ionicons name="search" size={20} color="#FFFFFF" />
              <View style={styles.searchDivider} />
              <TextInput
                placeholder="Search..."
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                style={styles.searchInput}
              />
            </View>

            <TouchableOpacity style={styles.filterBtn}>
              <Ionicons name="options-outline" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.filterText}>Filters</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Các nút phân loại (Sports, Music, Food) */}
        <View style={styles.categoryRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setActiveCategory(cat.id)}
                style={[styles.categoryChip, { backgroundColor: cat.color }]}
              >
                <Ionicons name={cat.icon} size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.categoryText}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* 2. NỘI DUNG CUỘN (SCROLL VIEW) */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.bodyContent}>
        {/* Mục Upcoming Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity onPress={onEventPress}>
            <Text style={styles.seeAllText}>See All ▸</Text>
          </TouchableOpacity>
        </View>

        {/* Danh sách thẻ sự kiện lướt ngang */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
          {/* Thẻ sự kiện 1 - Bấm vào mở Event Details */}
          <TouchableOpacity
            style={styles.eventCard}
            activeOpacity={0.9}
            onPress={onEventPress}
          >
            <View style={styles.cardImageBox}>
              <Image source={require('../assets/image/home-2.png')} style={styles.cardImage} resizeMode="cover" />
              {/* Badge ngày 10 JUNE */}
              <View style={styles.dateBadge}>
                <Text style={styles.dateDay}>10</Text>
                <Text style={styles.dateMonth}>JUNE</Text>
              </View>
              {/* Nút bookmark */}
              <View style={styles.bookmarkBadge}>
                <Ionicons name="bookmark" size={14} color="#EB5757" />
              </View>
            </View>

            <Text style={styles.eventTitle} numberOfLines={1}>International Band Mu...</Text>

            {/* Avatar người tham gia */}
            <View style={styles.goingRow}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/image/event-detail-3.png')} style={styles.avatarMini} />
                <Image source={require('../assets/image/event-detail-4.png')} style={[styles.avatarMini, { marginLeft: -8 }]} />
                <Image source={require('../assets/image/event-detail-5.png')} style={[styles.avatarMini, { marginLeft: -8 }]} />
              </View>
              <Text style={styles.goingText}>+20 Going</Text>
            </View>

            {/* Địa chỉ */}
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={14} color="#747688" />
              <Text style={styles.locationText} numberOfLines={1}>36 Guild Street London, UK</Text>
            </View>
          </TouchableOpacity>

          {/* Thẻ sự kiện 2 */}
          <TouchableOpacity
            style={styles.eventCard}
            activeOpacity={0.9}
            onPress={onEventPress}
          >
            <View style={styles.cardImageBox}>
              <Image source={require('../assets/image/event-card-2.png')} style={styles.cardImage} resizeMode="cover" />
              <View style={styles.dateBadge}>
                <Text style={styles.dateDay}>10</Text>
                <Text style={styles.dateMonth}>JUNE</Text>
              </View>
              <View style={styles.bookmarkBadge}>
                <Ionicons name="bookmark" size={14} color="#EB5757" />
              </View>
            </View>

            <Text style={styles.eventTitle} numberOfLines={1}>Jo Malone London's Mo...</Text>

            <View style={styles.goingRow}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/image/event-detail-3.png')} style={styles.avatarMini} />
                <Image source={require('../assets/image/event-detail-4.png')} style={[styles.avatarMini, { marginLeft: -8 }]} />
              </View>
              <Text style={styles.goingText}>+20 Going</Text>
            </View>

            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={14} color="#747688" />
              <Text style={styles.locationText} numberOfLines={1}>Radius Gallery, Santa Cruz</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* Banner mời bạn bè (Invite your friends) */}
        <View style={styles.inviteBanner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.inviteTitle}>Invite your friends</Text>
            <Text style={styles.inviteSub}>Get $20 for ticket</Text>
            <TouchableOpacity style={styles.inviteBtn}>
              <Text style={styles.inviteBtnText}>INVITE</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../assets/image/home-1.png')} style={styles.inviteImg} resizeMode="contain" />
        </View>

        {/* Mục Nearby You */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby You</Text>
          <Text style={styles.seeAllText}>See All ▸</Text>
        </View>
      </ScrollView>

      {/* 3. THANH ĐIỀU HƯỚNG DƯỚI CÙNG (BOTTOM TAB BAR) */}
      <View style={styles.bottomBar}>
        <View style={styles.tabItem}>
          <Ionicons name="compass" size={22} color="#5669FF" />
          <Text style={[styles.tabLabel, { color: '#5669FF', fontWeight: 'bold' }]}>Explore</Text>
        </View>

        <View style={styles.tabItem}>
          <Ionicons name="calendar-outline" size={21} color="#747688" />
          <Text style={styles.tabLabel}>Events</Text>
        </View>

        {/* Nút cộng tròn màu xanh tím ở giữa */}
        <View style={styles.fabItem}>
          <View style={styles.fabBtn}>
            <Ionicons name="add" size={26} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.tabItem}>
          <Ionicons name="location-outline" size={22} color="#747688" />
          <Text style={styles.tabLabel}>Map</Text>
        </View>

        <View style={styles.tabItem}>
          <Ionicons name="person-outline" size={21} color="#747688" />
          <Text style={styles.tabLabel}>Profile</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  header: {
    backgroundColor: '#4A43EC',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  },
  menuBtn: {
    padding: 6,
  },
  locationBox: {
    alignItems: 'center',
  },
  locationSub: {
    fontSize: 12,
    color: '#DADADA',
  },
  locationMain: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 2,
  },
  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00F8FF',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    marginRight: 10,
  },
  searchDivider: {
    width: 1,
    height: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 14,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5D56F3',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryRow: {
    marginTop: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bodyContent: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#120D26',
  },
  seeAllText: {
    fontSize: 13,
    color: '#747688',
  },
  eventCard: {
    width: 230,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    marginRight: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardImageBox: {
    width: '100%',
    height: 130,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  dateBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  dateDay: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#EB5757',
    lineHeight: 16,
  },
  dateMonth: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#EB5757',
  },
  bookmarkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#120D26',
    marginTop: 10,
    marginBottom: 8,
  },
  goingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarMini: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  goingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3F38DD',
    marginLeft: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#747688',
    marginLeft: 4,
    flex: 1,
  },
  inviteBanner: {
    backgroundColor: '#D6F8F8',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#120D26',
  },
  inviteSub: {
    fontSize: 13,
    color: '#484D70',
    marginVertical: 6,
  },
  inviteBtn: {
    backgroundColor: '#00F8FF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  inviteBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  inviteImg: {
    width: 110,
    height: 80,
  },
  bottomBar: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    color: '#747688',
    marginTop: 2,
  },
  fabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#5669FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -26,
    elevation: 6,
  },
});
