import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, ShoppingBag, ArrowRight, Star, Heart } from 'lucide-react-native';
import { router } from 'expo-router';

export default function DesignMarketplaceScreen() {
  const categories = [
    { id: 1, name: 'Villa', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5DiOxBLq_hoxX87LmYJS12G727zvo6kLWUK00nzmjWPrNfGX47LlRCDs7n0IXgTeXNzdY61C5rQIdUw7xJpiG9QCGUQSh10B08i6oSUB49WlGcR0NRXND_cORWUJagVVxtw_CW1VaQdm0VHl-VETAHDo9yvvjzdbvYGX8r90PtHWMSpQ9tcWqwDJ7h0JzLbnuAOwT3D9HHyjjFlwqQc_7rV0PLECMerIwL990ft64lTtpYA66aQmQ5pWTgZddMGtIhyb-xkPwlwI', active: true },
    { id: 2, name: 'Office', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg5IsXqD5RZJ1GvU29LzY5Pqv6druOzTPzL99rOpQJBJmLS1-jmbP7pbyxfzD-Wshtu6lnYrVsVfSDluh9Zg4ebuv_m60jb0L1Ew0n0pkMz_M2FNnS9wNCJqBUhUuk4OFvC_dqWqBqHf-iEkwhmznPFqGHeKLjh_NubACIl-Ho2D2d0qcYGq3UO1gxMgbjqqWYmMBLn9gqfbsCqY41VaWYZj0dBdr-9Nvic13ahEf5lv7CWZzxDZD2GzCxgtMxtVZM_a5KzACZDw8', active: false },
    { id: 3, name: 'Loft', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmpcH6ayVCjZixh5k47nha7W0X16YGyvcG_1HlbD1VqsrJt4f9EGsFZqciuFZFR2E5ARJWcYnHfSfgZQA6zkl01x1k8BTrog1O3bEGP6M7IbbZ3RCRiTdccYkNseTWgnyPFn8KuJLtcggu9wusQ5DqdlnRZnN95ifLsgZuGwdqnyFBN5TXewZJJqaB6jLORl0d4pSvsFtKaaUCfsT2TMrWpgTHXPsyR4FGkSSvJnGZ4qbRnU2rxy2fPUDsBWOGzu2rszZnH2gQpzY', active: false },
    { id: 4, name: 'Urban', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu2-Nt-v01Rr9i6I2YMJE1cnfSpPEphp53pDVEJxR7RgCcJiB7jkVLFi8NS4DyeV6vrC0kedxH5MCLmsfkyqx2DgHpNPhHnuynC7YOM_NSvlvTOj4CnhjIiOJjUZj-kjalxbUgdNIR_mVMr0-FKxnyBKHBNOyoXEpp_Fh9K-G1cGpe8qUIRM8DSF_qYSdz60r_m3ecf0gUi-YT9Sx4doM1_7fK_Sp6nbPuvYg1exy_FzUHqc4HCEaSwaIWv_S4TPzf7j9gUVsplY8', active: false },
    { id: 5, name: 'Cabin', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjigP-ClbSlBiyZkJm1-beGV90l43AJo7RYdeZ_irrhWJHyH-Fzi1BJNnNJ4XdEwb74CpQtIpnXMtJjp8aQQk9Dog0XxZ16fBaBcBiHXlyABl9i7go_nrN9MRfn317CVOvvvsV_l1jfwC4k7c03ntrHTKeGbIgDIrHdXSOC9-YXxaOVTsh8uPv4jdw_56-1VI3yTiuU2-b0vzsVQ321kVbudq_7uTa9GTiniDIqYUHiQvigyZNT5WZ4-nqMFVMDj1AOFJXFehVygU', active: false },
  ];

  const featuredBlueprints = [
    { id: 1, title: 'The Glass Pavilion', author: 'Vastu Designers', price: '₹42,000', rating: '4.9', bestseller: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXOB50xnSJo0w7qcK4QiMqtR3C6Vr5Pn50A_-0iYkS3dGkguFM2yixUauBQ4bBSEFGl-wJBFi1jDjGH3xHV-UoFq4wDhF24luv-z1p-Z-eO3coyX1DvoKu1blbk9dDiKIxzSCkeSrmiYTPDzmuWZo6ase_XQPEBvhVEBmnFNSDuLuYQBr6d2z5hA0gWrWyMZRcgNa23SdGxihxPp45kRA1Lr05P2crrR12DGp625x1zS3mFJmacmE18MdtIJtNIjKuJ8kyrspxbI8' },
    { id: 2, title: 'Tropical Sanctuary', author: 'Arjun Das Arch', price: '₹29,000', rating: '4.8', bestseller: false,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS-cKjZrPI4iDl2jFTnx-4_JdVoLselozDTG4gpgs7wzP5xKp4PPS7NxjAYV7K8Xt1nvmXYEcs6w0bS561T1-PiPGx8MIJl41f-4ohVmitk_qwhT5nT0nvCxQ78ek6hKJVPLaGSL5hMp06bFMPz-_seaS6x-XRejenYCR591Xti9K4r6vDZiT3MZWUyrStoGAGcq06gggAA_hjrPnpDs9xopyQGzeMlKox5an8wj-kCWprb16T9bb7L-2nWkxPqGCHmGKqmxwcHvg' },
  ];

  const trends = [
    { id: 1, title: 'Brutalist Comeback', desc: 'Rising demand for raw concrete textures.', growth: '+12.4% MoM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0Y9J07ecWHGUp2rCEN-BvwxdOIeGJ_ETkyTVddrjY0afcz6fy7C1dkuViT6V3EViyUVwqR21g4URtUEXSuQBpSoiw9CVwNORwBL_KOf33rX1FtNJjsg-K-0H2EJ6gmWUEEEha8ROorSa68DM_fSnwJmh_ZQAL6kxRbbOMJR-H3-GnIt6JewVXyjdMPIV9i9vpcj1AC0S_hQnlAJmB0EzALh3XqgJYSkIGsDMx96NvLPaxir7ra28mRJz95kkmd4-x5eaKL9sUyEQ' },
    { id: 2, title: 'Sustainable Roofs', desc: 'Eco-friendly templates are fetching premium.', growth: '+8.7% MoM',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh7bf7iEqbXooms-_h2buDXdOHPiqpikFCft-PepQIU65nNvzTGDTcrze1ejbbMDoalUv7zrf4LdDJXCU0uxg34e3lrR-7_7fROv3BGq9BIEHjH4riC4XcJlGlYZbmEYe38j4s0NNNjNIr1JrXtyTDN2f6H62tA56tesrUMSAXXwr3-d98jtqJb0RuAy7tDN1ge1642uF1GDybBwlN_QCESNcyBKL9UV9PLz5kskojCBawBaRlh3vRhPG11Fy-tPcX3p3pxNFeihw' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={20} color="#475569" />
          </TouchableOpacity>
          <Text style={styles.brandName}>Ilam Mora</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}><Search size={20} color="#64748b" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><ShoppingBag size={20} color="#64748b" /></TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.scrollContent}>
          {/* Categories */}
          <View style={{ marginBottom: 32 }}>
            <Text style={styles.sectionLabel}>CATEGORIES</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.catRow}>
                {categories.map((cat) => (
                  <TouchableOpacity key={cat.id} style={styles.catItem}>
                    <View style={[styles.catThumb, cat.active && styles.catThumbActive]}>
                      <Image source={{ uri: cat.image }} style={[styles.catImage, { opacity: cat.active ? 1 : 0.6 }]} />
                    </View>
                    <Text style={[styles.catName, cat.active && { color: '#0f172a' }]}>{cat.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Featured Blueprints */}
          <View style={{ marginBottom: 40 }}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Blueprints</Text>
              <TouchableOpacity style={styles.viewAllBtn}>
                <Text style={styles.viewAllText}>View All</Text>
                <ArrowRight size={16} color="#2563eb" />
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', gap: 24 }}>
                {featuredBlueprints.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.blueprintCard}>
                    <View style={styles.blueprintImageWrap}>
                      <Image source={{ uri: item.image }} style={styles.blueprintImage} />
                      {item.bestseller && (
                        <View style={styles.bestsellerBadge}>
                          <Text style={styles.bestsellerText}>BESTSELLER</Text>
                        </View>
                      )}
                      <TouchableOpacity style={styles.heartBtn}>
                        <Heart size={20} color="#64748b" />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text style={styles.blueprintTitle}>{item.title}</Text>
                      <Text style={styles.blueprintAuthor}>by {item.author}</Text>
                      <View style={styles.blueprintFooter}>
                        <Text style={styles.blueprintPrice}>{item.price}</Text>
                        <View style={styles.ratingRow}>
                          <Star size={14} color="#f59e0b" fill="#f59e0b" />
                          <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Market Trends */}
          <View style={{ marginBottom: 40 }}>
            <Text style={styles.sectionTitle}>Market Trends</Text>
            <View style={{ gap: 12, marginTop: 16 }}>
              {trends.map((item) => (
                <TouchableOpacity key={item.id} style={styles.trendCard}>
                  <Image source={{ uri: item.image }} style={styles.trendImage} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.trendTitle}>{item.title}</Text>
                    <Text style={styles.trendDesc}>{item.desc}</Text>
                    <Text style={styles.trendGrowth}>{item.growth}</Text>
                  </View>
                </TouchableOpacity>
              ))}
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
  brandName: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  headerRight: { flexDirection: 'row', gap: 12 },
  iconBtn: { padding: 8 },
  scrollContent: { padding: 16, paddingVertical: 24 },
  sectionLabel: { fontSize: 11, fontWeight: 'bold', color: '#64748b', letterSpacing: 2, marginBottom: 16 },
  catRow: { flexDirection: 'row', gap: 16 },
  catItem: { alignItems: 'center', gap: 8, minWidth: 80 },
  catThumb: { width: 64, height: 96, borderRadius: 12, overflow: 'hidden' },
  catThumbActive: { borderWidth: 2, borderColor: '#2563eb' },
  catImage: { width: '100%', height: '100%' },
  catName: { fontSize: 12, fontWeight: '500', color: '#64748b' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#0f172a' },
  viewAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewAllText: { color: '#2563eb', fontSize: 13, fontWeight: '600' },
  blueprintCard: { width: 280 },
  blueprintImageWrap: {
    aspectRatio: 4 / 3, borderRadius: 12, overflow: 'hidden',
    marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0',
  },
  blueprintImage: { width: '100%', height: '100%' },
  bestsellerBadge: {
    position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
  },
  bestsellerText: { fontSize: 10, fontWeight: 'bold', color: '#2563eb' },
  heartBtn: {
    position: 'absolute', bottom: 12, right: 12, width: 40, height: 40,
    backgroundColor: '#ffffff', borderRadius: 20, alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  blueprintTitle: { fontSize: 17, fontWeight: 'bold', color: '#0f172a' },
  blueprintAuthor: { fontSize: 13, color: '#64748b', marginBottom: 8 },
  blueprintFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  blueprintPrice: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: '#f59e0b' },
  trendCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16,
    backgroundColor: '#ffffff', borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0',
  },
  trendImage: { width: 80, height: 80, borderRadius: 10 },
  trendTitle: { fontSize: 15, fontWeight: 'bold', color: '#0f172a' },
  trendDesc: { fontSize: 12, color: '#64748b', marginVertical: 4 },
  trendGrowth: { fontSize: 12, fontWeight: 'bold', color: '#2563eb' },
});
