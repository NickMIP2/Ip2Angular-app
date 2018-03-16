import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../../model/category';
import {ThemeService} from '../../../../../services/theme.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../../../services/category.service';
import {UseridStorage} from '../../../../../sessionStorage/userid-storage';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-themedetail-categories',
  templateUrl: './themedetail-categories.component.html',
  styleUrls: ['./themedetail-categories.component.css']
})
export class ThemedetailCategoriesComponent implements OnInit {
  page_title = '';
  error_message = '';
  editing = 0;
  categories = [];
  editfield = '';
  public currentCategory: Category;

  public themeId = 0;
  public userId;

  constructor(private themeService: ThemeService, private router: Router, private categoryService: CategoryService, private route: ActivatedRoute, private userIdStorage: UseridStorage, private translate: TranslateService) {
    this.userId = userIdStorage.getUserId();
  }

  ngOnInit() {
    this.translate.get('Kandoe.Themedetail.categories.page_title', {value: 'world'}).subscribe(e => {
      this.page_title = e;
    });
    window.document.title = this.page_title;
    this.themeId = this.route.parent.snapshot.params['themeId'];
    // get categories of theme
    this.categoryService.getCategoriesByTheme(this.themeId, this.userId).subscribe(data => {
        this.categories = data;
      },
      error => {
        this.translate.get('Kandoe.Themedetail.categories.error_read', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      });
  }

  createCategory() {
    this.editing = 0;
    const cat_name = this.editfield;
    const category: Category = {id: 0, name: cat_name, themeId: this.themeId};
    this.categoryService.createCategory(category, this.themeId, this.userId).subscribe(
      data => {
        this.categories.push(data);
        this.editfield = '';
      },
      error => {
        this.translate.get('Kandoe.Themedetail.categories.error_create', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id, this.userId, this.themeId).subscribe(data => {
        this.categories = data;
      },
      error => {
        this.translate.get('Kandoe.Themedetail.categories.error_delete', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      });
  }

  updateCategory() {
    this.currentCategory.name = this.editfield;
    this.categoryService.updateCategory(this.currentCategory, this.themeId, this.userId).subscribe(data => {
        this.currentCategory = data;
      },
      error => {
        this.translate.get('Kandoe.Themedetail.categories.error_update', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      });
    this.editing = 0;
  }

  goToCards(id: number) {
    this.router.navigate(['kandoe/themes/' + this.themeId + '/categories/' + id + '/overview']);
  }
}
