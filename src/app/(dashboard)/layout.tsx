import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

/**
 * Server Layout Guard for the authenticated area (architecture-context.md,
 * Auth and Access Model): the session is verified server-side before any
 * dashboard route renders, rather than in `proxy.ts`.
 *
 * This only checks that a session exists. Role gating and the redirect to the
 * role-selection onboarding step land here once the Clerk webhook syncs
 * identity into the `users` table and `users.role` is readable.
 */
export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return children;
}
