
export interface Appointment {
  id: string;
  title: string;
  doctorName: string;
  facilityName: string;
  date: string; // ISO string format
  time: string;
  duration: number; // in minutes
  type: 'consultation' | 'treatment' | 'follow-up' | 'test';
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
}

// Mock data for demonstration
export const appointments: Appointment[] = [
  {
    id: "apt-001",
    title: "Oncology Consultation",
    doctorName: "Dr. Sarah Johnson",
    facilityName: "Memorial Cancer Center",
    date: "2025-04-10",
    time: "09:30",
    duration: 45,
    type: "consultation",
    notes: "Initial consultation to discuss treatment options",
    status: "scheduled"
  },
  {
    id: "apt-002",
    title: "Chemotherapy Session",
    doctorName: "Dr. Michael Chen",
    facilityName: "Memorial Cancer Center",
    date: "2025-04-15",
    time: "10:00",
    duration: 120,
    type: "treatment",
    notes: "First chemotherapy session. Please arrive 15 minutes early.",
    status: "scheduled"
  },
  {
    id: "apt-003",
    title: "Blood Work",
    doctorName: "Dr. Lisa Anderson",
    facilityName: "City Medical Lab",
    date: "2025-04-08",
    time: "08:15",
    duration: 30,
    type: "test",
    notes: "Fasting required for 8 hours before appointment",
    status: "scheduled"
  },
  {
    id: "apt-004",
    title: "Follow-up Consultation",
    doctorName: "Dr. Sarah Johnson",
    facilityName: "Memorial Cancer Center",
    date: "2025-03-25",
    time: "14:00",
    duration: 30,
    type: "follow-up",
    notes: "Review progress and discuss next steps",
    status: "completed"
  },
  {
    id: "apt-005",
    title: "Radiation Therapy",
    doctorName: "Dr. James Wilson",
    facilityName: "Oncology Center",
    date: "2025-04-18",
    time: "11:30",
    duration: 60,
    type: "treatment",
    notes: "Please bring previous scan results",
    status: "scheduled"
  }
];

// Helper function to sort appointments by date and time
export const sortAppointments = (appointments: Appointment[]): Appointment[] => {
  return [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });
};

// Filter appointments by status
export const filterAppointmentsByStatus = (
  appointments: Appointment[],
  status: Appointment['status'] | 'all'
): Appointment[] => {
  if (status === 'all') return appointments;
  return appointments.filter(appointment => appointment.status === status);
};

// Get upcoming appointments (scheduled appointments with dates in the future)
export const getUpcomingAppointments = (appointments: Appointment[]): Appointment[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointment.status === 'scheduled' && appointmentDate >= today;
  });
};

// Format date to display in a readable format
export const formatAppointmentDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
