export const formatDatetimeToString = (date?: Date | string | null): string => {
	if (!date) {
		return 'N/A';
	}
	if (typeof date === 'string') {
		date = new Date(date);
	}
	return new Intl.DateTimeFormat('en-GB', {
		timeZone: 'Asia/Bangkok',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	}).format(date);
};

export const formatDateToString = (date?: Date | string | null): string => {
	if (!date) {
		return 'N/A';
	}
	if (typeof date === 'string') {
		date = new Date(date);
	}
	return new Intl.DateTimeFormat('en-GB', {
		timeZone: 'Asia/Bangkok',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	}).format(date);
}