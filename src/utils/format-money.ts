export const formatMoney = (value: number) => {
	return value.toLocaleString('th-TH', {
		style: 'decimal',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}) + ' บาท';
}