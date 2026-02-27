import ollama

response = ollama.chat(
    model='llama3',
    messages=[
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_input}
    ]
)

print(response['message']['content'])