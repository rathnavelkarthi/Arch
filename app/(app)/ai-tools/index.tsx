import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { ChevronLeft, Plus, Square, Minus, Sparkles, Store } from 'lucide-react-native';
import { router } from 'expo-router';

export default function AIGeneratorScreen() {
  const [floors, setFloors] = useState(2);

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Grid Pattern - Simulated */}
      <View style={styles.gridBg} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#475569" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Floorplan Generator</Text>
        <View style={{ width: 40 }} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Upload Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.uploadCard}>
            <View style={styles.uploadIconContainer}>
              <Store size={36} color="#2463eb" /> {/* Using Store as fallback for architecture icon */}
            </View>
            <Text style={styles.uploadTitle}>Upload Site Plan</Text>
            <Text style={styles.uploadSubtitle}>Drop your plot image, CAD file or blueprint here to start</Text>
            
            <View style={styles.importBtn}>
              <Plus size={18} color="#ffffff" />
              <Text style={styles.importBtnText}>Import File</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Configuration Form */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>PLOT CONFIGURATION</Text>
            <View style={styles.sectionLine} />
          </View>

          {/* Plot Size */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>DIMENSIONS</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                placeholder="e.g., 30 x 50 ft"
                placeholderTextColor="#cbd5e1"
              />
              <Square size={20} color="#cbd5e1" style={styles.inputIcon} />
            </View>
          </View>

          <View style={styles.rowInputs}>
            {/* Number of Floors */}
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>FLOORS</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity 
                  style={styles.counterBtn}
                  onPress={() => setFloors(Math.max(1, floors - 1))}
                >
                  <Minus size={20} color="#94a3b8" />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{floors.toString().padStart(2, '0')}</Text>
                <TouchableOpacity 
                  style={styles.counterBtnActive}
                  onPress={() => setFloors(floors + 1)}
                >
                  <Plus size={20} color="#2463eb" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Design Style */}
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>STYLE</Text>
              <View style={styles.inputContainer}>
                {/* Simulated Select */}
                <Text style={styles.selectText}>Modern</Text>
                <ChevronLeft size={20} color="#cbd5e1" style={[styles.inputIcon, { transform: [{ rotate: '-90deg' }] }]} />
              </View>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity 
            style={styles.generateBtn}
            onPress={() => router.push('/(app)/ai-tools/results')}
          >
            <Sparkles size={20} color="#ffffff" />
            <Text style={styles.generateBtnText}>Generate Layouts</Text>
          </TouchableOpacity>
        </View>

        {/* Generated Results */}
        <View style={styles.resultsSection}>
          <View style={styles.resultsHeaderRow}>
            <Text style={styles.sectionLabel}>GENERATED CONCEPTS</Text>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>AI SMART</Text>
            </View>
          </View>

          <View style={styles.resultsGrid}>
            <TouchableOpacity style={styles.resultCard}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIUXdayQSf-plm003UlCKqE45w4uBdcmMhPuiKLdEjzLZS0Xe3vUfVK9eOiyb2inewtXK9CwrfGmCiDexpjsXEUg3XGxrGHAZaW-wDaoVJLcj-EGFDPSXJJQapLBxyDlwUgvJOQRJqr_pY29oTZizAithF973fhGnvjv_SEwXpNPFeYCCjZBpCXTagwCn0pJoQ57POppCPHKBFtOm3K6Ik2_ouhhzAK6l_P2-zEjzLnXJLSH5-gRLRrdZ-JwW3RgkeT5BSwsKjekc' }}
                style={styles.resultImage}
              />
              <View style={styles.resultOverlay}>
                <Text style={styles.resultSub}>LAYOUT #01</Text>
                <Text style={styles.resultTitle}>Open Concept</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resultCard}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcS_nUq6yP5D5mRwOc7K4oi9d1rA2TQ5vtogM5m34SgNh9XB9C2QMZUCklY5IXq22mUdRtm9gHZVkuol6C07BkwZRRyTb0ZFmn5oH-fHisklmZhdLuuF8mTUUxronFeATBEU2ScWnj7zE1PzST2HVCmhMeVkDqy5pjJYOFuCX7cfUJt7jguViY9ekjekpXx14iEmxRwX6DRl5SaNhEiyZSyLnophuDB-tm5Ta1D8tH_HM3CDryAuDRqNSD92kEpE8gNNbor0nqhus' }}
                style={styles.resultImage}
              />
              <View style={styles.resultOverlay}>
                <Text style={styles.resultSub}>LAYOUT #02</Text>
                <Text style={styles.resultTitle}>Compact Zen</Text>
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
    backgroundColor: '#f8fafc',
  },
  gridBg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
    // Add grid background later with react-native-svg if needed
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  uploadCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.6)',
    shadowColor: '#2463eb',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 30,
    elevation: 5,
  },
  uploadIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 24,
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 20,
    marginBottom: 24,
  },
  importBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    height: 48,
    gap: 8,
  },
  importBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: 2,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#f1f5f9',
    marginLeft: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748b',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#2463eb',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 30,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#0f172a',
    fontSize: 16,
  },
  inputIcon: {
    marginLeft: 12,
  },
  rowInputs: {
    flexDirection: 'row',
  },
  counterContainer: {
    backgroundColor: '#ffffff',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    shadowColor: '#2463eb',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 30,
    elevation: 3,
  },
  counterBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnActive: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(36, 99, 235, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  selectText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
  },
  generateBtn: {
    backgroundColor: '#2463eb',
    height: 64,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#2463eb',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
    marginTop: 8,
  },
  generateBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsSection: {
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  resultsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  aiBadge: {
    backgroundColor: 'rgba(36, 99, 235, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(36, 99, 235, 0.1)',
  },
  aiBadgeText: {
    color: '#2463eb',
    fontSize: 10,
    fontWeight: 'bold',
  },
  resultsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  resultCard: {
    flex: 1,
    aspectRatio: 4 / 5,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  resultImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  resultOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 16,
    // Add gradient later using expo-linear-gradient if needed
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  resultSub: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#475569',
    letterSpacing: 2,
    marginBottom: 4,
  },
  resultTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
  },
});
