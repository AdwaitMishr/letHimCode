interface ContentPart {
  text: string;
  content?: string | any[] | null;
}

interface Message {
  role: string;
  content: string | ContentPart[] | null; 
}

interface LLMResult {
  output: Message[];
}

export function lastAssistantTextMessageContent(result: LLMResult): string | undefined {
  const lastAssistantTextMessageIndex = result.output.findLastIndex(
    (message) => message.role === "assistant"
  );

  const message = result.output[lastAssistantTextMessageIndex];

  if (!message?.content) return undefined;

  return typeof message.content === "string"
    ? message.content
    : message.content.map((c) => c.text).join("");
}