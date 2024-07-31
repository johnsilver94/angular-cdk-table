import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
	name: "fetchPages",
	standalone: true
})
export class FetchPages implements PipeTransform {
	transform(pages: any[]): any {
		if (pages) {
			return pages.reduce((acc, page) => {
				if (!isNaN(page)) {
					acc.push({
						page: true,
						value: page
					})
				} else {
					acc.push({
						page: false,
						value: page
					})
				}
				return acc
			}, [])
		}
	}
}
