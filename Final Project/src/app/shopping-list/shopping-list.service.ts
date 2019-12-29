import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

// @Injectable({
//   providedIn: 'root'
// })
export class ShoppingListService {

ingredientChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() { }

  getIngredient(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    debugger;
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  addRecipeIngrediet(ingredient: Ingredient[]){
    // for(let ingredient of this.ingredients){
    //   this.addIngredient(ingredient);
    // }

    this.ingredients.push(...ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());

  }



}
