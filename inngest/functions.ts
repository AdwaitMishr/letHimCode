import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit"
export const helloWorld = inngest.createFunction(
  { id: "Jarvis" },
  { event: "agent/Jarvis" },
  async ({ event, step }) => {
  const agent = createAgent({
    name: "Jarvis",
    description: "A simple AI assistant",
    system: "You are Jarvis, a helpful AI assistant.",
    model: gemini({model : "gemini-2.5-flash"}),
  })

  const { output } = await agent.run("Tell me a joke about programmers.")

  return {
    message : (output[0] as any).content,
  }

  },
);