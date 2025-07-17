import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomStatusBar from '../components/StatusBar';
import TopNavigation from '../components/TopNavigation';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { colors, typography } from '../theme';

const HomeScreen = ({ navigation }) => {
  const categories = [
    { id: 1, name: 'New Arrivals', icon: '🆕' },
    { id: 2, name: 'Best Sellers', icon: '🔥' },
    { id: 3, name: 'Sale', icon: '💰' },
    { id: 4, name: 'Categories', icon: '📱' },
  ];

  const recommendedProducts = [
    { id: 1, name: 'Cotton T-Shirt', price: '29.99', rating: 5 },
    { id: 2, name: 'Denim Jacket', price: '89.99', rating: 4 },
    { id: 3, name: 'Sneakers', price: '79.99', rating: 5 },
    { id: 4, name: 'Casual Pants', price: '49.99', rating: 4 },
  ];

  const CategoryCard = ({ category }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate('ProductListing', { category: category.name })}
      activeOpacity={0.8}
    >
      <View style={styles.categoryIcon} />
      <Text style={styles.categoryLabel}>{category.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      <TopNavigation
        onCartPress={() => navigation.navigate('Cart')}
        cartCount={2}
      />
      <SearchBar onPress={() => navigation.navigate('ProductListing')} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Carousel */}
        <LinearGradient
          colors={[colors.primary.green, '#20c997']}
          style={styles.heroCarousel}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.heroText}>Summer Sale - Up to 50% Off</Text>
        </LinearGradient>

        {/* Category Grid */}
        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </View>

        {/* Recommended Section */}
        <View style={styles.recommendedSection}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <FlatList
            data={recommendedProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.productScroll}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                size="small"
                onPress={(product) => navigation.navigate('ProductDetail', { product })}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.lightGray,
  },
  content: {
    flex: 1,
  },
  heroCarousel: {
    height: 160,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroText: {
    ...typography.subtitle,
    color: colors.background.white,
    textAlign: 'center',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 24,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary.green,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryLabel: {
    ...typography.bodySmall,
    color: colors.text.dark,
    textAlign: 'center',
  },
  recommendedSection: {
    paddingBottom: 20,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.text.dark,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  productScroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
});

export default HomeScreen;