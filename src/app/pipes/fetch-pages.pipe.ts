import { Pipe, PipeTransform } from "@angular/core"

type PaginatorPage = {
	page: boolean
	value: number | string
}

@Pipe({
	name: "fetchPages",
	standalone: true
})
export class FetchPages implements PipeTransform {
	transform(pages: (number | string)[]): PaginatorPage[] {
		console.log("🚀 ~ FetchPages ~ transform ~ pages:", pages)

		if (pages) {
			return pages.reduce((acc: PaginatorPage[], page) => {
				if (typeof page === "number") {
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

		return pages
	}
}
