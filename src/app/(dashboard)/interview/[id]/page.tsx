import PageWrapper from "@/components/ui/PageWrapper";
import { Metadata } from "next";
import InterviewPageContent from "./components/interviewPageContent";

export const metadata: Metadata = {
  title: "Mock Interview",
};

export default async function Interview({
  params,
}: {
  params: { id: string };
}) {
  return (
    <PageWrapper metadata={metadata} className="overflow-y-hidden">
      <InterviewPageContent params={params} />
    </PageWrapper>
  );
}
