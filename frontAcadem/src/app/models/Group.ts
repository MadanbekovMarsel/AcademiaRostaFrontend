import {Subject} from "./Subject";
import {Timetable} from "./Timetable";
import {User} from "./User";

export interface Group{
  id?: number;
  name: string;
  subject: Subject;
  pupils?: User[];
  teacher?: User;
  timetable?: Timetable;
}
