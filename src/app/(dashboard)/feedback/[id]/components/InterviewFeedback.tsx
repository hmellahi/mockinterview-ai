"use client";

import Spinner from "@/components/svgs/Spinner";
import Headline from "@/components/ui/Headline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchInterviewFeedback } from "@/server-actions/interview/interview.actions";
import { useEffect, useState } from "react";
import { AnswersFeedback } from "./AnswersFeedback";
export default function InterviewFeedback({
  initialInterviewData,
}: {
  initialInterviewData: any;
}) {
  let [interview, setInterview] = useState(initialInterviewData);
  useEffect(() => {
    if (interview?.status !== "IN_PROGRESS") {
      return;
    }
    // each 1 seconds fetch the feedback
    // if its still IN_PROGRESS (feedback.status)
    // otherwise display it
    const interval = setInterval(async () => {
      interview = await fetchInterviewFeedback(interview.id);
      setInterview({ ...interview });
      if (interview?.status !== "IN_PROGRESS") {
        clearInterval(interval);
      }
    }, 1000);
  });

  if (!interview) {
    return (
      <div className="flex justify-center items-center h-full flex-col gap-4 mb-[4rem]">
        {/* <CatLoader width={400} height={400} /> */}
        <Spinner className="animate-spin h-10 w-10 !text-primary" />
        <h2 className="text-2xl font-semibold">
          BehaveWise is generating interview a report
        </h2>
        <p>
          You can check the results later on the <span>Interviews History</span>{" "}
          page
        </p>
      </div>
    );
  }

  // make a list of them..
  const weaknesses = [
    "Occasionally jumps between different topics and experiences, leading to a lack of clarity in responses",
    "Could work on providing more specific and concise answers to interview questions",
    "Salary expectation could be more research-based and tailored to the company and role",
  ];

  const stenghts = [
    "Candidate has relevant experience in software engineering and working on innovative projects",
    "Demonstrates a proactive approach to learning and seeking feedback",
    "Asks thoughtful questions about company culture and the ideal candidate for the position",
  ];

  const improvementSuggestions = [
    // get them from this html..

    "Practice structuring responses to provide clear and concise information",
    "Research and align salary expectations with the industry standards and the specific company",
    "Continue asking relevant and insightful questions, while also actively listening and engaging in conversation with the interviewer",
  ];

  return (
    <div className="h-[calc(100vh-8rem)] no-scrollbar overflow-y-scroll gap-6 flex flex-col">

      <AnswersFeedback answers={interview.answers} />
      <div className="max-w-5xl p-6 bg-white rounded-xl">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage
              alt="@shadcn"
              src="/avatar.png"
              width={48}
              height={60}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* // TODO  */}
          {/* {JSON.stringify(interview)} */}
          <div>
            <h2 className="text-xl font-semibold">
              AI hiring manager feedback
            </h2>
            <p className="mt-1 text-gray-700">
              Feedback for the candidate's job interview:
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium	"> 💪 Strengths:</h3>
          <ul className="list-disc pl-4 space-y-1 text-gray-700">
            {stenghts.map((stength, index) => (
              <li key={index} className="list-none">
                - {stength}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium	">📉 Weaknesses:</h3>
          <ul className="list-disc pl-4 space-y-1 text-gray-700">
            {weaknesses.map((weakness, index) => (
              <li key={index} className="list-none">
                - {weakness}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium	">🏋️‍♂️ Improvement suggestions:</h3>
          <ul className="list-disc pl-4 space-y-1 text-gray-700">
            {improvementSuggestions.map((improvement, index) => (
              <li key={index} className="list-none">
                - {improvement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}