import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Settings, Check, MapPin, FolderHeart, Bookmark, Users, UserCog, CreditCard, LogOut, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const handleSignOut = () => {
    // Navigate back to login
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Navigation */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Settings size={24} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa0QoyG9w0aqIacX1jezazMiQxNOF1vkL0SCbsW1r3tFAU_kQ5WpA5cUPIykCDeHnrXUm1Y1B2vCGKj4LfAEg0i8AcM-e4DfWwrDB_s0mpEQqdbHoZzCf3gV5QC-qST64DE7Vc_rO5eH2UYtkSFPbwpTBoVGqCwgGI-_SlZFW3489aBnnm-N0O2xI1nRTViO5y2WYf8jsFzdosnjni1RINuD-aejjx4tij2ngaS1TQ6uYLrp8u94xHZtdWGbYr2xAOvLLLRC1vfto' }} 
              style={styles.avatar} 
            />
            <View style={styles.verifiedBadge}>
              <Check size={12} color="#ffffff" strokeWidth={4} />
            </View>
          </View>
          
          <Text style={styles.name}>Vikram Sharma</Text>
          <Text style={styles.role}>Principal Architect & Builder</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={14} color="#94a3b8" />
            <Text style={styles.locationText}>Mumbai, India</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>PROJECTS</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>128</Text>
            <Text style={styles.statLabel}>VENDORS</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>560</Text>
            <Text style={styles.statLabel}>SAVED</Text>
          </View>
        </View>

        {/* Upgrade Banner */}
        <View style={styles.upgradeBanner}>
          <View style={styles.upgradeContent}>
            <Text style={styles.upgradeTitle}>Upgrade to Pro</Text>
            <Text style={styles.upgradeSubtitle}>Unlock premium features.</Text>
          </View>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Go Pro</Text>
          </TouchableOpacity>
        </View>

        {/* Settings List - Workspace */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>WORKSPACE</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/(app)/profile/portfolio' as any)}>
              <View style={styles.settingIconBox}>
                <FolderHeart size={20} color="#475569" />
              </View>
              <Text style={styles.settingText}>My Portfolio</Text>
              <ChevronRight size={20} color="#cbd5e1" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIconBox}>
                <Bookmark size={20} color="#475569" />
              </View>
              <Text style={styles.settingText}>Saved Items</Text>
              <ChevronRight size={20} color="#cbd5e1" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/(app)/profile/vendors' as any)}>
              <View style={styles.settingIconBox}>
                <Users size={20} color="#475569" />
              </View>
              <Text style={styles.settingText}>Vendors Directory</Text>
              <ChevronRight size={20} color="#cbd5e1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings List - Account */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/(app)/profile/settings' as any)}>
              <View style={styles.settingIconBox}>
                <UserCog size={20} color="#475569" />
              </View>
              <Text style={styles.settingText}>Account Settings</Text>
              <ChevronRight size={20} color="#cbd5e1" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIconBox}>
                <CreditCard size={20} color="#475569" />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingText}>Subscription Plan</Text>
                <Text style={styles.settingSubtext}>Free Tier</Text>
              </View>
              <ChevronRight size={20} color="#cbd5e1" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={[styles.settingItem, styles.signOutItem]} onPress={handleSignOut}>
              <View style={[styles.settingIconBox, styles.signOutIconBox]}>
                <LogOut size={20} color="#ef4444" />
              </View>
              <Text style={styles.signOutText}>Sign Out</Text>
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(248, 249, 250, 0.9)',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 32,
    paddingTop: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#2463eb',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  role: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
    marginLeft: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 32,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
    marginTop: 4,
    letterSpacing: 1,
  },
  upgradeBanner: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  upgradeContent: {
    flex: 1,
  },
  upgradeTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  upgradeSubtitle: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  upgradeButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  upgradeButtonText: {
    color: '#1a1a1a',
    fontSize: 12,
    fontWeight: 'bold',
  },
  settingsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  settingsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIconBox: {
    backgroundColor: '#f1f5f9',
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  settingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  settingSubtext: {
    fontSize: 10,
    fontWeight: '500',
    color: '#94a3b8',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
  },
  signOutItem: {
    backgroundColor: 'rgba(254, 242, 242, 0.5)',
  },
  signOutIconBox: {
    backgroundColor: '#fef2f2',
  },
  signOutText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },
});
