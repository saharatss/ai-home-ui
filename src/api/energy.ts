import { addToast } from "@heroui/react";

export const fetchEnergyData = async (startDate: string, endDate: string) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/energy/records?userId=${localStorage.getItem('userId')}&startDate=${startDate}&endDate=${endDate}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});
		if (!response.ok) {
			console.warn('Error fetching energy data', response.statusText);
			return null;
		}
		return await response.json();
	} catch (error) {
		console.warn('Error fetching energy data', error);
		addToast({
			title: 'Error',
			description: 'Error fetching energy data',
			color: 'danger',
			timeout: 3000,
		});
		return null;
	}
}

const EnergyAPI = {
	fetchEnergyData,
};
export default EnergyAPI;