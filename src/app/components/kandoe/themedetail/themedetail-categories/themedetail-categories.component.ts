import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../model/category';
import {Theme} from '../../../../model/theme';
import {ThemeService} from '../../../../services/theme.service';
import {ActivatedRoute} from '@angular/router';

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

  public urlid;
  public theme: Theme;

  constructor(private themeService: ThemeService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.urlid = +this.route.snapshot.paramMap.get('id');

    window.document.title = 'Categoriën';
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
