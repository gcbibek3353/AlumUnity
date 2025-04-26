'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getQuestionById } from '@/firebase/questions.controller';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { createQuestion, getAllQuestions, createOrremoveUpvoteForQuestions, createOrremoveDownvoteForQuestions } from '@/firebase/questions.controller';
import { toast } from 'sonner';
import { ThumbsDown, ThumbsUpIcon } from 'lucide-react';
import { useFirebase } from '@/firebase/firebase.config';

export default function ForumDetailPage() {
  const { forumId } = useParams();
  const [question, setQuestion] = useState<any>(null);
  const{loggedInUser} = useFirebase();
  const [loading, setLoading] = useState(true);
  const userId = loggedInUser?.uid || '';

  useEffect(() => {
    if (forumId) {
      fetchQuestion();
    }
  }, [forumId]);

  const fetchQuestion = async () => {
    setLoading(true);
    const response = await getQuestionById(forumId!);
    if (response.success) {
      setQuestion(response.question);
    }
    setLoading(false);
  };

  if (loading) return (
    <div className="max-w-3xl mx-auto p-6 text-center text-gray-600">
      Loading question...
    </div>
  );

  if (!question) return (
    <div className="max-w-3xl mx-auto p-6 text-center text-red-600">
      Question not found
      <div className="mt-4">
        <Link href="/forums">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Back to Forums
          </Button>
        </Link>
      </div>
    </div>
  );
//   const handleUpvote = async (questionId: string) => {
//     const response = await createOrremoveUpvoteForQuestions(questionId, userId);
//     if (response.success) {
//       fetchQuestion();
//     } else {
//       alert(`Failed to upvote: ${response.message}`);
//     }
//   };

//   const handleDownvote = async (questionId: string) => {
//     const response = await createOrremoveDownvoteForQuestions(questionId, userId);
//     if (response.success) {
//       fetchQuestion();
//     } else {
//       toast.error(`Failed to downvote: ${response.message}`);
//     }
//   };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <Link href="/forums">
        <Button variant="ghost" className="mb-6 text-indigo-600 hover:bg-indigo-50">
          ← Back to Questions
        </Button>
      </Link>

      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{question.question}</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <UserIcon className="w-4 h-4 mr-1" />
            <span>{question.posted_by?.name || 'Unknown user'}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>
              {new Date(question.created_at?.seconds * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Replies</h2>

        {question.replies?.length > 0 ? (
          <div className="space-y-6">
            {question.replies.map((reply: any) => (
              <div 
                key={reply.id} 
                className="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-gray-800 mb-4">{reply.reply}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <UserIcon className="w-4 h-4 mr-1" />
                    <span>{reply.posted_by?.name || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>
                      {new Date(reply.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3">
                    <Button
                      variant={question.upVotes?.includes(userId) ? 'default' : 'outline'}
                      className="flex items-center gap-2 text-green-600 hover:text-green-700"
                      onClick={(e) => {
                       
                      }}
                    >
                      <ThumbsUpIcon className="w-4 h-4" />
                      {0}
                    </Button>
                    <Button
                    //   variant={question.downVotes?.includes(userId) ? 'default' : 'outline'}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700"
                      onClick={(e) => {
                        
                      }}
                    >
                      <ThumbsDown className="w-4 h-4" />{0}
                      
                    </Button>
                  </div>
              </div>
              
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-xl">
            No replies yet. Be the first to respond!
          </div>
        )}
      </div>
    </div>
  );
}

// Reuse icons from previous component
const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);