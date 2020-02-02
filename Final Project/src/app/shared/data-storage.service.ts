import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  saveRecipeData(){
    return this.http.put("https://recipe-book-app-929a1.firebaseio.com/recipe.json", this.recipeService.getRecipes());
  }

  fetchRecipeData(){
    this.http.get("https://recipe-book-app-929a1.firebaseio.com/recipe.json").pipe(map(
      (response:Response) => {
        const recipe:Recipe[] = response;
        for(let recipes of recipe){
          if(!recipes['ingredients']){
            console.log(recipes);
            recipes['ingredients'] = [];
          }
        }
        return recipe;
      }
    )).subscribe(
      (recipe: Recipe[]) => {

        this.recipeService.setRecipe(recipe);
      }
    );
  }
}
