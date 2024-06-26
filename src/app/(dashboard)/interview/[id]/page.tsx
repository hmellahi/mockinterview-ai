import InterviewPageContent from "@/app/(dashboard)/interview/[id]/components/InterviewPageContent";
import PageWrapper from "@/components/ui/PageWrapper";
import { createInterview } from "@/server-actions/interview/interview.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { v4 } from "uuid";

export const metadata: Metadata = {
  title: "Mock Interview",
};

export default async function Interview({
  params,
}: {
  params: { id: string };
}) {
  const interviewId = params.id as string;
  try{
    await createInterview(interviewId);
  }catch(e){
    const newInterviewId = v4();
    return redirect(newInterviewId)
  }
  
  return (
    <PageWrapper metadata={metadata} className="overflow-y-hidden">
      <InterviewPageContent params={params} />
    </PageWrapper>
  );
}
