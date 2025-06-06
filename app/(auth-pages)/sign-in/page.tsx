import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/dashboard/form-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-[Audiowide] tracking-wide text-white uppercase">
          Access For The OG Only
        </h1>
        <p className="text-xxs text-white/50">
          You ain&apos;t Glassesboyy? Then what you doin&apos; here, bro? This
          spot ain&apos;t for you dip out before you get caught 👁️👄👁️
        </p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white text-xs">
            Email
          </Label>
          <Input
            name="email"
            required
            className="bg-background/50 border-border/40 text-white"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-white text-xs">
              Password
            </Label>
          </div>
          <Input
            type="password"
            name="password"
            required
            className="bg-background/50 border-border/40 text-white"
          />
        </div>
        <div className="flex justify-center pt-2">
          <Button
            variant="gradient"
            formAction={signInAction}
            type="submit"
            size={"sm"}
          >
            Access Dashboard
          </Button>
        </div>
        <FormMessage message={searchParams} />
      </form>
    </div>
  );
}
