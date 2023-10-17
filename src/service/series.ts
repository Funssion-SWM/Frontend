import { ErrorResponse, Orderby, Period } from '@/types';
import {
  GetSeriesByIdResponse,
  PostSeriesResponse,
  Series,
} from '@/types/series';

export async function getSeriesArray(
  period: Period = 'month',
  orderBy: Orderby = 'new',
  pageNum: number = 0,
  resultCntPerPage: number = 12
): Promise<Series[] | ErrorResponse> {
  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/series`);
  const params = {
    period: period,
    orderBy: orderBy,
    pageNum: pageNum.toString(),
    resultCntPerPage: resultCntPerPage.toString(),
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, { next: { revalidate: 0 } })
    .then((res) => res.json())
    .catch(console.error);
}

export async function getSeriesById(
  id: number
): Promise<GetSeriesByIdResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/series/${id}`,
    {
      next: { revalidate: 0 },
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function createSeries(
  title: string,
  description: string,
  memoIdList: number[],
  thumbnailImage: File | null
): Promise<PostSeriesResponse | ErrorResponse> {
  const formdata = new FormData();
  console.log(thumbnailImage);
  formdata.append('title', title);
  formdata.append('description', description);
  formdata.append('memoIdList', JSON.stringify(memoIdList));
  if (thumbnailImage !== null)
    formdata.append('thumbnailImage', thumbnailImage);

  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/series`, {
    method: 'POST',
    body: formdata,
    credentials: 'include',
  })
    .then((res) => res.json())
    .catch(console.error);
}

export async function updateSeries(
  id: number,
  title: string,
  description: string,
  memoIdList: number[],
  thumbnailImage: File | null,
  isEmpty: 'true' | 'false'
): Promise<GetSeriesByIdResponse | ErrorResponse> {
  const formdata = new FormData();

  formdata.append('title', title);
  formdata.append('description', description);
  formdata.append('memoIdList', JSON.stringify(memoIdList));
  formdata.append('isEmpty', isEmpty);
  if (thumbnailImage !== null)
    formdata.append('thumbnailImage', thumbnailImage);

  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/series/${id}`,
    {
      method: 'POST',
      body: formdata,
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function deleteSeries(id: number): Promise<ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/series/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}
