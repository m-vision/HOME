import axios, { AxiosResponse } from "axios";
import * as Sentry from "sentry-expo";

export interface GetS3FileUrlParams {
  fileName: string;
  userId: string;
}

export const getS3FileUrl = ({ fileName, userId }: GetS3FileUrlParams) => {
  return `https://${process.env.EXPO_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.EXPO_PUBLIC_AWS_DEFAULT_REGION}.amazonaws.com/users/${userId}/${fileName}`;
};

export const gets3FileKey = (S3FilePath: string) => {
  return S3FilePath.split(".com/")[1];
};

export interface GetPresignedUrlParams {
  fileName: string;
  userId: string;
  contentType: string;
}

export const getPresignedUrl = async ({
  fileName,
  userId,
  contentType,
}: GetPresignedUrlParams) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/s3/generate-presigned-url?fileName=users/${userId}/${fileName}&contentType=${contentType}`,
    );
    if (response.ok) {
      const data = await response.json();
      return data.url;
    } else {
      Sentry.Native.captureException(response.statusText);
      return null;
    }
  } catch (error) {
    Sentry.Native.captureException(error);
    return null;
  }
};

export const deleteS3Object = async (fileName: string) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/s3/delete-object?fileName=${fileName}`,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      Sentry.Native.captureException(response.statusText);
      return null;
    }
  } catch (error) {
    Sentry.Native.captureException(error);
    return null;
  }
};

export interface UploadFileToS3Params {
  presignedUrl: string;
  file: Buffer;
  contentType: string;
}

export const uploadFileToS3 = async ({
  presignedUrl,
  file,
  contentType,
}: UploadFileToS3Params): Promise<AxiosResponse | undefined> => {
  try {
    const result = await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": contentType,
      },
    });

    if (result.status !== 200) {
      throw new Error(`Failed to upload file to S3. Status: ${result}`);
    }

    return result;
  } catch (error) {
    Sentry.Native.captureException(error);
    return;
  }
};
