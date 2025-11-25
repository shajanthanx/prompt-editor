import { Prompt, Template, PowerPhrase } from '../types';

const STORAGE_KEYS = {
    PROMPTS: 'prompter_saved_prompts',
    TEMPLATES: 'prompter_custom_templates',
    POWER_PHRASES: 'prompter_custom_phrases',
    CURRENT_PROMPT: 'prompter_current_prompt',
};

// Prompts
export const savePrompt = (prompt: Prompt): void => {
    const prompts = getSavedPrompts();
    const existingIndex = prompts.findIndex(p => p.id === prompt.id);

    if (existingIndex >= 0) {
        prompts[existingIndex] = prompt;
    } else {
        prompts.unshift(prompt);
    }

    localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(prompts));
};

export const getSavedPrompts = (): Prompt[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.PROMPTS);
    return data ? JSON.parse(data) : [];
};

export const deletePrompt = (id: string): void => {
    const prompts = getSavedPrompts().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(prompts));
};

// Templates
export const saveTemplate = (template: Template): void => {
    const templates = getCustomTemplates();
    const existingIndex = templates.findIndex(t => t.id === template.id);

    if (existingIndex >= 0) {
        templates[existingIndex] = template;
    } else {
        templates.push(template);
    }

    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
};

export const getCustomTemplates = (): Template[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
    return data ? JSON.parse(data) : [];
};

export const deleteTemplate = (id: string): void => {
    const templates = getCustomTemplates().filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
};

// Power Phrases
export const savePowerPhrase = (phrase: PowerPhrase): void => {
    const phrases = getCustomPowerPhrases();
    const existingIndex = phrases.findIndex(p => p.id === phrase.id);

    if (existingIndex >= 0) {
        phrases[existingIndex] = phrase;
    } else {
        phrases.push(phrase);
    }

    localStorage.setItem(STORAGE_KEYS.POWER_PHRASES, JSON.stringify(phrases));
};

export const getCustomPowerPhrases = (): PowerPhrase[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.POWER_PHRASES);
    return data ? JSON.parse(data) : [];
};

export const deletePowerPhrase = (id: string): void => {
    const phrases = getCustomPowerPhrases().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.POWER_PHRASES, JSON.stringify(phrases));
};

// Current Prompt (auto-save)
export const saveCurrentPrompt = (content: string): void => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_PROMPT, content);
};

export const getCurrentPrompt = (): string => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(STORAGE_KEYS.CURRENT_PROMPT) || '';
};

// Export/Import All Data
export const exportAllData = (): string => {
    const data = {
        prompts: getSavedPrompts(),
        templates: getCustomTemplates(),
        powerPhrases: getCustomPowerPhrases(),
        exportDate: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
};

export const importAllData = (jsonString: string): boolean => {
    try {
        const data = JSON.parse(jsonString);

        if (data.prompts) {
            localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(data.prompts));
        }
        if (data.templates) {
            localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(data.templates));
        }
        if (data.powerPhrases) {
            localStorage.setItem(STORAGE_KEYS.POWER_PHRASES, JSON.stringify(data.powerPhrases));
        }

        return true;
    } catch (error) {
        console.error('Failed to import data:', error);
        return false;
    }
};

export const clearAllData = (): void => {
    if (confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEYS.PROMPTS);
        localStorage.removeItem(STORAGE_KEYS.TEMPLATES);
        localStorage.removeItem(STORAGE_KEYS.POWER_PHRASES);
        localStorage.removeItem(STORAGE_KEYS.CURRENT_PROMPT);
    }
};
