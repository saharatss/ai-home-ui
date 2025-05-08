import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const SwitchOffIcon = (props: IconSvgProps) => {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
      <path d="M10,12h-2V7h2v5Zm6-4.5h-2v4h2V7.5Zm-2.5,8.75c0-.4-.16-.78-.44-1.06-.28-.28-.66-.44-1.06-.44s-.78,.16-1.06,.44c-.28,.28-.44,.66-.44,1.06v.75h3v-.75ZM22,4V20c0,1.1-.9,2-2,2H4c-1.1,0-2-.9-2-2V4c0-1.1,.9-2,2-2H20c1.1,0,2,.9,2,2Zm-2,0H4V20H20V4Z" fill-rule="evenodd"/>
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

const DeviceIcons = {
  SwitchOffIcon,
  SwitchOnIcon,
  LightIcon,
  OutletIcon,
  ThermostatIcon,
};

export default DeviceIcons;