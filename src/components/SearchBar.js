import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../theme';

const SearchBar = ({ onPress, value, onChangeText, placeholder = "Search for products..." }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.searchBar}>
        <Ionicons 
          name="search" 
          size={20} 
          color={colors.text.medium} 
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.text.medium}
          value={value}
          onChangeText={onChangeText}
          editable={!onPress}
        />
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
          <Ionicons 
            name="options" 
            size={20} 
            color={colors.text.white} 
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background.white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.lightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text.dark,
  },
  filterButton: {
    backgroundColor: colors.primary.green,
    borderRadius: 4,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
});

export default SearchBar;