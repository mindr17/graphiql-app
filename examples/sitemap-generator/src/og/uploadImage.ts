
import FormData from 'form-data';
import { directus } from './directus';
/** @returns image id */
export async function uploadImage(image: Buffer, title: string, type: 'webp' | 'jpeg', folderId?: string): Promise<string> {
  const form = new FormData();

  if(folderId) {
    form.append('folder', folderId);
  }

  form.append("file", image, {filename: title, contentType: `image/${type}`});

  const response = await directus.files.createOne(form, {}, {
    requestOptions: {
      headers: {
        ...form.getHeaders()
      }
    }
  });

  if(!response) {
    throw new Error('Empty response');
  }

  return response.id;
}
