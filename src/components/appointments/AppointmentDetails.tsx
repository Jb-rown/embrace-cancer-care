
import { format } from "date-fns";
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  FileText, 
  Tag 
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/data/appointments-data";

interface AppointmentDetailsProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onReschedule: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
}

export const AppointmentDetails = ({
  appointment,
  isOpen,
  onClose,
  onReschedule,
  onCancel
}: AppointmentDetailsProps) => {
  if (!appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{appointment.title}</DialogTitle>
          <DialogDescription>
            Appointment details and information
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-[20px_1fr] items-start gap-4">
            <Calendar className="h-5 w-5 text-embrace-500" />
            <div>
              <p className="font-medium">Date</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(appointment.date), 'PPP')}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-[20px_1fr] items-start gap-4">
            <Clock className="h-5 w-5 text-embrace-500" />
            <div>
              <p className="font-medium">Time</p>
              <p className="text-sm text-muted-foreground">
                {appointment.time} ({appointment.duration} minutes)
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-[20px_1fr] items-start gap-4">
            <User className="h-5 w-5 text-embrace-500" />
            <div>
              <p className="font-medium">Doctor</p>
              <p className="text-sm text-muted-foreground">
                {appointment.doctorName}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-[20px_1fr] items-start gap-4">
            <MapPin className="h-5 w-5 text-embrace-500" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-sm text-muted-foreground">
                {appointment.facilityName}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-[20px_1fr] items-start gap-4">
            <Tag className="h-5 w-5 text-embrace-500" />
            <div>
              <p className="font-medium">Type</p>
              <p className="text-sm text-muted-foreground capitalize">
                {appointment.type}
              </p>
            </div>
          </div>
          
          {appointment.notes && (
            <div className="grid grid-cols-[20px_1fr] items-start gap-4">
              <FileText className="h-5 w-5 text-embrace-500" />
              <div>
                <p className="font-medium">Notes</p>
                <p className="text-sm text-muted-foreground">
                  {appointment.notes}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex-col sm:flex-row sm:justify-between sm:space-x-2">
          {appointment.status === 'scheduled' && (
            <>
              <Button 
                variant="outline" 
                className="mt-2 sm:mt-0" 
                onClick={() => {
                  onReschedule(appointment);
                  onClose();
                }}
              >
                Reschedule
              </Button>
              <Button 
                variant="destructive" 
                className="mt-2 sm:mt-0"
                onClick={() => {
                  onCancel(appointment);
                  onClose();
                }}
              >
                Cancel Appointment
              </Button>
            </>
          )}
          <Button 
            className="mt-2 sm:mt-0" 
            onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
