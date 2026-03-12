import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Lock, Globe, Moon, Shield } from 'lucide-react-native';
import { router } from 'expo-router';

export default function AccountSettingsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.iconBox}><Bell size={20} color="#475569" /></View>
              <Text style={styles.rowText}>Push Notifications</Text>
              <Switch value={true} trackColor={{ true: '#2563eb' }} />
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <View style={styles.iconBox}><Moon size={20} color="#475569" /></View>
              <Text style={styles.rowText}>Dark Mode</Text>
              <Switch value={false} trackColor={{ true: '#2563eb' }} />
            </View>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.row}>
              <View style={styles.iconBox}><Globe size={20} color="#475569" /></View>
              <Text style={styles.rowText}>Language</Text>
              <Text style={styles.valueText}>English</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SECURITY</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.row}>
              <View style={styles.iconBox}><Lock size={20} color="#475569" /></View>
              <Text style={styles.rowText}>Change Password</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.row}>
              <View style={styles.iconBox}><Shield size={20} color="#475569" /></View>
              <Text style={styles.rowText}>Two-Factor Authentication</Text>
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
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#ffffff',
    borderBottomWidth: 1, borderBottomColor: '#f1f5f9',
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#94a3b8', letterSpacing: 1.5, marginBottom: 12, marginLeft: 8 },
  card: { backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  iconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  rowText: { flex: 1, fontSize: 15, fontWeight: '500', color: '#0f172a' },
  valueText: { fontSize: 15, color: '#64748b' },
  divider: { height: 1, backgroundColor: '#f1f5f9', marginLeft: 68 },
});
