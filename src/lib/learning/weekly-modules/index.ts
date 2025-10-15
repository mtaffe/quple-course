import { WeeklyModule } from '@/types/weekly-modules';
import { week01HTMLEssentials } from './week-01-html-essentials';

export const weeklyModules: WeeklyModule[] = [
  week01HTMLEssentials,
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
