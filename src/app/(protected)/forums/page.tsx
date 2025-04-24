'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createQuestion, getAllQuestions, createOrremoveUpvoteForQuestions, createOrremoveDownvoteForQuestions } from '@/firebase/questions.controller';
import { getUserInfo } from '@/firebase/user.controller';

const Forums = () => {
  const userId = "imgInmRjc0noGAw5CFBa"; // TODO: Replace with userId from context once auth is implemented
  const [userMap, setUserMap] = useState<{ [userId: string]: string }>({});


  const [questionData, setQuestionData] = useState({
    question: '',
    date: new Date().toISOString(),
  });

  const [questions, setQuestions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleSaveQuestion = async () => {
    const data = { ...questionData, posted_by: userId };
    const response = await createQuestion(data);
    if (response.success) {
      toast.success('Question created successfully!');
      fetchQuestions(); // Refresh the list of questions
      setQuestionData({ // Clear the form state
        question: '',
        date: new Date().toISOString(),
      });
      setIsDialogOpen(false); // Close the dialog
    } else {
      toast.error(`Failed to create question: ${response.message}`);
    }
  };

  
  //  const fetchQuestions = async () => {
  //   const response = await getAllQuestions();
  //   if (response.success) {
  //     setQuestions(response.questions);
  //   } else {
  //     toast.error(`Failed to fetch questions: ${response.message}`);
  //   }
  // };
  const fetchQuestions = async () => {
    const response = await getAllQuestions();
  
    if (response.success) {
      const fetchedQuestions = response.questions;
  
      // Extract unique userIds
      const userIds = [...new Set(fetchedQuestions.map((q: any) => q.posted_by))];
  
      // Fetch user info if not already cached
      const userFetches = await Promise.all(userIds.map(async (id) => {
        if (!userMap[id]) {
          const user = await getUserInfo(id);
          // console.log(user)
          // console.log(user?.data?.name)
          return { id, name: user?.data?.name || 'Unknown User' };
        } else {
          return { id, name: userMap[id] }; // Already cached
        }
      }));
  
      // Update userMap with new names
      const updatedUserMap = { ...userMap };
      userFetches.forEach(({ id, name }) => {
        updatedUserMap[id] = name;
      });
  
      setUserMap(updatedUserMap);
      setQuestions(fetchedQuestions);
    } else {
      toast.error(`Failed to fetch questions: ${response.message}`);
    }
  };
  


  const handleUpvote = async (questionId: string) => {
    const response = await createOrremoveUpvoteForQuestions(questionId, userId);
    if (response.success) {
      fetchQuestions(); // Refresh the list of questions
    } else {
      alert(`Failed to upvote: ${response.message}`);
    }
  };

  const handleDownvote = async (questionId: string) => {
    const response = await createOrremoveDownvoteForQuestions(questionId, userId);
    if (response.success) {
      fetchQuestions(); // Refresh the list of questions
    } else {
      toast.error(`Failed to downvote: ${response.message}`);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Forums</h2>

      {/* Section to add questions */}
      <div className="mb-8">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900">
              Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-800">Add Question</DialogTitle>
              <DialogDescription className="text-gray-600">
                Fill the details of the question you want to ask.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="question" className="text-right text-gray-700">
                  Question
                </Label>
                <textarea
                  id="question"
                  name="question"
                  value={questionData.question}
                  onChange={handleChange}
                  className="col-span-3 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md px-3 py-2"
                  rows={4}
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleSaveQuestion}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Save Question
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Section to view all questions */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">All Questions</h3>
        {questions.length > 0 ? (
          <ul className="space-y-4">
            {questions.map((question: any) => (
              <li
                key={question.id}
                className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <h4 className="text-lg font-medium text-gray-900">{question.question}</h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Posted By:</span> {userMap[question.posted_by] || 'Loading...'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Date:</span> {new Date(question.date).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <Button
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-50"
                      onClick={() => handleUpvote(question.id)}
                    >
                      Upvote ({question.upVotes?.length || 0})
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => handleDownvote(question.id)}
                    >
                      Downvote ({question.downVotes?.length || 0})
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default Forums;