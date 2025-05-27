import { Props as ActivityCalendarProps } from 'react-activity-calendar';

declare module 'react-github-calendar' {
  export type Activity = {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
  };

  export type Year = number | "last";
  
  export type GitHubCalendarProps = {
    username: string;
    style?: React.CSSProperties;
    errorMessage?: string;
    blockSize?: number;
    blockMargin?: number;
    fontSize?: number;
    hideMonthLabels?: boolean;
    hideColorLegend?: boolean;
    theme?: {
      light: string[];
      dark: string[];
    };
    transformData?: (data: Array<Activity>) => Array<Activity>;
    transformTotalCount?: boolean;
    year?: Year;
  } & Omit<ActivityCalendarProps, "data">;

  const GitHubCalendar: React.FC<GitHubCalendarProps>;
  export default GitHubCalendar;
}
