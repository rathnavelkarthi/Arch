import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Briefcase, Plus } from 'lucide-react-native';
import { router } from 'expo-router';

export default function MyPortfolioScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Portfolio</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, alignItems: 'center' }}>
        <View style={styles.emptyState}>
          <View style={styles.iconCircle}>
            <Briefcase size={32} color="#2563eb" />
          </View>
          <Text style={styles.emptyTitle}>No Projects Yet</Text>
          <Text style={styles.emptyDesc}>
            Your portfolio is currently empty. Start adding your past projects and designs to showcase your work to clients.
          </Text>
          <TouchableOpacity style={styles.addBtn}>
            <Plus size={20} color="#ffffff" />
            <Text style={styles.addBtnText}>Add First Project</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#ffffff',
    borderBottomWidth: 1, borderBottomColor: '#f1f5f9',
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 80, paddingHorizontal: 20 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 },
  emptyDesc: { fontSize: 15, color: '#64748b', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#2563eb', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 12 },
  addBtnText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});
