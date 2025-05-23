import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/dasboard/form-message";
import { SubmitButton } from "@/components/dasboard/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="container max-w-2xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reset Password</h1>
        <Button variant="outline" asChild>
          <Link href="/protected/profile">Back to Profile</Link>
        </Button>
      </div>

      <div className="space-y-8 rounded-lg border bg-card p-8">
        <div className="space-y-2">
          <p className="text-muted-foreground">
            Enter your new password below. Make sure it's secure and you'll
            remember it.
          </p>
        </div>

        <form className="space-y-6" action={resetPasswordAction}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your new password"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your new password"
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <SubmitButton>Update Password</SubmitButton>
            <Button type="button" variant="outline" asChild>
              <Link href="/protected/profile">Cancel</Link>
            </Button>
          </div>

          <div className="mt-4">
            {searchParams && <FormMessage message={searchParams} />}
          </div>
        </form>
      </div>
    </div>
  );
}
