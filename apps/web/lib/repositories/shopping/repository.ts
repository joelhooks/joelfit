import { BaseRepository } from '../base'
import { shoppingListSchema, type ShoppingList } from './schema'
import { slugify } from '@/lib/utils'

export class ShoppingRepository extends BaseRepository<
  ShoppingList,
  typeof shoppingListSchema
> {
  constructor() {
    super(shoppingListSchema, 'ShoppingList')
  }

  protected async getData(): Promise<ShoppingList[]> {
    // TODO: Replace with actual storage implementation
    return this.items
  }

  protected async setData(data: ShoppingList[]): Promise<void> {
    // TODO: Replace with actual storage implementation
    this.items = data
  }

  protected generateSlug(data: Partial<ShoppingList>): string {
    if (!data.name) {
      throw new Error('Name is required for slug generation')
    }
    return slugify(data.name)
  }

  async markItemPurchased(
    listId: string,
    itemName: string,
    purchased: boolean = true
  ): Promise<ShoppingList> {
    const list = await this.findById(listId)
    const updatedItems = list.items.map(item =>
      item.name === itemName ? { ...item, purchased } : item
    )
    return this.update(listId, { items: updatedItems })
  }

  async markListCompleted(
    listId: string,
    completed: boolean = true
  ): Promise<ShoppingList> {
    return this.update(listId, {
      completed,
      endDate: completed ? new Date().toISOString() : undefined
    })
  }
} 