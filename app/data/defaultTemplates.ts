import { Template } from '../types';

export const defaultTemplates: Template[] = [
    {
        id: 'template-summarize',
        name: 'Text Summarization',
        category: 'Analysis',
        isCustom: false,
        description: 'Summarize long text into key points',
        content: `Please summarize the following text into clear, concise bullet points. Focus on the main ideas and key takeaways.

Text to summarize:
[PASTE YOUR TEXT HERE]

Requirements:
- Use bullet points for clarity
- Highlight the most important information
- Keep it concise but comprehensive`
    },
    {
        id: 'template-code-review',
        name: 'Code Review',
        category: 'Development',
        isCustom: false,
        description: 'Review code for quality and improvements',
        content: `Please review the following code and provide feedback on:
1. Code quality and best practices
2. Potential bugs or issues
3. Performance improvements
4. Readability and maintainability

Code:
\`\`\`
[PASTE YOUR CODE HERE]
\`\`\`

Please be specific and provide examples where applicable.`
    },
    {
        id: 'template-creative-writing',
        name: 'Creative Writing',
        category: 'Writing',
        isCustom: false,
        description: 'Generate creative content',
        content: `Write a creative [story/article/blog post] about [TOPIC].

Style: [e.g., professional, casual, humorous, formal]
Tone: [e.g., informative, persuasive, entertaining]
Length: [e.g., 500 words, 3 paragraphs]

Additional requirements:
- [Add any specific requirements]
- [Target audience]
- [Key points to include]`
    },
    {
        id: 'template-email',
        name: 'Professional Email',
        category: 'Communication',
        isCustom: false,
        description: 'Draft professional emails',
        content: `Compose a professional email with the following details:

To: [RECIPIENT]
Subject: [EMAIL SUBJECT]
Purpose: [e.g., request, follow-up, introduction]

Key points to include:
- [Point 1]
- [Point 2]
- [Point 3]

Tone: [e.g., formal, friendly, urgent]`
    },
    {
        id: 'template-explain',
        name: 'Explain Concept',
        category: 'Education',
        isCustom: false,
        description: 'Explain complex concepts simply',
        content: `Please explain [CONCEPT/TOPIC] in simple terms.

Target audience: [e.g., beginner, intermediate, expert]
Explanation style: [e.g., with examples, step-by-step, with analogies]

Please include:
- Clear definition
- Real-world examples
- Common misconceptions (if any)
- Practical applications`
    },
    {
        id: 'template-brainstorm',
        name: 'Brainstorming',
        category: 'Ideation',
        isCustom: false,
        description: 'Generate creative ideas',
        content: `Help me brainstorm ideas for: [PROJECT/PROBLEM/TOPIC]

Context:
[Provide background information]

Constraints:
- [Budget, time, resources, etc.]

Please provide:
- At least 10 diverse ideas
- Brief explanation for each
- Pros and cons where relevant
- Highlight the most promising options`
    },
    {
        id: 'template-meeting-notes',
        name: 'Meeting Notes Summary',
        category: 'Productivity',
        isCustom: false,
        description: 'Organize meeting notes',
        content: `Please organize these meeting notes into a structured summary:

Meeting: [MEETING NAME]
Date: [DATE]
Attendees: [NAMES]

Raw notes:
[PASTE YOUR NOTES HERE]

Please structure as:
- Key Discussion Points
- Decisions Made
- Action Items (with owners)
- Next Steps`
    },
    {
        id: 'template-research',
        name: 'Research Assistant',
        category: 'Research',
        isCustom: false,
        description: 'Research and compile information',
        content: `Research the following topic and provide a comprehensive overview:

Topic: [RESEARCH TOPIC]

Please include:
1. Overview and background
2. Current state/trends
3. Key findings or statistics
4. Different perspectives or approaches
5. Implications and future outlook

Format: Well-organized with clear sections
Depth: [Brief overview / Detailed analysis]`
    },
    {
        id: 'template-translation',
        name: 'Translation & Localization',
        category: 'Language',
        isCustom: false,
        description: 'Translate and adapt content',
        content: `Translate the following text from [SOURCE LANGUAGE] to [TARGET LANGUAGE]:

[TEXT TO TRANSLATE]

Requirements:
- Maintain the original tone and style
- Adapt cultural references if needed
- Keep formatting intact
- Ensure natural flow in target language`
    },
    {
        id: 'template-debug',
        name: 'Debug Code',
        category: 'Development',
        isCustom: false,
        description: 'Debug and fix code issues',
        content: `I'm encountering an issue with my code. Please help me debug it.

Problem description:
[DESCRIBE THE ISSUE]

Expected behavior:
[WHAT SHOULD HAPPEN]

Actual behavior:
[WHAT IS HAPPENING]

Code:
\`\`\`
[PASTE YOUR CODE]
\`\`\`

Error message (if any):
\`\`\`
[PASTE ERROR]
\`\`\`

Please provide:
- Root cause analysis
- Step-by-step solution
- Corrected code
- Prevention tips`
    }
];
