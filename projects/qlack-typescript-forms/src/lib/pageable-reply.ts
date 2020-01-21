/**
 * A representation of the reply from a Spring Data Pageable REST endpoint.
 */
export class QPageableReply<T> {
  content: T[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sortable;
  totalElements: number;
  totalPages: number;
}

export class Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpages: boolean;
  sort: Sortable;
}

export class Sortable {
  sorted: boolean;
  unsorted: boolean;
}
