"use client"
import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/UserAvatar'
import { createEvent, getAllEvents, getLatestThreeEvents } from '@/firebase/event.controller'
import { createOpportunity, getAllOpportunities } from '@/firebase/oppertunities.controller'
import { createOrremoveDownvoteForQuestions, createOrremoveDownvoteForReplies, createOrremoveUpvoteForQuestions, createOrremoveUpvoteForReplies, createQuestion, createReply, getAllQuestions } from '@/firebase/questions.controller'
import { getUserInfo, saveUserAfterLogin, updateUserInfo } from '@/firebase/user.controller'
import React, { use, useEffect } from 'react'
// this is just a temporary test file to test the controller functions 
const page = () => {

    useEffect(() => {
        const handler = async () => {
            // const res = await saveUserAfterLogin("try.vivek1@gmail.com");
            // updateUserInfo("KqLD11exKhcThd5juthP",{
            //     name : "Vivek",
            //     skills : ["React", "Node", "Express", "MongoDB"],
            //     interests : ["Web Development", "AI", "ML"],
            //     batch : "2024",
            // })
            // const res = await getUserInfo("KqLD11exKhcThd5juthP");

            // await createEvent({
            //     title: "test event 2",
            //     description: "this is a test event 2 ",
            //     author : "KqLD11exKhcThd5juthP",
            //     date: "2023-10-10",
            //     meet_link: "https://meet.google.com/abc-defg-hij",
            //     location: "Europe",
            // })
            // const res = await getAllEvents();

            // const res = await getLatestThreeEvents();
            // await createOpportunity({
            //     title: "test opportunity",
            //     postedBy: "KqLD11exKhcThd5juthP",
            //     Company: "test company",
            //     type: "Job",  // working with typescript error as well
            //     location: "India",
            //     salary: "10000",
            //     applicationLink: "https://www.google.com",
            //     vacancy: "2"
            // })

            // const res = await getAllOpportunities()

            // await createQuestion({
            //     posted_by: "KqLD11exKhcThd5juthP",
            //     question: "this is a test question",
            //     date: "2023-10-10",
            // })

            // await createReply({
            //     question_id: "fovfILu6ukq69lFBw18P",
            //     posted_by: "imgInmRjc0noGAw5CFBa",
            //     reply: "this is a test reply",
            //     date: "2023-10-10",
            // })

            // await createOrremoveUpvoteForQuestions("fovfILu6ukq69lFBw18P", "imgInmRjc0noGAw5CFBa");
            // await createOrremoveDownvoteForQuestions("fovfILu6ukq69lFBw18P", "imgInmRjc0noGAw5CFBa");

            // await createOrremoveUpvoteForReplies("WMWcwomwbrbBkoR5Fx5I", "imgInmRjc0noGAw5CFBa");
            // await createOrremoveDownvoteForReplies("WMWcwomwbrbBkoR5Fx5I", "imgInmRjc0noGAw5CFBa");

            const res = await getAllQuestions();

            console.log(res.questions);

        }
        handler();
    }, [])

    return (
        <div>test page
            <Button>Click me</Button>
            <UserAvatar userImageUrl="https://example.com/avatar.jpg" userName="Alice" />
            <UserAvatar userName="Bob" userImageUrl='' />

        </div>
    )
}

export default page