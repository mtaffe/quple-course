import { notFound } from 'next/navigation';
import { getModuleByWeek } from '@/lib/learning/weekly-modules';
import { DashboardLayout } from '@/components/navigation/DashboardLayout';
import { WeekModuleClient } from './WeekModuleClient';

export default async function WeekModulePage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const weekNumber = parseInt(number, 10);

  if (isNaN(weekNumber)) {
    notFound();
  }

  const weekModule = getModuleByWeek(weekNumber);

  if (!weekModule) {
    notFound();
  }

  return (
    <DashboardLayout>
      <WeekModuleClient module={weekModule} />
    </DashboardLayout>
  );
}
