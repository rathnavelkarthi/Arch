import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Share, Alert } from 'react-native';
import { 
  ArrowLeft, Share2, Download, TrendingUp, Calculator, Package, 
  ShoppingCart, Check, Sparkles, Building2, Layers
} from 'lucide-react-native';
import { router } from 'expo-router';

type QualityGrade = 'standard' | 'premium' | 'luxury';

export default function CostEstimateScreen() {
  const [projectName, setProjectName] = useState('Antilia Enclave');
  const [area, setArea] = useState<number>(2400);
  const [areaText, setAreaText] = useState('2400');
  const [grade, setGrade] = useState<QualityGrade>('premium');
  const [floors, setFloors] = useState<number>(2);
  const [marginPercent, setMarginPercent] = useState<number>(15);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Rate per sq ft based on architectural grade
  const gradeRates: Record<QualityGrade, number> = {
    standard: 1850,
    premium: 2650,
    luxury: 3950,
  };

  const ratePerSqFt = gradeRates[grade];
  const totalBaseCost = area * ratePerSqFt;
  // Floor factor multiplier
  const floorMultiplier = floors === 1 ? 1.0 : floors === 2 ? 1.05 : floors === 3 ? 1.12 : 1.20;
  const adjustedTotal = Math.round(totalBaseCost * floorMultiplier);
  const architectMargin = Math.round(adjustedTotal * (marginPercent / 100));
  const grandTotal = adjustedTotal + architectMargin;

  // Category distributions
  const rawMaterialsCost = Math.round(adjustedTotal * 0.48);
  const finishingCost = Math.round(adjustedTotal * 0.28);
  const laborCost = Math.round(adjustedTotal * 0.16);
  const overheadCost = Math.round(adjustedTotal * 0.08);

  const formatINR = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  const handleAreaChange = (text: string) => {
    setAreaText(text);
    const parsed = parseInt(text.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(parsed) && parsed > 0) {
      setArea(parsed);
    }
  };

  const setPresetArea = (val: number) => {
    setArea(val);
    setAreaText(val.toString());
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Ilam Mora Architectural Estimate for ${projectName}\nBuilt-up Area: ${area.toLocaleString()} sq ft\nGrade: ${grade.toUpperCase()}\nEstimated Total: ${formatINR(grandTotal)}\nRaw Materials: ${formatINR(rawMaterialsCost)}\nProcure materials directly via Ilam Mora.`,
      });
    } catch {
      // Ignored
    }
  };

  const handleSaveToProjects = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      Alert.alert(
        'Estimate Saved to Projects',
        `Estimate for ${projectName} (${formatINR(grandTotal)}) has been saved to your project hub.`,
        [
          { text: 'Stay Here', style: 'cancel' },
          { text: 'Go to Projects', onPress: () => router.push('/(app)/(tabs)/projects' as any) },
        ]
      );
    }, 400);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Apple-Style Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity 
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <ArrowLeft size={22} color="#0f172a" />
          </TouchableOpacity>
          <View>
            <TextInput
              style={styles.headerTitleInput}
              value={projectName}
              onChangeText={setProjectName}
              placeholder="Project Name"
              placeholderTextColor="#94a3b8"
            />
            <Text style={styles.headerSubtitle}>ARCHITECTURAL COST ESTIMATOR & BOQ</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            accessibilityRole="button" 
            accessibilityLabel="Share BOQ"
            style={styles.iconBtn} 
            onPress={handleShare}
          >
            <Share2 size={18} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity 
            accessibilityRole="button" 
            accessibilityLabel="Save Project"
            style={styles.iconBtnPrimary} 
            onPress={handleSaveToProjects}
          >
            <Download size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Real-Time Grand Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCardPrimary}>
            <Text style={styles.summaryLabelLight}>TOTAL PROJECT BUDGET</Text>
            <Text style={styles.summaryValueLight}>{formatINR(grandTotal)}</Text>
            <View style={styles.summaryTrendRow}>
              <TrendingUp size={14} color="#67e8f9" />
              <Text style={styles.summaryTrendPosLight}>
                {formatINR(Math.round(grandTotal / area))}/sq ft · {floors} Floors
              </Text>
            </View>
          </View>

          <View style={styles.summaryCardSecondary}>
            <Text style={styles.summaryLabel}>ARCHITECT FEE / MARGIN</Text>
            <Text style={styles.summaryValue}>{formatINR(architectMargin)}</Text>
            <View style={styles.summaryTrendRow}>
              <Sparkles size={14} color="#10b981" />
              <Text style={styles.summaryTrendPos}>{marginPercent}% Recommended Fee</Text>
            </View>
          </View>
        </View>

        {/* ======================================================== */}
        {/* INTERACTIVE ESTIMATION CONTROLS                          */}
        {/* ======================================================== */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <Calculator size={18} color="#0f172a" />
            <Text style={styles.cardHeaderText}>Project Specifications</Text>
          </View>

          {/* Built-Up Area Input & Presets */}
          <View style={styles.inputBlock}>
            <View style={styles.inputLabelRow}>
              <Text style={styles.fieldLabel}>BUILT-UP AREA (SQ FT)</Text>
              <Text style={styles.fieldSubValue}>{area.toLocaleString()} sq ft</Text>
            </View>
            <TextInput
              style={styles.areaInput}
              keyboardType="numeric"
              value={areaText}
              onChangeText={handleAreaChange}
              placeholder="e.g. 2400"
            />
            <View style={styles.presetPillsRow}>
              {[1200, 2400, 3600, 5000].map(val => (
                <TouchableOpacity
                  key={val}
                  style={[styles.presetPill, area === val && styles.presetPillActive]}
                  onPress={() => setPresetArea(val)}
                >
                  <Text style={[styles.presetPillText, area === val && styles.presetPillTextActive]}>
                    {val.toLocaleString()} sq ft
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quality Tier Selector */}
          <View style={styles.inputBlock}>
            <Text style={styles.fieldLabel}>ARCHITECTURAL SPECIFICATION GRADE</Text>
            <View style={styles.gradeSelectorRow}>
              <TouchableOpacity
                style={[styles.gradeCard, grade === 'standard' && styles.gradeCardActive]}
                onPress={() => setGrade('standard')}
              >
                <Text style={[styles.gradeTitle, grade === 'standard' && styles.gradeTitleActive]}>Standard</Text>
                <Text style={styles.gradeRate}>₹1,850/sq ft</Text>
                <Text style={styles.gradeDesc}>RCC Frame + Standard Brick</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.gradeCard, grade === 'premium' && styles.gradeCardActive]}
                onPress={() => setGrade('premium')}
              >
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedBadgeText}>BEST</Text>
                </View>
                <Text style={[styles.gradeTitle, grade === 'premium' && styles.gradeTitleActive]}>Premium</Text>
                <Text style={styles.gradeRate}>₹2,650/sq ft</Text>
                <Text style={styles.gradeDesc}>Makrana Marble + Teak Wood</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.gradeCard, grade === 'luxury' && styles.gradeCardActive]}
                onPress={() => setGrade('luxury')}
              >
                <Text style={[styles.gradeTitle, grade === 'luxury' && styles.gradeTitleActive]}>Luxury</Text>
                <Text style={styles.gradeRate}>₹3,950/sq ft</Text>
                <Text style={styles.gradeDesc}>Bespoke Glass Facade + Smart</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Number of Floors */}
          <View style={styles.inputBlock}>
            <View style={styles.inputLabelRow}>
              <Text style={styles.fieldLabel}>NUMBER OF FLOORS</Text>
              <Text style={styles.fieldSubValue}>{floors} {floors === 1 ? 'Floor (Ground)' : 'Floors'}</Text>
            </View>
            <View style={styles.floorsRow}>
              {[1, 2, 3, 4].map(num => (
                <TouchableOpacity
                  key={num}
                  style={[styles.floorBtn, floors === num && styles.floorBtnActive]}
                  onPress={() => setFloors(num)}
                >
                  <Text style={[styles.floorBtnText, floors === num && styles.floorBtnTextActive]}>
                    {num === 1 ? 'Ground' : `G+${num - 1}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Architect Margin Tier */}
          <View style={styles.inputBlock}>
            <View style={styles.inputLabelRow}>
              <Text style={styles.fieldLabel}>ARCHITECTURAL COMMISSION & FEE</Text>
              <Text style={styles.fieldSubValue}>{marginPercent}% ({formatINR(architectMargin)})</Text>
            </View>
            <View style={styles.floorsRow}>
              {[10, 15, 18, 20].map(pct => (
                <TouchableOpacity
                  key={pct}
                  style={[styles.floorBtn, marginPercent === pct && styles.floorBtnActive]}
                  onPress={() => setMarginPercent(pct)}
                >
                  <Text style={[styles.floorBtnText, marginPercent === pct && styles.floorBtnTextActive]}>
                    {pct}% Fee
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* ======================================================== */}
        {/* CATEGORY DISTRIBUTION BARS                               */}
        {/* ======================================================== */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <Layers size={18} color="#0f172a" />
            <Text style={styles.cardHeaderText}>Cost Distribution Breakdown</Text>
          </View>

          {/* Raw Materials Bar */}
          <View style={styles.distBarWrap}>
            <View style={styles.distBarLabelRow}>
              <View style={styles.dotLabelRow}>
                <View style={[styles.dot, { backgroundColor: '#2563eb' }]} />
                <Text style={styles.distLabelText}>Raw Materials (Steel, Cement, Aggregates)</Text>
              </View>
              <Text style={styles.distValueText}>{formatINR(rawMaterialsCost)} (48%)</Text>
            </View>
            <View style={styles.barBg}>
              <View style={[styles.barFill, { backgroundColor: '#2563eb', width: '48%' }]} />
            </View>
          </View>

          {/* Finishing Materials Bar */}
          <View style={styles.distBarWrap}>
            <View style={styles.distBarLabelRow}>
              <View style={styles.dotLabelRow}>
                <View style={[styles.dot, { backgroundColor: '#9333ea' }]} />
                <Text style={styles.distLabelText}>Finishes (Marble, Timber, Glass, Paint)</Text>
              </View>
              <Text style={styles.distValueText}>{formatINR(finishingCost)} (28%)</Text>
            </View>
            <View style={styles.barBg}>
              <View style={[styles.barFill, { backgroundColor: '#9333ea', width: '28%' }]} />
            </View>
          </View>

          {/* Labor & Site Engineering */}
          <View style={styles.distBarWrap}>
            <View style={styles.distBarLabelRow}>
              <View style={styles.dotLabelRow}>
                <View style={[styles.dot, { backgroundColor: '#10b981' }]} />
                <Text style={styles.distLabelText}>Labor, MEP & Structural Execution</Text>
              </View>
              <Text style={styles.distValueText}>{formatINR(laborCost)} (16%)</Text>
            </View>
            <View style={styles.barBg}>
              <View style={[styles.barFill, { backgroundColor: '#10b981', width: '16%' }]} />
            </View>
          </View>

          {/* Approvals & Overhead */}
          <View style={styles.distBarWrap}>
            <View style={styles.distBarLabelRow}>
              <View style={styles.dotLabelRow}>
                <View style={[styles.dot, { backgroundColor: '#f59e0b' }]} />
                <Text style={styles.distLabelText}>Sanctions, Soil Testing & Permits</Text>
              </View>
              <Text style={styles.distValueText}>{formatINR(overheadCost)} (8%)</Text>
            </View>
            <View style={styles.barBg}>
              <View style={[styles.barFill, { backgroundColor: '#f59e0b', width: '8%' }]} />
            </View>
          </View>
        </View>

        {/* ======================================================== */}
        {/* DIRECT IN-APP MATERIAL PROCUREMENT (BUY FROM APP!)       */}
        {/* ======================================================== */}
        <View style={styles.procurementBanner}>
          <View style={styles.procureHeader}>
            <Package size={22} color="#ffffff" />
            <View style={{ flex: 1 }}>
              <Text style={styles.procureTitle}>Direct Raw Material Procurement</Text>
              <Text style={styles.procureSubtitle}>
                Architects can buy structural steel, high-strength concrete, marble & fixtures directly in Ilam Mora.
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            accessibilityRole="button"
            style={styles.procureActionBtn}
            onPress={() => router.push('/(app)/marketplace/products' as any)}
          >
            <ShoppingCart size={18} color="#0f172a" />
            <Text style={styles.procureActionBtnText}>Procure Materials for {projectName}</Text>
          </TouchableOpacity>
        </View>

        {/* Detailed Material Line Items Table */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Material Procurement Schedule</Text>
            <TouchableOpacity onPress={() => router.push('/(app)/marketplace/products' as any)}>
              <Text style={styles.shopAllText}>Shop All Raw Materials →</Text>
            </TouchableOpacity>
          </View>

          {[
            { 
              id: 1, 
              name: 'Structural Steel Grade A572', 
              spec: 'High-tensile I-Beams & Rebar #4', 
              cat: 'Raw Materials', 
              amt: formatINR(Math.round(rawMaterialsCost * 0.42)),
              tag: 'In-App Wholesale' 
            },
            { 
              id: 2, 
              name: 'Quick-Set Concrete M30', 
              spec: 'Certified Ready-Mix Foundation', 
              cat: 'Raw Materials', 
              amt: formatINR(Math.round(rawMaterialsCost * 0.38)),
              tag: 'Verified Mill' 
            },
            { 
              id: 3, 
              name: 'Premium Makrana Marble', 
              spec: 'Polished slabs, cut to architectural spec', 
              cat: 'Finishing', 
              amt: formatINR(Math.round(finishingCost * 0.55)),
              tag: 'Direct Quarry' 
            },
            { 
              id: 4, 
              name: 'Sustainable Teak Planking', 
              spec: 'FSC Certified Grade-A Flooring', 
              cat: 'Finishing', 
              amt: formatINR(Math.round(finishingCost * 0.35)),
              tag: 'Eco Certified' 
            },
          ].map((item, idx) => (
            <View key={item.id} style={[styles.lineItemRow, idx > 0 && styles.lineItemBorder]}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemSpec}>{item.spec}</Text>
                <View style={styles.badgeRow}>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagBadgeText}>{item.tag}</Text>
                  </View>
                  <Text style={styles.catLabel}>{item.cat}</Text>
                </View>
              </View>
              <View style={styles.itemRightCol}>
                <Text style={styles.itemAmount}>{item.amt}</Text>
                <TouchableOpacity 
                  style={styles.buyNowBtn}
                  onPress={() => router.push('/(app)/marketplace/products' as any)}
                >
                  <ShoppingCart size={13} color="#2563eb" style={{ marginRight: 4 }} />
                  <Text style={styles.buyNowBtnText}>Buy in App</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Save to Project Workspace Action Card */}
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={styles.saveToProjectsBtn}
            onPress={handleSaveToProjects}
            activeOpacity={0.88}
          >
            {savedSuccess ? (
              <>
                <Check size={20} color="#ffffff" />
                <Text style={styles.saveBtnText}>Estimate Saved to Workspace!</Text>
              </>
            ) : (
              <>
                <Building2 size={20} color="#ffffff" />
                <Text style={styles.saveBtnText}>Save Estimate to Project Workspace</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleInput: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    padding: 0,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.8,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnPrimary: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 48,
  },
  // Summary Cards
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  summaryCardPrimary: {
    flex: 1.2,
    backgroundColor: '#0f172a',
    padding: 18,
    borderRadius: 20,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  summaryLabelLight: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  summaryValueLight: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  summaryTrendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  summaryTrendPosLight: {
    fontSize: 11,
    color: '#cbd5e1',
    fontWeight: '500',
  },
  summaryCardSecondary: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  summaryTrendPos: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  // Section Card
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  cardHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.3,
  },
  shopAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563eb',
  },
  inputBlock: {
    marginBottom: 18,
  },
  inputLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 0.6,
  },
  fieldSubValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563eb',
  },
  areaInput: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    backgroundColor: '#f8fafc',
    marginBottom: 8,
  },
  presetPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  presetPillActive: {
    backgroundColor: '#0f172a',
  },
  presetPillText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#475569',
  },
  presetPillTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  // Grade selector
  gradeSelectorRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  gradeCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    position: 'relative',
  },
  gradeCardActive: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -8,
    right: 8,
    backgroundColor: '#2563eb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  recommendedBadgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
  },
  gradeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  gradeTitleActive: {
    color: '#2563eb',
  },
  gradeRate: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 2,
  },
  gradeDesc: {
    fontSize: 10,
    color: '#64748b',
    lineHeight: 14,
  },
  // Floors and margin
  floorsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  floorBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
  },
  floorBtnActive: {
    backgroundColor: '#0f172a',
  },
  floorBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#475569',
  },
  floorBtnTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  // Distribution bars
  distBarWrap: {
    marginBottom: 14,
  },
  distBarLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  dotLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  distLabelText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '500',
  },
  distValueText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  barBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f1f5f9',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  // Procurement Banner
  procurementBanner: {
    backgroundColor: '#0f172a',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    gap: 16,
  },
  procureHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  procureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  procureSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 18,
  },
  procureActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  procureActionBtnText: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '700',
  },
  // Line items
  lineItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  lineItemBorder: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  itemSpec: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tagBadge: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagBadgeText: {
    color: '#059669',
    fontSize: 9,
    fontWeight: '700',
  },
  catLabel: {
    fontSize: 10,
    color: '#94a3b8',
  },
  itemRightCol: {
    alignItems: 'flex-end',
    gap: 6,
  },
  itemAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  buyNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  buyNowBtnText: {
    color: '#2563eb',
    fontSize: 11,
    fontWeight: '600',
  },
  // Action section
  actionSection: {
    marginTop: 4,
  },
  saveToProjectsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 10,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  saveBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
