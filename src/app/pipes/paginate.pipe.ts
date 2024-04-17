import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {


	transform(array: any[] | null , page_size: number | string , page_number: number): any[] {
		if(array === null) {
      return [];
    }
    if (!array.length) {
			return [];
		}

		if (page_size === 'all') {
			return array ;
		}

		page_size = page_size || 10 ;
		page_number = page_number || 1 ;
		--page_number;

		// @ts-ignore
		return array.slice(page_number * page_size , (page_number + 1) * page_size );
	}
}
