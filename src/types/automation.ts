
export enum AutomationType {
	DEVICE_TRIGGER = "DEVICE_TRIGGER",
	TIMER_TRIGGER  = "TIMER_TRIGGER",
}

export interface Automation {
	id         : string;
	userId     : string;
	name       : string;
	enable     : boolean;
	type       : AutomationType;
	trigger    : AutomationTrigger;
	action     : AutomationAction;
	condition  : string; // JSON string
	config     : string; // JSON string
	updatedDate: Date;
	createdDate: Date;
}

export interface AutomationTrigger {
	time?: Date;
	deviceId?: string;
	attribute?: string;
	operator?: string;
	value?: string | number | boolean;
}

export interface AutomationAction {
	deviceId: string;
	attribute: string;
	value: string | number | boolean;
}