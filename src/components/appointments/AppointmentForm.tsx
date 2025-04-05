import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/data/appointments-data";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  doctorName: z.string().min(3, { message: "Doctor name is required" }),
  facilityName: z.string().min(3, { message: "Facility name is required" }),
  date: z.date({ required_error: "Date is required" }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Time must be in HH:MM format" }),
  duration: z.number().min(5, { message: "Duration must be at least 5 minutes" }),
  type: z.enum(["consultation", "treatment", "follow-up", "test"], { required_error: "Type is required" }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Appointment, "id" | "status">) => void;
  appointment?: Appointment;
  mode: "create" | "reschedule";
}

export const AppointmentForm = ({
  isOpen,
  onClose,
  onSubmit,
  appointment,
  mode,
}: AppointmentFormProps) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    appointment ? new Date(appointment.date) : undefined
  );

  const defaultValues: Partial<FormValues> = {
    title: appointment?.title || "",
    doctorName: appointment?.doctorName || "",
    facilityName: appointment?.facilityName || "",
    date: appointment ? new Date(appointment.date) : undefined,
    time: appointment?.time || "",
    duration: appointment?.duration || 30,
    type: appointment?.type || "consultation",
    notes: appointment?.notes || "",
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function handleSubmit(values: FormValues) {
    const data: Omit<Appointment, "id" | "status"> = {
      title: values.title,
      doctorName: values.doctorName,
      facilityName: values.facilityName,
      date: format(values.date, "yyyy-MM-dd"),
      time: values.time,
      duration: values.duration,
      type: values.type,
      notes: values.notes || "",
    };
    
    onSubmit(data);
    toast({
      title: mode === "create" ? "Appointment Created" : "Appointment Rescheduled",
      description: `Your appointment has been ${mode === "create" ? "created" : "rescheduled"} successfully.`,
    });
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Schedule New Appointment" : "Reschedule Appointment"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" 
              ? "Fill in the details to schedule a new appointment." 
              : "Update the date and time for your appointment."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appointment Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter appointment title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="doctorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter doctor name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="facilityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facility Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter facility name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setSelectedDate(date);
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="HH:MM" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (min)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={5} 
                          step={5} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appointment Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select appointment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="treatment">Treatment</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="test">Test</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any additional notes or instructions"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: Any special instructions or information for the appointment.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {mode === "create" ? "Schedule Appointment" : "Reschedule"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
