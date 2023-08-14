import { Minutes } from "./minutes";

export interface MinutesDetails {
  id: number;
  minutesId: number;
  minutes: Minutes
  description: string;
  remarks: string;
  status: string;
}
