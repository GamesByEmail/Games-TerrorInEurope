
export type Annotation = { [index: string]: string };

const PATH_DELIMETER = "\x00";

export function annotate(...args: (string | number | any)[]) {
  let annotation: Annotation = {};
  let index = 0;
  const root = args[index++];
  if (root)
    annotation[""] = root;
  while (index < args.length) {
    const prop = Array.isArray(args[index]) ? args[index++].join(PATH_DELIMETER) : args[index++];
    if (typeof (args[index]) === "string") {
      const ann = args[index++];
      if (ann)
        annotation[prop] = ann;
    }
    if (index < args.length && typeof (args[index]) === "object") {
      const subAnn = args[index++];
      if (subAnn)
        if (Array.isArray(subAnn))
          if (subAnn.length > 0 && (typeof (subAnn[0]) === "string" || typeof (subAnn[0]) === "number"))
            index--;
          else
            for (let i = 0; i < subAnn.length; i++) {
              const itemAnn = subAnn[i];
              const itemPath = prop + PATH_DELIMETER + i;
              for (let p in itemAnn)
                if (p==="")
                  annotation[itemPath] = itemAnn[p];
                else
                  annotation[itemPath + PATH_DELIMETER + p] = itemAnn[p];
            }
        else
          for (let p in subAnn)
            annotation[prop + PATH_DELIMETER + p] = subAnn[p];
    }
  }
  return annotation;
}

export function annotatedJson(value: any, annotation: Annotation = {}, dense: boolean = false) {
  const buffer: (number | string | undefined)[] = [];
  const nl = dense ? "" : "\n";
  walk(buffer, 0, "", value, false, annotation, "", dense);
  let json = buffer.map((part, index) => {
    if (index % 3 === 0)
      return dense ? "" : "                                     ".substr(0, (part as number) * 2);
    if (index % 3 === 2)
      return (part ? (dense ? "/*" + part + "*/" : " // " + part) : "") + nl;
    return part;
  }).join("");
  return json;
}

function walk(buffer: (number | string | undefined)[], depth: number, propName: string, value: any, delimit: boolean, annotation: Annotation, path: string, dense:boolean) {
  if (value && typeof (value) === "object") {
    const subPath = path ? path + PATH_DELIMETER : "";
    if (Array.isArray(value)) {
      buffer.push(depth++, propAssign(propName, dense) + "[", annotation[path]);
      for (let i = 0; i < value.length; i++)
        walk(buffer, depth, "", value[i], i < value.length - 1, annotation, subPath + i, dense);
      buffer.push(--depth, "]" + delimeter(delimit), undefined);
    } else {
      buffer.push(depth++, propAssign(propName, dense) + "{", annotation[path]);
      Object.getOwnPropertyNames(value).forEach((prop, index, props) => {
        walk(buffer, depth, prop, value[prop], index < props.length - 1, annotation, subPath + prop, dense);
      });
      buffer.push(--depth, "}" + delimeter(delimit), undefined);
    }
  } else
    buffer.push(depth, propAssign(propName, dense) + JSON.stringify(value) + delimeter(delimit), annotation[path]);
}

function delimeter(delimit: boolean) {
  return delimit ? "," : "";
}
const startsWithNumber=/[0-9]/;
const hasNonNormal=/[^\w$]/;
function propAssign(propName: string, dense: boolean) {
  if (!propName)
    return "";
  if (!dense || propName.search(startsWithNumber)===0 || propName.search(hasNonNormal)>=0)
    propName=JSON.stringify(propName);
  propName+=":";
  if (!dense)
    propName+=" ";
  return propName;
}