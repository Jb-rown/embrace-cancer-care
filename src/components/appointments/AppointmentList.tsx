
import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, User, MapPin, CheckCircle, XCircle, Calendar as CalendarIcon } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/data/appointments-data";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppointmentListProps {
  appointments: Appointment[];
  onViewDetails: (appointment: Appointment) => void;
  onReschedule: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
}

export const AppointmentList = ({
  appointments,
  onViewDetails,
  onReschedule,
  onCancel
}: AppointmentListProps) => {
  const isMobile = useIsMobile();

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      case 'rescheduled':
        return <Badge className="bg-amber-500">Rescheduled</Badge>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: Appointment['type']) => {
    switch (type) {
      case 'consultation':
        return <Badge variant="outline" className="border-purple-500 text-purple-700">Consultation</Badge>;
      case 'treatment':
        return <Badge variant="outline" className="border-blue-500 text-blue-700">Treatment</Badge>;
      case 'follow-up':
        return <Badge variant="outline" className="border-green-500 text-green-700">Follow-up</Badge>;
      case 'test':
        return <Badge variant="outline" className="border-amber-500 text-amber-700">Test</Badge>;
      default:
        return null;
    }
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div 
            key={appointment.id} 
            className="p-4 border rounded-lg shadow-sm bg-card"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{appointment.title}</h3>
              {getStatusBadge(appointment.status)}
            </div>
            
            <div className="space-y-2 text-sm mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(new Date(appointment.date), 'PPP')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.time} ({appointment.duration} min)</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.doctorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.facilityName}</span>
              </div>
              <div>{getTypeBadge(appointment.type)}</div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" variant="default" onClick={() => onViewDetails(appointment)}>
                View Details
              </Button>
              {appointment.status === 'scheduled' && (
                <>
                  <Button size="sm" variant="outline" onClick={() => onReschedule(appointment)}>
                    Reschedule
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onCancel(appointment)}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Appointment</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="font-medium">{appointment.title}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" /> 
                  {format(new Date(appointment.date), 'PPP')}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" /> 
                  {appointment.time} ({appointment.duration} min)
                </span>
              </div>
            </TableCell>
            <TableCell>{appointment.doctorName}</TableCell>
            <TableCell>{appointment.facilityName}</TableCell>
            <TableCell>{getTypeBadge(appointment.type)}</TableCell>
            <TableCell>{getStatusBadge(appointment.status)}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button size="sm" variant="default" onClick={() => onViewDetails(appointment)}>
                  View
                </Button>
                {appointment.status === 'scheduled' && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => onReschedule(appointment)}>
                      Reschedule
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onCancel(appointment)}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
