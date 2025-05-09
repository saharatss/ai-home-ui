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

export const formatDeviceType = (type: DeviceType) => {
	switch (type) {
		case DeviceType.SWITCH           : return "Switch";
		case DeviceType.OUTLET           : return "Outlet";
		case DeviceType.LIGHT            : return "Light";
		case DeviceType.FAN              : return "Fan";
		case DeviceType.DOORBELL         : return "Doorbell";
		case DeviceType.THERMOSTAT       : return "Thermostat";
		case DeviceType.THERMOSTAT_SENSOR: return "Thermostat Sensor";
		case DeviceType.MOTION_SENSOR    : return "Motion Sensor";
		case DeviceType.LIGHT_SENSOR     : return "Light Sensor";
	}
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
		color?: string;
		color_temperature?: number;
		temperature?: number;
		humidity?: number;
		speed?: number;
		mode?: string;
		lux?: number;
		target_temperature?: number;
		target_humidity?: number;
		battery_level?: number;
		power_consumption?: number;
	};
	config?: object;
}

export interface DeviceStatusRecord {
	id: string;
	device_id: string;
	status: string;
	timestamp: string;
}

export const formatDeviceStatusKey = (key: string) => {
	switch (key) {
		case "power"       : return "Power";
		case "motion"      : return "Motion";
		case "brightness"  : return "Brightness";
		case "temperature" : return "Temperature";
		case "humidity"    : return "Humidity";
	}
	return key.charAt(0).toUpperCase() + key.slice(1);
};

export const formatDeviceStatusValue = (key: string, value: string | number | boolean) => {
	if (key === "power") {
		return value ? "On" : "Off";
	} else if (key === "motion") {
		return value ? "Detected" : "Not Detected";
	} else if (key === "brightness") {
		return typeof value === "number" ? `${value * 100}%` : "N/A";
	} else if (key === "temperature") {
		return `${Number(value).toFixed(2)}°C`;
	} else if (key === "humidity") {
		return `${Number(value).toFixed(2)}%`;
	}
	return value;
};