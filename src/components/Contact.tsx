"use client";

import React, { useState } from "react";
import { Mail, MapPin, Phone, CheckCircle2, Sparkles, Send, Loader2, AlertCircle } from "lucide-react";
import { sendEmail } from "../app/actions";

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!values.name.trim()) {
      tempErrors.name = "Full name is required.";
      isValid = false;
    } else if (values.name.trim().length < 2) {
      tempErrors.name = "Name must be at least 2 characters.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim()) {
      tempErrors.email = "Email address is required.";
      isValid = false;
    } else if (!emailRegex.test(values.email.trim())) {
      tempErrors.email = "Please provide a valid email format.";
      isValid = false;
    }

    if (!values.message.trim()) {
      tempErrors.message = "Message content is required.";
      isValid = false;
    } else if (values.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters long.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear field error instantly on input
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await sendEmail(values);
      if (result.success) {
        setIsSubmitted(true);
        setValues({ name: "", email: "", message: "" });
      } else {
        setSubmitError(result.error || "Failed to deliver message. Please try again.");
      }
    } catch (err) {
      setSubmitError("A connection error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-zinc-950/20">
      {/* Decorative background glow rings */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-brand-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-bold tracking-wider text-brand-500 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Connect
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Get In Touch
          </h2>
          <p className="max-w-md text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Have a project in mind, a freelance inquiry, or just want to swap ideas? Drop a line and let&apos;s make it happen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Direct Info Details */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left h-full justify-between">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-foreground">
                Let&apos;s build something exceptional.
              </h3>
              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-400 leading-relaxed">
                I&apos;m always excited to collaborate on new digital tools, design structures, responsive layouts, or full-stack React systems. Send a message, and I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {/* Direct Channels Cards */}
            <div className="space-y-4 my-8">
              <div className="flex items-center gap-4 p-4 rounded-2xl glassmorphism border border-card-border">
                <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/10 text-brand-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Email Direct</span>
                  <p className="text-sm font-bold text-foreground">ishaandoddamani@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl glassmorphism border border-card-border">
                <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/10 text-brand-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Mobile Number</span>
                  <p className="text-sm font-bold text-foreground">+91 8850356096</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl glassmorphism border border-card-border">
                <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/10 text-brand-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Base Location</span>
                  <p className="text-sm font-bold text-foreground">Navi Mumbai - 410218, India</p>
                </div>
              </div>
            </div>

            {/* Social Grids */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Ishaan-SD"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-card-border hover:border-brand-500/40 text-zinc-600 dark:text-zinc-300 hover:text-brand-500 transition-all duration-300 cursor-pointer"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ishaan-doddamani-31971a186/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-card-border hover:border-brand-500/40 text-zinc-600 dark:text-zinc-300 hover:text-brand-500 transition-all duration-300 cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form portal */}
          <div className="lg:col-span-7 w-full">
            <div className="p-6 sm:p-8 rounded-3xl glassmorphism border border-card-border shadow-xl min-h-[440px] flex flex-col justify-center relative">
              
              {isSubmitted ? (
                // Delighful Success Card Message
                <div className="text-center flex flex-col items-center justify-center gap-5 py-8 animate-fade-in">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Message Dispatched!
                  </h3>
                  <p className="max-w-md text-sm sm:text-base text-zinc-700 dark:text-zinc-400 leading-relaxed">
                    Thank you, your connection request was sent successfully. Ishaan will be in touch with you very shortly!
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold bg-zinc-200 dark:bg-zinc-800 text-foreground hover:bg-brand-600 hover:text-white transition-all duration-300 uppercase tracking-wider cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                // Standard Contact Form
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="e.g. Jane Doe"
                      disabled={isSubmitting}
                      className={`w-full h-12 px-4 rounded-xl border bg-black/5 dark:bg-white/5 text-foreground placeholder-zinc-500 dark:placeholder-zinc-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all duration-300 ${
                        errors.name ? "border-red-500/60" : "border-card-border"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-xs font-semibold text-red-500 animate-fade-in">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="e.g. jane@company.com"
                      disabled={isSubmitting}
                      className={`w-full h-12 px-4 rounded-xl border bg-black/5 dark:bg-white/5 text-foreground placeholder-zinc-500 dark:placeholder-zinc-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all duration-300 ${
                        errors.email ? "border-red-500/60" : "border-card-border"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-xs font-semibold text-red-500 animate-fade-in">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">
                      Message Body
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project context..."
                      rows={5}
                      disabled={isSubmitting}
                      className={`w-full p-4 rounded-xl border bg-black/5 dark:bg-white/5 text-foreground placeholder-zinc-500 dark:placeholder-zinc-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all duration-300 resize-none ${
                        errors.message ? "border-red-500/60" : "border-card-border"
                      }`}
                    />
                    {errors.message && (
                      <span className="text-xs font-semibold text-red-500 animate-fade-in">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-start gap-2.5 text-xs sm:text-sm animate-fade-in font-medium">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-13 rounded-xl font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/35 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Transmitting Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
