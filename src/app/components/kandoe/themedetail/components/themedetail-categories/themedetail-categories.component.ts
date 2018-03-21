import {Component, OnInit} from '@angular/core';
import {Category} from '../../../../../model/category';
import {ThemeService} from '../../../../../services/theme.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../../../services/category.service';
import {UseridStorage} from '../../../../../sessionStorage/userid-storage';
import {MatSnackBar} from '@angular/material';
import {Theme} from '../../../../../model/theme';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-themedetail-categories',
  templateUrl: './themedetail-categories.component.html',
  styleUrls: ['./themedetail-categories.component.css']
})
export class ThemedetailCategoriesComponent implements OnInit {
  title = '';
  error_message = '';
  editing = 0;
  categories = [];
  editfield = '';
  public currentCategory: Category;
  public theme: Theme = {
    id: 0,
    name: '',
    description: '',
    tags: [''],
    image: ''
  };
  public themeId = 0;
  public userId;

  constructor(private themeService: ThemeService,
              private router: Router,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private userIdStorage: UseridStorage,
              private snackBar: MatSnackBar,
              private translate: TranslateService) {
    this.userId = userIdStorage.getUserId();

  }

  ngOnInit() {

    this.translate.get('Kandoe.Themedetail.categories.page_title', {value: 'world'}).subscribe(e => {
      this.title = e;
    });
    window.document.title = this.title;
    this.themeId = this.route.parent.snapshot.params['themeId'];
    // get theme to display name
    this.themeService.getTheme(this.themeId, this.userId).subscribe(data => {
        this.theme = data;
      },
      error => {
        console.error('Error loading theme!');
        console.log(error);
        this.snackBar.open('Er ging iets mis bij het ophalen van dit thema', 'x', {duration: 2000});
      });
    // get categories of theme
    this.categoryService.getCategoriesByTheme(this.themeId, this.userId).subscribe(data => {
        this.categories = data;
      },
      error => {
        console.error('Error loading categories!');
        console.log(error);
        this.snackBar.open('Er ging iets mis bij het ophalen van deze categorie', 'x', {duration: 2000});
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
        console.error('Error creating category!');
        console.log(error);
        this.snackBar.open('Fout bij aanmaken categorie!', 'x', {duration: 2000});

      }, () => {
        this.snackBar.open('Categorie aangemaakt', 'x', {duration: 2000});
      });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id, this.userId, this.themeId).subscribe(data => {
        this.categories = data;
      },
      error => {
        console.error('Error deleting category!' + id);
        console.log(error);
        this.snackBar.open('Categorie verwijderen mislukt!', 'x', {duration: 2000});
      }, () => {
        this.snackBar.open('Categorie verwijderd', 'x', {duration: 2000});

      });
  }

  updateCategory() {
    this.currentCategory.name = this.editfield;
    this.categoryService.updateCategory(this.currentCategory, this.themeId, this.userId).subscribe(data => {
        this.currentCategory = data;
      },
      error => {
        console.error('Error saving Category!');
        console.log(error);
        this.snackBar.open('Wijzigingen opslaan mislukt!', 'x', {duration: 2000});
      }, () => {
        this.snackBar.open('Wijzigingen opgeslagen!', 'x', {duration: 2000});
      }
    );
    this.editing = 0;
  }

  goToCards(id: number, name: string) {
    this.router.navigate(['kandoe/themes/' + this.themeId + '/categories/' + id + '/overview'], {queryParams: {themeName: this.theme.name, categoryName: name}});
  }
}
