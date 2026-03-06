import 'react-icons';

declare module 'react-icons/lib' {
  export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
    children?: React.ReactNode;
    size?: string | number;
    color?: string;
    title?: string;
  }
  export type IconType = (props: IconBaseProps) => React.JSX.Element;
}

declare module 'react-icons/ri' {
  import { IconType } from 'react-icons/lib';
  export const RiDashboardLine: IconType;
  export const RiUserLine: IconType;
  export const RiFileListLine: IconType;
  export const RiGamepadLine: IconType;
  export const RiBarChartBoxLine: IconType;
  export const RiShieldStarLine: IconType;
  export const RiSettings4Line: IconType;
  export const RiNotification3Line: IconType;
  export const RiSearchLine: IconType;
  export const RiArrowDownSLine: IconType;
  export const RiArrowUpSLine: IconType;
  export const RiArrowRightSLine: IconType;
  export const RiArrowUpLine: IconType;
  export const RiArrowDownLine: IconType;
  export const RiArrowRightLine: IconType;
  export const RiTimeLine: IconType;
  export const RiAlertLine: IconType;
  export const RiCalendarLine: IconType;
  export const RiDownloadLine: IconType;
  export const RiShieldLine: IconType;
  export const RiPlayCircleLine: IconType;
  export const RiEditLine: IconType;
  export const RiHeartPulseLine: IconType;
  export const RiDropLine: IconType;
  export const RiEyeLine: IconType;
  export const RiTimerLine: IconType;
  export const RiLightbulbLine: IconType;
  export const RiStickyNoteLine: IconType;
  export const RiCheckboxCircleLine: IconType;
  export const RiFlag2Line: IconType;
  export const RiFilter3Line: IconType;
  export const RiStarFill: IconType;
  export const RiStarLine: IconType;
  export const RiPulseLine: IconType;
  export const RiGitBranchLine: IconType;
  export const RiSignalTowerLine: IconType;
  export const RiWifiLine: IconType;
  export const RiWifiOffLine: IconType;
  export const RiShieldUserLine: IconType;
  export const RiServerLine: IconType;
  export const RiCheckLine: IconType;
  export const RiCloseLine: IconType;
}
