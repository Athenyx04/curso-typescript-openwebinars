class MaxBagsReachedException extends Error {
  constructor() {
    super('Max bags reached');

    // NOTE: uncomment this line when you change from js to TS
    (<any>Object).setPrototypeOf(this, MaxBagsReachedException.prototype);
  }
}

interface IContainer {
  add: (item: Item) => void | never;
  getCapacity: () => number;
}

class Container implements IContainer {
  public items: Item[];

  constructor() {
    this.items = [];
  }

  add(item: Item): void | never {
    if (this.items.length >= this.getCapacity()) {
      throw new MaxBagsReachedException();
    }

    this.items.push(item);
  }

  getCapacity(): number {
    return 0;
  }
}

class BackPack extends Container {
  getCapacity() {
    return 8;
  }
}

class Bag extends Container {
  getCapacity() {
    return 4;
  }
}

interface IItem {
  toString: () => string;
}

class Item implements IItem {
  private name: string;
  private category: string;

  constructor(name: string, category: string) {
    this.name = name;
    this.category = category;
  }

  toString(): string {
    return `Item with name ${this.name} has category ${this.category}`;
  }
}

interface IPlayer {
  pickItem: (item: Item) => void;
  storeInNextAvailableBag: (item: Item) => void | never;
}

class Player implements IPlayer {
  private bag: IContainer;
  private bags: IContainer[];

  constructor(bag: IContainer, bags: IContainer[]) {
    this.bag = bag;
    this.bags = bags;
  }

  pickItem(item: Item): void {
    try {
      this.bag.add(item);
      console.log(`${item.toString()} collected ON BAGPACK`);
    } catch (e) {
      if (e instanceof MaxBagsReachedException) {
        this.storeInNextAvailableBag(item);
      }
    }
  }
  storeInNextAvailableBag(item: Item): void | never {
    for (let index = 0; index < this.bags.length; index++) {
      const bag = this.bags[index];
      try {
        bag.add(item);
        console.log(`${item.toString()} collected ON A BAG`);
        break;
      } catch (error) {
        if (index === this.bags.length - 1) {
          throw error;
        }
      }
    }
  }
}

const $button = document.getElementById('saveItem') as HTMLButtonElement;
const $error = document.getElementById('error') as HTMLInputElement;
// We can create another type of BackPack with more capacity and inject into Player object
const player = new Player(new BackPack(), [
  new Bag(),
  new Bag(),
  new Bag(),
  new Bag(),
]);
const ITEMS_CATEGORIES = ['clothes', 'weapons', 'herbs'];

$button.addEventListener('click', function () {
  const index = Math.round(Math.random() * (ITEMS_CATEGORIES.length - 1));
  const itemCategory = ITEMS_CATEGORIES[index];
  const item = new Item(Date.now().toString(), itemCategory);

  try {
    player.pickItem(item);
  } catch (e) {
    console.log(e);
    $error.innerHTML = e.toString();
    $error.style.display = 'block';
  }
});
