import { Controller, Get, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import fastify = require('fastify');
import { ApiFileBody, MulterFile } from '@webundsoehne/nest-fastify-file-upload';

@Controller('files')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
/*
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiFileBody('file')
  @ApiConsumes('multipart/form-data')
  uploadFile (@UploadedFile('file') file: MulterFile): void {
      console.log(file)
  }
*/
/*
  @Post('/uploadFile')
  async uploadFile(@Req() req: fastify.FastifyRequest, @Res() res: fastify.FastifyReply<any>): Promise<any> {
    return await this.appService.uploadFile(req,res)
  }  
  */
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('image')
  )
  uploadFiles(@UploadedFiles() file: Express.Multer.File){
    console.log(file);
  }

}
