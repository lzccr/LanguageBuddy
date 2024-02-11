export const S_COMMAND = {
  name: "s",
  description: "Practice Spanish with me! ",
  options: [
    {
      type: 3, // STRING
      name: "prompt",
      description: "Which topic are you intersted in?",
      required: true,
    },
  ],
};

export const E_COMMAND = {
  name: "e",
  description: "Practice English with me! ",
  options: [
    {
      type: 3, // STRING
      name: "prompt",
      description: "Which topic are you intersted in?",
      required: true,
    },
  ],
};
