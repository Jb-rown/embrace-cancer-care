
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Appointment } from "@/data/appointments-data";
import { format } from "date-fns";

interface CancelAppointmentDialogProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (appointment: Appointment) => void;
}

export const CancelAppointmentDialog = ({
  appointment,
  isOpen,
  onClose,
  onConfirm,
}: CancelAppointmentDialogProps) => {
  if (!appointment) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel your {appointment.title} appointment with {appointment.doctorName} on {format(new Date(appointment.date), 'PPP')} at {appointment.time}?
            <br /><br />
            This action cannot be undone. You will need to schedule a new appointment if you wish to see this doctor again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm(appointment);
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Cancel Appointment
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
