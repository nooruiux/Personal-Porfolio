"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Section } from "@/components/layout";
import {
  BrandIcon,
  Button,
  Icon,
  Input,
  SectionHeading,
  Textarea,
} from "@/components/ui";
import { Reveal } from "@/components/shared/Reveal";
import { site } from "@/data/site";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Tell me a little more (10+ characters)"),
});

type FormValues = z.infer<typeof schema>;

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Contact — validated form (react-hook-form + zod) plus direct links.
 *
 * Submission: POSTs JSON to `NEXT_PUBLIC_CONTACT_ENDPOINT` (e.g. a Formspree
 * URL or an API route) when set; otherwise falls back to opening the visitor's
 * mail client. See README → "Contact form".
 */
export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        const body = encodeURIComponent(
          `${values.message}\n\n— ${values.name} (${values.email})`,
        );
        const subject = encodeURIComponent(
          `Portfolio enquiry from ${values.name}`,
        );
        window.location.assign(
          `mailto:${site.email}?subject=${subject}&body=${body}`,
        );
      }
      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact" muted aria-label="Contact">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
        <Reveal className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Contact"
            title="Let's work together"
            description="Have a project in mind or just want to say hi? Send a message and I'll get back to you."
          />
          <ul className="flex flex-col gap-3 text-text-secondary">
            <li className="flex items-center gap-3">
              <Icon name="mail" size="sm" color="brand" />
              <a href={`mailto:${site.email}`} className="hover:text-brand">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="map-pin" size="sm" color="brand" />
              {site.location}
            </li>
          </ul>
          <ul className="flex gap-2">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-default text-text-secondary transition duration-fast ease-standard hover:border-brand hover:text-brand"
                >
                  <BrandIcon name={social.brand} size="md" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 rounded-lg border border-border-default bg-surface-card p-6 sm:p-8"
          >
            <Input
              label="Name"
              required
              autoComplete="name"
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Email"
              type="email"
              required
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Textarea
              label="Message"
              required
              rows={5}
              error={errors.message?.message}
              {...register("message")}
            />

            <Button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <Icon name="loader" size="sm" className="animate-spin" />
              ) : (
                <Icon name="send" size="sm" />
              )}
              {status === "submitting" ? "Sending…" : "Send message"}
            </Button>

            <p aria-live="polite" className="min-h-[1.25rem] text-sm">
              {status === "success" ? (
                <span className="text-brand">
                  Thanks — your message is on its way.
                </span>
              ) : status === "error" ? (
                <span className="text-brand-accent">
                  Something went wrong. Email me directly at {site.email}.
                </span>
              ) : null}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
