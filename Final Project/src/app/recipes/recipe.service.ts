import { Injectable } from '@angular/core';
import { Recipe } from './recipes-model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
	
    new Recipe('Test', 'This is Test', 'https://cdn.pixabay.com/photo/2016/10/25/13/42/indian-1768906_960_720.jpg', [
      new Ingredient('Apple', 9),
      new Ingredient('Orange', 5)
    ]),
    new Recipe('Test', 'This is Test', 'https://cdn.pixabay.com/photo/2016/10/25/13/42/indian-1768906_960_720.jpg', [
      new Ingredient('Apple', 9),
      new Ingredient('Mango', 5)
    ])
    
  ];

  constructor(private ShoppingListService: ShoppingListService) { }

  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(index: number){
    return this.recipes[index];
  }

  AddtoShoplist(ingredient: Ingredient[]){
    this.ShoppingListService.addRecipeIngrediet(ingredient);
  }

  addNewRecipe(newRecipe: Recipe){
      this.recipes.push(newRecipe);
      this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  onDelete(index:number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
