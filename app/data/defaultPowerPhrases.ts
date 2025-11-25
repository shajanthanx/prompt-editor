import { PowerPhrase } from '../types';

export const defaultPowerPhrases: PowerPhrase[] = [
    // Reasoning Enhancers
    {
        id: 'phrase-step-by-step',
        text: 'Think step by step and explain your reasoning.',
        category: 'reasoning',
        isCustom: false,
        description: 'Encourages detailed, logical thinking'
    },
    {
        id: 'phrase-chain-of-thought',
        text: 'Let\'s approach this systematically. First, let\'s break down the problem.',
        category: 'reasoning',
        isCustom: false,
        description: 'Promotes structured problem-solving'
    },
    {
        id: 'phrase-explain-reasoning',
        text: 'Explain your reasoning and show your work.',
        category: 'reasoning',
        isCustom: false,
        description: 'Requests transparent thinking process'
    },
    {
        id: 'phrase-pros-cons',
        text: 'Provide the pros and cons of each option.',
        category: 'reasoning',
        isCustom: false,
        description: 'Balanced analysis request'
    },

    // Role-Playing
    {
        id: 'phrase-expert',
        text: 'Act as an expert in [FIELD] with 10+ years of experience.',
        category: 'role',
        isCustom: false,
        description: 'Sets expert persona'
    },
    {
        id: 'phrase-teacher',
        text: 'Explain this as if you\'re teaching a beginner.',
        category: 'role',
        isCustom: false,
        description: 'Simplifies explanations'
    },
    {
        id: 'phrase-consultant',
        text: 'Act as a professional consultant providing strategic advice.',
        category: 'role',
        isCustom: false,
        description: 'Business-focused perspective'
    },

    // Output Format
    {
        id: 'phrase-bullet-points',
        text: 'Provide your response in clear bullet points.',
        category: 'format',
        isCustom: false,
        description: 'Structured list format'
    },
    {
        id: 'phrase-table',
        text: 'Present the information in a table format.',
        category: 'format',
        isCustom: false,
        description: 'Tabular organization'
    },
    {
        id: 'phrase-numbered-list',
        text: 'Provide a numbered list with clear steps.',
        category: 'format',
        isCustom: false,
        description: 'Sequential format'
    },
    {
        id: 'phrase-sections',
        text: 'Organize your response into clear sections with headers.',
        category: 'format',
        isCustom: false,
        description: 'Structured sections'
    },
    {
        id: 'phrase-markdown',
        text: 'Format your response using markdown for better readability.',
        category: 'format',
        isCustom: false,
        description: 'Markdown formatting'
    },

    // Quality Modifiers
    {
        id: 'phrase-concise',
        text: 'Be concise and to the point.',
        category: 'quality',
        isCustom: false,
        description: 'Brief responses'
    },
    {
        id: 'phrase-detailed',
        text: 'Provide a detailed and comprehensive response.',
        category: 'quality',
        isCustom: false,
        description: 'In-depth answers'
    },
    {
        id: 'phrase-examples',
        text: 'Include specific examples to illustrate your points.',
        category: 'quality',
        isCustom: false,
        description: 'Example-driven'
    },
    {
        id: 'phrase-actionable',
        text: 'Provide actionable recommendations I can implement immediately.',
        category: 'quality',
        isCustom: false,
        description: 'Practical advice'
    },
    {
        id: 'phrase-sources',
        text: 'Cite sources or provide references where applicable.',
        category: 'quality',
        isCustom: false,
        description: 'Referenced information'
    },

    // General
    {
        id: 'phrase-context',
        text: 'Here\'s the context: [PROVIDE BACKGROUND]',
        category: 'general',
        isCustom: false,
        description: 'Context setting'
    },
    {
        id: 'phrase-constraints',
        text: 'Please consider these constraints: [LIST CONSTRAINTS]',
        category: 'general',
        isCustom: false,
        description: 'Define limitations'
    },
    {
        id: 'phrase-audience',
        text: 'The target audience is [DESCRIBE AUDIENCE].',
        category: 'general',
        isCustom: false,
        description: 'Audience specification'
    },
    {
        id: 'phrase-avoid',
        text: 'Please avoid [SPECIFY WHAT TO AVOID].',
        category: 'general',
        isCustom: false,
        description: 'Exclusion criteria'
    },
    {
        id: 'phrase-focus',
        text: 'Focus specifically on [TOPIC/ASPECT].',
        category: 'general',
        isCustom: false,
        description: 'Narrow scope'
    },
    {
        id: 'phrase-alternatives',
        text: 'Provide multiple alternative approaches or solutions.',
        category: 'general',
        isCustom: false,
        description: 'Multiple options'
    },
    {
        id: 'phrase-verify',
        text: 'Double-check your response for accuracy.',
        category: 'quality',
        isCustom: false,
        description: 'Accuracy emphasis'
    }
];
