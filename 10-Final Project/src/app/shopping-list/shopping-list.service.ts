import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
export class ShoppingListService {

ingredientChanged = new Subject<Ingredient[]>();
startEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() { }

  getIngredient(){
    return this.ingredients.slice();
  }

  getIngredientIndex(index:number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){

    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addRecipeIngrediet(ingredient: Ingredient[]){
    // for(let ingredient of this.ingredients){
    //   this.addIngredient(ingredient);
    // }

    this.ingredients.push(...ingredient);
    this.ingredientChanged.next(this.ingredients.slice());

  }

  updateIngredient(index:number, newIngredient:Ingredient){
      this.ingredients[index] = newIngredient;
      this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
     this.ingredients.splice(index, 1);
     this.ingredientChanged.next(this.ingredients.slice());
  }

}
