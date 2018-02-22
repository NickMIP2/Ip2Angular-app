import {Category} from './category';

export class Card{
  constructor(
    public title: string,
    public description: string,
    public image: string,
    public categories: Array<Category>
  ) {}
}
