import _ from "lodash";

interface DtoTransform<T> {
  label: string;
  value: any;
  original: T;
  key: any;
}

export default class List {
  /**
   *
   * @param params
   * @returns
   */
  public static transform<T>(
    list: T[],
    labelKey?: any,
    valueKey?: any,
    separator?:
      | string
      | ((values: string | string[], item: T, index: any) => string)
  ): DtoTransform<T>[] {
    if (!list) return [];

    return list.map((item, index) => {
      const name = [];
      if (_.isArray(labelKey)) {
        labelKey.forEach((key) => {
          name.push(_.get(item, key));
        });
      } else if (_.isNil(labelKey)) {
        name.push(item);
      } else {
        name.push(_.get(item, labelKey));
      }

      let value;
      if (_.isNil(valueKey)) {
        value = item;
      } else if (_.isArray(valueKey)) {
        for (let i = 0; i < valueKey.length; i += 1) {
          const val = _.get(item, valueKey[i]);
          if (val !== undefined) {
            value = val;
            // stop loop jika value ada
            break;
          }
        }
      } else {
        value = _.get(item, valueKey);
      }

      const label = _.isFunction(separator)
        ? // @ts-ignore
          separator(name.length <= 1 ? name[0] : name, item, index)
        : // @ts-ignore
          name.join(separator || " - ");
      return {
        label,
        original: item,
        value,
        key: value,
      };
    });
  }
}
