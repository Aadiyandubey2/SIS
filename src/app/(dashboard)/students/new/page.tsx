"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check, Upload } from "lucide-react";
import { toast } from "sonner";

const steps = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Academic" },
  { id: 3, name: "Documents" },
];

interface FormErrors {
  [key: string]: string;
}

export default function NewStudentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    parentName: "",
    address: "",
    class: "",
    section: "",
    rollNo: "",
    previousSchool: "",
    admissionDate: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.dob) newErrors.dob = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
      if (!formData.parentName.trim()) newErrors.parentName = "Parent name is required";
    }

    if (step === 2) {
      if (!formData.class) newErrors.class = "Class is required";
      if (!formData.section) newErrors.section = "Section is required";
      if (!formData.rollNo.trim()) newErrors.rollNo = "Roll number is required";
      if (!formData.admissionDate) newErrors.admissionDate = "Admission date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    toast.success("Student registered successfully", {
      description: `${formData.firstName} ${formData.lastName} has been added to Class ${formData.class}-${formData.section}.`,
    });
    router.push("/students");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Register New Student
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Fill in the student details below
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-0">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors",
                  currentStep > step.id
                    ? "bg-foreground text-background"
                    : currentStep === step.id
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  currentStep >= step.id
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 mx-4 h-px",
                  currentStep > step.id ? "bg-foreground" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card className="border border-border shadow-none">
        <CardContent className="p-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-sm">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  className={cn("h-9", errors.firstName && "border-red-400")}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-sm">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  className={cn("h-9", errors.lastName && "border-red-400")}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="dob" className="text-sm">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => updateField("dob", e.target.value)}
                  className={cn("h-9", errors.dob && "border-red-400")}
                />
                {errors.dob && (
                  <p className="text-xs text-red-500">{errors.dob}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(v) => v !== null && updateField("gender", v)}
                >
                  <SelectTrigger
                    className={cn("h-9", errors.gender && "border-red-400")}
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-xs text-red-500">{errors.gender}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">Blood Group</Label>
                <Select
                  value={formData.bloodGroup}
                  onValueChange={(v) => v !== null && updateField("bloodGroup", v)}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(
                      (bg) => (
                        <SelectItem key={bg} value={bg}>
                          {bg}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-sm">
                  Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className={cn("h-9", errors.phone && "border-red-400")}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={cn("h-9", errors.email && "border-red-400")}
                  placeholder="student@school.edu"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="parentName" className="text-sm">
                  Parent/Guardian Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => updateField("parentName", e.target.value)}
                  className={cn("h-9", errors.parentName && "border-red-400")}
                  placeholder="Enter parent name"
                />
                {errors.parentName && (
                  <p className="text-xs text-red-500">{errors.parentName}</p>
                )}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="address" className="text-sm">
                  Address
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className="h-9"
                  placeholder="Enter full address"
                />
              </div>
            </div>
          )}

          {/* Step 2: Academic */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-sm">
                  Class <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.class}
                  onValueChange={(v) => v !== null && updateField("class", v)}
                >
                  <SelectTrigger
                    className={cn("h-9", errors.class && "border-red-400")}
                  >
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {["1","2","3","4","5","6","7","8","9","10","11","12"].map((c) => (
                      <SelectItem key={c} value={c}>
                        Class {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.class && (
                  <p className="text-xs text-red-500">{errors.class}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">
                  Section <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.section}
                  onValueChange={(v) => v !== null && updateField("section", v)}
                >
                  <SelectTrigger
                    className={cn("h-9", errors.section && "border-red-400")}
                  >
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A", "B", "C", "D"].map((s) => (
                      <SelectItem key={s} value={s}>
                        Section {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.section && (
                  <p className="text-xs text-red-500">{errors.section}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="rollNo" className="text-sm">
                  Roll Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="rollNo"
                  value={formData.rollNo}
                  onChange={(e) => updateField("rollNo", e.target.value)}
                  className={cn("h-9", errors.rollNo && "border-red-400")}
                  placeholder="Enter roll number"
                />
                {errors.rollNo && (
                  <p className="text-xs text-red-500">{errors.rollNo}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="admissionDate" className="text-sm">
                  Admission Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="admissionDate"
                  type="date"
                  value={formData.admissionDate}
                  onChange={(e) => updateField("admissionDate", e.target.value)}
                  className={cn(
                    "h-9",
                    errors.admissionDate && "border-red-400"
                  )}
                />
                {errors.admissionDate && (
                  <p className="text-xs text-red-500">
                    {errors.admissionDate}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="previousSchool" className="text-sm">
                  Previous School
                </Label>
                <Input
                  id="previousSchool"
                  value={formData.previousSchool}
                  onChange={(e) =>
                    updateField("previousSchool", e.target.value)
                  }
                  className="h-9"
                  placeholder="Enter previous school name"
                />
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <Label className="text-sm">Student Photo</Label>
                <div className="flex items-center justify-center rounded-md border-2 border-dashed border-border py-10 px-6 hover:border-muted-foreground/50 transition-colors cursor-pointer">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 2MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">Documents</Label>
                <div className="flex items-center justify-center rounded-md border-2 border-dashed border-border py-10 px-6 hover:border-muted-foreground/50 transition-colors cursor-pointer">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Upload birth certificate, transfer certificate, etc.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, PNG, JPG up to 5MB each
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h3 className="text-sm font-medium mb-3">Summary</h3>
                <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name: </span>
                    <span className="font-medium">
                      {formData.firstName} {formData.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gender: </span>
                    <span className="font-medium">
                      {formData.gender || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Class: </span>
                    <span className="font-medium">
                      {formData.class
                        ? `${formData.class}-${formData.section}`
                        : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Roll No: </span>
                    <span className="font-medium">
                      {formData.rollNo || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email: </span>
                    <span className="font-medium">
                      {formData.email || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone: </span>
                    <span className="font-medium">
                      {formData.phone || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/students")}
          className="h-9"
        >
          Cancel
        </Button>
        <div className="flex gap-2">
          {currentStep > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              className="h-9 gap-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Previous
            </Button>
          )}
          {currentStep < 3 ? (
            <Button size="sm" onClick={handleNext} className="h-9 gap-1">
              Next <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button size="sm" onClick={handleSubmit} className="h-9 gap-1">
              <Check className="h-3.5 w-3.5" /> Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
