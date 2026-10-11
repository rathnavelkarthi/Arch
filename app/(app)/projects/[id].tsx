import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { ArrowLeft, MoreVertical, Maximize2, CheckCircle2, Compass, FileText, Plus } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ProjectDetailWorkspace() {

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Antilia Enclave</Text>
          <Text style={styles.headerSubtitle}>PHASE 2: STRUCTURAL</Text>
        </View>
        <TouchableOpacity style={styles.headerIconButton}>
          <MoreVertical size={24} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <ImageBackground
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAApo3kqri8tiZDR7ImW64vHgt-zDy7aDRnOk_DUgyc3Ip8XfpLah-ujP0pJNoAZz-Bml3-so5VIsQEHL2FZVs06344R1qTSp4XX0rZKpGVMm8NJ-AHHDWUXI3DZDZwZAuOHbApDx_GV8TfjkSGxFDglstchYtDH8-D4ha8zCCQ_lmeGVtCAdXjeUjuU3v8I2VLsWgfJsth4dTU2RNry9fw9UFA_RICmcOi2cxJAdNOVoEgYl5IJE-sQgPNlfI6WLKAHluZE73LVq8' }}
            style={styles.heroImage}
            imageStyle={{ borderRadius: 16 }}
          >
            <View style={styles.heroOverlay}>
              <TouchableOpacity style={styles.fullscreenBtn}>
                <Maximize2 size={20} color="#ffffff" />
              </TouchableOpacity>
              
              <View style={styles.heroBottomText}>
                <View style={styles.liveFeedBadge}>
                  <Text style={styles.liveFeedText}>LIVE FEED</Text>
                </View>
                <Text style={styles.heroTitle}>Structural Framework</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Progress Overview */}
        <View style={styles.progressSection}>
          <View style={styles.progressCard}>
            <View style={styles.progressHeaderRow}>
              <View>
                <Text style={styles.progressLabel}>OVERALL PROGRESS</Text>
                <Text style={styles.progressValue}>68%</Text>
              </View>
              <View style={styles.progressEstContainer}>
                <Text style={styles.progressLabel}>EST. COMPLETION</Text>
                <Text style={styles.progressDate}>Oct 24, 2024</Text>
              </View>
            </View>
            
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '68%' }]} />
            </View>
            
            <View style={styles.statusRow}>
              <CheckCircle2 size={16} color="#059669" />
              <Text style={styles.statusText}>On track: +2 days ahead of schedule</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.actionBlockPrimary}>
            <Compass size={32} color="#2463eb" />
            <Text style={styles.actionBlockTitlePrimary}>Floorplans</Text>
            <Text style={styles.actionBlockSubPrimary}>12 Files Updated</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionBlockDark}
            onPress={() => router.push('/(app)/projects/cost-estimate')}
          >
            <FileText size={32} color="#ffffff" />
            <Text style={styles.actionBlockTitleDark}>Est. Costs</Text>
            <Text style={styles.actionBlockSubDark}>Financial Sync</Text>
          </TouchableOpacity>
        </View>

        {/* Team Section */}
        <View style={styles.teamSection}>
          <View style={styles.teamSectionHeader}>
            <Text style={styles.sectionTitle}>Active Team</Text>
            <TouchableOpacity>
              <Text style={styles.manageText}>MANAGE</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.teamScroll}>
            <View style={styles.teamMember}>
              <View style={styles.avatarBorderActive}>
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdp_kc5tOwTFoi2X-fskPmCEkEjhcNAVsowKQuOQtnfhhKkAXeUYxRGzsOZWpKM-G9lWJISh1HZq-OjUc_sR8NZe1D4uIzUc5YgxDzQQ6WtvS6qhZXN-hFH2q9Dy81rJ0lv4jsRZx3HcS76rlJGe8pbSdzNeFEp2BHV491F1qF-Ae4Q7Q2PTSh59XKOHvZRz7bCX8HhMAhsFOS-VZtKUIwnASmQUd8oNwVYJwIEL7aspcWb_AGSP8IyppBO5H89Sar728aXTCfBqM' }} style={styles.avatarImg} />
                <View style={styles.onlineDot} />
              </View>
              <Text style={styles.memberName}>Priya S.</Text>
              <Text style={styles.memberRole}>Architect</Text>
            </View>

            <View style={styles.teamMember}>
              <View style={styles.avatarBorderInactive}>
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP4alizkjj_oZ0Q8lPhpqXrGiJtT_ZNTQdvmAyPRFLDf_xLamt3IvcnLFBf5Hz2yuri-DHRf1HCSkqYT2EhuJltOG-bjC5J7hMghyc4wf2ApIGLKMG87nYg830w8xtsgusZQEnyF63MmsEoNWEQUgma4aQR35GE_5J9mWO_3BQU_qvhZOvVLJMYFqZHs8SYVA40eKFGAhYinidA2cmeukQzUSP2SsOt76T_4UOhtmJJOjkAasDXYyKywcsLIkzwr7ikyJARSLOJgY' }} style={styles.avatarImg} />
              </View>
              <Text style={styles.memberName}>Rahul M.</Text>
              <Text style={styles.memberRole}>Site Mgr.</Text>
            </View>

            <View style={styles.teamMember}>
              <View style={styles.avatarBorderInactive}>
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC16uaErlOIzm_LiQVEBpDb-725enKIE3kSscK1Ec4ekaIKSguGFW1LeRWRsRWVKZ_uvuijQZRkA3xQL0plKDq0-sJ5FJCX1uX9Q_9nWxr3BVBnVDwCMo9ZuCzLbjkw5B6RjnAvfYbivW5VseA-Hpc203vNxcc1eV4NG67ddQ8aidPMtwnxx4z9_TPLnc-5sCZKKQm28betaZQVpyiWpOR_t1Jqu0opXLspbRG0qglqUusAjWvc-OLWiX6lJMOgMIXEDX-5V0UvsGU' }} style={styles.avatarImg} />
              </View>
              <Text style={styles.memberName}>Aditi R.</Text>
              <Text style={styles.memberRole}>Engineer</Text>
            </View>

            <View style={styles.teamMember}>
              <TouchableOpacity style={styles.addMemberBtn}>
                <Plus size={24} color="#94a3b8" />
              </TouchableOpacity>
              <Text style={styles.inviteText}>Invite</Text>
            </View>
          </ScrollView>
        </View>

        {/* Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Milestone Timeline</Text>
          
          <View style={styles.timelineList}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineMarkerCol}>
                <View style={styles.markerCompleted} />
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineStatusCompleted}>COMPLETED</Text>
                <Text style={styles.timelineItemTitle}>Foundation Piling</Text>
                <Text style={styles.timelineItemSub}>Verified by inspector on Aug 12</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineMarkerCol}>
                <View style={styles.markerProgress} />
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineStatusProgress}>IN PROGRESS</Text>
                <Text style={styles.timelineItemTitle}>Steel Frame Assembly (Lvl 14-18)</Text>
                <Text style={styles.timelineItemSub}>ETA: Sept 30, 2024</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineMarkerCol}>
                <View style={styles.markerUpcoming} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineStatusUpcoming}>UPCOMING</Text>
                <Text style={[styles.timelineItemTitle, { color: '#94a3b8' }]}>Exterior Glass Cladding</Text>
                <Text style={styles.timelineItemSub}>Scheduled for Oct 2024</Text>
              </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748b',
    letterSpacing: 1,
    marginTop: 2,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    padding: 16,
  },
  heroImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    padding: 16,
  },
  fullscreenBtn: {
    alignSelf: 'flex-end',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBottomText: {
    alignItems: 'flex-start',
  },
  liveFeedBadge: {
    backgroundColor: '#2463eb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  liveFeedText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  progressValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2463eb',
  },
  progressEstContainer: {
    alignItems: 'flex-end',
  },
  progressDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  progressBarBg: {
    height: 12,
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2463eb',
    borderRadius: 6,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#059669',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  actionBlockPrimary: {
    flex: 1,
    backgroundColor: 'rgba(36, 99, 235, 0.1)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(36, 99, 235, 0.2)',
  },
  actionBlockTitlePrimary: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2463eb',
    marginTop: 8,
  },
  actionBlockSubPrimary: {
    fontSize: 10,
    color: 'rgba(36, 99, 235, 0.7)',
    marginTop: 2,
  },
  actionBlockDark: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  actionBlockTitleDark: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
  },
  actionBlockSubDark: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 2,
  },
  teamSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  teamSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  manageText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2463eb',
    letterSpacing: 0.5,
  },
  teamScroll: {
    gap: 16,
  },
  teamMember: {
    alignItems: 'center',
    width: 72,
  },
  avatarBorderActive: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#2463eb',
    padding: 2,
    marginBottom: 8,
  },
  avatarBorderInactive: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 2,
    marginBottom: 8,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  memberName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  memberRole: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 2,
  },
  addMemberBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  inviteText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  timelineSection: {
    paddingHorizontal: 16,
  },
  timelineList: {
    marginTop: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineMarkerCol: {
    alignItems: 'center',
    width: 24,
    marginRight: 16,
  },
  markerCompleted: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10b981',
    borderWidth: 3,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    marginTop: 6,
  },
  markerProgress: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2463eb',
    borderWidth: 3,
    borderColor: 'rgba(36, 99, 235, 0.2)',
    marginTop: 6,
  },
  markerUpcoming: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#cbd5e1',
    marginTop: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#e2e8f0',
    marginTop: 4,
    marginBottom: -16, // Connect to next item
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 16,
  },
  timelineStatusCompleted: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#10b981',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  timelineStatusProgress: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2463eb',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  timelineStatusUpcoming: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  timelineItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 2,
  },
  timelineItemSub: {
    fontSize: 12,
    color: '#64748b',
  },
});
