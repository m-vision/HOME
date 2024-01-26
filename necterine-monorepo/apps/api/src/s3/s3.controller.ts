import { Controller, Get, Query, Res } from '@nestjs/common';
import { S3Service } from './s3.service';
import { Response } from 'express';
import { GeneratePresignedUrlDto } from './dto/generate-presigned-url.dto';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get('generate-presigned-url')
  async generatePresignedUrl(
    @Query() generatePresignedUrlDto: GeneratePresignedUrlDto,
    @Res() res: Response,
  ) {
    try {
      const url = await this.s3Service.generatePresignedUrl(
        generatePresignedUrlDto.fileName,
        generatePresignedUrlDto.contentType,
      );
      return res.status(200).json({ url });
    } catch (error) {
      return res.status(500).json({
        error: `Could not generate pre-signed URL: ${error['message']}`,
      });
    }
  }

  @Get('delete-object')
  async deleteObject(
    @Query('fileName') fileName: string,
    @Res() res: Response,
  ) {
    try {
      await this.s3Service.deleteObject(fileName);
      return res.status(200).json({ message: 'Object deleted' });
    } catch (error) {
      return res.status(500).json({
        error: `Could not delete object: ${error['message']}`,
      });
    }
  }
}
