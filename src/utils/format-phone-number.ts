export const formatPhoneNumber = (value: string) => {
	const digitsOnly = value.replace(/\D/g, '');
	let formattedNumber = digitsOnly;
	if (digitsOnly.length > 3 && digitsOnly.length <= 6) {
		formattedNumber = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
	} else if (digitsOnly.length > 6) {
		formattedNumber = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
	}
	return formattedNumber;
}