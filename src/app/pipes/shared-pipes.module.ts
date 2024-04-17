import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatePipe } from './paginate.pipe';

@NgModule({
    imports: [
        CommonModule,

    ],
    declarations: [PaginatePipe],
    exports: [PaginatePipe]
})
export class SharedPipesModule { }
