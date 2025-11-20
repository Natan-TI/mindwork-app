import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Option<T> {
  label: string;
  value: T;
}

interface SelectorRowProps<T> {
  label: string;
  options: Option<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
}

export function SelectorRow<T>({
  label,
  options,
  selectedValue,
  onSelect,
}: SelectorRowProps<T>) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ color: 'white', marginBottom: 6 }}>{label}</Text>
      <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
        {options.map(option => (
          <TouchableOpacity
            key={String(option.value)}
            onPress={() => onSelect(option.value)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: selectedValue === option.value ? '#6366f1' : '#4b5563',
              backgroundColor: selectedValue === option.value ? '#6366f1' : 'transparent',
            }}
          >
            <Text style={{ color: 'white' }}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
