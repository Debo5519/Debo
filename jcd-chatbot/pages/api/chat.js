export default async function handler(req, res) {
  const { messages } = req.body;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for JCD Management, helping with real estate and property management questions.',
        },
        ...messages,
      ],
    }),
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].message });
}
