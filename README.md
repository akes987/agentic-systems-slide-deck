# Building agentic systems

A dependency-free HTML talk covering what agentic systems are, how they evolved, how organizations adopted them, and how to design reliable production agents. The second half develops the argument from Akhilesh Keshap's three-part HackerNoon series about tool abstraction, reasoning boundaries, and layered evaluation.

## Run locally

Open `index.html` directly, or serve the directory:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

The 40-slide talk opens with the evolution, adoption, anatomy, and autonomy of agentic systems. A missing-delivery case and an illustrative loan-eligibility example then explain tool visibility, repeated orchestration, domain capabilities, and reasoning boundaries. The final chapter shows how software testing and agent evaluation work together through golden cases, layered checks, execution traces, release evaluation, and production monitoring. The deck closes with speaker profiles and LinkedIn links for Akhilesh Keshap and Pragya Keshap.

## Controls

- Right Arrow or Page Down: next slide
- Left Arrow or Page Up: previous slide
- Home or End: first or last slide
- F: full screen
- ?: keyboard help
- Swipe on touch devices

## Publish with GitHub Pages

1. Create a public repository on your personal GitHub account.
2. Copy the four files in this folder into the repository root.
3. Commit and push the files.
4. In the repository settings, open **Pages**.
5. Choose **Deploy from a branch**, select `main`, and use the root folder.

GitHub will provide a URL similar to `https://username.github.io/repository-name/`.

## Sources

- [Your AI Agent Should Not Be Talking to All MCP Tools](https://hackernoon.com/your-ai-agent-should-not-be-talking-to-all-mcp-tools)
- [Designing Reasoning Boundaries in Agentic Systems](https://hackernoon.com/designing-reasoning-boundaries-in-agentic-systems)
- [How Do You Evaluate an Agent That Calls Tools That Call Other Tools?](https://hackernoon.com/how-do-you-evaluate-an-agent-that-calls-tools-that-call-other-tools)

The deck paraphrases the articles and links to the originals. It does not contain eBay data, internal branding, or internal systems.
