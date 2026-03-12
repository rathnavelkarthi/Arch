import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Share2, Lock, ShieldCheck, Phone, Mail } from 'lucide-react-native';
import { router } from 'expo-router';

export default function VendorPaywallScreen() {
  const mockVendor = {
    name: 'Shreeji Marble & Granite',
    location: 'Mumbai, India',
    rating: '4.8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnWC3yfwe57R_5uR3E3bI-JcelUnbFBsChMk0i9toioKf4H3NWuJzoTRWmqU2xkyL9M8q4PgsIYXNVMuY5p3XQppi5TKYJ5jRxpnw-88cgSEhfuGTtylvBwq_Ny0AnogISY6a3l0z2OHwx8F73_iwN5FLLiTCGv4ZUnwKq5f1ekBVK3GX3mV9NjU9g23DL5VL7d9_l5g7_G9C6gq2jHo1vk3j9D1WWpwpiYzyVlJzPTlnVFW07utboaK4sF40vApW89usOm4_7VPo',
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vendor Details</Text>
        <TouchableOpacity style={{ padding: 8 }}>
          <Share2 size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      {/* Vendor Header */}
      <View style={styles.vendorHeader}>
        <Image source={{ uri: mockVendor.image }} style={styles.vendorImage} />
        <View style={styles.vendorInfo}>
          <Text style={styles.vendorName}>{mockVendor.name}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>{'\u2605'} {mockVendor.rating}</Text>
            <Text style={styles.dotSeparator}>{'\u2022'}</Text>
            <Text style={styles.locationText}>{mockVendor.location}</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>EXPERIENCE</Text>
          <Text style={styles.statValue}>12+ Yrs</Text>
        </View>
        <View style={[styles.statItem, styles.statBorder]}>
          <Text style={styles.statLabel}>PROJECTS</Text>
          <Text style={styles.statValue}>450+</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>CATEGORY</Text>
          <Text style={styles.statValue}>Stones</Text>
        </View>
      </View>

      {/* Contact Section with Lock */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Contact Information</Text>

        {/* Blurred Contacts */}
        <View style={styles.blurredContacts}>
          <View style={styles.contactRow}>
            <View style={styles.contactIcon}><Phone size={20} color="#a1a1aa" /></View>
            <View>
              <Text style={styles.contactLabel}>PHONE</Text>
              <Text style={styles.contactValue}>+91 98XXX XXXXX</Text>
            </View>
          </View>
          <View style={styles.contactRow}>
            <View style={styles.contactIcon}><Mail size={20} color="#a1a1aa" /></View>
            <View>
              <Text style={styles.contactLabel}>EMAIL ADDRESS</Text>
              <Text style={styles.contactValue}>contact@elitemarble.com</Text>
            </View>
          </View>
        </View>

        {/* Paywall Overlay */}
        <View style={styles.paywallOverlay}>
          <View style={styles.paywallCard}>
            <View style={styles.lockCircle}>
              <Lock size={24} color="#ffffff" />
            </View>

            <Text style={styles.paywallTitle}>Unlock Direct Access</Text>
            <Text style={styles.paywallDesc}>
              Get verified phone numbers and direct emails for this vendor to start negotiating.
            </Text>

            <View style={styles.priceRow}>
              <Text style={styles.oldPrice}>{'\u20B9'}299</Text>
              <Text style={styles.newPrice}>{'\u20B9'}99</Text>
              <View style={styles.oneTimeBadge}>
                <Text style={styles.oneTimeText}>ONE-TIME</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.unlockBtn}>
              <Text style={styles.unlockBtnText}>Unlock Now</Text>
            </TouchableOpacity>

            <View style={styles.secureRow}>
              <ShieldCheck size={14} color="#94a3b8" />
              <Text style={styles.secureText}>SECURE STRIPE CHECKOUT</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#f1f5f9',
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  vendorHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 20, padding: 24,
  },
  vendorImage: {
    width: 96, height: 96, borderRadius: 20, backgroundColor: '#f1f5f9',
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  vendorInfo: { flex: 1, gap: 4 },
  vendorName: { fontSize: 24, fontWeight: '800', color: '#0f172a' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ratingText: { color: '#f59e0b', fontWeight: 'bold', fontSize: 14 },
  dotSeparator: { color: '#cbd5e1' },
  locationText: { color: '#64748b', fontSize: 14 },
  statsBar: {
    flexDirection: 'row', marginHorizontal: 24, padding: 16, borderRadius: 20,
    backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 32,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statBorder: {
    borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#e2e8f0',
  },
  statLabel: { fontSize: 9, fontWeight: 'bold', color: '#94a3b8', letterSpacing: 1.5, marginBottom: 4 },
  statValue: { fontSize: 15, fontWeight: 'bold', color: '#0f172a' },
  contactSection: { paddingHorizontal: 24, flex: 1 },
  contactTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 16 },
  blurredContacts: { gap: 12, opacity: 0.4 },
  contactRow: {
    flexDirection: 'row', alignItems: 'center', gap: 16, padding: 20,
    borderRadius: 20, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#f1f5f9',
  },
  contactIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#e2e8f0',
    alignItems: 'center', justifyContent: 'center',
  },
  contactLabel: { fontSize: 9, color: '#94a3b8', fontWeight: 'bold', letterSpacing: 1.5 },
  contactValue: { fontSize: 15, fontWeight: 'bold', color: '#0f172a' },
  paywallOverlay: {
    position: 'absolute', top: 40, left: 0, right: 0, bottom: 0,
  },
  paywallCard: {
    backgroundColor: 'rgba(255,255,255,0.97)', borderRadius: 24, padding: 28,
    borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1, shadowRadius: 20, elevation: 10,
  },
  lockCircle: {
    backgroundColor: '#0f172a', padding: 14, borderRadius: 28, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 5,
  },
  paywallTitle: { fontSize: 22, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  paywallDesc: { fontSize: 14, color: '#64748b', textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  priceRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24,
    backgroundColor: '#f8fafc', paddingVertical: 12, paddingHorizontal: 20,
    borderRadius: 16, borderWidth: 1, borderColor: '#f1f5f9',
  },
  oldPrice: { color: '#94a3b8', textDecorationLine: 'line-through', fontSize: 14 },
  newPrice: { fontSize: 32, fontWeight: '900', color: '#0f172a' },
  oneTimeBadge: { backgroundColor: '#fef3c7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  oneTimeText: { color: '#b45309', fontSize: 9, fontWeight: '900', textTransform: 'uppercase' },
  unlockBtn: {
    width: '100%', backgroundColor: '#0f172a', padding: 16, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  unlockBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  secureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  secureText: { fontSize: 9, color: '#94a3b8', fontWeight: 'bold', letterSpacing: 2 },
});
