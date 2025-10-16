import { WeeklyModule } from '@/types/weekly-modules';
import { week01HTMLEssentials } from './week-01-html-essentials';
import { week02CSSBasics } from './week-02-css-basics';
import { week03Flexbox } from './week-03-flexbox';
import { week04CSSGridResponsive } from './week-04-css-grid-responsive';
import { week05JavascriptFundamentals } from './week-05-javascript-fundamentals';
import { week06DomManipulation } from './week-06-dom-manipulation';
import { week07EventsAndForms } from './week-07-events-and-forms';
import { week08ArraysAndApi } from './week-08-arrays-and-api';
import { week09ReactBasics } from './week-09-react-basics';
import { week10ReactComponents } from './week-10-react-components';
import { week11ReactState } from './week-11-react-state';
import { week12FinalProject } from './week-12-final-project';

export const weeklyModules: WeeklyModule[] = [
  week01HTMLEssentials,
  week02CSSBasics,
  week03Flexbox,
  week04CSSGridResponsive,
  week05JavascriptFundamentals,
  week06DomManipulation,
  week07EventsAndForms,
  week08ArraysAndApi,
  week09ReactBasics,
  week10ReactComponents,
  week11ReactState,
  week12FinalProject,
];

export const getModuleByWeek = (weekNumber: number): WeeklyModule | undefined => {
  return weeklyModules.find(module => module.weekNumber === weekNumber);
};

export const getModuleById = (id: string): WeeklyModule | undefined => {
  return weeklyModules.find(module => module.id === id);
};

export const getTotalWeeks = (): number => {
  return weeklyModules.length;
};

export const getNextModule = (currentModuleId: string): WeeklyModule | undefined => {
  const currentModule = getModuleById(currentModuleId);
  if (!currentModule?.nextWeekId) return undefined;
  return getModuleById(currentModule.nextWeekId);
};

export const getPreviousModule = (currentModuleId: string): WeeklyModule | undefined => {
  const currentModule = getModuleById(currentModuleId);
  if (!currentModule?.previousWeekId) return undefined;
  return getModuleById(currentModule.previousWeekId);
};
