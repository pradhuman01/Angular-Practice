import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes-model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.scss']
})
export class RecipesDetailComponent implements OnInit {

recipe:Recipe;
id:number;

  constructor(private recipeService: RecipeService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddtoShop(){
    this.recipeService.AddtoShoplist(this.recipe.ingredient);
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo:this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDelete(){
    this.recipeService.onDelete(this.id);
    this.router.navigate(['/recipe']);
  }
}
