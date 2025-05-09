import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const SwitchOffIcon = (props: IconSvgProps) => {
  return (
    <svg fill={props.color || "black"} width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M7,10a2,2,0,1,1-2,2,2,2,0,0,1,2-2M17,7a5,5,0,0,1,0,10H7A5,5,0,1,1,7,7H17M7,9a3,3,0,0,0,0,6H17a3,3,0,0,0,0-6Z"/>
      <rect width="24" height="24" fill="none"/>
    </svg>
  )
}

export const SwitchOnIcon = (props: IconSvgProps) => {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill={props.color || "black"}  d="M17,7H7A5,5,0,0,0,7,17H17A5,5,0,0,0,17,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,17,15Z"/>
      <path d="M0,0H24V24H0Z" fill="none"/>
    </svg>
  )
}

export const LightIcon = (props: IconSvgProps) => {
  return (
    <svg fill={props.color || "black"} width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12,2A7,7,0,0,0,8,14.74V17a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14.74A7,7,0,0,0,12,2ZM9,21a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V20H9Z" />
    </svg>
  )
}

export const OutletIcon = (props: IconSvgProps) => {
  return (
    <svg fill={props.color || "black"} width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" id="a" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,12h-2V7h2v5Zm6-4.5h-2v4h2V7.5Zm-2.5,8.75c0-.4-.16-.78-.44-1.06-.28-.28-.66-.44-1.06-.44s-.78,.16-1.06,.44c-.28,.28-.44,.66-.44,1.06v.75h3v-.75ZM22,4V20c0,1.1-.9,2-2,2H4c-1.1,0-2-.9-2-2V4c0-1.1,.9-2,2-2H20c1.1,0,2,.9,2,2Zm-2,0H4V20H20V4Z" fillRule="evenodd"/>
    </svg>
  )
}

export const ThermostatIcon = (props: IconSvgProps) => {
  return (
    <svg fill={props.color || "black"} width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,4H4A2,2,0,0,0,2,6V18a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V6A2,2,0,0,0,20,4ZM10,18a6,6,0,1,1,6-6A6,6,0,0,1,10,18ZM19,8a1,1,0,1,1,1-1A1,1,0,0,1,19,8Zm-4,4.25c0,2.25-1.79,2.3-2.38,1.11a1.61,1.61,0,0,0-.53-.54,1.65,1.65,0,0,0-.71-.26,1.82,1.82,0,0,1-.46.61c1,1.85.6,3.83-1.19,3.83-2.23,0-2.28-1.79-1.1-2.38a1.68,1.68,0,0,0,.54-.52,1.76,1.76,0,0,0,.27-.7,1.61,1.61,0,0,1-.63-.46C7,13.93,5,13.53,5,11.75,5,9.5,6.77,9.44,7.36,10.63a1.52,1.52,0,0,0,.53.54,1.81,1.81,0,0,0,.71.27,1.51,1.51,0,0,1,.46-.62C8.06,9,8.46,7,10.24,7h0c2.25,0,2.3,1.78,1.11,2.38a1.58,1.58,0,0,0-.54.52,1.65,1.65,0,0,0-.26.71,1.7,1.7,0,0,1,.61.45C13,10.06,15,10.46,15,12.25Z"/>
    </svg>
  )
}

export const ThermostatSensorIcon = (props: IconSvgProps) => {
  return (
    <svg fill={props.color || "black"} width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M17,17a5,5,0,1,1-8-4V5a3,3,0,0,1,6,0v8a5,5,0,0,1,2,4M11,8v6.17a3,3,0,1,0,2,0V8H11"/>
      </g>
    </svg>
  )
}

export const SensorIcon = (props: IconSvgProps) => {
  return (
    <svg fill={props.color || "black"} width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.4444 10H6.55556C6.143 10 5.74733 10.1639 5.45561 10.4556C5.16389 10.7473 5 11.143 5 11.5556V22.4444C5 22.857 5.16389 23.2527 5.45561 23.5444C5.74733 23.8361 6.143 24 6.55556 24H17.4444C17.857 24 18.2527 23.8361 18.5444 23.5444C18.8361 23.2527 19 22.857 19 22.4444V11.5556C19 11.143 18.8361 10.7473 18.5444 10.4556C18.2527 10.1639 17.857 10 17.4444 10ZM17.4444 20.8889C17.4444 21.3014 17.2806 21.6971 16.9888 21.9888C16.6971 22.2806 16.3014 22.4444 15.8889 22.4444C15.4763 22.4444 15.0807 22.2806 14.7889 21.9888C14.4972 21.6971 14.3333 21.3014 14.3333 20.8889C14.3333 20.4763 14.4972 20.0807 14.7889 19.7889C15.0807 19.4972 15.4763 19.3333 15.8889 19.3333C16.3014 19.3333 16.6971 19.4972 16.9888 19.7889C17.2806 20.0807 17.4444 20.4763 17.4444 20.8889ZM17.4444 12.7222C17.4444 13.0316 17.3215 13.3284 17.1027 13.5472C16.8839 13.766 16.5872 13.8889 16.2778 13.8889H7.72222C7.4128 13.8889 7.11606 13.766 6.89726 13.5472C6.67847 13.3284 6.55556 13.0316 6.55556 12.7222C6.55556 12.4128 6.67847 12.1161 6.89726 11.8973C7.11606 11.6785 7.4128 11.5556 7.72222 11.5556H16.2778C16.5872 11.5556 16.8839 11.6785 17.1027 11.8973C17.3215 12.1161 17.4444 12.4128 17.4444 12.7222Z" />
      <path d="M8.45997 7.46L7.04997 6.05C8.31997 4.78 10.07 4 12 4C13.93 4 15.68 4.78 16.95 6.05L15.54 7.46C14.63 6.56 13.38 6 12 6C10.62 6 9.36997 6.56 8.45997 7.46Z" />
      <path d="M4.21997 3.22C6.20997 1.23 8.95997 0 12 0C15.04 0 17.79 1.23 19.77 3.23L18.36 4.64C16.74 3.01 14.49 2 12 2C9.50997 2 7.25997 3.01 5.62997 4.63L4.21997 3.22Z" />
    </svg>
  )
}

const DeviceIcons = {
  SwitchOffIcon,
  SwitchOnIcon,
  LightIcon,
  OutletIcon,
  ThermostatIcon,
  ThermostatSensorIcon,
  SensorIcon,
};

export default DeviceIcons;