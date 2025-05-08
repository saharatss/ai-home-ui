import { addToast } from "@heroui/react";

export const listAgents = async () => {
	try {
		const userId = localStorage.getItem('userId');
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/agent/sessions/user/${userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});
		return (await response.json());
	} catch (error) {
		console.warn('Error fetching agents', error);
		addToast({
			title: 'Error fetching agents',
			description: 'There was an error fetching the agents. Please try again.',
			color: 'danger',
			timeout: 3000,
		});
		return null;
	}
}

export const createAgent = async (name: string) => {
	try {
		const userId = localStorage.getItem('userId');
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/agent/sessions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			},
			body: JSON.stringify({
				userId: userId,
				name: name,
			}),
		});
		return (await response.json());
	} catch (error) {
		console.warn('Error creating agent session', error);
		addToast({
			title: 'Error creating agent session',
			description: 'There was an error creating the agent session. Please try again.',
			color: 'danger',
			timeout: 3000,
		});
		return null;
	}
}

export const updateAgentName = async (sessionId: string, name: string) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/agent/sessions/${sessionId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			},
			body: JSON.stringify({
				name: name,
			}),
		});
		return (await response.json());
	} catch (error) {
		console.warn('Error updating agent session', error);
		addToast({
			title: 'Error updating agent session',
			description: 'There was an error updating the agent session. Please try again.',
			color: 'danger',
			timeout: 3000,
		});
		return null;
	}
}

export const invokeAgent = async (sessionId: string, message: string) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/agent/invoke`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			},
			body: JSON.stringify({
				"userId": localStorage.getItem('userId'),
				"sessionId": sessionId,
				"message": message,
			}),
		});
		return (await response.json());
	} catch (error) {
		console.warn('Error invoking agent', error);
		addToast({
			title: 'Error invoking agent',
			description: 'There was an error invoking the agent. Please try again.',
			color: 'danger',
			timeout: 3000,
		});
		return null;
	}
}

export const getAgentMessages = async (sessionId: string) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/agent/messages/session/${sessionId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});
		return (await response.json());
	} catch (error) {
		console.warn('Error fetching agent messages', error);
		addToast({
			title: 'Error fetching agent messages',
			description: 'There was an error fetching the agent messages. Please try again.',
			color: 'danger',
			timeout: 3000,
		});
		return null;
	}
}

export const deleteAgent = async (sessionId: string) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/agent/sessions/${sessionId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});
		return (await response.ok);
	} catch (error) {
		console.warn('Error deleting agent session', error);
		addToast({
			title: 'Error deleting agent session',
			description: 'There was an error deleting the agent session. Please try again.',
			color: 'danger',
			timeout: 3000,
		});
		return null;
	}
}


const AgentAPI = {
	listAgents,
	createAgent,
	updateAgentName,
	invokeAgent,
	getAgentMessages,
	deleteAgent,
};

export default AgentAPI;