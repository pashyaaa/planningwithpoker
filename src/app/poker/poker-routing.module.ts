import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokerPage } from './poker.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PokerPage,
  },
  { path: ':game_id', component: PokerPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokerPageRoutingModule {}
