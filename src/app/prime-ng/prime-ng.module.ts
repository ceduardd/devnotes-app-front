import { NgModule } from '@angular/core';

// PrimeNg
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';

@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    DividerModule,
    InputTextareaModule,
    InputTextModule,
    MenubarModule,
    PasswordModule,
    ProgressSpinnerModule,
    TabMenuModule,
    ToastModule,
  ],
})
export class PrimeNgModule {}
