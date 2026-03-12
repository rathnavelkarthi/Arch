import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { ArrowLeft, SlidersHorizontal, ExternalLink } from 'lucide-react-native';
import { router } from 'expo-router';

export default function FloorplanResultsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Generated Floorplans</Text>
            <Text style={styles.headerSubtitle}>Project: Riverside Modern Villa</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <SlidersHorizontal size={20} color="#2463eb" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>All Variants</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Most Accurate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Recent</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Main Featured Result */}
        <View style={styles.featuredSection}>
          <View style={styles.featuredCard}>
            <ImageBackground 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1rS2jhsn6BwtoR5-l0UyoqVjvLhYF4Bb7vSyYHw7U6tiFABfsyab4vKQGK-wFrA4SN59ZvkmMwybQ8dz71Hw3EY3gY3vtcRO8NuW2b3D2BZGmpGWAHPiH6OysP7gg5FTI2p0tG8k-_htrSCDAf_d48mDmSVFHJwiYThh29inc3rGVi3y1I4uv--FSWbNakx-wRF-6FUJ57iPudUi-nbeImyu6yic5NIlw0KNkEXH-V052K6fYDSWFM7ZZJYmNu53FvmqCcgqnq_8' }}
              style={styles.featuredImage}
            >
              <View style={styles.matchBadge}>
                <Text style={styles.matchBadgeText}>98% MATCH</Text>
              </View>
            </ImageBackground>

            <View style={styles.featuredContent}>
              <Text style={styles.recommendedTag}>RECOMMENDED</Text>
              <Text style={styles.featuredTitle}>Variant A-1: Modern Open</Text>
              <Text style={styles.featuredDesc}>
                Optimized for natural light with premium glassmorphic interior partitioning and seamless indoor-outdoor flow.
              </Text>
              
              <View style={styles.specsRow}>
                <View style={styles.specBadge}><Text style={styles.specBadgeText}>3 BEDS</Text></View>
                <View style={styles.specBadge}><Text style={styles.specBadgeText}>2.5 BATHS</Text></View>
                <View style={styles.specBadge}><Text style={styles.specBadgeText}>2,400 SQFT</Text></View>
              </View>

              <TouchableOpacity 
                style={styles.viewDetailsBtn}
                onPress={() => router.push('/(app)/ai-tools/edit')}
              >
                <Text style={styles.viewDetailsBtnText}>View Details</Text>
                <ExternalLink size={16} color="#ffffff" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Grid of Results */}
        <View style={styles.gridSection}>
          <Text style={styles.sectionTitle}>Other Variations</Text>
          
          <View style={styles.gridContainer}>
            {[
              { id: 'B-2', name: 'Variant B-2: Minimalist', sub: 'Scandi-Industrial Fusion', match: '95%', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnjGhhml9P3dTBdNTaIN2m87AoDaQ_4LL3AOIlichDvTUyK4qz4One8R_fKUewHLP-dvBeldRltWN5oayDW_h6_495Xk63YfpBXgnUhAHWWKJeBtLqI4PMvT2u7oHUw9hIit0fUIX2EPWbn3z_b8CcQ3wYpwEEEEyFRr4ORrRh3z-kw47xOr9XgAFocfYOf_RqEAyK9pWSGstkETPpFPDRVDsbWgKNbJFUsH-5NLbKm8KHR4m28J0uSliGgg-LwpIfgxRIILFVg-E' },
              { id: 'C-1', name: 'Variant C-1: Industrial', sub: 'Exposed Brick & Metal', match: '92%', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8mO0beYTzoLtmNsiD62mYNHCYMVFLaTlPrA4EBAOk67QUfUmQFxyWchgIfECmLJ5jpqO6X-C5sghnC3h8CcJdHYGUvswz-bKen0ON7HSlWO6zZBkfco0RipwQzY6_hmr_n2thLG9YUqettI7N1YeelQEVBNqFS_EneTFUPv7nfoEKB3uP0nmvM5a_0O9shTViQqgwYyY-qx14VT8L_WRG7vlPNimM0U77iPcuqxNFtK6PuJTBridNKQw2TNdAjfc-D-LuaV5OFxs' },
              { id: 'D-4', name: 'Variant D-4: Scandi', sub: 'Light Wood & Soft Tones', match: '88%', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwKdStXssGVjTtwGc2TEwJCqPnexjylZvCJXI62aR6F4yoSXStE55dUIviL6ko4xgh8x7HH-BbeHRiJ9lesG-3eza4h4FaIDF3IgNPf8Sn_hN0Phw3Lu6_z5eSfoyNXo9QpnveU4OemuBdqPocri4Hn8_4CTRc1XuVmGdyHUEKN21SrInQIK_YtsS5mqKQPF7iIqQJjqwqLJ_nUqBYG569fi0ZSAcLhG0XEgCXDmrRDzMhNXOLSjSGFSeF3eWDKKpnYhI7dNQxSKk' },
              { id: 'E-2', name: 'Variant E-2: Classic', sub: 'Formal Dining & Partitioned', match: '85%', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1NsarQ619Qx6jsHhkPY4bSTwhkE6b2s-98ItIRUYh71rk69bYHJFWUnMi1XJM2NUhXL-d_3RjtLb64DTUKJwx0Bk1JYuwfmw0TBAvcWitFNt9zY-mgbEVxCvcYHxT2Kw1wow72wqASKR8x512xEKY99YSEXYbaZKUw3fII45Qh_04jan4TVQuQfaskuii3HWsdgMLQ_WXXWf6_D1VGqBXGPcDPNDQL8O-oNJPaXtD1Wcd45WObycg5_AE3n6dMTmuD4VgvkA0Ny4' },
            ].map((item) => (
              <TouchableOpacity key={item.id} style={styles.gridItem}>
                <ImageBackground source={{ uri: item.img }} style={styles.gridItemImage} imageStyle={{ borderRadius: 12 }}>
                  <View style={styles.gridMatchBadge}>
                    <Text style={styles.gridMatchBadgeText}>{item.match} MATCH</Text>
                  </View>
                </ImageBackground>
                <View style={styles.gridItemInfo}>
                  <Text style={styles.gridItemTitle} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.gridItemSub} numberOfLines={1}>{item.sub}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.gridItemAdd}>
              <View style={styles.gridItemAddContent}>
                <View style={styles.addCircle}>
                  <Text style={styles.addPlus}>+</Text>
                </View>
                <Text style={styles.addText}>GENERATE MORE</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(246, 246, 248, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {},
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(36, 99, 235, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    backgroundColor: '#f6f6f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tabsScroll: {
    paddingHorizontal: 16,
    gap: 32,
  },
  tab: {
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2463eb',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2463eb',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  featuredSection: {
    marginBottom: 32,
  },
  featuredCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  matchBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#2463eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  matchBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  featuredContent: {
    padding: 24,
  },
  recommendedTag: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2463eb',
    letterSpacing: 2,
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  featuredDesc: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 16,
  },
  specsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  specBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  specBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#0f172a',
  },
  viewDetailsBtn: {
    backgroundColor: '#2463eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 12,
    shadowColor: '#2463eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  viewDetailsBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  gridSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  gridItem: {
    width: '47%',
    marginBottom: 8,
  },
  gridItemImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#e2e8f0',
  },
  gridMatchBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  gridMatchBadgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  gridItemInfo: {
    paddingHorizontal: 4,
  },
  gridItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  gridItemSub: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  gridItemAdd: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  gridItemAddContent: {
    alignItems: 'center',
    gap: 8,
  },
  addCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPlus: {
    fontSize: 24,
    color: '#64748b',
    marginTop: -2,
  },
  addText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748b',
    letterSpacing: 1,
  },
});
