import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

@ViewChild('f', {static:false}) form: NgForm;

subscription: Subscription;
editMode = false;
editedItemNumber: number;
editItem: Ingredient;

  constructor(private ShoppingListService: ShoppingListService) { }

  ngOnInit() {

    this.subscription = this.ShoppingListService.startEditing.subscribe(
      (index:number) => {
        this.editedItemNumber = index;
        this.editMode = true;
        this.editItem = this.ShoppingListService.getIngredientIndex(index);
        this.form.setValue({
          name:this.editItem.name,
          amount:this.editItem.amount
        });
      }
    );

  }

  onAddItem(form : NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    
    if(this.editMode){
      this.ShoppingListService.updateIngredient(this.editedItemNumber, newIngredient);
    } else {
      this.ShoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
    event.preventDefault();
  }

  onClear(){
    this.form.reset();
    this.editMode = false;
  }

  onDelete(){
    this.ShoppingListService.deleteIngredient(this.editedItemNumber);
    this.onClear();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
