import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SalaryCalculator = () => {
  const [hours, setHours] = useState('');
  const [rate, setRate] = useState('');
  const [result, setResult] = useState(null);

  const calculateSalary = () => {
    const workedHours = parseFloat(hours);
    const hourlyRate = parseFloat(rate);

    if (isNaN(workedHours) || isNaN(hourlyRate)) {
      alert('Mohon masukkan angka yang valid');
      return;
    }

    let normalPay = 0;
    let overtimePay = 0;

    if (workedHours <= 40) {
      normalPay = workedHours * hourlyRate;
    } else {
      normalPay = 40 * hourlyRate;
      overtimePay = (workedHours - 40) * (hourlyRate * 1.5);
    }

    const totalPay = normalPay + overtimePay;

    setResult({
      normalHours: Math.min(workedHours, 40),
      overtimeHours: Math.max(workedHours - 40, 0),
      normalPay,
      overtimePay,
      totalPay
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kalkulator Gaji Karyawan</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Jumlah Jam Kerja"
        keyboardType="numeric"
        value={hours}
        onChangeText={setHours}
      />

      <TextInput
        style={styles.input}
        placeholder="Tarif Per Jam"
        keyboardType="numeric"
        value={rate}
        onChangeText={setRate}
      />

      <Button 
        title="Hitung Gaji"
        onPress={calculateSalary}
      />

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Hasil Perhitungan:</Text>
          <Text>Jam Kerja Normal: {result.normalHours} jam</Text>
          <Text>Jam Kerja Lembur: {result.overtimeHours} jam</Text>
          <Text>Gaji Normal: {formatCurrency(result.normalPay)}</Text>
          {result.overtimePay > 0 && (
            <Text>Gaji Lembur: {formatCurrency(result.overtimePay)}</Text>
          )}
          <Text style={styles.totalPay}>
            Total Gaji: {formatCurrency(result.totalPay)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalPay: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SalaryCalculator;