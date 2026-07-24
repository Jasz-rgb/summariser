import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function syncOrganizationToDatabase() {
  const { orgId } = await auth();

  if (!orgId) return null;

  // Already exists
  const existing = await prisma.organization.findUnique({
    where: {
      clerkOrgId: orgId,
    },
  });

  if (existing) return existing;

  const client = await clerkClient();

  const org = await client.organizations.getOrganization({
    organizationId: orgId,
  });

  const slug =
    org.slug ??
    `${org.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

  return prisma.organization.create({
    data: {
      clerkOrgId: org.id,
      name: org.name,
      slug,
    },
  });
}