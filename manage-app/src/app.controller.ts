import {Controller, Get, Logger, Res} from '@nestjs/common';
import {AppService} from './app.service';
import {Response} from "express";

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(
      @Res() response: Response
  ) {
    const colorMap = await this.appService.getColors();
    return response.render("app.view.njk", {colorMap, test: "ok"});
  }

  @Get("files")
  async getFiles() {
    return await this.appService.getFiles();
  }

  @Get("colors")
  async getColors() {
    return await this.appService.getColors();
  }

}

