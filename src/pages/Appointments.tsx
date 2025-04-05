
import { useState, useEffect } from "react";
import { format, compareAsc } from "date-fns";
import { Plus, Calendar, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Appointment, 
  appointments as initialAppointments,
  sortAppointments,
  filterAppointmentsByStatus,
  getUpcomingAppointments,
} from "@/data/appointments-data";
import { AppointmentList } from "@/components/appointments/AppointmentList";
import { AppointmentDetails } from "@/components/appointments/AppointmentDetails";
import { AppointmentForm } from "@/components/appointments/AppointmentForm";
import { CancelAppointmentDialog } from "@/components/appointments/CancelAppointmentDialog";

const Appointments = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [statusFilter, setStatusFilter] = useState<Appointment['status'] | 'all'>('all');
  
  // Component state for modals and dialogs
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Filter and sort appointments when tab or status filter changes
  useEffect(() => {
    let filtered: Appointment[];
    
    switch (selectedTab) {
      case "upcoming":
        filtered = getUpcomingAppointments(appointments);
        break;
      case "past":
        filtered = appointments.filter(appointment => 
          appointment.status === 'completed' || 
          (appointment.status === 'cancelled' || 
           (appointment.status === 'scheduled' && new Date(appointment.date) < new Date())));
        break;
      case "all":
      default:
        filtered = filterAppointmentsByStatus(appointments, statusFilter);
        break;
    }
    
    setFilteredAppointments(sortAppointments(filtered));
  }, [appointments, selectedTab, statusFilter]);

  // Handle creating a new appointment
  const handleCreateAppointment = (data: Omit<Appointment, "id" | "status">) => {
    const newAppointment: Appointment = {
      ...data,
      id: `apt-${Math.floor(Math.random() * 1000)}`,
      status: 'scheduled',
    };
    
    setAppointments([...appointments, newAppointment]);
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment has been scheduled for ${format(new Date(data.date), 'PPP')} at ${data.time}.`,
    });
  };

  // Handle rescheduling an appointment
  const handleRescheduleAppointment = (data: Omit<Appointment, "id" | "status">) => {
    if (!selectedAppointment) return;
    
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === selectedAppointment.id
        ? { ...appointment, ...data, status: 'scheduled' }
        : appointment
    );
    
    setAppointments(updatedAppointments);
    toast({
      title: "Appointment Rescheduled",
      description: `Your appointment has been rescheduled for ${format(new Date(data.date), 'PPP')} at ${data.time}.`,
    });
  };

  // Handle cancelling an appointment
  const handleCancelAppointment = (appointment: Appointment) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointment.id
        ? { ...apt, status: 'cancelled' }
        : apt
    );
    
    setAppointments(updatedAppointments);
    setIsCancelDialogOpen(false);
    toast({
      title: "Appointment Cancelled",
      description: `Your appointment with ${appointment.doctorName} on ${format(new Date(appointment.date), 'PPP')} has been cancelled.`,
    });
  };

  // Open the details modal
  const handleViewAppointmentDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsModalOpen(true);
  };

  // Open the reschedule modal
  const handleOpenRescheduleModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsRescheduleModalOpen(true);
  };

  // Open the cancel dialog
  const handleOpenCancelDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsCancelDialogOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role="patient" />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
            <Button onClick={() => setIsNewAppointmentModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> New Appointment
            </Button>
          </div>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="upcoming" className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Upcoming
                </TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="all">All Appointments</TabsTrigger>
              </TabsList>
              
              {selectedTab === "all" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Filter className="w-4 h-4 mr-2" /> Filter by Status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Appointment Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                      <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="scheduled">Scheduled</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="completed">Completed</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="cancelled">Cancelled</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="rescheduled">Rescheduled</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <TabsContent value="upcoming" className="mt-4">
              {filteredAppointments.length > 0 ? (
                <AppointmentList 
                  appointments={filteredAppointments}
                  onViewDetails={handleViewAppointmentDetails}
                  onReschedule={handleOpenRescheduleModal}
                  onCancel={handleOpenCancelDialog}
                />
              ) : (
                <div className="p-8 text-center">
                  <h3 className="text-lg font-medium mb-2">No upcoming appointments</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any upcoming appointments scheduled.
                  </p>
                  <Button onClick={() => setIsNewAppointmentModalOpen(true)}>
                    Schedule an Appointment
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="mt-4">
              {filteredAppointments.length > 0 ? (
                <AppointmentList 
                  appointments={filteredAppointments}
                  onViewDetails={handleViewAppointmentDetails}
                  onReschedule={handleOpenRescheduleModal}
                  onCancel={handleOpenCancelDialog}
                />
              ) : (
                <div className="p-8 text-center">
                  <h3 className="text-lg font-medium">No past appointments</h3>
                  <p className="text-muted-foreground">
                    You don't have any past appointment history.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="all" className="mt-4">
              {filteredAppointments.length > 0 ? (
                <AppointmentList 
                  appointments={filteredAppointments}
                  onViewDetails={handleViewAppointmentDetails}
                  onReschedule={handleOpenRescheduleModal}
                  onCancel={handleOpenCancelDialog}
                />
              ) : (
                <div className="p-8 text-center">
                  <h3 className="text-lg font-medium">No appointments found</h3>
                  <p className="text-muted-foreground mb-4">
                    No appointments match your current filter.
                  </p>
                  <Button variant="outline" onClick={() => setStatusFilter('all')}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
      
      {/* Modals and Dialogs */}
      <AppointmentForm 
        isOpen={isNewAppointmentModalOpen} 
        onClose={() => setIsNewAppointmentModalOpen(false)}
        onSubmit={handleCreateAppointment}
        mode="create"
      />
      
      {selectedAppointment && (
        <>
          <AppointmentForm 
            isOpen={isRescheduleModalOpen} 
            onClose={() => setIsRescheduleModalOpen(false)}
            onSubmit={handleRescheduleAppointment}
            appointment={selectedAppointment}
            mode="reschedule"
          />
          
          <AppointmentDetails
            appointment={selectedAppointment}
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            onReschedule={handleOpenRescheduleModal}
            onCancel={handleOpenCancelDialog}
          />
          
          <CancelAppointmentDialog
            appointment={selectedAppointment}
            isOpen={isCancelDialogOpen}
            onClose={() => setIsCancelDialogOpen(false)}
            onConfirm={handleCancelAppointment}
          />
        </>
      )}
    </div>
  );
};

export default Appointments;
