import {Category} from './category';

export class Card{
  constructor(
    public id: number,
    public themeId: number,
    public title: string,
    public description: string,
    public image: string,
  ) {}
}
