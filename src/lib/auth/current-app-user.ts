import { currentUser } from "@clerk/nextjs/server";
import type { AppUser } from "@/components/app-shell/user-chip";

/** First letter of the first two words, e.g. "Transportes Sur" → "TS". */
function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * The signed-in Clerk account reduced to what the app shell renders, or `null`
 * on the public screens where there may be no session.
 *
 * `meta` stays empty until the Clerk webhook syncs identity into the `users`
 * table and `users.role` becomes readable (architecture-context.md, Auth and
 * Access Model).
 */
export async function getCurrentAppUser(): Promise<AppUser | null> {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const name =
    user.fullName ?? user.username ?? user.primaryEmailAddress?.emailAddress ?? "";

  return {
    name,
    initials: initialsOf(name),
    meta: null,
  };
}
