import { Component, TemplateRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Deferred } from '@packageforge/deferred';

import { ITemplateLibrary, ITemplateSize, TemplateLibraryService } from '@packageforge/template-projection';

import { Game } from '../../../../game/game';
import { Move, isIMove, isIResign } from '../../../../game/move';
import { pieceNameFromState } from '../../../../game/create-piece';
import { TeamId } from 'projects/game/src/lib/game/team-id';

@Component({
  selector: 'gamesbyemail-games-terrorInEurope-default-log-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements ITemplateLibrary, AfterViewInit {
  @ViewChildren(TemplateRef) templateRefs!: QueryList<TemplateRef<any>>;
  constructor(private templateLibraryService: TemplateLibraryService) {
  }
  private initDefer = new Deferred();
  ngAfterViewInit(): void {
    this.initDefer.resolve();
    // Following line is to keep build from complaining about unused QueryList
    this.templateRefs instanceof QueryList;
  }
  getTemplate(move: Move | undefined): Promise<TemplateRef<any> | undefined> {
    return this.initDefer.promise.then(() => {
      let id: string;
      if (!move)
        id = "StartOfGame";
      else if (isIMove(move))
        id = "Move";
      else if (isIResign(move))
        id = "Resign";
      else
        id = "AcceptDraw";
      return this.templateLibraryService.findTemplateById(this.templateRefs, id);
    });
  }
  getSize(template: TemplateRef<any> | undefined): ITemplateSize | undefined {
    return this.templateLibraryService.getTemplateSize(template);
  }
  pieceNameFromState = pieceNameFromState;
  teamIdFromState = function (piece: any) { return TeamId.Terrorist; };
  spaceName(game: Game, index: number): string {
    return game.board.territories[index].title;
  }
}
