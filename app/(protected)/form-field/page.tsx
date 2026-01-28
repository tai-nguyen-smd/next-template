'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { Form } from '@/components/custom/rhf/rhf-form';
import { FormField } from '@/components/custom/rhf/rhf-form-field';
import { Dropzone } from '@/components/ui/dropzone';
import { useState } from 'react';
import { FileItem } from '@/components/ui/file-item';

const formSchema = z.object({
  text: z.string().min(1, 'Text is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  textarea: z.string().min(1, 'Textarea is required'),
  select: z.string().min(1, 'Please select an option'),
  number: z.number().min(0, 'Number must be positive'),
  date: z.string().min(1, 'Date is required'),
  dateRange: z
    .object({
      from: z.string().nullable(),
      to: z.string().nullable(),
    })
    .nullable(),
  checkbox: z.array(z.string()).min(1, 'Select at least one option'),
  radio: z.string().min(1, 'Please select an option'),
  switch: z.boolean(),
  fileNames: z.array(z.string()).min(1, 'Select at least one file'),
});

type FormData = z.infer<typeof formSchema>;

export default function FormFieldPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      email: '',
      password: '',
      textarea: '',
      select: '',
      number: 0,
      date: '',
      dateRange: null,
      checkbox: [],
      radio: '',
      switch: false,
      fileNames: [],
    },
  });

  const [files, setFiles] = useState<File[]>([]);
  const onSubmit = async (data: FormData) => {
    console.log('Form data:', data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <CardTitle>FormField Demo</CardTitle>
            <CardDescription>
              Demo tất cả các type của FormField component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form form={form} schema={formSchema} onSubmit={onSubmit}>
              <FieldGroup>
                <FormField
                  name="text"
                  label="Text Input"
                  type="text"
                  placeholder="Enter text"
                  required
                />
                <FormField
                  name="email"
                  label="Email Input"
                  type="email"
                  placeholder="Enter email"
                  required
                />
                <FormField
                  name="password"
                  label="Password Input"
                  type="password"
                  placeholder="Enter password"
                  required
                />
                <FormField
                  name="textarea"
                  label="Textarea"
                  type="textarea"
                  placeholder="Enter text"
                  required
                />
                <FormField
                  name="select"
                  label="Select"
                  type="select"
                  placeholder="Select an option"
                  options={[
                    { label: 'Option 1', value: 'option1' },
                    { label: 'Option 2', value: 'option2' },
                    { label: 'Option 3', value: 'option3' },
                  ]}
                  required
                />
                <FormField
                  name="number"
                  label="Number Input"
                  type="number"
                  placeholder="Enter number"
                  prefix="$"
                  required
                />
                <FormField
                  name="date"
                  label="Date Picker"
                  type="date"
                  placeholder="Pick a date"
                  required
                />
                <FormField
                  name="dateRange"
                  label="Date Range Picker"
                  type="date-range"
                  placeholder="Pick a date range"
                  required
                />
                <FormField
                  name="checkbox"
                  label="Checkbox Group"
                  type="checkbox"
                  options={[
                    { label: 'Option A', value: 'a' },
                    { label: 'Option B', value: 'b' },
                    { label: 'Option C', value: 'c' },
                  ]}
                  layout="horizontal"
                  required
                />
                <FormField
                  name="radio"
                  label="Radio Group"
                  type="radio"
                  options={[
                    { label: 'Option X', value: 'x' },
                    { label: 'Option Y', value: 'y' },
                    { label: 'Option Z', value: 'z' },
                  ]}
                  layout="horizontal"
                  required
                />
                <FormField name="switch" label="Switch Toggle" type="switch" />
                <div className="flex justify-end">
                  <Button type="submit">Submit</Button>
                </div>

                <Dropzone
                  files={files}
                  description="PDF, images. Max 50MB per file."
                  accept={{ 'application/pdf': [], 'image/*': [] }}
                  onFilesChange={files => setFiles(files)}
                  onUploadRequest={files => console.log('UPLOAD HOOK', files)}
                />
                {files.map(file => (
                  <FileItem
                    key={file.name}
                    id={file.name}
                    file={file}
                    progress={0}
                    onRemove={filename =>
                      setFiles(files.filter(file => file.name !== filename))
                    }
                  />
                ))}
              </FieldGroup>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
