import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit"
import Sandbox from "e2b"


export const Jarvis = inngest.createFunction(
  { id: "Jarvis" },
  { event: "agent/Jarvis" },
  async ({ event, step }) => {

    const sandboxId = await step.run("get-sandbox-id", async() => {
      const sandbox = await Sandbox.create("letHimCode-nextjs-dev")
      return sandbox.sandboxId;
    })
    

  const agent = createAgent({
    name: "Jarvis",
    description: "A simple AI assistant",
    system: "You are Jarvis, a helpful AI assistant.",
    model: gemini({model : "gemini-2.5-flash"}),
  })

  const { output } = await agent.run("Tell me a joke about programmers.")

  const sandboxUrl = await step.run("get-sandbox-url", async() => {
    const sandbox = await Sandbox.connect(sandboxId);
    const host = sandbox.getHost(3000);

    return `http://${host}`;
  })

  return {
    message : (output[0] as any).content,
  }

  },
);