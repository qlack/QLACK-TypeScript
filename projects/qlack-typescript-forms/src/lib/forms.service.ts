import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {FormGroup} from '@angular/forms';
import {QFilterAlias} from './filter-alias';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';

/**
 * Utilities working with forms and the resulting HTTPClient requests taking into account the
 * parameters required by Spring Data pageable queries with support of QueryDSL predicates.
 */
@Injectable({
  providedIn: 'root'
})
export class QFormsService {

  constructor() {
  }

  /**
   * Converts a FormGroup into a query string to be used together with Spring Data for
   * data-filtering.
   * @param fb The FormGroup to convert.
   * @param aliases An array of aliases to change the name of the FormGroup elements to
   * different names in the resulting query string. For example, you may have a FormGroup element
   * named 'session' whereas in your model you have a 'sessionId' column; you can use an alias such
   * as `new FilterAliasDTO('session', 'sessionId')` and this method will produce a query string
   * containing a `sessionId=foo` element.
   * @param includeEmpty A flag indicating whether empty FormGroup element should be included
   * in the resulting query string or not.
   * @returns Returns the query string, e.g. userId=123&sessionId=456&status=1
   */
  formGroupToQueryString(fb: FormGroup, aliases: QFilterAlias[], includeEmpty: boolean): string {
    let query = '';
    for (const filter in fb.value) {
      // Skip empty fields if requested to not include them.
      if ((fb.value[filter] == null || fb.value[filter] === '') && !includeEmpty) {
        continue;
      }

      // Set the name of the field taking into account aliases.
      let fieldName: string = filter;
      const alias = _.find(aliases, {source: filter});
      if (alias) {
        fieldName = alias.target;
      }

      // Set query string.
      const prefix: string = query.length > 0 ? '&' : '';
      let value: any;

      if (fb.value[filter]._isAMomentObject) {
        value = fb.value[filter].toISOString();
      } else {
        value = fb.value[filter];
      }

      query += prefix + fieldName + '=' + value;
    }

    return encodeURI(query);
  }

  /**
   * Appends Spring Data pageable parameters to query string filter.
   * @param filter
   * @param page
   * @param size
   * @param sort
   * @param sortDirection
   * @returns
   */
  appendPagingToFilter(filter: string, page: number, size: number, sort: string,
                       sortDirection: string): string {
    if (!filter) {
      filter = '';
    }

    if (page > -1) {
      filter += filter === '' ? '' : '&';
      filter += 'page=' + page;
    }

    if (size) {
      filter += filter === '' ? '' : '&';
      filter += 'size=' + size;
    }

    if (sort && sortDirection) {
      filter += filter === '' ? '' : '&';
      filter += 'sort=' + sort + ',' + sortDirection;
    }

    return filter;
  }

  /**
   * A convenience method to chain formGroupToQueryString and appendPagingToFilter.
   * @param fb
   * @param aliases
   * @param includeEmpty
   * @param page
   * @param size
   * @param sort
   * @param sortDirection
   * @returns
   */
  makeQueryString(fb: FormGroup, aliases: QFilterAlias[], includeEmpty: boolean,
                  page: number, size: number, sort: string, sortDirection: string): string {
    return this.appendPagingToFilter(this.formGroupToQueryString(fb, aliases, includeEmpty), page,
      size, sort, sortDirection);
  }

  /**
   * Cleans up a form object from null or empty (string) fields without mutating it. It returns a raw, cleaned up
   * Object.
   * @param fb
   */
  cleanupForm(fb: FormGroup) {
    return _.pickBy(fb.getRawValue(), _.identity);
  }

  /**
   * Posts a form using an HttpRequest, ideal when your form contains binary data such as files.
   *
   * Be aware that HttpRequest reports progress via HttpEvent, so a trivial .subscribe(onSuccess => {}, onError => {})
   * will not work. You should instead subscribe to the returned events (there will be many, especially if you track
   * progress update), check their type and decide whether you have a success, an error, or just a progress update.
   * For example:
   * uploadForm(...).subscribe(onEvent => {
   *   if (onEvent.type == HttpEventType.Response) {
   *     if (onEvent.status == 200) {
   *       // All OK, you can navigate to a new route if required.
   *     } else {
   *       // Something went wrong while uploading the file.
   *     }
   *   }
   * }, onError => {
   *   // Something went wrong before uploading the file (for example, maximum file-size restriction).
   * })
   * @param http The HttpClient to use for posting.
   * @param fg The FormGroup with the data to post.
   * @param url The URL to post to.
   * @param reportProgress Whether to report uploading progress or not.
   */
  uploadForm(http: HttpClient, fg: FormGroup, url: string, reportProgress: boolean): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    for (const formField in fg.value) {
      formData.append(formField, fg.value[formField]);
    }
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: reportProgress,
    });

    return http.request(req);
  }
}
