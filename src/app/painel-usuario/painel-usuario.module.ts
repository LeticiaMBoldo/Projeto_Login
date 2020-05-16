import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PainelUsuarioPageRoutingModule } from './painel-usuario-routing.module';

import { PainelUsuarioPage } from './painel-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PainelUsuarioPageRoutingModule
  ],
  declarations: [PainelUsuarioPage]
})
export class PainelUsuarioPageModule {}
