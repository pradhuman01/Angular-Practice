import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  constructor(private router: ActivatedRoute, private recipeService: RecipeService) { }

  id:number;
  editmode: boolean = false;
  recipeForm: FormGroup;
  ngOnInit() {

    this.router.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editmode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm(){
    
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editmode){

      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;

      if(recipe['ingredient']){
        for(let ingredients of recipe.ingredient){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredients.name),
              'amount': new FormControl(ingredients.amount)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({

      'name': new FormControl(recipeName),
      'imgpath': new FormControl(recipeImgPath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });
    
    console.log(this.recipeForm);

  }

  onSubmit(){
    
    console.log(this.recipeForm);
  }

}
