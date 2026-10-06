"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to send message.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="font-pp-neue-montreal-mono text-foreground text-xs md:text-sm"
        >
          NAME
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="border-foreground font-pp-neue-montreal text-foreground focus:border-foreground w-full border-b bg-transparent py-3 text-base outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="font-pp-neue-montreal-mono text-foreground text-xs md:text-sm"
        >
          EMAIL
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="border-foreground font-pp-neue-montreal text-foreground focus:border-foreground w-full border-b bg-transparent py-3 text-base outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="phone"
          className="font-pp-neue-montreal-mono text-foreground text-xs md:text-sm"
        >
          PHONE
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="border-foreground font-pp-neue-montreal text-foreground focus:border-foreground w-full border-b bg-transparent py-3 text-base outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-pp-neue-montreal-mono text-foreground text-xs md:text-sm"
        >
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="border-foreground font-pp-neue-montreal text-foreground focus:border-foreground w-full resize-y border-b bg-transparent py-3 text-base outline-none"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="font-pp-neue-montreal-mono bg-secondary text-foreground hover:bg-secondary/90 cursor-pointer rounded-px px-5 py-2.5 text-xs tracking-wide uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 md:px-6 md:py-3"
        >
          {status === "loading" ? "Sending..." : "Send message"}
        </button>
      </div>

      {status === "success" && (
        <p className="font-pp-neue-montreal text-foreground text-sm md:text-base">
          Thanks — your message has been sent. We&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="font-pp-neue-montreal text-sm text-red-600 md:text-base">
          {error}
        </p>
      )}
    </form>
  );
}
