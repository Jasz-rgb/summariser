import { NextResponse } from "next/server";
import { deleteFromBlob } from "@/lib/blob";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ documentId: string }>;
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { documentId } = await params;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const document = await prisma.document.findUnique({  //get doc
      where: { id: documentId },
      include: {
        organization: {
          include: {
            members: {
              where: {
                user: { clerkUserId: userId },
              },
            },
          },
        },
      },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 },
      );
    }

    if (document.organization.members.length === 0) {
      return NextResponse.json(
        { error: "You do not have permission to delete this document" },
        { status: 403 },
      );
    }

    if (document.fileUrl) {               //delete file from vercelblob if there
      try {
        await deleteFromBlob(document.fileUrl);
      } catch (error) {
        console.error("Failed to delete from blob:", error);    //just continue with even if fails
      }
    }

    await prisma.document.delete({  //dell
      where: { id: documentId },
    });

    return NextResponse.json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete document error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete document" },
      { status: 500 },
    );
  }
}
