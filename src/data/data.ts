interface CommentProps {
  username: string,
  avatar: string,
  timestamp: string,
  content: string,
}


export const comments: CommentProps[] = [
    {
      username: 'User A',
      avatar: "",
      timestamp: "2 days ago",
      content: "I love the tips you've shared about leveraging Facebook for digital marketing! However, I'm struggling to see results. Any advice on how to improve engagement with my audience?",
    },
    {
      username: 'User B',
      avatar: "",
      timestamp: "3 days ago",
      content: "I've been trying to improve my Facebook marketing strategy, but I'm not sure where to start. Any tips?"
    },
    {
      username: 'User C',
      avatar: "",
      timestamp: "10 days ago",
      content: "I really enjoyed your post! "
    }
];
  
export const courseNav = [
  {
    type: "unit",
    text: "Unit 1",
  },
  {
    type: "unit",
    text: "Unit 2",
  },
  {
    type: "test",
    text: "Test 1",
  },
  {
    type: "test",
    text: "Test 2",
  },    
]