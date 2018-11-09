import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  deck: string;
  cardRoutes: string[] = [];
  cardCounter: number;

  constructor(
    private router: Router
  ) {
    const deckRoutesConfig = this.router.config[2]['_loadedConfig']
    .routes[0].children[0];

    this.deck = deckRoutesConfig.path;

    const cardRoutesConfig = deckRoutesConfig['_loadedConfig']
    .routes[0].children;

    for (const route of cardRoutesConfig) {
      this.cardRoutes.push(route.path);
    }
  }

  getCardIndex(card) {
    return this.cardRoutes.indexOf(card);
  }

  getCardPath() {
    return this.cardRoutes[this.cardCounter];
  }

  checkForFirstCard(route) {
    if (route.children.length && route.children[0].hasOwnProperty('url')) {
      const currentRoute = route.children[0].url['value'][0].path;

      this.cardCounter = this.getCardIndex(currentRoute);

      if (this.cardCounter !== 0) {
        this.router.navigate([this.cardRoutes[0]], {relativeTo: route});
        this.cardCounter = 0;
      }
    } else {
      this.router.navigate([this.deck + '/' + this.cardRoutes[0]], {relativeTo: route});
      this.cardCounter = 0;
    }
  }

  back(route) {
    if (this.cardCounter > 0) {
      const prevCardRoute = this.cardRoutes[this.cardCounter - 1];
      this.router.navigate([prevCardRoute], {relativeTo: route});
      this.cardCounter -= 1;
    }
  }

  next(route) {
    if (this.cardCounter < (this.cardRoutes.length - 1)) {
      const nextCardRoute = this.cardRoutes[this.cardCounter + 1];
      this.router.navigate([nextCardRoute], {relativeTo: route});
      this.cardCounter += 1;
    }
  }
}
