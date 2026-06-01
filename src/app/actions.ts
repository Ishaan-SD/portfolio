"use server";

import { Resend } from "resend";

export interface ContactFormState {
  success: boolean;
  error?: string;
}

export async function sendEmail(values: { name: string; email: string; message: string }): Promise<ContactFormState> {
  try {
    const { name, email, message } = values;

    // Validate inputs server-side
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return { success: false, error: "All fields are required." };
    }

    const apiKey = process.env.RESEND_API_KEY;

    // Help the developer notice if the API key is not configured yet
    if (!apiKey || apiKey === "re_your_api_key_here") {
      console.warn("WARNING: Resend API Key is not configured in environment variables.");
      return { 
        success: false, 
        error: "Server configuration error: Resend API key is missing. Please add it to your .env.local file." 
      };
    }

    const resend = new Resend(apiKey);

    // Send email using Resend onboarding sandbox (only supports sending to the registered account email)
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "ishaandoddamani@gmail.com",
      subject: `New Portfolio Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; rounded: 12px; background-color: #ffffff;">
          <h2 style="color: #6d28d9; margin-top: 0; font-size: 20px; border-bottom: 2px solid #f4f4f5; padding-bottom: 10px;">
            New Contact Submission
          </h2>
          <div style="margin-top: 15px;">
            <p style="margin: 5px 0;"><strong>Sender Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #3b82f6;">${email}</a></p>
          </div>
          <div style="margin-top: 20px; padding: 15px; border-radius: 8px; background-color: #f8fafc; border: 1px solid #e2e8f0;">
            <p style="margin: 0; font-weight: bold; color: #475569; margin-bottom: 8px;">Message:</p>
            <p style="margin: 0; color: #0f172a; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</p>
          </div>
          <div style="margin-top: 30px; border-top: 1px solid #f4f4f5; padding-top: 15px; font-size: 11px; color: #a1a1aa; font-family: monospace;">
            Sent automatically from your portfolio server action.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend delivery failed:", error);
      return { success: false, error: error.message || "Failed to deliver message via Resend." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Failed in sendEmail server action:", err);
    return { success: false, error: err.message || "An unexpected server-side error occurred." };
  }
}
