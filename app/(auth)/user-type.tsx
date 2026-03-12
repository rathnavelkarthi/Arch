import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Building2, HardHat, Package, Paintbrush2, Landmark } from 'lucide-react-native';

const userTypes = [
  {
    id: 'architect',
    title: 'Architect',
    subtitle: 'Design & Planning',
    icon: Building2,
  },
  {
    id: 'builder',
    title: 'Builder',
    subtitle: 'Construction',
    icon: HardHat,
  },
  {
    id: 'supplier',
    title: 'Supplier',
    subtitle: 'Materials',
    icon: Package,
  },
  {
    id: 'designer',
    title: 'Interior Designer',
    subtitle: 'Aesthetics',
    icon: Paintbrush2,
  },
  {
    id: 'developer',
    title: 'Property Developer',
    subtitle: 'Investment & Scaling',
    icon: Landmark,
    fullWidth: true,
  },
];

export default function UserTypeSelectionScreen() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedType) {
      // Proceed to the main app dashboard
      router.replace('/(app)/(tabs)/dashboard');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Grid Pattern (Simulated with background color for now) */}
      <View style={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Building2 size={16} color="#ffffff" />
            </View>
            <Text style={styles.logoText}>BuildVerse</Text>
          </View>
          <View style={{ width: 40 }} /> {/* Spacer for centering */}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Let's get started</Text>
            <Text style={styles.subtitle}>What best describes you?</Text>
          </View>

          {/* Grid Selection */}
          <View style={styles.grid}>
            {userTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.card,
                    type.fullWidth && styles.cardFullWidth,
                    isSelected && styles.cardSelected,
                  ]}
                  onPress={() => setSelectedType(type.id)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.iconContainer,
                    isSelected && styles.iconContainerSelected
                  ]}>
                    <Icon 
                      size={32} 
                      color={isSelected ? "#ffffff" : "#2463eb"} 
                    />
                  </View>
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{type.title}</Text>
                    <Text style={styles.cardSubtitle}>{type.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.continueButton, !selectedType && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!selectedType}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

          {/* Progress Indicators */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#2463eb',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  titleContainer: {
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 18,
    color: '#475569',
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  cardFullWidth: {
    width: '100%',
  },
  cardSelected: {
    borderColor: '#2463eb',
    backgroundColor: '#eff6ff',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(36, 99, 235, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconContainerSelected: {
    backgroundColor: '#2463eb',
  },
  cardTextContainer: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  footer: {
    padding: 24,
    backgroundColor: '#f6f6f8',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  continueButton: {
    backgroundColor: '#2463eb',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2463eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonDisabled: {
    backgroundColor: '#94a3b8',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cbd5e1',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#2463eb',
  },
});
