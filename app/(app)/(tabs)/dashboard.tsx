import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { 
  Bell, ArrowRight, Package, Calculator, Users, LayoutTemplate, 
  ChevronRight, Upload, House, Compass, Sparkles, DraftingCompass, 
  Layers, Eye, FolderKanban
} from 'lucide-react-native';

export default function DashboardScreen() {
  const [activeSide, setActiveSide] = useState<'client' | 'architect'>('client');

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Apple Navigation Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoIconContainer}>
            <House size={22} color="#ffffff" strokeWidth={1.8} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Ilam Mora</Text>
            <Text style={styles.headerSubtitle}>Curated Living & Architectural Studio</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            accessibilityRole="button" 
            accessibilityLabel="Notifications" 
            style={styles.notificationButton} 
            onPress={() => router.push('/(app)/notifications' as any)}
            activeOpacity={0.8}
          >
            <Bell size={20} color="#1c1c1e" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Apple-style Segmented Control for the Two Sides */}
      <View style={styles.segmentedWrapper}>
        <View style={styles.segmentedContainer}>
          <TouchableOpacity 
            style={[styles.segmentBtn, activeSide === 'client' && styles.segmentBtnActive]}
            onPress={() => setActiveSide('client')}
            activeOpacity={0.85}
          >
            <House size={16} color={activeSide === 'client' ? '#0f172a' : '#8e8e93'} />
            <Text style={[styles.segmentText, activeSide === 'client' && styles.segmentTextActive]}>
              Client & Homeowner
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.segmentBtn, activeSide === 'architect' && styles.segmentBtnActive]}
            onPress={() => setActiveSide('architect')}
            activeOpacity={0.85}
          >
            <DraftingCompass size={16} color={activeSide === 'architect' ? '#0f172a' : '#8e8e93'} />
            <Text style={[styles.segmentText, activeSide === 'architect' && styles.segmentTextActive]}>
              Architect & Studio
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ======================================================== */}
        {/* ARCHITECT & DEVELOPER STUDIO SIDE                         */}
        {/* ======================================================== */}
        {activeSide === 'architect' ? (
          <>
            {/* Studio Mode Indicator Badge */}
            <View style={styles.modeBadgeRow}>
              <View style={[styles.statusDot, { backgroundColor: '#10b981' }]} />
              <Text style={styles.modeBadgeText}>Architect & Developer Studio Mode</Text>
            </View>

            {/* 2D & 3D Generative AI Suite Hero */}
            <TouchableOpacity 
              accessibilityRole="button" 
              style={styles.architectHeroCard}
              onPress={() => router.push('/(app)/ai-tools' as any)}
              activeOpacity={0.92}
            >
              <View style={styles.heroHeader}>
                <View style={styles.badgeContainer}>
                  <View style={styles.architectBadge}>
                    <Sparkles size={12} color="#ffffff" style={{ marginRight: 4 }} />
                    <Text style={styles.newBadgeText}>2D / 3D BIM</Text>
                  </View>
                  <Text style={styles.heroSubheader}>GENERATIVE PLANNING</Text>
                </View>
              </View>

              <View style={styles.heroContentRow}>
                <View style={styles.heroTextContainer}>
                  <Text style={styles.heroTitle}>2D & 3D AI Planning</Text>
                  <Text style={styles.heroSubtitle}>
                    Convert site boundaries and rough sketches into compliant 3D models and precise floorplans.
                  </Text>
                </View>
                <View style={styles.heroIconContainer}>
                  <View style={styles.heroIconBoxDark}>
                    <Layers size={26} color="#ffffff" />
                  </View>
                </View>
              </View>

              <View style={styles.heroActionRow}>
                <View style={styles.heroButtonPrimary}>
                  <Text style={styles.heroButtonPrimaryText}>Open 2D & 3D Planner</Text>
                  <ArrowRight size={18} color="#ffffff" />
                </View>
                <TouchableOpacity 
                  style={styles.heroButtonOutline}
                  onPress={() => router.push('/(app)/ai-tools/results' as any)}
                >
                  <Eye size={16} color="#0f172a" />
                  <Text style={styles.heroButtonOutlineText}>View 3D Variants</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {/* Add & List Property (For Architects & Developers) */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Property & Land Development</Text>
              </View>
              <TouchableOpacity 
                accessibilityRole="button" 
                style={styles.uploadPropertyCard} 
                onPress={() => router.push('/property/new')}
                activeOpacity={0.9}
              >
                <View style={styles.uploadIconCircle}>
                  <Upload size={22} color="#0f172a" />
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={styles.uploadCardTitle}>Add & List a Property</Text>
                  <Text style={styles.uploadCardSubtitle}>
                    Register plot boundaries, villas or farmhouses for development & clients.
                  </Text>
                </View>
                <ArrowRight size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Architect Core Suite Grid */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Studio Tool Suite</Text>
                <TouchableOpacity onPress={() => router.push('/(app)/marketplace/design' as any)}>
                  <Text style={styles.viewAllText}>Browse All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.toolsGrid}>
                {/* 1. Cost Estimator */}
                <TouchableOpacity 
                  style={styles.toolCard} 
                  onPress={() => router.push('/(app)/projects/cost-estimate' as any)}
                  activeOpacity={0.85}
                >
                  <View style={[styles.toolIconBox, { backgroundColor: 'rgba(16, 185, 129, 0.12)' }]}>
                    <Calculator size={22} color="#059669" />
                  </View>
                  <Text style={styles.toolTitle}>Cost Estimator</Text>
                  <Text style={styles.toolSubtitle}>Real-time quotes & BOQ</Text>
                </TouchableOpacity>

                {/* 2. Vendor Search ("Wonder Search") */}
                <TouchableOpacity 
                  style={styles.toolCard} 
                  onPress={() => router.push('/(app)/marketplace/products' as any)}
                  activeOpacity={0.85}
                >
                  <View style={[styles.toolIconBox, { backgroundColor: 'rgba(147, 51, 234, 0.12)' }]}>
                    <Users size={22} color="#9333ea" />
                  </View>
                  <Text style={styles.toolTitle}>Vendor Search</Text>
                  <Text style={styles.toolSubtitle}>Verified trade suppliers</Text>
                </TouchableOpacity>

                {/* 3. Material Finder */}
                <TouchableOpacity 
                  style={styles.toolCard} 
                  onPress={() => router.push('/(app)/marketplace/categories' as any)}
                  activeOpacity={0.85}
                >
                  <View style={[styles.toolIconBox, { backgroundColor: 'rgba(37, 99, 235, 0.12)' }]}>
                    <Package size={22} color="#2563eb" />
                  </View>
                  <Text style={styles.toolTitle}>Material Finder</Text>
                  <Text style={styles.toolSubtitle}>Specs & procurement</Text>
                </TouchableOpacity>

                {/* 4. Design Templates */}
                <TouchableOpacity 
                  style={styles.toolCard} 
                  onPress={() => router.push('/(app)/marketplace/design' as any)}
                  activeOpacity={0.85}
                >
                  <View style={[styles.toolIconBox, { backgroundColor: 'rgba(234, 88, 12, 0.12)' }]}>
                    <LayoutTemplate size={22} color="#ea580c" />
                  </View>
                  <Text style={styles.toolTitle}>Design Templates</Text>
                  <Text style={styles.toolSubtitle}>Architectural blueprints</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Active Projects Hub */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Active Projects Workspace</Text>
                <TouchableOpacity onPress={() => router.push('/(app)/(tabs)/projects' as any)}>
                  <Text style={styles.viewAllText}>Open Hub</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity 
                style={styles.projectSnippetCard} 
                onPress={() => router.push('/(app)/(tabs)/projects' as any)}
                activeOpacity={0.9}
              >
                <View style={styles.projectHeaderRow}>
                  <View>
                    <Text style={styles.projectCardTitle}>Antilia Enclave · Phase II</Text>
                    <Text style={styles.projectCardSubtitle}>Luxury Residential Development</Text>
                  </View>
                  <View style={styles.inProgressBadge}>
                    <Text style={styles.inProgressText}>ACTIVE</Text>
                  </View>
                </View>
                <View style={styles.projectMetaRow}>
                  <Text style={styles.projectMetaText}>Cost Est: ₹14,25,000</Text>
                  <Text style={styles.projectMetaText}>Completion: 68%</Text>
                </View>
                <View style={styles.progressBarTrack}>
                  <View style={[styles.progressBarFill, { width: '68%' }]} />
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          /* ======================================================== */
          /* CLIENT & HOMEOWNER SIDE                                  */
          /* ======================================================== */
          <>
            {/* Client Mode Indicator Badge */}
            <View style={styles.modeBadgeRow}>
              <View style={[styles.statusDot, { backgroundColor: '#2563eb' }]} />
              <Text style={styles.modeBadgeText}>Client & Homeowner Discovery Mode</Text>
            </View>

            {/* Client Hero Card */}
            <TouchableOpacity 
              accessibilityRole="button" 
              style={styles.clientHeroCard}
              onPress={() => router.push('/(discover)/properties' as any)}
              activeOpacity={0.92}
            >
              <View style={styles.badgeContainer}>
                <View style={styles.clientBadge}>
                  <Text style={styles.newBadgeText}>CURATED</Text>
                </View>
                <Text style={styles.clientHeroSubheader}>FIND YOUR PLACE</Text>
              </View>
              <Text style={styles.clientHeroTitle}>Find your sanctuary.{'\n'}Make it home.</Text>
              <Text style={styles.clientHeroSubtitle}>
                Discover vetted courtyard residences, farmhouses, and connect with premier architects.
              </Text>
              <View style={styles.clientHeroButton}>
                <Text style={styles.clientHeroButtonText}>Explore Properties</Text>
                <ArrowRight size={18} color="#0f172a" />
              </View>
            </TouchableOpacity>

            {/* Core Discovery Portals */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Discovery & Services</Text>
              </View>

              <View style={styles.portalCardsList}>
                {/* Properties */}
                <TouchableOpacity 
                  style={styles.portalCard} 
                  onPress={() => router.push('/(discover)/properties')}
                  activeOpacity={0.88}
                >
                  <View style={[styles.portalIconBox, { backgroundColor: '#f0fdf4' }]}>
                    <House size={24} color="#16a34a" />
                  </View>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={styles.portalCardTitle}>Browse Properties</Text>
                    <Text style={styles.portalCardDesc}>
                      Villas, plots, courtyard homes & farmhouses across South India
                    </Text>
                  </View>
                  <ChevronRight size={20} color="#94a3b8" />
                </TouchableOpacity>

                {/* Architects */}
                <TouchableOpacity 
                  style={styles.portalCard} 
                  onPress={() => router.push('/(discover)/architects')}
                  activeOpacity={0.88}
                >
                  <View style={[styles.portalIconBox, { backgroundColor: '#f5f3ff' }]}>
                    <Compass size={24} color="#7c3aed" />
                  </View>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={styles.portalCardTitle}>Find Your Architect</Text>
                    <Text style={styles.portalCardDesc}>
                      Consult vetted architectural partners matching your aesthetic and language
                    </Text>
                  </View>
                  <ChevronRight size={20} color="#94a3b8" />
                </TouchableOpacity>

                {/* Projects for Architects */}
                <TouchableOpacity 
                  style={styles.portalCard} 
                  onPress={() => router.push('/(app)/(tabs)/projects')}
                  activeOpacity={0.88}
                >
                  <View style={[styles.portalIconBox, { backgroundColor: '#f0fdfa' }]}>
                    <FolderKanban size={24} color="#0d9488" />
                  </View>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={styles.portalCardTitle}>Projects for Architects</Text>
                    <Text style={styles.portalCardDesc}>
                      View active design proposals, blueprints, building milestones and briefs
                    </Text>
                  </View>
                  <ChevronRight size={20} color="#94a3b8" />
                </TouchableOpacity>

                {/* Astrology & Vastu */}
                <TouchableOpacity 
                  style={styles.portalCard} 
                  onPress={() => router.push('/(discover)/astrology')}
                  activeOpacity={0.88}
                >
                  <View style={[styles.portalIconBox, { backgroundColor: '#fff7ed' }]}>
                    <Sparkles size={24} color="#ea580c" />
                  </View>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={styles.portalCardTitle}>Astrology & Vastu</Text>
                    <Text style={styles.portalCardDesc}>
                      Culturally grounded orientation and daylight planning checklists
                    </Text>
                  </View>
                  <ChevronRight size={20} color="#94a3b8" />
                </TouchableOpacity>

                {/* Cost Estimator for Clients */}
                <TouchableOpacity 
                  style={styles.portalCard} 
                  onPress={() => router.push('/(app)/projects/cost-estimate' as any)}
                  activeOpacity={0.88}
                >
                  <View style={[styles.portalIconBox, { backgroundColor: '#eff6ff' }]}>
                    <Calculator size={24} color="#2563eb" />
                  </View>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={styles.portalCardTitle}>Construction Cost Estimator</Text>
                    <Text style={styles.portalCardDesc}>
                      Calculate realistic building and interior costs before breaking ground
                    </Text>
                  </View>
                  <ChevronRight size={20} color="#94a3b8" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Active Architect Projects Collaboration Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Architect Projects Hub</Text>
                <TouchableOpacity onPress={() => router.push('/(app)/(tabs)/projects')}>
                  <Text style={styles.viewAllText}>Open Projects</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity 
                style={styles.projectSnippetCard} 
                onPress={() => router.push('/(app)/(tabs)/projects')}
                activeOpacity={0.9}
              >
                <View style={styles.projectHeaderRow}>
                  <View>
                    <Text style={styles.projectCardTitle}>Villa Serenity · Architecture Proposal</Text>
                    <Text style={styles.projectCardSubtitle}>Design Studio: Vastu & Contemporary Living</Text>
                  </View>
                  <View style={[styles.inProgressBadge, { backgroundColor: '#eff6ff' }]}>
                    <Text style={[styles.inProgressText, { color: '#2563eb' }]}>PROPOSAL</Text>
                  </View>
                </View>
                <View style={styles.projectMetaRow}>
                  <Text style={styles.projectMetaText}>Design Phase: 2D Floorplan & 3D Render</Text>
                  <Text style={styles.projectMetaText}>Status: In Review</Text>
                </View>
                <View style={styles.progressBarTrack}>
                  <View style={[styles.progressBarFill, { width: '45%', backgroundColor: '#2563eb' }]} />
                </View>
              </TouchableOpacity>
            </View>

            {/* List Property for Owners */}
            <View style={styles.sectionContainer}>
              <TouchableOpacity 
                style={styles.propertyOwnerBanner}
                onPress={() => router.push('/property/new')}
                activeOpacity={0.9}
              >
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={styles.ownerBannerTitle}>Selling or Listing a Property?</Text>
                  <Text style={styles.ownerBannerDesc}>
                    List your home or plot directly with Ilam Mora&apos;s verified architect network.
                  </Text>
                </View>
                <View style={styles.ownerBannerBtn}>
                  <Text style={styles.ownerBannerBtnText}>List Property</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* ======================================================== */}
        {/* SHARED: TRENDING ARCHITECTURAL DESIGNS                   */}
        {/* ======================================================== */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Curated Architectural Designs</Text>
            <TouchableOpacity style={styles.seeMoreButton} onPress={() => router.push('/(app)/marketplace/design')}>
              <Text style={styles.seeMoreText}>Explore Gallery</Text>
              <ChevronRight size={16} color="#64748b" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            
            <TouchableOpacity 
              style={styles.trendingCard} 
              activeOpacity={0.9} 
              onPress={() => router.push('/(app)/marketplace/design' as any)}
            >
              <ImageBackground 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC--NKsZ9OU2BcttXapqWtJ3vEPuD4b73qmc3-op36wU_AB9iW6p2-LmsrvAMMp8kPJglc9LV1esmWv4_McS3uJhDoI_sVSqUEPwwPAvjtSRY02Yy7x6h23sni5j2drEaGENtUgAhqGiqTi_EEKHp0mQl1x-8PcWORUTvEztW6fRE-ZiPTjJHqUiq0-WpRxXZIlM00TWH1lzChFLHAk8S0-TApmRv-hguAAhfPa_63vaxohm3J-rs0H1Sh9CZ2BT1CNil0-bgxuLqI' }} 
                style={styles.trendingImage}
                imageStyle={{ borderRadius: 18 }}
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

            <TouchableOpacity 
              style={styles.trendingCard} 
              activeOpacity={0.9} 
              onPress={() => router.push('/(app)/marketplace/design' as any)}
            >
              <ImageBackground 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFMz5NtVR7L44yshsDSlrZ6EBvVEz2rtUhMmcQ9DGsFN0SQWUhohnKhUHgqu_xzIDTHXEqj8GTbjYJYTI59FxgJAEC51EPuzZ1Pc2rmW25p7TTqAH10DWohYbBaOXWVA9BSf3IcqebzCzF0ngFcaFCRMJsrL7VlH2MgZryq_6ClnycDl5BkeYdKzXbO1xqpWJ3mtKyoSxDaBYY1zIO1zb7lHp-xDVNf9nDI_D950hZlZc-EaXZHC2_VdVBdGaxJSHFN1bxLHaqGyE' }} 
                style={styles.trendingImage}
                imageStyle={{ borderRadius: 18 }}
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

            <TouchableOpacity 
              style={styles.trendingCard} 
              activeOpacity={0.9} 
              onPress={() => router.push('/(app)/marketplace/design' as any)}
            >
              <ImageBackground 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXOB50xnSJo0w7qcK4QiMqtR3C6Vr5Pn50A_-0iYkS3dGkguFM2yixUauBQ4bBSEFGl-wJBFi1jDjGH3xHV-UoFq4wDhF24luv-z1p-Z-eO3coyX1DvoKu1blbk9dDiKIxzSCkeSrmiYTPDzmuWZo6ase_XQPEBvhVEBmnFNSDuLuYQBr6d2z5hA0gWrWyMZRcgNa23SdGxihxPp45kRA1Lr05P2crrR12DGp625x1zS3mFJmacmE18MdtIJtNIjKuJ8kyrspxbI8' }} 
                style={styles.trendingImage}
                imageStyle={{ borderRadius: 18 }}
              >
                <View style={styles.trendingGradient}>
                  <View style={styles.trendingContent}>
                    <View style={styles.trendingBadge}>
                      <Text style={styles.trendingBadgeText}>VILLA</Text>
                    </View>
                    <Text style={styles.trendingTitle}>The Glass Pavilion</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoIconContainer: {
    backgroundColor: '#0f172a',
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.4,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  segmentedWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 3,
    gap: 4,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    gap: 7,
  },
  segmentBtnActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748b',
  },
  segmentTextActive: {
    color: '#0f172a',
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  modeBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  modeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    letterSpacing: 0.2,
  },
  // Architect Hero
  architectHeroCard: {
    backgroundColor: '#0f172a',
    borderRadius: 22,
    padding: 22,
    marginBottom: 24,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },
  heroHeader: {
    marginBottom: 14,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  architectBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 6,
  },
  newBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroSubheader: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 19,
  },
  heroIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroIconBoxDark: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroActionRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  heroButtonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  heroButtonPrimaryText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  heroButtonOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  heroButtonOutlineText: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '600',
  },
  // Client Hero
  clientHeroCard: {
    backgroundColor: '#e0e7ff',
    borderRadius: 22,
    padding: 22,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#c7d2fe',
  },
  clientBadge: {
    backgroundColor: '#3730a3',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  clientHeroSubheader: {
    color: '#4338ca',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  clientHeroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e1b4b',
    marginTop: 10,
    marginBottom: 8,
    lineHeight: 30,
    letterSpacing: -0.4,
  },
  clientHeroSubtitle: {
    fontSize: 13,
    color: '#4338ca',
    lineHeight: 19,
    marginBottom: 16,
  },
  clientHeroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  clientHeroButtonText: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '600',
  },
  // Upload Property
  uploadPropertyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 14,
  },
  uploadIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  uploadCardSubtitle: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 17,
  },
  // Section Headers
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.3,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563eb',
  },
  // Tools Grid
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  toolCard: {
    backgroundColor: '#ffffff',
    width: '48%',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  toolIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  toolSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  // Portals List (Client Mode)
  portalCardsList: {
    gap: 10,
  },
  portalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 14,
  },
  portalIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  portalCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  portalCardDesc: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16,
  },
  // Owner banner
  propertyOwnerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    gap: 12,
  },
  ownerBannerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  ownerBannerDesc: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16,
  },
  ownerBannerBtn: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  ownerBannerBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  // Active Project Snippet
  projectSnippetCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  projectHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  projectCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  projectCardSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  inProgressBadge: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  inProgressText: {
    color: '#059669',
    fontSize: 10,
    fontWeight: '700',
  },
  projectMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectMetaText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f1f5f9',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 3,
  },
  // Horizontal Trending
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeMoreText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  horizontalScroll: {
    paddingRight: 20,
    gap: 14,
  },
  trendingCard: {
    width: 260,
    height: 170,
    borderRadius: 18,
    overflow: 'hidden',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  trendingGradient: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    padding: 14,
    height: '100%',
    justifyContent: 'flex-end',
  },
  trendingContent: {
    gap: 6,
  },
  trendingBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  trendingBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
