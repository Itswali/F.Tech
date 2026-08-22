import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";

interface FormValues {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { name: "", phone: "", email: "", message: "" } });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    console.log("Contact form submitted:", data);
    toast.success("Message sent! We'll get back to you shortly.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Field label="Name" error={errors.name?.message}>
        <Input
          {...register("name", { required: "Please enter your name" })}
          placeholder="Jane Doe"
          aria-invalid={!!errors.name}
          className={cn(errors.name && "border-destructive")}
        />
      </Field>

      <Field label="Phone" error={errors.phone?.message}>
        <Input
          {...register("phone", {
            required: "Please enter your phone number",
            pattern: { value: /^[+\d][\d\s()-]{6,}$/, message: "Enter a valid phone number" },
          })}
          placeholder="0318 5114774"
          inputMode="tel"
          aria-invalid={!!errors.phone}
          className={cn(errors.phone && "border-destructive")}
        />
      </Field>

      <Field label="Email (optional)" error={errors.email?.message}>
        <Input
          {...register("email", {
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
          })}
          type="email"
          placeholder="jane@example.com"
          aria-invalid={!!errors.email}
          className={cn(errors.email && "border-destructive")}
        />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <Textarea
          {...register("message", {
            required: "Please enter a message",
            minLength: { value: 10, message: "Message must be at least 10 characters" },
          })}
          placeholder="How can we help you?"
          rows={5}
          aria-invalid={!!errors.message}
          className={cn(errors.message && "border-destructive")}
        />
      </Field>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full">
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
