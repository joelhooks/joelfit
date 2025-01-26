import { BaseRepository, NotFoundError, SlugGenerationError } from '../base'
import { ShoppingList, shoppingListSchema } from './schema'
import { initialShoppingList } from './data'
import { randomUUID } from 'crypto'

export class ShoppingRepository extends BaseRepository<ShoppingList, typeof shoppingListSchema> {
  private initialized = false
  protected items: ShoppingList[] = []

  constructor() {
    super(shoppingListSchema, 'shopping list')
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      if (this.items.length === 0) {
        const now = new Date()
        const id = randomUUID()
        this.items = [{
          ...initialShoppingList,
          id,
          slug: this.generateSlug({ id, name: initialShoppingList.name }),
          createdAt: now,
          updatedAt: now
        }]
      }
      this.initialized = true
    }
  }

  protected async getData(): Promise<ShoppingList[]> {
    await this.ensureInitialized()
    return this.items
  }

  protected async setData(data: ShoppingList[]): Promise<void> {
    this.items = data
    this.initialized = true
  }

  public generateSlug(data: Partial<ShoppingList>): string {
    if (!data.name) throw new SlugGenerationError('Shopping list name is required for slug generation')
    return data.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
  }

  // Helper method for tests
  getDefaultShoppingListId(): string {
    return this.items[0]?.id ?? ''
  }

  // Override base methods to ensure initialization
  async findById(id: string): Promise<ShoppingList> {
    await this.ensureInitialized()
    return super.findById(id)
  }

  async findBySlug(slug: string): Promise<ShoppingList> {
    await this.ensureInitialized()
    return super.findBySlug(slug)
  }

  async findAll(): Promise<ShoppingList[]> {
    await this.ensureInitialized()
    return super.findAll()
  }

  // Get the default shopping list
  async getShoppingList(): Promise<ShoppingList> {
    await this.ensureInitialized()
    const shoppingLists = await this.findAll()
    if (!shoppingLists[0]) throw new NotFoundError('shopping list', 'default')
    return shoppingLists[0]
  }
} 