export function isEmpty(val) {
    return (
    (!val)
    || (val === undefined)
    || (val === null)
    || (val === '')
    || ((val?.length !== undefined) && (val.length === 0))
    || (typeof val === 'object' && Object.keys(val).length === 0) 
  );
}
