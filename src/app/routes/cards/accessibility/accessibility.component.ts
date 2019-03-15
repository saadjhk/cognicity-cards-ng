import { Component, AfterViewChecked, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { RoadService } from '../../../services/cards/earthquake/road.service';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss']
})
export class AccessibilityComponent implements AfterViewChecked {
  images = [
    "../../../../assets/decks/earthquake/accessibility/Access_1.png",
    "../../../../assets/decks/earthquake/accessibility/Access_2.png",
    "../../../../assets/decks/earthquake/accessibility/Access_3.png",
    "../../../../assets/decks/earthquake/accessibility/Access_4.png",
    "../../../../assets/decks/earthquake/accessibility/Access_5.png",
  ]

  stage: number
  image: string
  accessibility: number

  constructor(
    public roadService: RoadService,
    public cdref: ChangeDetectorRef
  ) {}

  ngAfterViewChecked() {
    this.onRangeChange(this.roadService.getRoadAccessibility().toString())
    this.cdref.detectChanges()
  }

  public onRangeChange(inputValue: string): void {
    const intValue = parseFloat(inputValue)
    const output = document.querySelector('.accessibility__slider-output') as HTMLDivElement
    const input = document.querySelector('.accessibility__slider-range') as HTMLInputElement
    let stage;

    if (intValue <= 0.5) {
      stage = 1;
    } else if (intValue <= 1.0) {
      stage = 2;
    } else if(intValue <= 1.4) {
      stage = 3;
    } else if (intValue <= 1.8) {
      stage = 4;
    } else {
      stage = 5;
    }

    this.image = this.images[stage - 1]
    this.stage = stage
    this.accessibility = intValue

    this.roadService.setRoadAccessibility(intValue)

    output.style.left = (intValue / 2.4) * input.offsetWidth + 'px'
  }
}
