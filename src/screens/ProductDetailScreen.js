import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomStatusBar from '../components/StatusBar';
import { colors, typography } from '../theme';

const ProductDetailScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Blue');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const images = [1, 2, 3]; // Placeholder for multiple images
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colorOptions = [
    { name: 'Blue', color: '#007AFF' },
    { name: 'Black', color: '#000000' },
    { name: 'White', color: '#FFFFFF' },
    { name: 'Red', color: '#FF3B30' },
  ];

  const StarRating = ({ rating = 5, size = 16 }) => (
    <View style={styles.starContainer}>
      {[...Array(5)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.star,
            {
              width: size,
              height: size,
              backgroundColor: index < rating ? colors.accent.yellow : colors.border.light
            }
          ]}
        />
      ))}
      <Text style={[styles.ratingText, { marginLeft: 8 }]}>4.8 (127 reviews)</Text>
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
        <TouchableOpacity style={styles.shareButton}>
          <View style={styles.shareIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => (
            <View style={styles.productImage} />
          )}
        />

        <View style={styles.productDetails}>
          {/* Title & Price */}
          <View style={styles.titlePriceSection}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
          </View>

          {/* Size Selector */}
          <View style={styles.optionSection}>
            <Text style={styles.optionLabel}>Size</Text>
            <View style={styles.sizeContainer}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizePill,
                    selectedSize === size && styles.sizePillSelected
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[
                    styles.sizePillText,
                    selectedSize === size && styles.sizePillTextSelected
                  ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Color Selector */}
          <View style={styles.optionSection}>
            <Text style={styles.optionLabel}>Color</Text>
            <View style={styles.colorContainer}>
              {colorOptions.map((colorOption) => (
                <TouchableOpacity
                  key={colorOption.name}
                  style={[
                    styles.colorSwatch,
                    { backgroundColor: colorOption.color },
                    selectedColor === colorOption.name && styles.colorSwatchSelected,
                    colorOption.color === '#FFFFFF' && styles.whiteColorBorder
                  ]}
                  onPress={() => setSelectedColor(colorOption.name)}
                />
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.description}>
              Made from 100% organic cotton, this premium t-shirt offers exceptional comfort and durability. 
              Perfect for casual wear with a modern fit that looks great on everyone.
            </Text>
            <TouchableOpacity>
              <Text style={styles.moreLink}>More...</Text>
            </TouchableOpacity>
          </View>

          {/* Reviews */}
          <View style={styles.reviewsSection}>
            <StarRating rating={5} />
            <TouchableOpacity>
              <Text style={styles.reviewsLink}>See all reviews</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.wishlistButton, isWishlisted && styles.wishlistButtonActive]}
          onPress={() => setIsWishlisted(!isWishlisted)}
        >
          <View style={styles.heartIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  shareButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    width: 24,
    height: 24,
    backgroundColor: colors.text.dark,
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  productImage: {
    width: 375,
    height: 300,
    backgroundColor: colors.background.lightGray,
  },
  productDetails: {
    padding: 20,
  },
  titlePriceSection: {
    marginBottom: 24,
  },
  productTitle: {
    ...typography.title,
    color: colors.text.dark,
    marginBottom: 8,
  },
  productPrice: {
    ...typography.subtitle,
    color: colors.primary.green,
  },
  optionSection: {
    marginBottom: 24,
  },
  optionLabel: {
    ...typography.body,
    color: colors.text.dark,
    marginBottom: 12,
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sizePill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.background.lightGray,
  },
  sizePillSelected: {
    backgroundColor: colors.primary.green,
  },
  sizePillText: {
    ...typography.bodySmall,
    color: colors.text.dark,
  },
  sizePillTextSelected: {
    color: colors.background.white,
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorSwatchSelected: {
    borderColor: colors.primary.green,
    borderWidth: 3,
  },
  whiteColorBorder: {
    borderColor: colors.border.light,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    ...typography.body,
    color: colors.text.medium,
    lineHeight: 24,
    marginBottom: 8,
  },
  moreLink: {
    ...typography.body,
    color: colors.primary.green,
  },
  reviewsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    borderRadius: 2,
    marginRight: 2,
  },
  ratingText: {
    ...typography.bodySmall,
    color: colors.text.medium,
  },
  reviewsLink: {
    ...typography.bodySmall,
    color: colors.primary.green,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: colors.background.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  wishlistButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistButtonActive: {
    backgroundColor: colors.primary.green,
    borderColor: colors.primary.green,
  },
  heartIcon: {
    width: 24,
    height: 24,
    backgroundColor: colors.text.dark,
    borderRadius: 4,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: colors.primary.green,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  addToCartText: {
    ...typography.body,
    color: colors.background.white,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;