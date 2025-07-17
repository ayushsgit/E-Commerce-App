import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import CustomStatusBar from '../components/StatusBar';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { colors, typography } from '../theme';

const ProductListingScreen = ({ navigation, route }) => {
  // Safe parameter handling - check if route.params exists
  const category = route?.params?.category || 'All Products';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Sample product data with images
  const allProducts = [
    { 
      id: 1, 
      name: 'Cotton T-Shirt', 
      price: '29.99', 
      rating: 5, 
      category: 'New Arrivals',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
    },
    { 
      id: 2, 
      name: 'Denim Jacket', 
      price: '89.99', 
      rating: 4, 
      category: 'Best Sellers',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop'
    },
    { 
      id: 3, 
      name: 'Sneakers', 
      price: '79.99', 
      rating: 5, 
      category: 'Sale',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'
    },
    { 
      id: 4, 
      name: 'Casual Pants', 
      price: '49.99', 
      rating: 4, 
      category: 'New Arrivals',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop'
    },
    { 
      id: 5, 
      name: 'Summer Dress', 
      price: '59.99', 
      rating: 5, 
      category: 'Best Sellers',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop'
    },
    { 
      id: 6, 
      name: 'Sports Shoes', 
      price: '99.99', 
      rating: 4, 
      category: 'Sale',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'
    },
    { 
      id: 7, 
      name: 'Hoodie', 
      price: '69.99', 
      rating: 5, 
      category: 'New Arrivals',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop'
    },
    { 
      id: 8, 
      name: 'Jeans', 
      price: '79.99', 
      rating: 4, 
      category: 'Best Sellers',
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=400&fit=crop'
    },
  ];

  const filters = ['All', 'New Arrivals', 'Best Sellers', 'Sale'];

  // Filter products based on category and search query
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = category === 'All Products' || product.category === category;
    const matchesFilter = selectedFilter === 'All' || product.category === selectedFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesFilter && matchesSearch;
  });

  const FilterButton = ({ filter, isSelected, onPress }) => (
    <TouchableOpacity
      style={[styles.filterButton, isSelected && styles.filterButtonSelected]}
      onPress={() => onPress(filter)}
      activeOpacity={0.8}
    >
      <Text style={[styles.filterText, isSelected && styles.filterTextSelected]}>
        {filter}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.8}
        >
          <Ionicons name="bag-outline" size={24} color={colors.text.dark} />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search products..."
      />

      {/* Filter Pills */}
      <View style={styles.filterContainer}>
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <FilterButton
              filter={item}
              isSelected={selectedFilter === item}
              onPress={setSelectedFilter}
            />
          )}
        />
      </View>

      {/* Product Grid */}
      <FlatList
        data={filteredProducts}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productGrid}
        columnWrapperStyle={styles.productRow}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={(product) => navigation.navigate('ProductDetail', { product })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No products found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.lightGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    ...typography.subtitle,
    color: colors.text.dark,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.primary.green,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    ...typography.caption,
    color: colors.text.white,
    fontWeight: 'bold',
  },
  filterContainer: {
    backgroundColor: colors.background.white,
    paddingBottom: 16,
  },
  filterList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background.lightGray,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  filterButtonSelected: {
    backgroundColor: colors.primary.green,
    borderColor: colors.primary.green,
  },
  filterText: {
    ...typography.bodySmall,
    color: colors.text.medium,
  },
  filterTextSelected: {
    color: colors.text.white,
    fontWeight: '600',
  },
  productGrid: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyStateText: {
    ...typography.body,
    color: colors.text.medium,
  },
});

export default ProductListingScreen;