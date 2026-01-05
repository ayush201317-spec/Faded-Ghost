export type Mode = 'alpha' | 'sigma';
export type CharacterType = 'cameo' | 'non-cameo';
export type StyleType = 'hyper-realistic' | 'cinematic';

export interface PromptFormData {
  description: string;
  duration: number; // Max 50
  characterType: CharacterType;
  style: StyleType;
  // Sigma Mode Extras
  camera?: string;
  mood?: string;
  cameraAngle?: string;
  lighting?: string;
  lens?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface GeneratedResult {
  prompt: string;
  isGenerating: boolean;
}