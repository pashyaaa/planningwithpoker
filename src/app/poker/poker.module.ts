import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokerPageRoutingModule } from './poker-routing.module';

import { PokerPage } from './poker.page';
import { CreatePlayerComponent } from './create-player/create-player.component';
import { CreateGameComponent } from './create-game/create-game.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokerPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PokerPage, CreatePlayerComponent, CreateGameComponent]
})
export class PokerPageModule {}
