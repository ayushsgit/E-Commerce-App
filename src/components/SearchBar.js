import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

const SearchBar = ({ onPress, value, onChangeText, placeholder = "Search for products..." }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.searchBar}>
        <View style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.text.medium}
          value={value}
          onChangeText={onChangeText}
          editable={!onPress}
        />
        <View style={styles.filterIcon} />
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
  searchIcon: {
    width: 20,
    height: 20,
    backgroundColor: colors.text.medium,
    borderRadius: 4,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text.dark,
  },
  filterIcon: {
    width: 20,
    height: 20,
    backgroundColor: colors.primary.green,
    borderRadius: 4,
  },
});

export default SearchBar;