import { ErrorResponse, Orderby, Period } from '@/types/common';
import {
  GetSeriesByIdResponse,
  PostSeriesResponse,
  Series,
} from '@/types/series';
import { SERIES_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL } from '@/constants/limit';

export async function getSeriesArray(
  period: Period = 'month',
  orderBy: Orderby = 'new',
  pageNum: number = 0,
  resultCntPerPage: number = SERIES_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
): Promise<Series[]> {
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
