import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-set-image',
  templateUrl: './set-image.component.html',
  styleUrls: ['./set-image.component.css']
})
export class SetImageComponent implements OnInit {
  imageObj: any = null;
  imageTitle = ''
  constructor(
    private heroService : HeroService
  ) { }

  ngOnInit(): void {
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

  addSaveClick() {
    if(this.imageObj && this.imageTitle) {
      this.saveImage();
    } else {
      alert("Please select images or title")
    }
  
  }

  saveImage(): void {
    const body  = {
      imageUrl: this.imageObj.imageUrl,
      fileName: this.imageObj.fileName,
      title: this.imageTitle
    } 
    this.heroService.addImages(body)
      .subscribe(
        (response) => {
          alert("Images Added successfully")
          console.log(response);
        }
      );
  }
}
