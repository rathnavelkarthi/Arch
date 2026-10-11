import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Grip, Lightbulb, AppWindow, DoorOpen, Palette, Tent, Droplet, Zap } from 'lucide-react-native';
import { router } from 'expo-router';

export default function MaterialCategoriesScreen() {
  const categories = [
    { id: 'tiles', name: 'Tiles', desc: 'Ceramic & Stone', icon: Grip },
    { id: 'lighting', name: 'Lighting', desc: 'Indoor & Outdoor', icon: Lightbulb },
    { id: 'windows', name: 'Windows', desc: 'Energy Efficient', icon: AppWindow },
    { id: 'doors', name: 'Doors', desc: 'Modern & Classic', icon: DoorOpen },
    { id: 'flooring', name: 'Flooring', desc: 'Timber & Vinyl', icon: Palette },
    { id: 'roofing', name: 'Roofing', desc: 'Metal & Concrete', icon: Tent },
    { id: 'plumbing', name: 'Plumbing', desc: 'Fixtures & Smart', icon: Droplet },
    { id: 'electrical', name: 'Electrical', desc: 'Smart Systems', icon: Zap },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color="#475569" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Material Categories</Text>
        <TouchableOpacity style={styles.backBtn}>
          <Search size={20} color="#475569" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.pageTitle}>Browse Materials</Text>
          <Text style={styles.pageSubtitle}>Find the perfect materials for your architectural vision.</Text>

          <View style={styles.grid}>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => router.push('/(app)/marketplace/products' as any)}
                  style={styles.categoryCard}
                >
                  <View style={styles.categoryIcon}>
                    <Icon size={24} color="#2563eb" />
                  </View>
                  <View>
                    <Text style={styles.categoryName}>{cat.name}</Text>
                    <Text style={styles.categoryDesc}>{cat.desc}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* AI Banner */}
          <View style={styles.aiBanner}>
            <View style={{ flex: 1, marginRight: 16 }}>
              <Text style={styles.bannerTitle}>Custom Request?</Text>
              <Text style={styles.bannerDesc}>Can&apos;t find what you need? Use our AI material scout.</Text>
            </View>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>Try AI Scout</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 16, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: '#e2e8f0',
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#e2e8f0',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#0f172a' },
  content: { padding: 16, paddingTop: 32 },
  pageTitle: { fontSize: 28, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 },
  pageSubtitle: { fontSize: 14, color: '#64748b', marginBottom: 32 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  categoryCard: {
    width: '48%', padding: 20, borderRadius: 16,
    borderWidth: 1, borderColor: '#e2e8f0', backgroundColor: '#ffffff', gap: 16,
  },
  categoryIcon: {
    width: 48, height: 48, borderRadius: 12, backgroundColor: '#eff6ff',
    alignItems: 'center', justifyContent: 'center',
  },
  categoryName: { fontSize: 15, fontWeight: 'bold', color: '#0f172a' },
  categoryDesc: { fontSize: 12, color: '#64748b', marginTop: 2 },
  aiBanner: {
    marginTop: 32, borderRadius: 16, backgroundColor: '#eff6ff',
    borderWidth: 1, borderColor: '#bfdbfe', padding: 24,
    flexDirection: 'row', alignItems: 'center',
  },
  bannerTitle: { fontSize: 15, fontWeight: 'bold', color: '#0f172a' },
  bannerDesc: { fontSize: 12, color: '#64748b', marginTop: 4 },
  bannerBtn: { backgroundColor: '#2563eb', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  bannerBtnText: { color: '#ffffff', fontSize: 13, fontWeight: '600' },
});
