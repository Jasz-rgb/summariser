import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function syncUserToDatabase() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return null;
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkUserId: clerkUser.id,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
    const name =
      `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
      "User";

    return await prisma.user.create({
      data: {
        clerkUserId: clerkUser.id,
        email,
        name,
      },
    });
  } catch (error) {
    console.error("Error syncing user from Clerk:", error);
    throw error;
  }
}