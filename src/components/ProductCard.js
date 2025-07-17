import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { colors, typography } from '../theme';

const { width } = Dimensions.get('window');

const ProductCard = ({ product, onPress, size = 'large' }) => {
  const isSmall = size === 'small';
  const cardWidth = isSmall ? 140 : (width - 52) / 2;

  const StarRating = ({ rating = 5 }) => (
    <View style={styles.starContainer}>
      {[...Array(5)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.star,
            { backgroundColor: index < rating ? colors.accent.yellow : colors.border.light }
          ]}
        />
      ))}
    </View>
  );

  return (
    <TouchableOpacity
      style={[styles.container, { width: cardWidth }]}
      onPress={() => onPress(product)}
      activeOpacity={0.8}
    >
      <View style={[styles.image, isSmall ? styles.imageSmall : styles.imageLarge]} />
      <View style={styles.info}>
        <Text style={[styles.name, isSmall && styles.nameSmall]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[styles.price, isSmall && styles.priceSmall]}>
          ${product.price}
        </Text>
        <StarRating rating={product.rating} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  image: {
    backgroundColor: colors.background.lightGray,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  imageSmall: {
    height: 116,
    margin: 12,
    borderRadius: 8,
  },
  imageLarge: {
    height: 160,
  },
  info: {
    padding: 12,
  },
  name: {
    ...typography.bodySmall,
    color: colors.text.dark,
    marginBottom: 8,
    lineHeight: 18,
  },
  nameSmall: {
    ...typography.caption,
    lineHeight: 16,
  },
  price: {
    ...typography.body,
    color: colors.primary.green,
    fontWeight: '600',
    marginBottom: 8,
  },
  priceSmall: {
    ...typography.bodySmall,
  },
  starContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
});

export default ProductCard;