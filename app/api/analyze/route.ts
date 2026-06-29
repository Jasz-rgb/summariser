import { NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/gemini";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    //1.check auth
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Please sign in" }, { status: 401 });
    }

    const { documentId, organizationId, analysisType } = await request.json();  //2.get request data
    if (!documentId || !organizationId) {
      return NextResponse.json(
        { error: "Missing document or organization ID" },
        { status: 400 },
      );
    }

    const document = await prisma.document.findFirst({  //3.Find document
      where: {
        id: documentId,
        organization: {
          clerkOrgId: organizationId,
          members: {
            some: {
              user: { clerkUserId: userId },
            },
          },
        },
      },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Document not found or no access" },
        { status: 404 },
      );
    }

    const content = document.content || document.name;   //4.get content
    if (!content || content.trim().length < 5) {
      return NextResponse.json(
        { error: "Document has no content to analyze" },
        { status: 400 },
      );
    }
    const summary = await analyzeWithGemini(content, analysisType);  //5.run a analysis
    const updatedDocument = await prisma.document.update({      //6.savee
      where: { id: documentId },
      data: {
        aiSummary: summary,
        aiKeywords: ["analyzed"],
        sentiment: "analyzed",
      },
    });

    return NextResponse.json({      //7.return success
      success: true,
      summary,
      document: {
        id: updatedDocument.id,
        name: updatedDocument.name,
        aiSummary: updatedDocument.aiSummary,
      },
    });
  } catch (error: any) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed: " + error.message },
      { status: 500 },
    );
  }
}
