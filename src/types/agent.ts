
export interface AgentMessage {
	id?: string;
	userId: string | 'AI';
	sessionId?: string;
	timestamp?: string;
	message: string;
}