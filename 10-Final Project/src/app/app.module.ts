import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesItemComponent } from './recipes/recipes-list/recipes-item/recipes-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from '../app/shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { TestDirective } from './test.directive';
import { Routing } from './routing.module';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipes/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { DataStorageService } from './shared/data-storage.service';

@NgModule({
  declarations: [
  AppComponent,
	HeaderComponent,
	RecipesComponent,
	RecipesListComponent,
  RecipesDetailComponent,
  RecipeStartComponent,
  RecipesItemComponent,
  RecipeEditComponent,
	ShoppingListComponent,
  ShoppingEditComponent,
  DropdownDirective,
  TestDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Routing,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ShoppingListService,  RecipeService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
