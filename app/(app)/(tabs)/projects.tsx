import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Search, Bell, MapPin, Heart, Compass, FileText, MoreHorizontal, ArrowRight, Plus } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ProjectsScreen() {
  const [activeTab, setActiveTab] = useState('Active');
  
  const tabs = ['Active', 'Planning', 'Completed', 'Archived'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.headerTitle}>Project Hub</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={22} color="#475569" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={22} color="#475569" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs Section */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {tabs.map((tab) => (
            <TouchableOpacity 
              key={tab} 
              style={[
                styles.tabButton, 
                activeTab === tab ? styles.tabButtonActive : styles.tabButtonInactive
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text 
                style={[
                  styles.tabText, 
                  activeTab === tab ? styles.tabTextActive : styles.tabTextInactive
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Project Card 1 */}
        <View style={styles.projectCard}>
          <ImageBackground 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOppRdoIAOZx4FUCXj5i_Q--8css_0WyyXjgp4_r_lqtAvO9LeRi9FQQ1ACqJFBWAiLrmLQtFKU0Yc5LLxG7SgEEteM1iSziFe7SuMuvLoEaLbf14kvsG8Kucvo76XiunOh6jie4BIlbQrg6ff0Uo_4FKsqCJT9gDb364fdpWDhaaF23GLKUOmb99EpSdZttwNWWknNztbp74ASPC4-ioqkoFhzfqKFiJSLK8jciZWtMAvE9Fy5IgxnhxmAz2MH6tAbhp17fhz3_E' }}
            style={styles.cardImage}
          >
            <View style={styles.imageOverlay}>
              <TouchableOpacity style={styles.favoriteButton}>
                <Heart size={20} color="#0f172a" />
              </TouchableOpacity>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>IN PROGRESS</Text>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.projectTitle}>The Brutalist Sanctuary</Text>
                <View style={styles.locationContainer}>
                  <MapPin size={16} color="#64748b" />
                  <Text style={styles.locationText}>Downtown Arts District</Text>
                </View>
              </View>
              <Text style={styles.progressPercent}>68%</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: '68%' }]} />
            </View>

            {/* Action Buttons */}
            <View style={styles.gridActions}>
              <TouchableOpacity style={styles.gridBtn}>
                <Compass size={24} color="#94a3b8" />
                <Text style={styles.gridBtnText}>PLANS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gridBtn}>
                <FileText size={24} color="#94a3b8" />
                <Text style={styles.gridBtnText}>DOCS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gridBtn}>
                <MoreHorizontal size={24} color="#94a3b8" />
                <Text style={styles.gridBtnText}>MORE</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.mainActionButton} onPress={() => router.push('/(app)/projects/1' as any)}>
              <Text style={styles.mainActionText}>Dashboard</Text>
              <ArrowRight size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Project Card 2 */}
        <View style={styles.projectCard}>
          <ImageBackground 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxP8WQ1e5EEAJK_0ysDH6XXlZNxMv5e21OlDRfq5UFbq8S1_5CBGnos8U0jGUWm5EkJ5DI6BUk2BWh7yqz4QYU6i8Qm2_L5jlKprZOOjYuwoDWrzeoqhSmVLiX7FJApymv0L5gOEwXx4jFR2Rihcgqr7w2VmaDLbzQwdjsohH5341IxaXMeFfZQ1J2UsZpf8tXNgEf1iyu7VQvWJXGpxeqR7kdOuFRshBd_srf6_9L9hJI1Ve0ZJt-5aLaxY9Avu0OqwZVdqG1bBo' }}
            style={styles.cardImage}
          >
            <View style={styles.imageOverlay}>
              <TouchableOpacity style={styles.favoriteButton}>
                <Heart size={20} color="#94a3b8" />
              </TouchableOpacity>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>FOUNDATION</Text>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.projectTitle}>Azure Plaza Extension</Text>
                <View style={styles.locationContainer}>
                  <MapPin size={16} color="#64748b" />
                  <Text style={styles.locationText}>Financial District</Text>
                </View>
              </View>
              <Text style={styles.progressPercent}>12%</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: '12%' }]} />
            </View>

            {/* Action Buttons */}
            <View style={styles.gridActions}>
              <TouchableOpacity style={styles.gridBtn}>
                <Compass size={24} color="#94a3b8" />
                <Text style={styles.gridBtnText}>PLANS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gridBtn}>
                <FileText size={24} color="#94a3b8" />
                <Text style={styles.gridBtnText}>DOCS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gridBtn}>
                <MoreHorizontal size={24} color="#94a3b8" />
                <Text style={styles.gridBtnText}>MORE</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.mainActionButton}>
              <Text style={styles.mainActionText}>Dashboard</Text>
              <ArrowRight size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* New Project Button */}
        <TouchableOpacity style={styles.newProjectCard}>
          <View style={styles.newProjectIconContainer}>
            <Plus size={32} color="#94a3b8" />
          </View>
          <Text style={styles.newProjectTitle}>New Project</Text>
          <Text style={styles.newProjectSub}>Create a new site</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  welcomeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0f172a',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  tabsContainer: {
    marginBottom: 24,
  },
  tabsScroll: {
    paddingHorizontal: 24,
    gap: 16,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  tabButtonActive: {
    backgroundColor: '#1a1a1a',
  },
  tabButtonInactive: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  tabTextInactive: {
    color: '#64748b',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 32,
  },
  projectCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardImage: {
    height: 256,
    width: '100%',
  },
  imageOverlay: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
  },
  statusBadgeText: {
    color: '#0f172a',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardContent: {
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#64748b',
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 3,
    marginBottom: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  progressBarFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#1a1a1a',
    borderRadius: 3,
  },
  gridActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 8,
  },
  gridBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(248, 250, 252, 0.5)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  gridBtnText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#64748b',
    marginTop: 8,
    letterSpacing: 1,
  },
  mainActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  mainActionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  newProjectCard: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e2e8f0',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  newProjectIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  newProjectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  newProjectSub: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
});
