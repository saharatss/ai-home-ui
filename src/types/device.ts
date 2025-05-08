
export enum DeviceType {
	SWITCH            = "SWITCH",
	OUTLET            = "OUTLET",
	LIGHT             = "LIGHT",
	FAN               = "FAN",
	DOORBELL          = "DOORBELL",
	THERMOSTAT        = "THERMOSTAT",
	THERMOSTAT_SENSOR = "THERMOSTAT_SENSOR",
	MOTION_SENSOR     = "MOTION_SENSOR",
	LIGHT_SENSOR      = "LIGHT_SENSOR",
}

export default interface Device {
	id: string;
	name: string;
	ownerId: string;
	deviceType: DeviceType;
	createdDate?: string;
	updatedDate?: string;
	currentStatus?: {
		power?: boolean;
		motion?: boolean;
		brightness?: number;
		temperature?: number;
		humidity?: number;
	};
	config?: object;
}

export interface DeviceStatusRecord {
	id: string;
	device_id: string;
	status: string;
	timestamp: string;
}