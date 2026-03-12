import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { Building2, Bell, ArrowRight, Package, Calculator, Users, LayoutTemplate, ChevronRight } from 'lucide-react-native';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoIconContainer}>
            <Building2 size={24} color="#ffffff" />
          </View>
          <Text style={styles.headerTitle}>BuildVerse</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton} onPress={() => router.push('/(app)/notifications' as any)}>
          <Bell size={24} color="#475569" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* AI Feature Hero Section */}
        <TouchableOpacity 
          style={styles.heroCard}
          onPress={() => router.push('/(app)/ai-tools/floorplan' as any)}
          activeOpacity={0.9}
        >
          <View style={styles.heroGlow} />
          
          <View style={styles.heroHeader}>
            <View style={styles.badgeContainer}>
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>NEW</Text>
              </View>
              <Text style={styles.heroSubheader}>GENERATIVE DESIGN</Text>
            </View>
          </View>

          <View style={styles.heroContentRow}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>Generate AI Floorplan</Text>
              <Text style={styles.heroSubtitle}>Turn hand-drawn sketches into professional 3D BIM models in seconds.</Text>
            </View>
            <View style={styles.heroIconContainer}>
              <View style={styles.heroIconBox}>
                <Building2 size={28} color="#ffffff" />
              </View>
            </View>
          </View>

          <View style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Start Generating</Text>
            <ArrowRight size={20} color="#2463eb" />
          </View>
        </TouchableOpacity>

        {/* Quick Tools Grid */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Professional Tools</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.toolsGrid}>
            <TouchableOpacity style={styles.toolCard} onPress={() => router.push('/(app)/marketplace/categories' as any)}>
              <View style={[styles.toolIconBox, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                <Package size={24} color="#2563eb" />
              </View>
              <Text style={styles.toolTitle}>Material Finder</Text>
              <Text style={styles.toolSubtitle}>Global sourcing</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolCard} onPress={() => router.push('/(app)/projects/cost-estimate' as any)}>
              <View style={[styles.toolIconBox, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                <Calculator size={24} color="#059669" />
              </View>
              <Text style={styles.toolTitle}>Cost Estimator</Text>
              <Text style={styles.toolSubtitle}>Real-time quotes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolCard} onPress={() => router.push('/(app)/marketplace/products' as any)}>
              <View style={[styles.toolIconBox, { backgroundColor: 'rgba(168, 85, 247, 0.1)' }]}>
                <Users size={24} color="#9333ea" />
              </View>
              <Text style={styles.toolTitle}>Vendor Search</Text>
              <Text style={styles.toolSubtitle}>Verified partners</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolCard} onPress={() => router.push('/(app)/marketplace/design' as any)}>
              <View style={[styles.toolIconBox, { backgroundColor: 'rgba(249, 115, 22, 0.1)' }]}>
                <LayoutTemplate size={24} color="#ea580c" />
              </View>
              <Text style={styles.toolTitle}>Design Templates</Text>
              <Text style={styles.toolSubtitle}>High-end assets</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trending Designs */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Designs</Text>
            <TouchableOpacity style={styles.seeMoreButton}>
              <Text style={styles.seeMoreText}>See More</Text>
              <ChevronRight size={16} color="#64748b" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            
            <TouchableOpacity style={styles.trendingCard} activeOpacity={0.9} onPress={() => router.push('/(app)/marketplace/design' as any)}>
              <ImageBackground 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC--NKsZ9OU2BcttXapqWtJ3vEPuD4b73qmc3-op36wU_AB9iW6p2-LmsrvAMMp8kPJglc9LV1esmWv4_McS3uJhDoI_sVSqUEPwwPAvjtSRY02Yy7x6h23sni5j2drEaGENtUgAhqGiqTi_EEKHp0mQl1x-8PcWORUTvEztW6fRE-ZiPTjJHqUiq0-WpRxXZIlM00TWH1lzChFLHAk8S0-TApmRv-hguAAhfPa_63vaxohm3J-rs0H1Sh9CZ2BT1CNil0-bgxuLqI' }} 
                style={styles.trendingImage}
                imageStyle={{ borderRadius: 16 }}
              >
                <View style={styles.trendingGradient}>
                  <View style={styles.trendingContent}>
                    <View style={styles.trendingBadge}>
                      <Text style={styles.trendingBadgeText}>RESIDENTIAL</Text>
                    </View>
                    <Text style={styles.trendingTitle}>The Brutalist Sanctuary</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.trendingCard} activeOpacity={0.9} onPress={() => router.push('/(app)/marketplace/design' as any)}>
              <ImageBackground 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFMz5NtVR7L44yshsDSlrZ6EBvVEz2rtUhMmcQ9DGsFN0SQWUhohnKhUHgqu_xzIDTHXEqj8GTbjYJYTI59FxgJAEC51EPuzZ1Pc2rmW25p7TTqAH10DWohYbBaOXWVA9BSf3IcqebzCzF0ngFcaFCRMJsrL7VlH2MgZryq_6ClnycDl5BkeYdKzXbO1xqpWJ3mtKyoSxDaBYY1zIO1zb7lHp-xDVNf9nDI_D950hZlZc-EaXZHC2_VdVBdGaxJSHFN1bxLHaqGyE' }} 
                style={styles.trendingImage}
                imageStyle={{ borderRadius: 16 }}
              >
                <View style={styles.trendingGradient}>
                  <View style={styles.trendingContent}>
                    <View style={styles.trendingBadge}>
                      <Text style={styles.trendingBadgeText}>COMMERCIAL</Text>
                    </View>
                    <Text style={styles.trendingTitle}>Pixel Matrix Tower</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.5)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconContainer: {
    backgroundColor: '#1a1a1a',
    padding: 8,
    borderRadius: 12,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  notificationButton: {
    padding: 10,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2463eb',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  heroCard: {
    margin: 24,
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    borderRadius: 24,
    padding: 28,
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(36, 99, 235, 0.2)',
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newBadge: {
    backgroundColor: '#2463eb',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  newBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  heroSubheader: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  heroContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    lineHeight: 22,
  },
  heroIconContainer: {
    justifyContent: 'center',
  },
  heroIconBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
  },
  heroButtonText: {
    color: '#2463eb',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  sectionContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  viewAllText: {
    color: '#2463eb',
    fontSize: 14,
    fontWeight: 'bold',
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeMoreText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 2,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  toolIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  toolSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  horizontalScroll: {
    paddingRight: 24,
  },
  trendingCard: {
    width: 256,
    height: 320,
    marginRight: 20,
    borderRadius: 16,
    backgroundColor: '#cbd5e1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  trendingImage: {
    flex: 1,
    borderRadius: 16,
  },
  trendingGradient: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)', // Simulating a simple overlay gradient
  },
  trendingContent: {
    padding: 20,
  },
  trendingBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  trendingBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  trendingTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
