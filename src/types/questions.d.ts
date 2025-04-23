
interface CreateQuestionParams{
    posted_by : string;
    question : string;
    date : string;
}

interface UpdateQuestionParams{
    upVotes ?: string[];  // Array of user IDs who upvoted the question
    downVotes ?: string[]; // Array of user IDs who downvoted the question
    replies ?: string[];  // Array of reply IDs associated with the question
}

interface CreateReplyParams {
    question_id : string;
    posted_by : string;
    reply : string;
    date : string;
}

interface UpdateReplyParams{
    reply_id : string;
    upVotes ?: string[];  // Array of user IDs who upvoted the reply
    downVotes ?: string[]; // Array of user IDs who downvoted the reply
}

