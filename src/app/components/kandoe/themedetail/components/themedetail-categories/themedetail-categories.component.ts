import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../../model/category';
import {Theme} from '../../../../../model/theme';
import {ThemeService} from '../../../../../services/theme.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CategoryService} from '../../../../../services/category.service';
import {UseridStorage} from '../../../../../sessionStorage/userid-storage';

@Component({
  selector: 'app-themedetail-categories',
  templateUrl: './themedetail-categories.component.html',
  styleUrls: ['./themedetail-categories.component.css']
})
export class ThemedetailCategoriesComponent implements OnInit {
  editing = 0;
  categorie1: Category = {id: 1, name: 'Frankrijk', themeId: 7};

  categorie2: Category = {id: 2, name: 'Frankrijk', themeId: 7};

  categorie3: Category = {id: 3, name: 'Duitsland', themeId: 7};
  categories = [this.categorie1, this.categorie2, this.categorie3];
  editfield = '';

  public themeId;
  public theme: Theme;
  private userId;

  constructor(private themeService: ThemeService, private router: Router, private categoryService: CategoryService, private route: ActivatedRoute, private userIdStorage: UseridStorage) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    window.document.title = 'Categoriën';
  }

  save(itemId) {
    this.editing = 0;
    // post naar service met edit als naam
    const cat_name = this.editfield;
    const categorie: Category = {id: -1, name: cat_name, themeId: 7};
    this.categories.push(categorie);
    console.log(categorie.name + ' cat_name: ' + cat_name + ' editfield: ' + this.editfield);
    this.editfield = '';
    // thema opslaan via call in service
  }

  createCategory() {
    this.editing = 0;
    const cat_name = this.editfield;
    const category: Category = {id: 0, name: cat_name, themeId: this.themeId};
    this.categoryService.createCategory(category, this.themeId, this.userId).subscribe(
      data => {
        this.categories.push(data);
        // this.router.navigate(['themes/' + id + '/categories']);  id van teruggekregen category (data.id) indien nodig
      },
      error => {
        console.error('Error creating category!');
        console.log(error);
        alert('Error creating category');
      });
  }

  deleteCategory(){

  }
}
