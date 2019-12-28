import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipes-model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

recipes: Recipe[];

	
  constructor(private recipeService: RecipeService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  OnNew(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
