import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Share2, MoreVertical, MapPin, Calendar, Star, CheckCircle, Shield, Award, MessageSquare } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function VendorDetailScreen() {
  const { id } = useLocalSearchParams();

  const mockVendor = {
    name: 'Shreeji Marble & Granite',
    tier: 'Gold Tier',
    desc: 'Premium Structural Steel & Concrete Specialist',
    location: 'Mumbai, India',
    since: '2005',
    rating: '4.8',
    reviews: '842',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDArv6o3vPGmzB--MSHL2bUkaDRhJxhg5hF5YYIQ7yZcI7yqZc2rGe6l4xbZTToIX8_cGE0ckj-y3rv_JAiZBC14CAXk7PaByA1-cUhZzds0vlcmfG3xozgZwfT4q2ms_VkLHb3aEJA8YQk0ST70Oo0JcXsb_pe5Vrax9QHs3Q7ARwKGnrrbVbNAHcdBOBYn12XwF0Rzf-f6F9EvD1R_T8a2sQrFbNKtwn7xzwRgH4zbSfkygXVwpkMd54CWsuzLATblbOc0_3pxSA',
    stats: [
      { label: 'Completed Projects', value: '1.2k+' },
      { label: 'Experience', value: '18 Yrs' },
      { label: 'On-time Delivery', value: '99.2%' },
      { label: 'Active Catalog', value: '450+' },
    ],
    catalog: [
      { title: 'Structural I-Beam Grade A572', price: 'From ₹9,500/unit', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBfsu_U1MYgxPw8phRbeLEykvSYnMEw5dJf7xuBUbI-DaNhbVmTpKDqHW4gZSvK1ZbeWczZCjS9fvCoUupdqYNV1MdMhQGMeVJaKvIGRG0vl1gNTYwvMW5FPpEETTztf6cvxsEqTCtxJH4c6w7OLQTkv2JUkrlEyY3T54Sj0owRhUksEm1OCsZA30-S_juCw8O7IulCJ_MYvqOdtM7P_XmWXbTQwz0a6IegM35baAW9yT7o2iV4azm_udy9A6xPbjDwAA9ftX41wQ' },
      { title: 'Quick-Set High Strength Concrete', price: '₹11,500/m3', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByX7OLmbwepnLJDbBioFREift3rib5dz2HqGpilsupaXArcSSvdoQnhE49-nnm7dm_SGa5eF5fziPba4T9chjMpcKBsIgHI-oApIe6lBTM6sINChuhNAo9pMhZjGv4IdowJUFXPVQzvfV_DwX7EXP2vzITiuJTAZ0VVthOFquhOTMLK_0VFWZwv1qocR8HFx-UHfNzyYEKtdaYZorfwP8-03pL17ICdoLuzFB8sz_yTMGgMxr3wGXsw9fMe4tB_pd_esFeBd20Qks' },
      { title: 'Epoxy Coated Rebar #4', price: '₹1,500/ea', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA603jFf6NMId9yuCxCj4mquJ3K1OJqxEE6rFs8i85gZ_51IYI_IvJo0ZkTSDZhcYSdgvskXhoeO3TosYC6OZwzQAZi_9kdplqA_AFWD9xgVWj4cjxt35TalEYolYALpQbUc0QbdXtoUXv6zb-vIY3R1IJ7w7i6dttQSQHm8-wD60agvXs7FW0bkiflDEWnlphGnCf6KIUhl8xx4ZaCxbWjuREMaPAckLMIWEeO3tlwRVLUjsX2etUsGLG1iujrVdGGQKs20gn9SJY' },
    ],
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={20} color="#475569" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Supplier Profile</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.actionBtn}><Share2 size={20} color="#475569" /></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><MoreVertical size={20} color="#475569" /></TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroSection}>
          <View style={styles.heroRow}>
            <View>
              <Image source={{ uri: mockVendor.image }} style={styles.vendorAvatar} />
              <View style={styles.verifiedBadge}>
                <Shield size={14} color="#ffffff" fill="#ffffff" />
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
              <View style={styles.nameRow}>
                <Text style={styles.vendorName}>{mockVendor.name}</Text>
                <View style={styles.tierBadge}>
                  <Text style={styles.tierText}>{mockVendor.tier}</Text>
                </View>
              </View>
              <Text style={styles.vendorDesc}>{mockVendor.desc}</Text>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <MapPin size={14} color="#64748b" />
                  <Text style={styles.metaText}>{mockVendor.location}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Calendar size={14} color="#64748b" />
                  <Text style={styles.metaText}>Since {mockVendor.since}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Star size={14} color="#eab308" fill="#eab308" />
                  <Text style={styles.metaText}>{mockVendor.rating} ({mockVendor.reviews})</Text>
                </View>
              </View>

              <View style={styles.ctas}>
                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={() => router.push(`/(app)/marketplace/vendor/${id}/paywall` as any)}
                >
                  <Award size={16} color="#ffffff" />
                  <Text style={styles.primaryBtnText}>Request Price</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryBtn}>
                  <MessageSquare size={16} color="#475569" />
                  <Text style={styles.secondaryBtnText}>Message</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          {mockVendor.stats.map((stat, idx) => (
            <View key={idx} style={styles.statCard}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* About */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionTitle}>About the Supplier</Text>
          <Text style={styles.aboutText}>
            Ilam Mora Pro Supplies is a leading provider of high-grade construction materials across the region. We specialize in custom-fabricated structural steel, reinforced concrete solutions, and sustainable building components. Our facility holds ISO 9001 certification and we are committed to providing carbon-neutral delivery options for large-scale urban developments.
          </Text>
        </View>

        {/* Catalog */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Catalog Items</Text>
            <Text style={styles.viewAllText}>View All</Text>
          </View>
          <View style={styles.catalogList}>
            {mockVendor.catalog.map((item, idx) => (
              <View key={idx} style={styles.catalogCard}>
                <Image source={{ uri: item.image }} style={styles.catalogImage} />
                <View style={styles.catalogInfo}>
                  <Text style={styles.catalogTitle}>{item.title}</Text>
                  <Text style={styles.catalogMeta}>Available in custom lengths</Text>
                  <View style={styles.catalogFooter}>
                    <Text style={styles.catalogPrice}>{item.price}</Text>
                    <TouchableOpacity style={styles.addBtn}>
                      <Text style={styles.addBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Verification */}
        <View style={[styles.sectionWrap, { marginBottom: 40 }]}>
          <View style={styles.verificationCard}>
            <Text style={styles.sectionTitle}>Verified Status</Text>
            <View style={{ gap: 16, marginTop: 16 }}>
              <View style={styles.verifyRow}>
                <CheckCircle size={20} color="#22c55e" fill="#22c55e" />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.verifyTitle}>License & Insurance</Text>
                  <Text style={styles.verifyDesc}>Verified by Ilam Mora Compliance Team</Text>
                </View>
              </View>
              <View style={styles.verifyRow}>
                <CheckCircle size={20} color="#22c55e" fill="#22c55e" />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.verifyTitle}>Credit Score: 840/850</Text>
                  <Text style={styles.verifyDesc}>Excellent financial reliability rating</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#e2e8f0',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#e2e8f0',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  headerRight: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#e2e8f0',
    alignItems: 'center', justifyContent: 'center',
  },
  heroSection: { padding: 16 },
  heroRow: { flexDirection: 'row', alignItems: 'flex-start' },
  vendorAvatar: { width: 100, height: 100, borderRadius: 16, borderWidth: 3, borderColor: '#ffffff' },
  verifiedBadge: {
    position: 'absolute', bottom: -4, right: -4,
    backgroundColor: '#2563eb', padding: 4, borderRadius: 12,
    borderWidth: 2, borderColor: '#ffffff',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 4 },
  vendorName: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  tierBadge: { backgroundColor: 'rgba(37,99,235,0.1)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  tierText: { color: '#2563eb', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  vendorDesc: { fontSize: 13, color: '#64748b', marginBottom: 8 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11, color: '#64748b' },
  ctas: { flexDirection: 'row', gap: 12 },
  primaryBtn: {
    backgroundColor: '#2563eb', paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  primaryBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 13 },
  secondaryBtn: {
    backgroundColor: '#e2e8f0', paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  secondaryBtnText: { color: '#0f172a', fontWeight: 'bold', fontSize: 13 },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16,
    marginBottom: 24, gap: 12, justifyContent: 'space-between',
  },
  statCard: {
    width: '47%', backgroundColor: '#ffffff', padding: 20, borderRadius: 16,
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  statLabel: { fontSize: 10, fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginTop: 4 },
  sectionWrap: { paddingHorizontal: 16, marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  viewAllText: { color: '#2563eb', fontSize: 13, fontWeight: 'bold' },
  aboutText: { fontSize: 14, color: '#475569', lineHeight: 22, marginTop: 12 },
  catalogList: { gap: 16 },
  catalogCard: {
    backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', overflow: 'hidden',
  },
  catalogImage: { width: '100%', height: 160 },
  catalogInfo: { padding: 16 },
  catalogTitle: { fontSize: 15, fontWeight: 'bold', color: '#0f172a' },
  catalogMeta: { fontSize: 12, color: '#64748b', marginTop: 4 },
  catalogFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  catalogPrice: { fontSize: 15, fontWeight: 'bold', color: '#2563eb' },
  addBtn: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: '#f1f5f9',
    alignItems: 'center', justifyContent: 'center',
  },
  addBtnText: { fontSize: 18, fontWeight: 'bold', color: '#64748b' },
  verificationCard: {
    backgroundColor: '#f1f5f9', padding: 24, borderRadius: 20,
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  verifyRow: { flexDirection: 'row', alignItems: 'flex-start' },
  verifyTitle: { fontSize: 14, fontWeight: 'bold', color: '#0f172a' },
  verifyDesc: { fontSize: 12, color: '#64748b', marginTop: 2 },
});
