import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomStatusBar from '../components/StatusBar';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { colors, typography } from '../theme';

const ProductListingScreen = ({ navigation, route }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);

  const { category = 'New Arrivals' } = route.params || {};

  const products = [
    { id: 1, name: 'Premium Cotton T-Shirt with Logo', price: '29.99', rating: 5 },
    { id: 2, name: 'Casual Denim Jacket', price: '89.99', rating: 4 },
    { id: 3, name: 'Running Sneakers', price: '79.99', rating: 5 },
    { id: 4, name: 'Slim Fit Jeans', price: '59.99', rating: 4 },
    { id: 5, name: 'Hooded Sweatshirt', price: '45.99', rating: 5 },
    { id: 6, name: 'Leather Boots', price: '129.99', rating: 4 },
    { id: 7, name: 'Summer Dress', price: '39.99', rating: 5 },
    { id: 8, name: 'Sport Shorts', price: '24.99', rating: 4 },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['Black', 'White', 'Blue', 'Red', 'Green'];

  const FilterPanel = () => (
    <Modal
      visible={showFilter}
      transparent
      animationType="slide"
      onRequestClose={() => setShowFilter(false)}
    >
      <View style={styles.filterOverlay}>
        <View style={styles.filterPanel}>
          <Text style={styles.filterTitle}>Filter Products</Text>
          
          {/* Size Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Size</Text>
            <View style={styles.checkboxGroup}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.checkbox,
                    selectedSizes.includes(size) && styles.checkboxSelected
                  ]}
                  onPress={() => {
                    if (selectedSizes.includes(size)) {
                      setSelectedSizes(selectedSizes.filter(s => s !== size));
                    } else {
                      setSelectedSizes([...selectedSizes, size]);
                    }
                  }}
                >
                  <Text style={[
                    styles.checkboxText,
                    selectedSizes.includes(size) && styles.checkboxTextSelected
                  ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Color Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Color</Text>
            <View style={styles.checkboxGroup}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.checkbox,
                    selectedColors.includes(color) && styles.checkboxSelected
                  ]}
                  onPress={() => {
                    if (selectedColors.includes(color)) {
                      setSelectedColors(selectedColors.filter(c => c !== color));
                    } else {
                      setSelectedColors([...selectedColors, color]);
                    }
                  }}
                >
                  <Text style={[
                    styles.checkboxText,
                    selectedColors.includes(color) && styles.checkboxTextSelected
                  ]}>
                    {color}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setShowFilter(false)}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.pageTitle}>{category}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowFilter(true)}
          />
          <TouchableOpacity style={styles.icon} />
        </View>
      </View>

      <SearchBar placeholder="Search products..." />

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productGrid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={(product) => navigation.navigate('ProductDetail', { product })}
          />
        )}
      />

      <FilterPanel />
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backArrow: {
    width: 24,
    height: 24,
    backgroundColor: colors.text.dark,
    borderRadius: 4,
  },
  pageTitle: {
    ...typography.subtitle,
    color: colors.text.dark,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: colors.text.dark,
    borderRadius: 4,
  },
  productGrid: {
    padding: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  filterOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  filterPanel: {
    backgroundColor: colors.background.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '80%',
  },
  filterTitle: {
    ...typography.subtitle,
    color: colors.text.dark,
    marginBottom: 24,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    ...typography.body,
    color: colors.text.dark,
    marginBottom: 12,
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  checkbox: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  checkboxSelected: {
    backgroundColor: colors.primary.green,
    borderColor: colors.primary.green,
  },
  checkboxText: {
    ...typography.bodySmall,
    color: colors.text.dark,
  },
  checkboxTextSelected: {
    color: colors.background.white,
  },
  applyButton: {
    backgroundColor: colors.primary.green,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  applyButtonText: {
    ...typography.body,
    color: colors.background.white,
    fontWeight: '600',
  },
});

export default ProductListingScreen;