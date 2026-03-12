import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Search, SlidersHorizontal, Bell, Grid, AlignJustify, Heart, Plus, Lightbulb, Hexagon, Component, DoorOpen, LayoutGrid } from 'lucide-react-native';
import { router } from 'expo-router';

export default function MarketplaceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>PropStore</Text>
            <Text style={styles.headerSubtitle}>Construction & Design</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={20} color="#475569" />
            </TouchableOpacity>
            <View style={styles.profileAvatarContainer}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6WzpMyOOcFO8lB07Xwu-ij3tQv4eipN8iVkP2euMF9_SC6C1BFoxvPukBZV2lVWdZTG_K1vcYMHssn0TTMtD2iX7u-1QnfZOBrpdAMuecjmX9jOeVCheQgPibXo-edDbIswQmjJBuNRTlI0L5yW4em_IewdkamY_cOi9E-HvLSBVRumJKr_Ar1HT9oElId8rsbNL6gJNcWVOuYDP8ObAch5JifwKsu89hCggQGNGu2Ias6YNiK9yo79mrWFUt6045cRdJ0ZFCIxo' }}
                style={styles.profileAvatar}
              />
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Search size={18} color="#94a3b8" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search materials..."
              placeholderTextColor="#94a3b8"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <SlidersHorizontal size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>SEE ALL</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {[
              { id: '1', title: 'TILES', icon: Grid },
              { id: '2', title: 'LIGHTS', icon: Lightbulb },
              { id: '3', title: 'WINDOWS', icon: Component },
              { id: '4', title: 'DOORS', icon: DoorOpen },
              { id: '5', title: 'FLOOR', icon: LayoutGrid },
            ].map(cat => (
              <TouchableOpacity key={cat.id} style={styles.categoryCard} onPress={() => router.push('/(app)/marketplace/categories' as any)}>
                <View style={styles.categoryIconBox}>
                  <cat.icon size={24} color="#1a1a1a" />
                </View>
                <Text style={styles.categoryTitle}>{cat.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Pro Banner */}
        <View style={styles.proBanner}>
          <View style={styles.proBannerContent}>
            <View style={styles.proBadge}>
              <Text style={styles.proBadgeText}>PRO</Text>
            </View>
            <Text style={styles.proBannerTitle}>Elite Membership</Text>
            <Text style={styles.proBannerSub}>Exclusive 15% off bulk materials</Text>
            <TouchableOpacity style={styles.proBannerButton}>
              <Text style={styles.proBannerButtonText}>LEARN MORE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.proBannerBgIcon}>
            <Hexagon size={160} color="rgba(255,255,255,0.05)" />
          </View>
        </View>

        {/* Product Grid */}
        <View style={styles.productsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
            <View style={styles.viewToggleGroup}>
              <TouchableOpacity style={styles.viewToggleBtnActive}>
                <Grid size={14} color="#0f172a" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewToggleBtnInactive}>
                <AlignJustify size={14} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.productsGrid}>
            
            {/* Product Card 1 */}
            <TouchableOpacity style={styles.productCard} onPress={() => router.push('/(app)/marketplace/products' as any)}>
              <View style={styles.productImageContainer}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD37qVTo2bFIENcxEEUNlek7zZCs8-1AKjAD_ziBYgq082E1jaSb1OrDxVtH_unwh_yWAKJVbBwIofu3tGHfpwkfsgX_9XHzopGYYxOaae1lG1snYI6kD5_yrrut6wmPDkxd8RTzS8y7tLz38e-xf6vcP3B1DXD1qetkS0nNkVz4d3eKYSRDcoBYRucf23xClcHmf_2jCRRkdbqvvUvc-_Qj9jRFzDRbRk0ctoNkapVHFPOBDLbtbq47RIq5KDPq-V8ZhyynX4oF1s' }}
                  style={styles.productImage}
                />
                <TouchableOpacity style={styles.productFavoriteBtn}>
                  <Heart size={18} color="#0f172a" />
                </TouchableOpacity>
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName} numberOfLines={1}>Makrana White Marble</Text>
                <View style={styles.productPriceRow}>
                  <Text style={styles.productPrice}>₹15,000 <Text style={styles.productUnit}>/sqm</Text></Text>
                  <TouchableOpacity style={styles.productAddBtn}>
                    <Plus size={16} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>

            {/* Product Card 2 */}
            <TouchableOpacity style={styles.productCard} onPress={() => router.push('/(app)/marketplace/products' as any)}>
              <View style={styles.productImageContainer}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbL4HsRwoKvLcf5ITKU_NEH8hczbo6eYYtuar41W8Gqwf7QpP5Lgzb3HwJRxk4neRp8LKiaV58-ENeSLYKBLSXDFOiVa0KtwRohUkSkMXCf9n0Xr15gtnU1IUSB1SxgRXxrG_j8okP2Ut9KFJoKnOlhNKyudIthYwors5-ejcK36DOIUJ6wwxX_aiyKENrERQgh4cIh7MAIYiQ1it7onxSzAQt-vhAScU9t5UrwUA06YzzqLckEKu6agUrK5tS9BUcnRyRf7v0yt4' }}
                  style={styles.productImage}
                />
                <TouchableOpacity style={styles.productFavoriteBtn}>
                  <Heart size={18} color="#0f172a" />
                </TouchableOpacity>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>★ 4.8</Text>
                </View>
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName} numberOfLines={1}>Jaipur Brass Lamp</Text>
                <View style={styles.productPriceRow}>
                  <Text style={styles.productPrice}>₹10,500</Text>
                  <TouchableOpacity style={styles.productAddBtn}>
                    <Plus size={16} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>

            {/* Product Card 3 */}
            <TouchableOpacity style={styles.productCard} onPress={() => router.push('/(app)/marketplace/products' as any)}>
              <View style={styles.productImageContainer}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyAw-7DYYIqXzX-Gi3RSTKYq4SMhke_faHO3-icHKnkfydjUsDyggoVLNWfMODNeoZy8fRcyVqW3virSZP8WegnqujKqlWGK0F9Kif9UVO2BbofK05QnJnrX365G4XOtjiBltNnQOOPsfQa0pgV_rZmqBA6BkruZ3cij39ipN43qPXXYPire2tLTNSAahiAL4psD_jtbpo3JJlaKPtyAyZdmR4THfDHBAp32PacpIQcu4fTyA2fOfoIR1V5KBDAIPdED2K3jZTXAo' }}
                  style={styles.productImage}
                />
                <TouchableOpacity style={styles.productFavoriteBtn}>
                  <Heart size={18} color="#0f172a" />
                </TouchableOpacity>
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName} numberOfLines={1}>Teak Wood Planks</Text>
                <View style={styles.productPriceRow}>
                  <Text style={styles.productPrice}>₹3,500 <Text style={styles.productUnit}>/sqft</Text></Text>
                  <TouchableOpacity style={styles.productAddBtn}>
                    <Plus size={16} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>

            {/* Product Card 4 */}
            <TouchableOpacity style={styles.productCard} onPress={() => router.push('/(app)/marketplace/products' as any)}>
              <View style={styles.productImageContainer}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYrkQNc-a1pWd2RENP7aC46kzxypAjT6tHtmxqgh_QIYPBU6NmUKQAKnMe-bzNqFt2sMV68F0cV0fuDpZWkG9OuKFXJjI94PEYgWDz3NxYbZEJyzUEoG0dgnQKLs5P_ev2Yt8vyowptwqjmYkEr6bv19sdDgsI2UtWHLIWyY-_yGEBLA4g4uv3AjQBJMPZ5895ESZ8j6Mp20PeK1lHiwT86KPP6Ebu4R6zzrSIZukMyh33qBDLhvkAIe_IR7uku8CqZnbVxUvmuRw' }}
                  style={styles.productImage}
                />
                <TouchableOpacity style={styles.productFavoriteBtn}>
                  <Heart size={18} color="#0f172a" />
                </TouchableOpacity>
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName} numberOfLines={1}>Aluminium Sliding Window</Text>
                <View style={styles.productPriceRow}>
                  <Text style={styles.productPrice}>₹25,000</Text>
                  <TouchableOpacity style={styles.productAddBtn}>
                    <Plus size={16} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>
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
    backgroundColor: '#fcfcfc',
  },
  header: {
    backgroundColor: 'rgba(252, 252, 252, 0.9)',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    overflow: 'hidden',
  },
  profileAvatar: {
    width: '100%',
    height: '100%',
  },
  searchRow: {
    flexDirection: 'row',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(241, 245, 249, 0.8)',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#0f172a',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  categoriesSection: {
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  seeAllText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  categoriesScroll: {
    paddingHorizontal: 24,
    gap: 16,
  },
  categoryCard: {
    alignItems: 'center',
    gap: 12,
  },
  categoryIconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748b',
    letterSpacing: -0.5,
  },
  proBanner: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: '#0f172a',
    borderRadius: 24,
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  proBannerContent: {
    zIndex: 10,
  },
  proBadge: {
    backgroundColor: '#2463eb',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 8,
  },
  proBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  proBannerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  proBannerSub: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 16,
  },
  proBannerButton: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  proBannerButtonText: {
    color: '#1a1a1a',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  proBannerBgIcon: {
    position: 'absolute',
    right: -40,
    bottom: -40,
    zIndex: 1,
    opacity: 0.5,
  },
  productsSection: {
    paddingHorizontal: 24,
  },
  viewToggleGroup: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    padding: 4,
    borderRadius: 8,
    gap: 4,
  },
  viewToggleBtnActive: {
    padding: 4,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  viewToggleBtnInactive: {
    padding: 4,
    borderRadius: 4,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  productCard: {
    width: '47%',
    marginBottom: 8,
  },
  productImageContainer: {
    width: '100%',
    aspectRatio: 0.8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    overflow: 'hidden',
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productFavoriteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  productDetails: {},
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  productPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  productUnit: {
    fontSize: 10,
    fontWeight: '500',
    color: '#94a3b8',
  },
  productAddBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
