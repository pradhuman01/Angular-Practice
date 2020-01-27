import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private Subs: Subscription;
  ingredients: Ingredient[];


  constructor(private ShoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.ShoppingListService.getIngredient();
    
    this.Subs = this.ShoppingListService.ingredientChanged.subscribe(
      (ingre: Ingredient[]) => {
        this.ingredients = ingre;
      }
    );
  }

  onEditItem(index:number){
    this.ShoppingListService.startEditing.next(index);
  }

  ngOnDestroy(){
    this.Subs.unsubscribe();
  }

}
