import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

const CustomStatusBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>9:41</Text>
      <Text style={styles.battery}>100%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.background.white,
  },
  time: {
    ...typography.bodySmall,
    color: colors.text.dark,
    fontWeight: '600',
  },
  battery: {
    ...typography.bodySmall,
    color: colors.text.dark,
    fontWeight: '600',
  },
});

export default CustomStatusBar;