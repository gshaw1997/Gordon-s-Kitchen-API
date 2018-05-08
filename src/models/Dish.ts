export type Dish = {
  id?: string;
  name: string;
  difficulty: string;
  unlockedAt: string;
  steps: RecipeStep[];
  rewards: XPReward[];
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

export enum RecipeOptionType {
  ingredient = 'ingredient',
  cookTime = 'cook time',
}
