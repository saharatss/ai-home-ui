
export interface AgentSession {
	id: string;
	userId: string;
	name?: string;
	updatedDate: string;
	createdDate: string;
}

export interface AgentMessage {
	id?: string;
	userId: string | 'AI';
	sessionId?: string;
	timestamp?: string;
	message: string;
	actions?: AgentAction[];
	suggestions?: string[];
}

export interface AgentAction {
	action: 'ui_open' | 'device_update';

	// ui_open
	panel?: string;
	// device_update
	id?: string;
	status?: object;
}