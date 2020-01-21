/**
 * Defines a set of aliases to be used while producing the query string for a form: any field found
 * to be named after `source` it becomes `target` in the query.
 */
export class QFilterAlias {
  source: string;
  target: string;

  constructor(source: string, target: string) {
    this.source = source;
    this.target = target;
  }
}
