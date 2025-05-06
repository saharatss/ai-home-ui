export const formatId = (id?: string | null) => {
	if (!id) return 'unknown';
	return `****${id.substring(20)}`;
}