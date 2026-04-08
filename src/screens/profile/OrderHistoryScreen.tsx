import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';

const MOCK_ORDERS = [
  {
    id: 'ORD-4821',
    date: '2026-03-15T00:00:00Z',
    status: 'Delivered',
    total: 157,
    items: ['Obsidian Scalp Treatment Oil', 'Caviar & Keratin Conditioner'],
  },
  {
    id: 'ORD-4690',
    date: '2026-02-28T00:00:00Z',
    status: 'Delivered',
    total: 110,
    items: ['Liquid Gold Vitamin C Serum'],
  },
  {
    id: 'ORD-4521',
    date: '2026-01-10T00:00:00Z',
    status: 'Delivered',
    total: 218,
    items: ['Black Orchid Moisturising Cream', 'Gold Protein Repair Mask'],
  },
];

const OrderHistoryScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ORDER HISTORY</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {MOCK_ORDERS.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{order.id}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{order.status.toUpperCase()}</Text>
              </View>
            </View>
            <Text style={styles.orderDate}>
              {new Date(order.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </Text>
            {order.items.map((item, i) => (
              <View key={i} style={styles.orderItem}>
                <View style={styles.itemDot} />
                <Text style={styles.itemName}>{item}</Text>
              </View>
            ))}
            <View style={styles.orderFooter}>
              <Text style={styles.orderTotal}>Total: ${order.total.toFixed(2)}</Text>
              <TouchableOpacity>
                <Text style={styles.reorderText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.richBlack },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: { width: 40 },
  backIcon: { fontSize: 22, color: Colors.primaryGold },
  title: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    letterSpacing: 3,
  },
  content: { padding: Spacing.md, paddingBottom: Spacing['3xl'] },
  orderCard: {
    backgroundColor: Colors.surface,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  orderId: { fontFamily: FontFamily.bodySemiBold, fontSize: FontSize.sm, color: Colors.textPrimary },
  statusBadge: { backgroundColor: 'rgba(76,175,80,0.15)', borderWidth: 1, borderColor: Colors.success, borderRadius: 2, paddingHorizontal: 6, paddingVertical: 2 },
  statusText: { fontFamily: FontFamily.bodySemiBold, fontSize: FontSize.xs, color: Colors.success, letterSpacing: 1 },
  orderDate: { fontFamily: FontFamily.body, fontSize: FontSize.xs, color: Colors.textSecondary, marginBottom: Spacing.sm },
  orderItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginBottom: 4 },
  itemDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.primaryGold },
  itemName: { fontFamily: FontFamily.body, fontSize: FontSize.sm, color: Colors.textSecondary },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: Spacing.sm },
  orderTotal: { fontFamily: FontFamily.bodySemiBold, fontSize: FontSize.sm, color: Colors.primaryGold },
  reorderText: { fontFamily: FontFamily.body, fontSize: FontSize.sm, color: Colors.textSecondary, textDecorationLine: 'underline' },
});

export default OrderHistoryScreen;
