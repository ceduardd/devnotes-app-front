import { NgModule } from '@angular/core';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PasswordModule } from 'primeng/password';
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
    TabMenuModule,
    ToastModule,
  ],
})
export class PrimengModule {}
