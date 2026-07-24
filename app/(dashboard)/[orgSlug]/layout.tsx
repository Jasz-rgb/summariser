import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { syncOrganizationToDatabase } from "@/lib/sync-organization";
import { syncMembershipToDatabase } from "@/lib/sync-membership";

interface OrgLayoutProps {
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>; //promise
}

export default async function OrgLayout({ children, params }: OrgLayoutProps) {
  const { orgSlug } = await params;
  const { userId } = await auth();
  await syncOrganizationToDatabase();
  await syncMembershipToDatabase();
  if (!userId) {
    redirect("/sign-in");
  }

  if (!orgSlug) {       // see if orgslug is defined
    console.error("orgSlug is undefined");
    redirect("/dashboard");
  }
  console.log("====== ORG DEBUG ======");
  console.log("URL slug:", orgSlug);

  const { orgId } = await auth();
  console.log("Clerk orgId:", orgId);
  console.log("Clerk userId:", userId);
  const organization = await prisma.organization.findUnique({
    where: { slug: orgSlug },
  });
  console.log("DB organization:", organization);
  if (!organization) {
    redirect("/select-org");
  }

  const membership = await prisma.organizationMember.findFirst({
    where: {
      organizationId: organization.id,
      user: { clerkUserId: userId },
    },
  });
  console.log("Membership:", membership);
  console.log("=======================");
  if (!membership) {
    redirect("/select-org");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Organization Banner */}
      <Card className="w-full shadow-sm border">
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                {organization.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                Organization workspace
              </p>
            </div>
            <Badge variant="outline" className="px-4 py-1.5 font-medium">
              {membership.role}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <main className="py-8">
        <div className="container mx-auto px-4">{children}</div>
      </main>
    </div>
  );
}
