import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Star } from 'lucide-react-native';
import { router } from 'expo-router';

export default function VendorsDirectoryScreen() {
  const vendors = [
    { id: 1, name: 'Ilam Mora Supplies', category: 'General Construction', rating: '4.9', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDArv6o3vPGmzB--MSHL2bUkaDRhJxhg5hF5YYIQ7yZcI7yqZc2rGe6l4xbZTToIX8_cGE0ckj-y3rv_JAiZBC14CAXk7PaByA1-cUhZzds0vlcmfG3xozgZwfT4q2ms_VkLHb3aEJA8YQk0ST70Oo0JcXsb_pe5Vrax9QHs3Q7ARwKGnrrbVbNAHcdBOBYn12XwF0Rzf-f6F9EvD1R_T8a2sQrFbNKtwn7xzwRgH4zbSfkygXVwpkMd54CWsuzLATblbOc0_3pxSA' },
    { id: 2, name: 'Luminate Lighting', category: 'Electrical & Lighting', rating: '4.7', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnWC3yfwe57R_5uR3E3bI-JcelUnbFBsChMk0i9toioKf4H3NWuJzoTRWmqU2xkyL9M8q4PgsIYXNVMuY5p3XQppi5TKYJ5jRxpnw-88cgSEhfuGTtylvBwq_Ny0AnogISY6a3l0z2OHwx8F73_iwN5FLLiTCGv4ZUnwKq5f1ekBVK3GX3mV9NjU9g23DL5VL7d9_l5g7_G9C6gq2jHo1vk3j9D1WWpwpiYzyVlJzPTlnVFW07utboaK4sF40vApW89usOm4_7VPo' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vendors Directory</Text>
        <TouchableOpacity style={styles.backBtn}>
          <Search size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.pageSubtitle}>Saved & Partnered Vendors</Text>
        <View style={styles.list}>
          {vendors.map(v => (
            <TouchableOpacity key={v.id} style={styles.card} onPress={() => router.push(`/(app)/marketplace/vendor/${v.id}` as any)}>
              <Image source={{ uri: v.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{v.name}</Text>
                <Text style={styles.category}>{v.category}</Text>
                <View style={styles.ratingRow}>
                  <Star size={14} color="#f59e0b" fill="#f59e0b" />
                  <Text style={styles.rating}>{v.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  pageSubtitle: { fontSize: 13, fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 },
  list: { gap: 12 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  image: { width: 60, height: 60, borderRadius: 12, marginRight: 16 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#0f172a', marginBottom: 4 },
  category: { fontSize: 13, color: '#64748b', marginBottom: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: 13, fontWeight: 'bold', color: '#0f172a' },
});
