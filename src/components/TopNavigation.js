import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

const TopNavigation = ({ onCartPress, cartCount = 0 }) => {
  return (
    <View style={styles.container}>
      <View style={styles.notificationIcon} />
      <Text style={styles.logo}>ShopEase</Text>
      <TouchableOpacity style={styles.cartContainer} onPress={onCartPress}>
        <View style={styles.cartIcon} />
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.background.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  logo: {
    ...typography.title,
    color: colors.primary.green,
  },
  notificationIcon: {
    width: 24,
    height: 24,
    backgroundColor: colors.text.dark,
    borderRadius: 4,
  },
  cartContainer: {
    position: 'relative',
  },
  cartIcon: {
    width: 24,
    height: 24,
    backgroundColor: colors.text.dark,
    borderRadius: 4,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.primary.green,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.background.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default TopNavigation;