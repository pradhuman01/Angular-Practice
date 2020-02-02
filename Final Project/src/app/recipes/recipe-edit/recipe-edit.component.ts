import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  constructor(private router: ActivatedRoute, private recipeService: RecipeService, private route: Router) { }

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


  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
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
              'name': new FormControl(ingredients.name, Validators.required),
              'amount': new FormControl(ingredients.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({

      'name': new FormControl(recipeName, Validators.required),
      'imgpath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });

  }

  onSubmit(){
    
    if(this.editmode){

      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.route.navigate(['../'], {relativeTo: this.router});

    } else {

      this.recipeService.addNewRecipe(this.recipeForm.value);
      this.route.navigate(['../'], {relativeTo: this.router});

    }

    console.log(this.recipeForm);
  }

  onCancel(){
    this.route.navigate(['../'], {relativeTo: this.router});
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
