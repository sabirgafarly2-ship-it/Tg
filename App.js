import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [goal, setGoal] = useState('100');
  const [current, setCurrent] = useState('0');

  const { percent, normalizedPercent } = useMemo(() => {
    const goalValue = Number(goal.replace(',', '.'));
    const currentValue = Number(current.replace(',', '.'));

    if (!Number.isFinite(goalValue) || goalValue <= 0 || !Number.isFinite(currentValue)) {
      return { percent: 0, normalizedPercent: 0 };
    }

    const rawPercent = (currentValue / goalValue) * 100;
    const safePercent = Number.isFinite(rawPercent) ? rawPercent : 0;

    return {
      percent: safePercent,
      normalizedPercent: Math.min(Math.max(safePercent, 0), 100),
    };
  }, [goal, current]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Процент выполнения цели</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Установленное значение (цель)</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={goal}
          onChangeText={setGoal}
          placeholder="Например: 100"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Текущее значение</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={current}
          onChangeText={setCurrent}
          placeholder="Например: 45"
        />
      </View>

      <Text style={styles.result}>{percent.toFixed(2)}%</Text>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${normalizedPercent}%` }]} />
      </View>

      <Text style={styles.hint}>Значение выше 100% означает перевыполнение цели.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f3f6fb',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    color: '#1f2937',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#374151',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 18,
  },
  result: {
    marginTop: 8,
    fontSize: 40,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  progressTrack: {
    marginTop: 20,
    height: 18,
    borderRadius: 999,
    backgroundColor: '#dbeafe',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
  },
  hint: {
    marginTop: 16,
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
  },
});
