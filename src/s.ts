import { InteractionResponseType } from "discord-interactions";
import { type Env } from ".";

export default async (interaction: any, env: Env, ctx: ExecutionContext) => {
  const applicationId = env.DISCORD_APPLICATION_ID;
  const interactionToken = interaction.token;

  const { options: optionsList } = interaction.data;
  const options = Object.fromEntries(
    optionsList.map((option: any) => [option.name, option.value])
  );
  const question = options.prompt;

  const respond = async () => {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${env.GEMINI_TOKEN}`,
      {
        method: "POST",
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are only allowed to use Spanish to answer this question. You need to answer my friend's question. 
                  You are NEVER allowed to write people full assignments. You may use informal sentences but they shouldn't be too informal. 
                  You are never allowed to generate harmful/NSFW/explicit/illegal content. The question my friend wants to ask you is: """${question}"""`,
                },
              ],
            },
          ],
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const json: any = await resp.json();
    const text = json.candidates[0].content.parts[0].text;

    await fetch(
      `https://discord.com/api/v10/webhooks/${applicationId}/${interactionToken}`,
      {
        method: "POST",
        body: JSON.stringify({ content: text.slice(0, 2000) }),
        headers: { "Content-Type": "application/json" },
      }
    );
  };
  ctx.waitUntil(respond());
  return Response.json({
    type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
  });
};
