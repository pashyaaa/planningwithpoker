import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokerPage } from './poker.page';

const routes: Routes = [
  { path: '', redirectTo: '/poker', pathMatch: 'full' },
  {
    path: 'poker',
    component: PokerPage,
  },
  { path: 'poker/:game_id', component: PokerPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokerPageRoutingModule {}
