<<<<<<< HEAD
import { Controller, Get, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import fastify = require('fastify');
import { ApiFileBody, MulterFile } from '@webundsoehne/nest-fastify-file-upload';
=======
import { Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { extname } from 'path';
import multer from 'multer';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
//import { FilesInterceptor } from '@nestjs/platform-express';

>>>>>>> 195a6bde2a3fc5ff3fa348f3eaff4475bd5ac162

@Controller('files')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
<<<<<<< HEAD
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

=======

  /*
  @Post('/upload')
  @UseInterceptors(FileInterceptor('image', { storage })) // Use the FileInterceptor with multer storage
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }
*/


  @Post('/file')
  @UseInterceptors(
    FileInterceptor('file')
    )
  handleUpload(@UploadedFile() file: Express.Multer.File){
    console.log('Uploading file', file);
    return 'File Upload API';
  }
  

  

  /*
  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  uploadFile(@UploadedFiles() file){
    console.log(file);
    console.log("dela");
  }
  */
/*
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public async uploadFile(@UploadedFile() file: any){
    const response = {
      originalname: file.originalname,
      filename: file.filename
    };
    return response;
  }
  */

  /*
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Specify the destination directory to save the uploaded files
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const extension = extname(file.originalname);
          callback(null, `${uniqueSuffix}${extension}`);
        },
      }),
    }),
  )
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

}
function diskStorage(arg0: {
  destination: string; // Specify the destination directory to save the uploaded files
  filename: (req: any, file: any, callback: any) => void;
}): any {
  throw new Error('Function not implemented.');
}
*/
>>>>>>> 195a6bde2a3fc5ff3fa348f3eaff4475bd5ac162
}
