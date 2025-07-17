import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomStatusBar from '../components/StatusBar';
import { colors, typography } from '../theme';

const CartScreen = ({ navigation }) => {
  const [promoCode, setPromoCode] = useState('');
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Cotton T-Shirt',
      size: 'M',
      color: 'Blue',
      price: 29.99,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Denim Jacket',
      size: 'L',
      color: 'Black',
      price: 89.99,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 4.99;
  const total = subtotal + shipping;

  const CartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetails}>Size: {item.size}, Color: {item.color}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <View style={styles.quantitySelector}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, -1)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.id)}
      >
        <View style={styles.removeIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cart Items */}
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CartItem item={item} />}
          scrollEnabled={false}
        />

        {cartItems.length === 0 && (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <TouchableOpacity
              style={styles.shopNowButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.shopNowText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={styles.cartSummary}>
          {/* Promo Code */}
          <View style={styles.promoSection}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter promo code"
              placeholderTextColor={colors.text.medium}
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>

          {/* Order Summary */}
          <View style={styles.orderSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={styles.summaryValue}>-$0.00</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      )}

      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.lightGray,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.background.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    width: 24,
    height: 24,
    backgroundColor: colors.text.dark,
    borderRadius: 4,
  },
  headerTitle: {
    ...typography.subtitle,
    color: colors.text.dark,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 1,
    gap: 16,
  },
  itemImage: {
    width: 60,
    height: 60,
    backgroundColor: colors.background.lightGray,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...typography.bodySmall,
    color: colors.text.dark,
    marginBottom: 4,
  },
  itemDetails: {
    ...typography.caption,
    color: colors.text.medium,
    marginBottom: 4,
  },
  itemPrice: {
    ...typography.body,
    color: colors.primary.green,
    fontWeight: '600',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    ...typography.body,
    color: colors.text.dark,
  },
  quantityText: {
    ...typography.body,
    color: colors.text.dark,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeIcon: {
    width: 16,
    height: 16,
    backgroundColor: colors.text.medium,
    borderRadius: 2,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyCartText: {
    ...typography.subtitle,
    color: colors.text.medium,
    marginBottom: 24,
  },
  shopNowButton: {
    backgroundColor: colors.primary.green,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  shopNowText: {
    ...typography.body,
    color: colors.background.white,
    fontWeight: '600',
  },
  cartSummary: {
    backgroundColor: colors.background.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    padding: 20,
  },
  promoSection: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  promoInput: {
    flex: 1,
    height: 48,
    backgroundColor: colors.background.lightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    ...typography.body,
    color: colors.text.dark,
  },
  applyButton: {
    backgroundColor: colors.primary.green,
    borderRadius: 8,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    ...typography.bodySmall,
    color: colors.background.white,
    fontWeight: '600',
  },
  orderSummary: {
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    ...typography.body,
    color: colors.text.medium,
  },
  summaryValue: {
    ...typography.body,
    color: colors.text.dark,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    ...typography.body,
    color: colors.text.dark,
    fontWeight: '600',
  },
  totalValue: {
    ...typography.subtitle,
    color: colors.primary.green,
    fontWeight: '600',
  },
  checkoutContainer: {
    backgroundColor: colors.background.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  checkoutButton: {
    backgroundColor: colors.primary.green,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    ...typography.body,
    color: colors.background.white,
    fontWeight: '600',
  },
});

export default CartScreen;