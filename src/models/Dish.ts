export type Dish = {
  id?: string;
  name: string;
  difficulty: string;
  unlockedAt: string;
  steps: RecipeStep[];
  rewards: XPReward[];
  reactions: Reactions;
  prompts: Prompts;
};

export type RecipeStep = {
  order: number;
  options: RecipeOption[];
  correctOptions: number[];
};

export type RecipeOption = {
  id?: string;
  type: RecipeOptionType;
  description: string;
  image: string;
};

export type XPReward = {
  penalties: number;
  reward: number;
};

export type Reactions = {
  positive: Reaction[];
  negative: Reaction[];
};

export type Prompts = {
  intro: Prompt[];
  failure: Prompt[];
  success: Prompt[];
};

export type Reaction = {
  text: string;
};

export type Prompt = {
  order: number;
  text: string;
  image?: string;
};

export enum RecipeOptionType {
  ingredient = 'ingredient',
  cookTime = 'cook time',
}
