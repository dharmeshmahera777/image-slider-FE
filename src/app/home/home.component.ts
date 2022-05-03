import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { HeroService } from '../hero.service';
import { SpinnerOverlayComponent } from '../shared/spinner/spinner-overlay.component';
import { SpinnerOverlayService } from '../shared/spinner/spinner-overlay.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('nav', {static: false}) ds: NgImageSliderComponent;
    title = 'Ng Image Slider';
    showSlider = true;

    sliderWidth: Number = 940;
    sliderImageWidth: Number = 250;
    sliderImageHeight: Number = 200;
    sliderArrowShow: Boolean = true;
    sliderInfinite: Boolean = false;
    sliderImagePopup: Boolean = true;
    sliderAutoSlide: Boolean = false;
    sliderSlideImage: Number = 1;
    sliderAnimationSpeed: any = 1;
    imageObject;
    slideOrderType:string = 'DESC';
    pageData: any;

    constructor(
        private heroService: HeroService,
        private spinnerOverlayService: SpinnerOverlayService
        ) {
        this.setImageObject();
        this.getAllImages();
        this.getPageData();
    }

    onChangeHandler() {
        this.setImageObject();
        this.showSlider = false;
        setTimeout(() => {
            this.showSlider = true;
        }, 10);
    }

    setImageObject() {
        // this.heroService.getImages().subscribe((data: any) => {
        // setTimeout(() => {
        //     this.imageObject = data;
        // }, 3000);
        // });
        // this.imageObject = this.heroService.getImagesWithOrder();
    }

    imageOnClick(index) {}

    lightboxClose() {}

    arrowOnClick(event) {}

    lightboxArrowClick(event) {}

    prevImageClick() {
        this.ds.prev();
    }

    nextImageClick() {
        this.ds.next();
    }

    getAllImages(): void {
        this.spinnerOverlayService.startSpinning();
        this.heroService.getImagesFromAPI().subscribe(res => {
          this.imageObject = res;
          this.imageObject = this.imageObject.reverse();
          this.spinnerOverlayService.stopSpinning();

        })
      }

      getPageData() {
        this.spinnerOverlayService.startSpinning();
        this.heroService.getPageData().subscribe((res) => {
          this.spinnerOverlayService.stopSpinning();
          if(res) {
            this.pageData = res;
          }
        }, () => {
          this.spinnerOverlayService.stopSpinning();
        })
      }

}
