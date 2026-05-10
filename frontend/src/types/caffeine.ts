export type CaffeineCategory = '커피' | '에너지드링크' | '차/기타'

export type CaffeineSort =
  | 'caffeine_high'
  | 'caffeine_low'
  | 'price_high'
  | 'price_low'
  | 'density_high'
  | 'density_low'

export type CaffeineDrink = {
  id: number
  name: string
  brand: string
  category: CaffeineCategory
  subcategory?: string
  volume_ml: number
  caffeine_per_100ml: number
  caffeine_total: number
  price: number
  flavor_tags: string[]
  recommend_tags: string[]
}

export type CaffeineQuery = {
  search?: string
  category?: CaffeineCategory | ''
  sort?: CaffeineSort | ''
}

export type CaffeineResponse = CaffeineDrink[]
