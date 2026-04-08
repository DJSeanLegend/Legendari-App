export type RootParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ProductDetail: { productId: string };
};

export type ShopStackParamList = {
  Shop: { categoryId?: string } | undefined;
  ProductDetail: { productId: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  OrderHistory: undefined;
  About: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ShopTab: { categoryId?: string } | undefined;
  CartTab: undefined;
  FavoritesTab: undefined;
  ProfileTab: undefined;
};
