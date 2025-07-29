
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SuggestDiagnosesInput } from "@/ai/flows/suggest-diagnoses";

const diagnosisSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  age: z.string().min(1, 'Age is required.'),
  gender: z.string().min(1, 'Gender is required.'),
  weight: z.string().min(1, 'Weight is required.'),
  height: z.string().min(1, 'Height is required.'),
  diet: z.enum(['vegetarian', 'non-vegetarian', 'vegan']),
  visitDate: z.date({
    required_error: "A date of visit is required.",
  }),
  location: z.string().min(1, 'Location is required.'),
  mal: z.string().min(1, "This field is required."),
  mutra: z.string().min(1, "This field is required."),
  kshudha: z.string().min(1, "This field is required."),
  trishna: z.string().min(1, "This field is required."),
  nidra: z.string().min(1, "This field is required."),
  jivha: z.string().min(1, "This field is required."),
  manoSwabhav: z.string().min(1, "This field is required."),
  otherComplaints: z.string().optional(),
  arsh: z.string().min(1, "This field is required."),
  ashmari: z.string().min(1, "This field is required."),
  kushtha: z.string().min(1, "This field is required."),
  prameha: z.string().min(1, "This field is required."),
  grahani: z.string().min(1, "This field is required."),
  shotha: z.string().min(1, "This field is required."),
});

export type DiagnosisFormValues = z.infer<typeof diagnosisSchema>;

interface DiagnosisFormProps {
  onDiagnose: (data: DiagnosisFormValues) => Promise<void>;
  isLoading: boolean;
}

export function DiagnosisForm({ onDiagnose, isLoading }: DiagnosisFormProps) {
  const form = useForm<DiagnosisFormValues>({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      weight: "",
      height: "",
      diet: "vegetarian",
      visitDate: new Date(),
      location: "",
      mal: "Normal",
      mutra: "Normal",
      kshudha: "Normal",
      trishna: "Normal",
      nidra: "Normal",
      jivha: "Niram (Clear)",
      manoSwabhav: "Calm",
      otherComplaints: "",
      arsh: "No",
      ashmari: "No",
      kushtha: "No",
      prameha: "No",
      grahani: "No",
      shotha: "No",
    },
  });

  async function onSubmit(values: DiagnosisFormValues) {
    await onDiagnose(values);
  }

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Patient Intake Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="bg-background/80">
              <CardHeader>
                <CardTitle className="text-xl font-headline">Patient Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 35" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 70" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 175" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="diet"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Diet</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select diet type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                        control={form.control}
                        name="visitDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Date of Visit</FormLabel>
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
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                 </div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., City, Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="bg-background/80">
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Symptom Details</CardTitle>
                    <CardDescription>Provide details based on Ayurvedic parameters.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="mal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stool (मल)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Normal">Normal</SelectItem>
                              <SelectItem value="Vibandh (Constipation)">Vibandh (Constipation)</SelectItem>
                              <SelectItem value="Atisar (Diarrhea)">Atisar (Diarrhea)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mutra"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Urine (मूत्र)</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Normal">Normal</SelectItem>
                              <SelectItem value="Dah Yukt (Burning)">Dah Yukt (Burning)</SelectItem>
                              <SelectItem value="Rakt Yukt (With Blood)">Rakt Yukt (With Blood)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kshudha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Appetite (क्षुधा)</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Normal">Normal</SelectItem>
                              <SelectItem value="Decreased">Decreased</SelectItem>
                              <SelectItem value="Increased">Increased</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="trishna"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Thirst (तृष्णा)</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Normal">Normal</SelectItem>
                              <SelectItem value="Decreased">Decreased</SelectItem>
                              <SelectItem value="Increased">Increased</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nidra"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sleep (निद्रा)</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Normal">Normal</SelectItem>
                              <SelectItem value="Khandit (Disturbed)">Khandit (Disturbed)</SelectItem>
                              <SelectItem value="Anidra (Sleeplessness)">Anidra (Sleeplessness)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jivha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tongue (जिह्वा)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Niram (Clear)">Niram (Clear)</SelectItem>
                              <SelectItem value="Saam (Coated)">Saam (Coated)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manoSwabhav"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mental State (मनो स्वभाव)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Calm">Calm</SelectItem>
                              <SelectItem value="Chidchida (Irritable)">Chidchida (Irritable)</SelectItem>
                              <SelectItem value="Udaseen (Depressed)">Udaseen (Depressed)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="arsh"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Arsh (अर्श)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="No">No</SelectItem>
                              <SelectItem value="Yes, Dry">Yes, Dry</SelectItem>
                              <SelectItem value="Yes, Bleeding">Yes, Bleeding</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="ashmari"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ashmari (अश्मरी)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="No">No</SelectItem>
                              <SelectItem value="Yes, with Pain">Yes, with Pain</SelectItem>
                              <SelectItem value="Yes, History">Yes, History</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="kushtha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kushtha (कुष्ठ)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="No">No</SelectItem>
                              <SelectItem value="Dry Eczema">Dry Eczema</SelectItem>
                              <SelectItem value="Psoriasis">Psoriasis</SelectItem>
                              <SelectItem value="Acne/Pimples">Acne/Pimples</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="prameha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prameha (प्रमेह)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="No">No</SelectItem>
                              <SelectItem value="Increased Frequency">Increased Frequency</SelectItem>
                              <SelectItem value="Family History">Family History</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="grahani"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grahani (ग्रहणी)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="No">No</SelectItem>
                              <SelectItem value="IBS">IBS</SelectItem>
                              <SelectItem value="Indigestion">Indigestion</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="shotha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shotha (शोथ)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="No">No</SelectItem>
                              <SelectItem value="Localized">Localized</SelectItem>
                              <SelectItem value="Generalized">Generalized</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                    control={form.control}
                    name="otherComplaints"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                        <FormLabel>Other Complaints</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Describe any other issues..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
            </Card>

            <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Analyzing...
                </>
              ) : "Get Diagnosis"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
