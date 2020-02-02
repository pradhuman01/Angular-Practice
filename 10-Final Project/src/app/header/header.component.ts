import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

 

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})


export class HeaderComponent{
	
constructor(private dataStorageService: DataStorageService){}

	OnSaveData(){
		this.dataStorageService.saveRecipeData().subscribe(
			(response :Response) => {
				console.log(response);
			}
		);
	}

	onFetchData(){
		this.dataStorageService.fetchRecipeData();
	}
}