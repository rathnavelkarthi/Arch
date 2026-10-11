import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle2, MessageSquare, Sparkles, CheckSquare, UserPlus } from 'lucide-react-native';
import { router } from 'expo-router';

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Messages', 'Milestones', 'Alerts'];

  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New message from Urban Woods',
      time: '2m',
      desc: '"We have updated the shipping timeline for the reclaimed oak flooring..."',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChnNIRZ2H3y4wjrBAdqdFh7mtthKJa90xDKgFF0xiO8wGt24Q7VOi-yyfrBbbbyQGsJ8xQzKRC-nqWK4_32QtGtR__zvknUnAXrVm6dNQz7SRLVPdb2HAh6OHmLvhUS_HZ9QKDO9FsTFnxhRj5M0Jg7MXKYvPWGu-vdnyxk5yJ0aoKMVbck7Xa0l6x6mGdxfN8NUwuJTKRax91HplFd4CVPHQbOm0JBVNaBb4YlHG_JFJxuUR1pn83FH7todlOzt5uLIcRd-dk4l0',
      unread: true,
      dateGroup: 'Today',
      iconBg: '#dbeafe',
      iconColor: '#2563eb',
    },
    {
      id: 2,
      type: 'milestone',
      title: 'Milestone Completed',
      time: '1h',
      desc: "Foundation phase for 'The Glass House' project has been verified.",
      icon: CheckSquare,
      unread: false,
      dateGroup: 'Today',
      iconBg: '#d1fae5',
      iconColor: '#059669',
    },
    {
      id: 3,
      type: 'alert',
      title: 'AI Design Alert',
      time: '3h',
      desc: '3 new exterior concepts generated based on your latest moodboard.',
      icon: Sparkles,
      unread: false,
      dateGroup: 'Today',
      iconBg: '#fef3c7',
      iconColor: '#d97706',
    },
    {
      id: 4,
      type: 'update',
      title: 'Project Update',
      time: '1d',
      desc: 'Skyline Residences blueprint has been updated to v2.4.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoaQPzs09q0Im3tP4_9xk7m1pPkrZG8cuyea3cmn47cipXGSFHLIdUyXT5Pgkmwzule0xxUgoiY7wGSsDEfGCbbNvIsC3dvOqftGRN-93NaNJaV8xAnqR6r7Fu81wkq-aBlZ-zNl-W4jkG_aYVFXOYI4HEVIhoeWr5wx2BnDnTmEThswWHz6aa3Vtl_mMmAfeihG5o1pqpttDuClCtVxGFS_fFMIHoQU5EEvDQ4dXsNUdVSs-F_-viGyY2zLdx7hqezGjW5KR_6KM',
      unread: false,
      dateGroup: 'Yesterday',
      iconBg: '#e2e8f0',
      iconColor: '#475569',
    },
    {
      id: 5,
      type: 'alert',
      title: 'New Team Member',
      time: '1d',
      desc: 'Sarah Chen has joined the Modern Villa project as Lead Architect.',
      icon: UserPlus,
      unread: false,
      dateGroup: 'Yesterday',
      iconBg: '#e2e8f0',
      iconColor: '#475569',
    },
  ];

  const todayItems = notifications.filter((n) => n.dateGroup === 'Today');
  const yesterdayItems = notifications.filter((n) => n.dateGroup === 'Yesterday');

  const renderItem = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.notifItem}>
      {item.image ? (
        <View>
          <Image source={{ uri: item.image }} style={styles.avatar} />
          {item.type === 'message' && (
            <View style={styles.msgBadge}>
              <MessageSquare size={10} color="#ffffff" />
            </View>
          )}
        </View>
      ) : (
        <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
          {item.icon && <item.icon size={20} color={item.iconColor} />}
        </View>
      )}

      <View style={styles.notifContent}>
        <View style={styles.notifHeader}>
          <Text style={styles.notifTitle}>{item.title}</Text>
          <Text style={styles.notifTime}>{item.time}</Text>
        </View>
        <Text style={styles.notifDesc} numberOfLines={2}>{item.desc}</Text>
      </View>

      {item.unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={20} color="#475569" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Activity</Text>
        </View>
        <TouchableOpacity style={styles.markReadBtn}>
          <CheckCircle2 size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Today */}
          <View>
            <Text style={styles.dateLabel}>TODAY</Text>
            <View style={styles.notifGroup}>{todayItems.map(renderItem)}</View>
          </View>

          {/* Yesterday */}
          <View style={{ marginTop: 24 }}>
            <Text style={styles.dateLabel}>YESTERDAY</Text>
            <View style={styles.notifGroup}>{yesterdayItems.map(renderItem)}</View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  markReadBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tabsScroll: {
    paddingHorizontal: 16,
    gap: 24,
  },
  tab: {
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2463eb',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
  },
  activeTabText: {
    color: '#2463eb',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
    letterSpacing: 2,
    marginBottom: 12,
  },
  notifGroup: {
    gap: 4,
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  msgBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2563eb',
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifContent: {
    flex: 1,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
    marginRight: 8,
  },
  notifTime: {
    fontSize: 10,
    fontWeight: '500',
    color: '#94a3b8',
  },
  notifDesc: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
    lineHeight: 18,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563eb',
    marginTop: 6,
  },
});
