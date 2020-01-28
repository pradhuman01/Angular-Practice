import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
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

    if(this.editmode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;
      console.log(recipeName);
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imgpath': new FormControl(recipeImgPath),
      'description': new FormControl(recipeDescription)
    });
    console.log(this.recipeForm);
  }

  onSubmit(){
    
    console.log(this.recipeForm);
  }

}
