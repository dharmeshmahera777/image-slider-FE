import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { HeroService } from '../hero.service';

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

    constructor(private heroService: HeroService) {
        this.setImageObject();
        this.getAllImages();
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

    imageOnClick(index) {
        console.log('index', index);
    }

    lightboxClose() {
        console.log('lightbox close')
    }

    arrowOnClick(event) {
        console.log('arrow click event', event);
    }

    lightboxArrowClick(event) {
        console.log('popup arrow click', event);
    }

    prevImageClick() {
        this.ds.prev();
    }

    nextImageClick() {
        this.ds.next();
    }

    getAllImages(): void {
        this.heroService.getImagesFromAPI().subscribe(res => {
          console.log(res);
          this.imageObject = res;
          
        })
      }

}
