import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteBucketCommandOutput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  async generatePresignedUrl(
    fileName: string,
    contentType: string,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      ContentType: contentType,
    });

    return getSignedUrl(this.s3, command, { expiresIn: 60 });
  }

  async deleteObject(fileName: string): Promise<DeleteBucketCommandOutput> {
    const result = await this.s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
      }),
    );
    return result;
  }
}
