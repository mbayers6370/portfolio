import { useId, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { ChevronRight, Check, Hamburger, CupSoda, Utensils } from 'lucide-react'

type MenuItem = {
  id: string
  name: string
  price: number
  summary: string
  description: string
}
type Category = 'Burgers' | 'Sides' | 'Shakes'
const categoryIcons = { Burgers: Hamburger, Sides: Utensils, Shakes: CupSoda }
const categories: Category[] = ['Burgers', 'Sides', 'Shakes']
type MenuItems = [MenuItem, MenuItem, MenuItem, MenuItem]
const menu: Record<Category, MenuItems> = {
  Burgers: [
    {
      id: 'night-shift',
      name: 'The Night Shift',
      price: 11.5,
      summary: 'Two patties, cheddar, onion jam',
      description:
        'Two smashed patties with sharp cheddar and a slow-cooked onion jam on a toasted bun. The one the night crew orders.',
    },
    {
      id: '101',
      name: 'The 101',
      price: 9.75,
      summary: 'Single patty, pickles, house sauce',
      description:
        'A single smashed patty, crisp pickles, and house sauce. A simple burger for the long way home.',
    },
    {
      id: 'porch-light',
      name: 'Porch Light',
      price: 12,
      summary: 'Fried egg, bacon, hot honey',
      description:
        'A beef patty with smoky bacon, a fried egg, and a little hot honey. Breakfast keeps its own hours.',
    },
    {
      id: 'last-call',
      name: 'Last Call',
      price: 10.25,
      summary: 'Grilled onions, American, mustard',
      description:
        'Grilled onions, melted American cheese, and mustard. Something good before you call it a night.',
    },
  ],
  Sides: [
    {
      id: 'fries',
      name: 'Window fries',
      price: 4,
      summary: 'Sea salt, cracked pepper',
      description:
        'Hot, crisp fries with sea salt and cracked black pepper. Made for the middle of the table.',
    },
    {
      id: 'rings',
      name: 'Onion rings',
      price: 5,
      summary: 'Crisp batter, house sauce',
      description:
        'Thick-cut onion rings in a crisp seasoned batter, with house sauce on the side.',
    },
    {
      id: 'slaw',
      name: 'Late-night slaw',
      price: 3.5,
      summary: 'Cabbage, apple, cider dressing',
      description:
        'Cabbage and apple with a bright cider dressing. A fresh bite between the rich ones.',
    },
    {
      id: 'cheese-fries',
      name: 'Cheddar fries',
      price: 5.5,
      summary: 'Cheddar sauce, chopped chives',
      description: 'Crisp fries with sharp cheddar sauce and a handful of chopped chives.',
    },
  ],
  Shakes: [
    {
      id: 'vanilla',
      name: 'Vanilla after hours',
      price: 6,
      summary: 'Vanilla bean, whipped cream',
      description:
        'Vanilla bean ice cream, cold milk, and a soft cap of whipped cream. Keep it classic.',
    },
    {
      id: 'chocolate',
      name: 'Midnight chocolate',
      price: 6.5,
      summary: 'Dark chocolate, extra cocoa',
      description:
        'A thick dark-chocolate shake with a little extra cocoa. Something for the ride home.',
    },
    {
      id: 'strawberry',
      name: 'Strawberry moon',
      price: 6.5,
      summary: 'Strawberries, vanilla, whipped cream',
      description:
        'Strawberries and vanilla ice cream, blended thick and finished with whipped cream.',
    },
    {
      id: 'caramel',
      name: 'Salted caramel',
      price: 6.75,
      summary: 'Salted caramel, whipped cream',
      description: 'Vanilla ice cream and salted caramel, finished with a little whipped cream.',
    },
  ],
}
const options: Record<Category, string[]> = {
  Burgers: ['No onions', 'Extra pickles'],
  Sides: ['No added salt', 'Sauce on the side'],
  Shakes: ['No whipped cream', 'Extra thick'],
}
const money = (value: number) => `$${value.toFixed(2)}`

type CounterProps = {
  category: Category
  selected: number
  onCategory: (category: Category) => void
  onSelect: (index: number, open?: boolean) => void
}
function CounterMenu({ category, selected, onCategory, onSelect }: CounterProps) {
  const headingId = useId()
  const list = useRef<HTMLUListElement>(null)
  const items = menu[category]
  return (
    <section className="burger-board" id="cayucos-menu" aria-labelledby={headingId}>
      <header className="burger-board-header">
        <h3 id={headingId}>The Late Window</h3>
      </header>
      <div
        className="burger-categories"
        role="group"
        aria-label="Menu category"
        style={{ '--category-index': categories.indexOf(category) } as CSSProperties}
      >
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => onCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <ul ref={list} className="burger-board-items" aria-label={category}>
        {items.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              aria-pressed={selected === index}
              aria-label={`View ${item.name}: ${item.summary}, ${money(item.price)}`}
              onClick={() => onSelect(index, true)}
              onKeyDown={(event) => {
                const columnCount = list.current
                  ? getComputedStyle(list.current).gridTemplateColumns.split(' ').length
                  : 1
                const directions: Record<string, number> = {
                  ArrowDown: columnCount,
                  ArrowUp: -columnCount,
                  ArrowRight: 1,
                  ArrowLeft: -1,
                }
                const direction = directions[event.key]
                if (direction === undefined) return
                event.preventDefault()
                const next = (index + direction + items.length) % items.length
                onSelect(next)
                list.current?.querySelectorAll('button')[next]?.focus()
              }}
            >
              <span className="burger-board-item-name">{item.name}</span>
              <span className="burger-board-price">{money(item.price)}</span>
              <span className="burger-board-item-description" title={item.summary}>
                {item.summary}
              </span>
              <ChevronRight className="burger-board-item-chevron" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

type FeatureProps = {
  category: Category
  selected: number
  headingRef: RefObject<HTMLHeadingElement>
  choices: string[]
  onChoice: (value: string) => void
  onAdd: () => void
  orderMessage: string
}
function FeaturedBurgerMenu({
  category,
  selected,
  headingRef,
  choices,
  onChoice,
  onAdd,
  orderMessage,
}: FeatureProps) {
  const [customizing, setCustomizing] = useState(false)
  const headingId = useId()
  const customId = useId()
  const items = menu[category]
  const item = items[selected]
  const ItemIcon = categoryIcons[category]
  return (
    <section className="burger-feature" aria-labelledby={headingId}>
      <div
        className="burger-feature-content"
        data-customizing={customizing || undefined}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="burger-feature-copy">
          <h3 className="burger-feature-title" id={headingId} tabIndex={-1} ref={headingRef}>
            {item.name}
          </h3>
          <p>{item.description}</p>
        </div>
        <div className="burger-feature-media">
          <ItemIcon aria-hidden="true" strokeWidth={1.5} />
        </div>
        <div
          className="burger-customize"
          id={customId}
          role="group"
          aria-labelledby={`${customId}-title`}
          aria-hidden={!customizing}
        >
          <h4 id={`${customId}-title`}>Make it yours</h4>
          {options[category].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                disabled={!customizing}
                checked={choices.includes(option)}
                onChange={() => onChoice(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <footer className="burger-feature-footer">
        <button
          className="burger-customize-toggle"
          type="button"
          aria-expanded={customizing}
          aria-controls={customId}
          onClick={() => setCustomizing((current) => !current)}
        >
          {customizing ? (
            <>
              <Check aria-hidden="true" />
              Done
            </>
          ) : (
            'Customize'
          )}
        </button>
        <button type="button" className="burger-add-order" onClick={onAdd}>
          <span>
            Add to order <span className="burger-order-price">{money(item.price)}</span>
          </span>
        </button>
      </footer>
      <p className="burger-order-status" role="status">
        {orderMessage}
      </p>
    </section>
  )
}

export default function BurgerMenus() {
  const [category, setCategory] = useState<Category>('Burgers')
  const [selected, setSelected] = useState(0)
  const [choices, setChoices] = useState<Record<string, string[]>>({})
  const [order, setOrder] = useState<{ name: string; price: number; choices: string[] }[]>([])
  const [orderMessage, setOrderMessage] = useState('')
  const featureHeading = useRef<HTMLHeadingElement>(null)
  const item = menu[category][selected]
  const currentChoices = choices[item.id] ?? []

  function selectItem(index: number, open = false) {
    setSelected(index)
    if (open)
      requestAnimationFrame(() => {
        featureHeading.current?.focus({ preventScroll: true })
        featureHeading.current?.scrollIntoView({ block: 'nearest' })
      })
  }
  function addToOrder() {
    const next = [...order, { name: item.name, price: item.price, choices: [...currentChoices] }]
    setOrder(next)
    setOrderMessage(
      `${item.name} added${currentChoices.length ? ` (${currentChoices.join(', ')})` : ''}. Sample order: ${next.length} ${next.length === 1 ? 'item' : 'items'} · ${money(next.reduce((sum, entry) => sum + entry.price, 0))}.`
    )
  }

  return (
    <>
      <CounterMenu
        category={category}
        selected={selected}
        onCategory={(next) => {
          setCategory(next)
          setSelected(0)
        }}
        onSelect={selectItem}
      />
      <FeaturedBurgerMenu
        category={category}
        selected={selected}
        headingRef={featureHeading}
        choices={currentChoices}
        onChoice={(option) =>
          setChoices((current) => ({
            ...current,
            [item.id]: currentChoices.includes(option)
              ? currentChoices.filter((value) => value !== option)
              : [...currentChoices, option],
          }))
        }
        onAdd={addToOrder}
        orderMessage={orderMessage}
      />
    </>
  )
}
