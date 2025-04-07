
import { UpcomingTreatments } from "./UpcomingTreatments";
import { MedicationSchedule } from "./MedicationSchedule";
import { TreatmentProgress } from "./TreatmentProgress";

export const TreatmentSummary = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
      <UpcomingTreatments />
      <MedicationSchedule />
      <TreatmentProgress />
    </div>
  );
};
