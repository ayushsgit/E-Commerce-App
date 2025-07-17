import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  FlatList, 
  StyleSheet,
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomStatusBar from '../components/StatusBar';
import { colors, typography } from '../theme';

const { width: screenWidth } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [1, 2, 3, 4]; // Mock image data
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colorOptions = [
    { name: 'Black', color: '#000000' },
    { name: 'White', color: '#FFFFFF' },
    { name: 'Blue', color: '#007AFF' },
    { name: 'Red', color: '#FF3B30' },
    { name: 'Green', color: '#34C759' },
  ];

  const StarRating = ({ rating }) => (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? 'star' : 'star-outline'}
          size={16}
          color={colors.warning}
        />
      ))}
      <Text style={styles.ratingText}>({rating}.0)</Text>
    </View>
  );

  const addToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', { product, selectedSize, selectedColor });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.dark} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Product Details</Text>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={colors.text.dark} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <FlatList
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
              setCurrentImageIndex(index);
            }}
            renderItem={({ item, index }) => (
              <View style={styles.productImage}>
                <Ionicons name="image-outline" size={48} color={colors.text.light} />
              </View>
            )}
          />
          
          {/* Image Indicator */}
          <View style={styles.imageIndicator}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentImageIndex === index && styles.indicatorActive
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.productDetails}>
          {/* Title & Price */}
          <View style={styles.titlePriceSection}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>${product.price}</Text>
              <View style={styles.stockBadge}>
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                <Text style={styles.stockText}>In Stock</Text>
              </View>
            </View>
          </View>

          {/* Rating */}
          <View style={styles.ratingSection}>
            <StarRating rating={5} />
            <TouchableOpacity style={styles.reviewsButton}>
              <Text style={styles.reviewsLink}>See all reviews</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary.main} />
            </TouchableOpacity>
          </View>

          {/* Size Selector */}
          <View style={styles.optionSection}>
            <View style={styles.optionHeader}>
              <Text style={styles.optionLabel}>Size</Text>
              <TouchableOpacity style={styles.sizeGuideButton}>
                <Ionicons name="ruler-outline" size={16} color={colors.primary.main} />
                <Text style={styles.sizeGuideText}>Size Guide</Text>
              </TouchableOpacity>
            </View>
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
            <Text style={styles.optionLabel}>Color: {selectedColor}</Text>
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
                >
                  {selectedColor === colorOption.name && (
                    <Ionicons 
                      name="checkmark" 
                      size={16} 
                      color={colorOption.color === '#FFFFFF' ? '#000' : '#fff'} 
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <View style={styles.descriptionHeader}>
              <Ionicons name="document-text-outline" size={20} color={colors.text.dark} />
              <Text style={styles.descriptionTitle}>Description</Text>
            </View>
            <Text style={styles.description}>
              Made from 100% organic cotton, this premium t-shirt offers exceptional comfort and durability. 
              Perfect for casual wear with a modern fit that looks great on everyone.
            </Text>
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreLink}>Read more</Text>
              <Ionicons name="chevron-down" size={16} color={colors.primary.main} />
            </TouchableOpacity>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>Features</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Ionicons name="shield-checkmark-outline" size={20} color={colors.success} />
                <Text style={styles.featureText}>Premium Quality</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="car-outline" size={20} color={colors.primary.main} />
                <Text style={styles.featureText}>Fast Shipping</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="refresh-outline" size={20} color={colors.warning} />
                <Text style={styles.featureText}>Easy Returns</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.wishlistButton, isWishlisted && styles.wishlistButtonActive]}
          onPress={() => setIsWishlisted(!isWishlisted)}
        >
          <Ionicons 
            name={isWishlisted ? 'heart' : 'heart-outline'} 
            size={24} 
            color={isWishlisted ? colors.error : colors.text.dark} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Ionicons name="bag-add-outline" size={24} color={colors.text.white} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buyNowButton}>
          <Ionicons name="flash-outline" size={24} color={colors.text.white} />
          <Text style={styles.buyNowText}>Buy Now</Text>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.dark,
  },
  shareButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: screenWidth,
    height: 300,
    backgroundColor: colors.background.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.light,
  },
  indicatorActive: {
    backgroundColor: colors.primary.main,
  },
  productDetails: {
    padding: 20,
  },
  titlePriceSection: {
    marginBottom: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.dark,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary.main,
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  stockText: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '600',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    marginLeft: 8,
    color: colors.text.medium,
    fontSize: 14,
  },
  reviewsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewsLink: {
    color: colors.primary.main,
    fontSize: 14,
    fontWeight: '500',
  },
  optionSection: {
    marginBottom: 24,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.dark,
  },
  sizeGuideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sizeGuideText: {
    color: colors.primary.main,
    fontSize: 14,
    fontWeight: '500',
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sizePill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border.medium,
    minWidth: 44,
    alignItems: 'center',
  },
  sizePillSelected: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  sizePillText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.dark,
  },
  sizePillTextSelected: {
    color: colors.text.white,
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSwatchSelected: {
    borderColor: colors.primary.main,
  },
  whiteColorBorder: {
    borderColor: colors.border.medium,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.dark,
  },
  description: {
    fontSize: 14,
    color: colors.text.medium,
    lineHeight: 20,
    marginBottom: 12,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  moreLink: {
    color: colors.primary.main,
    fontSize: 14,
    fontWeight: '500',
  },
  featuresSection: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.dark,
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: colors.text.medium,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    backgroundColor: colors.background.white,
  },
  wishlistButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistButtonActive: {
    backgroundColor: colors.error + '20',
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.primary.main,
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addToCartText: {
    color: colors.text.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buyNowButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.success,
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buyNowText: {
    color: colors.text.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;