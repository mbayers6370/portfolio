import { useId, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

type MenuItem = {
  id: string
  name: string
  price: number
  summary: string
  description: string
  facts: [string, string, string]
}
type Category = 'Burgers' | 'Sides' | 'Shakes'
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
      facts: ['Two, smashed', 'Sharp cheddar', '8 minutes'],
    },
    {
      id: '101',
      name: 'The 101',
      price: 9.75,
      summary: 'Single patty, pickles, house sauce',
      description:
        'A single smashed patty, crisp pickles, and house sauce. A simple burger for the long way home.',
      facts: ['One, smashed', 'American', '6 minutes'],
    },
    {
      id: 'porch-light',
      name: 'Porch Light',
      price: 12,
      summary: 'Fried egg, bacon, hot honey',
      description:
        'A beef patty with smoky bacon, a fried egg, and a little hot honey. Breakfast keeps its own hours.',
      facts: ['One, grilled', 'American', '9 minutes'],
    },
    {
      id: 'last-call',
      name: 'Last Call',
      price: 10.25,
      summary: 'Grilled onions, American, mustard',
      description:
        'Grilled onions, melted American cheese, and mustard. Something good before you call it a night.',
      facts: ['One, smashed', 'American', '7 minutes'],
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
      facts: ['Potato', 'Sea salt', '4 minutes'],
    },
    {
      id: 'rings',
      name: 'Onion rings',
      price: 5,
      summary: 'Crisp batter, house sauce',
      description:
        'Thick-cut onion rings in a crisp seasoned batter, with house sauce on the side.',
      facts: ['Onion', 'House sauce', '5 minutes'],
    },
    {
      id: 'slaw',
      name: 'Late-night slaw',
      price: 3.5,
      summary: 'Cabbage, apple, cider dressing',
      description:
        'Cabbage and apple with a bright cider dressing. A fresh bite between the rich ones.',
      facts: ['Cabbage', 'Cider dressing', '2 minutes'],
    },
    {
      id: 'cheese-fries',
      name: 'Cheddar fries',
      price: 5.5,
      summary: 'Cheddar sauce, chopped chives',
      description: 'Crisp fries with sharp cheddar sauce and a handful of chopped chives.',
      facts: ['Potato', 'Cheddar sauce', '5 minutes'],
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
      facts: ['Vanilla bean', 'Whipped cream', '3 minutes'],
    },
    {
      id: 'chocolate',
      name: 'Midnight chocolate',
      price: 6.5,
      summary: 'Dark chocolate, extra cocoa',
      description:
        'A thick dark-chocolate shake with a little extra cocoa. Something for the ride home.',
      facts: ['Dark chocolate', 'Cocoa', '3 minutes'],
    },
    {
      id: 'strawberry',
      name: 'Strawberry moon',
      price: 6.5,
      summary: 'Strawberries, vanilla, whipped cream',
      description:
        'Strawberries and vanilla ice cream, blended thick and finished with whipped cream.',
      facts: ['Strawberry', 'Whipped cream', '3 minutes'],
    },
    {
      id: 'caramel',
      name: 'Salted caramel',
      price: 6.75,
      summary: 'Salted caramel, whipped cream',
      description: 'Vanilla ice cream and salted caramel, finished with a little whipped cream.',
      facts: ['Salted caramel', 'Whipped cream', '3 minutes'],
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
  headingRef: RefObject<HTMLHeadingElement>
}
function CounterMenu({ category, selected, onCategory, onSelect, headingRef }: CounterProps) {
  const headingId = useId()
  const list = useRef<HTMLUListElement>(null)
  const items = menu[category]
  return (
    <section className="burger-board" id="cayucos-menu" aria-labelledby={headingId}>
      <header className="burger-board-header">
        <h3 id={headingId} tabIndex={-1} ref={headingRef}>
          The Late Window
        </h3>
        <span className="burger-open">
          <i aria-hidden="true" />
          Open until 2 am
        </span>
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
                const directions: Record<string, number> = {
                  ArrowDown: 2,
                  ArrowUp: -2,
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
              <span className="burger-board-item-description" title={item.summary}>
                {item.summary}
              </span>
              <span className="burger-board-price">{money(item.price)}</span>
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
  onMove: (direction: number) => void
  onMenu: () => void
  headingRef: RefObject<HTMLHeadingElement>
  choices: string[]
  onChoice: (value: string) => void
  onAdd: () => void
  orderMessage: string
}
function FeaturedBurgerMenu({
  category,
  selected,
  onMove,
  onMenu,
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
  const factLabels =
    category === 'Burgers'
      ? ['Patties', 'Cheese', 'Ready in']
      : category === 'Sides'
        ? ['Made with', 'Seasoning', 'Ready in']
        : ['Flavor', 'Topping', 'Ready in']
  return (
    <section className="burger-feature" aria-labelledby={headingId}>
      <header className="burger-feature-nav">
        <button type="button" onClick={onMenu}>
          <ChevronLeft aria-hidden="true" />
          Menu
        </button>
        <div
          className="burger-feature-pagination"
          aria-label={`Item ${selected + 1} of ${items.length}`}
        >
          {items.map((burger, index) => (
            <span key={burger.id} data-current={index === selected || undefined} />
          ))}
        </div>
        <div>
          <button
            type="button"
            aria-label="Previous menu item"
            onClick={() => {
              setCustomizing(false)
              onMove(-1)
            }}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next menu item"
            onClick={() => {
              setCustomizing(false)
              onMove(1)
            }}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </header>
      <div className="burger-feature-copy" aria-live="polite" aria-atomic="true">
        <div className="burger-feature-heading">
          <h3 className="burger-feature-title" id={headingId} tabIndex={-1} ref={headingRef}>
            {item.name}
          </h3>
          {selected === 0 && (
            <span>
              {category === 'Burgers' ? 'Burger' : category === 'Sides' ? 'Side' : 'Shake'} of the
              night
            </span>
          )}
        </div>
        <p>{item.description}</p>
        <dl className="burger-feature-facts">
          {item.facts.map((fact, index) => (
            <div key={factLabels[index]}>
              <dt>{factLabels[index]}</dt>
              <dd>{fact}</dd>
            </div>
          ))}
        </dl>
      </div>
      {customizing && (
        <fieldset className="burger-customize" id={customId}>
          <legend>Make it yours</legend>
          {options[category].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                checked={choices.includes(option)}
                onChange={() => onChoice(option)}
              />
              {option}
            </label>
          ))}
        </fieldset>
      )}
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
          Add to order<span>{money(item.price)}</span>
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
  const menuHeading = useRef<HTMLHeadingElement>(null)
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
        headingRef={menuHeading}
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
        onMove={(direction) =>
          setSelected(
            (current) => (current + direction + menu[category].length) % menu[category].length
          )
        }
        onMenu={() => {
          menuHeading.current?.focus({ preventScroll: true })
          menuHeading.current?.scrollIntoView({ block: 'nearest' })
        }}
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
