import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../model/category';

@Component({
  selector: 'app-themedetail-categories',
  templateUrl: './themedetail-categories.component.html',
  styleUrls: ['./themedetail-categories.component.css']
})
export class ThemedetailCategoriesComponent implements OnInit {
  editing = 0;
  categorie1: Category = {id: 1, name: 'Frankrijk'};

  categorie2: Category = {id: 2, name: 'Frankrijk'};

  categorie3: Category = {id: 3, name: 'Duitsland'};
  categories = [this.categorie1, this.categorie2, this.categorie3];
  editfield = '';

  constructor() {
  }

  ngOnInit() {
  }

  save(itemId) {
    this.editing = 0;
    // post naar service met edit als naam
    const cat_name = this.editfield;
    const categorie: Category = {id: -1, name: cat_name};
    this.categories.push(categorie);
    console.log(categorie.name + ' cat_name: ' + cat_name + ' editfield: ' + this.editfield);
    this.editfield = '';
    // thema opslaan via call in service
  }
}