import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    // stroke={props.color || "black"}
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path
        stroke={props.color || "black"}
        d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path
        stroke={props.color || "black"}
        d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const HeartFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      stroke={props.color || "black"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SearchIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (<svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      {...strockProps}
      strokeLinecap="round"
      strokeLinejoin="round"

    />
    <path
      d="M22 22L20 20"
      {...strockProps}
      strokeLinecap="round"
      strokeLinejoin="round"

    />
  </svg>)
}

export const ChevronDown = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1 };
  return (
    <svg
      fill="none"
      height={props.size || 24}
      viewBox="0 0 24 24"
      width={props.size || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        {...strockProps}
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
      />
    </svg>
  );
};

export const ChevronLeft = (props: IconSvgProps) => {
  return (
    <svg
      fill="none"
      height={props.size || 24}
      viewBox="0 0 24 24"
      width={props.size || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m15.05 19.92-6.52-6.52c-.77-.77-.77-2.03 0-2.8l6.52-6.52"
        fill="none"
        stroke={props.color || "black"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={props.strokeWidth || 1.5}
      />
    </svg>
  );
};

export const ChevronRight = (props: IconSvgProps) => {
  return (
    <svg
      fill="none"
      height={props.size || 24}
      viewBox="0 0 24 24"
      width={props.size || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m8.95 19.92 6.52-6.52c.77-.77.77-2.03 0-2.8l-6.52-6.52"
        fill="none"
        stroke={props.color || "black"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={props.strokeWidth || 1.5}
      />
    </svg>
  );
}


export const VerticalDotsIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      role="presentation"
      viewBox="0 0 24 24"
      width={props.size || 24}
      height={props.size || 24}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      // stroke={props.color || "black"}
      />
    </svg>
  );
};

export const CheckCircleIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1 };
  return (
    <svg
      width={props.size || 16}
      height={props.size || 16}
      viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z" />
      <path {...strockProps} d="M5.10938 7.9987L7.27604 10.1654L10.8872 5.83203" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const BoxIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1 };
  return (
    <svg
      width={props.size || 16}
      height={props.size || 16}
      viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1689_34048)">
        <path {...strockProps} d="M13.9987 4.9987L11.332 6.33203M11.332 6.33203L10.9987 6.4987L7.9987 7.9987M11.332 6.33203V8.66536M11.332 6.33203L4.9987 2.9987M7.9987 7.9987L1.9987 4.9987M7.9987 7.9987V14.332M10.384 2.25336L11.7174 2.95336C13.1514 3.70603 13.8687 4.08203 14.2674 4.7587C14.6654 5.4347 14.6654 6.2767 14.6654 7.96003V8.03803C14.6654 9.7207 14.6654 10.5627 14.2674 11.2387C13.8687 11.9154 13.1514 12.292 11.7174 13.0447L10.384 13.744C9.21336 14.358 8.62803 14.6654 7.9987 14.6654C7.36936 14.6654 6.78403 14.3587 5.61336 13.744L4.28003 13.044C2.84603 12.2914 2.1287 11.9154 1.73003 11.2387C1.33203 10.5627 1.33203 9.7207 1.33203 8.0387V7.9607C1.33203 6.27736 1.33203 5.43536 1.73003 4.75936C2.1287 4.0827 2.84603 3.70603 4.28003 2.95403L5.61336 2.25403C6.78403 1.63936 7.36936 1.33203 7.9987 1.33203C8.62803 1.33203 9.21336 1.6387 10.384 2.25336Z" strokeLinecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_1689_34048">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export const WrenchIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1 };
  return (
    <svg
      width={props.size || 16}
      height={props.size || 16}
      viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M9.25073 6.70094L14.4048 12.0751C14.5305 12.2062 14.5305 12.5994 14.1534 12.9926L12.8963 14.3034C12.7706 14.5655 12.3935 14.5655 12.142 14.3034L6.98796 8.92924C5.73087 9.45355 4.22236 9.19139 3.09098 8.0117C1.95959 6.70094 1.70818 4.99694 2.33672 3.5551L4.85091 6.17663L6.61084 4.34156L4.22236 1.8511C5.60516 1.19571 7.23938 1.45787 8.37077 2.63756C9.50215 3.68617 9.75357 5.39017 9.25073 6.70094Z" strokeLinejoin="round" />
    </svg>
  )
}

export const ClockIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1 };
  return (
    <svg
      width={props.size || 16}
      height={props.size || 16}
      viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M7.99935 13.9987C11.3127 13.9987 13.9987 11.3127 13.9987 7.99935C13.9987 4.686 11.3127 2 7.99935 2C4.686 2 2 4.686 2 7.99935C2 11.3127 4.686 13.9987 7.99935 13.9987Z" strokeLinecap="round" strokeLinejoin="round" />
      <path {...strockProps} d="M8 4.39844V7.99805L10.3997 9.19792" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const DeliveryTruckIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1 };
  return (
    <svg
      width={props.size || 16}
      height={props.size || 16}
      viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M4.92857 12.7891C5.30745 12.7891 5.67081 12.631 5.93872 12.3497C6.20663 12.0684 6.35714 11.6869 6.35714 11.2891C6.35714 10.8912 6.20663 10.5097 5.93872 10.2284C5.67081 9.9471 5.30745 9.78906 4.92857 9.78906C4.54969 9.78906 4.18633 9.9471 3.91842 10.2284C3.65051 10.5097 3.5 10.8912 3.5 11.2891C3.5 11.6869 3.65051 12.0684 3.91842 12.3497C4.18633 12.631 4.54969 12.7891 4.92857 12.7891ZM12.0714 12.7891C12.4503 12.7891 12.8137 12.631 13.0816 12.3497C13.3495 12.0684 13.5 11.6869 13.5 11.2891C13.5 10.8912 13.3495 10.5097 13.0816 10.2284C12.8137 9.9471 12.4503 9.78906 12.0714 9.78906C11.6925 9.78906 11.3292 9.9471 11.0613 10.2284C10.7934 10.5097 10.6429 10.8912 10.6429 11.2891C10.6429 11.6869 10.7934 12.0684 11.0613 12.3497C11.3292 12.631 11.6925 12.7891 12.0714 12.7891Z" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path {...strockProps} d="M6.31786 11.7891H9.5V4.22543C9.5 4.1097 9.45936 3.9987 9.38703 3.91687C9.31469 3.83504 9.21658 3.78906 9.11429 3.78906H0.5M3.48929 11.7891H2.17143C2.12078 11.7891 2.07062 11.7778 2.02382 11.7558C1.97703 11.7339 1.9345 11.7018 1.89869 11.6613C1.86287 11.6207 1.83446 11.5726 1.81507 11.5197C1.79569 11.4667 1.78571 11.41 1.78571 11.3527V7.78906" strokeLinecap="round" />
      <path {...strockProps} d="M0.5 5.78906H3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path {...strockProps} d="M9.5 5.78906H13.7075C13.7945 5.78908 13.8796 5.81431 13.9525 5.8617C14.0255 5.90909 14.0831 5.9766 14.1185 6.05606L15.461 9.07706C15.4866 9.13443 15.4999 9.19651 15.5 9.25931V11.3391C15.5 11.3982 15.4884 11.4567 15.4657 11.5113C15.4431 11.5659 15.41 11.6155 15.3682 11.6573C15.3264 11.699 15.2768 11.7322 15.2222 11.7548C15.1676 11.7774 15.1091 11.7891 15.05 11.7891H13.625M9.5 11.7891H10.25" strokeLinecap="round" />
    </svg>
  )
}

export const SignOutIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 24} height={props.size || 24} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M12 4.00098H5C4.45 4.00098 4 4.45098 4 5.00098V19.001C4 19.551 4.45 20.001 5 20.001H12" strokeLinecap="round" strokeLinejoin="round" />
      <path {...strockProps} d="M9 12.001H20.5" strokeLinecap="round" strokeLinejoin="round" />
      <path {...strockProps} d="M17 8.50098L20.5 12.001L17 15.501" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const HolidayIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M17.5513 16.7508C16.1448 15.3445 14.2373 14.5544 12.2483 14.5544C10.2593 14.5544 8.35181 15.3445 6.94531 16.7508M17.9983 3.80481C16.6202 3.0092 14.9826 2.79359 13.4455 3.20542C11.9085 3.61724 10.598 4.62277 9.80231 6.00081L20.1943 12.0008C20.9899 10.6227 21.2055 8.98506 20.7937 7.44802C20.3819 5.91098 19.3764 4.60049 17.9983 3.80481Z" strokeLinecap="round" strokeLinejoin="round" />
      <path {...strockProps} d="M16.732 10.0012C18.39 7.13125 18.957 4.35725 18 3.80525C17.043 3.25325 14.925 5.13125 13.268 8.00125M15 9.00125L12 14.1973M3 19.2513C3.31129 19.0965 3.65249 19.0112 4 19.0013C4.3895 18.9931 4.77512 19.0799 5.12358 19.2541C5.47203 19.4283 5.77283 19.6848 6 20.0012C6.22717 20.3177 6.52797 20.5742 6.87642 20.7484C7.22488 20.9226 7.6105 21.0094 8 21.0012C8.3895 21.0094 8.77512 20.9226 9.12358 20.7484C9.47203 20.5742 9.77283 20.3177 10 20.0012C10.2272 19.6848 10.528 19.4283 10.8764 19.2541C11.2249 19.0799 11.6105 18.9931 12 19.0013C12.3895 18.9931 12.7751 19.0799 13.1236 19.2541C13.472 19.4283 13.7728 19.6848 14 20.0012C14.2272 20.3177 14.528 20.5742 14.8764 20.7484C15.2249 20.9226 15.6105 21.0094 16 21.0012C16.3895 21.0094 16.7751 20.9226 17.1236 20.7484C17.472 20.5742 17.7728 20.3177 18 20.0012C18.2272 19.6848 18.528 19.4283 18.8764 19.2541C19.2249 19.0799 19.6105 18.9931 20 19.0013C20.3475 19.0112 20.6887 19.0965 21 19.2513" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const UserIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M11.5 3.00098C12.4946 3.00098 13.4484 3.4061 14.1516 4.12722C14.8549 4.84834 15.25 5.82639 15.25 6.84621C15.25 7.86604 14.8549 8.84409 14.1516 9.56521C13.4484 10.2863 12.4946 10.6915 11.5 10.6915C10.5054 10.6915 9.55161 10.2863 8.84835 9.56521C8.14509 8.84409 7.75 7.86604 7.75 6.84621C7.75 5.82639 8.14509 4.84834 8.84835 4.12722C9.55161 3.4061 10.5054 3.00098 11.5 3.00098ZM11.5 20.001C11.5 20.001 19 20.001 19 18.0784C19 15.7712 15.3438 13.2718 11.5 13.2718C7.65625 13.2718 4 15.7712 4 18.0784C4 20.001 11.5 20.001 11.5 20.001Z" />
    </svg>
  )
}

export const CarIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M19 17H21C21.6 17 22 16.6 22 16V13C22 12.1 21.3 11.3 20.5 11.1C18.7 10.6 16 10 16 10C16 10 14.7 8.6 13.8 7.7C13.3 7.3 12.7 7 12 7H5C4.4 7 3.9 7.4 3.6 7.9L2.2 10.8C2.06758 11.1862 2 11.5917 2 12V16C2 16.6 2.4 17 3 17H5" strokeLinecap="round" strokeLinejoin="round" />
      <path {...strockProps} d="M7 19C8.10457 19 9 18.1046 9 17C9 15.8954 8.10457 15 7 15C5.89543 15 5 15.8954 5 17C5 18.1046 5.89543 19 7 19Z" strokeLinecap="round" strokeLinejoin="round" />
      <path {...strockProps} d="M9 17H15" strokeLinecap="round" strokeLinejoin="round" />
      <path {...strockProps} d="M17 19C18.1046 19 19 18.1046 19 17C19 15.8954 18.1046 15 17 15C15.8954 15 15 15.8954 15 17C15 18.1046 15.8954 19 17 19Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const DollarCircleIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
      <path {...strockProps} d="M12 6V18M15 9.5C15 8.12 13.657 7 12 7C10.343 7 9 8.12 9 9.5C9 10.88 10.343 12 12 12C13.657 12 15 13.12 15 14.5C15 15.88 13.657 17 12 17C10.343 17 9 15.88 9 14.5" strokeLinecap="round" />
    </svg>
  )
}

export const DollarIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M16.1557 7.154C15.2067 6.205 13.5367 5.546 12.0017 5.504M12.0017 5.504C10.1757 5.455 8.54066 6.282 8.54066 8.538C8.54066 12.692 16.1557 10.615 16.1557 14.769C16.1557 17.139 14.1287 18.157 12.0017 18.08M12.0017 5.504V3M7.84766 16.154C8.74066 17.344 10.3997 18.022 12.0017 18.08M12.0017 18.08V21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const BanknoteIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M2 11C2 8.172 2 6.757 2.879 5.879C3.757 5 5.172 5 8 5H13C15.828 5 17.243 5 18.121 5.879C19 6.757 19 8.172 19 11C19 13.828 19 15.243 18.121 16.121C17.243 17 15.828 17 13 17H8C5.172 17 3.757 17 2.879 16.121C2 15.243 2 13.828 2 11Z" />
      <path {...strockProps} d="M18.9982 8.07617C19.9732 8.17217 20.6292 8.38917 21.1192 8.87917C21.9992 9.75717 21.9992 11.1722 21.9992 14.0002C21.9992 16.8282 21.9992 18.2432 21.1192 19.1212C20.2412 20.0012 18.8262 20.0012 15.9992 20.0012H10.9992C8.16922 20.0012 6.75522 20.0012 5.87722 19.1212C5.38722 18.6312 5.17022 17.9752 5.07422 17.0002" />
      <path {...strockProps} d="M13 11C13 11.663 12.7366 12.2989 12.2678 12.7678C11.7989 13.2366 11.163 13.5 10.5 13.5C9.83696 13.5 9.20107 13.2366 8.73223 12.7678C8.26339 12.2989 8 11.663 8 11C8 10.337 8.26339 9.70107 8.73223 9.23223C9.20107 8.76339 9.83696 8.5 10.5 8.5C11.163 8.5 11.7989 8.76339 12.2678 9.23223C12.7366 9.70107 13 10.337 13 11Z" />
      <path {...strockProps} d="M16 13V9M5 13V9" strokeLinecap="round" />
    </svg>
  )
}

export const TrashIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M14.74 9.0005L14.394 18.0005M9.606 18.0005L9.26 9.0005M19.228 5.7905C19.5693 5.8425 19.91 5.89784 20.25 5.9565M19.228 5.7905L18.16 19.6735C18.1164 20.2387 17.8611 20.7667 17.445 21.1518C17.029 21.5368 16.4829 21.7507 15.916 21.7505H8.084C7.5171 21.7507 6.97102 21.5368 6.55498 21.1518C6.13894 20.7667 5.88359 20.2387 5.84 19.6735L4.772 5.7905M19.228 5.7905C18.0739 5.61592 16.9138 5.4835 15.75 5.3935M4.772 5.7905C4.43067 5.84184 4.09 5.89684 3.75 5.9555M4.772 5.7905C5.92612 5.61592 7.08623 5.4835 8.25 5.3935M15.75 5.3935V4.4775C15.75 3.2975 14.84 2.3135 13.66 2.2765C12.5536 2.24117 11.4464 2.24117 10.34 2.2765C9.16 2.3135 8.25 3.2985 8.25 4.4775V5.3935M15.75 5.3935C13.2537 5.2019 10.7463 5.2019 8.25 5.3935" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const WrenchIcon2 = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M11.9981 14.6652L18 20.498C18.5 20.9821 19.123 21.498 20 21.498C20.877 21.498 21.7383 20.6731 21.7383 19.716C21.7383 18.7589 21.361 18.375 20.877 17.875L15 11.998M11.9981 14.6652L13.915 12.14C14.232 11.756 14.655 11.514 15.123 11.374C15.673 11.21 16.286 11.186 16.866 11.234C16.9927 11.2453 17.1207 11.251 17.25 11.251C18.0021 11.2511 18.7422 11.0628 19.4027 10.7031C20.0632 10.3435 20.6231 9.82401 21.0311 9.19222C21.4391 8.56044 21.6822 7.83647 21.7383 7.08649C21.7943 6.3365 21.6615 5.58443 21.352 4.899L18.076 8.175C17.5277 8.0487 17.026 7.77074 16.6281 7.37288C16.2303 6.97502 15.9523 6.4733 15.826 5.925L19.102 2.649C18.3869 2.32596 17.5997 2.19554 16.8186 2.27068C16.0375 2.34582 15.2896 2.62391 14.6492 3.07735C14.0088 3.53079 13.4981 4.14381 13.1677 4.8556C12.8374 5.56738 12.6989 6.35317 12.766 7.135C12.857 8.211 12.695 9.399 11.862 10.085L11.76 10.17M11.9981 14.6652L6.76402 20.823C6.53841 21.098 6.25772 21.3227 5.94002 21.4827C5.62231 21.6427 5.27463 21.7344 4.91935 21.7518C4.56407 21.7693 4.20907 21.7122 3.87719 21.5842C3.54531 21.4562 3.24391 21.2602 2.99239 21.0086C2.74086 20.7571 2.54479 20.4557 2.41679 20.1238C2.28878 19.792 2.23169 19.4369 2.24917 19.0817C2.26666 18.7264 2.35834 18.3787 2.51832 18.061C2.67829 17.7433 2.90301 17.4626 3.17802 17.237L10.015 11.607L5.90802 7.5H4.49902L2.24902 3.75L3.74902 2.25L7.49902 4.5V5.909L11.759 10.169L10.014 11.606" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

export const CheckCircleFilledIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "white", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 16} height={props.size || 16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle fill={props.fill || 'black'} cx="8" cy="8" r="8" />
      <path {...strockProps} d="M4 8.14286L6.90909 11L12 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const CloseIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 16} height={props.size || 16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M4.5 4.5L11.5 11.5M4.5 11.5L11.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const CloseCircleFilledIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "white", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 16} height={props.size || 16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle fill={props.fill || 'black'} cx="8" cy="8" r="8" />
      <path {...strockProps} d="M5 11L8 8M8 8L11 5M8 8L5 5M8 8L11 11" strokeLinecap="round" />
    </svg>
  )
}

export const ArrowLeftIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M6 12H18M6 12L11 7M6 12L11 17" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const ArrowRightIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M18 12H6M18 12L13 7M18 12L13 17" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const ArrowUpIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M12 18V6M12 6L7 11M12 6L17 11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const ArrowDownIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M12 6V18M12 18L7 13M12 18L17 13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const PlusIcon = (props: IconSvgProps) => {
  const strockProps = { stroke: props.color || "black", strokeWidth: props.strokeWidth || 1.5 };
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path {...strockProps} d="M12 6V18M6 12H18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const PlugIcon = (props: IconSvgProps) => {
  return (
    <svg fill={props.color || "black"} width={props.size || 16} height={props.size || 16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0a.5.5 0 0 1 .5.5V3h3V.5a.5.5 0 0 1 1 0V3h1a.5.5 0 0 1 .5.5v3A3.5 3.5 0 0 1 8.5 10c-.002.434-.01.845-.04 1.22-.041.514-.126 1.003-.317 1.424a2.083 2.083 0 0 1-.97 1.028C6.725 13.9 6.169 14 5.5 14c-.998 0-1.61.33-1.974.718A1.922 1.922 0 0 0 3 16H2c0-.616.232-1.367.797-1.968C3.374 13.42 4.261 13 5.5 13c.581 0 .962-.088 1.218-.219.241-.123.4-.3.514-.55.121-.266.193-.621.23-1.09.027-.34.035-.718.037-1.141A3.5 3.5 0 0 1 4 6.5v-3a.5.5 0 0 1 .5-.5h1V.5A.5.5 0 0 1 6 0z" />
    </svg>
  )
}


export const PlugIcon2 = (props: IconSvgProps) => {
  return (
    <svg width={props.size || 16} height={props.size || 16} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <g id="Layer_2" data-name="Layer 2">
        <g id="invisible_box" data-name="invisible box">
          <rect width="48" height="48" fill="none" />
        </g>
        <g id="horoscope">
          <g>
            <path d="M25.6,25.6,22.2,29,19,25.8l3.4-3.4a2,2,0,0,0-2.8-2.8L16.2,23l-1.3-1.3a1.9,1.9,0,0,0-2.8,0l-3,3a9.8,9.8,0,0,0-3,7,9.1,9.1,0,0,0,1.8,5.6L4.6,40.6a1.9,1.9,0,0,0,0,2.8,1.9,1.9,0,0,0,2.8,0l3.2-3.2a10.1,10.1,0,0,0,5.9,1.9,10.2,10.2,0,0,0,7.1-2.9l3-3a2,2,0,0,0,.6-1.4,1.7,1.7,0,0,0-.6-1.4L25,31.8l3.4-3.4a2,2,0,0,0-2.8-2.8Z" />
            <path d="M43.4,4.6a1.9,1.9,0,0,0-2.8,0L37.2,8a10,10,0,0,0-13,.9l-3,3a2,2,0,0,0-.6,1.4,1.7,1.7,0,0,0,.6,1.4L32.9,26.4a1.9,1.9,0,0,0,2.8,0l3-2.9a9.9,9.9,0,0,0,2.9-7.1A10.4,10.4,0,0,0,40,10.9l3.4-3.5A1.9,1.9,0,0,0,43.4,4.6Z" />
          </g>
        </g>
      </g>
    </svg>
  )
}

export const PlugIcon3 = (props: IconSvgProps) => {
  return (
    <svg fill={props.color || "black"} width={props.size || 16} height={props.size || 16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 14h12v2H0v-2zm4-6h8v2H4V8zm0-6h6v2H4V2zm8 6c2.21 0 4 1.795 4 4 0 2.21-1.795 4-4 4v-2c1.112 0 2-.895 2-2 0-1.112-.895-2-2-2V8zm2-3v1h-2l-2-2V2l2-2h2v1h2v1h-2v2h2v1h-2zM4 2v2c-1.112 0-2 .895-2 2 0 1.112.895 2 2 2v2c-2.21 0-4-1.795-4-4 0-2.21 1.795-4 4-4z" fillRule="evenodd" />
    </svg>
  )
}

export const BoltIcon = (props: IconSvgProps) => {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={props.color || "black"} fillRule="evenodd" clipRule='evenodd' d="M6.5 12.671L11.5276 4H13V10H17.5V11.3308L12.516 20H11V14H6.5V12.671ZM8.30578 12.5H12.5V17.0319L15.6998 11.5H11.5V7.0242L8.30578 12.5Z" />
    </svg>
  )
}

export const EmptyBoxIcon = (props: IconSvgProps) => {
  return (
    <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd" stroke={props.color || "black"} strokeLinecap="round" strokeLinejoin="round" transform="translate(0 1)">
        <path d="m3.5 6.5 7-4 5.9922779 3.42415879c.62315.35608571 1.0077221 1.01877259 1.0077221 1.73648628v4.67870983c0 .7177137-.3845721 1.3804006-1.0077221 1.7364863l-5 2.8571429c-.6148654.3513516-1.3696904.3513516-1.98455578 0l-5-2.8571429c-.62314999-.3560857-1.00772212-1.0187726-1.00772212-1.7364863 0-1.2454967 0-2.1796192 0-2.8023676" />
        <path d="m9.55180035 9.98943096c.59195265.31874374 1.30444665.31874374 1.89639925 0l5.5518004-2.98943096" />
        <path d="m10.5 10.5v6.5" />
        <path d="m3.5 6.5 7 4-3 1-7-4z" />
        <path d="m10.5 2.5 7 4 2-2-7-4z" />
      </g>
    </svg>
  )
}

export const ArrowRedundantIcon = (props: IconSvgProps) => {
  return (
    <svg fill={props.color || "black"} width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M16 17V9C16 7.89545 15.1046 7 14 7H13V5H14C16.2092 5 18 6.79085 18 9V17H20L17 20L14 17H16ZM8 7V15C8 16.1046 8.89545 17 10 17H11V19H10C7.79085 19 6 17.2092 6 15V7H4L7 4L10 7H8Z" />
    </svg>
  )
}

const Icons = {
  ChevronDown: (props: IconSvgProps) => (<ChevronDown {...props} />),
  ChevronLeft: (props: IconSvgProps) => (<ChevronLeft {...props} />),
  ChevronRight: (props: IconSvgProps) => (<ChevronRight {...props} />),

  ArrowLeftIcon: (props: IconSvgProps) => (<ArrowLeftIcon {...props} />),
  ArrowRightIcon: (props: IconSvgProps) => (<ArrowRightIcon {...props} />),
  ArrowUpIcon: (props: IconSvgProps) => (<ArrowUpIcon {...props} />),
  ArrowDownIcon: (props: IconSvgProps) => (<ArrowDownIcon {...props} />),
  ArrowRedundantIcon: (props: IconSvgProps) => (<ArrowRedundantIcon {...props} />),

  SearchIcon: (props: IconSvgProps) => (<SearchIcon {...props} />),
  MoonFilledIcon: (props: IconSvgProps) => (<MoonFilledIcon {...props} />),
  SunFilledIcon: (props: IconSvgProps) => (<SunFilledIcon {...props} />),
  HeartFilledIcon: (props: IconSvgProps) => (<HeartFilledIcon {...props} />),

  CheckCircleIcon: (props: IconSvgProps) => (<CheckCircleIcon {...props} />),
  BoxIcon: (props: IconSvgProps) => (<BoxIcon {...props} />),
  EmptyBoxIcon: (props: IconSvgProps) => (<EmptyBoxIcon {...props} />),
  WrenchIcon: (props: IconSvgProps) => (<WrenchIcon {...props} />),
  ClockIcon: (props: IconSvgProps) => (<ClockIcon {...props} />),
  DeliveryTruckIcon: (props: IconSvgProps) => (<DeliveryTruckIcon {...props} />),

  UserIcon: (props: IconSvgProps) => (<UserIcon {...props} />),
  CarIcon: (props: IconSvgProps) => (<CarIcon {...props} />),
  HolidayIcon: (props: IconSvgProps) => (<HolidayIcon {...props} />),
  SignOutIcon: (props: IconSvgProps) => (<SignOutIcon {...props} />),

  DollarCircleIcon: (props: IconSvgProps) => (<DollarCircleIcon {...props} />),
  DollarIcon: (props: IconSvgProps) => (<DollarIcon {...props} />),
  BanknoteIcon: (props: IconSvgProps) => (<BanknoteIcon {...props} />),
  TrashIcon: (props: IconSvgProps) => (<TrashIcon {...props} />),
  WrenchIcon2: (props: IconSvgProps) => (<WrenchIcon2 {...props} />),

  CheckCircleFilledIcon: (props: IconSvgProps) => (<CheckCircleFilledIcon {...props} />),
  CloseCircleFilledIcon: (props: IconSvgProps) => (<CloseCircleFilledIcon {...props} />),
  CloseIcon: (props: IconSvgProps) => (<CloseIcon {...props} />),
  PlusIcon: (props: IconSvgProps) => (<PlusIcon {...props} />),
  PlugIcon: (props: IconSvgProps) => (<PlugIcon {...props} />),
  PlugIcon2: (props: IconSvgProps) => (<PlugIcon2 {...props} />),
  PlugIcon3: (props: IconSvgProps) => (<PlugIcon3 {...props} />),
  BoltIcon: (props: IconSvgProps) => (<BoltIcon {...props} />),
};

export default Icons;