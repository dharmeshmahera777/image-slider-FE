import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroService } from '../hero.service';
import { SpinnerOverlayService } from '../shared/spinner/spinner-overlay.service';

@Component({
  selector: 'app-set-image',
  templateUrl: './set-image.component.html',
  styleUrls: ['./set-image.component.css']
})
export class SetImageComponent implements OnInit {
  imageObj: any = null;
  imageTitle = '';
  pageDataForm: any;
  pageData:any;
  imageObject: any;

  constructor(
    private heroService : HeroService,
    private spinnerOverlayService: SpinnerOverlayService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createPageDataForm();
    this.getPageData();
    this.getAllImages();
  }

  async uploadAvatar(fileList = []): Promise<any> {
    const fileElement = fileList[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileElement);
    reader.onload = (_event): any => {
      const obj = {
        // file: fileElement,
        imageUrl: reader.result,
        fileName: fileElement.name
      };
      this.imageObj = obj;

      // setImage(obj);
    };
  }

  createPageDataForm(): void {
    this.pageDataForm = this._formBuilder.group({
      marquee: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      footer: ['', Validators.required],
    });
  }

  addSaveClick() {
    if(this.imageObj && this.imageTitle) {
      this.saveImage();
    } else {
      alert("Please select images or title")
    }
  
  }

  saveImage(): void {
    this.spinnerOverlayService.startSpinning();
    const body  = {
      imageUrl: this.imageObj.imageUrl,
      fileName: this.imageObj.fileName,
      title: this.imageTitle
    } 
    this.heroService.addImages(body)
      .subscribe(
        () => {
          this.spinnerOverlayService.stopSpinning();
          alert("Images Added successfully");
          this.getAllImages();
        }, () => {
          this.spinnerOverlayService.stopSpinning();
        }
      );
  }


  pageDataSaveClick(): void {
    if(this.pageDataForm.invalid) {
      alert("Invalid data");
      return;
    }
    this.savePageData();
    
  }

  savePageData() {
    this.spinnerOverlayService.startSpinning();
    const formValue = this.pageDataForm.value;
    this.heroService.savePageData(formValue, this.pageData._id)
      .subscribe(
        () => {
          this.spinnerOverlayService.stopSpinning();
          alert("Page Data Saved Successfully");
        }, () => {
          this.spinnerOverlayService.stopSpinning();
        }
      );
    }

    getPageData() {
      this.spinnerOverlayService.startSpinning();
      this.heroService.getPageData().subscribe((res) => {
        this.spinnerOverlayService.stopSpinning();
        if(res) {
          this.pageData = res;
          this.pageDataForm.patchValue(res);
          
        }
      }, () => {
        this.spinnerOverlayService.stopSpinning();
      })
    }

    getAllImages(): void {
      this.spinnerOverlayService.startSpinning();
      this.heroService.getImagesFromAPI().subscribe(res => {
        this.imageObject = res;
        this.imageObject = this.imageObject.reverse();
        this.spinnerOverlayService.stopSpinning();
      }, () => {
        this.spinnerOverlayService.stopSpinning();
      })
    }

    deleteClick(imageId) {
      this.deleteImage(imageId);
    }

    deleteImage(imageId) {
      this.spinnerOverlayService.startSpinning();
      this.heroService.deleteImage(imageId).subscribe(() => {
        alert('Image Deleted Successfully');
        this.getAllImages();
        this.spinnerOverlayService.stopSpinning();
      },
      () => {
        this.spinnerOverlayService.stopSpinning();
      });
    };
}
