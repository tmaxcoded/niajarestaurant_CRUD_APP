import { Restaurant } from './Restaurant.js';
import { Cuisine } from './Cuisine.js';

export class RestaurantRepo {
  constructor() {
    this.restaurant = [
      new Restaurant(1, 'Iya Basira', 'Lagos', Cuisine.LAGOS),
      new Restaurant(2, 'Mama Put ', 'Lagos', Cuisine.LAGOS),
      new Restaurant(3, 'Kajida Muma', 'Kani', Cuisine.KANO),
      new Restaurant(4, 'Iya Bola', 'Osun', Cuisine.OSUN),
      new Restaurant(5, 'Kuforiji Food joint', 'Lagos', Cuisine.OSUN)
    ];
  }

  get getRestaurants() {
    return this.restaurant;
  }

  set setRestaurant(res) {
    this.restaurant.splice(0, 0, res);
  }
}
