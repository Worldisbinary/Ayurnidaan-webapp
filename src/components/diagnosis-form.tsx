'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { SuggestDiagnosesInput } from "@/ai/flows/suggest-diagnoses";

import { Button } from "@/components/ui/button";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const diagnosisSchema = z.object({
  age: z.string().min(1, 'Age is required.'),
  gender: z.string().min(1, 'Gender is required.'),
  location: z.string().min(1, 'Location is required.'),
  lifestyle: z.string().min(1, 'Lifestyle details are required.'),
  medicalHistory: z.string().min(10, 'Medical history is required (min. 10 characters).'),
  symptoms: z.string().min(10, 'Please provide detailed symptoms (min. 10 characters).'),
  physicalObservations: z.string().min(10, 'Please provide detailed observations (min. 10 characters).'),
});

type DiagnosisFormValues = z.infer<typeof diagnosisSchema>;

interface DiagnosisFormProps {
  onDiagnose: (data: SuggestDiagnosesInput) => Promise<void>;
  isLoading: boolean;
}

export function DiagnosisForm({ onDiagnose, isLoading }: DiagnosisFormProps) {
  const form = useForm<DiagnosisFormValues>({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: {
      age: "",
      gender: "",
      location: "",
      lifestyle: "",
      medicalHistory: "",
      symptoms: "",
      physicalObservations: "",
    },
  });

  async function onSubmit(values: DiagnosisFormValues) {
    const patientDetails = `Age: ${values.age}, Gender: ${values.gender}, Location: ${values.location}, Lifestyle: ${values.lifestyle}`;
    const actionInput: SuggestDiagnosesInput = {
      patientDetails,
      medicalHistory: values.medicalHistory,
      symptoms: values.symptoms,
      physicalObservations: values.physicalObservations,
    };
    await onDiagnose(actionInput);
  }

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Patient Intake</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="bg-background/80">
              <CardHeader>
                <CardTitle className="text-xl font-headline">Patient Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="age" render={({ field }) => ( <FormItem> <FormLabel>Age</FormLabel> <FormControl> <Input placeholder="e.g., 35" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                  <FormField control={form.control} name="gender" render={({ field }) => ( <FormItem> <FormLabel>Gender</FormLabel> <FormControl> <Input placeholder="e.g., Male, Female, Other" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                </div>
                <FormField control={form.control} name="location" render={({ field }) => ( <FormItem> <FormLabel>Location</FormLabel> <FormControl> <Input placeholder="e.g., City, Country" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="lifestyle" render={({ field }) => ( <FormItem> <FormLabel>Lifestyle</FormLabel> <FormControl> <Textarea placeholder="Describe diet, exercise, stress levels, etc." {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
              </CardContent>
            </Card>

            <FormField control={form.control} name="medicalHistory" render={({ field }) => ( <FormItem> <FormLabel className="text-xl font-headline">Medical History</FormLabel> <FormControl> <Textarea rows={4} placeholder="Previous illnesses, treatments, allergies..." {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="symptoms" render={({ field }) => ( <FormItem> <FormLabel className="text-xl font-headline">Symptom Record</FormLabel> <FormControl> <Textarea rows={6} placeholder="Digestive, respiratory, skin, mental state..." {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name="physicalObservations" render={({ field }) => ( <FormItem> <FormLabel className="text-xl font-headline">Physical Observations</FormLabel> <FormControl> <Textarea rows={4} placeholder="Describe tongue, nails, skin, eyes..." {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
            
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
