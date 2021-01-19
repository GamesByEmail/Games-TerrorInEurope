import { Component, TemplateRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Deferred } from '@packageforge/deferred';

import { ITemplateLibrary, ITemplateSize, TemplateLibraryService } from '@packageforge/template-projection';

@Component({
  selector: '[gamesbyemail-games-terrorInEurope-default-piecelibrary]',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.css']
})
export class PiecesComponent implements ITemplateLibrary, AfterViewInit {
  @ViewChildren(TemplateRef) templateRefs!: QueryList<TemplateRef<any>>;
  constructor(private templateLibraryService: TemplateLibraryService, private location:Location ) {
  }
  private initDefer = new Deferred();
  ngAfterViewInit(): void {
    this.initDefer.resolve();
    // Following line is to keep build from complaining about unused QueryList
    this.templateRefs instanceof QueryList;
  }
  getTemplate(key: string): Promise<TemplateRef<any> | undefined> {
    return this.initDefer.promise.then(() => {
      const id = key;
      return this.templateLibraryService.findTemplateById(this.templateRefs, id);
    });
  }
  getSize(template: TemplateRef<any> | undefined): ITemplateSize | undefined {
    return this.templateLibraryService.getTemplateSize(template);
  }
  url(url:string){
    console.log("url("+this.location.path()+url+")");
    return "url("+this.location.path()+url+")";
  }
}
