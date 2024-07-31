import { Pipe, PipeTransform } from "@angular/core"
import { DomSanitizer, SafeHtml } from "@angular/platform-browser"

@Pipe({
	name: "highlight",
	standalone: true
})
export class HighlightSearch implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {}

	transform(value: string, args: string): SafeHtml {
		if (!args) {
			return value
		}
		// Match in a case insensitive maneer
		const re = new RegExp(args, "gi")
		const match = value.match(re)

		// If there's no match, just return the original value.
		if (!match) {
			return value
		}

		const replacedValue = value.replace(re, (match) => `<mark>${match}</mark>`)
		return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
	}
}