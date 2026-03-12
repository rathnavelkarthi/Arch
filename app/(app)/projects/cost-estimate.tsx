import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Share, Download, TrendingUp, TrendingDown } from 'lucide-react-native';
import { router } from 'expo-router';

export default function CostEstimateScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#2463eb" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Antilia Enclave</Text>
            <Text style={styles.headerSubtitle}>Cost Estimate Breakdown</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn}>
            <Share size={20} color="#475569" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtnPrimary}>
            <Download size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Estimate</Text>
            <Text style={styles.summaryValue}>₹14,25,000</Text>
            <View style={styles.summaryTrendRow}>
              <TrendingUp size={14} color="#059669" />
              <Text style={styles.summaryTrendPos}>+5.2% vs initial</Text>
            </View>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Profit Margin</Text>
            <Text style={styles.summaryValue}>18.5%</Text>
            <View style={styles.summaryTrendRow}>
              <TrendingDown size={14} color="#e11d48" />
              <Text style={styles.summaryTrendNeg}>-1.2% variance</Text>
            </View>
          </View>
        </View>

        {/* Expense Distribution Chart (Simulated with Bars for layout efficiency) */}
        <View style={styles.chartSection}>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.sectionTitle}>Category Distribution</Text>
              <TouchableOpacity>
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.distributionRow}>
              <View style={styles.totalCircle}>
                <Text style={styles.circleValue}>₹14.2L</Text>
                <Text style={styles.circleLabel}>GRAND TOTAL</Text>
              </View>

              <View style={styles.barsContainer}>
                
                <View style={styles.barItem}>
                  <View style={styles.barItemHeader}>
                    <View style={styles.barLabelRow}>
                      <View style={[styles.dot, { backgroundColor: '#2463eb' }]} />
                      <Text style={styles.barLabelText}>Materials</Text>
                    </View>
                    <Text style={styles.barValueText}>₹6,84,000 (48%)</Text>
                  </View>
                  <View style={styles.barBg}>
                    <View style={[styles.barFill, { backgroundColor: '#2463eb', width: '48%' }]} />
                  </View>
                </View>

                <View style={styles.barItem}>
                  <View style={styles.barItemHeader}>
                    <View style={styles.barLabelRow}>
                      <View style={[styles.dot, { backgroundColor: '#10b981' }]} />
                      <Text style={styles.barLabelText}>Labor</Text>
                    </View>
                    <Text style={styles.barValueText}>₹4,56,000 (32%)</Text>
                  </View>
                  <View style={styles.barBg}>
                    <View style={[styles.barFill, { backgroundColor: '#10b981', width: '32%' }]} />
                  </View>
                </View>

                <View style={styles.barItem}>
                  <View style={styles.barItemHeader}>
                    <View style={styles.barLabelRow}>
                      <View style={[styles.dot, { backgroundColor: '#f59e0b' }]} />
                      <Text style={styles.barLabelText}>Overhead</Text>
                    </View>
                    <Text style={styles.barValueText}>₹2,85,000 (20%)</Text>
                  </View>
                  <View style={styles.barBg}>
                    <View style={[styles.barFill, { backgroundColor: '#f59e0b', width: '20%' }]} />
                  </View>
                </View>

              </View>
            </View>
          </View>
        </View>

        {/* Detailed Line Items */}
        <View style={styles.lineItemsSection}>
          <Text style={styles.sectionTitle}>Line Items</Text>
          
          <View style={styles.tableCard}>
            <View style={styles.tableHeader}>
              <Text style={[styles.thText, { flex: 2 }]}>Description</Text>
              <Text style={[styles.thText, { flex: 1.5 }]}>Category</Text>
              <Text style={[styles.thText, { flex: 1, textAlign: 'right' }]}>Amount</Text>
            </View>

            {[
              { id: 1, title: 'Structural Steel', sub: 'Batch #442-A', cat: 'Materials', catColor: '#2463eb', catBg: 'rgba(36,99,235,0.1)', amt: '₹2,42,000' },
              { id: 2, title: 'On-site Staffing', sub: 'Week 12-15 Forecast', cat: 'Labor', catColor: '#10b981', catBg: 'rgba(16,185,129,0.1)', amt: '₹1,28,000' },
              { id: 3, title: 'Equipment Rental', sub: 'Excavator 300XP', cat: 'Overhead', catColor: '#f59e0b', catBg: 'rgba(245,158,11,0.1)', amt: '₹84,500' },
              { id: 4, title: 'Concrete Pouring', sub: 'Foundation Stage 2', cat: 'Materials', catColor: '#2463eb', catBg: 'rgba(36,99,235,0.1)', amt: '₹1,89,000' },
              { id: 5, title: 'HVAC Sub-contract', sub: 'Initial Installation', cat: 'Labor', catColor: '#10b981', catBg: 'rgba(16,185,129,0.1)', amt: '₹3,12,000' },
            ].map((item, index) => (
              <View key={item.id} style={[styles.tableRow, index !== 4 && styles.tableRowBorder]}>
                <View style={{ flex: 2 }}>
                  <Text style={styles.trTitle}>{item.title}</Text>
                  <Text style={styles.trSub}>{item.sub}</Text>
                </View>
                <View style={{ flex: 1.5, alignItems: 'flex-start' }}>
                  <View style={[styles.catBadge, { backgroundColor: item.catBg }]}>
                    <Text style={[styles.catBadgeText, { color: item.catColor }]}>{item.cat}</Text>
                  </View>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={styles.trAmount}>{item.amt}</Text>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.viewAllFooter}>
              <Text style={styles.viewAllFooterText}>View All 42 Items</Text>
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
    backgroundColor: '#f6f6f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnPrimary: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2463eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  summaryContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  summaryTrendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  summaryTrendPos: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  summaryTrendNeg: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e11d48',
  },
  chartSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2463eb',
  },
  distributionRow: {
    flexDirection: 'column',
    gap: 32,
  },
  totalCircle: {
    alignSelf: 'center',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 16,
    borderColor: '#f1f5f9',
    borderTopColor: '#2463eb', // Simulate part of the chart
    borderRightColor: '#2463eb',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-45deg' }], // Match HTML styling trick
  },
  circleValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    transform: [{ rotate: '45deg' }],
  },
  circleLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748b',
    letterSpacing: 1,
    transform: [{ rotate: '45deg' }],
  },
  barsContainer: {
    flex: 1,
    gap: 16,
  },
  barItem: {},
  barItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  barLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  barLabelText: {
    fontSize: 14,
    color: '#475569',
  },
  barValueText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  barBg: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  lineItemsSection: {
    paddingHorizontal: 16,
  },
  tableCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginTop: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  thText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  tableRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  trTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
  },
  trSub: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  catBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  catBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  trAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  viewAllFooter: {
    backgroundColor: '#f8fafc',
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  viewAllFooterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2463eb',
  },
});
