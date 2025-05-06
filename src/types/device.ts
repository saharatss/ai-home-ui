
export enum DeviceType {
	SWITCH            = "SWITCH",
	OUTLET            = "OUTLET",
	LIGHT             = "LIGHT",
	THERMOSTAT        = "THERMOSTAT",
	DOORBELL          = "DOORBELL",
	LOCK              = "LOCK",
	THERMOSTAT_SENSOR = "THERMOSTAT_SENSOR",
	DOOR_SENSOR       = "DOOR_SENSOR",
	MOTION_SENSOR     = "MOTION_SENSOR",
	SMOKE_SENSOR      = "SMOKE_SENSOR",
	CO_SENSOR         = "CO_SENSOR",
	LEAK_SENSOR       = "LEAK_SENSOR",
	BLINDS            = "BLINDS",
}

export default interface Device {
	id: string;
	name: string;
	deviceType: DeviceType;
	ownerId: string;
	createdDate: string;
	updatedDate: string;
	currentStatus: string; // JSON string
	config: string; // JSON string
}

export interface DeviceStatus {
	id: string;
	device_id: string;
	status: string;
	timestamp: string;
}