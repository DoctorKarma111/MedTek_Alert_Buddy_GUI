export interface User {
  name: string;
  rank: string;
}

export interface AlertInfo {
  status: 'standby' | 'active';
  message?: string;
  type?: 'info' | 'warning' | 'error';
  timestamp?: string;
}

export interface PresetButton {
  id: number;
  name: string;
  description: string;
  color: string;
}