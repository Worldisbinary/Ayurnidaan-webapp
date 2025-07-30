
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, Save, Bot, Camera } from "lucide-react";
import React, { useEffect } from 'react';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const diagnosisSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  age: z.string().min(1, 'Age is required.'),
  gender: z.string().min(1, 'Gender is required.'),
  weight: z.string().min(1, 'Weight is required.'),
  height: z.string().min(1, 'Height is required.'),
  diet: z.enum(["Vegetarian (शाकाहारी)", "Non-Vegetarian (मांसाहारी)", "Vegan (वीगन)"]),
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
  onFormChange: (data: DiagnosisFormValues) => void;
  onDiagnose: () => Promise<void>;
  onSave: () => void;
  isLoading: boolean;
}

export function DiagnosisForm({ onFormChange, onDiagnose, onSave, isLoading }: DiagnosisFormProps) {
  const form = useForm<DiagnosisFormValues>({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      weight: "",
      height: "",
      diet: "Vegetarian (शाकाहारी)",
      visitDate: new Date(),
      location: "",
      mal: "Normal (सामान्य)",
      mutra: "Normal (सामान्य)",
      kshudha: "Normal (सामान्य)",
      trishna: "Normal (सामान्य)",
      nidra: "Normal (सामान्य)",
      jivha: "Niram (Clear) (निराम)",
      manoSwabhav: "Calm (शांत)",
      otherComplaints: "",
      arsh: "No (नहीं)",
      ashmari: "No (नहीं)",
      kushtha: "No (नहीं)",
      prameha: "No (नहीं)",
      grahani: "No (नहीं)",
      shotha: "No (नहीं)",
    },
  });

  const watchedValues = useWatch({ control: form.control });

  useEffect(() => {
    // This will now correctly fire on any form value change.
    const subscription = form.watch((values) => {
        onFormChange(values as DiagnosisFormValues);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, onFormChange]);


  const handleDiagnoseClick = () => {
     form.trigger().then(isValid => {
        if(isValid) {
            onDiagnose();
        }
    });
  }

  const handleSaveClick = () => {
    form.trigger().then(isValid => {
        if(isValid) {
            onSave();
        }
    });
  }
  
  const PhysicalObservationTab = ({ type }: { type: string }) => (
    <Card className="bg-muted/30">
        <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Image preview will appear here</p>
                </div>
                <Button variant="outline">
                    <Camera className="mr-2" />
                    Capture {type} Image
                </Button>
            </div>
        </CardContent>
    </Card>
  );

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Patient Intake Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
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
                              <SelectItem value="Vegetarian (शाकाहारी)">Vegetarian (शाकाहारी)</SelectItem>
                              <SelectItem value="Non-Vegetarian (मांसाहारी)">Non-Vegetarian (मांसाहारी)</SelectItem>
                              <SelectItem value="Vegan (वीगन)">Vegan (वीगन)</SelectItem>
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
                              <SelectItem value="Normal (सामान्य)">Normal (सामान्य)</SelectItem>
                              <SelectItem value="Vibandh (Constipation) (विबंध (कब्ज))">Vibandh (Constipation) (विबंध (कब्ज))</SelectItem>
                              <SelectItem value="Atisar (Diarrhea) (अतिसार (दस्त))">Atisar (Diarrhea) (अतिसार (दस्त))</SelectItem>
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
                              <SelectItem value="Normal (सामान्य)">Normal (सामान्य)</SelectItem>
                              <SelectItem value="Dah Yukt (Burning) (दाह युक्त)">Dah Yukt (Burning) (दाह युक्त)</SelectItem>
                              <SelectItem value="Rakt Yukt (With Blood) (रक्त युक्त)">Rakt Yukt (With Blood) (रक्त युक्त)</SelectItem>
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
                              <SelectItem value="Normal (सामान्य)">Normal (सामान्य)</SelectItem>
                              <SelectItem value="Decreased (कम हुई)">Decreased (कम हुई)</SelectItem>
                              <SelectItem value="Increased (बढ़ी हुई)">Increased (बढ़ी हुई)</SelectItem>
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
                              <SelectItem value="Normal (सामान्य)">Normal (सामान्य)</SelectItem>
                              <SelectItem value="Decreased (कम हुई)">Decreased (कम हुई)</SelectItem>
                              <SelectItem value="Increased (बढ़ी हुई)">Increased (बढ़ी हुई)</SelectItem>
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
                              <SelectItem value="Normal (सामान्य)">Normal (सामान्य)</SelectItem>
                              <SelectItem value="Khandit (Disturbed) (खंडित)">Khandit (Disturbed) (खंडित)</SelectItem>
                              <SelectItem value="Anidra (Sleeplessness) (अनिद्रा)">Anidra (Sleeplessness) (अनिद्रा)</SelectItem>
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
                              <SelectItem value="Niram (Clear) (निराम)">Niram (Clear) (निराम)</SelectItem>
                              <SelectItem value="Saam (Coated) (साम)">Saam (Coated) (साम)</SelectItem>
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
                              <SelectItem value="Calm (शांत)">Calm (शांत)</SelectItem>
                              <SelectItem value="Chidchida (Irritable) (चिड़चिड़ा)">Chidchida (Irritable) (चिड़चिड़ा)</SelectItem>
                              <SelectItem value="Udaseen (Depressed) (उदासीन)">Udaseen (Depressed) (उदासीन)</SelectItem>
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
                              <SelectItem value="No (नहीं)">No (नहीं)</SelectItem>
                              <SelectItem value="Yes, Dry (हाँ, शुष्क)">Yes, Dry (हाँ, शुष्क)</SelectItem>
                              <SelectItem value="Yes, Bleeding (हाँ, रक्तस्रावी)">Yes, Bleeding (हाँ, रक्तस्रावी)</SelectItem>
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
                              <SelectItem value="No (नहीं)">No (नहीं)</SelectItem>
                              <SelectItem value="Yes, with Pain (हाँ, दर्द के साथ)">Yes, with Pain (हाँ, दर्द के साथ)</SelectItem>
                              <SelectItem value="Yes, History (हाँ, पुराना इतिहास)">Yes, History (हाँ, पुराना इतिहास)</SelectItem>
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
                              <SelectItem value="No (नहीं)">No (नहीं)</SelectItem>
                              <SelectItem value="Dry Eczema (शुष्क एक्जिमा)">Dry Eczema (शुष्क एक्जिमा)</SelectItem>
                              <SelectItem value="Psoriasis (सोरायसिस)">Psoriasis (सोरायसिस)</SelectItem>
                              <SelectItem value="Acne/Pimples (मुंहासे)">Acne/Pimples (मुंहासे)</SelectItem>
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
                              <SelectItem value="No (नहीं)">No (नहीं)</SelectItem>
                              <SelectItem value="Increased Frequency (बार-बार पेशाब आना)">Increased Frequency (बार-बार पेशाब आना)</SelectItem>
                              <SelectItem value="Family History (पारिवारिक इतिहास)">Family History (पारिवारिक इतिहास)</SelectItem>
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
                              <SelectItem value="No (नहीं)">No (नहीं)</SelectItem>
                              <SelectItem value="IBS (आईबीएस)">IBS (आईबीएस)</SelectItem>
                              <SelectItem value="Indigestion (अपच)">Indigestion (अपच)</SelectItem>
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
                              <SelectItem value="No (नहीं)">No (नहीं)</SelectItem>
                              <SelectItem value="Localized (स्थानीय)">Localized (स्थानीय)</SelectItem>
                              <SelectItem value="Generalized (व्यापक)">Generalized (व्यापक)</SelectItem>
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

            <Card className="bg-background/80">
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Physical Observation</CardTitle>
                    <CardDescription>Image-based assessment for tongue, nails, and skin.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="tongue">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="tongue">Tongue</TabsTrigger>
                            <TabsTrigger value="nails">Nails</TabsTrigger>
                            <TabsTrigger value="skin">Skin</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tongue">
                           <PhysicalObservationTab type="Tongue" />
                        </TabsContent>
                        <TabsContent value="nails">
                            <PhysicalObservationTab type="Nails" />
                        </TabsContent>
                        <TabsContent value="skin">
                            <PhysicalObservationTab type="Skin" />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>


            <div className="flex flex-col md:flex-row gap-4">
                <Button type="button" onClick={handleSaveClick} className="w-full text-lg py-6">
                    <Save className="mr-2" />
                    Save Patient
                </Button>
                <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleDiagnoseClick}
                    disabled={isLoading}
                    className="w-full text-lg py-6"
                >
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        Analyzing...
                        </>
                    ) : (
                        <>
                        <Bot className="mr-2" />
                        Get AI Diagnosis
                        </>
                    )}
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
