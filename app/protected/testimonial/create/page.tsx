"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { useTestimonials } from "@/hooks/testimonial-hooks";
import { TestimonialRelation } from "@/types/testimonials";
import { useRouter } from "next/navigation";
import { useState } from "react";

const relationOptions: TestimonialRelation[] = [
  "client",
  "coworker",
  "manager",
  "team member",
  "project partners",
  "lecturer",
  "industry peer",
  "workshop attende",
  "prospective client",
  "other",
];

export default function CreateTestimonialPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [relation, setRelation] = useState<TestimonialRelation | "">("");
  const [customRelation, setCustomRelation] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const { createTestimonial } = useTestimonials();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!relation) return;

    const success = await createTestimonial(
      name,
      email,
      relation,
      message,
      relation === "other" ? customRelation : undefined
    );

    if (success) {
      router.push("/protected/testimonial");
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Create New Testimonial
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="relation">Relation</Label>
          <Select
            onValueChange={(val) => setRelation(val as TestimonialRelation)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select relation" />
            </SelectTrigger>
            <SelectContent>
              {relationOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {relation === "other" && (
          <div className="space-y-2">
            <Label htmlFor="customRelation">Specify Relation</Label>
            <Input
              id="customRelation"
              value={customRelation}
              onChange={(e) => setCustomRelation(e.target.value)}
              required
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Save Testimonial</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/protected/testimonial")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
