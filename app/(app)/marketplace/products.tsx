import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ShoppingCart, ChevronDown, Star } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ProductListingScreen() {
  const [activeFilter, setActiveFilter] = useState('All Materials');
  const filters = ['All Materials', 'Natural Stone', 'Sustainable Timber', 'Structural Glass'];

  const products = [
    {
      id: 1, tag: 'Stone & Masonry', title: 'Premium Makrana Marble',
      price: '₹3,500', unit: '/ sq ft', rating: '4.9', reviews: '120 reviews',
      location: 'Ships from Rajasthan', badge: 'PREMIUM', badgeType: 'premium',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATyfhmupgHbQShqrcnAQQU0HS1djXTGXMZiOod0KFa7-Bvi0wk0v13S9gkP_EoQx1JXL81y0EfIEp2OioxBCc-d6_BeRA9FR41VRYwJcB559PDXoh6lcGn-ZzhM-b3PZbZx09CDG6U6k6DOUeM4OuX_vwCvC2rlz2cz6YlS_DoMhFT0cKvH8HBEsp7vdchupdjig62tP_Ry27UXbNXniYV31rpychSAn1IHmWEEUfW3VSWskdbkRJArgtIFaODlGVxZBgpfZO09gQ',
    },
    {
      id: 2, tag: 'Flooring & Timber', title: 'Sustainable Teak Planking',
      price: '₹1,000', unit: '/ sq ft', rating: '4.8', reviews: '85 reviews',
      location: 'FSC Certified', badge: 'ECO-FRIENDLY', badgeType: 'eco',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATouBvkZlOhoQf5g_IVzLnW5DGNPE-610XW0NoCnb-yurRT4oAQ6wIxYRiNvtvI-vPY2ARaYs5MqcKPkP4hsEgo9wjIOPIXFgQMdhEuNNgjbKqxPhlJEejQwCzBjodPYkLdtcuYMdDE4nb30YBpe2uN4wtIOt5mDISunzrYcMESYLBktRXzrYzLAC4odzl4PIxnBNx3pdBCK95rcCb0GqtBBh8Vb9ARewva7Pu9Klq8R4G4U9bsTi7xUuQPbqtZdPhrJQtEqvyH-E',
    },
    {
      id: 3, tag: 'Facade & Metal', title: 'Brushed Aluminum Mesh',
      price: '₹2,600', unit: '/ sq ft', rating: '4.7', reviews: '42 reviews',
      location: 'Grade A-606', badge: null, badgeType: null,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw2ezoPucI0fzMZNByXihBxMYwa9H4lypU6B-Uo8oyBb_5qGP2i1Z0ZoyqtcvXb6LZ5ErvK5oL9e9IfjvUWkJOoWyiQ3v1K7h1NHdZP8fUjLWU7YHnFc1VoWEzrrlJGQZxv8sODd9gvby36AW1n4XHiZLplHg6kk-GRSVxIXWppRwwrXZ4AGEA7HhFVM2Kw-t8nrHxb9X10p8co5_sQzoOOeMOs_5JnJxuvFZ7qcQlewKvNBVBGSyLF_z_PeIC-z7QdRrVBXNm5d4',
    },
    {
      id: 4, tag: 'Industrial & Finishes', title: 'Architectural Micro-Cement',
      price: '₹1,500', unit: '/ sq ft', rating: '4.9', reviews: '210 reviews',
      location: 'Seamless finish', badge: null, badgeType: null,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEDpYGGg8swh6yLha_WD4RXF5EgiPgqWEDt33HFw4_4Ppgs-2d3N_8iTlYsrGozFKDLypudO2hsNH7ehDy0NMCNrNUnMK-gaCAOsJ9CSUWs9usuxKRFy7fuAxg_ciS0P5jsyhhrmKhVXuA2nzuJdgkt2wqkNQ4pw-xAwU3xZeIhwcK4qXxIduvkOJw1h4TnQL6kpAEGBoPiLJO6VYPE43TII8vDkV2jWrgSWEIeeEm9akn9kKdWHtLYZ9hmx_VIxYF-MwpN6P-gGw',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>A</Text>
          </View>
          <Text style={styles.brandName}>Ilam Mora</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Search size={20} color="#475569" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <ShoppingCart size={20} color="#475569" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.scrollContent}>
          <Text style={styles.pageTitle}>Architectural Materials</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
            <View style={styles.filterRow}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
                >
                  <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
                  <ChevronDown size={16} color={activeFilter === filter ? '#ffffff' : '#475569'} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Product Cards */}
          <View style={styles.productsList}>
            {products.map((item) => (
              <View key={item.id} style={styles.productCard}>
                <View style={styles.productImageWrap}>
                  <Image source={{ uri: item.image }} style={styles.productImage} />
                  {item.badge && (
                    <View style={[styles.badge, item.badgeType === 'eco' ? styles.badgeEco : styles.badgePremium]}>
                      <Text style={[styles.badgeText, item.badgeType === 'eco' && { color: '#fff' }]}>{item.badge}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.productInfo}>
                  <View style={styles.productRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.productTag}>{item.tag}</Text>
                      <Text style={styles.productTitle}>{item.title}</Text>
                    </View>
                    <View style={styles.ratingRow}>
                      <Star size={14} color="#f59e0b" fill="#f59e0b" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                  </View>

                  <View style={styles.priceRow}>
                    <View>
                      <View style={styles.priceWrap}>
                        <Text style={styles.priceText}>{item.price}</Text>
                        <Text style={styles.unitText}>{item.unit}</Text>
                      </View>
                      <Text style={styles.metaText}>{item.location} - {item.reviews}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.specsBtn}
                      onPress={() => router.push('/(app)/marketplace/vendor/1' as any)}
                    >
                      <Text style={styles.specsBtnText}>View Specs</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
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
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoBox: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  logoText: { color: '#2563eb', fontWeight: 'bold', fontSize: 20 },
  brandName: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  headerRight: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#e2e8f0',
    alignItems: 'center', justifyContent: 'center',
  },
  scrollContent: { padding: 16, paddingVertical: 24 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginBottom: 16 },
  filterRow: { flexDirection: 'row', gap: 12 },
  filterChip: {
    flexDirection: 'row', height: 40, alignItems: 'center', gap: 6,
    paddingHorizontal: 16, borderRadius: 12, backgroundColor: '#e2e8f0',
  },
  filterChipActive: { backgroundColor: '#2563eb' },
  filterText: { fontSize: 13, fontWeight: '500', color: '#475569' },
  filterTextActive: { color: '#ffffff', fontWeight: '600' },
  productsList: { gap: 24 },
  productCard: {
    borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0',
    backgroundColor: '#ffffff', overflow: 'hidden',
  },
  productImageWrap: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#e2e8f0' },
  productImage: { width: '100%', height: '100%' },
  badge: { position: 'absolute', top: 12, right: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgePremium: { backgroundColor: 'rgba(255,255,255,0.9)' },
  badgeEco: { backgroundColor: '#22c55e' },
  badgeText: { fontSize: 10, fontWeight: 'bold', color: '#2563eb' },
  productInfo: { padding: 20, gap: 12 },
  productRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  productTag: { fontSize: 10, fontWeight: 'bold', color: '#64748b', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 },
  productTitle: { fontSize: 17, fontWeight: 'bold', color: '#0f172a' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, fontWeight: 'bold', color: '#f59e0b' },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 4 },
  priceWrap: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
  priceText: { fontSize: 20, fontWeight: 'bold', color: '#2563eb' },
  unitText: { fontSize: 13, color: '#64748b', marginLeft: 4 },
  metaText: { fontSize: 12, color: '#64748b' },
  specsBtn: {
    backgroundColor: '#2563eb', height: 40, paddingHorizontal: 20,
    borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  specsBtnText: { color: '#ffffff', fontSize: 13, fontWeight: 'bold' },
});
