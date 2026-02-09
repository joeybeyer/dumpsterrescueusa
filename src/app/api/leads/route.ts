import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

// Disposable email domains to block
const DISPOSABLE_DOMAINS = [
  "mailinator.com",
  "tempmail.com",
  "guerrillamail.com",
  "10minutemail.com",
  "yopmail.com",
  "throwaway.email",
  "temp-mail.org",
  "fakeinbox.com",
  "trashmail.com",
  "maildrop.cc",
  "sharklasers.com",
  "guerrillamail.info",
  "grr.la",
  "guerrillamail.biz",
  "guerrillamail.de",
  "guerrillamail.net",
  "guerrillamail.org",
  "spam4.me"
];

// Spam prevention functions
function checkHoneypot(honeypot: string): string | null {
  if (honeypot && honeypot.trim() !== "") {
    return "Bot detected (honeypot)";
  }
  return null;
}

function checkTiming(formTimestamp: number): string | null {
  const now = Date.now();
  const elapsed = now - formTimestamp;
  // Less than 3 seconds is suspicious
  if (elapsed < 3000) {
    return "Form submitted too quickly";
  }
  return null;
}

function checkEmail(email: string): string | null {
  // Basic format check
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  // Check for disposable domains
  const domain = email.split("@")[1]?.toLowerCase();
  if (domain && DISPOSABLE_DOMAINS.includes(domain)) {
    return "Disposable email detected";
  }

  return null;
}

function checkPhone(phone: string): string | null {
  // Remove non-digits
  const digits = phone.replace(/\D/g, "");

  // Must be 10-11 digits (US format)
  if (digits.length < 10 || digits.length > 11) {
    return "Invalid phone number length";
  }

  // Area code can't start with 0 or 1
  const areaCode = digits.length === 11 ? digits.substring(1, 4) : digits.substring(0, 3);
  if (areaCode.startsWith("0") || areaCode.startsWith("1")) {
    return "Invalid area code";
  }

  // Reject 555-01xx (fictional numbers)
  if (areaCode === "555" && digits.substring(digits.length - 7, digits.length - 4) === "01") {
    return "Fictional phone number detected";
  }

  // Reject all same digits
  if (/^(\d)\1+$/.test(digits)) {
    return "Invalid phone number (all same digits)";
  }

  // Reject sequential digits
  if (digits === "1234567890" || digits === "0987654321") {
    return "Invalid phone number (sequential)";
  }

  return null;
}

function checkName(name: string): string | null {
  // Minimum 2 characters
  if (name.length < 2) {
    return "Name too short";
  }

  // Reject if contains URLs
  if (/https?:\/\/|www\./i.test(name)) {
    return "Name contains URL";
  }

  // Reject if contains HTML
  if (/<[^>]*>/i.test(name)) {
    return "Name contains HTML";
  }

  // Reject gibberish (no vowels)
  const vowels = name.toLowerCase().match(/[aeiou]/g);
  if (!vowels && name.length > 2) {
    return "Name appears to be gibberish";
  }

  // Reject numbers-only
  if (/^\d+$/.test(name)) {
    return "Name is numbers only";
  }

  return null;
}

async function checkDuplicate(email: string, phone: string): Promise<string | null> {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const existingLead = await prisma.lead.findFirst({
    where: {
      OR: [{ email }, { phone }],
      createdAt: { gte: oneDayAgo },
      spam: false
    }
  });

  if (existingLead) {
    return "Duplicate submission within 24 hours";
  }

  return null;
}

async function sendEmailNotification(lead: {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zipCode: string;
  projectType: string;
  dumpsterSize: string;
  source: string;
}) {
  // Skip if SMTP not configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("SMTP not configured, skipping email notification");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const html = `
    <h2>New Lead: ${lead.name} - ${lead.city || "Unknown City"}</h2>
    <table style="border-collapse: collapse; width: 100%;">
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.name}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.email}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.phone}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Location</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.city}, ${lead.state} ${lead.zipCode}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Project Type</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.projectType}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Dumpster Size</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.dumpsterSize}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Source</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.source}</td></tr>
    </table>
  `;

  try {
    await transporter.sendMail({
      from: "Dumpster Rescue LLC <noreply@dumpsterrescueusa.com>",
      to: process.env.ADMIN_EMAIL || "dumpsterrescue@gmail.com",
      subject: `New Lead: ${lead.name} - ${lead.city || "Unknown City"}`,
      html
    });
  } catch (error) {
    console.error("Failed to send email notification:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      city,
      state,
      zipCode,
      projectType,
      dumpsterSize,
      message,
      source,
      honeypot,
      formTimestamp
    } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ success: true }); // Always return success to prevent bot reconnaissance
    }

    // Run spam checks
    let spamReason: string | null = null;

    spamReason = checkHoneypot(honeypot || "");
    if (!spamReason) spamReason = checkTiming(formTimestamp || 0);
    if (!spamReason) spamReason = checkEmail(email);
    if (!spamReason && phone) spamReason = checkPhone(phone);
    if (!spamReason) spamReason = checkName(name);
    if (!spamReason) spamReason = await checkDuplicate(email, phone || "");

    const isSpam = spamReason !== null;

    // Save to database
    await prisma.lead.create({
      data: {
        type: "quote",
        name,
        email,
        phone: phone || null,
        city: city || null,
        state: state || null,
        zipCode: zipCode || null,
        projectType: projectType || null,
        dumpsterSize: dumpsterSize || null,
        message: message || null,
        source: source || null,
        spam: isSpam,
        spamReason: spamReason || null
      }
    });

    // Send email notification for valid leads
    if (!isSpam) {
      await sendEmailNotification({
        name,
        email,
        phone: phone || "",
        city: city || "",
        state: state || "",
        zipCode: zipCode || "",
        projectType: projectType || "",
        dumpsterSize: dumpsterSize || "",
        source: source || ""
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ success: true }); // Always return success
  }
}

