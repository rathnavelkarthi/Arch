import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, Switch } from 'react-native';
import { ArrowLeft, Share, History, Box, PenTool, Layers, Zap, ZoomIn, Video, Undo, Sparkles } from 'lucide-react-native';
import { router } from 'expo-router';

export default function FloorplanDetailEditScreen() {
  const [showDimensions, setShowDimensions] = useState(true);
  const [showLabels, setShowLabels] = useState(false);
  const [showShadows, setShowShadows] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState('light-oak');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Modern Villa - Floor 01</Text>
            <Text style={styles.headerSubtitle}>Last edited 2h ago</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtnTransp}>
            <History size={20} color="#475569" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtnTransp}>
            <Share size={20} color="#2463eb" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportBtn}>
            <Text style={styles.exportBtnText}>Export</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Box size={18} color="#2463eb" />
            <Text style={styles.activeTabText}>3D View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <PenTool size={18} color="#64748b" />
            <Text style={styles.tabText}>2D Blueprint</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Layers size={18} color="#64748b" />
            <Text style={styles.tabText}>Materials</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Zap size={18} color="#64748b" />
            <Text style={styles.tabText}>Electrical</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.mainLayout} showsVerticalScrollIndicator={false}>
        
        {/* Interactive 3D Canvas Area */}
        <View style={styles.canvasArea}>
          <ImageBackground 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvhI9s-m_QqDISDpHIYhgMrB1V_kIBl4ucOoUaLGMzoIheZc1R0NUJHrLtVUHPdkTys1eCV9c65IKUDUUp9M_p1YX1-EboTF8gpR2Nuq8w2lENieB30WbosLfz0Q6B7_WaCsQRIHmWWsr3797Su780Oy3stydw8-w2-Ak7rkhg6BV9LBeMMplF5OcVbamz6fya-RJVOhdUNayC5pBUVPUWDIC99nTdndc3Kkl9MQm8eR6zCgjp4udecUYA8BYfbgceT3UQ9EG-w6E' }}
            style={styles.canvasImage}
            imageStyle={{ opacity: 0.8 }}
          >
            {/* Hotspots */}
            <View style={[styles.hotspot, { top: '33%', left: '25%' }]}>
              <View style={styles.hotspotDot} />
            </View>
            <View style={[styles.hotspot, { top: '50%', right: '33%' }]}>
              <View style={styles.hotspotDot} />
            </View>

            {/* Floating Controls */}
            <View style={styles.floatingControls}>
              <TouchableOpacity style={styles.controlBtn}>
                <ZoomIn size={20} color="#ffffff" />
              </TouchableOpacity>
              <View style={styles.controlDivider} />
              <TouchableOpacity style={styles.controlBtn}>
                <Video size={20} color="#ffffff" />
              </TouchableOpacity>
              <View style={styles.controlDivider} />
              <TouchableOpacity style={styles.controlBtn}>
                <Box size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Sidebar Panel */}
        <View style={styles.sidebarPanel}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>LAYER PROPERTIES</Text>
          </View>

          <View style={styles.sidebarContent}>
            
            {/* Toggles */}
            <View style={styles.togglesSection}>
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>Dimensions</Text>
                <Switch 
                  value={showDimensions} 
                  onValueChange={setShowDimensions} 
                  trackColor={{ false: '#cbd5e1', true: '#2463eb' }}
                  thumbColor="#ffffff"
                />
              </View>
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>Furniture Labels</Text>
                <Switch 
                  value={showLabels} 
                  onValueChange={setShowLabels} 
                  trackColor={{ false: '#cbd5e1', true: '#2463eb' }}
                  thumbColor="#ffffff"
                />
              </View>
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>Lighting Shadows</Text>
                <Switch 
                  value={showShadows} 
                  onValueChange={setShowShadows} 
                  trackColor={{ false: '#cbd5e1', true: '#2463eb' }}
                  thumbColor="#ffffff"
                />
              </View>
            </View>

            <View style={styles.divider} />

            {/* Material Selection */}
            <View style={styles.materialSection}>
              <Text style={styles.materialTitle}>Selected: Hardwood Floor</Text>
              <View style={styles.materialGrid}>
                
                <TouchableOpacity 
                  style={[styles.materialCard, selectedMaterial === 'light-oak' && styles.materialCardActive]}
                  onPress={() => setSelectedMaterial('light-oak')}
                >
                  <ImageBackground 
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBue0mmtwdmMmwsaHH2WoRdHwvOh0cbQgF65NG1MEYg8jrUevORcBek08rfG5JbcFyBqnkSGLzCa1g41a2XkR_syI7X6CUKa123_rXwBiJBgCbNmtQQ_UzGQ-1V03EQbo89BLFmKhBCAd21UlMSA2UqVufWxemzv_w0C4S3ha2-266AJ88CbgFjIZm2dpTnSwSNcR_j_dLZVqwt_VKryqaUyGUg-tpAD8tzxg9i-E2KIQ_mwTAao34MT9m7WmjQCTtNbGO8TVeKG30' }}
                    style={styles.materialThumb}
                    imageStyle={{ borderRadius: 6 }}
                  />
                  <Text style={[styles.materialLabel, selectedMaterial === 'light-oak' && styles.materialLabelActive]}>Light Oak</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.materialCard, selectedMaterial === 'dark-walnut' && styles.materialCardActive]}
                  onPress={() => setSelectedMaterial('dark-walnut')}
                >
                  <ImageBackground 
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASFxuS_0__SFs1T-O0eCcsP82ST13WpQuVEepcJa5-OB7OPWsngzEPfzmozxCdJa4X_w9HTWgpAO2CJdO6c-w8EcXGnKuUNcU2KRs2qhRJafo0tPm_vWdaLRqequTOTHZxRnqJXac2lpn4w_UnOiZ9bouvIJNbtpWkYDcLNRWUAT_ZR30N0lPN6Wu9SaPGuieC2xI_lmDsJFeJiPjetRrV1e2OpcDd0hyQjF2bTZBDQwQjj5wJanchP3a84aHwJ6JVl3Q_pGHh-mc' }}
                    style={styles.materialThumb}
                    imageStyle={{ borderRadius: 6 }}
                  />
                  <Text style={[styles.materialLabel, selectedMaterial === 'dark-walnut' && styles.materialLabelActive]}>Dark Walnut</Text>
                </TouchableOpacity>

              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsCard}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Total Area</Text>
                <Text style={styles.statValue}>124.5 m²</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Living Space</Text>
                <Text style={styles.statValue}>82.0 m²</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Efficiency Score</Text>
                <Text style={styles.statValueSuccess}>94%</Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionGrid}>
              <TouchableOpacity style={styles.actionBtnOutline}>
                <Undo size={16} color="#0f172a" />
                <Text style={styles.actionBtnOutlineText}>Undo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnPrimary}>
                <Sparkles size={16} color="#2463eb" />
                <Text style={styles.actionBtnPrimaryText}>AI Optimize</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnTransp: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {},
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  exportBtn: {
    backgroundColor: '#2463eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 4,
  },
  exportBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  tabsContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tabsScroll: {
    flexDirection: 'row',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    gap: 8,
  },
  activeTab: {
    borderBottomColor: '#2463eb',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2463eb',
  },
  mainLayout: {
    flexGrow: 1,
  },
  canvasArea: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    minHeight: 300,
  },
  canvasImage: {
    width: '100%',
    height: 300,
  },
  hotspot: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(36, 99, 235, 0.8)',
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  hotspotDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  floatingControls: {
    position: 'absolute',
    bottom: 24,
    left: '50%',
    transform: [{ translateX: -60 }],
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  controlBtn: {
    padding: 8,
  },
  controlDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  sidebarPanel: {
    backgroundColor: '#f6f6f8',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  sidebarHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  sidebarTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64748b',
    letterSpacing: 1,
  },
  sidebarContent: {
    padding: 16,
  },
  togglesSection: {
    gap: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 24,
  },
  materialSection: {
    marginBottom: 24,
  },
  materialTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  materialGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  materialCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 4,
  },
  materialCardActive: {
    borderWidth: 2,
    borderColor: '#2463eb',
    backgroundColor: 'rgba(36, 99, 235, 0.05)',
  },
  materialThumb: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 8,
  },
  materialLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#64748b',
    textAlign: 'center',
    paddingBottom: 4,
  },
  materialLabelActive: {
    fontWeight: 'bold',
    color: '#0f172a',
  },
  statsCard: {
    backgroundColor: 'rgba(241, 245, 249, 0.8)',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 24,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  statValueSuccess: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#10b981',
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionBtnOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  actionBtnOutlineText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
  },
  actionBtnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(36, 99, 235, 0.1)',
  },
  actionBtnPrimaryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2463eb',
  },
});
