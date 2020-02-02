import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes-model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {

recipes: Recipe[];
subscription : Subscription;

	
  constructor(private recipeService: RecipeService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipes : Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  OnNew(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
