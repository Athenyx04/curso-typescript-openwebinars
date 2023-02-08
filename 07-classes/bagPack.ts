class MaxBagsReachedException extends Error {
  constructor() {
    super('Max bags reached');

    // NOTE: uncomment this line when you change from js to TS
    (<any>Object).setPrototypeOf(this, MaxBagsReachedException.prototype);
  }
}

interface IContainer {
  items: [];
  add: (item: any) => void;
  getCapacity: () => number;
}

interface IItem {
  name: string;
  category: string;
  toString: () => string;
}

interface IPlayer {
  bag: Container;
  bags: Container[];
  pickItem: (item: Item) => void;
  storeInNextAvailableBag: (item: Item) => void | never;
}

class Container implements IContainer {
  public items: [];

  constructor() {
    this.items = [];
  }

  add(item: Item) {
    if (this.items.length >= this.getCapacity()) {
      throw new MaxBagsReachedException();
    }

    this.items.push(item);
  }

  getCapacity() {
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

class Item implements IItem {
  public name: string;
  public category: string;

  constructor(name: string, category: string) {
    this.name = name;
    this.category = category;
  }

  toString() {
    return `Item with name ${this.name} has category ${this.category}`;
  }
}

class Player implements IPlayer {
  public bag: Container;
  public bags: Container[];

  constructor(bag: Container, bags: Container[]) {
    this.bag = bag;
    this.bags = bags;
  }

  pickItem(item: Item) {
    try {
      this.bag.add(item);
      console.log(`${item.toString()} collected ON BAGPACK`);
    } catch (e) {
      if (e instanceof MaxBagsReachedException) {
        this.storeInNextAvailableBag(item);
      }
    }
  }

  storeInNextAvailableBag(item: Item) {
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
