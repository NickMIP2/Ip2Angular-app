import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const themes = [
        {
          'id': 1,
          'themename': 'reizen',
          'themedescription': 'Waar gaan we op reis ............................................',
          'themetag': ['bla'],
          'themeUsers': ['user1', 'user2']
        },
      {
        'id': 2,
        'themename': 'winkelen',
        'themedescription': 'blabla',
        'themetag': ['TAG', 'bla'],
        'themeUsers': ['user1', 'user2']
      },
      {
        'id': 3,
        'themename': 'nog een thema',
        'themedescription': 'blabla',
        'themetag': ['bla', 'TAG'],
        'themeUsers': ['user1', 'user2']
      }];
return {themes};
}
}


