import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function syncMembershipToDatabase() {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) return;

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  const dbOrganization = await prisma.organization.findUnique({
    where: {
      clerkOrgId: orgId,
    },
  });

  if (!dbUser || !dbOrganization) return;

  const existing = await prisma.organizationMember.findFirst({
    where: {
      userId: dbUser.id,
      organizationId: dbOrganization.id,
    },
  });

  if (existing) return;

  const client = await clerkClient();

  const memberships =
    await client.users.getOrganizationMembershipList({
      userId,
    });

  const membership = memberships.data.find(
    (m) => m.organization.id === orgId
  );
  console.log("===== SYNC MEMBERSHIP =====");
  console.log("DB User:", dbUser);
  console.log("DB Organization:", dbOrganization);
  console.log("Clerk Memberships:", memberships.data);
  console.log("Matched Membership:", membership);

  await prisma.organizationMember.create({
    data: {
      userId: dbUser.id,
      organizationId: dbOrganization.id,
      role: membership?.role ?? "org:member",
    },
  });
}